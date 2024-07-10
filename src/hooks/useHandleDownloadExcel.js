import axios from "axios";
import { BASE_URL, DOWNLOAD_EXCEL } from "../constant";

const useHandleDownloadExcel = () => {
  const handleDownload = async ({ onSuccessCallback, onErrorCallback }) => {
    const modifiedUrl = `${BASE_URL}${DOWNLOAD_EXCEL}`;
    try {
      const response = await axios.get(modifiedUrl, {
        responseType: "blob", // Important for handling binary data
      });

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "GuestList.xlsx";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      onSuccessCallback && onSuccessCallback(response.data);
    } catch (error) {
      onErrorCallback &&
        onErrorCallback("Error downloading the Excel sheet:", error);
    }
  };

  return {
    handleDownload,
  };
};

export default useHandleDownloadExcel;
