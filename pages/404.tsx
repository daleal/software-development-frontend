import Link from "next/link";

export default function Custom404() {
  return( 
    <div className="flex h-screen">
      <div className="m-auto text-center">
        <div className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl text-blue-800 xl">404</div>
        <div className="my-4">Página no encontrada</div>
        <Link href="/">
          <a className="text-sm text-gray-500">
            Ir a inicio
          </a>
        </Link>
      </div>
    </div>
  )
}