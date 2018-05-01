import React, { Component } from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';

class Postform extends Component {
	constructor(props) {
		super(props);
		this.state = {
			description: '',
			category: '',
			fileToBeSent: null,
			status: true,
			updatingpost: false,
			email: localStorage.getItem('email'),
			allpost: [],
			allcat: [],
		};
		this.senddata = this.senddata.bind(this);
		this.onDrop = this.onDrop.bind(this);
		this.allposts();
	}
	change = e => {
		this.setState({ [e.target.name]: e.target.value });
	};
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
	onDrop(acceptedFiles, rejectedFiles) {
		console.log('Accepted files: ', acceptedFiles[0]);

		this.setState({ fileToBeSent: acceptedFiles[0] });
	}
	senddata(e) {
		console.log('senddata');
		e.preventDefault();
		console.log('this is the state', this.state);
		let formdata = new FormData();
		formdata.append('description', this.state.description);
		formdata.append('category', this.state.category);
		formdata.append('fileToBeSent', this.state.fileToBeSent);
		formdata.append('email', this.state.email);

		let options = {
			method: 'Post',
			body: formdata,
		};
		//	fetch('http://localhost:3993/postform/postform', options).then(function(res) {
		//	console.log('res', res);
		//});
		if (this.state.description == '' || this.state.category == '' || this.state.fileToBeSent == null) {
			console.log('first write some content');
			alert('first write some content');
		} else {
			fetch('http://localhost:3993/postform/postform', options)
				.then(r => {
					return r.text();
				})
				.then(data => {
					// Here's a list of repos!
					console.log(data);
					if (data == 'postformRouter file1') {
						this.allposts();
						this.props.allposts();
						console.log('toggle called');
					}
				});
		}
	}
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
		this.setState({ updatingpost: true, status: !this.state.status });
		console.log('allpost is called');
		this.props.fun();
	};
	componentWillMount() {
		this.allcat();
	}
	render() {
		{
			console.log('this.state.allpost', this.state.allpost);
		}
		return (
			<div>
				{this.state.status && (
					<div>
						{console.log('this is the state', this.state)}
						<link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
						<link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
						<center>
							<h1>Submit Post</h1>
							<form onSubmit={this.senddata} encType="multipart/form-data">
								Description:
								<input type="text" name="description" value={this.state.name} onChange={this.change} />
								<br />
								<br />
								<br /> Category:<select
									name="category"
									form="catform"
									value={this.state.name}
									onChange={this.change}
								>
									<option value="Select Something" />;
									{this.state.allcat.map(item => {
										return <option value={item.category}>{item.category}</option>;
									})}
								</select>
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
			</div>
		);
	}
}

export default Postform;
