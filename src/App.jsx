import Header from './components/common/header/Header';
import MainWrap from './components/main/mainWrap/MainWrap';
import Community from './components/sub/community/Community';
import Contact from './components/sub/contact/Contact';
import Department from './components/sub/department/Department';
import Gallery from './components/sub/gallery/Gallery';
import Members from './components/sub/members/Members';
import Youtube from './components/sub/youtube/Youtube';
import Footer from './components/common/footer/Footer';
import Detail from './components/sub/youtube/Detail';
import * as types from './redux/actionType';

import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMedia } from './hooks/useMedia';
import Menu from './components/common/menu/Menu';

export default function App() {
	const dispatch = useDispatch();
	const Dark = useSelector((store) => store.darkReducer.dark);
	const path = process.env.PUBLIC_URL;

	useEffect(() => {
		// dispatch({ type: types.MEMBERS.start });
		// dispatch({ type: types.HISTORY.start });
		// dispatch({ type: types.YOUTUBE.start });
		// dispatch({ type: types.FLICKR.start });
		['MEMBERS', 'HISTORY', 'YOUTUBE', 'FLICKR', 'DEPARTINFO'].forEach((typeName) => dispatch({ type: types[typeName].start }));
	}, [dispatch]);

	return (
		<div className={`wrap ${Dark ? 'dark' : ''} ${useMedia()}`}>
			<Header />
			<Route exact path='/' component={MainWrap} />
			<Route path='/Community' component={Community} />
			<Route path='/Contact' component={Contact} />
			<Route path='/Department' component={Department} />
			<Route path='/Gallery' component={Gallery} />
			<Route path='/Members' component={Members} />
			<Route path='/Youtube' component={Youtube} />
			<Route path='/Detail/:id' component={Detail} />
			<Footer />
			<Menu />
		</div>
	);
}
