import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Detail.scss';
import { useParams } from 'react-router-dom';

export default function Detail() {
	const refTitle = useRef(null);

	const { id } = useParams();
	const [YoutubeData, setYoutubeData] = useState(null);

	const fetchSingleData = async () => {
		const api_key = process.env.REACT_APP_YOUTUBE_API;
		const baseURL = `https://www.googleapis.com/youtube/v3/playlistItems?key=${api_key}&part=snippet&id=${id}`;

		const data = await fetch(baseURL);
		const json = await data.json();
		setYoutubeData(json.items[0].snippet);
	};

	useEffect(() => {
		fetchSingleData();
	}, []);

	return (
		<Layout title={'Detail'}>
			<h2 ref={refTitle}>{YoutubeData?.title}</h2>
			{YoutubeData && (
				<article>
					<div className='videoBox'>
						<iframe
							src={`https://www.youtube.com/embed/${YoutubeData.resourceId.videoId}`}
							title={YoutubeData.title}
						></iframe>
					</div>
					<h3>Descriptions</h3>
					<p>{YoutubeData.description}</p>
				</article>
			)}
		</Layout>
	);
}
