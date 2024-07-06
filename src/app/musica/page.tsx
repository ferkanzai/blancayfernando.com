import SearchSpotify from "@/app/components/spotify/search-spotify";
import { getServerAuthSession } from "@/server/auth";

export default async function musicPage() {
  const session = await getServerAuthSession();

  return (
    <>
      <h1 className="font-maginia text-3xl font-bold text-primary">
        ¡Sugiere alguna canción!
      </h1>

      <SearchSpotify session={session} />

      <div className="w-full md:max-w-2xl">
        <iframe
          style={{ borderRadius: "12px" }}
          src="https://open.spotify.com/embed/playlist/7gAoZBejGkkvdz14ossFBr"
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
