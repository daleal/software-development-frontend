import { useGetToolListingsQuery } from './api/toolListing'
import type { NextPage } from 'next'
import { ToolListing } from '@/types/entities/toolListing'

const Tools: NextPage = () => {
  
  const { data, error, isLoading, isFetching } = useGetToolListingsQuery()

  return (
    <>
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <>Loading...</>
      ) : data ? (
        <>
          <h3>
            {
              data.map((tool: ToolListing) => 
                <>{tool.id}</>
              )
            }
          </h3>
        </>
      ) : <>No data</>}
    </>
  )
};

export default Tools
