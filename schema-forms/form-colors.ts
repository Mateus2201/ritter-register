import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataColor() {
  const schemaColor = z.object({
    description: z
      .string()
      .min(2, "Minimo 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
  });

  type FormData = z.infer<typeof schemaColor>;

  const useSetFormColor = useForm<FormData>({
    resolver: zodResolver(schemaColor),
    defaultValues: {
      description: "",
    },
  });

  return { useSetFormColor, schemaColor };
}

export default { FormDataColor };
