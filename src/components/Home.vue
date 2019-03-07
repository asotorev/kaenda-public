<template>
<div style="overflow:auto">
    <header >
        <div>
            <router-link to="/" style="display: flex; align-items:center;">
                <img src="../assets/logo7.svg" style="padding-rigth: 0;">
                <img src="../assets/logo1.svg" style="height: 15px; padding: 0;">
                <!-- <span style="font-size: 12px; letter-spacing: 0.1em;">moneykal.com</span> -->
            </router-link>
        </div>
        <div class="menu">
            <p><router-link to="/calendar">Calendar</router-link></p>
            <p v-if="!auth"><router-link to="/signup">Sign Up</router-link></p>
            <p v-if="!auth"><router-link to="/login">Log In</router-link></p>
            <p v-if="auth" @click="logOut">Log Out</p>
        </div>
    </header>
    <div class="welcome">
        <!-- <img src="../assets/logo8.svg" style="width: 200px; margin: 0 auto 30px auto;"> -->
        <p id="line1">A visual way to organize your</p>
        <p id="line2">Personal Finance</p>
        <p id="line3">Set a budget, organize your payments, record your expenses </p>
        <p class="start-now">
            <router-link to="/signup">Start now, it's free !</router-link>
        </p>

    </div>
    <div id="video">
       <img 
            src="../assets/Artboard3.png">
    </div>
    <div class="examples">
        <img src="../assets/logo8.svg" style="height: 40px; padding-bottom: 20px">
        <p>Have you ever had any of these questions?</p>
        <div id="columns">
            <div class="card" style="background: #ebebeb">
                <p class="title-2">I want to track my credit cards, and the interest I am paying.</p>
                <img src="../assets/credit-card.svg" >
                <p>How much do I owe in credit cards?</p>
                <!-- <img src="../assets/calc.svg" >
                <p>I won’t be able to pay the total this month; so how much should I pay and when?</p> -->
                <img src="../assets/reminder.svg" >
                <p>I wish I had a reminder to pay each of them.</p>
            </div>
            <!-- <div class="card" style="background: #ebebeb">
                <p class="title-2">I want to organize all my receipts in one place</p>
                <img src="../assets/shopping-bag.svg" >
                <p>Which of my expenses have a receipt?</p>
                <img src="../assets/receipt.svg" >
                <p>Where could I store my receipts to be reimbursed?</p>
            </div> -->
            <div class="card" > 
                <p class="title-1"> I want to record my expenses and income</p>
                <img src="../assets/cart.svg" >
                <p>How much am I spending each month in …?</p>
                <img src="../assets/pig.svg" >
                <p>How could I reduce my expenses in order to save some money?</p>
                <img src="../assets/moneybag.svg" >
                <p>How much did I earn in this period?</p>
            </div>
            <div class="card" style="background: #ebebeb">
                <p class="title-2">I want to simulate my payments and move them around</p>
                <img src="../assets/debt.svg" >
                <p>What happens if I pay this debt later this month?</p>
                <img src="../assets/hourglass.svg" >
                <p>Which of my liabilities should be paid before the others?</p>
            </div>
        </div>
    </div>
    <div class="welcome">
        <p style="color: coral;">Ok, let's do it ! </p>
        <p class="start-now">
            <router-link to="/signup">Sign up</router-link>
        </p>

    </div>
    <div id="foot">
        <img 
                src="../assets/logo7.svg"
                class="logo">
        <p style="margin-top:20px   ">
            <img src="../assets/logo1.svg" style="height: 15px; padding: 0;">
        </p>
    </div>
    <footer>
        <p>Frequently Asked Questions</p>
        <p>Contact Us</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
    </footer>

</div>
</template>

<script>
    import * as types from '../store/types';
    export default {
        computed: {
            auth () {
                return this.$store.getters.isAuthenticated
            }
        },
        methods: {
           logOut() {
               this.$store.dispatch(types.LOGOUT)
           } 
        },
    }
</script>

<style lang="scss">
    
    @import "../SCSS/variables";
    @import "../SCSS/mixins";
    
    body{
        @include bodytest
    }

    header{
        @include headertest;
        height: 50px;
    }

    .menu {
        display: flex;
        flex-direction: row; 
    }

    .welcome {
        display: flex;
        flex-direction: column;
        padding-top: 50px;
        text-align: center;
    }

    #line1 {
        color: #7c88a9;
        margin: 0px;
        font-size: 14px;
    }
    #line2 {
        color: #ff8162;
        font-size: 20px;
        margin: 10px;
    }
    #line3 {
        margin: 0 0 40px 0;
        color: #278EA5;
        font-size: 14px;
    }

    .start-now {
        font-size: 14px;
        background-color: #f8b500;
        padding: 2px 20px;
        line-height: 30px;
        border-radius: 18px;
        margin: 10px auto 30px auto;
        cursor: pointer;
        a {
            color: #ffffff;
            text-decoration: none;
        }
    }

    #video {
        margin-top: 50px;
        position: relative;
        display: block;
        width: 100%;
        text-align: center;
        img {
            width: 80%;
        }
    }

    .examples {
        margin-top: 80px;
        color:#7c88a9;
        text-align: center;
        font-size: 14px;
    }

    #columns {
        margin-top: 80px;
        display: flex;
        justify-content:center;
        div {
            padding: 5%;
            font-size: 12px;
            width: 25%;
        }
        img{
            margin-top: 30px;
            width: 50px;
            height: 50px;
        }
        p {
            max-width: 150px;
            margin: 30px auto;
        }
    }

    // .card {
        // border-radius: 16px;
    // }

    .title-1 {
        color: coral; 
        font-size: 16px;
    }

    .title-2 {
        color:#278EA5; 
        font-size: 16px;
    }

    footer {
        display: flex;
        width: 100%;
        background-color: #278EA5;
        justify-content: space-around;
        align-items: center;
        margin: 0;
        
        p {
            padding: 20px;
            margin: 0px;
            text-align: center;
            letter-spacing: 0.1em;
        }
    }

    #foot{
        text-align: center;
        margin-top: 30px;
        padding-bottom: 20px;
        background: #278EA5;
        // font-family: Ubuntu;
        letter-spacing: 0.1em;
    }
    .logo {
        margin-top: 30px;
        @include icon;
        height: 30px; 
    }

     @media screen and (max-width: 500px) {
         
         #columns {
             p {
                 font-size: 10px;
             }
         }
    }

</style>
