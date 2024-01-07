import './Visual.scss';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Pagination, Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { useEffect, useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';

export default function Visual() {
	const youtube = useSelector((store) => store.youtubeReducer.youtube);
	const shortenText = useCustomText('shorten');
	const swiperRef = useRef(null);

	return (
		<figure className='Visual'>
			<Swiper
				modules={[Pagination, Autoplay, Navigation]}
				pagination={{
					clickable: true,
					renderBullet: (index, className) => {
						return `<span class=${className}>${index + 1}</span>`;
					},
				}}
				navigation
				autoplay={{
					delay: 5000,
					disableOnInteraction: true,
				}}
				loop={true}
			>
				{youtube.map((vid, idx) => {
					if (idx >= 5) return null;
					return (
						<SwiperSlide key={vid.id}>
							<div className='inner'>
								<div className='picBox'>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
									<p>
										<img src={vid.snippet.thumbnails.standard.url} alt={vid.snippet.title} />
									</p>
								</div>
								<div className='txtBox'>
									<h2>{shortenText(vid.snippet.title, 50)}</h2>
									<Link
										to={`/detail/${vid.id}`}
										onMouseEnter={swiperRef.current?.autoplay.stop}
										onMouseLeave={swiperRef.current?.autoplay.start}
									>
										<span></span>View Detail
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}

				<Btns swiperRef={swiperRef} />
			</Swiper>
		</figure>
	);
}

function Btns({ swiperRef }) {
	swiperRef.current = useSwiper();

	useEffect(() => {
		swiperRef.current.init(0);
		swiperRef.current.slideNext(300);
	}, [swiperRef]);

	return <nav className='swiperController'></nav>;
}
