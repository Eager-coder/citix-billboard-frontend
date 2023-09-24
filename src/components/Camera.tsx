import React, { useState, useEffect } from "react";
import Webcam from "react-webcam";

const videoConstraints = {
	width: 400,
	height: 400,
	facingMode: "user",
};

const Caemera = () => {
	const [picture, setPicture] = useState<string | null>("");
	const webcamRef = React.useRef<Webcam>(null);
	const [gallery, setGallery] = useState<{ imageURL: string }[]>([]);
	const getGallery = async () => {
		const res = await fetch("http://10.101.3.185:8080/api/v1/photo/download");
		const data = await res.json();
		return data;
	};

	useEffect(() => {
		getGallery().then(data => setGallery(data));
	}, []);

	const capture = React.useCallback(() => {
		if (webcamRef.current) {
			const pictureSrc = webcamRef.current.getScreenshot();
			setPicture(pictureSrc);
		}
	}, [picture]);
	const [hasUploaded, setUploaded] = useState(false);
	const uploadPhoto = async () => {
		const res = await fetch("http://10.101.3.185:8080/api/v1/photo/upload", {
			method: "POST",
			body: picture,
		});
		if (res.ok) {
			setUploaded(true);
			getGallery().then(data => setGallery(data.reverse()));
		}
	};

	return (
		<div className='w-full mx-auto'>
			<h2 className='mb-5 text-center text-3xl font-semibold'>Real time Photo Contest!</h2>
			{hasUploaded ? (
				<h3 className='mx-auto mb-5 text-center text-2xl font-semibold'> Upload Successful!!!</h3>
			) : (
				<>
					<div className='mx-auto'>{!picture ? <Webcam className='mx-auto' audio={false} height={400} ref={webcamRef} width={400} screenshotFormat='image/jpeg' videoConstraints={videoConstraints} /> : <img className='mx-auto' src={picture} />}</div>
					<div className='mx-auto flex justify-center'>
						{picture != "" ? (
							<>
								<button
									onClick={e => {
										e.preventDefault();
										setPicture("");
									}}
									className='bg-gray-400 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg'
								>
									Retake
								</button>
								<button onClick={uploadPhoto} className='bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg'>
									Upload
								</button>
							</>
						) : (
							<button
								onClick={e => {
									e.preventDefault();
									capture();
								}}
								className='bg-pink-300 hover:bg-pink-500 text-white font-semibold py-2 px-4 rounded-lg'
							>
								Capture
							</button>
						)}
					</div>
				</>
			)}
			{gallery.length && (
				<div>
					<h2>Gallery</h2>
					<div className='grid grid-cols-4 gap-4'>
						{gallery.map(img => (
							<img src={img.imageURL} />
						))}
					</div>
				</div>
			)}
		</div>
	);
};
export default Caemera;
