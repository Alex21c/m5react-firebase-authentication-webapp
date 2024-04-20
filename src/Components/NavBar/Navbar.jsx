import { getAuth, signOut } from "firebase/auth";
import {Link} from'react-router-dom'
import { ContextFirebaseAuthentication } from '../Context/ContextFirebaseAuthentication';
import { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Navbar(){
  let navigate=useNavigate();
  let {stateWhoIsCurrentPage, stateUserAuthMetaData} = useContext(ContextFirebaseAuthentication);
  function handleSignOutRequest(){
    ////console.log('waiting signing you out!');
    const auth = getAuth();
    signOut(auth).then(() => {
      // Sign-out successful.
      console.log('successfully signed out!')
    }).catch((error) => {
      // An error happened.
      console.error('Error: Unable to sign out ', error);
    });

  }

  ////console.log(stateWhoIsCurrentPage);
  return (
    <nav id='primaryNav' className={`relative max-[990px]:bg-gradient-to-br  p-[2rem] flex gap-[1.5rem] justify-center text-blue-300 rounded-md items-center mb-[1rem] mt-[0]`}>
      <h2 className='displayNone'>Primary Header Navigation</h2>
      <Link to="/" className='hover:text-white transition font-medium flex gap-[.2rem] items-center'>
        <i className="fa-solid fa-house text-[2.5rem]"></i>
        <span className={`${stateWhoIsCurrentPage === 'Homepage' ? "underline" : "" }`}>Home</span>
      </Link>
      {
          !stateUserAuthMetaData?.uid  ?
          // Link to={`/SignIn/${currentPageUrl}`} 
          <>
            <button onClick={
              ()=>{                
                  navigate('/sign-in');                
              }
            } className="select-none flex gap-[.5rem] items-center   transition cursor-pointer   text-blue-300    text-[1.3rem]   hover:text-white">
                <i className="fa-solid fa-right-to-bracket text-[2.5rem]"></i>
                <span className="text-[1rem] font-medium">Sign In</span>          
            </button>          
            <button onClick={
              ()=>{                
                  navigate('/sign-up');                
              }
            } className="select-none flex gap-[.5rem] items-center   transition cursor-pointer   text-blue-300    text-[1.3rem]   hover:text-white">
                <i className="fa-solid fa-user-plus text-[2rem]"></i>
                <span className="text-[1rem] font-medium">Sign Up</span>          
            </button>   
          </>


          :
        <button onClick={handleSignOutRequest} className="select-none flex gap-[.5rem] items-center   transition cursor-pointer   text-blue-300    text-[1.3rem]   hover:text-white">
              <i className="fa-solid fa-right-to-bracket text-[2.5rem]"></i>
              <span className="text-[1.2rem] font-medium">Sign Out</span>          
          </button>
        }

    </nav>
  );
}
