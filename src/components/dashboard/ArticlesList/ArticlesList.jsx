import React from 'react'
import { useEffect } from 'react';

const ArticlesList = () => {

  // useEffect(async () => {
  //   try {
  //     const fetchResponse = await fetch('/api/allArticles', {
  //         method: 'GET',
  //         headers: {'Content-Type': 'application/json'},
  //     })
  //     if (!fetchResponse.ok) throw new Error('Fetch failed - Bad request')
  //     let articleArray = await fetchResponse.json()
  //     let articleCount = articleArray.length
  //     console.log(articleArray);
  //     console.log(articleCount);
  //     } catch(err) {
  //         console.log("Error when fetching article: ", err)
  //     }
  // }, []);

  // get all articles 

  //index controller:
  // const arrayOfArticles = fetch Articles
  // let articleCount = arrayOfArticles.length


  return (
    <div class="col d-flex flex-column h-sm-100">
    This is articles list!!!!!


  </div>
  )
}

export default ArticlesList
