// import express
import express from "express"

// import mysql
import mysql from "mysql"

// import cors 
import cors from "cors"

// creat app to connect to express
const app = express()

// allow api requests to work with client 
app.use(cors());

// connect to database 
const db = mysql.createConnection({
  host:"localhost", 
  user:"root", 
  password:"Follow123!",
  database:"carpedia"
})

// test app server connection with user 
app.get("/", (req, res)=>{
  res.json("Hello this is the backend server!");
})

// get all cars as a test run to display 

// Note can receive possible error
  // in order to resolve error enter in query into database 
  // ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'current_password';
app.get("/car", (req, res)=>{
  const q = "SELECT * FROM car"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})


app.get("/employee", (req, res)=>{
  const q = "SELECT * FROM employee"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/car_rental", (req, res)=>{
  const q = "SELECT * FROM car_rental"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})



app.get("/dealer", (req, res)=>{
  const q = "SELECT * FROM dealer"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/viewone", (req, res)=>{
  const q = "SELECT employee.employeeID, car_rental.carRentID, dealer.name FROM ((car_rental JOIN employee ON employee.carRentID = car_rental.carRentID) JOIN (dealer JOIN car_rental on dealer.carRentID = car_rental.carRentID))"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/viewtwo", (req, res)=>{
  const q = "SELECT fname, MAX(salary) FROM employee GROUP BY fname HAVING MAX(salary) >= 99000"
  db.query(q, (err, data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.get("/viewthree", (req, res)=>{
  const q = "SELECT fname, MAX(reservationID) FROM customer GROUP BY fname HAVING MAX(reservationID) >= 5"
  db.query(q, (err, data)=>{
    if(err) return res.json(err) 
    return res.json(data)
  })
})

app.get("/viewseven", (req, res)=>{
  const q = "SELECT * FROM car ORDER BY year ASC"
  db.query(q, (err, data)=>{
    if(err) return res.json(err) 
    return res.json(data)
  })
})

app.get("/viewten", (req, res)=>{
  const q = "SELECT totalAmount, invoiceDate FROM invoices WHERE totalAmount > 500.00"
  db.query(q, (err, data)=>{
    if(err) return res.json(err) 
    return res.json(data)
  })
})

app.get("/viewfive", (req, res)=>{
  const q = "SELECT employee.fname, car_rental.carRentID FROM car_rental FULL JOIN employee ON employee.carRentID = car_rental.carRentID ORDER BY employee.fname"
  db.query(q, (err, data)=>{
    if(err) return res.json(err) 
    return res.json(data)
  })
})

// to send posts from Postman via clients need middleware for express 
app.use(express.json());

// run a test post connection to backend server
app.post("/car", (req, res)=>{
  const q = "INSERT INTO car (`plateID`, `color`, `year`, `attribute`, `carRentalID`, `insuranceID`, `typeID`, `cover`, `inventory`) VALUES (?)";
  const values = [
    req.body.plateID,
    req.body.color,
    req.body.year,
    req.body.attribute,
    req.body.carRentalID,
    req.body.insuranceID,
    req.body.typeID,
    req.body.cover,
    req.body.inventory
  ];

  db.query(q, [values], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Car has been created!");
  });
});

app.delete("/car/:id", (req, res)=>{
  const car = req.params.id; 

  const q = "DELETE FROM car WHERE plateID = ?";

  db.query(q, [car], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Car has deleted created!");
  });
})

app.put("/car/:id", (req, res)=>{
  const car = req.params.id; 

  const q = "UPDATE car SET `plateID` = ?, `color` = ?, `year` =?, `attribute` = ?, `carRentalID` = ?, `insuranceID` = ?,`typeID` = ?, `cover` = ? `inventory` = ? WHERE plateID = ?";

  const values = [
    req.body.plateID,
    req.body.color,
    req.body.year,
    req.body.attribute,
    req.body.carRentalID,
    req.body.insuranceID,
    req.body.typeID,
    req.body.cover,
    req.body.inventory
  ];

  db.query(q, [...values, car], (err, data)=>{
    if(err) return res.json(err);
    return res.json("Car has deleted created!");
  });
})

// connect to a port 
app.listen(8800, () => {
  console.log("Connected to server");
})