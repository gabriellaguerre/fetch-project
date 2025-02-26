import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, clearAllData, searchDogForLocations,dogMatch, postSearchLocationDog } from '../redux/dogsSlice';


      const dogSearchUrl = 'https://frontend-take-home-service.fetch.com/dogs/search?';
      let searchForLocationParams = {}
     
      console.log('inside searchForLocations function line 207')
      const urlFrontend = new URL(dogSearchUrl);

      searchForLocationParams.size = '100';
      urlFrontend.searchParams.append('size', searchForLocationParams.size)

      searchForLocationParams.from = '0';
      urlFrontend.searchParams.append('from', searchForLocationParams.from)

     
      

     