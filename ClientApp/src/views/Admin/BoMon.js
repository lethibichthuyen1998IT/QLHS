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


class Bomon extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            bomon: [],
            chucnang: [],
            quyen: [],
            vc: [],
            source: [],
            showAlert: false,
            confirm: false,

            newbm: {
                mabomon: '',
                makhoa:'CIT',
                tenbomon: ''
               

            },
            editData: {
                mabomon: 'CIT',
                makhoa: '',
                tenbomon: ''

            },


            xoa: {
                mabomon: '',
                tenbomon: ''

            },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: '',
            listKhoa:[],
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteBM = this.deleteBM.bind(this);

    }



    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/bomons/')
            .then((res) => this.setState({
                bomon: res.data,
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
        axios.get('/khoas/')
            .then((res) => this.setState({
                listKhoa: res.data,

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

                if (item.tenbomon.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.mabomon.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            bomon: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        axios.get('/bomons/')
            .then((res) => this.setState({
                bomon: res.data,
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
        axios.get('/khoas/')
            .then((res) => this.setState({
                listKhoa: res.data,

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
    addBM() {
        const ar = [];
        this.state.bomon.forEach((e) => { ar.push(e.mabomon.trim()) });
        if (ar.includes(this.state.newbm.mabomon)) {
            this.setState({
                errors: "Bộ môn đã tồn tại",
            });
        }
        else {
            axios.post('/bomons/', {
                MABOMON: this.state.newbm.mabomon,
                MAKHOA: this.state.newbm.makhoa,
                TENBOMON: this.state.newbm.tenbomon,
                
            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm bộ môn thành công!");
                this.setState({
                    newcd: {
                        makhoa:'CIT',
                        mabomon: '',
                        tenbomon: ''
                      

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
    toggleEditModal(makhoa, mabomon, tenbomon) {
        this.setState({
            editModal: !this.state.editModal,
            editData: { makhoa, mabomon, tenbomon }
        })
    }
    toggleDong() {
        this.setState({
            editModal: !this.state.editModal
          
        })
    }
   
    updateBM() {
        let { makhoa,mabomon, tenbomon } = this.state.editData;
        axios.put('/bomons/' + this.state.editData.mabomon,
            { makhoa, mabomon, tenbomon  }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        makhoa:'CIT',
                        mabomon: '',
                        tenbomon: ''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteBM = (mabomon) => {
        const apiUrl = '/bomons/' + mabomon.mabomon;
        axios.delete(apiUrl, { mabomon: mabomon.mabomon })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                }).catch(e => {
                    alert("Không thể xóa chức danh này");
                    this.setState({
                        showAlert: false,
                        confirm: false
                    });
                    //console.log(mavienchuc.mavienchuc);
                });
            });

    }
    handleShowAlert = (mabomon, tenbomon) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { mabomon: mabomon, tenbomon: tenbomon }
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
        const { vc, quyen, chucnang, bomon } = this.state;
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH BỘ MÔN</b> </p></CardTitle>
                                    <CardTitle>






                                      
                                         

                                            {(this.state.AddModal === true) ?
                                            <Form>
                                               
                                                <Row md="12">
                                                    
                                                  
                                                    <Col md="3">
                                                                        <FormGroup>
                                                                            <Label htmlFor="hoten">Mã bộ môn: </Label>
                                                                            <Input id="tenchucvu" value={this.state.newbm.mabomon} onChange={(e) => {
                                                                                let { newbm } = this.state;
                                                                                newbm.mabomon = e.target.value;
                                                                                this.setState({ newbm });
                                                                            }}  />

                                                                </FormGroup>
                                                    </Col>
                                                   
                                                    <Col md="4" >
                                                                   
                                                              
                                                                <FormGroup>
                                                                    <Label htmlFor="hoten">Tên bộ môn: </Label>
                                                                    <Input id="tenchucvu" value={this.state.newbm.tenbomon} onChange={(e) => {
                                                                        let { newbm } = this.state;
                                                                        newbm.tenbomon = e.target.value;
                                                                        this.setState({ newbm });
                                                                    }}  />

                                                        </FormGroup>
                                                    </Col>
                                         








                                      
                                                            
                                                                
                                                           
                                                    <Col md="3" style={{ marginTop: '30px' }}>
                                                        <Button color="primary" style={{ width: '80px' }} disabled={!(this.state.newbm.mabomon.length > 0 && this.state.newbm.tenbomon.length > 0)} onClick={this.addBM.bind(this)}>Lưu</Button>{' '}
                                                             
                                                        <Button color="danger" style={{ width: '80px' }} onClick={this.toggleNewVienChucModal.bind(this)}>Đóng</Button>
                                                    </Col></Row>
                                            </Form>
                                              

                                                : 
                                              

                                            <Row md="12">
                                                {(rules.find(x => x == cns)) ?
                                                    <Col md="2">
                                                        <Button color="light" onClick={this.toggleNewVienChucModal.bind(this)} style={{ width: '80px', color: '#1E8ECF' }}><i style={{ fontSize: '50px' }} class="fa fa-plus-circle" aria-hidden="true" ></i></Button>
                                                    </Col> : null}

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
                                    <Table id="dataTable" className="table table-hover">
                                        <thead className="text-primary">
                                            <tr>
                                                <th>STT</th>
                                                <th>Mã bộ môn</th>
                                                <th>Tên bộ môn</th>
                                                {
                                                    (rules.find(x => x == cns)) ?
                                                        <th>Thao tác</th> : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                bomon.map((emp, index) => {
                                                    return (

                                                        <tr key={emp.mabomon}>
                                                            <td>{index + 1}</td>
                                                            <td>{emp.mabomon}</td>
                                                            <td>{emp.tenbomon}</td>

                                                            {
                                                                (rules.find(x => x == cns)) ?
                                                                    <td>

                                                                        <Button color="default" onClick={this.toggleEditModal.bind(this,emp.makhoa,emp.mabomon, emp.tenbomon)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;


                                                                  
                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mabomon, emp.tenbomon)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>

                                                                       
                                                                    </td> : null
                                                            }
                                                           
                                                        </tr>
                                                    )
                                                })
                                            }
                                            <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.makhoa, this.state.editData.mabomon, this.state.editData.tenbomon)}>
                                                <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.makhoa, this.state.editData.mabomon, this.state.editData.tenbomon)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', paddingLeft: '100px', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>
                                                <ModalBody>

                                                    <Form>
                                                        <FormGroup>
                                                            <Label for="tencn">Mã khoa</Label>
                                                            <Input id="tencn" value={this.state.editData.makhoa} onChange={(e) => {
                                                                let { editData } = this.state;
                                                                editData.mabomon = e.target.value;
                                                                this.setState({ editData });
                                                            }} disabled />
                                                        </FormGroup>

                                                        <FormGroup>
                                                            <Label for="tencn">Mã bộ môn</Label>
                                                            <Input id="tencn" value={this.state.editData.mabomon} onChange={(e) => {
                                                                let { editData } = this.state;
                                                                editData.mabomon = e.target.value;
                                                                this.setState({ editData });
                                                            }} />
                                                        </FormGroup>
                                                    </Form>
                                                    <Form>

                                                        <FormGroup>
                                                            <Label for="tencn">Tên bộ môn</Label>
                                                            <Input id="tencn" value={this.state.editData.tenbomon} onChange={(e) => {
                                                                let { editData } = this.state;
                                                                editData.tenbomon = e.target.value;
                                                                this.setState({ editData });
                                                            }} />
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={!(this.state.editData.mabomon.length > 0 && this.state.editData.tenbomon.length > 0)} onClick={this.updateBM.bind(this)}>Thực hiện lưu</Button>
                                                    <Button color="secondary" onClick={this.toggleDong.bind(this)}>Hủy bỏ</Button>
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

                                                onConfirm={() => this.deleteBM({ mabomon: this.state.xoa.mabomon })}

                                                onCancel={() => this.setState({ showAlert: false })}
                                                focusCancelBtn
                                            >  {"Chức vụ  " + this.state.xoa.tenbomon + " sẽ bị xóa khỏi hệ thống"}
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

export default Bomon;