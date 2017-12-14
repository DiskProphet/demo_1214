<template>
    <div class="HighRisk">
        <b-card-group deck>
            <b-card  no-body>
                <b-card-body variant="primary">
                    <my-highRiskLineChart :RiskInfo="RiskInfo" :hostNum="hostNum"></my-highRiskLineChart>
                </b-card-body>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
    import highRiskLineChart from "./highRiskLineChart"
    export default {
        data() {
            return {};
        },
        components: {
            "my-highRiskLineChart": highRiskLineChart,
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
</style>
