import adBanner from "../assets/ad-banner.jpg";

const AdBanner = () => {
	return (
		<div>
			<img className='rounded-3xl h-[600px] w-full object-top object-cover' src={adBanner} alt='' />
		</div>
	);
};

export default AdBanner;
