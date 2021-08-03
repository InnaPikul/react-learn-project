import React, { useEffect, useRef, useState } from "react";
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
  rangeRef,
  rangeLeft,
  setRangeLeft,
  rangeWidth,
  getRangeWidth,
}) => {
  const initialThumbRef = useRef(null);
  const slider = useRef(null);
  const [initialThumbLeft, setInitialThumbLeft] = useState(0);
  useEffect(() => {
    rangeWidth !== undefined && getRangeWidth(secondThumbLeft - firstThumbLeft);
  });
  
  const getExactThumbParametrs = (event) => { 
    if (event.target.id === "firstThumb") {
      if (firstThumbLeft !== undefined) {
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
    }else if (event.target.id === "range") {
      return {
        action : setRangeLeft,
        leftValue : rangeLeft,
        ref : rangeRef,
      }
    }
  };

  const handleMousedown = (event) => {
    let thumb = getExactThumbParametrs(event);
    let lastPosition = event.clientX;
    
    function onMouseMove(event) {
      let currentPosition = event.clientX;
      let d = (currentPosition - lastPosition) * 100 / slider.current.offsetWidth; // delta in %
      let newPos = (thumb.leftValue + d);
      if (newPos > 100 || newPos < 0) {
        return
      }
      thumb.action(newPos); // Math.round??
      sendFromValue && sendFromValue(newPos);
      sendToValue && sendToValue(newPos);
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

  const getValue = () => {
    if (fromValue !== undefined) {
      return fromValue
    } 
    else if (toValue !== undefined) {
      return toValue
    } 
    else if (firstThumbLeft !== undefined) {
      return firstThumbLeft
    } else {
      return initialThumbLeft
    }
  }
  return (
    <div
      className="slider"
      ref={slider}
    >
      <div
        id="firstThumb"
        className="thumb"
        style={{
          left: `${getValue()}%`,
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
          id="range"
          className="range-space"
          style={{
            left: `${rangeLeft}%`,
            width: `${secondThumbLeft - firstThumbLeft}%`,
          }}
          ref={rangeRef}
          onDragStart={() => handleDragStart}
          onMouseDown={handleMousedown}
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
