import { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CATEGORIES = [
  { id: 'style', name: 'Style', color: '#6D5EFC' },
  { id: 'lighting', name: 'Lighting', color: '#00D4FF' },
  { id: 'mood', name: 'Mood', color: '#FF6B9D' },
  { id: 'texture', name: 'Texture', color: '#FFB84D' },
  { id: 'lens', name: 'Lens', color: '#9D4EDD' },
  { id: 'palette', name: 'Palette', color: '#00F5D4' },
];

const WORD_DATABASE: Record<string, string[]> = {
  style: ['Minimalist', 'Abstract', 'Geometric', 'Vintage', 'Modern'],
  lighting: ['Natural', 'Dramatic', 'Soft', 'Neon', 'Golden'],
  mood: ['Peaceful', 'Energetic', 'Mysterious', 'Romantic', 'Dark'],
  texture: ['Smooth', 'Rough', 'Glassy', 'Metallic', 'Fabric'],
  lens: ['Wide', 'Telephoto', 'Macro', 'Portrait', 'Bokeh'],
  palette: ['Warm', 'Cool', 'Vibrant', 'Pastel', 'Monochrome'],
};

export default function BoardScreen() {
  const router = useRouter();
  const [selectedTiles, setSelectedTiles] = useState<(string | null)[]>([null, null, null, null]);
  const [availableTiles, setAvailableTiles] = useState<string[]>(Object.values(WORD_DATABASE).flat());

  const handleTilePress = useCallback((tile: string, category: string) => {
    const emptySlotIndex = selectedTiles.findIndex((_, i) => i < 4 && !selectedTiles[i]);
    if (emptySlotIndex !== -1) {
      const newSelectedTiles = [...selectedTiles];
      newSelectedTiles[emptySlotIndex] = tile;
      setSelectedTiles(newSelectedTiles);
    } else {
      Alert.alert('Slots Full', 'You can only have 4 tiles on the board at once.');
    }
  }, [selectedTiles]);

  const handleSlotPress = useCallback((index: number) => {
    if (selectedTiles[index]) {
      const newSelectedTiles = [...selectedTiles];
      newSelectedTiles[index] = null;
      setSelectedTiles(newSelectedTiles);
    }
  }, [selectedTiles]);

  const handleTestCombination = useCallback(() => {
    const filledSlots = selectedTiles.filter(t => t !== null);
    if (filledSlots.length < 2) {
      Alert.alert('Not Enough Tiles', 'Add at least 2 tiles to test a combination.');
      return;
    }
    
    const categories = new Set(
      filledSlots.map((tile) => {
        for (const [cat, words] of Object.entries(WORD_DATABASE)) {
          if (words.includes(tile)) return cat;
        }
        return 'unknown';
      })
    );

    const diversityScore = categories.size;
    const baseScore = filledSlots.length * 10;
    const diversityBonus = (diversityScore - 1) * 15;
    const totalScore = baseScore + diversityBonus;

    const success = totalScore >= 30;
    
    Alert.alert(
      success ? 'Success!' : 'Try Again',
      `${success ? `Great combination! Score: ${totalScore}` : 'Try mixing different categories for better results'}`,
      [{ text: 'Awesome', onPress: () => {} }]
    );
  }, [selectedTiles]);

  const renderTile = ({ item }: { item: string }) => {
    const category = Object.entries(WORD_DATABASE).find(([_, words]) => words.includes(item))?.[0] || 'style';
    const color = CATEGORIES.find(c => c.id === category)?.color || '#6D5EFC';
    
    return (
      <TouchableOpacity
        style={[styles.tile, { borderColor: color }]}
        onPress={() => handleTilePress(item, category)}
      >
        <Text style={[styles.tileText, { color }]}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.board}>
        <View style={styles.slotsContainer}>
          {selectedTiles.map((tile, index) => (
            <View key={index} style={[styles.slot, { borderColor: CATEGORIES[index % 6].color }]}>
              {tile ? (
                <View style={[styles.tileInSlot, { backgroundColor: CATEGORIES[index % 6].color }]}>
                  <Text style={styles.tileSlotText}>{tile}</Text>
                </View>
              ) : (
                <View style={styles.emptySlot}>
                  <Ionicons name="add" size={32} color="rgba(255,255,255,0.3)" />
                </View>
              )}
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={styles.testButton}
          onPress={handleTestCombination}
        >
          <Ionicons name="flame" size={24} color="#FFF" />
          <Text style={styles.testButtonText}>Test Combination</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.wordsSection}>
        <Text style={styles.sectionTitle}>Choose Words</Text>
        <FlatList
          data={availableTiles}
          renderItem={renderTile}
          keyExtractor={(item, index) => `${item}-${index}`}
          numColumns={4}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.tilesList}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0C12',
  },
  board: {
    padding: 16,
    backgroundColor: '#11131C',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  slotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  slot: {
    width: 100,
    height: 100,
    borderWidth: 3,
    borderRadius: 16,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  tileInSlot: {
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tileSlotText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  emptySlot: {
    width: 90,
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  testButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D5EFC',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 32,
    gap: 8,
  },
  testButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
  },
  wordsSection: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    color: '#F4F6FF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  tilesList: {
    paddingBottom: 20,
  },
  tile: {
    width: (SCREEN_WIDTH - 80) / 4,
    aspectRatio: 1,
    marginHorizontal: 5,
    borderWidth: 2,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    marginVertical: 4,
  },
  tileText: {
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
