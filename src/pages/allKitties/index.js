import React, { useEffect, useState, useRef, useContext } from "react";
import styles from "./styles.module.scss";
import Kitty from "../../components/kitty/kitty";
import { store } from "../../utils/store";

function AllKitties() {
  const { state, dispatch } = useContext(store);
  const [unmounted, setUnmounted] = useState(false);
  const [page, setPage] = useState(1);
  const [element, setElement] = useState(null);

  // Intersection observer for infinite load
  const observer = useRef(
    new IntersectionObserver((entries) => {
      const bottomElement = entries[0];
      // If bottom element is visible...
      if (bottomElement.isIntersecting) {
        //setPage((prevPage) => prevPage + 1);
      }
    })
  );

  // Returns a promise (json)
  const fetchKitties = async () => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=15&page=${page}&order=Desc`;
    const response = await fetch(url, {
      headers: {
        "x-api-key": process.env.REACT_APP_KEY,
      },
    });
    return response.json();
  };

  const loadKitties = async () => {
    const response = await fetchKitties();
    if (!unmounted) {
      dispatch({ type: "ADD_KITTIES", payload: response });
    }
  };

  useEffect(() => {
    loadKitties();

    return () => {
      setUnmounted(true);
    };
  }, []);

  useEffect(() => {
    if (page > 1) {
      loadKitties();
    }
  }, [page]);

  // Attach observer
  useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;

    if (currentElement) {
      currentObserver.observe(currentElement);
    }
  }, [element]);

  return (
    <div className={styles.container}>
      {state.kitties && (
        <>
          <ul>
            {state.kitties.map((kitty, idx) => (
              <Kitty key={idx} kitty={kitty} />
            ))}
          </ul>
          <p ref={setElement}>... загружаем еще котиков ...</p>
        </>
      )}
    </div>
  );
}

export default AllKitties;
