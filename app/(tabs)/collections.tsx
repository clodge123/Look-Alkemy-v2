import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAMPLE_COLLECTIONS = [
  { id: '1', name: 'Sunset Dreams', tiles: 4, score: 8.5, date: 'Today' },
  { id: '2', name: 'Urban Edge', tiles: 4, score: 7.8, date: 'Yesterday' },
  { id: '3', name: 'Minimal Zen', tiles: 4, score: 9.2, date: '3 days ago' },
];

export default function CollectionsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Collections</Text>
        <Text style={styles.subtitle}>Saved combinations</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {SAMPLE_COLLECTIONS.length > 0 ? (
          SAMPLE_COLLECTIONS.map((collection) => (
            <View key={collection.id} style={styles.collectionCard}>
              <View style={styles.collectionHeader}>
                <Text style={styles.collectionName}>{collection.name}</Text>
                <View style={styles.scoreBadge}>
                  <Text style={styles.scoreText}>{collection.score}</Text>
                </View>
              </View>
              <View style={styles.collectionMeta}>
                <Text style={styles.collectionTiles}>{collection.tiles} tiles</Text>
                <Text style={styles.collectionDate}>{collection.date}</Text>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTitle}>No collections yet</Text>
            <Text style={styles.emptySubtitle}>
              Start combining ingredients to build your collection!
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A1A2E',
  },
  header: {
    padding: 20,
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
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 20,
  },
  collectionCard: {
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  collectionName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
  },
  scoreBadge: {
    backgroundColor: '#6D5EFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  collectionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  collectionTiles: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  collectionDate: {
    fontSize: 14,
    color: '#666666',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    textAlign: 'center',
  },
});
