import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";

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
import moment from 'moment';
var date = new Date();
class KhoaDG extends Component {
    constructor(props) {
        super(props);
        this.state = {

            editData: {
                masodanhgia: '',
                manamhoc: '',
                mavienchuc: '',
                ykienkhoa: '',
                khoa: '',
                ngaykhoadg: date,
                danhhieukhoa:'',
                

            },


            dg: [],
            ctdg: [],
            nh: [],

            idnh: '',
            user: JSON.parse(localStorage.getItem('user')),
            errors: '',
            selectedFile: '',
            pc: [],
            lv: [],
            nl: [],
            tstiet: '',
            vc: [],
            bacvc: '',
            hesoluong: 0,
            hangvc: '',
            mavienchuc: '',
            idnh:''


        };


    }

    componentDidMount() {

      
        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data.manamhoc,

            })
            );

        axios.get('/namhocs/namhoc')
            .then(res => {
                var nhmd = res.data;
                this.setState({
                    idnh: nhmd.manamhoc

                })

            });

        axios.get('/danhgias/' + this.props.match.params.id)
            .then((res) => this.setState({
                ctdg: res.data,
                hangvc: res.data.hangchucdanh,
                bacvc: res.data.bacluong,
                mavienchuc: res.data.mavienchuc,
                idnh: res.data.manamhoc

            }, () => this.loadData())
            );
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
        axios.get('/vienchucs/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                vc: res.data,


            })


            );

        console.log(this.state.vc);

        axios.get('/danhgias/')
            .then((res) => this.setState({
                dg: res.data,

            })
            );




    }



    loadData() {

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
        this.setState({
            editData: {
                masodanhgia: this.state.ctdg.masodanhgia,
                manamhoc: this.state.ctdg.manamhoc,
                mavienchuc: this.state.ctdg.mavienchuc,
                ykienkhoa: this.state.ctdg.ykienkhoa,
                khoa: this.state.ctdg.khoa,
                ngaykhoadg: date,
                danhhieukhoa: this.state.ctdg.danhhieukhoa

            },


        });
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





    update() {

        let { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg, danhhieukhoa } = this.state.editData;
        axios.put('/danhgias/khoa/' + this.state.editData.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg, danhhieukhoa }).then((response) => {

                this.setState({

                    editData: {
                        masodanhgia: '',
                        manamhoc: '',
                        mavienchuc: '',
                        ykienkhoa: '',
                        khoa: '',
                        ngaykhoadg: date,
                        danhhieukhoa:''
                    },
                });
                this.props.history.push("/admin/danhgia");
                alert("Đánh giá thành công!");
            }).catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }


    render() {


        const { dg, user, idnh, ctdg, pc, lv, nl, tstiet, vc, hesoluong } = this.state;
       

        return (


            <>

                <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                    <Row md="12" >
                        <Col md="6" >
                            <a style={{ paddingLeft: '7px' }}> BỘ GIÁO DỤC VÀ ĐÀO TẠO</a> <br />
                            <a style={{ fontWeight: 'bold' }}>TRƯỜNG ĐẠI HỌC CẦN THƠ</a> <br />
                            <b style={{ paddingLeft: '70px' }}>-----</b>
                        </Col>
                        <Col md="6" style={{
                            textAlign: 'right', paddingRight: '20px', fontWeight: 'bold'
                        }}>
                            <b>CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM </b><br />
                            <b style={{ paddingRight: '40px' }}>Độc lập - Tự do - Hạnh phúc</b> <br />
                            <b style={{ paddingRight: '110px' }}>-------------</b>
                        </Col>
                    </Row>

                    <Row md="12" style={{ textAlign: 'center' }}>
                        <Col md="12" style={{ fontWeight: 'bold' }}>
                            PHIẾU ĐÁNH GIÁ VÀ PHẦN LOẠI VIÊN CHỨC <br />(Dành cho trưởng khoa)< br />
                            Năm học {ctdg.tennamhoc}
                        </Col>
                    </Row>
                    <Row md="12" style={{ textAlign: 'justify' }}>
                        <Col md="12">
                            <b>Họ và tên: <a style={{ textTransform: "uppercase", fontWeight: 'bold' }}>{ctdg.hoten} </a> </b>

                        </Col>


                        <Col md="12">
                            <b>Chức danh nghề nghiệp: <a style={{ fontWeight: 'bold' }}>{ctdg.tenchucdanh} </a> </b>

                        </Col>
                        <Col md="12">
                            <b>Đơn vị công tác: Bộ môn <a style={{ fontWeight: 'bold' }}>{ctdg.tenbomon} </a> , Khoa <a style={{ fontWeight: 'bold' }}>{ctdg.tenkhoa} </a>   </b>

                        </Col>
                        <Col md="4">
                            <b>Hạng chức danh nghề nghiệp: <a style={{ fontWeight: 'bold' }}>{ctdg.hangchucdanh} </a>  </b>

                        </Col>
                        <Col md="4">
                            <b>Bậc: {ctdg.bacluong} </b>

                        </Col>
                        <Col md="4">
                            <b>Hệ số lương: { hesoluong}</b>

                        </Col>

                    </Row>

                </div>
                <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                    <Row md="12" style={{ fontWeight: 'bold' }}>
                        <Col>   I. TỰ ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC </Col>
                    </Row>
                    <Row md="12">
                        <Col><b> 1. Kết quả thực hiện công việc hoặc nhiệm vụ theo hợp đồng làm việc đã ký kết:</b> </Col>
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
                        <Col md="12" style={{ whiteSpace: 'pre' }}>
                            {ctdg.kqth}
                        </Col>
                    </Row>


                    <Row md="12">
                        <Col> <b> 2. Việc thực hiện quy định về đạo đức nghề nghiệp:</b> </Col></Row>
                    <Row md="12">
                        <Col md="12" style={{ whiteSpace: 'pre' }}>

                            {ctdg.daoduc}
                        </Col>
                    </Row>

                    <Row md="12" >
                        <Col><b> 3. Tinh thần trách nhiệm, thái độ phục vụ nhân dân, tinh thần hợp tác với đồng nghiệp và việc thực hiện quy tắc ứng xử của viên chức:</b> </Col></Row>
                    <Row md="12">
                        <Col md="12" style={{ whiteSpace: 'pre' }}>
                            {ctdg.trachnhiem}
                        </Col>
                    </Row>

                    <Row md="12" >
                        <Col> <b> 4. Việc thực hiện các nghĩa vụ khác của viên chức: <br /></b>
                            (việc tham gia các hoạt động do Trường và đơn vị tổ chức/ việc tham gia triển khai nghị quyết, chính sách, pháp luật của Đảng, Nhà nước/việc tham gia học tập nâng cao trình độ..) </Col></Row>
                    <Row md="12">  <Col md="12" style={{ whiteSpace: 'pre' }}>
                        {ctdg.khac}
                    </Col>  </Row>

                    <Row md="12" style={{ fontWeight: 'bold' }}>
                        <Col> II. TỰ ĐÁNH GIÁ, PHÂN LOẠI CỦA VIÊN CHỨC </Col>
                    </Row>
                    <Row md="12">
                        <Col><b> 1. Đánh giá ưu, nhược điểm:</b> </Col>  </Row>
                    <Row md="12"> <Col md="12">
                        {ctdg.uudiem}
                    </Col>  </Row>
                    <Row md="12"><Col md="12">
                        {ctdg.nhuocdiem}
                    </Col> </Row>

                    <Row md="12">
                        <Col md="12">
                            <b> 2. Phân loại đánh giá: </b>&nbsp; {(ctdg.loai == 1) ? "Hoàn thành xuất sắc" : (ctdg.loai == 2) ? "Hoàn thành tốt" : (ctdg.loai == 3) ? "Hoàn thành" : "Không hoàn thành"}
                        </Col>
                    </Row>
                  
                    <Row md="12">
                        <Col><b> Ngày đánh giá: </b> &nbsp; {moment(ctdg.ngayvcdg).format("DD-MM-YYYY")} </Col>
                    </Row>
                    <Row md="12" style={{ fontWeight: 'bold' }}>
                        III. Ý KIẾN CỦA TẬP THỂ ĐƠN VỊ VÀ LÃNH ĐẠO TRỰC TIẾP QUẢN LÝ VIÊN CHỨC
                            </Row>
                    <Row md="12">
                        <Col> <b> 1. Ý kiến của tập thể đơn vị viên chức công tác:</b> </Col> </Row>
                    <Row md="12">
                        <Col md="12" style={{ whiteSpace: 'pre' }}>
                            {ctdg.ykbm}
                        </Col>
                    </Row>


                    <Row md="12">
                        <Col><b> 2. Nhận xét của lãnh đạo trực tiếp quản lý viên chức:</b>  </Col>
                        <Col md="12" style={{ whiteSpace: 'pre' }}>
                            {ctdg.bomon}
                        </Col>
                    </Row>
                    <Row md="12">
                        <b> 3. Danh hiệu thi đua (đề cử): </b>&nbsp; {(ctdg.danhhieubm == 1) ? "Lao động tiên tiến" : (ctdg.danhhieubm == 2) ? "Chiến sĩ thi đua cơ sở" : (ctdg.danhhieubm == 3) ? "Chiến sĩ thi đua cấp bộ" : "Chiến sĩ thi đua toàn quốc"}

                    </Row>
                    <Row md="12">
                        <Col><b> Ngày đánh giá: </b> &nbsp; {moment(ctdg.ngaybmdg).format("DD-MM-YYYY")} </Col>
                    </Row>
                    <Row md="12" style={{ fontWeight: 'bold' }}>
                        <Col>IV. KẾT QUẢ ĐÁNH GIÁ, PHÂN LOẠI VIÊN CHỨC CỦA CẤP CÓ THẨM QUYỀN </Col>
                    </Row>
                    <Row md="12">
                        <Col>   <b> 1.Nhận xét ưu điểm, nhược điểm </b> </Col></Row>
                    <Row md="12"> <Col md="12">
                        <FormGroup>

                            <Input id="hoten" type="textarea" value={this.state.editData.ykienkhoa} onChange={(e) => {
                                let { editData } = this.state;
                                editData.ykienkhoa = e.target.value;
                                this.setState({ editData });
                            }} >

                            </Input>
                        </FormGroup>
                    </Col>  </Row>

                    <Row md="12">
                        <Col>
                            <b> 2. Kết quả đánh giá, phân loại viên chức:</b></Col>
                        <Col md="12">
                            <FormGroup>

                                <Input id="hoten" type="select" value={this.state.editData.khoa} onChange={(e) => {
                                    let { editData } = this.state;
                                    editData.khoa = Number.parseInt(e.target.value);
                                    this.setState({ editData });
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
                    <Row md="12">
                        <Col>
                            <b> 3. Danh hiệu thi đua:</b></Col>
                        <Col md="12">
                            <FormGroup>

                                <Input id="hoten" type="select" value={this.state.editData.danhhieukhoa} onChange={(e) => {
                                    let { editData } = this.state;
                                    editData.danhhieukhoa = Number.parseInt(e.target.value);
                                    this.setState({ editData });
                                }} >
                                    <option value='0'>-- Chọn Loại Danh hiệu --</option>
                                    <option value='1'>Lao động tiên tiến </option>
                                    <option value='2'>Chiến sĩ thi đua cơ sở </option>
                                    <option value='3'>Chiến sĩ thi đua cấp Bộ  </option>
                                    <option value='4'>Chiến sĩ thi đua toàn quốc </option>

                                </Input>
                            </FormGroup>
                        </Col>

                    </Row>


                    <Row>
                        <Col md="12">


                            <button onClick={this.update.bind(this)} class="site-btn">Lưu</button>
                        </Col>

                    </Row>
                </div>
            </>

        );
    }
}
export default KhoaDG;