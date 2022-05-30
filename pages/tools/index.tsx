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
    toolListings.map((tool: ToolListing) =>
    <>
      <p key={tool.id}>Tool Listing name: { tool.name }</p> 
      <Image alt={tool.name}
       className="w-full aspect-video"
       width={500}
        height={500}
        src={tool.image} />
     </> 
    )

    }
    
  </div>
}

export default ListTools
