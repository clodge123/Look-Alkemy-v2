import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface SlotProps {
  tile: string | null;
  onPress: () => void;
  index: number;
}

const SLOT_COLORS = ['#6D5EFC', '#00D4FF', '#FF6B9D', '#FFB84D'];

export default function Slot({ tile, onPress, index }: SlotProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
    onPress();
  };

  return (
    <View style={[styles.container, { marginHorizontal: 8 }]}>
      <View style={[styles.slot, { borderColor: SLOT_COLORS[index] }]}>
        {tile ? (
          <View style={[styles.tile, { backgroundColor: SLOT_COLORS[index] }]}>
            <Text style={styles.tileText}>{tile}</Text>
          </View>
        ) : (
          <View style={styles.emptySlot}>
            <Ionicons name="add" size={32} color="rgba(255,255,255,0.3)" />
          </View>
        )}
      </View>
      <Text style={[styles.slotNumber, { color: SLOT_COLORS[index] }]}>
        {index + 1}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  slot: {
    width: 110,
    height: 110,
    borderWidth: 3,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  tile: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  tileText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
  emptySlot: {
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  slotNumber: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 8,
  },
});
