import { HTMLProps, useEffect, useMemo, useRef } from 'react';
import ApexCharts from 'apexcharts';

interface Chart extends HTMLProps<HTMLDivElement> {
	options?: any;
}

const Chart = ({ options = { chart: {} }, ...props }: Chart) => {
	const chartElement = useRef(null);

	const mergedOptions = useMemo(
		() => ({
			...options,
			colors: ['#f97316', '#a78bfa', '#22c55e', '#ef4444'],
			chart: {
				type: 'area',
				fontFamily: 'iransans',
				toolbar: {
					show: true,
					offsetX: 0,
					offsetY: 0,
					tools: {
						zoomin: true,
						zoomout: true,
						download: false,
						selection: false,
						zoom: false,
						pan: true,
						reset: false,
					},
				},
				...options?.chart,
			},
		}),
		[options],
	);

	useEffect(() => {
		let chart: any = {};

		if (chartElement.current) {
			chart = new ApexCharts(chartElement.current, mergedOptions);
			chart.render();
		}

		return () => {
			if (chart) {
				chart.destroy();
			}
		};
	}, [chartElement, mergedOptions]);

	return <div ref={chartElement} {...props} />;
};

export default Chart;
