import axios from "axios";

const apiBaseUrl = 'https://api.themoviedb.org/3';
const apiKey = '605da0b99648ed33e3e074aa75e4db7f';

const movieDetailsEndpoint = id=> `${apiBaseUrl}/movie/${id}?api_key=${apiKey}`;

const apiCall = async (endpoint, params)=>{
    const options = {
        method: 'GET',
        url: endpoint,
        params: params? params: {}
    };

    try{
        const response = await axios.request(options);
        return response.data;
    }catch(error){
        console.log('error: ',error);
        return {};
    }
}



/*
export const fetchMovieDetails = (id)=>{
    return apiCall(movieDetailsEndpoint(id));
}*/
