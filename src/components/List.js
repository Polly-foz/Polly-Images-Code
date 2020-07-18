import React, {useEffect} from "react";
import {observer} from "mobx-react";
import {useStores} from '../stores/index';
// import {List,Spin} from "antd";
import {Space, Button, Table, DatePicker, Spin} from "antd";
import InfiniteScroll from 'react-infinite-scroller';
import styled from "styled-components";
import dayjs from 'dayjs';

const Component = observer(() => {
    const {HistoryStore} = useStores();
    const {RangePicker} = DatePicker;

    useEffect(() => {
        console.log('进入组件');
        HistoryStore.findAll();
        // HistoryStore.reset()
        return () => {
            console.log('退出组件');
            HistoryStore.reset();
        };
    }, []);

    const handleDelete = (avObject) => {
        window.avObject = avObject;
        // console.log('delete-avObject',avObject)
        HistoryStore.delete(avObject).then(result => {
            console.log('删除成功', result);
        }, error => console.log("删除失败", error));
    };

    const data = HistoryStore.filteredList;
    window.data = data;
    const columns = [
        {
            title: '图片',
            key: 'image',
            dataIndex: 'attributes',
            render: (item) => {
                const url = item.url.attributes.url;
                // console.log('url',url)
                return <Img src={url}/>;
            }
        },
        {
            title: '名字',
            key: 'name',
            dataIndex: 'attributes',
            render: (item) => {
                const filename = item.filename;
                return filename;
            },
            sorter: (a, b) => {
                return a.attributes.filename < b.attributes.filename;
            }
        },
        {
            title: 'Url',
            key: 'url',
            dataIndex: 'attributes',
            render: (item) => {
                const url = item.url.attributes.url;
                // console.log('url',url)
                return <a href={url}>{url}</a>;
            }
        },
        {
            title: '上传时间',
            key: 'createdAt',
            dataIndex: 'createdAt',
            render: (time) => {
                // console.log('time',time)
                return dayjs(time).format('YYYY年MM月DD日 HH:mm:ss');
            },
            sorter: (a, b) => {
                return dayjs(a.createdAt).isBefore(b.createdAt);
            },
            sortDirections: ['ascend', 'descend']
        },
        {
            title: '',
            key: 'delete',
            render: (item) => {
                // console.log(item.attributes.url.id)
                return <a onClick={() => handleDelete(item)}>删除</a>;
            }
        }
    ];

    const onOk = (value) => {
        console.log('onOk', value);
    };


    function onChange(value, dateString) {
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        if (dateString[0] === '' || dateString[1] === '') {
            HistoryStore.setFilter(() => true);
        }
        HistoryStore.setFilter(item => {
            if(dateString[0] === dateString[1]){
                return dayjs(item.createdAt).isSame(dateString[0],'day')
            }
            return dayjs(item.createdAt).isBefore(dayjs(dateString[1]).add(1, 'day')) && dayjs(item.createdAt).isAfter(dayjs(dateString[0]).subtract(1, 'day'));
        });
    }

    const Img = styled.img`
        height:200px;
        max-width: 200px;
        object-fit: contain;
        margin-right: 30px;
    `;

    const SpinWrapper = styled.div`
        margin: 30px 0;
    `;


    return (
        <>
            选择起始时间：<RangePicker onOK={onOk} onChange={onChange} disabled={HistoryStore.isLoading}/>

            <SpinWrapper>
                <Spin spinning={HistoryStore.isLoading} tip='正在加载中...'></Spin>
            </SpinWrapper>
            {!HistoryStore.isLoading && <Table columns={columns} dataSource={data}/>}
        </>

    );

});

export default Component;

/*
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
                            {dayjs(item.createdAt).format('YYYY年MM月DD日 HH:mm:ss')}
                        </div>
                        {/!*<button onClick={()=>{console.log('item',item);window.item=item}}>log item</button>*!/}
                    </List.Item>)}>
                {HistoryStore.isLoading && HistoryStore.hasMore && (
                    <div>
                        <Spin/>
                    </div>
                )}
            </List>

        </InfiniteScroll>
    </>
);*/
