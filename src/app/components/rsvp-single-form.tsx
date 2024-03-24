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

export default function RsvpSingleForm({
  onRemove,
  position,
}: {
  onRemove: UseFieldArrayRemove;
  position: number;
}) {
  const form = useFormContext();

  return (
    <div className="relative flex flex-col justify-start gap-3 rounded-lg border border-primary p-4">
      {position !== 0 ? (
        <X
          className="absolute right-2 top-2 cursor-pointer"
          onClick={() => onRemove(position)}
        />
      ) : null}
      <FormField
        name={`responses.${position}.name` as const}
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-3">
            <FormLabel className="text-lg">Nombre y apellidos *</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="m-0 text-base"
                placeholder="Nombre y apellidos"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />

      <FormField
        name={`responses.${position}.coming` as const}
        control={form.control}
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
                    <RadioGroupItem value="yes" />
                  </FormControl>
                  <FormLabel className="text-md font-normal">
                    ¡No me lo pierdo!
                  </FormLabel>
                </FormItem>
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <RadioGroupItem value="no" />
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
        control={form.control}
        render={({ field }) => (
          <FormItem className="flex flex-col items-start gap-3">
            <FormLabel className="text-lg">Alergias</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="m-0 text-base"
                placeholder="Alergias"
              />
            </FormControl>
            <FormMessage className="text-red-500" />
          </FormItem>
        )}
      />
    </div>
  );
}
