import { AppContext } from "../AppContext";
import Info from "./Info";
import { useState, useContext } from "react";

export default function Drawer({ items = [], onClose, onRemove }) {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { setCartItems } = useContext(AppContext);

  const onClickOrder = () => {
    setIsLoading(true);
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="d-flex justify-between mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn  cu-p"
            src="/img/btn-remove.svg"
            alt="Close"
          />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items">
              {items.map((item) => {
                return (
                  <div
                    key={item.name}
                    className="cartItem d-flex align-center mb-20"
                  >
                    <div
                      style={{ backgroundImage: `url(${item.imageUrl})` }}
                      className="cartItemImg"
                    ></div>
                    <div className="mr-20 flex">
                      <p className="mb-5">{item.name}</p>
                      <b>{item.price} руб.</b>
                    </div>
                    <img
                      onClick={() => onRemove(item)}
                      className="removeBtn"
                      src="/img/btn-remove.svg"
                      alt="Remove"
                    />
                  </div>
                );
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1064 руб.</b>
                </li>
              </ul>
              <button
                className="greenButton"
                onClick={onClickOrder}
                disabled={isLoading}
              >
                Оформить заказ
                <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>{" "}
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? "Ваш заказ скоро будет передан курьерской доставке"
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete
                ? "/img/complete-order.jpg"
                : "/img/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
}
