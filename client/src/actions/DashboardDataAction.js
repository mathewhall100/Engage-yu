
import { DASHBOARD_DATA } from './types';

export const dashboardData = (tableData, checked, status) => {

    return (dispatch) => dispatch ({ 
        type: DASHBOARD_DATA, 
        payload: {tableData, checked, status}
    }); 
} 