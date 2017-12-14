<template>
    <div class="cpu  panel_shadow card_height">
        <icon name="server" class="margin_top_15"  style="margin-left:-93px;"></icon>&nbsp;<span class="font_size_12">CPU 利用率</span>
        <chart :options="options" class="cpu_canvas">
        </chart>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                max: 100
            };
        },
        props: {
            SystemCpu: {
                type: Object
            }
        },
        computed: {
            cpuUseage() {
                if (this.SystemCpu.values === undefined) {
                    return 0;
                }
                console.log(this.SystemCpu.values[this.SystemCpu.values.length - 2][1], 'aaa')
                return this.SystemCpu.values[this.SystemCpu.values.length - 2][1];
            },
            options: function() {
                return {
                    series: [{
                        type: 'pie',
                        radius: ['50%', '70%'],
                        color: ['rgba(51, 204, 0, 0.6) ', '#fff'],
                        borderColor: 'rgba(51, 204, 0, 0.6)',
                        avoidLabelOverlap: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'center',
                                textStyle: {
                                    fontSize: '20',
                                    fontWeight: 'bold',
                                    color: '#000'
                                }
                            },
                        },
                        labelLine: {
                            normal: {
                                show: true,
                            }
                        },
                        data: [{
                            value: this.cpuUseage,
                            name: (this.cpuUseage).toFixed(1) + '%',
                            hoverAnimation: false,
                        }, {
                            value: 100 - this.cpuUseage,
                        }, ]
                    }]
                }
            }
        }
    }
</script>

<style scoped>
    .mouseChange header {
        cursor: move;
    }
    #chart {
        position: relative;
        left: 47%;
        width: 90%;
        min-height: 200px;
        margin-left: -45%;
        border-radius: 10px;
    }
    @media screen and (max-width: 470px) {
        #chart {
            height: 100%;
            width: 100%;
        }
    }
    .card_height {
        height: 160px;
        background: #fff;
         border-radius: 6px;
    }
    .cpu_canvas {
            margin-top: -16px;
    margin-left: 10px;
    }
    .echarts {
        max-height: 150px !important;
         max-width: 175px !important;
    }   
</style>
