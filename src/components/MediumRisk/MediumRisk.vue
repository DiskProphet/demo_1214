<template>
    <div class="MediumRisk  panel_shadow card_height">
        <div class="left_12">
            <icon name="inbox" class="margin_top_15 margin_left_15"></icon>&nbsp; <span class="font_size_12">风险占比生命曲线</span>
            <div style="display:inline-block;margin-left:14rem;"> <span class="blue_icon"></span><span class="yellow_icon"></span><span class="red_icon"></span> </div>
        </div>
        <my-mediumRiskLineChart :RiskInfo="RiskInfo" :hostNum="hostNum"></my-mediumRiskLineChart>
    </div>
</template>

<script>
    import mediumRiskLineChart from "./mediumRiskLineChart.vue"
    export default {
        data() {
            return {};
        },
        components: {
            "my-mediumRiskLineChart": mediumRiskLineChart,
        },
        props: {
            RiskInfo: {
                type: Object
            },
            hostNum: ""
        },
    };
</script>
<style>
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
    .red_icon {
        width: 10px;
        height: 10px;
        background: #EE0000;
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;
        opacity: 0.6;
    }
    .yellow_icon {
        width: 10px;
        height: 10px;
        background: #FF9900;
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;opacity: 0.6;
    }
    .blue_icon {
        width: 10px;
        height: 10px;
        background: #6699FF;
        border-radius: 50%;
        float: right;
        margin-top: 6px;
        margin-right: 3px;opacity: 0.6;
    }
</style>
