import React, { useEffect } from "react";
import "./eyes.css";
function Eyes() {
    useEffect(function () {
        document.querySelector("body").addEventListener("mousemove", eyeball);
        return function () {
            document
                .querySelector("body")
                .removeEventListener("mousemove", eyeball);
        };
    }, []);
    function eyeball(event) {
        var eyes = document.querySelectorAll(".eyes");
        eyes.forEach(function (eye) {
            var x = eye.getBoundingClientRect().left + eye.clientWidth / 2;
            var y = eye.getBoundingClientRect().top + eye.clientHeight / 2;
            var radian = Math.atan2(event.pageX - x, event.pageY - y);
            var rotate = radian * (180 / Math.PI) * -1 + 270;
            eye.style.transform = "rotate(" + rotate + "deg)";
        });
    }
    return (React.createElement("div", { className: "eye-container" },
        React.createElement("div", { className: "eyes" })));
}
export default Eyes;
