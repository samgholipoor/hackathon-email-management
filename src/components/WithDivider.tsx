interface WithDividerProps {
	title: string;
}

const WithDivider = ({ title }: WithDividerProps) => {
	return (
		<div>
			<h2 className="font-bold">{title}</h2>
			<div className="divider my-0"></div>
		</div>
	);
};

export default WithDivider;
