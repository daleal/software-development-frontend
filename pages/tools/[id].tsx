import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from '@/store'
import type { NextPage } from 'next'
import { loadToolListing } from '@/store/modules/toolListings'
import type { Nullable } from '@/types/common'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'


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
          <div className="lg:grid lg:grid-cols-4 lg:auto-rows-min lg:gap-x-8">
            {loading
              ? <p>Loading</p>
              : 
              toolListing ?
              ( 
                <>
                <div className="lg:col-start-1 lg:col-span-2">
                  <div className="flex justify-between">
                    <Image alt={toolListing.name}
                      className="rounded-t-lg"
                      width={450}
                      height={450}
                      src={toolListing.image} />
                      <div className="lg:col-start-3 lg:col-span-2 mt-16">
                        <h1 className="font-bold text-4xl text-blue-800">{toolListing.name}</h1>
                        <p className="text-sm text-gray-500">{toolListing.price}</p>
                      </div>
                  </div>
                </div>
                
                </>
              )
              :
              <p>No se ha encontrado la herramienta.</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default ToolListingDetail;