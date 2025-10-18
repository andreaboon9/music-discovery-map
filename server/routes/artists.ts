import { Router } from 'express';
import * as spotify from '../services/spotify';

const router = Router();

router.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter is required' });
    }

    const artists = await spotify.searchArtists(query);
    res.json(artists);
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: 'Failed to search artists' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const artistId = req.params.id;
    
    const [artist, topTracks] = await Promise.all([
      spotify.getArtist(artistId),
      spotify.getArtistTopTracks(artistId),
    ]);

    let relatedArtists: any[] = [];
    try {
      relatedArtists = await spotify.getRelatedArtists(artistId, artist.genres);
    } catch (relatedError: any) {
      console.warn(`Could not fetch related artists for ${artistId}:`, relatedError.message);
    }

    const relatedArtistsWithTracks = await Promise.all(
      relatedArtists.map(async (a: any) => {
        try {
          const tracks = await spotify.getArtistTopTracks(a.id);
          return {
            id: a.id,
            name: a.name,
            genres: a.genres,
            popularity: a.popularity,
            imageUrl: a.images[0]?.url || '',
            spotifyUrl: a.external_urls.spotify,
            topSongs: tracks.slice(0, 3).map((track: any) => ({
              name: track.name,
              monthlyListeners: track.popularity * 1000000,
            })),
          };
        } catch (error) {
          console.warn(`Could not fetch top tracks for ${a.name}:`, error);
          return {
            id: a.id,
            name: a.name,
            genres: a.genres,
            popularity: a.popularity,
            imageUrl: a.images[0]?.url || '',
            spotifyUrl: a.external_urls.spotify,
            topSongs: [],
          };
        }
      })
    );

    const artistData = {
      id: artist.id,
      name: artist.name,
      genres: artist.genres,
      popularity: artist.popularity,
      imageUrl: artist.images[0]?.url || '',
      spotifyUrl: artist.external_urls.spotify,
      topSongs: topTracks.slice(0, 3).map((track: any) => ({
        name: track.name,
        monthlyListeners: track.popularity * 1000000,
      })),
      similarArtists: relatedArtists.map((a: any) => a.id),
      relatedArtists: relatedArtistsWithTracks,
    };

    res.json(artistData);
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({ error: 'Failed to get artist data' });
  }
});

export default router;
