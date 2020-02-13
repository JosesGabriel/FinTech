<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == 1 ? true : false" class="pa-5">
      <span class="body-1 font-weight-bold">Custom Date</span>
      <div class="py-3">
        <v-menu
          ref="menuFrom"
          v-model="menuFrom"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
          :dark="lightSwitch == 1 ? true : false"
          :menu-props="{ dark: lightSwitch == 0 ? true : false }"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="dateFromFormatted"
              label="From"
              color="success"
              class="body-2"
              readonly
              v-on="on"
              :dark="lightSwitch == 1 ? true : false"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateFrom"
            :dark="lightSwitch == 1 ? true : false"
            @input="menuFrom = false"
            no-title
            color="success darken-1"
          ></v-date-picker>
        </v-menu>
        <v-menu
          ref="menuTo"
          v-model="menuTo"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="290px"
          :dark="lightSwitch == 1 ? true : false"
          :menu-props="{ dark: lightSwitch == 1 ? true : false }"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="dateToFormatted"
              label="To"
              color="success"
              class="body-2"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="dateTo"
            :dark="lightSwitch == 1 ? true : false"
            :min="dateFrom"
            @input="menuTo = false"
            no-title
            color="success darken-1"
          ></v-date-picker>
        </v-menu>
      </div>
      <v-row no-gutters>
        <v-spacer></v-spacer>
        <v-btn
          @click.stop="show = false"
          @click="pushDate"
          class="success black--text font-weight-bold"
        >Ok</v-btn>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { LocalFormat } from "~/assets/js/helpers/datetime";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters({
      lightSwitch: "global/getLightSwitch"
    }),
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    },
    /**
     * Throw formatted date dateFrom
     *
     * @return  {string}  returns formatted date string
     */
    dateFromFormatted() {
      return this.dateFrom ? this.localFormat(this.dateFrom, "fs") : "";
    },
    /**
     * Throw formatted date dateTo
     *
     * @return  {string}  returns formatted date string
     */
    dateToFormatted() {
      return this.dateTo ? this.localFormat(this.dateTo, "fs") : "";
    }
  },
  data() {
    return {
      dateFrom: new Date().toISOString().substr(0, 10),
      dateTo: new Date().toISOString().substr(0, 10),
      menuFrom: false,
      menuTo: false
    };
  },
  watch: {
    /**
     * assign dateFrom to dateTo for minimum date of dateTo datepicker
     *
     * @return  {string}  pass dateFrom str to dateTo
     */
    dateFrom() {
      this.dateTo = this.dateFrom;
    }
  },
  methods: {
    localFormat: LocalFormat,
    /**
     * push back the desired date from and to
     *
     * @return  {object}  returns object from and to date
     */
    pushDate() {
      let date = {
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        state: "custom"
      };
      this.$emit("clicked", date);
    }
  }
};
</script>

<style>
.v-date-picker-table.v-date-picker-table--month.theme--dark {
  background: #00121e;
}
</style>