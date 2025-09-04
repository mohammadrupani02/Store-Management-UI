import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/api";
import { productsAction } from "../store/redux-store";
import { Link } from "react-router-dom";
import Loading from "./Loading";

const AllProducts = () => {
  const { productsList } = useSelector((store) => store.products);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        const products = response.data.data.categories;
        dispatch(productsAction.setProducts(products));
      } catch (err) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };
    if (productsList.length === 0) {
      fetchData();
    }
  }, [dispatch, productsList.length]);

  return (
    <div className="ml-1 flex flex-col flex-1 p-6">
      {loading && <Loading />}
      {!loading && productsList.length === 0 ? (
        <p className="flex justify-center m-auto text-lg text-gray-600 gap-1">
          No Product Added!
          <Link to="add-product" className="text-blue-600 hover:underline">
            add product
          </Link>
        </p>
      ) : (
        productsList.map((item, index) => (
          <div className="mb-6" key={index}>
            <h1 className="text-2xl font-bold text-blue-600 border-b pb-2 pl-1">
              {item.category}
            </h1>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {item.products.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AllProducts;
