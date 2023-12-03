import { useEffect, useRef, useState } from 'react';
import { useCustomText } from '../../../hooks/useText';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const [MemberData, setMemberData] = useState([]);
	const [MemberTit, setMemberTit] = useState('');
	const [InfoTit, setInfoTit] = useState('');
	const [InfoData, setInfoData] = useState([]);
	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	const fetchDepartment = () => {
		fetch(`${path.current}/DB/department.json`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setMemberTit(Object.keys(json)[0]);
				setMemberData(Object.values(json)[0]);
			});
	};

	const fetchInfo = () => {
		fetch(`${path.current}/DB/depart-info.json`)
			.then((data) => data.json())
			.then((json) => {
				setInfoTit(Object.keys(json)[0]);
				setInfoData(Object.values(json)[0]);
			});
	};

	useEffect(() => {
		fetchDepartment();
	}, []);
	useEffect(() => {
		fetchInfo();
	}, []);

	return (
		<Layout title={'Department'}>
			<figure className='top'>
				<img src={`${path.current}/img/departTop.jpg`} alt='building' />
			</figure>
			<section className='infoBox'>
				<h2>{combinedTitle(InfoTit)}</h2>
				<div className='info'>
					{InfoData.map((Info, idx) => {
						return (
							<article key={Info + idx}>
								<div className='infoPic'>
									<img src={`${path.current}/img/${Info.pic}`} alt='{Info.title}' />
								</div>
								<h4>{Info.title}</h4>
								<p>{Info.text}</p>
							</article>
						);
					})}
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle(MemberTit)}</h2>
				<div className='con'>
					{MemberData.map((member, idx) => {
						return (
							<article key={member + idx}>
								<h3>{member.name}</h3>
								<p>{member.position}</p>
								<div className='pic'>
									<img src={`${path.current}/img/${member.pic}`} alt='{member.name}' />
								</div>
							</article>
						);
					})}
				</div>
			</section>
		</Layout>
	);
}
