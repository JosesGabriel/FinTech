<template>
  <v-col cols="12" sm="12" md="12">
    <v-row class="mt-3 ml-0 mb-3 mr-2" style="color:white;">
      <v-col class="ml-0 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Position
        </v-row>
        <v-row class="mt-1 mb-2">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3 positive">
            1,000.00
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Ave. Price
        </v-row>
        <v-row class="mt-1">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3">
            1,000,000.00
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Total Cost
        </v-row>
        <v-row class="mt-1">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3">
            1,000,000.00
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Market Value
        </v-row>
        <v-row class="mt-1">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3">
            1,000,000.00
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Profit
        </v-row>
        <v-row class="mt-1">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3">
            1,000,000.00
          </v-col>
        </v-row>
      </v-col>
      <v-col class="ml-3 mb-2 pt-0 pb-0 vt_realized" style="width:20%;">
        <v-row class="mt-2 pl-3 caption">
          Perf
        </v-row>
        <v-row class="mt-0">
          <v-col md="12" class="text-right pb-0 pl-0 pr-3">
            100.00%
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- <ChartTesting/> -->
  </v-col>
</template>

<style>
.theme--dark.v-label {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.v-select__selection--comma {
  color: black;
  font-size: 14px;
  font-weight: 600;
}
.select_portfolio .v-select__slot .v-label,
.select_portfolio .v-select__slot .v-icon {
  color: black !important;
  font-weight: 600;
}

.theme--light.v-list {
  background: #00121e;
  border: 1px solid #00ffc3;
}

.v-slide-group__content.v-tabs-bar__content:before {
  content: "";
  width: 100%;
  position: absolute;
  bottom: -3px;
  z-index: 1;
  height: 4px;
  background: #000;
}
.positive {
  color: #00ffc3;
}

.negative {
  color: #fe4949;
}
.theme--dark.v-icon {
  color: #0e0e0e;
}
.selector
  > .v-input__control
  > .v-input__slot
  > .v-select__slot
  > .v-select__selections {
  color: black;
}
.v-text-field.v-text-field--solo .v-label {
  color: black;
}
.vt_realized {
  background: #0c1a2b73;
}

.vt_realized:hover {
  background: #0c1a2b;
  box-shadow: 0px 7px 8px -4px rgba(0, 0, 0, 0.2),
    0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12) !important;
}
.select_portfolio .v-input__slot {
  margin: 0;
  border-radius: unset;
}
.selector .v-input__control {
  min-height: auto !important;
}
</style>
