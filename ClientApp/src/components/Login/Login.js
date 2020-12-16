import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import {
    Button,
    Input, Label, Form, FormGroup, Card,
    CardHeader,
    CardBody,
    CardTitle,
    Alert
} from "reactstrap";
const user = JSON.parse(localStorage.getItem('user'));
class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { username: "", password: "", vienchuc: [], errors: "", loginModal: false};
        
        this.handleForm = this.handleForm.bind(this);
    }
    componentDidMount() {

        axios.get('/vienchucs')
            .then((res) => this.setState({
                vienchuc: res.data,
                errors:'',
                showAlert: false,
               
            })

            );
    }
    handleForm = (e) => {
        e.preventDefault();
        const { vienchuc } = this.state;
            axios.post("/login/authenticate", { USERNAME: this.state.username, PASSWORD: this.state.password })
                .then(res => {
                    //cookie.set("token", res.data.access_token);
                    //this.props.setLogin(res.data.vienchuc);
                    localStorage.setItem('user', JSON.stringify(res.data));
                   
                   
                    //this.setState({ errors: "" });
                }).catch(e => { this.setState({ errors: "Sai tài khoản hoặc mật khẩu" }) });
        
        
        
    };
    toggleLoginlModal() {
        this.setState({

            LoginModal: !this.state.LoginlModal


        });
    }
   
    render() {

        const { username, password, errors, loginModal } = this.state;
        
        return (
            <Card className="w-25">
            <CardHeader >
                    <CardTitle tag="h3" align="center"><b style={{ width: '500px' }}>Đăng nhập hệ thống</b></CardTitle>
            </CardHeader>
                <CardBody>
                    <Form onSubmit={(e) => this.handleForm(e)}>
                                {
                            (errors) ?
                                <div class="alert alert-danger" align ="center">
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
                                            <input type="checkbox"  name="remember" /> Nhớ mật khẩu
                                         </label>
                      
                        
                        <button type="submit" class="successbtn" disabled={!(password.length > 0 && username.length > 0)}>
                                    Đăng nhập
                                </button>

                        </div>
                        <div class="container">
                  
                        <button type="button" class="cancelbtn">Hủy bỏ</button>
                        <span class="psw">Quên <a href="#">mật khẩu?</a></span>
                    </div>
                        
                    </Form>
                </CardBody>
            
            </Card>
            
        );
    }
}

export default Login;
