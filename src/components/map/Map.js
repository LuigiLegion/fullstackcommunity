import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import * as starbucksData from '../../data/starbucks-locations.json';

export default function Map() {
  const [viewport, setViewport] = useState({
    latitude: 40.7531823,
    longitude: -73.9844421,
    width: '100vw',
    height: '100vh',
    zoom: 15,
  });
  const [selectedStarbucks, setSelectedStarbucks] = useState(null);

  useEffect(() => {
    console.log('IN THE USEFFECT');
    const listener = event => {
      console.log('IN THE USEFFECT IF');
      if (event.key === 'Escape') {
        console.log('KEY IS ESCAPE');
        setSelectedStarbucks(null);
      }
    };
    console.log('window before add: ', window);
    window.addEventListener('keydown', listener);
    console.log('window after add: ', window);
    return () => {
      window.removeEventListener('keydown', listener);
      console.log('window after remove: ', window);
    };
  }, []);

  return (
    <div>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken="pk.eyJ1IjoibHVpZ2lsZWdpb24iLCJhIjoiY2p4N2luaGI3MGF4YjQwbnBqeDJyenh1aiJ9.sXpWHhDhquAAaheRvujObA"
        onViewportChange={viewport => {
          setViewport(viewport);
        }}
      >
        <Marker latitude={40.7531823} longitude={-73.9844421}>
          <img
            className="marker-me"
            src="https://img.icons8.com/ultraviolet/40/000000/marker.png"
            alt="My Location"
          />
        </Marker>
        <Marker latitude={40.7050758} longitude={-74.0113491}>
          <img
            className="marker-fullstack"
            src="https://yt3.ggpht.com/a/AGF-l78JV4ZDPmU85HhYboU07siMZjFL_dHgm6o6Zg=s288-mo-c-c0xffffffff-rj-k-no"
            alt="My Location"
          />
        </Marker>
        {starbucksData.branches.map(curStarbucks => {
          if (curStarbucks.city === 'New York') {
            return (
              <Marker
                key={curStarbucks.store_id}
                latitude={curStarbucks.latitude}
                longitude={curStarbucks.longitude}
              >
                <button
                  onClick={event => {
                    event.preventDefault();
                    setSelectedStarbucks(curStarbucks);
                  }}
                  className="marker-btn"
                >
                  <img
                    src="https://img.icons8.com/color/48/000000/starbucks.png"
                    alt="Starbucks Icon"
                  />
                </button>
              </Marker>
            );
          } else {
            return null;
          }
        })}

        {selectedStarbucks ? (
          <Popup
            onClose={() => {
              setSelectedStarbucks(null);
            }}
            latitude={selectedStarbucks.latitude}
            longitude={selectedStarbucks.longitude}
          >
            <div className="location-description">{selectedStarbucks.name}</div>
          </Popup>
        ) : null}
      </ReactMapGL>
    </div>
  );
}
