import { useDispatch } from "react-redux"
import { fetchAppCountries } from "config/Countries/store/app-countries.slice"
import { fetchAppDocumentsTypes } from "../DocumentsTypes/store/app-documents-types.slice"

const DefaultDataProvider = ( props:any ) => {
    
    const dispatch = useDispatch()

    dispatch(fetchAppDocumentsTypes())
    dispatch(fetchAppCountries())
    
    return props.children
}

export default DefaultDataProvider
