import { api } from "@/trpc/server";

export default async function MusicSuggestions() {
  const songs = await api.music.getData.query();

  return (
    <div className="flex max-w-[1500px] flex-col gap-4 overflow-x-auto px-4 pb-10 md:px-0">
      {songs.map((song, index) => (
        <div key={song} className="flex max-w-[500px] items-center gap-3">
          <span className="text-lg">{`${index + 1}. ${song}`}</span>
        </div>
      ))}
    </div>
  );
}
