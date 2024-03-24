import { X } from "lucide-react";
import { useFormContext, type UseFieldArrayRemove } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/app/components/ui/radio-group";
import { type FormSchema } from "@/app/types/schemas/form";
import { cn } from "@/lib/utils";

export default function RsvpSingleForm({
  onRemove,
  position,
}: {
  onRemove: UseFieldArrayRemove;
  position: number;
}) {
  const { getFieldState, formState, control } = useFormContext();

  const { invalid: nameInvalid, error: nameError } = getFieldState(
    `responses.${position}.name`,
    formState,
  );
  const { invalid: comingInvalid, error: comingError } = getFieldState(
    `responses.${position}.coming`,
    formState,
  );
  const fieldHasError = (
    formState.errors.responses as unknown as FormSchema["responses"]
  )?.[position];

  return (
    <div
      className={cn(
        "relative flex flex-col justify-start gap-3 rounded-lg border p-4",
        fieldHasError ? "border-red-500" : "border-primary",
      )}
    >
      {position !== 0 ? (
        <X
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => onRemove(position)}
        />
      ) : null}
      <FormField
        name={`responses.${position}.name` as const}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-3">
            <FormLabel className="text-lg">Nombre y apellidos *</FormLabel>
            <FormControl>
              <Input
                {...field}
                className={cn(
                  "m-0 text-base",
                  nameInvalid && nameError
                    ? "border-red-500 focus-visible:ring-red-500"
                    : "",
                )}
                placeholder="Nombre y apellidos"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        name={`responses.${position}.coming` as const}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-3">
            <FormLabel className="text-lg">¿Vendrás?</FormLabel>
            <FormControl>
              <RadioGroup
                className="flex flex-col gap-3"
                onValueChange={field.onChange}
                value={field.value as string}
              >
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value="yes"
                      className={cn(
                        comingInvalid && comingError ? "border-red-500" : null,
                      )}
                    />
                  </FormControl>
                  <FormLabel className="text-md font-normal">
                    ¡Claro qué sí!
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem
                      value="no"
                      className={cn(
                        comingInvalid && comingError ? "border-red-500" : null,
                      )}
                    />
                  </FormControl>
                  <FormLabel className="text-md font-normal">
                    Una pena, pero no podré ir...
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        name={`responses.${position}.allergies` as const}
        control={control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-3">
            <FormLabel className="text-lg">Alergias o intolerancias</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="m-0 text-base"
                placeholder="Alergias o intolerancias"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
}
