import logo from '../assets/img/pizza-logo.svg'
import Header from './Header'
import Categories from './Categories'
import Sort from './Sort'
import PizzaBlock from "./PizzaBlock";
import pizzas from '../assets/pizzas.json'

function Main() {

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
          pizzas.map((obj) => (
              <PizzaBlock
                  title={obj.title}
                  price={obj.price}
                  imageUrl={obj.imageUrl}
                  sizes={obj.sizes}
                  types={obj.types}
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