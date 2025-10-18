# Visual Music Discovery Map

A modern, interactive web application that helps users discover similar artists and songs through an intuitive visual map interface. The closer items appear on the map, the more similar they are, making music discovery natural and engaging.

---

## 📋 Product Specification

### Core Concept
Users can explore music through a visual force-directed graph where artists and songs are positioned based on similarity. Distance equals similarity—closer nodes indicate higher compatibility with user preferences.

### Key Features

#### Phase 1: Core Discovery
- **Artist/Song Search**: Type any artist or song name to see it visualized on the map
- **Similarity Visualization**: Proximity-based layout shows similar music nearby
- **Interactive Exploration**: Click nodes to discover more similar artists/songs
- **"Surprise Me" Feature**: Discover new artists from adjacent genres (controlled exploration)

#### Phase 2: Personalization
- **Spotify Integration**: Connect Spotify account or paste profile link (no login required for paste)
- **Personal Music Map**: Visualize your own listening habits
- **Diversity Metrics**: See how diverse or focused your music taste is
- **Recommendations**: Get personalized suggestions for how to diversify your music taste based on your map

### User Flows

1. **Discovery Flow**
   - User enters artist/song name
   - Map displays the item with similar artists/songs nearby
   - User clicks nodes to explore deeper
   - "Surprise Me" suggests something different but compatible

2. **Personal Map Flow** (Future)
   - User connects Spotify or pastes profile link
   - System analyzes listening history
   - Generates personalized visual map
   - Shows diversity score and clusters

---

## 🎨 Design Approach

### Visualization Strategy
- **Force-Directed Graph**: Nodes (artists/songs) that attract/repel based on similarity scores
- **Interactive Nodes**: 
  - Size indicates popularity
  - Color indicates genre
  - Hover shows details
  - Click to expand connections
  
### UI/UX Principles
- **Minimal Interface**: Clean search bar, floating "Surprise Me" button
- **Smooth Animations**: Transitions when nodes are added/removed
- **Responsive Design**: Works on desktop and mobile browser
- **Visual Hierarchy**: Focus on the map, supporting UI elements are subtle

### Color & Style
- **Dark Mode First**: Works well for visualization
- **Genre Colors**: Distinct palette for different genres
- **Glassmorphism**: Modern, clean aesthetic for UI cards
- **Smooth Edges**: Rounded corners, soft shadows

---

## 🛠 Technology Stack

### Frontend
- **React** - UI framework
- **Zustand** - State management (centralized, simple)
- **React Flow** - Graph visualization (easy to use, performant)
- **Tailwind CSS v3** - Styling (rapid development)

### Backend
- **Node.js + Express** - API server (simple, lightweight)
- **Axios** - HTTP client for Spotify API

### Data & APIs
- **Mock Data** (Milestone 1) - Start with sample artist data
- **Spotify Web API** (Milestone 2+) - Real music data and similarity

### Development Tools
- **Vite** - Fast build tool
- **Vitest** - Unit testing
- **ESLint + Prettier** - Code quality
- **Git** - Version control

---

## 🎯 Development Milestones

### Milestone 1: MVP - Basic Music Map ✅
**Goal**: Get a working visual map with mock data

**Features**:
- Search bar for artist names
- Basic force-directed graph visualization
- 5-10 mock artists with similarity relationships
- Click to view artist details
- Responsive layout

**Deliverables**:
- React app with Zustand state management
- React Flow graph component
- Mock data model for artists
- Basic search functionality
- Component library (SearchBar, ArtistNode, MapCanvas)

**Testing**: Ensure search works, nodes are clickable, layout is responsive

---

### Milestone 2: Spotify API Integration 🎵
**Goal**: Replace mock data with real Spotify data

**Features**:
- Connect to Spotify Web API
- Search real artists and songs
- Fetch similar artists using Spotify's recommendations
- Display real album artwork and metadata
- Handle API rate limiting

**Deliverables**:
- Express backend with Spotify API proxy
- API key management (use Replit secrets)
- Artist/song data fetching service
- Similarity calculation based on Spotify features
- Error handling for API failures

**Testing**: Test API integration, handle edge cases, verify similarity accuracy

---

### Milestone 3: "Surprise Me" Feature 🎲
**Goal**: Intelligent genre exploration

**Features**:
- "Surprise Me" button with genre distance algorithm
- Controlled randomness (1-2 genres away from current selection)
- Show the "journey" from current to suggested artist
- Save/bookmark surprising discoveries

**Deliverables**:
- Genre classification system
- Distance calculation algorithm (genre proximity)
- Surprise recommendation engine
- Visual path showing the connection
- Favorites/bookmark functionality

