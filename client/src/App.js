import logo from "./logo.svg";
import "./App.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layout/AuthLayout/AuthLayout";
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import { UserContextProvider } from "./Usercontext";
import Chat from "./Components/Main/Chat";
import MainLayout from "./layout/MainLayout/MainLayout";
import Chatarea from "./Components/Main/Chatarea";

function App() {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/account" element={<AuthLayout />}>
            <Route path="register" element={<Register />}></Route>
            <Route path="login" element={<Login />}></Route>
          </Route>
          <Route path="/" element={<MainLayout />}>
            <Route path="chat" element={<Chat />}></Route>
            <Route path="chat/:id" element={<Chat />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
