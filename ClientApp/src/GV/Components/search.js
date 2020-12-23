import React, { Component } from 'react';
import {
    Button,
    Input, FormGroup, Form
} from "reactstrap";
class Timkiem extends Component {
    render() {
        return (
            <>
                <div class="col-md-4 col-sm-5 sidebar">
                    <div class="widget-item">
                        <form class="search-form">
                            <input type="text" placeholder="Tìm kiếm" value={this.props.valueSearch} onChange={(event) => this.props.handleSearch(event.target.value)} />
                            <button  onClick={() => this.props.handleSearch('')} class="search-btn" style={{width : '100px'}}>Tất cả</button>

                        </form>
                    </div>
                </div>
              
                </>

    );
    }
}
export default Timkiem;