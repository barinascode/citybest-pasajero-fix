export interface LocationAddressProps {
    city: string | null;
    district: string | null;
    street: string | null;
    region: string | null;
    subregion: string | null;
    country: string | null;
    postalCode: string | null;
    name: string | null;
    isoCountryCode: string | null;
    timezone: string | null;
}

export default class LocationAddress {
    constructor(private props: LocationAddressProps) {}

    get city() {
        return this.props.city;
    }

    get street() {
        return this.props.street + ' ' + this.props.name;
    }

    get country() {
        return this.props.country;
    }

    get shortAddress() {
        return `${this.props.city}, ${this.props.country}`;
    }

    static fromPrimitives(props: LocationAddressProps) {
        return new LocationAddress(props);
    }
}
