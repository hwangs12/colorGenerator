import React, { useState, useEffect } from "react";
import rgbToHex from "./utils";

const SingleColor = ({ rgb, weight, index }) => {
	const [copied, setCopied] = useState(false);
	const bcg = rgb.join(",");

	useEffect(() => {
		if (copied) {
			const timeout = setTimeout(() => {
				setCopied(!copied);
			}, 3000);
			return () => clearTimeout(timeout);
		}
	}, [copied]);

	const handleClick = () => {
		setCopied(true);
		navigator.clipboard.writeText(rgbToHex(...rgb));
	};

	return (
		<article
			className={`color ${index > 10 && "color-light"}`}
			style={{ backgroundColor: `rgb(${bcg})` }}
			onClick={handleClick}
		>
			<p className="percent-value">{weight} %</p>
			<p className="color-value">{rgbToHex(...rgb)}</p>
			{copied && <p className="alert">copied to clipboard</p>}
		</article>
	);
};

export default SingleColor;
