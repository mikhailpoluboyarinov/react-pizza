import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import {SearchContext} from "../components/Main";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice";

function Home() {
    const dispatch = useDispatch();
    const { categoryId, currentPage } = useSelector(state => state.filter);
    const sortType = useSelector(state => state.filter.sort.sortProperty);


    const { searchValue } = useContext(SearchContext);
    const [items,setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    const skeletons = [...new Array(6)].map((_, index) => (<Skeleton key={index}/>));
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

    useEffect(() => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty;
        const search = searchValue ? `search=${searchValue}` : '';

        setIsLoading(true);

        axios.get(`https://63dbe3dac45e08a043508e92.mockapi.io/items?page=${currentPage}&limit=4&${category}${search}&sortBy=${sortBy}&order=desc`)
            .then(res => {
                setItems(res.data);
                setIsLoading(false);
            })
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
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home