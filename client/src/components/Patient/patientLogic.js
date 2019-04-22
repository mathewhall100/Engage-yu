import { startCase } from 'lodash'

// **** Create data object ****
export const createData = (data) => {
    return data.map((d, index) => {
        return {
          id: index, 
          _id: d._id,
          firstname: d.firstname,
          lastname: d.lastname,
          number: d.hospital_id, 
          dob: d.dob, 
          enrolled: d.date_enrolled,
          provider: `Dr. ${startCase(d.primary_provider_firstname)} ${startCase(d.primary_provider_lastname)}` 
        };
    })
};


// **** Filter functions using inputs from patient data form to find patients ****
export const filterByName = (data, filterName) => {
    return data.filter(d => 
        filterByNameAlgo(d.firstname, d.lastname, filterName) 
    )
};

export const filterByNumber = (data, filterNumber) => {
    return data.filter(d =>
        filterByNumberAlgo(d.number, filterNumber)
    )
};

export const filterByNameAlgo = (firstname, lastname, filterName) => {
        let nameA = "", nameB = "";
        const str = firstname.toLowerCase().trim() + lastname.toLowerCase().trim();

        if ( str.includes(filterName.toLowerCase().trim() )) {return true} 

        if (filterName.includes(" ")) {
            nameA = filterName.slice(0, filterName.indexOf(" ")).toLowerCase().trim()
            nameB = filterName.slice(filterName.indexOf(" ")).toLowerCase().trim()
            if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
            if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
        }

        if (filterName.includes(",")) {
            nameA = filterName.slice(0, filterName.indexOf(",")).toLowerCase().trim().replace(/\W/g, "")
            nameB = filterName.slice(filterName.indexOf(",")+1).toLowerCase().trim().replace(/\W/g, "")
            if (firstname.toLowerCase().trim().includes(nameA) && (lastname.toLowerCase().trim().includes(nameB))) {return true}
            if (firstname.toLowerCase().trim().includes(nameB) && (lastname.toLowerCase().trim().includes(nameA))) {return true}
        } 
        return false
};

export const filterByNumberAlgo = (number, filterNumber) => {
    if (number.toLowerCase().includes(filterNumber.toLowerCase().trim()) )  {return true} 
    return false
};