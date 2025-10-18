import axios from 'axios';
import { Artist } from '../types';

export async function searchArtists(query: string): Promise<any[]> {
  const response = await axios.get('/api/artists/search', {
    params: { q: query },
  });
  return response.data;
}

export async function getArtistWithRelated(artistId: string): Promise<{ artist: Artist; relatedArtists: Artist[] }> {
  const response = await axios.get(`/api/artists/${artistId}`);
  const data = response.data;
  
  return {
    artist: {
      id: data.id,
      name: data.name,
      genres: data.genres,
      popularity: data.popularity,
      imageUrl: data.imageUrl,
      spotifyUrl: data.spotifyUrl,
      similarArtists: data.similarArtists,
      topSongs: data.topSongs,
    },
    relatedArtists: data.relatedArtists.map((a: any) => ({
      id: a.id,
      name: a.name,
      genres: a.genres,
      popularity: a.popularity,
      imageUrl: a.imageUrl,
      spotifyUrl: a.spotifyUrl,
      similarArtists: [],
      topSongs: a.topSongs || [],
    })),
  };
}
