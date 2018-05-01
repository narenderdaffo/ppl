import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Header2 from './header2';
class Login extends Component {
	constructor(props) {
		super(props);
		console.log('in login app', this.props);
		this.state = {
			email: '',
			password: '',
			status: '',
			username: '',
		};
		this.loging = this.loging.bind(this);
		this.validateEmail = this.validateEmail.bind(this);
		this.validatepassword = this.validatepassword.bind(this);
	}
	change = e => {
		this.setState({ [e.target.name]: e.target.value });
		console.log('change is called in login.js');
	};
	blocking(e) {
		e.preventDefault();
	}
	validateEmail() {
		var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
		console.log('in validateemail function');
		if (!this.state.email.match(reEmail)) {
			this.setState({ status: 'Invalid email address' });
		} else {
			this.validatepassword();
		}
	}
	validatepassword() {
		if (this.state.password.length > 7) {
			this.loging();
		} else {
			this.setState({ status: 'Minimum Password length is 8 ' });
		}
	}

	loging() {
		console.log('loging function in login file');

		if (this.state.email == '' || this.state.password == '') {
			console.log('Do nothing');
		} else {
			fetch('http://localhost:3993/login', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email: this.state.email,
					password: this.state.password,
				}),
			}).then(r => {
				r.json().then(data => {
					// Here's a list of repos!
					console.log(data[0].username);
					this.setState({ username: data[0].username });
					localStorage.setItem('username', data[0].username);

					if (data == 'password incorrect') {
						this.setState({ status: 'Password Incorrect' });
					} else if (data == 'Email not found') {
						this.setState({ status: 'Email Not Found' });
					} else {
						this.setState({ status: 'Successfully Logined' });
						localStorage.setItem('loginstatus', 'logined');
						this.props.history.push({ pathname: '/timeline', state: { email: this.state.email } });
						localStorage.setItem('email', this.state.email);
					}
				});
			});
		}
	}
	componentWillMount() {
		console.log('this is login router');
		if (localStorage.getItem('loginstatus') == 'logined') {
			this.props.history.push('/timeline');
		}
	}
	render() {
		return (
			<div>
				<meta charSet="utf-8" />
				<title>Login Account</title>
				<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
				<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
				<Header2 />
				<div className="navbar navbar-inverse navbar-fixed-top">
					<div className="navbar-inner">
						<div className="container">
							<button
								type="button"
								className="btn btn-navbar"
								data-toggle="collapse"
								data-target=".nav-collapse"
							>
								{' '}
								<span className="icon-bar" /> <span className="icon-bar" />{' '}
								<span className="icon-bar" />{' '}
							</button>
							<a className="brand" href>
								PPL
							</a>

							<div className="pro_info pull-right">
								<div className="pro_icn">
									<img src="images/pic_small.png" />
								</div>
								<div className="pro_txt">
									Me<b className="caret" />
								</div>
								<ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
									<li>
										<a tabIndex={-1} href="#">
											My Profile
										</a>
									</li>
									<li>
										<a tabIndex={-1} href="#">
											Message Box
										</a>
									</li>
									<li>
										<a tabIndex={-1} href="#">
											Change Language
										</a>
									</li>
									<li className="divider" />
									<li>
										<a tabIndex={-1} href="#">
											<input type="text" placeholder="search" />
										</a>
									</li>
								</ul>
							</div>

							<div className="nav-collapse collapse">
								<ul className="nav">
									<li className="active">
										{' '}
										<a href>Home</a>{' '}
									</li>
									<li className>
										{' '}
										<a href>E-Coupons</a>{' '}
									</li>
									<li className>
										{' '}
										<a href>E-Brands</a>{' '}
									</li>
									<li className>
										{' '}
										<a href>Resuse Market</a>{' '}
									</li>
									<li className>
										{' '}
										<a href>Lost and Found</a>{' '}
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>

				<div className="container">
					<div className="content">
						<div className="content_rgt">
							<div className="login_sec">
								<h1>Login</h1>
								<form onSubmit={this.blocking}>
									<ul>
										<li>
											<span>Email-ID</span>
											<input
												type="text"
												id="email"
												placeholder="Enter your email"
												name="email"
												value={this.state.name}
												onChange={this.change}
												ref="email"
												required
											/>
										</li>
										<li>
											<span>Password</span>
											<input
												type="password"
												id="password"
												placeholder="Enter your password"
												name="password"
												value={this.state.name}
												onChange={this.change}
												ref="password"
												required
											/>
										</li>
										<li>
											<input type="checkbox" />Remember Me
										</li>
										<li>
											<input type="submit" defaultValue="Log In" onClick={this.validateEmail} />
											<Link to="/forget">
												{' '}
												<a href>Forgot Password</a>
											</Link>
										</li>
										<h1 id="status">{this.state.status}</h1>
									</ul>
								</form>
								<div className="addtnal_acnt">
									I do not have any account yet.<Link to="/register">
										<a href>Create My Account Now !</a>
									</Link>
								</div>
							</div>
						</div>

						<div className="content_lft">
							<h1>Welcome from PPL!</h1>
							<p className="discrptn">
								There are many variations of passages of Lorem Ipsum available, but the majority have
								suffered alteration in some form, by injected humour, or randomised words which don't
								look even slightly believable. If you are going to use a passage of Lorem Ipsum, you
								need to be sure there isn't anything embarrassing hidden in the middle of text.{' '}
							</p>
							<img src="images/img_9.png" alt />{' '}
						</div>
					</div>
				</div>
				<div className="clear" />
				<div className="footr">
					<div className="footr_lft">
						<div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
						<div className="footer_div2">
							<a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a>
						</div>
					</div>
					<div className="footr_rgt">
						<ul>
							<li>
								<a href="#">
									<img src="images/social_1.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="images/social_2.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="images/social_3.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="images/social_4.png" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Login;
