import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Header from './header';
import Postform from './postform';
import Categoryform2 from './categoryform2';

class Singlepost extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: props.match.params.id,
			currentpost: [],
			status: false,
			currentcomment: '',
			value: false,
			likes: 'like',
			allpost: null,
		};
	}
	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	sendcomment = e => {
		e.preventDefault();
		fetch('http://localhost:3993/comment', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				comment: this.state.currentcomment,
				id: this.state.id,
				currentpost: this.state.currentpost,
				username: localStorage.getItem('username'),
			}),
		})
			.then(r => {
				r.json().then(data => {
					console.log(data);

					this.currentpost();
				});
			})
			.catch(err => {
				console.log('errr', err);
			});
	};
	updatedata = () => {
		this.allposts();
	};
	allposts = () => {
		let formdata = new FormData();
		formdata.append('email', this.state.email);

		let options = {
			method: 'Post',
			body: formdata,
		};
		fetch('http://localhost:3993/postform/allpost', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email: this.state.email,
			}),
		}).then(r => {
			r.json().then(data => {
				// Here's a list of repos!
				console.log('res send by server of allpost', data);
				this.setState({ allpost: data });
			});
		});
		console.log('this.state.allpost', this.state.allpost);
		console.log('allpost is called');
	};
	changevalue = () => {
		this.setState({ value: !this.state.value });
	};
	currentpost = () => {
		fetch('http://localhost:3993/singlepost', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				id: this.state.id,
			}),
		})
			.then(r => {
				r.json().then(data => {
					// Here's a list of repos!

					this.setState({ currentpost: data });
					this.setState({ currentcomment: '' });
				});
			})
			.catch(err => {
				console.log('errr', err);
			});
	};
	componentWillMount() {
		this.currentpost();
		if (localStorage.getItem('loginstatus') == 'logout') {
			this.props.history.push('/');
		}
	}
	likes = () => {
		console.log('this.state.likes', this.state.likes);
		fetch('http://localhost:3993/likes', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				likes: this.state.likes,
				id: this.state.id,
				username: localStorage.getItem('username'),
				email: localStorage.getItem('email'),
			}),
		})
			.then(r => {
				r.json().then(data => {
					console.log(data);
					var newState = this.state.likes === 'like' ? 'unlike' : 'like';

					this.setState({ likes: newState });
					this.currentpost();
				});
			})
			.catch(err => {
				console.log('errr', err);
			});
	};

	render() {
		return (
			<div>
				<meta charSet="utf-8" />
				<title>Singal Post</title>
				<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
				<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
				<Header />
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
									<img src="/images/pic_small.png" />
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
							<div className="rght_btn">
								{' '}
								<span className="rght_btn_icon">
									<img src="/images/btn_iconb.png" alt="up" />
								</span>{' '}
								<span className="btn_sep">
									<img src="/images/btn_sep.png" alt="sep" />
								</span>{' '}
								<button id="uploadpost" onClick={this.changevalue}>
									Upload Post
								</button>{' '}
							</div>

							{<Categoryform2 />}
						</div>
						<div className="content_lft">
							{this.state.value && <Postform fun={this.updatedata} />}
							{this.state.currentpost.map(item => {
								return (
									<div className="contnt_2">
										<div className="div_a">
											<div className="div_title">{item.description}</div>
											<div className="btm_rgt">
												<div className="btm_arc">{item.category}</div>
											</div>
											<div className="div_top">
												<div className="div_top_lft">
													<img src="/images/img_6.png" />
													{localStorage.getItem('username')}
												</div>
												<div className="div_top_rgt">
													<span className="span_date">02 Jan 2014</span>
													<span className="span_time">11:15am</span>
												</div>
											</div>
											<div className="div_image">
												<img src={'/images/' + item.originalname} alt="pet" />
											</div>
											<div className="div_btm">
												<div className="btm_list">
													<ul>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="/images/icon_001.png" alt="share" />
																</span>Share
															</a>
														</li>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="/images/icon_002.png" alt="share" />
																</span>Flag
															</a>
														</li>
														<li>
															<a onClick={this.likes}>
																<span className="btn_icon">
																	<img src="/images/icon_003.png" alt="share" />
																</span>
																{item.likes.length + ' Likes'}
															</a>
														</li>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="/images/icon_004.png" alt="share" />
																</span>
																{item.comments.length + ' Comments'}
															</a>
														</li>
													</ul>
												</div>
											</div>
										</div>
									</div>
								);
							})}
							<div className="contnt_3">
								<ul>
									{this.state.currentpost.map(item => {
										return (
											<li>
												{item.comments.map(item2 => {
													return (
														<li>
															<div className="list_image">
																<div className="image_sec">
																	<img src="/images/post_img.png" />
																</div>
																<div className="image_name">{item2.username}</div>
															</div>
															<div className="list_info">{item2.comment}</div>
															<input
																type="button"
																defaultValue="Reply"
																className="orng_btn"
															/>
														</li>
													);
												})}
											</li>
										);
									})}
									<li>
										<form method="post" onSubmit={this.sendcomment}>
											<div className="cmnt_div1">
												<input
													name="currentcomment"
													type="text"
													value={this.state.currentcomment}
													onChange={this.change}
													placeholder="Enter your Comment"
													className="cmnt_bx1"
												/>
												<input
													type="submit"
													className="sub_bttn1"
													defaultValue="Submit The Comment"
												/>
											</div>
										</form>
									</li>
								</ul>
							</div>
						</div>
					</div>

					<div className="clear" />
				</div>
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
									<img src="/images/social_1.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="/images/social_2.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="/images/social_3.png" />
								</a>
							</li>
							<li>
								<a href="#">
									<img src="/images/social_4.png" />
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Singlepost;
