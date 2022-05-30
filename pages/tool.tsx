import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadToolListing } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { Nullable } from '@/types/common'
import type { ToolListing } from '@/types/entities/toolListing'

const Awa: NextPage = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)

  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null)

  useEffect(() => {
    const loadListing = async () => {
      const listing = await dispatch(loadToolListing(2)).unwrap()
      setToolListing(listing)
    }
    loadListing()
  }, [])

  return <div>
    <p>Loading: { loading? 'yes' : 'no' }</p>
    { toolListing !== null && <p>Tool Listing name: { toolListing.name }</p> }
  </div>
}

export default Awa
