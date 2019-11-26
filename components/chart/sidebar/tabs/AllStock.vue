<template>
  <v-content>
    <div class="sub__title">All Stock</div>
    <v-card
      color="#00121e"
      :loading="loading"
      class="pl-3 pr-5"
      style="height: calc(100vh - 315px)"
      flat
    >
      <v-data-table
        :headers="headers"
        :items="stocks"
        class="data_table-container"
        dense
        dark
        fixed-header
        calculate-widths
        disable-pagination
        hide-default-footer
        height="calc(100vh - 315px)"
        style="background:#00121e"
      >
        <!-- <template #item.symbol="{item}">
            SYM
        </template> -->
        <template v-slot:item="props">
          <tr>
            <td class="column white--text" style="width:40px;">
              <span
                class="span__symbol"
                @click="setSymbolID(props.item.stockidstr)"
                >{{ props.item.symbol }}</span
              >
            </td>
            <td class="column text-right" style="width:35px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 },
                  { neutral: props.item.change == 0 }
                ]"
              >
                {{ props.item.last | numeral("0.0a") }}
              </span>
            </td>
            <td class="column text-right" style="width:40px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 },
                  { neutral: props.item.change == 0 }
                ]"
              >
                {{ props.item.change | numeral("0,0.00") }}
              </span>
            </td>
            <td class="column text-right" style="width:60px">
              <span class="text-uppercase">{{
                props.item.value | numeral("0.000a")
              }}</span>
            </td>
            <td class="column text-right" style="width:45px">
              <span class="">{{ props.item.trades | numeral("0,0") }}</span>
            </td>
            <td class="column" style="width:25px"></td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-content>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AllStock",
  data() {
    return {
      stocks: [],
      headers: [
        { text: "Symbol", value: "symbol", class: "tr_custom header" },
        { text: "Last", value: "last", class: "tr_custom header text-right" },
        {
          text: "Change",
          value: "change",
          class: "tr_custom header text-right"
        },
        { text: "Value", value: "value", class: "tr_custom header text-right" },
        {
          text: "Trades",
          value: "trades",
          class: "tr_custom header text-right"
        }
      ],
      loading: "#48FFD5"
    };
  },
  mounted() {
    this.$api.chart.stocks
      .history({
        exchange: "PSE"
      })
      .then(response => {
        // console.log("all stock");
        // console.log(response.data);
        this.stocks = response.data;
        this.loading = false;
      });
  },
  methods: {
    ...mapActions({
      setSymbolID: "chart/setSymbolID"
    })
  }
};
</script>
<style>
.span__symbol {
  cursor: pointer;
}
.data_table-container i.v-icon.v-data-table-header__icon.mdi.mdi-arrow-up {
  display: none;
}
</style>

<style scoped>
.tr_custom {
  line-height: 0.1rem !important;
}
.header {
  background: #00121e !important;
  font-size: 10px !important;
  color: #fff;
}
.column {
  /* background: #00121e !important; */
  font-size: 10px !important;
  color: #bbb;
}
.theme--dark.v-data-table thead tr:last-child th {
  border: none !important;
}
.v-card__text {
  line-height: 0.375rem !important;
}
.v-data-table td,
.v-data-table th {
  padding: 0px 0px !important;
}
.v-data-table--dense td {
  height: 20px;
}
.neutral {
  color: #dddddd !important;
}
.increase {
  color: #48ffd5 !important;
}
.decrease {
  color: #ff4848 !important;
}
</style>
