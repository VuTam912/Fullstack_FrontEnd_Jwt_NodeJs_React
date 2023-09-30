import axios from 'axios';

// Note: Khi link URL api bên backend hoặc domain bị thay đổi thì vào trong này ở đưới đây
// để sửa đường link URL ở frontend (ko cần phải sửa mỗi link URL Api ở userService)

// Set config defaults when creating the instance
const instance = axios.create({
	baseURL: 'http://localhost:8000/', // <--
});

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
	function (error) {
		// Nếu response error.
		// Any status codes that falls outside the range of 2xx cause this function to trigger
		// Do something with response error
		return Promise.reject(error);
	}
);

export default instance;
