<template>
  <v-dialog v-model="show" max-width="400px">
    <v-card dark class="card">
      <v-card-text class="header"
        >Enter Order :
        <v-card-actions class="btnBuySell">
          <v-btn outlined rounded small color="success">Buy</v-btn>
          <v-btn outlined rounded small color="error">Sell</v-btn>
        </v-card-actions>
        <div class="closeBtn">
          <v-btn color="red" text icon @click.stop="show = false">
            <v-icon size="15">mdi-close</v-icon>
          </v-btn>
        </div>
      </v-card-text>

      <v-row align="center">
        <v-col class="d-flex drp_stocks" cols="12" sm="6">
          <v-select :items="stock" label="Stock" dense></v-select>
        </v-col>
        <v-col class="d-flex drp_stocks" cols="12" sm="6">
          Banco De Oro
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          STOCK DETAILS
        </v-col>
        <v-col class="d-flex" cols="12" sm="6"> </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <div class="details">
            <p>Previous <span class="pdetails prev"></span></p>
            <p>
              Low <span class="pdetails low" style="color: #e64c3c;"></span>
            </p>
            <p>
              52WKLow
              <span class="pdetails klow" style="color: #e64c3c;"></span>
            </p>
            <p>Volume <span class="pdetails vol"></span></p>
            <p>Trades <span class="pdetails trade"></span></p>
          </div>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <div class="details">
            <p>Open <span class="pdetails open"></span></p>
            <p>
              High <span class="pdetails high" style="color: #25ae5f"></span>
            </p>
            <p>
              52WKHigh
              <span class="pdetails khigh" style="color: #25ae5f"></span>
            </p>
            <p>Value <span class="pdetails val"></span></p>
            <p>Average <span class="pdetails av"></span></p>
          </div>
        </v-col>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
          <v-card-text
            class="justify-center"
            style="text-align: center;padding-top: 0px; padding-bottom:5px;"
            >Bid/Ask Bar</v-card-text
          >
        </v-col>
      </v-row>
      <v-row align="center">
        <div class="bidask_bar">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
            <div class="arb_bar_green" style="width:60%; height: 6px;"></div>
            <div class="arb_bar_red" style="width:40%; height: 6px;"></div>
          </v-col>
        </div>
      </v-row>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
          <v-card-text
            class="justify-center"
            style="text-align: center;padding-top: 0px; padding-bottom:5px;"
            >Members Sentiments</v-card-text
          >
        </v-col>
      </v-row>
      <v-row align="center">
        <div class="mem_sents">
          <v-col class="d-flex" cols="12" sm="12" style="padding:0px;">
            <div class="arb_bar_green" style="width:30%; height: 6px;"></div>
            <div class="arb_bar_red" style="width:70%; height: 6px;"></div>
          </v-col>
        </div>
      </v-row>
      <v-divider></v-divider>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          TRADE DETAILS
        </v-col>
        <v-col class="d-flex" cols="12" sm="6"> </v-col>
      </v-row>
      <v-row align="center">
        <v-col cols="12" sm="6" md="3">
          <v-text-field
            label="Filled"
            placeholder="Placeholder"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["visible"],
  data: () => ({
    stock: ["2GO", "BDO", "IRC", "ROCK"]
  }),
  computed: {
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
  }
};
</script>
<style scoped>
.v-dialog > .v-card > .v-card__text {
  padding: 10px 20px 0px;
}
.theme--dark.v-card {
  background-color: #0c1f33;
  color: #ffffff;
}
.btnBuySell {
  position: relative;
  top: -10px;
}
.header {
  display: flex;
  padding-top: 20px !important;
}
.closeBtn {
  position: absolute;
  right: 0;
  top: 0;
  margin: 5px 10px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
  margin-right: 0px;
  margin-left: 0px;
}
.drp_stocks {
  margin-top: -15px;
  margin-left: 20px;
  padding: 0px;
  max-width: 100px;
}
.details {
  line-height: 5px;
  font-size: 15px;
  margin-top: -15px;
  margin-left: 10px;
}
.bidask_bar {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 5px;
}
.arb_bar_green {
  background-color: #25ae5f;
}
.arb_bar_red {
  background-color: #e64c3c;
}
.mem_sents {
  width: 100%;
  padding-left: 40px;
  padding-right: 40px;
  margin-bottom: 20px;
}
</style>
