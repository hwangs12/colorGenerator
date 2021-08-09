import React, { useState, useEffect } from "react";
import SingleColor from "./SingleColor";

import Values from "values.js";

function App() {
	const [color, setColor] = useState("");
	const [error, setError] = useState(false);
	const [list, setList] = useState(new Values("#f15025").all(10));

	useEffect(() => {
		if (error) {
			const timeout = setTimeout(() => {
				setError(!error);
			}, 2000);
			return () => clearTimeout(timeout);
		}
	});

	const handleChange = (e) => {
		setColor(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		try {
			let colors = new Values(color).all(10);
			setList(colors);
			setError(false);
		} catch (error) {
			setError(true);
		}
	};

	return (
		<>
			<section className="container">
				<h3>color generator</h3>
				<form action="" onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="#f15025"
						className={`${error ? "error" : null}`}
						value={color}
						onChange={handleChange}
					/>
					<button className="btn" type="submit">
						submit
					</button>
				</form>
				<div style={{ color: "red" }}>
					{error && "please input valid hex/rgb code"}
				</div>
			</section>
			<section className="colors">
				{list.map((colorObj, index) => {
					return (
						<SingleColor key={index} {...colorObj} index={index} />
					);
				})}
			</section>
		</>
	);
}

export default App;
