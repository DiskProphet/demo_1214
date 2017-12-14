<template>
    <div class="HDD  panel_shadow card_height">
        <b-container class="bv-example-row">
            <b-row class="text-center">
                <b-col cols="12" class="margin_left_25">
                    <icon name="inbox" class="margin_top_15"></icon>&nbsp; <span class="font_size_12"> 机械硬盘 100TB</span>
                </b-col>
            </b-row>
            <b-row class="text-center">
                <b-col cols="12">
                    <span class="font_size_14">已使用</span><br> <span class="font_size_22_bold">{{HDD_string}} </span><br>
                    <b-progress class="mt-1" :max="max" show-value>
                        <b-progress-bar :value="counter*(HDD_num/DiskUsageTotal)" variant="success" :label="(counter*(HDD_num/DiskUsageTotal)).toFixed(0)+'%'"></b-progress-bar>
                    </b-progress>
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
                curIndex: 0
            };
        },
        props: {
            HDD: {
                type: Object
            },
            DiskDiskUsageTotalUsedFree: {
                type: Object
            }
        },
        computed: {
            HDD_num() {
                if (this.HDD.values === undefined) {
                    return 0;
                }
                var reg = new RegExp("[A-Za-z]", "g");
                var HDD_num = this.HDD.values[this.HDD.values.length - 3][2].replace(reg, "");
                console.log(+HDD_num, 'HDD_num')
                return +HDD_num
            },
            HDD_string() {
                if (this.HDD.values === undefined) {
                    return 0;
                }
                return (this.HDD.values[this.HDD.values.length - 3][2]);
            },
            DiskUsageTotal() {
                if (this.DiskDiskUsageTotalUsedFree.values === undefined) {
                    return 0;
                }
                return (this.DiskDiskUsageTotalUsedFree.values[this.DiskDiskUsageTotalUsedFree.values.length - 2][3]) / 1024 / 1024;
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .card_height {
        height: 160px;
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
</style>
