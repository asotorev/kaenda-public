<template>
        <aside id="summary"             
            onselectstart="return false">
            <p id="header">Summary</p>
            <div id="content">
                <div id="summary__results">
                        <label for="income">Income</label>
                        <p class="results" style="color:#278EA5">{{income}}</p>
                        <label for="expenses">Expenses</label>
                        <p class="results" style="color:coral">{{expense}}</p>
                        <label for="total">Total</label>
                        <p class="results" :class="getColor">{{total}}</p>
                </div>
                <div id="summary__options">
                    <label>Totals of</label>
                    <select v-model="selectedTotalOf" tabindex="-1">
                        <option disabled v-for= "totalOf in totalsOf" :key= "totalOf">{{totalOf}}</option>
                    </select>            
                    <label>Display</label>
                    <select v-model="selectedDate" tabindex="-1">
                        <option disabled v-for= "date in dates" :key= "date">{{date}}</option>
                    </select>            
                    <label>Mode</label>
                    <select v-model="selectedMode" tabindex="-1">
                        <option disabled v-for= "mode in modes" :key= "mode">{{mode}}</option>
                    </select>
                </div>
                <div id="summary__share">
                    <label>Share</label>
                    <select v-model="selectedShare" tabindex="-1">
                        <option disabled v-for= "share in shares" :key= "share">{{share}}</option>
                    </select>            
                </div>
                <div id="summary__settings">
                    <img src="../../assets/bell.svg" alt="" class="icon" id="summary__icon__bell" draggable="false">
                    <img src="../../assets/settings.svg" alt="" class="icon" id="summary__icon__settings" draggable="false">
                    <img src="../../assets/Avatar.png" alt="" class="icon" id="summary__icon__avatar" draggable="false">
                </div>
            </div>
        </aside>
</template>

<script>
    import { mapState } from 'vuex';

    export default{
    
    props: ['summaryActive'],

    data (){
        return{
            modes: ['table', 'calendar'],
            dates: ['day', 'week', 'month', 'year', 'custom'],
            totalsOf: ['day', 'week', 'month', 'year', 'selected concepts'],
            shares: ['current view', 'selected items'],
            selectedMode:'calendar',
            selectedDate:'month',
            selectedTotalOf:'month',
            selectedShare:'current view',
        }
    },
    computed: {
        ...mapState([
            'income',
            'expense',
            'total',
        ]),
        getColor () {
            let total = this.$store.state.total.toString();
            total = parseFloat(total.replace(/[^0-9.-]/g, ""))
            if (total >= 0){
                return 'blue'
            } else {
                return 'coral'
            }
        }
    },
  }
</script>

<style lang="scss" scoped>
    @import "../../SCSS/variables";
    @import "../../SCSS/mixins";

    #summary {
        position:absolute;
        display: flex;
        flex-direction: column;
        right: 0px;
        height: 100vh;
        width: 180px;
        text-align: center;
        background-color: $color-gray;
        color: $text-gray;
        font-size: map-get($fs, small );
        transition: all 0.5s ease ;
        overflow-y: hidden;
        overflow-x: hidden;

        img{
            @include icon(5px);
        }
    }
    
    #header {
        line-height: 5vh;
        font-size: map-get($fs, normal );
        letter-spacing: 0.1em;
    }

    #content {
        display: flex;
        flex-direction: column;
        height: 93vh;
        justify-content: space-around;
    }

    label{
        display: inline-block;
        width: 120px;
        text-align: center;
        padding: 15px 0px 2px 0px;
    }

    .coral {
        color: coral;
    }

    .blue {
        color: #278EA5;
    }

    .results {
        margin: 10px 0px;
        font-size: 14px;
        // color: coral;
    }

    select {
        width: 130px;
    }

    @media screen and (max-width: 770px) {

        #summary > :first-child{
            line-height: 7vh;
            font-size: map-get($fs, small );
        }

        #summary {
            // position: relative;
            // font-size: 10px;
            // display: flex
            // flex-direction: row;
            img {
                padding: 5px;
            }
            p {
                margin: 0;
                font-size: 10px;
            }
            .results{
                margin: 10px 0px;
                font-size: 14px;
            }
        }

    }

   
</style>
