// Libs
import React from "react";
import { browserHistory } from "react-router";

// Images
import stampImage from "./images/stamp.svg";

// Styles
import "./Category.css";

const Category = ({ image, stampText, name, soldQty, onClick, qs }) => {
  return (
    <div
      className="Category__container"
      onClick={() => {
        onClick();
        browserHistory.push(`/search?${qs}`);
      }}
    >
      <span className="Category__stamp">
        <div className="Category__stamp-body">
          <img src={stampImage} alt="stamp" />
          <span>{stampText}</span>
        </div>
      </span>
      <div className="Category__card">
        <div className="Category__name">{name}</div>

        <img className="Category__image" src={image} alt="Category" />
      </div>
      <div className="Category__sold">
        <span>Sold</span>
        {soldQty} items last month
      </div>
    </div>
  );
};

export default Category;



// WEBPACK FOOTER //
// ./src/newDropshipperApp/component/modalConductor/topCategoriesModal/Category.js