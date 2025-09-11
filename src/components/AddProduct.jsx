import { useRef, useState } from "react";
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
  const imgRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState();

  const addProduct = async (payload) => {
    const response = await addToInventory(payload);
    return { ok: true, data: response };
  };

  const imageHandler = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.includes("image/")) {
      alert("Only Image files are supported");
      e.target.value = "";
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setImagePreview(null);
    imgRef.current.value = "";
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const category = categoryName.current.value.trim();
    const product = productName.current.value.trim();
    const cp = productCP.current.value.trim();
    const sp = productSP.current.value.trim();
    const quantity = productQuantity.current.value.trim();
    const file = imgRef.current.files[0];

    if (!category || !product || !cp || !sp || !quantity) {
      alert("Enter all fields");
      return;
    }

    const formData = new FormData();
    formData.append("categoryName", category);
    formData.append("productName", product);
    formData.append("productPerUnitCostPrice", cp);
    formData.append("productPerUnitSellPrice", sp);
    formData.append("productQuantity", quantity);
    if (file) {
      formData.append("image", file);
    }

    const result = await addProduct(formData);

    if (result.ok) {
      dispatch(productsAction.clearProducts());
      navigate("/home");
    }

    categoryName.current.value = "";
    productName.current.value = "";
    productCP.current.value = "";
    productSP.current.value = "";
    productQuantity.current.value = "";
    clearImage();
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
        <div className="relative flex-1 border-2 rounded-md p-2 flex items-center justify-between ">
          <input
            ref={imgRef}
            type="file"
            className="hidden"
            onChange={imageHandler}
            id="fileInput"
          />
          {!imagePreview && (
            <label
              htmlFor="fileInput"
              className="cursor-pointer bg-stone-200 text-black px-3 py-1 rounded-md hover:bg-stone-400"
            >
              Choose Product Image
            </label>
          )}
          {imagePreview && (
            <div className="flex items-center gap-1">
              <img
                src={imagePreview}
                alt="preview"
                className="w-24 h-24 border rounded object-cover"
              />
              <button
                type="button"
                onClick={clearImage}
                className="bg-red-500 text-white text-xs px-2 py-1 rounded"
              >
                ✕
              </button>
            </div>
          )}
        </div>
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
