import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import {firebaseApp} from '../../firebase';
import SuccessAndErrorMsg, {showError, hideError} from "../../Components/Notifications/SuccessAndErrorMsg";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import './SignIn.css';
import {ContextFirebaseAuthentication} from '../../Components/Context/ContextFirebaseAuthentication';
import { useContext } from "react";
// let email='customer@alex21c.com';
// let password='customer123$';
import Navbar from "../../Components/NavBar/Navbar";

export default function SignIn(){  
  
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg, stateUserAuthMetaData} = useContext(ContextFirebaseAuthentication);

  let navigate = useNavigate();


  let refEmail = useRef(null);
  let refPassword = useRef(null);
  function handleSignInRequest(event){
    event.preventDefault();
    //console.log('listening...');
    // Safeguard
      if(refEmail.current.value === "" || refPassword.current.value === ""){
        return;
      }
      validateSignInRequest(refEmail.current.value, refPassword.current.value)
    
  } 

 


  function validateSignInRequest(email, password){
    // console.log('validating: ', email, password);
    // return;
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        //console.log(user);
        //console.log('redirecting');
        
        navigate("/");
        
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        //console.log(errorMessage, errorCode)
        showError(updateStateSuccessAndErrorMsg, 'Invalid Credentials !');
      });

  }



  useEffect(()=>{

    hideError(updateStateSuccessAndErrorMsg);
    // testing();
  },[]);

  useEffect(()=>{
    document.title="Sign In";
    
  },[]);

  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      

      <div  className='flex flex-col items-center  pb-[5rem] pt-[1rem]'>
        <Navbar/>


        <h2 className=" text-stone-200 flex gap-[.5rem] items-center displayNone">
            <i className="fa-solid fa-right-to-bracket text-[1.8rem]"></i>
            <span className="smallCaps text-[2rem] font-medium">Sign In</span>     
        </h2>

        {
          !stateUserAuthMetaData?.uid ? 
          <>
              <form className="signInForm flex flex-col gap-[.5rem] w-[20rem]" method="post">
                <input ref={refEmail} type="email" placeholder="e-Mail" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='email'/>
                <input ref={refPassword} type="password" placeholder="password" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='password' />
                <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 
                <button onClick={handleSignInRequest} className="outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1.3rem] py-[.3rem] rounded-md hover:text-slate-50 text-stone-700 text-[1.5rem] flex gap-[.5rem] items-center justify-center">
                      <i className="fa-solid fa-right-to-bracket  text-[2rem]"></i>
                      <span className="text-[1.5rem] font-medium">Sign In</span>
                    </button>
              </form>

           
          </>
          :
          <>

          </>

        }
      </div>

      
    </div>    
  );
}