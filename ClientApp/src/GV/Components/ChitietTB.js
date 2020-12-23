import React, { Component } from 'react';
import axios from "axios";
import cookie from "js-cookie";
import {
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Input, Label, Form, FormGroup, Card,
    CardHeader,
    CardBody,
    CardTitle,
    Alert
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import Header from "./Header";
import moment from 'moment';
import SectionContact from "./SectionContact";
import Timkiem from "./search";
import Footer from "./Footer";
import { textSpanOverlap } from 'typescript';


class ChitietTB extends Component {
    constructor(props) {
        super(props);
        this.state = {

            thongbao: [],
            ct: [],
            source: [],
            valueSearch: '',


        };

    }
    componentDidMount() {

        axios.get('/thongbaos/'+ this.props.match.params.id)
            .then((res) => this.setState({
                thongbao: res.data,
                source: res.data,
            })

            );
    }
    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {


            for (let item of sourceArray) {

                if (item.tieudethongbao.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.noidungthongbao.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            thongbao: newArray,
            valueSearch: search
        });
    }
 



    render() {
        const { thongbao } = this.state;
        return (

            <>
                <Header />
                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>THÔNG BÁO</h2>
                            <div class="page-links">
                                <Link to="/thongbao">Thông báo</Link>
                                <span>Chi tiết hông báo</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="page-section spad" style={{ width: '1500px', paddingLeft: '300px' }}>

                   
                        <div class="col-md-8 col-sm-7 blog-posts">

                         
                              
                                    

                                    <div class="post-content">
                                        <h2 class="post-title">{thongbao.tieudethongbao}</h2>
                                        <h3> Ngày ra thông báo: {moment(thongbao.ngaytb).format("DD-MM-YYYY")}</h3>
                                <div class="post-item">
                                    <div class="post-thumbnail">
                                        {(thongbao.filethongbao != null) ?
                                            <img src={"/UploadedFiles/" + (thongbao.filethongbao).split('\\').pop()} /> : null}

                                    </div>
                                </div>
                            <p>{thongbao.noidungthongbao}</p>
                                           

                                     
                                    </div>


                               



                        </div>

                    </div>
                
                <Footer />


            </>

        );

    }
}

export default ChitietTB;