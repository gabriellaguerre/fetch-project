import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useModal } from '../Context/Modal'
import { addGeoBoundingData } from "../../redux/locationsSlice";
import './GeoBoundingBox.css';




function GeoBoundingBox({parameters}){
  
  const dispatch = useDispatch()
  const {closeModal} = useModal();


  const [topLat, setTopLat] = useState(() => parameters?.geoBoundingBox?.top?.lat || "");
  const [topLon, setTopLon] = useState(() => parameters?.geoBoundingBox?.top?.lon ||"");

  const [leftLat, setLeftLat] = useState(() => parameters?.geoBoundingBox?.left?.lat ||"");
  const [leftLon, setLeftLon] = useState(() => parameters?.geoBoundingBox?.left?.lon ||"");

  const [bottomLat, setBottomLat] = useState(() => parameters?.geoBoundingBox?.bottom?.lat ||"");
  const [bottomLon, setBottomLon] = useState(() => parameters?.geoBoundingBox?.bottom?.lon ||"");

  const [rightLat, setRightLat] = useState(() => parameters?.geoBoundingBox?.right?.lat ||"");
  const [rightLon, setRightLon] = useState(() => parameters?.geoBoundingBox?.right?.lon ||"");

  const [bottomLeftLat, setBottomLeftLat] = useState(() => parameters?.geoBoundingBox?.bottom_left?.lat || "");
  const [bottomLeftLon, setBottomLeftLon] = useState(() =>parameters?.geoBoundingBox?.bottom_left?.lon || "");

  const [bottomRightLat, setBottomRightLat] = useState(() =>parameters?.geoBoundingBox?.bottom_right?.lat || "");
  const [bottomRightLon, setBottomRightLon] = useState(() =>parameters?.geoBoundingBox?.bottom_right?.lon || "");

  const [topLeftLat, setTopLeftLat] = useState(() =>parameters?.geoBoundingBox?.top_left?.lat || "");
  const [topLeftLon, setTopLeftLon] = useState(()=>parameters?.geoBoundingBox?.top_left?.lon || "");

  const [topRightLat, setTopRightLat] = useState(() =>parameters?.geoBoundingBox?.top_right?.lat || "");
  const [topRightLon, setTopRightLon] = useState(() =>parameters?.geoBoundingBox?.top_right?.lon || "");

  const [error, setError] = useState("");

  const geoBoundingData = () => {
    const set1 = [topLat, topLon, leftLat, leftLon, bottomLat, bottomLon, rightLat, rightLon].some(value => value.length > 0)
    const set2 = [bottomLeftLat, bottomLeftLon, topRightLat, topRightLon].some(value => value.length > 0);
    const set3 = [bottomRightLat, bottomRightLon, topLeftLat, topLeftLon].some(value => value.length > 0)


    if((set1 && set2) || (set1 && set3) || (set2 && set3)) {
      setError("**Only 1 Set of Geo Bounding Values Can be Selected**")
      return;
    }

      setError("")
      let bodyParams = {}

      if(set1 && [topLat, topLon, leftLat, leftLon, bottomLat, bottomLon, rightLat, rightLon].every(value => value.length > 0)){
        bodyParams.geoBoundingBox = {
          top: {lat: topLat, lon: topLon},
          left: {lat: leftLat, lon: leftLon},
          bottom: {lat: bottomLat, lon: bottomLon},
          right: {lat: rightLat, lon: rightLon},
        }

      } else if(set2 && [bottomLeftLat, bottomLeftLon, topRightLat, topRightLon].every(value => value.length > 0)){
          bodyParams.geoBoundingBox = {
            bottom_left: {lat: bottomLeftLat, lon: bottomLeftLon},
            top_right: {lat: topRightLat, lon: topRightLon},
          }

      } else if (set3 && [bottomRightLat, bottomRightLon, topLeftLat, topLeftLon].every(value => value.length > 0)){
        bodyParams.geoBoundingBox = {
          bottom_right: {lat: bottomRightLat, lon: bottomRightLon},
          top_left: {lat: topLeftLat, lon: topLeftLon},
        }

      } else {
         setError("**All Fields in a Set Should be Filled**");
         return;
      }

    dispatch(addGeoBoundingData(bodyParams))
    closeModal();

    }




return (
<>
         <div className='container'>
        <div className='row1'>Geo-Bounding Box <div className='geoError'>{error}</div></div>


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

            <div className='row4'><button className='closeModalButton'onClick={()=>{closeModal()}} >Cancel</button>
            <button className='doneButton'onClick={geoBoundingData}>Done</button>
            </div>

            </div>
        </>
    );

}
export default GeoBoundingBox;
