<template>
    <div class="Load  panel_shadow card_height">
        <div class="left_12">
            <icon name="inbox" class="margin_top_15 margin_left_15"></icon>&nbsp; <span class="font_size_12">负载情况</span>
            <div style="display:inline-block;margin-left:16rem;"> <span class="green3_icon"></span> <span class="green2_icon"></span><span class="green1_icon"></span></div>
        </div>
        <my-loadLineChart :RiskInfo="RiskInfo" :hostNum="hostNum"></my-loadLineChart>
    </div>
</template>

<script>
    import loadLineChart from "./loadLineChart.vue"
    export default {
        data() {
            return {};
        },
        components: {
            "my-loadLineChart": loadLineChart,
        },
        props: {
            RiskInfo: {
                type: Object
            },
            hostNum: ""
        },
    };
</script>
<style scoped>
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
    .card_height {
        height: 160px;
        background: #fff;
         border-radius: 6px;
    }
    .green1_icon {
        width: 10px;
        height: 10px;
        background: rgba(51, 204, 0, 0.3);
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;
    }
    .green2_icon {
        width: 10px;
        height: 10px;
        background: rgba(51, 204, 0, 0.45);
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;
    }
    .green3_icon {
        width: 10px;
        height: 10px;
        background: rgba(51, 204, 0, 0.6);
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;
    }
</style>
