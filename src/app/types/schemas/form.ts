import { z } from "zod";

export const responseSchema = z.object({
  allergies: z.string().max(255),
  coming: z.enum(["yes", "no"], {
    errorMap: (issue) => {
      if (issue.code === z.ZodIssueCode.invalid_enum_value) {
        return { message: "Venga, ¡anímate!" };
      }

      return { message: "Venga, ¡anímate!" };
    },
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
    .trim()
    .refine((val) => !!val.trim(), {
      message: "Necesitamos tu nombre para organizar mejor",
    }),
});

export const formSchema = z.object({
  responses: z.array(responseSchema).max(5),
});

export type FormSchema = z.infer<typeof formSchema>;
export type Response = z.infer<typeof responseSchema>;
