import React, { useState } from "react";
import { Upload } from "antd";
import styles from "assets/styles/pages/pages/add-item.module.css";
import { uploadFileAsync } from "src/infrastructure/upload/effect/UploadFileEffect";
import { useTranslation } from "react-i18next";
import LoggerService from "src/infrastructure/services/LoggerService";
import Constant from "src/core/application/common/Constants";

type Props = {
  context: any;
};

export const UploadFile = (props: Props) => {
  const { context } = props;
  const { t } = useTranslation("common");
  const loggerService = new LoggerService();
  const [value, setValue] = useState<string>("");
  const [isUpload, setIsUpload] = useState();
  const BaseUrlImage = Constant.BaseUrlImage;

  console.log(context);

  const handleChange = async (file) => {
    await uploadFileAsync(
      t,
      loggerService,
      context,
      setIsUpload,
      file,
      setValue
    ).then((_) => {});
  };

  return (
    <Upload
      name="avatar"
      listType="picture-card"
      showUploadList={false}
      beforeUpload={() => false}
      onChange={(info) => handleChange(info.file)}
      className={styles.upload_file}
    >
      {value ? (
        <img
          src={`${BaseUrlImage}/${value}`}
          alt="avatar"
          style={{ width: "100%" }}
        />
      ) : (
        <div>Upload cover (190 x 270)</div>
      )}
    </Upload>
  );
};
