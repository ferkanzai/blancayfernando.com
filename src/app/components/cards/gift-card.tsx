import { GiftIcon } from "lucide-react";
import Image from "next/image";

import { CopyText } from "@/app/components/copy-text";
import { Card, CardHeader, CardTitle } from "@/app/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";

export default function GiftCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="group w-full max-w-[450px] cursor-pointer bg-transparent hover:-translate-y-2 hover:shadow-md hover:shadow-accent">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-4">
              <span className="sm:group-hover:text-secondary">Regalos</span>
              <GiftIcon className="h-8 min-h-8 w-8 min-w-8 sm:group-hover:stroke-secondary" />
            </CardTitle>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent className="md:max-w-[750px]">
        <DialogHeader>
          <DialogTitle className="pb-6 text-center text-xl md:text-2xl">
            Compartir con vosotros este día tan especial es el mejor de los
            regalos
          </DialogTitle>
          <DialogDescription className="flex flex-col items-center gap-2 text-lg md:flex-row md:items-start md:gap-8">
            <Image
              alt="New Zealand"
              className="inline-block max-h-[250px] max-w-[250px] rounded-[50px]"
              height={250}
              src="/new_zealand_square.webp"
              width={250}
            />
            <div className="flex h-full flex-col justify-evenly gap-10">
              <span className="text-center md:text-left">
                Pero si además queréis ayudarnos en nuestra vida futura y
                nuestra luna de miel, podéis hacerlo aquí:
              </span>
              <CopyText
                className="flex justify-center gap-6 text-lg md:justify-end md:text-xl"
                isEmail={false}
                showText
                text="ES94 0182 5322 2202 0055 4390"
              />
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
