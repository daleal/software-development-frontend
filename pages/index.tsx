import type { NextPage } from 'next'
import Image from 'next/image'

// Reference: https://tailwindui.com/components/marketing/sections/heroes
const Home: NextPage = () => {
  return (
    <>
      <div className="px-10 mx-auto max-w-7xl">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="px-4 mx-auto mt-10 max-w-7xl sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block text-blue-800 xl">Rentool</span>{' '}
                <span className="block text-yellow-400 xl">
                  El Uber de las herramientas
                </span>
              </h1>
               <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Arrienda herramientas a a bajo costos. Quita el polvo a esas herramientas que guardas, y 
                ayuda a otros a lograr sus proyectos. Rentool es una plataforma que te permite realizar arriendos con un solo click.
              </p>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0">
        <Image
          className="object-cover w-full h-56 sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="/tools.jpeg"
          alt="Vercel Logo"
          width={800}
          height={500}
        />
      </div>
    </>
  )
}

export default Home
