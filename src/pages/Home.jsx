import React, {useState, useEffect, useContext} from "react";
import qs from "qs";
import { useNavigate } from "react-router-dom";
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/Skeleton";
import Pagination from "../components/Pagination";
import { useSelector, useDispatch } from "react-redux";
import { setCategoryId, setCurrentPage, setFilters,  } from "../redux/slices/filterSlice";
import { fetchPizzas } from "../redux/slices/pizzaSlice";

/*import {categories} from "../components/Sort";*/

function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { categoryId, currentPage, searchValue } = useSelector(state => state.filter);
    const { items, status } = useSelector(state => state.pizza);
    const sortType = useSelector(state => state.filter.sort.sortProperty);

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id));
    }

    const onChangePage = (number) => {
        dispatch(setCurrentPage(number));
    }

    // Код для работы с параметрами из ссылки 15 урок //
    /*useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1));
            const sort = categories.find(obj => obj.sortProperty === params.sortType);
            /!*console.log('categories', categories)*!/


            dispatch(
                setFilters({
                    ...params,
                    sort,
                })
            )
            /!*console.log('params.sortProperty', params)*!/
        }
    }, [])*/

    const skeletons = [...new Array(6)].map((_, index) => (<Skeleton key={index}/>));
    const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

    const getPizzas = async () => {
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const sortBy = sortType.sortProperty;
        const search = searchValue ? `search=${searchValue}` : '';

        dispatch(fetchPizzas({
            category,
            sortBy,
            search,
            currentPage
        }));
    };

    useEffect(() => {
        getPizzas();
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    useEffect(() => {
        const queryString = qs.stringify({
            sortType,
            categoryId,
            currentPage
        })

        navigate(`?${queryString}`);
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
            {status === 'error' ? (<div>
                    <h2>Произошла ошибка на сервере, попробуйте повторить попытку позже.</h2>
                </div> ) :
                (<div className="content__items">
                { status === 'loading'
                        ? skeletons
                        : pizzas
                }
            </div>)}
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}

export default Home