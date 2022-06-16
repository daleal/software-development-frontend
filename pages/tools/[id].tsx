import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from '@/store'
import { user } from '@/api/index'
import type { NextPage } from 'next'
import { loadToolListing, removeToolListing } from '@/store/modules/toolListings'
import type { Nullable } from '@/types/common'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'
import Error from 'next/error'


const ToolListingDetail: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)
  const id = parseInt(router.query.id as string, 10)
  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null)
  const [isPublisher, setIsPublisher] = useState<Boolean>(false)

  useEffect(() => {
    const loadListing = async () => {
      const listing = await dispatch(loadToolListing(id)).unwrap()
      setToolListing(listing)
    }
    loadListing()
  }, [id, dispatch])

  useEffect(() => {
    const getUserId = (async () => {
      if (toolListing) {
        const userData = await user.get()
        setIsPublisher(userData.id == toolListing.publisher)
      }
    })
    getUserId()
  }, [toolListing])

  const deleteTool = async () => {
    await dispatch(removeToolListing(id))
    await router.push('/tools/mine')
  }
  
  if (!toolListing && !loading) return <Error statusCode={404} />

  return (
    <div className="bg-white">
      <div className="pt-6 pb-16 sm:pb-24">
        <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-4 lg:auto-rows-min lg:gap-x-8">
            {loading
              ? <p>Loading</p>
              : 
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
                  { isPublisher ? 
                        <div className="flex justify-center w-100">
                      <button
                        className="my-4 px-3 py-1 text-white bg-red-500 rounded"
                        onClick={deleteTool}
                      >
                        Eliminar herramienta
                      </button>
                    </div>
                    : <></>
                  }
                </div>
                </>
            }
          </div>
        </div>
      </div>
    </div>
  )
}


export default ToolListingDetail;