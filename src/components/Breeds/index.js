import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import {useNavigate} from 'react-router';
import { logout } from "../../redux/usersSlice";
// import LoginPage from '../LoginPage';
import Profile from '../Profile';
import Table from "../Table";
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, dogMatch } from '../../redux/dogsSlice';
import './Breeds.css';
import searchImg from '../../Assets/search.png';
import plusImg from '../../Assets/orange-plus.png'
import filterImg from '../../Assets/filter-pic.png'
import deleteImg from '../../Assets/trash-can.png';
import sortImg from '../../Assets/sort-by.png';


function Breeds() {
    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    const doggyBreeds = useSelector(getDogBreed)
    const searchResult = useSelector(getSearches)
    const details = useSelector(getDogDetails);
    // const user = "asfd";
    const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';



    let searchArray = searchResult.resultIds;
    console.log(searchArray, 'searchArray')


    const [selected, setSelected] = useState([]);

    const [breed, setBreed] = useState(false);
    const [breedAsc, setBreedAsc] = useState(false);
    const [breedDesc, setBreedDesc] = useState(false);

    const [name, setName] = useState(false);
    const [nameAsc, setNameAsc] = useState(false);
    const [nameDesc, setNameDesc] = useState(false);


    const [age, setAge] = useState(false);
    const [ageAsc, setAgeAsc] = useState(false);
    const [ageDesc, setAgeDesc] = useState(false);



    const[filters, setFilters] = useState(false);
    const [sort, setSort] = useState(false);

    const [minimumAge, setMinimumAge] = useState(false);
    const [minAge, setMinAge] = useState("");

    const [maximumAge, setMaximumAge] = useState(false);
    const [maxAge, setMaxAge] = useState("");

    const [location, setLocation] = useState(false);
    const [zipCode, setZipCode] = useState("");

    const [size, setSize] = useState("")

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)



