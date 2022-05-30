import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from '@/store'
import type { NextPage } from 'next'
import { loadToolListing } from '@/store/modules/toolListings'
import type { Nullable } from '@/types/common'
import type { ToolListing } from '@/types/entities/toolListing'


const ToolListingDetail: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)
  const id = parseInt(router.query.id as string, 10)
  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null)

  useEffect(() => {
    const loadListing = async () => {
      const listing = await dispatch(loadToolListing(id)).unwrap()
      setToolListing(listing)
    }
    loadListing()
  }, [id, dispatch])

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            {!toolListing
              ? <p>Loading</p>
              : (
                <div className="lg:col-start-8 lg:col-span-5">
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">{toolListing.name}</h1>
                    <p className="text-xl font-medium text-gray-900">{toolListing.price}</p>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default ToolListingDetail;