<template>
  <v-dialog v-model="show" max-width="320px">
    <v-card :dark="lightSwitch == true">
      <v-card-title
        class="text-left justify-left pa-3 px-5 success--text subtitle-1"
      >Create Portfolio</v-card-title>
      <v-container class="px-8">
        <v-card-title class="text-left justify-left px-0 body-2">Enter Portfolio Name</v-card-title>
        <v-text-field
          v-model="namePortfolioModel"
          color="success"
          :dark="lightSwitch == true"
          class="stock_selector pa-0 pb-5 font-weight-bold body-2"
        ></v-text-field>
        <v-card-title class="text-left justify-left px-0 body-2">Initial Capital</v-card-title>
        <v-text-field
          v-model="initialCapitalModel"
          color="success"
          type="number"
          :dark="lightSwitch == true"
          class="stock_selector pa-0 pb-5 font-weight-bold body-2"
        ></v-text-field>
        <v-select
          v-model="typePortfolioModel"
          :items="portfolio"
          item-text="type"
          item-value="value"
          label="Type of Portfolio"
          color="success"
          class="body-2"
          item-color="success"
          dense
          :dark="lightSwitch == true"
          :menu-props="{offsetY: true, dark: lightSwitch == true}"
          light
          append-icon="mdi-chevron-down"
        >
          <template slot="item" slot-scope="data">
            <v-list-item-content
              :dark="lightSwitch == true"
              :style="{ background: cardbackground }"
              style="padding: 12px 12px; margin: -16px;"
            >
              <v-list-item-title v-html="data.item.type" class="text-uppercase caption"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-select>
      </v-container>
      <v-card-actions class="pa-3">
        <v-spacer></v-spacer>
        <v-btn color="white" class="text-capitalize" text light @click.stop="show = false">Close</v-btn>
        <v-btn
          color="success"
          class="text-capitalize black--text"
          depressed
          light
          :disabled="saveButtonDisable"
          @click.stop="show = false"
          @click="createPortfolio()"
        >Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  props: ["visible"],
  computed: {
    ...mapGetters({
      portfolioKey: "journal/getPortfolioKey",
      lightSwitch: "global/getLightSwitch"
    }),
    /**
     * returns background color
     *
     * @return  {function}  returns string
     */
    cardbackground: function() {
      return this.lightSwitch == 0 ? "#f2f2f2" : "#00121e";
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
      portfolio: [
        { type: "Real Portfolio", value: "real" },
        { type: "Virtual Portfolio", value: "virtual" }
      ],
      portfolioModel: "",
      saveButtonDisable: true,
      namePortfolioModel: null,
      initialCapitalModel: null,
      typePortfolioModel: null,
      keyCreateCounter: 2
    };
  },
  watch: {
    /**
     * Watch namePortfolioModel execute fieldswatch
     *
     * @return
     */
    namePortfolioModel() {
      this.fieldsWatch();
    },
    /**
     * initialCapitalModel changing numbers into string and add separators and decimals
     *
     *
     * @return  {string}  number with comma separator and 2 decimal points
     */
    initialCapitalModel() {
      this.fieldsWatch();
    },
    /**
     * typePortfolioModel watching type of portfolio
     *
     * @return
     */
    typePortfolioModel() {
      this.fieldsWatch();
    }
  },
  methods: {
    ...mapActions({
      setDefaultPortfolioId: "journal/setDefaultPortfolioId",
      setPortfolioKey: "journal/setPortfolioKey"
    }),
    /**
     * Watch fields under create portfolio forms
     *
     * @return  [return description]
     */
    fieldsWatch() {
      if (
        this.typePortfolioModel != null &&
        parseFloat(this.initialCapitalModel) > 1 &&
        this.namePortfolioModel != null
      ) {
        this.saveButtonDisable = false;
      } else {
        this.saveButtonDisable = true;
      }
    },
    /**
     * Execute creating portfolio
     *
     * @return  creating portfolio
     */
    createPortfolio() {
      const createportfolioparams = {
        currency_code: "PHP",
        name: this.namePortfolioModel,
        description: "My Portfolio",
        type: this.typePortfolioModel,
        balance: parseFloat(this.initialCapitalModel)
      };
      this.$api.journal.portfolio
        .createportfolio(createportfolioparams)
        .then(response => {
          if (response.success) {
            (this.namePortfolioModel = null),
              (this.initialCapitalModel = null),
              (this.typePortfolioModel = null);

            this.keyCreateCounter = this.portfolioKey;
            this.keyCreateCounter++;
            this.setPortfolioKey(this.keyCreateCounter);
            // this.setDefaultPortfolioId(response.data.fund.id); // hide for now
          }
        });
    }
  }
};
</script>
<style>
.portfolio_type .v-select__slot .v-label,
.portfolio_type .v-select__slot .v-icon {
  color: #00ffc3 !important;
}
.portfolio_type .v-input__slot {
  margin: 0;
}
.portfolio_type .v-select__selection--comma {
  color: #00ffc3;
  font-size: 14px;
}
.portfolio_type .v-input__control {
  min-height: auto !important;
}
.portfolio_type-font-size .v-label {
  font-size: 14px;
}
</style>
