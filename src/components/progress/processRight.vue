<template>
  <div class="Progress_right">
    <b-table striped :items="information" :fields="fields">
    </b-table>
  </div>
</template>

<script>
  import _ from "lodash";
  export default {
    data() {
      return {
        fields: ['time', 'Name', 'Remaining Day Forecast', 'NearFailurePredictio', 'Serial Number', 'Disk Vendor', 'Disk Type', 'Disk Model', 'Predicted'],
        fields: [{
            key: 'time',
            sortable: true
          },
          {
            key: 'Name',
            sortable: true
          },
          {
            key: 'Remaining Day Forecast',
            sortable: true,
          },
          {
            key: 'NearFailurePredictio',
            sortable: true,
          },
          {
            key: 'Serial Number',
            sortable: true,
          },
          {
            key: 'Disk Vendor',
            sortable: true,
          },
          {
            key: 'Disk Type',
            sortable: true,
          },
          {
            key: 'Disk Model',
            sortable: true,
          },
          {
            key: 'Predicted',
            sortable: true,
          }
        ],
        information: []
      };
    },
    created() {
      this.$bus.$on('overview_tab_message', this.onReceive);
    },
    methods: {
      onReceive(content) {
        // this.information.push(_.merge(content))
        // //_.map(_.toPairs(content), d => _.fromPairs([d]));
        this.information = content
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
