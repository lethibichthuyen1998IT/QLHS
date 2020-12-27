import React from 'react';
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
import axios from 'axios';
import moment from 'moment';
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';
import ReactPaginate from 'react-paginate';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css'


class DanhmucVienchuc extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            vienchuc:[],
            thud: [],
            cntt: [],
            mmt: [],
            khmt: [],
            cnpm: [],
            httt:[],
            vc:[],
            source: [],
            sourceBM:[],
            showAlert: false,
            confirm: false,
            activePage: 1,
            newvc: {
                
                Mabomon:'',
                Machucvu:'',
                Machucdanh: '',
                Hoten: '',
                Sdt: '',
                Ngaysinh:'',
                Gioitinh: '',
                Diachi:'',
                Mail: '',
                Matkhau:'',
                Ngaylamviec: ''
             
            },
            editData: {
                mavienchuc: '',
                mabomon: '',
                machucvu: '',
                machucdanh: '',
                hoten: '',
                sdt: '',
                ngaysinh: '',
                gioitinh: '',
                diachi: '',
                ngaylamviec: ''
             
            },
            detailsData: [],
            user: JSON.parse(localStorage.getItem('user')),
            quyen: [],
            chucnang:[],
            xoa: { mavienchuc: '', hoten: '' },
            listBomon: [],
            listChucvu: [],
            listChucdanh:[],
            xoa: { Mavienchuc: '', Hoten: '' },
           AddModal: false,
            editModal: false,
            detailModal: false,
            valueSearch: '',
            errors: '',
            idxemct:'',
            vcbm: [],

            offset: 0,
            offsetBM:0,
            orgtableDataBM:[],
            orgtableData: [],
            perPage: 6,
            currentPage: 0,

        }
        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteVC = this.deleteVC.bind(this);
    }

   

    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/Vienchucs/')
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableData: ct,
                    vienchuc: slice,
                    source: slice,

                })

            });
      
        axios.get('/Vienchucs/bomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offsetBM, this.state.offsetBM + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableDataBM: ct,
                    vcbm: slice,
                    sourceBM: slice,

                })

            });

       
        axios.get('/Vienchucs/cntt')
            .then((res) => this.setState({
                cntt: res.data,
               
            })
        );
             
        axios.get('/Vienchucs/thud')
            .then((res) => this.setState({
                thud: res.data,
              
            })
        );
        axios.get('/Vienchucs/cnpm')
            .then((res) => this.setState({
                cnpm: res.data,
               
            })
        );
        axios.get('/Vienchucs/khmt')
            .then((res) => this.setState({
                khmt: res.data,
                
            })
        );
        axios.get('/Vienchucs/mtt')
            .then((res) => this.setState({
                mmt: res.data,
               
            })
        );
        axios.get('/Vienchucs/httt')
            .then((res) => this.setState({
                httt: res.data,
                
            })
            );
        axios.get('/quyens/')
            .then((res) => this.setState({
                quyen: res.data,
                
            })
            );
        axios.get('/chucnangs/')
            .then((res) => this.setState({
                chucnang: res.data,
              
            })
            );

        //lay combobox
        axios.get('/chucvus/')
            .then((res) =>
                this.setState({
                    listChucvu: res.data
                }));

        axios.get('/Bomons/')
            .then((res) =>
                this.setState({
                    listBomon: res.data
                }));

        axios.get('/Chucdanhs/')
            .then((res) =>
                this.setState({
                    listChucdanh: res.data
                }));
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });

    }
    //phan trang
    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.loadMoreData()
        });

    };

    loadMoreData() {
        const data = this.state.orgtableData;

        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            vienchuc: slice,
        })
    }


        handlePageClickBM = (e) => {
            const selectedPage = e.selected;
            const offset = selectedPage * this.state.perPage;

            this.setState({
                currentPage: selectedPage,
                offsetBM: offset
            }, () => {
                    this.loadMoreDataBM()
            });

        };

        loadMoreDataBM() {
            const data = this.state.orgtableDataBM;

            const slice = data.slice(this.state.offsetBM, this.state.offsetBM + this.state.perPage)
            this.setState({
                pageCount: Math.ceil(data.length / this.state.perPage),
                vcbm: slice,
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
               
                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenchucvu.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.tenbomon.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            vienchuc: newArray,
            valueSearch: search,

        });
    }

    //search bm
    handleSearchBM = (search) => {

        let sourceArray = this.state.sourceBM;

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
            vcbm: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/Vienchucs/')
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableData: ct,
                    vienchuc: slice,
                    source: slice,

                })

            });

        axios.get('/Vienchucs/bomon/' + this.state.user.mabomon, { id: this.state.user.mabomon })
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableDataBM: ct,
                    vcbm: slice,
                    sourceBM: slice,

                })

            });
        axios.get('/Vienchucs/cntt')
            .then((res) => this.setState({
                cntt: res.data,

            })
            );

        axios.get('/Vienchucs/thud')
            .then((res) => this.setState({
                thud: res.data,

            })
            );
        axios.get('/Vienchucs/cnpm')
            .then((res) => this.setState({
                cnpm: res.data,

            })
            );
        axios.get('/Vienchucs/khmt')
            .then((res) => this.setState({
                khmt: res.data,

            })
            );
        axios.get('/Vienchucs/mtt')
            .then((res) => this.setState({
                mmt: res.data,

            })
            );
        axios.get('/Vienchucs/httt')
            .then((res) => this.setState({
                httt: res.data,

            })
            );
        axios.get('/quyens/')
            .then((res) => this.setState({
                quyen: res.data,
                
            })
            );
        axios.get('/chucnangs/')
            .then((res) => this.setState({
                chucnang: res.data,
               
            })
            );

        //lay combobox
        axios.get('/chucvus/')
            .then((res) =>
                this.setState({
                    listChucvu: res.data
                }));

        axios.get('/Bomons/')
            .then((res) =>
                this.setState({
                    listBomon: res.data
                }));

        axios.get('/Chucdanhs/')
            .then((res) =>
                this.setState({
                    listChucdanh: res.data
                }));
    }

    //add

    toggleNewVienChucModal() {
        this.setState({
            AddModal: !this.state.AddModal
        })
    }

