
<template>
    <div id="moneycal">
        <div class="calendar" :style="{width:calWidth}" >
            <header onselectstart="return false">
                <router-link to="/" draggable="false" tabindex="-1" style="outline:none">
                    <!-- @click="refreshCal" -->
                <img 
                    draggable="false"
                    src="../../assets/logo9.svg"
                    class="logo2">
                </router-link>
                <span>
                    <p id="select-month"> 
                        <span 
                            @click="refreshCal('previous')"
                            class="heading__month__arrow">&lt;
                        </span> 
                        <span>{{months[month]}}</span> <span>{{year}}</span>
                        <span 
                            @click="refreshCal('next')"
                            class="heading__month__arrow">&gt; 
                        </span> 
                    </p>
                </span>
                <img v-if="summaryActive" 
                    @click="toggleSummary"
                    src="../../assets/sidebar.svg" 
                    draggable="false"
                    class="icon">
                <img v-else 
                    @click="toggleSummary"
                    src="../../assets/sidebar2.svg" 
                    draggable="false"
                    class="icon">
            </header>
            <ul onselectstart="return false">
                <li v-for="day in daysOfWeek" 
                    :key= "day">{{day}}
                </li>
            </ul>
            <div id="days__container">
                    <app-day v-for="day in daysOfMonth" 
                        :dayNumber="day[0]" 
                        :dayKey="day[1]" 
                        :key="day[1]" >
                    </app-day>
            </div>
        </div>
        <transition name="slide">
            <app-summary v-if="summaryActive"></app-summary> 
        </transition>
        <transition name="fade">
            <app-record v-if="showModal"></app-record>
        </transition>        
    </div>
</template>

<script>
    import Day from './Day.vue';
    import Summary from './Summary.vue';
    import Record from './RecordModal.vue';
    import { mapState,  mapMutations, mapActions } from 'vuex';
    import * as types from '../../store/types';

    export default {

        components : {
            appDay: Day,
            appSummary: Summary,
            appRecord: Record,
        },

        computed: { 
            ...mapState('days',[
                    'months',
                    'month',
                    'year',
                    'daysOfWeek',
                    'daysOfMonth',
                    'summaryActive',
                    'calWidth',
                ]),
            ...mapState('record',[
                    'showModal',
            ])
        },

        methods: {
            ...mapMutations({
                toggleSummary: types.TOGGLE_SUMMARY,
                summary: types.SUMMARY,
            }),
            ...mapActions({
                refreshCal: types.REFRESH_CAL,
            })
        },
    }   
</script>
 


<style lang="scss">
    @import "../../SCSS/variables";
    @import "../../SCSS/mixins";

    body{
        margin: 0;
        overflow-x: hidden;
    }

    #moneycal{
        overflow: hidden;
        display: flex;
        flex-direction: row;
        height: 100vh;
        background: #ebebeb;
        font-family: Futura;
        color: #ffffff;
    }

    .heading__month__arrow{
        color: #F8B500;
        font-size: 1.3em;
        padding: 5px;
        cursor: pointer;
    }

    .calendar{
        // background-color: black;
        display: flex;
        flex-direction: column;
        transition: width 0.5s ease;
        overflow: hidden;
    }
    
    #select-month {
        @include padding(0px 0px 0px 0px);
        letter-spacing: 0.1em;
        font-size: map-get($fs , normal );
        display: flex;
        align-items:baseline;
        justify-content: space-between;
        width: 13em;
    }

    header{
        display: flex;
        flex: 0 1 50px;
        background-color:  #278EA5;
        justify-content: space-between;
        align-items: center;
        img{
            @include icon;
            height: 30px;
        }
    }

    ul{
        flex: 0 1 auto;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 1px;
        font-size: map-get($fs, small );
        text-align: center;
        align-content: center;
        list-style: none;
        margin: 0px;
        padding: 10px 0px 10px 2px;
        padding-inline-start:0;
        background-color: #F8B500;
    }

    #days__container{
        flex: 1 0 auto;
        display: grid;
        grid-template-columns: repeat(7, 1fr);    
        grid-gap: 1px;
        padding: 2px 0px 2px 2px;
        background-color: $color-gray;
        height: 1vh;

        >div{
            background-color: $color-white;
            color: $color-blue;
            font-size: map-get($fs , small );
            padding: 0px;
        }
    }

    @media screen and (max-width: 770px) {

        ul{
            font-size: 9px;
        }

        #select-month {
            font-size: 12px;
        }
    }

    .slide-enter, .slide-leave-to {
        transform: translateX(100%);
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
    }

</style>
 