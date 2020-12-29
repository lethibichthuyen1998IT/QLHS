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
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import SweetAlert from 'react-bootstrap-sweetalert';
import Pagination from "react-js-pagination";

class Khenthuong extends React.Component {

    constructor(props) {

        super(props);
        this.state = {
            vc: [],
            vcxssource: [],
            vcgioisource: [],
            vctbsource: [],
            vcyeusource: [],
            showAlert: false,
            confirm: false,
            activePage: 1,
           
          user: JSON.parse(localStorage.getItem('user')),
          
            vcgioi: [],
            vcxs: [],
            vctb: [],
            vcyeu:[],
            quyen: [],
            chucnang:[],
            valueSearch: '',
            errors: '',
            nhmd: '',
            nh:[]
        }
      
        this.refresh = this.refresh.bind(this);
        
    }



    //load
    componentDidMount() {

        //hien thi danh sach
        axios.get('/namhocs/namhoc/')
            .then((res) => this.setState({
                nhmd: res.data.manamhoc,


            }, () => this.Load())
            );
     
       
     
        
    }
    refresh() {
        axios.get('/Vienchucs/vcyeu/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcyeu: res.data,
                vcyeusource: res.data,
            })
            );
        axios.get('/Vienchucs/vcgioi/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcgioisource: res.data,
                vcgioi: res.data,
            })
            );
        axios.get('/Vienchucs/vcxs/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcxs: res.data,
                vcxssource: res.data,
            })
            );
        axios.get('/Vienchucs/vctb/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vctb: res.data,
                vctbsource: res.data,
            })
            );

        const nvs = JSON.parse(localStorage.getItem('user'));
        this.setState({
            vc: nvs
        });
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

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

    Load() {
        axios.get('/Vienchucs/vcyeu/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcyeu: res.data,
                vcyeusource: res.data,
            })
            );
        axios.get('/Vienchucs/vcgioi/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcgioisource: res.data,
                vcgioi: res.data,
            })
            );
        axios.get('/Vienchucs/vcxs/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vcxs: res.data,
                vcxssource: res.data,
            })
            );
        axios.get('/Vienchucs/vctb/' + Number.parseInt(this.state.nhmd))
            .then((res) => this.setState({
                vctb: res.data,
                vctbsource: res.data,
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
        axios.get('/namhocs/')
            .then((res) => this.setState({
                nh: res.data,

            })
            );
        
    }
    onchange = e => {
        this.setState({ nhmd: e.target.value }, () => this.refresh());

    }
    //search
    vcxsSearch = (search) => {

        let sourceArray = this.state.vcxssource;

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
            vcxs: newArray,
            valueSearch: search
        });
    }
    vcgioiSearch = (search) => {

        let sourceArray = this.state.vcgioisource;

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
            vcgioi: newArray,
            valueSearch: search
        });
    }
    vctbSearch = (search) => {

        let sourceArray = this.state.vctbsource;

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
            vctb: newArray,
            valueSearch: search
        });
    }
    vcyeuSearch = (search) => {

        let sourceArray = this.state.vcyeusource;

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
            vcyeu: newArray,
            valueSearch: search
        });
    }

    xemct(id) {
        this.props.history.push("/admin/xemct/" + id);

    }

    //render
    render() {
        
        const { vcgioi,vctb,vcxs,vcyeu } = this.state;
       
        const { user, quyen, chucnang } = this.state;

        let rules = [];
        quyen.forEach((e) => {
            if (e.machucvu.trim() === user.machucvu.trim())
                rules.push(e.machucnang);
        });
        const name = "Quản lý bộ môn";
        const name1 = "Quản lý khoa";
        let cns = [];
        let cn = [];
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name1.toLowerCase())
                cn.push(x.machucnang);
        });
        chucnang.forEach((x) => {
            if (x.tenchucnang.toLowerCase() === name.toLowerCase() )
                cns.push(x.machucnang);
        });
        return (
            <>

                <div className="content">

                    <Row>
                        <Col md="12">

                            <Card>
                                <CardHeader>

                                    <CardTitle tag="h4"><p style={{ color: '#E86307   ', fontSize: '30px', paddingLeft: '300px' }}><b> DANH SÁCH KẾT QUẢ CÁC VIÊN CHỨC</b> </p></CardTitle>
                                    <CardTitle>
                                        
                                    </CardTitle>

                                   
                                </CardHeader>
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
                                <br />
                                <Tabs>
                                    <TabList>


                                        <Tab>Hoàn thành xuất sắc</Tab>
                                        <Tab>Hoàn thành tốt</Tab>
                                        <Tab>Hoàn thành</Tab>
                                    <Tab>Không hoàn thành</Tab>

                                    </TabList>

                                    <TabPanel>
                                        
                                        <CardBody>
                                            
                                            <Table className="table table-hover">
                                                
                                                <thead className="text-primary">
                                                    <tr>
                                                        <td colSpan="7">
                                                        <Search
                                                            valueSearch={this.state.valueSearch}
                                                                handleSearch={this.vcxsSearch} />
                    </td>
                                                  </tr>
                                            <tr>
                                                <th>STT</th>

                                                <th>Mã số</th>
                                                <th>Họ tên</th>
                                                <th>Giới tính</th>
                                                <th>Chức danh</th>
                                                <th>Chức vụ</th>
                                                <th>Bộ môn</th>

                                            
                                            </tr>
                                          
                                        </thead>
                                        <tbody>
                                            {
                                                vcxs.map((emp, index) => {
                                                    return (
                                                        <tr key={emp.mavienchuc}>
                                                            <td>{index + 1}</td>
                                                            <td>{emp.mavienchuc}</td>
                                                            <td>{emp.hoten}</td>
                                                            <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                            <td>{emp.tenchucdanh}</td>
                                                            <td>{emp.tenchucvu}</td>
                                                            <td>{emp.tenbomon}</td>
                                                            <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                        </tr>
                                                       
                                                    )
                                                })
                                                    }
                                                    <b> Tổng cộng: {vcxs.length} </b>

                                        </tbody>
                                    </Table>
                                        </CardBody>

                                    </TabPanel>
                                    <TabPanel>
                                        <CardBody>
                                            <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <td colSpan="7">
                                                            <Search
                                                                valueSearch={this.state.valueSearch}
                                                                handleSearch={this.vcgioiSearch} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>STT</th>

                                                        <th>Mã số</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Chức danh</th>
                                                        <th>Chức vụ</th>
                                                        <th>Bộ môn</th>


                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {
                                                        vcgioi.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.mavienchuc}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                    <td>{emp.tenchucdanh}</td>
                                                                    <td>{emp.tenchucvu}</td>
                                                                    <td>{emp.tenbomon}</td>
                                                                    <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                    <b> Tổng cộng: {vcgioi.length} </b>

                                                </tbody>
                                            </Table>
                                        </CardBody>

                                    </TabPanel>
                                    <TabPanel>
                                        <CardBody>
                                            <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <td colSpan="7">
                                                            <Search
                                                                valueSearch={this.state.valueSearch}
                                                                handleSearch={this.vctbSearch} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>STT</th>

                                                        <th>Mã số</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Chức danh</th>
                                                        <th>Chức vụ</th>
                                                        <th>Bộ môn</th>


                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {
                                                        vctb.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.mavienchuc}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                    <td>{emp.tenchucdanh}</td>
                                                                    <td>{emp.tenchucvu}</td>
                                                                    <td>{emp.tenbomon}</td>
                                                                    <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                    <b> Tổng cộng: {vctb.length} </b>

                                                </tbody>
                                            </Table>
                                        </CardBody>

                                    </TabPanel>
                                    <TabPanel>
                                        <CardBody>
                                            <Table className="table table-hover">
                                                <thead className="text-primary">
                                                    <tr>
                                                        <td colSpan="7">
                                                            <Search
                                                                valueSearch={this.state.valueSearch}
                                                                handleSearch={this.vcyeuSearch} />
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>STT</th>

                                                        <th>Mã số</th>
                                                        <th>Họ tên</th>
                                                        <th>Giới tính</th>
                                                        <th>Chức danh</th>
                                                        <th>Chức vụ</th>
                                                        <th>Bộ môn</th>


                                                    </tr>

                                                </thead>
                                                <tbody>
                                                    {
                                                        vcyeu.map((emp, index) => {
                                                            return (
                                                                <tr key={emp.mavienchuc}>
                                                                    <td>{index + 1}</td>
                                                                    <td>{emp.mavienchuc}</td>
                                                                    <td>{emp.hoten}</td>
                                                                    <td>{emp.gioitinh ? 'Nam' : 'Nữ'}</td>
                                                                    <td>{emp.tenchucdanh}</td>
                                                                    <td>{emp.tenchucvu}</td>
                                                                    <td>{emp.tenbomon}</td>
                                                                    <Button color="primary" onClick={(id) => this.xemct(emp.masodanhgia)} style={{ width: '40px' }}><i class="fa fa-eye"></i></Button>  &nbsp; 
                                                                </tr>

                                                            )
                                                        })
                                                    }
                                                    <b> Tổng cộng: {vcyeu.length} </b>

                                                </tbody>
                                            </Table>
                                        </CardBody>

                                    </TabPanel>
                                </Tabs>
                                
                            </Card>
                        </Col>

                    </Row>
                </div>
            </>
        );

    }
}

export default Khenthuong;