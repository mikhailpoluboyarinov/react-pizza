import { useState} from "react";
function Categories() {
    const [activeCategories, setActiveCategories] = useState(0);
    const pizzaCategories = [
        'Все',
        'Мясные',
        'Вегетарианская',
        'Гриль',
        'Острые',
        'Закрытые'
    ];

    const onClickCategory = (index) => {
        setActiveCategories(index)
    }

    return <div className="categories">
        <ul>
            {
                pizzaCategories.map((value, i) => (
                    <li onClick={() => onClickCategory(i)} className={activeCategories === i ? 'active' : ''}>
                        {value}
                    </li>
                ))
            }
        </ul>
    </div>
}
export default Categories