<div>
	<meta charSet="utf-8" />
	<title>Singal Post</title>

	<div className="navbar navbar-inverse navbar-fixed-top">
		<div className="navbar-inner">
			<div className="container">
				<button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse">
					{' '}
					<span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" />{' '}
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
					<a href="#">Upload Post</a>{' '}
				</div>
				<div className="rght_btn">
					{' '}
					<span className="rght_btn_icon">
						<img src="/images/btn_icona.png" alt="up" />
					</span>{' '}
					<span className="btn_sep">
						<img src="/images/btn_sep.png" alt="sep" />
					</span>{' '}
					<a href="#">Invite Friends</a>{' '}
				</div>
				<div className="rght_cate">
					<div className="rght_cate_hd" id="rght_cat_bg">
						Categories
					</div>
					<div className="rght_list">
						<ul>
							<li>
								<a href="#">
									<span className="list_icon">
										<img src="/images/icon_01.png" alt="up" />
									</span>{' '}
									CATS
								</a>
							</li>
							<li>
								<a href="#">
									<span className="list_icon">
										<img src="/images/icon_02.png" alt="up" />
									</span>{' '}
									Dogs
								</a>
							</li>
							<li>
								<a href="#">
									<span className="list_icon">
										<img src="/images/icon_03.png" alt="up" />
									</span>{' '}
									Birds
								</a>
							</li>
							<li>
								<a href="#">
									<span className="list_icon">
										<img src="/images/icon_04.png" alt="up" />
									</span>{' '}
									Rabbit
								</a>
							</li>
							<li>
								<a href="#">
									<span className="list_icon">
										<img src="/images/icon_05.png" alt="up" />
									</span>{' '}
									Others
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="rght_cate">
					<div className="rght_cate_hd" id="opn_cat_bg">
						Featured
					</div>
					<div className="sub_dwn">
						<div className="feat_sec">
							<div className="feat_sec_img">
								<img src="/images/feat_img1.png" alt="image" />
							</div>
							<div className="feat_txt">Lorem Ipusum Text</div>
						</div>
						<div className="feat_sec">
							<div className="feat_sec_img">
								<img src="/images/feat_img2.png" alt="image" />
							</div>
							<div className="feat_txt">Lorem Ipusum Text</div>
							<div className="btm_rgt">
								<div className="btm_arc">Dogs</div>
							</div>
						</div>
						<div className="feat_sec">
							<div className="feat_sec_img">
								<img src="/images/feat_img3.png" alt="image" />
							</div>
							<div className="feat_txt">Lorem Ipusum Text</div>
							<div className="btm_rgt">
								<div className="btm_arc">Rabbits</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{this.state.currentpost.map(item => {
				return (
					<div className="content_lft">
						<div className="contnt_2">
							<div className="div_a">
								<div className="div_title">{item.description}</div>
								<div className="btm_rgt">
									<div className="btm_arc">{item.category}</div>
								</div>
								<div className="div_top">
									<div className="div_top_lft">
										<img src="/images/img_6.png" />
										{item.email}
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
												<a href="#">
													<span className="btn_icon">
														<img src="/images/icon_003.png" alt="share" />
													</span>0 Likes
												</a>
											</li>
											<li>
												<a href="#">
													<span className="btn_icon">
														<img src="/images/icon_004.png" alt="share" />
													</span>4 Comments
												</a>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>

						<form method="post" onSubmit={this.sendcomment}>
							<div className="cmnt_div1">
								<input
									name="currentcomment"
									type="text"
									value={this.state.name}
									onChange={this.change}
									placeholder="Enter your Comment"
									className="cmnt_bx1"
								/>
								<input type="submit" className="sub_bttn1" defaultValue="Submit Comment" />
							</div>
						</form>
					</div>
				);
			})}
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
</div>;
