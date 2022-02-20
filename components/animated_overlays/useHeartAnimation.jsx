import { useState, useCallback, useMemo, useEffect, useRef } from "react";

const useShowOnClick = (time) => {
  const [show, setShow] = useState(false);
  const id = useRef(null);

  useEffect(() => {
    return () => clearInterval(id.current);
  }, []);

  const onClick = useCallback(() => {
    if (show) {
      return;
    }

    if (id.current) {
      clearInterval(id.current);
    }

    setShow(true);
    const nextId = setInterval(() => setShow(() => false), time);
    id.current = nextId;
  }, [time, show]);

  return {
    show: show,
    onClick: onClick,
  };
};

export default useShowOnClick;
