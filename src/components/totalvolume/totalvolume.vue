<template>
    <div class="totalvolume  panel_shadow card_height">
        <b-container class="bv-example-row">
            <b-row class="text-center">
                <b-col cols="5" style="margin-left:-23x">
                    <span class="font_size_12 my-icon my-icon-cluster">存储资源总览</span></b-col>
            </b-row>
            <b-row class="text-center">
                <b-col cols="5"><br><span class="font_size_14">已使用：</span><span class="font_size_22_bold">{{((DiskUsageUsed/(DiskUsageUsed+DiskUsageFree))*100).toFixed(0)+'%'}}</span></b-col>
                <b-col cols="7" class="left">
                    <div><span class="green_border_icon"></span><span class="iconText font_size_12">总量 {{DiskUsageTotal.toFixed(0)}} TB</span></div>
                    <div><span class="green_icon"></span><span class="iconText font_size_12">已使用 {{DiskUsageUsed.toFixed(0)}} GB</span></div>
                    <div><span class="none_icon"></span><span class="iconText font_size_12">未使用 {{DiskUsageFree.toFixed(0)}} GB</span></div>
                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    import Icon from 'vue-awesome/components/Icon'
    import 'vue-awesome/icons'

    export default {
        data() {
            return {
                max: 100,
                curIndex: 0
            };
        },
        props: {
            HostSummaryRootPathSpace: {
                type: Object
            },
            DiskDiskUsageTotalUsedFree: {
                type: Object
            }
        },
        computed: {
            DiskUsageFree() {
                if (this.DiskDiskUsageTotalUsedFree.values === undefined) {
                    return 0;
                }
                return (this.DiskDiskUsageTotalUsedFree.values[this.DiskDiskUsageTotalUsedFree.values.length - 2][1]) / 1024 / 1024;
            },
            DiskUsageUsed() {
                if (this.DiskDiskUsageTotalUsedFree.values === undefined) {
                    return 0;
                }
                return (this.DiskDiskUsageTotalUsedFree.values[this.DiskDiskUsageTotalUsedFree.values.length - 2][2]) / 1024 / 1024;
            },
            DiskUsageTotal() {
                if (this.DiskDiskUsageTotalUsedFree.values === undefined) {
                    return 0;
                }
                return (this.DiskDiskUsageTotalUsedFree.values[this.DiskDiskUsageTotalUsedFree.values.length - 2][3]) / 1024 / 1024 / 1024;
            }
        },
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    .green_icon {
        width: 10px;
        height: 10px;
        background: #33CC00;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
    }
    .green_border_icon {
        width: 10px;
        height: 10px;
        background: #33CC00;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
        border: 1px solid #ccc;
    }
    .yellow_icon {
        width: 10px;
        height: 10px;
        background: #FF9900;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
    }
    .none_icon {
        width: 10px;
        height: 10px;
        margin-top: 7px;
        border-radius: 50%;
        float: left;
        border: 1px solid #ccc;
    }
    .iconText {
        margin-left: -3rem;
        margin-top: -1rem;
    }
    .my-icon {
        position: relative;
    }
    .my-icon::before {
            content: ' ';
    width: 12px !important;
    height: 12px !important;
    position: absolute;
        left: -14px;
    top: 1px;
    display: block;
    }
    .my-icon-cluster:before {
        background-image: url('../svg/cluster.svg')
    }
</style>
