import { useState, type FormEvent } from 'react';
import { useMapStore } from '../store/useMapStore';

export const SearchBar = () => {
  const [input, setInput] = useState('');
  const searchArtist = useMapStore(state => state.searchArtist);
  const setSearchQuery = useMapStore(state => state.setSearchQuery);
  const isLoading = useMapStore(state => state.isLoading);
  const error = useMapStore(state => state.error);
  const clearError = useMapStore(state => state.clearError);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      setSearchQuery(input);
      await searchArtist(input);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search for an artist..."
          disabled={isLoading}
          className="w-full px-6 py-4 pr-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 p-3 hover:scale-110 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Search"
        >
          <svg 
            className="w-6 h-6 text-[#1DB954]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </button>
      </form>
      {error && (
        <div className="mt-2 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
          {error}
          <button 
            onClick={clearError}
            className="ml-2 underline hover:text-red-100"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
};
