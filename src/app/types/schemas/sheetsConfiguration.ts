import { z } from "zod";

export const sheetsConfigurationSchema = z.object({
  value: z
    .string({
      required_error: "Este campo es obligatorio",
    })
    .refine((val) => !!val, { message: "Este campo es obligatorio" }),
});
