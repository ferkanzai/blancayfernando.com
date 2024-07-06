"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

export function CopyText({
  className,
  isEmail = true,
  showText = false,
  text,
}: {
  className?: string;
  isEmail?: boolean;
  showText?: boolean;
  text: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <span
      className={cn(
        showText
          ? "flex flex-row-reverse items-center justify-end gap-2 text-base transition-all"
          : "mx-1 inline",
        className,
      )}
    >
      {copied ? (
        <CheckIcon
          className="inline-block h-4 w-4 font-bold text-green-600"
          strokeWidth={3}
        />
      ) : (
        <CopyIcon
          onClick={() => {
            setCopied(true);
            void navigator.clipboard.writeText(text.replaceAll(" ", "") ?? "");
            toast.success(
              `${isEmail ? "Email" : "IBAN"} copiado al portapapeles`,
              {
                duration: 1000,
              },
            );
            setTimeout(() => {
              setCopied(false);
            }, 1000);
          }}
          className="inline-block h-4 w-4 cursor-pointer text-gray-500"
        />
      )}
      {showText ? <p>{text}</p> : null}
    </span>
  );
}
