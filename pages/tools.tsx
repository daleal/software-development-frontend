import { useGetToolListingsQuery } from "./api/toolListing";
import type { NextPage } from 'next'

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
              data.map(({ id: number}) => 
                <>id</>
              )
            }
          </h3>
        </>
      ) : <>No data</>}
    </>
  )
};

export default Tools
