import Link from "next/link";

export default function Header() {
    return (
        <header className="bg-zinc-400 text-zinc-50 text-center py-2 md:py-4 px-2 md:px-4 top-0 left-0 w-full md:relative sticky z-50">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <Link className="text-zinc-700 hover:text-white mb-2 md:mb-0 md:mr-4" href="https://ampt.ai" target="_blank">
                    Powered by Ampt
                </Link>
                <span className="hidden md:inline mx-2"> | </span>
                <Link className="text-zinc-700 hover:text-white mb-2 md:mb-0 md:ml-4 md:mr-4" href="https://muhammedkilic.com" target="_blank">
                    Built by @kiliczsh
                </Link>
                <span className="hidden md:inline mx-2"> | </span>
                <Link className="text-zinc-700 hover:text-white md:ml-4" href="https://github.com/kiliczsh/lol-ai" target="_blank">
                    Source Code
                </Link>
            </div>
        </header>
    );
}