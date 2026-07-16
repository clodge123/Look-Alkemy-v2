import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
        <Text style={styles.subtitle}>Your progress and achievements</Text>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Combinations</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Collections</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>0</Text>
            <Text style={styles.statLabel}>Discoveries</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>🏆</View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>First Combination</Text>
              <Text style={styles.achievementDesc}>Create your first combination</Text>
            </View>
            <View style={styles.achievementLocked}>
              <Text style={styles.lockedText}>🔒</Text>
            </View>
          </View>
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>⭐</View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>Collector</Text>
              <Text style={styles.achievementDesc}>Save 5 combinations</Text>
            </View>
            <View style={styles.achievementLocked}>
              <Text style={styles.lockedText}>🔒</Text>
            </View>
          </View>
          <View style={styles.achievementCard}>
            <View style={styles.achievementIcon}>🎯</View>
            <View style={styles.achievementInfo}>
              <Text style={styles.achievementName}>Master Creator</Text>
              <Text style={styles.achievementDesc}>Create 50 combinations</Text>
            </View>
            <View style={styles.achievementLocked}>
              <Text style={styles.lockedText}>🔒</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Text style={styles.settingValue}>On</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Theme</Text>
            <Text style={styles.settingValue}>Dark</Text>
          </View>
        </View>
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6D5EFC',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  achievementCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  achievementIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  achievementDesc: {
    fontSize: 14,
    color: '#A0A0A0',
  },
  achievementLocked: {
    paddingLeft: 8,
  },
  lockedText: {
    fontSize: 18,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  settingLabel: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  settingValue: {
    fontSize: 16,
    color: '#6D5EFC',
    fontWeight: '600',
  },
});
