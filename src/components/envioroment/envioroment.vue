<template>
    <div class="envioroment panel_shadow card_height">
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="12">
                    <select class="select margin_top_15">
                          <option value="volvo">Volvo</option>
                          <option value="saab">Saab</option>
                          <option value="opel">Opel</option>
                          <option value="audi">Audi</option>
                        </select>
                </b-col>
            </b-row>
            <b-row class="text-center" style="margin-top:15px">
                <b-col cols="7">
                    <span class="font_size_14">健康状况 <br>     <span class="font_size_48">96</span></span>
                </b-col>
                <b-col cols="5">
                    <div>
                        <span class="green_icon"></span>
                        <span class="iconText font_size_12">资源 充足</span>
                    </div>
                    <div>
                        <span class="yellow_icon"></span>
                        <span class="iconText font_size_12">寿命 存在风险</span>
                    </div>
                    <div>
                        <span class="green_icon"></span>
                        <span class="iconText font_size_12">温度 正常</span>
                    </div>
                </b-col>
            </b-row>
            <br> <br>
            <b-row class="text-center">
                <b-col cols="6" class="padding_none">
                    <b-card class="text-center heght_85" style="margin-left:15px;margin-right:7.5px;margin-top:14px">
                        <icon name="list-alt"></icon>&nbsp;<span class="font_size_14">主机数量</span> <br><span class=" font_size_22_bold">{{totalhost}}</span>
                    </b-card>
                </b-col>
                <b-col cols="6" class="padding_none">
                    <b-card class="text-center heght_85" style="margin-left:7.5px;margin-right:15px;margin-top:14px">
                        <icon name="eye"></icon>&nbsp; <span class="font_size_14">已监控</span> <br><span class=" font_size_22_bold">{{days}}天 {{hours}}小时</span>
                    </b-card>
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
            };
        },
        props: {
            HostSummaryUptimeWeek: {
                type: Array
            },
            DiskProphetOverviewTable: {
                type: Object
            }
        },
        computed: {
            days() {
                let days = this.HostSummaryUptimeWeek[1] / 60 / 60 / 24;
                return Math.floor(days)
            },
            hours() {
                let days = this.HostSummaryUptimeWeek[1] / 60 / 60 / 24;
                return Math.round((days % 1) * 24)
            },
            totalhost() {
                if (this.DiskProphetOverviewTable.series === undefined) {
                    return "..."
                }
                return this.DiskProphetOverviewTable.series.length
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .card_height {
        height: 330px;
        background: #fff;
        border-radius: 6px;
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
    .text-center>.card-body {
        background: linear-gradient(to top, #FFFFFF, #E4E4E4);
    }
    .padding_none {
        padding-left: 0px;
        padding-right: 0px;
    }
    .green_icon {
        width: 10px;
        height: 10px;
        background: #33CC00;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
    }
    .yellow_icon {
        width: 10px;
        height: 10px;
        background: #FF9900;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
    }
    .iconText {
        margin-left: -1rem;
        margin-top: -1rem;
    }
    .select {
        width: 100%;
        color: #666666;
        font-size: 14px;
        height: 32px;
        border-radius: 5px;
        font-weight: 400;

    }
    .select option:hover {
        background: rgba(102, 153, 255, 0.2) !important;
    }
</style>
