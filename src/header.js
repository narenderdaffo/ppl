import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
class Header extends Component {
	constructor(props) {
		super(props);
		console.log('in login app', this.props);
		this.state = {};
	}
	makingfalse() {
		localStorage.setItem('loginstatus', 'logout');
	}

	render() {
		return (
			<div className="header">
				<div className="header_lft">
					<div className="logo">
						<Link to="/">
							<a href="#">
								<img src="/images/logo.png" />
							</a>
						</Link>
					</div>
					<div className="navigatn">
						<ul>
							<li>
								<Link to="/homes">
									<a href="#" className="active">
										Home
									</a>
								</Link>
							</li>
							<li>
								<a href="#"> E-Coupons </a>
							</li>
							<li>
								<a href="#">E-Brands </a>
							</li>
							<li>
								<a href="#"> Resuse Market </a>
							</li>
							<li>
								<a href="#"> Lost and Found</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="header_rgt">
					<div className="flag_div">
						<img src="/images/flag.png" />
					</div>
					<input type="text" placeholder="Search" className="txt_box" />
					<div className="msg_box">
						<a href="#">
							<span className="msg_count">100</span>
						</a>
					</div>
					<div className="info_div">
						<div className="image_div">
							{' '}
							<img src="/images/pic.png" />{' '}
						</div>
						<div className="info_div1">
							<div class="dropdown">
								<button class="dropbtn">Me</button>
								<div class="dropdown-content">
									<Link to="/timeline">
										<a href="#">My Profile</a>
									</Link>
									<Link to="/login" onClick={this.makingfalse}>
										<a href="#">Logout</a>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Header;
