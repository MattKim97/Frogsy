import React from "react";
import { createFrogThunk } from "../../store/frogs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
export default function FrogForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    species: null,
    image: null,
    gender: "",
    age: null,
    price: null,
    stock: null,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("species", formData.species);
    formDataToSend.append("image", formData.image);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("age", formData.age);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("stock", formData.stock);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("category", formData.category);

    if (formData.age < 0) {
        setErrors((prevErrors) => ({ ...prevErrors, age: "Age must be a positive number" }));
    }

    if (formData.price < 0) {
        setErrors((prevErrors) => ({ ...prevErrors, price: "price must be a positive number" }));
    }

    if (formData.stock < 0) {
        setErrors((prevErrors) => ({ ...prevErrors, stock: "stock must be a positive number" }));
    }

    if (formData.image === null) {
        setErrors((prevErrors) => ({ ...prevErrors, image: "Please upload an image of your frog" }));
    }

    if (formData.species === null) {
        setErrors((prevErrors) => ({ ...prevErrors, species: "Please enter a species" }));
    }

    const response = await dispatch(createFrogThunk(formDataToSend));

    if (!response.errors) {
      history.push(`/frogs/${response.id}`);
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, ...response.errors }));
    }
  };

  return (
    <div className="formsContainer">
      <form className="formsStyle"  encType="multipart/form-data" onSubmit={handleSubmit}>
        <h2>Sell a Frog!</h2>
        <label>
          Frog name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {errors.name && <div className="errors">{errors.name}</div>}
        </label>

        <br />

        <label>
          Species:
          <input
            type="text"
            name="species"
            value={formData.species}
            onChange={handleInputChange}
          />
          {errors.species && (
            <div className="errors">{errors.species}</div>
          )}
        </label>

        <br />
        <label>
          Frog image:
          <input
            className="inputFileForm"
            type="file"
            name="image"
            onChange={handleInputChange}
          />
          {errors.image && <div className="errors">{errors.image}</div>}
        </label>

        <br />
        <label>
          Gender:
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
          >
            <option>Choose a gender</option>
            <option value={"male"}>Male</option>
            <option value={"female"}>Female</option>
          </select>
          {errors.gender && <div className="errors">{errors.gender}</div>}
        </label>
        <br/>

        <label>
            Age:
            <input
                type="number"
                name="age"
                value={formData.age}
                min={0}
                onChange={handleInputChange}
            />
            {errors.age && <div className="errors">{errors.age}</div>}
        </label>
        <br/>

        <label>
            Price:
            <input
                type="number"
                name="price"
                value={formData.price}
                min={0}
                onChange={handleInputChange}
            />
            {errors.price && <div className="errors">{errors.price}</div>}
        </label>
        <br/>

        <label>
            Stock:
            <input
                type="number"
                name="stock"
                value={formData.stock}
                min={0}
                onChange={handleInputChange}
            />
            {errors.stock && <div className="errors">{errors.stock}</div>}
        </label>
        <br/>

        <label>
            Description(optional)):
            <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
            />
            {errors.description && <div className="errors">{errors.description}</div>}
        </label>

        <br />

        <label>
            Category:
            <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
            >
              <option>Choose a category</option>
                <option value={"big"}>Big</option>
                <option value={"angry"}>Angry</option>
                <option value={"happy"}>Happy</option>
                <option value={"sad"}>Sad</option>
            </select>
            {errors.category && (
                <div className="errors">{errors.category}</div>
            )}
        </label>

        <br />


        <button className="formsSubmit" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
