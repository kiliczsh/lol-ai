import { Suspense } from "react";

import Image from "next/image";
import dynamic from 'next/dynamic';

import Footer from "./components/footer";

export const revalidate = 0;

const Chat = dynamic(() => import('./components/chat'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 bg-zinc-300">
      <div className="flex place-items-center ">
        <Image src="/ampt.svg" alt="Ampt Logo" width={180} height={37} />
        <p className="m-3 text-xl">+</p>
        <Image src="/nextjs.svg" alt="Next.js Logo" width={180} height={37} />
      </div>
      <span className="text-4xl font-bold text-zinc-700">LoL AI Chat</span>
      <br />
      <Suspense fallback={<></>}>
        <Chat />
      </Suspense>
      <Footer />
    </main>
  );
}
