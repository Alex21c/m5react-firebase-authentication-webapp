import { useRef } from "react";
import { useEffect } from "react";
import {firebaseApp} from '../../firebase';
import SuccessAndErrorMsg, {showError, hideError,showSuccess} from "../../Components/Notifications/SuccessAndErrorMsg";
import { getAuth, createUserWithEmailAndPassword , onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";
import {ContextFirebaseAuthentication} from '../../Components/Context/ContextFirebaseAuthentication';
import { useContext } from "react";
import { update } from "firebase/database";
import Navbar from "../../Components/NavBar/Navbar";
// let email='customer@alex21c.com';
// let password='customer123$';


export default function SignUp(){  
  
  let {stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg, stateUserAuthMetaData} = useContext(ContextFirebaseAuthentication);

  let navigate = useNavigate();


  let refEmail = useRef(null);
  let refPassword = useRef(null);
  let refPasswordRetyped = useRef(null);

  function handleSignUpRequest(event){
    event.preventDefault();
    //console.log('listening...');
    // Safeguard
      if(refEmail.current.value === "" || refPassword.current.value === ""  || refPasswordRetyped.current.value === ""){
        return;
      }else if(refPassword.current.value  !== refPasswordRetyped.current.value){
        showSuccess(updateStateSuccessAndErrorMsg, "kindly verify yours password, it doesn't matched with yours retyped password!");
        return;
      }
      validateSignUpRequest(refEmail.current.value, refPassword.current.value);
    
  } 

 


  function validateSignUpRequest(email, password){
    let auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up successfully
      const user = userCredential.user;
      // console.log('Successfully created new user:', user.uid);
      
      showSuccess(updateStateSuccessAndErrorMsg, "Successfully created Yours new account! Now unlocking treauser for you in 3 seconds!");
      setTimeout(()=>{
        navigate("/");
      }, 3000);
    })
    .catch((error) => {
      // Error occurred during sign up
      if(error.code === "auth/invalid-email"){
        showError(updateStateSuccessAndErrorMsg, "Provided e-mail is invalid, kindly verify!")
      }else if(error.code === "auth/weak-password"){
        showError(updateStateSuccessAndErrorMsg, "Password you provided is weak, kindly make sure password is at least 6 characters long!")
      }else if(error.code === "auth/email-already-in-use"){
        showError(updateStateSuccessAndErrorMsg, "Email address you provided is already in use, kindly retry with different email id.")
      }else{
        showError(updateStateSuccessAndErrorMsg, error.message);
      }
    });

  }





  useEffect(()=>{
    document.title="Sign Up";
    
  },[]);

  return (
    <div className="pageWrapper mt-[2rem] pt-[1rem] border-0 border-slate-200 p-[2rem] max-w-[120rem]  m-auto rounded-md  text-[1.2rem] text-stone-200 ">
      

      <div  className='flex flex-col items-center  pb-[5rem] pt-[1rem]'>
        <h2 className=" text-stone-200 flex gap-[.5rem] items-center displayNone">
            <i className="fa-solid fa-right-to-bracket text-[1.8rem]"></i>
            <span className="smallCaps text-[2rem] font-medium">Sign In</span>     
        </h2>
        <Navbar/>
        {
          !stateUserAuthMetaData?.uid ? 
          <>
              <form id='signUpForm' className=" flex flex-col gap-[.5rem] w-[20rem]" method="post">
                <input ref={refEmail} type="email" placeholder="e-Mail" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='email'/>
                <input ref={refPassword} type="password" placeholder="password" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='password' />
                <input ref={refPasswordRetyped} type="password" placeholder="retype password" className=" text-stone-700 transition focus:outline focus:outline-2 focus:outline-green-500 p-[1rem] pr-[3rem] rounded-md bg-stone-200 relative w-[100%]" name='password' />
                <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 
                <button type="submit" onClick={handleSignUpRequest} className="outline-amber-50 bg-yellow-300 hover:bg-yellow-500 transition cursor-pointer px-[1.3rem] py-[.3rem] rounded-md hover:text-slate-50 text-stone-700 text-[1.5rem] flex gap-[.5rem] items-center justify-center">
                      <i className="fa-solid fa-user-plus text-[2rem]"></i>
                      <span className="text-[1.5rem] font-medium ">Sign Up</span>
                    </button>
              </form>

           
          </>
          :
          <>
            <SuccessAndErrorMsg  stateSuccessAndErrorMsg={stateSuccessAndErrorMsg}/> 

          </>

        }
      </div>

      
    </div>    
  );
}