import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header";
import Home from "./pages/home";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Practice from "./pages/Practice";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Header/>

            <Routes>
                <Route path="" element={<Home/>}/>
                <Route path='practice' element={<Practice/>}/>

            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
