import isEqual from 'lodash.isequal';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import MapView from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {decode as decode2} from "@mapbox/polyline"; //please install this package before running!
import { interpolateCoordinate2 } from 'integration/shared/tools/iterpolateCoordinates2';

const WAYPOINT_LIMIT = 10;

const _storeWayPoints = async (waypoints) => {
    try {
      await AsyncStorage.setItem(
        '@wayPoints',
        JSON.stringify(waypoints)
      );

      await AsyncStorage.setItem(
        '@wayPoints2',
        JSON.stringify(waypoints)
      );

    } catch (error) {
      // Error saving data
    }
  };

class AnimatedMapViewDirections extends Component {
    constructor(props) {
        super(props);

        this.state = {
            coordinates: null,
            distance: null,
            duration: null
        };
    }

    componentDidMount() {
        this.fetchAndRenderRoute(this.props);
    }

    componentDidUpdate(prevProps) {
        if (
            !isEqual(prevProps.origin, this.props.origin) ||
            !isEqual(prevProps.destination, this.props.destination) ||
            !isEqual(prevProps.waypoints, this.props.waypoints) ||
            !isEqual(prevProps.mode, this.props.mode) ||
            !isEqual(prevProps.precision, this.props.precision) ||
            !isEqual(prevProps.splitWaypoints, this.props.splitWaypoints)
        ) {
            if (this.props.resetOnChange === false) {
                this.fetchAndRenderRoute(this.props);
            } else {
                this.resetState(() => {
                    this.fetchAndRenderRoute(this.props);
                });
            }
        }
    }

    resetState = (cb = null) => {
        this.setState(
            {
                coordinates: null,
                distance: null,
                duration: null
            },
            cb
        );
    };

    decode(t) {
        let points = [];
        for (let step of t) {
            let encoded = step.polyline.points;
            let index = 0,
                len = encoded.length;
            let lat = 0,
                lng = 0;
            while (index < len) {
                let b,
                    shift = 0,
                    result = 0;
                do {
                    b = encoded.charAt(index++).charCodeAt(0) - 63;
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                } while (b >= 0x20);

                let dlat = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
                lat += dlat;
                shift = 0;
                result = 0;
                do {
                    b = encoded.charAt(index++).charCodeAt(0) - 63;
                    result |= (b & 0x1f) << shift;
                    shift += 5;
                } while (b >= 0x20);
                let dlng = (result & 1) != 0 ? ~(result >> 1) : result >> 1;
                lng += dlng;

                points.push({ latitude: lat / 1e5, longitude: lng / 1e5 });
            }
        }
        return points;
    }

