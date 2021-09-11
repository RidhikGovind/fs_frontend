import axios from 'axios';
const baseUrl = 'http://localhost:5000/api/notes';

const getAll = () => {
	/**
	 * what we are doing is, we are simply calling the '/' route and 
	 * grabbing and returning the response data 
	 */
	const request = axios.get(baseUrl);
	return request.then(response => response.data)
};

const create = (newObj) => {
	const request = axios.post(baseUrl, newObj);
	return request.then((response) => response.data);
};

const update = (id, newObj) => {
	const request = axios.put(`${baseUrl}/${id}`, newObj);
	return request.then((response) => response.data);
};

export default {
	getAll,
	create,
	update,
};
