import { useEffect, useState } from 'react'
import type { NextPage } from 'next'
import { loadToolListings } from '@/store/modules/toolListings'
import { useSelector, useDispatch } from '@/store'
import type { ToolListing } from '@/types/entities/toolListing'
import Image from 'next/image'
import Link from 'next/link'
import type { ChangeEvent, Dispatch, SetStateAction } from 'react'

const ListTools: NextPage = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector((state) => state.toolListings)

  const [search, setSearch] = useState('')
  const [toolListings, setToolListings] = useState<ToolListing[]>([])
  const [shownToolListings, setShownToolListings] = useState<ToolListing[]>([])

  useEffect(() => {
    const loadListing = async () => {
      const listings = await dispatch(loadToolListings()).unwrap()
      setToolListings(listings)
    }
    loadListing()
  }, [dispatch])

  const bindFormEventData = (valueSetter: Dispatch<SetStateAction<string>>) => (
    (event: ChangeEvent<HTMLInputElement>) => valueSetter(event.target.value)
  )

  useEffect(() => {
    if (search.trim() === '') {
      setShownToolListings(toolListings)
    } else {
      const shown = toolListings.filter(
        (listing) => listing.name.toLowerCase().includes(search.trim().toLowerCase())
      )
      setShownToolListings(shown)
    }
  }, [search, toolListings])

  return <div>
    <div className=" m-24 bg-white shadow overflow-hidden sm:rounded-md text-center">
      <div className="text-blue-800 font-bold text-2xl mb-2 m-10">
        Herramientas
      </div>
      <input
        type="text"
        id="search"
        className={`
          block w-full px-3 py-2 border rounded-md text-sm shadow-sm focus:outline-none
          focus:ring-1 h-12 text-gray-900 bg-white border-slate-300 placeholder-slate-400
          focus:ring-blue-500 focus:border-blue-500
        `}
        placeholder="search..."
        value={search}
        onChange={bindFormEventData(setSearch)}
      />
      <div className="grid grid-cols-4 gap-8 m-10">
        {
          loading ? <>loading...</> : shownToolListings.map((tool: ToolListing) => (
            <Link key={tool.id} href="/tools/[id]" as={`/tools/${tool.id}`} passHref>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className='relative w-full h-44'>
                  <Image
                    alt={tool.name}
                    className="rounded-t-lg"
                    layout="fill" // required
                    objectFit="cover"
                    src={tool.image}
                  />
                </div>
                <div className="p-5">
                  <div className="font-bold text-xl text-blue-800">{ tool.name }</div>
                  <p className="text-sm text-gray-500">Precio: ${ tool.price }</p>
                </div>
              </div>
            </Link>
          ))
        }
        <button className="m-24 text-2xl bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-20 h-20">
          +
        </button>
      </div>
    </div>

    </div>

}

export default ListTools
