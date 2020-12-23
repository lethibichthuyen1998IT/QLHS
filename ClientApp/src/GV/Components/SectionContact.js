import React, { Component } from 'react';

class SectionContact extends Component {
    render() {
        return (
            <>
            <div class="map" id="map-area"> <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3835.772608740062!2d108.24756751433553!3d15.97324694624705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3142108878ee1dbf%3A0xb466fcf06b910a38!2zS2hvYSBDw7RuZyBuZ2jhu4cgdGjDtG5nIHRpbiB2w6AgVHJ1eeG7gW4gdGjDtG5nIC0gxJDhuqFpIGjhu41jIMSQw6AgTuG6tW5n!5e0!3m2!1svi!2s!4v1608261736192!5m2!1svi!2s" width="1400" height="800" frameborder="0" style={{ border: '0' }} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div>
            <div className="contact-section spad fix">
                <div className="container">
                    <div className="row">

                        <div className="col-md-5 col-md-offset-1 contact-info col-push">
                                <div className="section-title left" style={{ paddingLeft: '150px', width: '700px'}}>
                                <h2>Thông tin liên hệ</h2>
                            </div>

                                <h3 className="mt60" style={{ width: "700px" }}>Khoa CNTT & TT -Trường Đại học Cần Thơ</h3>
                                <div style={{paddingLeft: '20px', width: '700px'}}>
                            <p className="con-item">Địa chỉ: Khu 2,Đường 3/2, phường Xuân Khánh, Quận Ninh Kiều, Thành phố Cần Thơ </p>
                            <p className="con-item">Điện thoại: 84 0292 3 734713 - 0292 3 831301; <br/>Fax: 84 0292 3830841;<br /> Email: office@cit.ctu.edu.vn</p>
                                    <p className="con-item">Website: www.cit.ctu.edu.vn</p>
                                </div>

                            </div>
                            <div class="col-md-7 col-pull">
                                <img src="img/khoa.jpg" width="1000" height="600" alt=""/>
                            </div>

                    </div>
                </div>
                </div>
                </>
        );
    }
}
export default SectionContact;