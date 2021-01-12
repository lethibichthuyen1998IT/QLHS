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
            user: JSON.parse(localStorage.getItem('user')),
            hangvc: '',
            bacvc:'',
            hesoluong: 0,
            lv: [],
            nl: [],
            pc:[],
            tstiet: '',
            mavienchuc: '',
            idnh:''
          
            
         
        }



    }

    

    //load
    componentDidMount() {

        //hien thi danh sach

       
     
        axios.get('/danhgias/' + this.props.match.params.id )
            .then((res) => this.setState({
                details: res.data,
                hangvc: res.data.hangchucdanh,
                bacvc: res.data.bacluong,
                mavienchuc: res.data.mavienchuc,
                idnh: res.data.manamhoc


            }, () => this.Data())
        );
        axios.get('/phancongs/vc/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                pc: res.data,

            }));


        axios.get('/phancongs/lv/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                lv: res.data,

            }));
        axios.get('/phancongs/nl/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                nl: res.data,

            }));
        axios.get('/phancongs/tstiet/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                tstiet: res.data,

            }));

      
      

    }

    LoadVC() {

        switch (this.state.hangvc.trim()) {
            case "I":
                {
                    switch (this.state.bacvc) {
                        case 1: this.state.hesoluong = 6.2; break;
                        case 2: this.state.hesoluong = 6.56; break;
                        case 3: this.state.hesoluong = 6.92; break;
                        case 4: this.state.hesoluong = 7.28; break;
                        case 5: this.state.hesoluong = 7.64; break;
                        case 6: this.state.hesoluong = 8.0; break;

                    }
                    break;

                }

            case "II":
                {
                    switch (this.state.bacvc) {
                        case 1: this.state.hesoluong = 4.4; break;
                        case 2: this.state.hesoluong = 4.74; break;
                        case 3: this.state.hesoluong = 5.08; break;
                        case 4: this.state.hesoluong = 5.42; break;
                        case 5: this.state.hesoluong = 5.76; break;
                        case 6: this.state.hesoluong = 6.10; break;
                        case 7: this.state.hesoluong = 6.44; break;
                        case 8: this.state.hesoluong = 6.78; break;

                    }
                    break;
                }
            case "III":
                {
                    switch (this.state.bacvc) {
                        case 1: this.state.hesoluong = 2.34; break;
                        case 2: this.state.hesoluong = 2.67; break;
                        case 3: this.state.hesoluong = 3.0; break;
                        case 4: this.state.hesoluong = 3.33; break;
                        case 5: this.state.hesoluong = 3.66; break;
                        case 6: this.state.hesoluong = 3.99; break;
                        case 7: this.state.hesoluong = 4.32; break;
                        case 8: this.state.hesoluong = 4.65; break;
                        case 9: this.state.hesoluong = 4.98; break;
                        default: break

                    }
                }
                break;


        }

       

    }

    Data() {
        axios.get('/phancongs/vc/' + this.state.mavienchuc)
            .then((res) => this.setState({
                pc: res.data,

            }));

        axios.get('/phancongs/lv/' + this.state.mavienchuc)
            .then((res) => this.setState({
                lv: res.data,

            }));
        axios.get('/phancongs/nl/' + this.state.mavienchuc)
            .then((res) => this.setState({
                nl: res.data,

            }));
        axios.get('/phancongs/tstiettheonam/' + this.state.mavienchuc + '/' + this.state.idnh)
            .then((res) => this.setState({
                tstiet: res.data,

            }));
    }



  

    //render
    render() {
        this.LoadVC();
        const { errors } = this.state;
        const { vc, dg, details, bomonchuadg, hesoluong, bacvc, hangvc, lv, nl, tstiet,pc} = this.state;
        
        return (
            <>
                <Button style={{ width: '130px', marginRight: '10px' }} color="primary" onClick={() => window.print()}><i class="fa fa-print"></i> - {details.masodanhgia}</Button>
              
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
                            PHIẾU ĐÁNH GIÁ VÀ PHẦN LOẠI VIÊN CHỨC <br />(Dành cho viên chức không giữ chức vụ quản lý)< br />
                            Năm học {details.tennamhoc}
                            </Col>
                        </Row>
                        <Row md="12" style={{ textAlign: 'justify' }}>
                            <Col md="12">
                                <b>Họ và tên: <a style={{ textTransform: "uppercase", fontWeight:'bold' }}>{details.hoten} </a> </b> 
                            
                            </Col>

                            
                            <Col md="12">
                                <b>Chức danh nghề nghiệp: <a style={{fontWeight: 'bold' }}>{details.tenchucdanh} </a> </b>

                            </Col>
                            <Col md="12">
                                <b>Đơn vị công tác: Bộ môn <a style={{ fontWeight: 'bold' }}>{details.tenbomon} </a> , Khoa <a style={{ fontWeight: 'bold' }}>{details.tenkhoa} </a>   </b>

                            </Col>
                            <Col md="4">
                                <b>Hạng chức danh nghề nghiệp: <a style={{ fontWeight: 'bold' }}>{details.hangchucdanh} </a>  </b>

                            </Col>
                            <Col md="4">
                            <b>Bậc: { details.bacluong}</b>

                            </Col>
                            <Col md="4">
                            <b>Hệ số lương: {hesoluong} </b>

                            </Col>
                            
                        </Row>
                        
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                        <Row md ="12" style={{ fontWeight: 'bold' }}> 
                        I. TỰ ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC
                            </Row>
                    <Row md="12">
                        <Col md="12">
                            Số tiết giảng dạy: <b> {tstiet}</b> tiết chuẩn, &nbsp;
                                                hướng dẫn <b> {nl.soluong}</b> tiểu luận/niên luận,&nbsp;
                                                 hướng dẫn <b> {lv.soluong}</b> luận văn <br />
                            Các môn giảng dạy: {pc.map((emp) => {
                            return (<strong> {emp.tenmonhoc},</strong>)
                        })}

                        </Col>
                    </Row>
                        <Row md="12"> 
                        <b> 1. Kết quả thực hiện công việc hoặc nhiệm vụ theo hợp đồng làm việc đã ký kết:</b> 
                    </Row>

                    <Row md="12" style={{ whiteSpace: 'pre' }}> {details.kqth}   </Row>
                      
                      
                        <Row md="12"> 
                        <b> 2. Việc thực hiện quy định về đạo đức nghề nghiệp:</b></Row>
                    <Row md="12" style={{ whiteSpace: 'pre' }}> {details.daoduc}   </Row>
                      
                        <Row md="12" > 
                        <b> 3. Tinh thần trách nhiệm, thái độ phục vụ nhân dân, tinh thần hợp tác với đồng nghiệp và việc thực hiện quy tắc ứng xử của viên chức:</b></Row>
                    <Row md="12" style={{ whiteSpace: 'pre' }}> {details.trachnhiem}   </Row>
                 
                        <Row md="12">
                           <b> 4. Việc thực hiện các nghĩa vụ khác của viên chức: <br/></b>
                            (việc tham gia các hoạt động do Trường và đơn vị tổ chức/ việc tham gia triển khai nghị quyết, chính sách, pháp luật của Đảng, Nhà nước/việc tham gia học tập nâng cao trình độ..)</Row>
                    <Row md="12" style={{ whiteSpace: 'pre' }}> {details.khac}   </Row>
                        
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            II. TỰ ĐÁNH GIÁ, PHÂN LOẠI CỦA VIÊN CHỨC
                            </Row>
                        <Row md="12">
                        <b> 1. Đánh giá ưu, nhược điểm:</b>  </Row>
                    <Row md="12">Ưu điểm: {details.uudiem}   </Row>
                    <Row md="12">Nhược điểm: {details.nhuocdiem} </Row>
                       
                        <Row md="12">
                        <b> 2. Phân loại đánh giá: </b>&nbsp; {(details.loai == 1) ? "Hoàn thành xuất sắc" : (details.loai == 2) ? "Hoàn thành tốt" : (details.loai == 3) ? "Hoàn thành" : "Không hoàn thành"}

                        </Row>
                  
                    <Row md="12">
                        <b> Ngày đánh giá: </b> &nbsp; {moment(details.ngayvcdg).format("DD-MM-YYYY")}
                        </Row>
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            III. Ý KIẾN CỦA TẬP THỂ ĐƠN VỊ VÀ LÃNH ĐẠO TRỰC TIẾP QUẢN LÝ VIÊN CHỨC
                            </Row>
                        <Row md="12">
                        <b> 1. Ý kiến của tập thể đơn vị viên chức công tác:</b> </Row>&nbsp; 
                        <Row md="12" style={{ whiteSpace: 'pre' }}>{details.ykbm}   </Row>
                            
                       
                        <Row md="12">
                        <b> 2. Nhận xét của lãnh đạo trực tiếp quản lý viên chức:</b> &nbsp; 
                        {(details.bomon == 1) ? "Hoàn thành xuất sắc" : (details.bomon == 2) ? "Hoàn thành tốt" : (details.bomon == 3) ? "Hoàn thành" : "Không hoàn thành"} 
                    </Row>
                    <Row md="12">
                        <b> 3. Danh hiệu thi đua (đề cử): </b>&nbsp; {(details.danhhieubm == 1) ? "Lao động tiên tiến" : (details.danhhieubm == 2) ? "Chiến sĩ thi đua cơ sở" : (details.danhhieubm == 3) ? "Chiến sĩ thi đua cấp bộ" : "Chiến sĩ thi đua toàn quốc"}

                    </Row>

                        <Row md="12">
                        <Col md="12" style={{ textAlign: 'right' }}> Ngày đánh giá:  {moment(details.ngaybmdg).format("DD-MM-YYYY")}
                          

                            </Col>

                        </Row>
                        <Row md="12" style={{ fontWeight: 'bold' }}>
                            IV. KẾT QUẢ ĐÁNH GIÁ, PHÂN LOẠI VIÊN CHỨC CỦA CẤP CÓ THẨM QUYỀN
                            </Row>
                        <Row md="12">
                        <b> 1.Nhận xét ưu điểm, nhược điểm </b></Row>
                    <Row md="12" style={{ whiteSpace: 'pre' }}> {details.ykienkhoa}   </Row>
                       
                        <Row md="12">
                        <b> 2. Kết quả đánh giá, phân loại viên chức:</b>&nbsp; 
                   {(details.khoa == 1) ? "Hoàn thành xuất sắc" : (details.khoa == 2) ? "Hoàn thành tốt" : (details.khoa == 3) ? "Hoàn thành" : "Không hoàn thành"}  

                    </Row>
                    <Row md="12">
                        <b> 3. Danh hiệu thi đua: </b>&nbsp; {(details.danhhieukhoa == 1) ? "Lao động tiên tiến" : (details.danhhieukhoa == 2) ? "Chiến sĩ thi đua cơ sở" : (details.danhhieukhoa == 3) ? "Chiến sĩ thi đua cấp bộ" : "Chiến sĩ thi đua toàn quốc"}

                    </Row>

                        <Row md="12">
                            <Col md="12" style={{ textAlign: 'right' }}>
                            <b> Ngày đánh giá: </b>{moment(details.ngaykhoadg).format("DD-MM-YYYY")}
                         
                          

                            </Col>

                        </Row>
                        </div>
                  
              
                
            </>
        );

    }
}

export default PhieuDanhGia;