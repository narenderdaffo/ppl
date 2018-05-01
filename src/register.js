import React, { Component } from 'react';
import './index.css';
import {Link} from 'react-router-dom';
import Header2 from './header2';
class Register extends Component {
  constructor(props){
    super(props)
    console.log('in register app',this.props);
    this.state ={
      username: '',
      password: '',
      email: '',
      firstname: '',
      lastname: '',
      status:''
    }
    this.registering=this.registering.bind(this);
    this.validateEmail=this.validateEmail.bind(this);
    this.validatepassword=this.validatepassword.bind(this);
  }
  change = (e)=>{
    this.setState({ [e.target.name] :   e.target.value})
    console.log('change is called')
  }
  validateEmail() {
    var reEmail = /^(?:[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+\.)*[\w\!\#\$\%\&\'\*\+\-\/\=\?\^\`\{\|\}\~]+@(?:(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!\.)){0,61}[a-zA-Z0-9]?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9\-](?!$)){0,61}[a-zA-Z0-9]?)|(?:\[(?:(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\.){3}(?:[01]?\d{1,2}|2[0-4]\d|25[0-5])\]))$/;
    console.log('in validateemail function')
    if(!this.state.email.match(reEmail)) {
      this.setState({status:'Invalid email address'});
      console.log('in validemail if',this.state.status);
      
    }
    else{
    console.log('in validemail else',this.state.status);
    this.validatepassword();
    }
  }
  validatepassword(){
      if(this.state.password.length>7){
        this.registering();
        console.log('in validepassword if',this.state.status);
      }
      else{
        this.setState({status:'Password Length lessthen 8'});
        console.log('in validepassword else',this.state.status);
      }
  }
  blocking(e)
    {
            e.preventDefault();
    }
  registering(){
    console.log('Register function in app.js');
    console.log(this.state.status);
 
  if(this.state.username=='' || this.state.password=='' || this.state.email=='' || this.state.firstname=='' || this.state.lastname=='' )
  {
    console.log('register if consition');
  }
  else
  {
  fetch('http://localhost:3993/adddata/adddata', {
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
         username: this.state.username,
          password: this.state.password,
          email: this.state.email,
          firstname: this.state.firstname,
          lastname: this.state.lastname
  }),
}).then(r=>{
 return  r.text()
})
.then(data => {
  // Here's a list of repos!
  console.log(data)
  if(data.length>40){
    this.setState({status:'ACCOUNT CREATED SUCCESSFULLY'});
  }
  if(data=='Email alredy exists'){
    this.setState({status:'Email already used'});
  }
});
  }
}
  render() {
    return (
      <div>
      <meta charSet="utf-8" />
      <title>Create An Account</title>
      <link href="css/bootstrap.css" rel="stylesheet" type="text/css" />
      <link href="css/bootstrap-responsive.css" rel="stylesheet" type="text/css" />
      <Header2 />
      <div className="navbar navbar-inverse navbar-fixed-top">
        <div className="navbar-inner">
          <div className="container">
            <button type="button" className="btn btn-navbar" data-toggle="collapse" data-target=".nav-collapse"> <span className="icon-bar" /> <span className="icon-bar" /> <span className="icon-bar" /> </button>
            <a className="brand" href>PPL</a>
            <div className="pro_info pull-right">
              <div className="pro_icn"><img src="images/pic_small.png" /></div>
              <div className="pro_txt">Me<b className="caret" /></div>
              <ul className="dropdown-menu" role="menu" aria-labelledby="dLabel">
                <li><a tabIndex={-1} href="#">My Profile</a></li>
                <li><a tabIndex={-1} href="#">Message Box</a></li>
                <li><a tabIndex={-1} href="#">Change Language</a></li>
                <li className="divider" />
                <li><a tabIndex={-1} href="#">
                    <input type="text" placeholder="search" />
                  </a></li>
              </ul>
            </div>
            <div className="nav-collapse collapse">
              <ul className="nav">
                <li className="active"> <a href>Home</a> </li>
                <li className> <a href>E-Coupons</a> </li>
                <li className> <a href>E-Brands</a> </li>
                <li className> <a href>Resuse Market</a> </li>
                <li className> <a href>Lost and Found</a> </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
     
      <div className="container">
        <div className="content">
          <div className="content_rgt">
            <div className="register_sec">
              <h1>Create An Account</h1>
              <form onSubmit={this.blocking}>
              <ul>
                <li><span>Username</span><input type="text" id='form_inputs' placeholder="Enter your username" name='username'  value ={this.state.name} onChange={this.change} ref = "username" required/></li>
                <li><span>Password</span><input type="password" id='form_inputs' placeholder="Enter your password" name='password' value ={this.state.name}  onChange={this.change} ref = "password" required/></li>
                <li><span>Email</span><input type="text" id='form_inputs' placeholder="Enter your email" name='email' value ={this.state.name}  onChange={this.change} ref = "email" required/></li>
                <li><span>First Name</span><input type="text" id='form_inputs' placeholder="Enter your first name" name='firstname' value ={this.state.name}  onChange={this.change} ref = "firstname" required/></li>
                <li><span>Last Name</span><input type="text"  id='form_inputs' placeholder="Enter your last name"name='lastname' value ={this.state.name}  onChange={this.change} ref = "lastname" required /></li>
                <li><input type="checkbox" id='checkbox' required/>I agree to Term &amp; Conditions</li>
                <li><input type="submit" defaultValue="Register" onClick={this.validateEmail}/></li>
              </ul>
              </form>
              <div className="addtnal_acnt">I already have an account.<Link to='/login'><a href>Login My Account !</a></Link></div>
              <h1 id='status'>{this.state.status}</h1>
            </div>
          </div>
          <div className="content_lft">
            <h1>Welcome from PPL!</h1>
            <p className="discrptn">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. </p>
            <img src="images/img_9.png" alt /> </div>
        </div>
      </div>
      <div className="clear" />
      <div className="footr">
        <div className="footr_lft">
          <div className="footer_div1">Copyright © Pet-Socail 2014 All Rights Reserved</div>
          <div className="footer_div2"><a href="#">Privacy Policy </a>| <a href="#"> Terms &amp; Conditions</a></div>
        </div>
        <div className="footr_rgt">
          <ul>
            <li><a href="#"><img src="images/social_1.png" /></a></li>
            <li><a href="#"><img src="images/social_2.png" /></a></li>
            <li><a href="#"><img src="images/social_3.png" /></a></li>
            <li><a href="#"><img src="images/social_4.png" /></a></li>
          </ul>
        </div>
      </div>
    </div>
    );
  }
}
export default Register;


