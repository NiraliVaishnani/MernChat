import logo from './logo.svg';
import './App.css';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from './layout/AuthLayout/AuthLayout';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/account" element={<AuthLayout />}>
          <Route path="register" element={<Register />}></Route>
          <Route path="login" element={<Login />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
