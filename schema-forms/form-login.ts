import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function FormDataLogin() {
  const schemaLogin = z.object({
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

  type FormData = z.infer<typeof schemaLogin>;

  const useSetFormLogin = useForm<FormData>({
    resolver: zodResolver(schemaLogin),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  return { useSetFormLogin, schemaLogin };
}

export default { FormDataLogin };
