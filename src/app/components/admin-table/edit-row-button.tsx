"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type Row } from "@tanstack/react-table";
import { Loader2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";
import { Checkbox } from "@/app/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { type FormularySelect } from "@/server/db/schema";
import { api } from "@/trpc/react";
import { useRouter } from "next/navigation";

export function EditRowButton({
  row,
  setOpen,
}: {
  row: Row<FormularySelect>;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const utils = api.useUtils();
  const router = useRouter();

  const { original } = row;

  const schema = z.object({
    id: z.number(),
    name: z.string(),
    allergies: z.string().max(255),
    coming: z.boolean(),
    specialMenu: z.boolean(),
    specialMenuValue: z.string().max(255),
  });

  type FormularySelectType = z.infer<typeof schema>;

  const form = useForm<FormularySelectType>({
    resolver: zodResolver(schema),
    defaultValues: {
      ...original,
      allergies: original.allergies ?? "",
      specialMenuValue: original.specialMenuValue ?? "",
    },
  });

  const { mutate, isLoading } = api.rsvp.editRow.useMutation({
    onSuccess: () => {
      toast.success("Fila editada correctamente");
      setOpen(false);
    },
    onSettled: async () => {
      await utils.rsvp.invalidate();
      router.refresh();
    },
  });

  const onSubmit = (values: FormularySelectType) => {
    mutate(values);
  };

  const isDisabled =
    isLoading || form.formState.isSubmitting || !form.formState.isValid;

  const isSending = isLoading || form.formState.isSubmitting;

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Editar fila</AlertDialogTitle>
        <AlertDialogDescription>
          <Form {...form}>
            <form
              className="flex w-full flex-col gap-4 pb-10 sm:px-8 md:px-0"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="id"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="w-96 text-right">ID</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={original.id.toString()}
                        disabled
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="w-96 text-right">
                      Nombre y apellidos
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={original.name ?? "Nombre y apellidos"}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="coming"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center justify-end gap-3">
                    <FormLabel className="w-96 text-right" htmlFor="coming">
                      Asistencia
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="coming"
                        name="coming"
                        defaultChecked={original.coming}
                        className="h-5 w-5"
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="allergies"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="w-96 text-right">
                      Alergias o intolerancias
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          original.allergies ?? "Alergias o intolerancias"
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="specialMenu"
                control={form.control}
                render={() => (
                  <FormItem className="flex items-center justify-end gap-3">
                    <FormLabel
                      className="w-96 text-right"
                      htmlFor="specialMenu"
                    >
                      ¿Necesita menú especial?
                    </FormLabel>
                    <FormControl>
                      <Checkbox
                        id="specialMenu"
                        name="specialMenu"
                        defaultChecked={original.specialMenu}
                        className="h-5 w-5"
                        disabled
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
              <FormField
                name="specialMenuValue"
                control={form.control}
                render={({ field }) => (
                  <FormItem className="flex items-center gap-3">
                    <FormLabel className="w-96 text-right">
                      Menú especial
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder={
                          original.specialMenuValue ?? "Menú especial"
                        }
                      />
                    </FormControl>
                    <FormMessage className="text-left text-red-500" />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={form.handleSubmit(onSubmit)}
          disabled={isDisabled}
        >
          {isSending ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Editando...</span>
            </>
          ) : (
            <>Editar fila</>
          )}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
