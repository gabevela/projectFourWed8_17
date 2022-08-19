import React from 'react'
import './PostArticle.css'
import * as Icon from 'react-bootstrap-icons';
import { useState, useCallback, useRef } from 'react';



const PostArticle = ({ user }) => {

    const ref = useRef();
    const [img, setImg] = useState();
    const [imgLink, setImgLink] = useState();
    const[article, setArticle] = useState({
        title: '',
        contributor: '',
        body: '',
        tags: '',
        image: '',
        postedBy: user._id, 
      });

      
    const onImgChange =  useCallback((e) => {
      const [file] = e.target.files;
      var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onloadend = function() {
          var base64data = reader.result;   
          setImg(base64data)
        }
        // setArticle({
        //     ...article, 
        //     image: img
        // })
    }, [])

      const postArticle = async (e) => {
        e.preventDefault();
        console.log(article);
        //Image sending starts here
        // telling the server - take this photo - send it to cloudinary - and give us the link of where it is stored 
        //  
        try {
            
            let responseOne = await fetch("http://localhost:3001/img", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                photo: img // take this image, if all goes wel then ....
            }),
            })
        
            let responseTwo = await responseOne.json()
        
            console.log("cloudinary url :", responseTwo.imageurl )
            setArticle({  // hook  - ? why is this not updating in time for the next api cal ?? 
                ...article, 
                image: responseTwo.imageurl   // this is the image url where it is stored and should be sent to the db, but it is 
                // being stored as an empty string.... why?  
            })
          
          //Image sending ends here
            const res = await fetch('/api/articleSubmissions', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ article: article, img: responseTwo.imageurl }),
            });
            console.log(res);
            if (res.statusText === 'OK') {
              console.log('SUCCESSLY ADDED TO DB =>', article);
              setArticle({
                title: '',
                contributor: '',
                body: '',
                tags: '',
                image: '',
                postedBy: user._id, 
              });
              ref.current.value = "";
              setImg("")
            }
          } catch (err) {
            console.log(err.message);
          }


      }
    
  
    //   const postContributor = async (e) => {
    //     e.preventDefault();
    //     console.log(contributor);
    //     // console.log(user._id);

    //     // '/api/contributorSubmissions'

    //     try {
    //     const res = await fetch('/api/contributorSubmissions', {
    //       method: 'POST',
    //       headers: { 'Content-Type': 'application/json' },
    //       body: JSON.stringify({ contributor: contributor }),
    //     });
    //     console.log(res);
    //     if (res.statusText === 'OK') {
    //       console.log('SUCCESSLY ADDED TO DB =>', contributor);
    //       setContributor({
    //         name: '',
    //         email: '',
    //         city: '',
    //         country: '',
    //         postedBy: user._id, 
    //       });
    //     }
    //   } catch (err) {
    //     console.log(err.message);
    //   }
    // };

    // PostArticle
  return (
    <div class="col d-flex flex-column h-sm-100">
        <div id="articlesPost-main-container" class="row overflow-auto">          
        <div id="articlesPost-container" class="row text-center g-3">
        <div class="col-md"> 
        <div class="card bg-light text-dark">
      <div class="card-body text-center">
        <div class="h1 mb-1">
        <Icon.ArrowRight />
        </div>
        <h5 class="card-title mb-1">Post Article</h5>
        <form class="row g-3">
          <div class="col-md-12">
              {/* <br/> */}
             <label for="comments" class="form-label"></label>

             {/* value={submission.name}
            onChange={(e) =>
              setSubmission({
                ...submission,
                name: e.target.value,
              })
            } */}

              <input 
              class="form-control title-place" 
              type="text" 
              name= "title"
              rows="2" 
              required placeholder="Title"
              pattern="[A-Za-z]{2,}"
              value={article.title}
              onChange={(e) => 
                setArticle({
                    ...article, 
                    title: e.target.value
                })
              }

            
                 
              >
              </input>
              <label for="comments" class="form-label"></label>
              <input 
              class="form-control body-place"  
              rows="10" cols="40" 
              type="text" 
              name= "contributor"
              required placeholder="Contributor"
              value={article.contributor}
              onChange={(e) => 
                setArticle({
                    ...article, 
                    contributor: e.target.value
                })
              }
              >
              </input>
              <label for="comments" class="form-label"></label>
              <textarea 
              class="form-control body-place"  
              rows="10" cols="40" 
              type="text" 
              name= "body"
              required placeholder="Article body here"
              value={article.body}
              onChange={(e) => 
                setArticle({
                    ...article, 
                    body: e.target.value
                })
              }
              >
              </textarea>
              <label for="comments" class="form-label"></label>
              <input 
              class="form-control body-place"  
              rows="10" cols="40" 
              type="text" 
              name= "tags"
              required placeholder="Tags"
              value={article.tags}
              onChange={(e) => 
                setArticle({
                    ...article, 
                    tags: e.target.value
                })
              }
              >
              </input>
              <input type='file' onChange={onImgChange} ref={ref} />
              <img src={img}  style={{width:"200px"}}/>
              <button onClick={postArticle} type="submit" className="btn btn-dark text-light col-2 mt-2">Submit</button>
          </div>
          </form>
         
          {/* alt="article"  */}
       
       
      </div>
    </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default PostArticle
