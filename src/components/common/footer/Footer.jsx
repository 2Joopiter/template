import './Footer.scss';
import { NavLink, Link } from 'react-router-dom';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { IoLogoYoutube } from 'react-icons/io';

// npm i react-icons (기본 아이콘 설치 가능)

export default function Footer() {
	return (
		<footer className='Footer'>
			<div className='footerMenu'>
				<h1>Home</h1>
				<ul>
					Menu
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

			<div className='social'>
				<p>2023 home &copy; All Right Reserved. </p>

				<ul>
					<li>
						<TiSocialInstagram />
					</li>
					<li>
						<FaSquareXTwitter />
					</li>
					<li>
						<IoLogoYoutube />
					</li>
				</ul>
			</div>
		</footer>
	);
}
