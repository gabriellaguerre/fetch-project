import React from 'react';
import './Table.css'

function Table({searchResult}) {
    let total = searchResult.total
    let dogIds = searchResult.resultIds
    let next = searchResult.next
    console.log(dogIds, 'inside table function')

    const handleNext = () => {
        console.log(next, 'next')
    }

  return (
    <>
    <div>Total Finds: {total}</div>
    <div><button onClick={handleNext}>Next</button></div>
   
    <table className='resultDisplayed'>
      <thead>
        <tr className='labels'>
            <th>Breed Id</th>
            <th>Something</th>
            <th>Something More</th>
        </tr>
      </thead>
      <tbody>
        {dogIds?.map(item=>
            <tr key={item.id}>
                <td>{item}</td>
                <td>na</td>
                <td>and</td>
            </tr>
        )}
        
        
      </tbody>
    </table>
    </>
  )
}

export default Table;
