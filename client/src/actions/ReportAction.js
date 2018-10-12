import axios from 'axios';
import { REPORT_PATIENT_DATA} from './types';

export const fetchReportPatientData = (id) => {
    const url = `/api/patient_info/find/${id}`;
    const request = axios.get(url)
    let patientInfo;
    return(dispatch) => {
        request.then( res => {
            patientInfo = res.data;
            }).then( () => { 
                axios.get(`/api/patient_data/${patientInfo.patient_data_id}`).then( res => {
                    dispatch({
                        type: REPORT_PATIENT_DATA,
                        payload : {
                            reportPatientInfo : patientInfo,
                            reportPatientData : res.data
                        }
                    })
                })
            }
        )
    }
}