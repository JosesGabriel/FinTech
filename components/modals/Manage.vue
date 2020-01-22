<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text subtitle-1"
      >Manage Portfolio</v-card-title>
      <v-container class="px-10">
        <v-data-table
          :headers="headers"
          :items="userPortfolio"
          :dark="lightSwitch == true"
          class="data_table-container"
          sort-by="type"
        >
          <template v-slot:item.name="{ item }">
            <span class="text-capitalize pl-2" :style="{ color: TertiaryFontColor }">{{ item.name }}</span>
          </template>

          <template v-slot:item.type="{ item }">
            <span class="text-capitalize" :style="{ color: TertiaryFontColor }">{{ item.type }}</span>
          </template>

          <template v-slot:item.capital="{ item }">
            <span :style="{ color: TertiaryFontColor }">{{ item.capital | numeral("0,0.00") }}</span>
          </template>

          <template v-slot:item.balance="{ item }">
            <span :style="{ color: TertiaryFontColor }">{{ item.balance | numeral("0,0.00") }}</span>
          </template>

          <template v-slot:item.currency_code="{ item }">
            <span :style="{ color: TertiaryFontColor }">{{ item.currency_code }}</span>
          </template>

          <template v-slot:item.action="{ item }">
            <v-icon
              small
              @click.stop="showDeleteConfirmation=true"
              @click="itemData(item)"
            >mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-container>

      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="white" class="text-capitalize" text light @click.stop="show = false">Close</v-btn>
        <v-btn
          color="success"
          class="text-capitalize black--text"
          depressed
          light
          @click.stop="show = false"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
    <pdelete-modal
      :visible="showDeleteConfirmation"
      @clicked="deletedItem"
      :itemDetails="itemDetails"
      @close="showDeleteConfirmation=false"
    />
  </v-dialog>
</template>

<script>
import pdeleteModal from "~/components/modals/PortfolioDelete";
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  components: {
    pdeleteModal
  },
  computed: {
    ...mapGetters({
      portfolioKey: "journal/getPortfolioKey",
      userPortfolio: "journal/getUserPortfolio",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns tertiary font color
     *
     * @return  {string}  returns string
     */
    TertiaryFontColor() {
      return this.lightSwitch == 0 ? "#535358" : "#b6b6b6";
    },
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      }
    }
  },
  data() {
    return {
      portfolioList: null,
      showDeleteConfirmation: false,
      itemDetails: null,
      headers: [
        {
          text: "Name",
          align: "left",
          value: "name"
        },
        { text: "Portfolio Type", value: "type" },
        { text: "Equity", align: "right", value: "capital" },
        { text: "Buying Power", align: "right", value: "balance" },
        { text: "Currency", align: "center", value: "currency_code" },
        { text: "Actions", value: "action", align: "center", sortable: false }
      ]
    };
  },
  created() {
    this.portfolioList = this.userPortfolio;
  },
  methods: {
    ...mapActions({
      setPortfolioKey: "journal/setPortfolioKey",
      setUserPortfolio: "journal/setUserPortfolio",
      setDefaultPortfolioId: "journal/setDefaultPortfolioId"
    }),
    /**
     * passing credentials of each item to be deleted to this.itemDetails (to props)
     *
     * @param   {object}  item  object from hovered item
     *
     * @return  {string}        passing this string "block" to hovered item
     */
    itemData(item) {
      let index = this.userPortfolio.indexOf(item);
      let itemWIndex = { ...item, index: index };

      this.itemDetails = itemWIndex;
    },
    deletedItem(value) {
      if (value.confirm == true) {
        const fund_id = value.id;
        this.$api.journal.portfolio.deleteportfolio(fund_id).then(response => {
          if (response.success) {
            this.userPortfolio.splice(value.index);

            this.setUserPortfolio(this.userPortfolio);

            this.$emit("clicked", value);
          }
        });
      }
    }
  }
};
</script>
<style scoped>
.data_table-container {
  background: transparent;
}
.v-data-table.data_table-container th:first-child {
  padding-left: 0 !important;
}
</style>