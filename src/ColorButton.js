import React from "react";
function ColorButton(props) {



    return (
        <div 
            className="ColorButton"
            style={{backgroundColor: props.color}}
            onClick={() => props.handleColorButtonClicked(props.color)}
        />
    );
}

export default ColorButton;