//   useEffect(() => {
//     dispatch(breeds());
//   }, [dispatch]);

  const search = async () => {
    const urlFrontend = new URL(dogSearchUrl);
    let searchParams = {};

    searchParams.breeds = selected;
    searchParams.breeds.forEach(breed => urlFrontend.searchParams.append('breeds', breed));
   
    searchParams.size = size ? size : '5';
    urlFrontend.searchParams.append('size', searchParams.size)
  

    if(location && zipCode) {
      searchParams.zipCodes = [zipCode];
      searchParams.zipCodes.forEach(zipCode => urlFrontend.searchParams.append('zipCodes', zipCode));
    }

    if(minimumAge && minAge) {
      searchParams.ageMin = minAge;
      urlFrontend.searchParams.append('ageMin', searchParams.ageMin)
    }
    if(maximumAge && maxAge) {
      searchParams.ageMax = maxAge;
      urlFrontend.searchParams.append('ageMax', searchParams.ageMax)
    } 

    if(breed && breedAsc) {
      searchParams.sort = 'breed:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }
    if(breed && breedDesc) {
      searchParams.sort = 'breed:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }

     if(name && nameAsc) {
      searchParams.sort = 'name:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
     }
     if(name && nameDesc) {
      searchParams.sort = 'name:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
     }

     if(age && ageAsc) {
      searchParams.sort = 'age:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
     }
     if(age && ageDesc) {
      searchParams.sort = 'age:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
     }


     


    console.log(searchParams, 'searchParams')
    console.log(urlFrontend, 'urlFrontend')
    await dispatch(searchDog(urlFrontend));

    // console.log(searchArray, 'inside search for searchArray')

    // if(searchArray.length > 0) {
    //     let dogs = await dispatch(postSearchDog(searchArray))
    //     console.log(dogs, 'dogs')
    // }




//     // setBreedName(searching)
//     // console.log(breed, breedName, breed && breedName.length>0, 'breedName in search')
//     // let selectedParams = [];

//     // if(breed && breedName.length>0) selectedParams = [...selectedParams,breedName];
//     // // if(minimumAge && minAge) selectedParams = [...selectedParams,minAge];
//     // // if(maximumAge && maxAge) selectedParams = [...selectedParams,maxAge];
//     // // if(location && zipCode) selectedParams = [...selectedParams,zipCode];

//     // if(selectedParams.length>0){
//     //   // console.log(selectedParams,'selectedparams')
//     //   setSelected(selectedParams);
//     //   dispatch(searchDog(selectedParams));
//     // }
  }


      let results = doggyBreeds.filter((word)=>word.includes(capitalLetterWord))
      // console.log(searchResult, 'results obj')

      let addBreed = (selectedBreed) => {
        console.log(selectedBreed, 'selectedBreed')

        if(!selected.includes(selectedBreed)) {

          setSelected(prevSelected => {const updatedSelection = [...prevSelected,selectedBreed];
            return updatedSelection;
          })
          console.log(selected, 'after adding breed')

        }


      }
      console.log(selected, 'after adding breed')

      let removeBreed = (breed) => {
        let newArray = selected.filter((dog) => dog != breed);
        console.log(newArray, 'newArray')
        setSelected(newArray)
      }

      console.log(sort, 'sort')

   return (
    <>
     <Profile user={user}/>
     {/* <div className='instruction'>Type to search our available breeds, then click the + to add that breed to your search list</div> */}
     <div className='searchAndFilter'>

      <div className='gridArea1-1'>

        <div className='inputDiv'>
      <input
         className='inputBox'
         type="text"
         value={searching}
         placeholder="Type to search our available breeds"
         onFocus={() => setMenu(true)}
         onChange={(e) => setSearching(e.target.value)}
         /> </div>


        <div className='searchDiv'>
          <button className='addButton' onClick={()=>{addBreed(searching);setMenu(false);setSearching("")}}><img src={plusImg} className="searchPic"/></button>
          {/* <button className='searchButton' onClick={()=>{search(searching);setMenu(false)}}><img src={searchImg} className="searchPic"/></button> */}
            </div></div>

        <div className='gridArea1-2'><button className='filterButton' onClick={()=>setFilters(!filters)}><img src={filterImg} className="filterPic"/>Filters</button>

        <div className='size'>Dogs per page:
          <input
              className='sizeInput'
              type="number"
              value={size}
              // placeholder="Enter a maximum age"
              onChange={(e) => setSize(e.target.value)}/></div>

          <div><button className='filterButton' onClick={()=>setSort(!sort)}><img src={sortImg} className="filterPic"/>Sort By</button></div>

              </div>

       <div className='gridArea2-1'>
           {searching && results.length>0 && menu? (
          <div className="results">
           {results.map((word, index)=> (
          <ul key={index} className='resultList' onClick={()=>{setSearching(word);setMenu(false)}}>{word}</ul>
               ))}
          </div>
         ):null}
        </div>

        <div className='gridArea2-2'>
        {filters &&  (
        <>
        <div className='filters'>
       <div className="filter-option">
        <label className='checkbox'>
          <input
          type="checkbox"
          value={minimumAge}
          onChange={()=>setMinimumAge(!minimumAge)}
          />Minimum Age: </label>
          {minimumAge && (
        <input
            className="filter-input"
            type="number"
            value={minAge}
            // placeholder="Enter a minimum age"
            onChange={(e) => setMinAge(e.target.value)}/>
          )}
        </div>

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={maximumAge}
          onChange={()=>setMaximumAge(!maximumAge)}
          />Maximum Age: </label>
          {maximumAge && (
        <input
            className="filter-input"
            type="number"
            value={maxAge}
            // placeholder="Enter a maximum age"
            onChange={(e) => setMaxAge(e.target.value)}/>
          )}
       </div>

      <div className="filter-option">
        <label>
          <input
          type="checkbox"
          value={location}
          onChange={()=>setLocation(!location)}
          />Zip Code: </label>
          {location && (
          <input
            className="location-input"
            type="number"
            value={zipCode}
            // placeholder="Enter a zip code"
            onChange={(e) => setZipCode(e.target.value)}/>
          )}
       </div>
       </div>
        </>
        )}

         {sort &&  (
        <>
        <div className='sort'>
       <div className="sort-option">
        <label className='sort-checkbox'>
          <input
          type="checkbox"
          value={breed}
          onChange={()=>setBreed(!breed)}
          />Breed: </label>
         
        <div className='sort-buttons'><button onClick={()=>{setBreedAsc(true);setBreedDesc(false)}}>Asc</button>
             <button onClick={()=>{setBreedAsc(false);setBreedDesc(true)}}>Desc</button></div>
         
        </div>

      <div className="sort-option">
        <label>
          <input
          type="checkbox"
          value={name}
          onChange={()=>setName(!name)}
          />Name: </label>
          
         <div><button onClick={()=>{setNameAsc(true);setNameDesc(false)}}>Asc</button>
             <button onClick={()=>{setNameAsc(false);setNameDesc(true)}}>Desc</button></div>
         
       </div>

      <div className="sort-option">
        <label>
          <input
          type="checkbox"
          value={age}
          onChange={()=>setAge(!age)}
          />Age: </label>
          
           <div><button onClick={()=>{setAgeAsc(true);setAgeDesc(false)}}>Asc</button>
             <button onClick={()=>{setAgeAsc(false);setAgeDesc(true)}}>Desc</button></div>
         
       </div>
       </div>
        </>
        )}
        </div>
      </div>
        <div className='breedChoices'>Breeds selected:
          {selected.map((breed, index) =>(
            <div key={index} className='chosenBreeds'>{breed}
            <button className='removeButton' onClick={()=>removeBreed(breed)}><img src={deleteImg} className="deletePic"/></button>
            </div>
          ))}
        </div>
        <div className='search2'><button className='search2Button' onClick={()=>{search(searching);setMenu(false)}}>SEARCH<img src={searchImg} className="searchPic"/></button></div>
        {/* <div className='table'><Table details={details} searchResult={searchResult}/></div> */}
      </>
  );
}

export default Breeds;
