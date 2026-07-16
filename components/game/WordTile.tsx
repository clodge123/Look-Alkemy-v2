import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useAnimatedStyle, useSharedValue, withSpring, withSequence, withTiming } from 'react-native-reanimated';

interface WordTileProps {
  word: string;
  category?: string;
  onPress: () => void;
  style?: any;
}

const CATEGORY_COLORS: Record<string, string> = {
  style: '#6D5EFC',
  lighting: '#00D4FF',
  mood: '#FF6B9D',
  texture: '#FFB84D',
  lens: '#9D4EDD',
  palette: '#00F5D4',
};

export default function WordTile({ word, category = 'style', onPress, style }: WordTileProps) {
  const scale = useSharedValue(1);
  const color = CATEGORY_COLORS[category] || '#6D5EFC';

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
    <TouchableOpacity
      style={[styles.container, style]}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
    >
      <Animated.View style={[styles.tile, { borderColor: color }, animatedStyle]}>
        <Text style={[styles.text, { color }]}>{word}</Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 4,
  },
  tile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
    borderRadius: 12,
    margin: 4,
  },
  text: {
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 8,
  },
});
