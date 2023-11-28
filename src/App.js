import React from "react";
import { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import CanvasDraw from "react-canvas-draw";
import { createGIF } from 'gifshot';

import './css/layout.css';
import './css/style.css';
import ColorButton from "./ColorButton.js";
import AnimationFrame from "./AnimationFrame.js";
import Preview from "./Preview.js";

import default_preview from "./img/default_preview.png";
import BrushButton from "./BrushButton.js";

const palette = [
	{
		name: "black", 
		color: "#000000" 
	},
	{ 
		name: "white", 
		color: "#FFFFFF" 
	},
	{ 
		name: "blue", 
		color: "#0000FF" 
	},
	{ 
		name: "red", 
		color: "#FF0000" 
	},
	{ 
		name: "green", 
		color: "#00FF00" 
	},
	{ 
		name: "yellow", 
		color: "#FFFF00" 
	},
	{
		name: "teal", 
		color: "#00FFFF" 
	},
	{ 
		name: "light green", 
		color: "#77ff6b" 
	},
	{ 
		name: "orange", 
		color: "#ff7300" 
	},
	{ 
		name: "brown", 
		color: "#874a18" 
	},
	{ 
		name: "purple", 
		color: "#FF00FF" 
	},
	{ 
		name: "gray", 
		color: "#AAAAAA" 
	}
]

function App() {//

	const canvasDrawRef = useRef(null);
	const latestFrameRef = useRef(null);

	const [image, setImage] = useState([])
	const [savedFrames, setSavedFrames] = useState([])
	const [brushColor, setBrushColor] = useState("#000000")
	const [brushSize, setBrushSize] = useState(2)
	const [progress, setProgress] = useState(0);
	const [currentFrame, setCurrentFrame] = useState(0);

	const [loadedData, setLoadedData] = useState("");
	const [preview, setPreview] = useState("");
	const [lazyBrush, setLazyBrush] = useState(true);

	useEffect(() => {
		console.log(latestFrameRef.current)

		if(latestFrameRef.current === null) return;

		console.log(image.length)
		console.log(latestFrameRef)
		latestFrameRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}, [image])

	useEffect(() => {

	}, [])
	/*
	useEffect(() => {
		if (!canvasDrawRef.current) return
		//if(savedFrames.length < 1) return
		canvasDrawRef.current.loadSaveData(savedFrames[currentFrame], true)

	}, [savedFrames])
*/
	const createGifClick = () => {
		if (image.length <= 0) return

		const options = {
			images: image,
			gifWidth: 400,
			gifHeight: 400,
			numWorkers: 5,
			frameDuration: 0.01,
			sampleInterval: 10,
			progressCallback: (e) => setProgress(parseInt(e * 100)),
		};

		createGIF(options, (obj) => {
			if (!obj.error) {
				const link = document.createElement('a');
				link.download = 'sample.gif';
				link.href = obj.image;
				link.click();
				setProgress(0);
			}
		});
	}

	const createGifPreview = () => {
		if (image.length <= 0) return
		const options = {
			images: image,
			gifWidth: 400,
			gifHeight: 400,
			numWorkers: 5,
			frameDuration: 0.01,
			sampleInterval: 10,
			progressCallback: (e) => setProgress(parseInt(e * 100)),
		};

		createGIF(options, (obj) => {
			if (!obj.error) {
				const link = document.createElement('a');
				link.click();
				setProgress(0);
				console.log(link);
				setPreview(obj.image);
			}
		});
	}


	const canvasDrawClear = () => {
		if (!canvasDrawRef.current) return
		canvasDrawRef.current.clear();
	}


	const canvasDrawExport = () => {
		if (!canvasDrawRef.current) return

		const img = canvasDrawRef.current.getDataURL("img", false, "#FFF");
		setImage([...image, img]);
		canvasDrawClear();
	}
	

	const canvasDrawSave = () => {
		if (!canvasDrawRef.current) return

		const savedData = canvasDrawRef.current.getSaveData();
		console.log(savedData);

		setSavedFrames([...savedFrames, savedData]);
	}


	const autoSaveChanges = () => {
		if (!canvasDrawRef.current) return

		if(savedFrames.length > 0){
			console.log("saving:" + currentFrame);

			const savedData = canvasDrawRef.current.getSaveData();

			const newSavedFrames = savedFrames.map((frame,i) => {
				if(i === currentFrame){
					frame = savedData;
				}
				return frame;
			})

			// const img = canvasDrawRef.current.getDataURL("img", false, "#FFF");

			// const newImageFrames = image.map((frame,i) => {
			// 	if(i === currentFrame){
			// 		frame = img;
			// 	}
			// 	return frame;
			// })
			//canvasDrawRef.current.loadSaveData(savedData, true)
			
			setLoadedData(savedData);
			//setImage(newImageFrames);
			setSavedFrames(newSavedFrames);
		}
		else {
			console.log("else:" + currentFrame);

			const savedData = canvasDrawRef.current.getSaveData();
	
			setSavedFrames([...savedFrames,savedData]);

			//const img = canvasDrawRef.current.getDataURL("img", false, "#FFF");
			//setImage([...image, img]);
		}
	}


	const createNewFrame = () => {
		console.log("create new Frame");

		const savedData = canvasDrawRef.current.getSaveData();
		setSavedFrames([...savedFrames, savedData]);

		const img = canvasDrawRef.current.getDataURL("img", false, "#FFF");
		setImage([...image, img]);

		canvasDrawClear();

		setCurrentFrame((currentFrame+1));

		
	}
	useEffect(() => {
		createGifPreview();
	}, [image])

	const clearGif = () => {
		setImage([])
	}

	const handleColorButtonClicked = (newColor) => {
		setBrushColor(newColor);
	}

	const handleBrushButtonClicked = (newBrushSize) => {
		setBrushSize(newBrushSize);
	}



	const onChangeF = () => {
		console.log("change");
		autoSaveChanges();
	}

	const getCurrentFrame = () => {
		if(savedFrames[currentFrame])
		{
			console.log("a");

			return savedFrames[currentFrame];
		} else {
			console.log("b");

			return "";
		}
	}

	const canvasDrawProps = {
		onChange: onChangeF,
		hideGrid: true,
		canvasWidth: 400,
		lazyRadius: lazyBrush ? 10 : 0,
		canvasHeight: 400,
		backgroundColor: "#FFF",
		brushRadius: brushSize,
		saveData: savedFrames[currentFrame],
		immediateLoading: true,
		brushColor: brushColor
	};

	//saveData: savedFrames[currentFrame],
	//immediateLoading: true

	return (
		<div className="App">
			<div className="editorPanel">
				<div className="leftPanel">
					<div className="colorContainer">
						{
							palette.length > 0 && palette.map((c, i) => {
								return <ColorButton
									key={i}
									handleColorButtonClicked={handleColorButtonClicked}
									color={c.color}
								/>
							})
						}
					</div>
					<div className="BrushContainer">
						<BrushButton
							handleBrushButtonClicked={handleBrushButtonClicked}
							brushSize={1}
						/>
						<BrushButton
							handleBrushButtonClicked={handleBrushButtonClicked}
							brushSize={2}
						/>
						<BrushButton
							handleBrushButtonClicked={handleBrushButtonClicked}
							brushSize={4}
						/>
					</div>
					<div className="brushOptionsContainer">
						<div 
							className={`brushOption ${!lazyBrush && 'disabled'}`}
							onClick={() => {setLazyBrush(!lazyBrush)}}
						>
							Lazy Brush
						</div>
					</div>
				</div>
				<div className="topWrapper">
					<div className="canvasWrapper">
						{
							image.length > 0 && <img src={image[image.length - 1]} className="lastFrame" alt="Embedded Image" />
						}
						<CanvasDraw ref={canvasDrawRef} {...canvasDrawProps} />

					</div>
				</div>
				<div className="rightPanel">
					<div className="previewWrapper">
						{
							image.length > 0
								? <Preview gif={preview} />
								: <Preview gif={default_preview} />
						}
					</div>
					<div className="frameContainer">
						{
							image.length > 0 && image.map((im, i) => {
								console.log("RRR")
								return <AnimationFrame ref={image.length === i + 1 ? latestFrameRef : null} key={i} image={im} />
							})
						}
						<div className="newFrameButton" onClick={createNewFrame}>+</div>
					</div>
				</div>
			</div>
			<div className="optionsPanel">
				<div className="buttonContainer">
					<div className="customButton" onClick={canvasDrawClear}>Clear Frame</div>
					<div className="customButton" onClick={clearGif}>Clear Project</div>
					<div className="customButton" onClick={createGifClick}>Download GIF</div>
				</div>
			</div>
		</div>
	);
}

export default App;
