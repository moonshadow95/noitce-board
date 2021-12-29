import React, {useState} from 'react';
import styles from './auth.module.css';
import Axios from "axios";

const Auth = ({setIsAuth, authService ,setBanner, setIsAlert}) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "username") {
            setUsername(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    // 로그인
    const onLogin = async (event) => {
        event.preventDefault();
        try {
            await authService.login(username, password)
            authService.me()
                .then(result=>setIsAuth(result.data))
                .catch(console.error);
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
    };

    // 회원가입
    const onJoin = async ()=>{
        try {
            await authService.signup(username, password)
            setIsAlert(false)
            setBanner(`${username}님, 가입되었습니다.`)
            setUsername(username)
            setPassword("")
        } catch (error) {
            setIsAlert(true)
            setBanner(error.response.data.message)
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.authContainer}>
                    <div className={styles.formContainer}>
                        <form className={styles.form} onSubmit={onLogin}>
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.input}
                                    name="username"
                                    type="text"
                                    required
                                    value={username}
                                    onChange={onChange}
                                />
                                <span className={styles.placeholder}>이름</span>
                            </div>
                            <div className={styles.inputContainer}>
                                <input
                                    className={styles.input}
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={onChange}
                                />
                                <span className={styles.placeholder}>비밀번호</span>
                            </div>
                            <div className={styles.formBtnContainer}>
                                <input
                                    className={styles.submitBtn}
                                    type="submit"
                                    value="로그인"
                                />
                                <span onClick={onJoin} className={styles.switch}>
                                    회원가입
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Auth;