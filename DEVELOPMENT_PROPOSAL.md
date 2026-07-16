# Look-Alkemy V2 - Development Proposal

## Executive Summary

**Vision:** Transform Look-Alkemy from a social media app into a polished, gamified word/attribute combination experience that's **cost-effective to bootstrap** while maintaining the core value proposition of AI-powered ingredient pack interactions.

**Key Shift:** Remove bandwidth-heavy social media features → Focus on lightweight, interactive game mechanics with vector graphics and smooth animations.

---

## 1. Why V2? The Strategic Pivot

### Problems with V1 (Social Media Approach)
- ❌ **High bandwidth costs** - Images on every timeline scroll
- ❌ **Expensive to bootstrap** - Need user base before monetization
- ❌ **Complex infrastructure** - Storage, CDN, real-time feeds
- ❌ **Slow time-to-value** - Users need content before seeing value

### V2 Advantages (Game-First Approach)
- ✅ **Low bandwidth** - Vector graphics, minimal assets
- ✅ **Immediate value** - Play immediately, no content needed
- ✅ **Bootstrap-friendly** - Can launch with minimal infrastructure
- ✅ **Clearer monetization** - Premium packs, cosmetics, progression

---

## 2. Core Game Concept

### The "Board" Experience

Instead of a social feed, users interact with a **visual game board** where they:

1. **Drag & Drop Word Tiles** - Select ingredients from categories (style, lighting, mood, texture, lens, palette)
2. **Combine & Experiment** - Place tiles in slots to create combinations
3. **See Real-Time Feedback** - Visual feedback shows how embeddings interact
4. **Unlock Discoveries** - Successful combinations unlock new insights/rewards
5. **Build Collections** - Save favorite combinations as "recipes"

### Visual Metaphor
Think: **Board game meets puzzle game** with:
- Clean, vector-based graphics
- Satisfying drag-and-drop physics
- Animated feedback on successful combinations
- Progression system (levels, achievements)

---

## 3. Technology Stack

### Frontend - React Native (Expo)

| Component | Technology | Why |
|-----------|-----------|-----|
| **Core Framework** | Expo SDK 57 + React Native 0.86 | Latest features, best DX |
| **Animation** | React Native Reanimated 4 | CSS-like transitions, 120fps, UI thread |
| **Graphics** | React Native Skia | GPU-accelerated vector graphics, shaders |
| **Icons/Vector** | react-native-svg | Crisp, scalable UI elements |
| **Gesture/Interaction** | react-native-gesture-handler | Smooth drag-and-drop |
| **Navigation** | Expo Router | File-based routing, type-safe |
| **State Management** | Zustand or Jotai | Lightweight, React-friendly |

### Backend - Supabase (Minimal)

| Service | Usage | Cost |
|---------|-------|------|
| **PostgreSQL** | Store packs, user progress, combinations | Free tier (up to 500MB) |
| **Edge Functions** | AI embedding calculations, pack generation | Free tier (100k req/month) |
| **Storage** | Minimal - only pack cover images | Free tier (1GB) |
| **Realtime** | Optional - for multiplayer features | Free tier |

### AI/ML

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Embeddings** | OpenAI text-embedding-3-small | Semantic similarity for word combinations |
| **Generation** | OpenAI gpt-4.1-mini | Generate candidate words, metadata |
| **Local Fallback** | Optional: sentence-transformers | Offline capability |

---

## 4. Architecture Design

### Component Structure

```
look-alkemy-v2/
├── app/
│   ├── (tabs)/
│   │   ├── board.tsx          # Main game board
│   │   ├── packs.tsx          # Browse ingredient packs
│   │   ├── collections.tsx    # Saved combinations
│   │   └── profile.tsx        # Progress, achievements
│   ├── pack-detail.tsx        # Pack editor/viewer
│   ├── combination-result.tsx # Show combination results
│   └── _layout.tsx
├── components/
│   ├── game/
│   │   ├── BoardCanvas.tsx    # Skia-based game board
│   │   ├── WordTile.tsx       # Draggable word tile
│   │   ├── Slot.tsx           # Drop target slot
│   │   ├── ConnectionLine.tsx # Visual connections between tiles
│   │   └── FeedbackEffect.tsx # Success/failure animations
│   ├── ui/
│   │   ├── AnimatedButton.tsx
│   │   ├── ProgressBar.tsx
│   │   └── Modal.tsx
│   └── skia/
│       ├── BackgroundShader.tsx
│       ├── ParticleSystem.tsx
│       └── GlowEffect.tsx
├── hooks/
│   ├── useGameLogic.ts        # Core game mechanics
│   ├── useDragDrop.ts         # Gesture handling
│   └── useEmbeddings.ts       # AI calculations
├── services/
│   ├── supabase.ts
│   ├── ai-service.ts
│   └── pack-service.ts
└── stores/
    ├── game-store.ts          # Game state
    └── user-store.ts          # User progress
```

