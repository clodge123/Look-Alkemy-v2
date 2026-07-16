import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAMPLE_PACKS = [
  { id: '1', name: 'Nature Vibes', description: 'Organic, natural elements', color: '#00F5D4' },
  { id: '2', name: 'Urban Edge', description: 'Modern, city-inspired', color: '#6D5EFC' },
  { id: '3', name: 'Retro Wave', description: '80s inspired aesthetics', color: '#FF6B9D' },
  { id: '4', name: 'Minimal Zen', description: 'Clean, simple compositions', color: '#00D4FF' },
];

export default function PacksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ingredient Packs</Text>
        <Text style={styles.subtitle}>Choose a pack to start combining</Text>
      </View>

      <FlatList
        data={SAMPLE_PACKS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={[styles.packCard, { borderColor: item.color }]}>
            <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
              <Text style={styles.iconText}>{item.name.charAt(0)}</Text>
            </View>
            <View style={styles.packInfo}>
              <Text style={styles.packName}>{item.name}</Text>
              <Text style={styles.packDescription}>{item.description}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0C12',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  title: {
    color: '#F4F6FF',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#888',
    fontSize: 16,
  },
  list: {
    padding: 16,
  },
  packCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderStyle: 'solid',
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  iconText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '700',
  },
  packInfo: {
    flex: 1,
  },
  packName: {
    color: '#F4F6FF',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 4,
  },
  packDescription: {
    color: '#888',
    fontSize: 14,
  },
});
