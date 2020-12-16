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
import axios from 'axios';
import moment from 'moment';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';


class Phancong extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            congviec: [],
            vienchuc: [],
            phancong: [],
            bomonpc: [],
            cvbomon: [],
            source: [],
            vc: [],
            quyen: [],
            chucnang: [],
            showAlert: false,
            CVshowAlert: false,
            confirm: false,

            newpc: {

                mavienchuc: '',
                giogiang: '',
                luanvan: '',
                baibaotrongnuoc: '',
                baibaongoainuoc: '',
                nckh: '',
                ghichu: ''

            },
            editCVData: {
                macongviec: 0,
                manamhoc: 0,
                mavienchuc: '',
                masodanhmuc: '',
                tencongviec: '',
                ngaythuchien: '',
                diadiem: '',
                thoigian: '',
                filecongvec: ''
            },

            editData: {
                maphancong: '',

                mavienchuc: '',
                giogiang: '',
                luanvan: '',
                baibaotrongnuoc: '',
                baibaongoainuoc: '',
                nckh: '',
                ghichu: ''

            },


            xoa: {
                maphancong: '',
                mavienchuc: ''

            },
            xoacv: {
                macongviec: '',
                tencongviec: '',
                mavienchuc: ''

            },

            listVC: [],
            chitietpc: [],
            chitietcv: [],
            vcbm: [],
            AddModal: false,
            editModal: false,
            editCVModal: false,
            valueSearch: '',
            errors: '',
            selectedFile: '',
            progress: 0,
            status: '',
            nh: [],
            dm: [],
            modalDetails: false,
            user: JSON.parse(localStorage.getItem('user')),

            vcdanhgia: [],
            editdanhgiakhoa:
            {
                masodanhgia: '',
                manamhoc: '',
                mavienchuc: '',
                ykienkhoa: '',
                khoa: '',
                ngaykhoadg: ''

            },
            editdanhgiabm:
            {
                masodanhgia: '',
                manamhoc: '',
                mavienchuc: '',
                ykbm: '',
                bomon: '',
                ngaybmdg: ''
              
            },
            editdgkhoaModal: false,
            editdgbmModal: false,
            alert:''
                

        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletePC = this.deleteTB.bind(this);
        this.handleXoa = this.handleXoa.bind(this);
        this.deleteCV = this.deleteCV.bind(this);

    }



    //load
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        //hien thi danh sach


        axios.get('/phancongs/bomopc/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bomonpc: res.data,

            })
        );

       

        axios.get('/congviecs/')
            .then((res) => this.setState({
                congviec: res.data,

            })
            );
        axios.get('/congviecs/cvbomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                cvbomon: res.data,

            })
            );

        axios.get('/vienchucs/bomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,
                source:res.data

            })
            );
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
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
        axios.get('/dmcongviecs/')
            .then((res) => this.setState({
                dm: res.data,

            })
            );


    }
    selectFileHandler = (event) => {
        const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'pdf'];
        let file = event.target.files;
        console.log(`File ${file}`);
        let errMessage = [];
        if (fileTypes.every(extension => file[0].type != extension)) {
            errMessage.push(`The file ${file.type} extension is not supported`);
        } else {
            let { editCVData } = this.state;
            editCVData.filecongvec = event.target.value;

            this.setState({
                selectedFile: file[0],
                editCVData,

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
    //search
    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {

            console.log(search);
            for (let item of sourceArray) {

                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            vienchuc: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        //hien thi danh sach


        axios.get('/phancongs/bomopc/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                bomonpc: res.data,

            })
            );

        axios.get('/congviecs/')
            .then((res) => this.setState({
                congviec: res.data,

            })
            );
        axios.get('/congviecs/cvbomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                cvbomon: res.data,

            })
            );

        axios.get('/vienchucs/bomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then((res) => this.setState({
                vienchuc: res.data,
                source: res.data

            })
            );
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );
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
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
        axios.get('/dmcongviecs/')
            .then((res) => this.setState({
                dm: res.data,

            })
            );
    }

    //add

    toggleNewVienChucModal() {
        this.setState({
            AddModal: !this.state.AddModal



        })
    }
    toggleDetailsModal(idvc, idnamhoc) {
        axios.get('/phancongs/' + idvc)
            .then((res) => {
                this.setState({
                    chitietpc: res.data
                  })
             
            });

        axios.get('/congviecs/' + idvc)
            .then((res) => {
                this.setState({ chitietcv: res.data })
            });
        this.setState({
            modalDetails: !this.state.modalDetails,
            editdanhgiakhoa: {
                mavienchuc: idvc, manamhoc: idnamhoc
            }

            });


    }

    toggleeditdgkhoa() {

    axios.get('/danhgias/khoa/' + this.state.editdanhgiakhoa.mavienchuc + "/" + this.state.editdanhgiakhoa.manamhoc)
            .then((res) => this.setState({
                vcdanhgia: res.data,

            })
        );
        if (this.state.vcdanhgia != null) {
            this.setState({
                editdgkhoaModal: !this.state.editdgkhoaModal,
                editdanhgiakhoa: { masodanhgia: this.state.vcdanhgia.masodanhgia }
            })
        }
        else {

            this.setState({
                alert: "Viên chức chưa tự đánh giá"
            })
            alert(this.state.alert);
        }

    }

    editDGKhoa(manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg) {
        this.setState({
            editdanhgiakhoa: {manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg },
            editdgkhoaModal: !this.state.editdgkhoaModal

        });
    }
    updateDG() {
        let { masodanhgia,manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg } = this.state.editdanhgiakhoa;
        axios.put('/danhgias/khoa/' + this.state.editdanhgiakhoa.masodanhgia,
            { masodanhgia, manamhoc, mavienchuc, ykienkhoa, khoa, ngaykhoadg }).then((response) => {

                this.setState({
                    editdgkhoaModal: false,
                    editdanhgiakhoa: {
                        
                        ykienkhoa: '',
                        khoa: '',
                        ngaykhoadg: ''
                    },
                });


                alert("Đánh giá thành công!");
            })

    }
    toggleeditdgbm() {
        this.setState({
            editdgbmModal: !this.state.editdgbmModal



        })

    }



    toggleDongModal() {

        this.setState({
            modalDetails: false

        })
    }
    addPC() {
        const ar = [];
        this.state.phancong.forEach((e) => { ar.push(e.mavienchuc.trim()) });
        if (ar.includes(this.state.newpc.mavienchuc.trim())) {
            this.setState({
                errors: "Đã phân công cho viên chức này",
            });
        }
        else {
            axios.post('/phancongs/', {
                MAVIENCHUC: this.state.newpc.mavienchuc,
                GIOGIANG: this.state.newpc.giogiang,
                LUANVAN: this.state.newpc.luanvan,
                BAIBAOTRONGNUOC: this.state.newpc.baibaotrongnuoc,
                BAIBAONGOAINUOC: this.state.newpc.baibaongoainuoc,
                NCKH: this.state.newpc.nckh,
                GHICHU: this.state.newpc.ghichu

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm thành công!");
                this.setState({
                    newpc: {

                        maphancong: '',
                        mavienchuc: '',
                        giogiang: '',
                        luanvan: '',
                        baibaotrongnuoc: '',
                        baibaongoainuoc: '',
                        nckh: '',
                        ghichu: ''

                    },
                    errors: '',
                    AddModal: false
                });
                this.refresh();
            })
                .catch((error) => {
                    console.log(error.response);
                    alert(error);
                });
            //.catch ((error) => console.log(error.response.request.response) );
        }
    }
    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {

            console.log(search);
            for (let item of sourceArray) {

                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenchucvu.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenbomon.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            vienchuc: newArray,
            valueSearch: search
        });
    }

    //edit pc
    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    //edit cong viec
    toggleEditCVModal() {
        this.setState({
            editCVModal: !this.state.editCVModal
        })
    }
    editCV(macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec) {
        this.setState({
            editCVData: { macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec },
            editCVModal: !this.state.editCVModal

        });
    }
    edit(maphancong, mavienchuc, giogiang, luanvan, baibaotrongnuoc, baibaongoainuoc, nckh, ghichu) {
        this.setState({
            editData: { maphancong, mavienchuc, giogiang, luanvan, baibaotrongnuoc, baibaongoainuoc, nckh, ghichu },
            editModal: !this.state.editModal

        });

    }
    updateCV() {
        let { macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec } = this.state.editCVData;
        axios.put('/congviecs/' + Number.parseInt(this.state.editCVData.maphancong),
            { macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec }).then((response) => {

                this.setState({
                    editCVModal: false,
                    editData: {
                        macongviec: 0,
                        manamhoc: 0,
                        mavienchuc: '',
                        masodanhmuc: '',
                        tencongviec: '',
                        ngaythuchien: '',
                        diadiem: '',
                        thoigian: '',
                        filecongvec: ''
                    },
                }, () => this.toggleDetailsModal(mavienchuc));


                alert("Cập nhật thành công!");
            })

    }
    updatePC() {
        let { maphancong, mavienchuc, giogiang, luanvan, baibaotrongnuoc, baibaongoainuoc, nckh, ghichu } = this.state.editData;
        axios.put('/phancongs/' + this.state.editData.maphancong,
            { maphancong, mavienchuc, giogiang, luanvan, baibaotrongnuoc, baibaongoainuoc, nckh, ghichu }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        maphancong: '',
                        mavienchuc: '',
                        giogiang: '',
                        luanvan: '',
                        baibaotrongnuoc: '',
                        baibaongoainuoc: '',
                        nckh: '',
                        ghichu: ''
                    },
                }, () => this.toggleDetailsModal(mavienchuc));
               

                alert("Cập nhật thành công!");
            });

    }
    deleteCV = (macongviec, mavienchuc) => {
        const apiUrl = '/congviecs/' + macongviec.macongviec;
        axios.delete(apiUrl, { macongviec: macongviec.macongviec })
            .then((response) => {
                this.setState({
                    CVshowAlert: false,
                    confirm: true
                });

            })

        //console.log(mavienchuc.mavienchuc);



    }
    handleXoa = (macongviec, tencongviec, mavienchuc) => {
        this.setState({
            CVshowAlert: !this.state.CVshowAlert,
            xoacv: { macongviec: macongviec, tencongviec: tencongviec, mavienchuc: mavienchuc }
        });


    }

    //delete
    deleteTB = (maphancong) => {
        const apiUrl = '/phancongs/' + maphancong.maphancong;

        axios.delete(apiUrl, { maphancong: maphancong.maphancong })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                });
                //console.log(mavienchuc.mavienchuc);
            });

    }
    handleShowAlert = (maphancong, mavienchuc) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { maphancong: maphancong, mavienchuc: mavienchuc }
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

        const { phancong, vc, quyen, chucnang, errors, congviec, chitietcv, chitietpc, details, cvbomon, bomonpc, vienchuc, vcbm } = this.state;

        const cv = [...new Map(congviec.map(x => [x.mavienchuc, x])).values()];

        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý khoa";
        const name1 = "Quản lý bộ môn";
        let cns = [];
        let cn = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name.toLowerCase())
                cns.push(x.machucnang);
        });
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name1.toLowerCase())
                cn.push(x.machucnang);
        });

        console.log(this.state.editdanhgiakhoa.manamhoc);
        return (
            <>
                {
                    (rules.find(x => x == cns)) ?

                        <div className="content">

                            <Row>
                                <Col md="12">

                                    <Card>
                                        <CardHeader>

                                            <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '250px' }}><b> DANH SÁCH CÔNG VIỆC CỦA VIÊN CHỨC</b> </p></CardTitle>
                                            <CardTitle>




                                                <Row md="12">
                                                    {(rules.find(x => x == cns)) ?
                                                        <Col md="2">
                                                            <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#17A2B8', color:'white' }}>Phân công</Button>
                                                        </Col> : null
                                                    }
                                                    <Col md="4" style={{ paddingLeft: '70px' }}>
                                                        <Search
                                                            valueSearch={this.state.valueSearch}
                                                            handleSearch={this.handleSearch} />
                                                    </Col>
                                                </Row>




                                            </CardTitle>

                                            <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '700px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>PHÂN CÔNG</b></p></ModalHeader>


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
                                                                <Label htmlFor="hoten">Viên chức: </Label>
                                                                <Input id="tenchucvu" type="select" value={this.state.newpc.mavienchuc} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.mavienchuc = e.target.value;
                                                                    this.setState({ newpc });
                                                                }} >
                                                                    <option value='0' >--Chọn viên chức--</option>
                                                                    {
                                                                        this.state.listVC.map((vchuc) =>
                                                                            <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                    }
                                                                </Input>


                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số giờ giảng: </Label>
                                                                <Input id="tenchucvu" type="number" value={Number.parseInt(this.state.newpc.giogiang)} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.giogiang = Number.parseInt(e.target.value);

                                                                    this.setState({ newpc });
                                                                }} placeholder="Số giờ giảng"/>

                                                            </FormGroup>
                                                        </Col>

                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số luận văn hướng dẫn: </Label>
                                                                <Input id="tenchucvu" type="number" value={this.state.newpc.luanvan} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.luanvan = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }} placeholder="Số luận văn hướng dẫn" />

                                                            </FormGroup>
                                                        </Col>
                                                    
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số bài báo trong nước: </Label>
                                                                <Input id="tenchucvu" type="number" value={this.state.newpc.baibaotrongnuoc} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.baibaotrongnuoc = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }} placeholder="Số bài báo trong nước"/>

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>

                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số bài báo ngoài nước: </Label>
                                                                <Input id="tenchucvu" type="number" value={this.state.newpc.baibaongoainuoc} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.baibaongoainuoc = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }} placeholder="Số bài báo ngoài nước"  />

                                                            </FormGroup>
                                                        </Col>
                                                    
                                                        <Col md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số bài nghiên cứu khoa học: </Label>
                                                                <Input id="tenchucvu" type="number" value={this.state.newpc.nckh} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.nckh = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }} placeholder="Số bài nghiên cứu khoa học" />

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Ghi chú: </Label>
                                                                <Input id="tenchucvu" type="textarea" value={this.state.newpc.ghichu} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.ghichu = e.target.value;
                                                                    this.setState({ newpc });
                                                                }} placeholder="Ghi chú"  />

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>








                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={!(this.state.newpc.mavienchuc.length > 0 && this.state.newpc.luanvan.length != 0 && this.state.newpc.giogiang.length != 0 && this.state.newpc.baibaongoainuoc.length != 0 && this.state.newpc.baibaotrongnuoc.length != 0 && this.state.newpc.nckh.length != 0)} onClick={this.addPC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                                </ModalFooter>

                                            </Modal>
                                        </CardHeader>
                                        {(this.state.modalDetails == false) ?


                                            <div class="containerTB">
                                                <Row md="12">
                                                {
                                                    vienchuc.map((emp) => {
                                                        return (
                                                          
                                                                
                                                                   
                                                            <Col md="3">
                                                                <div class="content-box color-effect-1" style={{ backgroundColor: '#229954', margin: '10px' }} >
                                                                    <h3> {emp.mavienchuc}</h3>
                                                                                <div class="box-icon-wrap box-icon-effect-1 box-icon-effect-1a">
                                                                        <a onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc, emp.manamhoc)}> <div class="box-icon"> <i class="fa fa-user"></i></div> </a>
                                                                    </div>
                                                                    <p>{emp.hoten}</p>
                                                                            </div>
                                                                        </Col>
                                                                        

                                                          

                                                        )
                                                    })
                                                    }
                                                    </Row>
                                            </div>


                                            :
                                           

                                            <Tabs>
                                                <p style={{ paddingLeft: '10px' }}><Button color="danger" onClick={this.toggleDongModal.bind(this)} style={{ width: '80px' }}>Đóng </Button> &nbsp;
                                                    <Button color="blue" style={{ width: '100px' }} onclick={this.toggleDongModal.bind(this)}>Đánh giá </Button></p>
                                               
                                                <TabList>


                                                    <Tab>Công việc viên chức thực hiện</Tab>
                                                    <Tab>Công việc được phân công</Tab>

                                                </TabList>

                                                <TabPanel>
                                                    <CardBody>



                                                        <Table className="table table-hover">

                                                            <thead className="text-primary">
                                                                <tr>
                                                                    <th>STT</th>
                                                                    <th>Tên năm học</th>

                                                                    <th>Tên danh mục</th>
                                                                    <th>Tên công việc</th>
                                                                    <th>Ngày thực hiện</th>
                                                                    <th>Địa điểm</th>
                                                                    <th>Thời gian</th>
                                                                    <th>File</th>


                                                                    {
                                                                        (rules.find(x => x == cns)) ?
                                                                            <th width="120px">Thao tác</th>
                                                                            : null
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    chitietcv.map((emp, index) => {
                                                                        return (
                                                                            <tr key={emp.macongviec}>
                                                                                <td>{index + 1}</td>
                                                                                <td>{emp.tennamhoc}</td>

                                                                                <td>{emp.tendanhmuc}</td>

                                                                                <td>{emp.tencongviec}</td>
                                                                                <td>{moment(emp.ngaythuchien).format("DD-MM-YYYY")}</td>
                                                                                <td>{emp.diadiem}</td>
                                                                                <td>{emp.thoigian}</td>

                                                                                <td>{(emp.filecongvec != null) ?
                                                                                    < a href={"/UploadedFiles/" + (emp.filecongvec).split('\\').pop()} download> Tải xuống </a>
                                                                                :null}
                                                                                </td>

                                                                                {(rules.find(x => x == cns)) ?
                                                                                    <td>
                                                                                        <Button color="default" onClick={this.editCV.bind(this, emp.macongviec, emp.manamhoc, emp.mavienchuc, emp.masodanhmuc, emp.tencongviec, emp.ngaythuchien, emp.diadiem, emp.thoigian, emp.filecongvec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                 <Modal isOpen={this.state.editCVModal} toggle={this.toggleEditCVModal.bind(this)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                                            <ModalHeader toggle={this.toggleEditCVModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Năm học: </Label>
                                                                                                            <Input id="tenchucvu" type="select" value={this.state.editCVData.manamhoc} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.manamhoc = Number.parseInt(e.target.value);
                                                                                                                this.setState({ editCVData });
                                                                                                            }} >
                                                                                                                <option value='0' >--Năm học--</option>
                                                                                                                {
                                                                                                                    this.state.nh.map((nh) =>
                                                                                                                        <option key={nh.manamhoc} value={nh.manamhoc}>{nh.tennamhoc}</option>)
                                                                                                                }
                                                                                                            </Input>


                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                            
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Viên chức: </Label>
                                                                                                            <Input id="tenchucvu" type="select" value={this.state.editCVData.mavienchuc} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.mavienchuc = e.target.value;
                                                                                                                this.setState({ editCVData });
                                                                                                            }} >
                                                                                                                <option value='0' >--Viên chức--</option>
                                                                                                                {
                                                                                                                    this.state.listVC.map((vchuc) =>
                                                                                                                        <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                                                }
                                                                                                            </Input>


                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                                <Row>
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Danh mục: </Label>
                                                                                                            <Input id="tenchucvu" type="select" value={this.state.editCVData.masodanhmuc} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.masodanhmuc = Number.parseInt(e.target.value);
                                                                                                                this.setState({ editCVData });
                                                                                                            }} >
                                                                                                                <option value='0' >--Danh mục--</option>
                                                                                                                {
                                                                                                                    this.state.dm.map((dm) =>
                                                                                                                        <option key={dm.masodanhmuc} value={dm.masodanhmuc}>{dm.tendanhmuc}</option>)
                                                                                                                }
                                                                                                            </Input>


                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                              
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Ngày thực hiện: </Label>
                                                                                                            <Input id="tenchucvu" type="date" value={this.state.editCVData.ngaythuchien} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.ngaythuchien = e.target.value;
                                                                                                                this.setState({ editCVData });
                                                                                                            }} />

                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                </Row>
                                                                                                <Row>
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Địa điểm: </Label>
                                                                                                            <Input id="tenchucvu" value={this.state.editCVData.diadiem} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.diadiem = e.target.value;
                                                                                                                this.setState({ editCVData });
                                                                                                            }} />

                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                            
                                                                                                    <Col md="6">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">Thời gian: </Label>
                                                                                                            <Input id="tenchucvu" value={this.state.editCVData.thoigian} onChange={(e) => {
                                                                                                                let { editCVData } = this.state;
                                                                                                                editCVData.thoigian = e.target.value;
                                                                                                                this.setState({ editCVData });
                                                                                                            }} />

                                                                                                        </FormGroup>
                                                                                                    </Col>


                                                                                                </Row>
                                                                                                <Row>
                                                                                                    <Col md="12">
                                                                                                        <FormGroup>
                                                                                                            <Label htmlFor="hoten">File: </Label>
                                                                                                            <Input value={this.state.editCVData.filecongvec} />
                                                                                                            <Input id="file" type="file" onChange={this.selectFileHandler.bind(this)} />
                                                                                                            <br />
                                                                                                            <div>{this.state.progress}%</div>

                                                                                                            <div>{this.state.status}</div>


                                                                                                        </FormGroup>
                                                                                                    </Col>
                                                                                                </Row>










                                                                                            </ModalBody>
                                                                                            <ModalFooter>
                                                                                                <Button color="primary" disabled={!(this.state.editCVData.mavienchuc.length != 0 && this.state.editCVData.masodanhmuc.length != 0 && this.state.editCVData.manamhoc.length != 0 && this.state.editCVData.ngaythuchien.length > 0 && this.state.editCVData.diadiem.length > 0 && this.state.editCVData.thoigian.length > 0)} onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                                <Button color="danger" onClick={this.toggleEditCVModal.bind(this)}>Hủy bỏ</Button>
                                                                                            </ModalFooter>

                                                                                        </Modal>
                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleXoa.bind(this, emp.macongviec, emp.tencongviec, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                        <SweetAlert
                                                                                            show={this.state.CVshowAlert}
                                                                                            warning
                                                                                            showCancel

                                                                                            showCloseButton
                                                                                            confirmBtnText="Đồng ý"
                                                                                            confirmBtnBsStyle="danger"
                                                                                            cancelBtnText="Không"
                                                                                            cancelBtnBsStyle="light"
                                                                                            title="Bạn có chắc chắn không?"

                                                                                            onConfirm={() => this.deleteCV({ macongviec: this.state.xoacv.macongviec, mavienchuc: this.state.xoacv.mavienchuc })}

                                                                                            onCancel={() => this.setState({ CVshowAlert: false })}
                                                                                            focusCancelBtn
                                                                                        >  {"Xóa công việc  " + this.state.xoacv.tencongviec + "của viên chức?"}
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
                                                                                    : null
                                                                                }
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }

                                                            </tbody>
                                                        </Table>



                                                    </CardBody>


                                                </TabPanel>
                                                <TabPanel>
                                                    <CardBody>
                                                        <Table className="table table-hover">
                                                            <thead className="text-primary">
                                                                <tr>


                                                                    <th>Mã viên chức</th>
                                                                    <th>Số giờ giảng</th>
                                                                    <th>Số luận văn</th>
                                                                    <th>Số bài báo trong nước</th>
                                                                    <th>Số bài báo ngoài nước</th>
                                                                    <th>Nghiên cứu khoa học</th>
                                                                    <th>Ghi chú</th>


                                                                    {
                                                                        (rules.find(x => x == cns)) ?
                                                                            <th width="120px">Thao tác</th>
                                                                            : null
                                                                    }
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {
                                                                    chitietpc.map((emp, index) => {
                                                                        return (
                                                                            <tr key={emp.maphancong}>

                                                                                <td>{emp.mavienchuc}</td>
                                                                                <td>{emp.giogiang}</td>
                                                                                <td>{emp.luanvan}</td>
                                                                                <td>{emp.baibaongoainuoc}</td>
                                                                                <td>{emp.baibaotrongnuoc}</td>
                                                                                <td>{emp.nckh}</td>
                                                                                <td>{emp.ghichu}</td>

                                                                                {(rules.find(x => x == cns)) ?
                                                                                    <td>
                                                                                        <Button color="default" onClick={this.edit.bind(this, emp.maphancong, emp.mavienchuc, emp.giogiang, emp.luanvan, emp.baibaotrongnuoc, emp.baibaongoainuoc, emp.nckh, emp.ghichu)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;

                                                                                            <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                                                <ModalHeader toggle={this.toggleEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                                                                <Label htmlFor="hoten">Viên chức: </Label>
                                                                                                                <Input id="tenchucvu" type="select" value={this.state.editData.mavienchuc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.mavienchuc = e.target.value;
                                                                                                                    this.setState({ editData });
                                                                                                                }} disabled>
                                                                                                                    <option value='0' >--Viên chức--</option>
                                                                                                                    {
                                                                                                                        this.state.vienchuc.map((vchuc) =>
                                                                                                                            <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                                                    }
                                                                                                                </Input>


                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="4">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số giờ giảng: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.giogiang} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.giogiang = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="4">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số luận văn hướng dẫn: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.luanvan} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.luanvan = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="4">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài báo trong nước: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.baibaotrongnuoc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.baibaotrongnuoc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài báo ngoài nước: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.baibaongoainuoc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.baibaongoainuoc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài nghiên cứu khoa học: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.nckh} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.nckh = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="12">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Ghi chú: </Label>
                                                                                                                <Input id="tenchucvu" type="text" value={this.state.editData.ghichu} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.ghichu = e.target.value;
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>








                                                                                                </ModalBody>
                                                                                               

                                                                                        
                                                                                            <ModalFooter>
                                                                                                <Button color="primary" disabled={!(this.state.editData.mavienchuc.length != 0 && this.state.editData.luanvan.length != 0 && this.state.editData.giogiang.length != 0 && this.state.editData.baibaongoainuoc.length != 0 && this.state.editData.baibaotrongnuoc.length != 0 && this.state.editData.nckh.length != 0)} onClick={this.updatePC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                                <Button color="danger" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                                            </ModalFooter>

                                                                                        </Modal>
                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.maphancong, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
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

                                                                                            onConfirm={() => this.deletePC({ maphancong: this.state.xoa.maphancong })}

                                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                                            focusCancelBtn
                                                                                        >  {"Xóa phân công của viên chức  " + this.state.xoa.mavienchuc + "?"}
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
                                                                                    : null
                                                                                }
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }

                                                            </tbody>
                                                        </Table>
                                                    </CardBody>
                                                </TabPanel>

                                            </Tabs>

                                        }


                                    </Card>
                                </Col>

                            </Row>
                        </div>
                        :
                        (rules.find(x => x == cn)) ?
                            <div className="content">

                                <Row>
                                    <Col md="12">

                                        <Card>
                                            <CardHeader>

                                                <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '250px' }}><b> DANH SÁCH CÔNG VIỆC CỦA VIÊN CHỨC</b> </p></CardTitle>
                                                <CardTitle>




                                                    <Row md="12">
                                                        {(rules.find(x => x == cns)) ?
                                                            <Col md="2">
                                                                <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                            </Col> : null
                                                        }
                                                        <Col md="4" style={{ paddingLeft: '70px' }}>
                                                            <Search
                                                                valueSearch={this.state.valueSearch}
                                                                handleSearch={this.handleSearch} />
                                                        </Col>
                                                    </Row>




                                                </CardTitle>

                                                <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} style={{ width: '500px' }}>

                                                    <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>PHÂN CÔNG</b></p></ModalHeader>


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
                                                                    <Label htmlFor="hoten">Viên chức: </Label>
                                                                    <Input id="tenchucvu" type="select" value={this.state.newpc.mavienchuc} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.mavienchuc = e.target.value;
                                                                        this.setState({ newpc });
                                                                    }} >
                                                                        <option value='0' >--Viên chức--</option>
                                                                        {
                                                                            this.state.vienchuc.map((vchuc) =>
                                                                                <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                        }
                                                                    </Input>


                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="6">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số giờ giảng: </Label>
                                                                    <Input id="tenchucvu" type="number" value={Number.parseInt(this.state.newpc.giogiang)} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.giogiang = Number.parseInt(e.target.value);

                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>

                                                            <Col md="6">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số luận văn hướng dẫn: </Label>
                                                                    <Input id="tenchucvu" type="number" value={this.state.newpc.luanvan} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.luanvan = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số bài báo trong nước: </Label>
                                                                    <Input id="tenchucvu" type="number" value={this.state.newpc.baibaotrongnuoc} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.baibaotrongnuoc = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>

                                                            <Col md="6">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số bài báo ngoài nước: </Label>
                                                                    <Input id="tenchucvu" type="number" value={this.state.newpc.baibaongoainuoc} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.baibaongoainuoc = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số bài nghiên cứu khoa học: </Label>
                                                                    <Input id="tenchucvu" type="number" value={this.state.newpc.nckh} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.nckh = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Ghi chú: </Label>
                                                                    <Input id="tenchucvu" type="text" value={this.state.newpc.ghichu} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.ghichu = e.target.value;
                                                                        this.setState({ newpc });
                                                                    }} />

                                                                </FormGroup>
                                                            </Col>
                                                        </Row>








                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" disabled={!(this.state.newpc.mavienchuc.length > 0 && this.state.newpc.luanvan.length != 0 && this.state.newpc.giogiang.length != 0 && this.state.newpc.baibaongoainuoc.length != 0 && this.state.newpc.baibaotrongnuoc.length != 0 && this.state.newpc.nckh.length != 0)} onClick={this.addPC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                                    </ModalFooter>

                                                </Modal>
                                            </CardHeader>
                                            {(this.state.modalDetails == false) ?


                                                <div className="grid-container" >
                                                    {
                                                        vcbm.map((emp) => {
                                                            return (

                                                                <div> <Button color="light" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '80px', color: 'black' }}><i style={{ fontSize: '45px' }} class="fa fa-user" aria-hidden="true" ></i></Button><p>{emp.hoten}</p></div>

                                                            )
                                                        })
                                                    }
                                                </div>


                                                :

                                                <Tabs>
                                                    <Button color="danger" style={{ width: '80px' }} onClick={this.toggleDongModal.bind(this)}>Đóng</Button>
                                                    <TabList>


                                                        <Tab>Công việc viên chức thực hiện</Tab>
                                                        <Tab>Công việc được phân công</Tab>

                                                    </TabList>

                                                    <TabPanel>
                                                        <CardBody>



                                                            <Table className="table table-hover">

                                                                <thead className="text-primary">
                                                                    <tr>
                                                                        <th>STT</th>
                                                                        <th>Tên năm học</th>

                                                                        <th>Tên danh mục</th>
                                                                        <th>Tên công việc</th>
                                                                        <th>Ngày thực hiện</th>
                                                                        <th>Địa điểm</th>
                                                                        <th>Thời gian</th>
                                                                        <th>File</th>


                                                                        {
                                                                            (rules.find(x => x == cns)) ?
                                                                                <th width="120px">Thao tác</th>
                                                                                : null
                                                                        }
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        chitietcv.map((emp, index) => {
                                                                            return (
                                                                                <tr key={emp.macongviec}>
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{emp.tennamhoc}</td>

                                                                                    <td>{emp.tendanhmuc}</td>

                                                                                    <td>{emp.tencongviec}</td>
                                                                                    <td>{moment(emp.ngaythuchien).format("DD-MM-YYYY")}</td>
                                                                                    <td>{emp.diadiem}</td>
                                                                                    <td>{emp.thoigian}</td>

                                                                                    <td>{(emp.filecongvec != null) ?
                                                                                        < a href={"/UploadedFiles/" + (emp.filecongvec).split('\\').pop()} download> Tải xuống </a>
                                                                                        : null}
                                                                                    </td>

                                                                                    {(rules.find(x => x == cn)) ?
                                                                                        <td>
                                                                                            <Button color="default" onClick={this.editCV.bind(this, emp.macongviec, emp.manamhoc, emp.mavienchuc, emp.masodanhmuc, emp.tencongviec, emp.ngaythuchien, emp.diadiem, emp.thoigian, emp.filecongvec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                 <Modal isOpen={this.state.editCVModal} toggle={this.toggleEditCVModal.bind(this)} style={{ width: '500px' }}>

                                                                                                <ModalHeader toggle={this.toggleEditCVModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                                                                <Label htmlFor="hoten">Năm học: </Label>
                                                                                                                <Input id="tenchucvu" type="select" value={this.state.editCVData.manamhoc} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.manamhoc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} >
                                                                                                                    <option value='0' >--Năm học--</option>
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
                                                                                                                <Label htmlFor="hoten">Viên chức: </Label>
                                                                                                                <Input id="tenchucvu" type="select" value={this.state.editCVData.mavienchuc} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.mavienchuc = e.target.value;
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} >
                                                                                                                    <option value='0' >--Viên chức--</option>
                                                                                                                    {
                                                                                                                        this.state.listVC.map((vchuc) =>
                                                                                                                            <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                                                    }
                                                                                                                </Input>


                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="12">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Danh mục: </Label>
                                                                                                                <Input id="tenchucvu" type="select" value={this.state.editCVData.masodanhmuc} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.masodanhmuc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} >
                                                                                                                    <option value='0' >--Danh mục--</option>
                                                                                                                    {
                                                                                                                        this.state.dm.map((dm) =>
                                                                                                                            <option key={dm.masodanhmuc} value={dm.masodanhmuc}>{dm.tendanhmuc}</option>)
                                                                                                                    }
                                                                                                                </Input>


                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Ngày thực hiện: </Label>
                                                                                                                <Input id="tenchucvu" type="date" value={this.state.editCVData.ngaythuchien} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.ngaythuchien = e.target.value;
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Địa điểm: </Label>
                                                                                                                <Input id="tenchucvu" value={this.state.editCVData.diadiem} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.diadiem = e.target.value;
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col>
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Thời gian: </Label>
                                                                                                                <Input id="tenchucvu" value={this.state.editCVData.thoigian} onChange={(e) => {
                                                                                                                    let { editCVData } = this.state;
                                                                                                                    editCVData.thoigian = e.target.value;
                                                                                                                    this.setState({ editCVData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>


                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="12">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">File: </Label>
                                                                                                                <Input value={this.state.editCVData.filecongvec} />
                                                                                                                <Input id="file" type="file" onChange={this.selectFileHandler.bind(this)} />
                                                                                                                <br />
                                                                                                                <div>{this.state.progress}%</div>

                                                                                                                <div>{this.state.status}</div>


                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>










                                                                                                </ModalBody>
                                                                                                <ModalFooter>
                                                                                                    <Button color="primary" disabled={!(this.state.editCVData.mavienchuc.length != 0 && this.state.editCVData.masodanhmuc.length != 0 && this.state.editCVData.manamhoc.length != 0 && this.state.editCVData.ngaythuchien.length > 0 && this.state.editCVData.diadiem.length > 0 && this.state.editCVData.thoigian.length > 0)} onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                                    <Button color="danger" onClick={this.toggleEditCVModal.bind(this)}>Hủy bỏ</Button>
                                                                                                </ModalFooter>

                                                                                            </Modal>
                                                                                            <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleXoa.bind(this, emp.macongviec, emp.tencongviec, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                            <SweetAlert
                                                                                                show={this.state.CVshowAlert}
                                                                                                warning
                                                                                                showCancel

                                                                                                showCloseButton
                                                                                                confirmBtnText="Đồng ý"
                                                                                                confirmBtnBsStyle="danger"
                                                                                                cancelBtnText="Không"
                                                                                                cancelBtnBsStyle="light"
                                                                                                title="Bạn có chắc chắn không?"

                                                                                                onConfirm={() => this.deleteCV({ macongviec: this.state.xoacv.macongviec, mavienchuc: this.state.xoacv.mavienchuc })}

                                                                                                onCancel={() => this.setState({ CVshowAlert: false })}
                                                                                                focusCancelBtn
                                                                                            >  {"Xóa công việc  " + this.state.xoacv.tencongviec + "của viên chức?"}
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
                                                                                        : null
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }

                                                                </tbody>
                                                            </Table>



                                                        </CardBody>


                                                    </TabPanel>
                                                    <TabPanel>
                                                        <CardBody>
                                                            <Table className="table table-hover">
                                                                <thead className="text-primary">
                                                                    <tr>


                                                                        <th>Mã viên chức</th>
                                                                        <th>Số giờ giảng</th>
                                                                        <th>Số luận văn</th>
                                                                        <th>Số bài báo trong nước</th>
                                                                        <th>Số bài báo ngoài nước</th>
                                                                        <th>Nghiên cứu khoa học</th>
                                                                        <th>Ghi chú</th>


                                                                        {
                                                                            (rules.find(x => x == cns)) ?
                                                                                <th width="120px">Thao tác</th>
                                                                                : null
                                                                        }
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {
                                                                        chitietpc.map((emp, index) => {
                                                                            return (
                                                                                <tr key={emp.maphancong}>

                                                                                    <td>{emp.mavienchuc}</td>
                                                                                    <td>{emp.giogiang}</td>
                                                                                    <td>{emp.luanvan}</td>
                                                                                    <td>{emp.baibaongoainuoc}</td>
                                                                                    <td>{emp.baibaotrongnuoc}</td>
                                                                                    <td>{emp.nckh}</td>
                                                                                    <td>{emp.ghichu}</td>

                                                                                    {(rules.find(x => x == cns)) ?
                                                                                        <td>
                                                                                            <Button color="default" onClick={this.edit.bind(this, emp.maphancong, emp.mavienchuc, emp.giogiang, emp.luanvan, emp.baibaotrongnuoc, emp.baibaongoainuoc, emp.nckh, emp.ghichu)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                 <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)} style={{ width: '500px' }}>

                                                                                                <ModalHeader toggle={this.toggleEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                                                                <Label htmlFor="hoten">Viên chức: </Label>
                                                                                                                <Input id="tenchucvu" type="select" value={this.state.editData.mavienchuc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.mavienchuc = e.target.value;
                                                                                                                    this.setState({ editData });
                                                                                                                }} >
                                                                                                                    <option value='0' >--Viên chức--</option>
                                                                                                                    {
                                                                                                                        this.state.vienchuc.map((vchuc) =>
                                                                                                                            <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                                                    }
                                                                                                                </Input>


                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số giờ giảng: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.giogiang} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.giogiang = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số luận văn hướng dẫn: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.luanvan} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.luanvan = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài báo trong nước: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.baibaotrongnuoc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.baibaotrongnuoc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>

                                                                                                        <Col md="6">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài báo ngoài nước: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.baibaongoainuoc} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.baibaongoainuoc = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>

                                                                                                    <Row>
                                                                                                        <Col md="12">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Số bài nghiên cứu khoa học: </Label>
                                                                                                                <Input id="tenchucvu" type="number" value={this.state.editData.nckh} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.nckh = Number.parseInt(e.target.value);
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>
                                                                                                    <Row>
                                                                                                        <Col md="12">
                                                                                                            <FormGroup>
                                                                                                                <Label htmlFor="hoten">Ghi chú: </Label>
                                                                                                                <Input id="tenchucvu" type="text" value={this.state.editData.ghichu} onChange={(e) => {
                                                                                                                    let { editData } = this.state;
                                                                                                                    editData.ghichu = e.target.value;
                                                                                                                    this.setState({ editData });
                                                                                                                }} />

                                                                                                            </FormGroup>
                                                                                                        </Col>
                                                                                                    </Row>








                                                                                                </ModalBody>
                                                                                                <ModalFooter>
                                                                                                    <Button color="primary" disabled={!(this.state.editData.mavienchuc.length > 0 && this.state.editData.luanvan.length != 0 && this.state.editData.giogiang.length != 0 && this.state.editData.baibaongoainuoc.length != 0 && this.state.editData.baibaotrongnuoc.length != 0 && this.state.editData.nckh.length != 0)} onClick={this.updatePC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                                    <Button color="danger" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                                                </ModalFooter>

                                                                                            </Modal>
                                                                                            <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.maphancong, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
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

                                                                                                onConfirm={() => this.deletePC({ maphancong: this.state.xoa.maphancong })}

                                                                                                onCancel={() => this.setState({ showAlert: false })}
                                                                                                focusCancelBtn
                                                                                            >  {"Xóa phân công của viên chức  " + this.state.xoa.mavienchuc + "?"}
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
                                                                                        : null
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }

                                                                </tbody>
                                                            </Table>
                                                        </CardBody>
                                                    </TabPanel>

                                                </Tabs>

                                            }


                                        </Card>
                                    </Col>

                                </Row>
                            </div>
                            : null
                }
            </>
        );

    }
}

export default Phancong;