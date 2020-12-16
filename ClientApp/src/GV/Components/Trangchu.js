import React, { Component } from "react";
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
const user = JSON.parse(localStorage.getItem('user'));
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
                localStorage.setItem('user',JSON.stringify(res.data));
       
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
   

    render() {
        const { username, password, errors, loginModal } = this.state;
        return (
         <>
            <div id="preloder">
                <div className="loader">
                    <img src="img/logo1.png" alt="" />
                    <h2>Loading.....</h2>
                </div>
            </div>
          
            <header className="header-section">
                <div className="logo">
                    <img src="img/logo1.png" />
                </div>

                <div className="responsive"><i className="fa fa-bars" /></div>
                <nav>
                    <ul className="menu-list">
                        <li className="active"><a href="home.html">Trang chủ</a></li>
                        <li><a href="services.html">Công tác</a></li>
                        <li><a href="services.html">Rèn luyện</a></li>
                            <li><a href="blog.html">Thông báo</a></li>
                           
                            { (user !=null) ?
                                <li className="dropdown">
                                    <a href="home.html" className="dropbtn" style={{ width: '160px', paddingLeft: '2px', paddingRight: '2px' }}>{user.hoten} </a>
                                    <div className="dropdown-content">
                                        <a href="elements.html">Thông tin cá nhân</a>
                                        <a href="elements.html">Đổi mật khẩu</a>
                                        <a onClick={this.logout}>Đăng xuất</a>
                                    </div>
                                </li> : <li><a onClick={this.toggleLoginModal.bind(this)}> Đăng nhập</a></li>
                             
                               
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
                    </ul>
                        
                </nav>
                </header>
               
            <div className="hero-section">
                <div className="hero-content">
                    <div className="hero-center">
                        <img src="img/big-logo.png" alt="" />
                        <h4>KHOA CNTT &amp; TT - TRƯỜNG ĐẠI HỌC CẦN THƠ</h4> <h2>HỆ THỐNG ĐÁNH GIÁ HIỆU SUẤT LÀM VIỆC</h2>
                    </div>
                </div>
                {/* slider */}
                <div id="hero-slider" className="owl-carousel">
                    <div className="item  hero-item" data-bg="img/1.jpg" />
                    <div className="item  hero-item" data-bg="img/2.png" />
                </div>
            </div>
            <div className="about-section">
                <div className="overlay" />
                {/* card section */}
                <div className="card-section">
                    <div className="container">
                        <div className="row">
                            {/* single card */}
                            <div className="col-md-4 col-sm-6">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-023-flask" />
                                    </div>
                                    <h2>Get in the lab</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                            {/* single card */}
                            <div className="col-md-4 col-sm-6">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-011-compass" />
                                    </div>
                                    <h2>Projects online</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                            {/* single card */}
                            <div className="col-md-4 col-sm-12">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-037-idea" />
                                    </div>
                                    <h2>SMART MARKETING</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* card section end*/}
                {/* About contant */}
                <div className="about-contant">
                    <div className="container">
                        <div className="section-title">
                            <h2>Get in <span>the Lab</span> and discover the world</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla. Nulla sit amet luctus dolor. Etiam finibus consequat ante ac congue. Quisque porttitor porttitor tempus. Donec maximus ipsum non ornare vporttitor porttitorestibulum. Sed libero nibh, feugiat at enim id, bibendum sollicitudin arcu.</p>
                            </div>
                            <div className="col-md-6">
                                <p>Cras ex mauris, ornare eget pretium sit amet, dignissim et turpis. Nunc nec maximus dui, vel suscipit dolor. Donec elementum velit a orci facilisis rutrum. Nam convallis vel erat id dictum. Sed ut risus in orci convallis viverra a eget nisi. Aenean pellentesque elit vitae eros dignissim ultrices. Quisque porttitor porttitorlaoreet vel risus et luctus.</p>
                            </div>
                        </div>
                        <div className="text-center mt60">
                            <a href className="site-btn">Trang chủ khoa Công nghệ thông tin và truyền thông Đại học Cần Thơ</a>
                        </div>
                        {/* popup video */}
                        <div className="intro-video">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2">
                                    <img src="img/video.jpg" alt="" />
                                    <a href="https://www.youtube.com/watch?v=JgHfx2v9zOU" className="video-popup">
                                        <i className="fa fa-play" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="services-section spad">
                <div className="container">
                    <div className="section-title dark">
                        <h2>Get in <span>the Lab</span> and see the services</h2>
                    </div>
                    <div className="row">
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-023-flask" />
                                </div>
                                <div className="service-text">
                                    <h2>Get in the lab</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-011-compass" />
                                </div>
                                <div className="service-text">
                                    <h2>Projects online</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-037-idea" />
                                </div>
                                <div className="service-text">
                                    <h2>SMART MARKETING</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-039-vector" />
                                </div>
                                <div className="service-text">
                                    <h2>Social Media</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-036-brainstorming" />
                                </div>
                                <div className="service-text">
                                    <h2>Brainstorming</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-026-search" />
                                </div>
                                <div className="service-text">
                                    <h2>Documented</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-018-laptop-1" />
                                </div>
                                <div className="service-text">
                                    <h2>Responsive</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-043-sketch" />
                                </div>
                                <div className="service-text">
                                    <h2>Retina ready</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                        {/* single service */}
                        <div className="col-md-4 col-sm-6">
                            <div className="service">
                                <div className="icon">
                                    <i className="flaticon-012-cube" />
                                </div>
                                <div className="service-text">
                                    <h2>Ultra modern</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-center">
                        <a href className="site-btn">Browse</a>
                    </div>
                </div>
            </div>
            <div className="team-section spad">
                <div className="overlay" />
                <div className="container">
                    <div className="section-title">
                        <h2>Get in <span>the Lab</span> and  meet the team</h2>
                    </div>
                    <div className="row">
                        {/* single member */}
                        <div className="col-sm-4">
                            <div className="member">
                                <img src="img/team/1.jpg" alt="" />
                                <h2>Christinne Williams</h2>
                                <h3>Project Manager</h3>
                            </div>
                        </div>
                        {/* single member */}
                        <div className="col-sm-4">
                            <div className="member">
                                <img src="img/team/2.jpg" alt="" />
                                <h2>Christinne Williams</h2>
                                <h3>Junior developer</h3>
                            </div>
                        </div>
                        {/* single member */}
                        <div className="col-sm-4">
                            <div className="member">
                                <img src="img/team/3.jpg" alt="" />
                                <h2>Christinne Williams</h2>
                                <h3>Digital designer</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact-section spad fix">
                <div className="container">
                    <div className="row">
                        {/* contact info */}
                        <div className="col-md-5 col-md-offset-1 contact-info col-push">
                            <div className="section-title left">
                                <h2>Contact us</h2>
                            </div>
                            <p>Cras ex mauris, ornare eget pretium sit amet, dignissim et turpis. Nunc nec maximus dui, vel suscipit dolor. Donec elementum velit a orci facilisis rutrum. </p>
                            <h3 className="mt60">Main Office</h3>
                            <p className="con-item">C/ Libertad, 34 <br /> 05200 Arévalo </p>
                            <p className="con-item">0034 37483 2445 322</p>
                            <p className="con-item">hello@company.com</p>
                        </div>
                        {/* contact form */}
                    </div>
                </div>
            </div>
            <footer className="footer-section">
                <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
            </footer>
               </>
       );
    }
}
export default Trangchu;