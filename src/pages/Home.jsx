import Card from "../components/Card";

export default function Home({
  items,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToCart,
}) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>
          {searchValue ? `Поиск по запросу: "${searchValue}"` : "Все кроссовки"}
        </h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img
              onClick={() => setSearchValue("")}
              className="clear  cu-p"
              src="/img/btn-remove.svg"
              alt="Clear"
            />
          )}
          <input
            value={searchValue}
            onChange={onChangeSearchInput}
            placeholder="Поиск..."
          />
        </div>
      </div>

      <div className="cards d-flex flex-wrap">
        {items
          .filter((item) =>
            item.name.toLowerCase().includes(searchValue.toLowerCase())
          )
          .map((item, index) => {
            return (
              <Card
                key={index}
                price={item.price}
                name={item.name}
                imageUrl={item.imageUrl}
                onPlus={onAddToCart}
              />
            );
          })}
      </div>
    </div>
  );
}
