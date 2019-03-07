<template>
    <div>
        <header >
            <div>
                <router-link to="/"  tabindex="-1" style="display: flex; align-items:center">
                    <img src="../assets/logo10.svg">
                    <img src="../assets/logo1.svg" style="height: 15px; padding: 0;">
                </router-link>
            </div>
            <div class="menu">
                <p><router-link tabindex="-1" to="/signup">Sign Up</router-link></p>
                <p><router-link tabindex="-1" to="/login">Log In</router-link></p>
            </div>
        </header>
        <div id="content-login">
            <div id="create-account">
                <p style="font-size: 18px">Log in</p>
                <p style="color:coral; font-size:14px; margin:30px 0;">
                    {{logInError}}
                </p>

                <div id="account">
                    <p>
                        <label for="email">email</label>
                        <input @input = "email = $event.target.value" @focus = "clearLogInError" type="text" tabindex="1">
                    </p>
                    <p>
                        <label for="password">password</label>
                        <input @input = "password = $event.target.value" @focus = "clearLogInError" type="password" tabindex="2">
                    </p>
                    <p style=" margin-left:30px;">Forgot your password?</p>
                </div>
                <div @click="onSubmit" 
                    @keyup.enter="onSubmit"
                    id="button-login" 
                    tabindex="3">
                    <p>continue</p>
                </div>
                <div id="account-true">
                    <p>Don't have an account?</p>
                    <router-link to="/signup">Sign up</router-link>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import * as types from '../store/types';
    import { mapState } from 'vuex';

    export default {
        data () {
            return {
                email: '',
                password: '',
            }
        },
        computed: {
            ...mapState({
                logInError: state => state.auth.logInError,
            }),
        },
        methods: {
            onSubmit () {
                this.$store.dispatch(types.LOGIN, {email: this.email, password: this.password, route: '/calendar'})
            },
            clearLogInError () {
                this.$store.state.auth.logInError = ''
            },
        }
    }
</script>


<style lang="scss">

    @import "../SCSS/mixins";


    body {
        @include bodytest;
    }

    header {
        @include headertest;
    }

    #content-login {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        color:#f8b500;
        text-align: center;
        font-size: 10px;
        margin-top: 30px;
    }

    #create-account {
        height: 88vh;
        // display: flex;
        // flex-direction: column;
        // justify-content:space-around;
        text-align: center;
    }

    #account {
        background-color: #ebebeb;
        color: #278EA5;
        padding: 30px 0;
        margin: 0 auto;
        border-radius: 16px;
        width: 80vw;
        max-width: 600px;
        display: relative;
        p {
            label{
                    display: inline-block;
                    padding: 5px;
                    text-align: right;
                    width: 150px;
                    font-size: 12px;
            }
            input{
                    text-align: center;
                    display: inline-block;
                    width: 50%;
                    max-width: 250px;
                    margin-left: 10px;
                    border: none;
            }
        }
    }

    #button-login {
        margin: 30px auto 0 auto;
        padding: 10px 15px;
        background-color: #278EA5;
        color: #ffffff;
        border-radius: 30px;
        font-size: 12px;
        cursor: pointer;

        display: inline-block;
        position: relative;
        p {
            margin: 0;
        }

    }

    #account-true {
        margin-top: 15px;
        p {
            display: inline-block;
            color: #278EA5;
        }
        a {
            padding-left: 10px;
            color:#f8b500;
        }
    }
</style>
