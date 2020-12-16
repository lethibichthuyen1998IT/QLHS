import React, { Component } from 'react';

class Header extends Component {
    render() {
        return (

            <header className="header-section">
                <div className="logo">
                    <img src="img/logo1.png" alt="" />{/* Logo */}
                </div>
                {/* Navigation */}
                <div className="responsive"><i className="fa fa-bars" /></div>
                <nav>
                    <ul className="menu-list">
                        <li className="active"><a href="home.html">Trang chủ</a></li>
                        <li><a href="services.html">Công tác</a></li>
                        <li><a href="services.html">Rèn luyện</a></li>
                        <li><a href="blog.html">Thông báo</a></li>
                        <li className="dropdown">
                            <a href="home.html" className="dropbtn">Lê Thị Bích Thuyền </a>
                            <div className="dropdown-content">
                                <a href="elements.html">Thông tin cá nhân</a>
                                <a href="elements.html">Đổi mật khẩu</a>
                                <a href="elements.html">Đăng xuất</a>
                            </div>
                        </li>
                    </ul>
                </nav>
            </header>
        
        );

    }
}

export default Header;