import React from "react";

export const Preloader = (props) => <div className="row container">
	<div className="col s12 center">
		<br /><br />
		<div className="preloader-wrapper small active center">
		    <div className="spinner-layer spinner-blue-only">
		        <div className="circle-clipper left">
		            <div className="circle"></div>
		        </div><div className="gap-patch">
		            <div className="circle"></div>
		        </div><div className="circle-clipper right">
		            <div className="circle"></div>
		        </div>
		    </div>
	    </div>
	    <br /><br />
	 </div>
</div>