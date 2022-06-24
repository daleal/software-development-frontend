import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadMyRentals } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { PastToolListing } from '@/types/entities/pastToolListing'
import Image from 'next/image'
import Link from 'next/link'

const MyRentals: NextPage = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)

  const [toolListings, setToolListings] = useState<PastToolListing[]>([])

  useEffect(() => {
    const loadListing = async () => {
      const listings = await dispatch(loadMyRentals()).unwrap()
      setToolListings(listings)
    }
    loadListing()
  }, [dispatch])

  return (
    <div>
      <div className="m-24 overflow-hidden text-center bg-white shadow  sm:rounded-md">
        <div className="m-10 mb-2 text-2xl font-bold text-blue-800">
          Mi Historial de Arriendos
        </div>
        <div className="grid grid-cols-4 gap-8 m-10">
          {loading ? <>loading...</> : toolListings.map((tool: PastToolListing) =>
            <Link key={tool.id} href="/tools/[id]" as={`/tools/${tool.listing}`} passHref>
              <div className="max-w-sm overflow-hidden rounded shadow-lg">
                <div className='relative w-full h-44'>
                  <Image alt={tool.name}
                    className="rounded-t-lg"
                    layout="fill" // required
                    objectFit="cover"
                    src={tool.image} />
                </div>
                <div className="p-5">
                  <div className="text-xl font-bold text-blue-800">{tool.name}</div>
                  <p className="text-sm text-gray-500">Precio: ${tool.price}</p>
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyRentals
