import { TEST_URL } from "@/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(TEST_URL);
}
