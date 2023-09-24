import React, { useState, useEffect } from "react";

interface Article {
	author: string;
	title: string;
	description: string;
	urlToImage: string;
	url: string;
	publishedAt: string;
}

interface NewsResponse {
	totalResults: number;
	articles: Article[];
}

const News = () => {
	const [news, setNews] = useState<NewsResponse | null>(null);
	const getNews = async () => {
		const res = await fetch("http://10.101.3.185:8080/api/v1/news");
		const json = await res.json();
		return json;
	};
	useEffect(() => {
		getNews().then(data => setNews(data));
	}, []);

	return (
		<div className='mx-20'>
			<h1 className='text-5xl font-bold'>Latest Kazakhstan news</h1>
			{news?.articles.map((each, index) => (
				<div className={" rounded-3xl border border-black max-w-3xl p-4 my-5 flex items-center space-x-5 " + (index % 2 === 0 ? "bg-white" : "bg-gray-700")} key={each.title + each.url}>
					<img className='w-72 h-56 object-cover rounded-2xl' src={each.urlToImage} alt='' />
					<div>
						<h2 className={"text-xl font-semibold mb-3 " + (index % 2 === 1 ? "text-white" : "text-gray-700")}>{each.title}</h2>
						<p className={"text-sm mb-2 " + (index % 2 === 1 ? "text-white" : "text-gray-700")}>{each.description}</p>
						<p className={index % 2 === 1 ? "text-white" : "text-gray-700"}>{each.publishedAt}</p>
					</div>
				</div>
			))}
		</div>
	);
};

export default News;
