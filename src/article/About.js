import React, {Component} from "react";

export class About extends Component {
	render() {
		return <React.Fragment>
			<div className="row">
				<div className="col m8 offset-m2 s12">
				<br />
					<h5 className="grey-text text-darken-2 ugBigFont">
						<strong>About MetaHealth News</strong>
					</h5>
					<p className="grey-text text-darken-2">MetaHealth News is an automated healh news aggregator that curates a list of top health articles from 50+ countries.</p>
					<p className="grey-text text-darken-2">The thinking is that you can get information about what the top news oulets in a location (or your country) are reporting about a specific topic (eg: Coronavirus).</p>
					<br /><br />
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
					<input type="hidden" name="cmd" value="_s-xclick" />
					<input type="hidden" name="hosted_button_id" value="9J39YBTRTKERN" />
					<input type="image" src="https://www.paypalobjects.com/en_US/GB/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
					<img alt="" border="0" src="https://www.paypal.com/en_GB/i/scr/pixel.gif" width="1" height="1" />
					</form>
					<br /><br />

					<h6 className="grey-text text-darken-2">
						<strong>Credit</strong>
					</h6>
					<p>
						Built by <a target="_blank" rel="noopener noreferrer" className="teal-text text-darken-2" href="https://ugooguejiofor.herokuapp.com/">Ugo.</a>
					</p>
				</div>
			</div>
		</React.Fragment>
	}
}