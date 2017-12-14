<template>
    <div id="process_main">
        <b-container class="bv-example-row top_radius">
            <b-row class="text-center">
                <b-col lg="2" md="2" sm="12">
                    <b-button class="top_button">已监控磁盘 {{totalhost}}个</b-button>
                </b-col>
                <b-col lg="10" md="10" sm="12">
                    <b-progress class="mt-2" :max="max" show-value>
                        <b-progress-bar :value="disk_success" variant="success"></b-progress-bar>
                    </b-progress>
                </b-col>
            </b-row>
        </b-container>
        <b-card no-body>
            <b-tabs card>
                <b-tab title="总览" active>
                    <b-container class="bv-example-row">
                        <b-row class="text-center">
                            <b-col lg="2" md="2" sm="12">
                                <process-left :curIndex="curIndex" :DiskProphetOverviewTable="DiskProphetOverviewTable"></process-left>
                            </b-col>
                            <b-col lg="10" md="10" sm="12" class="right">
                                <process-right :curIndex="curIndex"></process-right>
                            </b-col>
                        </b-row>
                    </b-container>
                </b-tab>
                <b-tab title="按主机">
                    <br>I'm the second tab content
                </b-tab>
                <b-tab title="按厂商">
                    <br>Disabled tab!
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>
<script>
    import processLeft from "./processLeft.vue";
    import processRight from "./processRight.vue";
    import axios from 'axios';
    export default {
        data() {
            return {
                counter: 100,
                max: 100,
                curIndex: 0,
                curSelectedItem: [],
                DiskProphetOverviewTable: {}
            };
        },
        created() {
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_name as "Name", life_expectancy as "Remaining Day Forecast", near_failure as "NearFailurePredictio", disk_serial_number AS "Serial Number", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model", max(predicted) as "Predicted" FROM autogen.sai_disk_prediction  WHERE host_domain_id =~  /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/ GROUP BY disk_serial_number`).then((response) => {
                this.DiskProphetOverviewTable = response.data.results[0];
            });
        },
        components: {
            "process-left": processLeft,
            "process-right": processRight
        },
        computed: {
            totalhost() {
                if (this.DiskProphetOverviewTable.series === undefined) {
                    return "..."
                }
                return this.DiskProphetOverviewTable.series.length
            },
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
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mouseChange header {
        cursor: move;
    }
    .mouseChange .card-body {
        cursor: pointer;
    }
    @media (min-width: 1200px) {
        .bv-example-row.container {
            max-width: 1320px !important;
        }
    }
    .top_radius>.text-center {
        border: 2px solid #ccc;
        border-radius: 8px;
        margin: 1rem 0;
    }
    .top_button {
        width: 100%;
        margin-left: -1.5rem;
    }
</style>
