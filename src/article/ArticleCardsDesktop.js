import React, {Component} from "react";
import { Link } from "react-router-dom";
import {cleanUrlText} from "../utilities/cleanUrlText";
import ReactTimeAgo from 'react-time-ago';

export class ArticleCardsDesktop extends Component {
	render() {
		return this.props.items && <React.Fragment>
			{
				this.props.items.map(item => <div key={item._id} className="card white ugCard z-depth-0">
					<div className="card-content">
						<div className="row">
							<div className="col l9">
								<h5 className="ugTitle">
									<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-4 ugCardLink"><b>{item.title}</b></Link>
								</h5>
								<small className="grey-text">{item.source.name} - <span><ReactTimeAgo date={Date.parse(item.publishedAt)}/></span></small>
							</div>
							<div className="col l3">
								<Link to={`/article/${cleanUrlText(item.title)}/${item._id}`} className="grey-text text-darken-2">
									<img src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif" data-src={item.urlToImage || `/unavailable-image.png`} data-srcset={`${item.urlToImage || `/unavailable-image.jpg`} 1x`} className="cover responsive-img cardImage lazy" alt={item.title} />
								</Link>
							</div>
						</div>
					</div>
				</div>
				)
			}
		</React.Fragment>
	}
}