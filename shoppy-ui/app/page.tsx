import Image from "next/image";
import getMe from "@/app/get-me";

export default async function Home() {
  const me = await getMe();
  console.log("me", me);
  return (
    <main>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium ad aut consectetur culpa cum cupiditate dolorem dolores ducimus eaque error esse et labore laborum nisi porro reprehenderit, sed similique ullam.</p>
    </main>
  );
}
