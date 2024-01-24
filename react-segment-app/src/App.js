import React, { useState } from "react";
import "./App.css";
import Button from "./components/Button";

function App() {
	const [popup, setPopup] = useState(false);
	const [selectedSchemaValue, setSelectedSchemaValue] = useState("");
	const [newSchema, setNewSchema] = useState([]);
	const [segmentName, setSegmentName] = useState([]);

	const handleSaveSeg = (e) => {
		e.preventDefault();
		setPopup(true);
	};

	const handleClosePopup = (e) => {
		e.preventDefault();
		setPopup(false);
	};

	const handleSegDropChange = (e) => {
		e.preventDefault();
		setSelectedSchemaValue(e.target.value);
	};

	const handleAddNewSchema = (e, selectedSchema) => {
		e.preventDefault();
		if (
			selectedSchema &&
			selectedSchema.label &&
			selectedSchema.value &&
			!newSchema.find((schema) => schema.value === selectedSchema.value)
		) {
			const modifiedLabel = selectedSchema.label.replace(/_/g, " ");
			setNewSchema((prevSchemas) => [
				...prevSchemas,
				{ label: modifiedLabel, value: selectedSchema.value },
			]);
			setSelectedSchemaValue("");
		}
	};

	const handleCancel = (e) => {
		e.preventDefault();
		setPopup(false);
	};

	const handleSegmentName = (e) => {
		e.preventDefault();
		setSegmentName(e.target.value);
	};

	const dropDownData = [
		{ label: "First Name", value: "first_name" },
		{ label: "Last Name", value: "last_name" },
		{ label: "Gender", value: "gender" },
		{ label: "Age", value: "age" },
		{ label: "Account Name", value: "account_name" },
		{ label: "City", value: "city" },
		{ label: "State", value: "state" },
	];

	const handleFinalSave = async (e) => {
		e.preventDefault();
		const segmentData = {
			segment_name: segmentName,
			schema: newSchema.map((schema) => ({ [schema.value]: schema.label })),
		};
		try {
			const response = await fetch(
				"https://webhook.site/03658363-df4f-4313-be2b-27a8b94519af",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(segmentData),
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`);
			}

			console.log("Data sent successfully!");
		} catch (error) {
			console.error("Error sending data:", error.message);
		}
		setPopup(false);
	};

	return (
		<div className="App w-full">
			<h1 className="text-center text-lg uppercase font-bold mt-6">
				View Audience
			</h1>
			<div className="w-full flex justify-center items-center mt-36">
				<Button
					text="Save segment"
					style="bg-slate-400 hover:bg-slate-600 hover:shadow-lg"
					onClick={handleSaveSeg}
				/>
			</div>
			{popup && (
				<div className="popup">
					<div className="popup-inner w-2/4">
						<div className="header flex items-center sticky justify-center bg-[#354f64] py-2 top-0">
							<h2 className="text-center font-bold w-full text-md uppercase">
								Saving Segment
							</h2>

							<Button
								text="x"
								style="close-btn rounded-3xl p-6 bg-accent flex justify-center items-center text-xl cursor-pointer"
								onClick={handleClosePopup}
							/>
						</div>
						<div className="content px-5">
							<form
								className="px-5 w-full overflow-x-hidden flex flex-col justify-center items-center mb-3"
								onSubmit={handleFinalSave}
							>
								<div className="flex gap-2 items-center justify-center mt-4">
									<h4 className="uppercase font-normal text-sm">
										Enter the Segment name:
									</h4>
									<input
										className="px-3 py-1 rounded-sm outline-none text-black text-sm"
										value={segmentName}
										onChange={handleSegmentName}
										type="text"
										required
									></input>
								</div>
								<div className="p-3 flex h-auto flex-col gap-4 justify-center items-center border border-blue-500 md:w-3/5 w-full my-4">
									{newSchema.map((schema, index) => (
										<select
											className="bg-black p-3 text-sm outline-none capitalize"
											key={index}
											value={schema.value}
											onChange={(e) => handleAddNewSchema(e, schema)}
										>
											<option className="capitalize" value="">
												{schema.label}
											</option>
											{dropDownData
												.filter(
													(option) =>
														!newSchema
															.map((s) => s.value)
															.includes(option.value)
												)
												.map((option) => (
													<option
														key={option.value}
														value={option.value}
														selected={schema.value === option.value}
													>
														{option.label}
													</option>
												))}
										</select>
									))}

									<select
										className="bg-black text-sm rounded-md cursor-pointer p-2.5 outline-none"
										value={selectedSchemaValue}
										onChange={handleSegDropChange}
									>
										<option value="" disabled>
											Add schema to segment
										</option>
										{dropDownData.map((option) => (
											<option
												className="appearance-none border-none text-white dropdown-select outline-none"
												key={option.value}
												value={option.value}
											>
												{option.label}
											</option>
										))}
									</select>
									<Button
										style="bg-[#E57200] text-sm"
										onClick={(e) =>
											handleAddNewSchema(e, {
												label: selectedSchemaValue,
												value: selectedSchemaValue,
											})
										}
										text="Add New Schema"
									/>
								</div>
								<div className="flex gap-4">
									<Button
										style="bg-[#1561AA]"
										type="submit"
										text="Save Segment"
									/>
									<Button
										style="bg-[#6F483A]"
										onClick={handleCancel}
										text="Cancel"
									/>
								</div>
							</form>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
