import Layout from '../../common/layout/Layout';
import './Youtube.scss';
import { useState, useEffect } from 'react';
import { useCustomText } from '../../../hooks/useText';
import { Link } from 'react-router-dom';

export default function Youtube() {
	const customText = useCustomText('combined');
	const shortenText = useCustomText('shorten');
	const [Vids, setVids] = useState([]);

	const fetchYoutube = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const pid = process.env.REACT_APP_YOUTUBE_LIST;
		const num = 9;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&playlistId=${pid}&maxResults=${num}`;

		try {
			const data = await fetch(baseURL);
			const json = await data.json();
			setVids(json.items);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		fetchYoutube();
	}, []);

	return (
		<Layout title={'Youtube'}>
			<figure className='head'></figure>
			<div className='content'>
				{Vids.map((data) => {
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
		</Layout>
	);
}
