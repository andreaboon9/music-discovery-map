# Music Discovery Map

## Overview

An interactive web application that visualizes music discovery through a force-directed graph interface. Users can search for artists and explore similar artists through proximity-based visualization, where spatial distance represents musical similarity. The application displays artists as nodes in an interactive map, with closer nodes indicating higher musical similarity.

## User Preferences

Preferred communication style: Simple, everyday language.

### Development Workflow
- Always define data models before implementation
- Start with mock data instead of database integration
- Present implementation plans before writing code
- Build reusable component libraries
- Implement centralized state management (avoid component-level state storage)
- Proactively identify conflicts or issues
- Batch implementations into smaller, focused chunks
- Verify file changes when uncertain
- Reference the PRD (README.md) for overall project direction

### When Encountering Errors
1. Determine available solutions
2. Prioritize solutions by probability of success
3. Present the solution and ask before implementing

### When Asked to Fix Issues
1. Do not write code immediately
2. Provide analysis of the problem and resolution plan
3. Request approval before implementing

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: TailwindCSS with PostCSS for utility-first styling
- **Visualization**: ReactFlow library for interactive force-directed graph rendering
- **State Management**: Zustand for centralized application state
- **HTTP Client**: Axios for external API communication

### Component Structure
- **Component Library Pattern**: Reusable components organized in `/src/components/`
  - `SearchBar`: Artist search input interface with magnifying glass icon, conditional centering (center when empty, top when artists loaded), mobile-responsive
  - `LandingDescription`: Onboarding text displayed below search bar in empty state, explains app purpose and interaction
  - `InfoBanner`: Dismissible helper banner shown when artists load, persists dismissal via localStorage
  - `MapCanvas`: ReactFlow canvas wrapper for graph visualization
  - `ArtistNode`: Custom node component for artist visualization
  - `ArtistDetails`: Selected artist information panel
- **Custom Node Types**: ReactFlow custom node implementation for artist representation with dynamic sizing based on popularity

### State Management
- **Zustand Store** (`useMapStore`): Single source of truth for application state
  - Manages artist nodes collection
  - Tracks selected node state
  - Handles search queries
  - Provides actions for node manipulation and search

### Data Model
```typescript
Artist {
  id: string
  name: string
  genres: string[]
  popularity: number (0-100)
  imageUrl: string
  spotifyUrl: string
  similarArtists: string[] (references to other artist IDs)
  topSongs: { name: string; monthlyListeners: number }[]
}

MapState {
  nodes: Artist[]
  selectedNode: string | null
  centerArtistId: string | null (the anchor artist at the center of the map)
  searchQuery: string
  + state management actions
}
```

### Visualization Strategy
- **Proximity-Based Layout**: Center artist positioned at the center (0, 0), related artists orbit around based on similarity
- **Initial State**: Empty canvas with search bar, prompting user to search for an artist
- **After Search**: 
  - Searched artist appears in center as the "anchor" artist
  - Related artists (from Spotify's Related Artists API) positioned in circular orbit around center
  - Distance from center indicates similarity: closer = more similar, farther = less similar
  - Spotify returns related artists in order of similarity (most similar first)
- **Node Characteristics**:
  - Center artist: Larger size (text-2xl), brighter background, ring highlight
  - Related artists: Standard size (text-lg), semi-transparent background
  - Hover effects: Brightness increase and scale
- **Interactive Features**: Click to select, visual feedback for center artist, proximity-based similarity visualization

### Current Implementation Phase
- **Phase 1 - Core Discovery**: ✅ Complete
  - Artist/song search functionality
  - Visual similarity mapping
  - Interactive node exploration
  - Mock data foundation for testing and development

- **Phase 2 - Spotify Integration**: ✅ Complete (October 2025)
  - Real-time artist search via Spotify Web API
  - Artist details with genres, popularity, and Spotify links
  - Top 3 songs with monthly listener estimates
  - Client Credentials authentication flow
  - Express backend API proxy (port 3001)
  - Vite proxy configuration for seamless frontend/backend communication
  - Curated artist search for similar artists (workaround for Related Artists API limitations)
  - Genre-based artist discovery using well-known artist names per genre
  - Empty initial state with clean search experience
  - Center artist concept with proximity-based layout
  - Visual emphasis for center artist (size, color, ring)
  - Centered search bar UI with magnifying glass icon (October 18, 2025)

### Future Extensibility
- Designed for personalized music map features (Phase 3)
- Architecture supports diversity metrics and recommendations
- Related artists functionality (requires different Spotify API scope)

## External Dependencies

### Core Libraries
- **React (^18.2.0)**: UI library for component-based architecture
- **ReactFlow (^11.10.4)**: Graph visualization and interaction engine
- **Zustand (^4.5.0)**: Lightweight state management solution
- **Axios (^1.6.7)**: HTTP client for future API integrations

### Development Dependencies
- **TypeScript (^5.3.3)**: Type safety and developer experience
- **Vite (^5.1.0)**: Fast development server and optimized production builds
- **Vitest (^1.2.2)**: Unit testing framework
- **TailwindCSS (^3.4.1)**: Utility-first CSS framework
- **PostCSS & Autoprefixer**: CSS processing and browser compatibility

### Backend Architecture (Added October 2025)
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js with tsx for TypeScript execution
- **API Structure**: RESTful endpoints at `/api/artists`
  - `GET /api/artists/search?q={query}` - Search artists by name
  - `GET /api/artists/:id` - Get artist details with top tracks
- **Authentication**: Spotify Client Credentials flow with automatic token refresh
- **Port**: Backend runs on port 3001, proxied by Vite dev server

### API Integrations
- **Spotify Web API**: ✅ Implemented (Phase 2)
  - Client Credentials OAuth flow
  - Artist search endpoint
  - Artist details endpoint
  - Top tracks endpoint
  - Credentials managed via Replit Secrets (SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET)
  - Note: Related artists endpoint has limitations with Client Credentials flow

### Asset Sources
- **Spotify Artist Images**: Used for artist visualization in production
- **Unsplash API**: Previously used for placeholder images in mock data phase

### Development Environment
- **Frontend Server**: Vite dev server on host 0.0.0.0:5000
- **Backend Server**: Express API server on localhost:3001
- **Proxy Configuration**: Vite proxies `/api` requests to backend server
- **Hot Module Replacement**: Auto-configured by Vite (DO NOT override with localhost in Replit environment)
- **Build Target**: ES2020 with modern browser support

### Critical Configuration Notes (October 18, 2025)
- ⚠️ **Vite HMR Configuration**: DO NOT set `hmr.host` to 'localhost' in vite.config.ts - this causes 403 errors and WebSocket failures in Replit environment. Let Vite auto-detect the correct host.
- **Component Positioning**: SearchBar component should NOT manage its own positioning - all layout positioning is handled by App.tsx to prevent unmount/remount issues that clear user input.
- **ReactFlow Controls**: Removed default zoom controls and attribution for cleaner, minimal UI. Users can still zoom with scroll/pinch and pan with drag gestures.
- **Layout Strategy**: SearchBar stays mounted permanently and only changes position via CSS classes to preserve component state and prevent refresh loops.