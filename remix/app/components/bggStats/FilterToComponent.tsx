import React from "react";
import SingleSelect from "./SingleSelect";

export default function FilterToComponent(filterLabel: string, props) {
  switch (filterLabel) {
    case "gameName":
      return <SingleSelect {...props} />;
    default:
      return <SingleSelect {...props} />;
  }
}
