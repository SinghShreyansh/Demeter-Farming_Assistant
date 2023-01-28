import React from "react";
import Layout from "./Layout";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const FertilizerForm = () => {
  const [formData, setFormData] = useState({
    Location: "mumbai",
    Moist: 0,
    Soil: 0,
    Crop: 0,
    N: 0,
    K: 0,
    P: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [output, setOutput] = useState(null);
  const handleChange = (event) => {
    setFormData((prevState) => {
      return {
        ...prevState,
        [event.target.name]: event.target.value,
      };
    });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    console.log(formData);
    let data = null;

    await axios
      .post("http://127.0.0.1:5000/fertilizer-predict", {
        location: formData.Location,
        Moist: Number(formData.Moist),
        Soil: Number(formData.Soil),
        Crop: Number(formData.Crop),
        N: Number(formData.N),
        K: Number(formData.K),
        P: Number(formData.P),
      })
      .then(function (response) {
        setIsDisabled(false);
        setIsLoading(false);
        data = response.data;
        console.log(data);
        setOutput(data);
        console.log(output);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData({
      Location: formData.Location,
      Moist: 0,
      Soil: 0,
      Crop: 0,
      N: 0,
      K: 0,
      P: 0,
    });
  };
  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      {/* <div className="flex items-center justify-center mt-5 mb-30">
        <form onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Temperature
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-none-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="Temp"
                type="number"
                placeholder="temperature"
                name="Temp"
                required
                min="-10"
                max="50"
                onChange={handleChange}
                value={formData.Temp}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Humidity
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="Hum"
                placeholder="Humidity"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.Hum}
                name="Hum"
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Moisture
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-none-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="Moist"
                type="number"
                placeholder="Moisture"
                name="Moist"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.Moist}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Nitrogen
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="N"
                type="number"
                placeholder="Nitrogen"
                name="N"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.N}
              />
            </div>
          </div>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Potassium
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-none-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="K"
                type="number"
                placeholder="Potassium"
                name="K"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.K}
              />
            </div>
            <div className="w-full md:w-1/2 px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-last-name"
              >
                Phosphorus
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="P"
                type="number"
                placeholder="Phosphorous"
                name="P"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.P}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-2">
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Crop Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Crop"
                  name="Crop"
                  required
                  onChange={handleChange}
                  value={formData.Crop}
                >
                  <option value="0">Barley</option>
                  <option value="1" selected>
                    Cotton
                  </option>
                  <option value="2">Ground Nuts</option>
                  <option value="3">Maize</option>
                  <option value="4">Millets</option>
                  <option value="5">Oil seeds</option>
                  <option value="6">Paddy</option>
                  <option value="7">Pulses</option>
                  <option value="8">Sugarcane</option>
                  <option value="9">Tobacco</option>
                  <option value="10">Wheat</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                for="grid-state"
              >
                Soil Type
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="Soil"
                  name="Soil"
                  required
                  onChange={handleChange}
                  value={formData.Soil}
                >
                  <option value="0">Black</option>
                  <option value="1" selected>
                    Clayey
                  </option>
                  <option value="2">Loamy</option>
                  <option value="3">Red</option>
                  <option value="4">Sandy</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            <button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded h-10 mt-6 ml-10">
              Submit
            </button>
            {output && (
              <div
                class="mt-5 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
                role="alert"
              >
                <span class="font-medium">Recommended Fertilizer:</span>
                {output}
              </div>
            )}
          </div>
        </form>
      </div> */}

      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="mb-3 mr-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="Location"
              >
                Location
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="Location"
                placeholder="Location"
                name="Location"
                required
                onChange={handleChange}
                value={formData.Location}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="Moist"
              >
                Moisture
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="Moist"
                type="number"
                placeholder="Moisture"
                name="Moist"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.Moist}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="N"
              >
                Nitrogen (in PPM)
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="N"
                type="number"
                placeholder="Nitrogen"
                name="N"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.N}
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="K"
              >
                Potassium (in PPM)
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="K"
                type="number"
                placeholder="Potassium"
                name="K"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.K}
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="P"
              >
                Phosphorus (in PPM)
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="P"
                type="number"
                placeholder="Phosphorous"
                name="P"
                required
                min="0"
                max="100"
                onChange={handleChange}
                value={formData.P}
              />
            </div>
          </div>
          <div className="mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="Crop"
            >
              Crop Type
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="Crop"
              name="Crop"
              required
              onChange={handleChange}
              value={formData.Crop}
            >
              <option value="0">Barley</option>
              <option value="1" selected>
                Cotton
              </option>
              <option value="2">Ground Nuts</option>
              <option value="3">Maize</option>
              <option value="4">Millets</option>
              <option value="5">Oil seeds</option>
              <option value="6">Paddy</option>
              <option value="7">Pulses</option>
              <option value="8">Sugarcane</option>
              <option value="9">Tobacco</option>
              <option value="10">Wheat</option>
            </select>
          </div>

          <div className="mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="Soil"
            >
              Soil Type
            </label>
            <select
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="Soil"
              name="Soil"
              required
              onChange={handleChange}
              value={formData.Soil}
            >
              <option value="0">Black</option>
              <option value="1" selected>
                Clayey
              </option>
              <option value="2">Loamy</option>
              <option value="3">Red</option>
              <option value="4">Sandy</option>
            </select>
          </div>

          <div className="flex justify-center mt-6">
            {/* <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              Submit
            </button> */}
            <button
              type="submit"
              disabled={isDisabled}
              className="w-96 h-12 flex justify-center items-center text-md text-white bg-blueGray-800 hover:bg-blueGray-800 transition-all font-medium rounded-lg px-5 py-2.5 text-center"
            >
              {isLoading ? (
                <ReactLoading
                  type="bars"
                  color="#ffffff"
                  height={25}
                  width={25}
                />
              ) : (
                "Submit"
              )}
            </button>
          </div>

          {output ? (
            <div className="px-6 py-4 border-0 rounded relative my-4">
              <div
                class="bg-blue-100 border-t-4 border-blue-500 rounded-b flex text-blue-900 px-4 py-3 shadow-md"
                role="alert"
              >
                <div class="flex">
                  <div class="py-1">
                    <svg
                      class="fill-current h-6 w-6 text-blue-500 mr-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                    </svg>
                  </div>
                </div>
                <div className="flex items-center">
                  <p class="font-bold text-xl">Recommended Fertilizer: </p>
                  <p class="text-lg ml-4">{output.name}</p>
                </div>
              </div>
              <div className="flex justify-center mt-10">
                <img className="w-96" src={output.img} alt="" />
              </div>
              <div className="mt-4">
                <p class="font-bold text-xl">How to use: </p>
                <p class="text-lg">{output.how_to_use}</p>
              </div>
              <div className="flex justify-center">
                <span className="inline-block align-middle">
                  <b className="capitalize"> </b>{" "}
                </span>
              </div>
              <button className="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none">
                <span></span>
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <img src="https://res.cloudinary.com/sarveshp46/image/upload/v1673158646/nothing-here_w38mzj.webp" />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default FertilizerForm;
