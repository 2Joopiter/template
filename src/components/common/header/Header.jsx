import './Header.scss';
import { NavLink, Link } from 'react-router-dom';
import { SlMenu } from 'react-icons/sl';

export default function Header({ Dark, setDark, Toggle, setToggle }) {
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
							<NavLink to='/members' activeClassName={'on'}>
								Member
							</NavLink>
						</li>
						<li>
							<NavLink to='/contact' activeClassName={'on'}>
								Contact
							</NavLink>
						</li>
					</ul>
				</div>

				<div className={`themeBox ${Dark && 'dark'}`} onClick={() => setDark(!Dark)}>
					<div className='ball'></div>
				</div>
			</div>

			<button className='menuToggle' onClick={() => setToggle(!Toggle)}>
				<SlMenu />
			</button>
		</header>
	);
}
