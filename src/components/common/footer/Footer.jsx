import './Footer.scss';
import { NavLink, Link } from 'react-router-dom';
import { TiSocialInstagram } from 'react-icons/ti';
import { FaSquareXTwitter } from 'react-icons/fa6';
import { FaYoutubeSquare } from 'react-icons/fa';

// npm i react-icons (기본 아이콘 설치 가능)

export default function Footer() {
	return (
		<footer className='Footer'>
			<div className='footerBox'>
				<div className='titBox'>
					<h1>JOURNEY</h1>
				</div>
				<div className='content'>
					<ul>
						Menu
						<article className='menuBox'>
							<div className='menuLeft'>
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
							</div>
							<div className='menuRight'>
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
							</div>
							<div className='social'>
								<ul>
									<li>
										<TiSocialInstagram />
									</li>
									<li>
										<FaSquareXTwitter />
									</li>
									<li>
										<FaYoutubeSquare />
									</li>
								</ul>
								<form>
									<span>
										<input type='text' placeholder='Search' />
									</span>
								</form>
							</div>
						</article>
					</ul>
				</div>
			</div>

			<div className='copy'>
				<p>2023 Journey &copy; All Right Reserved. </p>
			</div>
		</footer>
	);
}
