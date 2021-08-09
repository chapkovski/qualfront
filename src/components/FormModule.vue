<template>
  <form method="post" id="mturk_form" :action="action" ref="form">
    <input type="hidden" name="assignmentId" :value="assignmentId" />
    <div v-for="i in items" :key="i.value" class='my-3'>
      <v-card>
        <v-card-text>
          <div class="d-flex align-center justify-center">
          <v-img
            max-height="300"
            max-width="500"
            :src="require(`@/assets/img/${i.img}.png`)"
          ></v-img>

          <v-radio-group v-model="i.answer">
            <v-radio
              v-for="choice in choices"
              :key="choice.value"
              :value="choice.value"
              :name="`answer_${i.value}`"
            >
              <template v-slot:label>
                <div v-html="choice.label"></div>
              </template>
            </v-radio>
          </v-radio-group>
          </div>
        </v-card-text>
      </v-card>
      <v-divider></v-divider>
    </div>

    <v-btn
      elevation="2"
      @click="submittingForm"
      :disabled="!submittable"
      color="primary"
      >Submit</v-btn
    >
  </form>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import { differenceInSeconds } from "date-fns";
const liveMturk = "https://www.mturk.com/mturk/externalSubmit";
const sandboxMturk = "https://workersandbox.mturk.com/mturk/externalSubmit";

export default {
  data: () => {
    let items = [
      { corr_answer: 0, answer: null, img: "norm_down" },
      { corr_answer: 0, answer: null, img: "norm_up" },
      { corr_answer: 1, answer: null, img: "down" },
    ];
    items = _.shuffle(items);
    return {
      startTime: new Date(),
      endTime: null,
      timeSpent: null,
      action: null,
      assignmentId: "ASSIGNMENT_ID_NOT_AVAILABLE",
      sandbox: true,
      hitId: null,
      workerId: null,
      items: items,
      choices: [
        {
          value: 0,
          label:
            "<span class='green--text font-weight-bold'>No anomaly: </span>Time series with good data quality",
        },
        {
          value: 1,
          label:
            "<span class='red--text font-weight-bold'>Anomaly: </span>Time series with downward spike(s)",
        },
        {
          value: 2,
          label:
            "<span class='red--text font-weight-bold'>Anomaly: </span>Time series with upward spike(s)",
        },
      ],
      submittable: false,
    };
  },
  created() {},
  computed: {
    ...mapState([]),
    options() {
      const shuffled_nonoki = _.shuffle(this.non_oki);
      return [oki, ...shuffled_nonoki];
    },
  },
  watch: {
    items: {
      deep: true,
      handler(v) {
        const answers = _.map(v, (i) => i.answer);
        if (_.every(answers, _.isNumber)) this.submittable = true;
      },
    },
  },
  mounted() {
    ({
      sandbox: this.sandbox,
      assignmentId: this.assignmentId,
      hitId: this.hitId,
      workerId: this.workerId,
      bunch: this.bunch,
    } = this.$route.query);
    if (parseInt(this.sandbox) === 1) {
      this.action = sandboxMturk;
    } else {
      this.action = liveMturk;
    }
  },
  methods: {
    async submittingForm() {
      this.endTime = new Date();
      this.timeSpent = differenceInSeconds(this.endTime, this.startTime);
      this.submittable = false;
      const ddbUrl = "something else to post qual data";
      await axios.post(ddbUrl, {
        assignmentId: this.assignmentId,
        hitId: this.hitId,
        workerId: this.workerId,
        sandbox: this.sandbox,
        answers: items,
        timeSpent: this.timeSpent,
        startTime: this.startTime,
        endTime: this.endTime,
      });
      this.$refs.form.submit();
    },
  },
};
</script>
