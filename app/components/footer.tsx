import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-zinc-400 text-white text-center py-4 md:px-4 md:py-4 absolute bottom-0 left-0 w-full">
            <div className="flex flex-col md:flex-row justify-center items-center">
                <Link className="text-zinc-700 hover:text-white mb-2 md:mb-0 md:mr-4" href="https://ampt.ai" target="_blank">
                    Powered by Ampt
                </Link>
                <span className="mx-2 md:hidden">|</span>
                <Link className="text-zinc-700 hover:text-white mb-2 md:mb-0 md:ml-4 md:mr-4" href="https://muhammedkilic.com" target="_blank">
                    Built by @kiliczsh
                </Link>
                <span className="mx-2 md:hidden">|</span>
                <Link className="text-zinc-700 hover:text-white md:ml-4" href="https://github.com/kiliczsh/lol-ai" target="_blank">
                    Source Code
                </Link>
            </div>
        </footer>
    );
}