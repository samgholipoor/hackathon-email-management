interface ConfigProp {
	BASE_URL: string;
}

export const getConfig = (): ConfigProp => {
	return {
		BASE_URL: __BASE_URL__ || '/',
	};
};
