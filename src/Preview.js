import React from "react";
function Preview(props) {
	return (
		<img 
			className="Preview" 
			src={props.gif} 
			alt="Embedded Image"
		/>
	);
}

export default Preview;
