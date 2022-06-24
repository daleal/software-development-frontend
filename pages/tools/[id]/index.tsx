import { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/solid";
import { RadioGroup } from "@headlessui/react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "@/store";
import { user } from "@/api/index";
import type { NextPage } from "next";
import {
  loadToolListing,
  removeToolListing,
  rentToolListing,
  unrentToolListing,
} from "@/store/modules/toolListings";
import type { Nullable } from "@/types/common";
import type { ToolListing } from "@/types/entities/toolListing";
import Image from "next/image";
import { Status } from "@/types/api/status";
import Custom404 from "../../404";
import Loading from "@/components/Loading";

const ToolListingDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.toolListings);
  const id = parseInt(router.query.id as string, 10);
  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null);
  const [isPublisher, setIsPublisher] = useState<Boolean>(false);
  const [publisher, setPublisher] = useState<Nullable<string>>(null);
  const [isRented, setIsRented] = useState<Boolean>(false);

  useEffect(() => {
    const loadListing = async () => {
      const listing = await dispatch(loadToolListing(id)).unwrap();
      setToolListing(listing);
    };
    loadListing();
  }, [id, dispatch]);

  useEffect(() => {
    const getUserId = async () => {
      if (toolListing) {
        const userData = await user.get();
        const publisherName = (await user.getById(toolListing.publisher))
          .username;
        setPublisher(publisherName);
        setIsPublisher(userData.id == toolListing.publisher);
      }
    };
    getUserId();
  }, [toolListing]);

  useEffect(() => {
    const checkStatus = async () => {
      if (toolListing) {
        setIsRented(toolListing.status == Status.Rented);
      }
    };
    checkStatus();
  }, [toolListing]);

  const deleteTool = async () => {
    await dispatch(removeToolListing(id));
    await router.push("/tools/mine");
  };

  if (!toolListing && !loading) return <Custom404 />;

  const rentTool = async () => {
    await dispatch(rentToolListing(id));
    window.alert("Successfully rented!");
    await router.push("/tools/");
  };

  const unrentTool = async () => {
    await dispatch(unrentToolListing(id));
    window.alert("Successfully republished tool!");
    await router.push("/tools/mine");
  };

  const breadcrumbs = [
    {
      name: "Herramientas",
      id: "tools-breadcrumb",
      href: "/tools",
    },
    {
      name: toolListing?.name,
      id: toolListing?.id,
      href: `/tools/${toolListing?.id}`,
    },
  ];

  return (
    <div>
      <div className="max-w-6xl pt-6 pb-16 mx-auto my-auto border rounded-lg max-h-min sm:pb-24">
        <nav
          aria-label="Breadcrumb"
          className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
        >
          <ol role="list" className="flex items-center space-x-4">
            {breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-4 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    viewBox="0 0 6 20"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                    className="w-auto h-5 text-gray-300"
                  >
                    <path
                      d="M4.878 4.34H3.551L.27 16.532h1.327l3.281-12.19z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                Detalle
              </a>
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="lg:col-start-8 lg:col-span-5">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold text-gray-900">
                  {toolListing?.name}
                </h1>
                <p className="text-xl font-medium text-gray-900">
                  $ {toolListing?.price}
                </p>
              </div>
              <div className="mt-4">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <p className="text-sm text-gray-700">
                    Publicado por {publisher}
                  </p>

                  <div
                    aria-hidden="true"
                    className="ml-4 text-sm text-gray-300"
                  >
                    ·
                  </div>
                  <div className="flex ml-4">
                    <p className="text-sm font-medium text-gray-600 hover:text-gray-500">
                      Contacto: {toolListing?.phoneNumber}
                    </p>
                  </div>
                </div>
              </div>
              {isPublisher ? (
                isRented ? (
                  <button
                    className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-blue-300 border border-transparent rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={unrentTool}
                  >
                    Terminar arriendo
                  </button>
                ) : (
                  <button
                    className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-red-300 border border-transparent rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    onClick={deleteTool}
                  >
                    Eliminar herramienta
                  </button>
                )
              ) : !isRented ? (
                <button
                  className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={rentTool}
                >
                  Arrendar
                </button>
              ) : (
                <></>
              )}
            </div>

            {/* Image gallery */}
            <div className="mt-8 lg:mt-0 lg:col-start-1 lg:col-span-7 lg:row-start-1 lg:row-span-3">
              <h2 className="sr-only">Images</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-3 lg:gap-8">
                <img
                  key={toolListing?.id}
                  src={toolListing?.image}
                  alt={toolListing?.name}
                  className="rounded-lg lg:col-span-2 lg:row-span-2"
                />
              </div>
            </div>

            <div className="mt-8 lg:col-span-5">
              {/* Product details */}
              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">
                  Descripción
                </h2>

                <div className="mt-4 prose-sm prose text-gray-500">
                  {toolListing?.description}
                </div>
              </div>
            </div>
            <div className="mt-8 lg:col-span-5">
              <a
                href={`/tools/${toolListing?.id}/reviews`}
                className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Reseñas
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolListingDetail;
