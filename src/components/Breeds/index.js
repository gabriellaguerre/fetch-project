import React, { useState} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../../redux/usersSlice';
import Profile from '../Profile';
import BreedsResult from "../BreedsResult";
import OpenModalButton from '../OpenModalButton';
import { getDogBreed, getSearches, searchDog, postSearchDog, postSearchDog2, clearAllData, clearDogDetails } from '../../redux/dogsSlice';
import { clearAllLocationData, postLocations, geoBoundingData, postSearchLocations, clearZCLocations, clearLocationsSearch, clearGeoBounding } from '../../redux/locationsSlice'
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



function Breeds() {

  const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';


  const dispatch = useDispatch();

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
  const [tempSize, setTempSize] = useState(size)
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
  const [loading, setLoading] = useState(false)
  // const [stateChange, setStateChange] = useState((false))


  const [otherParameters, setOtherParameters] = useState(false)
  const [chooseGeoBoundingBox, setChooseGeoBoundingBox] = useState(false);

  const [isSearchingAllLocations, setIsSearchingAllLocations] = useState(false)
  const [isSearchingBreed_ZipCodes, setIsSearchingBreed_ZipCodes] = useState(false)

  const [clearAllPressed, setClearAllPressed] = useState(false)


  let capitalLetterWord = searching?.[0]?.toUpperCase() + searching.substring(1)

  //Search either by BREED or by LOCATION
  const search = async (tempSize) => {

    await dispatch(clearDogDetails())
    await dispatch(clearAllLocationData())

  //SEARCH BY BREED AND FILTERS 
    if (!otherParameters && selected.length === 0) {
      setError("Please Select a Breed to Search")
      return
    }

    if (!otherParameters) {
      const urlFrontend = new URL(dogSearchUrl);

      if (size <= 0) {
        setError("Enter a Valid Number of Dogs To Display")
        setSize(25);
        return;
      }


      let searchParams = {
        breeds: selected,
        size: updateButton ? tempSize : size,
        from: from
      };


      if ((breed && name) || (breed && age) || (name && age)) {
        setError("Choose 1 Sort Method")
        setLoading(false)
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

      // searchParams.breeds = selected;
      searchParams.breeds.forEach(breed => urlFrontend.searchParams.append('breeds', breed));
      
      urlFrontend.searchParams.append('size', searchParams.size)

      // searchParams.from = from;
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

      const sortingOptions = [
        { key: 'breed', asc: breedAsc, desc: breedDesc },
        { key: 'name', asc: nameAsc, desc: nameDesc },
        { key: 'age', asc: ageAsc, desc: ageDesc }
    ];

    const sortParam = sortingOptions.find(option => option.asc || option.desc);
    const sortValue = sortParam ? `${sortParam.key}:${sortParam.asc ? 'asc' : 'desc'}` : 'breed:asc';

    searchParams.sort = sortValue;
    urlFrontend.searchParams.append('sort', sortValue);
//****************************************************************************************************** */
      // if (breed && breedAsc) {
      //   searchParams.sort = 'breed:asc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }
      // if (breed && breedDesc) {
      //   searchParams.sort = 'breed:desc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }

      // if (name && nameAsc) {
      //   searchParams.sort = 'name:asc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }
      // if (name && nameDesc) {
      //   searchParams.sort = 'name:desc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }

      // if (age && ageAsc) {
      //   searchParams.sort = 'age:asc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }
      // if (age && ageDesc) {
      //   searchParams.sort = 'age:desc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }

      // if (!breed && !name && !age) {
      //   searchParams.sort = 'breed:asc'
      //   urlFrontend.searchParams.append('sort', searchParams.sort)
      // }

/*************************************************************************************************** */




      setError("")

      setUpdateButton(false);
      let searchDogResults = await dispatch(searchDog(urlFrontend));
      // console.log(searchDogResults, 'searchDogResults line 205')
      let searchArray = searchDogResults.payload.resultIds
      // console.log(searchArray, 'searchArray line 206')
      let dogData = await dispatch(postSearchDog2(searchArray))
      // console.log(dogData, 'dogData line 208')
      let zipCodes = dogData.payload.map(dog => dog.zip_code)
      // console.log(zipCodes, 'zipCodes line 210')
       await dispatch(postLocations(zipCodes))
      // let getZipCodes = await dispatch(postLocations(zipCodes))
      // console.log(getZipCodes, 'getZipCodes line 212')

      setIsSearchingBreed_ZipCodes(true)
      setIsSearchingAllLocations(false)
      setLoading(false)
      await dispatch(clearLocationsSearch())

    //SEARCH BY LOCATION AND OTHER PARAMETERS    
    } else if (otherParameters && (chooseCity || chooseStates || chooseGeoBoundingBox)) {
    
      await dispatch(clearDogDetails())
      await dispatch(clearZCLocations())
      await dispatch(clearLocationsSearch())
      await dispatch(clearGeoBounding())

      let params = {}
    
      const dogSearchUrl2 = 'https://frontend-take-home-service.fetch.com/dogs/search?';
    

      if (chooseCity && city) params.city = city
      if (chooseStates || states.length > 0) params.states = states

      if (Object.keys(bodyParams).length > 0) params.geoBoundingBox = bodyParams.geoBoundingBox


      params.size = '10000';
      params.from = from ? from : '0';


      let locationSearchData = await dispatch(postSearchLocations(params))
      

      let justZipCodes = locationSearchData.payload.results.map(location => location.zip_code)
      

      //Add a delay to avoid overloading server
     const delay = async (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }

      let dogBatches = []

      //fetching dog details per batch 
      const fetchAllDogDetails = async () => {
        let allDogDetails = []
        for (let index = 0; index < dogBatches.length; index++) {
          let dogBatch = dogBatches[index];
          let doggyDetails = await dispatch(postSearchDog(dogBatch))
          allDogDetails.push(...doggyDetails.payload)
        }
        return allDogDetails
      }

      //Getting Dog IDS from server per batch
      const dispatchBatches = async () => {
        let allDogIds = []
        for (let index = 0; index < batches.length; index++) {
          let dogParams2 = {}
          const urlDogFrontend2 = new URL(dogSearchUrl2);
          let batch = batches[index];

          dogParams2.size = 10000;
          urlDogFrontend2.searchParams.append('size', dogParams2.size);


          dogParams2.zipCodes = batch;
          batch.forEach(zipCode => urlDogFrontend2.searchParams.append('zipCodes', zipCode));

          let response = await dispatch(searchDog(urlDogFrontend2));

          allDogIds.push(...response.payload.resultIds);

          await delay(1000);
        }
        return allDogIds;
      }

      // Prepare zip code batches
      let batchSize = 1000;
      let batches = [];
      for (let i = 0; i < justZipCodes.length; i += batchSize) {
        let zipCodeBatch = justZipCodes.slice(i, i + batchSize);
        batches.push(zipCodeBatch);
      }

      // Start dispatching
      const idResults = await dispatchBatches();
      // console.log(idResults, 'idResults line 314')

      if (idResults.length > 0) {
        let dogDetailBatchSize = 100

        for (let i = 0; i < idResults.length; i += dogDetailBatchSize) {
          let dogBatch = idResults.slice(i, i + dogDetailBatchSize)
          dogBatches.push(dogBatch)
        }
        await fetchAllDogDetails()
      }


      setIsSearchingBreed_ZipCodes(false)
      setIsSearchingAllLocations(true)
      setLoading(false)
      // setCityChange(false)
      // setStateChange(false)
    }

  }


  let results = doggyBreeds.filter((word) => word.includes(capitalLetterWord)) //filtering the Dog Breeds array
 
  //Adding a breed to the Breed Array
  let addBreed = (selectedBreed) => {
    if (selected.length >= 3) {
      setError("A Maximum of 3 Breeds Can Be Selected at a Time")
      return
    }

    if (!results.includes(selectedBreed)) {
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

  //Removing a Breed from the Breed Array
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

  //Removing a Zip Code from the selectedZipCode Array
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

  //Clear all choosen parameters from the Sort Filtering
  const clearSort = () => {
    setBreedAsc(false); setBreedDesc(false);
    setNameAsc(false); setNameDesc(false);
    setAgeAsc(false); setAgeDesc(false);
    setBreed(false); setName(false); setAge(false)
  }

  //Clearing all chosen Ages from the Filters
  const clearFilters = () => {
    setMinimumAge(false); setMaximumAge(false);
  }

  //Clearing All Data in State and Redux
  const clearAll = async () => {
    setSelected([]);
    setSelectedZipCode([])
    setOtherParameters(false)
    setCity('')
    setStates([])
    setFilters(false)
    setSort(false)
    setClearAllPressed(true)
    setTimeout(() => setClearAllPressed(false), 100);
    setSize(25)
    setTempSize(25)
    setLoading(false)
    await dispatch(clearAllData());
    await dispatch(clearAllLocationData())
  }

  const breedError = 'breedErrors' + (error ? "" : "hidden")

  //Adding a State in the States array and verifying if the data is an actual state
  let addState = (selectedState) => {

    let allCapsState = selectedState.toUpperCase()
    const stateRegex = /^(AL|AK|AZ|AR|CA|CO|CT|DE|FL|GA|HI|ID|IL|IN|IA|KS|KY|LA|ME|MD|MA|MI|MN|MS|MO|MT|NE|NV|NH|NJ|NM|NY|NC|ND|OH|OK|OR|PA|RI|SC|SD|TN|TX|UT|VT|VA|WA|WV|WI|WY)$/;


    if (states.includes(allCapsState)) {
      setError("This State is Already in Your List")
      return
    }

    if (chooseStates && selectedState.length > 2) {
      setError('Enter a two-letter state/territory abbreviations')
    }

    if (states.length >= 3) {
      setError("A Maximum of 3 States can be Selected at a Time")
      return
    }

    if (allCapsState.length === 2 && stateRegex.test(allCapsState)) {

      setStates(prevSelected => {
        const updatedSelection = [...prevSelected, allCapsState];
        setError("")
        return updatedSelection;
      })
    } else {
      setError("Please Enter a Valid State")
      return
    }
  }

  //Removing a State from the State array
  let removeState = (state) => {
    let newArray = states.filter((place) => place !== state);
    setStates(newArray)
  }

  //Deleting the Choices in the GEOBounding Box
  const deleteGeoChoices = async () => {
    setChooseGeoBoundingBox(false)
    await dispatch(clearGeoBounding())
  }


  //When the UPdate Button is clicked, determines if the size should be modified in the array in BreedsResults or Call the Search Funtion with a new size
  const searchAction = (tempSize) => {
  
    setSize(Number(tempSize))
    setSizeChange(true);
    setTimeout(() => setSizeChange(false), 100);
    setLoading(false)
    if (!otherParameters) {
      search(tempSize)
      return
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
                placeholder="Type to search our available breeds, then click the + button"
                onFocus={() => { setMenu(true); setError(""); setBreedSelected(true); setOtherParameters(false) }}
                onChange={(e) => setSearching(e.target.value)}
              /> </div>


            <div className='searchDiv'>
              <button className='addButton' onClick={() => { addBreed(searching); setMenu(false); setSearching("") }}><img src={plusImg} className="searchPic" alt='plusimg' /></button></div>
          </div>

          <div className='gridArea11-r2'>
            {breedSelected && selected.length > 0 && !otherParameters && (
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
            <button className='searchByLocationButton' onClick={() => { setOtherParameters(!otherParameters); setAllFilterButtons(false); setFilters(false); setSort(false); setChooseStates(false); setChooseCity(false) }}>Search By Location</button>

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
                      // onFocus={() => setCityChange(true)}
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
                        onFocus={() => { setMenu(true); setError("") }}
                        onChange={(e) => setSelectedState(e.target.value)} />
                      <span className='searchSpan'><button className='addStateButton' onClick={() => { addState(selectedState); setSelectedState("") }} ><img src={plusImg} className="searchStatePic" alt='plusimg' /></button></span>
                    </>
                  )}
                </div>
                <div className='geoBoundingArea'>
                  <button className='openModalButton' onClick={() => setChooseGeoBoundingBox(true)} disabled={geoChoices.length > 0}><OpenModalButton
                    buttonText={<div className='geoBoundingBox'>Geo-Bounding Box</div>}
                    modalComponent={<GeoBoundingBox />}
                  /></button>
                </div>

                <div className='geoChoicesArea'>
                  {geoChoices.length > 0 && (
                    <>
                      {geoChoices?.map((choice, index) => (
                        <div key={index} className='geoChoice' id={'s' + index}>{choice}</div>
                      ))}
                      <div className='editGeoDiv'><button className='editGeoChoiceButton'>
                        <OpenModalButton
                          buttonText={<div className='geoBoundingBox'><img src={editImg} className="editPic" alt='editimg' /></div>}
                          modalComponent={<GeoBoundingBox parameters={bodyParams} />} /></button></div>
                      <div className='deleteGeoDiv'><button className='deleteGeoChoiceButton' onClick={() => { deleteGeoChoices() }} >
                        <img src={deleteImg} className="deleteGeoPic" alt='plusimg' /></button></div>
                    </>
                  )}
                </div>


              </div>
            )}


          </div>

        </div>

        {/* <div className='gridArea2-1'>

        </div> */}

        <div className='gridArea2-2'>
          {chooseStates && states.length > 0 && otherParameters && (
            <div className='locationChoices'><div className='statesSelectedTitle'>States Selected: </div>
              {states.map((places, index) => (
                <div key={index} className='chosenLocations'>{places}
                  <button className='removeStateButton' onClick={() => removeState(places)}><img src={deleteImg} className="deleteStatePic" alt='deleteimg' /></button>
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

              </div>
            </>
          )}


          {sort && (
            <>
              <div className='sort'>
                <div className="sort-option">
                  <label>
                    <input
                      type="checkbox"
                      value={breed}
                      onChange={() => { setBreed(!breed) }}
                    />Breed: </label>
                  {breed && (
                    <div><button className={ascBreed} onClick={() => { setBreedAsc(true); setBreedDesc(false) }}>
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
              <div>
                <input
                  className='inputBoxLocation'
                  type="number"
                  value={zipCode}
                  disabled={(chooseCity || chooseStates)}
                  placeholder="Enter a zip code and press +"
                  onFocus={() => setLocation(true)}
                  onChange={(e) => { setZipCode(e.target.value); setError("") }}
                /> </div>

              <div><button className='addZipButton' onClick={() => { addZipCode(zipCode); setZipCode("") }} disabled={(chooseCity || chooseStates)}><img src={plusImg} className="searchPic" alt='plusimg' /></button></div>
            </div>

          )}

          <div className='sizeBreed'>Dogs per page:
            <input
              className='sizeInputBreed'
              type="number"
              value={tempSize}
              onFocus={() => {setUpdateButton(true); setError("") }}
              onChange={(e) =>setTempSize(e.target.value)} />

            <button className='updateButton' onClick={() => {searchAction(tempSize); setLoading(true)}}  disabled={!updateButton}>Update</button></div>


        </div>

        <div className='gridArea4-2'>
          {location && selectedZipCode.length > 0 && (
            <div className='zipChoices'><div className='statesSelectedTitle'>Zip Codes Selected: </div>
              {selectedZipCode.map((zipcode, index) => (
                <div key={index} className='chosenZips'>{zipcode}
                  <button className='removeZipButton' onClick={() => removeZipCode(zipcode)}><img src={deleteImg} className="deleteZipPic" alt='deleteimg' /></button>
                </div>
              ))}
            </div>
          )}
        </div>


      </div>

      <div className='searchBreed'><button className='searchBreedButton' onClick={() => { search(); setMenu(false); setFrom(0); setLoading(true) }}>SEARCH<img src={searchImg} className="searchPic" alt='searchimg' /></button>
        <button className='clearAllButton' onClick={clearAll}>Clear All</button></div>

      <div className='breedResult'><BreedsResult size={size} sizeChange={sizeChange} totalPage={Math.ceil(Number(searchResult?.total) / Number(size))} 
                breedZipCodeSearch={isSearchingBreed_ZipCodes} allLocationsSearch={isSearchingAllLocations} clearAllPressed={clearAllPressed} loading={loading}/></div>
    </>
  );
}

export default Breeds;
