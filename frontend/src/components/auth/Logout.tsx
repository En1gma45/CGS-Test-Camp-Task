import React from 'react';
import { BiLogOut } from "react-icons/bi"


const Logout = () => {
    return (
        <div>
           <BiLogOut size='30px' className='logout_icon' onClick={() => {
               localStorage.removeItem('token')
               window.location.href = '/'
           }} />

        </div>
    );
};

export default Logout;
