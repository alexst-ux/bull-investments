import { useEffect, useRef } from "react";

function useOutsideClick(handleFn, listenCapturing = true) {
  const refElement = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (refElement.current && !refElement.current.contains(e.target)) {
        handleFn();
      }
    }
    document.addEventListener("click", handleClick, listenCapturing);

    return () => {
      document.removeEventListener("click", handleClick, listenCapturing);
    };
  }, [handleFn, listenCapturing]);

  return refElement;
}

export default useOutsideClick;
