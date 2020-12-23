import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";
import Services from "./Services";
import SectionContact from "./SectionContact";
import SectionAbout from "./SectionAbout";


class Trangchu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            vienchuc: [],
            errors: "",
            loginModal: false
            
            
        };
      
    }


    render() {
        
        return (
            <>

          
                <div id="preloder">
                    <div class="loader">
                        <img src="img/logo1.png" alt="" /> 
                            <h2>Loading.....</h2>
		</div>
                    </div>
                <Header />
                <div className="hero-section">
                    <div className="hero-content">
                        <div className="hero-center">
                            <img src="img/big-logo.png" alt="" />
                            <h4>KHOA CNTT &amp; TT - TRƯỜNG ĐẠI HỌC CẦN THƠ</h4> <h2>HỆ THỐNG ĐÁNH GIÁ HIỆU SUẤT LÀM VIỆC</h2>
                        </div>
                    </div>

                    <div id="hero-slider" className="owl-carousel">
                        <div className="item  hero-item" data-bg="img/01.jpg" />
                        <div className="item  hero-item" data-bg="img/02.jpg" />
                    </div>
                </div>
               
          
                <SectionAbout />
            
         <Services />
           
                <SectionContact />
            <footer className="footer-section">
                <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
            </footer>
               </>
       );
    }
}
export default Trangchu;