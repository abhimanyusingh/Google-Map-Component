import React, { useEffect, useState } from "react";
import { compose, withProps, withStateHandlers } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
  InfoWindow,
  computeArea
} from "react-google-maps";

const enahnce = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyDf-yIqxErTkbWzKhLox7nAANnrfDIY190&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `600px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
    defaultMarkerPosition: { lat: 52.520008, lng: 13.404954 }
  }),
  withScriptjs,
  withGoogleMap,
  withStateHandlers(() => ({
    isOpen: false,
    markerIndex: 0,
    mapPathData: []
  }), {
    onToggleOpen: ({ isOpen }) => (index) => {
      console.log("index", index)
      return {
        isOpen: !isOpen,
        markerIndex: index
      }
    },

    setMapData: () => (mapPathData) => {
      return {
        mapPathData
      }
    }
  })
);

const MapComponent = enahnce(
  ({
    defaultMarkerPosition,
    isMarkerShown,
    defaultZoom,
    isOpen,
    markerIndex,
    onToggleOpen,
    mapPathData,
    setMapData

  }) => {

    useEffect(() => {
      fetch("/api/greeting")
        .then(response => response.json())
        .then(result => {
          const getAllCordinate = (geometries) => {
            const coordinates = geometries.coordinates[0][0]
            return coordinates.map(coordinate => {
              return {
                lng: coordinate[0], 
                lat: coordinate[1]
              }
            })
          }

          result.features.forEach(feature => {
              mapPathData.push({
                properties: {...feature.properties},
                geometries: getAllCordinate(feature.geometry)
              })
          });
          setMapData(mapPathData);

        });

        return () => {

        }

    }, []);

    const applyColorBasedOnAverageAge = (averageAge) => {
      return averageAge <= 40 
              ? '#00cb09'
              : averageAge <= 42
                ? '#a4cb00'
                : averageAge <= 43
                  ? '#cb8a00'
                  : averageAge <= 45
                    ? '#cb4f00'
                    : averageAge <= 50
                      ? '#cb0026'
                      : '#0000ff'
    }

    return (
      <GoogleMap
        defaultZoom={defaultZoom}
        defaultCenter={defaultMarkerPosition}
      >
        {isMarkerShown && (
          <Marker position={{ lat: 52.520008, lng: 13.404954 }}></Marker>
        )}
            {
              mapPathData.map((cordinate, index) => (
                <div key={cordinate.properties.name}>
                  <Polygon
                    key={cordinate.properties.name}
                    paths={cordinate.geometries}
                    onClick={ ()=> {onToggleOpen(index)} }
                    options= {{
                      strokeColor:applyColorBasedOnAverageAge(cordinate.properties.averageAge),
                      fillColor:applyColorBasedOnAverageAge(cordinate.properties.averageAge),
                      fillOpacity:0.35,
                      strokeOpacity: 1,
                      strokeWeight: 1
                    }}
                    >
                  </Polygon>
                  {
                    isOpen && index === markerIndex &&
                      <InfoWindow position={cordinate.geometries[0]} onCloseClick={ ()=> {onToggleOpen(index)} }>
                        <React.Fragment>
                          <div>
                            <b>name:</b> {cordinate.properties.name} <br/>
                            <b>population:</b> {cordinate.properties.population}<br/>
                            <b>averageAge:</b> {cordinate.properties.averageAge}
                          </div>
                        </React.Fragment>
                    </InfoWindow> 
                  }
                  
                </div>
              ))
          }
      </GoogleMap>
    );
  }
);

export default MapComponent;


