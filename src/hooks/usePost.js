import { useState } from "react";
import axios from "axios";

import { API_STATUS, BASE_URL } from "../constant";

const usePost = ({ url, apiOptions = {}, otherOptions = {} }) => {
  const [data, setData] = useState(null);
  const [apiStatus, setApiStatus] = useState(API_STATUS.IDLE);
  const [error, setError] = useState(null);

  const headers = {
    ...apiOptions.headers,
  };

  const postData = async ({ postData, onSuccessCallback, onErrorCallback }) => {
    const modifiedUrl = `${BASE_URL}${url}`;

    try {
      setApiStatus(API_STATUS.LOADING);
      const response = await axios.post(modifiedUrl, postData, { headers });
      setApiStatus(API_STATUS.SUCCESS);
      setData(response?.data);
      onSuccessCallback && onSuccessCallback(response.data);
    } catch (error) {
      setError(error);
      setApiStatus(API_STATUS.ERROR);
      onErrorCallback && onErrorCallback("Something went wrong!");
    }
  };

  const isLoading = apiStatus === API_STATUS.LOADING;
  const isSuccess = apiStatus === API_STATUS.SUCCESS;
  const isError = apiStatus === API_STATUS.ERROR;

  return {
    apiStatus,
    data,
    postData,
    error,
    isError,
    isLoading,
    isSuccess,
    setError,
    setData,
  };
};

export default usePost;