### Game Board Architecture

```
┌─────────────────────────────────────────────────┐
│                  Game Board                      │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐            │
│  │Tile │  │Tile │  │Slot │  │Slot │  ← Draggable│
│  └─────┘  └─────┘  └─────┘  └─────┘      Tiles │
│                                                   │
│  ┌───────────────────────────────────────┐       │
│  │      Connection Visualization         │       │
│  │   (Skia Canvas with animated lines)   │       │
│  └───────────────────────────────────────┘       │
│                                                   │
│  [Category Filters] [Generate] [Save]            │
└─────────────────────────────────────────────────┘
```

---

## 5. Key Features

### Phase 1: Core Game Mechanics (MVP)

**1. Interactive Game Board**
- Grid-based slot system
- Drag-and-drop word tiles
- Smooth animations (Reanimated 4)
- Visual feedback on drop

**2. Word Tile System**
- 6 categories: style, lighting, mood, texture, lens, palette
- Color-coded by category
- Animated selection/deselection
- Hover/press effects

**3. Combination Engine**
- Real-time embedding calculation
- Visual connection lines between related tiles
- Success/failure feedback
- Score/rating for combinations

**4. Basic Progression**
- Track successful combinations
- Unlock new packs as you progress
- Simple achievement system

### Phase 2: Enhanced Experience

**5. Visual Polish**
- Skia-based particle effects
- Smooth transitions between states
- Dynamic background shaders
- Haptic feedback integration

**6. Pack Management**
- Browse available ingredient packs
- Pack preview before using
- Favorite/follow packs

**7. Collections**
- Save favorite combinations
- Export combination "recipes"
- Share via link (read-only)

### Phase 3: Advanced Features

**8. AI Enhancement**
- Suggest optimal combinations
- Generate new word candidates
- Smart pack recommendations

**9. Multiplayer (Optional)**
- Real-time collaboration
- Compete for best combinations
- Leaderboards

**10. Monetization**
- Premium packs
- Cosmetic upgrades (themes, effects)
- Subscription for advanced features

---

## 6. UI/UX Polish Strategy

### Visual Design Principles

**1. Vector-First Graphics**
- All icons and UI elements as SVG
- Crisp at any resolution
- Minimal file sizes
- Animatable via Skia

**2. Smooth Animations**
- 60-120fps target
- Spring physics for natural feel
- Sequential animations for polish
- No jank or stutter

**3. Color & Typography**
- Dark theme (reduces eye strain)
- Vibrant accent colors for categories
- Consistent spacing system
- Readable fonts throughout

**4. Microinteractions**
- Button press feedback
- Tile snap animations
- Connection line drawing effects
- Success/failure particle bursts

### Animation Library Strategy

```javascript
// Example: Tile Drop Animation
const tileAnimation = useSharedValue(0);

const animatedStyle = useAnimatedStyle(() => {
  return {
    transform: [
      { scale: interpolate(tileAnimation.value, [0, 1], [0.8, 1]) },
      { rotate: `${tileAnimation.value * 5}deg` }
    ],
    opacity: tileAnimation.value
  };
});

// Trigger on drop
const handleDrop = () => {
  withSpring(1, { damping: 12, stiffness: 200 }, () => {
    // Play success effect
    playSuccessEffect();
  });
};
```

### Skia Effects for Polish

```javascript
// Example: Glow Effect on Successful Combination
const GlowEffect = ({ active }) => {
  const shader = useMemo(() => {
    return LinearGradient(
      [0, 0, 1, 0],
      [0, 0, 0, 1],
      [{ color: '#6D5EFC', offset: 0 }, { color: '#00D4FF', offset: 1 }],
      undefined,
      Skia.TileMode.CLAMP
    );
  }, []);

  return (
    <Canvas>
      <Rect
        color={active ? '#6D5EFC' : 'transparent'}
        shader={active ? shader : undefined}
        opacity={active ? 0.3 : 0}
      />
    </Canvas>
  );
};
```

