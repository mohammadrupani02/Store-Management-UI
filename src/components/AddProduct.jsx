import { useRef } from "react";
import { addToInventory } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productsAction } from "../store/redux-store";

const AddProduct = () => {
  const categoryName = useRef();
  const productName = useRef();
  const productCP = useRef();
  const productSP = useRef();
  const productQuantity = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addProduct = async (payload) => {
    const response = await addToInventory(payload);
    return { ok: true, data: response };
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const category = categoryName.current.value.trim();
    const product = productName.current.value.trim();
    const cp = productCP.current.value.trim();
    const sp = productSP.current.value.trim();
    const quantity = productQuantity.current.value.trim();

    if (!category || !product || !cp || !sp || !quantity) {
      alert("Enter all fields");
      return;
    }

    const productDetails = {
      categoryName: category,
      productName: product,
      productPerUnitCostPrice: cp,
      productPerUnitSellPrice: sp,
      productQuantity: quantity,
    };

    const result = await addProduct(productDetails);

    if (result.ok) {
      dispatch(productsAction.clearProducts());
      navigate("/home");
    }

    categoryName.current.value = "";
    productName.current.value = "";
    productCP.current.value = "";
    productSP.current.value = "";
    productQuantity.current.value = "";
  };

  return (
    <div className="w-full md:w-[80%] p-6 md:p-8 mt-4 bg-white mx-auto">
      <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
        Add to Inventory
      </h2>

      <form
        onSubmit={submitHandler}
        className="md:w-[60%] w-[80%] flex flex-col gap-4 mx-auto"
      >
        <input
          ref={categoryName}
          type="text"
          placeholder="Enter Category"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={productName}
          type="text"
          placeholder="Enter Product Name"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={productCP}
          type="text"
          min={1}
          placeholder="Enter Cost Price"
          className="w-full border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <input
          ref={productSP}
          type="text"
          min={1}
          placeholder="Enter Sell Price"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        <input
          ref={productQuantity}
          type="number"
          min={1}
          placeholder="Enter Quantity"
          className="flex-1 border-2 p-2 px-4 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        <div className="m-auto flex justify-center">
          <button
            type="submit"
            className="w-32 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-1.5 rounded-md transition duration-300"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;

//   const [categories, setCategories] = useState([]);
//   console.log("Categories", categories);

//   const getCategories = async () => {
//     const response = await fetchCategories();
//     return { ok: true, data: response };
//   };
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getCategories();
//         const data = result.data.data;
//         setCategories(data);
//       } catch (err) {
//         console.error("Error fetching products:", err);
//       }
//     };

//     fetchData();
//   }, []);
