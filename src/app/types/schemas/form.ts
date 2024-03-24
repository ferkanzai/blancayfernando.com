import { z } from "zod";

export const formSchema = z.object({
  responses: z
    .array(
      z.object({
        allergies: z.string().max(255),
        coming: z.enum(["yes", "no"], {
          required_error: "Venga, ¡anímate!",
        }),
        name: z
          .string({
            required_error: "Necesitamos tu nombre para organizar mejor",
          })
          .min(2, {
            message: "No me creo que tu nombre sea tan corto 😏",
          })
          .max(100, {
            message: "El nombre es demasiado largo",
          })
          .refine((val) => !!val, {
            message: "Necesitamos tu nombre para organizar mejor",
          }),
      }),
    )
    .max(5),
});

export type FormSchema = z.infer<typeof formSchema>;
export type Response = z.infer<typeof formSchema>["responses"][number];
