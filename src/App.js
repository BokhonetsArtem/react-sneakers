import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import { AppContext } from "./AppContext";

function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [cartOpened, setCartOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const itemsResponse = await axios.get(
          "https://6910205145e65ab24ac5ab45.mockapi.io/items"
        );

        setIsLoading(false);

        setItems(itemsResponse.data);
      } catch (error) {
        console.log("Произошла ошибка при получении данных");
        alert("Произошла ошибка при получении данных");
      }
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.some((cartItem) => cartItem.name === obj.name)) {
      setCartItems((prev) =>
        prev.filter((cartItem) => cartItem.name !== obj.name)
      );
    } else {
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (obj) => {
    setCartItems((prev) => {
      return prev.filter((item) => item.name !== obj.name);
    });
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (name) => {
    return cartItems.some((obj) => obj.name === name);
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        setCartItems,
        isItemAdded,
        onAddToCart,
        setCartOpened,
      }}
    >
      <div className="wrapper clear">
        <div>
          <Drawer
            onRemove={onRemoveItem}
            items={cartItems}
            onClose={() => setCartOpened(false)}
            opened={cartOpened}
          />
        </div>
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
                isLoading={isLoading}
              />
            }
          ></Route>

          <Route path="/favorites" element={<Favorites />} exact></Route>
          <Route path="/orders" element={<Orders />} exact></Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
