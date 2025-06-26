import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataRegister() {
  const schemaRegister = z.object({
    name: z
      .string()
      .min(6, {
        message: "Nome deve ter pelo menos 6 caracteres",
      })
      .max(50, {
        message: "Nome deve ter no máximo 20 caracteres",
      }),
    username: z
      .string()
      .min(6, {
        message: "Nome deve ter pelo menos 6 caracteres",
      })
      .max(20, {
        message: "Nome deve ter no máximo 20 caracteres",
      }),

    password: z
      .string()
      .min(6, {
        message: "Senha deve ter pelo menos 6 caracteres",
      })
      .max(20, {
        message: "Senha deve ter no máximo 20 caracteres",
      }),
  });

  type FormData = z.infer<typeof schemaRegister>;

  const useSetFormRegister = useForm<FormData>({
    resolver: zodResolver(schemaRegister),
    defaultValues: {
      name: "",
      username: "",
      password: "",
    },
  });

  return { useSetFormRegister, schemaRegister };
}

export default { FormDataRegister };
