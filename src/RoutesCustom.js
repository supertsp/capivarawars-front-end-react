import React, { Component } from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
    Link,
} from "react-router-dom";

//import pages
import Home from './pages/home/Home';
import MatchResult from './pages/matchresult/MatchResult';
import MoveAim from './pages/moveaim/MoveAim';
import MoveBoat from './pages/moveboat/MoveBoat';
import Register from './pages/register/Register';
import Signin from './pages/signin/Signin';
import TurnStatus from './pages/turnstatus/TurnStatus';
import Welcome from './pages/welcome/Welcome';
import Loading from './pages/loading/Loading';

export default class RoutesCustom extends Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Welcome/>} />

                    <Route path="/home" element={<Home/>} />
                    <Route path="/matchresult" element={<MatchResult/>} />
                    <Route path="/moveaim" element={<MoveAim/>} />
                    <Route path="/moveboat" element={<MoveBoat/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/signin" element={<Signin/>} />
                    <Route path="/turnstatus" element={<TurnStatus/>} />
                    <Route path="/welcome" element={<Welcome/>} />
                    <Route path="/loading" element={<Loading/>} />

                    <Route path="*" element={<Welcome/>} />
                </Routes>
            </BrowserRouter>
        );
    }
}
