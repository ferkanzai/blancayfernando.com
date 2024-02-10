import Image from "next/image";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#FEFAE0]">
      <div className="p-10">
        <Image src="/main_logo.png" width={250} height={250} alt="logo" />
      </div>
      <h1 className="font-maginia text-4xl font-bold text-[#93987C]">
        Bienvenido a nuestra boda
      </h1>
      <h2 className="text-2xl">Pronto más información</h2>
    </main>
  );
}
