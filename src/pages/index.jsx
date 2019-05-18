import styles from './index.css';
import Link from 'umi/link';
import router from 'umi/router';
export default function() {
	const goToUser = () => {
		router.push({ pathname: '/user', query: { page: 1 } });
	};
	return (
		<div className={styles.normal}>
			<div className={styles.welcome} />
			<ul className={styles.list}>
				<li>
					<Link to="/user">通过link标签跳转到user页面</Link>
				</li>
				<li onClick={goToUser}>
					<a href="javascript:;;">通过umi/router 跳转到user页面</a>
				</li>
			</ul>
		</div>
	);
}
