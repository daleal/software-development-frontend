import type { NextPage } from "next";
import Image from "next/image";
import { useState } from "react";


// Reference: https://tailwindui.com/components/marketing/sections/heroes
const NewListing: NextPage = () => {
  const [selectedImage, setSelectedImage] = useState<File>();

  const onImageChange = (event: React.ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      setSelectedImage(target.files[0]);
    }
  }


  return (
    <form className="px-10 space-y-8 divide-y divide-gray-200 md:px-60">
      <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
        <div>
          <div>
            <h3 className="text-lg font-medium leading-6 text-gray-900">
              Nueva publicación
            </h3>
            <p className="max-w-2xl mt-1 text-sm text-gray-500">
              Comienza con el arriendo de tus herramientas aquí
            </p>
          </div>

          <div className="mt-6 space-y-6 sm:mt-5 sm:space-y-5">
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Titulo de la publicación
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="text"
                  name="first-name"
                  id="first-name"
                  autoComplete="given-name"
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
                />
              </div>
            </div>
            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Precio
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <input
                  type="number"
                  name="price"
                  id="price"
                  autoComplete="given-name"
                  className="block w-full max-w-lg border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm"
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
                  defaultValue={""}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Cuéntanos un poco de la herramienta que quieres arrendar.
                </p>
              </div>
            </div>

            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
              >
                Foto de la herramienta
              </label>
              <div className="mt-1 sm:mt-0 sm:col-span-2">
                <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    {selectedImage
                      ? (
                        <div>
                          <Image
                            src={URL.createObjectURL(selectedImage)}
                            alt="Thumb"
                            width="200"
                            height="200"
                          />
                        </div>
                      ) : (
                        <svg
                          className="w-12 h-12 mx-auto text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                      >
                        <span>Sube un archivo</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={onImageChange}
                        />
                      </label>
                      <p className="pl-1">o arrastra</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF hasta 10MB
                    </p>
                  </div>
                </div>
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
            Publicar herramienta 🚀
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewListing;
