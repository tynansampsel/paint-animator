import React,{ forwardRef, useEffect } from "react";


const AnimationFrame = forwardRef((props, ref) => {
	return (
		<img 
			className="AnimationFrame" 
			src={props.image} 
			alt="Embedded Image"
			ref={ref}
		/>
	);
})

export default AnimationFrame;
