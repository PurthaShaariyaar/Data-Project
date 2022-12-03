import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Add = () => {

  const [car, setCar] = useState({
    plateID: "", 
    color: "",
    year: "",
    attribute: "",
    carRentalID: "", 
    insuranceID: "", 
    typeID: "",
    cover: "", 
    inventory: ""
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setCar((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleClick = async e => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/car", car)
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='form'>
      <h1>Admin</h1>
      <input type="text" placeholder="plateID" onChange={handleChange} name='plateID'></input>
      <input type="text" placeholder="color" onChange={handleChange} name='color'></input>
      <input type="text" placeholder="year" onChange={handleChange} name='year'></input>
      <input type="text" placeholder="attribute" onChange={handleChange} name='attribute'></input>
      <input type="text" placeholder="carRentalID" onChange={handleChange} name='carRentalID'></input>
      <input type="text" placeholder="insuranceID" onChange={handleChange} name='insuranceID'></input>
      <input type="text" placeholder="typeID" onChange={handleChange} name='typeID'></input>
      <input type="text" placeholder="cover" onChange={handleChange} name='cover'></input>
      <input type="text" placeholder="inventory" onChange={handleChange} name='inventory'></input>
      <button className='formButton' onClick={handleClick}>
        Add
      </button>
    </div>
  )
}

export default Add