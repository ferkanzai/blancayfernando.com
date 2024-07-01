import { Info, InstagramIcon } from "lucide-react";

import { CopyText } from "@/app/components/copy-text";
import { CustomLink } from "@/app/components/custom-link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

const InfoData = () => {
  return (
    <>
      <h3 className="text-primar text-xl font-bold">Información</h3>
      <Accordion type="single" collapsible className="w-11/12 md:max-w-[700px]">
        <AccordionItem value="timetable">
          <AccordionTrigger>Horarios</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <p>
              <span className="text-[16px] font-bold tabular-nums text-primary">
                16:30 h
              </span>{" "}
              Salida autobús
              <CustomLink href="https://maps.app.goo.gl/P93h3ej491hxSLqFA">
                <Info className="inline h-4 w-4 text-primary" />
                C/Corazón de María, 1
              </CustomLink>
            </p>
            <p>
              <span className="text-[16px] font-bold tabular-nums text-primary">
                18:00 h
              </span>{" "}
              Ceremonia religiosa en la{" "}
              <CustomLink href="https://maps.app.goo.gl/i75Fb2Mgk4aa85Um6">
                <Info className="inline h-4 w-4 text-primary" />
                Iglesia San Andrés Apóstol (Cubas de la Sagra)
              </CustomLink>
            </p>
            <p>
              <span className="text-[16px] font-bold tabular-nums text-primary">
                20:00 h
              </span>{" "}
              Convite en{" "}
              <CustomLink href="https://maps.app.goo.gl/27mGj9je81CWrNc49">
                <Info className="inline h-4 w-4 text-primary" />
                La Casona de Cubas (Cubas de la Sagra)
              </CustomLink>{" "}
            </p>
            <p>
              <span className="text-[16px] font-bold tabular-nums text-primary">
                02:00 h
              </span>{" "}
              Salida primer autobús dirección{" "}
              <CustomLink href="https://maps.app.goo.gl/P93h3ej491hxSLqFA">
                <Info className="inline h-4 w-4 text-primary" />
                C/Corazón de María, 1
              </CustomLink>
            </p>
            <p>
              <span className="text-[16px] font-bold tabular-nums text-primary">
                06:00 h
              </span>{" "}
              Salida segundo autobús dirección{" "}
              <CustomLink href="https://maps.app.goo.gl/P93h3ej491hxSLqFA">
                <Info className="inline h-4 w-4 text-primary" />
                C/Corazón de María, 1
              </CustomLink>
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="parking">
          <AccordionTrigger>¿Dónde aparcar?</AccordionTrigger>
          <AccordionContent>
            <p>
              Frente a
              <CustomLink href="https://maps.app.goo.gl/27mGj9je81CWrNc49">
                <Info className="inline h-4 w-4 text-primary" />
                La Casona de Cubas
              </CustomLink>{" "}
              hay un aparcamiento muy amplio donde podéis aparcar con facilidad
              y de manera gratuita. Queda a 3 minutos de la iglesia y en la
              puerta de la finca donde se celebrará el convite.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="memories">
          <AccordionTrigger>Recuerdos</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <p>
              Queremos guardar todos los documentos gráficos que generéis en la
              boda, no olvides seguir en instagram a{" "}
              <CustomLink
                href="https://www.instagram.com/ignacioypatricia/"
                className="text-[#E1306C] decoration-[#E1306C]"
              >
                <InstagramIcon className="inline h-4 w-4 text-[#E1306C]" />
                ignacioypatricia
              </CustomLink>{" "}
              y etiquetar todo lo que subas. Toda la información que necesites
              la iremos publicando en esa cuenta.
            </p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="gift">
          <AccordionTrigger>Regalos</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-1">
            <p>
              Vuestra presencia será el mejor regalo, pero si además queréis
              ayudarnos, podéis hacerlo aquí:
            </p>
            <CopyText
              text="ES47 0073 0100 5407 5139 3332"
              showText
              isEmail={false}
            />
            <p>¡Muchas gracias!</p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default InfoData;
