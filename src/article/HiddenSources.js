import React, {Component} from "react";
import { DataTypes } from "../data/Types";

export class HiddenSources extends Component {
	constructor(props) {
		super(props);
		this.state = {
			item: null
		}
	}

	handleRemoveAll = ev => {
		ev.preventDefault();
		let {cookies} = this.props;
		let userId = cookies.get("user_id") || null;

		this.props.banned_sources && this.props.banned_sources.forEach(item => {
			this.setState({item});
			this.props.undoBanSource && this.props.undoBanSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: item});
			document.getElementById(item).classList.add("hide");
		})

		document.getElementById("removeAll").classList.add("hide");

		//this.props.clearArticlesData && this.props.clearArticlesData(DataTypes.BANNED_SOURCES);
	}

	handleDelete = sourceName => ev => {
		ev.preventDefault();
		this.setState({item: sourceName});
		let {cookies} = this.props;
		let userId = cookies.get("user_id") || null;

		this.props.undoBanSource && this.props.undoBanSource(DataTypes.BAN_SOURCE, {userId: userId, sourceName: sourceName});
	}

	render() {
		return <React.Fragment>
			<h5 className="center grey-text text-darken-2 ugBigFont">
				<strong>Sources you have blocked.</strong>
			</h5>
			<br />
			{
				(this.props.banned_sources && this.props.banned_sources.length !== 0 && !this.props.banned_sources.error) && <div className="row">
					<div className="col s12">
						<div className="right">
							<a href="#!" onClick={this.handleRemoveAll} id="removeAll" className="btn teal-text text-darken-2 white ugArticleDetailsBtn">Remove All</a> &nbsp; &nbsp;
							<br /><br />
						</div>

						<div className="container">
							<table>
								<tbody>
									{
										this.props.banned_sources && this.props.banned_sources.map(item => <tr id={item} key={item}>
											<td className="ugIconBan"><i className="fas fa-globe-europe grey-text text-darken-2"></i></td>
											<td>{item}</td>
											<td className="right">
												<a href="#!" onClick={this.handleDelete(item)} className="grey-text text-darken-2">
													<i className="fas fa-trash"></i>
												</a>
											</td>
										</tr>)
									}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			}

			{
				(this.props.banned_sources && this.props.banned_sources.length === 0) && <div>
					<p className="center">
						You haven't blocked any sources.
					</p>
				</div>
			}

			{
				(this.props.banned_sources && this.props.banned_sources.error) && <div>
					<p className="center">
						Sorry an error occured white loading your blocked sources list. Our developers have been notified of this issue.
					</p>
				</div>
			}
		</React.Fragment>
	}

	componentDidMount() {
		let {cookies} = this.props;
		let userId = cookies.get("user_id") || null;

		this.props.loadBannedSources && this.props.loadBannedSources(DataTypes.BANNED_SOURCES, {userId})
	}

	componentDidUpdate(prevProps) {
		if (prevProps.ban_source !== this.props.ban_source) {
			if (this.props.ban_source.undone) {
				document.getElementById(`${this.state.item}`).classList.add("hide");
			}
		}
	}
}