import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const axiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});


// Adding a request interceptor
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');

    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// Adding a response interceptor
axiosInstance.interceptors.response.use(
    response => response, // If the response is successful, just return it
    error => {
        if (error.response) {
            if (error.response.status === 401) {
                const errorData = error.response.data;

                if (errorData.error === "TokenExpired" || errorData.error === "InvalidToken") {
                    localStorage.clear();
                    console.error("Redirecting");
                    window.location.href = '/';
                }
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;