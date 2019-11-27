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
        class="data_table-container custom_table"
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
          <tr class="tr_custom" @click="setSymbolID(props.item.stockidstr)">
            <td class="column white--text text-left" style="width:40px;">
              <span>{{ props.item.symbol }}</span>
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
            <td class="column text-right" style="width:55px">
              <span
                :class="[
                  { increase: props.item.change > 0 },
                  { decrease: props.item.change < 0 },
                  { neutral: props.item.change == 0 }
                ]"
              >
                {{ props.item.changepercentage | numeral("0,0.00") }}
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
            <td class="column" style="width:5px"></td>
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
        {
          text: "Symbol",
          value: "symbol",
          class: "header text-left white--text"
        },
        { text: "Last", value: "last", class: "header text-right white--text" },
        {
          text: "%Change",
          value: "change",
          class: "header text-right white--text"
        },
        {
          text: "Value",
          value: "value",
          class: "header text-right white--text"
        },
        {
          text: "Trades",
          value: "trades",
          class: "header text-right white--text"
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
        // this.stocks = response.data
        this.stocks = response.data.filter(data => parseInt(data.value) > 0);
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
.data_table-container i.v-icon.v-data-table-header__icon.mdi.mdi-arrow-up {
  display: none;
}
</style>

<style scoped>
.tr_custom {
  line-height: 0.1rem !important;
  cursor: pointer;
}
.header {
  background: #00121e !important;
  font-size: 10px !important;
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
