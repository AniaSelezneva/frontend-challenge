import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import Kitty from "../../components/kitty/kitty";

function FavKitties() {
  const [kitties, setKitties] = useState();

  const getFavs = () => {
    let liked = localStorage.getItem("liked");

    // If there are liked items in the local storage
    if (liked) {
      liked = JSON.parse(liked); // array from string

      const paths = [];
      for (let i = 0; i < liked.length; i++) {
        const path = `https://api.thecatapi.com/v1/images/${liked[i]}`;
        paths.push(path);
      }

      return paths;
    }
  };

  useEffect(() => {
    const promises = [];
    const favUrls = getFavs();

    if (favUrls) {
      favUrls.forEach((url) => {
        const getBody = async () => {
          const response = await fetch(url, {
            headers: {
              "x-api-key": process.env.REACT_APP_KEY,
            },
          });
          return response.json();
        };

        promises.push(getBody());
      });

      const getFavKitties = async () => {
        const kitties = await Promise.all(promises);
        setKitties(kitties);
      };

      getFavKitties();
    }
  }, []);

  return (
    <div className={styles.container}>
      {kitties ? (
        <ul>
          {kitties.map((kitty, idx) => (
            <Kitty key={idx} kitty={kitty} />
          ))}
        </ul>
      ) : (
        <p>Пожалуйста, добавьте любимых котиков</p>
      )}
    </div>
  );
}

export default FavKitties;
