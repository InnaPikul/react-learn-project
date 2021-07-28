import React, { useRef, useState } from "react";
import "./style.scss";

const Slider = ({
  sendFromValue,
  sendToValue,
  hasScale,
  hasRange,
  initialFrom,
  initialTo,
  ...props
}) => {
  const thumb = useRef(null);
  const secondThumb = useRef(null);
  const slider = useRef(null);
  const [initialThumbLeft, setInitialThumbLeft] = useState(30);
  const [secondThumbLeft, setSecondThumbLeft] = useState(50);

  function moveAt(pageX, shift, setValue, value) {
    const currentThumbPosition = pageX - slider.current.offsetLeft; // left point of current position of thumb on slider
    if (
      currentThumbPosition > 0 &&
      currentThumbPosition < slider.current.offsetWidth
    ) {
      const left = Math.round(
        ((currentThumbPosition - shift) * 100) / slider.current.offsetWidth
      );
      const rightEdge = Math.round(
        ((slider.current.offsetWidth - thumb.current.offsetWidth) * 100) /
          slider.current.offsetWidth
      );

      if (left < 0) {
        value && setValue(0);
        sendFromValue && sendFromValue(0);
        sendToValue && sendToValue(0);
      } else if (left > rightEdge) {
        value && setValue(rightEdge);
        sendFromValue && sendFromValue(rightEdge);
        sendToValue && sendToValue(rightEdge);
      } else {
        value && setValue(left);
        sendFromValue && sendFromValue(left);
        sendToValue && sendToValue(left);
      }
    }
  }

  const handleMousedown = (event) => {
    const shiftX = event.clientX - thumb.current.getBoundingClientRect().left;
    moveAt(event.pageX, shiftX, setInitialThumbLeft, initialThumbLeft);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX, setInitialThumbLeft, initialThumbLeft);
      console.log(1);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      thumb.current.onMouseUp = null;
    });
  };

  const handleMousedownRight = (event) => {
    const shiftX =
      event.clientX - secondThumb.current.getBoundingClientRect().left;

    moveAt(event.pageX, shiftX, setSecondThumbLeft, secondThumbLeft);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX, setSecondThumbLeft, secondThumbLeft);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      secondThumb.current.onMouseUp = null;
    });
  };

  function handleDragStart() {
    return false;
  }

  // const handleSliderClick = (event) => {
  //   const shiftX = thumb.current.getBoundingClientRect().width / 2;
  //   moveAt(event.pageX, shiftX);
  // };

  return (
    <div
      className="slider"
      ref={slider}
      // onClick={handleSliderClick}
    >
      <div
        className="thumb"
        style={{
          // left: `${initialThumbLeft || initialFrom || initialTo}%`,
          left: `${initialThumbLeft}%`,
        }}
        onDragStart={() => handleDragStart}
        ref={thumb}
        onMouseDown={handleMousedown}
      ></div>
      {hasRange && (
        <div
          className="thumb"
          style={{
            left: `${secondThumbLeft}%`,
          }}
          onDragStart={() => handleDragStart}
          ref={secondThumb}
          onMouseDown={handleMousedownRight}
        ></div>
      )}
      {hasRange && (
        <div
          className="range-space"
          style={{
            left: `${initialThumbLeft}%`,
            width: `${secondThumbLeft - initialThumbLeft}%`
          }}
        ></div>
      )}
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
