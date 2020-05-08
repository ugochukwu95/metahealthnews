import React, {Component} from "react";
import { Link } from "react-router-dom";
import M from 'materialize-css';
import CountryData from "../utilities/CountryData";

export class DesktopNavList extends Component {
	render() {
		let {cookies} = this.props;
		let userId = cookies.get("user_id") || null;

		return <React.Fragment>
			<ul id="slide-out" className="sidenav desktop sidenav-fixed left-aligned">
				{
					this.props.current_location && <li className={(this.props.match && this.props.match.path === "/") ? "active" : ""}>
						<Link to={`/`}>
							<i className="material-icons fas fa-leaf"></i>Top Stories
						</Link>
					</li>
				}
				<li className={(this.props.match && this.props.match.path === "/saved-articles") ? "active" : ""}>
					<Link to="/saved-articles">
						<i className="material-icons far fa-bookmark"></i>Saved Articles
					</Link>
				</li>
				{
					userId && <li className={(this.props.match && this.props.match.path === "/hidden-sources") ? "active" : ""}>
						<Link to="/hidden-sources">
							<i className="material-icons fas fa-ban"></i>Blocked Sources
						</Link>
					</li>
				}
				<li>
					<div className="divider"></div>
				</li>
				{
					CountryData.map(item => <li key={item.code} className={`${(this.props.match.url === `/headlines/${item.code.toLowerCase()}`) ? "active" : ""}`}>
						<Link className={`${(this.props.match.url === `/headlines/${item.code.toLowerCase()}`) ? "disabled active" : ""}`} onClick={this.clearData} to={`/headlines/${item.code.toLowerCase()}`}>
							<i className="material-icons far fa-flag"></i>{item.value}
						</Link>
					</li>)
				}
			</ul>
		</React.Fragment>
	}

	componentDidMount() {
		let elems = document.getElementById('slide-out');
		let options = {edge: "left"};
    	M.Sidenav.init(elems, options);
	}
}