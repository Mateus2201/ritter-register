import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataVehiclesOptional() {
  const schemaVehiclesOptional = z.object({
     optionals: z.array(z.number()).optional(),
  });

  type FormData = z.infer<typeof schemaVehiclesOptional>;

  const useSetFormVehiclesOptional = useForm<FormData>({
    resolver: zodResolver(schemaVehiclesOptional),
    defaultValues: {
      optionals: [],
    },
  });

  return { useSetFormVehiclesOptional, schemaVehiclesOptional };
}

export default { FormDataVehiclesOptional };
