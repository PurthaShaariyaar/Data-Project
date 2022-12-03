import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Cars = () => {

  const [cars, setCars] = useState([])

  useEffect(() => {
    const fetchAllCars = async ()=> {
      try {
        const res = await axios.get("http://localhost:8800/car");
        setCars(res.data)
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
    fetchAllCars()
  }, [])



  return (
    <div>
      <h1>Carpedia Cars</h1>
      <button className='update'><Link className='link' to="/Admin">Admin</Link></button>
      <div className="cars">
        {cars.map(car => (
          <div className="car" key = {car.plateID}>
            {car.cover && <img src={car.cover} alt="" />}
            <h2>{car.attribute}</h2>
            <h3>{car.year}</h3>
            <h3>{car.color}</h3>
            <h3>{car.inventory}</h3>
            <button className='update'><Link className='link' to={`/update/${car.plateID}`}>Update</Link></button>
          </div>
        ))}
      </div>
      <button className='update'><Link className='link' to="/add">Add Car</Link></button>
    </div>
  )
}

export default Cars