import React from 'react';
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
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';



class EditDG extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dg: [],
            

            errors: '',
           
            KhoaeditData: {
                masodanhgia: '',
                manamhoc: '',
                mavienchuc: '',
                ykienkhoa: '',
                khoa: '',
                ngaykhoadg: ''

            },
           


           
        }


    }



    //load
    componentDidMount() {

        axios.get('/danhgias/' + this.props.match.params.id)
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
            );
        
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
     
       

    }




    Khoaupdate() {
        let { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg } = this.state.KhoaeditData;
        axios.put('/danhgias/Khoa/' + this.state.KhoaeditData.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg }).then((response) => {

                this.setState({
                    KhoaeditModal: false,
                    KhoaeditData: {
                        masodanhgia: '',
                        manamhoc: '',
                        mavienchuc: '',
                        ykienkhoa: '',
                        khoa: '',
                        ngaykhoadg: ''

                    },
                });
                

                alert("Đánh giá thành công!");
            }).catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }



    
    //render
    render() {

        const { dg, msg, errors } = this.state;

        return (
            <>

                <div className="content">
                 

                      

                    <Card>
                        <CardHeader>
                            <CardTitle> ĐÁNH GIÁ VIÊN CHỨC </CardTitle>
                            <Row>
                                <Col md="12"> <p className="text-danger">(*) Bắt buộc</p></Col>
                                <Col md="12" align="center">

                                    {(errors) ?
                                        <Alert color="warning">{errors}</Alert>
                                        :
                                        null
                                    }
                                </Col>
                            </Row>

                        </CardHeader>
                        <CardBody>
                            
                            {dg.map((emp) => {
                                return (
                                    <>
                            <Row md ="12">
                                <Col md ="4">
                                    {emp.hoten}
                                </Col>
                                <Col md="4">
                                {emp.Kqth}
                                </Col>
                                <Col md="4">
                                    {emp.Daoduc}
                                </Col>
                            </Row>
                            <Row md="12">
                                <Col md="4">
                                    {emp.Trachnhiem}
                                 </Col>
                                <Col md="4">
                                    {emp.Khac}
                                </Col>
                                <Col md="4">


                                    {emp.Loai}
                                        </Col>
                                    </Row>
                                <Row md="12">
                                    <Col md="6">
                                        {emp.Uudiem}
                                    </Col>
                                    <Col md="6">
                                        {emp.Nhuocdiem}
                                    </Col>
                                   
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Ý kiến bộ môn<strong className="text-danger">(*) </strong></Label>
                                                    <Input id="hoten" value={emp.ykbm} disabled>

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Đánh giá của bộ môn<strong className="text-danger">(*) </strong></Label>
                                                    <Input id="hoten" value={(emp.bomon == 1) ? "Hoàn thành xuất sắc nhiệm vụ"
                                                        : (emp.bomon == 2) ? "Hoàn thành tốt nhiệm vụ"
                                                            : (emp.bomon == 3) ? "Hoàn thành nhiệm vụ"
                                                                : "Không hoàn thành nhiệm vụ"
                                                    } disabled>

                                                    </Input>
                                                </FormGroup>
                                            </Col>
                                        </Row>
                                      
                                        </>
                                      )
                           })
                             }
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label htmlFor="hoten">Năm học<strong className="text-danger">(*) </strong></Label>
                                        <Input id="hoten" type="select" value={this.state.KhoaeditData.manamhoc} onChange={(e) => {
                                            let { KhoaeditData } = this.state;
                                            KhoaeditData.manamhoc = Number.parseInt(e.target.value);
                                            this.setState({ KhoaeditData });
                                        }} >

                                            {
                                                this.state.nh.map((nh) =>
                                                    <option key={nh.manamhoc} value={nh.manamhoc}>{nh.tennamhoc}</option>)
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label htmlFor="hoten">Viên chức<strong className="text-danger">(*) </strong></Label>
                                        <Input id="hoten" type="select" value={this.state.KhoaeditData.mavienchuc} onChange={(e) => {
                                            let { KhoaeditData } = this.state;
                                            KhoaeditData.mavienchuc = e.target.value;
                                            this.setState({ KhoaeditData });
                                        }} >

                                            {
                                                this.state.vienchuc.map((vc) =>
                                                    <option key={vc.mavienchuc} value={vc.mavienchuc}>{vc.hoten}</option>)
                                            }
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                      

                            <Row>
                                <Col md="12">
                                    <FormGroup>
                                        <Label htmlFor="hoten">Xếp loại đánh giá:<strong className="text-danger">(*) </strong></Label>
                                        <Input id="hoten" type="select" value={this.state.KhoaeditData.khoa} onChange={(e) => {
                                            let { KhoaeditData } = this.state;
                                            KhoaeditData.khoa = Number.parseInt(e.target.value);
                                            this.setState({ KhoaeditData });
                                        }} >

                                            <option value='0'>-- Chọn Loại Đánh Giá --</option>
                                            <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                            <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                            <option value='3'>Hoàn thành nhiệm vụ  </option>
                                            <option value='4'>Không hoàn thành nhiệm vụ </option>

                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>










                        </CardBody>
                            <CardFooter>
                            <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                            <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                            </CardFooter>

                 
                    </Card>
            </div>
            </>
        );

    }
}

export default EditDG;