import React from 'react';
import {Route, Routes} from "react-router-dom";
import CharacterPage from "./pages/CharacterPage";
import Home from "./pages/Home";

const App = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/:id' element={<CharacterPage/>}/>
                <Route path='*' element={<Home />}/>
            </Routes>
        </div>
    );
};

export default App;