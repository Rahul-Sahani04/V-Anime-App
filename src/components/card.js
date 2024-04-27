import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./card.css";

const Card_Component = ({
  title,
  type,
  year,
  id,
  image,
  index,
  status,
  TotalEp,
  genre,
  manga,
  color
}) => {
  return (
    <Link
      to={{
        pathname: "/details",
        search: `?id=${id}${manga ? "&manga=true" : ""}`,
      }}
      className={"main-card"}
    >
      <div class="card">
        <div class="imgBx">
          <img src={image} />
        </div>
        <div class="content" style={{backgroundColor: color &&  color + "40"}}>
          <div class="contentBx">
            <h3>
              {title}
              <br />
              <span style={{ paddingTop: !year && "5px" }}>
                {year ? year : "Manga"}
              </span>
            </h3>
          </div>

          <ul class="sci">
            <li style={{ "--i": 1 }}>{genre && genre[0]}</li>
            <li style={{ "--i": 2 }}>{genre?.[1]}</li>
            <li style={{ "--i": 3 }}>{genre?.[2]}</li>
          </ul>
          <ul class="sci">
            <li style={{ "--i": 1 }}>{type ? type : genre && genre[0]}</li>
            <li style={{ "--i": 2 }}>{status ? status : genre?.[1]}</li>
            <li style={{ "--i": 3 }}>{TotalEp ? TotalEp : genre?.[2]}</li>
          </ul>
        </div>
      </div>
    </Link>
  );
};

export default Card_Component;