    fetchAndRenderRoute = (props) => {
        let {
            origin: initialOrigin,
            destination: initialDestination,
            waypoints: initialWaypoints = [],
            apikey,
            onStart,
            onReady,
            onError,
            mode = 'DRIVING',
            language = 'en',
            optimizeWaypoints,
            splitWaypoints,
            directionsServiceBaseUrl = 'https://maps.googleapis.com/maps/api/directions/json',
            region,
            precision = 'low',
            timePrecision = 'none',
            channel
        } = props;

        if (!apikey) {
            console.warn(`MapViewDirections Error: Missing API Key`); // eslint-disable-line no-console
            return;
        }

        if (!initialOrigin || !initialDestination) {
            return;
        }

        const timePrecisionString =
            timePrecision === 'none' ? '' : timePrecision;

        // Routes array which we'll be filling.
        // We'll perform a Directions API Request for reach route
        const routes = [];

        // We need to split the waypoints in chunks, in order to not exceede the max waypoint limit
        // ~> Chunk up the waypoints, yielding multiple routes
        if (
            splitWaypoints &&
            initialWaypoints &&
            initialWaypoints.length > WAYPOINT_LIMIT
        ) {
            // Split up waypoints in chunks with chunksize WAYPOINT_LIMIT
            const chunckedWaypoints = initialWaypoints.reduce(
                (accumulator, waypoint, index) => {
                    const numChunk = Math.floor(index / WAYPOINT_LIMIT);
                    accumulator[numChunk] = [].concat(
                        accumulator[numChunk] || [],
                        waypoint
                    );
                    return accumulator;
                },
                []
            );

            // Create routes for each chunk, using:
            // - Endpoints of previous chunks as startpoints for the route (except for the first chunk, which uses initialOrigin)
            // - Startpoints of next chunks as endpoints for the route (except for the last chunk, which uses initialDestination)
            for (let i = 0; i < chunckedWaypoints.length; i++) {
                routes.push({
                    waypoints: chunckedWaypoints[i],
                    origin:
                        i === 0
                            ? initialOrigin
                            : chunckedWaypoints[i - 1][
                                  chunckedWaypoints[i - 1].length - 1
                              ],
                    destination:
                        i === chunckedWaypoints.length - 1
                            ? initialDestination
                            : chunckedWaypoints[i + 1][0]
                });
            }
        }

        // No splitting of the waypoints is requested/needed.
        // ~> Use one single route
        else {
            routes.push({
                waypoints: initialWaypoints,
                origin: initialOrigin,
                destination: initialDestination
            });
        }

        // Perform a Directions API Request for each route
        Promise.all(
            routes.map((route, index) => {
                let { origin, destination, waypoints } = route;

                if (origin.latitude && origin.longitude) {
                    origin = `${origin.latitude},${origin.longitude}`;
                }

                if (destination.latitude && destination.longitude) {
                    destination = `${destination.latitude},${destination.longitude}`;
                }

                waypoints = waypoints
                    .map((waypoint) =>
                        waypoint.latitude && waypoint.longitude
                            ? `${waypoint.latitude},${waypoint.longitude}`
                            : waypoint
                    )
                    .join('|');

                if (optimizeWaypoints) {
                    waypoints = `optimize:true|${waypoints}`;
                }

                if (index === 0) {
                    onStart &&
                        onStart({
                            origin,
                            destination,
                            waypoints: initialWaypoints
                        });
                }

                return this.fetchRoute(
                    directionsServiceBaseUrl,
                    origin,
                    waypoints,
                    destination,
                    apikey,
                    mode,
                    language,
                    region,
                    precision,
                    timePrecisionString,
                    channel
                )
                    .then((result) => {
                        return result;
                    })
                    .catch((errorMessage) => {
                        return Promise.reject(errorMessage);
                    });
            })
        )
            .then((results) => {
                // Combine all Directions API Request results into one
                const result = results.reduce(
                    (
                        acc,
                        {
                            distance,
                            duration,
                            coordinates,
                            fare,
                            legs,
                            waypointOrder
                        }
                    ) => {
                        acc.coordinates = [...acc.coordinates, ...coordinates];
                        acc.distance += distance;
                        acc.duration += duration;
                        acc.fares = [...acc.fares, fare];
                        acc.legs = legs;
                        acc.waypointOrder = [
                            ...acc.waypointOrder,
                            waypointOrder
                        ];

                        return acc;
                    },
                    {
                        coordinates: [],
                        distance: 0,
                        duration: 0,
                        fares: [],
                        legs: [],
                        waypointOrder: []
                    }
                );

                // Plot it out and call the onReady callback
                this.setState(
                    {
                        coordinates: result.coordinates
                    },
                    function () {
                        if (onReady) {
                            onReady(result);
                        }
                    }
                );
            })
            .catch((errorMessage) => {
                this.resetState();
                console.warn(`MapViewDirections Error: ${errorMessage}`); // eslint-disable-line no-console
                onError && onError(errorMessage);
            });
    };

    fetchRoute(
        directionsServiceBaseUrl,
        origin,
        waypoints,
        destination,
        apikey,
        mode,
        language,
        region,
        precision,
        timePrecision,
        channel
    ) {
        // Define the URL to call. Only add default parameters to the URL if it's a string.
        let url = directionsServiceBaseUrl;
        if (typeof directionsServiceBaseUrl === 'string') {
            url += `?origin=${origin}&waypoints=${waypoints}&destination=${destination}&key=${apikey}&mode=${mode.toLowerCase()}&language=${language}&region=${region}`;
            if (timePrecision) {
                url += `&departure_time=${timePrecision}`;
            }
            if (channel) {
                url += `&channel=${channel}`;
            }
        }

        return fetch(url)
            .then((response) => response.json())
            .then((json) => {
                if (json.status !== 'OK') {
                    const errorMessage =
                        json.error_message || json.status || 'Unknown error';
                    return Promise.reject(errorMessage);
                }

                if (json.routes.length) {
                    const route = json.routes[0];
                    
                    const waypoints = decode2( json.routes[0].overview_polyline.points )

                    let coords = waypoints.map((coordinate) => {
                        return { 
                          latitude  : coordinate[0],
                          longitude : coordinate[1],
                          active : true,
                          type: 'native'
                        }
                      });

                 
                    let interpolatedWaypoints = interpolateCoordinate2(coords);
                    interpolatedWaypoints = interpolateCoordinate2(interpolatedWaypoints)
                    interpolatedWaypoints = interpolateCoordinate2(interpolatedWaypoints)

                    _storeWayPoints(interpolatedWaypoints)

                    return Promise.resolve({
                        distance:
                            route.legs.reduce((carry, curr) => {
                                return carry + curr.distance.value;
                            }, 0) / 1000,
                        duration:
                            route.legs.reduce((carry, curr) => {
                                return (
                                    carry +
                                    (curr.duration_in_traffic
                                        ? curr.duration_in_traffic.value
                                        : curr.duration.value)
                                );
                            }, 0) / 60,
                        coordinates:
                            precision === 'low'
                                ? this.decode([
                                      { polyline: route.overview_polyline }
                                  ])
                                : route.legs.reduce((carry, curr) => {
                                      return [
                                          ...carry,
                                          ...this.decode(curr.steps)
                                      ];
                                  }, []),
                        fare: route.fare,
                        waypointOrder: route.waypoint_order,
                        legs: route.legs
                    });
                } else {
                    return Promise.reject();
                }
            })
            .catch((err) => {
                return Promise.reject(`Error on GMAPS route request: ${err}`);
            });
    }

