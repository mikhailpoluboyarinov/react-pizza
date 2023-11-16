import {Route, Routes} from "react-router-dom";
import {useState} from "react";
import {createContext} from "react";

import Header from './Header'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import NotFound from "../pages/NotFound";

export const SearchContext = createContext();

function Main() {
    const [searchValue, setSearchValue] = useState('');

    return (
        <div className="wrapper">
          <SearchContext.Provider value={{ searchValue, setSearchValue }}>
              <Header />
              <div className="content">
                  <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="*" element={<NotFound />} />
                  </Routes>
              </div>
          </SearchContext.Provider>
        </div>
    )
}

export default Main