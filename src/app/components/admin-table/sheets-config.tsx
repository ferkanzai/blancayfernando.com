import { zodResolver } from "@hookform/resolvers/zod";
import { TrashIcon } from "@radix-ui/react-icons";
import { SettingsIcon } from "lucide-react";
import * as React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import { CopyText } from "@/app/components/copy-text";
import { Button } from "@/app/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { useMediaQuery } from "@/app/hooks/useMediaQuery";
import { sheetsConfigurationSchema } from "@/app/types/schemas/sheetsConfiguration";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";

export function SheetsConfig() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const { data: sheetConfiguration } =
    api.spreadsheet.getSheetConfiguration.useQuery();

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <SettingsIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          {sheetConfiguration ? (
            <DialogHeader>
              <DialogTitle>Configuración actual</DialogTitle>
              <ChangeConfiguration />
            </DialogHeader>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Como configurar Google Spreadsheet</DialogTitle>
                <Description />
              </DialogHeader>
              <Configuration />
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" size="sm">
          <SettingsIcon />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        {sheetConfiguration ? (
          <DrawerHeader>
            <DrawerTitle>Configuración actual</DrawerTitle>
            <ChangeConfiguration />
          </DrawerHeader>
        ) : (
          <>
            <DrawerHeader className="text-left">
              <DrawerTitle>Como configurar Google Spreadsheet</DrawerTitle>
              <Description />
            </DrawerHeader>
            <Configuration className="px-4" />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
}

function Description() {
  return (
    <div className="text-sm tabular-nums text-zinc-500 dark:text-zinc-400">
      <p>1. Crea una nueva hoja de cálculo de Spreadsheet</p>
      <p>
        2. Comparte la hoja (como editor) con el siguiente email (click para
        copiar)
        <CopyText text={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL ?? ""} />
      </p>
      <p>3. Renombra "Hoja 1" a "Invitados"</p>
      <p>4. Copia el ID de la hoja de cálculo y pégalo en el campo inferior</p>
    </div>
  );
}

function Configuration({ className }: React.ComponentProps<"form">) {
  const utils = api.useUtils();
  const { mutate: updateConfiguration, isLoading } =
    api.spreadsheet.updateSheetConfiguration.useMutation({
      onError: (opts) => {
        toast.error(opts.message);
      },
      onSettled: async () => {
        form.reset({
          value: "",
        });
        await utils.spreadsheet.getSheetConfiguration.invalidate();
      },
    });

  const form = useForm<z.infer<typeof sheetsConfigurationSchema>>({
    resolver: zodResolver(sheetsConfigurationSchema),
    defaultValues: {
      value: "",
    },
  });

  function onSubmit(values: z.infer<typeof sheetsConfigurationSchema>) {
    updateConfiguration(values);
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="value"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-lg">
                ID de la hoja de Google Spreadsheet
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="text-base"
                  placeholder="ID de la hoja de Google Spreadsheet"
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />
        <Button
          className={cn(isLoading ? `bg-gray-300 text-black/40` : `text-white`)}
          disabled={
            isLoading ||
            Object.values(form.formState.errors).length > 0 ||
            form.formState.isSubmitting
          }
          type="submit"
        >
          Finalizar configuración
        </Button>
      </form>
    </Form>
  );
}

function ChangeConfiguration() {
  const utils = api.useUtils();
  const {
    data: sheetConfiguration,
    isLoading,
    isError,
    isFetching,
  } = api.spreadsheet.getSheetConfigurationData.useQuery(undefined, {
    retry: false,
    refetchOnWindowFocus: false,
  });
  const { mutate: removeConfiguration, isLoading: removing } =
    api.spreadsheet.removeSheetConfiguration.useMutation({
      onSuccess: () => utils.spreadsheet.getSheetConfiguration.invalidate(),
      retry: false,
    });

  return (
    <div>
      {isLoading || isFetching ? (
        <>Cargando datos del sheet configurado...</>
      ) : (
        <>
          <div>
            {sheetConfiguration && !isError ? (
              <>
                <p>Nombre del sheet configurado:</p>
                <p className="text-sm">{sheetConfiguration?.title}</p>
                <p>ID del sheet configurado:</p>
                <p className="text-sm">{sheetConfiguration?.id}</p>
              </>
            ) : (
              <p className="text-sm">
                {" "}
                Recuerda usar el siguiente email (click para copiar)
                <CopyText
                  text={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL ?? ""}
                />
                si los permisos no están configurados correctamente
              </p>
            )}
          </div>
          <div className="mt-2 flex items-center justify-center gap-3 sm:justify-start">
            <p className="text-lg font-semibold">Eliminar configuración</p>
            <Button
              className="group"
              disabled={removing}
              onClick={() => removeConfiguration()}
              size="sm"
              variant="destructive"
            >
              <TrashIcon className="group-hover:animate-jiggle transition-transform duration-200" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
