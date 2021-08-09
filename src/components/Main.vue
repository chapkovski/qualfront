<template>
  <v-container>
    <v-row>
 
      <v-col >
        <v-card>
          <v-card-title>Instructions:</v-card-title>
          <v-card-text class="text-left">
            <div>
              For each graph select if  <span class='font-weight-bold red--text'>there is any data anomaly </span> there,
              and if yes, which kind of anomaly you observe here.
            </div>
          </v-card-text>
        </v-card>
        <form-module></form-module>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState, mapGetters } from "vuex";
import FormModule from "@/components/FormModule.vue";

import DetailedChart from "@/components/DetailedChart.vue";
export default {
  components: {
    FormModule,
    DetailedChart,
  },
  data: () => ({}),
  created() {},
  computed: { ...mapState(["dataLoading", "data"]) },
  watch: {},
  async mounted() {},
};
</script>
