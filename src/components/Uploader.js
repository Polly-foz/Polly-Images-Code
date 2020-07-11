import React, {useRef} from 'react';
import {useStores} from '../stores/index';
import {observer, useLocalStore} from "mobx-react";
import {Upload, message, Spin} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import styled from "styled-components";

const {Dragger} = Upload;

const Result = styled.div`
    margin-top:30px;
    padding: 20px;
    border: 1px dashed #ccc;
`;
const H1 = styled.h1`
    margin: 20px 0;
    text-align: center;
`;
const Image = styled.img`
    max-width: 400px;
`;


const Component = observer(() => {
    const {ImageStore, UserStore} = useStores();
    const refWidth = useRef();
    const refHeight = useRef();
    const store = useLocalStore(() => ({
        width: null,
        setWidth(width) {
            store.width = width;
        },
        get widthStr() {
            return store.width ? `/w/${store.width}` : '';
        },
        height: null,
        setHeight(height) {
            store.height = height;
        },
        get heightStr() {
            return store.height ? `/h/${store.height}` : '';
        },
        get fullStr() {
            return ImageStore.serverFile.attributes.url.attributes.url +
                '?imageView2/0' + store.widthStr + store.heightStr;
        }
    }));

    const props = {
        beforeUpload: file => {
            ImageStore.setFile(file);
            ImageStore.setFilename(file.name);
            if (UserStore.currentUser === null) {
                message.warning('请先登录再上传');
                return false;
            }
            if(!/(\.svg$)|(\.png$)|(\.jpg$)|(\.jpeg$)|(\.gif$)/ig.test(file.name)){
                message.error('只能上传.svg/.png/.jpg/.jpeg/.gif格式的图片')
                return false
            }
            if(file.size > 1024*1024){
                message.error('图片尺寸不能超过1M')
                return false
            }
            ImageStore.upload().then(serverFile => {
                console.log("上传成功");
                console.log(serverFile);
                message.success('上传成功！')
            }).catch(error => {
                console.log("上传失败");
                message.error('上传失败！')
            });
            // console.log(file)
            return false;
        },
        showUploadList: false
    };

    const bindWidthChange = () => {
        store.setWidth(refWidth.current.value);
    };
    const bindHeightChange = () => {
        store.setHeight(refHeight.current.value);
    };

    return (
        <Result>
            <Spin spinning={ImageStore.isUploading} tip='上传中'>
                <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined/>
                    </p>
                    <p className="ant-upload-text">点击或拖拽上传图片</p>
                    <p className="ant-upload-hint">
                        只能上传.svg/.png/.jpg/.jpeg/.gif格式的图片<br/>
                        图片尺寸不能超过1M
                    </p>
                </Dragger>
            </Spin>


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
                    <dd>
                        <input placeholder='最大宽度' ref={refWidth} onChange={bindWidthChange}/>
                        <input placeholder='最大高度' ref={refHeight} onChange={bindHeightChange}/>
                    </dd>
                    <dd><a href={store.fullStr} target='_blank'>{store.fullStr}</a></dd>
                </dl>
            </div> : null}

        </Result>
    );
});

export default Component;
