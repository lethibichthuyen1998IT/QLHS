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
import { TextareaAutosize } from '@material-ui/core';


class Thongbao extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            thongbao: [],
            source: [],
            vc: [],
            quyen: [],
            chucnang: [],
            showAlert: false,
            confirm: false,

            newtb: {
                mathongbao: '',
                makhoa: 'CIT',
                tieudethongbao: '',
                noidungthongbao: '',
                filethongbao:''

            },
            editData: {
                mathongbao: '',
                makhoa: 'CIT',
                tieudethongbao: '',
                noidungthongbao: '',
                filethongbao: ''

            },


            xoa: {
                mathongbao: '',
                tieudethongbao: ''

            },
            listKhoa:[],
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: '',
            selectedFile: '',
            progress: 0,
            status: ''
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteTB = this.deleteTB.bind(this);

    }



    //load
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        //hien thi danh sach
        axios.get('/thongbaos/')
            .then((res) => this.setState({
                thongbao: res.data,
                source: res.data,
            })
        );
        axios.get('/khoas/')
            .then((res) => this.setState({
                listKhoa: res.data,
               
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

                if (item.tieudethongbao.toLowerCase().indexOf(search.toLowerCase()) > -1 ) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            thongbhao: newArray,
            valueSearch: search
        });
    }

    //them file
    selectFileHandler = (event) => {
        const fileTypes = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document','pdf'];
        let file = event.target.files;
        console.log(`File ${file}`);
        let errMessage = [];
        if (fileTypes.every(extension => file[0].type != extension)) {
            errMessage.push(`The file ${file.type} extension is not supported`);
        } else {
            let { newtb } = this.state;
            newtb.filethongbao = event.target.value;

            this.setState({
                selectedFile: file[0],
                newtb,
              
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
    //refesh
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/thongbaos/')
            .then((res) => this.setState({
                thongbao: res.data,
                showAlert: false,
                activePage: 1

            }));
        axios.get('/khoas/')
            .then((res) => this.setState({
                listKhoa: res.data,

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
    }

    //add

    toggleNewVienChucModal() {
        this.setState({
            AddModal: !this.state.AddModal
        })
    }
    addTB() {
        const ar = [];
        this.state.thongbao.forEach((e) => { ar.push(e.tieudethongbao.trim()) });
        if (ar.includes(this.state.newtb.tieudethongbao)) {
            this.setState({
                errors: "Tiêu đề thông báo đã tồn tại",
            });
        }
        else {
            axios.post('/thongbaos/', {
                MAKHOA: this.state.newtb.makhoa,
                TIEUDETHONGBAO: this.state.newtb.tieudethongbao,
                NOIDUNGTHONGBAO: this.state.newtb.noidungthongbao,
                FILETHONGBAO: this.state.newtb.filethongbao

            }).then((response) => {
                //console.log(response.data);
                alert("Đã thêm thông báo thành công!");
                this.setState({
                    newtb: {

                        mathongbao: '',
                        makhoa: 'CIT',
                        tieudethongbao: '',
                        noidungthongbao: '',
                        filethongbao: ''

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
    edit(mathongbao,makhoa, tieudethongbao, noidungthongbao, filethongbao) {
        this.setState({
            editData: { mathongbao, makhoa, tieudethongbao, noidungthongbao, filethongbao },
            editModal: !this.state.editModal

        });

    }
    updateTB() {
        let { mathongbao, makhoa, tieudethongbao, noidungthongbao, filethongbao } = this.state.editData;
        axios.put('/thongbaos/' + this.state.editData.mathongbao,
            { mathongbao, makhoa, tieudethongbao, noidungthongbao, filethongbao }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        mathongbao: '',
                        makhoa: 'CIT',
                        tieudethongbao: '',
                        noidungthongbao: '',
                        filethongbao: ''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteTB = (mathongbao) => {
        const apiUrl = '/thongbaos/' + mathongbao.mathongbao;
        axios.delete(apiUrl, { mathongbao: mathongbao.mathongbao })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                });
                //console.log(mavienchuc.mavienchuc);
            });

    }
    handleShowAlert = (mathongbao, tieudethongbao) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { mathongbao: mathongbao, tieudethongbao: tieudethongbao }
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

        
       
        const { thongbao, vc, quyen, chucnang, errors } = this.state;
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '330px' }}><b> DANH SÁCH THÔNG BÁO</b> </p></CardTitle>
                                    <CardTitle>




                                        <Row md="12">

                                            <Col style={{ paddingLeft: '250px' }} md="4">
                                                <Search
                                                    valueSearch={this.state.valueSearch}
                                                    handleSearch={this.handleSearch} />
                                            </Col>
                                        </Row>




                                    </CardTitle>

                                  
                                </CardHeader>
                                <CardBody>
                                    <Modal isOpen={this.state.AddModal} toggle={this.toggleNewVienChucModal.bind(this)} size="lg" style={{ maxWidth: '700px', width: '100%' }}>

                                        <ModalHeader toggle={this.toggleNewVienChucModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '600px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>THÊM MỚI THÔNG BÁO</b></p></ModalHeader>


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
                                                        <Label htmlFor="hoten">Tiêu đề: </Label>
                                                        <Input id="tenchucvu" value={this.state.newtb.tieudethongbao} onChange={(e) => {
                                                            let { newtb } = this.state;
                                                            newtb.tieudethongbao = e.target.value;
                                                            this.setState({ newtb });
                                                        }} />

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label htmlFor="hoten">Nội dung: </Label>
                                                        <textarea cols="80" rows="8" value={this.state.newtb.noidungthongbao} onChange={(e) => {
                                                            let { newtb } = this.state;
                                                            newtb.noidungthongbao = e.target.value;
                                                            this.setState({ newtb });
                                                        }} />

                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col md="12">
                                                    <FormGroup>
                                                        <Label htmlFor="hoten">File đính kèm: </Label>
                                                        <Input id="tenchucvu" type="file" value={this.state.newtb.filethongbao} onChange={this.selectFileHandler.bind(this)} />
                                                        <br />
                                                        <div>{this.state.progress}%</div>

                                                        <div>{this.state.status}</div>
                                                    </FormGroup>
                                                </Col>
                                            </Row>








                                        </ModalBody>
                                        <ModalFooter>
                                            <Button color="primary" disabled={!(this.state.newtb.makhoa.length > 0 && this.state.newtb.tieudethongbao.length > 0 && this.state.newtb.noidungthongbao.length > 0)} onClick={this.addTB.bind(this)}>Thực hiện lưu</Button>{' '}
                                            <Button color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Hủy bỏ</Button>
                                        </ModalFooter>

                                    </Modal>
                                    <div class="containerTB">
                                        <Row md="12">
                                            {(rules.find(x => x == cns)) ?
                                                <Col md="3">
                                                    <div class="content-box color-effect-1" >

                                                        <div class="box-icon-wrap box-icon-effect-1 box-icon-effect-1a" style={{ height: '345px' }}>
                                                            <a onClick={this.toggleNewVienChucModal.bind(this)}> <div class="box-icon"><i class="fa fa-plus"></i></div> </a>
                                                        </div>
                                                    </div>
                                                </Col>
                                                : null}
                                            

                                                       
                                     
                                        {
                                            thongbao.map((emp) => {
                                                return (
                                                       

                                                    <Col md="3">
                                                       
                                                     
                                                        
                                                        <div class="content-box color-effect-1">
                                                            <p style={{ textAlign:'right', marginTop: '-30px', marginRight: '-20px', }}>  <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.mathongbao, emp.tieudethongbao)} >X </Button></p>
                                                                    <h3>{emp.tieudethongbao}</h3>
                                                                    <div class="box-icon-wrap box-icon-effect-1 box-icon-effect-1a">
                                                                <div class="box-icon"><i class="fa fa-bell"></i></div>
                                                                    </div>
                                                            <p>{emp.noidungthongbao}</p>
                                                            <Button color="light"  onClick={this.edit.bind(this, emp.mathongbao, emp.makhoa, emp.tieudethongbao, emp.noidungthongbao, emp.filethongbao)}>
                                                                Chỉnh sửa</Button>  &nbsp;
                                                           
                                                        </div>
                                                      
                                                  
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

                                                            onConfirm={() => this.deleteTB({ mathongbao: this.state.xoa.mathongbao })}

                                                            onCancel={() => this.setState({ showAlert: false })}
                                                            focusCancelBtn
                                                        >  {"Thông báo  " + this.state.xoa.tieudethongbao + " sẽ bị xóa khỏi hệ thống"}
                                                    </SweetAlert>
                                                    <SweetAlert
                                                        show={this.state.confirm}
                                                        success
                                                        confirmBtnText="Đồng ý"
                                                        confirmBtnBsStyle="primary"
                                                        onConfirm={() => this.handleConfirm()}


                                                    >  Đã xóa thành công !!!
                                                                </SweetAlert>
                                                        <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this)} size="lg" style={{ maxWidth: '700px', width: '100%' }}>

                                                            <ModalHeader toggle={this.toggleEditModal.bind(this)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '600px', color: 'black', textAlign:'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                                            <Label htmlFor="hoten">Tiêu đề: </Label>
                                                                            <Input id="tenchucvu" value={this.state.editData.tieudethongbao} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.tieudethongbao = e.target.value;
                                                                                this.setState({ editData });
                                                                            }} />

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>
                                                                <Row md="12">
                                                                    <Col md="12">
                                                                    <Label htmlFor="hoten">Nội dung: </Label>
                                                                   
                                                                    </Col>


                                                                </Row>
                                                                <Row md="12">
                                                                    <Col md="12">
                                                                        <textarea cols="80" rows="8" value={this.state.editData.noidungthongbao} onChange={(e) => {
                                                                                let { editData } = this.state;
                                                                                editData.noidungthongbao = e.target.value;
                                                                                this.setState({ editData });
                                                                        }} />
                                                                        </Col>

                                                                       
                                                                 
                                                                </Row>
                                                                <Row>
                                                                    <Col md="12">
                                                                        <FormGroup>
                                                                            <Label htmlFor="hoten">File đính kèm: </Label>
                                                                            <Input required id="file" type="text" value={(this.state.editData.filethongbao).split('\\').pop()} />
                                                                            <Input required id="file" type="file" onChange={this.selectFileHandler.bind(this)} />
                                                                            <br />
                                                                            <div>{this.state.progress}%</div>

                                                                            <div>{this.state.status}</div>

                                                                        </FormGroup>
                                                                    </Col>
                                                                </Row>



                                                            </ModalBody>
                                                            <ModalFooter>
                                                                <Button color="primary" disabled={!(this.state.editData.makhoa.length > 0 && this.state.editData.tieudethongbao.length > 0 && this.state.editData.noidungthongbao.length > 0 && this.state.editData.filethongbao.length > 0)} onClick={this.updateTB.bind(this)}>Thực hiện lưu</Button>{' '}
                                                                <Button color="danger" onClick={this.toggleEditModal.bind(this)}>Hủy bỏ</Button>
                                                            </ModalFooter>

                                                        </Modal>
                                                    </Col>
                                                    
                                                     
                                                  
                                                )
                                            })
                                            }
                                        </Row>
                                        </div>
                                  
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
              
            </>
        );

    }
}

export default Thongbao;