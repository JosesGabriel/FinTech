<template>
  <v-content>
    <div class="sub__title">All Stock</div>
    <v-card
      color="#00121e"
      :loading="loading"
      class="pl-3 pr-5"
      style="height: calc(100vh - 315px)"
    >
      <v-simple-table
        dense
        dark
        fixed-header
        height="calc(100vh - 315px)"
        style="background:#00121e"
      >
        <thead>
          <tr>
            <th class="caption header white--text font-weight-bold">SYMBOL</th>
            <th class="caption header white--text font-weight-bold text-right">
              LAST
            </th>
            <th class="caption header white--text font-weight-bold text-right">
              %CHANGE
            </th>
            <th class="caption header white--text font-weight-bold text-right">
              VALUE
            </th>
            <th class="caption header white--text font-weight-bold text-right">
              TRADES
            </th>
            <th class="caption header white--text font-weight-bold"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stocks" :key="item.id">
            <td class="column white--text" style="width:40px">
              {{ item.symbol }}
            </td>
            <td class="column white--text text-right" style="width:35px">
              <span
                :class="[
                  { increase: item.change > 0 },
                  { decrease: item.change < 0 },
                  { neutral: item.change == 0 }
                ]"
              >
                {{ item.last | numeral("0.0a") }}
              </span>
            </td>
            <td class="column white--text text-right" style="width:40px">
              <span
                :class="[
                  { increase: item.change > 0 },
                  { decrease: item.change < 0 },
                  { neutral: item.change == 0 }
                ]"
              >
                {{ item.change | numeral("0,0.00") }}
              </span>
            </td>
            <td class="column white--text text-right" style="width:60px">
              <span class="text-uppercase">{{
                item.value | numeral("0.000a")
              }}</span>
            </td>
            <td class="column white--text text-right" style="width:45px">
              <span class="">{{ item.trades | numeral("0,0") }}</span>
            </td>
            <td class="column white--text"></td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-card>
  </v-content>
</template>

<script>
export default {
  name: "AllStock",
  data() {
    return {
      stocks: [],
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
  }
};
</script>

<style scoped>
.header {
  background: #00121e !important;
  font-size: 10px !important;
}
.column {
  background: #00121e !important;
  font-size: 10px !important;
}
.theme--dark.v-data-table thead tr:last-child th {
  border: none !important;
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
