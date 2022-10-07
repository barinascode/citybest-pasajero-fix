import APIAuthUserRepository from '@modules/auth/infrastructure/repositories/api-auth-user-repository';
import APITripRequestRepository from '@modules/request/infrastructure/repositories/api-trip-request-repository';
import GoogleMapsPlaceQueryRepository from '@modules/request/infrastructure/repositories/google-maps-place-query-repository';
import APIDestinationRepository from '@modules/trip/infrastructure/repositories/api-destination-repository';
import APIPaymentMethodRepository from '@modules/trip/infrastructure/repositories/api-payment-method-repository';
import APITripRepository from '@modules/trip/infrastructure/repositories/api-trip-repository';
import GoogleNewsApiRepository from '@modules/trip/infrastructure/repositories/google-news-api-repository';
import APIUserRepository from '@modules/user/infrastructure/repositories/api-user-repository';

const CitybestDataProvider = (userTokenId?: string) => {
    const token = userTokenId || '';

    return {
        AuthUserRepository: new APIAuthUserRepository(),
        UserRepository: new APIUserRepository(token),
        TripRequestRepository: new APITripRequestRepository(token),
        TripRepository: new APITripRepository(token),
        PlaceQueryRepository: new GoogleMapsPlaceQueryRepository(),
        NewsRepository: new GoogleNewsApiRepository(token),
        PaymentMethodRepository: new APIPaymentMethodRepository(token),
        DestinationRepository: new APIDestinationRepository(token)
    };
};

export default CitybestDataProvider;
