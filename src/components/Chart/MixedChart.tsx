import { useCallback, useState } from 'react';
import { Button } from '@khesht/react';
import { mergeClassNames } from '@/utils/classname';
import Icon from '../Icon';
import ColumnChart from './ColumnChart';
import DonutChart from './DonutChart';

interface ChartData {
	x: string;
	y: number;
}

interface MixedChartProps {
	numericalWeightedData: ChartData[];
	numericalData: ChartData[];
	hasWeightedCount?: boolean;
	hasCountFormat?: boolean;
}

const MixedChart = ({
	numericalWeightedData,
	numericalData,
	hasWeightedCount = true,
	hasCountFormat = true,
}: MixedChartProps) => {
	const [currentChart, setCurrentChart] = useState<'column' | 'donut'>('column');
	const [chartType, setChartType] = useState<'numerical' | 'weighted'>('weighted');

	const RenderNumericalWeightedChart = useCallback(() => {
		switch (currentChart) {
			case 'column':
				return <ColumnChart data={numericalWeightedData} />;
			case 'donut':
				return <DonutChart data={numericalWeightedData} />;
			default:
				return null;
		}
	}, [currentChart, numericalWeightedData]);

	const RenderNumericalChart = useCallback(() => {
		switch (currentChart) {
			case 'column':
				return <ColumnChart data={numericalData} />;
			case 'donut':
				return <DonutChart data={numericalData} />;
			default:
				return null;
		}
	}, [currentChart, numericalData]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex justify-between items-center">
				<div className="flex items-center gap-2">
					<div
						className={mergeClassNames('flex justify-center items-center p-1', {
							'bg-base-300 rounded': currentChart === 'column',
						})}
						onClick={() => setCurrentChart('column')}
					>
						<Icon name="bar_chart_24dp" className="w-8 cursor-pointer" />
					</div>
					<div
						className={mergeClassNames('flex justify-center items-center p-1', {
							'bg-base-300 rounded': currentChart === 'donut',
						})}
						onClick={() => setCurrentChart('donut')}
					>
						<Icon name="donut_chart_24dp" className="w-8 cursor-pointer " />
					</div>
				</div>

				{hasWeightedCount ? (
					<div className="flex items-center gap-2">
						<Button
							className={mergeClassNames({
								'!bg-gray-300': chartType !== 'weighted',
							})}
							onClick={() => setChartType('weighted')}
							small
						>
							آرا
						</Button>
						{hasCountFormat ? (
							<Button
								className={mergeClassNames({
									'!bg-gray-300': chartType !== 'numerical',
								})}
								onClick={() => setChartType('numerical')}
								small
							>
								شرکت کنندگان
							</Button>
						) : null}
					</div>
				) : null}
			</div>
			<div>
				{chartType === 'numerical' ? <RenderNumericalChart /> : null}
				{chartType === 'weighted' ? <RenderNumericalWeightedChart /> : null}
			</div>
		</div>
	);
};

export default MixedChart;
