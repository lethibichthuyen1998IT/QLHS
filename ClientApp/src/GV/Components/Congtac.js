import React, { Component } from "react";
import axios from "axios";
import cookie from "js-cookie";
import Header from "./Header";
import Services from "./Services";
import SectionContact from "./SectionContact";
import SectionAbout from "./SectionAbout";
import PageHeader from "./PageHeader";
import ReactPaginate from 'react-paginate';
import SweetAlert from 'react-bootstrap-sweetalert';
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
import moment from 'moment';
import Timkiem from "./search";
import { Link, NavLink } from "react-router-dom";

class Trangchu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            congtac: [],
            source: [],
            valueSearch: '',


            offset: 0,
            orgtableData: [],
            perPage: 6,
            currentPage: 0,

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
            xoacv: {
                macongviec: '',
                tencongviec: '',
                mavienchuc: ''

            },
            AddModal: false,
            editModal: false,
            CVshowAlert: false,
            confirm: false,

            selectedFile: '',
            progress: 0,
            status: '',
            error: '',
            dm: [],
            nh: [],
            vc: [],
            pc:[],
            lv: [],
            nl:[],
            tstiet:'',
            user: JSON.parse(localStorage.getItem('user'))



        };
        this.handleXoa = this.handleXoa.bind(this);
        this.deleteCV = this.deleteCV.bind(this);
        this.refresh = this.refresh.bind(this);

    }
    componentDidMount() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });

        axios.get('/congviecs/congtac')
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

        axios.get('/phancongs/vc/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                pc: res.data,

            }));

        axios.get('/phancongs/lv/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                lv: res.data,

            }));
        axios.get('/phancongs/nl/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                nl: res.data,

            }));
        axios.get('/phancongs/tstiet/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                tstiet: res.data,

            }));

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
            congtac: slice,
        })

    }
    handleSearch = (search) => {

        let sourceArray = this.state.source;

        let newArray = [];
        if (search.length <= 0) {
            newArray = sourceArray;
        } else {


            for (let item of sourceArray) {

                if (item.tencongviec.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.ngaythuchien.indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            congtac: newArray,
            valueSearch: search
        });
    }
    refresh() {
        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/congviecs/congtac')
            .then(res => {
                var ct = res.data;
                console.log('data-->' + JSON.stringify(ct))
                var slice = ct.slice(this.state.offset, this.state.offset + this.state.perPage)
                this.setState({
                    pageCount: Math.ceil(ct.length / this.state.perPage),
                    orgtableData: ct,
                    congtac: slice,
                    source: slice,

                })

            });

        axios.get('/phancongs/vc/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                pc: res.data,

            }));
        axios.get('/phancongs/lv/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                lv: res.data,

            }));
        axios.get('/phancongs/nl/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                nl: res.data,

            }));
        axios.get('/phancongs/tstiet/' + this.state.user.mavienchuc)
            .then((res) => this.setState({
                tstiet: res.data,

            }));
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

    toggleDongCV() {
        this.setState({
            editCVModal: !this.state.editCVModal
        })
    }
    toggleEditCVModal(macongviec, manamhoc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec) {
        this.setState({
            editCVData: { macongviec, manamhoc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec },
            editCVModal: !this.state.editCVModal

        });
    }

    updateCV() {
        let { macongviec, manamhoc, masodanhmuc, tencongviec, ngaythuchien, diadiem, thoigian, filecongvec } = this.state.editCVData;
        axios.put('/congviecs/' + Number.parseInt(this.state.editCVData.macongviec),
            {
                macongviec: macongviec,
                manamhoc: manamhoc,
                mavienchuc: this.state.vc.mavienchuc,
                masodanhmuc: masodanhmuc,
                tencongviec: tencongviec,
                ngaythuchien: ngaythuchien,
                diadiem: diadiem,
                thoigian: thoigian,
                filecongvec: filecongvec
            }).then((response) => {

                this.setState({
                    editCVModal: false,
                    editCVData: {
                        macongviec: 0,
                        manamhoc: 0,
                        mavienchuc: this.state.vc.mavienchuc,
                        masodanhmuc: '',
                        tencongviec: '',
                        ngaythuchien: '',
                        diadiem: '',
                        thoigian: '',
                        filecongvec: ''
                    },
                });
                this.refresh();

                alert("Cập nhật thành công!");
            })

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

    handleConfirm() {
        this.refresh();
        this.setState({
            confirm: !this.state.confirm

        });
    }
    render() {
        const { congtac, errors,pc, tstiet,lv,nl} = this.state;
        console.log(pc)
        return (

            <>


                <Header />
                <div class="page-top-section">
                    <div class="overlay"></div>
                    <div class="container text-right">
                        <div class="page-info">
                            <h2>CÔNG TÁC</h2>
                            <div class="page-links">
                                <Link to="/congviec">Công việc</Link>
                                <span>Công tác</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="services-section spad">
                    <div class="container">

                        <div class="section-title dark">
                            <h2> CÔNG VIỆC THUỘC LĨNH VỰC <span style={{ fontSize: '35px' }}>CÔNG TÁC</span> TRONG NĂM</h2>
                        </div>


                        <br />
                        <Timkiem valueSearch={this.state.valueSearch}
                            handleSearch={this.handleSearch} />
                        <Card style={{ width: '600px', marginLeft: '400px', marginTop: '-130px', textAlign: 'left' }}>
                            <CardHeader> <b> CÔNG VIỆC ĐƯỢC PHÂN CÔNG</b></CardHeader>

                            <CardBody>
                                <Row md="12">
                                    <Col md="6">
                                        <p>Số giờ giảng dạy: <strong>{tstiet}</strong> </p>
                                    </Col>
                                    <Col md="6">
                                        <p>Số luận văn: <strong>{nl.soluong}</strong></p>
                                    </Col>
                                    <Col md="6">
                                        <p>Số tiểu luận / niên luận: <strong>{nl.soluong}</strong></p>

                                    </Col>
                                    </Row>
                                    <Row>
                                    <Col md="12">
                                       Các môn học giảng dạy:  {
                                            pc.map((emp) => {
                                                return (
                                                    <strong> {emp.tenmonhoc },</strong>
                                                    )
                                            })
                                        }

                                    </Col>
                                </Row>
                                   
                                
                            </CardBody>
                            </Card>
                        <br />


                         
                        <div class="row">

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




                                        <th width="120px">Thao tác</th>


                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        congtac.map((emp, index) => {
                                            return (
                                                <tr key={emp.macongviec}>
                                                    <td>{index + 1}</td>


                                                    <td>{emp.tendanhmuc}</td>

                                                    <td>{emp.tencongviec}</td>
                                                    <td>{moment(emp.ngaythuchien).format("DD-MM-YYYY")}</td>
                                                    <td>{emp.diadiem}</td>
                                                    <td>{emp.thoigian}</td>

                                                    <td>{(emp.filecongvec != null) ?
                                                        < a href={"/UploadedFiles/" + (emp.filecongvec).split('\\').pop()} download> Tải xuống </a>
                                                        : null}
                                                    </td>


                                                    <td>
                                                        <Button color="default" onClick={this.toggleEditCVModal.bind(this, emp.macongviec, emp.manamhoc, emp.masodanhmuc, emp.tencongviec, emp.ngaythuchien, emp.diadiem, emp.thoigian, emp.filecongvec)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button>  &nbsp;

                                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleXoa.bind(this, emp.macongviec, emp.tencongviec)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>




                                                    </td>


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
                                    <Modal isOpen={this.state.editCVModal} toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.diadiem, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} size="lg" style={{ maxWidth: '800px', width: '100%' }}>

                                        <ModalHeader toggle={this.toggleEditCVModal.bind(this, this.state.editCVData.macongviec, this.state.editCVData.manamhoc, this.state.editCVData.masodanhmuc, this.state.editCVData.tencongviec, this.state.editCVData.ngaythuchien, this.state.editCVData.diadiem, this.state.editCVData.thoigian, this.state.editCVData.filecongvec)} style={{ backgroundColor: '#D6EAF8' }} > <p style={{ width: '400px', color: 'black', textAlign: 'center', paddingTop: '20px', fontSize: '25px' }}><b>CHỈNH SỬA THÔNG TIN</b></p></ModalHeader>


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
                                                        <Label htmlFor="hoten">Tên công việc: </Label>
                                                        <Input id="tenchucvu" value={this.state.editCVData.tencongviec} onChange={(e) => {
                                                            let { editCVData } = this.state;
                                                            editCVData.tencongviec = e.target.value;
                                                            this.setState({ editCVData });
                                                        }} />

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
                                                        <Input id="tenchucvu" type="date" value={moment(this.state.editCVData.ngaythuchien).format("YYYY-MM-DD")} onChange={(e) => {
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
                                                        <Label htmlFor="hoten">Thời gian: (Giờ) </Label>
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
                                            <Button color="primary" disabled={!(this.state.editCVData.masodanhmuc.length != 0 && this.state.editCVData.manamhoc.length != 0 && this.state.editCVData.ngaythuchien.length > 0 && this.state.editCVData.diadiem.length > 0 && this.state.editCVData.thoigian.length > 0)} onClick={this.updateCV.bind(this)}>Thực hiện lưu</Button>{' '}
                                            <Button color="danger" onClick={this.toggleDongCV.bind(this)}>Hủy bỏ</Button>
                                        </ModalFooter>

                                    </Modal>

                                </tbody>
                            </Table>






                        </div>
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

                    </div>
                </div>



                <footer className="footer-section">
                    <h2>2017 All rights reserved. Designed by <a href="https://colorlib.com" target="_blank">Colorlib</a></h2>
                </footer>
            </>
        );
    }
}
export default Trangchu;