import styles from "./CartButton.module.css";
import { mainActions } from "../../store/main-slice";
import { useDispatch, useSelector } from "react-redux";

const CartButton = (props) => {
  const dispatchAction = useDispatch();
  const itemsQuantity = useSelector((state) => state.cart.itemsQuantity);
  const CartVisibilityHandler = () => {
    dispatchAction(mainActions.toggleCartVisibility());
  };

  return (
    <button onClick={CartVisibilityHandler} className={styles.button}>
      <span>Корзина</span>
      <span className={styles.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
