import { createContext } from "react";
import { useState } from "react";
import { useReducer } from "react";
import { useEffect } from "react";
import { getAuth } from "firebase/auth";
import {  onAuthStateChanged } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import {FIREBASE_DB} from '../../firebase';
export const ContextFirebaseAuthentication = createContext(null);

const ContextProviderFirebaseAuthentication = ({children}) =>{
  // let [stateCart, updateStateCart] = useState('this is the intial state of the cart');
  // let template= "this is the template";
  let [stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg] = useState({
    style: {
      Success: "text-green-300 text-[1.5rem]",
      Error: "text-red-300 text-[1.5rem]"
    },
    msgType: "Success",
    msg: "",
    displayNone: 'displayNone'        
  
  });

  
  let [stateWhoIsCurrentPage, updateStateWhoIsCurrentPage] = useState(null);


  function getUserAuthMetaData(){
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        ////console.log('user is valid and logged in', user);
        return user;
      } else {
        // User is signed out
        // ...
        ////console.log('user is not logged in !')
        return null;
      }
    });    
  } 

  let [stateUserAuthMetaData, updateStateUserAuthMetaData] = useState();

  useEffect(()=>{
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      updateStateUserAuthMetaData(user);
    })},[]);

 

  const contextValue = {
    stateWhoIsCurrentPage, updateStateWhoIsCurrentPage, stateUserAuthMetaData, updateStateUserAuthMetaData, stateSuccessAndErrorMsg, updateStateSuccessAndErrorMsg
  };

  
  return (
    <ContextFirebaseAuthentication.Provider value={contextValue}>
      {children}
    </ContextFirebaseAuthentication.Provider>

  );
}

export default ContextProviderFirebaseAuthentication;
