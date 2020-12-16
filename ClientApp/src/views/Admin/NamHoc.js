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


class Namhoc extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            namhoc: [],
            source: [],
            showAlert: false,
            confirm: false,
            chucnang: [],
            quyen: [],
            vc: [],

            newnh: {
                
                tennamhoc: ''

            },
            editData: {
                manamhoc: '',
                tennamhoc: ''

            },


            xoa: {
                manamhoc: '',
                tennamhoc: '' },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: ''
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteNH = this.deleteNH.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/namhocs/')
            .then((res) => this.setState({
                namhoc: res.data,
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

                if (item.tennamhoc.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            namhoc: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        axios.get('/namhocs/')
            .then((res) => this.setState({
                namhoc: res.data,
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
    addNH() {
        const ar = [];
        this.state.namhoc.forEach((e) => { ar.push(e.tennamhoc.trim()) });
        if (ar.includes(this.state.newnh.tennamhoc)) {
            this.setState({
                errors: "Năm học đã tồn tại",
            });
        }
        else {
            axios.post('/namhocs/', {
                
                TENNAMHOC: this.state.newnh.tennamhoc,

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm năm học thành công!");
                this.setState({
                    newnh: {

                      
                        tennamhoc: '',

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
    toggleEditModal() {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    edit(manamhoc, tennamhoc) {
        this.setState({
            editData: { manamhoc, tennamhoc },
            editModal: !this.state.editModal

        });

    }
    updateNH() {
        let { manamhoc, tennamhoc } = this.state.editData;
        axios.put('/namhocs/' + this.state.editData.manamhoc,
            { manamhoc, tennamhoc }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        manamhoc: '',
                        tennamhoc: ''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteNH = (manamhoc) => {
        const apiUrl = '/namhocs/' + manamhoc.manamhoc;
        axios.delete(apiUrl, { manamhoc: manamhoc.manamhoc })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                })
                //console.log(mavienchuc.mavienchuc);
            }).catch(e => {
                alert("Năm học này có dữ liệu, không thể xóa !!!");
                this.setState({
                    showAlert: false,
                    confirm: false
                });
            });
    }
    handleShowAlert = (manamhoc, tennamhoc) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { manamhoc: manamhoc, tennamhoc: tennamhoc }
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
        const { vc, quyen, chucnang, chucdanh,namhoc } = this.state;
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH NĂM HỌC</b> </p></CardTitle>
                                    <CardTitle>



                                        {(this.state.AddModal == true) ?

                                            <Form>
                                                <Table>
                                                    <tr>
                                                        <td width="250px">
                                                            <FormGroup>
                                                                <Label htmlFor="hoten">Năm học: </Label>
                                                                <Input id="machucvu" value={this.state.newnh.tennamhoc} onChange={(e) => {
                                                                    let { newnh } = this.state;
                                                                    newnh.tennamhoc = e.target.value;
                                                                    this.setState({ newnh });
                                                                }} required />
                                                                {(errors) ?
                                                                    <Alert color="warning">{errors}</Alert>
                                                                    :
                                                                    null
                                                                }
                                                            </FormGroup>
                                                        </td>
                                                       


                                                        <td style={{ paddingRight: '200px', paddingTop: '40px' }}>
                                                            <Button style={{ width: '80px' }} color="primary" onClick={this.addNH.bind(this)}>Lưu</Button>  <Button style={{ width: '80px' }} color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Đóng</Button>

                                                        </td>
                                                    </tr>
                                                </Table>
                                            </Form>
                                            :
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
                                        }



                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    <Table className="table table-hover" style={{ width: '700px', marginLeft: '150px' }}>
                                        <thead className="text-primary">
                                            <tr>
                                                <th>STT</th>

                                                
                                                <th>Năm học</th>

                                                {(rules.find(x => x == cns)) ?
                                                    <th>Thao tác</th>
                                                    : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                namhoc.map((emp, index) => {
                                                    return (
                                                        <tr key={emp.manamhoc}>
                                                            <td>{index + 1}</td>
                                                         
                                                            <td>{emp.tennamhoc}</td>
                                                            {(rules.find(x => x == cns)) ?
                                                                <td>
                                                                    <Button color="default" onClick={this.edit.bind(this, emp.manamhoc, emp.tennamhoc)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
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
                                                                                        <Label htmlFor="hoten">Năm học<strong className="text-danger">(*) </strong></Label>
                                                                                        <Input id="hoten" required value={this.state.editData.tennamhoc} onChange={(e) => {
                                                                                            let { editData } = this.state;
                                                                                            editData.tennamhoc = e.target.value;
                                                                                            this.setState({ editData });
                                                                                        }} />
                                                                                    </FormGroup>
                                                                                </Col>
                                                                            </Row>










                                                                        </ModalBody>
                                                                        <ModalFooter>
                                                                            <Button color="primary" disabled={!(this.state.editData.tennamhoc.length > 0)} onClick={this.updateNH.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                            <Button color="danger" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                        </ModalFooter>

                                                                    </Modal>
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.manamhoc, emp.tennamhoc)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
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

                                                                        onConfirm={() => this.deleteNH({ manamhoc: this.state.xoa.manamhoc })}

                                                                        onCancel={() => this.setState({ showAlert: false })}
                                                                        focusCancelBtn
                                                                    >  {"Năm học " + this.state.xoa.tennamhoc + " sẽ bị xóa khỏi hệ thống"}
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

                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );

    }
}

export default Namhoc;