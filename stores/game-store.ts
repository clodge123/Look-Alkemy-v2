import { create } from 'zustand';

// Sample word data for each category
const WORD_DATABASE: Record<string, string[]> = {
  style: ['Minimalist', 'Abstract', 'Geometric', 'Organic', 'Vintage', 'Futuristic', 'Rustic', 'Modern'],
  lighting: ['Natural', 'Dramatic', 'Soft', 'Neon', 'Golden Hour', 'Cinematic', 'Studio', 'Ambient'],
  mood: ['Peaceful', 'Energetic', 'Mysterious', 'Romantic', 'Dark', 'Cheerful', 'Melancholic', 'Ethereal'],
  texture: ['Smooth', 'Rough', 'Glassy', 'Metallic', 'Fabric', 'Wooden', 'Stone', 'Watercolor'],
  lens: ['Wide Angle', 'Telephoto', 'Macro', 'Fisheye', 'Portrait', 'Bird\'s Eye', 'Fish Scale', 'Bokeh'],
  palette: ['Warm', 'Cool', 'Monochrome', 'Vibrant', 'Pastel', 'Earth Tones', 'Neon', 'Sepia'],
};

interface Tile {
  id: string;
  text: string;
  category: string;
}

interface GameStore {
  // State
  selectedTiles: (string | null)[];
  availableTiles: string[];
  currentPack: string | null;
  combinationHistory: any[];
  
  // Actions
  addToSlot: (index: number, tile: { text: string; category: string }) => void;
  removeFromSlot: (index: number) => void;
  clearSlots: () => void;
  setAvailableTiles: (tiles: string[]) => void;
  setCurrentPack: (packId: string) => void;
  testCombination: (tiles: string[]) => { success: boolean; score?: number; message?: string };
  saveCombination: (tiles: string[], score: number) => void;
  resetGame: () => void;
}

export const useGameStore = create<GameStore>((set, get) => ({
  // Initial State
  selectedTiles: [null, null, null, null],
  availableTiles: [],
  currentPack: null,
  combinationHistory: [],

  // Add tile to slot
  addToSlot: (index, tile) => {
    set((state) => {
      const newSelectedTiles = [...state.selectedTiles];
      newSelectedTiles[index] = tile.text;
      return { selectedTiles: newSelectedTiles };
    });
  },

  // Remove tile from slot
  removeFromSlot: (index) => {
    set((state) => {
      const newSelectedTiles = [...state.selectedTiles];
      newSelectedTiles[index] = null;
      return { selectedTiles: newSelectedTiles };
    });
  },

  // Clear all slots
  clearSlots: () => {
    set({ selectedTiles: [null, null, null, null] });
  },

  // Set available tiles from a pack
  setAvailableTiles: (tiles) => {
    set({ availableTiles: tiles });
  },

  // Set current pack
  setCurrentPack: (packId) => {
    set({ currentPack: packId });
  },

  // Test combination - simplified version
  testCombination: (tiles: string[]) => {
    const { selectedTiles } = get();
    const filledSlots = selectedTiles.filter((t): t is string => t !== null);
    
    if (filledSlots.length < 2) {
      return { success: false, message: 'Need at least 2 tiles' };
    }

    // Simple scoring based on category diversity
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
    
    return {
      success,
      score: totalScore,
      message: success 
        ? `Excellent combination! Diversity: ${diversityScore}/6 categories`
        : 'Try mixing different categories for better results',
    };
  },

  // Save combination
  saveCombination: (tiles, score) => {
    set((state) => ({
      combinationHistory: [
        { tiles, score, timestamp: Date.now() },
        ...state.combinationHistory,
      ],
    }));
  },

  // Reset game
  resetGame: () => {
    set({
      selectedTiles: [null, null, null, null],
      availableTiles: [],
      currentPack: null,
    });
  },
}));

// Initialize with sample data
if (typeof window !== 'undefined') {
  const allTiles = Object.values(WORD_DATABASE).flat();
  useGameStore.getState().setAvailableTiles(allTiles);
}
