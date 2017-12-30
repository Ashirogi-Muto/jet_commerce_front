import axios from 'axios';
import { URL_BASE } from './constant';
export const makeRequest = (endpoint, method = null, data = null) => {
	const url = URL_BASE + endpoint;
	let options = {
		method: method || 'GET',
		url: url,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};
	if(method == 'GET' && data){
		options['params'] = data
	}
	
	if (data) {
		options['method'] = method || 'POST';
		options['data'] = data
	}
	return new Promise((resolve, reject) => {
		axios(options)
			.then((res) => {
				resolve({error: false, res})
			})
			.catch((err) => {
				reject({error: true, res: null, err})
			});
	});
}