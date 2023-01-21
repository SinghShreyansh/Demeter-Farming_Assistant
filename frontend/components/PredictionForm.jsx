import React from "react";
import { useState } from "react";
import axios from "axios";
import Tables from "pages/admin/predict_table";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    location : "mumbai"
  });

  const [output, setOutput] = useState([]);

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
      .post("http://127.0.0.1:5000/forecast", {
        location: formData.location,
      })
      .then(function (response) {
        setOutput(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    setFormData({
      location: formData.location,
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
                htmlFor="location"
              >
                Location
              </label>
              <input
                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                id="location"
                name="location"
                type="text"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                required
              />
            </div>
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
             <Tables TableData={output}/>
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

export default PredictionForm;
