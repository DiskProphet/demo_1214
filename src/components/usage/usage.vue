<template>
    <div class="usage  panel_shadow card_height">
        <icon name="floppy-o" class="margin_top_15" style="margin-left:-93px"></icon>&nbsp; <span class="font_size_12">内存利用率</span>
        <chart :options="options" class="usage_canvas">
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
            SystemMemoryUsage: {
                type: Object
            }
        },
        computed: {
            memoryUsage() {
                if (this.SystemMemoryUsage.values === undefined) {
                    return 10;
                }
                return this.SystemMemoryUsage.values[this.SystemMemoryUsage.values.length - 2][1]
            },
            options: function() {
                return {
                    series: [{
                        type: 'pie',
                        radius: ['50%', '70%'],
                        color: ['rgba(51, 204, 0, 0.6)', '#fff'],
                        borderColor: '#rgba(51, 204, 0, 0.6)',
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
                                show: false,
                            }
                        },
                        data: [{
                            value: this.memoryUsage,
                            name: (this.memoryUsage).toFixed(1) + '%',
                            hoverAnimation: false,
                        }, {
                            value: 100 - this.memoryUsage,
                        }, ]
                    }]
                }
            }
        }
    };
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
    .usage_canvas {
        margin-top: -16px;
        margin-left: 10px;
    }
    .echarts {
        max-height: 150px !important;
        max-width: 175px !important;
    }
</style>
