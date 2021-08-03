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

  const getExactThumbValues = (event) => { 
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

  function moveAt(pageX, shift, setValue, thumbRef) {
    const currentThumbPosition = pageX - slider.current.offsetLeft; // left point of current position of thumb on slider
    if (
      currentThumbPosition > 0 &&
      currentThumbPosition < slider.current.offsetWidth
    ) {
      const left = Math.round(
        ((currentThumbPosition - shift) * 100) / slider.current.offsetWidth
      );
      const rightEdge = Math.round(
        ((slider.current.offsetWidth + thumbRef.current.offsetWidth) * 100) /
          slider.current.offsetWidth
      );
      if (left < 0) {
        setValue(0);
        sendFromValue && sendFromValue(0);
        sendToValue && sendToValue(0);
      } else if (left > rightEdge) {
        setValue(rightEdge);
        sendFromValue && sendFromValue(rightEdge);
        sendToValue && sendToValue(rightEdge);
        console.log('rightEdge', rightEdge);
      } else {
        setValue(left);
        sendFromValue && sendFromValue(left);
        sendToValue && sendToValue(left);
      }
    }
  }

  const handleMousedown = (event) => {
    let thumb = getExactThumbValues(event);
    const shiftX = event.clientX - thumb.ref.current.getBoundingClientRect().left;
    moveAt(event.pageX, shiftX, thumb.action, thumb.ref);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX, thumb.action, thumb.ref);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      thumb.ref.current.onMouseUp = null;
    });
  };

  const defineRangeSize = () => {

  }

  const handleRangeMousedown = (event) => {
    const shiftX = event.clientX - rangeRef.current.getBoundingClientRect().left;
    //moveAt(event.pageX, shiftX, setRangeLeft, rangeRef);

    function onMouseMove(event) {
      moveAt(event.pageX, shiftX, setRangeLeft, rangeRef);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      rangeRef.current.onMouseUp = null;
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
          onMouseDown={handleRangeMousedown}
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
