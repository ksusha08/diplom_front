
import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Main from './pages/Main';
import Contacts from './pages/Contacts';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser';
import EditUser from './users/EditUser';
import ViewUser from "./users/ViewUser";

import Suppliers from './pages/Suppliers';
import AddSupplier from './suppliers/AddSupplier';
import EditSupplier from './suppliers/EditSupplier';

import Items from './pages/Items';
import AddItem from './items/AddItem';
import EditItem from './items/EditItem';

import Documents from './pages/Document';
import AddDocument from './documents/AddDocument';
import EditDocument from './documents/EditDocument';
import OpenDocument from './documents/OpenDocument';

function App() {
  return (
    <div className="App">
    
    <Router>

    <Navbar/>
    <Routes>
    <Route exact path="/" element= {<Login className="login-background"/>}/>
    <Route exact path="/register" element= {<Register className="login-background"/>}/>

    <Route exact path="/main" element= {<Main/>}/>

    <Route exact path="/documents" element= {<Documents/>}/>
    <Route exact path="/adddocument" element= {<AddDocument/>}/>
    <Route exact path="/editdocument/:id" element ={<EditDocument/>}/>
    <Route exact path="/opendocument/:id" element ={<OpenDocument/>}/>

    <Route exact path="/items" element= {<Items/>}/>
    <Route exact path="/additem" element= {<AddItem/>}/>
    <Route exact path="/edititem/:id" element ={<EditItem/>}/>

    <Route exact path="/suppliers" element= {<Suppliers/>}/>
    <Route exact path="/addsupplier" element= {<AddSupplier/>}/>
    <Route exact path="/editsupplier/:id" element ={<EditSupplier/>}/>

    <Route exact path="/home" element= {<Home/>}/>
    <Route exact path="/adduser" element= {<AddUser/>}/>
    <Route exact path="/edituser/:id" element ={<EditUser/>}/>
    <Route exact path="/viewuser/:id" element={<ViewUser />} />

    <Route exact path="/contacts" element= {<Contacts/>}/>
    </Routes>
  
    <Footer/>
    </Router>
      
    </div>
  );
}

export default App;
