import React, {Component} from "react";
import ReactTimeAgo from 'react-time-ago';
import M from 'materialize-css';

export class ArticleComments extends Component {
	render() {
		return <React.Fragment>
			{
				this.props.comments && <ul className="collection">
					{
						this.props.comments['data'].map(obj => <li key={obj._id} id={`collection_item_${obj._id}`} className="collection-item avatar">
							<i className="circle">{obj.author.charAt(0)}</i>
							<span className="title grey-text text-darken-2">{obj.author}</span>
							<p className="grey-text text-darken-2">
								{obj.comment} <br />
								<small className="grey-text text-darken-2"><ReactTimeAgo date={Date.parse(obj.publishedAt)}/>  {(obj.userId === this.props.userId) ? <a href={`#modal_${obj._id}`} className="modal-trigger right grey-text text-darken-2">Delete</a> : ""}</small>
							</p>

						</li>)
					}
				</ul>
			}

			{
				this.props.comments && this.props.comments['data'].map(obj => <div key={obj._id} id={`modal_${obj._id}`} className="modal ugDeleteCommentModal">
					<div className="modal-content">
						<h5 className="grey-text text-darken-2 ugBigFont center">Are you sure you want to delete?</h5>
						<br />
						<p className="center">
							<button onClick={this.props.handeleDeleteComment(obj._id)} className="ugArticleDetailsBtn red darken-2 white-text btn btn-flat modal-close">Delete</button> &nbsp; &nbsp; <button className="ugArticleDetailsBtn white teal-text text-darken-2 btn btn-flat modal-close">Cancel</button>
						</p>
					</div>
				</div>)
			}
		</React.Fragment>
	}

	componentDidMount() {
    	let elems = document.querySelectorAll('.modal');
    	let options = {}
    	M.Modal.init(elems, options);
	}

	componentDidUpdate() {
		let elems = document.querySelectorAll('.modal');
    	let options = {}
    	M.Modal.init(elems, options);
	}
}