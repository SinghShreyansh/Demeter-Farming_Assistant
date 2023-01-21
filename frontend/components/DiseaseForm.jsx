import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactLoading from "react-loading";

const DiseaseForm = () => {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [imageSrc, setImageSrc] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  const handleChange = (event) => {
    setFile({
      selectedFile: event.target.files[0],
    });

    setImageSrc(URL.createObjectURL(event.target.files[0]));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsDisabled(true);
    setIsLoading(true);
    let data = new FormData();
    console.log(file);
    data.append("file", file.selectedFile);

    await axios
      .post("http://127.0.0.1:5000/disease-predict2", data)
      .then(function (response) {
        setIsDisabled(false);
        const formatted = response.data.how_to_use.split("\n");
        function removeItem(array, item) {
          return array.filter((i) => i !== item);
        }
        const withOutEmpty = removeItem(formatted, "");
        const newData = response.data;
        newData.how_to_use = withOutEmpty;
        console.log(newData);
        if (newData.title.toLowerCase().includes("healthy")) {
          newData.isHealthy = true;
        } else {
          newData.isHealthy = false;
        }
        setOutput(newData);
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
              required
            />
          </label>
        </div>
        {imageSrc && (
          <div className="flex justify-center mt-6">
            <img src={imageSrc} alt="img" />
          </div>
        )}

        <div className="flex justify-center mt-6">
          {/* <button
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
      </form>
      {output ? (
        <div
          class="mt-2 mx-6 p-4 mb-4 text-lg text-green bg-white rounded-lg"
          role="alert"
        >
          {/* <div className="text-center text-2xl">
            <span className="font-bold">Disease:</span> {output.title}
          </div> */}

          {output.isHealthy ? (
            <div
              class="bg-green-100 border-t-4 border-green-500 rounded-b text-green-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div class="flex">
                <div class="py-1">
                  <svg
                    class="fill-current h-6 w-6 text-green-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <p class="font-bold text-xl">Disease:</p>
                  <p class="text-lg ml-4">{output.title}</p>
                </div>
              </div>
            </div>
          ) : (
            <div
              class="bg-red-100 border-t-4 border-red-500 rounded-b text-red-900 px-4 py-3 shadow-md"
              role="alert"
            >
              <div class="flex">
                <div class="py-1">
                  <svg
                    class="fill-current h-6 w-6 text-red-500 mr-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
                  </svg>
                </div>
                <div className="flex items-center">
                  <p class="font-bold text-xl">Disease:</p>
                  <p class="text-lg ml-4">{output.title}</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <span className="font-bold">Description:</span> {output.desc}
          </div>
          <div className="mt-4">
            <span className="font-bold">Prevention Measures:</span>{" "}
            {output.prevent}
          </div>
          <p className="mt-6 font-bold text-center text-2xl">Cure Measures</p>
          <div className="flex justify-center mt-4 w-48 mx-auto">
            <img src={output.simage} alt="" />
          </div>
          <div className="mt-4 text-center">
            <span className="font-bold">Supplement Name:</span> {output.sname}
          </div>

          <div className="mt-4 text-center">
            <span className="font-bold">Buy Now: </span>
            <a
              href={output.buy_link}
              target="_blank"
              rel="noreferrer"
              className="text-lightBlue-500 hover:text-lightBlue-600"
            >
              {output.buy_link}
            </a>
          </div>
          <div className="mt-4">
            <span className="font-bold">How to use:</span>{" "}
            {output.how_to_use.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <img src="https://res.cloudinary.com/sarveshp46/image/upload/v1673158646/nothing-here_w38mzj.webp" />
        </div>
      )}
    </div>
  );
};

export default DiseaseForm;
