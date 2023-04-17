import { baseURL } from "../../utilities/constants";
import { useAPI } from "../../hooks/api";


function Venues({ products, isLoading, isError }) {
   
    if (isLoading) {
      return <div>Loading</div>;
    }
    if (isError) {
      return <div>Error</div>;
    }

   // return (
    // <div>{data.title}</div>   
   // )
  

  }



export function Home() {
    const { data, isLoading, isError } = useAPI(baseURL + "venues");
    console.log(data)
    return (
        <div>

          <h1>Products</h1>

        </div>
      );
    }
  
  export default Home;
