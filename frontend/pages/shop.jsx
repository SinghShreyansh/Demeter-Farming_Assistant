import React from "react";
import Admin from "layouts/Admin.js";
import FertilizerShop from "components/FertilizerShop";

export default function Shop() {
  return (
    <Admin
      title="Fertilizer Recommendation"
      headerText="Enter details to get fertilizer recommendations"
    >
      <div className="flex flex-wrap mt-4 justify-center">
        <div className="w-full mb-12 xl:mb-0 px-4">
          <FertilizerShop />
        </div>
      </div>
    </Admin>
  );
}
