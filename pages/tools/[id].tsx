import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/solid'
import { RadioGroup } from '@headlessui/react'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from '@/store'
import { user } from '@/api/index'
import type { NextPage } from 'next'
import { loadToolListing, removeToolListing, rentToolListing, unrentToolListing } from '@/store/modules/toolListings'
import type { Nullable } from '@/types/common'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'
import { Status } from '@/types/api/status'


const ToolListingDetail: NextPage = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)
  const id = parseInt(router.query.id as string, 10)
  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null)
  const [isPublisher, setIsPublisher] = useState<Boolean>(false)
  const [isRented, setIsRented] = useState<Boolean>(false)

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

  useEffect(() => {
    const checkStatus = (async () => {
      if (toolListing) {
        setIsRented(toolListing.status == Status.Rented)
      }
    })
    checkStatus()
  }, [toolListing])

  const deleteTool = async () => {
    await dispatch(removeToolListing(id))
    await router.push('/tools/mine')
  }

  const rentTool = async () => {
    await dispatch(rentToolListing(id))
    window.alert('Successfully rented!')
    await router.push('/tools/')
  }

  const unrentTool = async () => {
    await dispatch(unrentToolListing(id))
    window.alert('Successfully republished tool!')
    await router.push('/tools/mine')
  }

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
                        <h2 className="font-bold text-yellow-400 xl"> $ {toolListing.price} </h2>
                        <p className="text-sm text-gray-500"> Para arrendar esta herramienta por favor
                        contáctate directamente con el arrendador. </p>
                        <p className="text-sm text-gray-500"> Número de contacto:  </p>
                      </div>
                  </div>
                  { isPublisher ?
                      isRented ?
                        <div className="flex justify-center w-100">
                          <button
                            className="my-4 px-3 py-1 text-white bg-red-500 rounded"
                            onClick={unrentTool}
                          >
                            Terminar arriendo
                          </button>
                        </div>
                      :
                        <div className="flex justify-center w-100">
                          <button
                            className="my-4 px-3 py-1 text-white bg-red-500 rounded"
                            onClick={deleteTool}
                          >
                            Eliminar herramienta
                          </button>
                        </div>
                    : 
                      !isRented ? 
                        <div className="flex justify-center w-100">
                          <button
                            className="my-4 px-3 py-1 text-white bg-blue-500 rounded"
                            onClick={rentTool}
                          >
                            Arrendar
                          </button>
                        </div>
                      : <></>
                  }
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