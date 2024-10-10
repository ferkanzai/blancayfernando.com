import Link from "next/link";
import { BlurredImage } from "../components/blurred-image";

export default function ongsPage() {
  return (
    <>
      <h1 className="font-maginia text-3xl font-bold text-primary">
        Si tú también quieres colaborar
      </h1>
      <h2>Aquí dejamos los enlaces a las organizaciones que hemos elegido</h2>
      <div className="flex max-w-xl flex-col gap-4 text-left">
        <Link
          href="https://www.redaipis.org/"
          className="text-primary hover:text-secondary"
        >
          <div className="flex flex-col items-center gap-4 rounded-lg border border-primary px-4 py-6 sm:flex-row sm:px-0">
            <div className="flex w-40 min-w-40 items-center justify-center">
              <BlurredImage
                alt="Logo de RedAIPIS-FAeDS"
                className=""
                url="/redaipis.png"
              />
            </div>
            <span>
              Asociación de Investigación, Prevención e Intervención del
              Suicidio y Familiares y Allegados en Duelo por Suicidio
              (RedAIPIS-FAeDS)
            </span>
          </div>
        </Link>
        <Link
          href="https://www.fundacionbetesda.org/colabora/donativo/"
          className="text-primary hover:text-secondary"
        >
          <div className="flex items-center gap-4 rounded-lg border border-primary py-6">
            <div className="flex w-40 items-center justify-center">
              <BlurredImage
                alt="Logo de Fundación Betesda"
                className=""
                url="/betesda.png"
                width={90.5}
              />
            </div>
            <span>Fundación Betesda</span>
          </div>
        </Link>
      </div>
    </>
  );
}
