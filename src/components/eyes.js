import React, { useEffect } from "react";
import "./eyes.css";

function Eyes() {
  useEffect(() => {
    document.querySelector("body").addEventListener("mousemove", eyeball);

    return () => {
      document
        .querySelector("body")
        .removeEventListener("mousemove", eyeball);
    };
  }, []);

  function eyeball(event) {
    const eyes = document.querySelectorAll(".eyes");
    eyes.forEach(function (eye) {
      let x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
      let y = eye.getBoundingClientRect().top + eye.clientHeight / 2;

      let radian = Math.atan2(event.pageX - x, event.pageY - y);
      let rotate = radian * (180 / Math.PI) * -1 + 270;
      eye.style.transform = "rotate(" + rotate + "deg)";
    });
  }

  return (
    <div className="eye-container">
      <div className="eyes"></div>
    </div>
  );
}

export default Eyes;
