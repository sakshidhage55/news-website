// src/News.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch news headlines from your backend
        const response = await axios.get('/api/news');
        setArticles(response.data.articles);
      } catch (err) {
        setError('Failed to fetch news. Please try again later.');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Latest News</h1>
      <ul>
        {articles.slice(0, 5).map((article, index) => (
          <li key={index}>
            <h2>{article.title}</h2>
            <p>{article.source.name} - {new Date(article.publishedAt).toLocaleDateString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default News;
