<template>
  <v-col class="pa-0" ref="componentWrapper">
    <v-card
      flat
      tile
      :class="toggleSpace ? 'pa-5' : ''"
      :color="lightSwitch == 1 ? 'darkcard' : 'lightcard'"
    >
      <!-- Don't remove ref value. Used for sharing -->
      <v-card-title class="text-left justify-center align-center px-0 py-3 pt-5">
        <v-col class="pa-0 pr-3 mr-n10" cols="12" sm="4" md="4">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            label="Search"
            outlined
            dense
            hide-details
            :dark="lightSwitch == true"
            color="success"
            class="tl_searchfields"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-btn
          small
          dark
          text
          color="success"
          @click="filterDate('all')"
          class="body-2 text-capitalize"
          elevation="0"
        >All</v-btn>
        <v-btn
          small
          dark
          text
          color="success"
          @click="filterDate('day')"
          class="body-2 text-capitalize"
          elevation="0"
        >Day</v-btn>
        <v-btn
          small
          dark
          text
          color="success"
          @click="filterDate('week')"
          class="body-2 text-capitalize"
          elevation="0"
        >Week</v-btn>
        <v-btn
          small
          dark
          text
          color="success"
          @click="filterDate('month')"
          class="body-2 text-capitalize"
          elevation="0"
        >Month</v-btn>
        <v-btn
          small
          dark
          text
          color="success"
          @click="filterDate('year')"
          class="body-2 text-capitalize"
          elevation="0"
        >Year</v-btn>
        <v-btn
          small
          dark
          text
          color="success"
          @click.stop="showCustomDate=true"
          class="body-2 text-capitalize"
          elevation="0"
        >Custom</v-btn>
        <v-spacer></v-spacer>
        <v-btn icon small @click="showShareModal()" :dark="lightSwitch == 0 ? false : true">
          <v-icon small color="tertiary">mdi-share-variant</v-icon>
        </v-btn>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :search="search"
        :items="ledgerContent"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
        :dark="lightSwitch == true"
        :loading="liveLedgerLoading"
        loading-text="Loading..."
        class="data_table-container pl-10 secondary--text"
      >
        <template v-slot:item.count="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.count }}</span>
        </template>
        <template v-slot:item.created_at="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ localFormat(item.created_at, "fs") }}</span>
        </template>
        <template v-slot:item.action="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.action }}</span>
        </template>
        <template v-slot:item.debit="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.debit }}</span>
        </template>
        <template v-slot:item.credit="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.credit }}</span>
        </template>
        <template v-slot:item.balance="{ item }">
          <span class="pl-2" :style="{ color: fontcolor2 }">{{ item.balance | numeral("0,0.00") }}</span>
        </template>
        <template slot="footer">
          <v-row no-gutters class="mt-3">
            <v-spacer></v-spacer>
            <span
              style="width: 190px"
              class="text-right caption"
              :style="{ color: fontcolor2 }"
            >Total Funds:</span>
            <span
              style="width: 190px"
              class="text-right caption"
              :class="(totalDebit < 0 ? 'negative' : 'positive')"
            >{{ totalDebit | numeral("0,0.00") }}</span>
            <span
              style="width: 190px"
              class="text-right caption"
              :class="(totalCredit < 0 ? 'negative' : 'positive')"
            >{{ totalCredit | numeral("0,0.00") }}</span>
            <span style="width: 190px;" class="text-right subtitle-2"></span>
          </v-row>
        </template>
      </v-data-table>
      <v-card class="d-flex flex-row-reverse" color="transparent" elevation="0">
        <v-card color="transparent" elevation="0">
          <v-pagination
            class="d-flex flex-end lp_data_table-pagination"
            color="transparent"
            dark
            v-model="page"
            :length="pageCount"
          ></v-pagination>
        </v-card>
      </v-card>
      <share-modal
        v-if="showShareForm"
        :imageid="shareLink"
        @closeModal="showShareForm = false, toggleSpace = false"
      />
      <custom-date :visible="showCustomDate" @clicked="filterDate" @close="showCustomDate=false" />
    </v-card>
  </v-col>
</template>
<script>
import shareModal from "~/components/modals/Share";
import customDate from "~/components/modals/CustomDate";

