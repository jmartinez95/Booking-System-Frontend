import React, { Component } from 'react';

import './Auth.css';
import { NavLink } from 'react-router-dom';

class RegisterPage extends Component {
    constructor(props) {
        super(props);
        this.emailEl = React.createRef();
        this.passwordEl = React.createRef();
    }

    submitHandler = event => {
        event.preventDefault();
        const email = this.emailEl.current.value;
        const password = this.passwordEl.current.value;

        if (email.trim().length === 0 || password.trim().length === 0) {
            return;
        }

        const request = {
            query: `
                mutation {
                    createUser(userInput: {email: "${email}", password: "${password}"}) {
                        _id
                        email
                    }
                }
            `
        }

        //console.log(email, password);
        fetch('http://localhost:8000/api', {
            method: 'POST',
            body: JSON.stringify(request),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            if(res.status !== 200 && res.status !== 201) {
                throw new Error('Failed!');
            }
            return res.json();
        })
        .then(resData => {
            console.log(resData);
        })
        .catch(err => {
            console.log(err);
        });
    };

    render() {
        return <form className="authentication-form" onSubmit={this.submitHandler}>
            <h1 className="form-title">Register</h1>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" ref={this.emailEl}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" ref={this.passwordEl}/>
            </div>
            <div className="form-actions">
                <button type="submit">Submit</button>
            </div>
            <div className="secondary-form-actions">
                <p>Have an account? <NavLink to="login" className="register-link">Login</NavLink></p>
            </div>
        </form>
    }
}


export default RegisterPage;