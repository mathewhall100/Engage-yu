import { DASHBOARD_DATA } from '../actions/types'

const initialState = {
    tableData: [],
    checked: []
};

export default function dashboardReducer(
    state = initialState,
    action
) {
    switch (action.type) {
        case DASHBOARD_DATA:
            return {
                ...state,
                tableData: action.payload.tableData,
                checked: action.payload.checked,
                status: action.payload.status
            };

        default: return state;
    }
}