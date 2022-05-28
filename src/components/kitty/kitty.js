import React, { useEffect, useState } from "react";
import Like from "./Like";
import Unlike from "./Unlike";
import styles from "./styles.module.scss";

function Kitty({ kitty }) {
  const [liked, setLiked] = useState(false);
  const [hovered, setHovered] = useState(undefined);

  // Check if this image has been liked
  // Return bool
  const isLiked = () => {
    let alreadyLiked = localStorage.getItem("liked");

    if (alreadyLiked) {
      alreadyLiked = JSON.parse(alreadyLiked); // array from string
      for (let i = 0; i < alreadyLiked.length; i++) {
        if (alreadyLiked[i] === kitty.id) {
          return true;
        }
      }
      return false;
    } else {
      return false;
    }
  };

  useEffect(() => {
    setLiked(isLiked());
  }, []);

  return (
    <li
      className={styles.container}
      onMouseEnter={() => {
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
      }}
    >
      <img alt="cat" src={kitty.url} width="255" height="255" />
      {hovered ? (
        liked ? (
          <Unlike id={kitty.id} setLiked={setLiked} />
        ) : (
          <Like id={kitty.id} setLiked={setLiked} />
        )
      ) : null}
    </li>
  );
}

export default Kitty;
