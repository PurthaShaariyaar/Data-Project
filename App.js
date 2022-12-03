// import styling
import "./style.css"

// Required imports to use for page routing
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

// import necessary component pages
import Add from "./pages/Add";
import Cars from "./pages/Cars";
import Update from "./pages/Update";
import Admin from "./pages/Admin";

// main function app to manage route handling and client view
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = "/" element ={<Cars />}/>
          <Route path = "/add" element ={<Add />}/>
          <Route path = "/update/:id" element ={<Update />}/>
          <Route path = "/admin" element = {<Admin />} /> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
