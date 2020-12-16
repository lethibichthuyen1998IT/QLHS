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
import 'react-tabs/style/react-tabs.css'
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';


class DMCV extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dmcv: [],
            chucnang: [],
            quyen: [],
            vc: [],
            source: [],
            showAlert: false,
            xoalvAlert: false,
            confirm: false,

            newdm: {
                masodanhmuc: 0,
                masolinhvuc:0,
                tendanhmuc: ''

            },
            newlv: {
              
                masolinhvuc: 0,
                tenlinhvuc: ''

            },
            editlvData: {

                masolinhvuc: 0,
                tenlinhvuc: ''

            },
            xoalv: { masolinhvuc: 0, tenlinhvuc: '' },
            addlvModal: false,
            editlvModal: false,

            editData: {
                masodanhmuc: 0,
                masolinhvuc: 0,
                tendanhmuc: ''

            },

            listlv:[],
            xoa: { masodanhmuc: 0, tendanhmuc: '' },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: ''
           
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.xoalv = this.xoalv.bind(this);
        this.deleteDM = this.deleteDM.bind(this);
        this.deleteLV = this.deleteLV.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/dmcongviecs/')
            .then((res) => this.setState({
                dmcv: res.data,
                source: res.data,
            })
        );
        
        axios.get('/lvcongviecs/')
            .then((res) => this.setState({
                listlv: res.data,
                
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

                if (item.tendanhmuc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            dmcv: newArray,
           
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        axios.get('/dmcongviecs/')
            .then((res) => this.setState({
                dmcv: res.data,
                showAlert: false,
                activePage: 1

            }));
        axios.get('/lvcongviecs/')
            .then((res) => this.setState({
                listlv: res.data,

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
    }

    //add

    toggleNewDMModal() {
        this.setState({
            AddModal: !this.state.AddModal,
            
        })
    }
   
    addDM() {
        const ar = [];
        this.state.dmcv.forEach((e) => { ar.push(e.tendanhmuc.trim()) });
        if (ar.includes(this.state.newdm.tendanhmuc)) {
            this.setState({
                errors: "Danh mục đã tồn tại",
            });
        }
        else {
            axios.post('/dmcongviecs/', {
                MASODANHMUC: this.state.newdm.masodanhmuc,
                MASOLINHVUC: this.state.newdm.masolinhvuc,
                TENDANHMUC: this.state.newdm.tendanhmuc,

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm danh mục thành công!");
                this.setState({
                    newdm: {

                        masodanhmuc: 0,
                        masolinhvuc: 0,
                        tendanhmuc:''

                    },
                    errors: '',
                    AddModal: false
                });
                 this.refresh();
              
            })
                .catch((error) => {
                    //console.log(masolinhvuc);
                    console.log(error.response);
                   
                });
            //.catch ((error) => console.log(error.response.request.response) );
        }
    }
    //them lv
    toggleNewLVModal() {
        this.setState({
            addlvModal: !this.state.addlvModal,
           
        })
    }
    addLV() {
        const ar = [];
        this.state.listlv.forEach((e) => { ar.push(e.tenlinhvuc.trim()) });
        if (ar.includes(this.state.newlv.tenlinhvuc)) {
            this.setState({
                errors: "Lĩnh vực đã tồn tại",
            });
        }
        else {
            axios.post('/lvcongviecs/', {
                
                MASOLINHVUC: this.state.newlv.masolinhvuc,
                TENLINHVUC: this.state.newlv.tenlinhvuc,

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm lĩnh vực thành công!");
                this.setState({
                    newlv: {

                        masolinhvuc: 0,
                        tenlinhvuc:''

                    },
                    errors: '',
                    addlvModal: false
                });
                //this.refresh();
            })
                .catch((error) => {
                    console.log(error.response);
                    alert(error);
                });
            //.catch ((error) => console.log(error.response.request.response) );
        }
    }


    //edit dm
    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    edit(masodanhmuc, masolinhvuc, tendanhmuc) {
        this.setState({
            editData: { masodanhmuc, masolinhvuc, tendanhmuc },
            editModal: !this.state.editModal

        });

    }
    updateDM() {
        let { masodanhmuc, masolinhvuc, tendanhmuc } = this.state.editData;
        axios.put('/dmcongviecs/' + this.state.editData.masodanhmuc,
            { masodanhmuc, masolinhvuc, tendanhmuc }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        masodanhmuc: 0,
                        masolinhvuc: 0,
                        tendanhmuc:''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            }).catch((error) => {
                //console.log(masolinhvuc);
                console.log(error.response);

            });;

    }
    //edit lv
    toggleEditLVModal() {
        this.setState({
            editlvModal: !this.state.editlvModal
        })
    }
    
    editlv( masolinhvuc, tenlinhvuc) {
        this.setState({
            editlvData: { masolinhvuc, tenlinhvuc },
            editlvModal: !this.state.editlvModal

        });

    }
   
    updateLV() {
        let { masolinhvuc, tenlinhvuc } = this.state.editlvData;
        axios.put('/lvcongviecs/' + this.state.editlvData.masolinhvuc,
            { masolinhvuc, tenlinhvuc }).then((response) => {

                this.setState({
                    editlvModal: false,
                    editlvData: {
                       
                        masolinhvuc: 0,
                        tenlinhvuc:''
                    },
                });

                alert("Cập nhật thành công!");
                this.refresh();
            });

    }


    //delete dm
    deleteDM = (masodanhmuc) => {
        const apiUrl = '/dmcongviecs/' + Number.parseInt(masodanhmuc.masodanhmuc);
        axios.delete(apiUrl, { masodanhmuc: Number.parseInt(masodanhmuc.masodanhmuc) })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true,
                    xoa: { masodanhmuc: 0, tendanhmuc: '' }
                })
                    //console.log(mavienchuc.mavienchuc);
            }).catch(e => {
                alert("Danh mục đang chứa công việc, không thể xóa !!");
                this.setState({
                    showAlert: false,
                    confirm: false
                });

            });
                }
    handleShowAlert = (masodanhmuc, tendanhmuc) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { masodanhmuc: Number.parseInt(masodanhmuc), tendanhmuc: tendanhmuc }
        });


    }
    //xoa lv
    deleteLV = (masolinhvuc) => {
        const apiUrl = '/lvcongviecs/' + Number.parseInt(masolinhvuc.masolinhvuc);
        axios.delete(apiUrl, { masolinhvuc: Number.parseInt(masolinhvuc.masolinhvuc) })
            .then((res) => {

                this.setState({
                    xoalvAlert: false,
                    confirm: true
                });
                //console.log(mavienchuc.mavienchuc);
            }).catch(e => {
                alert("Lĩnh vực đang chứa danh mục công việc, không thể xóa !!");
                this.setState({
                    xoalvAlert: false,
                    confirm: false
                });

            });
         }
    xoalv = (masolinhvuc, tenlinhvuc) => {
        this.setState({
            xoalvAlert: !this.state.xoalvAlert,
            xoalv: { masolinhvuc: Number.parseInt(masolinhvuc), tenlinhvuc: tenlinhvuc }
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
      
        const { vc, quyen, chucnang, chucdanh, dmcv, listlv  } = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý khoa";
        let cns = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name.toLowerCase())
                cns.push(x.machucnang);
        });
        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">

                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH MỤC / LĨNH VỰC CÔNG VIỆC</b> </p></CardTitle>
                                    <CardTitle>



                                        {(this.state.AddModal == true) ?

                                            <Form>
                                                <Row md="12">
                                                    <Col md="4" style={{ marginTop:'7px' }}>
                                                                <FormGroup>
                                                                    <Label htmlFor="iddonvi">Lĩnh vực</Label>
                                                                    <Input type="select" id="malvdm" value={this.state.newdm.masolinhvuc} onChange={(e) => {
                                                                        let { newdm } = this.state;
                                                                    newdm.masolinhvuc = Number.parseInt(e.target.value); 
                                                                        this.setState({ newdm });
                                                                    }}  >
                                                                        <option value='0' >--Chọn lĩnh vực--</option>
                                                                        {
                                                                            this.state.listlv.map((lv) =>
                                                                                <option key={lv.masolinhvuc} value={lv.masolinhvuc}>{lv.tenlinhvuc}</option>)
                                                                        }
                                                                    </Input>
                                                            </FormGroup>
                                                    </Col>

                                                            <Col md="3">
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Tên danh mục : </Label>
                                                                    <Input id="tendm" value={this.state.newdm.tendanhmuc} onChange={(e) => {
                                                                        let { newdm } = this.state;
                                                                        newdm.tendanhmuc = e.target.value;
                                                                        this.setState({ newdm });
                                                                    }} required />
                                                                    {(errors) ?
                                                                        <Alert color="warning">{errors}</Alert>
                                                                        :
                                                                        null
                                                                    }
                                                                </FormGroup>

                                                    </Col>
                                             
                                                            


                                                           
                                                        
                                                        
                                                    <Col md="3" style={{  marginTop: '30px' }}>
                                               
                                                        <Button style={{ width: '80px' }} disabled={!(this.state.newdm.tendanhmuc.length > 0 && this.state.newdm.masolinhvuc.length != 0)} color="primary" onClick={this.addDM.bind(this)}>Lưu</Button> {' '} &nbsp;
                                                        <Button style={{ width: '80px' }} color="danger" onClick={this.toggleNewDMModal.bind(this)}>Đóng</Button>
                                                    </Col>

                                                </Row>
                                            </Form>
                                                
                                            :
                                            (this.state.addlvModal == true) ?
                                                <Form>
                                                    <Row md="12">
                                                       

                                                        <Col md="3">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Tên lĩnh vực : </Label>
                                                                <Input id="lvuc" value={this.state.newlv.tenlinhvuc} onChange={(e) => {
                                                                    let { newlv } = this.state;
                                                                    newlv.tenlinhvuc = e.target.value;
                                                                    this.setState({ newlv });
                                                                }} required />
                                                                {(errors) ?
                                                                    <Alert color="warning">{errors}</Alert>
                                                                    :
                                                                    null
                                                                }
                                                            </FormGroup>

                                                        </Col>







                                                        <Col md="3" style={{ marginTop: '30px' }}>

                                                            <Button style={{ width: '80px' }} disabled={!(this.state.newlv.tenlinhvuc.length > 0)} color="primary" onClick={this.addLV.bind(this)}>Lưu</Button> {' '} &nbsp;
                                                        <Button style={{ width: '80px' }} color="danger" onClick={this.toggleNewLVModal.bind(this)}>Đóng</Button>
                                                        </Col>

                                                    </Row>
                                                   
                                                </Form>:
                                            <Row md="12">
                                              
                                                <Col md="6" style={{paddingLeft: '250px'}}>
                                                    <Search
                                                        valueSearch={this.state.valueSearch}
                                                        handleSearch={this.handleSearch} />
                                                </Col>
                                            </Row>
                                        }



                                    </CardTitle>


                                </CardHeader>
                                <Tabs>
                                    <CardBody>
                                    <TabList>

                                        <Tab>Danh mục công việc</Tab>
                                        <Tab>Lĩnh vực công việc</Tab>

                                    </TabList>
                                 
                                   
                                        <TabPanel>
                                   
                                       
                                            <Row>
                                                {(rules.find(x => x == cns)) ?
                                                    <Col md="2">
                                                        <Button color="light" onClick={this.toggleNewDMModal.bind(this)} style={{ width: '80px', color: '#1E8ECF', marginLeft:'400px' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                    </Col>
                                                    : null
                                                }
                                          
                                                </Row>
                                    <Table className="table table-hover">
                                       
                                        <thead className="text-primary">
                                            <tr>
                                                <th>STT</th>

                                               
                                                <th>Tên danh mục</th>
                                                <th>Tên lĩnh vực</th>

                                                        {

                                                            (rules.find(x => x == cns)) ?
                                                                <th>Thao tác</th>
                                                                : null
                                                        }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dmcv.map((emp, index) => {
                                                    return (
                                                        <tr key={emp.masodanhmuc}>
                                                            <td>{index + 1}</td>
                                                            <td>{emp.tendanhmuc}</td>
                                                            <td>{emp.tenlinhvuc}</td>
                                                            {

                                                                (rules.find(x => x == cns)) ?


                                                                    <td>
                                                                        <Button color="default" onClick={this.edit.bind(this, emp.masodanhmuc, emp.masolinhvuc, emp.tendanhmuc)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
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
                                                                                            <Label htmlFor="LV">Lĩnh vực<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input type="select" id="lv" value={this.state.editData.masolinhvuc} onChange={(e) => {
                                                                                                let { editData } = this.state;
                                                                                                editData.masolinhvuc = Number.parseInt(e.target.value);
                                                                                                this.setState({ editData });
                                                                                            }} required >
                                                                                                <option value='0' >--Chọn lĩnh vực--</option>
                                                                                                {
                                                                                                    this.state.listlv.map((lv) =>
                                                                                                        <option key={lv.masolinhvuc} value={lv.masolinhvuc}>{lv.tenlinhvuc}</option>)
                                                                                                }
                                                                                            </Input>
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>
                                                                                <Row>
                                                                                    <Col md="12">
                                                                                        <FormGroup>
                                                                                            <Label htmlFor="DM">Tên danh mục<strong className="text-danger">(*) </strong></Label>
                                                                                            <Input id="dm" value={this.state.editData.tendanhmuc} onChange={(e) => {
                                                                                                let { editData } = this.state;
                                                                                                editData.tendanhmuc = e.target.value;
                                                                                                this.setState({ editData });
                                                                                            }} />
                                                                                        </FormGroup>
                                                                                    </Col>
                                                                                </Row>










                                                                            </ModalBody>
                                                                            <ModalFooter>
                                                                                <Button color="primary" disabled={!(this.state.editData.tendanhmuc.length > 0)} onClick={this.updateDM.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                                <Button color="danger" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                            </ModalFooter>

                                                                        </Modal>
                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhmuc, emp.tendanhmuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
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

                                                                            onConfirm={() => this.deleteDM({ masodanhmuc: this.state.xoa.masodanhmuc })}

                                                                            onCancel={() => this.setState({ showAlert: false })}
                                                                            focusCancelBtn
                                                                        >  {"Danh mục  " + this.state.xoa.tendanhmuc + " sẽ bị xóa khỏi hệ thống"}
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
                                           
                                            </TabPanel>
                                               
                                       <TabPanel>
                                      
                                            <Row>
                                                {(rules.find(x => x == cns)) ?
                                                    <Col md="2">
                                                        <Button color="light" onClick={this.toggleNewLVModal.bind(this)} style={{ width: '80px', color: '#1E8ECF', marginLeft: '280px' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                    </Col>
                                                    : null
                                                }
                                              
                                                </Row>
                                    <Table className="table table-hover">
                                      
                                        <thead className="text-primary">
                                            <tr>
                                                <th>STT</th>

                                                <th>Tên lĩnh vực</th>
                                               

                                                        {(rules.find(x => x == cns)) ?
                                                            <th>Thao tác</th> : null}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                listlv.map((lv, index) => {
                                                    return (
                                                        <tr key={lv.masolinhvuc}>
                                                            <td>{index + 1}</td>
                                                           
                                                            <td>{lv.tenlinhvuc}</td>
                                                            {(rules.find(x => x == cns)) ?
                                                            <td>
                                                                <Button color="default" onClick={this.editlv.bind(this, lv.masolinhvuc, lv.tenlinhvuc)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;
                                                                 <Modal isOpen={this.state.editlvModal} toggle={this.toggleEditLVModal.bind(this)} style={{ width: '500px' }}>

                                                                    <ModalHeader toggle={this.toggleEditLVModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>
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
                                                                                    <Label htmlFor="telinhvuc">Tên lĩnh vực<strong className="text-danger">(*) </strong></Label>
                                                                                    <Input id="telinhvuc" required value={this.state.editlvData.tenlinhvuc} onChange={(e) => {
                                                                                        let { editlvData } = this.state;
                                                                                        editlvData.tenlinhvuc = e.target.value;
                                                                                        this.setState({ editlvData });
                                                                                    }} />
                                                                                </FormGroup>
                                                                            </Col>
                                                                        </Row>
                                                                        










                                                                    </ModalBody>
                                                                    <ModalFooter>
                                                                        <Button color="primary" disabled={!(this.state.editlvData.tenlinhvuc.length > 0)} onClick={this.updateLV.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                        <Button color="danger" onClick={this.toggleEditLVModal.bind(this)}>Hủy bỏ</Button>
                                                                    </ModalFooter>

                                                                </Modal>
                                                                <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.xoalv.bind(this, lv.masolinhvuc, lv.tenlinhvuc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                <SweetAlert
                                                                    show={this.state.xoalvAlert}
                                                                    warning
                                                                    showCancel

                                                                    showCloseButton
                                                                    confirmBtnText="Đồng ý"
                                                                    confirmBtnBsStyle="danger"
                                                                    cancelBtnText="Không"
                                                                    cancelBtnBsStyle="light"
                                                                    title="Bạn có chắc chắn không?"

                                                                    onConfirm={() => this.deleteLV({ masolinhvuc: this.state.xoalv.masolinhvuc })}

                                                                    onCancel={() => this.setState({ xoalvAlert: false })}
                                                                    focusCancelBtn
                                                                >  {"Lĩnh vực  " + this.state.xoalv.tenlinhvuc + " sẽ bị xóa khỏi hệ thống"}
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
                                                            :null
                                                            }

                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                            </Table>
                                       
                                            </TabPanel>
                                        
                                 
                                  
                                    </CardBody>
                                </Tabs>

                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );

    }
}

export default DMCV;