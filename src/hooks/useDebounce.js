import { useRef, useState } from 'react';

export const useDebounce = (value, gap) => {
	const [DebouncedVal, setDebouncedVal] = useState(value);
	const eventBlocker = useRef(null); // setTimeout의 리턴값을 받을 참조객체
	clearTimeout(eventBlocker.current);

	eventBlocker.current = setTimeout(() => {
		setDebouncedVal(value);
	}, gap);

	return DebouncedVal;
};
