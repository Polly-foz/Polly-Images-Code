import React, {useRef} from 'react';
import {useStores} from '../stores/index';
import {observer} from "mobx-react";
import { Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

const Component = observer(() => {
    const {ImageStore} = useStores();

    const props = {
        beforeUpload: file => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            ImageStore.upload().then(serverFile => {
                console.log("上传成功");
                console.log(serverFile);
            }).catch(error => {
                console.log("上传失败");
            });
            // console.log(file)
            return false;
        },
        showUploadList:false
    }
    return (
        <div>
            <h1>上传图片</h1>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>
            {ImageStore.serverFile?<div>
                {ImageStore.serverFile.attributes.url.attributes.url}
            </div>:null}
        </div>
    );
});

export default Component;
