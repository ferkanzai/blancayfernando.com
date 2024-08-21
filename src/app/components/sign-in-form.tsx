"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";

const signInSchema = z.object({
  email: z
    .string({
      required_error: "Debes ingresar un email",
    })
    .email({
      message: "El email es inválido",
    })
    .refine((val) => !!val.trim(), { message: "Debes ingresar un email" }),
});

export function SignInForm({ error }: { error: string | null }) {
  const [showError, setShowError] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    // hide error message after 5 seconds
    if (error) {
      setShowError(true);
      const timeout = setTimeout(() => {
        setShowError(false);
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [error]);

  async function onSubmit(values: z.infer<typeof signInSchema>) {
    await signIn("email", {
      email: values.email,
    });
  }

  const isDisabled =
    Object.values(form.formState.errors).length > 0 ||
    showError ||
    form.formState.isSubmitting ||
    form.formState.isLoading ||
    !form.formState.isValid;

  return (
    <Form {...form}>
      <form
        className="flex w-full max-w-80 flex-col gap-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          name="email"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className="text-base"
                  placeholder="Email"
                  autoFocus
                />
              </FormControl>
              {form.formState.errors?.email ? (
                <FormMessage className="text-red-500" />
              ) : null}
              {showError &&
              error === "EmailSignin" &&
              !form.formState.errors?.email ? (
                <FormMessage className="text-red-500">
                  El email ingresado no está autorizado
                </FormMessage>
              ) : null}
            </FormItem>
          )}
        />

        <Button
          className="flex w-full gap-3"
          disabled={isDisabled}
          type="submit"
        >
          {form.formState.isSubmitting ? (
            <>
              <Loader2 className="animate-spin" />
              <span>Enviando...</span>
            </>
          ) : (
            <>Acceder con email</>
          )}
        </Button>
      </form>
    </Form>
  );
}
