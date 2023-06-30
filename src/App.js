import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Splash from "./pages/Splash";

function App() {

  const {currentUser} = useContext(AuthContext);

  const ProtectedRoute = ({children}) => {
    if(!currentUser){
      return <Navigate to="/login"/>
    };

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
      <Route index element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      }/>
        <Route path="login" element={<Login/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="splash" element={<Splash/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
