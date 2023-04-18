import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";




export function Home() {
    const { data, isLoading, isError } = useAPI(baseURL + "venues");
    console.log(data)

    if (isLoading) {
        return <div>Loading</div>;
      }
      if (isError) {
        return <div>Error</div>;
      }

    return (
        <div>

          <h1>Venues</h1>
          
          {data.map((venue) => (

            <>
            <h2 key={venue.id}>{venue.name}</h2>        
            <p >{venue.price}</p>
            <p >{venue.description}</p>
           
            </>

        ))}
          
        </div>
      );
      
    }
  
    
  export default Home;

  