export interface Artist {
  id: string;
  name: string;
  genres: string[];
  popularity: number;
  imageUrl: string;
  spotifyUrl: string;
  similarArtists: string[];
  topSongs: { name: string; monthlyListeners: number }[];
}

export interface MapState {
  nodes: Artist[];
  selectedNode: string | null;
  centerArtistId: string | null;
  searchQuery: string;
  isLoading: boolean;
  error: string | null;
  addNode: (artist: Artist) => void;
  selectNode: (id: string | null) => void;
  setSearchQuery: (query: string) => void;
  searchArtist: (name: string) => Promise<void>;
  clearError: () => void;
}
