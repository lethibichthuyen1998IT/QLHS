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
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';


class Chucdanh extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            chucdanh: [],
            chucnang: [],
            quyen: [],
            vc: [],
            source: [],
            showAlert: false,
            confirm: false,

            newcd: {
                machucdanh:'',
                tenchucdanh: '',
                hangchucdanh:''

            },
            editData: {
                machucdanh: '',
                tenchucdanh: '',
                hangchucdanh: ''

            },


            xoa: {
                machucdanh: '',
                tenchucdanh: ''
                
            },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: ''
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteCD = this.deleteCD.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/chucdanhs/')
            .then((res) => this.setState({
                chucdanh: res.data,
                source: res.data,
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

                if (item.tenchucdanh.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hangchucdanh.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            chucdanh: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        axios.get('/chucdanhs/')
            .then((res) => this.setState({
                chucdanh: res.data,
                showAlert: false,
                activePage: 1

            }));
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

    toggleNewVienChucModal() {
        this.setState({
            AddModal: !this.state.AddModal
        })
    }
    addCD() {
        const ar = [];
        this.state.chucdanh.forEach((e) => { ar.push(e.machucdanh.trim()) });
        if (ar.includes(this.state.newcd.machucdanh)) {
            this.setState({
                errors: "Chức danh đã tồn tại",
            });
        }
        else {
            axios.post('/chucdanhs/', {
                MACHUCDANH: this.state.newcd.machucdanh,
                TENCHUCDANH: this.state.newcd.tenchucdanh,
                HANGCHUCDANH: this.state.newcd.hangchucdanh

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm chức danh thành công!");
                this.setState({
                    newcd: {

                        machucdanh: '',
                        tenchucdanh:'',
                        hangchucdanh: '',

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


    //edit
    toggleEditModal(machucdanh, tenchucdanh, hangchucdanh) {
        this.setState({
            editData: { machucdanh, tenchucdanh, hangchucdanh },
            editModal: !this.state.editModal
        })
    }
    toggleDong() {
        this.setState({
           
            editModal: !this.state.editModal
        })
    }
    updateCD() {
        let { machucdanh, tenchucdanh, hangchucdanh } = this.state.editData;
        axios.put('/chucdanhs/' + this.state.editData.machucdanh,
            { machucdanh, tenchucdanh, hangchucdanh }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        machucdanh: '',
                        tenchucdanh: '',
                        hangchucdanh:''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteCD = (machucdanh) => {
        const apiUrl = '/chucdanhs/' + machucdanh.machucdanh;
        axios.delete(apiUrl, { machucdanh: machucdanh.machucdanh })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: false
                });
                }).catch(e => {
                    alert("Không thể xóa chức danh này");
                    this.setState({
                        showAlert: false,
                        confirm: false
                    });
                //console.log(mavienchuc.mavienchuc);
                });
           

    }
    handleShowAlert = (machucdanh, tenchucdanh) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { machucdanh: machucdanh, tenchucdanh: tenchucdanh }
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
        const { vc, quyen, chucnang, chucdanh } = this.state;
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH CHỨC DANH</b> </p></CardTitle>
                                    <CardTitle>



                                  
                                        <Row md="12">
                                            {(rules.find(x => x == cns)) ?
                                                <Col md="2">
                                                    <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                </Col> : null
                                            }
                                                <Col md="4">
                                                    <Search
                                                        valueSearch={this.state.valueSearch}
                                                        handleSearch={this.handleSearch} />
                                                </Col>
                                            </Row>
                                        



                                    </CardTitle>

                                    <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} style={{ width: '500px' }}>

                                        <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>THÊM MỚI CHỨC DANH</b></p></ModalHeader>

                                        
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
                                                <Label htmlFor="hoten">Mã chức danh: </Label>
                                                <Input id="tenchucvu" value={this.state.newcd.machucdanh} onChange={(e) => {
                                                        let { newcd } = this.state;
                                                        newcd.machucdanh = e.target.value;
                                                        this.setState({ newcd });
                                                }} required />

                                                    </FormGroup>
                                                    </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Tên chức danh: </Label>
                                                    <Input id="tenchucvu" value={this.state.newcd.tenchucdanh} onChange={(e) => {
                                                        let { newcd } = this.state;
                                                        newcd.tenchucdanh = e.target.value;
                                                        this.setState({ newcd });
                                                    }} required />

                                                    </FormGroup>
                                                    </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                <FormGroup>
                                                    <Label htmlFor="hoten">Hạng chức danh: </Label>
                                                    <Input id="tenchucvu" type="select" value={this.state.newcd.hangchucdanh} onChange={(e) => {
                                                        let { newcd } = this.state;
                                                        newcd.hangchucdanh = e.target.value;
                                                        this.setState({ newcd });
                                                    }} required >
                                                        <option value='I'>I</option>
                                                        <option value='II'>II </option>
                                                        <option value='III'>III </option>
                                                        <option value='IV'>IV </option>
                                                       
                                                      
                                                        </Input>

                                                    </FormGroup>
                                                    </Col>
                                                </Row>
                                              


                                              
                                              
                                           
                                           
                                        

                                            </ModalBody>
                                            
                                        <ModalFooter>
                                            <Button color="primary" disabled={!(this.state.newcd.machucdanh.length != 0 && this.state.newcd.tenchucdanh.length != 0 )} onClick={this.addCD.bind(this)}>Thực hiện lưu</Button>{' '}
                                            <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                        </ModalFooter>

                                    </Modal>
                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover" style={{ width: '700px', marginLeft: '150px' }}>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>STT</th>

                                                <th>Mã chức danh</th>
                                                <th>Tên chức danh</th>
                                                <th>Hạng chức chức danh</th>


                                                {
                                                    (rules.find(x => x == cns)) ?
                                                        <th>Thao tác</th> : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                chucdanh.map((emp, index) => {
                                                    return (
                                                        <tr key={emp.machucdanh}>
                                                            <td>{index + 1}</td>
                                                            <td>{emp.machucdanh}</td>
                                                            <td>{emp.tenchucdanh}</td>
                                                            <td>{emp.hangchucdanh}</td>
                                                            {(rules.find(x => x == cns)) ?
                                                                <td>

                                                                    <Button color="default" onClick={this.toggleEditModal.bind(this, emp.machucdanh, emp.tenchucdanh, emp.hangchucdanh)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                              
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.machucdanh, emp.tenchucdanh)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>


                                                                 


                                                                </td>
                                                                : null
                                                            }

                                                        </tr>
                                                    )
                                                })
                                            }
                                            <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.machucdanh, this.state.editData.tenchucdanh, this.state.editData.hangchucdanh)} style={{ width: '500px' }}>

                                                <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.machucdanh, this.state.editData.tenchucdanh, this.state.editData.hangchucdanh)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                <Label htmlFor="hoten">Mã chức danh<strong className="text-danger">(*) </strong></Label>
                                                                <Input id="hoten" required value={this.state.editData.machucdanh} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.machucdanh = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Tên chức danh<strong className="text-danger">(*) </strong></Label>
                                                                <Input id="hoten" required value={this.state.editData.tenchucdanh} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.tenchucdanh = e.target.value;
                                                                    this.setState({ editData });
                                                                }} />
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col md="12">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Hạng chức danh: </Label>
                                                                <Input id="tenchucvu" type="select" value={this.state.editData.hangchucdanh.trim()} onChange={(e) => {
                                                                    let { editData } = this.state;
                                                                    editData.hangchucdanh = e.target.value;
                                                                    this.setState({ editData });
                                                                }}  >
                                                                    <option value='I'>I</option>
                                                                    <option value='II'>II </option>
                                                                    <option value='III'>III </option>
                                                                    <option value='IV'>IV </option>


                                                                </Input>

                                                            </FormGroup>
                                                        </Col>
                                                    </Row>





                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={!(this.state.editData.machucdanh.length > 0 && this.state.editData.tenchucdanh.length > 0 && this.state.editData.hangchucdanh.length > 0)} onClick={this.updateCD.bind(this)}>Thực hiện lưu</Button>{' '}
                                                    <Button color="danger" onClick={this.toggleDong.bind(this)}>Hủy bỏ</Button>
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

                                                onConfirm={() => this.deleteCD({ machucdanh: this.state.xoa.machucdanh })}

                                                onCancel={() => this.setState({ showAlert: false })}
                                                focusCancelBtn
                                            >  {"Chức danh  " + this.state.xoa.tenchucdanh + " sẽ bị xóa khỏi hệ thống"}
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

                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );

    }
}

export default Chucdanh;