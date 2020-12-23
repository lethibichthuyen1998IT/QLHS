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
class NhapCV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newcv: {
                manamhoc: '',
                mavienchuc: '',
                masodanhmuc: '',
                tencongviec: '',
                ngaythuchien: '',
                diadiem: '',
                thoigian: '',
                filecongviec:''
            },
            dm: [],
            nh: [],
            nhmd:[],
            idnh:'',
            user: JSON.parse(localStorage.getItem('user')),
            errors: '',
            selectedFile: '',
            progress: 0,
            status: ''


        };
      

    }

    componentDidMount() { 
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
        );
        axios.get('/namhocs/namhoc')
            .then((res) => this.setState({
                nhmd: res.data,

            })
            );
      
        axios.get('/dmcongviecs/')
            .then((res) => this.setState({
                dm: res.data,

            })
        );

    }

   

  
    selectFileHandler = (event) => {
        const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
        let file = event.target.files;
        console.log(`File ${file}`);
        let errMessage = [];
        if (fileTypes.every(extension => file[0].type != extension)) {
            errMessage.push(`The file ${file.type} extension is not supported`);
        } else {
            let { newcv } = this.state;
            newcv.filecongviec = event.target.value;

            this.setState({
                selectedFile: file[0],
                newcv,

            }, () => this.uploadHandler());
        }
    };
    //upload file
    uploadHandler = (event) => {

        const formData = new FormData();
        formData.append('file', this.state.selectedFile);
        axios.post('/uploadfile', formData, {
            onUploadProgress: progressEvent => {
                this.setState({
                    progress: (progressEvent.loaded / progressEvent.total * 100)
                })
            }
        })
            .then((response) => {
                this.setState({

                    status: `Tải file lên thành công`
                });
            })
            .catch((error) => {
                this.setState({ status: `Tải lên thất bại` });
            })
    }

    toggleHuyModal() {
        this.setState({
            newcv: {
                manamhoc: '',
                mavienchuc: this.state.user.mavienchuc,
                masodanhmuc: '',
                tencongviec: '',
                ngaythuchien: '',
                diadiem: '',
                thoigian: '',
                filecongviec: ''

            }
        })
       }
    addCV() {
      
            axios.post('/congviecs/', {
                MAVIENCHUC: this.state.user.mavienchuc,
                MANAMHOC: this.state.nhmd.manamhoc,
                MASODANHMUC: this.state.newcv.masodanhmuc,
                TENCONGVIEC: this.state.newcv.tencongviec,
                NGAYTHUCHIEN: this.state.newcv.ngaythuchien,
                DIADIEM: this.state.newcv.diadiem,
                THOIGIAN: this.state.newcv.thoigian,
                FILECONGVEC: this.state.newcv.filecongviec

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm thành công!");
                this.setState({
                    newpc: {
                        manamhoc: '',
                        mavienchuc: this.state.user.mavienchuc,
                        masodanhmuc: '',
                        tencongviec: '',
                        ngaythuchien: '',
                        diadiem: '',
                        thoigian: '',
                        filecongviec: ''

                    },
                    errors: ''
                
                }, () => this.toggleHuyModal());
             
              
            })
                .catch((error) => {
                    console.log(error.response);
                    alert(error);
                });
            //.catch ((error) => console.log(error.response.request.response) );
       
    }

    render() {
      
       
      
        return (
            <>

              
                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>CÔNG VIỆC</h2>
                            <div class="page-links">
                                <Link to="/trangchu">Trang chủ</Link>
                                <span>Công việc</span>
                            </div>
                        </div>
                    </div>
                </div>
             
                <div class="page-section spad">
                    <div class="container" style={{ paddingTop: '-500px', paddingLeft: '-300px', width: '1800px' }}>
                        <div class="row">

                           
                            <div class="col-md-6 col-sm-7 blog-posts" style={{ textAlign: 'justify' }}>
                    <div class="element">
                        <h4 style={{ height: '5px', color: 'blue', textAlign: 'center' }}>Nhập công việc</h4>
                        </div>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="hoten">Danh mục: </Label>
                                <Input type="select" name="name"
                                    value={this.state.newcv.masodanhmuc} onChange={(e) => {
                                        let { newcv } = this.state;
                                         newcv.masodanhmuc = Number.parseInt(e.target.value);
                                         this.setState({ newcv });
                                    }} >
                                    <option value='0' >--Chọn danh mục công việc--</option>
                                    {
                                        this.state.dm.map((lv) =>
                                            <option key={lv.masodanhmuc} value={lv.masodanhmuc}>{lv.tendanhmuc}</option>)
                                    }
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="hoten">Năm học: </Label>
                                <Input type="select"
                                                value={this.state.newcv.manamhoc} onChange={(e) => {
                                        let { newcv } = this.state;
                                        newcv.manamhoc = Number.parseInt(e.target.value);
                                                    this.setState({ newcv });
                                                }} disabled >
                                                
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
                            
                                <Label htmlFor="hoten">Tên công việc: </Label>
                                <Input type="text"  value={this.state.newcv.tencongviec} onChange={(e) => {
                                    let { newcv } = this.state;
                                    newcv.tencongviec = e.target.value ;

                                    this.setState({ newcv });
                                }} placeholder="Tên công việc" />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="hoten">Ngày thực hiện: </Label>
                                <Input type="date" value={this.state.newcv.ngaythuchien} onChange={(e) => {
                                    let { newcv } = this.state;
                                    newcv.ngaythuchien = e.target.value;

                                    this.setState({ newcv });
                                }} placeholder="Ngày thực hiện" />
                            </FormGroup>
                        </Col>
                   

                        <Col md="6">
                            <FormGroup>
                                <Label htmlFor="hoten">Thời gian thực hiện (giờ): </Label>
                                <Input type="number" value={this.state.newcv.thoigian} onChange={(e) => {
                                        let { newcv } = this.state;
                                    newcv.thoigian = e.target.value;

                                        this.setState({ newcv });
                                }} placeholder="Thời gian thực hiện" />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Col md="12">
                            <FormGroup>
                                <Label htmlFor="hoten">Địa điểm: </Label>
                                        <Input type="textarea" value={this.state.newcv.diadiem} onChange={(e) => {
                                            let { newcv } = this.state;
                                            newcv.diadiem = e.target.value;

                                            this.setState({ newcv });
                                }} placeholder="Địa điểm" />
                            </FormGroup>
                        </Col>
                    </Row>


                    <Row>
                        <Col md="12">
                            <FormGroup>
                                            <Label htmlFor="hoten">File đính kèm: </Label>
                                            <Input type="file" value={this.state.newcv.filecongviec} onChange={this.selectFileHandler.bind(this)} />
                                                <br />
                                                <div>{this.state.progress}%</div>

                                                <div>{this.state.status}</div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row md="12">
                        <Col md="6">
                           
                                      
                            <button onClick={this.addCV.bind(this)} class="site-btn">Lưu</button>
                        </Col>
                        <Col md="6">
                                <button onClick={this.toggleHuyModal.bind(this)}>Hủy</button>
                           
                        </Col>
                    </Row>
                    </div>
                   
                            <div class="col-md-6 col-sm-5 sidebar" style={{marginTop: '0px'}}>
                              
                                    <div class="row">
                                        <div class="col-md-12">
                                        <div class="element" style={{ height: '30px', width: '800px'}}>

                                                <div class="buttons" style={{ marginLeft: '-150px' }}  >
                                                <Link to="/congtac">  <button class="site-btn mr20" style={{ width: '50px' }}> Công tác </button></Link>
                                                <Link to="/renluyen"><button class="site-btn btn-3 mr20" style={{ width: '50px' }}>Rèn luyện</button> </Link>
                                             

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                               
                                <div class="widget-item" style={{ textAlign: 'left', paddingTop: '10px', paddingLeft: '20px', backgroundColor: '#D6EAF8', color: 'black' }}>
                                    <p style={{ color: 'red', fontSize: '18px' }}>Gợi ý:</p>
                            <p><b> Hội thao:</b> tham gia các hội thao do trường, khoa hoặc thành phố tổ chức </p> 
                            <p><b> Tuyên truyền:</b> tham gia các hoạt động tuyên truyền do trường, khoa hoặc thành phố tổ chức </p> 
                            <p><b>Lao động:</b> tham gia hoặc hướng dẫn các ngày lao động do trường, khoa hoặc thành phố tổ chức </p> 
                       
                          
                            <p><b> Hội thao:</b> tham gia các hội thao do trường, khoa hoặc thành phố tổ chức </p> 
                            <p><b> Tuyên truyền:</b> tham gia các hoạt động tuyên truyền do trường, khoa hoặc thành phố tổ chức </p> 
                            <p><b>Lao động:</b> tham gia hoặc hướng dẫn các ngày lao động do trường, khoa hoặc thành phố tổ chức </p> 
                        </div>
                        </div>
                    </div>
                   
                    </div>
                    </div>
              
                <div style={{height: '70px'}} />
              
                       
               
            
              
                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
            </>
        );
    }
}
export default NhapCV;