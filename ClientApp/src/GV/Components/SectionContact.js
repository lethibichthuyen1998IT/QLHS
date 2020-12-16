import React, { Component } from 'react';

class SectionContact extends Component {
    render() {
        return (

            <div className="contact-section spad fix">
                <div className="container">
                    <div className="row">
                        {/* contact info */}
                        <div className="col-md-5 col-md-offset-1 contact-info col-push">
                            <div className="section-title left">
                                <h2>Contact us</h2>
                            </div>
                            <p>Cras ex mauris, ornare eget pretium sit amet, dignissim et turpis. Nunc nec maximus dui, vel suscipit dolor. Donec elementum velit a orci facilisis rutrum. </p>
                            <h3 className="mt60">Main Office</h3>
                            <p className="con-item">C/ Libertad, 34 <br /> 05200 Arévalo </p>
                            <p className="con-item">0034 37483 2445 322</p>
                            <p className="con-item">hello@company.com</p>
                        </div>
                        {/* contact form */}
                    </div>
                </div>
            </div>
        );
    }
}
export default SectionContact;