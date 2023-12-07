import React from "react";
import {
  updateFrogThunk,
  getAllFrogsThunk,
} from "../../store/frogs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function FrogUpdateForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { frogId } = useParams();
  const frogs = Object.values(useSelector((state) => state.frogs));
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    species: "",
    image: null,
    gender: "",
    age: 0,
    price: 0,
    stock: 0,
    description: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevFormData) => {
      const updatedFormData = { ...prevFormData };

      if (type === "file") {
        updatedFormData[name] = files[0];
      } else {
        updatedFormData[name] = value;
      }

      return updatedFormData;
    });
  };
  console.log(formData.image);
  console.log(
    "🚀 ~ file: FrogUpdateForm.js:66 ~ handleSubmit ~ formData:",
    formData
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("species", formData.species);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("image", formData.image);
    console.log("🚀 ~ file: FrogUpdateForm.js:66 ~ handleSubmit ~ formDataToSend:", formDataToSend)

    if (formData.image) {
      delete formData.image;
    }

    if (formData.age < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        age: "Age must be a positive number",
      }));
    }

    if (formData.price < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        price: "price must be a positive number",
      }));
    }

    if (formData.stock < 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        stock: "stock must be a positive number",
      }));
    }

    const response = await dispatch(updateFrogThunk(formDataToSend, frogId));

    if (!response.errors) {
      history.push(`/frogs/${frogId}`);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getAllFrogsThunk());

      if (!frogs || frogs.length === 0) {
        return;
      }

      const frog = frogs.find((frog) => frog.id === +frogId);

      if (!frog) {
        return;
      }
      
    

      setFormData({
        name: frog.name || "",
        species: frog.species || "",
        gender: frog.gender || "",
        age: frog.age || 0,
        price: frog.price || 0,
        image: null,
        stock: frog.stock || 0,
        description: frog.description || "",
        category: frog.category || "",
      });
    };

    fetchData();
  }, [dispatch, frogId]);

  return (
    <div className="formsContainer">
      <form className="formsStyle" encType="multipart/form-data" onSubmit={handleSubmit}>
        <h1>Update A Frog</h1>
       <div>Frog name:</div>
          <input
          className="formsInput"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="errors">{errors.name}</div>}


        <br />

        <div>Frog Species:</div>
          <input
          className="formsInput"
            type="text"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
          />
          {errors.species && (
            <div className="errors">{errors.species}</div>
          )}


        <br />
        <label>
          Update Your Frog's image (Optional):
          <input
            className="inputFileForm"
            type="file"
            name="image"
            onChange={handleInputChange}
          />
          {errors.image && <div className="errors">{errors.image}</div>}
        </label>

        <br />
        <div>Gender:</div>
        <label>
         
          <select
                      className="genderInput"

            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
          {errors.gender && <div className="errors">{errors.gender}</div>}
        </label>
        <br />

          <div>Age:</div>
          <input
          className="formsInput"
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
          />
          {errors.age && <div className="errors">{errors.age}</div>}
  
        <br />

       <div>Price:</div>
          <input
          className="formsInput"
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <div className="errors">{errors.price}</div>}
       
        <br />

   <div>Stock:</div>
          <input
          className="formsInput"
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
          {errors.stock && <div className="errors">{errors.stock}</div>}
        <br />
<div>Description:</div>
        <label>
          <textarea
          className="descriptionInput"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && (
            <div className="errors">{errors.description}</div>
          )}
        </label>

        <br />

<div>Category:</div>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="genderInput"
          >
            <option value={"big"}>Big</option>
            <option value={"angry"}>Angry</option>
            <option value={"happy"}>Happy</option>
            <option value={"sad"}>Sad</option>
          </select>
          {errors.category && (
            <div className="errors">{errors.category}</div>
          )}

        <br />

        <button className="formsSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
