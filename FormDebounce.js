/****
 *
 * waitFor(5000).then(() => {
 *  console.log(1)
 * })
 *
 ***/


 const waitFor = (delay:number) => {
   return new Promise((res,rej) => {
      setTimeout(res,delay)
   })
  }
  console.log('first')
 waitFor(5000).then(()=>{
   console.log(1)
 })
 console.log('second') 

/***
 *
 * currying
 *
 * add(1)(2)(3)(4)() 10
 */

 const add = (a:number) => (b:number| undefined) => {
    if(typeof b !== 'undefined') return add(a+b)
    return a;
 }
 console.log(add(1)(2)(0)(4)()); 

/***
  * 
  * 1: Display a list of images, fetched from a mocked server: 
  * https://jsonplaceholder.typicode.com/photos
2: The list of images is searchable using album id.
3: When you click on an image it should add a border to that image.
4: Should be responsive.

  * 
  */

// Solution 1
import { useEffect, useState } from "react";
interface Album {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
const App = () => {
  const [album, setAlbum] = useState([]);
  const [collection,setCollection] = useState([])
  const handleChange = (e) => {
    setAlbum(collection.filter((a) => a.albumId === parseInt(e.target.value)));
  };
  const debounce = (cb,delay=500) => {
    let timer;
    if (timer) clearTimeout(timer);
    return function(...args){
      timer = setTimeout(() => {
        cb(...args)
      },delay)
    }
  }
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((res) => res.json())
      .then((data) => {
        setAlbum(data.slice(0, 20))
        setCollection(data)
      });
  }, []);

  return (
    <>
      <input type="text" onChange={debounce(handleChange)} />
      {album.map((a) => {
        return (
          <div key={a.id}>
            <img src={a.thumbnailUrl} alt={a.title} />
          </div>
        );
      })}
    </>
  );
};

export default App;

// Solution 2

/***
  * 
  * 1: Display a list of images, fetched from a mocked server: 
  * https://jsonplaceholder.typicode.com/photos
2: The list of images is searchable using album id.
3: When you click on an image it should add a border to that image.
4: Should be responsive.

  * 
  */

 import { useEffect, useState } from "react";
 interface Album {
   albumId: number;
   id: number;
   title: string;
   url: string;
   thumbnailUrl: string;
 }
 const App = () => {
   const [album, setAlbum] = useState([]);
   const [collection,setCollection] = useState([]);
   const handleChange = (value) => {
     setAlbum(collection.filter((a) => a.albumId === parseInt(value)));
   };
   const debounce = (cb,delay=500) => {
     let timer;
     if (timer) clearTimeout(timer);
     return function(...args){
       timer = setTimeout(() => {
         cb(...args)
       },delay)
     }
   }
   const debouncedSearch = debounce(handleChange,1000)
   useEffect(() => {
     fetch("https://jsonplaceholder.typicode.com/photos")
       .then((res) => res.json())
       .then((data) => {
         setAlbum(data.slice(0, 20))
         setCollection(data)
       });
   }, []);
 
   return (
     <>
       <input type="text" onChange={(e) => debouncedSearch(e.target.value)} />
       {album.map((a) => {
         return (
           <div key={a.id}>
             <img src={a.thumbnailUrl} alt={a.title} />
           </div>
         );
       })}
     </>
   );
 };
 
 export default App;



// **************************************************************************************************
import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

/*
  Instructions:
    part1:
    You're given the UI for a basic form. Your task is to 
    hook it all up using refs. 

    The `Focus X Input` buttons should focus that specific input
    field.

    The `Submit` button should log `name`, `email`, and `password`
    to the console.

    The `Reset` button should result all of the input fields to 
    empty strings.

    part2: 
    Develop a search tag with debounce functionality.
    Debouncing means that a function will not be called again until
    a certain amount of time has passed. So here the setsearch method
    is called repeatedly for every key stroke, instead it should
    be delayed by the time peroid mentioned in the debounce method (add some 
    console log to validate this no need to use any api mock). 
    It should avoid memory leaks and the solution provided should be scalable.
    
    For api integration create an account in https://developers.giphy.com/dashboard/
    Once you have got your API token refer the search api docs page

    eg: api endpoint
    https://api.giphy.com/v1/gifs/search?api_key=< your api token >&q=<search value>

    Display the result images below in a 4x4 grid box, you can choose any size of your preference

    NOTE: 
    do not use any external library like lodash

*/

function ReactForm() {
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);
  const [gallery,setGallery] = useState([]);
  const handleSubmit = (e) => {
    console.log(`Name : ${nameRef.current.value} ,
     Email : ${emailRef.current.value} ,
    Password: ${passwordRef.current.value}`);
  };

  const handleReset = () => {
    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
  };

  const handleSearch =  (value) => {
    // add your api logic here
     fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=MfwZLqWeh1YPrvrlULOqgzZfOlRkIR7r&q=${value}`
    ).then(res => res.json())
    .then(data => {
      console.log(data.data);
      setGallery(data.data);
    });
  };

  const debounce = (callback, delay) => {
    // add your debounce logic here
    let timer;
    if (timer) {
      clearTimeout(timer);
    }
    return function (...args) {
      timer = setTimeout(() => callback(...args), delay);
    };
  };

  // do not modify this line
  const debouncedSearch = debounce(handleSearch, 1000);
  return (
    <React.Fragment>
      <div>
        <p>part 1</p>
        <label>
          Name:
          <input placeholder="name" type="text" ref={nameRef} />
        </label>
        <label>
          Email:
          <input placeholder="email" type="text" ref={emailRef} />
        </label>
        <label>
          Password:
          <input placeholder="password" type="text" ref={passwordRef} />
        </label>
        <hr />
        <button onClick={() => nameRef.current.focus()}>
          Focus Name Input
        </button>
        <button onClick={() => emailRef.current.focus()}>
          Focus Email Input
        </button>
        <button onClick={() => passwordRef.current.focus()}>
          Focus Password Input
        </button>
        <hr />
        <button onClick={handleSubmit}>Submit</button>
        <button onClick={handleReset}>Reset</button>
      </div>
      <div>
        <hr />
        <p>part 2</p>
        <label>
          Search:
          <input
            placeholder="search with debounce"
            type="text"
            // do not modify this line
            onChange={(e) => debouncedSearch(e.target.value)}
          />
        </label>
        {gallery.map((img) => {
          return (
            <div key={img.id} style={{width:'100px',height:'100px',border:'1px solid blue',padding:'5rem',margin:'auto'}}>
            {/* <div>{img.title}</div> */}
            <img alt={img.title} src={img.embed_url} />
            </div>
          )
        })}
      </div>
    </React.Fragment>
  );
}
const rootElement = document.getElementById("root");
ReactDOM.render(<ReactForm />, rootElement);

