import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadMyRentals } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'
import Link from 'next/link'
import { Status } from '@/types/api/status'

const MyTools: NextPage = () => {
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.toolListings)

    const [toolListings, setToolListings] = useState<ToolListing[]>([])

    useEffect(() => {
      const loadListing = async () => {
        const listings = await dispatch(loadMyRentals()).unwrap()
        setToolListings(listings)
      }
      loadListing()
    }, [dispatch])

    const statusStyle = (status: Status) => {
      switch (status) {
        case Status.Rented:
          return "my-4 px-3 py-1 pointer-events-none text-white pointer-events:none bg-green-500 rounded"
        case Status.Unpublished:
          return "my-4 px-3 py-1 pointer-events-none text-white pointer-events:none bg-red-500 rounded"
        default:
          return "my-4 px-3 py-1 pointer-events-none text-white pointer-events:none bg-blue-500 rounded"
      }
    }
  
    const statusName = (status: Status) => {
      switch (status) {
        case Status.Rented:
          return "Arrendado"
        case Status.Unpublished:
          return "No Publicado"
        default:
          return "Disponible"
      }
    }


  return ( 
    <div>
      <div className=" m-24 bg-white shadow overflow-hidden sm:rounded-md text-center">
        <div className="text-blue-800 font-bold text-2xl mb-2 m-10">
          Mi Historial de Arriendos
        </div>
        <div className="grid grid-cols-4 gap-8 m-10">
          { loading ? <>loading...</> : toolListings.map((tool: ToolListing) =>
            <Link key={tool.id} href="/tools/[id]"  as={`/tools/${tool.id}`} passHref>
              <div  className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className='relative w-full h-44'>
                  <Image alt={tool.name}
                  className="rounded-t-lg"
                  layout="fill" // required
                  objectFit="cover"
                  src={tool.image} />
                </div>
                <div className="p-5">
                  <div className="font-bold text-xl text-blue-800">{ tool.name }</div>
                  <p className="text-sm text-gray-500">Precio: ${ tool.price }</p> 
                </div>
                <button className={ statusStyle(tool.status) }>{ statusName(tool.status) }</button>
              </div> 
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default MyTools