**Testing**: Verify surprises are relevant, not too far from user taste

---

### Milestone 4: Spotify Profile Integration 🔗
**Goal**: Personalized music maps

**Features**:
- Option 1: OAuth Spotify login (secure, full access)
- Option 2: Paste Spotify profile link (no login, limited data)
- Fetch user's top artists and tracks
- Generate personalized visual map
- Show listening patterns and clusters

**Deliverables**:
- Spotify OAuth flow (using Replit integration)
- Profile link parser (fallback option)
- User data fetching and processing
- Personal map generation algorithm
- User preference storage

**Testing**: Test both auth methods, ensure data privacy, verify map accuracy

---

### Milestone 5: Diversity Analytics 📊
**Goal**: Music taste insights and metrics

**Features**:
- Diversity score (how varied is your taste?)
- Genre distribution chart
- Temporal analysis (how taste evolved)
- Cluster identification (your "music islands")
- Shareable map visualization with others

**Deliverables**:
- Analytics calculation engine
- Recharts integration for data viz
- Diversity metrics dashboard
- Share/export functionality
- Visual summary card

**Testing**: Validate metrics, ensure visualizations are clear and accurate

---

## 💡 Development Best Practices

### Code Quality Standards

#### 1. Testing Strategy
- **Unit Tests**: Write tests for each component and utility function
- **Integration Tests**: Test API interactions and data flow
- **Visual Tests**: Verify UI components render correctly
- **Test Coverage Goal**: Aim for 80%+ coverage
- **Test Before Deploy**: All tests must pass before milestone completion

#### 2. Git Workflow
- **Descriptive Commits**: Use conventional commits format
  - `feat: add artist search functionality`
  - `fix: resolve node positioning bug`
  - `test: add unit tests for similarity algorithm`
- **Branch Strategy**: `main` → `develop` → feature branches
- **Small, Focused Commits**: One logical change per commit
- **PR Reviews**: Review code before merging to main

#### 3. Code Organization
- **Follow Existing Patterns**: Maintain consistent code structure
- **Component Library**: Reusable components in `/src/components`
- **Custom Hooks**: Extract logic into reusable hooks
- **Constants**: Keep magic numbers in `/src/constants`
- **Types**: Define TypeScript interfaces in `/src/types`

#### 4. State Management
- **Centralized State**: Use Zustand store, not component state
- **Single Source of Truth**: All app state in one place
- **Immutable Updates**: Never mutate state directly
- **Clear Actions**: Well-named action functions

#### 5. Performance
- **Lazy Loading**: Code-split routes and heavy components
- **Memoization**: Use React.memo and useMemo for expensive operations
- **Debounce Search**: Avoid excessive API calls
- **Optimize Renders**: Minimize unnecessary re-renders

#### 6. Security
- **API Keys in Secrets**: Never commit keys to git
- **Use Replit Integrations**: Manage Spotify credentials securely
- **Sanitize Inputs**: Validate all user input
- **HTTPS Only**: Ensure secure connections

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- Spotify Developer Account (for API access in Milestone 2)
- Replit account (recommended for deployment)

### Initial Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

### Environment Variables
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### Testing Incrementally
- **After Each Feature**: Test the new functionality
- **After Each Milestone**: Full regression testing
- **Before Deployment**: Test on production build

---

## 📂 Project Structure

```
music-map/
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── store/           # Zustand state management
│   ├── services/        # API services
│   ├── utils/           # Helper functions
│   ├── types/           # TypeScript types
│   ├── constants/       # App constants
│   └── App.tsx          # Main app component
├── server/              # Express backend
│   ├── routes/          # API routes
│   └── services/        # Spotify integration
├── tests/               # Test files
├── public/              # Static assets
└── README.md            # This file
```

---

## 🎵 Data Model

### Artist Node
```typescript
interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  imageUrl: string;
  spotifyUrl: string;
  similarArtists: string[]; // Array of artist IDs
}
```

### Map State
```typescript
interface MapState {
  nodes: Artist[];
  selectedNode: string | null;
  searchQuery: string;
  surpriseMode: boolean;
}
```

---

## 📝 Notes

- **Start Simple**: Use mock data to get the visualization working first
- **Iterate Quickly**: Test each feature before moving to the next
- **User Feedback**: Get feedback after each milestone
- **Keep It Visual**: The map is the star—keep UI minimal and focused
- **Have Fun**: Music discovery should be joyful and intuitive!

---

## 🔮 Future Enhancements
- Collaborative playlists from map exploration
- Social features (share maps with friends)
- Music mood/vibe filtering
- Time-based music evolution visualization
- Integration with other music services (Apple Music, YouTube Music)
