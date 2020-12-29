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
import { Link, NavLink } from "react-router-dom";
import axios from 'axios';
import moment from 'moment';
import Search from 'components/Search';
import SweetAlert from 'react-bootstrap-sweetalert';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

 
var date = new Date();
class DanhGia extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            dg: [],
            source: [],
            sourcebm: [],
            showAlert: false,
            confirm: false,
            chucnang: [],
            quyen: [],
            vc: [],
            nh:[],
            khoachuadg: [],
            khoadg: [],
            bmdg: [],
            bmchuadg: [],
            bomonchuadg:[],
            tatcabm:[],
         
           

            xoa: {
                Masodanhgia: '',
                Mavienchuc: '',
            },
            user: JSON.parse(localStorage.getItem('user')),
            details: [],
         
            valueSearch: '',
            errors: '',
            vienchuc: [],
            chitietdg:[],
            nhmd:''
        }
      
        this.refresh = this.refresh.bind(this);
        this.handleShowAlert = this.handleShowAlert.bind(this);
        this.deleteDG = this.deleteDG.bind(this);

    }



    //load
    componentDidMount() {

        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data.manamhoc,
              

            }, ()=>this.Load())
        );
     
      

    }

    Load() {
        axios.get('/danhgias/tatca/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
        );
        axios.get('/danhgias/tatcabm/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                tatcabm: res.data,
                sourcebm: res.data
               
            })
            );
       
        axios.get('/danhgias/khoadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                khoadg: res.data,

            })
            );
        axios.get('/danhgias/khoachuadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                khoachuadg: res.data,

            })
            );
        axios.get('/danhgias/tatcabmchuadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bomonchuadg: res.data,

            })
            );
        axios.get('/danhgias/bmdanhgia/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bmdg: res.data,

            })
            );
        axios.get('/danhgias/bmchuadanhgia/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bmchuadg: res.data,

            })
            );
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

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
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

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

                if (item.mavienchuc.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.hoten.toLowerCase().indexOf(search.toLowerCase()) > -1) {
                    newArray.push(item);
                }
            }

        }

        this.setState({
            dg: newArray,
            valueSearch: search
        });
    }
    handleSearchBM = (search) => {

        let sourceArray = this.state.sourcebm;

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
            tatcabm: newArray,
            valueSearch: search
        });
    }
    //refesh
    refresh() {
        //hien thi danh sach
        axios.get('/danhgias/tatca/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                dg: res.data,
                source: res.data,
            })
            );
        axios.get('/danhgias/khoadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                khoadg: res.data,

            })
            );
        axios.get('/danhgias/khoachuadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                khoachuadg: res.data,

            })
            );
        axios.get('/danhgias/tatcabmchuadanhgia/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bomonchuadg: res.data,

            })
        );
        axios.get('/danhgias/tatcabm/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                tatcabm: res.data,

            })
            );

        axios.get('/danhgias/bmdanhgia/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bmdg: res.data,

            })
            );
        axios.get('/danhgias/bmchuadanhgia/' + this.state.user.mabomon + "/" + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                bmchuadg: res.data,

            })
            );
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

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
        axios.get('/vienchucs/')
            .then((res) => this.setState({
                vienchuc: res.data,

            })
            );

    }

    //details
  
    xemct(id) {
        this.props.history.push("/admin/xemct/" + id);

    }


   //Khoa edit
    khoa(id) {
        this.props.history.push("/admin/khoadg/" + id);
       
    }
  

    //Admin edit
    admin(id) {
        this.props.history.push("/admin/admindg/" + id);

    }
   

   
    bomon(id) {
        this.props.history.push("/admin/bmdg/" + id);

    }
   

    //loc nam hoc combo box
    onchange = e => {
        this.setState({ nhmd: e.target.value }, () => this.refresh());

    }


    //delete
    deleteDG = (masodanhgia) => {
        const apiUrl = '/danhgias/' + masodanhgia.masodanhgia;
        axios.delete(apiUrl, { masodanhgia: masodanhgia.masodanhgia })
            .then((res) => {

                this.setState({
                    showAlert: false,
                    confirm: true
                })
                //console.log(mavienchuc.mavienchuc);
            });
    }
    handleShowAlert = (masodanhgia, mavienchuc) => {
        this.setState({
            showAlert: !this.state.showAlert,
            xoa: { masodanhgia: masodanhgia, mavienchuc: mavienchuc }
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
        const { vc, quyen, chucnang, dg, chitietdg, khoadg, khoachuadg, bmchuadg, bmdg, bomonchuadg,tatcabm } = this.state;
        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === vc.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý khoa";
        const name2 = "Quản lý bộ môn";
        let cns = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name.toLowerCase())
                cns.push(x.machucnang);
        });

        let cn = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name2.toLowerCase())
                cn.push(x.machucnang);
        });

        
        return (
            <>
                {(rules.find(x => x == cns)) ?
                <div className="content">

                    <Row>
                        <Col md="12">

                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH PHIẾU ĐÁNH GIÁ</b> </p></CardTitle>
                                    <CardTitle>



                                      
                                            <Row md="12">

                                            <Col md="4" style={{ paddingLeft: '230px' }}>
                                                    <Search
                                                        valueSearch={this.state.valueSearch}
                                                        handleSearch={this.handleSearch} />
                                                </Col>
                                        </Row>
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
                                     



                                    </CardTitle>


                                </CardHeader>
                                <CardBody>
                                    
                                   
                                        
                                        <Tabs>
                                            <TabList>

                                                <Tab>Tất cả</Tab>
                                                <Tab>Chưa đánh giá</Tab>
                                                <Tab>Đã đánh giá</Tab>
                                                <Tab>Bộ môn chưa đánh giá</Tab>
                                             

                                            </TabList>
                                            <TabPanel>
                                        <Table className="table table-hover">
                                            <thead className="text-primary">
                                                <tr>
                                                    <th>STT</th>

                                                    <th>Mã viên chức</th>
                                                    <th>Họ tên</th>
                                                    
                                                    <th>Thao tác</th>
                                                      
                                                   
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    dg.map((emp, index) => {
                                                        return (
                                                            <tr key={emp.masodanhgia}>
                                                                <td>{index + 1}</td>

                                                               
                                                                <td>{emp.mavienchuc}</td>
                                                                <td>{emp.hoten}</td>
                                                               
                                                              
                                                                    <td>
                                                                    <Button color="primary" onClick ={ (id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                                    {(emp.bomon != null) ?
                                                                        <strong>  <Button color="light" onClick={(id) => this.khoa(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;</strong>
                                                                    :
                                                                        <strong> <Button color="light" onClick={(id) => this.admin(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;  </strong>
                                                                  
                                                                    }


                                                                    <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                

                                                                  


                                                                        </td>
                                                            </tr>
                                                        )
                                                    })
                                                        }

                                                      
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

                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                            onCancel={() => this.setState({ showAlert: false })}
                                                            focusCancelBtn
                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                                </Table> </TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                   
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                      
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        khoachuadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                   
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                  
                                                                    <td>
                                                                        <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;

                                                                           <Button color="light" onClick={(id) => this.khoa(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;



                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>





                                                                    </td>
                                                                
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                   

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

                                                        onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                        onCancel={() => this.setState({ showAlert: false })}
                                                        focusCancelBtn
                                                    >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                            </Table></TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                      
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                       
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        khoadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                 
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                 
                                                                    <td>
                                                                        <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                
                                                                        <Button color="light" onClick={(id) => this.khoa(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;                                                                            


                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>





                                                                    </td>
                                                                  
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                   
                                            
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

                                                        onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                        onCancel={() => this.setState({ showAlert: false })}
                                                        focusCancelBtn
                                                    >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                            </Table></TabPanel>
                                            <TabPanel>  <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <th>STT</th>


                                                      
                                                        <th>Mã viên chức</th>
                                                        <th>Họ tên</th>
                                                      
                                                        <th>Thao tác</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        bomonchuadg.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.masodanhgia}>
                                                                    <td>{index + 1}</td>

                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    

                                                                    <td>
                                                                        <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;
                                                                 
                                                                        <Button color="light" onClick={(id) => this.admin(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;


                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>





                                                                    </td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                   
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

                                                        onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                        onCancel={() => this.setState({ showAlert: false })}
                                                        focusCancelBtn
                                                    >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                            </Table></TabPanel></Tabs>
                                    </CardBody>

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

                                            <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH PHIẾU ĐÁNH GIÁ</b> </p></CardTitle>
                                            <CardTitle>




                                                <Row md="12">

                                                    <Col md="4" style={{ paddingLeft: '230px' }}>
                                                        <Search
                                                            valueSearch={this.state.valueSearch}
                                                            handleSearch={this.handleSearchBM} />
                                                    </Col>
                                                </Row>
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




                                            </CardTitle>


                                        </CardHeader>
                                        <CardBody>

                                            <Tabs>
                                                <TabList>

                                                    <Tab>Tất cả </Tab>
                                                    <Tab>Chưa đánh giá</Tab>
                                                    <Tab>Đã đánh giá</Tab>
                                                   

                                                </TabList>
                                                <TabPanel>
                                                    <Table className="table table-hover">
                                                        <thead className="text-primary">
                                                            <tr>
                                                                <th>STT</th>
                                                              
                                                                <th>Mã viên chức</th>
                                                                <th>Họ tên</th>
                                                              
                                                                <th>Thao tác</th>


                                                            </tr>
                                                        </thead>
                                                       
                                                            <tbody>
                                                                {
                                                                tatcabm.map((emp, index) => {
                                                                        return (
                                                                            <tr key={emp.masodanhgia}>
                                                                                <td>{index + 1}</td>

                                                                               
                                                                                <td>{emp.mavienchuc}</td>
                                                                                <td>{emp.hoten}</td>
                                                                               

                                                                                <td>
                                                                                    <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;

                                                                           <Button color="light" onClick={(id) => this.bomon(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;



                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>





                                                                                </td>

                                                                            </tr>
                                                                        )
                                                                    })
                                                                }
                                                           
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

                                                                onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                                onCancel={() => this.setState({ showAlert: false })}
                                                                focusCancelBtn
                                                            >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                                    </Table> </TabPanel>
                                                <TabPanel>  <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>


                                                          
                                                            <th>Mã viên chức</th>
                                                            <th>Họ tên</th>
                                                            
                                                            <th>Thao tác</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bmchuadg.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.masodanhgia}>
                                                                        <td>{index + 1}</td>

                                                                      
                                                                        <td>{emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                      

                                                                        <td>
                                                                            <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;

                                                                           <Button color="light" onClick={(id) => this.bomon(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;
                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                        </td>

                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                       
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

                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                            onCancel={() => this.setState({ showAlert: false })}
                                                            focusCancelBtn
                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                                </Table></TabPanel>

                                                <TabPanel>  <Table className="table table-hover">
                                                    <thead className="text-primary">
                                                        <tr>
                                                            <th>STT</th>


                                                        
                                                            <th>Mã viên chức</th>
                                                            <th>Họ tên</th>
                                                            
                                                            <th>Thao tác</th>


                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            bmdg.map((emp, index) => {
                                                                return (
                                                                    <tr key={emp.masodanhgia}>
                                                                        <td>{index + 1}</td>

                                                                    
                                                                        <td>{emp.mavienchuc}</td>
                                                                        <td>{emp.hoten}</td>
                                                                       

                                                                        <td>
                                                                            <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp;

                                                                           <Button color="light" onClick={(id) => this.bomon(emp.masodanhgia)} style={{ width: '40px' }}><i className="fa fa-pencil" aria-hidden="true"></i></Button> &nbsp;
                                                                        <Button className="btn btn-danger" style={{ width: '40px' }} onClick={this.handleShowAlert.bind(this, emp.masodanhgia, emp.hoten)} > <i className="fa fa-trash" aria-hidden="true"></i> </Button>
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                
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

                                                            onConfirm={() => this.deleteDG({ masodanhgia: this.state.xoa.masodanhgia })}

                                                            onCancel={() => this.setState({ showAlert: false })}
                                                            focusCancelBtn
                                                        >  {"Đánh giá của viên chức " + this.state.xoa.mavienchuc + " sẽ bị xóa?"}
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
                                                </Table></TabPanel></Tabs>
                                </CardBody>

                            </Card>
                        </Col>

                    </Row>
                        </div>
                        : <p> Chỉ có trưởng bộ môn hoặc trưởng khoa mới có quyền xem </p>
                }
            </>
        );

    }
}

export default DanhGia;