import axios from 'axios';
/**
 * since we have deployed the server to heroku, we can use the base url as: 
 * https://fullstack-backend9999.herokuapp.com/api/notes
 * 
 * - second case scenerio is: what if we take the 'build' folder of the frontend and copy it to backend
 * and then deploy the built static files through the server?? Awesome isnt it !
 * -- when this happens, this app works like a single-page-app, 
 * --- and the frontend and the backend has the same '/' home route, the base url can be made `relative`
 * ---- 
 */
// const baseUrl = 'https://fullstack-backend9999.herokuapp.com/api/notes';
const baseUrl = '/api/notes';

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
