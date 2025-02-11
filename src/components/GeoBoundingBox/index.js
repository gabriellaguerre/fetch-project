import React, {useState} from "react";
import {useSelector, useDispatch} from 'react-redux';
import './GeoBoundingBox';




function GeoBoundingBox(){


return (
<>
<label>
          <input
          type="checkbox"
          value={chooseGeoBoundingBox}
          onChange={()=>setChooseGeoBoundingBox(!chooseGeoBoundingBox)}
          />Geo-Bounding Box: </label>
          {chooseGeoBoundingBox && (
            <>
            <div>top:
          <input
            className="location-input"
            type="number"
            value={topLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLon(e.target.value)}/>
            </div>

            <div>left:
          <input
            className="location-input"
            type="number"
            value={leftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={leftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setLeftLon(e.target.value)}/>
            </div>

            <div>bottom:
          <input
            className="location-input"
            type="number"
            value={bottomLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLon(e.target.value)}/>
            </div>

            <div>right:
          <input
            className="location-input"
            type="number"
            value={rightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={rightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setRightLon(e.target.value)}/>
            </div>

            <div>bottom_left:
          <input
            className="location-input"
            type="number"
            value={bottomLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomLeftLon(e.target.value)}/>
            </div>

            <div>bottom_right:
          <input
            className="location-input"
            type="number"
            value={bottomRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={bottomRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setBottomRightLon(e.target.value)}/>
            </div>

            <div>top_left:
          <input
            className="location-input"
            type="number"
            value={topLeftLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topLeftLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopLeftLon(e.target.value)}/>
            </div>

            <div>top_right:
          <input
            className="location-input"
            type="number"
            value={topRightLat}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLat(e.target.value)}/>
        <input
            className="location-input"
            type="number"
            value={topRightLon}
            // placeholder="Enter a zip code"
            onChange={(e) => setTopRightLon(e.target.value)}/>
            </div>
            </>
        )}

        </>

    );

}
export default GeoBoundingBox;
