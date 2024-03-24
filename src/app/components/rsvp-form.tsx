"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { type z } from "zod";

import RsvpSingleForm from "@/app/components/rsvp-single-form";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { formSchema } from "@/app/types/schemas/form";

export default function RsvpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema, undefined, { raw: true }),
    defaultValues: {
      responses: [{ name: "", allergies: "", coming: undefined }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "responses",
    control: form.control,
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    toast.success("Gracias por tu respuesta 🎉❤️");
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        className="flex w-full flex-col gap-4 px-8 pb-10 md:max-w-md md:px-0"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {fields.map((field, index) => {
          return (
            <RsvpSingleForm key={field.id} onRemove={remove} position={index} />
          );
        })}
        <Button
          type="button"
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
        >
          Añadir acompañante
        </Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          Enviar
        </Button>
      </form>
    </Form>
  );
}
