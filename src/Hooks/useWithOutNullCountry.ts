import { searchPlaces } from './useSearchPlaces';

export const colombiaOmit = [
    'Colombia',
    'CO',
    'Bogota',
    'Bogotá',
    'null',
    'undefined',
    'Barranquilla',
    'Valledupar'
];

export const ReplaceDirections = (directions: any) => {
    return searchPlaces(directions) ?? directions;
};
