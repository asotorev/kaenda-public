<template>
    <div 
        id="mask" 
        @click.self="emptyRecord({show: false})">
        <div class="modal_container">
            <div class="modal_title">
                <img style="width:30px" src="../../assets/logo7.svg" alt="" draggable="false">
                <p v-if="edit">Edit current record</p>
                <p v-else> New record</p>
                    <div class="button tooltip" id="closeModal">
                        <img draggable="false"
                            @click="emptyRecord({show: false})"
                            @keyup.enter="emptyRecord({show: false})"  
                            class="icon2" 
                            src="../../assets/x.svg"
                            tabindex="6"
                            >
                    <span class="tooltiptext">Close</span>
                    </div>
            </div>
            <div id="side">
                <div>
                    <div id="recordType">
                        <div>
                            <label for="income">income</label>
                            <input 
                                :checked ="type==='income'"
                                @click='setType'
                                value="income" 
                                class="radio_btn" 
                                type="radio"
                                tabindex="1"
                                > 
                        </div>
                        <div>
                            <label for="expense">expense</label>
                            <input 
                                :checked="type==='expense'"
                                @click='setType'
                                value="expense" 
                                class="radio_btn" 
                                type="radio"
                                tabindex="1"
                                > 
                        </div>
                    </div>
                    <div id="recordContent">
                        <p>
                            <label for="amount">amount</label>
                            <input autofocus
                                type="text" 
                                placeholder="0.00" 
                                :value='amount'
                                @blur='setAmount'
                                @keypress='onlyNumbers'
                                id="amountInput"
                                tabindex="2">
                        </p>
                        <p>
                            <label for="description">description</label>
                            <input 
                                type="text" 
                                placeholder="not specified" 
                                :value='description'
                                @blur='setDescription'
                                id="descInput"
                                tabindex="3">
                        </p>
                    </div>
                </div>
                <div id="modalButtons">
                    <div class='button tooltip'>
                        <img draggable="false"
                            @click ="deleteRecord"
                            @keyup.enter="deleteRecord" 
                            class="icon2" 
                            src="../../assets/trash.svg"
                            tabindex="5">
                        <span class="tooltiptext">Delete</span>
                    </div>
                    <div class='button tooltip' 
                        id="button-save">
                        <img draggable="false"
                            @click ="saveRecord" 
                            @keyup.enter="saveRecord"
                            class="icon2" 
                            src="../../assets/check.svg"
                            tabindex="4">
                        <span class="tooltiptext">Save</span>    
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState,  mapMutations } from 'vuex';
    import * as types from '../../store/types';
    
    export default {
        props : ['dayNumber','dayKey'],

        data () {
            return {
                localRdId:'',
            }
        },
        computed: {
            ...mapState('record',[
                'type',
                'amount',
                'description',
                'edit',
                'dayFrom',
                'recordId',
            ]),
        },
        methods: {

            ...mapMutations('record',{
                setType: types.SET_TYPE,
                setAmount: types.SET_AMOUNT,
                setDescription: types.SET_DESCRIPTION,
                emptyRecord: types.EMPTY_RECORD,
            }),
            onlyNumbers ($event) {
                let keyCode = ($event.keyCode ? $event.keyCode : $event.which);
                if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                    $event.preventDefault();
                }
            },
            generateRecordId () {
                this.localRdId = '';
                this.localRdId = (new Date().getTime());
            },
            saveRecord () {
                if ((this['amount'] != '' && this['amount'] != '0.00'  && this['amount'] != 'NaN') || (this['description'] !='' && this['amount'] != 'NaN')) {
                    if (this['amount'] === ''){this.$store.state.record.amount = '0.00'}
                    if (this['description'] === ''){this.$store.state.record.description = 'not specified'}
                    let rId = '';
                    if (this['edit']) {rId = this['recordId']}
                    else {
                        this.generateRecordId();
                        rId = this.localRdId
                    }
                    this.$store.dispatch('record/' + types.SAVE_RECORD_TO_DB,{rId: rId, day: this['dayFrom']});
                    this.$store.commit('record/' + types.SAVE_RECORD,{rId: rId, day: this['dayFrom']});
                }
                this.$store.commit('record/' + types.EMPTY_RECORD, {show:false});
                this.$store.commit(types.SUMMARY)
            },
            deleteRecord () {
                if (this.edit) {
                    this.$store.dispatch('record/' + types.DEL_RECORD_FROM_DB);
                    this.$store.commit('record/' + types.DELETE_RECORD);
                    this.$store.commit(types.SUMMARY)
                }
                this.$store.commit('record/' + types.EMPTY_RECORD, {show:false});
            }
        }
    }
</script>

<style lang="scss" scoped>
    

    #mask{
        position: fixed;
        display: flex;
        z-index: 9998;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        transition: all 0.5s ease;
    }

    .modal_container {
        // min-width: 400px;
        display: flex;
        margin: auto;
        padding: 10px;
        background-color: #ebebeb;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
        flex-direction: column;
        color: #278EA5;
        font-size: 10px;
    }
 
    .modal_title {
        display: flex;
        align-items: center;
        text-align: center;
        margin-bottom: 10px;
        color: #6E7DA2;
        padding-left: 30px;
        p {
            padding-left: 40px;
            font-size: 12px;
        }
    }

    #closeModal {
        margin-right: 5px;
        margin-left: auto ;
    }

.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
font-size: 11px;
  width: 80px;
  background-color: #f8b500;
  color: #fff;
  text-align: center;
  border-radius: 5px 3px 3px 5px;
  padding: 2px 0px;
  position: absolute;
  z-index: 1;
  top: 25%;
  left: 130%;
  opacity: 0;
  transition: opacity 0.9s cubic-bezier(0.95, 0.05, 0.795, 0.035);
}

.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 1px;
  left: -14px;
//   margin-top: -5px;
  border-width: 8px;
  border-style: solid;
  border-color: transparent #f8b500 transparent transparent;
}
.tooltip:hover .tooltiptext {
  opacity: 1;
}

    #recordType{
        margin: 0 auto;
        padding-left: 70px;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }

    #recordContent {
        text-align: center;
        margin-top: 5px;
        p {
            letter-spacing: 0em;
            font-size: 10px;
            min-width: 200px;
            label{
                display: inline-block;
                text-align: right;
                width: 50px;
            }
            input{
                margin-left: 10px;
                border: none;
            }
        }
    }

    #side {
        display: flex;
        justify-content: space-around;
    }

    #modalButtons {
        margin: 3px 5px 5px 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }


    .button {
        border-radius: 8px;
        border: none;
        color: white;
        height: 20px;
        width: 20px;
        padding: 5px;
        cursor: pointer;
    }

    .button:hover {
        padding: 5px;
        background-color: white;
    }

    .icon2 {
        width: 20px;
    }

    #amountInput{
        text-align: right;
    }

    ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: lightgray;
    }
    
    input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
        box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: #6E7DA2;
    }

    ::-moz-placeholder { /* Firefox 19+ */
    color: lightgray;
    }
    :-ms-input-placeholder { /* IE 10+ */
    color: lightgray;
    }
    :-moz-placeholder { /* Firefox 18- */
    color: lightgray;
    }


</style>
