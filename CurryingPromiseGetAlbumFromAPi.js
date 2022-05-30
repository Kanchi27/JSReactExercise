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