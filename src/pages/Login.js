import React, {createRef} from "react";
import {observer} from "mobx-react";
import {useStores} from "../stores";


const Component = observer(()=>{
    const {AuthStore} = useStores()
    const inputRef = createRef()

    const bindChange = e=>{
        AuthStore.setUsername(inputRef.current.value)
    }

    return (
        <>
            <h1>Login: {AuthStore.values.username}</h1>
            <input onChange={bindChange} ref={inputRef}/>
        </>
    )
})
export default Component
