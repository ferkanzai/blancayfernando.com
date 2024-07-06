import { env } from "@/env.js";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const playlist_id = env.SPOTIFY_PLAYLIST_ID;

type SpotifyTokens = {
  access_token: string;
  token_type: string;
  expires_in: number;
};

export type SpotifyTrack = {
  album: {
    album_type: string;
    artists: Array<{
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      name: string;
      type: string;
      uri: string;
    }>;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      height: number;
      url: string;
      width: number;
    }>;
    is_playable: boolean;
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
  };
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  is_playable: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

type SpotifySearchResponse = {
  tracks: {
    items: SpotifyTrack[];
  };
};

export const getTokens = async () => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret).toString("base64"),
    },
  });

  const data = (await response.json()) as SpotifyTokens;

  return data;
};

export const searchItems = async (query: string, token: string) => {
  const response = await fetch(
    "https://api.spotify.com/v1/search?q=" + query + "&type=track&market=ES",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json() as Promise<SpotifySearchResponse>;
};

export const addItemToPlaylist = async (id: string, token: string) => {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlist_id}/tracks`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        uris: [`spotify:track:${id}`],
      }),
    },
  );

  return response.json();
};

export const login = async () => {
  const generateRandomString = () =>
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  const state = generateRandomString();

  const response = await fetch("https://accounts.spotify.com/authorize", {
    method: "GET",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id,
      response_type: "code",
      redirect_uri: "http://localhost:3000/api/spotify/callback",
      scope: "playlist-modify-public",
      state,
    }),
  });

  return response.json();
};

// export const getTokenByRefresh = async (refresh: string) => {
//   const response = await fetch(
//     "https://bankaccountdata.gocardless.com/api/v2/token/refresh/",
//     {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         refresh: refresh,
//       }),
//     },
//   );

//   const data = (await response.json()) as AccessTokens;

//   return data;
// };
