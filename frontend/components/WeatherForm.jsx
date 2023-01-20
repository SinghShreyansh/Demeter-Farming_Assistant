import React from "react";
import { useState } from "react";
import axios from "axios";

const WeatherForm = () => {
  const [formData, setFormData] = useState({
    tempr: 0,
    air_pressure: 0,
    wind_speed: 0,
    wind_direction: 0,
    relative_humidity: 0,
  });

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
    console.log(formData);

    await axios
      .post("http://127.0.0.1:5000/weather-predict", {
        tempr: Number(formData.tempr),
        air_pressure: Number(formData.air_pressure),
        wind_speed: Number(formData.wind_speed),
        wind_direction: Number(formData.wind_direction),
        relative_humidity: Number(formData.relative_humidity),
      })
      .then(function (response) {
        setOutput(response.data.data);
        console.log(output);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData({
      tempr: 0,
      air_pressure: 0,
      wind_speed: 0,
      wind_direction: 0,
      relative_humidity: 0,
    });
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex-auto px-4 lg:px-10 py-10">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2">
            <div className="mb-3 mr-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="tempr"
              >
                Temperature
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="tempr"
                name="tempr"
                type="number"
                value={formData.tempr}
                onChange={handleChange}
                placeholder="Temperature"
                required
              />
            </div>

            <div className="mb-3 ml-2">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="air_pressure"
              >
                Air Pressure
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="air_pressure"
                name="air_pressure"
                value={formData.air_pressure}
                onChange={handleChange}
                type="number"
                placeholder="Air Pressure"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2">
            <div className="mr-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="wind_speed"
              >
                Wind Speed
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="wind_speed"
                name="wind_speed"
                value={formData.wind_speed}
                onChange={handleChange}
                type="number"
                placeholder="Wind Speed"
                required
              />
            </div>

            <div className="ml-2 mb-3">
              <label
                className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                htmlFor="wind_direction"
              >
                Wind Direction
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="wind_direction"
                name="wind_direction"
                value={formData.wind_direction}
                onChange={handleChange}
                type="number"
                placeholder="Wind Direction"
                required
              />
            </div>
          </div>
          <div className="mr-2 mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="relative_humidity"
            >
              Relative Humidity
            </label>
            <input
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              id="relative_humidity"
              name="relative_humidity"
              value={formData.relative_humidity}
              onChange={handleChange}
              type="number"
              placeholder="Relative Humidity"
              required
            />
          </div>

          <div className="text-center mt-6">
            <button
              className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
              type="submit"
            >
              Submit
            </button>
          </div>

          {output ? (
            <div
              class="mt-2 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
              role="alert"
            >
              <span class="font-medium">Output:</span>
              {output}
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

export default WeatherForm;
