import React, {Component} from "react";

export class Trends extends Component {
	render() {
		return <React.Fragment>
			{
				(this.props.trends && !this.props.trends.error) && <div className="card-panel grey lighten-4 trendsPanel z-depth-0">
					<h6 className="grey-text text-darken-2 ugMediumFont">In the news</h6>
					<div className="divider"></div>
					<br />
					{this.props.trends.default.trendingSearchesDays.map(obj => obj.trendingSearches.map(item => <div className="chip" key={item.title['query']}>{item.title['query']}</div>))}
				</div>
			}

			{
				(this.props.trends && this.props.trends.error) && <div className="">
					<div className="card-panel white">
						<h3 className="center grey-text text-darken-2">:(</h3>
						<p className="center">Cannot retrieve trends information at this time.</p>
					</div>
				</div>
			}
		</React.Fragment>
	}
}