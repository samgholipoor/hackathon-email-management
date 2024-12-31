import { useMemo } from 'react';
import Chart from './Chart';

interface DonutChart {
	x: string;
	y: number;
}

interface DonutChartProps {
	data: DonutChart[];
}

const DonutChart = ({ data }: DonutChartProps) => {
	const options = useMemo(
		() => ({
			chart: {
				type: 'donut',
				height: '400px',
			},
			plotOptions: {
				pie: {
					donut: {
						labels: {
							show: true,
						},
					},
				},
			},
			legend: {
				show: false,
			},
			series: data.map((d) => d.y || 0),
			labels: data.map((d) => d.x),
		}),
		[data],
	);

	return <Chart options={options} />;
};

export default DonutChart;
