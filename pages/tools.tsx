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
            {data}
          </h3>
        </>
      ) : null}
    </>
  )
};

export default Tools
