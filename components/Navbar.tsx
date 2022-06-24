import Image from "next/image";
import Link from "next/link";
import { useSession } from "@/hooks/session";

export default function Navbar() {
  const { logout, loggedIn } = useSession();

  return (
    <div className="relative px-4 pt-6 sm:px-6 lg:px-8">
      <nav
        className="relative flex items-center justify-between sm:h-10 lg:justify-start"
        aria-label="Global"
      >
        <div className="flex items-center flex-grow flex-shrink-0 lg:flex-grow-0">
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/">
              <a>
                <span className="sr-only">Workflow</span>
                <Image
                  src="/rentool-logo.svg"
                  alt="Rentool Logo"
                  width={50}
                  height={50}
                />
              </a>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block lg:ml-2 lg:pr-4 lg:space-x-8">
          <Link href="/">
            <a className="font-extrabold text-lg text-blue-800">Rentool</a>
          </Link>
          {!loggedIn && (
            <>
              <Link href="/login">
                <a className="font-medium text-blue-800 hover:text-blue-800">
                  Iniciar sesión
                </a>
              </Link>
              <Link href="/signup">
                <a className="font-medium text-blue-800 hover:text-blue-800">
                  Crear cuenta
                </a>
              </Link>
            </>
          )}
          {loggedIn && (
            <>
              <Link href="/new-listing">
                <a className="font-medium text-blue-800 hover:text-blue-800">
                  Publicar una herramienta
                </a>
              </Link>
              <Link href="/tools">
                <a className="font-medium text-blue-800 hover:text-blue-800">
                  Arrendar
                </a>
              </Link>
              <Link href="/tools/mine">
                <a className="font-medium text-blue-800 hover:text-blue-800">
                  Mis herramientas
                </a>
              </Link>
              <a
                className="cursor-pointer font-medium text-blue-800 hover:text-blue-800"
                onClick={logout}
              >
                Cerrar Sesión
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
