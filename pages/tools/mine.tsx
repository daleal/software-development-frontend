import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { loadMyToolListings } from "@/store/modules/toolListings";
import { useSelector, useDispatch } from "@/store";
import type { ToolListing } from "@/types/entities/toolListing";
import Image from "next/image";
import Link from "next/link";
import { Status } from "@/types/api/status";
import { BarLoader } from "react-spinners";

const MyTools: NextPage = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.toolListings);

  const [toolListings, setToolListings] = useState<ToolListing[]>([]);

  useEffect(() => {
    const loadListing = async () => {
      const listings = await dispatch(loadMyToolListings()).unwrap();
      setToolListings(listings);
    };
    loadListing();
  }, [dispatch]);

  const statusStyle = (status: Status) => {
    switch (status) {
      case Status.Rented:
        return "text-green-400";
      case Status.Unpublished:
        return "text-red-400";
      default:
        return "text-blue-400";
    }
  };

  const statusName = (status: Status) => {
    switch (status) {
      case Status.Rented:
        return "Arrendado";
      case Status.Unpublished:
        return "No Publicado";
      default:
        return "Disponible";
    }
  };

  return (
    <div className=" max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-7xl font-extrabold tracking-tight text-gray-900">
          Mis herramientas
        </h1>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-500">
          Algo así como una caja de herramientas.
        </h1>

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
                  <p
                    className={`mt-1 text-sm text-gray-500 font-semibold ${statusStyle(
                      tool.status
                    )}`}
                  >
                    {statusName(tool.status)}
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

export default MyTools;
