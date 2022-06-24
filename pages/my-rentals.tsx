import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { loadMyRentals } from "@/store/modules/toolListings";
import { useSelector, useDispatch } from "@/store";
import type { PastToolListing } from "@/types/entities/pastToolListing";
import Loading from "@/components/Loading";

function truncate(input: string) {
  if (input.length > 255) {
    return input.substring(0, 255) + "...";
  }
  return input;
}

const MyRentals: NextPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.toolListings);

  const [toolListings, setToolListings] = useState<PastToolListing[]>([]);

  useEffect(() => {
    const loadListing = async () => {
      const listings = await dispatch(loadMyRentals()).unwrap();
      setToolListings(listings);
    };
    loadListing();
  }, [dispatch]);

  if (loading) return <Loading />;

  return (
    <div className=" max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-7xl font-extrabold tracking-tight text-blue-900">
          Mis arriendos
        </h1>
        <h2 className="text-3xl font-semibold tracking-tight text-gray-500">
          Recuerda devolver tus herramientas.
        </h2>
        {!toolListings.length && (
          <h3 className="text-xl w-full text-center font-semibold text-gray-400 pt-11">
            No has hecho ningún arriendo.
          </h3>
        )}
        <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {toolListings.map((tool) => (
            <div
              key={tool.id}
              className="group relative hover:scale-105 transition duration-150 ease-in-out"
            >
              <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                <img
                  alt={tool.name}
                  className="relative w-full h-full object-center object-cover lg:w-full lg:h-full"
                  src={tool.image}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm font-bold text-gray-700">
                    <a href={`/tools/${tool.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {tool.name}
                    </a>
                  </h3>
                  <p className={`mt-1 text-sm text-gray-500 font-semibold`}>
                    {truncate(tool.description)}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  $ {tool.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyRentals;
