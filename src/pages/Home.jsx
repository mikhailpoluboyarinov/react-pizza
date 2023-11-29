import React, {useState, useEffect, useContext} from "react";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../components/Main";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId } from "../redux/slices/filterSlice";

function Home() {
    const dispatch = useDispatch();
    const categoryId = useSelector(state => state.filter.categoryId);
    const sortType = useSelector(state => state.filter.sort.sortProperty);


    const { searchValue } = useContext(SearchContext);
    const [items,setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);


    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
        console.log(id)
    }

    console.log('idCategory', categoryId)


    const skeletons = [...new Array(6)].map((_, index) => (<Skeleton key={index}/>));
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

    useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty;
        const search = searchValue ? `search=${searchValue}` : '';

        setIsLoading(true);
        fetch(`https://63dbe3dac45e08a043508e92.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=desc`)
            .then((res) => res.json())
            .then((arr) => {
                setItems(arr);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    return (
        <div className="container">
            <div className="content__top">
                <Categories
                    categoryId={categoryId}
                    onClickCategory={onChangeCategory}
                />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? skeletons
                        : pizzas
                }
            </div>
            <Pagination onChangePage={number => setCurrentPage(number)} />
        </div>
    )
}

export default Home