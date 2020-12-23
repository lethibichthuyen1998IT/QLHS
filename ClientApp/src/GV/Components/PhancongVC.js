import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";
import Services from "./Services";
import SectionContact from "./SectionContact";
import SectionAbout from "./SectionAbout";
import PageHeader from "./PageHeader";
import ReactPaginate from 'react-paginate';
import SweetAlert from 'react-bootstrap-sweetalert';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardFooter,
    Table,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input, Label, Form, FormGroup, Alert
} from "reactstrap";
import moment from 'moment';
import Timkiem from "./search";
import { Link, NavLink } from "react-router-dom";

class PhancongVC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pc: [],
          vc:[],

         user:  JSON.parse(localStorage.getItem('user'))
           



        };
     
    }
    componentDidMount() {
      
        axios.get('/phancongs/vc/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                pc: res.data,

            }));
      
                

       
    }

   
   
    render() {
        const { pc } = this.state;
        console.log(pc)

        return (

            <>


                <Header />
                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>CÔNG TÁC</h2>
                            <div class="page-links">
                                <Link to="/congviec">Công việc</Link>
                                <span>Công tác</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="services-section spad">
                    <div class="container">


                                    





                        </div>

                    </div>
            


                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
            </>
        );
    }
}
export default PhancongVC;