import ReactQQueryCreator from '../services/react-q-query-creator';
import ReactQueryMutationCreator from '../services/react-query-mutation-creator';

const CitybestServiceProvider = {
    QueryCreator: new ReactQQueryCreator(),
    MutationCreator: new ReactQueryMutationCreator()
};

export default CitybestServiceProvider;
