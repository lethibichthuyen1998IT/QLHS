import React, { Component } from 'react';
import {
    Card,
        CardHeader,
        CardBody,
        CardFooter,
        CardTitle,
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
import { Link, NavLink } from "react-router-dom";
class notFound extends Component {
    render() {
        return (
         
           

            <body404>
                <div className="container404">
                    <img src="./img/404.svg" />
                        <br />
                    <h3>ERROR 404! 
            <br />Không tìm thấy trang yêu cầu</h3>
                    <br />
                    
                    <Link to="/trangchu"> <a className="buton">TRỞ VỀ TRANG CHỦ</a></Link>
                    </div>
                </body404>

        );

    }
}

export default notFound;