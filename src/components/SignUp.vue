<template>
    <div>
        <header >
            <div>
                <router-link to="/" tabindex="-1" style="display: flex; align-items:center;">
                    <img src="../assets/logo8.svg">
                    <img src="../assets/logo1.svg" style="height: 15px; padding: 0;">
                </router-link>
            </div>
            <div class="menu">
                <p><router-link tabindex="-1" to="/signup">Sign Up</router-link></p>
                <p><router-link tabindex="-1" to="/login">Log In</router-link></p>
            </div>
        </header>
        <div id="content">
            <div id="create-account">
                <p style="font-size: 18px">Create your account</p>
                <p style="color:coral; font-size:14px; margin:30px 0;">
                    {{signUpError}}
                </p>
                <div id="account">
                    <p>
                        <label for="email">email</label>
                        <input tabindex="1" @input = "email = $event.target.value" @focus = "clearError" type="text">
                    </p>
                    <p>
                        <label for="password">password</label>
                        <input tabindex="2" @input = "password1 = $event.target.value" @focus = "clearError" type="password">
                    </p>
                    <p>
                        <label for="confirm-password">confirm password</label>
                        <input tabindex="3" @input = "password2 = $event.target.value" @focus = "clearError" type="password">
                    </p>
                    <p style="margin-top:30px; margin-left:30%; width: 45%">By submitting this form you agree to the terms of service</p>
                </div>
                <div tabindex="4" 
                    @keyup.enter="onSubmit"
                    @click="onSubmit" 
                    id="button">
                    <p>create account</p>
                </div>
                <div id="account-true">
                    <p>Already have an account?</p>
                    <router-link to="/login">Log In</router-link>
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
                password1: '',
                password2: '',
            }
        },
        computed: {
            ...mapState({
                signUpError: state => state.auth.signUpError,
            }),
        },

        methods: {
            onSubmit () {
                if (this.password1 === this.password2) {
                    this.$store.dispatch(types.SIGNUP, {email: this.email, password: this.password1})
                } else if ((this.password1 === '') || (this.password2 === '') ) {
                    this.$store.commit(types.AUTH_ERROR_HANDLING, {authErrorCode:'FILL_ALL', form: 'signUp'})
                } else {
                    this.$store.commit(types.AUTH_ERROR_HANDLING, {authErrorCode:'DIFFERENT_PASSWORDS', form: 'signUp'})
                }
            },
            clearError () {
                this.$store.state.auth.signUpError = ''
            },
        }
    }
</script>


<style lang="scss">

    @import "../SCSS/mixins";


    body {
        @include bodytest
    }

    header {
        @include headertest;
        height: 50px;        
    }

    #content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 750px;
        color: #278EA5;
        text-align: center;
        font-size: 10px;
        margin-top: 30px;
    }

    #create-account {
        height: 88vh;
        // display: flex;
        // flex-direction: column;
        // justify-content: space-around;
        text-align: center;
    }

    #account {
        background-color: #ebebeb;
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

    #button {
        display: inline-block;
        position: relative;
        margin: 30px auto 0 auto;
        padding: 10px 15px;
        background-color: #f8b500;
        color: #ffffff;
        border-radius: 30px;
        font-size: 12px;
        cursor: pointer;
        p {
            margin: 0;
        }
    }

    #account-true {
        margin-top: 15px;
        p {
            display: inline-block;
        }
        a {
            padding-left: 10px;
            color:#f8b500;
        }
    }

</style>
