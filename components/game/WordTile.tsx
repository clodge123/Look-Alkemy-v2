import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { Text } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, interpolateColor } from 'react-native-reanimated';

interface WordTileProps {
  tile: {
    id: string;
    word: string;
    category: string;
  };
  isSelected: boolean;
  onPress: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Style': '#6D5EFC',
  'Lighting': '#FF6B6B',
  'Mood': '#4ECDC4',
  'Texture': '#FFE66D',
  'Lens': '#95E1D3',
  'Palette': '#F38181',
};

export default function WordTile({ tile, isSelected, onPress }: WordTileProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      scale.value,
      [0, 1],
      ['#FFFFFF', CATEGORY_COLORS[tile.category] || '#6D5EFC']
    );

    return {
      transform: [{ scale: scale.value }],
      backgroundColor,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={({ pressed }) => [
        styles.container,
        {
          backgroundColor: isSelected ? CATEGORY_COLORS[tile.category] || '#6D5EFC' : '#FFFFFF',
          borderColor: CATEGORY_COLORS[tile.category] || '#6D5EFC',
          borderWidth: 2,
        },
      ]}
    >
      <Text style={[
        styles.text,
        { color: isSelected ? '#FFFFFF' : '#1A1A2E' }
      ]}>
        {tile.word}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 80,
    alignItems: 'center',
    margin: 4,
  },
  text: {
    fontSize: 13,
    fontWeight: '600',
  },
});
