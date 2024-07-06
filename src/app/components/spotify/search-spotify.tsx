"use client";

import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Loader2 } from "lucide-react";
import { Session } from "next-auth";
import { signIn } from "next-auth/react";
import { useState } from "react";

import { LogoutButton } from "@/app/components/logout-button";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { useDebounce } from "@/app/hooks/useDebounce";
import { SpotifySearchResponse, SpotifyTrack } from "@/server/spotifyApi";
import { api } from "@/trpc/react";

export default function SearchSpotify({
  session,
}: {
  session: Session | null;
}) {
  const [search, setSearch] = useState("");
  const searchDebounced = useDebounce(search);

  const utils = api.useUtils();

  const { data: userProvider } = api.validEmails.checkProvider.useQuery({
    userId: session?.user?.id,
  });
  const { data, isLoading, isFetching } = api.spotify.searchItems.useQuery(
    {
      query: searchDebounced,
      userId: session?.user?.id,
    },
    {
      enabled: Boolean(searchDebounced),
    },
  );
  const { mutate: addToPlaylist } = api.spotify.addToPlaylist.useMutation({
    onSettled: () => utils.spotify.invalidate(),
  });

  const handleAddToPlaylist = (item: SpotifyTrack) => {
    addToPlaylist({ id: item.id, userId: session?.user?.id });
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-2">
      <h2>Pasos para añadir una canción a la playlist</h2>
      <p className="text-left">
        1. Accede a tu cuenta de Spotify con el botón de abajo
        <br />
        2. Busca una canción
        <br />
        3. Haz click en el botón + al lado de la canción para añadirla a la
        playlist
      </p>
      {session && userProvider?.provider === "spotify" ? (
        <>
          <LogoutButton />
          <div className="flex items-center gap-2">
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Busca una canción"
              type="text"
              className="w-full rounded-md border border-secondary bg-transparent px-4 py-2 text-base outline-none placeholder:text-secondary md:min-w-[700px]"
            />
            {searchDebounced && (isLoading || isFetching) ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" />
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <Button onClick={() => signIn("spotify")}>
          <span>Acceder con Spotify</span>
        </Button>
      )}

      {(data as SpotifySearchResponse)?.tracks?.items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <img
              src={item?.album?.images?.[0]?.url}
              alt={item.name}
              className="h-20 w-20 rounded-md"
            />
            <span className="text-left">{item.name}</span>
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => handleAddToPlaylist(item)}
          >
            <PlusCircledIcon className="h-6 w-6" />
          </Button>
        </div>
      ))}
    </div>
  );
}
