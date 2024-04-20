import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

// import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import Treasure from './Pages/Treasure/Treasure';
import NotFound from './Pages/NotFound/NotFound';
import SignIn from './Pages/SignIn/SignIn';
import SignUp from './Pages/SignUp/SignUp';
import ContextFirebaseAuthentication from './Components/Context/ContextFirebaseAuthentication';
import { SignInMethod } from 'firebase/auth';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Treasure/>,
    errorElement: <NotFound/>
  },
  {
    path: "/sign-in",
    element: <SignIn/>,
    errorElement: <NotFound/>
  },
  {
    path: "/sign-up",
    element: <SignUp/>,
    errorElement: <NotFound/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextFirebaseAuthentication>
    <RouterProvider router={router}/>
  </ContextFirebaseAuthentication>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
// 