import { Link } from "react-router-dom";

function App() {
	return (
		<div className='max-w-5xl m-auto flex flex-col'>
			<Link className='text-2xl font-medium' to='/surveys'>
				Surveys
			</Link>
			<Link className='text-2xl font-medium' to='/news'>
				News
			</Link>
			<Link className='text-2xl font-medium' to='/camera'>
				Real time video communication!
			</Link>
		</div>
	);
}

export default App;
