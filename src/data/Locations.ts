// Waypoint coordinates found with https://www.gps-latitude-longitude.com/
// JMT Waypoints inspired by https://www.pcta.org/wp-content/uploads/2012/10/JMTelevationprofile.jpg

export type Location = string;

export type Coordinate = number;

export type Coordinates = { lat: Coordinate; long: Coordinate };

const Locations: Record<Location, Coordinates> = {
  "Twin Lakes": { lat: 38.873027, long: -120.192626 },
  "Happy Isles": { lat: 37.729926, long: -119.559051 },
  "Little Yosemite Valley": { lat: 37.726315, long: -119.52766 },
  "Half Dome Trail": { lat: 37.749581, long: -119.524212 },
  "Merced Lake Trail": { lat: 37.738438, long: -119.412853 },
  "Sunrise High Sierra Camp": { lat: 37.795018, long: -119.432552 },
  "Cathedral Pass": { lat: 37.834647, long: -119.41488 },
  "Cathedral Lake": { lat: 37.843523, long: -119.420925 },
  "Tuolumne Meadows Trail": { lat: 37.877588, long: -119.377024 },
  "Tuolumne Meadows Ranger Station": { lat: 37.873132, long: -119.359109 },
  "Rafferty Creek Trail": { lat: 37.877511, long: -119.338504 },
  "Vogelsang Pass Trail": { lat: 37.77965, long: -119.340708 },
  "Lyell Fork Bridge": { lat: 37.869253, long: -119.32694 },
  "Donohue Pass": { lat: 37.760208, long: -119.24848 },
};

export default Locations;
