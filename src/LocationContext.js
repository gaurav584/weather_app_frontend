import { createContext, useEffect, useState ,} from "react";
import axios from "axios";

const LocationContext = createContext();

const LocationProvider = ({children}) => {
    const [locations , setLocations] = useState([]);

    useEffect(()=>{
        const fetchLocations = async() => {
          try{
            const response = await axios.get(
                `http://localhost:9000/api/v1/location/find/all`
            );
            //console.log(response.data.location);
            setLocations(response.data.location);
            console.log(response.data.location);
          }catch(error){
            console.log(`Error fetching locations:`,error);
          }
        }

        fetchLocations();
    },[])

    return (
        <LocationContext.Provider value={locations}>{children}</LocationContext.Provider>
    )
}

export { LocationProvider , LocationContext};