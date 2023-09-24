import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
interface Survey {
	surveyID: string;
	companyLogo: string;
	surveyTitle: string;
}

const SurveyList = () => {
	const [surveys, setSurveys] = useState<Survey[]>([]);
	const getSurveys = async () => {
		const res = await fetch("http://10.101.3.185:8080/api/v1/survey");
		const json = await res.json();

		return json;
	};
	useEffect(() => {
		getSurveys().then(data => setSurveys(data));
	}, []);

	return (
		<>
			<h1 className='text-4xl font-bold mb-6'>Surveys</h1>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{surveys.map(surveyItem => (
					<Link to={`/surveys/${surveyItem.surveyID}`} className='bg-white rounded-lg shadow-md p-4 flex items-center' key={surveyItem.surveyID}>
						<img src={surveyItem.companyLogo} alt={surveyItem.surveyTitle} className='w-10 h-auto mr-4' />
						<div className='text-center'>
							<h2 className='text-lg font-semibold'>{surveyItem.surveyTitle}</h2>
						</div>
					</Link>
				))}
			</div>
		</>
	);
};

export default SurveyList;
