import FormRegister from "@/components/form";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/login')

  
  return null;
}