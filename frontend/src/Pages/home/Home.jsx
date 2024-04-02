import React, { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { getNews } from "../../api/external";
import Loader from "../../component/Loader/Loader";

function Home() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    (async function newsApiCall() {
      const response = await getNews();
      setArticles(response);
    })();

    // cleanup function
    setArticles([]);
  }, []);


  const handleBlogOpen = (url) => {
    window.open(url, "_blank");
  }

  if(articles.length == 0){
    return <Loader text="Home page Loading"/>
  }

  return (
    <>
      <div className={styles.header}>Latest Articles</div>
      <div className={styles.grid}>
        {articles.map((article) => (
          <div className={styles.card} onClick={() => handleBlogOpen(article.url)} key={article.url}>
            <img src={article.urlToImage} />
            <h3>{article.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
