
import  { CARE_GROUP } from './types';

export const careGroupAction = (careGroup) => {
    console.log("CareGroup action: ", careGroup)

    return(dispatch) => dispatch(
        {
        type: CARE_GROUP,
        payload : careGroup
     });
}