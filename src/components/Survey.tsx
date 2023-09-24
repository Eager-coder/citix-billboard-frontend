import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

interface Survery {
	surveyID: string;
	surveyTitle: string;
	company_logo: string;
	questions: Question[];
}
interface Question {
	id: number;
	title: string;
	options: Option[];
}
interface Option {
	id: number;
	text: string;
}

const Survey = () => {
	const [survey, setSurvey] = useState<null | Survery>(null);
	const [questionNumber, setQuestionNumber] = useState(0);
	const [currentQuestion, setCurrentQuestion] = useState<null | { id: number; title: string; options: Option[] }>(null);
	const [answerList, setAnswerList] = useState<Question[]>([]);

	const { survey_id } = useParams<{ survey_id: string }>();
	const getQuestions = async () => {
		const res = await fetch("http://10.101.3.185:8080/api/v1/survey/" + survey_id);
		console.log(res.ok);
		const json = await res.json();
		return json;
	};

	useEffect(() => {
		getQuestions().then(data => setSurvey(data));
	}, []);

	const [chosenAnswer, setChosenAnswer] = useState<null | Question>(null);
	const [isSubmitted, setIsSubmitted] = useState(false);
	useEffect(() => {
		if (survey) {
			setCurrentQuestion(survey.questions[questionNumber]);
		}
	}, [questionNumber, survey]);

	const moveNext = () => {
		if (!chosenAnswer) return;

		setQuestionNumber(prevNumber => prevNumber + 1);

		setAnswerList(prev => [...prev, { ...chosenAnswer }]);
		setChosenAnswer(null);
	};
	const moveBack = () => {
		setQuestionNumber(prevNumber => {
			const newNumber = prevNumber - 1;
			const prevAnswer = answerList[newNumber];
			setChosenAnswer(prevAnswer); // Set the chosenAnswer to the previous answer
			return newNumber;
		});
	};
	const submit = () => {
		if (!chosenAnswer) return;
		// POST REQUEST
		setIsSubmitted(true);
		console.log(answerList);
	};
	if (!survey || !currentQuestion) return <></>;
	return (
		<div className='w-[500px] h-[500px] bg-white rounded-2xl p-8 mt-10'>
			<img className='w-12 h-12 ml-auto mr-auto  block' src={survey.company_logo} alt='' />
			<h3 className='text-center text-2xl font-medium mt-10'>{survey.surveyTitle}</h3>

			{!isSubmitted ? (
				<>
					<h4>{currentQuestion.title}</h4>
					<div className='grid grid-cols-2 mt-4'>
						{currentQuestion.options.map(option => (
							<div className={"hover:bg-pink-100 rounded-lg p-2 transition duration-100 cursor-pointer " + (chosenAnswer?.options[0].id === option.id ? "bg-pink-100" : "bg-white")} onClick={() => setChosenAnswer({ ...currentQuestion, options: [{ ...option }] })} key={option.id}>
								{option.text}
							</div>
						))}
					</div>
					<div className='flex justify-between'>
						{questionNumber !== 0 && <button onClick={moveBack}>Предыдущий</button>}

						{questionNumber + 1 == survey.questions.length ? <button onClick={submit}>Завершить</button> : <button onClick={moveNext}>Далее</button>}
					</div>
				</>
			) : (
				<h3 className='text-center text-2xl font-medium mt-10'>Благодарим за ваше участие!</h3>
			)}
		</div>
	);
};

export default Survey;
