/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const DataRenderer = ({
	success,
	data,
	errorMessage,
	render,
}: {
	success: boolean;
	data: any[];
	errorMessage?: string | undefined;
	render: (data: any[]) => React.ReactNode;
}) => {
	if (!success)
		return (
			<p className="text-2xl text-center">
				{errorMessage || "Something went wrong!"}
			</p>
		);

	if (!data || !data.length)
		return <p className="text-2xl text-center">No Data Found!</p>;

	return <div>{render(data)}</div>;
};

export default DataRenderer;
