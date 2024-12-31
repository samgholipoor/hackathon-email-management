import { useEffect, useState } from 'react';
import { readCSVFile } from '@/utils/file';

const useReadCSVFile = (csvFile: File) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState(null);
	const [header, setHeader] = useState<string[]>([]);
	const [body, setBody] = useState<string[][]>([]);

	useEffect(() => {
		setLoading(true);
		async function readFile() {
			try {
				const { header: h, body: b } = (await readCSVFile(csvFile)) || {
					header: [],
					body: [],
				};
				setHeader(h);
				setBody(b);
			} catch (e) {
				setError(e as any);
			} finally {
				setLoading(false);
			}
		}

		readFile();
	}, [csvFile]);

	return { header, body, loading, error };
};

export default useReadCSVFile;
