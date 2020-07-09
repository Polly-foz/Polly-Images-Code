import React, {useRef} from 'react';
import {useStores} from '../stores/index';
import {observer} from "mobx-react";
import {Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from "styled-components";

const {Dragger} = Upload;

const Result = styled.div`
    margin-top:30px;
    padding: 20px;
    border: 1px dashed #ccc;
`
const H1 = styled.h1`
    margin: 20px 0;
    text-align: center;
`
const Image = styled.img`
    max-width: 400px;
`


const Component = observer(() => {
    const {ImageStore, UserStore} = useStores();

    const props = {
        beforeUpload: file => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传');
                return false;
            }
            ImageStore.upload().then(serverFile => {
                console.log("上传成功");
                console.log(serverFile);
            }).catch(error => {
                console.log("上传失败");
            });
            // console.log(file)
            return false;
        },
        showUploadList: false
    };
    return (
        <Result>
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined/>
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                    band files
                </p>
            </Dragger>

            {ImageStore.serverFile ? <div>
                <H1>上传结果</H1>
                <dl>
                    <dt>线上地址</dt>
                    <dd>
                        <a href={ImageStore.serverFile.attributes.url.attributes.url}>
                            {ImageStore.serverFile.attributes.url.attributes.url}
                        </a>
                    </dd>
                    <dt>文件名</dt>
                    <dd>{ImageStore.filename}</dd>
                    <dt>图片预览</dt>
                    <dd>
                        <Image src={ImageStore.serverFile.attributes.url.attributes.url} alt=""/>
                    </dd>
                    <dt>更多尺寸</dt>
                    <dd>...</dd>
                </dl>
            </div> : null}
        </Result>
    );
});

export default Component;
