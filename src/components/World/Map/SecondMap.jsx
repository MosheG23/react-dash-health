import React, { useRef, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import keys from "../../../config/dev";
import {CircularProgress} from "@material-ui/core"
import _ from "lodash";
import useSuperCluster from "use-supercluster";

import logo from "../../../assets/img/map_logo.png"

import styles from "./SecondMap.module.css";

const Marker = ({children}) => children;

const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true, 
}

const SecondMap = ({ data, type }) => {
    const mapRef = useRef();
    const [zoom, setZoom] = useState(1);
    const [bounds, setBounds] = useState(null);

    var points = []
    if (!(_.isEmpty(data))) {
        points = data.map(country => ({
            type: "Feature",
            properties: {
                cluster: false,
                countryName: country.country,
                isoName: country.countryInfo.iso3,
                activePerOneMillion: parseInt((country.activePerOneMillion)),
                deathsPerOneMillion: parseInt((country.deathsPerOneMillion)),
                casesPerOneMillion: parseInt((country.casesPerOneMillion)),
                testsPerOneMillion: parseInt((country.testsPerOneMillion)),
                flag: country.countryInfo.flag
            },
            geometry: {
                type: "Point",
                coordinates: [
                    parseFloat(country.countryInfo.long),
                    parseFloat(country.countryInfo.lat)
                ]
            }
        }));
    }
    else {
        data = [];
    }

    const { clusters, supercluster } = useSuperCluster({
        points,
        bounds,
        zoom,
        options: { radius: 125, maxZoom: 20 }
    });
    if(data === []) {
        return (
            <CircularProgress />
        )
    }

    const getTotalCluster = (cluster) => {
        let sum = 0;
        cluster.map((country) => {
            sum += parseInt(country.properties[type])
        })
        return sum;
    }

    const handleApiLoaded = (map, maps) => {
        const triangleCoords = [
                [[[12.45313691700008, 41.902751941000105],
                [12.452714082000085, 41.903016213000029],
                [12.452766936000103, 41.903439049000042],
                [12.453031208000141, 41.90391473800014],
                [12.453982588000144, 41.903861884],
                [12.454035442000077, 41.902751941000105],
                [12.45313691700008, 41.902751941000105]]]
        ];

        var bermudaTriangle = new maps.Polygon({
            paths: triangleCoords,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.55
        });
        bermudaTriangle.setMap(map);
    }


    return (
      <div style={{ height: '100vh', width: '100%', position: "relative"}}>
          <img src={logo} className={styles.map__title} alt="covid-19"></img>
        <GoogleMapReact
          bootstrapURLKeys={{ key: keys.googleMapAPIKey }}
          defaultCenter={{
                  lat: 31.4117257,
                  lng: 35.0818155
          }}
          defaultZoom={1}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({map, maps}) => {
              mapRef.current = map;
              handleApiLoaded(map, maps);
          }}
          onChange={({ zoom, bounds }) => {
              setZoom(zoom);
              setBounds([
                  bounds.nw.lng,
                  bounds.se.lat,
                  bounds.se.lng,
                  bounds.nw.lat
              ]);
          }}
          options={mapOptions}
        >
            

        {clusters.map(cluster => {
            const [longitude, latitude] = cluster.geometry.coordinates;
            const { cluster: isCluster, point_count: pointCount } = cluster.properties;
            if (isCluster) {
                return (
                    <Marker key={cluster.countryName} lat={latitude} lng={longitude}>
                        <div className = {
                            styles.cluster_marker
                        } style={{
                            width: `${50 - (pointCount / points.length) *30 }px`,
                            height: `${50 - (pointCount / points.length) *30 }px`
                        }}
                        onClick ={() => {
                            const expansionZoom = Math.min(
                                supercluster.getClusterExpansionZoom(cluster.id),
                                20
                            );
                            mapRef.current.setZoom(expansionZoom);
                            mapRef.current.panTo({ lat: latitude, lng: longitude });
                        }}
                        >
                            {getTotalCluster(supercluster.getLeaves(cluster.id, 150))}<br />
                            ({pointCount})
                        </div>
                    </Marker>
                )
            }

            return (
                <Marker key = {
                    cluster.properties.countryName
                }
                lat = {
                    latitude
                }
                lng = {
                    longitude
                } >
                    <button className={styles.country}>
                        {cluster.properties[type]} <br />
                        <img src={cluster.properties.flag} className={styles.country_logo} />
                        {cluster.properties.isoName}
                    </button>
                </Marker>
            )
        })}

        {/* {data.map(country => (
                <Marker key={country.name} lat={country.lat} lng={country.long}>
                    <div className={styles.cluster_marker}>
                        {country.activeCases}
                    </div>
                </Marker>
          ))} */}
        </GoogleMapReact>
      </div>
    );
}

export default SecondMap;
