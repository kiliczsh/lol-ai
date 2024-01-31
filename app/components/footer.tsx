import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-400 text-white text-center p-4 absolute bottom-0 left-0 w-full">
            <Link className="text-zinc-700 hover:text-white" href="https://ampt.ai" target="_blank">
                Powered by Ampt
            </Link>
            <span className="mx-2">|</span>
            <Link className="text-zinc-700 hover:text-white ml-4" href="https://github.com/kiliczsh" target="_blank" >
                Built by @kiliczsh
            </Link>
            <span className="mx-2">|</span>
            <Link className="text-zinc-700 hover:text-white ml-4" href="https://github.com/kiliczsh/lol-ai" target="_blank" >
                Source Code
            </Link>
        </footer>
    );
}