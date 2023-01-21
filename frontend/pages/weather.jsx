import React from "react";
import Admin from "layouts/Admin.js";
import PredictionForm from "components/PredictionForm";

export default function WeatherPrediction() {
  return (
    <Admin
      title="Weather Prediction"
      headerText="Enter details to predict weather"
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <PredictionForm />
        </div>
      </div>
    </Admin>
  );
}
