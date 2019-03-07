<template>
    <div class="record-container" 
        onselectstart="return false">
        <p id="day__header" 
            :class = "[getDayColor, getTransparent]">
            <span>{{dayNumber}}</span>
            <span>
                <svg 
                @click="emptyRecord({show: true, day:dayKey})"
                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" width="11"><g fill="none" stroke-linecap="round" stroke-width="5" transform="translate(3 3)"><circle cx="23" cy="23" r="23"/><path d="M23 14v18m-9-9h18"/></g></svg>
            </span>
        </p>
        <div class="record-list"
            @click.self="emptyRecord({show: true, day:dayKey})"
            @dragover = "allowDrop"
            @drop="drop({
                                            dayTo: dayKey, 
            })">
            <template v-if="records[dayKey]">
                <div v-for="(record, index) in records[dayKey]" 
                    class="record-line"  
                    :class = "[getDayColor, getTransparent]"
                    :key="index" 
                    draggable = "true"
                    @dragstart ="drag({
                                            day: dayKey,
                                            rId: index,
                                            type: record.type,
                                            amt: record.amount,
                                            desc: record.description,
                    })" 
                    @click="loadRecord({
                                            show: true,
                                            day: dayKey,
                                            rId: index,
                                            type: record.type,
                                            amt: record.amount,
                                            desc: record.description,
                    })">
                    <span class = "detail">{{record.description}}</span>
                    <span class = "amount" :class="record.type">{{record.amount}}</span>
                </div>        
            </template>
        </div>
    </div>
</template>

<script>
    import { mapState,  mapMutations, mapActions } from 'vuex';
    import * as types from '../../store/types';
    
    export default {
        props : ['dayNumber','dayKey'],

        computed: { 
            ...mapState({
                range: state => state.days.range,
                records: state => state.record.records,
                edit: state => state.edit,
            }),
            getTransparent () {
                if (this.dayKey.substring(2,8) !== this.$store.state.days.range){
                    return 'transparent'
                }
            },
            
            getDayColor () {                
                if (this.dayKey === this.$store.state.days.today){
                        return 'coral'
                }        
            },
        },
        methods : {
            ...mapMutations('record',{
                emptyRecord: types.EMPTY_RECORD,
                loadRecord: types.LOAD_RECORD,
                drag: types.DRAG,
            }),
            ...mapActions('record',{
                drop: types.DROP,
            }),
            allowDrop: function (ev) {
                ev.preventDefault();
                return true;
            },
        },
    }

</script>

<style lang="scss">

    @import "../../SCSS/mixins";

    #day__header{
        display: flex;
        justify-content: space-between;
        align-items:middle;
        margin: 0;
        padding: 2px 3px; 
        svg {
            width: 14px;
            visibility: hidden;
            align-self: center;
            cursor: pointer;
            stroke: #9CCDDA;
        }
    }

    .coral{
        color:coral;
    }

    .transparent{
        opacity: 0.4;
    }

    .record-container{
        position: relative;
        @include scroll;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid white;
    }

    .record-container:hover{
        border: 1px solid #ebebeb;
        transform: translate(-2px,-2px) ;
        #day__header{
            svg {
                visibility: visible;
            }
            svg:hover{
                    stroke: #278EA5;
            }
        }
    }

    .record-list{
        height: calc(100% - 17px);
        width: 100%;
        position: absolute;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .record-line {
        background-color: transparent;
        display: flex; 
        justify-content: space-between;
        text-align: right;
        width: calc(100% - 4px);
        align-items:baseline;
        cursor: pointer;
        font-size: 10px;
        padding: 3px 1px 3px 2px;
        border-radius: 3px;
    }

    .record-line:hover{
        background-color: #ebebeb;
    }


    .detail{
        display: block;
        float: left;
        text-align: left;

        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;

        // font-size: 10px;
        color: #6E7DA2;
        font-weight: 500;
    } 

    .amount{
        display: block;
        float:right;
        text-align: right;
        color: coral;
    }

    .income {
        color: #278EA5;
    }
    
    .dragging {
        opacity: .15;
    }

    // .hover {
    //     background-color: gray;
    // }

    @media screen and (max-width: 770px) {
        #day__header {
            font-size: 9px;
            // span + span{
            //     padding-left: 9px;
                // font-size: 12px;
            // }
        }

        .record-line {
            font-size: 9px;
        }
         #day__header{
            svg {
                width: 12px;
            }
        }
    }

</style>
