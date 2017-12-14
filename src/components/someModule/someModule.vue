<template>
  <div class="module">
    <b-container class="bv-example-row module_gray" style="padding: 5px 20px !important;">
      <b-row class="text-center">
        <b-col cols="4" class="padding_left_10 padding_right_10">
          <b-row class="text-center">
            <b-col cols="12" class="padding_5">
              <my-envioroment :HostSummaryUptimeWeek="HostSummaryUptimeWeek" :DiskProphetOverviewTable="DiskProphetOverviewTable"></my-envioroment>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="8">
          <b-row class="text-center">
            <b-col cols="6" class="padding_5">
              <my-totalvolume :HostSummaryRootPathSpace="HostSummaryRootPathSpace" :DiskDiskUsageTotalUsedFree="DiskDiskUsageTotalUsedFree"></my-totalvolume>
            </b-col>
            <b-col cols="3" class="padding_5">
              <my-ssd :SSD="SSD" :DiskDiskUsageTotalUsedFree="DiskDiskUsageTotalUsedFree"></my-ssd>
            </b-col>
            <b-col cols="3" class="padding_5">
              <my-hdd :HDD="HDD" :DiskDiskUsageTotalUsedFree="DiskDiskUsageTotalUsedFree"></my-hdd>
            </b-col>
            <b-col cols="12" class="padding_5">
              <my-process :DiskProphetOverviewTable="DiskProphetOverviewTable"></my-process>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="text-center">
        <b-col cols="4">
          <b-row class="text-center">
            <b-col cols="6" class="padding_5">
              <my-cpu :SystemCpu="SystemCpu"></my-cpu>
            </b-col>
            <b-col cols="6" class="padding_5">
              <my-usage :SystemMemoryUsage="SystemMemoryUsage"></my-usage>
            </b-col>
          </b-row>
          <b-row class="text-center">
            <b-col cols="12" class="padding_5">
              <my-load></my-load>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4">
          <b-row class="text-center">
            <b-col cols="12" class="padding_5">
              <my-dependenttab :SSDOver45="SSDOver45" :HDDOver45="HDDOver45" :SSDLess45="SSDLess45" :HDDLess45="HDDLess45" :SSDLess30="SSDLess30" :HDDLess30="HDDLess30" :SSDLess14="SSDLess14" :HDDLess14="HDDLess14" :SSDTotal="SSDTotal" :HDDTotal="HDDTotal"> </my-dependenttab>
            </b-col>
          </b-row>
        </b-col>
        <b-col cols="4">
          <b-row class="text-center">
            <!-- <b-col cols="12">
                                                        <my-highrisk :RiskInfo="RiskInfo" :hostNum="hostNum"></my-highrisk>
                                                      </b-col> -->
            <b-col cols="12" class="padding_5">
              <my-mediumrisk :RiskInfo="RiskInfo" :hostNum="hostNum"></my-mediumrisk>
            </b-col>
            <b-col cols="12" class="padding_5">
              <my-lowrisk :RiskInfo="RiskInfo" :hostNum="hostNum"></my-lowrisk>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
  import moduleProgress from "../progress/progress";
  import cpu from "../cpu/cpu.vue";
  import usage from "../usage/usage.vue";
  import Packery from "packery";
  import processInfo from "../progress/progressInfo.vue"
  import dependenttab from "../dependenttab/dependenttab.vue";
  import envioroment from "../envioroment/envioroment.vue";
  import havecheck from "../havecheck/havecheck.vue";
  import totalvolume from "../totalvolume/totalvolume.vue";
  import SSD from "../SSD/SSD.vue";
  import HDD from "../HDD/HDD.vue";
  import HighRisk from "../HighRisk/HighRisk.vue";
  import MediumRisk from "../MediumRisk/MediumRisk.vue"
  import LowRisk from "../LowRisk/LowRisk.vue";
  import load from "../Load/Load.vue"
  export default {
    data() {
      return {};
    },
    components: {
      "my-process": moduleProgress,
      "my-cpu": cpu,
      "my-usage": usage,
      "my-dependenttab": dependenttab,
      "my-envioroment": envioroment,
      "my-havecheck": havecheck,
      "my-totalvolume": totalvolume,
      "my-ssd": SSD,
      "my-hdd": HDD,
      "my-highrisk": HighRisk,
      "my-mediumrisk": MediumRisk,
      "my-lowrisk": LowRisk,
      "my-load": load
    },
    mounted() {
      // var elem = document.querySelector(".grid");
      // var pckry = new Packery(elem, {
      //   // options
      //   itemSelector: ".grid-item",
      //   gutter: 10
      // });
      // var itemElems = pckry.getItemElements();
      // for (var i = 0, len = itemElems.length; i < len; i++) {
      //   var elem = itemElems[i];
      //   var draggie = new Draggabilly(elem);
      //   pckry.bindDraggabillyEvents(draggie);
      // }
      // setTimeout(function() {
      //   pckry.layout();
      // }, 100);
    },
    props: {
      DiskProphetOverviewTable: {
        type: Object
      },
      HostSummaryUptimeWeek: {
        type: Array
      },
      SystemCpu: {
        type: Object
      },
      SystemMemoryUsage: {
        type: Object
      },
      HostSummaryRootPathSpace: {
        type: Object
      },
      DiskDiskUsageTotalUsedFree: {
        type: Object
      },
      HDD: {
        type: Object
      },
      SSD: {
        type: Object
      },
      RiskInfo: {
        type: Object
      },
      hostNum: "",
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
    }
  };
</script>
<style>
  .module {
    background-color: #000000
  }
  .padding_5 {
    padding: 5px !important;
  }
  .font_size_14 {
    font-size: 14px;
  }
  .font_size_12 {
    font-size: 12px;
    color: #666666;
  }
  .font_size_22_bold {
    font-size: 22px;
    font-weight: bold;
  }
  .font_size_48 {
    font-size: 48px;
  }
  .module_gray {
    background-color: #666666;
    border-radius: 7px;
    
  }
  @media (min-width: 1200px) {
    .module .container {
      max-width: 1320px !important;
    }
  }
  .padding {
    padding: 5px;
  }
  .echarts {
    width: 100% !important;
    max-height: 180px;
  }
  .left_12 {
    float: left;
  }
  .card-body {
    padding: 15px !important;
  }
  .padding_15 {
    padding: 15px !important;
  }
  .panel_shadow {
    box-shadow: 0px 0px 10px 0px rgba(102, 102, 102, 1)
  }
  .heght_85 {
    border: 1px solid #CCCCCC;
    padding: 6px;
    border-radius: 10px;
  }
  .heght_85 .card-body {
    height: 85px;
    border-radius: 6px;
    border: 1px solid #E4E4E4;
  }
  .mt-2 .bg-success {
    background-color: rgba(51, 204, 0, 0.6) !important;
  }
  .mt-1 .bg-success {
    background-color: rgba(51, 204, 0, 0.6) !important;
  }
  .margin_top_15 {
    margin-top: 15px;
  }
  .margin_left_15 {
    margin-left: 15px;
  }
  .margin_left_25 {
    margin-left: -35px;
  }
</style>
