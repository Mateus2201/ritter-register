import { redirect } from "next/navigation";

export default function Home() {
  redirect('/entry')
  return null;
}