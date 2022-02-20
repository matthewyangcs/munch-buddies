import { useState, useCallback } from "react";

const useShowOnClick = (setShow, time) => {
  const [show, setShow] = useState(false);
  const [id, setId] = useState(null);

  const onClick = useCallback(() => {
    if (id) {
      clearInterval(id);
    }
    if (show) {
      return;
    }

    setShow(true);
    const nextId = setInterval(() => setShow(false), time);
    setId(nextId);
  }, [time]);

  return show, onClick;
};
