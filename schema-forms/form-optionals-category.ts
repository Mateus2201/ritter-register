import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataOptionalCategory() {
  const schemaOptionalCategory = z.object({
    description: z.string().min(5, "Minímo 5 caracteres").max(50, "Máximo 50 caracteres")
  });

  type FormData = z.infer<typeof schemaOptionalCategory>;

  const useSetFormOptionalCategory = useForm<FormData>({
    resolver: zodResolver(schemaOptionalCategory),
    defaultValues: {
      description: "",
    },
  });

  return { useSetFormOptionalCategory, schemaOptionalCategory };
}

export default { FormDataOptionalCategory };