---

## 7. Cost Optimization

### V1 vs V2 Cost Comparison

| Category | V1 (Social) | V2 (Game) | Savings |
|----------|-------------|-----------|---------|
| **Image Storage** | 100GB+ | 1GB | ~99% |
| **Bandwidth** | 500GB+/month | 5GB/month | ~99% |
| **CDN** | Required | Not needed | $50+/month |
| **Database** | Heavy (posts, comments) | Light (packs, combos) | ~80% |
| **Compute** | Image processing | Embedding calc only | ~70% |
| **Monthly Cost** | ~$200-500 | ~$10-20 | ~95% |

### Supabase Free Tier Sufficiency

- **Database:** 500MB (plenty for packs + combinations)
- **Storage:** 1GB (only pack cover images)
- **Bandwidth:** 5GB/month (minimal asset downloads)
- **Edge Functions:** 100k requests/month (embedding calculations)

**Result:** Can launch and operate for **$0-20/month** initially.

---

## 8. Implementation Roadmap

### Week 1-2: Foundation

**Goals:**
- Set up Expo project with TypeScript
- Configure Supabase integration
- Implement basic navigation
- Create core component library

**Deliverables:**
- Working Expo app with tab navigation
- Supabase connection configured
- Basic UI components (Button, Card, Modal)

### Week 3-4: Core Game Mechanics

**Goals:**
- Build interactive game board with Skia
- Implement drag-and-drop tile system
- Create combination engine
- Add basic animations

**Deliverables:**
- Playable game board
- Working drag-and-drop
- Combination calculation
- Success/failure feedback

### Week 5-6: Visual Polish

**Goals:**
- Add particle effects and shaders
- Refine animations (spring physics)
- Implement haptic feedback
- Polish UI/UX details

**Deliverables:**
- Smooth 60fps animations
- Visual feedback effects
- Polished user experience

### Week 7-8: Progression & Packs

**Goals:**
- Implement progression system
- Build pack browsing interface
- Add collection saving
- Create basic achievements

**Deliverables:**
- User progress tracking
- Pack library
- Save/load combinations
- Achievement system

### Week 9-10: Testing & Launch Prep

**Goals:**
- Comprehensive testing
- Performance optimization
- App store preparation
- Analytics integration

**Deliverables:**
- Production-ready app
- App Store/Play Store listings
- Analytics dashboard

---

## 9. Technical Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **Skia performance on older devices** | Medium | Fallback to SVG for simple cases |
| **Embedding API costs** | Medium | Cache results, batch requests |
| **Complex animations causing jank** | High | Profile early, use worklets |
| **Supabase rate limits** | Low | Implement local caching |
| **App size (Skia binary)** | Medium | Tree-shaking, selective imports |

---

## 10. Success Metrics

### Technical Metrics
- **App Size:** < 30MB (with Skia)
- **Load Time:** < 2s to interactive
- **Animation FPS:** 60+ consistently
- **API Response Time:** < 200ms for embeddings

### Business Metrics
- **User Retention:** 40%+ day-7 retention
- **Session Length:** 5-10 minutes average
- **Conversion:** 5%+ to premium features
- **Cost per User:** < $0.10/month

---

## 11. Next Steps

### Immediate Actions
1. ✅ Create Expo project (already done)
2. ⏳ Install dependencies (Skia, Reanimated, etc.)
3. ⏳ Set up Supabase project
4. ⏳ Create component library
5. ⏳ Build game board prototype

### Decision Points
- **Skia vs SVG:** Use Skia for game board, SVG for UI
- **State Management:** Zustand for simplicity
- **Animation Library:** Reanimated 4 (CSS-like syntax)
- **Pack Format:** JSON export from V1 Pack Studio

---

## Conclusion

Look-Alkemy V2 represents a **strategic pivot** from expensive social media to **cost-effective gamified experience**. By leveraging:

- **React Native + Expo** for cross-platform development
- **Skia + Reanimated 4** for polished, performant graphics
- **Supabase** for minimal backend infrastructure
- **Vector graphics** for crisp, lightweight visuals

We can build a **high-quality, engaging product** that:
- Costs **< $20/month** to operate initially
- Provides **immediate value** to users
- Scales **efficiently** with growth
- Maintains **flexibility** for future features

**Ready to build!** 🚀
