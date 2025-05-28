import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataVehicleCategory() {
  const schemaVehicleCategory = z.object({
    description: z
      .string()
      .min(2, "Minimo 2 caracteres")
      .max(50, "Máximo 50 caracteres"),
  });

  type FormData = z.infer<typeof schemaVehicleCategory>;

  const useSetFormVehicleCategory = useForm<FormData>({
    resolver: zodResolver(schemaVehicleCategory),
    defaultValues: {
      description: "",
    },
  });

  return { useSetFormVehicleCategory, schemaVehicleCategory };
}

export default { FormDataVehicleCategory };
