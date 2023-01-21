import React from "react";

// components

import TableComponent from "components/Cards/TableComponent.js";

// layout for page

import Admin from "layouts/Admin.js";

export default function Tables({TableData}) {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <TableComponent color="dark" TableData={TableData}/>
        </div>
      </div>
    </>
  );
}

Tables.layout = Admin;
