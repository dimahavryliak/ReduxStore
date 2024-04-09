import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: "1",
    price: 7,
    title: "Paper",
    description: "Toilet Paper for you",
  },
  {
    id: "2",
    price: 20,
    title: "Table",
    description: "Table for you",
  },
  {
    id: "3",
    price: 50,
    title: "Pepper Spray",
    description: "Pepper for your opps",
  },
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {DUMMY_ITEMS.map((item) => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
