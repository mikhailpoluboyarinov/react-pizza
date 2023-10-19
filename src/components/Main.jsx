import {Route, Routes} from "react-router-dom";

import Header from './Header'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import NotFound from "../pages/NotFound";

function Main() {

return (
<div className="wrapper">
  <Header />
    <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </div>
</div>
)

}

export default Main