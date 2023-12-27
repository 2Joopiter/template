import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useRef } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';
import { useYoutubeQuery } from '../../../hooks/useYoutubeQuery';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const path = useRef(process.env.PUBLIC_URL);
	const { data: Vids, isSuccess, isError, error, isLoading } = useYoutubeQuery();
	console.log(error);

	return (
		<Layout title={'Youtube'}>
			<h4>Lorem ipsum dolor sit amet consectetur.</h4>
			<div class='topVid'>
				<video src={`${path.current}/vid/youtube.mp4`} alt='yacht' muted autoPlay loop />
			</div>
			<div className='mainVid'>
				<iframe
					width='560'
					height='315'
					src='https://www.youtube.com/embed/b7LSsKsJGHY?si=J42JSmXDkdNY1kEd&amp;controls=0'
					title='YouTube video player'
					frameborder='0'
					allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
					allowfullscreen
				></iframe>
			</div>
			<div className='content'>
				<h3>Video</h3>
				{isLoading && <p>Loading...</p>}
				{isSuccess &&
					Vids.map((data) => {
						const [date, time] = data.snippet.publishedAt.split('T');

						return (
							<article key={data.id}>
								<div className='videoBox'>
									<div className='thumbnail'>
										{' '}
										<Link to={`/detail/${data.id}`}>
											<img src={data.snippet.thumbnails.standard.url} alt={data.snippet.title} />
										</Link>
									</div>
									<div className='txt'>
										<h2>{shortenText(data.snippet.title, 50)}</h2>
										<p>{shortenText(data.snippet.description, 300)}</p>
										<div className='infoBox'>
											<span>{customText(date, '.')}</span>
											<em>{time.split('Z')[0]}</em>
										</div>
									</div>
								</div>
							</article>
						);
					})}
			</div>
			{isError && <p>데이터 반환에 실패했습니다.</p>}
		</Layout>
	);
}
