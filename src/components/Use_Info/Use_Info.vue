<template>
    <div class="Use_info">
        <my-modules :DiskProphetOverviewTable="DiskProphetOverviewTable" :HostSummaryUptimeWeek="HostSummaryUptimeWeek" :SystemCpu="SystemCpu" :SystemMemoryUsage="SystemMemoryUsage" :HostSummaryRootPathSpace="HostSummaryRootPathSpace" :DiskDiskUsageTotalUsedFree="DiskDiskUsageTotalUsedFree"
            :HDD="HDD" :SSD="SSD" :RiskInfo="RiskInfo" :hostNum="hostNum" :SSDOver45="SSDOver45" :HDDOver45="HDDOver45" :SSDLess45="SSDLess45" :HDDLess45="HDDLess45" :SSDLess30="SSDLess30" :HDDLess30="HDDLess30" :SSDLess14="SSDLess14" :HDDLess14="HDDLess14" :SSDTotal="SSDTotal"
            :HDDTotal="HDDTotal"></my-modules>
    </div>
</template>

<script>
    import someModule from "../someModule/someModule.vue";
    import axios from 'axios';
    import progressinfo from "../progress/progressInfo.vue"
    export default {
        data() {
            return {
                DiskProphetOverviewTable: {},
                HostSummaryUptimeWeek: [],
                SystemCpu: {},
                SystemMemoryUsage: {},
                HostSummaryRootPathSpace: {},
                DiskDiskUsageTotalUsedFree: {},
                HDD: {},
                SSD: {},
                RiskInfo: {},
                hostNum: "",
                SSDOver45: [],
                HDDOver45: [],
                SSDLess45: [],
                HDDLess45: [],
                SSDLess30: [],
                HDDLess30: [],
                SSDLess14: [],
                HDDLess14: [],
                SSDTotal: [],
                HDDTotal: []
            };
        },
        components: {
            "my-modules": someModule
        },
        created() {
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_name as "Name", life_expectancy as "Remaining Day Forecast", near_failure as "NearFailurePredictio", disk_serial_number AS "Serial Number", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model", max(predicted) as "Predicted" FROM autogen.sai_disk_prediction WHERE host_domain_id =~  /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/ GROUP BY disk_serial_number&epoch=ms`).then((response) => {
                this.DiskProphetOverviewTable = response.data.results[0];
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT last("uptime") AS "value" FROM "system" WHERE "host" =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)/`).then((response) => {
                this.HostSummaryUptimeWeek = response.data.results[0].series[0].values[0]
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT mean(usage_idle) as "idle", mean(usage_user) as "user", mean(usage_system) as "system", mean(usage_softirq) as "softirq", mean(usage_steal) as "steal", mean(usage_nice) as "nice", mean(usage_irq) as "irq", mean(usage_iowait) as "iowait", mean(usage_guest) as "guest", mean(usage_guest_nice) as "guest_nice"  FROM "cpu" WHERE "host" =~  /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/ and  cpu = 'cpu-total' AND time > now() - 30d GROUP BY time(6h), *&epoch=ms'`).then((response) => {
                this.SystemCpu = response.data.results && response.data.results[0].series[0]
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT mean("available_percent") AS "value" FROM "mem" WHERE "host" =~ /(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/ AND time > now() - 30d GROUP BY time(6h)&epoch=ms`).then((response) => {
                this.SystemMemoryUsage = response.data.results && response.data.results[0].series[0]
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT (mean("free"))/1024/1024/1024 AS "value" FROM "disk" WHERE "host" =~  /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/ AND "path" = '/' AND time > now() - 30d GROUP BY time(6h)&epoch=ms`).then((response) => {
                this.HostSummaryRootPathSpace = response.data.results && response.data.results[0].series[0]
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT mean(free) AS free,mean(used) AS used, mean(total) AS total FROM disk WHERE host =~ /(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)/ AND path = '/' AND time > now() - 30d GROUP BY time(6h)`).then((response) => {
                this.DiskDiskUsageTotalUsedFree = response.data.results && response.data.results[0].series[0];
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_type as "disk_type",size as "size" FROM sai_disk WHERE disk_type=7 and time > now() - 1h GROUP BY disk_type`).then((response) => {
                this.HDD = response.data.results && response.data.results[0].series[0];
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT disk_type as "disk_type",size as "size" FROM sai_disk WHERE disk_type=5 and time > now() - 1h GROUP BY disk_type`).then((response) => {
                this.SSD = response.data.results && response.data.results[0].series[0];
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT mean(very_likely_failure_disks) as "<14Days", mean(unknown_disks) as "<30Days",  mean(likely_failure_disks) as "<45Days" , mean(likely_good_disks) as ">45Days"FROM autogen.sai_host_status WHERE host_domain_id != 'agent-master' AND host_domain_id != 'localhost.localdomain' AND time < now() GROUP BY time(1d)`).then((response) => {
                this.RiskInfo = response.data.results && response.data.results[0].series[0];
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT cluster_domain_id FROM autogen.sai_host_status WHERE host_domain_id != 'agent-master' AND host_domain_id != 'localhost.localdomain' GROUP BY host_domain_id`).then((response) => {
                this.hostNum = response.data.results && response.data.results[0].series.length;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '>45 Days' AND disk_type = 'SSD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.SSDOver45 = response.data.results && response.data.results[0].series;
                console.log(this.SSDOver45, 'SSDOver45')
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '>45 Days' AND disk_type = 'HDD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.HDDOver45 = response.data.results && response.data.results[0].series;
                console.log(this.HDDOver45, 'HDDOver45')
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<45 Days' AND disk_type = 'SSD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.SSDLess45 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<45 Days' AND disk_type = 'HDD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.HDDLess45 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<30 Days' AND disk_type = 'SSD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.SSDLess30 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<30 Days' AND disk_type = 'HDD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.HDDLess30 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<14 Days' AND disk_type = 'SSD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.SSDLess14 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE near_failure = '<14 Days' AND disk_type = 'HDD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.HDDLess14 = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE disk_type = 'SSD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.SSDTotal = response.data.results && response.data.results[0].series;
                console.log(this.SSDTotal, " this.SSDTotal")
            }).catch((e) => {});
            axios.get(`/proxy/1/query?db=telegraf&q=SELECT near_failure as "near_failure", disk_vendor as "Disk Vendor", disk_type as "Disk Type", disk_model as "Disk Model" FROM autogen.sai_disk_prediction WHERE disk_type = 'HDD SATA' AND host_domain_id =~ /^(daowoo-idc-10|daowoo-idc-11|daowoo-idc-12)$/   group by disk_serial_number`).then((response) => {
                this.HDDTotal = response.data.results && response.data.results[0].series;
            }).catch((e) => {});
        },
    }
</script>



<style>
    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
</style>
