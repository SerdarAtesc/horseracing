# 🐎 Horse Racing Tournament

A dynamic horse racing simulation game built with Vue 3, TypeScript, and Vuex. Watch 20 unique horses compete in a 6-round tournament with realistic racing mechanics and beautiful animations.

## ✨ Features

- **20 Unique Horses**: Each horse has distinct characteristics, colors, and performance stats
- **6-Round Tournament**: Progressive racing with increasing distances (1200m - 2200m)
- **Real-time Animation**: Watch horses race across the track with smooth animations
- **Detailed Results**: Comprehensive race results with times and positions
- **Responsive Design**: Beautiful UI that works on all devices
- **TypeScript**: Full type safety throughout the application
- **Comprehensive Testing**: Unit tests and E2E tests with Cypress

## 🛠️ Tech Stack

- **Frontend**: Vue 3 (Composition API)
- **State Management**: Vuex 4
- **Language**: TypeScript
- **Build Tool**: Vite
- **Testing**: Vitest + Cypress
- **Styling**: CSS3 with modern features

## 🎮 How to Play

1. **Generate Horses**: 20 unique horses are automatically generated when you load the game
2. **Create Schedule**: Click "Generate Schedule" to create a 6-round tournament
3. **Start Tournament**: Click "Start Tournament" to begin the races
4. **Watch & Enjoy**: Watch the horses race and see the results unfold
5. **View Results**: Click on each round to see detailed race results

## 🏗️ Project Structure

```
src/
├── components/
│   ├── atoms/           # Basic UI components
│   ├── molecules/       # Composite components
│   ├── HorseList.vue    # Horse display component
│   ├── RaceTrack.vue    # Main racing interface
│   └── RaceResults.vue  # Results display
├── composables/
│   └── useRaceGame.ts   # Game logic composable
├── store/
│   ├── actions.ts       # Vuex actions
│   ├── getters.ts       # Vuex getters
│   ├── mutations.ts     # Vuex mutations
│   └── state.ts         # Application state
├── types/
│   └── index.ts         # TypeScript type definitions
└── assets/              # Static assets
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e

# Type checking
npm run type-check
```

## 🎯 Key Features Explained

### Horse Generation
- Each horse has unique characteristics (condition, color, name)
- Colors are generated using HSL for visual distinction
- Performance varies based on condition stats

### Racing Mechanics
- Realistic race times based on distance and horse condition
- Random factors add unpredictability
- Progressive tournament structure

### Animation System
- Smooth CSS transitions for horse movement
- Real-time position updates during races
- Visual feedback for race progress

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
npm run type-check   # TypeScript type checking
```