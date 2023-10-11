import logo from '../assets/img/pizza-logo.svg'
import Header from './Header'
import Categories from './Categories'
import Sort from './Sort'
import PizzaBlock from "./PizzaBlock";

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
        <PizzaBlock title="Мексиканская" price={500}/>
        <PizzaBlock title="Аргентинская" price={550}/>
      </div>
    </div>
  </div>
</div>
)

}

export default Main