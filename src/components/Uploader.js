import React, {useRef} from 'react';
import {useStores} from '../stores/index';
import {observer} from "mobx-react";

const Component = observer(() => {
    const ref = useRef();
    const {ImageStore} = useStores();
    const bindChange = () => {
        console.log(ref.current);
        window.file = ref.current;
        ImageStore.setFile(ref.current.files[0]);
        ImageStore.setFilename(ref.current.files[0].name);
        ImageStore.upload().then(serverFile => {
            console.log("上传成功");
            console.log(serverFile);
        }).catch(error => {
            console.log("上传失败");
        });
    };
    return (
        <div>
            <h1>Uploader</h1>
            <input type="file" ref={ref} onChange={bindChange}/>
            {ImageStore.isUploading ?
                <div>正在上传。。。</div> :
                (ref.current ?
                        <div>上传完成</div> :
                        <></>

                )
            }
        </div>
    );
});

export default Component;
