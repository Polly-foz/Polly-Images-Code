import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStores} from '../stores/index';
import {List,Spin} from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import styled from "styled-components";
const Component = observer(() => {
    const {HistoryStore} = useStores();

    useEffect(()=>{
        console.log('进入组件')
        // HistoryStore.reset()
        return ()=>{
            console.log('退出组件')
            HistoryStore.reset()
        }
    },[])

    const handleInfiniteOnLoad = ()=>{
        HistoryStore.find()
    }
    const Img = styled.img`
        height:200px;
        max-width: 200px;
        object-fit: contain;
        margin-right: 30px;
    `

    return (
        <>
            <InfiniteScroll
                initialLoad={true}
                pageStart={0}
                loadMore={handleInfiniteOnLoad}
                hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
                useWindow={false}
            >
                <List
                    dataSource={HistoryStore.list}
                    renderItem={item => (
                        <List.Item key={item.id}>
                            <div>
                                <Img src={item.attributes.url.attributes.url} alt=""/>
                            </div>
                            <div>{item.attributes.filename}</div>
                            <div>
                                <a href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a>
                            </div>
                            <div>
                                {/*{item.createdAt}*/}
                            </div>
                        </List.Item>)}>
                    {HistoryStore.isLoading && HistoryStore.hasMore && (
                        <div>
                            <Spin/>
                        </div>
                    )}
                </List>

            </InfiniteScroll>
        </>
    );
});

export default Component;
