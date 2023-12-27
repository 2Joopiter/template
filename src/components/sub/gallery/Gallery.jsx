import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { useFlickrQuery } from '../../../hooks/useFlickrQuery';
import { useGlobalData } from '../../../hooks/useGlobalData';
import Masonry from 'react-masonry-component';
import Layout from '../../common/layout/Layout';
import { LuSearch } from 'react-icons/lu';
import Modal from '../../common/modal/Modal';
import './Gallery.scss';

export default function Gallery() {
	const [Index, setIndex] = useState(0);
	const myID = useRef('199646606@N06');
	const refNav = useRef(null);
	const isUser = useRef(myID.current);
	const refFrameWrap = useRef(null);
	const gap = useRef(5);
	const searched = useRef(false);
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);
	const [Opt, setOpt] = useState({ type: 'user', id: myID.current });
	const { data: Pics, isSuccess } = useFlickrQuery(Opt);
	const { setModalOpen } = useGlobalData();

	const activateBtn = (e) => {
		const btns = refNav.current.querySelectorAll('button');
		btns.forEach((btn) => btn.classList.remove('on'));
		e && e.target.classList.add('on');
	};
	const handleInterest = (e) => {
		if (e.target.classList.contains('on')) return;
		isUser.current = '';
		activateBtn(e);
		setOpt({ type: 'interest' });
	};
	const handleMine = (e) => {
		if (e.target.classList.contains('on') || isUser.current === myID.current) return;
		isUser.current = myID.current;
		activateBtn(e);
		setOpt({ type: 'user', id: myID.current });
	};
	const handleUser = (e) => {
		if (isUser.current) return;
		isUser.current = e.target.innerText;
		activateBtn();
		setOpt({ type: 'user', id: e.target.innerText });
	};

	const handleSearch = (e) => {
		e.preventDefault();
		isUser.current = '';
		activateBtn();
		const keyword = e.target.children[0].value;
		if (!keyword.trim()) return;
		e.target.children[0].value = '';
		setOpt({ type: 'search', keyword: keyword });
		searched.current = true;
	};

	useEffect(() => {
		refFrameWrap.current.style.setProperty('--gap', gap.current + 'px');
	}, []);

	return (
		<>
			<Layout title={'Gallery'}>
				<figure className='topBox'>
					<img src={`${path.current}/img/gallery.jpg`} alt='polaroid' />
				</figure>
				<article className='controls'>
					<nav className='btnSet' ref={refNav}>
						<button onClick={handleInterest}>INTEREST GALLERY</button>
						<button className='on' onClick={handleMine}>
							MY GALLERY
						</button>
					</nav>

					<form onSubmit={handleSearch}>
						<input type='text' placeholder='Search' />
						<button className='btnSearch'>
							<LuSearch />
						</button>
					</form>
				</article>

				<section className='frameWrap' ref={refFrameWrap}>
					<Masonry className={'frame'} options={{ transitionDuration: '0.5s', gutter: gap.current }}>
						{isSuccess && searched.current && Pics.length === 0 ? (
							<h2>해당 키워드에 해당하는 검색 결과가 없습니다.</h2>
						) : (
							isSuccess &&
							Pics.map((pic, idx) => {
								return (
									<article key={pic.id}>
										<div
											className='pic'
											onClick={() => {
												setModalOpen(true);
												setIndex(idx);
											}}
										>
											<img src={`https://live.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}_m.jpg`} alt={pic.title} />
										</div>

										<section className='infoBox'>
											<div className='profile'>
												<img
													src={`http://farm${pic.farm}.staticflickr.com/${pic.server}/buddyicons/${pic.owner}.jpg`}
													alt='사용자 프로필 이미지'
													onError={(e) => e.target.setAttribute('src', 'https://www.flickr.com/images/buddyicon.gif')}
												/>
											</div>
											<div className='text'>
												<h2>{shortenText(pic.title, 30)}</h2>
												<span onClick={handleUser}>{pic.owner}</span>
											</div>
										</section>
									</article>
								);
							})
						)}
					</Masonry>
				</section>
			</Layout>

			{
				<Modal>
					{isSuccess && Pics.length !== 0 && (
						<img src={`https://live.staticflickr.com/${Pics[Index].server}/${Pics[Index].id}_${Pics[Index].secret}_b.jpg`} alt={Pics[Index].title} />
					)}
					<h2>{Pics[Index].title}</h2>
				</Modal>
			}
		</>
	);
}
