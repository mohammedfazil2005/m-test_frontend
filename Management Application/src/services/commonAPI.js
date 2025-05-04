import axios from "axios";
import baseURL from "./baseURL";

// A reusable function to make API requests using axios
const commonAPI = async (HTTPmethod, endpoint, data, header) => {
    // Create the request payload
    let payload = {
        method: HTTPmethod,             // HTTP method: 'get', 'post', etc.
        url: baseURL + endpoint,        // Full URL: base + specific endpoint
        data: data,                     // Request body data (if applicable)
        headers: header                 // Request headers (e.g., auth tokens)
    };

    // Execute the request and return the response
    return await axios(payload)
        .then((res) => {
            return res;                 // Return response if successful
        })
        .catch((err) => {
            return err;                 // Return error if request fails
        });
}

export default commonAPI;
