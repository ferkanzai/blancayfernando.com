import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center bg-[#FEFAE0] px-4 text-center md:px-10">
      <h1 className="font-maginia text-4xl font-bold text-[#93987C]">
        Bienvenidos a nuestra boda
      </h1>
      <div className="p-10">
        <Image src="/main_logo.png" width={250} height={250} alt="logo" />
      </div>
      <h2 className="text-2xl">Pronto más información</h2>
    </main>
  );
}
