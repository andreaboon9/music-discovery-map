# Visual Music Discovery Map

A modern, interactive web application that helps users discover similar artists through an intuitive visual map interface. The closer artists appear on the map, the more similar they are, making music discovery natural and engaging.

---

## 📋 Product Specification

### Core Concept
Users can explore music through a visual force-directed graph where artists are positioned based on similarity. Distance equals similarity—closer nodes indicate higher compatibility with user preferences.

### Key Features

#### Phase 1: Artist Discovery (✅ Complete)
- **Artist Search**: Type any artist name to see it visualized on the map with real Spotify data
- **Proximity-Based Visualization**: Related artists orbit around the searched artist based on genre similarity
- **Interactive Exploration**: Click any artist to view their top 3 songs with monthly listener counts
- **Real-time Data**: Direct integration with Spotify Web API for artist details, genres, popularity, and top tracks
- **Clean UI**: Spotify-branded dark theme (#191414 black, #1DB954 green) with dismissible "How it works" banner
- **Mobile-Responsive**: Works seamlessly on desktop and mobile browsers

#### Phase 2: Core Discovery
- **Song Search**: Type any song name to see it visualized on the map
- **Similarity Visualization**: Proximity-based layout shows similar music nearby
- **Interactive Exploration**: Click nodes to discover more similar songs
- **"Surprise Me" Feature**: Discover new artists from adjacent genres (controlled exploration)

#### Phase 3: Personalization
- **Spotify Integration**: Connect Spotify account or paste profile link (no login required for paste)
- **Personal Music Map**: Visualize your own listening habits
- **Diversity Metrics**: See how diverse or focused your music taste is
- **Recommendations**: Get personalized suggestions for how to diversify your music taste based on your map
- **30-Second Previews**: Click any artist node on the map to play a 30-second preview of their top track

### User Flows

1. **Discovery Flow** (Current)
   - User enters artist name
   - Map displays the artist at center with similar artists orbiting nearby
   - User clicks any artist to view their top 3 songs
   - Clean, minimal interface with dismissible helper banner

2. **Enhanced Discovery Flow** (Phase 2)
   - User enters song or artist name
   - "Surprise Me" suggests something different but compatible
   - User explores deeper connections through interactive nodes

3. **Personal Map Flow** (Phase 3)
   - User connects Spotify or pastes profile link
   - System analyzes listening history
   - Generates personalized visual map
   - Shows diversity score and clusters
   - Click artist nodes to play 30-second preview of top track

---

## Design Approach

### Visualization Strategy
- **Force-Directed Graph**: Center artist positioned at (0, 0) with related artists orbiting based on similarity
- **Interactive Nodes**: 
  - Size indicates popularity
  - Color-coded genre tags
  - Hover shows artist details
  - Click to view top songs in detail panel
  
### UI/UX Principles
- **Minimal Interface**: Centered search bar that moves to top when artists load
- **Spotify Branding**: Official dark mode colors (#191414 background, #1DB954 accents)
- **Smooth Animations**: Transitions when artists appear and search bar repositions
- **Responsive Design**: Works on desktop and mobile browsers
- **Visual Hierarchy**: Focus on the map, supporting UI elements are subtle
- **Frictionless**: No unnecessary controls or clutter (removed zoom buttons and attribution)

### Color & Style
- **Spotify Dark Mode**: Black (#191414) background with green (#1DB954) accents
- **Genre Tags**: Green pill-shaped badges for genres
- **Glassmorphism**: Semi-transparent backgrounds with backdrop blur for UI cards
- **Smooth Edges**: Rounded corners, soft shadows

---

## Technology Stack

### Frontend
- **React 18** - UI framework
- **Zustand** - State management (centralized, simple)
- **ReactFlow** - Graph visualization (minimal UI, custom nodes)
- **Tailwind CSS v3** - Styling (utility-first)
- **Axios** - HTTP client for API communication

### Backend
- **Node.js + Express** - API server (port 3001)
- **TypeScript** - Type safety with tsx runtime
- **Spotify Web API** - Artist data, top tracks, search

### Data & APIs
- **Spotify Web API** - Real music data
  - Client Credentials authentication flow
  - Artist search endpoint
  - Artist details endpoint
  - Top tracks endpoint
  - Genre-based similar artist discovery (workaround for Related Artists API limitations)

### Development Tools
- **Vite** - Fast build tool with HMR
- **Vitest** - Unit testing
- **Git** - Version control
- **Replit Secrets** - Secure API credential management

---

## Development Milestones

### Milestone 1: Artist Discovery with Spotify Integration ✅ **COMPLETE**
**Goal**: Working visual map with real Spotify data

**Completed Features**:
- Artist search with real-time Spotify API integration
- Proximity-based graph visualization with ReactFlow
- Click to view artist details and top 3 songs
- Responsive layout with Spotify branding
- Express backend API proxy (port 3001)
- Genre-based similar artist discovery
- Mobile-responsive search interface
- Dismissible "How it works" helper banner
- Clean UI with no unnecessary controls

**Tech Stack**:
- React 18 with TypeScript
- Zustand state management
- ReactFlow for visualization
- Express backend with Spotify API
- Vite dev server with proper Replit configuration

**Current State**: Fully functional artist discovery app with real Spotify data

---

### Milestone 2: Song Search & "Surprise Me" 🎵
**Goal**: Expand discovery with song search and intelligent recommendations

**Planned Features**:
- Search by song name (in addition to artist)
- Display songs as nodes with artist connections
- "Surprise Me" button with genre distance algorithm
- Controlled randomness (1-2 genres away from current selection)
- Show the "journey" from current to suggested artist/song
- Save/bookmark surprising discoveries

**Deliverables**:
- Song search API integration
- Song node visualization component
- Genre classification and distance system
- Surprise recommendation engine
- Visual path showing connections
- Favorites/bookmark functionality

**Testing**: Verify surprises are relevant, not too far from user taste

---

### Milestone 3: Personal Spotify Integration 🔗
**Goal**: Personalized music maps from user data with audio previews

**Planned Features**:
- Option 1: OAuth Spotify login (secure, full access)
- Option 2: Paste Spotify profile link (no login, limited data)
- Fetch user's top artists and tracks
- Generate personalized visual map
- Show listening patterns and clusters
- 30-second audio preview playback when clicking artist nodes

**Deliverables**:
- Spotify OAuth flow (using Replit integration)
- Profile link parser (fallback option)
- User data fetching and processing
- Personal map generation algorithm
- User preference storage
- Audio player component with 30-second preview support
- Track preview URL integration from Spotify API

**Testing**: Test both auth methods, ensure data privacy, verify map accuracy, test audio playback across browsers

---

### Milestone 4: Diversity Analytics 📊
**Goal**: Music taste insights and metrics

**Planned Features**:
- Diversity score (how varied is your taste?)
- Genre distribution chart
- Temporal analysis (how taste evolved)
- Cluster identification (your "music islands")
- Shareable map visualization

**Deliverables**:
- Analytics calculation engine
- Data visualization components
- Diversity metrics dashboard
- Share/export functionality
- Visual summary card

**Testing**: Validate metrics, ensure visualizations are clear and accurate

---

## Development Best Practices

### Code Quality Standards

#### 1. Component Organization
- **Component Library Pattern**: Reusable components in `/src/components`
  - `SearchBar` - Artist search with magnifying glass icon
  - `LandingDescription` - Onboarding text for empty state
  - `InfoBanner` - Dismissible helper banner with localStorage persistence
  - `MapCanvas` - ReactFlow wrapper for graph visualization
  - `ArtistNode` - Custom node component
  - `ArtistDetails` - Selected artist information panel
  - `Logo` - Network graph SVG in Spotify green

#### 2. State Management
- **Zustand Store**: Single source of truth (`useMapStore`)
- **Individual Selectors**: Prevent unnecessary re-renders
- **No Component-Level State**: All artist data in centralized store
- **Clear Actions**: Well-named functions for state updates

#### 3. Replit-Specific Configuration
- **Vite Config**: `allowedHosts: true` for dynamic Replit hostnames
- **No HMR Override**: Let Vite auto-detect host (DO NOT set `hmr.host` to localhost)
- **Component Positioning**: Managed by parent (App.tsx) to prevent unmount/remount issues
- **SearchBar Strategy**: Stays mounted with CSS position changes only

#### 4. Security
- **API Keys in Secrets**: Using Replit Secrets for `SPOTIFY_CLIENT_ID` and `SPOTIFY_CLIENT_SECRET`
- **Backend Proxy**: Frontend never touches API credentials
- **Client Credentials Flow**: No user authentication required for basic discovery

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- Spotify Developer Account (for API access)
- Replit account (recommended for deployment)

### Environment Variables
Set these in Replit Secrets:
```
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
```

### Running the App
The app uses two workflows:
- **Backend** (port 3001): Express API server with Spotify integration
- **Server** (port 5000): Vite frontend dev server

Both start automatically in Replit. Access the app at the Replit preview URL.

---

## 📂 Project Structure

```
music-map/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── SearchBar.tsx
│   │   ├── LandingDescription.tsx
│   │   ├── InfoBanner.tsx
│   │   ├── MapCanvas.tsx
│   │   ├── ArtistNode.tsx
│   │   ├── ArtistDetails.tsx
│   │   └── Logo.tsx
│   ├── store/           # Zustand state management
│   │   └── useMapStore.ts
│   ├── services/        # API services
│   │   └── api.ts
│   ├── types/           # TypeScript types
│   │   └── index.ts
│   └── App.tsx          # Main app component
├── server/              # Express backend
│   ├── routes/          # API routes
│   │   └── artists.ts
│   ├── services/        # Spotify integration
│   │   └── spotify.ts
│   └── index.ts         # Server entry point
├── public/              # Static assets
├── vite.config.ts       # Vite configuration
├── replit.md            # Technical architecture docs
└── README.md            # This file
```

---

## Data Model

### Artist Node
```typescript
interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number; // 0-100
  imageUrl: string;
  spotifyUrl: string;
  similarArtists: string[]; // Array of artist IDs
  topSongs: { 
    name: string; 
    monthlyListeners: number;
  }[];
}
```

### Map State
```typescript
interface MapState {
  nodes: Artist[];
  selectedNode: string | null;
  centerArtistId: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  // Actions
  addNode: (artist: Artist) => void;
  selectNode: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  searchArtist: (name: string) => Promise<void>;
  clearError: () => void;
}
```

---

## API Endpoints

### Backend API (port 3001)

**Search Artists**
```
GET /api/artists/search?q={query}
```
Returns array of artist search results from Spotify.

**Get Artist with Related Artists**
```
GET /api/artists/:id
```
Returns artist details with top 3 songs and related artists (with their top 3 songs).

---

## Technical Notes

### Spotify API Workaround
- **Challenge**: Spotify's Related Artists endpoint requires Extended Access after May 2025 changes
- **Solution**: Genre-based artist discovery using curated lists of well-known artists per genre
- **Implementation**: Search for popular artists in matching genres, rank by genre overlap and popularity

### Critical Configuration
- **Vite HMR**: Auto-configured for Replit (no localhost override)
- **Component Lifecycle**: SearchBar never unmounts to preserve user input
- **ReactFlow Controls**: Removed for minimal UI (users can still zoom/pan with gestures)

---

## Future Enhancements
- Song-level search and visualization
- "Surprise Me" feature for serendipitous discovery
- Personal Spotify integration with OAuth
- Diversity metrics and analytics
- Collaborative playlists from map exploration
- Social features (share maps with friends)
- Music mood/vibe filtering
- Time-based music evolution visualization
- Integration with other music services (Apple Music, YouTube Music)

---

## License
This project is for educational and demonstration purposes.
