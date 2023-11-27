import React from "react";
function BrushButton(props) {



    return (
        <div 
            className={`BrushButton brush${props.brushSize}`}
            onClick={() => props.handleBrushButtonClicked(props.brushSize)}
        />
    );
}

export default BrushButton;
