const axios=require("axios")

const googlePlaceSerectKey=process.env.GOOGLE_PLACE_API

const googlePlace= async(city,type="tourist_attraction",limit=5)=>{
    try {
        const url =`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${type}+in+${city}&key=${GOOGLE_PLACES_API_KEY}`;

        const response =await axios.get(url)

        const places=response.data.results.slice(0,limit).map(place =>({
            name:place.name,
            address:place.formatted_address,
            rating:place.rating,
            placeId:place.place_id
        }))
        return places;

    } catch (error) {
           console.error("Error fetching places from Google:", error);
           return [];
    }
}