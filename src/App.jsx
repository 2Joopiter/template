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
import Menu from './components/common/menu/Menu';

import { Route } from 'react-router-dom';
import './globalStyles/Variables.scss';
import './globalStyles/Reset.scss';
import { useMedia } from './hooks/useMedia';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useGlobalData } from './hooks/useGlobalData';

export default function App() {
	const { Dark } = useGlobalData();
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
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
			<ReactQueryDevtools />
		</QueryClientProvider>
	);
}
