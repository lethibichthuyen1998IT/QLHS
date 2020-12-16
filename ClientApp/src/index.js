/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";



import DMCV from 'views/Admin/DMCV.js';
import User from 'views/Admin/User.js';
import Trangchu from "GV/Components/Trangchu";
import notFound from "GV/Components/notFound";
//layout
import Admin from "layouts/Admin";
import GVLayoutRoute from './GV/Layouts/GiangVien';
import PhieuDanhGia from './views/Admin/PhieuDanhGia.js';
import "assets/css/material-dashboard-react.css?v=1.9.0";
const user = JSON.parse(localStorage.getItem('user'));
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
        {
            (user != null) ?
        <Switch>

                    <Admin path="/admin" layout={Admin} component={User} />
                    <Admin path="/admin/xemct/:id" layout={Admin} component={PhieuDanhGia} />
                   
                    <Route exact path="/" component={Trangchu} />
                    <Route exact path="/404" component={notFound} />
                    <Redirect to="/404" />
                   
                
            </Switch>
           
            : <Switch>
                    <Route path="/admin/dashboard" component={Trangchu} />
                <GVLayoutRoute path="/" component={Trangchu} />
           
            </Switch>
             }
  </Router>,
  document.getElementById("root")
);
