import React from "react";
import Link from "next/link";

const HomeContent = () => {
  return (
    <>
      <div className="h-max w-full pb-10">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/atharva7/image/upload/v1664643964/samples/planttree_af1zl9.jpg"
            className="bg-cover h-full w-full"
          />
          <h1 className="absolute text-5xl text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Demeter, Smart Agriculture
          </h1>
          <h2 className="absolute text-3xl text-amber-400 bottom-4 left-1/2 -translate-x-1/2">
            Cultivate efficiently with us!
          </h2>
          {/* <h3 className="absolute text-2xl text-blue-300 top-5 left-5">Top Left</h3> */}
          {/* <h3 className="absolute text-2xl text-green-300 bottom-5 right-5">Bottom Right</h3> */}
        </div>
      </div>

      <div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full px-10 mb-32">
          <div class="shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              class="object-cover w-full h-48"
              src="https://res.cloudinary.com/atharva7/image/upload/v1664685129/samples/cropdisease_diqtm2.jpg"
              alt="Flower and sky"
            />

            <div class="relative p-4">
              <h3 class="text-base md:text-xl font-medium text-gray-800">
                Disease
              </h3>

              <p class="mt-2 mb-5 text-base md:text-lg text-gray-600">
                Demeter allows you to identify dangerous crop diseases and apply
                an individual approach to treat them, thus increasing disease
                prevention effectively.
              </p>
              <button className="absolute bottom-0 right-0 mr-2 mb-1 mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                <Link href="/Disease">Diagnose</Link>
              </button>
            </div>
          </div>

          <div class="shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              class="object-cover w-full h-48"
              src="https://res.cloudinary.com/atharva7/image/upload/v1664685601/samples/cropspic_o5xbqf.jpg"
              alt="Flower and sky"
            />

            <div class="relative p-4">
              <h3 class="text-base md:text-xl font-medium text-gray-800">
                Crop
              </h3>

              <p class="mt-2 mb-5 text-base md:text-lg text-gray-600">
                Various factors like minerals present in the soil, temperature and humidity play an important role in deciding the type of the crop. Gather more information about the same, here.
              </p>
              <button className="absolute bottom-0 right-0 mr-2  mb-1 mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                <Link href="/Crop">Learn More</Link>
              </button>
            </div>
          </div>

          <div class="shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              class="object-cover w-full h-48"
              src="https://res.cloudinary.com/atharva7/image/upload/v1664685601/samples/fertilizerimg_bzzkcj.jpg"
              alt="Flower and sky"
            />

            <div class="relative p-4">
              <h3 class="text-base md:text-xl font-medium text-gray-800">
                Fertilizer
              </h3>

              <p class="mt-2 mb-5 text-base md:text-lg text-gray-600">
                The amount of fertilizers added to soil during the period of
                cultivation can greatly affect the soil pH and nutrients. Know
                the right amount from Demeter.
              </p>
              <button className="absolute bottom-0 right-0 mr-2 mb-1 mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                <Link href="/Fertilizer">Calculate</Link>
              </button>
            </div>
          </div>

          <div class="shadow hover:shadow-md w-full bg-white rounded-lg overflow-hidden cursor-pointer">
            <img
              class="object-cover w-full h-48"
              src="https://res.cloudinary.com/atharva7/image/upload/v1664701500/samples/weatherimg_uqrzpx.jpg"
              alt="Flower and sky"
            />

            <div class="relative p-4">
              <h3 class="text-base md:text-xl font-medium text-gray-800">
                Weather
              </h3>

              <p class="mt-2 mb-5 text-base md:text-lg text-gray-600">
                Weather plays an important role in Agriculture.
                Know the weather with predictions from Demeter.
              </p>
              <button className="absolute bottom-0 right-0 mr-2 mb-1 mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full">
                <Link href="/Weather">Predict</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeContent;
