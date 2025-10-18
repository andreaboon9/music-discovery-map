import { useMapStore } from '../store/useMapStore';

export const ArtistDetails = () => {
  const nodes = useMapStore(state => state.nodes);
  const selectedNode = useMapStore(state => state.selectedNode);
  const selectNode = useMapStore(state => state.selectNode);
  const artist = nodes.find(n => n.id === selectedNode);

  if (!artist) return null;

  return (
    <div className="absolute bottom-8 left-8 z-10 max-w-sm">
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-white">
        <button
          onClick={() => selectNode(null)}
          className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
        >
          ✕
        </button>
        <div>
          <h3 className="text-xl font-bold mb-3">{artist.name}</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            {artist.genres.map(genre => (
              <span key={genre} className="px-3 py-1 bg-[#1DB954]/50 rounded-full text-xs">
                {genre}
              </span>
            ))}
          </div>
          <div className="space-y-2">
            <p className="text-sm text-white/70 font-medium mb-2">Top Songs</p>
            {artist.topSongs.map((song, index) => (
              <div key={song.name} className="flex items-center gap-2">
                <span className="text-white/50 text-sm w-4">{index + 1}</span>
                <div className="flex-1">
                  <p className="text-white text-sm">{song.name}</p>
                  <p className="text-white/50 text-xs">{(song.monthlyListeners / 1000000).toFixed(1)}M monthly listeners</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
