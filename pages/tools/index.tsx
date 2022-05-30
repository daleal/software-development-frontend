import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadToolListings } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'

const ListTools: NextPage = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)

  const [toolListings, setToolListings] = useState<ToolListing[]>([])

  useEffect(() => {
    const loadListing = async () => {
      const listings = await dispatch(loadToolListings()).unwrap()
      setToolListings(listings)
    }
    loadListing()
  }, [])

  return <div>

    <div className=" m-24 bg-white shadow overflow-hidden sm:rounded-md text-center">
      <div className="text-blue-800 font-bold text-2xl mb-2 m-10">
        Herramientas
      </div>
      <div className="grid grid-cols-4 gap-8 m-10">
        { loading? 
          <>loading...</>
          : 
        toolListings.map((tool: ToolListing) =>
        <div key={tool.id} className="max-w-sm rounded overflow-hidden shadow-lg">
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
        </div> 
        )}
        <button className="m-24 text-2xl bg-blue-800 hover:bg-blue-700 text-base text-white font-bold py-2 px-4 rounded w-20 h-20">
          +
        </button>
      </div>
    </div>
      
    </div>
  
}

export default ListTools