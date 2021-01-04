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
    CardFooter,
    CardTitle,
    Alert
} from "reactstrap";
import { Link, NavLink } from "react-router-dom";

const user = JSON.parse(localStorage.getItem('user'));
class Login extends Component {
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
            msg: '',
            user: JSON.parse(localStorage.getItem('user'))


        };
        this.refresh = this.refresh.bind(this);
        this.handleForm = this.handleForm.bind(this);
       
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
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            user: nvs
        });
    }


    logout() {
        localStorage.clear('user');
        this.props.history.push("/");

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
                    this.props.history.push("/admin");


                }
                else {
                    this.refresh();
                    this.props.history.push("/trangchu");
                }
                //window.location.reload();

                //this.setState({ errors: "" });
            }).catch(e => { this.setState({ errors: "Sai tài khoản hoặc mật khẩu" }) });
    };
    toggleLoginModal() {
        this.refresh();
        this.props.history.push("/trangchu");
    }
  

    render() {
        const { username, password, errors, msg } = this.state;
        return (

            <div style={{
                backgroundColor: '#D6F8F3'  }}>



                <Card style={{ width: "500px", marginLeft: '400px' }}>
                                <CardHeader style={{
                                    backgroundColor: '#AED6F1'
                                }}> <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐĂNG NHẬP HỆ THỐNG</b></p></CardHeader>

                                <CardBody>
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
                    </CardBody>
                                <CardFooter style={{
                                    backgroundColor: '#AED6F1'
                                }}>

                                    <button type="button" class="cancelbtn" onClick={this.toggleLoginModal.bind(this)}>Hủy bỏ</button>
                                    <span class="psw">Quên <a href="#">mật khẩu?</a></span>

                                </CardFooter>

                            </Card>
                           
                       

            </div>

        );

    }
}

export default Login;