import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";
import Services from "./Services";
import SectionContact from "./SectionContact";
import SectionAbout from "./SectionAbout";


class Trove extends Component {
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


                
                <Header />

            
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
export default Trove;