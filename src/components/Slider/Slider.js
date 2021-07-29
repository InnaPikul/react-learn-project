import React, { useRef, useState } from "react";
import "./style.scss";

const Slider = ({
  sendFromValue,
  sendToValue,
  hasScale,
  hasRange,
  fromValue,
  toValue,
  firstThumbRef,
  firstThumbLeft,
  setFirstThumbLeft,
  secondThumbRef,
  secondThumbLeft,
  setSecondThumbLeft,
  //getSliderWidth,
}) => {
  const initialThumbRef = useRef(null);
  const slider = useRef(null);
  const [initialThumbLeft, setInitialThumbLeft] = useState(5);
  const rangeWidth = secondThumbLeft - firstThumbLeft;

  const getExactThumbValues = (event) => { 
    if (event.target.id === "firstThumb") {
      if (firstThumbLeft) {
        return {
          action: setFirstThumbLeft,
          leftValue: firstThumbLeft,
          ref: firstThumbRef,
        }
      } else {
        return {
          action : setInitialThumbLeft,
          leftValue : initialThumbLeft,
          ref : initialThumbRef,
        }
      }
    } else if (event.target.id === "secondThumb") {
      return {
        action : setSecondThumbLeft,
        leftValue : secondThumbLeft,
        ref : secondThumbRef,
      }
    }
  };

  function moveAt(pageX, shift, setValue, value, ref) {
    //getSliderWidth && getSliderWidth(slider.current.offsetWidth);
    const currentThumbPosition = pageX - slider.current.offsetLeft; // left point of current position of thumb on slider
    console.log('pageX', pageX);
    console.log('slider.current.offsetLeft', slider.current.offsetLeft);
    if (
      currentThumbPosition > 0 &&
      currentThumbPosition < slider.current.offsetWidth
    ) {
      const left = Math.round(
        ((currentThumbPosition - shift) * 100) / slider.current.offsetWidth
      );
      const rightEdge = Math.round(
        ((slider.current.offsetWidth - ref.current.offsetWidth) * 100) /
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
    let thumb = getExactThumbValues(event);
    const shiftX = event.clientX - thumb.ref.current.getBoundingClientRect().left;
    console.log('event.clientX', event.clientX);
    console.log('thumb.ref.current.getBoundingClientRect().left', thumb.ref.current.getBoundingClientRect().left);
    moveAt(event.pageX, shiftX, thumb.action, thumb.leftValue, thumb.ref);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX, thumb.action, thumb.leftValue, thumb.ref);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      thumb.ref.current.onMouseUp = null;
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
        id="firstThumb"
        className="thumb"
        style={{
          left: `${
            fromValue || toValue || firstThumbLeft || initialThumbLeft
          }%`,
        }}
        onDragStart={() => handleDragStart}
        ref={firstThumbRef || initialThumbRef}
        onMouseDown={handleMousedown}
      ></div>
      {hasRange && (
        <div
          id="secondThumb"
          className="thumb"
          style={{
            left: `${secondThumbLeft}%`,
          }}
          onDragStart={() => handleDragStart}
          ref={secondThumbRef}
          onMouseDown={handleMousedown}
        ></div>
      )}
      {hasRange && (
        <div
          className="range-space"
          style={{
            left: `${firstThumbLeft}%`,
            width: `${rangeWidth}%`,
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
