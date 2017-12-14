<template>
    <div class="Progress panel_shadow card_height">
        <b-tabs card>
            <b-tab title="按类型" active>
                <b-container class="bv-example-row">
                    <b-row class="text-center ">
                        <b-col cols="3" class="gray_border">
                            <div class="gray_card"> <span class="font_size_14" style="display:block">SSD</span> <span class="font_size_22_bold">{{SSDTotalNum}}</span></div>
                        </b-col>
                        <b-col cols="9">
                            <b-row class="text-center">
                                <b-col lg="3" md="3"> <span class="red_icon"></span><span class="iconText font_size_12">0%</span> </b-col>
                                <b-col lg="3" md="3"><span class="yellow_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                                <b-col lg="3" md="3"> <span class="blue_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                                <b-col lg="3" md="3"><span class="green_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                            </b-row>
                            <b-progress class="mt-1" :max="max" show-value>
                                <b-progress-bar :value="counter*(SSDOver45Num/SSDTotalNum)" variant="success" v-show="SSDOver45Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(SSDLess45Num/SSDTotalNum)" variant="primary" v-show="SSDLess45Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(SSDLess30Num/SSDTotalNum)" variant="warning" v-show="SSDLess30Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(SSDLess14Num/SSDTotalNum)" variant="danger" v-show="SSDLess14Num"></b-progress-bar>
                            </b-progress>
                        </b-col>
                    </b-row><br>
                    <b-row class="text-center">
                        <b-col cols="3" class="gray_border">
                            <div class="gray_card">
                                <span class="font_size_14" style="display:block">HDD</span> <span class="font_size_22_bold">{{HDDTotalNum}}</span>
                            </div>
                        </b-col>
                        <b-col cols="9">
                            <b-row class="text-center">
                                <b-col lg="3" md="3"> <span class="red_icon"></span><span class="iconText font_size_12">0%</span> </b-col>
                                <b-col lg="3" md="3"><span class="yellow_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                                <b-col lg="3" md="3"> <span class="blue_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                                <b-col lg="3" md="3"><span class="green_icon"></span><span class="iconText font_size_12">0%</span></b-col>
                            </b-row>
                            <b-progress class="mt-1" :max="max" show-value>
                                <b-progress-bar :value="counter*(HDDOver45Num/HDDTotalNum)" variant="success" v-show="HDDOver45Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(HDDLess45Num/HDDTotalNum)" variant="primary" v-show="HDDLess45Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(HDDLess30Num/HDDTotalNum)" variant="warning" v-show="HDDLess30Num"></b-progress-bar>
                                <b-progress-bar :value="counter*(HDDLess14Num/HDDTotalNum)" variant="danger" v-show="HDDLess14Num"></b-progress-bar>
                            </b-progress>
                        </b-col>
                    </b-row>
                </b-container>
            </b-tab>
            <b-tab title="按主机">
                Vendor Tab
            </b-tab>
            <b-tab title="按厂商">
                hosts Tab
            </b-tab>
        </b-tabs>
        <b-row class=" ">
            <b-col cols="12" class="button_fixed_bottom">
                <b-button-group class="button_time" size="sm">
                    <b-button :class="button_index===1?'currect':''" v-on:click="button_click(1)">9/25</b-button>
                    <b-button :class="button_index===2?'currect':''" v-on:click="button_click(2)">10/04</b-button>
                    <b-button :class="button_index===3?'currect':''" v-on:click="button_click(3)">10/11</b-button>
                    <b-button :class="button_index===4?'currect':''" v-on:click="button_click(4)">10/18</b-button>
                    <b-button :class="button_index===5?'currect':''" v-on:click="button_click(5)">10/25</b-button>
                    <b-button :class="button_index===6?'currect':''" v-on:click="button_click(6)">11/04</b-button>
                    <b-button :class="button_index===7?'currect':''" v-on:click="button_click(7)">当前</b-button>
                </b-button-group>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                counter: 100,
                max: 100,
                button_index: 7
            };
        },
        methods: {
            button_click(index) {
                this.button_index = index;
            }
        },
        props: {
            SSDOver45: {
                type: Array
            },
            HDDOver45: {
                type: Array
            },
            SSDLess45: {
                type: Array
            },
            HDDLess45: {
                type: Array
            },
            SSDLess30: {
                type: Array
            },
            HDDLess30: {
                type: Array
            },
            SSDLess14: {
                type: Array
            },
            HDDLess14: {
                type: Array
            },
            SSDTotal: {
                type: Array
            },
            HDDTotal: {
                type: Array
            }
        },
        computed: {
            SSDOver45Num() {
                if (this.SSDOver45 === undefined) {
                    return false
                }
                return this.SSDOver45.length
            },
            HDDOver45Num() {
                if (this.HDDOver45 === undefined) {
                    return false
                }
                return this.HDDOver45.length
            },
            SSDLess45Num() {
                if (this.SSDLess45 === undefined) {
                    return false
                }
                return this.SSDLess45.length
            },
            HDDLess45Num() {
                if (this.HDDLess45 === undefined) {
                    return false
                }
                return this.HDDLess45.length
            },
            SSDLess30Num() {
                if (this.SSDLess30 === undefined) {
                    return false
                }
                return this.SSDLess30.length
            },
            HDDLess30Num() {
                if (this.HDDLess30 === undefined) {
                    return false
                }
                return this.HDDLess30.length
            },
            SSDLess14Num() {
                if (this.SSDLess14 === undefined) {
                    return false
                }
                return this.SSDLess14.length
            },
            HDDLess14Num() {
                if (this.HDDLess14 === undefined) {
                    return false
                }
                return this.HDDLess14.length
            },
            SSDTotalNum() {
                if (this.SSDTotal === undefined) {
                    return false
                }
                return this.SSDTotal.length
            },
            HDDTotalNum() {
                if (this.HDDTotal === undefined) {
                    return false
                }
                return this.HDDTotal.length
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .mouseChange header {
        cursor: move;
    }
    .mouseChange .card-body {
        cursor: pointer;
    }
    .xlg .modal-dialog {
        width: 80% !important;
        max-width: 80% !important;
    }
    .card_height {
        height: 330px;
        background: #fff;
        border-radius: 6px;
    }
    .card_height.card .card-body .tabs .tab-content {
        background: #ccc;
        max-height: 170px;
        overflow-y: scroll;
    }
    .gray_border {
        border: 1px solid #ccc;
        padding: 6px;
        border-radius: 10px;
    }
    .gray_card {
        background: linear-gradient(to top, #FFFFFF, #E4E4E4);
        border: 1px solid #E4E4E4;
        height: 50px;
        border-radius: 6px;
    }
    .red_icon {
        width: 10px;
        height: 10px;
        background: #EE0000;
        border-radius: 50%;
        float: left;
        opacity: 0.6;
        margin-top: 6px;
    }
    .yellow_icon {
        width: 10px;
        height: 10px;
        background: #FF9900;
        border-radius: 50%;
        float: left;
        opacity: 0.6;
        margin-top: 6px;
    }
    .blue_icon {
        width: 10px;
        height: 10px;
        background: #6699FF;
        border-radius: 50%;
        float: left;
        opacity: 0.6;
        margin-top: 6px;
    }
    .green_icon {
        width: 10px;
        height: 10px;
        background: #33CC00;
        border-radius: 50%;
        float: left;
        opacity: 0.6;
        margin-top: 6px;
    }
    .button_time {
        margin-top: 12px;
    }
    .button_time>.btn.btn-secondary {
        background-color: #fff;
        color: #666666;
        border-color: #ccc;
        font-size: 12px;
        height: 25px;
    }
    .button_time>.btn.btn-secondary:hover {
        background: rgba(102, 153, 255, 0.2)
    }
    .button_time>.currect.btn.btn-secondary {
        color: #000;
        background-color: #F2F2F2;
        font-weight: bold;
        box-shadow: 0px 0px 5px 0px #CCCCCC inset !important;
    }
    .button_time>.btn.btn-secondary:active {
        box-shadow: 0px 0px 0px 0px transparent;
    }
    .button_fixed_bottom {
        position: absolute;
        bottom: 0;
        border-top: 1px solid #ccc;
        max-width: 97%;
        box-shadow: 0px -3px 3px 0px #ccc;
        height: 56px;
        padding: 0;
        margin-left: 16px;
    }
    .Progress>>>.card-header {
        background-color: #fff;
    }
    .Progress>>>.card-header .nav-item{
        margin-right: 2px;
        border-radius: 5px;
    }
    .Progress>>>.card-header .nav-item .nav-link {
        color: #666666;
        background: #F2F2F2;
        font-size: 12px;
    }
    .Progress>>>.card-header .nav-item .nav-link:hover {
        background: rgba(102, 153, 255, 0.2)
    }
    .Progress>>>.card-header .nav-item .active {
        font-weight: bold;
        color: #000000;
        background-color: #fff !important;
    }
</style>
