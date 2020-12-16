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
import Doc from 'components/DocService';
import PdfContainer from 'components/PdfContainer';



class PhieuDanhGia extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dg: [],
            source: [],
            showAlert: false,
            confirm: false,
            vienchuc: [],
            vc: [],
            details:[],
            xoa: {
                Masodanhgia: '',
                Mavienchuc: '',
            },
            
         
        }



    }

    createPdf = (html) => Doc.createPdf(html);

    //load
    componentDidMount() {

        //hien thi danh sach

        axios.get('/danhgias/')
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
            );
     
        axios.get('/danhgias/' + this.props.match.params.id )
            .then((res) => this.setState({
                details: res.data,
              
            })
            );

        
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
             vc: nvs
        });
       
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );

    }

    //createPdf = (html) => Doc.createPdf(html);

    //render
    render() {

        const { errors } = this.state;
        const { vc, dg, details, bomonchuadg } = this.state;
        console.log(details);
       
        return (
            <>
                <Button onClick={() => window.print()}>a</Button>
                <PdfContainer createPdf={this.createPdf}>
                    <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                        <Row md="12" >
                            <Col md="6" >
                        <a style={{ paddingLeft: '7px' }}> BỘ GIÁO DỤC VÀ ĐÀO TẠO</a> <br />
                                <a style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC CẦN THƠ</a> <br />
                        <b style={{ paddingLeft: '70px' }}>-----</b>
                            </Col>
                            <Col md="6" style={{
                                textAlign: 'right', paddingRight: '20px', fontWeight: 'bold' }}>
                         <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </b><br />
                                <b style={{ paddingRight: '40px' }}>Độc lập - Tự do - Hạnh phúc</b> <br />
                                <b style={{ paddingRight: '110px' }}>-------------</b>
                            </Col>
                            </Row>

                        <Row md="12" style={{ textAlign: 'center' }}>
                            <Col md="12" style={{ fontWeight: 'bold' }}>
                        PHIẾU ĐÁNH GIÁ VÀ PHẦN LOẠI VIÊN CHỨC <br />(Dành cho viên chức không giữ chức vụ quản lý)< br/>
                            Năm học 
                            </Col>
                        </Row>
                        <Row md="12" style={{ textAlign: 'justify' }}>
                            <Col md="12">
                                <b>Họ và tên: <a style={{ textTransform: "uppercase", fontWeight:'bold' }}>{details.hoten} </a> </b> 
                            
                            </Col>

                            
                            <Col md="12">
                                <b>Chức danh nghề nghiệp:<a style={{fontWeight: 'bold' }}>{details.tenchucdanh} </a> </b>

                            </Col>
                            <Col md="12">
                                <b>Đơn vị công tác: Bộ môn <a style={{ fontWeight: 'bold' }}>{details.tenbomon} </a> , Khoa <a style={{ fontWeight: 'bold' }}>{details.tenkhoa} </a>   </b>

                            </Col>
                            <Col md="4">
                                <b>Hạng chức danh nghề nghiệp:<a style={{ fontWeight: 'bold' }}>{details.hangchucdanh} </a>  </b>

                            </Col>
                            <Col md="4">
                                <b>Bậc: </b>

                            </Col>
                            <Col md="4">
                                <b>Hệ số lương: </b>

                            </Col>
                            
                        </Row>
                        
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                        <Row md ="12" style={{ fontWeight: 'bold' }}> 
                            I. TỰ ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC
                            </Row>
                        <Row md="12"> 
                            <b> 1. Kết quả thực hiện công việc hoặc nhiệm vụ theo hợp đồng làm việc đã ký kết:</b>
                        </Row>
                        <Row md="12"> 
                            <b> 2. Việc thực hiện quy định về đạo đức nghề nghiệp:</b>
                        </Row>
                        <Row md="12" > 
                            <b> 3. Tinh thần trách nhiệm, thái độ phục vụ nhân dân, tinh thần hợp tác với đồng nghiệp và việc thực hiện quy tắc ứng xử của viên chức:</b>
                        </Row>
                        <Row md="12">
                           <b> 4. Việc thực hiện các nghĩa vụ khác của viên chức: <br/></b>
                            (việc tham gia các hoạt động do Trường và đơn vị tổ chức/ việc tham gia triển khai nghị quyết, chính sách, pháp luật của Đảng, Nhà nước/việc tham gia học tập nâng cao trình độ..)

                        </Row>
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            II. TỰ ĐÁNH GIÁ, PHÂN LOẠI CỦA VIÊN CHỨC
                            </Row>
                        <Row md="12">
                            <b> 1. Đánh giá ưu, nhược điểm:</b>
                        </Row>
                        <Row md="12">
                            <b> 2. Phân loại đánh giá:</b>
                        </Row>
                       
                        <Row md="12">
                            <b> Ngày đánh giá:</b>
                        </Row>
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            III. Ý KIẾN CỦA TẬP THỂ ĐƠN VỊ VÀ LÃNH ĐẠO TRỰC TIẾP QUẢN LÝ VIÊN CHỨC
                            </Row>
                        <Row md="12">
                            <b> 1. Ý kiến của tập thể đơn vị viên chức công tác:</b>
                            
                        </Row>
                        <Row md="12">
                            <b> 2. Nhận xét của lãnh đạo trực tiếp quản lý viên chức:</b>
                        </Row>

                        <Row md="12">
                            <Col md="12" style={{ textAlign: 'right' }}>
                                <b> Ngày đánh giá:</b><br />
                               

                            </Col>

                        </Row>
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            IV. KẾT QUẢ ĐÁNH GIÁ, PHÂN LOẠI VIÊN CHỨC CỦA CẤP CÓ THẨM QUYỀN
                            </Row>
                        <Row md="12">
                            <b> 1.Nhận xét ưu điểm, nhược điểm </b>

                        </Row>
                        <Row md="12">
                            <b> 2. Kết quả đánh giá, phân loại viên chức:</b>
                        </Row>

                        <Row md="12">
                            <Col md="12" style={{ textAlign: 'right' }}>
                                <b> Ngày đánh giá:</b><br />
                               
                                

                            </Col>

                        </Row>
                        </div>
                    </PdfContainer>  
              
                
            </>
        );

    }
}

export default PhieuDanhGia;