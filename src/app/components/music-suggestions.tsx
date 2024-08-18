import { api } from "@/trpc/server";

export default async function MusicSuggestions() {
  const songs = await api.music.getData.query();

  return (
    <div className="w-full max-w-[1500px] overflow-x-auto">
      <div className="flex min-w-96 flex-col gap-4 px-4 pb-10 md:px-0">
        {songs.map((song, index) => (
          <div key={song} className="flex items-center gap-3">
            <span className="text-lg">{`${index + 1}. ${song}`}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
