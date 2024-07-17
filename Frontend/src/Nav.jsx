import { React } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import { Route  } from 'react-router-dom';
import App from './App';
import Add from './Add';
import Pc from './Pc';
import Problem from './Problem';
import ProblemSearch from './ProblemSearch';

function Nav(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<App/>}/>
            <Route path="/PcInfo" element={<Add/>}/>
            <Route path="/AddPc" element={<Pc/>}/>
            <Route path="/Problem" element={<Problem/>}/>
            <Route path="/ProblemSearch" element={<ProblemSearch/>}/>
        </Routes>
        </BrowserRouter>
    )
}
export default Nav ;
