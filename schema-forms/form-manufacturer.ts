import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataManufacturer() {
  const schemaManufacturer = z.object({
    name: z
      .string()
      .min(2, "Minimo 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
  });

  type FormData = z.infer<typeof schemaManufacturer>;

  const useSetFormManufacturer = useForm<FormData>({
    resolver: zodResolver(schemaManufacturer),
    defaultValues: {
      name: "",
    },
  });

  return { useSetFormManufacturer, schemaManufacturer };
}

export default { FormDataManufacturer };
