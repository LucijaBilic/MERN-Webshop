import axios from "axios";

import * as storage from "../constants/storage";

const http = axios.create({
	baseURL: "http://localhost:5000/api/v1/",
	headers: {
		"Content-type": "application/json",
	},
});

const token = localStorage.getItem(storage.TOKEN);
if (token) {
	http.defaults.headers.authorization = "Bearer " + token;
}

export default http;
