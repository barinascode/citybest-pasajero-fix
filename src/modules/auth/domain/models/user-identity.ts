export interface UserIdentityProps {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    isCompleted: boolean;
    profilePictureUrl?: string;
}

export interface UserIdentityPrimitiveProps {
    id: string;
    firstName: string;
    lastName?: string;
    email: string;
    phone: string;
    isCompleted: boolean;
    profilePictureUrl?: string;
}

export default class UserIdentity {
    constructor(private props: UserIdentityProps) {}

    static fromPrimitives(props: UserIdentityPrimitiveProps) {
        return new UserIdentity({
            ...props
        });
    }

    get id() {
        return this.props.id;
    }

    get fullName() {
        return `${this.firstName}${this.lastName ? ' ' + this.lastName : ''}`;
    }

    get firstName() {
        return this.props.firstName;
    }

    get lastName() {
        return this.props.lastName;
    }

    get email() {
        return this.props.email;
    }

    get phone() {
        return this.props.phone;
    }

    get profilePictureUrl() {
        return this.props.profilePictureUrl;
    }

    get isCompleted() {
        return Boolean(this.props.phone); //this.props.isCompleted;
    }

    toPrimitives(): UserIdentityPrimitiveProps {
        return {
            ...this.props
        };
    }
}
