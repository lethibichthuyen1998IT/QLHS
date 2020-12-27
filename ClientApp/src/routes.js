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
// @material-ui/icons
import Home from '@material-ui/icons/Home';
import Work from '@material-ui/icons/Work';
import Person from "@material-ui/icons/Person";
import People from "@material-ui/icons/People";
import Notifications from "@material-ui/icons/Notifications";
import Grade from '@material-ui/icons/Grade';
import AssignmentInd from '@material-ui/icons/AssignmentInd';
import SubjectOutlinedIcon from '@material-ui/icons/SubjectOutlined';
import AssistantIcon from '@material-ui/icons/Assistant';
import ListAltIcon from '@material-ui/icons/ListAlt';
import ViewStreamIcon from '@material-ui/icons/ViewStream';
import FunctionsIcon from '@material-ui/icons/Functions';
import CategoryIcon from '@material-ui/icons/Category';
import PrintIcon from '@material-ui/icons/Print';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import MenuIcon from '@material-ui/icons/Menu';
import QueryBuilderIcon from '@material-ui/icons/QueryBuilder';

// core components/views for Admin layout

import TableList from "./views/TableList/TableList.js";
import Icons from "./views/Icons/Icons.js";
import NotificationsPage from "./views/Notifications/Notifications.js";
import DanhmucVienchuc from "./views/Admin/DanhmucVienchuc.js";
import User from "./views/Admin/User.js";
import Chucvu from "./views/Admin/ChucVu.js";
import DMCV from "./views/Admin/DMCV.js";
import Namhoc from "./views/Admin/NamHoc.js";
import Chucnang from "./views/Admin/ChucNang";
import Thongbao from "./views/Admin/ThongBao.js";
import Chucdanh from "./views/Admin/ChucDanh.js";
import Phancong from "./views/Admin/PhanCong";
import Bomon from "./views/Admin/BoMon.js";
import Danhgia from "./views/Admin/DanhGia.js";
import PhieuDanhGia from './views/Admin/PhieuDanhGia.js';
import Khenthuong from './views/Admin/Khenthuong.js';


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Trang chủ",
    icon: Home,
    component: User,
    layout: "/admin"
    },
   
    {
        path: "/vienchuc",
        name: "Tất cả viên chức",
        icon: People,
        component: DanhmucVienchuc,
        layout: "/admin"
    },
    

    {
        path: "/congviec",
        name: "Danh mục và lĩnh vực công việc",
        icon: CategoryIcon,
        component: DMCV,
        layout: "/admin"
    },
   

    {
        path: "/thongbao",
        name: "Thông báo",
        icon: Notifications,
        component: Thongbao,
        layout: "/admin"
    },
  {
    path: "/phancong",
    name: "Công việc",
      icon: AssignmentInd,
    component: Phancong,
    layout: "/admin"
    },
    
   
    {
        path: "/danhgia",
        name: "Đánh giá",
        icon: Grade,
        component: Danhgia,
        layout: "/admin"
    },

    //{
    //    path: "/xemct/:id",
    //    name: "abc",
    //    icon: Grade,
    //    component: PhieuDanhGia,
    //    layout: "/admin"
    //},

   

    {
        path: "/chucnang",
        name: "Chức năng",
        icon: FunctionsIcon,
        component: Chucnang,
        layout: "/admin"
    },
    {
        path: "/chucvu",
        name: "Chức vụ",
        icon: ListAltIcon,
        component: Chucvu,
        layout: "/admin"
    },
    {
        path: "/chucdanh",
        name: "Chức danh",
        icon: ViewStreamIcon,
        component: Chucdanh,
        layout: "/admin"
    },
  {
    path: "/bomon",
    name: "Bộ môn",
      icon: SubjectOutlinedIcon,
    component: Bomon,
    layout: "/admin"
  },
  
  //{
  //  path: "/notifications",
  //  name: "Khen thưởng",
  //    icon: AssistantIcon,
  //  component: NotificationsPage,
  //  layout: "/admin"
  //  },
  //  {
  //      path: "/notifications",
  //      name: "In ấn",
  //      icon: PrintIcon,
  //      component: NotificationsPage,
  //      layout: "/admin"
  //  },
    {
        path: "/notifications",
        name: "Thống kê",
        icon: EqualizerIcon,
        component: Khenthuong,
        layout: "/admin"
    },
    {
        path: "/namhoc",
        name: "Năm học",
        icon: QueryBuilderIcon,
        component: Namhoc,
        layout: "/admin"
    }
   
   
  
];


export default dashboardRoutes;
