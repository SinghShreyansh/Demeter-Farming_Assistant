import React from "react";
import { useState } from "react";
import axios from "axios";
import Tables from "pages/admin/predict_table";
import ReactLoading from "react-loading";

const PredictionForm = () => {
  const [formData, setFormData] = useState({
    location: "",
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

    await axios
      .post("http://127.0.0.1:5000/forecast", {
        location: formData.location,
      })
      .then(function (response) {
        setOutput(response.data);
        setIsDisabled(false);
        setIsLoading(false);
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
          <div className="">
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

          <div className="flex justify-center mt-6">
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
            <div class="mt-2 p-4 mb-4 text-sm rounded-lg" role="alert">
              <Tables TableData={output} />
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
