import { useParams } from "react-router-dom";
import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";

function VenuePage() {
    let params = useParams();
    const { data, isLoading, hasError } = useAPI(baseURL + params.id);
    console.log(data)
    if (isLoading) {
      return <div>Loading...</div>;
    }
  
    if (hasError) {
      return <div>Error</div>;
    }
    console.log(data); 

}  

export default VenuePage