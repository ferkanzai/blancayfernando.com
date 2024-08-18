import { env } from "@/env";
import MusicForm from "@/app/components/music-form";

export default async function musicPage() {
  return (
    <>
      <h1 className="font-maginia text-3xl font-bold text-primary">
        ¡Sugiere alguna canción a través del formulario!
      </h1>
      <h2 className="text-xl font-bold text-primary">
        Las iremos añadiendo a la lista de Spotify para que suenen en la boda
      </h2>

      <MusicForm />

      <div className="w-full pb-10 md:max-w-2xl">
        <iframe
          style={{ borderRadius: "12px" }}
          src={`https://open.spotify.com/embed/playlist/${env.SPOTIFY_PLAYLIST_ID}`}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        ></iframe>
      </div>
    </>
  );
}
