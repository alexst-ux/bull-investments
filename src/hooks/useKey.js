import { useEffect } from "react";

function useKey(key, action) {
  useEffect(
    function () {
      const callback = (e) => {
        if (e?.code?.toLowerCase() === key.toLowerCase()) {
          action();
        }
      };

      document.addEventListener("keyup", callback);

      // remove event listener
      return function () {
        document.removeEventListener("keyup", callback);
      };
    },
    [key, action]
  );
}

export default useKey;
