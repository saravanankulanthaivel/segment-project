import React from "react";

const Button = ({ onClick, text, style, type }) => {
	return (
		<button
			className={`p-2 shadow-lg transition-all ease-in-out uppercase text-sm font-medium rounded-md text-white ${style}`}
			onClick={onClick}
			type={type}
		>
			{text}
		</button>
	);
};

export default Button;
