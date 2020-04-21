import React, {Component} from "react";
import { Link } from "react-router-dom";
import {Weather} from "./Weather";
//import { DataTypes } from "../data/Types";
import CountryData from "../utilities/CountryData";
import M from 'materialize-css';

export class MainNav extends Component {

	constructor(props) {
		super(props);
		this.state = {
			SearchString: "",
			ShowSearchBox: false
		}

		this.nameRef = React.createRef();
	}
	
	openWeatherNav = (ev) => {
		ev.preventDefault();
		document.getElementById("weather-details-nav").style.display = "block";
		document.getElementById("myWeatherNav").style.width = "100%";
		document.body.style.overflow = "hidden";
	}

	closeNav = (ev) => {
		ev.preventDefault();
		document.body.style.overflow = "auto";
		document.getElementById("weather-details-nav").style.display = "none";
		document.getElementById("myWeatherNav").style.width = 0;
	}

	clearData = (ev) => {
		//this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.ARTICLES);
	}

	clearHomeData = (ev) => {
		if (this.props.match.path === "/") {
			ev.preventDefault();
		}
	}

	openSearchBox = (ev) => {
		ev.preventDefault();
		this.setState({ShowSearchBox: !this.state.ShowSearchBox}, () => this.nameRef.current.focus());
	}

	handleChange = (ev) => {
		this.setState({[ev.target.name]: ev.target.value}, () => {
			this.handleEnter(this.state.SearchString);
		})
	}

	handleEnter = (text) => {
		//console.log(text);
		if (text) {
			this.props.history.push(`/search/${text}`);
		}
	}

	render() {
		return <React.Fragment>
			<div className="navbar-fixed">
				<nav className="blue darken-1">
				    <div className="nav-wrapper">
				    	<ul className="hide-on-med-and-down">
				    		<li>
				    			<Link to="/" className="logoFont myLogo" onClick={this.clearHomeData}>MetaHealth News</Link>
				    		</li>
				    		<li className="search_icon_container">
						        <form method="post">
						        	<input onChange={this.handleChange} value={this.state.SearchString} type="text" className="browser-default nav_input_field" max-length="140" autoComplete="off" placeholder="Search for health articles, headlines, news outlets..." name="SearchString" /> 
					        	</form>
					        </li>
				    	</ul>
				    	<ul className="hide-on-med-and-down right">
				    		{this.props.current_location && <li><Link to={`/headlines/${this.props.current_location['country_code'].toLowerCase()}`}><span className="fas fa-leaf"></span></Link></li>}
							<li><a data-target="desktop-slide-out" href="#!" className="white-text show-on-large text-darken-2 sidenav-trigger"><span className="fas fa-flag"></span></a></li>
							<li><Link to="/about"><span className="far fa-comment-alt"></span></Link></li>
				    	</ul>

				    	<ul className="hide-on-large-only">
				    		<li>
				    			<Link to="/" className="logoFont myLogo" onClick={this.clearHomeData}>MetaHealth News</Link>
				    		</li>
				    	</ul>
				    	<ul className="hide-on-large-only right">
							<li><Link to="/top-searches" onClick={this.openSearchBox}><span className="fas fa-search"></span></Link></li>
							<li><Link to="/saved-articles"><span className="fas fa-bookmark"></span></Link></li>
							<li><Link to="#" onClick={this.openWeatherNav}><span className="fas fa-sun"></span></Link></li>
							<li><Link to="/about"><span className="fas fa-comment-alt"></span></Link></li>
				    	</ul>
				    </div>
				</nav>
			</div>

			{(/Mobi|Android/i.test(navigator.userAgent)) && <div id="search_box" className={`${(this.state.ShowSearchBox) ? "show" : "hide"}`}>
				<input type="text" className="browser-default ugInputField" max-length="140" autoComplete="off" placeholder="Search for health articles, headlines, news outlets..." name="SearchString" onChange={this.handleChange} value={this.state.SearchString} autoFocus={ true } ref={ this.nameRef } /> 
			</div>}

			{this.props.current_location && <div className="row hide-on-large-only">
			    <div className="col s12">
			        <ul className="tabs ugTabs">
			        	<li className="tab col l3"><Link onClick={this.clearData} to={`/headlines/${this.props.current_location['country_code'].toLowerCase()}`} className={`btn white teal-text text-darken-2 ${(this.props.match.url === `/headlines/${this.props.current_location['country_code'].toLowerCase()}`) ? "disabled" : ""}`}>{this.props.current_location['country_name']}</Link></li>
			        	{(this.props.current_location['country_code'] !== "US") && <li className="tab col l3"><Link onClick={this.clearData} className={`btn white teal-text text-darken-2 ${(this.props.match.url === "/headlines/us") ? "disabled" : ""}`} to="/headlines/us">United States</Link></li>}
			        	{(this.props.current_location['country_code'] !== "GB") && <li className="tab col l3"><Link onClick={this.clearData} to="/headlines/gb" className={`btn white teal-text text-darken-2 ${(this.props.match.url === "/headlines/gb") ? "disabled" : ""}`}>United Kingdom</Link></li>}
			        	{(this.props.current_location['country_code'] !== "AU") && <li className="tab col l3"><Link onClick={this.clearData} to="/headlines/au" className={`btn white teal-text text-darken-2 ${(this.props.match.url === "/headlines/au") ? "disabled" : ""}`}>Australia</Link></li>}
			        	{(this.props.current_location['country_code'] !== "CA") && <li className="tab col l3"><Link onClick={this.clearData} to="/headlines/ca" className={`btn white teal-text text-darken-2 ${(this.props.match.url === "/headlines/ca") ? "disabled" : ""}`}>Canada</Link></li>}
			        	<li className="tab col l3"><a data-target="slide-out" href="#!" className="btn white teal-text text-darken-2 sidenav-trigger"><i className="fas fa-plus"></i> More</a></li>
			      </ul>
			    </div>
			</div>}

			{(/Mobi|Android/i.test(navigator.userAgent)) && <Weather {...this.props} closeNav={this.closeNav} />}

			<ul id="slide-out" className="sidenav">
				{CountryData.map(item => <li key={item.code}>
					<Link className={`btn btn-flat ugTextTransform sidenav-close ${(this.props.match.url === `/headlines/${item.code.toLowerCase()}`) ? "disabled" : ""}`} onClick={this.clearData} to={`/headlines/${item.code.toLowerCase()}`}>{item.value}</Link>
				</li>)}
			</ul>

			<ul id="desktop-slide-out" className="sidenav">
				{CountryData.map(item => <li key={item.code}>
					<Link className={`btn btn-flat ugTextTransform sidenav-close ${(this.props.match.url === `/headlines/${item.code.toLowerCase()}`) ? "disabled" : ""}`} onClick={this.clearData} to={`/headlines/${item.code.toLowerCase()}`}>{item.value}</Link>
				</li>)}
			</ul>
		</React.Fragment>
	}

	componentDidMount() {

	    let elems = document.querySelectorAll('.sidenav');
		let options = {edge: "right", preventScrolling: "false"};
    	M.Sidenav.init(elems, options);
	}
}