<template>
    <chart :options="options" class="mediumRiskLineChart_canvas">
    </chart>
</template>

<script>
    import VueECharts from 'vue-echarts'
    import axios from 'axios';
    export default {
        data() {
            return {
                DiskProphetOverviewTable: {}
            }
        },
        created() {
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_name as "Name", life_expectancy as "Remaining Day Forecast", near_failure as "NearFailurePredictio", disk_serial_number AS "Serial Number", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model", max(predicted) as "Predicted" FROM autogen.sai_disk_prediction WHERE host_domain_id != 'agent-master' AND host_domain_id != 'localhost.localdomain'  GROUP BY disk_serial_number&epoch=ms`).then((response) => {
                this.DiskProphetOverviewTable = response.data.results[0];
            });
        },
        props: {
            RiskInfo: {
                type: Object
            },
            hostNum: "",
        },
        computed: {
            totalhost() {
                if (this.DiskProphetOverviewTable.series === undefined) {
                    return "..."
                }
                return this.DiskProphetOverviewTable.series.length
            },
            startData() {
                if (this.RiskInfo.values === undefined) {
                    return 0;
                }
                console.log(this.RiskInfo.values[0][0])
                return (this.RiskInfo.values[0][0]);
            },
            // options: function() {
            //     var date = [];
            //     var data = [];
            //     if (this.RiskInfo.values) {
            //         for (var i = 0; i < this.RiskInfo.values.length; i++) {
            //             var now = new Date(this.RiskInfo.values[i][0]);
            //             date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
            //             data.push(((this.RiskInfo.values[i][3] * (this.hostNum)) / this.totalhost * 100).toFixed(1));
            //         }
            //     }
            //     return {
            //         tooltip: {
            //             trigger: 'axis',
            //             position: function(pt) {
            //                 return [pt[0], '10%'];
            //             }
            //         },
            //         title: {
            //             left: 'center',
            //             text: '中风险',
            //         },
            //         toolbox: {
            //             feature: {
            //                 restore: {},
            //                 saveAsImage: {}
            //             }
            //         },
            //         xAxis: {
            //             type: 'category',
            //             boundaryGap: false,
            //             data: date
            //         },
            //         yAxis: {
            //             type: 'value',
            //             boundaryGap: [0, '50%']
            //         },
            //         dataZoom: [{
            //             type: 'inside',
            //             start: 0,
            //             end: 10
            //         }, {
            //             start: 0,
            //             end: 10,
            //             handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
            //             handleSize: '80%',
            //             handleStyle: {
            //                 color: '#fff',
            //                 shadowBlur: 3,
            //                 shadowColor: 'rgba(0, 0, 0, 0.6)',
            //                 shadowOffsetX: 2,
            //                 shadowOffsetY: 2
            //             }
            //         }],
            //         series: [{
            //             name: '数据占比',
            //             type: 'line',
            //             smooth: true,
            //             symbol: 'none',
            //             sampling: 'average',
            //             itemStyle: {
            //                 normal: {
            //                     color: 'yellow'
            //                 }
            //             },
            //             areaStyle: {
            //                 normal: {
            //                     color: 'yellow'
            //                 }
            //             },
            //             data: data
            //         }]
            //     }
            // }
            options: function() {
                return {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        boundaryGap: false,
                        data: ['9/25', '10/04', '10/11', '10/18', '10/25', '11/04', '当前']
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                            name: '高风险',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(238,0,0,0.2)'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        },
                        {
                            name: '中风险',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(255,153,0,0.2)'
                                }
                            },
                            data: [220, 182, 191, 234, 290, 330, 310]
                        },
                        {
                            name: '低风险',
                            type: 'line',
                            stack: '总量',
                            areaStyle: {
                                normal: {
                                    color: 'rgba(102,153,255,0.2)'
                                }
                            },
                            data: [150, 232, 201, 154, 190, 330, 410]
                        }
                    ]
                }
            }
        }
    }
</script>
<style scoped>
    .echarts {
        max-height: 160px !important;
        top: -41px !important;
    }
</style>
