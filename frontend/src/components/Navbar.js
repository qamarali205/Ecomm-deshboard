import React from "react";
import {Link, useNavigate} from 'react-router-dom';


const Navbar=()=>{
    const auth=localStorage.getItem('user');
    const navigate=useNavigate()

    const logoutHandle=()=>{
        // console.log('logout click');
        localStorage.clear();
        navigate('/signup');
    }

    return(
        <div>
            <img
             alt="logo"
             className="nav-logo"
             src="https://img.freepik.com/free-icon/pie-chart_318-372376.jpg"
             />
            {auth? <ul className="nav-ul">
                <li><Link to='/'>Products</Link></li>
                <li><Link to='/add'>Add Product</Link></li>
                <li><Link to='/update'>Update Product</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link to='/signup' onClick={logoutHandle}>Logout({JSON.parse(auth).name})</Link></li>
                
            </ul>
            :
            <ul className="nav-ul nav-right">
                <li><Link to='/signup'>Signup</Link></li>
                    <li><Link to='/login'>Login</Link></li>
                    
            </ul>}


        </div>
    )
}

export default Navbar;