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


class TB extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
            thongbao: [],
            ct: [],
            source: [],
            valueSearch: '',
            Show: false


        };
       
    }
    componentDidMount() {

        axios.get('/thongbaos')
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
    xemct(id) {
        this.props.history.push("/chitiettb/" + id);

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
                                <Link to="/trangchu">Trang chủ</Link>
                                <span>Thông báo</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="page-section spad">

                    <div class="container">
                        <Timkiem valueSearch={this.state.valueSearch}
                            handleSearch={this.handleSearch} />

                            <div class="col-md-8 col-sm-7 blog-posts">
                                
                                {thongbao.map((emp, index) => {
                                    return (
                                        <div class="post-item">
                                        <div class="post-thumbnail">
                                                {(emp.filethongbao != null) ?
                                                    <img src={"/UploadedFiles/" + (emp.filethongbao).split('\\').pop()} /> : null}
                                                <div class="post-date" style={{ padding: '0px' }}>
                                                    <h2>{moment(emp.ngaytb).get("date")}</h2>
                                                    <h3>{moment(emp.ngaytb).format("MMM-YYYY")}</h3>
                                            </div>
                                        </div>

                                        <div class="post-content">
                                            <h2 class="post-title">{emp.tieudethongbao}</h2>

                                                <p style={{
                                                    overflow: 'hidden', textOverflow: 'ellipsis', height: '95px'}}>{emp.noidungthongbao}</p>
                                                <a href onClick={(id) => this.xemct(emp.mathongbao)} class="read-more">Xem thêm </a>

                                            </div>
                                        </div>
                                          
                                       
                                    )
                                }
                                )}

                               
                        
                    </div>
                    
                    </div>
                </div>
                <Footer />

               
            </>

        );

    }
}

export default TB;