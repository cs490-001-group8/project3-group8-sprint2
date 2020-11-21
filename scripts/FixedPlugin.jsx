/*eslint-disable*/
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

import imagine1 from "assets/img/sidebar1.jpg";
import imagine2 from "assets/img/sidebar2.jpg";
import imagine3 from "assets/img/sidebar3.jpg";
import imagine4 from "assets/img/sidebar4.jpg";

export default function FixedPlugin({ changeBackground }) {
  const [image, setImage] = useState(localStorage.getItem('image'));
  const [color, setColor] = useState(localStorage.getItem('color'));
  const [fixedClasses, setFixedClasses] = useState("dropdown");

  useEffect(() => {
    let cacheColor = color;
    let cacheImage = image;

    if (cacheImage == null || cacheColor == null) {
      cacheColor = 'blue';
      cacheImage = '';
    }

    saveChanges(cacheImage, cacheColor);
  }, []);

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };

  const handleImageClick = (img) => {
    saveChanges(img, '');
  };

  const handleColorClick = (clr) => {
    saveChanges('', clr);
  };

  const setBackground = (color, image) => {
    setColor(color);
    setImage(image);
  };

  const saveChanges = (img, clr) => {
    setColor(clr);
    setImage(img);

    localStorage.setItem('color', clr);
    localStorage.setItem('image', img);

    changeBackground(clr, img);
  };

  return (
    <div
      className="fixed-plugin"
    >
      <div id="fixedPluginClasses" className={fixedClasses}>
        <button onClick={handleFixedClick} className="login-button">
          <i className="fa fa-cog" />
        </button>
        <ul className="dropdown-menu">
          <li className="header-title">COLORS</li>
          <li className="adjustments-line">
            <a className="switch-trigger">
              <div>
                <span
                  className={
                    color === "purple"
                      ? "badge filter badge-purple active"
                      : "badge filter badge-purple"
                  }
                  data-color="purple"
                  onClick={() => {
                    setBackground("purple", "");
                    handleColorClick("purple");
                  }}
                />
                <span
                  className={
                    color === "blue"
                      ? "badge filter badge-blue active"
                      : "badge filter badge-blue"
                  }
                  data-color="blue"
                  onClick={() => {
                    setBackground("blue", "");
                    handleColorClick("blue");
                  }}
                />
                <span
                  className={
                    color === "green"
                      ? "badge filter badge-green active"
                      : "badge filter badge-green"
                  }
                  data-color="green"
                  onClick={() => {
                    setBackground("green", "");
                    handleColorClick("green");
                  }}
                />
                <span
                  className={
                    color === "red"
                      ? "badge filter badge-red active"
                      : "badge filter badge-red"
                  }
                  data-color="red"
                  onClick={() => {
                    setBackground("red", "");
                    handleColorClick("red");
                  }}
                />
                <span
                  className={
                    color === "orange"
                      ? "badge filter badge-orange active"
                      : "badge filter badge-orange"
                  }
                  data-color="orange"
                  onClick={() => {
                    setBackground("orange", "");
                    handleColorClick("orange");
                  }}
                />
              </div>
            </a>
          </li>
          <li className="header-title">IMAGES</li>
          <li className={image === imagine1 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBackground("", imagine1);
                handleImageClick(imagine1);
              }}
            >
              <img src={imagine1} alt="..." />
            </a>
          </li>
          <li className={image === imagine2 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBackground("", imagine2);
                handleImageClick(imagine2);
              }}
            >
              <img src={imagine2} alt="..." />
            </a>
          </li>
          <li className={image === imagine3 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBackground("", imagine3);
                handleImageClick(imagine3);
              }}
            >
              <img src={imagine3} alt="..." />
            </a>
          </li>
          <li className={image === imagine4 ? "active" : ""}>
            <a
              className="img-holder switch-trigger"
              onClick={() => {
                setBackground("", imagine4);
                handleImageClick(imagine4);
              }}
            >
              <img src={imagine4} alt="..." />
            </a>
          </li>
          <li className="adjustments-line" />
        </ul>
      </div>
    </div>
  );
}

FixedPlugin.propTypes = {
  changeBackground: PropTypes.func.isRequired,
};
