import React from 'react';
import styles from "./Login.module.scss";
import {useHistory} from "react-router-dom";

const Login = () => {
    const history = useHistory();
    const click = () => {
        history.push("/basic/home")
    }

    return (
        <div className={styles.Login}>
            此处是登录页面
            <button onClick={click}>跳转至基础布局页面</button>
        </div>
    )
}

export default Login;