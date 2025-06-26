import { useAuthContext } from "@/src/contexts/auth-context";
import { FormDataLogin } from "@/schema-forms/form-login";
import { FormDataRegister } from "@/schema-forms/form-register";
import publicApi from "@/lib/api";
import { z } from "zod";

export function useAuth() {
  const { login } = useAuthContext();
  const { schemaLogin } = FormDataLogin();
  const { schemaRegister } = FormDataRegister();

  const Login = async (data: z.infer<typeof schemaLogin>) => {
    const response = await publicApi.post("/auth/login", data);
    const { token } = response.data;
    login(token);
    return token;
  };

  const Register = async (data: z.infer<typeof schemaRegister>) => {
    const response = await publicApi.post("/auth/register", data);
    const { token } = response.data;
    login(token);
    return token;
  };

  return { Login, Register };
}
