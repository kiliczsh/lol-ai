import { Suspense } from "react";

import dynamic from 'next/dynamic';

import Footer from "./components/footer";
import Lol from "./components/lol";

export const revalidate = 0;

const Chat = dynamic(() => import('./components/chat'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-8 md:p-24 bg-zinc-300">
      <Lol />
      <span className="text-2xl md:text-4xl font-bold text-zinc-700">LoL AI Chat</span>
      <br />
      <Suspense fallback={<></>}>
        <Chat />
      </Suspense>
      <Footer />
    </main>
  );
}
