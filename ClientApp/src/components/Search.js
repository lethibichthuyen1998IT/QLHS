import React, { Component } from 'react';
import {
    Button,
    Input, FormGroup,Form
} from "reactstrap";
class Search extends Component {
    render() {
        return (
            <>

                <FormGroup className="form-inline" style={{ width: '800px' }}>
                        <Input placeholder="Search..." value={this.props.valueSearch} onChange={(event) => this.props.handleSearch(event.target.value)} style={{ width: '500px' }} /> &nbsp;
                   
                    <Button className="btn btn-control" color="info" onClick={() => this.props.handleSearch('')} style={{ width: '100px' }} >Tất cả</Button>
                    </FormGroup>
                     
            </>
        )
    }
}

export default Search;