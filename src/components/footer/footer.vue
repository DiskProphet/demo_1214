<template>
    <div class="footer">
        <b-container class="bv-example-row">
            <b-row>
                <b-col cols="3" class="footer_button">
                    <div class="button_1 button_text">返回首页</div>
                    <div class="button_2 button_text">技术支持</div>
                    <div class="button_3 button_text">官方网站</div>
                </b-col>
                <b-col cols="5"></b-col>
                <b-col cols="4"><span class="footer_text">COPYRIGHT  PROPHETSTOR,INC.  2017</span></b-col>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @media (min-width: 1200px) {
        .container {
            max-width: 1320px;
        }
    }
    .footer {
        background-color: #000;
        color: rgba(255, 255, 255, 0.7);
        height: 50px;
        font-size: 12px;
        padding-top: 10px;
    }
    .footer_text {
        float: right;
        padding-top: 4px;
    }
    .footer_button {
        text-align: left;
    }
    .footer_button div {
        display: inline-block;
        padding: 2px;
        width: 70px;
        height: 26px;
        line-height: 26px;
        text-align: center;
        color: rgba(255, 255, 255, 0.7);
        cursor: pointer;
    }
    .footer_button .button_text:hover {
        background-color: rgba(255, 255, 255, 0.15);
        border-radius: 13px;
        color: rgba(255, 255, 255, 1);
    }
</style>
