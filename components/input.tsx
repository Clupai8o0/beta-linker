import React from "react";

interface iInput {
	name: string;
	type: string;
	placeholder: string;
	value: string;
	setValue: React.Dispatch<React.SetStateAction<string>>;
	isValid: string;
}

const Input = ({
	name,
	type,
	placeholder,
	value,
	setValue,
	isValid,
}: iInput) => {
	return (
		<div>
			<label
				htmlFor="helper-text"
				className={`block mb-2 text-sm font-medium capitalize ${
					isValid.length === 0 ? "text-white" : "text-red-500"
				}`}
				style={{ fontFamily: "Montserrat" }}
			>
				{name}
			</label>

			<input
				type={type}
				className={`border text-sm rounded-lg block w-full py-3 px-4  bg-transparent focus:ring-blue-500 focus:border-blue-500 ${
					isValid.length === 0
						? "border-gray-600 text-white placeholder-gray-400"
						: "border-red-500 text-red-500 placeholder-red-800"
				}`}
				placeholder={placeholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>

			<p
				className={`mt-2 text-sm text-red-500 transition-all duration-300 ease-in-out ${
					isValid.length === 0 ? "hidden" : ""
				}`}
			>
				{isValid}
			</p>
		</div>
	);
};

export default Input;
