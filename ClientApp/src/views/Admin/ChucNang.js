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


class Chucnang extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            chucnang: [],
            quyen:[],
            source: [],
            vc:[],
            showAlert: false,
            confirm: false,

            newcn: {
               tenchucnang:''

            },
            editData: {
                machucnang: '',
                tenchucnang: ''
              

            },


            xoa: {
                machucnang: '',
                tenchucnang: ''

            },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: ''
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteCN = this.deleteCN.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach
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
                source: res.data,
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

                if (item.tenchucnang.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            chucnang: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
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
                showAlert: false,
                activePage: 1

            }));
    }

    //add

    toggleNewchucnangModal() {
        this.setState({
            AddModal: !this.state.AddModal
        })
    }
    addCN() {
        const ar = [];
        this.state.chucnang.forEach((e) => { ar.push(e.tenchucnang.trim()) });
        if (ar.includes(this.state.newcn.machucnang)) {
            this.setState({
                errors: "Chức năng đã tồn tại",
            });
        }
        else {
            axios.post('/chucnangs/', {
               
                TENCHUCNANG: this.state.newcn.tenchucnang
               
            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm chức năng thành công!");
                this.setState({
                    newcn: {

                       
                        tenchucnang: ''
                       

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
    edit(machucnang, tenchucnang) {
        this.setState({
            editData: { machucnang, tenchucnang },
            editModal: !this.state.editModal

        });

    }
    updateCN() {
        let { machucnang, tenchucnang } = this.state.editData;
        axios.put('/chucnangs/' + this.state.editData.machucnang,
            { machucnang, tenchucnang }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        machucnang: '',
                        tenchucnang: ''
                       
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteCN = (machucnang) => {
        const apiUrl = '/chucnangs/' + machucnang.machucnang;
        axios.delete(apiUrl, { machucnang: machucnang.machucnang })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                });
                //console.log(mavienchuc.mavienchuc);
            }).catch(e => {
                alert("Tồn tại chức vụ đang có chức năng này, không thể xóa !!");
                this.setState({
                    showAlert: false,
                    confirm: false
                });
            });

    }
    handleShowAlert = (machucnang, tenchucnang) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { machucnang: machucnang, tenchucnang: tenchucnang }
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
        const { vc, quyen, chucnang } = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý chức năng";
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH CHỨC NĂNG</b> </p></CardTitle>
                                    <CardTitle>

                                      
                                          
                                        
                                       
                                      
                                        <Row md="12">
                                            {(rules.find(x => x == cns)) ?
                                                <Col md="2">
                                                    <Button color="light" onClick={this.toggleNewchucnangModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                </Col>
                                                : null
                                            }

                                        {(this.state.AddModal === true) ?
                                            <Form className="form-inline">
                                                    <Table>
                                                        <tr>
                                                            <td width="250px">
                                                    <FormGroup>
                                                        <Input value={this.state.newcn.tenchucnang} onChange={(e) => {
                                                            let { newcn } = this.state;
                                                            newcn.tenchucnang = e.target.value;
                                                            this.setState({ newcn });
                                                        }}
                                                            placeholder="Nhập chức năng" />
                                                                </FormGroup>
                                                            </td>
                                               <td>
                                                    <Button color="primary" disabled={!(this.state.newcn.tenchucnang.length > 0)} onClick={this.addCN.bind(this)}>Thực hiện lưu</Button>{' '}</td>
                                                    <td><Button color="danger" onClick={this.toggleNewchucnangModal.bind(this)}>Hủy bỏ</Button>
                                                        </td>
                                                        </tr>
                                                        </Table>
                                            </Form>
                                       
                                                :
                                                <Col md="4">
                                                    <Search
                                                        valueSearch={this.state.valueSearch}
                                                        handleSearch={this.handleSearch} />
                                                </Col>
                                            
                                               
                                            }
                                            
                                        </Row>
                                </CardTitle>


                            </CardHeader>
                            <CardBody>
                                <Table id="dataTable" className="table table-hover">
                                    <thead className="text-primary">
                                        <tr>
                                            <th>STT</th>
                                            <th>Chức năng</th>
                                            {
                                                (rules.find(x => x == cns)) ?
                                                    <th>Thao tác</th> : null
                                            }
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            chucnang.map((cn,index) => {
                                                return (

                                                    <tr key={cn.machucnang}>
                                                        <td>{index+1}</td>
                                                        <td>{cn.tenchucnang}</td>

                                                        {
                                                            (rules.find(x => x == cns)) ?
                                                                <td>

                                                                    <Button color="default" onClick={this.edit.bind(this, cn.machucnang, cn.tenchucnang)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                   

                                                                    <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)}>
                                                                        <ModalHeader toggle={this.toggleEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>
                                                                        <ModalBody>
                                                                            <Form>

                                                                                <FormGroup>
                                                                                    <Label for="tencn">Chức năng</Label>
                                                                                    <Input id="tencn" value={this.state.editData.tenchucnang} onChange={(e) => {
                                                                                        let { editData } = this.state;
                                                                                        editData.tenchucnang = e.target.value;
                                                                                        this.setState({ editData });
                                                                                    }} />
                                                                                </FormGroup>
                                                                            </Form>
                                                                        </ModalBody>
                                                                        <ModalFooter>
                                                                            <Button color="primary" disabled={!(this.state.editData.tenchucnang.length > 0)} onClick={this.updateCN.bind(this)}>Thực hiện lưu</Button>
                                                                            <Button color="secondary" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                                        </ModalFooter>
                                                                    </Modal>
                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, cn.machucnang, cn.tenchucnang)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                    
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

                                                                        onConfirm={() => this.deleteCN({ machucnang: this.state.xoa.machucnang })}

                                                                        onCancel={() => this.setState({ showAlert: false })}
                                                                        focusCancelBtn
                                                                    >  {"Chức vụ  " + this.state.xoa.tenchucnang + " sẽ bị xóa khỏi hệ thống"}
                                                                    </SweetAlert>
                                                                    <SweetAlert
                                                                        show={this.state.confirm}
                                                                        success
                                                                        confirmBtnText="Đồng ý"
                                                                        confirmBtnBsStyle="primary"
                                                                        onConfirm={() => this.handleConfirm()}


                                                                    >  Đã xóa thành công !!!
                                                                </SweetAlert>
                                                                </td> : null
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

export default Chucnang;