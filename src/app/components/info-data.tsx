import { SewingPinFilledIcon } from "@radix-ui/react-icons";

import { CustomLink } from "@/app/components/custom-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";
import { DotIcon } from "lucide-react";
import { Separator } from "@/app/components/ui/separator";

const InfoData = () => {
  return (
    <>
      <h3 className="text-primar text-xl font-bold">Información</h3>
      <Accordion type="single" collapsible className="w-11/12 md:max-w-[700px]">
        <AccordionItem value="timetable">
          <AccordionTrigger>Horarios</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <p className="text-left">
              <span className="text-[16px] font-bold tabular-nums text-primary">
                13:00 h
              </span>{" "}
              Ceremonia religiosa en la
              <CustomLink href="https://maps.app.goo.gl/p49dpK5YjzFdbrXi8">
                <SewingPinFilledIcon className="inline h-4 w-4 text-primary" />
                Real Basílica Nuestra Señora de Atocha
              </CustomLink>
            </p>
            <p className="text-left">
              <span className="text-[16px] font-bold tabular-nums text-primary">
                14:30 h
              </span>{" "}
              Celebración en{" "}
              <CustomLink href="https://maps.app.goo.gl/NqzVtAhhLUGo2ZXr8">
                <SewingPinFilledIcon className="inline h-4 w-4 text-primary" />
                Real Fábrica de Tapices
              </CustomLink>{" "}
              (entrada por{" "}
              <CustomLink href="https://maps.app.goo.gl/yZWkJmLQDmMCAxqV7">
                Julián Gayarre
              </CustomLink>
              )
            </p>
            <p className="text-left">
              <span className="text-[16px] font-bold tabular-nums text-primary">
                00:30 h
              </span>{" "}
              Sobre esa hora terminará la fiesta en la Fábrica de Tapices
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parking">
          <AccordionTrigger>¿Cómo llegar?</AccordionTrigger>
          <AccordionContent className="flex flex-col items-start justify-start gap-1 text-start">
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Las paradas de Metro más cercanas son las de Menéndez Pelayo y
              Atocha (Ambas de la Línea 1)
            </p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Prácticamente en la puerta de la Basílica paran los autobuses de
              las líneas 24, 37, 54, 57 y 141. En la Avenida de la Reina
              Cristina nº 27 paran autobuses de las líneas 10, 14, 26, 32 y C1
            </p>
            <Separator className="my-2" />
            <p>Si vas a venir en tu coche:</p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Recuerda que es una zona de Servicio de Estacionamiento Regulado
              (SER)
            </p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              En la calle se puede aparcar en zona tanto verde (máximo 2 horas)
              como azul (máximo 4 horas) sacando un ticket de un parkímetro. Al
              ser sábado, solo es necesario pagar hasta las 15:00h de la tarde
            </p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Párkings (se pueden pagar por adelantado a través de distintas
              apps y conseguir mejores precios):
            </p>
            <p>
              <CustomLink href="https://maps.app.goo.gl/6pWaB7tQLDZ95QBp9">
                <SewingPinFilledIcon className="inline h-4 w-4 text-primary" />
                Párking en Avenida de Reina Cristina nº 24
              </CustomLink>
            </p>
            <p>
              <CustomLink href="https://maps.app.goo.gl/u72cLwUkFzKTNn9g6">
                <SewingPinFilledIcon className="inline h-4 w-4 text-primary" />
                Parking Saba de la Estación de Atocha
              </CustomLink>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="memories">
          <AccordionTrigger>Información variada</AccordionTrigger>
          <AccordionContent className="flex flex-col items-start justify-start gap-1 text-start">
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Contaremos con ropero durante toda la celebración en la Fábrica de
              Tapices, así que no dudes en traer abrigo, zapatos para cambiarte
              si los tacones te van a molestar, o lo que necesites
            </p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Si el tiempo lo permite, el cocktail se celebrará en el exterior.
              La comida y la fiesta serán en el interior de la Fábrica de
              Tapices
            </p>
            <p>
              <DotIcon className="inline h-4 w-4 text-primary" />
              Haznos saber si tienes algún tipo de alergía, intolerancia o dieta
              especial para ajustar el menú a tus necesidades (puedes hacerlo si
              prefieres al confirmar tu asistencia)
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default InfoData;
