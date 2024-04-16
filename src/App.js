// import './App.css';
// import { BrowserRouter as Router, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import { Home } from './components/Home';
// import About from './components/About';

// function App() {

//   return (
//     <Router>
//       <div>
//         <Navbar />
//           <Routes path="/" exact component={Home} />
//           <Routes path="/about" component={About} />
//       </div>
//     </Router>
//   );
// };

// export default App;

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import Login from "./components/Login";
import Signup from "./components/Signup";

import { useState } from "react";

function App() {
  const [alert,setAlert] =useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          {/* <Alert message="This is amazing React course"/> */}
          <Alert alert={alert} />
          <Home showAlert={showAlert}/>
        </>
      ),
    },
    {
      path: "/about",
      element: (
        <>
          <Navbar />
          {/* <Alert message="This is amazing React course"/> */}
          <Alert alert={alert} />
          <About />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar />
          {/* <Alert message="This is amazing React course"/> */}
          <Alert alert={alert} />
          <Login showAlert={showAlert}/>
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar />
          {/* <Alert message="This is amazing React course"/> */}
          <Alert alert={alert} />
          <Signup showAlert={showAlert}/>
        </>
      ),
    },
  ]);
  return (
    <>
      <NoteState>
        {/* <Alert message="This is amazing React course"/> */}
          <RouterProvider router={router} />
      </NoteState>
    </>
  );
}

export default App;
