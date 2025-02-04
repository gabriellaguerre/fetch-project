import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {breeds, getDogBreed, getSearches, searchDog, getDogDetails, postSearchDog, nextList, dogMatch } from '../../redux/dogsSlice';
import './Table.css'

function Table() {
  const dispatch = useDispatch();

  // const details = useSelector(getDogDetails);
  // const searchResult = useSelector(getSearches)
  
  // let total = searchResult.total;
  // let nextUrl = searchResult.next;
  // let previousUrl = searchResult.prev
  // let list = searchResult.resultIds
  

  //   const handleNext = async () => {
  //       console.log(nextUrl, 'next')
  //       await dispatch(nextList(nextUrl));
  //       let dogs2 = await dispatch(postSearchDog(list))
  //       console.log(dogs2, 'dogs')
  //   }

  //   const handlePrevious = async () => {
  //     console.log(previousUrl, 'next')
  //     await dispatch(nextList(previousUrl));
  //     let dogs2 = await dispatch(postSearchDog(list))
  //     console.log(dogs2, 'dogs')
  // }


  return (
    <>
    {/* <div>Total Finds: {total}</div>
    <div><button onClick={handleNext}>Next</button></div>
    <div><button onClick={handlePrevious}>Previous</button></div>
   
    <table className='resultDisplayed'>
      <thead>
        <tr className='labels'>
            <th>Pic</th>
            <th>Name</th>
            <th>Age</th>
            <th>Breed</th>
            <th>Zip Code</th>
        </tr>
      </thead>
      <tbody>
        {details?.map(dog =>
            <tr key={dog.id}>
                <td><img src={dog.img} className='dogImage'/></td>
                <td>{dog.name}</td>
                <td>{dog.age}</td>
                <td>{dog.breed}</td>
                <td>{dog.zip_code}</td>
            </tr>
        )}
        
        
      </tbody>
    </table> */}
    </>
  )
}

export default Table;
