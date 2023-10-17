import React from "react";
import styles from "./CartBlock.module.scss"

const CartBlock = () => {
    return (
        <div className={styles.root}>
            <p>Корзина пуста</p>
        </div>
    )
}

export default CartBlock