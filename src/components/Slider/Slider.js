import React, { useEffect, useRef, useState } from "react";
import Scale from "./Scale";
import "./style.scss";
import Tooltip from "./Tooltip";

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
  tooltipFrom,
  tooltipTo,
}) => {
  const initialThumbRef = useRef(null);
  const slider = useRef(null);
  const [initialThumbLeft, setInitialThumbLeft] = useState(0);
  const [cursor, setCursor] = useState("grab");
  const [showTooltip, setShowTooltip] = useState(() => false);
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
          setShowTooltip: setShowTooltip,
        };
      } else if (fromValue !== undefined) {
        return {
          action: sendFromValue,
          leftValue: fromValue,
          ref: initialThumbRef,
          setShowTooltip: setShowTooltip,
        };
      } else if (toValue !== undefined) {
        return {
          action: sendToValue,
          leftValue: toValue,
          ref: initialThumbRef,
          setShowTooltip: setShowTooltip,
        };
      } else {
        return {
          action: setInitialThumbLeft,
          leftValue: initialThumbLeft,
          ref: initialThumbRef,
          setShowTooltip: setShowTooltip,
        };
      }
    } else if (event.target.id === "secondThumb") {
      return {
        action: setSecondThumbLeft,
        leftValue: secondThumbLeft,
        ref: secondThumbRef,
        setShowTooltip: setShowTooltip,
      };
    } else if (event.target.id === "range") {
      return {
        action: setRangeLeft,
        leftValue: rangeLeft,
        ref: rangeRef,
        setShowTooltip: setShowTooltip,
      };
    }
  };

  const handleMousedown = (event) => {
    let thumb = getExactThumbParametrs(event);
    let lastPosition = event.clientX;
    setCursor("grabbing");
    thumb.setShowTooltip(true);

    function onMouseMove(event) {
      let currentPosition = event.clientX;
      let d =
        ((currentPosition - lastPosition) * 100) / slider.current.offsetWidth; // delta in %
      let newPos = thumb.leftValue + d;
      if (newPos > 100 || newPos < 0) {
        return;
      }
      thumb.action(newPos);
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      thumb.ref.current.onMouseUp = null;
      setCursor("grab");
      thumb.setShowTooltip(() => false);
    });
  };

  function handleDragStart() {
    return false;
  }

  const getValue = () => {
    if (fromValue !== undefined) {
      return fromValue;
    } else if (toValue !== undefined) {
      return toValue;
    } else if (firstThumbLeft !== undefined) {
      return firstThumbLeft;
    } else {
      return initialThumbLeft;
    }
  };
  return (
    <div className="slider" ref={slider}>
      <div
        id="firstThumb"
        className="thumb"
        style={{
          left: `${getValue()}%`,
          cursor: `${cursor}`,
        }}
        onDragStart={() => handleDragStart}
        ref={firstThumbRef || initialThumbRef}
        onMouseDown={handleMousedown}
      >
        {tooltipFrom && showTooltip && <Tooltip value={tooltipFrom} />}
      </div>
      {hasRange && (
        <div
          id="secondThumb"
          className="thumb"
          style={{
            left: `${secondThumbLeft}%`,
            cursor: `${cursor}`,
          }}
          onDragStart={() => handleDragStart}
          ref={secondThumbRef}
          onMouseDown={handleMousedown}
        >
          {tooltipTo && showTooltip && <Tooltip value={tooltipTo} />}
        </div>
      )}
      {hasRange && (
        <div
          id="range"
          className="range-space"
          style={{
            left: `${rangeLeft}%`,
            width: `${secondThumbLeft - firstThumbLeft}%`,
            cursor: `${cursor}`,
          }}
          ref={rangeRef}
          onDragStart={() => handleDragStart}
          onMouseDown={handleMousedown}
        ></div>
      )}
      {hasScale && <Scale />}
    </div>
  );
};

export default Slider;
