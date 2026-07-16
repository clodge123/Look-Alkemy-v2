import React, { useState, useCallback } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import WordTile from '../../components/game/WordTile';
import Slot from '../../components/game/Slot';
import { useGameStore } from '../../stores/game-store';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { name: 'Style', color: '#6D5EFC' },
  { name: 'Lighting', color: '#FF6B6B' },
  { name: 'Mood', color: '#4ECDC4' },
  { name: 'Texture', color: '#FFE66D' },
  { name: 'Lens', color: '#95E1D3' },
  { name: 'Palette', color: '#F38181' },
];

const SampleTiles = [
  { id: '1', word: 'Cinematic', category: 'Style' },
  { id: '2', word: 'Natural', category: 'Lighting' },
  { id: '3', word: 'Dreamy', category: 'Mood' },
  { id: '4', word: 'Grainy', category: 'Texture' },
  { id: '5', word: 'Wide Angle', category: 'Lens' },
  { id: '6', word: 'Warm', category: 'Palette' },
  { id: '7', word: 'Minimalist', category: 'Style' },
  { id: '8', word: 'Dramatic', category: 'Lighting' },
  { id: '9', word: 'Ethereal', category: 'Mood' },
  { id: '10', word: 'Smooth', category: 'Texture' },
  { id: '11', word: 'Telephoto', category: 'Lens' },
  { id: '12', word: 'Cool', category: 'Palette' },
];

export default function BoardScreen() {
  const { selectedTiles, addToSelection, removeFromSelection, clearSelection } = useGameStore();
  const [activeSlot, setActiveSlot] = useState<number | null>(null);

  const handleTilePress = useCallback((tile: typeof SampleTiles[0]) => {
    if (selectedTiles.includes(tile.id)) {
      removeFromSelection(tile.id);
    } else {
      addToSelection(tile.id);
    }
  }, [selectedTiles, addToSelection, removeFromSelection]);

  const handleSlotDrop = useCallback((slotIndex: number) => {
    setActiveSlot(slotIndex);
    // TODO: Add combination logic here
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Look-Alkemy</Text>
          <Text style={styles.subtitle}>Combine ingredients to discover</Text>
        </View>

        <View style={styles.slotsContainer}>
          <Text style={styles.sectionTitle}>Your Combinations</Text>
          <View style={styles.slots}>
            {[0, 1, 2, 3].map((index) => (
              <Slot
                key={index}
                index={index}
                tile={selectedTiles.find(t => t === SampleTiles[index % SampleTiles.length]?.id) ? SampleTiles[index % SampleTiles.length] : null}
                isActive={activeSlot === index}
                onDrop={() => handleSlotDrop(index)}
              />
            ))}
          </View>
        </View>

        <View style={styles.tilesContainer}>
          <Text style={styles.sectionTitle}>Ingredient Tiles</Text>
          <ScrollView 
            style={styles.tilesScroll}
            contentContainerStyle={styles.tilesContent}
            showsVerticalScrollIndicator={false}
          >
            {CATEGORIES.map((category) => (
              <View key={category.name} style={styles.categorySection}>
                <Text style={[styles.categoryTitle, { color: category.color }]}>
                  {category.name}
                </Text>
                <View style={styles.categoryTiles}>
                  {SampleTiles
                    .filter(tile => tile.category === category.name)
                    .map((tile) => (
                      <WordTile
                        key={tile.id}
                        tile={tile}
                        isSelected={selectedTiles.includes(tile.id)}
                        onPress={() => handleTilePress(tile)}
                      />
                    ))}
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.actions}>
          <Text style={styles.selectedCount}>
            {selectedTiles.length} selected
          </Text>
        </View>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  slotsContainer: {
    padding: 20,
    backgroundColor: '#16213E',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  slots: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  tilesContainer: {
    flex: 1,
    padding: 20,
  },
  tilesScroll: {
    flex: 1,
  },
  tilesContent: {
    paddingBottom: 20,
  },
  categorySection: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  categoryTiles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  actions: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
  },
  selectedCount: {
    fontSize: 14,
    color: '#6D5EFC',
    fontWeight: '600',
  },
});
