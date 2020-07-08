import React from 'react';
import {useStores} from '../stores/index';
import {observer} from "mobx-react";
import Uploader from "../components/Uploader"
const Home = observer(() => {
    const UserStore = useStores().UserStore;
    return (
        <>
            {UserStore.currentUser ?
                (<h1>Hello {UserStore.currentUser.attributes.username}</h1> ):
                (<h1>你还未登录</h1>)
            }
            <Uploader/>
        </>
    );
});

export default Home;
