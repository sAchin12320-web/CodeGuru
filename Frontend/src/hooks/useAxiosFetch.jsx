import React, { useEffect } from 'react';
import axios from 'axios';

const useAxiosFetch = () => {
  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
  });

  useEffect(() => {
    // request interceptor
    const requestInterceptor = axiosInstance.interceptors.request.use(
      (config) => {
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    // response interceptor
    const responseInterceptor = axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestInterceptor);
      axiosInstance.interceptors.response.eject(responseInterceptor);
    };
  }, [axiosInstance]);

  return axiosInstance;
};

export default useAxiosFetch;
