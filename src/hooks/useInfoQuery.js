import { useQuery } from '@tanstack/react-query';

const path = process.env.PUBLIC_URL;

const fetchInfo = async () => {
	const response = await fetch(`${path}/DB/depart-info.json`);
	const data = await response.json();
	return data.about;
};

export const useInfoQuery = () => {
	return useQuery(['fetchInfo'], fetchInfo, {
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		cacheTime: 1000 * 60 * 60 * 24,
		staleTime: 1000 * 60 * 60 * 24,
		retry: 3,
	});
};
