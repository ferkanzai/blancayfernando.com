import { ImageCarousel } from "./components/image-carousel";

export default async function Home() {
  return (
    <main className="flex min-h-full flex-col items-center justify-center px-4 text-center md:px-10">
      <ImageCarousel />
    </main>
  );
}
