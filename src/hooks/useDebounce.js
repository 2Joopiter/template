import { useRef, useState } from 'react';

export const useDebounce = (value, gap) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null);
	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, gap);

	return DebouncedVal;
};
