
import './App.css';
import './styles/menu.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css"
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';

import MainMenu from './menu/MainMenu';

import Users from './pagesAdmin/Users';
import Applications from './pagesAdmin/Applications';
import Blacklist from './pagesAdmin/BlackList';


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

import Category from './pages/Category';
import EditCategory from './pages/EditCategory';

import Reports from './pages/Reports';
import Report2 from './pages/Report2';
import Diagramm from './pages/Diagramm';

function App() {
  return (
    
    <div className="App">
    
    <Router>

    <Navbar/>
   
    <Routes>
    <Route exact path="/" element= {<Login className="login-background"/>}/>
    <Route exact path="/register" element= {<Register className="login-background"/>}/>


    <Route exact path="/activeusers" element= {<Users/>}/>
    <Route exact path="/applications" element= {<Applications/>}/>
    <Route exact path="/bannedusers" element= {<Blacklist/>}/>

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

    <Route exact path="/category" element= {<Category/>}/>
    <Route exact path="/editcategory/:id" element= {<EditCategory/>}/>
  
    <Route exact path="/adduser" element= {<AddUser/>}/>
    <Route exact path="/edituser/:id" element ={<EditUser/>}/>
    <Route exact path="/viewuser/:id" element={<ViewUser />} />

    <Route exact path="/reports" element= {<Reports/>}/>
    <Route exact path="/report2" element= {<Report2/>}/>
    <Route exact path="/diagramm" element= {<Diagramm/>}/>

    <Route exact path="/contacts" element= {<Contacts/>}/>
    </Routes>
  
    <Footer/>
    </Router>
      
    </div>
    
  );
}

export default App;
