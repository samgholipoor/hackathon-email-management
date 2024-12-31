import { useMemo } from 'react';
import ReactPaginate from 'react-paginate';
import { mergeClassNames } from '@/utils/classname';

interface Pagination {
	currentPage: number;
	setCurrentPage?: (e: number) => void;
	totalItems: number;
	itemsPerPage?: number;
	className?: string;
}

function Pagination({
	currentPage,
	setCurrentPage = () => {},
	totalItems,
	itemsPerPage = 10,
	className,
}: Pagination) {
	const pageCount = useMemo(
		() => Math.ceil(totalItems / itemsPerPage),
		[totalItems, itemsPerPage],
	);

	const initialPage = useMemo(
		() => (currentPage > 0 ? currentPage - 1 : 0),
		[currentPage],
	);

	const handlePageClick = ({ selected }: { selected: number }) => {
		const selectedPageNum: number = selected + 1;
		setCurrentPage?.(selectedPageNum);
	};

	return (
		<>
			{pageCount ? (
				<ReactPaginate
					// initialPage={initialPage}
					forcePage={initialPage}
					breakLabel="..."
					nextLabel=">"
					previousLabel="<"
					onPageChange={handlePageClick}
					pageRangeDisplayed={1}
					pageCount={pageCount}
					renderOnZeroPageCount={null}
					containerClassName={mergeClassNames(
						'flex gap-2 items-center select-none',
						className,
					)}
					pageLinkClassName="bg-base-300 px-2 py-1 rounded-md"
					activeLinkClassName="bg-primary bg-opacity-30"
					previousLinkClassName="bg-base-300 rounded-md px-2 py-1 text-lg"
					nextLinkClassName="bg-base-300 rounded-md px-2 py-1 text-lg"
					breakLinkClassName="bg-base-300 rounded-md px-2 py-1 text-lg"
				/>
			) : null}
		</>
	);
}

export default Pagination;
