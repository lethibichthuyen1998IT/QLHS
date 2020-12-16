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



class DanhGia extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dg: [],
            source: [],
            showAlert: false,
            confirm: false,
            chucnang: [],
            quyen: [],
            vc: [],
            nh:[],
            khoachuadg: [],
            khoadg: [],
            bmdg: [],
            bmchuadg: [],
            bomonchuadg:[],
         
            BMeditData: {
                masodanhgia:'',
                manamhoc:'',
                mavienchuc:'',
                ykbm:'',
                bomon: '',
                ngaybmdg:''
            },
            KhoaeditData: {
                masodanhgia: '',
               manamhoc: '',
                mavienchuc: '',
                ykienkhoa: '',
                khoa: '',
                ngaykhoadg:''

            },
            AdmineditData: {
                masodanhgia: '',
                manamhoc: '',
                mavienchuc: '',
                ykbm: '',
                bomon: '',
                ykienkhoa: '',
                khoa: '',
                ngaybmdg: '',
                ngaykhoadg:''

            },


            xoa: {
                Masodanhgia: '',
                Mavienchuc: '',
            },
            user: JSON.parse(localStorage.getItem('user')),
            details: [],
            modalDetails: false,
            AdmineditModal:false,
            KhoaeditModal: false,
            BMeditModal: false,
            valueSearch: '',
            errors: '',
            vienchuc:[]
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteDG = this.deleteDG.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach

        axios.get('/danhgias/')
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
        );
        axios.get('/danhgias/khoadanhgia/')
            .then((res) => this.setState({
                khoadg: res.data,
               
            })
        );
        axios.get('/danhgias/khoachuadanhgia/')
            .then((res) => this.setState({
                khoachuadg: res.data,
              
            })
        );
        axios.get('/danhgias/tatcabmchuadanhgia/')
            .then((res) => this.setState({
                bomonchuadg: res.data,

            })
            );
        axios.get('/danhgias/bmdanhgia/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bmdg: res.data,
              
            })
        );
        axios.get('/danhgias/bmchuadanhgia/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bmchuadg: res.data,
               
            })
            );
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,
              
            })
            );
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/quyens')
            .then((res) => this.setState({
                quyen: res.data,

            })

            );
        axios.get('/chucnangs/')
            .then((res) => this.setState({
                chucnang: res.data,

            })
        );
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );

    }

    //search
    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {

            console.log(search);
            for (let item of sourceArray) {

                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            dg: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        //hien thi danh sach
        axios.get('/danhgias/')
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
            );
        axios.get('/danhgias/khoadanhgia/')
            .then((res) => this.setState({
                khoadg: res.data,

            })
        );
        axios.get('/danhgias/tatcabmchuadanhgia/')
            .then((res) => this.setState({
                bomonchuadg: res.data,

            })
            );
        axios.get('/danhgias/khoachuadanhgia/')
            .then((res) => this.setState({
                khoachuadg: res.data,

            })
            );
        axios.get('/danhgias/bmdanhgia/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bmdg: res.data,

            })
            );
        axios.get('/danhgias/bmchuadanhgia/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bmchuadg: res.data,

            })
            );
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/quyens')
            .then((res) => this.setState({
                quyen: res.data,

            })

            );
        axios.get('/chucnangs/')
            .then((res) => this.setState({
                chucnang: res.data,

            })
            );
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );

    }

    //details
    toggleDetailsModal(id) {
        axios.get('/danhgias/' + id)
            .then((res) => {
                this.setState({ details: res.data })
            });
        this.setState({
            modalDetails: !this.state.modalDetails



        })
    }

    //add

    toggleBMEditModal() {
        this.setState({
            BMeditModal: !this.state.BMeditModal
        })
    }
    toggleKhoaEditModal() {
        this.setState({
            KhoaeditModal: !this.state.KhoaeditModal
        })
    }
    toggleAdminEditModal() {
        this.setState({
            AdmineditModal: !this.state.AdmineditModal
        })
    }

    xemct(id) {
        this.props.history.push("/admin/xemct/" + id);

    }

    BMedit(masodanhgia, manamhoc, mavienchuc, ykbm, bomon,ngaybmdg) {
        this.setState({
            BMeditData: { masodanhgia, manamhoc, mavienchuc, ykbm, bomon,ngaybmdg },
            BMeditModal: !this.state.BMeditModal

        });

    }
   
    Khoaedit(masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa,ngaykhoadg) {
        this.setState({
            KhoaeditData: {
                masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg},
            KhoaeditModal: !this.state.KhoaeditModal

        });

    }

    Adminedit(masodanhgia, manamhoc, mavienchuc, ykbm, bomon, ykienkhoa, khoa, ngaybmdg,ngaykhoadg) {
        this.setState({
            AdmineditData: {
                masodanhgia, manamhoc, mavienchuc, ykbm, bomon, ykienkhoa, khoa,ngaybmdg, ngaykhoadg
                
            },
            AdmineditModal: !this.state.AdmineditModal

        });

    }

    Adminupdate() {
        let { masodanhgia, manamhoc, mavienchuc, ykbm, bomon, ykienkhoa, khoa, ngaybmdg, ngaykhoadg } = this.state.AdmineditData;
        axios.put('/danhgias/admin/' + this.state.AdmineditData.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykbm, bomon, ykienkhoa, khoa, ngaybmdg, ngaykhoadg  }).then((response) => {

                this.setState({
                    BMeditModal: false,
                    BMeditData: {
                        masodanhgia: '',
                        manamhoc: '',
                        mavienchuc: '',
                        ykbm: '',
                        bomon: '',
                        ykienkhoa: '',
                        khoa: '',
                        ngaybmdg:'',
                        ngaykhoadg:''
                    },
                });
                this.refresh();

                alert("Đánh giá thành công!");
            });

    }
    BMupdate() {
        let { masodanhgia, manamhoc, mavienchuc, ykbm, bomon,ngaybmdg } = this.state.BMeditData;
        axios.put('/danhgias/bomon/' + this.state.BMeditData.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykbm, bomon,ngaybmdg  }).then((response) => {

                this.setState({
                    BMeditModal: false,
                    BMeditData: {
                        masodanhgia: '',
                        manamhoc: '',
                        mavienchuc: '',
                        ykbm: '',
                        bomon: '',
                        ngaybmdg:''
                    },
                });
                this.refresh();

                alert("Đánh giá thành công!");
            });

    }

    Khoaupdate() {
        let { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa,ngaykhoadg } = this.state.KhoaeditData;
        axios.put('/danhgias/Khoa/' + this.state.KhoaeditData.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa,ngaykhoadg  }).then((response) => {

                this.setState({
                    KhoaeditModal: false,
                    KhoaeditData: {
                        masodanhgia: '',
                        manamhoc: '',
                        mavienchuc: '',
                        ykienkhoa: '',
                        khoa: '',
                        ngaykhoadg:''

                    },
                });
                this.refresh();

                alert("Đánh giá thành công!");
            }).catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }



    //delete
    deleteDG = (masodanhgia) => {
        const apiUrl = '/danhgias/' + masodanhgia.masodanhgia;
        axios.delete(apiUrl, { masodanhgia: masodanhgia.masodanhgia })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                })
                //console.log(mavienchuc.mavienchuc);
            });
    }
    handleShowAlert = (masodanhgia, mavienchuc) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { masodanhgia: masodanhgia, mavienchuc: mavienchuc }
        });


    }
    handleConfirm() {
        this.refresh();
        this.setState({
            confirm: !this.state.confirm

        });
    }

    //render
    render() {

        const { errors } = this.state;
        const { vc, quyen, chucnang, dg, details, khoadg, khoachuadg, bmchuadg, bmdg,bomonchuadg } = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý khoa";
        const name2 = "Quản lý bộ môn";
        let cns = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name.toLowerCase())
                cns.push(x.machucnang);
        });

        let cn = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name2.toLowerCase())
                cn.push(x.machucnang);
        });

      
        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">

                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH PHIẾU ĐÁNH GIÁ</b> </p></CardTitle>
                                    <CardTitle>



                                      
                                            <Row md="12">

                                            <Col md="4" style={{ paddingLeft: '230px' }}>
                                                    <Search
                                                        valueSearch={this.state.valueSearch}
                                                        handleSearch={this.handleSearch} />
                                                </Col>
                                            </Row>
                                     



                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    
                                    {(rules.find(x => x == cns)) ?
                                        
                                        <Tabs>
                                            <TabList>

                                                <Tab>Tất cả viên chức</Tab>
                                                <Tab>Viên chức chưa đánh giá</Tab>
                                                <Tab>Viên chức đã đánh giá</Tab>
                                                <Tab>Viên chức bộ môn chưa đánh giá</Tab>

                                            </TabList>
                                            <TabPanel>
                                        <Table className="table table-hover">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>STT</th>


                                                    <th>Năm học</th>
                                                    <th>Mã viên chức</th>
                                                    <th>Họ tên</th>
                                                    <th>Loại</th>
                                                    <th>Thao tác</th>
                                                      
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dg.map((emp, index) => {
                                                        return (
                                                            <tr key={emp.masodanhgia}>
                                                                <td>{index + 1}</td>

                                                                <td>{emp.tennamhoc}</td>
                                                                <td>{emp.mavienchuc}</td>
                                                                <td>{emp.hoten}</td>
                                                                <td>{emp.loai}</td>
                                                              
                                                                    <td>
                                                                    <Button color="primary" onClick ={ (id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                                    {(emp.bomon != null) ?
                                                                        <strong>  <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;</strong>
                                                                    :
                                                                        <strong> <Button color="light" onClick={this.Adminedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykbm, emp.bomon, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;  </strong>
                                                                  
                                                                    }


                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                    <SweetAlert
                                                                        show={this.state.showAlert}
                                                                        warning
                                                                        showCancel

                                                                        showCloseButton
                                                                        confirmBtnText="Đồng ý"
                                                                        confirmBtnBsStyle="danger"
                                                                        cancelBtnText="Không"
                                                                        cancelBtnBsStyle="light"
                                                                        title="Bạn có chắc chắn không?"

                                                                        onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                        onCancel={() => this.setState({ showAlert: false })}
                                                                        focusCancelBtn
                                                                    >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                    </SweetAlert>
                                                                    <SweetAlert
                                                                        show={this.state.confirm}
                                                                        success
                                                                        confirmBtnText="Đồng ý"
                                                                        confirmBtnBsStyle="primary"
                                                                        onConfirm={() => this.handleConfirm()}


                                                                    >  Đã xóa thành công !!!
                                                                </SweetAlert>

                                                                    <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                        <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                        <ModalBody>

                                                                            <Row>
                                                                                <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                <Col md="12" align="center">

                                                                                    {(errors) ?
                                                                                        <Alert color="warning">{errors}</Alert>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                            <FormGroup>
                                                                            <Row>
                                                                                {emp.hoten}
                                                                            </Row>
                                                                            <Row>
                                                                                {emp.Kqth}
                                                                            </Row>
                                                                            <Row>
                                                                                {emp.Daoduc}
                                                                            </Row>
                                                                            <Row>
                                                                                {emp.Trachnhiem}
                                                                            </Row>
                                                                            <Row>
                                                                                {emp.Khac}
                                                                            </Row>
                                                                            <Row>
                                                                                {emp.Uudiem}
                                                                                </Row>
                                                                                <Row>
                                                                            {emp.Nhuocdiem}
                                                                            </Row>
                                                                               
                                                                                <Row>
                                                                            {emp.Loai}
                                                                             </Row>
                                                                            </FormGroup>
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
                                                                            <Row>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                            let { KhoaeditData } = this.state;
                                                                                            KhoaeditData.ykienkhoa = e.target.value;
                                                                                            this.setState({ KhoaeditData });
                                                                                        }} >

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










                                                                        </ModalBody>
                                                                        <ModalFooter>
                                                                            <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                            <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                        </ModalFooter>

                                                                    </Modal>
                                                                     <Modal isOpen={this.state.AdmineditModal} toggle={this.toggleAdminEditModal.bind(this)} style={{ width: '500px' }}>

                                                                        <ModalHeader toggle={this.toggleAdminEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                        <ModalBody>

                                                                            <Row>
                                                                                <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                <Col md="12" align="center">

                                                                                    {(errors) ?
                                                                                        <Alert color="warning">{errors}</Alert>
                                                                                        :
                                                                                        null
                                                                                    }
                                                                                </Col>
                                                                            </Row>
                                                                           

                                                                            <Row>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Năm học<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" type="select" value={this.state.AdmineditData.manamhoc} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.manamhoc = Number.parseInt(e.target.value);
                                                                                            this.setState({ AdmineditData });
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
                                                                                        <Input id="hoten" type="select" value={this.state.AdmineditData.mavienchuc} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.mavienchuc = e.target.value;
                                                                                            this.setState({ AdmineditData });
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
                                                                                        <Label htmlFor="hoten">Ý kiến của bộ môn: <strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" value={this.state.AdmineditData.ykbm} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.ykbm = e.target.value;
                                                                                            this.setState({ AdmineditData });
                                                                                        }} >


                                                                                        </Input>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Xếp loại đánh giá của bộ môn:<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" type="select" value={this.state.AdmineditData.bomon} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.bomon = Number.parseInt(e.target.value);
                                                                                            this.setState({ AdmineditData });
                                                                                        }} >

                                                                                            <option value='0'>--Chọn Loại Đánh Giá-- </option>
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
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" type="textarea" value={this.state.AdmineditData.ykienkhoa} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.ykienkhoa = e.target.value;
                                                                                            this.setState({ AdmineditData });
                                                                                        }} >

                                                                                        </Input>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Xếp loại đánh giá của khoa:<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" type="select" value={this.state.AdmineditData.khoa} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.khoa = Number.parseInt(e.target.value);
                                                                                            this.setState({ AdmineditData });
                                                                                        }} >


                                                                                            <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                            <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                            <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                            <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                        </Input>
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>










                                                                        </ModalBody>
                                                                        <ModalFooter>
                                                                            <Button color="primary" onClick={this.Adminupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                            <Button color="danger" onClick={this.toggleAdminEditModal.bind(this)}>Hủy bỏ</Button>
                                                                        </ModalFooter>

                                                                    </Modal>


                                                                        </td>
                                                            </tr>
                                                        )
                                                    })
                                                }

                                            </tbody>
                                                </Table> </TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                        <th>Năm học</th>
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                        <th>Loại</th>
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        khoachuadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{emp.tennamhoc}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.loai}</td>

                                                                    <td>
                                                                        <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                     <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                            <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                            <ModalBody>

                                                                                <Row>
                                                                                    <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                    <Col md="12" align="center">

                                                                                        {(errors) ?
                                                                                            <Alert color="warning">{errors}</Alert>
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                    </Col>
                                                                                </Row>

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
                                                                                            <Label htmlFor="hoten">Ý kiến bộ môn<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten"  value={emp.ykbm} disabled>

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
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                let { KhoaeditData } = this.state;
                                                                                                KhoaeditData.ykienkhoa = e.target.value;
                                                                                                this.setState({ KhoaeditData });
                                                                                            }} >

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










                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>

                                                                        </Modal>



                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                        <SweetAlert
                                                                            show={this.state.showAlert}
                                                                            warning
                                                                            showCancel

                                                                            showCloseButton
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="danger"
                                                                            cancelBtnText="Không"
                                                                            cancelBtnBsStyle="light"
                                                                            title="Bạn có chắc chắn không?"

                                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            focusCancelBtn
                                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                        </SweetAlert>
                                                                        <SweetAlert
                                                                            show={this.state.confirm}
                                                                            success
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="primary"
                                                                            onConfirm={() => this.handleConfirm()}


                                                                        >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </Table></TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                        <th>Năm học</th>
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                        <th>Loại</th>
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        khoadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{emp.tennamhoc}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.loai}</td>

                                                                    <td>
                                                                        <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                     <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                            <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                            <ModalBody>

                                                                                <Row>
                                                                                    <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                    <Col md="12" align="center">

                                                                                        {(errors) ?
                                                                                            <Alert color="warning">{errors}</Alert>
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                    </Col>
                                                                                </Row>

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
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                let { KhoaeditData } = this.state;
                                                                                                KhoaeditData.ykienkhoa = e.target.value;
                                                                                                this.setState({ KhoaeditData });
                                                                                            }} >

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


                                                                                                <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                                <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                                <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                                <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                            </Input>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>










                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary"  onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>

                                                                        </Modal>



                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                        <SweetAlert
                                                                            show={this.state.showAlert}
                                                                            warning
                                                                            showCancel

                                                                            showCloseButton
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="danger"
                                                                            cancelBtnText="Không"
                                                                            cancelBtnBsStyle="light"
                                                                            title="Bạn có chắc chắn không?"

                                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            focusCancelBtn
                                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                        </SweetAlert>
                                                                        <SweetAlert
                                                                            show={this.state.confirm}
                                                                            success
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="primary"
                                                                            onConfirm={() => this.handleConfirm()}


                                                                        >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </Table></TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                        <th>Năm học</th>
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                        <th>Loại</th>
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        bomonchuadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{emp.tennamhoc}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.loai}</td>

                                                                    <td>
                                                                        <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                     <Button color="light" onClick={this.Adminedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykbm, emp.bomon, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.AdmineditModal} toggle={this.toggleAdminEditModal.bind(this)} style={{ width: '500px' }}>

                                                                            <ModalHeader toggle={this.toggleAdminEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                            <ModalBody>

                                                                                <Row>
                                                                                    <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                    <Col md="12" align="center">

                                                                                        {(errors) ?
                                                                                            <Alert color="warning">{errors}</Alert>
                                                                                            :
                                                                                            null
                                                                                        }
                                                                                    </Col>
                                                                                </Row>

                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Năm học<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="select" value={this.state.AdmineditData.manamhoc} onChange={(e) => {
                                                                                                let { AdmineditData } = this.state;
                                                                                                AdmineditData.manamhoc = Number.parseInt(e.target.value);
                                                                                                this.setState({ AdmineditData });
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
                                                                                            <Input id="hoten" type="select" value={this.state.AdmineditData.mavienchuc} onChange={(e) => {
                                                                                                let { AdmineditData } = this.state;
                                                                                                AdmineditData.mavienchuc = e.target.value;
                                                                                                this.setState({ AdmineditData });
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
                                                                                        <Label htmlFor="hoten">Ý kiến của bộ môn: <strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" value={this.state.AdmineditData.ykbm} onChange={(e) => {
                                                                                            let { AdmineditData } = this.state;
                                                                                            AdmineditData.ykbm = e.target.value;
                                                                                            this.setState({ AdmineditData });
                                                                                        }} >

                                                                                           
                                                                                        </Input>
                                                                                    </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Xếp loại đánh giá của bộ môn:<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="select" value={this.state.AdmineditData.bomon} onChange={(e) => {
                                                                                                let { AdmineditData } = this.state;
                                                                                                AdmineditData.bomon = Number.parseInt(e.target.value);
                                                                                                this.setState({ AdmineditData });
                                                                                            }} >

                                                                                                <option value='0'>--Chọn Loại Đánh Giá-- </option>
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
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="textarea" value={this.state.AdmineditData.ykienkhoa} onChange={(e) => {
                                                                                                let { AdmineditData } = this.state;
                                                                                                AdmineditData.ykienkhoa = e.target.value;
                                                                                                this.setState({ AdmineditData });
                                                                                            }} >

                                                                                            </Input>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="hoten">Xếp loại đánh giá của khoa:<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="hoten" type="select" value={this.state.AdmineditData.khoa} onChange={(e) => {
                                                                                                let { AdmineditData } = this.state;
                                                                                                AdmineditData.khoa = Number.parseInt(e.target.value);
                                                                                                this.setState({ AdmineditData });
                                                                                            }} >


                                                                                                <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                                <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                                <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                                <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                            </Input>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>










                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary"  onClick={this.Adminupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                <Button color="danger" onClick={this.toggleAdminEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>

                                                                        </Modal>



                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                        <SweetAlert
                                                                            show={this.state.showAlert}
                                                                            warning
                                                                            showCancel

                                                                            showCloseButton
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="danger"
                                                                            cancelBtnText="Không"
                                                                            cancelBtnBsStyle="light"
                                                                            title="Bạn có chắc chắn không?"

                                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            focusCancelBtn
                                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                        </SweetAlert>
                                                                        <SweetAlert
                                                                            show={this.state.confirm}
                                                                            success
                                                                            confirmBtnText="Đồng ý"
                                                                            confirmBtnBsStyle="primary"
                                                                            onConfirm={() => this.handleConfirm()}


                                                                        >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }

                                                </tbody>
                                            </Table></TabPanel></Tabs>
                                            :
                                        (rules.find(x => x == cn)) ?
                                            <Tabs>
                                                <TabList>

                                                    <Tab>Tất cả viên chức thuộc bộ môn</Tab>
                                                    <Tab>Viên chức chưa đánh giá</Tab>
                                                    <Tab>Viên chức đã đánh giá</Tab>
                                                   

                                                </TabList>
                                                <TabPanel>
                                                    <Table className="table table-hover">
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>STT</th>
                                                                <th>Năm học</th>
                                                                <th>Mã viên chức</th>
                                                                <th>Họ tên</th>
                                                                <th>Loại</th>
                                                                <th>Thao tác</th>


                                                            </tr>
                                                        </thead>
                                                       
                                                            <tbody>
                                                                {
                                                                    bmchuadg.map((emp, index) => {
                                                                        return (
                                                                            <tr key={emp.masodanhgia}>
                                                                                <td>{index + 1}</td>

                                                                                <td>{emp.tennamhoc}</td>
                                                                                <td>{emp.mavienchuc}</td>
                                                                                <td>{emp.hoten}</td>
                                                                                <td>{emp.loai}</td>

                                                                                <td>
                                                                                    <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i> </Button>  &nbsp;

                                                                     <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                                        <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                                        <ModalBody>

                                                                                            <Row>
                                                                                                <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                                <Col md="12" align="center">

                                                                                                    {(errors) ?
                                                                                                        <Alert color="warning">{errors}</Alert>
                                                                                                        :
                                                                                                        null
                                                                                                    }
                                                                                                </Col>
                                                                                            </Row>

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
                                                                                            <Row>
                                                                                                <Col md="12">
                                                                                                    <FormGroup>
                                                                                                        <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                        <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                            let { KhoaeditData } = this.state;
                                                                                                            KhoaeditData.ykienkhoa = e.target.value;
                                                                                                            this.setState({ KhoaeditData });
                                                                                                        }} >

                                                                                                        </Input>
                                                                                                    </FormGroup>
                                                                                                </Col>
                                                                                            </Row>
                                                                                            <Row>
                                                                                                <Col md="12">
                                                                                                    <FormGroup>
                                                                                                        <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                        <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                            let { KhoaeditData } = this.state;
                                                                                                            KhoaeditData.ykienkhoa = e.target.value;
                                                                                                            this.setState({ KhoaeditData });
                                                                                                        }} >

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


                                                                                                            <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                                            <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                                            <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                                            <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                                        </Input>
                                                                                                    </FormGroup>
                                                                                                </Col>
                                                                                            </Row>










                                                                                        </ModalBody>
                                                                                        <ModalFooter>
                                                                                            <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                            <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                                        </ModalFooter>

                                                                                    </Modal>



                                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    <SweetAlert
                                                                                        show={this.state.showAlert}
                                                                                        warning
                                                                                        showCancel

                                                                                        showCloseButton
                                                                                        confirmBtnText="Đồng ý"
                                                                                        confirmBtnBsStyle="danger"
                                                                                        cancelBtnText="Không"
                                                                                        cancelBtnBsStyle="light"
                                                                                        title="Bạn có chắc chắn không?"

                                                                                        onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                                        onCancel={() => this.setState({ showAlert: false })}
                                                                                        focusCancelBtn
                                                                                    >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                                    </SweetAlert>
                                                                                    <SweetAlert
                                                                                        show={this.state.confirm}
                                                                                        success
                                                                                        confirmBtnText="Đồng ý"
                                                                                        confirmBtnBsStyle="primary"
                                                                                        onConfirm={() => this.handleConfirm()}


                                                                                    >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                                </td>

                                                                            </tr>
                                                                        )
                                                                    })
                                                                }

                                                            </tbody>
                                                    </Table> </TabPanel>
                                                <TabPanel>  <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>


                                                            <th>Năm học</th>
                                                            <th>Mã viên chức</th>
                                                            <th>Họ tên</th>
                                                            <th>Loại</th>
                                                            <th>Thao tác</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bmchuadg.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.masodanhgia}>
                                                                        <td>{index + 1}</td>

                                                                        <td>{emp.tennamhoc}</td>
                                                                        <td>{emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.loai}</td>

                                                                        <td>
                                                                            <Link to="/danhgia/xemct">  <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i> </Button></Link>  &nbsp;
                                                                     <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                                <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                                <ModalBody>

                                                                                    <Row>
                                                                                        <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                        <Col md="12" align="center">

                                                                                            {(errors) ?
                                                                                                <Alert color="warning">{errors}</Alert>
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                        </Col>
                                                                                    </Row>

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
                                                                                    <Row>
                                                                                        <Col md="12">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                    let { KhoaeditData } = this.state;
                                                                                                    KhoaeditData.ykienkhoa = e.target.value;
                                                                                                    this.setState({ KhoaeditData });
                                                                                                }} >

                                                                                                </Input>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col md="12">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                    let { KhoaeditData } = this.state;
                                                                                                    KhoaeditData.ykienkhoa = e.target.value;
                                                                                                    this.setState({ KhoaeditData });
                                                                                                }} >

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


                                                                                                    <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                                    <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                                    <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                                    <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                                </Input>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>










                                                                                </ModalBody>
                                                                                <ModalFooter>
                                                                                    <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                    <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                                </ModalFooter>

                                                                            </Modal>



                                                                            <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                            <SweetAlert
                                                                                show={this.state.showAlert}
                                                                                warning
                                                                                showCancel

                                                                                showCloseButton
                                                                                confirmBtnText="Đồng ý"
                                                                                confirmBtnBsStyle="danger"
                                                                                cancelBtnText="Không"
                                                                                cancelBtnBsStyle="light"
                                                                                title="Bạn có chắc chắn không?"

                                                                                onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                                onCancel={() => this.setState({ showAlert: false })}
                                                                                focusCancelBtn
                                                                            >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                            </SweetAlert>
                                                                            <SweetAlert
                                                                                show={this.state.confirm}
                                                                                success
                                                                                confirmBtnText="Đồng ý"
                                                                                confirmBtnBsStyle="primary"
                                                                                onConfirm={() => this.handleConfirm()}


                                                                            >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </Table></TabPanel>

                                                <TabPanel>  <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>


                                                            <th>Năm học</th>
                                                            <th>Mã viên chức</th>
                                                            <th>Họ tên</th>
                                                            <th>Loại</th>
                                                            <th>Thao tác</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bmdg.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.masodanhgia}>
                                                                        <td>{index + 1}</td>

                                                                        <td>{emp.tennamhoc}</td>
                                                                        <td>{emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.loai}</td>

                                                                        <td>
                                                                            <Button color="primary" onClick={this.toggleDetailsModal.bind(this, emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                     <Button color="light" onClick={this.Khoaedit.bind(this, emp.masodanhgia, emp.manamhoc, emp.mavienchuc, emp.ykienkhoa, emp.khoa)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   <Modal isOpen={this.state.KhoaeditModal} toggle={this.toggleKhoaEditModal.bind(this)} style={{ width: '500px' }}>

                                                                                <ModalHeader toggle={this.toggleKhoaEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>ĐÁNH GIÁ</b></p></ModalHeader>


                                                                                <ModalBody>

                                                                                    <Row>
                                                                                        <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>
                                                                                        <Col md="12" align="center">

                                                                                            {(errors) ?
                                                                                                <Alert color="warning">{errors}</Alert>
                                                                                                :
                                                                                                null
                                                                                            }
                                                                                        </Col>
                                                                                    </Row>

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
                                                                                    <Row>
                                                                                        <Col md="12">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                    let { KhoaeditData } = this.state;
                                                                                                    KhoaeditData.ykienkhoa = e.target.value;
                                                                                                    this.setState({ KhoaeditData });
                                                                                                }} >

                                                                                                </Input>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>
                                                                                    <Row>
                                                                                        <Col md="12">
                                                                                            <FormGroup>
                                                                                                <Label htmlFor="hoten">Ý kiến khoa<strong className="text-danger">(*) </strong></Label>
                                                                                                <Input id="hoten" type="textarea" value={this.state.KhoaeditData.ykienkhoa} onChange={(e) => {
                                                                                                    let { KhoaeditData } = this.state;
                                                                                                    KhoaeditData.ykienkhoa = e.target.value;
                                                                                                    this.setState({ KhoaeditData });
                                                                                                }} >

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


                                                                                                    <option value='1'>Hoàn thành xuất sắc nhiệm vụ </option>
                                                                                                    <option value='2'>Hoàn thành tốt nhiệm vụ </option>
                                                                                                    <option value='3'>Hoàn thành nhiệm vụ  </option>
                                                                                                    <option value='4'>Không hoàn thành nhiệm vụ </option>

                                                                                                </Input>
                                                                                            </FormGroup>
                                                                                        </Col>
                                                                                    </Row>










                                                                                </ModalBody>
                                                                                <ModalFooter>
                                                                                    <Button color="primary" onClick={this.Khoaupdate.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                    <Button color="danger" onClick={this.toggleKhoaEditModal.bind(this)}>Hủy bỏ</Button>
                                                                                </ModalFooter>

                                                                            </Modal>



                                                                            <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                            <SweetAlert
                                                                                show={this.state.showAlert}
                                                                                warning
                                                                                showCancel

                                                                                showCloseButton
                                                                                confirmBtnText="Đồng ý"
                                                                                confirmBtnBsStyle="danger"
                                                                                cancelBtnText="Không"
                                                                                cancelBtnBsStyle="light"
                                                                                title="Bạn có chắc chắn không?"

                                                                                onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                                onCancel={() => this.setState({ showAlert: false })}
                                                                                focusCancelBtn
                                                                            >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
                                                                            </SweetAlert>
                                                                            <SweetAlert
                                                                                show={this.state.confirm}
                                                                                success
                                                                                confirmBtnText="Đồng ý"
                                                                                confirmBtnBsStyle="primary"
                                                                                onConfirm={() => this.handleConfirm()}


                                                                            >  Đã xóa thành công !!!
                                                                </SweetAlert>



                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }

                                                    </tbody>
                                                </Table></TabPanel></Tabs>: <p> Chỉ có trưởng bộ môn hoặc trưởng khoa mới có quyền xem </p>
                                        }
                                </CardBody>

                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );

    }
}

export default DanhGia;