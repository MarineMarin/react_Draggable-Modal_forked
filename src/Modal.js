import React, { useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

const Modal = (props) => {
  const [isDragging, setIsDragging] = useState(false);
  const modalRef = useRef(null);
  const startY = useRef(0);
  const currentY = useRef(0);
  const startDragTime = useRef(0);

  const handleTouchStart = (e) => {
    startY.current = e.touches[0].clientY;
    currentY.current = e.touches[0].clientY;
    console.log("handleTouchStart", startY.current, "it's meeeeeeee");

    startDragTime.current = Date.now();
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) {
      return;
    }
    currentY.current = e.touches[0].clientY;
    console.log("handleTouchMove", currentY.current);
    const diffY = currentY.current - startY.current;
    const isMoveDown = diffY > 0; // Only allow downward movement
    if (isMoveDown && modalRef.current) {
      modalRef.current.style.transform = `translateY(${diffY}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) {
      return;
    }
    const diffY = currentY.current - startY.current;
    const elapsedTime = Date.now() - startDragTime.current;
    console.log("handleTouchEnd", elapsedTime, diffY);
    if (elapsedTime < 200 && Math.abs(diffY) < 10) {
      // Considered a tap or click
      console.log("handleTouchEnd > click");
      setIsDragging(false);
      return;
    }

    if (diffY > 100) {
      console.log("handleTouchEnd > close");

      //need close without transition
      props.onClose();
      //setIsDragging(false);
    } else {
      console.log("handleTouchEnd > else");

      if (modalRef.current) {
        modalRef.current.style.transform = "translateY(0)";
      }
    }
  };

  const onCloseClicked = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    console.log("onCloseClicked", isDragging);
    props.onClose();
  };

  return (
    <CSSTransition
      mountOnEnter
      unmountOnExit
      exit={!isDragging}
      in={props.showModal}
      timeout={{ enter: 700, exit: 700 }}
      classNames="modal"
    >
      <div
        className="modal"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={modalRef}
      >
        <h2>This is modal</h2>
        <button className="button" onClick={onCloseClicked}>
          Close Modal
        </button>
      </div>
    </CSSTransition>
  );
};

export default Modal;
