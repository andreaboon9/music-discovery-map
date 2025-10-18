import { create } from 'zustand';
import { Artist, MapState } from '../types';
import * as api from '../services/api';

export const useMapStore = create<MapState>((set, get) => ({
  nodes: [],
  selectedNode: null,
  centerArtistId: null,
  searchQuery: '',
  isLoading: false,
  error: null,
  
  addNode: (artist: Artist) => {
    const { nodes } = get();
    if (!nodes.find(n => n.id === artist.id)) {
      set({ nodes: [...nodes, artist] });
    }
  },
  
  selectNode: (id: string | null) => set({ selectedNode: id }),
  
  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  clearError: () => set({ error: null }),
  
  searchArtist: async (name: string) => {
    set({ isLoading: true, error: null });
    try {
      const results = await api.searchArtists(name);
      if (results.length > 0) {
        const firstArtist = results[0];
        const { artist, relatedArtists } = await api.getArtistWithRelated(firstArtist.id);
        
        set({ 
          nodes: [artist, ...relatedArtists],
          centerArtistId: artist.id,
          selectedNode: artist.id,
          isLoading: false 
        });
      } else {
        set({ isLoading: false, error: 'No artists found. Try a different search.' });
      }
    } catch (error) {
      console.error('Search failed:', error);
      set({ 
        isLoading: false, 
        error: 'Failed to search artists. Please check your connection and try again.' 
      });
    }
  },
}));
