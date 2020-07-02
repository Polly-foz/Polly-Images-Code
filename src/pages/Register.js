import React from "react";
import {useStores} from "../stores";
import {observer} from "mobx-react";

const Component = observer(()=>{
    const {AuthStore} = useStores()

    return (
        <>
            <h1>Register: {AuthStore.values.username}</h1>
        </>
    )
})

export default Component

