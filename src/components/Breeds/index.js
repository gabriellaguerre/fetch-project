import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/usersSlice';
import Profile from '../Profile';
import BreedsResult from "../BreedsResult";
import OpenModalButton from '../OpenModalButton';
import { breeds, getDogBreed, getSearches, searchDog, postSearchDog, clearAllData} from '../../redux/dogsSlice';
import {postLocations, geoBoundingData, postSearchLocations, clearZCLocations, clearLocationsSearch, clearGeoBounding} from '../../redux/locationsSlice'
import './Breeds.css';
import GeoBoundingBox from "../GeoBoundingBox";
import searchImg from '../../assets/search.png';
import plusImg from '../../assets/orange-plus.png'
import filterImg from '../../assets/filter-pic.png'
import deleteImg from '../../assets/x.png';
import sortImg from '../../assets/sort-by.png';
import ascImg from '../../assets/asc.png';
import descImg from '../../assets/desc.png';
import editImg from '../../assets/edit.png'
// import { getAllDogs } from "../../utils";


function Breeds() {

  const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';


  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(breeds());
  }, [dispatch]);

  const user = useSelector(selectUser);
  const doggyBreeds = useSelector(getDogBreed)
  const searchResult = useSelector(getSearches)
  const bodyParams = useSelector(geoBoundingData);
 
  let geoChoices = bodyParams.geoBoundingBox ? Object.keys(bodyParams.geoBoundingBox) : [];



  const [allFilterButtons, setAllFilterButtons] = useState(false);
 
  const [selected, setSelected] = useState([]);
  const [breedSelected, setBreedSelected] = useState(false)



  const [breed, setBreed] = useState(false);
  const [breedAsc, setBreedAsc] = useState(false);
  const [breedDesc, setBreedDesc] = useState(false);

  const [name, setName] = useState(false);
  const [nameAsc, setNameAsc] = useState(false);
  const [nameDesc, setNameDesc] = useState(false);


  const [age, setAge] = useState(false);
  const [ageAsc, setAgeAsc] = useState(false);
  const [ageDesc, setAgeDesc] = useState(false);



  const [filters, setFilters] = useState(false);
  const [sort, setSort] = useState(false);

  const [minimumAge, setMinimumAge] = useState(false);
  const [minAge, setMinAge] = useState("");

  const [maximumAge, setMaximumAge] = useState(false);
  const [maxAge, setMaxAge] = useState("");

  const [location, setLocation] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [selectedZipCode, setSelectedZipCode] = useState([])

  const [size, setSize] = useState(25)
  const [from, setFrom] = useState(0);

  const [searching, setSearching] = useState("")
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState("");

  const [sizeChange, setSizeChange] = useState(false)
  const [updateButton, setUpdateButton] = useState(false)

  const [chooseCity, setChooseCity] = useState(false);
  const [city, setCity] = useState("");
  const [chooseStates, setChooseStates] = useState(false);
  const [selectedState, setSelectedState] = useState("")
  const [states, setStates] = useState([]);
  const [cityChange, setCityChange] = useState(false)
  const [stateChange, setStateChange] = useState((false))


  const [otherParameters, setOtherParameters] = useState(false)
  const [chooseGeoBoundingBox, setChooseGeoBoundingBox] = useState(false);

  const [isSearchingAllLocations, setIsSearchingAllLocations] = useState(false)
  const [isSearchingBreed_ZipCodes, setIsSearchingBreed_ZipCodes] = useState(false)


  let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)
 
  const search = async () => {

    if(!otherParameters) {

    const urlFrontend = new URL(dogSearchUrl);

    if (size <= 0) {
      setError("Enter a Valid Number of Dogs To Display")
      setSize(25);
      return;
    }


    let searchParams = {};

    if ((breed && name) || (breed && age) || (name && age)) {
      setError("Choose 1 Sort Method")
      return;
    }

    if ((breed && !breedAsc && !breedDesc) || (name && !nameAsc && !nameDesc) || (age && !ageAsc && !ageDesc)) {
      setError("Choose an Ascending or Descending Type for your Sort")
      return;
    }

    if (minAge < 0 || maxAge < 0) {
      setError("Please Enter a Valid Age")
      return
    }

    searchParams.breeds = selected;
    searchParams.breeds.forEach(breed => urlFrontend.searchParams.append('breeds', breed));

    searchParams.size = size;
    urlFrontend.searchParams.append('size', searchParams.size)

    searchParams.from = from;
    urlFrontend.searchParams.append('from', searchParams.from)

    if (location && selectedZipCode.length > 0) {
      searchParams.zipCodes = selectedZipCode;
      searchParams.zipCodes.forEach(zipCode => urlFrontend.searchParams.append('zipCodes', zipCode));
    }

    if (minimumAge && minAge) {
      searchParams.ageMin = minAge;
      urlFrontend.searchParams.append('ageMin', searchParams.ageMin)
    }
    if (maximumAge && maxAge) {
      searchParams.ageMax = maxAge;
      urlFrontend.searchParams.append('ageMax', searchParams.ageMax)
    }

    if (breed && breedAsc) {
      searchParams.sort = 'breed:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }
    if (breed && breedDesc) {
      searchParams.sort = 'breed:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }

    if (name && nameAsc) {
      searchParams.sort = 'name:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }
    if (name && nameDesc) {
      searchParams.sort = 'name:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }

    if (age && ageAsc) {
      searchParams.sort = 'age:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }
    if (age && ageDesc) {
      searchParams.sort = 'age:desc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }

    if(!breed && !name && !age) {
      searchParams.sort = 'breed:asc'
      urlFrontend.searchParams.append('sort', searchParams.sort)
    }


    setError("")
    
    setUpdateButton(false);
    let searchDogResults = await dispatch(searchDog(urlFrontend));
    let searchArray = searchDogResults.payload.resultIds
    // console.log(searchArray, 'searchArray line 124')
    let dogData = await dispatch(postSearchDog(searchArray))

    let zipCodes = dogData.payload.map(dog=>dog.zip_code)

    let getZipCodes = await dispatch(postLocations(zipCodes))

    setIsSearchingBreed_ZipCodes(true)
    setIsSearchingAllLocations(false)
    await dispatch(clearLocationsSearch())

  } else if(otherParameters && (chooseCity || chooseStates || chooseGeoBoundingBox)) {

      await dispatch(clearZCLocations())

      let params = {}
      let dogParams = {}
      const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
      const urlDogFrontend = new URL(dogSearchUrl);


      if(chooseCity && city) params.city = city
      if(chooseStates || states.length > 0) params.states = states

      if(Object.keys(bodyParams).length>0) params.geoBoundingBox = bodyParams.geoBoundingBox

      if(chooseStates && states.length>0 && !chooseCity && city.length===0) {
        setError("Please Enter a City For Your Chosen States")
        return
      }

      params.size = '10000';
      params.from = from ? from : '0';

     
      let locationSearchData = await dispatch(postSearchLocations(params))
      console.log(locationSearchData.payload, 'locationSearchData line 224')

      let justZipCodes  = locationSearchData.payload.results.map(location=>location.zip_code)
      console.log(justZipCodes, 'zip codes line 233')

      if(justZipCodes.length>1000) {
        justZipCodes = justZipCodes.slice(0,1000)
      }
     
      dogParams.zipCodes = justZipCodes;
      // console.log(dogParams.zipCodes, 'searchParams.zipCodes line 236')
      dogParams.zipCodes.forEach(zipCode => urlDogFrontend.searchParams.append('zipCodes', zipCode));

      dogParams.size = '1000';
      urlDogFrontend.searchParams.append('size', dogParams.size)

      // console.log(urlDogFrontend, 'line 237')

      let searchDogResults = await dispatch(searchDog(urlDogFrontend));
      // console.log(searchDogResults, 'in breeds line 249')
     
      let searchLocationArray = searchDogResults?.payload?.resultIds
      // console.log(searchLocationArray, 'searchLocationArray line 251')
     
      let dogData = await dispatch(postSearchDog(searchLocationArray))
      // console.log(dogData, 'dogData line 280')
     

      setIsSearchingBreed_ZipCodes(false)
      setIsSearchingAllLocations(true)
      setCityChange(false)
      setStateChange(false)
    }

  }


  let results = doggyBreeds.filter((word) => word.includes(capitalLetterWord))
  // console.log(results, 'results line 266')

  let addBreed = (selectedBreed) => {
    if(!results.includes(selectedBreed)){
      setError("This Breed is Not in Our List")
      return
    }
    if (!selected.includes(selectedBreed)) {
      setSelected(prevSelected => {
        const updatedSelection = [...prevSelected, selectedBreed];
        return updatedSelection;
      })
    } else {
      setError("This Breed is Already in Your List")
    }
  }


  let removeBreed = (breed) => {
    let newArray = selected.filter((dog) => dog !== breed);
    setSelected(newArray)
  }

  let addZipCode = (zipCode) => {
    if (zipCode.length < 5 || zipCode.length > 5) {
      setError("Enter a Valid Zip Code")
      return
    }
    if (!selectedZipCode.includes(zipCode)) {
      setSelectedZipCode(prevSelected => {
        const updatedSelection = [...prevSelected, zipCode];
        return updatedSelection;
      })

    } else {
      setError("This Zip Code is Already in Your List")
      return
    }
  }

  let removeZipCode = (zipCode) => {
    let newArray = selectedZipCode.filter((zip) => zip !== zipCode)
    setSelectedZipCode(newArray)
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
    setBreed(false); setName(false); setAge(false)
  }

  const clearFilters = () => {
    setMinimumAge(false); setMaximumAge(false);
  }

  const clearAll = async () => {
    setSelected([]);
    setSelectedZipCode([])
    setOtherParameters(false)
    setCity('')
    setStates([])
    setFilters(false)
    setSort(false)
    await dispatch(clearAllData());
  }

  const breedError = 'breedErrors' + (error ? "" : "hidden")

  let addState = (selectedState) => {
   
    let allCapsState = selectedState.toUpperCase()
    const stateRegex = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;
   
    
    if(states.includes(allCapsState)) {
      setError("This State is Already in Your List")
      return
    }

    if(chooseStates && selectedState.length > 2) {
      setError('Enter a two-letter state/territory abbreviations')
    }
    
  
    if(allCapsState.length === 2 && stateRegex.test(allCapsState)) {
     
        setStates(prevSelected => {const updatedSelection = [...prevSelected, allCapsState];
        setError("")
        return updatedSelection;
      })
      } else {
        setError("Please Enter a Valid State")
        return
      }
  }


  let removeState = (state) => {
    let newArray = states.filter((place) => place !== state);
    setStates(newArray)
  }

 
    const deleteGeoChoices = async ()=>{
      setChooseGeoBoundingBox(false)
      await dispatch(clearGeoBounding())
    }

  
    const searchAction = (size) => {
  
      if(otherParameters && !cityChange && !stateChange) {
     
        setSizeChange(true)
        setSize(Number(size))
        return
       } else {
         search()
         setSizeChange(false)
    }
  }

  return (
    <>
      <Profile user={user} />

      <div className={breedError}>{error}</div>

      <div className='searchAndFilterBreed'>

        <div className='gridArea1-1'>
          <div className='gridArea11-r1'>
            {searching && results.length > 0 && menu ? (
              <div className="results">
                {results.map((word, index) => (
                  <ul key={index} className='resultList' onClick={() => { setSearching(word); setMenu(false) }}>{word}</ul>
                ))}
              </div>
            ) : null}
            <div className='inputDiv'>
              <input
                className='inputBox'
                type="text"
                value={searching}
                placeholder="Type to search our available breeds then click the + button"
                onFocus={() => { setMenu(true); setError(""); setBreedSelected(true);setOtherParameters(false) }}
                onChange={(e) => setSearching(e.target.value)}
              /> </div>


            <div className='searchDiv'>
              <button className='addButton' onClick={() => { addBreed(searching); setMenu(false); setSearching("") }}><img src={plusImg} className="searchPic" alt='plusimg' /></button></div>
          </div>

          <div className='gridArea11-r2'>
            {breedSelected && selected.length > 0 && (
              <div className='breedChoices'><div className='breedsSelectedTitle'>Breeds selected:</div>
                {selected.map((breed, index) => (
                  <div key={index} className='chosenBreeds'>{breed}
                    <button className='removeButton' onClick={() => removeBreed(breed)}><img src={deleteImg} className="deletePic" alt='deleteimg' /></button>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>

        <div className='gridArea1-2'>
          <div className='gridArea12-r1'>
            <button className='allFilterButton' onClick={() => { setAllFilterButtons(!allFilterButtons); setOtherParameters(false); setFilters(false); setSort(false) }}>
              <div><img src={filterImg} className="filterPic" alt='filterimg' /></div>
              <div> Filters</div></button>
            <button className='searchByLocationButton' onClick={() => { setOtherParameters(!otherParameters); setAllFilterButtons(false); setFilters(false); setSort(false);setChooseStates(false);setChooseCity(false) }}>Search By Location</button>

          </div>

          <div className='gridArea12-r2'>
            {allFilterButtons && (
              <div className='breedFilterChosen'>
                <button className='filterButton' onClick={() => { clearFilters(); setFilters(!filters); setError("") }}>Age Filters</button>
                <div><button className='filterButton' onClick={() => { clearSort(); setSort(!sort); setError("") }}><img src={sortImg} className="filterPic" alt='sortimg' />Sort By</button></div>
              </div>
            )}

            {otherParameters && (
              <div className='otherParametersChosen'>
                <div className="filter-option">
                  <label className='checkbox'>
                    <input
                      type="checkbox"
                      value={chooseCity}
                      onChange={() => setChooseCity(!chooseCity)}
                    />City: </label>
                  {chooseCity && (
                    <input
                      className="filter-input-city"
                      type="text"
                      value={city}
                      onFocus={()=>setCityChange(true)}
                      onChange={(e) => setCity(e.target.value)} />
                  )}

                </div>
                <div className="filter-option-state">
                  <label>
                    <input
                      type="checkbox"
                      value={chooseStates}
                      onChange={() => setChooseStates(!chooseStates)}
                    />State: </label>
                  {chooseStates && (
                    <>
                      <input
                        className="filter-input-state"
                        type="text"
                        value={selectedState}
                        onFocus={() => {setMenu(true);setStateChange(true);setError("")}}
                        onChange={(e) => setSelectedState(e.target.value)} />
                      <span className='searchSpan'><button className='addStateButton' onClick={()=>{addState(selectedState);setSelectedState("")}} ><img src={plusImg} className="searchStatePic" alt='plusimg' /></button></span>
                    </>
                  )}
                </div>
                <div className='geoBoundingArea'>
                  <button className='openModalButton' onClick={()=>setChooseGeoBoundingBox(true)} disabled={geoChoices.length>0}><OpenModalButton
                    buttonText={<div className='geoBoundingBox'>Geo-Bounding Box</div>}
                    modalComponent={<GeoBoundingBox />}
                    /></button>
                </div>

          <div className='geoChoicesArea'>
          {geoChoices.length>0 &&  (
        <>
      {geoChoices?.map((choice, index) => (
          <div key={index} className='geoChoice' id={'s'+ index}>{choice}</div>
      ))}
      <div className='editGeoDiv'><button className='editGeoChoiceButton'>
                    <OpenModalButton
                    buttonText={<div className='geoBoundingBox'><img src={editImg} className="editPic" alt='editimg'/></div>}
                    modalComponent={<GeoBoundingBox parameters={bodyParams} />} /></button></div>
      <div className='deleteGeoDiv'><button className='deleteGeoChoiceButton'onClick={()=>{deleteGeoChoices()}} >
        <img src={deleteImg} className="deleteGeoPic" alt='plusimg'/></button></div>
      </>
         )}
         </div>


              </div>
            )}


          </div>
          {/* <button className='allFilterButton' onClick={() => { setAllFilterButtons(!allFilterButtons); setOtherParameters(false); setFilters(false); setSort(false) }}>
            <div><img src={filterImg} className="filterPic" alt='filterimg' /></div>
            <div> Filters</div></button>
          <button className='searchByLocationButton' onClick={() => { setOtherParameters(!otherParameters);setAllFilterButtons(false); setFilters(false); setSort(false) }}>Search By Location</button> */}

        </div>

        <div className='gridArea2-1'>

          {/* <div className='breedChoices'>Breeds selected:
            {selected.map((breed, index) => (
              <div key={index} className='chosenBreeds'>{breed}
                <button className='removeButton' onClick={() => removeBreed(breed)}><img src={deleteImg} className="deletePic" alt='deleteimg' /></button>
              </div>
            ))}
          </div> */}

        </div>

        <div className='gridArea2-2'>
        {chooseStates && states.length>0 && otherParameters && (
             <div className='locationChoices'><div className='statesSelectedTitle'>States Selected:</div>
             {states.map((places, index) =>(
               <div key={index} className='chosenLocations'>{places}
               <button className='removeStateButton' onClick={()=>removeState(places)}><img src={deleteImg} className="deleteStatePic" alt='deleteimg'/></button>
               </div>
             ))}
             </div>
        )}




          {filters && (
            <>
              <div className='filters-breed'>
                <div className="filter-option-breed">
                  <label>
                    <input
                      type="checkbox"
                      value={minimumAge}
                      min='0'
                      onChange={() => setMinimumAge(!minimumAge)}
                    />Minimum Age: </label>
                  {minimumAge && (
                    <input
                      className="filter-input-breed"
                      type="number"
                      value={minAge}
                      // placeholder="Enter a minimum age"
                      onChange={(e) => setMinAge(e.target.value)} />
                  )}
                </div>

                <div className="filter-option-breed">
                  <label>
                    <input
                      type="checkbox"
                      value={maximumAge}
                      min='1'
                      onChange={() => setMaximumAge(!maximumAge)}
                    />Maximum Age: </label>
                  {maximumAge && (
                    <input
                      className="filter-input-breed"
                      type="number"
                      value={maxAge}
                      // placeholder="Enter a maximum age"
                      onChange={(e) => setMaxAge(e.target.value)} />
                  )}
                </div>

                {/* <div className="filter-option-breed">
                  <label>
                    <input
                      type="checkbox"
                      value={location}
                      onChange={() => setLocation(!location)}
                    />Zip Code: </label>
                  {location && (
                    <div>
                      <input
                        className="zip-location-input-breed"
                        type="number"
                        value={zipCode}
                        onFocus={() => setError("")}
                        onChange={(e) => setZipCode(e.target.value)} />
                      <button className='addZipButton' disabled={!location} onClick={() => { addZipCode(zipCode); setZipCode("") }}><img src={plusImg} className="addZip" alt='plusimg' /></button>

                    </div>
                  )}
                </div> */}

              </div>
            </>
          )}


          {sort && (
            <>
              <div className='sort'>
                <div className="sort-option">
                  <label className='sort-checkbox'>
                    <input
                      type="checkbox"
                      value={breed}
                      onChange={() => { setBreed(!breed) }}
                    />Breed: </label>
                  {breed && (
                    <div className='sort-buttons'><button className={ascBreed} onClick={() => { setBreedAsc(true); setBreedDesc(false) }}>
                      <img src={ascImg} className="ascPic" alt='ascimg' /></button>
                      <button className={descBreed} onClick={() => { setBreedAsc(false); setBreedDesc(true) }}><img src={descImg} className="descPic" alt='descimg' /></button>
                    </div>
                  )}


                </div>

                <div className="sort-option">
                  <label>
                    <input
                      type="checkbox"
                      value={name}
                      onChange={() => setName(!name)}
                    />Name: </label>
                  {name && (
                    <div><button className={ascName} onClick={() => { setNameAsc(true); setNameDesc(false) }}><img src={ascImg} className="ascPic" alt='ascimg' /></button>
                      <button className={descName} onClick={() => { setNameAsc(false); setNameDesc(true) }}><img src={descImg} className="descPic" alt='descimg' /></button>
                    </div>
                  )}

                </div>

                <div className="sort-option">
                  <label>
                    <input
                      type="checkbox"
                      value={age}
                      onChange={() => setAge(!age)}
                    />Age: </label>
                  {age && (
                    <div className='ageSort'><button className={ascAge} onClick={() => { setAgeAsc(true); setAgeDesc(false) }}><img src={ascImg} className="ascPic" alt='ascimg' /></button>
                      <button className={descAge} onClick={() => { setAgeAsc(false); setAgeDesc(true) }}><img src={descImg} className="descPic" alt='descimg' /></button>
                    </div>
                  )}


                </div>
              </div>
            </>
          )}



        </div>


        <div className='gridArea3-2'>

          {(allFilterButtons || otherParameters) && (
             <div className='zipCodeEntry'>
            <div className='inputDiv'>
            <input
              className='inputBoxLocation'
              type="number"
              value={zipCode}
              disabled={(chooseCity || chooseStates)}
              placeholder="Enter a zip code and press +"
              onFocus={() => setLocation(true)}
              onChange={(e) => { setZipCode(e.target.value); setError("") }}
            /> </div>

          <div className='searchDiv'><button className='addZipButton' onClick={() => { addZipCode(zipCode); setZipCode("") }} disabled={(chooseCity || chooseStates)}><img src={plusImg} className="searchPic" alt='plusimg' /></button></div>
          </div>

          )}

            <div className='sizeBreed'>Dogs per page:
              <input
                className='sizeInputBreed'
                type="number"
                value={size}
                onFocus={() => { setSizeChange(true); setUpdateButton(true); setError("") }}
                onChange={(e) => { setSize(e.target.value); setSizeChange(true) }} />

              <button className='updateButton' onClick={() => searchAction(size)} disabled={!updateButton}>Update</button></div>


        </div>

        <div className='gridArea4-2'>
          {location && selectedZipCode.length > 0 && (
            <div className='zipChoices'>Zip Codes Selected:
              {selectedZipCode.map((zipcode, index) => (
                <div key={index} className='chosenZips'>{zipcode}
                  <button className='removeZipButton' onClick={() => removeZipCode(zipcode)}><img src={deleteImg} className="deleteZipPic" alt='deleteimg' /></button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>

        <div className='searchBreed'><button className='searchBreedButton' onClick={() => { search(); setMenu(false); setFrom(0) }}>SEARCH<img src={searchImg} className="searchPic" alt='searchimg' /></button>
        <button className='clearAllButton' onClick={clearAll}>Clear All</button></div>

      <div className='breedResult'><BreedsResult size={size} sizeChange={sizeChange} totalPage={Math.ceil(Number(searchResult?.total) / Number(size))} breedZipCodeSearch={isSearchingBreed_ZipCodes} allLocationsSearch={isSearchingAllLocations}/></div>
    </>
  );
}

export default Breeds;
