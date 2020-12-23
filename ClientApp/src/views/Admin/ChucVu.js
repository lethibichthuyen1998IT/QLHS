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


class ChucVu extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            chucvu: [],
            vc:[],
            source: [],
            showAlert: false,
            confirm: false,
         
            newcv: {
                machucvu: '',
                tenchucvu:''

            },
            editData: {
                machucvu: '',
                tenchucvu: ''

            },
            quyen: [],
            chucnang: [],
            machucnang: '',
            machucvu:'',
          
            xoa: { machucvu:'',tenchucvu: '' },
            AddModal: false,
            editModal: false,
            valueSearch: '',
            errors: '',
            isChecked: false
        }

        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteCV = this.deleteCV.bind(this);
        this.addQuyen = this.addQuyen.bind(this);
        this.deleteQuyen = this.deleteQuyen.bind(this);
        this.isChange = this.isChange.bind(this);
    }



    //load
    componentDidMount() {

        //hien thi danh sach
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/chucvus/')
            .then((res) => this.setState({
                chucvu: res.data,
                source: res.data,
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
    //Quyen


    addQuyen() {

        axios.post('/quyens/', {
            MACHUCVU: this.state.machucvu,
            MACHUCNANG: this.state.machucnang
        })
            .then((response) => {
                this.refresh();
            });

    }

    deleteQuyen = (machucvu, machucnang) => {

        const apiUrl = '/quyens/' + this.state.machucvu.trim() + "/" + this.state.machucnang.trim();

        axios.delete(apiUrl, { machucvu: this.state.machucvu.trim(), machucnang: this.state.machucnang.trim() })
            .then((res) => {

                this.refresh();


            });
    }
    //checkbox
    isChange = (e) => {
        var dt = document.getElementById(e.target.name + e.target.value);

        this.state.machucnang = e.target.value;
        this.state.machucvu = e.target.name;

        if (!dt.checked === false) {
            this.addQuyen();
        }
        else {
            this.deleteQuyen({ machucvu: this.state.machucvu, machucnang: this.state.machucnang });;
        }

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

                if (item.tenchucvu.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            chucvu: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/chucvus/')
            .then((res) => this.setState({
                chucvu: res.data,
                source: res.data,
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
    addCV() {
        const ar = [];
        this.state.chucvu.forEach((e) => { ar.push(e.machucvu.trim()) });
        if (ar.includes(this.state.newcv.machucvu)) {
            this.setState({
                errors: "Chức vụ đã tồn tại",
            });
        }
            else {
                axios.post('/chucvus/', {
                    MACHUCVU: this.state.newcv.machucvu,
                    TENCHUCVU: this.state.newcv.tenchucvu,

                }).then((response) => {
                    //console.log(response.data);
                    alert("Đã thêm chức vụ thành công!");
                    this.setState({
                        newcv: {

                            machucvu: '',
                            tenchucvu: '',
                           
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
    toggleDong() {
        this.setState({
            editModal: !this.state.editModal
        })
    }
    toggleEditModal(machucvu, tenchucvu) {
        this.setState({
            editData: {machucvu, tenchucvu},
            editModal: !this.state.editModal

        });
      
    }
    updateCV() {
        let { machucvu, tenchucvu } = this.state.editData;
        axios.put('/chucvus/' + this.state.editData.machucvu,
            { machucvu, tenchucvu }).then((response) => {

                this.setState({
                    editModal: false,
                    editData: {
                        machucvu: '',
                        tenchucvu: ''
                    },
                });
                this.refresh();
                
                alert("Cập nhật thành công!");
            });

    }


    //delete
    deleteCV = (machucvu) => {
        const apiUrl = '/chucvus/' + machucvu.machucvu;
        axios.delete(apiUrl, { machucvu: machucvu.machucvu})
            .then((res) => {
               
                this.setState({
                    showAlert: false,
                    confirm: true,
                    xoa: { machucvu: '', tenchucvu: '' }
                });
               
                this.refresh();

            }).catch(e => {
                alert("Tồn tại viên chức đang có chức vụ này, không thể xóa !!");
                this.setState({
                    showAlert: false,
                    confirm: false
                });
            });
               
         

    }
    handleShowAlert = (machucvu,tenchucvu) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: {machucvu: machucvu, tenchucvu: tenchucvu }
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
       
        
       
        const { chucvu, vc, quyen, chucnang, errors } = this.state;
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

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH CHỨC VỤ</b> </p></CardTitle>
                                    <CardTitle>
                                        

                                           
                                        {(this.state.AddModal == true) ?

                                            <Form>
                                                <Row md="12">
                                                    <Col md="2">

                                                        <FormGroup>
                                                            <Label htmlFor="hoten">Mã chức vụ: </Label>
                                                            <Input id="machucvu" value={this.state.newcv.machucvu} onChange={(e) => {
                                                                let { newcv } = this.state;
                                                                newcv.machucvu = e.target.value;
                                                                this.setState({ newcv });
                                                            }} required />
                                                            {(errors) ?
                                                                <Alert color="warning">{errors}</Alert>
                                                                :
                                                                null
                                                            }
                                                        </FormGroup>
                                                    </Col>
                                                    <Col md="3">
                                                        <FormGroup>
                                                            <Label htmlFor="hoten">Tên chức vụ: </Label>
                                                            <Input id="tenchucvu" value={this.state.newcv.tenchucvu} onChange={(e) => {
                                                                let { newcv } = this.state;
                                                                newcv.tenchucvu = e.target.value;
                                                                this.setState({ newcv });
                                                            }} required />

                                                        </FormGroup>

                                                    </Col>

                                                    <Col md="4" style={{ marginTop: '30px' }}>
                                                        <Button style={{ width: '80px' }} disabled={!(this.state.newcv.tenchucvu.length > 0 && this.state.newcv.machucvu.length > 0)} color="primary" onClick={this.addCV.bind(this)}>Lưu</Button>{' '}  &nbsp;

                                                        <Button style={{ width: '80px' }} color="danger" onClick={this.toggleNewVienChucModal.bind(this)}>Đóng</Button>

                                                    </Col>
                                                </Row>

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
                                                <th>Mã</th>
                                                <th>Chức vụ</th>
                                                <th>Chức năng</th>
                                                {

                                                    (rules.find(x => x == cns)) ?
                                                        <th>Thao tác</th>
                                                        : null
                                                }
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                chucvu.map((cv) => {
                                                    return (

                                                        <tr key={cv.machucvu}>
                                                            <td>{cv.machucvu}</td>
                                                            <td>{cv.tenchucvu}</td>

                                                            <td width="200px">
                                                                {
                                                                    chucnang.map((cn) =>

                                                                        <ul key={cn.machucnang} style={{listStyle: 'none' }}>
                                                                            {

                                                                                (rules.find(x => x == cns)) ?
                                                                                    (quyen.find(x => x.machucvu == cv.machucvu && x.machucnang == cn.machucnang)) ?
                                                                                        <li key={cv.machucvu, cn.machucnang}>
                                                                                            <Input id={cv.machucvu + cn.machucnang} type="checkbox" name={cv.machucvu} onChange={(e) => this.isChange(e)} checked={true} value={cn.machucnang} />
                                                                                            {cn.tenchucnang}
                                                                                        </li>
                                                                                        :
                                                                                        <li key={cv.machucvu, cn.machucnang}>
                                                                                            <Input id={cv.machucvu + cn.machucnang} type="checkbox" name={cv.machucvu} onChange={(e) => this.isChange(e)} checked={false} value={cn.machucnang} />
                                                                                            {cn.tenchucnang}
                                                                                        </li> :

                                                                                    
                                                                                    (quyen.find(x => x.machucvu == cv.machucvu && x.machucnang == cn.machucnang)) ?
                                                                                        <li key={cv.machucvu, cn.machucnang}>
                                                                                            <Input id={cv.machucvu + cn.machucnang} type="checkbox" name={cv.machucvu} onChange={(e) => this.isChange(e)} checked={true} value={cn.machucnang} disabled />
                                                                                            {cn.tenchucnang}
                                                                                        </li>
                                                                                        :
                                                                                        <li key={cv.machucvu, cn.machucnang}>
                                                                                            <Input id={cv.machucvu + cn.machucnang} type="checkbox" name={cv.machucvu} onChange={(e) => this.isChange(e)} checked={false} value={cn.machucnang} disabled />
                                                                                            {cn.tenchucnang}
                                                                                        </li>


                                                                            }
                                                                        </ul>
                                                                    )
                                                                }
                                                            </td>
                                                            {
                                                                (rules.find(x => x == cns)) ?
                                                                    <td>

                                                                        <Button color="default" onClick={this.toggleEditModal.bind(this, cv.machucvu, cv.tenchucvu)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;
                                                                        

                                                                     
                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, cv.machucvu, cv.tenchucvu)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                       

                                                                    </td>
                                                                    : null
                                                            }
                                                        </tr>
                                                    )
                                                })
                                            }
                                            <Modal isOpen={this.state.editModal} toggle={this.toggleEditModal.bind(this, this.state.editData.machucvu, this.state.editData.tenchucvu)}>
                                                <ModalHeader toggle={this.toggleEditModal.bind(this, this.state.editData.machucvu, this.state.editData.tenchucvu)}>Chỉnh sửa</ModalHeader>
                                                <ModalBody>
                                                    <Form>
                                                        <FormGroup>
                                                            <Label for="tenvaitro">Mã chức vụ</Label>
                                                            <Input id="tenvaitro" value={this.state.editData.machucvu} onChange={(e) => {
                                                                let { editData } = this.state;
                                                                editData.machucvu = e.target.value;
                                                                this.setState({ editData });
                                                            }} />
                                                        </FormGroup>

                                                        <FormGroup>
                                                            <Label for="tenvaitro">Tên chức vụ</Label>
                                                            <Input id="tenvaitro" value={this.state.editData.tenchucvu} onChange={(e) => {
                                                                let { editData } = this.state;
                                                                editData.tenchucvu = e.target.value;
                                                                this.setState({ editData });
                                                            }} />
                                                        </FormGroup>
                                                    </Form>
                                                </ModalBody>
                                                <ModalFooter>
                                                    <Button color="primary" disabled={!(this.state.editData.tenchucvu.length > 0 && this.state.editData.machucvu.length > 0)} onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>
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

                                                onConfirm={() => this.deleteCV({ machucvu: this.state.xoa.machucvu })}

                                                onCancel={() => this.setState({ showAlert: false })}
                                                focusCancelBtn
                                            >  {"Chức vụ  " + this.state.xoa.tenchucvu + " sẽ bị xóa khỏi hệ thống"}
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

export default ChucVu;