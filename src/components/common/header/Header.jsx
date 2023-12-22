import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { SlMenu } from 'react-icons/sl';
import { useDispatch, useSelector } from 'react-redux';
import * as types from '../../../redux/actionType';

export default function Header() {
	const dispatch = useDispatch();
	const Toggle = useSelector((store) => store.menuReducer.menu);
	const Dark = useSelector((store) => store.darkReducer.dark);
	return (
		<header className='Header'>
			<div className='title'>
				<h1>
					<Link to='/'>JOURNEY</Link>
				</h1>
				<h2>
					ENJOY <br /> UR Journey
				</h2>
			</div>

			<div className='menuBox'>
				<div className='menu'>
					<ul>
						<li>
							<NavLink to='/department' activeClassName={'on'}>
								Department
							</NavLink>
						</li>
						<li>
							<NavLink to='/youtube' activeClassName={'on'}>
								Youtube
							</NavLink>
						</li>
						<li>
							<NavLink to='/gallery' activeClassName={'on'}>
								Gallery
							</NavLink>
						</li>
						<li>
							<NavLink to='/community' activeClassName={'on'}>
								Community
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
						<li>
							<NavLink to='/members' activeClassName={'on'}>
								Members
							</NavLink>
						</li>
					</ul>
				</div>

				<div className={`themeBox ${Dark && 'dark'}`} onClick={() => dispatch({ type: types.DARK.start, payload: !Dark })}>
					<div className='ball'></div>
				</div>
			</div>

			<button className='menuToggle' onClick={() => dispatch({ type: types.MENU.start, payload: !Toggle })}>
				<SlMenu />
			</button>
		</header>
	);
}
