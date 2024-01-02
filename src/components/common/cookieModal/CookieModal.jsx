import { useRef, useState } from 'react';
import './CookieModal.scss';
import { useCookie } from '../../../hooks/useCookie';

export default function CookieModal({ wid, ht, children }) {
	const { isCookie, setCookie } = useCookie();
	const checkEl = useRef(null);
	const [Close, setClose] = useState(isCookie('today=done'));

	const handleClose = () => {
		const isChecked = checkEl.current.checked;
		if (isChecked) setCookie('today', 'done', 20);
		setClose(true);
	};

	return (
		<>
			{/* Close값이 false 이면 팝업보임처리 */}
			{!Close && (
				<aside
					className='CookieModal'
					style={{ width: wid, height: ht, marginLeft: -wid / 2, marginTop: -ht / 2 }}
				>
					<div className='content'>{children}</div>

					<div className='controls'>
						<nav>
							<input ref={checkEl} type='checkbox' />
							<span>오늘 하루 팝업 보지않기</span>
						</nav>

						<span className='close' onClick={handleClose}>
							close
						</span>
					</div>
				</aside>
			)}
		</>
	);
}
