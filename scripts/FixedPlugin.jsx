/*eslint-disable*/
import React, { useState, useEffect } from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classnames from "classnames";

import imagine1 from "assets/img/sidebar1.jpg";
import imagine2 from "assets/img/sidebar2.jpg";
import imagine3 from "assets/img/sidebar3.jpg";
import imagine4 from "assets/img/sidebar4.jpg";
import { Button } from '@material-ui/core'

export default function FixedPlugin(props) {
  const [image, setImage] = useState(props.image);
  const [color, setColor] = useState(props.color);
  const [fixedClasses, setFixedClasses] = useState("dropdown show");

  useEffect(() => {
    if (image == null || color == null) {
      setImage("");
      setColor("blue");
    }

  }, []);

  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };

  const setBackground = (color, image) => {
    setColor(color);
    setImage(image);
  };

  return (
    <div
      className={classnames("fixed-plugin", {
        "rtl-fixed-plugin": props.rtlActive
      })}
    >
      <div id="fixedPluginClasses" className={fixedClasses}>
        <Button onClick={handleFixedClick}>
          <i className="fa fa-cog fa-2x" />
        </Button>
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
                    props.handleColorClick("purple");
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
                    props.handleColorClick("blue");
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
                    props.handleColorClick("green");
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
                    props.handleColorClick("red");
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
                    props.handleColorClick("orange");
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
                props.handleImageClick(imagine1);
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
                props.handleImageClick(imagine2);
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
                props.handleImageClick(imagine3);
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
                props.handleImageClick(imagine4);
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
  image: PropTypes.string,
  rtlActive: PropTypes.bool,
  color: PropTypes.string,
  handleColorClick: PropTypes.func,
  handleImageClick: PropTypes.func
};
