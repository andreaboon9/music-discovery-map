import axios from 'axios';

let accessToken: string | null = null;
let tokenExpiry: number = 0;

async function getAccessToken(): Promise<string> {
  if (accessToken && Date.now() < tokenExpiry) {
    return accessToken;
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Spotify credentials not configured');
  }

  const response = await axios.post(
    'https://accounts.spotify.com/api/token',
    'grant_type=client_credentials',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64'),
      },
    }
  );

  accessToken = response.data.access_token;
  tokenExpiry = Date.now() + (response.data.expires_in * 1000);

  return accessToken as string;
}

export async function searchArtists(query: string) {
  const token = await getAccessToken();
  
  const response = await axios.get('https://api.spotify.com/v1/search', {
    params: {
      q: query,
      type: 'artist',
      limit: 10,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data.artists.items;
}

export async function getArtist(artistId: string) {
  const token = await getAccessToken();
  
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function getArtistTopTracks(artistId: string) {
  const token = await getAccessToken();
  
  const response = await axios.get(`https://api.spotify.com/v1/artists/${artistId}/top-tracks`, {
    params: {
      market: 'US',
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data.tracks.slice(0, 3);
}

export async function getRelatedArtists(artistId: string, genres: string[] = []) {
  const token = await getAccessToken();
  
  console.log(`[DEBUG] Finding similar artists using genres:`, genres);
  
  if (genres.length === 0) {
    console.log('[DEBUG] No genres available, cannot find similar artists');
    return [];
  }
  
  const artistsMap = new Map();
  
  const genreKeywords: { [key: string]: string[] } = {
    'edm': ['deadmau5', 'skrillex', 'zedd', 'martin garrix', 'diplo'],
    'house': ['calvin harris', 'avicii', 'kygo', 'galantis', 'tchami'],
    'progressive house': ['above & beyond', 'eric prydz', 'deadmau5', 'arty', 'cosmic gate'],
    'electro house': ['david guetta', 'afrojack', 'hardwell', 'alesso', 'steve aoki'],
    'trance': ['armin van buuren', 'tiesto', 'paul van dyk', 'ferry corsten', 'markus schulz'],
    'techno': ['adam beyer', 'richie hawtin', 'carl cox', 'nina kraviz', 'amelie lens'],
    'dubstep': ['skrillex', 'excision', 'zomboy', 'virtual riot', 'getter'],
    'drum and bass': ['pendulum', 'netsky', 'sub focus', 'wilkinson', 'high contrast'],
    'indie': ['tame impala', 'arctic monkeys', 'vampire weekend', 'mgmt', 'foster the people'],
    'pop': ['taylor swift', 'ariana grande', 'the weeknd', 'dua lipa', 'billie eilish'],
    'hip hop': ['drake', 'kendrick lamar', 'j cole', 'travis scott', 'kanye west'],
    'rock': ['foo fighters', 'imagine dragons', 'twenty one pilots', 'coldplay', 'muse'],
    'alternative': ['radiohead', 'the strokes', 'arctic monkeys', 'foster the people', 'two door cinema club']
  };
  
  for (const genre of genres.slice(0, 2)) {
    const genreKey = genre.toLowerCase();
    const searchTerms = genreKeywords[genreKey] || [`${genre} music`];
    
    for (const term of searchTerms.slice(0, 3)) {
      try {
        console.log(`[DEBUG] Searching for: ${term}`);
        const response = await axios.get('https://api.spotify.com/v1/search', {
          params: {
            q: term,
            type: 'artist',
            limit: 5,
          },
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        
        const artists = response.data.artists.items;
        
        for (const artist of artists) {
          if (artist.id !== artistId && !artistsMap.has(artist.id) && artist.popularity > 30) {
            const genreOverlap = genres.filter(g => 
              artist.genres.some((ag: string) => ag.includes(g.toLowerCase()) || g.toLowerCase().includes(ag))
            ).length;
            
            if (genreOverlap > 0 || artist.popularity > 60) {
              artistsMap.set(artist.id, {
                ...artist,
                genreOverlap
              });
            }
          }
        }
      } catch (error: any) {
        console.error(`[DEBUG] Failed to search for ${term}:`, error.message);
      }
    }
  }
  
  const sortedArtists = Array.from(artistsMap.values())
    .sort((a, b) => {
      if (b.genreOverlap !== a.genreOverlap) {
        return b.genreOverlap - a.genreOverlap;
      }
      return b.popularity - a.popularity;
    })
    .slice(0, 8);
  
  console.log(`[DEBUG] Returning ${sortedArtists.length} similar artists:`, sortedArtists.map(a => `${a.name} (overlap: ${a.genreOverlap}, pop: ${a.popularity})`));
  
  return sortedArtists;
}

export async function getRecommendations(artistId: string, genres: string[]) {
  const token = await getAccessToken();
  
  const response = await axios.get('https://api.spotify.com/v1/recommendations', {
    params: {
      seed_artists: artistId,
      seed_genres: genres.join(','),
      limit: 5,
    },
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  return response.data.tracks.map((track: any) => track.artists[0]).filter((artist: any, index: number, self: any[]) => 
    self.findIndex(a => a.id === artist.id) === index
  ).slice(0, 5);
}
