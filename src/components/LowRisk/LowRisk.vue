<template>
    <div class="LowRisk card_height">
        <div class="left_12">
            <icon name="inbox" class="margin_top_15 margin_left_15"></icon>&nbsp; <span class="font_size_12">正常占比生命曲线</span>
            <div style="display:inline-block;margin-left:14rem;"> <span class="green_icon"></span> </div>
        </div>
        <my-lowRiskLineChart :RiskInfo="RiskInfo" :hostNum="hostNum"></my-lowRiskLineChart>
    </div>
</template>

<script>
    import lowRiskLineChart from "./lowRiskLineChart.vue"
    export default {
        data() {
            return {};
        },
        components: {
            "my-lowRiskLineChart": lowRiskLineChart,
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
    .green_icon {
        width: 10px;
        height: 10px;
        background: #33CC00;
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-left: 25px;
        opacity: 0.6;
    }
</style>

