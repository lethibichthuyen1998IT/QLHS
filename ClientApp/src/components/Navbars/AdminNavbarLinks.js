import React from "react";
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Hidden from "@material-ui/core/Hidden";
import Poppers from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import { Link, NavLink } from 'react-router-dom';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

import avatar from "assets/img/avt.jpg";
import styles from "assets/jss/material-dashboard-react/components/headerLinksStyle.js";
import { Route } from "react-router";

const useStyles = makeStyles(styles);

export default function AdminNavbarLinks() {
  const classes = useStyles();
  const [openNotification, setOpenNotification] = React.useState(null);
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
    };
    const nvs = JSON.parse(localStorage.getItem('user'));
   
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };

   
  return (
    <div>
    
      
       
          <nav class="navbar navbar-expand-md navbar-light">

          
  <div class="collapse navbar-collapse" id="basicExampleNav5">

              
    <ul class="navbar-nav nav-flex-icons ml-auto">
                      <li class="nav-item avatar dropdown d-flex align-items-center">
                          <Link to='/admin'>
                            
           
                              <img src={avatar} width="30" height="30" className="rounded-circle z-depth-0"
                                  alt="avatar image" /> &nbsp;
                              {nvs.hoten}
                                
                          </Link>
                      
                              
      </li>
    </ul>

  </div>
                 

</nav>
           
         
       
      </div>
         

  );
}
