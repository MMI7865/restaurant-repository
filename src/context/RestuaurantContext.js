import { createContext, useContext, useEffect, useState } from "react";

const RestaurantContext = createContext();

export function RestaurantContextProvider({ children }) {
  const [user, setUser] = useState({});

  

  const [restaurants, setRestaurants] = useState([]);
  const fetchRestaurant = () => {
    fetch("http://localhost:4000/restaurant/all")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        let upvotes;
        let downvotes;
        let supervotes;
        const restaurantsData = data.map((d) => {
          upvotes = d.votes?.filter((d) => d.votetype === "upvote").length;
          downvotes = d.votes?.filter((d) => d.votetype === "downvote").length;
          supervotes = d.votes?.filter(
            (d) => d.votetype === "supervote"
          ).length;
          return {
            ...d,
            upvotes,
            downvotes,
            supervotes,
          };
        });

        console.log(restaurantsData);
        setRestaurants(restaurantsData);
      });
  };


const [placesData, setPlacesData] = useState(null);

const fetchPlacesData = () => {
  const apiKey = "AIzaSyBbd6OxsOu0GJoN0PaGJlcfAfCnr9junkE";
    const latitude = "37.7749";
    const longitude = "-122.4194";

    const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=5000&type=restaurant&key=${apiKey}`;
    // axios
    //   .get(apiUrl)
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPlacesData(data);
      });
}

  return (
    <RestaurantContext.Provider value={{ fetchRestaurant, restaurants }}>
      {children}
    </RestaurantContext.Provider>

  );
}

export function useRestaurant() {
  return useContext(RestaurantContext);
}