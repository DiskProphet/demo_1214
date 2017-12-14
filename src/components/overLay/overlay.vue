<template>
    <div class="overlay">
        <b-modal id="modallg" size=" lg" class="xlg" title="磁盘状况" v-b-modal.modalPrevent>
            <div id="process_main">
                <b-card no-body>
                    <b-tabs card>
                        <b-tab title="OverView" active>
                            <b-container class="bv-example-row">
                                <b-row>
                                    <b-col lg="4" md="4" sm="12">
                                        <process-left :curIndex="curIndex" :DiskProphetOverviewTable="DiskProphetOverviewTable"></process-left>
                                    </b-col>
                                    <b-col lg="8" md="8" sm="12" class="right">
                                        <process-right :curIndex="curIndex"></process-right>
                                    </b-col>
                                </b-row>
                            </b-container>
                        </b-tab>
                        <b-tab title="Vendor">
                            Vendor Tab
                        </b-tab>
                        <b-tab title="hosts">
                            hosts Tab
                        </b-tab>
                        <b-tab title="Time">
                            Time Tab
                        </b-tab>
                    </b-tabs>
                </b-card>
            </div>
        </b-modal>
         
    </div>
</template>
<script>
    import processLeft from "../progress/processLeft.vue";
    import processRight from "../progress/processRight.vue";
    export default {
        data() {
            return {
                counter: 100,
                max: 100,
                curIndex: 0,
                curSelectedItem: []
            };
        },
        components: {
            "process-left": processLeft,
            "process-right": processRight
        },
        props: {
            DiskProphetOverviewTable: {
                type: Object
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mouseChange header {
        cursor: move;
    }
    .mouseChange .card-body {
        cursor: pointer;
    }
    .xlg .modal-dialog {
        width: 90% !important;
        max-width: 90% !important;
    }
    .right {
        max-height: 200px;
        overflow-y: scroll;
    }
</style>
