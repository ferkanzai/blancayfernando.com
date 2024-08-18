import { z } from "zod";

export const musicFormSchema = z.object({
  song: z
    .string()
    .min(3, { message: "Introduce al menos tres letras" })
    .max(255),
});

export type MusicFormSchema = z.infer<typeof musicFormSchema>;
