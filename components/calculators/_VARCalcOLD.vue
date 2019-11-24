<template>
  <!-- <v-card color="darkcard" dark>
    <v-card-title class="title-2 pb-0 text--green"
      >Value At Risk (VAR) Calculator</v-card-title
    >
    <v-container class="pt-0">
      <v-row>
        <v-col cols="12">
          <div>Enter Stock Details</div>
          <v-select
            v-model="stocksDropdownModel"
            label="Stock Code"
            :items="stockList"
            item-text="symbol"
            item-value="id_str"
            append-icon="mdi-chevron-down"
            class="pl-0"
            dark
            hide-details
            color="success"
            required
          ></v-select>
          <v-text-field
            v-model="currentPrice"
            type="number"
            label="Current Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>

          <div class="pt-3">Portfolio Planning</div>
          <v-text-field
            v-model="portfolioSize"
            type="number"
            label="Portfolio Size"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="portfolioAllocation"
            type="number"
            label="Portfolio Allocation"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="positionSize"
            type="number"
            label="Position Size"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>

          <div class="pt-3">Position Sizing & RRR</div>
          <v-text-field
            v-model="boardLot"
            type="number"
            label="Board Lot"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="sharesToBuy"
            type="number"
            label="No of Shares to Buy"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="riskRewardRatio"
            type="number"
            label="Risk to Reward Ratio"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <div>Trade Planning</div>
          <v-text-field
            v-model="identifiedEntryPrice"
            type="number"
            label="Identified Entry Price"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="riskTolerance"
            type="number"
            label="Risk Tolerance"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="targetProfit"
            type="number"
            label="Target Profit"
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="takeProfitPrice"
            type="number"
            label="Take Profit Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="stoplossPrice"
            type="number"
            label="Stoploss Price"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="valueAtRisk"
            type="number"
            label="Value at Risk"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
          <v-text-field
            v-model="upside"
            type="number"
            label="Upside"
            append-icon="mdi-lock"
            disabled
            dense
            hide-details
            color="success"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-card> -->
</template>
