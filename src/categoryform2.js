import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

class Categoryform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			category: '',
			status: false,
			fileToBeSent: null,
			entry: false,
			email: localStorage.getItem('email'),
			allcat: [],
			garbage: '',
		};
		this.senddata = this.senddata.bind(this);
		this.onDrop = this.onDrop.bind(this);
	}
	changeforcat = () => {
		console.log('changeforcat is called');
		this.setState({ entry: !this.state.entry });
	};
	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
	onDrop(acceptedFiles, rejectedFiles) {
		console.log('Accepted files: ', acceptedFiles[0]);

		this.setState({ fileToBeSent: acceptedFiles[0] });

		console.log('this.state.filetobesen', this.state.fileToBeSent);
	}

	/*allcat = () => {
		let formdata = new FormData();
		formdata.append('email', this.state.email);

		let options = {
			method: 'Post',
			body: formdata,
		};
		fetch('http://localhost:3993/postform/allcat', options)
			.then(r => {
				return r.text();
			})
			.then(data => {
				// Here's a list of repos!
				console.log('res send by server of allpost', data);
				this.setState({ allcat: data });
			});
		this.setState({ status: true, entry: false });
		//console.log('allpost is called');
	};*/

	allcat = () => {
		fetch('http://localhost:3993/category/allcat', {
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
				this.setState({ allcat: data });
			});
		});
		this.setState({ status: true, entry: false });
		//console.log('allpost is called');
	};
	senddata(e) {
		console.log('senddata');
		e.preventDefault();
		console.log('this is the state', this.state);
		let formdata = new FormData();
		formdata.append('category', this.state.category);
		formdata.append('fileToBeSent', this.state.fileToBeSent);
		formdata.append('email', this.state.email);

		let options = {
			method: 'Post',
			body: formdata,
		};
		if (this.state.category == '' || this.state.fileToBeSent == null) {
			console.log('first write some content');
			alert('first write some content');
		} else {
			fetch('http://localhost:3993/category/category', options)
				.then(r => {
					return r.text();
				})
				.then(data => {
					// Here's a list of repos!
					console.log(data);
					if (data == 'success') {
						this.setState({ garbage: data });
						console.log('toggle called');
						this.allcat();
					}
				});
		}
	}
	componentWillMount() {
		this.allcat();
	}

	render() {
		{
			console.log('this.state.allcat', this.state.allcat);
		}
		return (
			<div>
				<div className="rght_btn">
					{' '}
					<span className="rght_btn_icon">
						<img src="/images/btn_icona.png" alt="up" />
					</span>{' '}
					<span className="btn_sep">
						<img src="/images/btn_sep.png" alt="sep" />
					</span>{' '}
					<button id="uploadcat" onClick={this.changeforcat}>
						Upload Category
					</button>{' '}
				</div>
				{this.state.entry && (
					<div>
						<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
						<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
						<center>
							<h1>Submit Category</h1>
							<form onSubmit={this.senddata} encType="multipart/form-data">
								<br /> Category:
								<input type="text" name="category" value={this.state.category} onChange={this.change} />
								<br />
								<br />
								<br />
								<Dropzone name="fileToBeSent" onDrop={files => this.onDrop(files)}>
									<div id="dropzonecode">UPLOAD FILE HERE</div>
								</Dropzone>
								File to be uploaded are:
								<br />
								<br />
								<input type="submit" value="submit" />
							</form>
						</center>
					</div>
				)}
				<div className="rght_cate">
					<div className="rght_cate_hd" id="rght_cat_bg">
						Categories
					</div>
					<div className="rght_list">
						<ul>
							{this.state.allcat.map(item => {
								return (
									<li>
										<a href="#">
											<span className="list_icon">
												<img id="catimg" src={'/images/' + item.originalname} alt="up" />
											</span>{' '}
											{item.category}
										</a>
									</li>
								);
							})}

							<l1 />
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

export default Categoryform;
