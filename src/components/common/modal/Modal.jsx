import './Modal.scss';
import { useSelector, useDispatch } from 'react-redux';
import * as types from '../../../redux/action';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

export default function Modal({ children }) {
	const dispatch = useDispatch();
	const Open = useSelector((store) => store.modalReducer.modal);

	return (
		<AnimatePresence>
			{Open && (
				<motion.aside
					className='Modal'
					initial={{ opacity: 0, y: '-100%', scale: 0, rotate: -45 }}
					animate={{ opacity: 1, y: '0%', scale: 1, rotate: 0 }}
					exit={{ opacity: 0, y: '100%', transition: { delay: 0.5 } }}
					transition={{ duration: 0.7 }}
				>
					<motion.div
						className='con'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { delay: 0 } }}
						transition={{ duration: 0.5, delay: 1 }}
					>
						{children}
					</motion.div>
					<span
						onClick={() => {
							dispatch({ type: types.MODAL.start, payload: false });
						}}
					>
						<IoClose />
					</span>
				</motion.aside>
			)}
		</AnimatePresence>
	);
}
