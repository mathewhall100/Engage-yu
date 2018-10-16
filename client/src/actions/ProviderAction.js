
import  { PROVIDER_DETAILS } from './types';

export const providerDetails = (provider) => {
    //console.log("Provider action: ", provider)

    return(dispatch) => dispatch(
        {
        type: PROVIDER_DETAILS,
        payload : provider
     });
}

  
