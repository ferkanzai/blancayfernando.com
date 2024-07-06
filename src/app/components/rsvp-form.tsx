"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import confetti from "canvas-confetti";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";

import RsvpSingleForm from "@/app/components/rsvp-single-form";
import { Button } from "@/app/components/ui/button";
import { Form } from "@/app/components/ui/form";
import { formSchema, type FormSchema } from "@/app/types/schemas/form";
import { api } from "@/trpc/react";

export default function RsvpForm() {
  const router = useRouter();
  const form = useForm<FormSchema>({
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
    onSuccess: (_data, variables) => {
      const someComing = variables.some(({ coming }) => coming === "yes");

      toast.success("Gracias por tu respuesta 🎉❤️");

      if (someComing) {
        void confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        return router.push("/gracias");
      }

      return router.push("/una-pena");
    },
    onError: (opts) => {
      toast.error(opts.message);
    },
  });

  const onSubmit = (values: FormSchema) => {
    // In case there's time, show a modal to the user to confirm the form if they answer not coming
    // const someNotComing = values.responses.some(
    //   ({ coming }) => coming === "no",
    // );
    sendInfoToDb.mutate(values.responses);
  };

  const isDisabled =
    sendInfoToDb.isLoading ||
    form.formState.isSubmitting ||
    !form.formState.isValid;

  const isSending = sendInfoToDb.isLoading || form.formState.isSubmitting;

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
              append({ name: "", allergies: "", coming: "" as "yes" | "no" });
            }}
            className="w-full"
            disabled={fields.length >= 5}
          >
            Añadir acompañante
          </Button>
          <Button
            className="flex w-full gap-3"
            disabled={isDisabled}
            type="submit"
          >
            {isSending ? (
              <>
                <Loader2 className="animate-spin" />
                <span>Enviando...</span>
              </>
            ) : (
              <>Enviar</>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
}
