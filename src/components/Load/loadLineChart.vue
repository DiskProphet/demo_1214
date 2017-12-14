<template>
    <chart :options="options">
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
            options: function() {
                // var posList = [
                //     'left', 'right', 'top', 'bottom',
                //     'inside',
                //     'insideTop', 'insideLeft', 'insideRight', 'insideBottom',
                //     'insideTopLeft', 'insideTopRight', 'insideBottomLeft', 'insideBottomRight'
                // ];
                // app.configParameters = {
                //     rotate: {
                //         min: -90,
                //         max: 90
                //     },
                //     // align: {
                //     //     options: {
                //     //         left: 'left',
                //     //         center: 'center',
                //     //         right: 'right'
                //     //     }
                //     // },
                //     // verticalAlign: {
                //     //     options: {
                //     //         top: 'top',
                //     //         middle: 'middle',
                //     //         bottom: 'bottom'
                //     //     }
                //     // },
                //     // distance: {
                //     //     min: 0,
                //     //     max: 100
                //     // }
                // };
                app.config = {
                    rotate: 90,
                    align: 'left',
                    verticalAlign: 'middle',
                    position: 'insideBottom',
                    distance: 15,
                    // onChange: function() {
                    //     var labelOption = {
                    //         normal: {
                    //             rotate: app.config.rotate,
                    //             align: app.config.align,
                    //             verticalAlign: app.config.verticalAlign,
                    //             position: app.config.position,
                    //             distance: app.config.distance
                    //         }
                    //     };
                    //     myChart.setOption({
                    //         series: [{
                    //             label: labelOption
                    //         }, {
                    //             label: labelOption
                    //         }, {
                    //             label: labelOption
                    //         }, {
                    //             label: labelOption
                    //         }]
                    //     });
                    // }
                };
                var labelOption = {
                    normal: {
                        show: true,
                        position: app.config.position,
                        distance: app.config.distance,
                        align: app.config.align,
                        verticalAlign: app.config.verticalAlign,
                        rotate: app.config.rotate,
                        formatter: '{c}  {name|{a}}',
                        fontSize: 16,
                        rich: {
                            name: {
                                textBorderColor: '#fff'
                            }
                        }
                    }
                }
                return {
                    color: ['rgba(51, 204, 0, 0.3)', 'rgba(51, 204, 0, 0.45)', 'rgba(51, 204, 0, 0.6)'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    toolbox: {
                        show: false,
                        orient: 'vertical',
                        left: 'right',
                        top: 'center',
                        feature: {
                            mark: {
                                show: false
                            },
                            dataView: {
                                show: false,
                                readOnly: false
                            },
                            magicType: {
                                show: false,
                                type: ['line', 'bar', 'stack']
                            },
                            restore: {
                                show: false
                            },
                            saveAsImage: {
                                show: false
                            }
                        }
                    },
                    calculable: false,
                    xAxis: [{
                        type: 'category',
                        axisTick: {
                            show: false
                        },
                        data: ['9/25', '10/04', '10/11', '10/18', '10/25']
                    }],
                    yAxis: [{
                        type: 'value'
                    }],
                    series: [{
                            name: 'Forest',
                            type: 'bar',
                            barGap: 0,
                            data: [5, 12, 16, 11, 14]
                        },
                        {
                            name: 'Steppe',
                            type: 'bar',
                            data: [2, 14, 18, 9, 10]
                        },
                        {
                            name: 'Desert',
                            type: 'bar',
                            data: [17, 15, 5, 3, 8]
                        }
                    ]
                }
            }
        }
    }
</script>
<style scoped>
    .echarts {
        top: -41px !important;
    }
</style>
