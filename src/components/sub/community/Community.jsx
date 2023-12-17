import { useEffect, useRef, useState } from 'react';
import Layout from '../../common/layout/Layout';
import './Community.scss';
import { MdClose } from 'react-icons/md';
import { IoMdCreate } from 'react-icons/io';
import { useCustomText } from '../../../hooks/useText';

export default function Community() {
	const changeText = useCustomText('combined');
	const path = useRef(process.env.PUBLIC_URL);
	const getLocalData = () => {
		const data = localStorage.getItem('post');
		return JSON.parse(data);
	};
	const [Post, setPost] = useState(getLocalData() || []);
	const refTit = useRef(null);
	const refCon = useRef(null);
	const refEditTit = useRef(null);
	const refEditCon = useRef(null);
	const editMode = useRef(false);

	//input 초기화 함수
	const resetPost = () => {
		refTit.current.value = '';
		refCon.current.value = '';
	};

	//글 저장 함수
	const createPost = () => {
		if (!refTit.current.value.trim() || !refCon.current.value.trim()) {
			resetPost();
			return alert('제목과 본문을 모두 입력하세요.');
		}
		const korTime = new Date().getTime() + 1000 * 60 * 60 * 9;
		setPost([
			{ title: refTit.current.value, content: refCon.current.value, date: new Date(korTime) },
			...Post,
		]);
		resetPost();
	};

	//글 수정 함수
	const updatePost = (updateIndex) => {
		if (!refEditTit.current.value.trim() || !refEditCon.current.value.trim()) {
			return alert('수정할 글의 제목과 본문을 모두 입력하세요.');
		}
		editMode.current = false;

		setPost(
			Post.map((el, idx) => {
				if (updateIndex === idx) {
					el.title = refEditTit.current.value;
					el.content = refEditCon.current.value;
					el.enableUpdate = false;
				}
				return el;
			})
		);
	};

	//글 삭제 함수
	const deletePost = (delIndex) => {
		if (!window.confirm('정말 해당 게시글을 삭제하겠습니까?')) return;
		setPost(Post.filter((_, idx) => delIndex !== idx));
	};

	//수정모드 변경함수
	const enableUpdate = (editIndex) => {
		if (editMode.current) return;
		editMode.current = true;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = true;
				return el;
			})
		);
	};

	//출력모드 변경함수
	const disableUpdate = (editIndex) => {
		editMode.current = false;
		setPost(
			Post.map((el, idx) => {
				if (editIndex === idx) el.enableUpdate = false;
				return el;
			})
		);
	};

	useEffect(() => {
		Post.map((el) => (el.enableUpdate = false));
		localStorage.setItem('post', JSON.stringify(Post));
	}, [Post]);

	return (
		<Layout title={'Community'}>
			<figure className='topBox'>
				<img src={`${path.current}/img/community.jpg`} alt='hiking' />
			</figure>
			<div className='subTit'>
				<h3>Recruit</h3>
				<p>Meet travel mates from all over the world</p>
			</div>
			<div className='communityWrap'>
				<div className='inputBox'>
					<div className='writeBox'>
						<input type='text' placeholder='title' ref={refTit} />
						<textarea cols='30' rows='3' placeholder='content' ref={refCon}></textarea>
						<nav>
							<button onClick={createPost}>
								<IoMdCreate />
							</button>
							<button onClick={resetPost}>
								<MdClose />
							</button>
						</nav>
					</div>
				</div>

				<div className='showBox'>
					{Post.map((el, idx) => {
						const date = JSON.stringify(el.date);
						const strDate = changeText(date.split('T')[0].slice(1), '.');

						if (el.enableUpdate) {
							//수정모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<input type='text' defaultValue={el.title} ref={refEditTit} />
										<textarea
											cols='30'
											rows='4'
											defaultValue={el.content}
											ref={refEditCon}
										></textarea>
										<span>Date: {strDate}</span>
									</div>
									<nav>
										{/* 수정모드 일때 해당 버튼 클릭시 다시 출력모드 변경 */}
										<button onClick={() => disableUpdate(idx)}>Cancel</button>
										<button onClick={() => updatePost(idx)}>Update</button>
									</nav>
								</article>
							);
						} else {
							//출력모드
							return (
								<article key={el + idx}>
									<div className='txt'>
										<h2>{el.title}</h2>
										<p>{el.content}</p>
										<span>Date: {strDate}</span>
									</div>
									<nav>
										<button onClick={() => enableUpdate(idx)}>Edit</button>
										<button onClick={() => deletePost(idx)}>Delete</button>
									</nav>
								</article>
							);
						}
					})}
				</div>
			</div>
		</Layout>
	);
}
