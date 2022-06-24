import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "@/store";
import type { NextPage } from "next";
import { loadReviews, loadToolListing, } from "@/store/modules/toolListings";
import type { Nullable } from "@/types/common";
import type { ToolListing } from "@/types/entities/toolListing";
import Custom404 from "../../../404";
import { Review } from "@/types/entities/review";

const ToolListingDetail: NextPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.toolListings);
  const id = parseInt(router.query.id as string, 10);
  const [toolListing, setToolListing] = useState<Nullable<ToolListing>>(null);
  const [reviews, setReviews] = useState<Array<Review>>([]);

  useEffect(() => {
    const loadListing = async () => {
      const listing = await dispatch(loadToolListing(id)).unwrap();
      setToolListing(listing);
    };
    loadListing();
  }, [id, dispatch]);


  useEffect(() => {
    const getReviews = async () => {
      const loadedReviews = await dispatch(loadReviews()).unwrap();
      setReviews(loadedReviews.filter(({ listing }) => listing === id));
    };
    getReviews();
  }, [id, dispatch]);

  if (!toolListing && !loading) return <Custom404 />;

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
    {
      name: "Reseñas",
      id: "tools-reviews",
      href: `/tools/${toolListing?.id}/reviews`,
    }
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
                Lista
              </a>
            </li>
          </ol>
        </nav>
        <div className="max-w-2xl px-4 mx-auto mt-8 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:auto-rows-min lg:gap-x-8">
            <div className="mt-8 lg:col-span-5">
              <a
                href={`/tools/${toolListing?.id}/reviews/create`}
                className="flex items-center justify-center w-full px-8 py-3 mt-8 text-base font-medium text-white bg-yellow-300 border border-transparent rounded-md hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
              >
                Crear Reseña
              </a>
            </div>
            <div className="mt-8 lg:col-span-5">
              {reviews.map(review => (
                <div key={review.id}>
                  <p>Puntaje: {review.score}</p>
                  <p> Descripción: {review.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ToolListingDetail;
