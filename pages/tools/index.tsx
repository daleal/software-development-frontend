import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadToolListings } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { Nullable } from '@/types/common'
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
    { loading? 
    <>loading...</>
    : 
    <div className=" m-10 bg-white shadow overflow-hidden sm:rounded-md">
      <div className="grid grid-cols-3 gap-4 m-10">
        {toolListings.map((tool: ToolListing) =>
        <div key={tool.id} className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image alt={tool.name}
            className="rounded-t-lg"
            width={200}
            height={200}
            src={tool.image} />
          <div className="p-5">
            <div className="font-bold text-xl mb-2">{ tool.name }</div> 
            <p className="text-gray-700 text-base">${ tool.price }</p> 
          </div>
        </div> 
        )}
      </div>
    </div>
    }
      
    </div>
  
}

export default ListTools