    render() {
        const { coordinates } = this.state;

        if (!coordinates) {
            return null;
        }

        const {
            origin, // eslint-disable-line no-unused-vars
            waypoints, // eslint-disable-line no-unused-vars
            splitWaypoints, // eslint-disable-line no-unused-vars
            destination, // eslint-disable-line no-unused-vars
            apikey, // eslint-disable-line no-unused-vars
            onReady, // eslint-disable-line no-unused-vars
            onError, // eslint-disable-line no-unused-vars
            mode, // eslint-disable-line no-unused-vars
            language, // eslint-disable-line no-unused-vars
            region, // eslint-disable-line no-unused-vars
            precision, // eslint-disable-line no-unused-vars
            ...props
        } = this.props;
        const DirectionRoutes = [...coordinates].reverse();

        return (
            <>
                <MapView.Polyline coordinates={coordinates} {...props} />
                <AnimatingPolylineComponent Direction={DirectionRoutes}  lineDashPattern={props.lineDashPattern} />
            </>
        );
    }
}

class AnimatingPolylineComponent extends React.Component {
    state = {
        polylinePath: this.props.Direction
    };

    componentDidMount() {
        this.animatePolyline();
    }

    animatePolyline = () => {
        const M = 30;
        const factor = Math.round(this.state.polylinePath.length / M) + 5;

        const intervalTime =
            this.state.polylinePath.length < 100
                ? 30
                : this.state.polylinePath.length > 200
                ? 10
                : M / factor;
        this.interval = setInterval(
            () => this.animatePolylineStart(),
            intervalTime
        );
    };

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    animatePolylineStart = () => {
        if (this.state.polylinePath.length < this.props.Direction.length) {
            const Direction = this.props.Direction;
            const polylinePath = [
                ...Direction.slice(0, this.state.polylinePath.length - 1)
            ];
            this.setState({ polylinePath });
        } else {
            this.setState({ polylinePath: [] });
        }
    };

    render() {
        return (
            <>
                {this.state.polylinePath.length > 0 && (
                    <MapView.Polyline
                        coordinates={this.state.polylinePath}
                        strokeColor="black"
                        strokeWidth={5}
                        lineDashPattern={this.props.lineDashPattern}
                    />
                )}
            </>
        );
    }
}


AnimatedMapViewDirections.propTypes = {
    origin: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired
        })
    ]),
    waypoints: PropTypes.arrayOf(
        PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                latitude: PropTypes.number.isRequired,
                longitude: PropTypes.number.isRequired
            })
        ])
    ),
    destination: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            latitude: PropTypes.number.isRequired,
            longitude: PropTypes.number.isRequired
        })
    ]),
    apikey: PropTypes.string.isRequired,
    onStart: PropTypes.func,
    onReady: PropTypes.func,
    onError: PropTypes.func,
    mode: PropTypes.oneOf(['DRIVING', 'BICYCLING', 'TRANSIT', 'WALKING']),
    language: PropTypes.string,
    resetOnChange: PropTypes.bool,
    optimizeWaypoints: PropTypes.bool,
    splitWaypoints: PropTypes.bool,
    directionsServiceBaseUrl: PropTypes.string,
    region: PropTypes.string,
    precision: PropTypes.oneOf(['high', 'low']),
    timePrecision: PropTypes.oneOf(['now', 'none']),
    channel: PropTypes.string
};

export default AnimatedMapViewDirections;
