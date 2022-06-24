import type { FormEvent } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";
import { createReview } from "@/store/modules/toolListings";
import { useDispatch } from "@/store";
import { useRouter } from "next/router";

// Reference: https://tailwindui.com/components/marketing/sections/heroes
const NewListing: NextPage = () => {
  const dispatch = useDispatch();

  const [description, setDescription] = useState("");
  const [score, setScore] = useState<number>(3);

  const router = useRouter()
  const id = parseInt(router.query.id as string, 10);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const created = await dispatch(
      createReview({
        description,
        score,
        listing: id,
      })
    ).unwrap();
    if (created) {
      router.push(`/tools/${id}/reviews`);
    }
  };

  return (
    <div className="max-w-6xl p-10 mx-auto mb-5 border border-gray-300 rounded-lg">
      <form onSubmit={submit} className=" md:px-60">
        <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
          <div>
            <h1 className="text-6xl font-extrabold text-gray-900">
              Nueva Reseña
            </h1>
            <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="score"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Puntaje de la Reseña
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <input
                    type="number"
                    name="score"
                    id="score"
                    min="1"
                    max="5"
                    className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                    value={score}
                    onChange={(e) => {
                      let value = Number(e.target.value)
                      if (value < 1) value = 1;
                      else if (value > 5) value = 5;
                      setScore(value)
                    }}
                    required
                  />
                </div>
              </div>
              <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                >
                  Descripción
                </label>
                <div className="mt-1 sm:mt-0 sm:col-span-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full max-w-lg border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                    required
                  />
                  <p className="mt-2 text-sm text-gray-500">
                    Cuéntanos un poco de tu experiencia con esta herramienta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-5">
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex justify-center px-4 py-2 ml-3 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Publicar reseña 🚀
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewListing;
