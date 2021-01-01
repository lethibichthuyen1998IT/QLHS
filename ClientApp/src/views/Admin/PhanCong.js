import axios from 'axios';
import Search from 'components/Search';
import moment from 'moment';
import React from 'react';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import ReactPaginate from 'react-paginate';
import {
    Alert, Button, Card,

    CardBody,

    CardFooter, CardHeader,

    CardTitle,



    Col,





    FormGroup, Input, Label, Modal,


    ModalBody, ModalFooter, ModalHeader, Row, Table
} from "reactstrap";


class Phancong extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            congviec: [],
            vienchuc: [],
            phancong: [],
          
            source: [],
          
            vc: [],
            quyen: [],
            chucnang: [],
            showAlert: false,
            CVshowAlert: false,
            confirm: false,

            newpc: {

                manamhoc: '',
                mavienchuc: '',
               
                idmonhoc: '',
                soluong: ''
               
              

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
                manamhoc: '',
                mavienchuc: '',

                idmonhoc: '',
                soluong: ''
              

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
            nhmd:'',
            dm: [],
            modalDetails: false,
            user: JSON.parse(localStorage.getItem('user')),
            alert: '',
            idnh: '',
            idvc:'',
            bmsource: [],
            monhoc: [],
            offset: 0,
            orgtableData: [],
            perPage: 6,
            currentPage: 0
                

        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deletePC = this.deletePC.bind(this);
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


     

       

        axios.get('/congviecs/')
            .then((res) => this.setState({
                congviec: res.data,

            })
        );
        axios.get('/monhocs/')
            .then((res) => this.setState({
                monhoc: res.data,

            })
            );
    

        axios.get('/vienchucs/bomon/' + this.state.user.mabomon + '/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                vcbm: res.data,
                bmsource: res.data
            })
            );
        axios.get('/vienchucs/tatca/' + this.state.user.mavienchuc)
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
        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data.manamhoc,
              

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
        const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/pdf'];
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

                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.mabomon.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            vienchuc: newArray,
            valueSearch: search
        });
    }

    handlebmSearch = (search) => {

        let sourceArray = this.state.bmsource;

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
        //hien thi danh sach
        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data,

            })
            );

        axios.get('/monhocs/')
            .then((res) => this.setState({
                monhoc: res.data,

            })
            );



        axios.get('/congviecs/')
            .then((res) => this.setState({
                congviec: res.data,

            })
            );
      

        axios.get('/vienchucs/bomon/' + this.state.user.mabomon + "/" + this.state.user.mavienchuc)
            .then((res) => this.setState({
                vcbm: res.data,
                bmsource: res.data
            })
            );
        axios.get('/vienchucs/tatca/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                vienchuc: res.data,
                source: res.data

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

    Load() {
        axios.get('/phancongs/' + this.state.idvc + "/" + this.state.idnh)
              .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableData: ct,
                    congtac: slice,
                    source: ct,

                })

            });

        axios.get('/congviecs/' + this.state.idvc + "/" + this.state.idnh)
            .then((res) => {
                this.setState({ chitietcv: res.data })
            });

        this.setState({
            modalDetails: true


        })
    }

    //add

    toggleNewVienChucModal() {
        this.setState({
            newpc: { mavienchuc: this.state.idvc },
            AddModal: !this.state.AddModal



        })
    }

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
            chitietcv: slice,
        })

    }
    toggleDetailsModal(idvc,idnh) {
        this.state.idvc = idvc;
        this.state.idnh = idnh;
        axios.get('/phancongs/' + idvc + "/" + idnh)
            .then((res) => {
                this.setState({ chitietpc: res.data })
            });

      

        axios.get('/congviecs/' + idvc + "/" + idnh)
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableData: ct,
                    chitietcv: slice


                })

            });
       
        this.setState({
            modalDetails: true


        })


    }

   
    



    toggleDongModal() {

        this.setState({
           
            modalDetails: false

        })
    }
    addPC() {


        axios.post('/phancongs/', {
            MAVIENCHUC: this.state.idvc,
            MANAMHOC: this.state.newpc.manamhoc,
            IDMONHOC: this.state.newpc.idmonhoc,
            SOLUONG: this.state.newpc.soluong
          

        }).then((response) => {
            //console.log(response.data);
            alert("Đã thêm thành công!");
            this.setState({
                newpc: {
                    manamhoc: '',
                    mavienchuc: '',

                    idmonhoc: '',
                    soluong: ''

                },
                errors: '',
                AddModal: false
            }, () => this.Load());
           
        })
            .catch((error) => {
                console.log(error.response);
                alert(error);
            });
        //.catch ((error) => console.log(error.response.request.response) );
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
    toggleEditModal(maphancong, mavienchuc, manamhoc,idmonhoc, soluong) {
        this.setState({
            editData: { maphancong, mavienchuc, manamhoc, idmonhoc, soluong},
            editModal: !this.state.editModal

        });
    }
    toggleDongPC() {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    //edit cong viec
    toggleDongCV() {
        this.setState({
            editCVModal: !this.state.editCVModal
        })
    }
    toggleEditCVModal(macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec) {
        this.setState({
            editCVData: { macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec },
            editCVModal: !this.state.editCVModal

        });
    }
   
    updateCV() {
        let { macongviec, manamhoc, mavienchuc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec } = this.state.editCVData;
        axios.put('/congviecs/' + Number.parseInt(this.state.editCVData.macongviec),
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
                })
               

                alert("Cập nhật thành công!");
                this.Load();
            }).catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }
    updatePC() {
        let { maphancong, mavienchuc, manamhoc, idmonhoc, soluong } = this.state.editData;
        axios.put('/phancongs/' + this.state.editData.maphancong,
            { maphancong, mavienchuc, manamhoc, idmonhoc, soluong }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        maphancong: '',
                        manamhoc: '',
                        mavienchuc: '',

                        idmonhoc: '',
                        soluong: ''
                    },
                })
               
                this.Load();
                alert("Cập nhật thành công!");
            }).catch((error) => {
                console.log(error.response);
                alert(error);
            });

    }
    //filter
     onchange = e => {
         this.setState({ idnh: e.target.value }, ()=> this.Load());
       
       
      

    }
    deleteCV = (macongviec) => {
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
    deletePC = (maphancong) => {
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
     
        this.setState({
            confirm: !this.state.confirm

        }, () => this.Load());
    }

    //render
    render() {

        const { vc, quyen, chucnang, errors, congviec, chitietcv, chitietpc, vienchuc, vcbm,nhmd } = this.state;

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
      
      
        console.log(chitietpc);
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
                                                  
                                                    <Col md="6" style={{ paddingLeft: '200px' }}>
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
                                                                }} disabled>
                                                                    <option value='0' >--Chọn viên chức--</option>
                                                                    {
                                                                        this.state.vienchuc.map((vchuc) =>
                                                                            <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                    }
                                                                </Input>


                                                            </FormGroup>
                                                        </Col>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Năm học: </Label>
                                                                <Input id="tenchucvu" type="select" value={this.state.newpc.manamhoc} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.manamhoc = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }}>
                                                                    <option value='0' >--Chọn năm học--</option>
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
                                                                <Label htmlFor="hoten">Môn học: </Label>
                                                                <Input id="tenchucvu" type="select" value={this.state.newpc.idmonhoc} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.idmonhoc = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }}>
                                                                    <option value='0' >--Chọn môn học--</option>
                                                                    {
                                                                        this.state.monhoc.map((nh) =>
                                                                            <option key={nh.idmonhoc} value={nh.idmonhoc}>{nh.tenmonhoc}</option>)
                                                                    }
                                                                </Input>


                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Số lượng: </Label>
                                                                <Input id="tenchucvu" type="number" value={this.state.newpc.soluong} onChange={(e) => {
                                                                    let { newpc } = this.state;
                                                                    newpc.soluong = Number.parseInt(e.target.value);
                                                                    this.setState({ newpc });
                                                                }} />

                                                            </FormGroup>
                                                        </Col>
                                                    
                                                     
                                                    </Row>
                                                 



                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary"  onClick={this.addPC.bind(this)}>Thực hiện lưu</Button>{' '}
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
                                                                <div class="content-box color-effect-1" style={{ backgroundColor: '#229954', margin: '10px', height: '280px' }} >
                                                                    <h3> {emp.mavienchuc}</h3>
                                                                                <div class="box-icon-wrap box-icon-effect-1 box-icon-effect-1a">
                                                                        <a onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc,nhmd)}> <div class="box-icon"> <i class="fa fa-user"></i></div> </a>
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
                                                <Row md="5" style={{
                                                    marginLeft: '350px', marginTop: '10px' 
                                                }}>
                                                    <Col md="2" style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '10px', fontSize: '18px' }}>Năm học:</Col>
                                                    <Col md="3" style={{ paddingLeft: '0px' }}>  <Input type="select" id="mabomon" value={this.state.idnh} onChange={this.onchange} >

                                                    {
                                                        this.state.nh.map((nh) =>
                                                            <option key={nh.manamhoc} value={nh.manamhoc}>{nh.tennamhoc}</option>)
                                                    }

                                                </Input>
                                                   
                                                    </Col>
                                                    </Row>
                                                <p style={{ paddingLeft: '10px' }}> <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#17A2B8', color: 'white', width: '100px' }}>Phân công</Button> 
                                                    <Button color="danger" onClick={this.toggleDongModal.bind(this)} style={{ width: '100px' }}>Đóng </Button> 
                                                 
                                              
                                                   </p>
                                              
                                                
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
                                                                               

                                                                                <td>{emp.tendanhmuc}</td>

                                                                                <td>{emp.tencongviec}</td>
                                                                                <td>{moment(emp.ngaythuchien).format("DD-MM-YYYY")}</td>
                                                                                <td>{emp.diadiem}</td>
                                                                                <td>{emp.thoigian}</td>

                                                                                <td>{(emp.filecongvec == null) ? null :
                                                                                    (emp.filecongvec == "") ? null :
                                                                                        < a href={"/UploadedFiles/" + (emp.filecongvec).split('\\').pop()} download> Tải xuống </a>
                                                                                }
                                                                                </td>

                                                                                {(rules.find(x => x == cns)) ?
                                                                                    <td>
                                                                                        <Button color="default" onClick={this.toggleEditCVModal.bind(this, emp.macongviec, emp.manamhoc, emp.mavienchuc, emp.masodanhmuc, emp.tencongviec, emp.ngaythuchien, emp.diadiem, emp.thoigian, emp.filecongvec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                               
                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleXoa.bind(this, emp.macongviec, emp.tencongviec, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                                       



                                                                                    </td>
                                                                                    : null
                                                                                }
                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
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

                                                                    onConfirm={() => this.deleteCV({ macongviec: this.state.xoacv.macongviec})}

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
                                                                <Modal isOpen={this.state.editCVModal} toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.mavienchuc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                    <ModalHeader toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.mavienchuc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                        <Button color="primary" onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="danger" onClick={this.toggleDongCV.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>

                                                                </Modal>
                                                            </tbody>
                                                        </Table>



                                                    </CardBody>
                                                    <CardFooter>
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
                                                    </CardFooter>
                                                </TabPanel>
                                                <TabPanel>
                                                    <CardBody>
                                                    <Table className="table table-hover">

                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>STT</th>
                                                             
                                                                <th>Tên môn học</th>
                                                                <th>Số lượng</th>
                                                               


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
                                                                            <td>{index + 1}</td>
                                                                            <td>{emp.tenmonhoc}</td>

                                                                            <td>{emp.soluong}</td>

                                                                            {(rules.find(x => x == cns)) ?
                                                                                <td>
                                                                                    <Button color="default" onClick={this.toggleEditModal.bind(this, emp.maphancong, emp.mavienchuc, emp.manamhoc, emp.idmonhoc, emp.soluong)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;

                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.maphancong, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>




                                                                                </td>
                                                                                : null
                                                                            }
                                                                        </tr>
                                                                    )
                                                                })

                                                                }

                                                                <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.maphancong, this.state.editData.mavienchuc, this.state.editData.manamhoc, this.state.editData.idmonhoc, this.state.editData.soluong)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                    <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.maphancong, this.state.editData.mavienchuc, this.state.editData.manamhoc, this.state.editData.idmonhoc, this.state.editData.soluong)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '700px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>PHÂN CÔNG</b></p></ModalHeader>


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
                                                                                        <option value='0' >--Chọn viên chức--</option>
                                                                                        {
                                                                                            this.state.vienchuc.map((vchuc) =>
                                                                                                <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                        }
                                                                                    </Input>


                                                                                </FormGroup>
                                                                            </Col>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <Label htmlFor="hoten">Năm học: </Label>
                                                                                    <Input id="tenchucvu" type="select" value={this.state.editData.manamhoc} onChange={(e) => {
                                                                                        let { editData } = this.state;
                                                                                        editData.manamhoc = Number.parseInt(e.target.value);
                                                                                        this.setState({ editData });
                                                                                    }}>
                                                                                        <option value='0' >--Chọn năm học--</option>
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
                                                                                    <Label htmlFor="hoten">Môn học: </Label>
                                                                                    <Input id="tenchucvu" type="select" value={this.state.editData.idmonhoc} onChange={(e) => {
                                                                                        let { editData } = this.state;
                                                                                        editData.idmonhoc = Number.parseInt(e.target.value);
                                                                                        this.setState({ editData });
                                                                                    }}>
                                                                                        <option value='0' >--Chọn môn học--</option>
                                                                                        {
                                                                                            this.state.monhoc.map((nh) =>
                                                                                                <option key={nh.idmonhoc} value={nh.idmonhoc}>{nh.tenmonhoc}</option>)
                                                                                        }
                                                                                    </Input>


                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        <Row>
                                                                            <Col md="12">
                                                                                <FormGroup>
                                                                                    <Label htmlFor="hoten">Số lượng: </Label>
                                                                                    <Input id="tenchucvu" type="number" value={this.state.editData.soluong} onChange={(e) => {
                                                                                        let { editData } = this.state;
                                                                                        editData.soluong = Number.parseInt(e.target.value);
                                                                                        this.setState({ editData });
                                                                                    }} />

                                                                                </FormGroup>
                                                                            </Col>


                                                                        </Row>




                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" onClick={this.updatePC.bind(this)}>Thực hiện lưu</Button>
                                                                        <Button color="danger" onClick={this.toggleDongPC.bind(this)}>Hủy bỏ</Button>
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

                                                        <Col md="6" style={{ paddingLeft: '200px' }}>
                                                            <Search
                                                                valueSearch={this.state.valueSearch}
                                                                handleSearch={this.handlebmSearch} />
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
                                                                    }} disabled>
                                                                        <option value='0' >--Chọn viên chức--</option>
                                                                        {
                                                                            this.state.vienchuc.map((vchuc) =>
                                                                                <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                        }
                                                                    </Input>


                                                                </FormGroup>
                                                            </Col>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Năm học: </Label>
                                                                    <Input id="tenchucvu" type="select" value={this.state.newpc.manamhoc} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.manamhoc = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }}>
                                                                        <option value='0' >--Chọn năm học--</option>
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
                                                                    <Label htmlFor="hoten">Môn học: </Label>
                                                                    <Input id="tenchucvu" type="select" value={this.state.newpc.idmonhoc} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.idmonhoc = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }}>
                                                                        <option value='0' >--Chọn môn học--</option>
                                                                        {
                                                                            this.state.monhoc.map((nh) =>
                                                                                <option key={nh.idmonhoc} value={nh.idmonhoc}>{nh.tenmonhoc}</option>)
                                                                        }
                                                                    </Input>


                                                                </FormGroup>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col md="12">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Số lượng: </Label>
                                                                    <Input id="tenchucvu" type="number" value={this.state.newpc.soluong} onChange={(e) => {
                                                                        let { newpc } = this.state;
                                                                        newpc.soluong = Number.parseInt(e.target.value);
                                                                        this.setState({ newpc });
                                                                    }}  />

                                                                </FormGroup>
                                                            </Col>


                                                        </Row>




                                                    </ModalBody>
                                                    <ModalFooter>
                                                        <Button color="primary" onClick={this.addPC.bind(this)}>Thực hiện lưu</Button>{' '}
                                                        <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                                    </ModalFooter>

                                                </Modal>
                                            </CardHeader>
                                            {(this.state.modalDetails == false) ?


                                                <div class="containerTB">
                                                    <Row md="12">
                                                        {
                                                            vcbm.map((emp) => {
                                                                return (



                                                                    <Col md="3">
                                                                        <div class="content-box color-effect-1" style={{ backgroundColor: '#229954', margin: '10px', height: '280px' }} >
                                                                            <h3> {emp.mavienchuc}</h3>
                                                                            <div class="box-icon-wrap box-icon-effect-1 box-icon-effect-1a">
                                                                                <a onClick={this.toggleDetailsModal.bind(this, emp.mavienchuc, nhmd)}> <div class="box-icon"> <i class="fa fa-user"></i></div> </a>
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
                                                    <Row md="5" style={{
                                                        marginLeft: '350px', marginTop: '10px'
                                                    }}>
                                                        <Col md="2" style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '10px', fontSize: '18px' }}>Năm học:</Col>
                                                        <Col md="3" style={{ paddingLeft: '0px' }}>  <Input type="select" id="mabomon" value={this.state.idnh} onChange={this.onchange} >

                                                            {
                                                                this.state.nh.map((nh) =>
                                                                    <option key={nh.manamhoc} value={nh.manamhoc}>{nh.tennamhoc}</option>)
                                                            }

                                                        </Input>

                                                        </Col>
                                                    </Row>
                                                    <p style={{ paddingLeft: '10px' }}> <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#17A2B8', color: 'white', width: '100px' }}>Phân công</Button>
                                                        <Button color="danger" onClick={this.toggleDongModal.bind(this)} style={{ width: '100px' }}>Đóng </Button>


                                                    </p>


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

                                                                        <th>Tên danh mục</th>
                                                                        <th>Tên công việc</th>
                                                                        <th>Ngày thực hiện</th>
                                                                        <th>Địa điểm</th>
                                                                        <th>Thời gian</th>
                                                                        <th>File</th>


                                                                        {
                                                                            (rules.find(x => x == cn)) ?
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


                                                                                    <td>{emp.tendanhmuc}</td>

                                                                                    <td>{emp.tencongviec}</td>
                                                                                    <td>{moment(emp.ngaythuchien).format("DD-MM-YYYY")}</td>
                                                                                    <td>{emp.diadiem}</td>
                                                                                    <td>{emp.thoigian}</td>

                                                                                    <td>{(emp.filecongvec == null) ? null :
                                                                                        (emp.filecongvec == "") ? null :
                                                                                            < a href={"/UploadedFiles/" + (emp.filecongvec).split('\\').pop()} download> Tải xuống </a>
                                                                                    }
                                                                                    </td>

                                                                                    {(rules.find(x => x == cn)) ?
                                                                                        <td>
                                                                                            <Button color="default" onClick={this.toggleEditCVModal.bind(this, emp.macongviec, emp.manamhoc, emp.mavienchuc, emp.masodanhmuc, emp.tencongviec, emp.ngaythuchien, emp.diadiem, emp.thoigian, emp.filecongvec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;

                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleXoa.bind(this, emp.macongviec, emp.tencongviec, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>




                                                                                        </td>
                                                                                        : null
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        })
                                                                    }
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

                                                                        onConfirm={() => this.deleteCV({ macongviec: this.state.xoacv.macongviec})}

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
                                                                    <Modal isOpen={this.state.editCVModal} toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.mavienchuc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                        <ModalHeader toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.mavienchuc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                            <Button color="primary"  onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>
                                                                            <Button color="danger" onClick={this.toggleDongCV.bind(this)}>Hủy bỏ</Button>
                                                                        </ModalFooter>

                                                                    </Modal>
                                                                </tbody>
                                                            </Table>



                                                        </CardBody>


                                                    </TabPanel>
                                                    <TabPanel>
                                                        <CardBody>
                                                            <Table className="table table-hover">

                                                                <thead className="text-primary">
                                                                    <tr>
                                                                        <th>STT</th>

                                                                        <th>Tên môn học</th>
                                                                        <th>Số lượng</th>



                                                                        {
                                                                            (rules.find(x => x == cn)) ?
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
                                                                                    <td>{index + 1}</td>
                                                                                    <td>{emp.tenmonhoc}</td>

                                                                                    <td>{emp.soluong}</td>

                                                                                    {(rules.find(x => x == cn)) ?
                                                                                        <td>
                                                                                            <Button color="default" onClick={this.toggleEditModal.bind(this, emp.maphancong, emp.mavienchuc, emp.manamhoc, emp.idmonhoc, emp.soluong)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;

                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.maphancong, emp.mavienchuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>




                                                                                        </td>
                                                                                        : null
                                                                                    }
                                                                                </tr>
                                                                            )
                                                                        })

                                                                    }

                                                                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.maphancong, this.state.editData.mavienchuc, this.state.editData.manamhoc, this.state.editData.idmonhoc, this.state.editData.soluong)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                                                        <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.maphancong, this.state.editData.mavienchuc, this.state.editData.manamhoc, this.state.editData.idmonhoc, this.state.editData.soluong)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '700px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>PHÂN CÔNG</b></p></ModalHeader>


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
                                                                                            <option value='0' >--Chọn viên chức--</option>
                                                                                            {
                                                                                                this.state.vienchuc.map((vchuc) =>
                                                                                                    <option key={vchuc.mavienchuc} value={vchuc.mavienchuc}>{vchuc.hoten}</option>)
                                                                                            }
                                                                                        </Input>


                                                                                    </FormGroup>
                                                                                </Col>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Năm học: </Label>
                                                                                        <Input id="tenchucvu" type="select" value={this.state.editData.manamhoc} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.manamhoc = Number.parseInt(e.target.value);
                                                                                            this.setState({ editData });
                                                                                        }}>
                                                                                            <option value='0' >--Chọn năm học--</option>
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
                                                                                        <Label htmlFor="hoten">Môn học: </Label>
                                                                                        <Input id="tenchucvu" type="select" value={this.state.editData.idmonhoc} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.idmonhoc = Number.parseInt(e.target.value);
                                                                                            this.setState({ editData });
                                                                                        }}>
                                                                                            <option value='0' >--Chọn môn học--</option>
                                                                                            {
                                                                                                this.state.monhoc.map((nh) =>
                                                                                                    <option key={nh.idmonhoc} value={nh.idmonhoc}>{nh.tenmonhoc}</option>)
                                                                                            }
                                                                                        </Input>


                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>
                                                                            <Row>
                                                                                <Col md="12">
                                                                                    <FormGroup>
                                                                                        <Label htmlFor="hoten">Số lượng: </Label>
                                                                                        <Input id="tenchucvu" type="number" value={this.state.editData.soluong} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.soluong = Number.parseInt(e.target.value);
                                                                                            this.setState({ editData });
                                                                                        }} />

                                                                                    </FormGroup>
                                                                                </Col>


                                                                            </Row>




                                                                        </ModalBody>
                                                                        <ModalFooter>
                                                                            <Button color="primary" onClick={this.updatePC.bind(this)}>Thực hiện lưu</Button>
                                                                            <Button color="danger" onClick={this.toggleDongPC.bind(this)}>Hủy bỏ</Button>
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
                                                                </tbody>
                                                            </Table>



                                                        </CardBody>
                                                        <CardFooter>
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
                                                        </CardFooter>
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