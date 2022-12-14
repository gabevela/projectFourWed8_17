import React, { useState, useEffect, useCallback, useRef } from 'react'
import './ContributorsList.css'
import * as Icon from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';




// name
// email
// city
//country

const ContributorsList = ({ user }) => {

    const ref = useRef();
    const [img, setImg] = useState();
    const [imgLink, setImgLink] = useState();
    const[contributor, setContributor] = useState({
        name: '',
        email: '',
        city: '',
        country: '',
        image: '',
        postedBy: user._id, 
      });
      
      const [formObj, setFormObj] = useState({});
      useEffect( ()=>{
        if( !(Object.keys(formObj).length === 0 )){
          postContributor()
        }
      }, [formObj] 
        )
          
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
    
      let setImage = async (e) => {
        e.preventDefault();
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
          setFormObj ( {...contributor, image: responseTwo.imageurl})
      }


      const postContributor = async () => {
        
        console.log(contributor);
        // console.log(user._id);

        // '/api/contributorSubmissions'

        try {

          // let responseOne = await fetch("http://localhost:3001/img", {
          //   method: "POST",
          //   headers: {
          //       "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //       photo: img // take this image, if all goes wel then ....
          //   }),
          //   })
        
          //   let responseTwo = await responseOne.json()
        
          //   console.log("cloudinary url :", responseTwo.imageurl )
          //   formObj = {...contributor, image: responseTwo.imageurl}


            // setContributor({  // hook  - ? why is this not updating in time for the next api cal ?? 
            //     ...contributor, 
            //     image: responseTwo.imageurl   // this is the image url where it is stored and should be sent to the db, but it is 
                // being stored as an empty string.... why?  
            //})



        const res = await fetch('/api/contributorSubmissions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ contributor: formObj , img: formObj.image }),
        });
        console.log(res);
        if (res.statusText === 'OK') {
          console.log('SUCCESSLY ADDED TO DB =>', contributor);
          setContributor({
            name: '',
            email: '',
            city: '',
            country: '',
            image: '',
            postedBy: user._id, 
          });
          ref.current.value = "";
          setImg("")
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    // PostArticle
  return (
    <div class="col d-flex flex-column h-sm-100">
        <div id="contributers-list-main-container" class="row overflow-auto">          
        <div id="contributers-list-container" class="row text-center g-3">
        <div class="col-md"> 
        <div class="card bg-light text-dark">
      <div class="card-body text-center">
        <div class="h1 mb-1">
        <Icon.ArrowRight />
        </div>
        <h5 class="card-title mb-1">Contributors<button>Add</button></h5>
        {/* <div id="form-box"> */}
        <form class="row g-3">
          <div class="col-md-12 form-box">
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
              class="form-control title-place reg_name" 
              type="text" 
              name= "name"
              rows="2" 
              required placeholder="Contributor name here"
              pattern="[A-Za-z]{2,}"
              value={contributor.name}
              onChange={(e) => 
                setContributor({
                    ...contributor, 
                    name: e.target.value
                })
              }

            
                 
              >
              </input>
              <label for="comments" class="form-label"></label>
              <input 
              class="form-control body-place reg_name"  
              rows="10" cols="40" 
              type="text" 
              name= "email"
              required placeholder="E-Mail"
              value={contributor.email}
              onChange={(e) => 
                setContributor({
                    ...contributor, 
                    email: e.target.value
                })
              }
              >
              </input>
              <label for="comments" class="form-label"></label>
              <input 
              class="form-control body-place reg_name"  
              rows="10" cols="40" 
              type="text" 
              name= "city"
              required placeholder="City"
              value={contributor.city}
              onChange={(e) => 
                setContributor({
                    ...contributor, 
                    city: e.target.value
                })
              }
              >
              </input>
              <label for="comments" class="form-label"></label>
              <input 
              class="form-control body-place reg_name"  
              rows="10" cols="40" 
              type="text" 
              name= "country"
              required placeholder="Country"
              value={contributor.country}
              onChange={(e) => 
                setContributor({
                    ...contributor, 
                    country: e.target.value
                })
              }
              >
              </input>
              <br/>
              
              <input type='file' onChange={onImgChange}  ref={ref} />
              <img src={img}  style={{width:"200px"}}/>
              
              <button onClick={setImage} type="submit" className="btn btn-dark text-light col-2 mt-2">Submit</button>
              
          </div>
          </form>
         
         
      
        <hr class="bg-danger border-2 border-top border-danger" />
        <div class="dashboard-cards-articles">
          <p class="card-text text-primary dashboard-text">
            Jonathan Grahm<span>Tuscon, Arizona</span>
          </p>
          <p class="card-text font-italic dashboard-text">
          Jonathangrahm@gmail.com
        
          </p>
        </div>
        <hr class="bg-danger border-2 border-top border-danger" />
        <div class="dashboard-cards-articles">
          <p class="card-text text-primary dashboard-text">
            Jonathan Grahm<span>Tuscon, Arizona</span>
          </p>
          <p class="card-text font-italic dashboard-text">
          Jonathangrahm@gmail.com
        
          </p>
        </div>
        <hr class="bg-danger border-2 border-top border-danger" />
        <div class="dashboard-cards-articles">
          <p class="card-text text-primary dashboard-text">
            Jonathan Grahm<span>Tuscon, Arizona</span>
          </p>
          <p class="card-text font-italic dashboard-text">
          Jonathangrahm@gmail.com
        
          </p>
        </div>
      </div>
    </div>

        </div>
      </div>
    </div>
    </div>
  )
}

export default ContributorsList



// props examples: 
// in App.js, passing props and giving it a value to a profileCard
// <ProfileCard name={'Homer'} pic={homer} description={'Homer is fat and lazy'} email={'Homer@Simpsons.com'}/>

// export default function ProfileCard(props) {
//   return(
//       <div id="single-article-1" className="single-article">
//           <div id="card-front-1" className="front-card tb-card">
//               <img src={props.pic} className="profile-image" alt='' />
//               <div className="single-content">
//                   <div className="card-middle">
//                       <h1>{props.name}</h1>
//                       <p className="team-p1">
//                           {props.description}
//                       </p>
//                   </div>
//                   <div className="card-bottom">
//                       <div className="card-email">
//                           {props.email}
//                       </div>
//                       <div className="card-icon profile-trigger" data-id="single-article-1" >
//                           <i className="fa fa-chevron-right"></i>
//                       </div>
//                   </div>
//               </div>
//           </div>
//       </div>
//   )
// }