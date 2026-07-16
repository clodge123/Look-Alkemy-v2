import { create } from 'zustand';

interface GameStore {
  // Selected tile IDs
  selectedTiles: string[];
  
  // Active slot index
  activeSlot: number | null;
  
  // Combinations (saved successful combinations)
  combinations: Combination[];
  
  // Actions
  addToSelection: (tileId: string) => void;
  removeFromSelection: (tileId: string) => void;
  clearSelection: () => void;
  setActiveSlot: (slotIndex: number | null) => void;
  saveCombination: (combination: Omit<Combination, 'id' | 'timestamp'>) => void;
  resetGame: () => void;
}

interface Combination {
  id: string;
  tileIds: string[];
  score: number;
  timestamp: Date;
}

export const useGameStore = create<GameStore>((set) => ({
  selectedTiles: [],
  activeSlot: null,
  combinations: [],

  addToSelection: (tileId) =>
    set((state) => ({
      selectedTiles: [...state.selectedTiles, tileId],
    })),

  removeFromSelection: (tileId) =>
    set((state) => ({
      selectedTiles: state.selectedTiles.filter((id) => id !== tileId),
    })),

  clearSelection: () => set({ selectedTiles: [] }),

  setActiveSlot: (slotIndex) => set({ activeSlot: slotIndex }),

  saveCombination: (combination) =>
    set((state) => ({
      combinations: [
        ...state.combinations,
        {
          ...combination,
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date(),
        },
      ],
    })),

  resetGame: () =>
    set({
      selectedTiles: [],
      activeSlot: null,
    }),
}));
