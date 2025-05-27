import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataOptional() {
  const schemaOptional = z.object({
    description: z.string().min(6, "Minimo 5 caracteres").max(50, "Máximo 50 caracteres"),
    idOptionalCategory: z.number({ required_error: "Selecione uma categoria" }).min(1, "Selecione uma categoria"),
  });

  type FormData = z.infer<typeof schemaOptional>;

  const useSetFormOptional = useForm<FormData>({
    resolver: zodResolver(schemaOptional),
    defaultValues: {
      description: "",
      idOptionalCategory: 0,
    },
  });

  return { useSetFormOptional, schemaOptional };
}

export default { FormDataOptional };
