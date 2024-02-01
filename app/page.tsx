import { Suspense } from "react";

import dynamic from 'next/dynamic';

import Lol from "./components/lol";
import Header from "./components/header";

export const revalidate = 0;

const Chat = dynamic(() => import('./components/chat'), { ssr: false });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-1 md:p-0 bg-zinc-300 top-0 sticky">
      <Header />
      <br className="relative"/>
      <Lol />
      <span className="text-2xl md:text-4xl font-bold text-zinc-700">LoL AI Chat</span>
      <br />
      <Suspense fallback={<></>}>
        <Chat />
      </Suspense>
    </main>
  );
}
