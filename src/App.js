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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponse = await axios.get(
        "https://6910205145e65ab24ac5ab45.mockapi.io/items"
      );

      setIsLoading(false);

      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((cartItem) => cartItem.itemId == obj.itemId)) {
      setCartItems((prev) =>
        prev.filter((cartItem) => cartItem.itemId != obj.itemId)
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
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
              isLoading={isLoading}
            />
          }
        ></Route>

        <Route path="/favorites" element={<Favorites />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
