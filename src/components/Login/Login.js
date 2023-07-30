import React from "react";
import styles from "./Login.module.css";

class Login extends React.Component {
    constructor(props) {    
        super(props);    
        this.state = {      
            username: '',      
            password: ''    
        };
        this.handleLogin = this.handleLogin.bind(this);  
    }
    handleLogin = () => {
        window.location.href = "/home";
    }
    render() {
        return (
            <div className={styles.main}>
                <h1 className={styles.title}>¡Bienvenido!</h1>
                <div className={styles.container}>
                <input className={styles.text_input} type="text" placeholder="Username" value={this.state.username} onChange={e => this.setState({username: e.target.value})}/>
                <input className={styles.text_input} type="password" placeholder="Password" value={this.state.password} onChange={e => this.setState({password: e.target.value})}/>
                <button className={styles.login_button} onClick={this.handleLogin}>Ingresar</button>
                </div>
            </div>
        );
    }
}

export default Login;