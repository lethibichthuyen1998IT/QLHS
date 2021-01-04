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
import Congtac from "GV/Components/Congtac";
import Renluyen from "GV/Components/Renluyen";
import TB from "GV/Components/TB";
import ChitietTB from "GV/Components/ChitietTB";
import notFound from "GV/Components/notFound";
import NhapCV from "GV/Components/NhapCV";
import Trove from "GV/Components/Team";
import Thongtincanhan from "GV/Components/Thongtincanhan";
import DanhGiaVC from "GV/Components/DanhGiaVC";
import Login from "GV/Components/Login";


//layout
import Admin from "layouts/Admin";
import GVLayoutRoute from './GV/Layouts/GiangVien';
import PhieuDanhGia from './views/Admin/PhieuDanhGia.js';
import AdminDG from './views/Admin/AdminDG.js';
import BMDG from './views/Admin/BMDG.js';
import KhoaDG from './views/Admin/KhoaDG.js';
import "assets/css/material-dashboard-react.css?v=1.9.0";
const user = JSON.parse(localStorage.getItem('user'));
const hist = createBrowserHistory();

ReactDOM.render(
    <Router history={hist}>
       
        <Switch>

                    <Admin path="/admin" layout={Admin} component={User} />
                    <Admin path="/admin/xemct/:id" layout={Admin} component={PhieuDanhGia} />
                  
                    <Route path="/admin/admindg/:id" component={AdminDG} />
                    <Route path="/admin/khoadg/:id" component={KhoaDG} />
                    <Route path="/admin/bmdg/:id" component={BMDG} />

                    <Route exact path="/" component={Trangchu} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/congtac" component={Congtac} />
                    <Route exact path="/danhgia" component={DanhGiaVC} />
                    <Route exact path="/renluyen" component={Renluyen} />
                    <Route exact path="/congviec" component={NhapCV} />
                
                    <Route exact path="/404" component={notFound} />
                    <Route exact path="/thongbao" component={TB} />
                    <Route exact path="/trangchu" component={Trove} />
                    <Route exact path="/canhan" component={Thongtincanhan} />
                    <Route exact path="/chitiettb/:id" component={ChitietTB} />
                    <Redirect to="/404" />
                   
                
            </Switch>
           
          
  </Router>,
  document.getElementById("root")
);
