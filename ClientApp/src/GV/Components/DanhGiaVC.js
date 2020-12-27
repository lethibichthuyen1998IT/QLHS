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

var date = new Date();
class DanhGiaVC extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newdg: {
                manamhoc: '',
                mavienchuc: '',
                masodanhgia: '',
                kqth: '',
                daoduc: '',
                trachnhiem: '',
                khac: '',
                uudiem: '',
                nhuocdiem: '',
                loai: '',
                ngayvcdg: date
            },
            editdg: {
                manamhoc: '',
                mavienchuc: '',
                masodanhgia: '',
                kqth: '',
                daoduc: '',
                trachnhiem: '',
                khac: '',
                uudiem: '',
                nhuocdiem: '',
                loai: '',
            },

            dg: [],
            ctdg: [],
            nh: [],

            idnh: '',
            user: JSON.parse(localStorage.getItem('user')),
            errors: '',
            selectedFile: '',
            pc:[],
            progress: 0,
            status: '',
            modal: false,
            lv: [],
            nl: [],
            tstiet: '',
            vc:[]


        };


    }

    componentDidMount() {

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

        axios.get('/danhgias/' )
            .then((res) => this.setState({
                dg: res.data,

            })
        );
       



    }





    DG() {
        axios.get('/danhgias/vienchuc/' + this.state.user.mavienchuc + "/" + this.state.idnh)
            .then((res) => this.setState({
                ctdg: res.data,
                editdg: {
                    manamhoc: res.data.manamhoc,
                    mavienchuc: res.data.mavienchuc,
                    masodanhgia: res.data.masodanhgia,
                    kqth: res.data.kqth,
                    daoduc: res.data.daoduc,
                    trachnhiem: res.data.trachnhiem,
                    khac: res.data.khac,
                    uudiem: res.data.uudiem,
                    nhuocdiem: res.data.nhuocdiem,
                    loai: res.data.loai,
                  
                },
               

            })
            );

        this.setState({
          
            modal: !this.state.modal
        })
    }
    update() {
        let { masodanhgia, manamhoc, mavienchuc, kqth, daoduc, trachnhiem, khac, uudiem, nhuocdiem, loai } = this.state.editdg;

        axios.put('/danhgias/' + this.state.editdg.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, kqth, daoduc, trachnhiem, khac, uudiem, nhuocdiem, loai }).then((response) => {

                this.setState({
                    editdg: {
                        manamhoc: '',
                        mavienchuc: '',
                        masodanhgia: '',
                        kqth: '',
                        daoduc: '',
                        trachnhiem: '',
                        khac: '',
                        uudiem: '',
                        nhuocdiem: '',
                        loai: '',
                    },
                    modal:false
                });
              


                alert("Đánh giá thành công!");
            });

    }







    addDG() {

        axios.post('/danhgias/', {
            MAVIENCHUC: this.state.user.mavienchuc,
            MANAMHOC: this.state.idnh,
            KQTH: this.state.newdg.kqth,
            DAODUC: this.state.newdg.daoduc,
            TRACHNHIEM: this.state.newdg.trachnhiem,
            UUDIEM: this.state.newdg.uudiem,
            NHUOCDIEM: this.state.newdg.nhuocdiem,
            LOAI: this.state.newdg.loai,
            NGAYVCDG: this.state.newdg.ngayvcdg

        }).then((response) => {
            //console.log(response.data);
            alert("Đã thêm thành công!");

        })
            .catch((error) => {
                console.log(error.response);
                alert(error);
            });
        //.catch ((error) => console.log(error.response.request.response) );

    }

    render() {


        const { dg, user, idnh, ctdg,pc,lv,nl,tstiet,vc } = this.state;



        let danhgia = [];
        dg.forEach((e) => {
            if (e.mavienchuc.trim() === user.mavienchuc.trim() && e.manamhoc === idnh)
                danhgia.push(e.mavienchuc, e.manamhoc);
        });
      
        return (
            <>


                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>ĐÁNH GIÁ</h2>
                            <div class="page-links">
                                <Link to="/trangchu">Trang chủ</Link>
                                <span>Đánh giá</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="page-section spad">
                    <div class="container" style={{
                        paddingTop: '-500px', paddingLeft: '40px', paddingRight: '0px', width: '1500px', backgroundColor: '#D6F8F3', marginTop: '-50px', marginLeft: '120px'
                    }}>
                        <div class="row" style={{ width: '1300px' }}>


                            <div class="col-md-10 col-sm-12 blog-posts" style={{ textAlign: 'justify' }}>
                                <div class="element">
                                    <h4 style={{ height: '5px', color: 'blue', textAlign: 'center', paddingTop: '20px' }}>PHIẾU ĐÁNH GIÁ</h4>
                                </div>
                                {(danhgia.length > 0) ?
                                    <button onClick={this.DG.bind(this)} style={{width : '300px', marginLeft: '360px'}}> Chỉnh sửa phiếu đánh giá</button>
                                    :

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
                                                    PHIẾU ĐÁNH GIÁ VÀ PHẦN LOẠI VIÊN CHỨC <br />(Dành cho viên chức không giữ chức vụ quản lý)< br />
                            Năm học {idnh}
                                                </Col>
                                            </Row>
                                            <Row md="12" style={{ textAlign: 'justify' }}>
                                                <Col md="12">
                                                    <b>Họ và tên: <a style={{ textTransform: "uppercase", fontWeight: 'bold' }}>{vc.hoten} </a> </b>

                                                </Col>


                                                <Col md="12">
                                                    <b>Chức danh nghề nghiệp: <a style={{ fontWeight: 'bold' }}>{vc.tenchucdanh} </a> </b>

                                                </Col>
                                                <Col md="12">
                                                    <b>Đơn vị công tác: Bộ môn <a style={{ fontWeight: 'bold' }}>{vc.tenbomon} </a> , Khoa <a style={{ fontWeight: 'bold' }}>{ctdg.tenkhoa} </a>   </b>

                                                </Col>
                                                <Col md="4">
                                                    <b>Hạng chức danh nghề nghiệp: <a style={{ fontWeight: 'bold' }}>{vc.hangchucdanh} </a>  </b>

                                                </Col>
                                                <Col md="4">
                                                    <b>Bậc: {vc.bacluong} </b>

                                                </Col>
                                                <Col md="4">
                                                    <b>Hệ số lương: </b>

                                                </Col>

                                            </Row>

                                        </div>
                                        <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                                            <Row md="12" style={{ fontWeight: 'bold' }}>
                                                I. TỰ ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC
                            </Row>
                                            <Row md="12">
                                                <b> 1. Kết quả thực hiện công việc hoặc nhiệm vụ theo hợp đồng làm việc đã ký kết:</b>
                                            </Row>
                                            <Row md="12">
                                                <Col md="12">
                                                  Số tiết giảng dạy: <b> {tstiet}</b>, &nbsp;
                                                hướng dẫn <b> {nl.soluong}</b> tiểu luận/niên luận,&nbsp;
                                                 hướng dẫn <b> {lv.soluong}</b> luận văn
                                                    Các môn giảng dạy: {pc.map((emp) => {
                                                        return (<strong> {emp.tenmonhoc},</strong>)
                                                    })}
                                                       
                                                </Col>

                                            </Row>
                                            <Row md="12">
                                                <Col md="12">
                                                <FormGroup>

                                                  
                                                    <Input type="textarea" value={this.state.newdg.kqth} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.kqth = e.target.value;

                                                        this.setState({ newdg });
                                                    }} />
                                                </FormGroup>
                                            </Col>   </Row>


                                            <Row md="12">
                                                <b> 2. Việc thực hiện quy định về đạo đức nghề nghiệp:</b></Row>
                                            <Row md="12">
                                                <Col md="12">
                                                <FormGroup>

                                                    <Label htmlFor="hoten">Đạo đức: </Label>
                                                    <Input type="textarea" value={this.state.newdg.daoduc} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.daoduc = e.target.value;

                                                        this.setState({ newdg });
                                                    }}  />
                                                </FormGroup>
                                            </Col> </Row>

                                            <Row md="12" >
                                                <b> 3. Tinh thần trách nhiệm, thái độ phục vụ nhân dân, tinh thần hợp tác với đồng nghiệp và việc thực hiện quy tắc ứng xử của viên chức:</b></Row>
                                            <Row md="12"> <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Trách nhiệm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.trachnhiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.trachnhiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} />
                                                </FormGroup>
                                            </Col>   </Row>

                                            <Row md="12">
                                                <b> 4. Việc thực hiện các nghĩa vụ khác của viên chức: <br /></b>
                            (việc tham gia các hoạt động do Trường và đơn vị tổ chức/ việc tham gia triển khai nghị quyết, chính sách, pháp luật của Đảng, Nhà nước/việc tham gia học tập nâng cao trình độ..)</Row>
                                            <Row md="12">  <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="textarea" value={this.state.newdg.khac} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.khac = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Kết quả thực hiện khác" />
                                                </FormGroup>
                                            </Col>  </Row>

                                            <Row md="12" style={{ fontWeight: 'bold' }}>
                                                II. TỰ ĐÁNH GIÁ, PHÂN LOẠI CỦA VIÊN CHỨC
                            </Row>
                                            <Row md="12">
                                                <b> 1. Đánh giá ưu, nhược điểm:</b>  </Row>
                                            <Row md="12"> <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Ưu điểm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.uudiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.uudiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Ưu điểm" />
                                                </FormGroup>
                                            </Col>  </Row>
                                            <Row md="12"><Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Nhược điểm: </Label>
                                                    <Input type="textarea" value={this.state.newdg.nhuocdiem} onChange={(e) => {
                                                        let { newdg } = this.state;
                                                        newdg.nhuocdiem = e.target.value;

                                                        this.setState({ newdg });
                                                    }} placeholder="Nhược điểm" />
                                                </FormGroup>
                                            </Col> </Row>

                                            <Row md="12">
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                        <Input type="select" value={this.state.newdg.loai} onChange={(e) => {
                                                            let { newdg } = this.state;
                                                            newdg.loai = Number.parseInt(e.target.value);

                                                            this.setState({ newdg });
                                                        }}>

                                                            <option value='0'>-- Chọn Loại Đánh Giá --</option>
                                                            <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                            <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                            <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                            <option value='4'>Không hoàn thành nhiệm vụ </option>
                                                        </Input>
                                                    </FormGroup>
                                                </Col>
                                               

                                            </Row>
                                            <Row>
                                                <Col md="12">


                                                    <button onClick={this.addDG.bind(this)} class="site-btn">Lưu</button>
                                                </Col>

                                            </Row>
                                        </div>
                                               </>

                                }
                                {(this.state.modal) ?
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
                                                    PHIẾU ĐÁNH GIÁ VÀ PHẦN LOẠI VIÊN CHỨC <br />(Dành cho viên chức không giữ chức vụ quản lý)< br />
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
                                                    <b>Hệ số lương: </b>

                                                </Col>

                                            </Row>

                                        </div>
                                        <div style={{ backgroundColor: 'white', padding: '30px 30px' }}>
                                            <Row md="12" style={{ fontWeight: 'bold' }}>
                                                I. TỰ ĐÁNH GIÁ KẾT QUẢ CÔNG TÁC, TU DƯỠNG, RÈN LUYỆN CỦA VIÊN CHỨC
                            </Row>
                                            <Row md="12">
                                                <b> 1. Kết quả thực hiện công việc hoặc nhiệm vụ theo hợp đồng làm việc đã ký kết:</b>
                                            </Row>
                                            <Row md="12">
                                                <Col md="12">
                                                    Số tiết giảng dạy: <b> {tstiet}</b>, &nbsp;
                                                hướng dẫn <b> {nl.soluong}</b> tiểu luận/niên luận,&nbsp;
                                                 hướng dẫn <b> {lv.soluong}</b> luận văn
                                                    Các môn giảng dạy: {pc.map((emp) => {
                                                    return (<strong> {emp.tenmonhoc},</strong>)
                                                })}

                                                </Col>
                                            </Row>
                                            <Row md="12">
                                                <Col md="12">
                                                    <FormGroup>


                                                        <Input type="textarea" value={this.state.editdg.kqth} onChange={(e) => {
                                                            let { editdg } = this.state;
                                                            editdg.kqth = e.target.value;

                                                            this.setState({ editdg });
                                                        }} />
                                                    </FormGroup>
                                                </Col>   </Row>


                                            <Row md="12">
                                                <b> 2. Việc thực hiện quy định về đạo đức nghề nghiệp:</b></Row>
                                            <Row md="12">
                                                <Col md="12">
                                                    <FormGroup>

                                                        <Label htmlFor="hoten">Đạo đức: </Label>
                                                        <Input type="textarea" value={this.state.editdg.daoduc} onChange={(e) => {
                                                            let { editdg } = this.state;
                                                            editdg.daoduc = e.target.value;

                                                            this.setState({ editdg });
                                                        }} />
                                                    </FormGroup>
                                                </Col> </Row>

                                            <Row md="12" >
                                                <b> 3. Tinh thần trách nhiệm, thái độ phục vụ nhân dân, tinh thần hợp tác với đồng nghiệp và việc thực hiện quy tắc ứng xử của viên chức:</b></Row>
                                            <Row md="12"> <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Trách nhiệm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.trachnhiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.trachnhiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} />
                                                </FormGroup>
                                            </Col>   </Row>

                                            <Row md="12">
                                                <b> 4. Việc thực hiện các nghĩa vụ khác của viên chức: <br /></b>
                            (việc tham gia các hoạt động do Trường và đơn vị tổ chức/ việc tham gia triển khai nghị quyết, chính sách, pháp luật của Đảng, Nhà nước/việc tham gia học tập nâng cao trình độ..)</Row>
                                            <Row md="12">  <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                    <Input type="textarea" value={this.state.editdg.khac} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.khac = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Kết quả thực hiện khác" />
                                                </FormGroup>
                                            </Col>  </Row>

                                            <Row md="12" style={{ fontWeight: 'bold' }}>
                                                II. TỰ ĐÁNH GIÁ, PHÂN LOẠI CỦA VIÊN CHỨC
                            </Row>
                                            <Row md="12">
                                                <b> 1. Đánh giá ưu, nhược điểm:</b>  </Row>
                                            <Row md="12"> <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Ưu điểm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.uudiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.uudiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Ưu điểm" />
                                                </FormGroup>
                                            </Col>  </Row>
                                            <Row md="12"><Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Nhược điểm: </Label>
                                                    <Input type="textarea" value={this.state.editdg.nhuocdiem} onChange={(e) => {
                                                        let { editdg } = this.state;
                                                        editdg.nhuocdiem = e.target.value;

                                                        this.setState({ editdg });
                                                    }} placeholder="Nhược điểm" />
                                                </FormGroup>
                                            </Col> </Row>

                                            <Row md="12">
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label htmlFor="hoten">Kết quả thực hiện khác: </Label>
                                                        <Input type="select" value={this.state.editdg.loai} onChange={(e) => {
                                                            let { editdg } = this.state;
                                                            editdg.loai = Number.parseInt(e.target.value);

                                                            this.setState({ editdg });
                                                        }}>

                                                            <option value='0'>-- Chọn Loại Đánh Giá --</option>
                                                            <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                            <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                            <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                            <option value='4'>Không hoàn thành nhiệm vụ </option>
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
                                  
                                    :null

                                }
                            </div>


                        </div>

                    </div>
                </div>

                <div style={{ height: '70px' }} />





                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
            </>
        );
    }
}
export default DanhGiaVC;