toggleDetailsModal(id) {
    axios.get('/Vienchucs/' + id)
        .then((res) => {
            this.setState({ detailsData: res.data })
        });
    this.setState({
        detailModal: !this.state.detailModal,
        idxemct: id


    })
    }
    toggleDongDetails() {
        this.setState({
            detailModal: !this.state.detailModal,
            idxemct: ''


        })
    }
    toggleDongEdit() {
        this.setState({
            editModal: !this.state.editModal,
            


        })
    }


    addVC(){       axios.post('/vienchucs/', {
                    MABOMON: this.state.newvc.Mabomon,
                    MACHUCDANH: this.state.newvc.Machucdanh,
                    MACHUCVU: this.state.newvc.Machucvu,
                    HOTEN: this.state.newvc.Hoten,
                    GIOITINH: Boolean(this.state.newvc.Gioitinh),
                    DIACHI: this.state.newvc.Diachi,
                    NGAYSINH: this.state.newvc.Ngaysinh,
                    SDT: this.state.newvc.Sdt,
                    MAIL: this.state.newvc.Mail,
                    MATKHAU: this.state.newvc.Matkhau,
                    NGAYLAMVIEC: this.state.newvc.Ngaylamviec

                }).then((response) => {
                    console.log(response.data);
                    alert("Đã thêm viên chức thành công!");
                    this.setState({
                        newvc: {

                            Mabomon: '',
                            Machucvu: '',
                            Machucdanh: '',
                            Hoten: '',
                            Sdt: '',
                            Ngaysinh: '',
                            Gioitinh: '',
                            Diachi: '',
                            Mail: '',
                            Matkhau: '',
                            Ngaylamviec: '',
                        },
                        msg: '',
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


    //edit
    toggleEditModal(Mavienchuc, Mabomon, Machucdanh, Machucvu, Hoten, Diachi, Gioitinh, Sdt, Ngaysinh, Ngaylamviec) {
        this.setState({
            editModal: !this.state.editModal,
            editData: {
                mavienchuc: Mavienchuc,
                mabomon: Mabomon,
                machucdanh: Machucdanh,
                machucvu: Machucvu,
                hoten: Hoten,
                diachi: Diachi,
                gioitinh: Gioitinh,
                sdt: Sdt,
                ngaysinh: Ngaysinh,
                ngaylamviec: Ngaylamviec
            }
            
          
        })
    }
   
    updateVC() {
      
        let { mavienchuc, mabomon, machucdanh, machucvu, hoten, diachi, gioitinh, sdt, ngaysinh, ngaylamviec } = this.state.editData;
        var gt;
        if (gioitinh == 'false') { gt = false; }
        else {
            gt = true;
        }
        axios.put('/vienchucs/' + mavienchuc,
            {
                mavienchuc: mavienchuc,
                mabomon: mabomon,
                machucdanh: machucdanh,
                machucvu: machucvu,
                hoten: hoten,
                diachi: diachi,
                gioitinh: gt,
                sdt: sdt,
                ngaysinh: ngaysinh,
                ngaylamviec: ngaylamviec
            }).then((response) => {

                this.setState({
                    editModal: false,
                   
                    editData: {
                        mavienchuc: '',
                        mabomon: '',
                        machucvu: '',
                        machucdanh: '',
                        hoten: '',
                        sdt: '',
                        ngaysinh: '',
                        gioitinh: '',
                        diachi: '',
                        ngaylamviec: ''

                    },
                });
                this.refresh();
                //console.log(mavienchuc);
                alert("Cập nhật thông tin thành công!");
            });

    }

   





    

    //delete
    deleteVC = (mavienchuc) => {
        const apiUrl = '/vienchucs/' + mavienchuc.mavienchuc;
        axios.delete(apiUrl, { mavienchuc: mavienchuc.mavienchuc })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true


                })
            }).catch(e => {
                    alert("Tồn tại viên chức đang có chức vụ này, không thể xóa !!");
                    this.setState({
                        showAlert: false,
                        confirm: false
                    });
                });

    }
    handleShowAlert = (mavienchuc, hoten) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { mavienchuc: mavienchuc, hoten: hoten }
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

        const { vienchuc, vcbm, detailsData,thud,mmt,cntt,httt,khmt,cnpm } = this.state;
        const { errors, msg } = this.state;
        const { vc, quyen, chucnang } = this.state;
        const ar = [];
        this.state.vienchuc.forEach((e) => { ar.push(e.mail.trim()) });
        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý khoa";
        const name1 = "Quản lý bộ môn"
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
        console.log(detailsData);
        console.log(vienchuc);

       
      
    return(
        <>
            {
              
                    (rules.find(x => x == cns)) ?
                        <div className="content">

                            <Row>
                                <Col md="12">

                                    <Card>
                                        <CardHeader>

                                            <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH VIÊN CHỨC</b> </p></CardTitle>
                                            <CardTitle>
                                                <Row md="12">
                                                    {(rules.find(x => x == cns)) ?
                                                        <Col md="2">
                                                            <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '45px' }} class="fa fa-user-plus" aria-hidden="true" ></i></Button>
                                                        </Col> : null}
                                            : 


                                                    <Col md="4">
                                                        <Search
                                                            valueSearch={this.state.valueSearch}
                                                            handleSearch={this.handleSearch} />
                                                    </Col>

                                                </Row>
                                            </CardTitle>

                                        <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} size="lg" style={{ maxWidth: '900px', width: '100%', marginLeft:'300px' }}>

                                            <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '800px', color: 'black', textAlign:'center', paddingTop: '20px', fontSize: '25px' }}><b>THÊM MỚI VIÊN CHỨC</b></p></ModalHeader>


                                                <ModalBody>

                                                    <Row>
                                                        <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>

                                                        <Col className="pr-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Bộ môn <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="mabomon" value={this.state.newvc.Mabomon} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Mabomon = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='0' >--Chọn bộ môn--</option>
                                                                    {
                                                                        this.state.listBomon.map((bm) =>
                                                                            <option key={bm.mabomon} value={bm.mabomon}>{bm.tenbomon}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="pl-3" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Chức vụ <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="machucvu" value={this.state.newvc.Machucvu} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Machucvu = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='0' >--Chọn chức vụ--</option>
                                                                    {
                                                                        this.state.listChucvu.map((cvu) =>
                                                                            <option key={cvu.machucvu} value={cvu.machucvu}>{cvu.tenchucvu}</option>)
                                                                    }
                                                                </Input>
                                                        </FormGroup>
                                                     
                                                        </Col>
                                                   
                                                        <Col className="pl-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Chức danh <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="machucdanh" value={this.state.newvc.Machucdanh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Machucdanh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='0' >--Chọn chức danh--</option>
                                                                    {
                                                                        this.state.listChucdanh.map((cd) =>
                                                                            <option key={cd.machucdanh} value={cd.machucdanh}>{cd.tenchucdanh}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                </Row>
                                                <Row>
                                                        <Col className="pr-1" md="2">
                                                            <FormGroup>

                                                                <Label htmlFor="diachi">Giới tính</Label>
                                                                <Input type="select" id="gioitinh" value={this.state.newvc.Gioitinh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Gioitinh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='false'>Nữ </option>
                                                                    <option value='true'>Nam </option>
                                                                </Input>

                                                            </FormGroup>
                                                        </Col>

                                                    <Col className="pl-3" md="6" style={{ marginTop: '-7px' }}>
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Họ tên <strong className="text-danger">(*) </strong></Label>
                                                                <Input id="hoten" required value={this.state.newvc.Hoten} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Hoten = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} placeholder="Nhập họ tên" />
                                                            </FormGroup>
                                                        </Col>
                                                 
                                                        <Col className="pl-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="sdt">Số điện thoại <strong className="text-danger">(*) </strong></Label>
                                                            <Input id="sdt" type="number" value={this.state.newvc.Sdt} onChange={(e) => {
                                                                let { newvc } = this.state;
                                                                newvc.Sdt = e.target.value;
                                                                if (this.state.newvc.Sdt.length > 11 || this.state.newvc.Sdt.length < 10) {
                                                                    this.setState({
                                                                        msg: "Số điện thoại từ 10 đến 11 chữ số",
                                                                    })
                                                                }
                                                                else {
                                                                    this.setState({ newvc, msg:'' });
                                                                }
                                                            }} placeholder="Nhập số điện thoại" />
                                                            {
                                                                (msg) ?
                                                                    <p className="text-danger">{msg}</p> : null
                                                            }
                                                                
                                                            </FormGroup>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="ngaysinh">Ngày sinh <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="date" id="ngaysinh" value={this.state.newvc.Ngaysinh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Ngaysinh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>
                                                   

                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="ngaylamviec">Ngày bắt đầu làm việc <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="date" id="ngaylamvec" value={this.state.newvc.Ngaylamviec} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Ngaylamviec = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>

                                                                <Label htmlFor="diachi">Địa chỉ <strong className="text-danger">(*) </strong></Label>
                                                            <Input type="textarea" id="diachi" value={this.state.newvc.Diachi} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Diachi = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} placeholder="Nhập địa chỉ" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="username">Địa chỉ mail <strong className="text-danger">(*) </strong></Label>
                                                                <Input id="username" value={this.state.newvc.Mail} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                newvc.Mail = e.target.value;
                                                               
                                                                
                                                                if (ar.includes(this.state.newvc.Mail)) {
                                                                    this.setState({
                                                                        errors: "Tài khoản này đã có người sử dụng",
                                                                    });
                                                                }
                                                                else {
                                                                    this.setState({ newvc, errors: '' });
                                                                }
                                                            }} placeholder="Nhập địa chỉ mail" />
                                                            {
                                                                (errors) ?
                                                                    <p className="text-danger">{errors}</p> : null
                                                            }
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="pl-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="password">Mật khẩu <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="password" value={this.state.newvc.Matkhau} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Matkhau = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} id="password" placeholder="Nhập mật khẩu" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                  

                                                </ModalBody>
                                                <ModalFooter>

                                                    <Button color="primary" disabled={!(this.state.newvc.Hoten.length > 0 && this.state.newvc.Sdt.length > 0 && this.state.newvc.Ngaylamviec.length > 0 && this.state.newvc.Ngaysinh.length > 0 && this.state.newvc.Mail.length > 0 && this.state.newvc.Matkhau.length > 0)} onClick={this.addVC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                                </ModalFooter>

                                            </Modal>
                                        </CardHeader>
                                    <CardBody>
                                        <Tabs>
                                        <TabList>

                                            <Tab>Tất cả viên chức</Tab>
                                            <Tab>Công nghệ thông tin</Tab>
                                            <Tab>Tin học ứng dụng</Tab>
                                            <Tab>Công nghệ phần mền</Tab>
                                            <Tab>Mạng máy tính và truyền thông</Tab>
                                            <Tab>Khoa học máy tính</Tab>
                                            <Tab>Hệ thống thông tin</Tab>

                                        </TabList>
                                        <TabPanel>
                                                
                                            <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã số</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Chức danh</th>
                                                        <th>Chức vụ</th>
                                                        <th>Bộ môn</th>

                                                        {(rules.find(x => x == cns)) ?
                                                            <th>Thao tác</th> : null}
                                                       
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        vienchuc.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.mavienchuc}>
                                                                    <td>{index + 1}</td>
                                                                    <td> {emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                    <td>{emp.tenchucdanh}</td>
                                                                    <td>{emp.tenchucvu}</td>
                                                                    <td>{emp.tenbomon}</td>
                                                                    {(rules.find(x => x == cns)) ?
                                                                        <td>


                                                                            <Button  color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;

                                                                

                                                                           


                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                ? <strong>(Tôi)</strong> :

                                                                                <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                </strong>
                                                                            }





                                                                           

                                                                        </td> : null}

                                                                </tr>
                                                            )
                                                        })

                                                    
                                                }
                                            </tbody>
                                                </Table>
                                                <div class="page-pagination">

                                                    <ReactPaginate
                                                        previousLabel={"<"}
                                                        nextLabel={">"}

                                                        breakLabel={"..."}
                                                        breakClassName={"break-me"}
                                                        pageCount={this.state.pageCount}
                                                        marginPagesDisplayed={2}
                                                        pageRangeDisplayed={6}
                                                        onPageChange={this.handlePageClick}
                                                        containerClassName={"pagination"}
                                                        subContainerClassName={"pages pagination"}
                                                        activeClassName={"active"} />

                                                </div>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cntt.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            thud.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            cnpm.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            mmt.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            khmt.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                            <TabPanel>

                                                <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>
                                                            <th>Mã số</th>
                                                            <th>Họ tên</th>
                                                            <th>Giới tính</th>
                                                            <th>Chức danh</th>
                                                            <th>Chức vụ</th>
                                                            <th>Bộ môn</th>

                                                            {(rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th> : null}

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            httt.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.mavienchuc}>
                                                                        <td>{index + 1}</td>
                                                                        <td> {emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                        <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                        <td>{emp.tenchucdanh}</td>
                                                                        <td>{emp.tenchucvu}</td>
                                                                        <td>{emp.tenbomon}</td>
                                                                        {(rules.find(x => x == cns)) ?
                                                                            <td>


                                                                                <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                    ? <strong>(Tôi)</strong> :

                                                                                    <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                    </strong>
                                                                                }







                                                                            </td> : null}

                                                                    </tr>
                                                                )
                                                            })


                                                        }
                                                    </tbody>
                                                </Table>
                                            </TabPanel>
                                        </Tabs>
                                             
                                                <Modal isOpen={this.state.detailModal} toggle={this.toggleDetailsModal.bind(this, this.state.idxemct)}>
                                                    <ModalHeader toggle={this.toggleDetailsModal.bind(this, this.state.idxemct)} style={{ backgroundColor: '#D6EAF8', height: '80px' }} > <p style={{ width: '430px', color: 'black', paddingLeft: '10px', paddingTop: '10px', fontSize: '25px' }}><b>THÔNG TIN CHI TIẾT VIÊN CHỨC</b></p></ModalHeader>
                                                 
                                                    <Form>


                                                        <ModalBody>
                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Mã số cán bộ: </Label> {detailsData.mavienchuc}

                                                                    </FormGroup>
                                                                </Col>


                                                                <Col md="6">
                                                                    <FormGroup>

                                                                        <Label htmlFor="bm" style={{ color: 'black', fontWeight: 'bold' }}>Bộ môn: </Label> {detailsData.tenbomon}

                                                                    </FormGroup>

                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Họ và tên: </Label> {detailsData.hoten}

                                                                    </FormGroup>
                                                                </Col>

                                                                <Col md="6">
                                                                    <FormGroup>

                                                                        <Label htmlFor="cd" style={{ color: 'black', fontWeight: 'bold' }}>Chức danh: </Label> {detailsData.tenchucdanh}

                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="gt" style={{ color: 'black', fontWeight: 'bold' }}>Giới tính: </Label> {detailsData.gioitinh ? 'Nam' : 'Nữ'}

                                                                    </FormGroup>

                                                                </Col>

                                                                <Col className="pr-1" md="6">
                                                                    <FormGroup>

                                                                        <Label htmlFor="cvu" style={{ color: 'black', fontWeight: 'bold' }}>Chức vụ: </Label> {detailsData.tenchucvu}

                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="pr-1" md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="ngaysinh" style={{ color: 'black', fontWeight: 'bold' }}>Ngày sinh: </Label> {moment(detailsData.ngaysinh).format("DD-MM-YYYY")}

                                                                    </FormGroup>

                                                                </Col>
                                                                <Col className="pr-1" md="6">
                                                                    <FormGroup>

                                                                        <Label htmlFor="nlv" style={{ color: 'black', fontWeight: 'bold' }}>Ngày làm việc: </Label> {moment(detailsData.ngaylamviec).format("DD-MM-YYYY")}

                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="sdt" style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại: </Label> {detailsData.sdt}

                                                                    </FormGroup>
                                                                </Col>
                                                                <Col md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="mail" style={{ color: 'black', fontWeight: 'bold' }}>Mail: </Label> {detailsData.mail}

                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col md="12">
                                                                    <FormGroup>

                                                                        <Label htmlFor="diachi" style={{ color: 'black', fontWeight: 'bold' }}>Địa chỉ: </Label> {detailsData.diachi}

                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>



                                                        </ModalBody>

                                                        <ModalFooter>



                                                            <Button color="danger" onClick={this.toggleDongDetails.bind(this)}>Trở về</Button>
                                                        </ModalFooter>






                                                    </Form>


                                                </Modal>
                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.mavienchuc, this.state.editData.mabomon, this.state.editData.machucdanh, this.state.editData.machucvu, this.state.editData.hoten, this.state.editData.diachi, this.state.editData.gioitinh, this.state.editData.sdt, this.state.editData.ngaysinh, this.state.editData.ngaylamviec)} size="lg" style={{ maxWidth: '900px', width: '100%', marginLeft: '300px' }}>

                                                    <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.mavienchuc, this.state.editData.mabomon, this.state.editData.machucdanh, this.state.editData.machucvu, this.state.editData.hoten, this.state.editData.diachi, this.state.editData.gioitinh, this.state.editData.sdt, this.state.editData.ngaysinh, this.state.editData.ngaylamviec)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '800px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


                                                    <ModalBody>

                                                        <Row>
                                                            <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>

                                                            <Col className="pr-1" md="4">
                                                                <FormGroup>
                                                                    <Label htmlFor="iddonvi">Bộ môn <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="select" id="mabomon" value={this.state.editData.mabomon} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.mabomon = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} >
                                                                        <option value='0' >--Chọn bộ môn--</option>
                                                                        {
                                                                            this.state.listBomon.map((bm) =>
                                                                                <option key={bm.mabomon} value={bm.mabomon}>{bm.tenbomon}</option>)
                                                                        }
                                                                    </Input>
                                                                </FormGroup>
                                                            </Col>
                                                            <Col className="pl-3" md="4">
                                                                <FormGroup>
                                                                    <Label htmlFor="iddonvi">Chức vụ <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="select" id="machucvu" value={this.state.editData.machucvu} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.machucvu = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} >
                                                                        <option value='0' >--Chọn chức vụ--</option>
                                                                        {
                                                                            this.state.listChucvu.map((cvu) =>
                                                                                <option key={cvu.machucvu} value={cvu.machucvu}>{cvu.tenchucvu}</option>)
                                                                        }
                                                                    </Input>
                                                                </FormGroup>

                                                            </Col>

                                                            <Col className="pl-1" md="4">
                                                                <FormGroup>
                                                                    <Label htmlFor="iddonvi">Chức danh <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="select" id="machucdanh" value={this.state.editData.machucdanh} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.machucdanh = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} >
                                                                        <option value='0' >--Chọn chức danh--</option>
                                                                        {
                                                                            this.state.listChucdanh.map((cd) =>
                                                                                <option key={cd.machucdanh} value={cd.machucdanh}>{cd.tenchucdanh}</option>)
                                                                        }
                                                                    </Input>
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col className="pr-1" md="2">
                                                                <FormGroup>

                                                                    <Label htmlFor="diachi">Giới tính</Label>
                                                                    <Input type="select" id="gioitinh" value={this.state.editData.gioitinh} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.gioitinh = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} >

                                                                        <option value='true'>Nam </option>
                                                                        <option value='false'>Nữ </option>
                                                                    </Input>

                                                                </FormGroup>
                                                            </Col>

                                                            <Col className="pl-3" md="6" style={{ marginTop: '-7px' }}>
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Họ tên <strong className="text-danger">(*) </strong></Label>
                                                                    <Input id="hoten" required value={this.state.editData.hoten} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.hoten = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} placeholder="Nhập họ tên" />
                                                                </FormGroup>
                                                            </Col>

                                                            <Col className="pl-1" md="4">
                                                                <FormGroup>
                                                                    <Label htmlFor="sdt">Số điện thoại <strong className="text-danger">(*) </strong></Label>
                                                                    <Input id="sdt" type="number" value={this.state.editData.sdt} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.sdt = e.target.value;
                                                                        if (this.state.editData.sdt.length > 11 || this.state.editData.sdt.length < 10) {
                                                                            this.setState({
                                                                                msg: "Số điện thoại từ 10 đến 11 chữ số",
                                                                            })
                                                                        }
                                                                        else {
                                                                            this.setState({ editData, msg: '' });
                                                                        }
                                                                    }} placeholder="Nhập số điện thoại" />
                                                                    {
                                                                        (msg) ?
                                                                            <p className="text-danger">{msg}</p> : null
                                                                    }

                                                                </FormGroup>
                                                            </Col>

                                                        </Row>
                                                        <Row>
                                                            <Col className="pr-1" md="6">
                                                                <FormGroup>
                                                                    <Label htmlFor="ngaysinh">Ngày sinh <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="date" id="ngaysinh" value={moment(this.state.editData.ngaysinh).format("YYYY-MM-DD")} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.ngaysinh = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} />
                                                                </FormGroup>
                                                            </Col>


                                                            <Col className="pr-1" md="6">
                                                                <FormGroup>
                                                                    <Label htmlFor="ngaylamviec">Ngày bắt đầu làm việc <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="date" id="ngaylamvec" value={moment(this.state.editData.ngaylamviec).format("YYYY-MM-DD")} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.ngaylamviec = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>

                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>

                                                                    <Label htmlFor="diachi">Địa chỉ <strong className="text-danger">(*) </strong></Label>
                                                                    <Input type="textarea" id="diachi" value={this.state.editData.diachi} onChange={(e) => {
                                                                        let { editData } = this.state;
                                                                        editData.diachi = e.target.value;
                                                                        this.setState({ editData });
                                                                    }} placeholder="Nhập địa chỉ" />
                                                                </FormGroup>
                                                            </Col>
                                                        </Row>




                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" disabled={!(this.state.editData.machucdanh.length > 0 && this.state.editData.machucvu.length > 0 && this.state.editData.hoten.length > 0 && this.state.editData.sdt.length > 0 && this.state.editData.ngaylamviec.length > 0 && this.state.editData.ngaysinh.length > 0 && this.state.editData.diachi.length > 0)} onClick={this.updateVC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleDongEdit.bind(this)}>Hủy bỏ</Button>
                                                    </ModalFooter>

                                                </Modal>
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

                                                    onConfirm={() => this.deleteVC({ mavienchuc: this.state.xoa.mavienchuc })}

                                                    onCancel={() => this.setState({ showAlert: false })}
                                                    focusCancelBtn
                                                >  {"Toàn bộ thông tin của  " + this.state.xoa.hoten + " (" + this.state.xoa.mavienchuc + ") sẽ bị xóa khỏi hệ thống"}
                                                </SweetAlert>

                                                <SweetAlert
                                                    show={this.state.confirm}
                                                    success
                                                    confirmBtnText="Đồng ý"
                                                    confirmBtnBsStyle="primary"
                                                    onConfirm={() => this.handleConfirm()}


                                                >  Đã xóa thành công !!!
                                                                </SweetAlert>
                                               
                                       </CardBody>
                                        <CardFooter style={{ paddingLeft: '450px' }}>
                                            </CardFooter>
                                    </Card>
                                </Col>

                            </Row>
                    </div>
                      : (rules.find(x => x == cn)) ?
                        <div className="content">

                            <Row>
                                <Col md="12">

                                    <Card>
                                        <CardHeader>

                                            <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH VIÊN CHỨC</b> </p></CardTitle>
                                            <CardTitle>
                                                <Row md="12">
                                                    {(rules.find(x => x == cn)) ?
                                                        <Col md="2">
                                                            <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '45px' }} class="fa fa-user-plus" aria-hidden="true" ></i></Button>
                                                        </Col> : null}
                                            :


                                                    <Col md="4">
                                                        <Search
                                                            valueSearch={this.state.valueSearch}
                                                            handleSearch={this.handleSearch} />
                                                    </Col>

                                                </Row>
                                            </CardTitle>

                                            <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} size="lg" style={{ maxWidth: '900px', width: '100%', marginLeft: '300px' }}>

                                                <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '800px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>THÊM MỚI VIÊN CHỨC</b></p></ModalHeader>


                                                <ModalBody>

                                                    <Row>
                                                        <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>

                                                        <Col className="pr-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Bộ môn <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="mabomon" value={this.state.user.mabomon} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Mabomon = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} disabled>
                                                                    <option value='0' >--Chọn bộ môn--</option>
                                                                    {
                                                                        this.state.listBomon.map((bm) =>
                                                                            <option key={bm.mabomon} value={bm.mabomon}>{bm.tenbomon}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="pl-3" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Chức vụ <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="machucvu" value={this.state.newvc.Machucvu} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Machucvu = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='0' >--Chọn chức vụ--</option>
                                                                    {
                                                                        this.state.listChucvu.map((cvu) =>
                                                                            <option key={cvu.machucvu} value={cvu.machucvu}>{cvu.tenchucvu}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>

                                                        </Col>

                                                        <Col className="pl-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="iddonvi">Chức danh <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="select" id="machucdanh" value={this.state.newvc.Machucdanh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Machucdanh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='0' >--Chọn chức danh--</option>
                                                                    {
                                                                        this.state.listChucdanh.map((cd) =>
                                                                            <option key={cd.machucdanh} value={cd.machucdanh}>{cd.tenchucdanh}</option>)
                                                                    }
                                                                </Input>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="2">
                                                            <FormGroup>

                                                                <Label htmlFor="diachi">Giới tính</Label>
                                                                <Input type="select" id="gioitinh" value={this.state.newvc.Gioitinh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Gioitinh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} >
                                                                    <option value='false'>Nữ </option>
                                                                    <option value='true'>Nam </option>
                                                                </Input>

                                                            </FormGroup>
                                                        </Col>

                                                        <Col className="pl-3" md="6" style={{ marginTop: '-7px' }}>
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Họ tên <strong className="text-danger">(*) </strong></Label>
                                                                <Input id="hoten" required value={this.state.newvc.Hoten} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Hoten = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} placeholder="Nhập họ tên" />
                                                            </FormGroup>
                                                        </Col>

                                                        <Col className="pl-1" md="4">
                                                            <FormGroup>
                                                                <Label htmlFor="sdt">Số điện thoại <strong className="text-danger">(*) </strong></Label>
                                                                <Input id="sdt" type="number" value={this.state.newvc.Sdt} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Sdt = e.target.value;
                                                                    if (this.state.newvc.Sdt.length > 11 || this.state.newvc.Sdt.length < 10) {
                                                                        this.setState({
                                                                            msg: "Số điện thoại từ 10 đến 11 chữ số",
                                                                        })
                                                                    }
                                                                    else {
                                                                        this.setState({ newvc, msg: '' });
                                                                    }
                                                                }} placeholder="Nhập số điện thoại" />
                                                                {
                                                                    (msg) ?
                                                                        <p className="text-danger">{msg}</p> : null
                                                                }

                                                            </FormGroup>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="ngaysinh">Ngày sinh <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="date" id="ngaysinh" value={this.state.newvc.Ngaysinh} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Ngaysinh = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>


                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="ngaylamviec">Ngày bắt đầu làm việc <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="date" id="ngaylamvec" value={this.state.newvc.Ngaylamviec} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Ngaylamviec = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>

                                                                <Label htmlFor="diachi">Địa chỉ <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="textarea" id="diachi" value={this.state.newvc.Diachi} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Diachi = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} placeholder="Nhập địa chỉ" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col className="pr-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="username">Địa chỉ mail <strong className="text-danger">(*) </strong></Label>
                                                                <Input id="username" value={this.state.newvc.Mail} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Mail = e.target.value;


                                                                    if (ar.includes(this.state.newvc.Mail)) {
                                                                        this.setState({
                                                                            errors: "Tài khoản này đã có người sử dụng",
                                                                        });
                                                                    }
                                                                    else {
                                                                        this.setState({ newvc, errors: '' });
                                                                    }
                                                                }} placeholder="Nhập địa chỉ mail" />
                                                                {
                                                                    (errors) ?
                                                                        <p className="text-danger">{errors}</p> : null
                                                                }
                                                            </FormGroup>
                                                        </Col>
                                                        <Col className="pl-1" md="6">
                                                            <FormGroup>
                                                                <Label htmlFor="password">Mật khẩu <strong className="text-danger">(*) </strong></Label>
                                                                <Input type="password" value={this.state.newvc.Matkhau} onChange={(e) => {
                                                                    let { newvc } = this.state;
                                                                    newvc.Matkhau = e.target.value;
                                                                    this.setState({ newvc });
                                                                }} id="password" placeholder="Nhập mật khẩu" />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>


                                                </ModalBody>
                                                <ModalFooter>

                                                    <Button color="primary" disabled={!(this.state.newvc.Hoten.length > 0 && this.state.newvc.Sdt.length > 0 && this.state.newvc.Ngaylamviec.length > 0 && this.state.newvc.Ngaysinh.length > 0 && this.state.newvc.Mail.length > 0 && this.state.newvc.Matkhau.length > 0)} onClick={this.addVC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                                </ModalFooter>

                                            </Modal>
                                        </CardHeader>
                                        <CardBody>
                                            


                                          
                                            <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Mã số</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Chức danh</th>
                                                        <th>Chức vụ</th>
                                                        <th>Bộ môn</th>

                                                        {(rules.find(x => x == cn)) ?
                                                            <th>Thao tác</th> : null}

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        vcbm.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.mavienchuc}>
                                                                    <td>{index + 1}</td>
                                                                    <td> {emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                    <td>{emp.tenchucdanh}</td>
                                                                    <td>{emp.tenchucvu}</td>
                                                                    <td>{emp.tenbomon}</td>
                                                                    {(rules.find(x => x == cn)) ?
                                                                        <td>


                                                                            <Button color="warning" onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc)} style={{ width: '40px' }}> <i className="fa fa-info" aria-hidden="true"></i></Button> &nbsp;






                                                                            {(this.state.user.mavienchuc == emp.mavienchuc)
                                                                                ? <strong>(Tôi)</strong> :

                                                                                <strong><Button color="default" onClick={this.toggleEditModal.bind(this, emp.mavienchuc, emp.mabomon, emp.machucdanh, emp.machucvu, emp.hoten, emp.diachi, emp.gioitinh, emp.sdt, emp.ngaysinh, emp.ngaylamviec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mavienchuc, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                </strong>
                                                                            }







                                                                        </td> : null}

                                                                </tr>
                                                            )
                                                        })


                                                    }

                                                    <Modal isOpen={this.state.detailModal} toggle={this.toggleDetailsModal.bind(this, this.state.idxemct)}>
                                                        <ModalHeader toggle={this.toggleDetailsModal.bind(this, this.state.idxemct)} style={{ backgroundColor: '#D6EAF8', height: '80px' }} > <p style={{ width: '430px', color: 'black', paddingLeft: '10px', paddingTop: '10px', fontSize: '25px' }}><b>THÔNG TIN CHI TIẾT VIÊN CHỨC</b></p></ModalHeader>

                                                        <Form>


                                                            <ModalBody>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Mã số cán bộ: </Label> {detailsData.mavienchuc}

                                                                        </FormGroup>
                                                                    </Col>


                                                                    <Col md="6">
                                                                        <FormGroup>

                                                                            <Label htmlFor="bm" style={{ color: 'black', fontWeight: 'bold' }}>Bộ môn: </Label> {detailsData.tenbomon}

                                                                        </FormGroup>

                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="hoten" style={{ color: 'black', fontWeight: 'bold' }}>Họ và tên: </Label> {detailsData.hoten}

                                                                        </FormGroup>
                                                                    </Col>

                                                                    <Col md="6">
                                                                        <FormGroup>

                                                                            <Label htmlFor="cd" style={{ color: 'black', fontWeight: 'bold' }}>Chức danh: </Label> {detailsData.tenchucdanh}

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>

                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="gt" style={{ color: 'black', fontWeight: 'bold' }}>Giới tính: </Label> {detailsData.gioitinh ? 'Nam' : 'Nữ'}

                                                                        </FormGroup>

                                                                    </Col>

                                                                    <Col className="pr-1" md="6">
                                                                        <FormGroup>

                                                                            <Label htmlFor="cvu" style={{ color: 'black', fontWeight: 'bold' }}>Chức vụ: </Label> {detailsData.tenchucvu}

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col className="pr-1" md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="ngaysinh" style={{ color: 'black', fontWeight: 'bold' }}>Ngày sinh: </Label> {moment(detailsData.ngaysinh).format("DD-MM-YYYY")}

                                                                        </FormGroup>

                                                                    </Col>
                                                                    <Col className="pr-1" md="6">
                                                                        <FormGroup>

                                                                            <Label htmlFor="nlv" style={{ color: 'black', fontWeight: 'bold' }}>Ngày làm việc: </Label> {moment(detailsData.ngaylamviec).format("DD-MM-YYYY")}

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="sdt" style={{ color: 'black', fontWeight: 'bold' }}>Số điện thoại: </Label> {detailsData.sdt}

                                                                        </FormGroup>
                                                                    </Col>
                                                                    <Col md="6">
                                                                        <FormGroup>
                                                                            <Label htmlFor="mail" style={{ color: 'black', fontWeight: 'bold' }}>Mail: </Label> {detailsData.mail}

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12">
                                                                        <FormGroup>

                                                                            <Label htmlFor="diachi" style={{ color: 'black', fontWeight: 'bold' }}>Địa chỉ: </Label> {detailsData.diachi}

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>



                                                            </ModalBody>

                                                            <ModalFooter>



                                                                <Button color="danger" onClick={this.toggleDongDetails.bind(this)}>Trở về</Button>
                                                            </ModalFooter>






                                                        </Form>


                                                    </Modal>
                                                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.mavienchuc, this.state.editData.mabomon, this.state.editData.machucdanh, this.state.editData.machucvu, this.state.editData.hoten, this.state.editData.diachi, this.state.editData.gioitinh, this.state.editData.sdt, this.state.editData.ngaysinh, this.state.editData.ngaylamviec)} size="lg" style={{ maxWidth: '900px', width: '100%', marginLeft: '300px' }}>

                                                        <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.mavienchuc, this.state.editData.mabomon, this.state.editData.machucdanh, this.state.editData.machucvu, this.state.editData.hoten, this.state.editData.diachi, this.state.editData.gioitinh, this.state.editData.sdt, this.state.editData.ngaysinh, this.state.editData.ngaylamviec)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '800px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


                                                        <ModalBody>

                                                            <Row>
                                                                <Col md="12"> <p className="text-danger"> (*) Bắt buộc</p></Col>

                                                                <Col className="pr-1" md="4">
                                                                    <FormGroup>
                                                                        <Label htmlFor="iddonvi">Bộ môn <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="select" id="mabomon" value={this.state.user.mabomon} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.mabomon = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} disabled>
                                                                            <option value='0' >--Chọn bộ môn--</option>
                                                                            {
                                                                                this.state.listBomon.map((bm) =>
                                                                                    <option key={bm.mabomon} value={bm.mabomon}>{bm.tenbomon}</option>)
                                                                            }
                                                                        </Input>
                                                                    </FormGroup>
                                                                </Col>
                                                                <Col className="pl-3" md="4">
                                                                    <FormGroup>
                                                                        <Label htmlFor="iddonvi">Chức vụ <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="select" id="machucvu" value={this.state.editData.machucvu} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.machucvu = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} >
                                                                            <option value='0' >--Chọn chức vụ--</option>
                                                                            {
                                                                                this.state.listChucvu.map((cvu) =>
                                                                                    <option key={cvu.machucvu} value={cvu.machucvu}>{cvu.tenchucvu}</option>)
                                                                            }
                                                                        </Input>
                                                                    </FormGroup>

                                                                </Col>

                                                                <Col className="pl-1" md="4">
                                                                    <FormGroup>
                                                                        <Label htmlFor="iddonvi">Chức danh <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="select" id="machucdanh" value={this.state.editData.machucdanh} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.machucdanh = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} >
                                                                            <option value='0' >--Chọn chức danh--</option>
                                                                            {
                                                                                this.state.listChucdanh.map((cd) =>
                                                                                    <option key={cd.machucdanh} value={cd.machucdanh}>{cd.tenchucdanh}</option>)
                                                                            }
                                                                        </Input>
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>
                                                            <Row>
                                                                <Col className="pr-1" md="2">
                                                                    <FormGroup>

                                                                        <Label htmlFor="diachi">Giới tính</Label>
                                                                        <Input type="select" id="gioitinh" value={this.state.editData.gioitinh} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.gioitinh = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} >

                                                                            <option value='true'>Nam </option>
                                                                            <option value='false'>Nữ </option>
                                                                        </Input>

                                                                    </FormGroup>
                                                                </Col>

                                                                <Col className="pl-3" md="6" style={{ marginTop: '-7px' }}>
                                                                    <FormGroup>
                                                                        <Label htmlFor="hoten">Họ tên <strong className="text-danger">(*) </strong></Label>
                                                                        <Input id="hoten" required value={this.state.editData.hoten} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.hoten = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} placeholder="Nhập họ tên" />
                                                                    </FormGroup>
                                                                </Col>

                                                                <Col className="pl-1" md="4">
                                                                    <FormGroup>
                                                                        <Label htmlFor="sdt">Số điện thoại <strong className="text-danger">(*) </strong></Label>
                                                                        <Input id="sdt" type="number" value={this.state.editData.sdt} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.sdt = e.target.value;
                                                                            if (this.state.editData.sdt.length > 11 || this.state.editData.sdt.length < 10) {
                                                                                this.setState({
                                                                                    msg: "Số điện thoại từ 10 đến 11 chữ số",
                                                                                })
                                                                            }
                                                                            else {
                                                                                this.setState({ editData, msg: '' });
                                                                            }
                                                                        }} placeholder="Nhập số điện thoại" />
                                                                        {
                                                                            (msg) ?
                                                                                <p className="text-danger">{msg}</p> : null
                                                                        }

                                                                    </FormGroup>
                                                                </Col>

                                                            </Row>
                                                            <Row>
                                                                <Col className="pr-1" md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="ngaysinh">Ngày sinh <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="date" id="ngaysinh" value={moment(this.state.editData.ngaysinh).format("YYYY-MM-DD")} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.ngaysinh = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} />
                                                                    </FormGroup>
                                                                </Col>


                                                                <Col className="pr-1" md="6">
                                                                    <FormGroup>
                                                                        <Label htmlFor="ngaylamviec">Ngày bắt đầu làm việc <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="date" id="ngaylamvec" value={moment(this.state.editData.ngaylamviec).format("YYYY-MM-DD")} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.ngaylamviec = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>

                                                            <Row>
                                                                <Col md="12">
                                                                    <FormGroup>

                                                                        <Label htmlFor="diachi">Địa chỉ <strong className="text-danger">(*) </strong></Label>
                                                                        <Input type="textarea" id="diachi" value={this.state.editData.diachi} onChange={(e) => {
                                                                            let { editData } = this.state;
                                                                            editData.diachi = e.target.value;
                                                                            this.setState({ editData });
                                                                        }} placeholder="Nhập địa chỉ" />
                                                                    </FormGroup>
                                                                </Col>
                                                            </Row>




                                                        </ModalBody>
                                                        <ModalFooter>
                                                            <Button color="primary" disabled={!(this.state.editData.machucdanh.length > 0 && this.state.editData.machucvu.length > 0 && this.state.editData.hoten.length > 0 && this.state.editData.sdt.length > 0 && this.state.editData.ngaylamviec.length > 0 && this.state.editData.ngaysinh.length > 0 && this.state.editData.diachi.length > 0)} onClick={this.updateVC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                            <Button color="danger" onClick={this.toggleDongEdit.bind(this)}>Hủy bỏ</Button>
                                                        </ModalFooter>

                                                    </Modal>
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

                                                        onConfirm={() => this.deleteVC({ mavienchuc: this.state.xoa.mavienchuc })}

                                                        onCancel={() => this.setState({ showAlert: false })}
                                                        focusCancelBtn
                                                    >  {"Toàn bộ thông tin của  " + this.state.xoa.hoten + " (" + this.state.xoa.mavienchuc + ") sẽ bị xóa khỏi hệ thống"}
                                                    </SweetAlert>

                                                    <SweetAlert
                                                        show={this.state.confirm}
                                                        success
                                                        confirmBtnText="Đồng ý"
                                                        confirmBtnBsStyle="primary"
                                                        onConfirm={() => this.handleConfirm()}


                                                    >  Đã xóa thành công !!!
                                                                </SweetAlert>
                                                </tbody>
                                            </Table>
                                            <div class="page-pagination">

                                                <ReactPaginate
                                                    previousLabel={"<"}
                                                    nextLabel={">"}

                                                    breakLabel={"..."}
                                                    breakClassName={"break-me"}
                                                    pageCount={this.state.pageCount}
                                                    marginPagesDisplayed={2}
                                                    pageRangeDisplayed={6}
                                                    onPageChange={this.handlePageClickBM}
                                                    containerClassName={"pagination"}
                                                    subContainerClassName={"pages pagination"}
                                                    activeClassName={"active"} />

                                            </div>
                                        </CardBody>
                                        <CardFooter style={{ paddingLeft: '450px' }}>
                                        </CardFooter>
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

export default DanhmucVienchuc;