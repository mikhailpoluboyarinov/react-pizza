import React, {useState, useEffect} from "react";
import Header from './Header'
import Categories from './Categories'
import Sort from './Sort'
import PizzaBlock from "./PizzaBlock";

function Main() {
  const [items,setItems] = useState([]);

  useEffect(() => {
    fetch('https://63dbe3dac45e08a043508e92.mockapi.io/items')
        .then((res) => res.json())
        .then((arr) => {
      setItems(arr);
    })
  }, []);

return (
<div className="wrapper">
  <Header />
  <div className="content">
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {
          items.map((obj) => (
              <PizzaBlock
                  key={obj.id}
                  {...obj}
              />
          ))
        }
      </div>
    </div>
  </div>
</div>
)

}

export default Main