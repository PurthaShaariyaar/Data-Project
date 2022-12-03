import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'


const Admin = () => {

  const [viewtwo, setViewTwo] = useState([]);

  const [viewthree, setViewThree] = useState([]);

  const [viewseven, setViewSeven] = useState([]);

  const [viewten, setViewTen] = useState([]);

  useEffect(() => {
    const maxSalary = async ()=> {
      try {
        const res = await axios.get("http://localhost:8800/viewtwo");
        const restwo = await axios.get("http://localhost:8800/viewthree");
        const resthree = await axios.get("http://localhost:8800/viewseven");
        const resfour = await axios.get("http://localhost:8800/viewten");
        setViewTwo(res.data)
        setViewThree(restwo.data)
        setViewSeven(resthree.data)
        setViewTen(resfour.data)
        console.log(res);
        console.log(restwo.data)
        console.log(resthree.data)
        console.log(resfour.data)
      } catch (err) {
        console.log(err);
      }
    }
    maxSalary()
  }, [])

  return (
    <div>
      <>
      <h1>Admin</h1>
      <h2>All Available Cars</h2>
        <div className="cars">
          {viewseven.map(car => (
            <div className="car" key = {car.plateID}>
              {car.cover && <img src={car.cover} alt="" />}
              <h2>{car.attribute}</h2>
              <h3>{car.year}</h3>
              <h3>{car.color}</h3>
              <h3>{car.inventory}</h3>
            </div>
          ))}
        </div>
        <div className='cars'>
        {viewtwo.map(employee => (
            <div className="car">
              <h2>Top Employee</h2>
              <h2>{employee.fname}</h2>
            </div>
          ))}
        </div>
        <div className='cars'>
        {viewthree.map(customer => (
            <div className="car">
              <h2>Most Valuable Customer</h2>
              <h2>{customer.fname}</h2>
            </div>
          ))}
        </div>
        <div className='cars'>
        {viewten.map(invoice => (
            <div className="car">
              <h2>Invoices Over $500.00</h2>
              <h2>Total Amount</h2> 
              <h2>{invoice.totalAmount}</h2>
              <h2>Invoice Date</h2>
              <h2>{invoice.invoiceDate}</h2>
            </div>
          ))}
        </div>
      </>
    </div>
  )
}

export default Admin