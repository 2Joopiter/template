import { useEffect, useRef, useState, useCallback } from 'react';
import Layout from '../../common/layout/Layout';
import './Contact.scss';
import emailjs from '@emailjs/browser';
import { useThrottle } from '../../../hooks/useThrottle';

export default function Contact() {
	const form = useRef();
	const path = useRef(process.env.PUBLIC_URL);
	const resetForm = () => {
		const elArr = form.current.children;

		Array.from(elArr).forEach((el) => {
			console.log(el);
			if (el.name === 'user_name' || el.name === 'user_email' || el.name === 'message')
				el.value = '';
		});
	};

	const sendEmail = (e) => {
		e.preventDefault();

		const [user, email] = form.current.querySelectorAll('input');
		const txtArea = form.current.querySelector('textarea');

		if (!user.value || !email.value || !txtArea.value)
			return alert('이름, 답장받을 이메일주소 문의내용을 모두 입력하세요.');

		emailjs.sendForm('service_zzree4j', 'template_w86wuw7', form.current, '5euWzAafCXgbAmv3z').then(
			(result) => {
				alert('문의 내용이 성공적으로 전송되었습니다.');
				resetForm();
			},
			(error) => {
				alert('일시적인 장애로 문의 전송에 실패했습니다. 다음의 메일주소로 보내주세요.');
				resetForm();
			}
		);
	};

	const kakao = useRef(window.kakao);

	const [Index, setIndex] = useState(0);
	const [Traffic, setTraffic] = useState(false);
	const [View, setView] = useState(false);

	const mapFrame = useRef(null);
	const viewFrame = useRef(null);

	const marker = useRef(null);
	const mapInstance = useRef(null);

	const mapInfo = useRef([
		{
			title: 'IFC mall',
			latlng: new kakao.current.maps.LatLng(37.52506188634506, 126.9259552665427),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: 'COEX',
			latlng: new kakao.current.maps.LatLng(37.51100661425726, 127.06162026853143),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker1.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
		{
			title: 'Seoul City hall',
			latlng: new kakao.current.maps.LatLng(37.5662952, 126.9779451),
			imgSrc: `${process.env.PUBLIC_URL}/img/marker3.png`,
			imgSize: new kakao.current.maps.Size(232, 99),
			imgPos: { offset: new kakao.current.maps.Point(116, 99) },
		},
	]);

	marker.current = new kakao.current.maps.Marker({
		position: mapInfo.current[Index].latlng,
		image: new kakao.current.maps.MarkerImage(
			mapInfo.current[Index].imgSrc,
			mapInfo.current[Index].imgSize,
			mapInfo.current[Index].imgOpt
		),
	});

	const roadView = useCallback(() => {
		new kakao.current.maps.RoadviewClient().getNearestPanoId(
			mapInfo.current[Index].latlng,
			200,
			(panoId) => {
				new kakao.current.maps.Roadview(viewFrame.current).setPanoId(
					panoId,
					mapInfo.current[Index].latlng
				);
			}
		);
	}, [Index]);

	const setCenter = useCallback(() => {
		mapInstance.current.setCenter(mapInfo.current[Index].latlng);
	}, [Index]);

	const throttledSetCenter = useThrottle(setCenter, 100);

	useEffect(() => {
		mapFrame.current.innerHTML = '';
		viewFrame.current.innerHTML = '';
		mapInstance.current = new kakao.current.maps.Map(mapFrame.current, {
			center: mapInfo.current[Index].latlng,
			level: 3,
		});
		marker.current.setMap(mapInstance.current);
		setTraffic(false);
		setView(false);

		mapInstance.current.addControl(
			new kakao.current.maps.MapTypeControl(),
			kakao.current.maps.ControlPosition.TOPRIGHT
		);
		mapInstance.current.addControl(
			new kakao.current.maps.ZoomControl(),
			kakao.current.maps.ControlPosition.RIGHT
		);
		mapInstance.current.setZoomable(false);
	}, [Index]);

	useEffect(() => {
		window.addEventListener('resize', throttledSetCenter);
		return () => window.removeEventListener('resize', throttledSetCenter);
	}, [throttledSetCenter]);

	useEffect(() => {
		Traffic
			? mapInstance.current.addOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC)
			: mapInstance.current.removeOverlayMapTypeId(kakao.current.maps.MapTypeId.TRAFFIC);
	}, [Traffic]);

	useEffect(() => {
		View && viewFrame.current.children.length === 0 && roadView();
	}, [View, roadView]);

	return (
		<Layout title={'Contact'}>
			<figure className='topBox'>
				<img src={`${path.current}/img/contactTop.jpg`} alt='map' />
			</figure>

			<article className='msg'>
				<h2>Contact Us</h2>
				<div className='msgBox'>
					<h4>How can we help?</h4>
					<h5>Our team of experts is on hand to answer your questions</h5>
					<div id='mailSection'>
						<form ref={form} onSubmit={sendEmail}>
							<label>Name</label>
							<input type='text' name='user_name' />
							<label>Email</label>
							<input type='email' name='user_email' />
							<label>Message</label>
							<textarea name='message' />
							<div className='sendBtn'>
								<input type='submit' value='Send' />
							</div>
						</form>
					</div>
				</div>
				<div className='designBox'>
					<img src={`${path.current}/img/contact.jpg`} alt='building' />
				</div>
			</article>

			<div className='subTit'>
				<h2>Location</h2>
			</div>

			<div id='mapSection'>
				<div className='controlBox'>
					<nav className='branch'>
						{mapInfo.current.map((el, idx) => (
							<button key={idx} onClick={() => setIndex(idx)} className={idx === Index ? 'on' : ''}>
								{el.title}
							</button>
						))}
						<button onClick={() => setTraffic(!Traffic)}>
							{Traffic ? 'Traffic OFF' : 'Traffic ON'}
						</button>
						<button onClick={() => setView(!View)}>{View ? 'map' : 'Road View'}</button>
						<button onClick={setCenter}>Reset</button>
					</nav>
				</div>
				<section className='tab'>
					<article className={`mapBox ${View ? '' : 'on'}`} ref={mapFrame}></article>
					<article className={`viewBox ${View ? 'on' : ''}`} ref={viewFrame}></article>
				</section>
			</div>
		</Layout>
	);
}
