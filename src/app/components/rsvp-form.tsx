"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import RsvpSingleForm from "@/app/components/rsvp-single-form";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { formSchema } from "@/app/types/schemas/form";
import { api } from "@/trpc/react";
import { Loader2 } from "lucide-react";

export default function RsvpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      responses: [{ name: "", allergies: "", coming: undefined }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "responses",
    control: form.control,
  });
  const sendInfoToDb = api.rsvp.create.useMutation({
    onSuccess: () => {
      toast.success("Gracias por tu respuesta 🎉❤️");
      form.reset();
    },
    onError: (opts) => {
      toast.error(opts.message);
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    sendInfoToDb.mutate(values.responses);
  };

  const isDisabled = sendInfoToDb.isLoading || form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col items-center gap-4 pb-10 sm:px-8 md:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="my-0 flex w-full flex-wrap justify-center gap-4">
          {fields.map((field, index) => {
            return (
              <RsvpSingleForm
                key={field.id}
                onRemove={remove}
                position={index}
              />
            );
          })}
        </div>
        <div className="flex w-full flex-col items-center gap-3 md:max-w-md">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              if (fields.length >= 5) {
                toast.error("El máximo de invitados por envío es de 5");
                return;
              }
              append({
                name: "",
                allergies: "",
                coming: "" as "yes" | "no",
              });
            }}
            className="w-full"
            disabled={fields.length >= 5}
          >
            Añadir acompañante
          </Button>
          <Button
            type="submit"
            disabled={isDisabled}
            className="flex w-full gap-3"
          >
            {isDisabled ? <Loader2 className="animate-spin" /> : null} Enviar
          </Button>
        </div>
      </form>
    </Form>
  );
}
