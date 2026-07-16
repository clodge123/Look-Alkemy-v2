import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface SlotProps {
  index: number;
  tile: {
    id: string;
    word: string;
    category: string;
  } | null;
  isActive: boolean;
  onDrop: () => void;
}

export default function Slot({ index, tile, isActive, onDrop }: SlotProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: isActive ? 0.8 : 1,
    };
  });

  const handlePress = () => {
    scale.value = withSpring(0.9, { damping: 12, stiffness: 300 }, () => {
      scale.value = withSpring(1, { damping: 12, stiffness: 300 });
    });
    onDrop();
  };

  return (
    <View style={styles.slotContainer}>
      <View 
        style={[
          styles.slot,
          { 
            borderColor: tile ? '#6D5EFC' : '#2A2A4A',
            backgroundColor: tile ? 'rgba(109, 94, 252, 0.1)' : 'transparent',
          }
        ]}
        onTouchStart={handlePress}
      >
        {tile ? (
          <View style={styles.tileContainer}>
            <Text style={styles.tileText}>{tile.word}</Text>
            <Text style={styles.tileCategory}>{tile.category}</Text>
          </View>
        ) : (
          <Text style={styles.emptyText}>Slot {index + 1}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slotContainer: {
    width: '23%',
    aspectRatio: 1,
  },
  slot: {
    flex: 1,
    borderRadius: 12,
    borderWidth: 2,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  tileContainer: {
    alignItems: 'center',
  },
  tileText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6D5EFC',
    marginBottom: 4,
  },
  tileCategory: {
    fontSize: 10,
    color: '#A0A0A0',
    textTransform: 'uppercase',
  },
  emptyText: {
    fontSize: 14,
    color: '#4A4A6A',
    fontWeight: '500',
  },
});
