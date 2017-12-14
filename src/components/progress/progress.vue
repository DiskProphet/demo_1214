<template>
  <div class="Progress  panel_shadow card_height">
    <b-container class="bv-example-row">
      <b-row class="text-center">
        <b-col lg="4" md="4" sm="12" style="margin-left:-80px">
          <icon name="heartbeat" class="margin_top_15"></icon>&nbsp; <span class="font_size_12">存储寿命预测</span></b-col>
        <b-col lg="5" md="5" sm="12"></b-col>
        <b-col lg="3" md="3" sm="12" class="icons">
          <span class="red_icon first_icon"></span> <span class="yellow_icon"></span> <span class="blue_icon"></span> <span class="green_icon"></span>
        </b-col>
      </b-row>
      <b-row class="text-center" style="margin-top:12px">
        <b-col lg="3" md="3" sm="12">
          <b-row class="text-center">
            <b-col cols="12" class="padding_none">
              <b-card class="text-center heght_85">
                <icon name="inbox"></icon>&nbsp; <span class="font_size_14">磁盘数量</span> <br><span class=" font_size_22_bold">{{totalhost}}</span>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
        <b-col lg="9" md="9" sm="12">
          <b-row class="text-center">
            <b-col lg="3" md="3"> <span class="red_icon"></span><span class="iconText font_size_12">0 - 0%</span> </b-col>
            <b-col lg="3" md="3"><span class="yellow_icon"></span><span class="iconText font_size_12">0 - 0%</span></b-col>
            <b-col lg="3" md="3"> <span class="blue_icon"></span><span class="iconText font_size_12">0 - 0%</span></b-col>
            <b-col lg="3" md="3"><span class="green_icon"></span><span class="iconText font_size_12">&nbsp;&nbsp;54 - 100%</span></b-col>
          </b-row>
          <router-link to="/progressinfo">
            <b-progress class="mt-2" :max="max" show-value>
              <b-progress-bar :value="disk_success" variant="success"></b-progress-bar>
            </b-progress>
          </router-link>
          <b-button-group class="button_time">
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
    </b-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        counter: 100,
        max: 100,
        curIndex: 0,
        button_index: 7
      };
    },
    methods: {
      button_click(index) {
        this.button_index = index;
      }
    },
    props: {
      DiskProphetOverviewTable: {
        type: Object
      }
    },
    computed: {
      NearFailurePredictiotype() {
        if (this.DiskProphetOverviewTable.series === undefined) {
          return "..."
        } else {
          let series = this.DiskProphetOverviewTable.series
          let DiskProphetOverviewTable_Length = series.length;
          let disk_error_num = 0;
          let disk_warn_num = 0;
          let disk_success_num = 0;
          for (let i = 0; i < DiskProphetOverviewTable_Length; i++) {
            let item = series[i]
            let ary = item.values[0];
            if (ary[3] === "<15 Days") {
              disk_error_num++
            } else if (ary[3] === "<45 Days") {
              disk_warn_num++
            } else if (ary[3] === ">45 Days") {
              disk_success_num++
            }
          }
          return {
            disk_error_num,
            disk_warn_num,
            disk_success_num,
            DiskProphetOverviewTable_Length
          }
        }
      },
      disk_success() {
        return this.counter * this.NearFailurePredictiotype.disk_success_num / this.NearFailurePredictiotype.DiskProphetOverviewTable_Length
      },
      disk_warn() {
        return this.counter * this.NearFailurePredictiotype.disk_warn_num / this.NearFailurePredictiotype.DiskProphetOverviewTable_Length
      },
      disk_error() {
        return this.counter * this.NearFailurePredictiotype.disk_error_num / this.NearFailurePredictiotype.DiskProphetOverviewTable_Length
      },
      totalhost() {
        if (this.DiskProphetOverviewTable.series === undefined) {
          return "..."
        }
        return this.DiskProphetOverviewTable.series.length
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .card_height {
    height: 160px;
    border-radius: 6px;
    background: #fff;
  }
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
  .icons span {
    position: relative;
    left: 120px;
    top: 13px;
  }
  .first_icon {
    margin-left: 86px !important;
  }
  .red_icon {
    width: 10px;
    height: 10px;
    background: #EE0000;
    opacity: 0.6;
    border-radius: 50%;
    float: left;
    margin-top: 6px;
  }
  .yellow_icon {
    width: 10px;
    height: 10px;
    background: #FF9900;
    opacity: 0.6;
    border-radius: 50%;
    float: left;
    margin-top: 6px;
  }
  .blue_icon {
    width: 10px;
    height: 10px;
    background: #6699FF;
    opacity: 0.6;
    border-radius: 50%;
    float: left;
    margin-top: 6px;
  }
  .green_icon {
    width: 10px;
    height: 10px;
    background: #33CC00;
    opacity: 0.6;
    border-radius: 50%;
    float: left;
    margin-top: 6px;
  }
  .text-center>.card-body {
    background: linear-gradient(to top, #FFFFFF, #E4E4E4);
  }
  .iconText {
    margin-left: -2rem;
    margin-top: -1rem;
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
    line-height: 12px;
    padding: 0.375rem 1.84rem !important;
    box-shadow: 0px 0px 5px 0px transparent inset !important;
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
</style>
