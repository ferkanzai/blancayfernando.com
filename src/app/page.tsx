import { ImageCarousel } from "./components/image-carousel";
import { MapWrapper } from "./components/map";

export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center gap-2 px-4 text-center md:px-10">
      <ImageCarousel />
      <h1 className="font-maginia text-4xl font-bold text-[#93987C]">
        19 de Octubre de 2024
      </h1>
      <div className="h-80 w-3/5">
        <MapWrapper />
      </div>
    </main>
  );
}
