import { formatNumber } from '@/utils/formatNumber';

interface Price {
	children: number | string;
}

const Price = ({ children }: Price) => {
	return (
		<div className="flex items-center justify-center gap-1">
			<span>{formatNumber(children, '0')}</span>
			<span className="text-sm">ریال</span>
		</div>
	);
};

export default Price;
