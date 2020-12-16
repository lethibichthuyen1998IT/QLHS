import React, { Component } from 'react';

class SectionAbout extends Component {
    render() {
        return (

            <div className="about-section">
                <div className="overlay" />
                {/* card section */}
                <div className="card-section">
                    <div className="container">
                        <div className="row">
                            {/* single card */}
                            <div className="col-md-4 col-sm-6">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-023-flask" />
                                    </div>
                                    <h2>Get in the lab</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                            {/* single card */}
                            <div className="col-md-4 col-sm-6">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-011-compass" />
                                    </div>
                                    <h2>Projects online</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                            {/* single card */}
                            <div className="col-md-4 col-sm-12">
                                <div className="lab-card">
                                    <div className="icon">
                                        <i className="flaticon-037-idea" />
                                    </div>
                                    <h2>SMART MARKETING</h2>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla..</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* card section end*/}
                {/* About contant */}
                <div className="about-contant">
                    <div className="container">
                        <div className="section-title">
                            <h2>Get in <span>the Lab</span> and discover the world</h2>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur leo est, feugiat nec elementum id, suscipit id nulla. Nulla sit amet luctus dolor. Etiam finibus consequat ante ac congue. Quisque porttitor porttitor tempus. Donec maximus ipsum non ornare vporttitor porttitorestibulum. Sed libero nibh, feugiat at enim id, bibendum sollicitudin arcu.</p>
                            </div>
                            <div className="col-md-6">
                                <p>Cras ex mauris, ornare eget pretium sit amet, dignissim et turpis. Nunc nec maximus dui, vel suscipit dolor. Donec elementum velit a orci facilisis rutrum. Nam convallis vel erat id dictum. Sed ut risus in orci convallis viverra a eget nisi. Aenean pellentesque elit vitae eros dignissim ultrices. Quisque porttitor porttitorlaoreet vel risus et luctus.</p>
                            </div>
                        </div>
                        <div className="text-center mt60">
                            <a href className="site-btn">Trang chủ khoa Công nghệ thông tin và truyền thông Đại học Cần Thơ</a>
                        </div>
                        {/* popup video */}
                        <div className="intro-video">
                            <div className="row">
                                <div className="col-md-8 col-md-offset-2">
                                    <img src="img/video.jpg" alt="" />
                                    <a href="https://www.youtube.com/watch?v=JgHfx2v9zOU" className="video-popup">
                                        <i className="fa fa-play" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SectionAbout;