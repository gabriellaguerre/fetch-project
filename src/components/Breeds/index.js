import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';
import Profile from '../Profile';
import BreedsResult from "../BreedsResult";
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, clearAllData, dogMatch } from '../../redux/dogsSlice';
import './Breeds.css';
import searchImg from '../../assets/search.png';
import plusImg from '../../assets/orange-plus.png'
import filterImg from '../../assets/filter-pic.png'
import deleteImg from '../../assets/x.png';
import sortImg from '../../assets/sort-by.png';
import ascImg from '../../assets/asc.png';
import descImg from '../../assets/desc.png';


function Breeds() {
    const dispatch = useDispatch();

     useEffect(() => {
          dispatch(breeds());
        }, [dispatch]);
  
    const user = useSelector(selectUser);
    const doggyBreeds = useSelector(getDogBreed)
    const searchResult = useSelector(getSearches)
    const details = useSelector(getDogDetails);
    // const user = "asfd";
    const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';

    const [allFilterButtons, setAllFilterButtons] = useState(false);
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

    const [size, setSize] = useState(25)
    const [from, setFrom] = useState(0);

    const [searching, setSearching] = useState("")
    const [menu, setMenu] = useState(false);
    const [error, setError] = useState("");

    const [sizeChange, setSizeChange] = useState(false)
    const [updateButton, setUpdateButton] = useState(false)


    let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)
    console.log(size.length, 'size line 69')

    const search = async () => {
    const urlFrontend = new URL(dogSearchUrl);

    if(size <= 0) {
      setError("Enter a Valid Number of Dogs To Display")
      setSize(25);
      return;
    }

    // let thisSize = true

    //  console.log(size, size.length, 'size and size length line 74')

    // if(size) {
    //   setSizeChange(thisSize)
    // } else {
    //   setError("Enter the number of Dogs per page you want displayed")
    //   return;
    // }

    let searchParams = {};

    if(selected.length === 0) {
      setError("Enter a Breed For Your Search")
      setUpdateButton(true);
      return;
    }

    if((breed && name) || (breed && age) || (name && age)) {
       setError("Choose 1 Sort Method")
       return;
    }

    if((breed && !breedAsc && !breedDesc) || (name && !nameAsc && !nameDesc) || (age && !ageAsc && !ageDesc)) {
      setError("Choose an Ascending or Descending Type for your Sort")
      return;
    }

    if((location && zipCode.length === 0) || (location && zipCode.length>5)) {
      setError("Enter a Valid Zip Code")
      return;
    }

    if(minAge < 0 || maxAge < 0) {
      setError("Please Enter a Valid Age")
      return
    }


    searchParams.breeds = selected;
    searchParams.breeds.forEach(breed => urlFrontend.searchParams.append('breeds', breed));


    searchParams.size = size;
    urlFrontend.searchParams.append('size', searchParams.size)


    searchParams.from = from;
    urlFrontend.searchParams.append('from', searchParams.from)

    searchParams.sort = 'breed:asc'
    urlFrontend.searchParams.append('sort', searchParams.sort)


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

     setError("")
     setSizeChange(false);
     setUpdateButton(false);
    let searchDogResults = await dispatch(searchDog(urlFrontend));
    let searchArray = searchDogResults.payload.resultIds
    // console.log(searchArray, 'searchArray line 124')
    await dispatch(postSearchDog(searchArray))
    // let dogs = await dispatch(postSearchDog(searchArray))
    // console.log(dogs, 'dogs')

  }


      let results = doggyBreeds.filter((word)=>word.includes(capitalLetterWord))
      // console.log(searchResult, 'results obj')

      let addBreed = (selectedBreed) => {
        if(!selected.includes(selectedBreed)) {

          setSelected(prevSelected => {const updatedSelection = [...prevSelected,selectedBreed];
            return updatedSelection;
          })

        }
      }


      let removeBreed = (breed) => {
        let newArray = selected.filter((dog) => dog !== breed);
        setSelected(newArray)
      }

      const ascBreed = `breed ${breedAsc ? "asc" : ""}`
      const descBreed = `breed ${breedDesc ? "desc" : ""}`
      const ascName = `name ${nameAsc ? "asc" : ""}`
      const descName = `name ${nameDesc ? "desc" : ""}`
      const ascAge = `age ${ageAsc ? "asc" : ""}`
      const descAge = `age ${ageDesc ? "desc" : ""}`

      const clearSort = () => {
        setBreedAsc(false); setBreedDesc(false);
        setNameAsc(false); setNameDesc(false);
        setAgeAsc(false); setAgeDesc(false);
        setBreed(false);setName(false);setAge(false)
      }

      const clearFilters = () =>{
        setMinimumAge(false); setMaximumAge(false);setLocation(false);
      }

      const clearAll = async ()=> {
        setSelected([]);
        await dispatch(clearAllData());
      }

      const breedError = 'breedErrors' + (error ? "": "hidden")

   return (
    <>
     <Profile user={user}/>

     <div className={breedError}>{error}</div>

     <div className='searchAndFilterBreed'>

      <div className='gridArea1-1'>
      {searching && results.length>0 && menu? (
          <div className="results">
           {results.map((word, index)=> (
          <ul key={index} className='resultList' onClick={()=>{setSearching(word);setMenu(false)}}>{word}</ul>
               ))}
          </div>
         ):null}
        <div className='inputDiv'>
      <input
         className='inputBox'
         type="text"
         value={searching}
         placeholder="Type to search our available breeds then click the + button"
         onFocus={() => {setMenu(true);setError("")}}
         onChange={(e) => setSearching(e.target.value)}
         /> </div>


          <div className='searchDiv'>
          <button className='addButton' onClick={()=>{addBreed(searching);setMenu(false);setSearching("")}}><img src={plusImg} className="searchPic" alt='plusimg'/></button></div>

            </div>

        <div className='gridArea1-2'>
         <button className='allFilterButton'onClick={()=>{setAllFilterButtons(!allFilterButtons);setFilters(false);setSort(false)}}> Filters</button>
         {allFilterButtons && (
          <div className='allFilterItems'>
          <button className='filterButton' onClick={()=>{clearFilters();setFilters(!filters);setError("")}}><img src={filterImg} className="filterPic" alt='filterimg'/>Filters</button>

           <div className='sizeBreed'>Dogs per page:
          <input
              className='sizeInputBreed'
              type="number"
              value={size}
              onFocus={() => {setSizeChange(true);setUpdateButton(true);setError("")}}
              onChange={(e) => {setSize(e.target.value);setSizeChange(true)}}/>
              <button className='updateButton' onClick={()=>search(searching)} disabled={!updateButton}>Update</button></div>

          <div><button className='filterButton' onClick={()=>{clearSort();setSort(!sort);setError("")}}><img src={sortImg} className="filterPic" alt='sortimg'/>Sort By</button></div>
          </div>
         )}
        
              </div>

       <div className='gridArea2-1'>

          <div className='breedChoices'>Breeds selected:
          {selected.map((breed, index) =>(
            <div key={index} className='chosenBreeds'>{breed}
            <button className='removeButton' onClick={()=>removeBreed(breed)}><img src={deleteImg} className="deletePic" alt='deleteimg'/></button>
            </div>
          ))}
        </div>

        </div>

        <div className='gridArea2-2'>
        
        {filters &&  (
        <>
        <div className='filters-breed'>
       <div className="filter-option-breed">
        <label>
          <input
          type="checkbox"
          value={minimumAge}
          min='0'
          onChange={()=>setMinimumAge(!minimumAge)}
          />Minimum Age: </label>
          {minimumAge && (
        <input
            className="filter-input-breed"
            type="number"
            value={minAge}
            // placeholder="Enter a minimum age"
            onChange={(e) => setMinAge(e.target.value)}/>
          )}
        </div>

      <div className="filter-option-breed">
        <label>
          <input
          type="checkbox"
          value={maximumAge}
          min='1'
          onChange={()=>setMaximumAge(!maximumAge)}
          />Maximum Age: </label>
          {maximumAge && (
        <input
            className="filter-input-breed"
            type="number"
            value={maxAge}
            // placeholder="Enter a maximum age"
            onChange={(e) => setMaxAge(e.target.value)}/>
          )}
       </div>

      <div className="filter-option-breed">
        <label>
          <input
          type="checkbox"
          value={location}
          onChange={()=>setLocation(!location)}
          />Zip Code: </label>
          {location && (
          <input
            className="zip-location-input-breed"
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
          onChange={()=>{setBreed(!breed)}}
          />Breed: </label>
        {breed && (
            <div className='sort-buttons'><button className={ascBreed} onClick={()=>{setBreedAsc(true);setBreedDesc(false)}}>
              <img src={ascImg} className="ascPic" alt='ascimg'/></button>
             <button className={descBreed} onClick={()=>{setBreedAsc(false);setBreedDesc(true)}}><img src={descImg} className="descPic" alt='descimg'/></button>
             </div>
        )}


        </div>

      <div className="sort-option">
        <label>
          <input
          type="checkbox"
          value={name}
          onChange={()=>setName(!name)}
          />Name: </label>
          {name && (
          <div><button className={ascName} onClick={()=>{setNameAsc(true);setNameDesc(false)}}><img src={ascImg} className="ascPic" alt='ascimg'/></button>
             <button className={descName} onClick={()=>{setNameAsc(false);setNameDesc(true)}}><img src={descImg} className="descPic" alt='descimg'/></button>
             </div>
          )}

       </div>

      <div className="sort-option">
        <label>
          <input
          type="checkbox"
          value={age}
          onChange={()=>setAge(!age)}
          />Age: </label>
          {age && (
             <div className='ageSort'><button className={ascAge} onClick={()=>{setAgeAsc(true);setAgeDesc(false)}}><img src={ascImg} className="ascPic" alt='ascimg'/></button>
             <button className={descAge} onClick={()=>{setAgeAsc(false);setAgeDesc(true)}}><img src={descImg} className="descPic" alt='descimg'/></button>
             </div>
          )}


       </div>
       </div>
        </>
        )}
        <div className='searchByLocation'>Search By Location</div>
        </div>
      </div>
        
        <div className='searchBreed'><button className='searchBreedButton' onClick={()=>{search(searching);setMenu(false);setFrom(0)}} disabled={updateButton}>SEARCH<img src={searchImg} className="searchPic" alt='searchimg'/></button>
        <button className='clearAllButton' onClick={clearAll}>Clear All</button></div>
         <div className='breedResult'><BreedsResult size={size} sizeChange={sizeChange} totalPage={Math.ceil(Number(searchResult.total)/Number(size))}/></div>
      </>
  );
}

export default Breeds;