import { LocalFormat } from "~/assets/js/helpers/datetime";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    shareModal,
    customDate
  },
  data() {
    return {
      shareLink: "",
      showShareForm: false,
      showCustomDate: false,
      liveLedgerLoading: "success",
      showScheduleForm: false,
      toggleSpace: false,
      itemsPerPage: 10,
      search: "",
      headers: [
        { text: "Count", value: "count", align: "center", sortable: false },
        { text: "Date", value: "created_at", align: "center" },
        { text: "Transaction", value: "action", align: "center" },
        { text: "Debit", value: "debit", align: "right", width: "190px" },
        { text: "Credit", value: "credit", align: "right", width: "190px" },
        { text: "Balance", value: "balance", align: "right", width: "190px" }
      ],
      ledgerContent: [],
      ledgerContentBackup: [],
      filter: [],
      page: 1,
      pageCount: 0,
      totalCredit: 0,
      totalDebit: 0,
      menuShow: false,
      date: new Date().toISOString().substr(0, 10)
    };
  },
  computed: {
    ...mapGetters({
      defaultPortfolioId: "journal/getDefaultPortfolioId",
      renderPortfolioKey: "journal/getRenderPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns secondary font color
     *
     * @return  {string}  returns string
     */
    fontColor() {
      return this.lightSwitch == 0 ? "#494949" : "#e5e5e5";
    },
    /**
     * returns tertiary font color
     *
     * @return  {string}  returns string
     */
    fontcolor2() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6"; // #eae8e8
    },
    /**
     * returns background color
     *
     * @return  {string}  returns string
     */
    cardbackground() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
    }
  },
  mounted() {
    if (this.defaultPortfolioId != 0 ? this.getLedgerLogs() : "");
  },
  watch: {
    /**
     * Watch defaultPortfolioId vuex if id changed perform function inside
     *
     * @return  {string}  getting the current portfolio id
     */
    defaultPortfolioId() {
      this.getLedgerLogs();
    },
    /**
     * Watch renderPortfolioKey vuex if key changed perform function inside
     *
     * @return  {number}  get increment key
     */
    renderPortfolioKey() {
      this.getLedgerLogs();
    }
  },
  methods: {
    localFormat: LocalFormat,
    /**
     * Capture components then draw to canvas and share
     *
     * @return  {image}  get captured components as canvas
     */
    async showShareModal() {
      this.toggleSpace = true;
      const el = this.$refs.componentWrapper;
      const options = {
        type: "dataURL"
      };
      this.shareLink = await this.$html2canvas(el, options);
      this.showShareForm = true;
    },
    /**
     * pushes object when user click the filter date buttons
     * Filters: All, Day, Week, Month, Year, Custom
     *
     * @param   {string}  str  watch the str which date filter should be used
     *
     * @return  {object}       returns objects
     */
    filterDate(str) {
      const now = new Date();
      //day date filter
      const d = new Date().getDate();
      //week date filter
      const fweek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      const dayWeek = fweek.getDate();
      const monthWeek = fweek.getMonth() + 1;
      // month date filter
      const fmonth = now.getMonth() + 1;
      // year date filter
      const fyear = now.getFullYear();

      this.ledgerContent = [];

      // Show all trades
      if (str == "all") {
        this.ledgerContent = this.ledgerContentBackup;
      }

      this.filter = this.ledgerContentBackup;
      let num = 0;

      for (let i = 0; i < this.filter.length; i++) {
        let fil_date = this.filter[i].created_at.split(" ")[0];
        const month = fil_date.split("-")[1];
        const year = fil_date.split("-")[0];
        const today = fil_date.split("-")[2];

        const dateFrom = this.localFormat(str.dateFrom, "unix");
        const dateTo = this.localFormat(str.dateTo, "unix");

        if (str == "day" && d == today && month == monthWeek) {
          this.ledgerContent.push(this.filter[i]);
        } else if (
          str == "week" &&
          today >= dayWeek &&
          month == monthWeek &&
          year == fyear
        ) {
          this.ledgerContent.push(this.filter[i]);
        } else if (str == "month" && month == fmonth && year == fyear) {
          this.ledgerContent.push(this.filter[i]);
        } else if (str == "year" && year == fyear) {
          this.ledgerContent.push(this.filter[i]);
        } else if (
          str.state == "custom" &&
          this.localFormat(this.filter[i].created_at, "unix") >= dateFrom &&
          this.localFormat(this.filter[i].created_at, "unix") <= dateTo
        ) {
          this.ledgerContent.push(this.filter[i]);
        }
      }
    },
    /**
     * Ledger gets update when getLedgerLogs triggered
     *
     * @return  {[array]} returned array
     */
    getLedgerLogs() {
      const ledgerparams = {
        fund: this.defaultPortfolioId
      };
      this.totalCredit = 0;
      this.totalDebit = 0;
      this.balance = 0;
      this.credit = 0;
      this.debit = 0;
      this.count = 0;
      this.$api.journal.portfolio.ledger(ledgerparams).then(response => {
        const arr = response.data.ledger;

        this.ledgerContent = arr.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        for (let i = 0; i < this.ledgerContent.length; i++) {
          this.ledgerContent[i].created_at = this.ledgerContent[
            i
          ].created_at.slice(0, 10);
          let ledgerArray = {
            transaction: this.ledgerContent[i].action,
            balance: 0,
            counter: 1,
            count: 0
          };
          this.ledgerContent[i] = { ...ledgerArray, ...this.ledgerContent[i] };

          if (this.ledgerContent[i].action == "deposit") {
            let Depositdebit = {
              debit: "-",
              credit: parseFloat(this.ledgerContent[i].total_value)
                .toFixed(2)
                .replace(".", ".")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            };
            this.ledgerContent[i] = {
              ...Depositdebit,
              ...this.ledgerContent[i]
            };
            this.ledgerContent[i].action = "Fresh Funds";
          } else if (this.ledgerContent[i].action == "inital_balance") {
            let Depositdebit = {
              debit: "-",
              credit: parseFloat(this.ledgerContent[i].total_value)
                .toFixed(2)
                .replace(".", ".")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            };
            this.ledgerContent[i] = {
              ...Depositdebit,
              ...this.ledgerContent[i]
            };
            this.ledgerContent[i].action = "Initial Capital";
          } else if (this.ledgerContent[i].action == "dividend_income") {
            let Dividenddebit = {
              debit: "-",
              credit: parseFloat(this.ledgerContent[i].total_value)
                .toFixed(2)
                .replace(".", ".")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            };
            this.ledgerContent[i] = {
              ...Dividenddebit,
              ...this.ledgerContent[i]
            };
            this.ledgerContent[i].action = "Dividend Income";
          } else if (this.ledgerContent[i].action == "withdraw") {
            let debit = {
              debit: parseFloat(this.ledgerContent[i].total_value)
                .toFixed(2)
                .replace(".", ".")
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ","),
              credit: "-"
            };
            this.ledgerContent[i] = { ...debit, ...this.ledgerContent[i] };
            this.ledgerContent[i].action = "Withdrawal";
          }

          this.ledgerContent[i].count = this.count =
            this.count + parseFloat(this.ledgerContent[i].counter);
          this.ledgerContent[0].count = 1;

          if (this.ledgerContent[i].debit != "-") {
            this.totalDebit = this.debit =
              this.debit +
              parseFloat(this.ledgerContent[i].debit.replace(/,/g, ""));

            this.ledgerContent[i].balance = this.balance =
              this.balance -
              parseFloat(this.ledgerContent[i].debit.replace(/,/g, ""));
          } else if (this.ledgerContent[i].credit != "-") {
            this.totalCredit = this.credit =
              this.credit +
              parseFloat(this.ledgerContent[i].credit.replace(/,/g, ""));

            this.ledgerContent[i].balance = this.balance =
              this.balance +
              parseFloat(this.ledgerContent[i].credit.replace(/,/g, ""));
          }
        }

        this.ledgerContentBackup = this.ledgerContent;

        this.liveLedgerLoading = false;
      });
    },
    /**
     * if trades are hovered item will show, item will assigned as hovered with this function
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    ledgermenuLogsShow(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "block";
    },
    /**
     * if trades are hovered item will hide, item will assigned as hovered with this function
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    ledgermenuLogsHide(item) {
      let lt = document.getElementById(`lt_${item.id}`);

      lt.style.display = "none";
    }
  }
};
</script>
<style scoped>
.data_table-container {
  background: transparent;
}
.sidemenu_actions {
  position: absolute;
  width: auto;
  right: 0;
  background: #00121e;
  border: 1px solid rgb(0, 255, 195);
  border-radius: 4px;
}
</style>