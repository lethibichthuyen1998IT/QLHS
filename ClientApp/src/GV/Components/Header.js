import React, { Component } from 'react';
import axios from "axios";
import cookie from "js-cookie";
import {
    Button,
    Modal,
    Row,
    Col,
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

const user = JSON.parse(localStorage.getItem('user'));
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            vienchuc: [],
            errors: "",
            loginModal: false,
            pwdModal: false,
            passwordnew: '',
            passwordold: '',
            retype: '',
            mavienchuc: '',
            msg: ''


        };
        this.logout = this.logout.bind(this);
        this.handleForm = this.handleForm.bind(this);
        this.refresh = this.refresh.bind(this);
    }
    componentDidMount() {

        axios.get('/vienchucs')
            .then((res) => this.setState({
                vienchuc: res.data,
                errors: '',
                showAlert: false,

            })

            );
    }
    refresh() {
        axios.get('/vienchucs')
            .then((res) => this.setState({
                vienchuc: res.data,
                showAlert: false
            }));
    }

    logout() {
        localStorage.clear('user');
        window.location.href = "https://localhost:44374/";

    }
    handleForm = (e) => {
        e.preventDefault();
        //const { vienchuc } = this.state;
        axios.post("/login/authenticate", { USERNAME: this.state.username, PASSWORD: this.state.password })
            .then(res => {
                //cookie.set("token", res.data.access_token);
                //this.props.setLogin(res.data.vienchuc);
                localStorage.setItem('user', JSON.stringify(res.data));

                if (res.data.machucvu.trim() == "TK" || res.data.machucvu.trim() == "TBM") {
                    window.location.href = "https://localhost:44374/admin/dashboard";

                }
                else
                    window.location.reload();

                //this.setState({ errors: "" });
            }).catch(e => { this.setState({ errors: "Sai tài khoản hoặc mật khẩu" }) });
    };
    toggleLoginModal() {
        this.setState({
            loginModal: !this.state.loginModal
        });
    }
    PWD() {
        let { passwordnew, passwordold, retype, mavienchuc } = this.state;
        console.log(mavienchuc.trim());

        if (user.matkhau.trim() !== passwordold) {
            this.setState({
                msg: "Mật khẩu cũ không đúng",

            });
        }
        else {
            axios.put('/doimk/' + mavienchuc, {
                MAVIENCHUC: mavienchuc,
                MATKHAU: passwordnew
            }).then((response) => {
                this.setState({

                    pwdModal: !this.state.pwdModal,
                    mavienchuc: '',
                    msg: '',
                    passwordnew: '',
                    passwordold: '',
                    retype: ''
                });

                alert("Đổi mật khẩu thành công, vui lòng đăng nhập lại");
                this.logout();
            });

        }
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

    render() {
        const { username, password, errors, msg } = this.state;
        return (

            <>

                <header className="header-section"  >
                    <div className="logo">
                        <img src="img/logo1.png" />
                    </div>

                    <div className="responsive"><i className="fa fa-bars" /></div>
                    <nav>
                        <ul className="menu-list">
                            <li className="active"> <Link to="/trangchu">Trang chủ</Link></li>
                            <li><Link to="/thongbao">Thông báo</Link></li>

                            {(user != null) ?
                                <li>

                                    <li><Link to="/congviec">Công việc</Link></li>
                                    <li><Link to="/danhgia">Đánh giá</Link></li>
                                    <li className="dropdown">
                                        <a className="dropbtn" style={{ width: '160px', paddingLeft: '2px', paddingRight: '2px' }}>{user.hoten} </a>
                                        <div className="dropdown-content">
                                            <Link to="/canhan">Thông tin cá nhân </Link>
                                            <a onClick={this.edit.bind(this, user.mavienchuc)}>Đổi mật khẩu </a>
                                            <a onClick={this.logout}> Đăng xuất</a>
                                        </div>
                                    </li></li> : <li><a onClick={this.toggleLoginModal.bind(this)}> Đăng nhập</a></li>


                            }
                            <Modal isOpen={this.state.loginModal} toggle={this.toggleLoginModal.bind(this)}>
                                <ModalHeader toggle={this.toggleLoginModal.bind(this)} style={{
                                    backgroundColor: '#AED6F1'
                                }}> <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐĂNG NHẬP HỆ THỐNG</b></p></ModalHeader>

                                <ModalBody>
                                    <Form onSubmit={(e) => this.handleForm(e)}>
                                        {
                                            (errors) ?
                                                <div class="alert alert-danger" align="center">
                                                    <strong color="danger">{errors}</strong>
                                                </div>

                                                :
                                                null
                                        }
                                        <div class="imgcontainer">
                                            <img src="img/avt.jpg" alt="Avatar" class="avatar" />
                                        </div>
                                        <div class="containerlogin">


                                            <label for="uname"><b>Tài khoản</b></label>

                                            <Input
                                                className="form-control"
                                                type="username"
                                                name="username"
                                                value={username}
                                                placeholder="Nhập tài khoản"
                                                onChange={(e) => this.setState({ username: e.target.value })}

                                            />
                                            <label for="uname"><b>Mật khẩu</b></label>
                                            <Input
                                                className="form-control"
                                                required
                                                type="password"
                                                name="password"
                                                value={password}
                                                onChange={(e) => this.setState({ password: e.target.value })}
                                                placeholder="**********"

                                            />

                                            <label>
                                                <input type="checkbox" name="remember" />

                                                    Nhớ mật khẩu

                                         </label>


                                            <button type="submit" class="successbtn" disabled={!(password.length > 0 && username.length > 0)}>
                                                Đăng nhập
                                </button>

                                        </div>


                                    </Form>
                                </ModalBody>
                                <ModalFooter style={{
                                    backgroundColor: '#AED6F1'
                                }}>

                                    <button type="button" class="cancelbtn" onClick={this.toggleLoginModal.bind(this)}>Hủy bỏ</button>
                                    <span class="psw">Quên <a href="#">mật khẩu?</a></span>

                                </ModalFooter>

                            </Modal>
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
                                                    <Input type="password" id="newpass" value={this.state.passwordnew} onChange={(e) => {
                                                        this.setState({ passwordnew: e.target.value });
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
                                        this.state.passwordnew.length > 0 &&
                                        this.state.passwordnew === this.state.retype)} onClick={this.PWD.bind(this)}>Cập nhật</Button>
                                    <Button color="secondary" onClick={this.togglePWDModal.bind(this)}>Hủy bỏ</Button>
                                </ModalFooter>
                            </Modal>
                        </ul>

                    </nav>
                </header>

            </>

        );

    }
}

export default Header;