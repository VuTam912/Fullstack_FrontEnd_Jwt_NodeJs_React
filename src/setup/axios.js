import axios from 'axios';
import { toast } from 'react-toastify';

// Note: Khi link URL api bên backend hoặc domain bị thay đổi thì vào trong này ở đưới đây
// để sửa đường link URL ở frontend (ko cần phải sửa mỗi link URL Api ở userService)

// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: 'http://localhost:8000/', // <--
});

instance.defaults.withCredentials = true; // kích hoạt để xem cookie trên chrome

// Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = 'AUTH_TOKEN 123456789';

// Add a request interceptor (bộ chặn - check) : sử lý thực thi khi HTTP request được call
instance.interceptors.request.use(
	function (config) {
		// Do something before request is sent
		return config;
	},
	function (error) {
		// Do something with request error
		return Promise.reject(error);
	}
);

// Add a response interceptor : xử lý khi HTTP đã response => thông thưởng res sẽ trả về rất nhiều thông tin bao gôm cả data,config...
instance.interceptors.response.use(
	function (response) {
		// Any status code that lie within the range of 2xx cause this function to trigger
		// Do something with response data
		// only return data in res and in users.js: response.data.DT => response.DT ok
		return response.data;
	},
	// thông báo lỗi response từ server
	function (error) {
		// Nếu response error.
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// complex : error.response?.status || 500; // ?: nếu error.response bị underfine hoặc null,error thì show 500 còn ko thì là status
		// simple:
		const status = (error && error.response && error.response.status) || 500;

		// we can handle global errors here
		switch (status) {
			// authentication (token related issues)
			case 401: {
				console.log('error: ', error.response.data);
				toast.error('Unauthorized the user. Please login...');
				// window.location.href = '/login';
				return error.response.data; // <== note!!
			}

			// forbidden (permission related issues)
			case 403: {
				toast.error(`You don't have the permission to access this resource...`);
				return Promise.reject(error); // reject - tu choi
			}

			// bad request
			case 400: {
				// toast.error(`You don't have the permission to access this resource...`);
				return Promise.reject(error);
			}

			// not found
			case 404: {
				return Promise.reject(error);
			}

			// conflict
			case 409: {
				return Promise.reject(error);
			}

			// unprocessable
			case 422: {
				return Promise.reject(error);
			}

			// generic api error (server related) unexpected
			default: {
				return Promise.reject(error);
			}
		}
	}
);

export default instance;
