import { useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { useDepartmentQuery } from '../../../hooks/useDepartmentQuery';
import { useInfoQuery } from '../../../hooks/useInfoQuery';
import Layout from '../../common/layout/Layout';
import './Department.scss';

export default function Department() {
	const { data: MemberData, isSuccess: isMember } = useDepartmentQuery();
	const { data: InfoData, isSuccess: isInfo } = useInfoQuery();

	const path = useRef(process.env.PUBLIC_URL);
	const combinedTitle = useCustomText('combined');

	return (
		<Layout title={'Department'}>
			<figure className='top'>
				<img src={`${path.current}/img/departTop.jpg`} alt='building' />
			</figure>
			<section className='infoBox'>
				<h2>{combinedTitle('About')}</h2>
				<div className='info'>
					{isInfo &&
						InfoData.map((Info, idx) => {
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

			<section className='midPhoto'>
				<div className='photo'>
					<img src={`${path.current}/img/departMid.jpg`} alt='tv' />
					<h4>Lorem ipsum dolor sit amet consectetur adipisicing.</h4>
					<p>Lorem ipsum dolor sit amet.</p>
				</div>
			</section>

			<section className='memberBox'>
				<h2>{combinedTitle('Members')}</h2>
				<div className='con'>
					{isMember &&
						MemberData.map((member, idx) => {
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
