import { env } from "@/env.js";

const client_id = env.SPOTIFY_CLIENT_ID;
const client_secret = env.SPOTIFY_CLIENT_SECRET;
const playlist_id = env.SPOTIFY_PLAYLIST_ID;

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

export type SpotifySearchResponse = {
  tracks: {
    items: SpotifyTrack[];
  };
};

export const searchItems = async (
  query: string,
  token: string,
): Promise<
  SpotifySearchResponse | { error: { status: number; message: string } }
> => {
  const response = await fetch(
    "https://api.spotify.com/v1/search?q=" + query + "&type=track&market=ES",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.json();
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

  return response.json() as Promise<{
    snapshot_id?: string;
    error?: { status?: number };
  }>;
};

export const refreshAccessToken = async (token: {
  access_token: string | null;
  refresh_token: string | null;
  expires_at: number | null;
  token_type: string | null;
}): Promise<{
  access_token: string | null;
  refresh_token: string | null;
  expires_at: number | null;
  token_type: string | null;
  error?: string;
}> => {
  try {
    if (!token.refresh_token) {
      return {
        ...token,
        error: "RefreshAccessTokenError",
      };
    }

    const basicAuth = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64",
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${basicAuth}`,
      },
      body: new URLSearchParams({
        refresh_token: token.refresh_token,
        grant_type: "refresh_token",
      }),
    });

    const data = (await response.json()) as {
      access_token: string;
      expires_at: number;
      scope: string;
      refresh_token: string;
      token_type: string;
    };

    return data;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
