import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useModal } from '../Context/Modal'
import { addGeoBoundingData } from "../../redux/locationsSlice";
import './GeoBoundingBox.css';




function GeoBoundingBox(){

  const dispatch = useDispatch()
  const {closeModal} = useModal();

  const [topLat, setTopLat] = useState("");
  const [topLon, setTopLon] = useState("");

  const [leftLat, setLeftLat] = useState("");
  const [leftLon, setLeftLon] = useState("");

  const [bottomLat, setBottomLat] = useState("");
  const [bottomLon, setBottomLon] = useState("");

  const [rightLat, setRightLat] = useState("");
  const [rightLon, setRightLon] = useState("");

  const [bottomLeftLat, setBottomLeftLat] = useState("");
  const [bottomLeftLon, setBottomLeftLon] = useState("");

  const [bottomRightLat, setBottomRightLat] = useState("");
  const [bottomRightLon, setBottomRightLon] = useState("");

  const [topLeftLat, setTopLeftLat] = useState("");
  const [topLeftLon, setTopLeftLon] = useState("");

  const [topRightLat, setTopRightLat] = useState("");
  const [topRightLon, setTopRightLon] = useState("");


  const [searching, setSearching] = useState("")
  const [menu, setMenu] = useState(false);
  const [error, setError] = useState("")



  const geoBoundingData = () => {
    let bodyParams = {}

    // if(chooseCity && city) bodyParams.city = city
    // if(chooseStates && states) bodyParams.states = [states]
    if(topLat.length > 0 && leftLat.length > 0 && bottomLat.length > 0 && rightLat.length > 0){
      bodyParams.geoBoundingBox = {
        top: {lat: topLat, lon: topLon},
        left: {lat: leftLat, lon: leftLon},
        bottom: {lat: bottomLat, lon: bottomLon},
        right: {lat: rightLat, lon: rightLon},
      }
    }

      if(bottomLeftLat.length > 0 && topRightLat.length > 0){
        bodyParams.geoBoundingBox = {
          bottom_left: {lat: bottomLeftLat, lon: bottomLeftLon},
          top_right: {lat: topRightLat, lon: topRightLon},
        }
    }

    if(bottomRightLat.length > 0 && topLeftLat.length > 0){
      bodyParams.geoBoundingBox = {
        bottom_right: {lat: bottomRightLat, lon: bottomRightLon},
        top_left: {lat: topLeftLat, lon: topLeftLon},
      }
    }

    console.log(`bottom_right: lat: ${bottomRightLat}, lon: ${bottomRightLon}`)
    console.log(`top_left: lat: ${topLeftLat}, lon: ${topLeftLon}`)
    console.log((bottomRightLat.length > 0 && topLeftLat.length > 0), 'bottomRightLat && topLeftLat')

    dispatch(addGeoBoundingData(bodyParams))
    closeModal();

  }

return (
<>
         <div className='container'>
        <div className='row1'>Geo-Bounding Box </div>

         <div className='row2'>

        <div className='row2col1'>
         <div className='labels'>Top:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={topLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLat(e.target.value)}/></div>
         <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={topLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLon(e.target.value)}/></div>
            </div>

            <div className='row2col2'>
          <div className='labels'>Left:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={leftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLat(e.target.value)}/></div>
          <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={leftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLon(e.target.value)}/></div>
            </div>

            <div className='row2col3'>
            <div className='labels'>Bottom:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={bottomLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLat(e.target.value)}/></div>
          <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={bottomLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLon(e.target.value)}/></div>
            </div>

            <div className='row2col4'>
            <div className='labels'>Right:</div>
           <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={rightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLat(e.target.value)}/></div>
           <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={rightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLon(e.target.value)}/></div>
            </div>
            </div>

          <div className='row3'>

          <div className='row3col1'>
          <div className='labels'>Bottom_Left:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={bottomLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLat(e.target.value)}/></div>
          <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={bottomLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLon(e.target.value)}/></div>
            </div>

          <div className='row3col2'>
          <div className='labels'>Top_Right:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={topRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLat(e.target.value)}/></div>
          <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={topRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLon(e.target.value)}/></div>
            </div>



            <div className='row3col3'>
            <div className='labels'>Bottom_Right:</div>
           <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={bottomRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLat(e.target.value)}/></div>
         <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={bottomRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLon(e.target.value)}/></div>
            </div>


            <div className='row3col4'>
            <div className='labels'>Top_Left:</div>
          <div className='lat'>LAT<input
            className="geo-location-input"
            type="number"
            value={topLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLat(e.target.value)}/></div>
          <div className='lon'>LON<input
            className="geo-location-input"
            type="number"
            value={topLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLon(e.target.value)}/></div>
            </div>

            </div>

            <div className='row4'><button className='closeModalButton'onClick={closeModal}>Close</button>
            <button className='doneButton'onClick={geoBoundingData}>Done</button>
            </div>

            </div>
        </>
    );

}
export default GeoBoundingBox;
