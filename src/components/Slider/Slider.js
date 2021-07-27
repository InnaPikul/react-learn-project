import React, { useRef, useState } from "react";
import "./style.scss";

const Slider = (props) => {
  const thumb = useRef(null);
  const slider = useRef(null);
  const [thumbLeft, setThumbLeft] = useState(null);

  const sendFromValue = (value) => {
    props.sendFrom(value);
  }

  const sendToValue = (value) => {
    props.sendTo(value);
  }

  const sendWidth = (value) => {
    props.sendWidth(value);
  }

  function moveAt(pageX, shift) {
    const currentThumbPosition = pageX - slider.current.offsetLeft; // left point of current position of thumb on slider
    sendWidth(slider.current.offsetWidth - thumb.current.offsetWidth); // send width value to parent element
    if (currentThumbPosition > 0 && currentThumbPosition < slider.current.offsetWidth) { 
      const left = Math.round(currentThumbPosition - shift);
      const rightEdge = Math.round(slider.current.offsetWidth - thumb.current.offsetWidth);
      if (left < 0) {
        setThumbLeft(0); 
        props.sendFrom && sendFromValue(0); //? send From value to parent element
        props.sendTo && sendToValue(0); //? send TO value to parent element
      }
      else if (left > rightEdge) {
        setThumbLeft(rightEdge);
        props.sendFrom && sendFromValue(rightEdge); //? send From value to parent element
        props.sendTo && sendToValue(rightEdge); //? send TO value to parent element
      } else {
        setThumbLeft(left);
        props.sendFrom && sendFromValue(left); //? send From value to parent element
        props.sendTo && sendToValue(left); //? send TO value to parent element
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
    const shiftX = (thumb.current.getBoundingClientRect().width / 2);
    moveAt(event.pageX, shiftX);
  }

  return (
    <div className="slider" ref={slider} onClick={handleSliderClick}>
      <div
        className="thumb"
        style={{
          left: `${thumbLeft}px`,
        }}
        onMouseDown={handleMousedown}
        onDragStart={() => handleDragStart}
        ref={thumb}
      ></div>
      {props.hasScale && <div className="scale">
        <span>00:00</span>
        <span>06:00</span>
        <span>12:00</span>
        <span>18:00</span>
        <span>23:59</span>
      </div>}
      
    </div>
  );
};

export default Slider;
