import React from "react";

// components

import CardLineChart from "components/Cards/CardLineChart.js";
import CardBarChart from "components/Cards/CardBarChart.js";
import CardPageVisits from "components/Cards/CardPageVisits.js";
import CardSocialTraffic from "components/Cards/CardSocialTraffic.js";

// layout for page

import Admin from "layouts/Admin.js";
import UploadImage from "components/Cards/UploadImage";
// import DiseaseForm from "components/DiseaseForm";
import FruitDiseaseForm from "components/FruitDiseaseForm";
export default function Disease_fruit() {
  return (
    <Admin
      title="Disease Detection"
      headerText="Upload Image to detect crop disease"
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <FruitDiseaseForm />
        </div>
      </div>
    </Admin>
  );
}
