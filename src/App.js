import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);

  useEffect(() => {
    axios
      .get("https://6910205145e65ab24ac5ab45.mockapi.io/items")
      .then((res) => setItems(res.data))
      .catch((err) => {
        console.log("Ошибка получения данных");
        alert("Ошибка получения данных");
      });

    axios
      .get("https://6910205145e65ab24ac5ab45.mockapi.io/cart")
      .then((res) => setCartItems(res.data))
      .catch((err) => {
        console.log("Ошибка получения данных");
        alert("Ошибка получения данных");
      });
  }, []);

  const onAddToCart = (obj, isAdded) => {
    if (isAdded) {
      setCartItems((prev) => {
        return prev.filter((product) => {
          return product.name !== obj.name;
        });
      });
    } else {
      axios.post("https://6910205145e65ab24ac5ab45.mockapi.io/cart", obj);
      setCartItems((prev) => {
        return [...prev, obj];
      });
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://6910205145e65ab24ac5ab45.mockapi.io/cart/${id}`);
    setCartItems((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer
          onRemove={onRemoveItem}
          items={cartItems}
          onClose={() => setCartOpened(false)}
        />
      )}
      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart}
            />
          }
        ></Route>

        <Route path="/favorites" element={<Favorites />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
