<template>
  <div>
    <div class="Progress_left item" style="text-align: left;" @mousemove="mouseMoveHandle" @mousedown="mousedownHandle" @mouseup="mouseupHandle">
      <span v-for="(item, index) in small_col" v-bind:key="item.name" class="small_item" :index="index" v-bind:class="[map[item.NearFailurePredictio],
                                  curHoverClass.indexOf(map[item.type]) > 0  ? 'active': '',
                                  item.isSelected === 'selected' ? 'select' : '']" v-bind:title="content">&nbsp; 
                                  </span>
    </div>
  </div>
</template>

<script>
  import _ from "lodash";
  import axios from 'axios';
  export default {
    data() {
      return {
        map: {
          '<15 Days': 'small_error',
          '>45 Days': 'small_success',
          '<45 Days': 'small_warn',
        },
        itemSelectType: 0, // 0代表什么都不做， 1 代表开始选中， 2 代表开始取消
        selectedSmallCol: [],
        content: '',
        curHoverClass: '',
        move: false,
        DiskProphetOverviewTable: {}
      };
    },
    created() {
      axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_name as "Name", life_expectancy as "Remaining Day Forecast", near_failure as "NearFailurePredictio", disk_serial_number AS "Serial Number", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model", max(predicted) as "Predicted" FROM autogen.sai_disk_prediction  WHERE host_domain_id =~  /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/  GROUP BY disk_serial_number&epoch=ms`).then((response) => {
        this.DiskProphetOverviewTable = response.data.results[0];
      });
    },
    methods: {
      getItem(dom) {
        const index = dom.getAttribute('index')
        return this.small_col[index]
      },
      mouseMoveHandle(e) {
        const item = this.getItem(e.target)
        if (item) {
          const itemSelectType = this.itemSelectType
          if (itemSelectType !== 0) {
            this.curHoverClass = e.target.className
            this.content = item && item.name
            const small_col = this.small_col
            item.isSelected = itemSelectType === 1 ? "selected" : undefined
            this.sender(small_col.length > 0 ? small_col.filter(item => item.isSelected === 'selected') : [])
          }
        }
      },
      mousedownHandle(e) {
        const item = this.getItem(e.target)
        if (item) {
          if (item.isSelected === "selected") {
            this.itemSelectType = 2
          } else {
            this.itemSelectType = 1
          }
        }
      },
      mouseupHandle(e) {
        const item = this.getItem(e.target)
        if (item) {
          const itemSelectType = this.itemSelectType
          if (itemSelectType !== 0) {
            this.curHoverClass = e.target.className
            this.content = item && item.name
            const small_col = this.small_col
            item.isSelected = itemSelectType === 1 ? "selected" : undefined
            this.sender(small_col.length > 0 ? small_col.filter(item => item.isSelected === 'selected') : [])
          }
        }
        this.itemSelectType = 0
      },
      sender(item) {
        this.$bus.$emit('overview_tab_message', item);
      },
    },
    computed: {
      processInfo() {
        if (this.DiskProphetOverviewTable.series === undefined) {
          return null
        } else {
          return this.DiskProphetOverviewTable.series.map(item => {
            let ary = item.values[0]
            return {
              time: ary[0],
              Name: ary[1],
              'Remaining Day Forecast': ary[2],
              NearFailurePredictio: ary[3],
              'Serial Number': ary[4],
              'Disk Vendor': ary[5],
              'Disk Type': ary[6],
              'Disk Model': ary[7],
              Predicted: ary[8],
            }
          });
        }
      },
      small_col() {
        let data = _.groupBy(this.processInfo, item => item.NearFailurePredictio)
        var arr = []
        for (let key in data) {
          arr = arr.concat(data[key])
        }
        return arr;
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .Progress_left {
    height: 100%;
    width: 100%;
    border-left: 1px solid #000;
    margin-left: -1px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .small_error {
    background: #ed1941;
  }
  .small_warn {
    background: #ffd400;
  }
  .small_success {
    background: #bed742;
  }
  .OK {
    background: lightgreen;
  }
  .small_item {
    width: 25px;
    height: 25px;
    display: inline-block;
    border-right: 1px solid #000;
    border-top: 1px solid #000;
  }
  .small_item:first-child {
    border-left: 0px solid #000;
    border-bottom: 0px solid #000;
  }
  .small_item:hover {
    opacity: 0.3;
  }
  /* .active {
                                opacity: 0.9;
                              } */
  .small_item.select::after {
    top: -20px;
    right: -2px;
    position: relative;
    content: '';
    display: block;
    width: 20px;
    height: 10px;
    border: 3px solid #1b315e;
    border-top: none;
    border-right: none;
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    border-radius: 28%;
  }
</style>
