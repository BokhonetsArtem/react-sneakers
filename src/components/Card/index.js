import styles from "./Card.module.scss";
import { useState } from "react";

export default function Card({ name, price, imageUrl, onPlus }) {
  const [isAdded, setIsAdded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const onClickFavorite = () => {
    setIsLiked(!isLiked);
  };

  const onClickPlus = () => {
    setIsAdded(!isAdded);
    onPlus({ name, price, imageUrl }, isAdded);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          onClick={onClickFavorite}
          src={isLiked ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="Unliked"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="Sneakers" />
      <h5>{name}</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>

        <img
          className={styles.imgBtnPlus}
          onClick={onClickPlus}
          width={30}
          height={30}
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="Plus"
        />
      </div>
    </div>
  );
}
