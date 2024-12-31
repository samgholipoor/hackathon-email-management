import Chart from './Chart';

interface ColumnChart {
	x: string;
	y: number;
}

interface ColumnChartProps {
	data: ColumnChart[];
}

const ColumnChart = ({ data }: ColumnChartProps) => {
	const options = {
		chart: {
			type: 'bar',
			height: '400px',
			offsetX: -20,
		},
		grid: {
			padding: {
				left: 40,
			},
		},
		plotOptions: {
			bar: {
				distributed: true,
			},
		},
		legend: {
			show: false,
		},
		series: [
			{
				name: '',
				data,
			},
		],
		// TODO: test to see no issue
		xaxis: {
			categories: data.map((x) => x.x),
			labels: {
				rotate: 90,
			},
		},
	};

	return <Chart options={options} />;
};

export default ColumnChart;
