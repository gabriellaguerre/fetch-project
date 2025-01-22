import React from "react";
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/usersSlice';


function Main() {
    const user = useSelector(selectUser);
    const name = user.name;
    console.log(name,'name')

  return (
    <>
    <h1> HEllo {name}</h1>
    </>
  );
}

export default Main;
