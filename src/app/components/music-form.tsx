"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  musicFormSchema,
  type MusicFormSchema,
} from "@/app/types/schemas/music";
import { api } from "@/trpc/react";

export default function MusicForm() {
  const form = useForm<MusicFormSchema>({
    resolver: zodResolver(musicFormSchema),
    defaultValues: {
      song: "",
    },
  });

  const sendInfoToDb = api.music.create.useMutation({
    onSuccess: () => {
      toast.success("Gracias! Puedes añadir más canciones 🎶");

      form.reset();
    },
    onError: (opts) => {
      toast.error(opts.message);
    },
  });

  const onSubmit = (values: MusicFormSchema) => {
    sendInfoToDb.mutate(values);
  };

  const isDisabled =
    sendInfoToDb.isLoading ||
    form.formState.isSubmitting ||
    !form.formState.isValid;

  const isSending = sendInfoToDb.isLoading || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center gap-4 sm:px-8 md:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="my-0 flex w-full flex-wrap justify-center gap-4">
          <FormField
            name="song"
            control={form.control}
            render={({ field }) => (
              <FormItem className="flex flex-col items-start gap-3">
                <FormLabel className="text-lg">
                  ¿Qué canción te gustaría escuchar?
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="m-0 text-base"
                    placeholder="Nombre de la canción"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        <Button className="flex w-48 gap-3" disabled={isDisabled} type="submit">
          {isSending ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>Enviar</>
          )}
        </Button>
      </form>
    </Form>
  );
}
