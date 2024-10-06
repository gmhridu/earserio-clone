import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Careers", path: "/careers" },
  { name: "Contact", path: "/contact" },
];
export default function Header() {
  return (
    <header className="bg-black">
      <div className="mx-auto flex h-16 max-w-screen-7xl items-center gap-8 px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <Button
            variant={"ghost"}
            className="flex gap-x-2 items-center hover:bg-muted-foreground"
          >
            <Image src={"/logo-1.png"} alt="logo" width={50} height={50} />
            <h2 className="font-bold text-xl text-white">Eraserio</h2>
          </Button>
        </Link>

        <div className="flex flex-1 items-center justify-end md:justify-between">
          <nav aria-label="Global" className="hidden md:block">
            <ul className="flex items-center gap-6 text-sm">
              {navLinks?.map((path, index) => (
                <li key={index}>
                  <Link
                    href={path?.path}
                    className="text-white hover:text-gray-400 transition"
                  >
                    {path?.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <div className="sm:flex sm:gap-4">
              <Button className="rounded-md bg-teal-600 px-5 py-2.5 text-base font-medium text-white transition hover:bg-teal-700">
                Login
              </Button>

              <Button className="hidden rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-teal-600 transition hover:text-teal-600/75 sm:block">
                Register
              </Button>
            </div>

            <Button className="rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-muted hover:bg-muted-foreground md:hidden">
              <span className="sr-only">Toggle menu</span>
              <Menu />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
