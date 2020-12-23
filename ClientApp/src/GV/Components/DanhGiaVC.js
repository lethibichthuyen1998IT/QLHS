import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";
import Services from "./Services";
import SectionContact from "./SectionContact";
import SectionAbout from "./SectionAbout";
import { Link, NavLink } from "react-router-dom";
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


class DanhGiaVC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newdg: {
                manamhoc: '',
                mavienchuc: '',
                masodanhgia: '',
                kqth: '',
                daoduc: '',
                trachnhiem: '',
                khac: '',
                uudiem: '',
                nhuocdiem: '',
                loai: '',
            },
            editdg: {
                manamhoc: '',
                mavienchuc: '',
                masodanhgia: '',
                kqth: '',
                daoduc: '',
                trachnhiem: '',
                khac: '',
                uudiem: '',
                nhuocdiem: '',
                loai: '',
            },

            dg: [],
            ctdg: [],
            nh: [],

            idnh: '',
            user: JSON.parse(localStorage.getItem('user')),
            errors: '',
            selectedFile: '',
            progress: 0,
            status: '',
            modal: false


        };


    }

    componentDidMount() {
        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data.manamhoc,

            })
            );

        axios.get('/namhocs/namhoc')
            .then(res => {
                var nhmd = res.data;
                this.setState({
                    idnh: nhmd.manamhoc

                })

            });
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );

        axios.get('/danhgias/')
            .then((res) => this.setState({
                dg: res.data,

            })
        );
       



    }





    DG() {
        axios.get('/danhgias/vienchuc/' + this.state.user.mavienchuc + "/" + this.state.idnh)
            .then((res) => this.setState({
                ctdg: res.data,
                editdg: {
                    manamhoc: res.data.manamhoc,
                    mavienchuc: res.data.mavienchuc,
                    masodanhgia: res.data.masodanhgia,
                    kqth: res.data.kqth,
                    daoduc: res.data.daoduc,
                    trachnhiem: res.data.trachnhiem,
                    khac: res.data.khac,
                    uudiem: res.data.uudiem,
                    nhuocdiem: res.data.nhuocdiem,
                    loai: res.data.loai,
                },
               

            })
            );

        this.setState({
          
            modal: !this.state.modal
        })
    }
    update() {
        let { masodanhgia, manamhoc, mavienchuc, kqth, daoduc, trachnhiem, khac, uudiem, nhuocdiem, loai } = this.state.editdg;

        axios.put('/danhgias/' + this.state.editdg.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, kqth, daoduc, trachnhiem, khac, uudiem, nhuocdiem, loai }).then((response) => {

                this.setState({
                    editdg: {
                        manamhoc: '',
                        mavienchuc: '',
                        masodanhgia: '',
                        kqth: '',
                        daoduc: '',
                        trachnhiem: '',
                        khac: '',
                        uudiem: '',
                        nhuocdiem: '',
                        loai: '',
                    },
                    modal:false
                });
              


                alert("Đánh giá thành công!");
            });

    }







    addDG() {

        axios.post('/danhgias/', {
            MAVIENCHUC: this.state.user.mavienchuc,
            MANAMHOC: this.state.idnh,
            KQTH: this.state.newdg.kqth,
            DAODUC: this.state.newdg.daoduc,
            TRACHNHIEM: this.state.newdg.trachnhiem,
            UUDIEM: this.state.newdg.uudiem,
            NHUOCDIEM: this.state.newdg.nhuocdiem,
            LOAI: this.state.newdg.loai

        }).then((response) => {
            //console.log(response.data);
            alert("Đã thêm thành công!");

        })
            .catch((error) => {
                console.log(error.response);
                alert(error);
            });
        //.catch ((error) => console.log(error.response.request.response) );

    }

    render() {


        const { dg, user, idnh, ctdg } = this.state;



        let danhgia = [];
        dg.forEach((e) => {
            if (e.mavienchuc.trim() === user.mavienchuc.trim() && e.manamhoc === idnh)
                danhgia.push(e.mavienchuc, e.manamhoc);
        });
        console.log(ctdg)

        return (
            <>


                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>ĐÁNH GIÁ</h2>
                            <div class="page-links">
                                <Link to="/trangchu">Trang chủ</Link>
                                <span>Đánh giá</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page-section spad">
                    <div class="container" style={{
                        paddingTop: '-500px', paddingLeft: '40px', paddingRight: '0px', width: '1500px', backgroundColor: '#D6F8F3', marginTop: '-50px', marginLeft: '120px'
                    }}>
                        <div class="row" style={{ width: '1300px' }}>


                            <div class="col-md-10 col-sm-12 blog-posts" style={{ textAlign: 'justify' }}>
                                <div class="element">
                                    <h4 style={{ height: '5px', color: 'blue', textAlign: 'center', paddingTop: '20px' }}>PHIẾU ĐÁNH GIÁ</h4>
                                </div>
                                {(danhgia.length > 0) ?
                                    <button onClick={this.DG.bind(this)} style={{width : '300px', marginLeft: '360px'}}> Chỉnh sửa phiếu đánh giá</button>
                                    :

                                    <>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>

                                                    <Label htmlFor="hoten">Kết quả rèn luyện: </Label>
                                                    <Input type="textarea" value={this.state.newdg.kqth} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.kqth = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Kết quả rèn luyện" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="6">
                                                <FormGroup>

                                                    <Label htmlFor="hoten">Đạo đức: </Label>
                                                    <Input type="textarea" value={this.state.newdg.daoduc} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.daoduc = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Đạo đức" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Trách nhiệm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.trachnhiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.trachnhiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Trách nhiệm" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Ưu điểm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.uudiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.uudiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Ưu điểm" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Nhược điểm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.nhuocdiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.nhuocdiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Nhược điểm" />
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="textarea" value={this.state.newdg.khac} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.khac = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Kết quả thực hiện khác" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="select" value={this.state.newdg.loai} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.loai = Number.parseInt(e.target.value);

                                                        this.setState({ newdg });
                                                    }}>

                                                        <option value='0'>-- Chọn Loại Đánh Giá --</option>
                                                        <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                        <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                        <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                        <option value='4'>Không hoàn thành nhiệm vụ </option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">


                                                <button onClick={this.addDG.bind(this)} class="site-btn">Lưu</button>
                                            </Col>

                                        </Row>
                                    </>
                                }
                                {(this.state.modal) ?
                                    <>
                                        <Row>
                                            <Col md="6">
                                                <FormGroup>

                                                    <Label htmlFor="hoten">Kết quả rèn luyện: </Label>
                                                    <Input type="textarea" value={this.state.editdg.kqth} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.kqth = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Kết quả rèn luyện" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="6">
                                                <FormGroup>

                                                    <Label htmlFor="hoten">Đạo đức: </Label>
                                                    <Input type="textarea" value={this.state.editdg.daoduc} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.daoduc = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Đạo đức" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Trách nhiệm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.trachnhiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.trachnhiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Trách nhiệm" />
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Ưu điểm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.uudiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.uudiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Ưu điểm" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Nhược điểm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.nhuocdiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.nhuocdiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Nhược điểm" />
                                                </FormGroup>
                                            </Col>
                                        </Row>


                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="textarea" value={this.state.editdg.khac} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.khac = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Kết quả thực hiện khác" />
                                                </FormGroup>
                                            </Col>

                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="select" value={this.state.editdg.loai} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.loai = Number.parseInt(e.target.value);

                                                        this.setState({ editdg });
                                                    }}>

                                                        <option value='0'>-- Chọn Loại Đánh Giá --</option>
                                                        <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                        <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                        <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                        <option value='4'>Không hoàn thành nhiệm vụ </option>
                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">


                                                <button onClick={this.update.bind(this)} class="site-btn">Lưu</button>
                                            </Col>

                                        </Row>
                                    </>
                                    :null

                                }
                            </div>


                        </div>

                    </div>
                </div>

                <div style={{ height: '70px' }} />





                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
            </>
        );
    }
}
export default DanhGiaVC;