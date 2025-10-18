import { SearchBar } from './components/SearchBar';
import { MapCanvas } from './components/MapCanvas';
import { ArtistDetails } from './components/ArtistDetails';
import { LandingDescription } from './components/LandingDescription';
import { InfoBanner } from './components/InfoBanner';
import { Logo } from './components/Logo';
import { useMapStore } from './store/useMapStore';

function App() {
  const nodes = useMapStore(state => state.nodes);
  const hasArtists = nodes.length > 0;

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <MapCanvas />
      
      {/* SearchBar - stays mounted, changes position via CSS */}
      <div className={hasArtists 
        ? "absolute top-20 left-1/2 transform -translate-x-1/2 z-10 w-full max-w-sm md:max-w-md px-4" 
        : "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full max-w-sm md:max-w-md px-4 flex flex-col gap-6"
      }>
        <SearchBar />
        {/* Landing description - only shown when empty */}
        {!hasArtists && <LandingDescription />}
      </div>
      
      {/* Info banner - only shown when artists loaded */}
      {hasArtists && <InfoBanner />}
      
      <ArtistDetails />
      
      <div className="absolute top-8 left-8 z-10">
        <Logo />
      </div>
      
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <h1 className="text-white text-xl md:text-2xl font-bold whitespace-nowrap">
          Music Discovery Map
        </h1>
      </div>
    </div>
  );
}

export default App;
