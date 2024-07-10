import React, { useRef, useState } from "react";
import CustomButton from "./CustomButton";
import { Upload, Download } from "../assets";
import { SEND_QR_CODES, UPLOAD_EXCEL } from "../constant";
import useGet from "../hooks/useGet";
import usePost from "../hooks/usePost";
import useHandleDownloadExcel from "../hooks/useHandleDownloadExcel";
import toast, { Toaster } from "react-hot-toast";

const styles = {
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  uppercontainer: {
    height: "20rem",
    display: "flex",
    alignItems: "center",
    gap: "2rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
};

const Content = () => {
  const [showSendButton, setshowSendButton] = useState(false);

  const fileInputRef = useRef(null);
  const {
    data: postData,
    postData: sendPostData,
    isLoading: isPostLoading,
  } = usePost({ url: UPLOAD_EXCEL });

  const {
    data: getData,
    fetchData: fetchGetData,
    isLoading: isGetLoading,
  } = useGet({ url: `${SEND_QR_CODES}?fileId=${postData?.fileId}` });

  const { handleDownload } = useHandleDownloadExcel();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const loadingToastId = toast.loading("Uploading file...");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await sendPostData({
        postData: formData,
        onSuccessCallback: () => {
          setshowSendButton(true);
          toast.success("File Uploaded Successfully!", {
            duration: 2000,
            id: loadingToastId,
          });
        },
        onErrorCallback: (err) => {
          toast.error(err, {
            id: loadingToastId,
          });
        },
      });
    }
  };

  const sendQrCodes = () => {
    const loadingToastId = toast.loading("Sending QR Codes...");
    fetchGetData({
      onSuccessCallback: () => {
        toast.success("QR Codes sent Successfully!", {
          id: loadingToastId,
          duration: 2000,
        });
        setshowSendButton(false);
      },
      onErrorCallback: (err) => {
        toast.error(err, {
          id: loadingToastId,
        });
      },
    });
  };

  const handleDownloadFile = () => {
    handleDownload({
      onSuccessCallback: () => {
        toast.success("File downloaded Successfully!", {
          duration: 2000,
        });
      },
      onErrorCallback: (err) => {
        toast.error(err);
      },
    });
  };

  return (
    <>
      <div style={styles.mainContainer}>
        <div style={styles.uppercontainer}>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".xlsx, .xls "
          />
          <CustomButton
            buttontext="Upload Guest List"
            icon={Upload}
            onClick={handleUploadClick}
            isDisabled={isGetLoading || isPostLoading}
          />
          <CustomButton
            buttontext="Download Entered Guest List"
            icon={Download}
            onClick={handleDownloadFile}
            isDisabled={isGetLoading || isPostLoading}
          />
        </div>
        {showSendButton && (
          <CustomButton
            buttontext="Send QR codes"
            onClick={sendQrCodes}
            isDisabled={isGetLoading}
            customButtonStyle={{
              backgroundColor: "green",
            }}
          />
        )}
      </div>
      <Toaster />
    </>
  );
};

export default Content;
