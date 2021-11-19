import React, {useState} from 'react';
import styles from './auth.module.css';
import Axios from "axios";

const Auth = (props) => {
    const [username, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(false);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {
            target: { name, value },
        } = event;
        if (name === "username") {
            setEmail(value);
        } else if (name === "password") {
            setPassword(value);
        }
    };
    const onSumbit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (true) {
                data = Axios.post('http://localhost:8080/auth/signup',{
                    'username':username,
                    'password':password
                }).then(() => {
                    alert('가입되었습니다.')
                })
            } else {
                // Login
            }
        } catch (error) {
            setError(error.message);
        }
    };
    const toggleAccount = () => {
        setNewAccount((prev) => !prev);
    };
    return (
        <div className={styles.container}>
            <div className={styles.auth__container}>
                <div className={styles.form__container}>
                    <form className={styles.form} onSubmit={onSumbit}>
                        <input
                            className={styles.input}
                            name="username"
                            type="text"
                            placeholder="이름"
                            required
                            value={username}
                            onChange={onChange}
                        />
                        <input
                            className={styles.input}
                            name="password"
                            type="password"
                            placeholder="비밀번호"
                            required
                            value={password}
                            onChange={onChange}
                        />
                        <input
                            className={styles.submit__btn}
                            type="submit"
                            value={newAccount ? "계정 생성" : "로그인"}
                        />
                        {error && (
                            <div className={styles.error}>
                                <span>{error}</span>
                            </div>
                        )}
                    </form>
                    <span onClick={toggleAccount} className={styles.switch}>
                        {!newAccount ? (
                            <span className={styles.active}>로그인</span>
                        ) : (
                            <span>로그인</span>
                        )}
                        {!newAccount ? (
                            <span>계정 생성</span>
                        ) : (
                            <span className={styles.active}>계정 생성</span>
                        )}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Auth;