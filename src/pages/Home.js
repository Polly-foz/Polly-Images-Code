import React from 'react';
import {useStores} from '../stores/index';
import {observer} from "mobx-react";
import Uploader from "../components/Uploader"
import Tips from "../components/Tips"
const Home = observer(() => {
    const UserStore = useStores().UserStore;
    return (
        <>
            {UserStore.currentUser ?
                null:
                <Tips>请先登录再上传！</Tips>
            }
            <Uploader/>
        </>
    );
});

export default Home;
