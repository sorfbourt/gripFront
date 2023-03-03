import { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { SessionContext } from '../contexts/SessionContext';
function UserTrips() {
    const [userTrips, setUserTrips] = useState([]);
    const { userId } = useContext(SessionContext);
    console.log("This is the user", userId)
    const fetchUserTrips = async () => {
      try {
        // with query:
        // const response = await fetch(`http://localhost:5005/trip/trips/usertrips/?user=${userId}`);
        // with params (I'd need to update the backedn routes): 
        const response = await fetch(`http://localhost:5005/trip/trips/usertrips/${userId}`);
        const parsed = await response.json();
        setUserTrips(parsed);
        console.log('Parsed is :', parsed);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
        if (userId){
            fetchUserTrips();
        }
    }, [userId]);
  
    console.log('These are the user trips', userTrips);

    if (userTrips.length===0){
        return(<p>You don't have any trips yet!</p>)
    } 
    //return (
        //       <>
        //         <h1>Explore your next trips:</h1>
        //         <ul>
        //             {userTrips.map((userTrip) => {
        //                 return(
        //             <li key={userTrip._id}>
        //                 <div>
        //                     <Link to={`/trips/${userTrip._id}`}>{userTrip.tripName}</Link>
        //                 </div>
        //             </li>
        //             )})}
        
        //         </ul>
        //       </>
        //     );
        //   }
       
        return (
            <>
            <h1>Explore your next trips</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap'}}>
                     {userTrips.map((userTrip) => {
                  return(
            <div key={userTrip._id} style={{ justifyContent:"center", alignItems:"center", border: "1px solid black", padding: "20px", margin: "20px" }}>
                <h2>{userTrip.tripName}</h2>
                <img src={userTrip.image} alt="Trip" />
                <p>Description: {userTrip.description}</p>
                <Link to={`/trips/${userTrip._id}`}>
                    <button type='button'>Details</button>
                </Link>
        
              </div>
                    )})}
            </div>
            </>
          )
        }
        export default UserTrips