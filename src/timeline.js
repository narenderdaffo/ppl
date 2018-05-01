import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Postform from './postform';
import Categoryform from './categoryform';
import Header from './header';
class Timeline extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: localStorage.getItem('email'),
			allpost: [],
			value: false,
			allcat: null,
		};
		console.log('this.state.email', this.state.email);

		console.log(localStorage.getItem('email'));
	}
	updatedata = () => {
		this.allposts();
	};
	change = () => {
		this.setState({ value: !this.state.value });
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
	componentDidMount() {
		this.allposts();

		if (localStorage.getItem('loginstatus') == 'logout') {
			this.props.history.push('/');
		}
	}

	render() {
		var value = this.state.value;
		return (
			<div>
				<meta charSet="utf-8" />
				<title>Home</title>
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
							<div className="rght_btn">
								{' '}
								<span className="rght_btn_icon">
									<img src="images/btn_iconb.png" alt="up" />
								</span>{' '}
								<span className="btn_sep">
									<img src="images/btn_sep.png" alt="sep" />
								</span>{' '}
								<button id="uploadpost" onClick={this.change}>
									Upload Post
								</button>{' '}
							</div>
							<Categoryform />
							<div className="rght_cate">
								<div className="rght_cate_hd" id="opn_cat_bg">
									Featured
								</div>
								<div className="sub_dwn">
									<div className="feat_sec">
										<div className="feat_sec_img">
											<img src="images/feat_img1.png" alt="image" />
										</div>
										<div className="feat_txt">Lorem Ipusum Text</div>
									</div>
									<div className="feat_sec">
										<div className="feat_sec_img">
											<img src="images/feat_img2.png" alt="image" />
										</div>
										<div className="feat_txt">Lorem Ipusum Text</div>
										<div className="btm_rgt">
											<div className="btm_arc">Dogs</div>
										</div>
									</div>
									<div className="feat_sec">
										<div className="feat_sec_img">
											<img src="images/feat_img3.png" alt="image" />
										</div>
										<div className="feat_txt">Lorem Ipusum Text</div>
										<div className="btm_rgt">
											<div className="btm_arc">Rabbits</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="content_lft">
							<div className="contnt_1">
								<div className="list_1">
									<ul>
										<li>
											<input type="checkbox" className="chk_bx" />
											Friends
										</li>
										<li>
											<input type="checkbox" className="chk_bx" />
											Flaged
										</li>
									</ul>
								</div>
								<div className="timeline_div">
									<div className="timeline_div1">
										<div className="profile_pic">
											<img src="images/timeline_img1.png" />
											<div className="profile_text">
												<a href="#">Change Profile Pic</a>
											</div>
										</div>
										<div className="profile_info">
											<div className="edit_div">
												<a href="#">
													Edit <img src="images/timeline_img.png" />
												</a>
											</div>
											<div className="profile_form">
												<ul>
													<li>
														<div className="div_name1">Name :</div>
														<div className="div_name2">
															{localStorage.getItem('username')}
														</div>
													</li>
													<li>
														<div className="div_name1">Sex :</div>
														<div className="div_name2">Unknown</div>
													</li>
													<li>
														<div className="div_name1">Description :</div>
														<div className="div_name3">
															This is an example of a comment. You can create as many
															comments like this one or sub comments as you like and
															manage all of your content inside Account.
														</div>
													</li>
												</ul>
											</div>
										</div>
									</div>
									<div className="timeline_div2">
										<ul>
											<li>
												<a href="#" className="active">
													Timeline{' '}
												</a>
											</li>
											<li>
												<a href="#">About </a>
											</li>
											<li>
												<a href="#">Album</a>
											</li>
											<li>
												<a href="#"> Pets</a>
											</li>
											<li>
												<a href="#">My Uploads </a>
											</li>
										</ul>
									</div>
								</div>
							</div>
							{this.state.valforcat && <Categoryform />}
							{value && <Postform fun={this.updatedata} />}

							{this.state.allpost.map(item => {
								return (
									<div className="contnt_2" key={item.description}>
										<div className="div_a">
											<div className="div_title">{item.description}</div>
											<div className="btm_rgt">
												<div className="btm_arc">{item.category}</div>
											</div>
											<div className="div_top">
												<div className="div_top_lft">
													<img src="images/img_6.png" />
													{localStorage.getItem('username')}
												</div>
												<div className="div_top_rgt">
													<span className="span_date">02 Jan 2014</span>
													<span className="span_time">11:15am</span>
												</div>
											</div>

											<div className="div_image">
												{console.log('item._id', item._id)}
												<Link to={'/singlepost/' + item._id}>
													{' '}
													<img src={'images/' + item.originalname} alt="pet" />
												</Link>
											</div>
											<div className="div_btm">
												<div className="btm_list">
													<ul>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="images/icon_001.png" alt="share" />
																</span>Share
															</a>
														</li>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="images/icon_002.png" alt="share" />
																</span>Flag
															</a>
														</li>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="images/icon_003.png" alt="share" />
																</span>
																{item.likes.length + ' Likes'}
															</a>
														</li>
														<li>
															<a href="#">
																<span className="btn_icon">
																	<img src="images/icon_004.png" alt="share" />
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
							<div className="contnt_2">
								<div className="div_a">
									<div className="div_title">
										User Interface PSD Source files Web Designing for web
									</div>
									<div className="btm_rgt">
										<div className="btm_arc">Cats</div>
									</div>
									<div className="div_top">
										<div className="div_top_lft">
											<img src="images/img_6.png" />Steave Waugh
										</div>
										<div className="div_top_rgt">
											<span className="span_date">02 Jan 2014</span>
											<span className="span_time">11:15am</span>
										</div>
									</div>
									<div className="div_image">
										<img src="images/lft_img.png" alt="pet" />
									</div>
									<div className="div_btm">
										<div className="btm_list">
											<ul>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_001.png" alt="share" />
														</span>Share
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_002.png" alt="share" />
														</span>Flag
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_003.png" alt="share" />
														</span>0 Likes
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_004.png" alt="share" />
														</span>4 Comments
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							<div className="contnt_2">
								<div className="div_a">
									<div className="div_title">
										User Interface PSD Source files Web Designing for web
									</div>
									<div className="btm_rgt">
										<div className="btm_arc">Dogs</div>
									</div>
									<div className="div_top">
										<div className="div_top_lft">
											<img src="images/img_6.png" />Steave Waugh
										</div>
										<div className="div_top_rgt">
											<span className="span_date">02 Jan 2014</span>
											<span className="span_time">11:15am</span>
										</div>
									</div>
									<div className="div_image">
										<img src="images/lft_img1.png" alt="pet" />
									</div>
									<div className="div_btm">
										<div className="btm_list">
											<ul>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_001.png" alt="share" />
														</span>Share
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_002.png" alt="share" />
														</span>Flag
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_003.png" alt="share" />
														</span>0 Likes
													</a>
												</li>
												<li>
													<a href="#">
														<span className="btn_icon">
															<img src="images/icon_004.png" alt="share" />
														</span>4 Comments
													</a>
												</li>
											</ul>
										</div>
									</div>
								</div>
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
export default Timeline;
