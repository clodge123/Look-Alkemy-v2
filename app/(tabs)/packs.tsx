import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SAMPLE_PACKS = [
  { id: '1', name: 'Cinematic Basics', count: 24, color: '#6D5EFC' },
  { id: '2', name: 'Portrait Pro', count: 18, color: '#FF6B6B' },
  { id: '3', name: 'Landscape Master', count: 32, color: '#4ECDC4' },
  { id: '4', name: 'Abstract Art', count: 28, color: '#FFE66D' },
  { id: '5', name: 'Street Photography', count: 22, color: '#95E1D3' },
  { id: '6', name: 'Fashion Forward', count: 20, color: '#F38181' },
];

export default function PacksScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ingredient Packs</Text>
        <Text style={styles.subtitle}>Browse and select packs</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        {SAMPLE_PACKS.map((pack) => (
          <View key={pack.id} style={[styles.packCard, { borderColor: pack.color }]}>
            <View style={styles.packHeader}>
              <View style={[styles.packIcon, { backgroundColor: pack.color }]}>
                <Text style={styles.packIconText}>📦</Text>
              </View>
              <View style={styles.packInfo}>
                <Text style={styles.packName}>{pack.name}</Text>
                <Text style={styles.packCount}>{pack.count} ingredients</Text>
              </View>
            </View>
            <View style={styles.packFooter}>
              <Text style={styles.packButton}>Use Pack</Text>
            </View>
          </View>
        ))}
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
  packCard: {
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
  },
  packHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  packIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  packIconText: {
    fontSize: 24,
  },
  packInfo: {
    flex: 1,
  },
  packName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  packCount: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  packFooter: {
    borderTopWidth: 1,
    borderTopColor: '#2A2A4A',
    paddingTop: 12,
  },
  packButton: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6D5EFC',
    textAlign: 'center',
  },
});
