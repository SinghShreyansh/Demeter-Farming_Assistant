import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const FruitDiseaseForm = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setFile({
      selectedFile: event.target.files[0],
    });

    setImageSrc(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    let data = new FormData();
    console.log(file);
    data.append("file", file.selectedFile);

    await axios
      .post("http://127.0.0.1:5000/predict-fruit-disease",data)
      .then(function (response) {
        console.log(response);
        // let newData = String(response.data.prediction);
        // const formatted = newData.split("\n");
        // console.log(formatted);
        // console.log(newData);
        setOutput(response.data);
        console.log(output);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <form onSubmit={handleSubmit} class="w-full max-w-lg mx-auto py-10">
        <div class="flex w-full items-center justify-center bg-grey-lighter">
          <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-blue-700">
            <svg
              class="w-8 h-8"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span class=" text-base leading-normal">Select a file</span>
            <input
              id="file"
              name="file"
              type="file"
              class="hidden"
              onChange={handleChange}
            />
          </label>
        </div>
        {imageSrc && (
          <div className="flex justify-center mt-6">
            <img src={imageSrc} alt="img" />
          </div>
        )}

        <div className="text-center mt-6">
          <button
            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-48 ease-linear transition-all duration-150"
            type="submit"
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
          <div
            class="mt-2 p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
            role="alert"
          >
            <span class="font-medium">Output:</span>
           
              <p>{output}</p>
            
          </div>
        ) : (
          <div className="flex justify-center">
            <img src="https://res.cloudinary.com/sarveshp46/image/upload/v1673158646/nothing-here_w38mzj.webp" />
          </div>
        )}
      </form>
    </div>
  );
};

export default FruitDiseaseForm;