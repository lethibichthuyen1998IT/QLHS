import React from "react";
import {
    Row,
    Col,
    Input, Label, Form, FormGroup, Alert,
    Button,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import moment from "moment";
import Footer from "./Footer";




class Thongtincanhan extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

            msg: '',
            editModal: false,
            pwdModal: false,
            password: '',
            passwordold: '',
            retype: '',
            mavienchuc: '',
            vc: [],

        }
       
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {

        //hien thi danh sach
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
    }

   

    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal,

        })
    }
    togglePWDModal() {
        this.setState({
            pwdModal: !this.state.pwdModal,

        })
    }
    edit(mavienchuc) {
        this.setState({
            mavienchuc: mavienchuc,
            pwdModal: !this.state.pwdModal

        });

    }
    PWD() {
        let { password, passwordold, retype, vc, mavienchuc } = this.state;
        console.log(mavienchuc.trim());

        if (vc.matkhau.trim() !== passwordold) {
            this.setState({
                msg: "Mật khẩu cũ không đúng",

            });
        }
        else {
            axios.put('/doimk/' + mavienchuc, {
                MAVIENCHUC: mavienchuc,
                MATKHAU: password
            }).then((response) => {
                this.setState({

                    pwdModal: !this.state.pwdModal,
                    mavienchuc: '',
                    msg: '',
                    password: '',
                    passwordold: '',
                    retype: ''
                });

                alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
                this.logout();
            });

        }
    }
    updateVC() {
        let { mavienchuc,
            hoten,
            ngaysinh,
            gioitinh,
            sdt,
            diachi } = this.state.vc;



        var gt;
        if (gioitinh == "false") {
            gt = false;
        }
        else {
            gt = true;
        }

        axios.put('/login/' + this.state.vc.mavienchuc, {
            mavienchuc: mavienchuc,
            hoten: hoten,
            ngaysinh: ngaysinh,
            gioitinh: gt,
            sdt: sdt,
            diachi: diachi
        }).then((response) => {
            this.setState({
                msg: '',
                editModal: false

            });
            localStorage.setItem('user', JSON.stringify(this.state.vc));
            alert("Cập nhật thành công");
            this.refresh();
        }).catch((error) => {
            console.log(error.response);
            alert(error);
        });

    }
    refresh() {

        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });



    }
    render() {
        const { vc, msg, editModal } = this.state;

        return (
            <>
                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>THÔNG TIN CÁ  NHÂN</h2>
                            <div class="page-links">
                                <Link to="/trangchu">Trang chủ</Link>
                                <span>Thông tin cá nhân</span>
                            </div>
                        </div>
                    </div>
                </div>
                {(editModal != false) ?
                  
                        <div class="container" style={{ paddingLeft: '20px', width: '700px', backgroundColor: 'white' }}>
                            <div class="element" style={{ marginTop: '0px', height: '20px' }}>
                                <h4 style={{ textAlign: 'center', paddingTop: '20px', height: '20px' }}>Cập nhật thông tin <i class="fa fa-edit" style={{ fontSize: '30px' }}></i></h4>
                            </div>

                      
                        <Row>
                            <Col md="6">
                                <FormGroup>

                                    <Label>Họ tên</Label>
                                    <Input

                                        type="text"
                                        value={vc.hoten} onChange={(e) => {
                                            let { vc } = this.state;
                                            vc.hoten = e.target.value;
                                            this.setState({ vc });
                                        }} />
                                </FormGroup>
                            </Col>
                       
                            <Col md="6">
                                <FormGroup>

                                    <Label>Số điện thoại</Label>
                                    <Input

                                        type="text"
                                        value={vc.sdt} onChange={(e) => {
                                            let { vc } = this.state;
                                            vc.sdt = e.target.value;

                                            if (this.state.vc.sdt.length > 11 || this.state.vc.sdt.length < 10) {
                                                this.setState({
                                                    msg: "Số điện thoại từ 10 đến 11 chữ số",
                                                });
                                            }
                                            else {
                                                this.setState({ vc, msg: '' });
                                            }
                                        }} />
                                    {
                                        (msg) ?
                                            <p className="text-danger">{msg}</p>
                                            : null
                                    }
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="6">
                                <FormGroup>

                                    <Label> Ngày sinh</Label>
                                    <Input
                                        type="date"
                                        value={moment(vc.ngaysinh).format("YYYY-MM-DD")} onChange={(e) => {
                                            let { vc } = this.state;
                                            vc.ngaysinh = e.target.value;
                                            this.setState({ vc });
                                        }} />
                                </FormGroup>
                            </Col>
                      
                            <Col md="6">
                                <FormGroup>

                                    <Label>Giới tính</Label>
                                    <Input
                                        type="select"
                                        value={vc.gioitinh} onChange={(e) => {
                                            let { vc } = this.state;
                                            vc.gioitinh = e.target.value;
                                            this.setState({ vc });
                                        }} >
                                        <option value='true'>Nam </option>
                                        <option value='false'>Nữ </option>


                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <FormGroup>

                                    <Label>Địa chỉ</Label>
                                    <Input type="textarea"
                                        value={vc.diachi} onChange={(e) => {
                                            let { vc } = this.state;
                                            vc.diachi = e.target.value;
                                            this.setState({ vc });
                                        }} />
                                </FormGroup>
                            </Col>
                         
                            
                        </Row>


                        <div style={{ textAlign: 'center' }}>
                            <Button disabled={!(vc.hoten.length != 0 && vc.diachi.length != 0 && vc.gioitinh.length != 0 && vc.ngaysinh.length != 0 && vc.sdt.length != 0)} color="primary" onClick={this.updateVC.bind(this)}
                                    style={{
                                        width: '250px'
                                }}>Lưu lại</Button>{' '}
                        </div>
                            </div>
                  

                    :
                    <div class="container" style={{ paddingLeft: '20px', width: '700px', backgroundColor: 'white' }}>
                        <div class="element" style={{ marginTop: '0px', height: '20px' }}>
                            <h4 style={{ textAlign: 'center', paddingTop: '20px',height: '20px' }}>Thông tin chi tiết</h4>
                        </div>




                        <Row>
                        <Col md="4">
                            <FormGroup>
                                <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Mã số cán bộ: </Label> {vc.mavienchuc}

                            </FormGroup>
                        </Col>
                        <Col md="4">
                            <FormGroup>

                                <Label htmlFor="cd" style={{ color: 'black', fontWeight: 'bold' }}>Chức danh: </Label> {vc.machucdanh}

                            </FormGroup>
                        </Col>




                        <Col md="4">
                            <FormGroup>

                                <Label htmlFor="bm" style={{ color: 'black', fontWeight: 'bold' }}>Bộ môn: </Label> {vc.mabomon}

                            </FormGroup>

                            </Col>
                        </Row>
                        <Row>
                        <Col md="4">
                            <FormGroup>

                                <Label htmlFor="cvu" style={{ color: 'black', fontWeight: 'bold' }}>Chức vụ: </Label> {vc.machucvu}

                            </FormGroup>
                            </Col>
                            <Col md="4">
                                <FormGroup>
                                    <Label htmlFor="gt" style={{ color: 'black', fontWeight: 'bold' }}>Giới tính: </Label> {(vc.gioitinh == "true") ? 'Nam' : 'Nữ'}

                                </FormGroup>

                            </Col>
                       
                        <Col md="4">
                            <FormGroup>
                                <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Họ và tên: </Label> {vc.hoten}

                            </FormGroup>
                        </Col>

                            </Row>
                            <Row>

                        <Col md="4">
                            <FormGroup>
                                <Label htmlFor="ngaysinh" style={{ color: 'black', fontWeight: 'bold' }}>Ngày sinh: </Label> {moment(vc.ngaysinh).format("DD-MM-YYYY")}

                            </FormGroup>

                        </Col>
                        <Col md="4">
                            <FormGroup>

                                <Label htmlFor="nlv" style={{ color: 'black', fontWeight: 'bold' }}>Ngày làm việc: </Label> {moment(vc.ngaylamviec).format("DD-MM-YYYY")}

                            </FormGroup>
                        </Col>

                        <Col md="4">
                            <FormGroup>
                                <Label htmlFor="sdt" style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại: </Label> {vc.sdt}

                            </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="mail" style={{ color: 'black', fontWeight: 'bold' }}>Mail: </Label> {vc.mail}

                            </FormGroup>
                        </Col>

                        <Col md="12">
                            <FormGroup>

                                <Label htmlFor="diachi" style={{ color: 'black', fontWeight: 'bold' }}>Địa chỉ: </Label> {vc.diachi}

                            </FormGroup>
                                </Col>
                            </Row>

                        <div style={{ textAlign: 'center' }}>
                            <Button color="primary" onClick={this.toggleEditModal.bind(this)} style ={{width: '250px'}}>Cập nhật</Button>
                        </div>


                        </div>

                   
                }
                <div style={{ height: '70px' }} />

                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
                </>
        );
    }
}

export default Thongtincanhan;