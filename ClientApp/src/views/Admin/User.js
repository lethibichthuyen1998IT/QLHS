import React from "react";
import {
    Row,
    Col,
    Input, Label, Form, FormGroup, Alert,
    Modal,
    ModalHeader,
    ModalFooter,
    ModalBody,
} from "reactstrap";
import axios from 'axios';
import moment from "moment";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";


import avatar from "assets/img/avt.jpg";


class User extends React.Component {
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
           vc: JSON.parse(localStorage.getItem('user'))
           
        }
        this.logout = this.logout.bind(this);
        this.refresh = this.refresh.bind(this);
    }
   
    
    logout() {
        localStorage.clear('user');
        window.location.href = "https://localhost:44374/";
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
                hoten:hoten,
                ngaysinh:ngaysinh,
               gioitinh:gt,
                sdt:sdt,
                diachi:diachi
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
        
        this.setState({
            vc: JSON.parse(localStorage.getItem('user')),
           
        });

      

    }
    render() {
        const { vc, msg, editModal } = this.state;
       
        return (
           
            <div>
              
                    <GridContainer>
                    {(editModal != false) ?
                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary" style={{ paddingLeft: '170px' }}>
                                    <h4 style={{ backgroundColor: 'white', fontSize: '30px', width: '320px', color: 'black', paddingLeft: '20px' }}>Cập nhật thông tin <i class="fa fa-edit" style={{ fontSize: '30px' }}></i></h4>

                                </CardHeader>
                                <CardBody style={{
                                    paddingLeft: '50px'
                                }}>
                                    <GridContainer>

                                       
                                        <GridItem xs={12} sm={12} md={6}>
                                            <label>Họ tên</label>
                                            <Input
                                               
                                                type="text"
                                                value={vc.hoten} onChange={(e) => {
                                                    let { vc } = this.state;
                                                    vc.hoten = e.target.value;
                                                    this.setState({ vc });
                                                }} />
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <label>Số điện thoại</label>
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
                                                        this.setState({ vc,msg:'' });
                                                    }
                                                }} />
                                            {
                                                (msg) ?
                                                    <p className="text-danger">{msg}</p>
                                                    : null
                                            }
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <label>Giới tính</label>
                                            <Input
                                                type="select"
                                                value={vc.gioitinh} onChange={(e) => {
                                                    let { vc } = this.state;
                                                    vc.gioitinh = e.target.value;
                                                    this.setState({ vc });
                                                }} >
                                              
                                                <option value='false'>Nữ </option>
                                                <option value='true'>Nam </option>
                                                
                                            </Input>
                                        </GridItem>
                                        <GridItem xs={12} sm={12} md={6}>
                                            <label>Ngày sinh</label>
                                            <Input
                                                type="date"
                                                value={moment(vc.ngaysinh).format("YYYY-MM-DD")} onChange={(e) => {
                                                    let { vc } = this.state;
                                                    vc.ngaysinh = e.target.value;
                                                    this.setState({ vc });
                                                }} />
                                        </GridItem>
                                    </GridContainer>
                                    <GridContainer>
                                        <GridItem xs={12} sm={12} md={12} >
                                        <label>Địa chỉ</label>
                                            <Input
                                            value={vc.diachi} onChange={(e) => {
                                                let { vc } = this.state;
                                                vc.diachi = e.target.value;
                                                this.setState({ vc });
                                            }} />
                                    </GridItem>
                                    </GridContainer>

                                   
                                </CardBody>
                                <CardFooter style={{
                                    paddingLeft: '210px'
                                }}>
                                    <Button disabled={!(vc.hoten.length > 0 && vc.diachi.length > 0 && vc.gioitinh.length > 0 && vc.ngaysinh.length > 0 && vc.sdt.length > 0) } color="primary" onClick={this.updateVC.bind(this)}
                                        style={{
                                        width: '250px'
                                    }}>Lưu lại</Button>{' '}
                                </CardFooter>
                            </Card>
                        </GridItem>
                        
                    
                    : 

                        <GridItem xs={12} sm={12} md={8}>
                            <Card>
                                <CardHeader color="primary" style={{ paddingLeft: '170px' }}>
                                    <h4 style={{ backgroundColor: 'white', fontSize: '30px', width: '260px', color: 'black', paddingLeft: '20px' }}>Thông tin chi tiết </h4>

                                </CardHeader>
                                <CardBody>
                                    <GridContainer style={{paddingLeft: '90px'}}>
                                       
                                           
                                                <Col md="6">
                                                    <FormGroup>
                                                    <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Mã số cán bộ: </Label> {vc.mavienchuc}

                                                    </FormGroup>
                                                </Col>
                                        <Col md="6">
                                            <FormGroup>

                                                <Label htmlFor="cd" style={{ color: 'black', fontWeight: 'bold' }}>Chức danh: </Label> {vc.machucdanh}

                                            </FormGroup>
                                        </Col>
                                        

                                                
                                      
                                        <Col md="6">
                                            <FormGroup>

                                                <Label htmlFor="bm" style={{ color: 'black', fontWeight: 'bold' }}>Bộ môn: </Label> {vc.mabomon}

                                            </FormGroup>

                                        </Col>
                                        <Col md="6">
                                            <FormGroup>

                                                <Label htmlFor="cvu" style={{ color: 'black', fontWeight: 'bold' }}>Chức vụ: </Label> {vc.machucvu}

                                            </FormGroup>
                                        </Col>
                                          
                                                <Col md="6">
                                                    <FormGroup>
                                                    <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Họ và tên: </Label> {vc.hoten}

                                                    </FormGroup>
                                                </Col>

                                               

                                            
                                                <Col md="6">
                                                    <FormGroup>
                                                    <Label htmlFor="gt" style={{ color: 'black', fontWeight: 'bold' }}>Giới tính: </Label> {(vc.gioitinh=='true') ? 'Nam' : 'Nữ'}

                                                    </FormGroup>

                                                </Col>

                                              
                                           
                                                <Col  md="6">
                                                    <FormGroup>
                                                    <Label htmlFor="ngaysinh" style={{ color: 'black', fontWeight: 'bold' }}>Ngày sinh: </Label> {moment(vc.ngaysinh).format("DD-MM-YYYY")}

                                                    </FormGroup>

                                                </Col>
                                                <Col md="6">
                                                    <FormGroup>

                                                    <Label htmlFor="nlv" style={{ color: 'black', fontWeight: 'bold' }}>Ngày làm việc: </Label> {moment(vc.ngaylamviec).format("DD-MM-YYYY")}

                                                    </FormGroup>
                                                </Col>
                                           
                                                <Col md="6">
                                                    <FormGroup>
                                                    <Label htmlFor="sdt" style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại: </Label> {vc.sdt}

                                                    </FormGroup>
                                                </Col>
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

                                    </GridContainer>
                                </CardBody>
                                <CardFooter>
                                    <Button color="primary" onClick={this.toggleEditModal.bind(this)}>Cập nhật</Button>
                                </CardFooter>
                            </Card>
                        </GridItem>
                        }

                        <GridItem xs={12} sm={12} md={4}>
                            <Card profile>
                                <CardAvatar profile>
                                    <a href="#pablo" onClick={e => e.preventDefault()}>
                                        <img src={avatar} alt="..." />
                                    </a>
                                </CardAvatar>
                                <CardBody profile>
                                    <h6 style={{ color: 'black', fontSize: '20px' }}>{vc.hoten}</h6>
                                    <h4>Chức danh: {vc.machucdanh}</h4>
                                    <h4>Chức vụ: {vc.machucvu}</h4>

                                <Button color="primary" round onClick={this.edit.bind(this, vc.mavienchuc)} width="200px">
                                    Đổi mật khẩu
              </Button>
                                <Modal isOpen={this.state.pwdModal} toggle={this.togglePWDModal.bind(this)}>
                                    <ModalHeader toggle={this.togglePWDModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }}> <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CẬP NHẬT MẬT KHẨU</b></p></ModalHeader>

                                    <ModalBody>
                                        <Form>
                                            {(msg) ?
                                                <Row><Col><Alert color="warning">{msg}</Alert></Col></Row>
                                                : null
                                            }
                                            <Row>

                                                <Col>
                                                    <FormGroup>
                                                        <Label for="password">Mật khẩu cũ</Label>
                                                        <Input type="password" id="password" value={this.state.passwordold} onChange={(e) => {


                                                            this.setState({ passwordold: e.target.value });

                                                        }} placeholder="Nhập mật khẩu cũ" />


                                                    </FormGroup>
                                                </Col>

                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>

                                                        <Label for="newpass">Xác nhận lại mật khẩu</Label>
                                                        <Input type="password" id="newpass" value={this.state.password} onChange={(e) => {
                                                            this.setState({ password: e.target.value });
                                                        }} placeholder="Nhập mật khẩu mới" />
                                                    </FormGroup>
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <Label for="retype">Nhập lại mật khẩu mới</Label>
                                                        <Input type="password" id="retype" value={this.state.retype} onChange={(e) => {
                                                            this.setState({ retype: e.target.value });
                                                        }} placeholder="Xác nhận lại mật khẩu" />

                                                    </FormGroup>
                                                </Col>

                                            </Row>

                                        </Form>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="primary" disabled={!(this.state.passwordold.length > 0 &&
                                            this.state.password.length > 0 &&
                                            this.state.password === this.state.retype)} onClick={this.PWD.bind(this)}>Cập nhật</Button>
                                        <Button color="secondary" onClick={this.togglePWDModal.bind(this)}>Hủy bỏ</Button>
                                    </ModalFooter>
                                </Modal>
 <Button color="primary" round onClick={this.logout}>
                                       Đăng xuất
              </Button>
                                </CardBody>
                            </Card>
                        </GridItem>
                    </GridContainer>
            </div>
             
        );
    }
}

export default User;