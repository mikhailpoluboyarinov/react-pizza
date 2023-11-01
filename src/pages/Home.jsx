import React, {useState, useEffect} from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";

function Home() {
    const [items,setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [sortType, setSortType] = useState({
        name: 'популярности',
        sortProperty: 'rating',
    });

    useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty;

        setIsLoading(true);
        fetch(`https://63dbe3dac45e08a043508e92.mockapi.io/items?${
            category
        }&sortBy=${sortBy}&order=desc`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={(i) => setCategoryId(i)}
                />
                <Sort
                    sortType={sortType}
                    onClickSort={(i) => setSortType(i)}
                />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading ? [...new Array(6)].map((_, index) => (<Skeleton key={index}/>)) : items.map((obj) => (
                        <PizzaBlock
                            key={obj.id}
                            {...obj}
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Home