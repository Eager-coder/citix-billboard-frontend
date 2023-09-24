import { useEffect, useState } from "react";
import sunIcon from "../assets/sun.svg";

const Navbar = () => {
	const [date, setDate] = useState({
		time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
		date: new Date().toDateString(),
	});

	useEffect(() => {
		const secTimer = setInterval(() => {
			setDate({
				time: `${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`,
				date: new Date().toDateString(),
			});
		}, 1000);

		return () => clearInterval(secTimer);
	}, []);

	return (
		<div className='flex justify-between items-center mb-6'>
			<div>
				<div className='text-4xl font-normal'>{date.time}</div>
				<div className='text-3xl font-normal'>{date.date}</div>
			</div>
			{/* weather */}
			<div className='flex items-center py-1 px-3 bg-white rounded-full'>
				<img src={sunIcon} alt='' />
				<span className='ml-4 text-2xl'>Ясно, 15</span>
			</div>
		</div>
	);
};

export default Navbar;
