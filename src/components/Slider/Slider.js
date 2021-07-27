import React, { useRef, useState } from "react";
import "./style.scss";

const Slider = ({ sendFromValue, sendToValue, hasScale, ...props }) => {
  const thumb = useRef(null);
  const slider = useRef(null);
  const [initialThumbLeft, setInitialThumbLeft] = useState(0);

  function moveAt(pageX, shift) {
    const currentThumbPosition = pageX - slider.current.offsetLeft; // left point of current position of thumb on slider
    if (
      currentThumbPosition > 0 &&
      currentThumbPosition < slider.current.offsetWidth
    ) {
      const left = Math.round(((currentThumbPosition - shift) * 100) / slider.current.offsetWidth);
      const rightEdge = Math.round(
        (slider.current.offsetWidth - thumb.current.offsetWidth) * 100 / slider.current.offsetWidth
      );

      if (left < 0) {
        setInitialThumbLeft(0);
        sendFromValue && sendFromValue(0); //? send From value to parent element
        sendToValue && sendToValue(0); //? send TO value to parent element
      } else if (left > rightEdge) {
        setInitialThumbLeft(rightEdge);
        sendFromValue && sendFromValue(rightEdge); //? send From value to parent element
        sendToValue && sendToValue(rightEdge); //? send TO value to parent element
      } else {
        setInitialThumbLeft(left);
        sendFromValue && sendFromValue(left); //? send From value to parent element
        sendToValue && sendToValue(left); //? send TO value to parent element
      }
    }
  }

  const handleMousedown = (event) => {
    const shiftX = event.clientX - thumb.current.getBoundingClientRect().left;

    moveAt(event.pageX, shiftX);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      thumb.current.onMouseUp = null;
    });
  };

  function handleDragStart() {
    return false;
  }

  const handleSliderClick = (event) => {
    const shiftX = thumb.current.getBoundingClientRect().width / 2;
    moveAt(event.pageX, shiftX);
  };

  return (
    <div className="slider" ref={slider} onClick={handleSliderClick}>
      <div
        className="thumb"
        style={{
          left: `${initialThumbLeft}%`,
        }}
        onMouseDown={handleMousedown}
        onDragStart={() => handleDragStart}
        ref={thumb}
      ></div>
      {hasScale && (
        <div className="scale">
          <span>00:00</span>
          <span>06:00</span>
          <span>12:00</span>
          <span>18:00</span>
          <span>23:59</span>
        </div>
      )}
    </div>
  );
};

export default Slider;
