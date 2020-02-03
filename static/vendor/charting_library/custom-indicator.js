const __customIndicators = PineJS => [
  {
    metainfo: {
      _metainfoVersion: 42,
      name: "support_and_resistance",
      id: "support_and_resistance@tv-basicstudies-1",
      scriptIdPart: "",
      description: "Support and Resistance",
      shortDescription: "S/R",

      is_price_study: true,
      is_hidden_study: false,
      isCustomIndicator: true,
      isTVScript: false,
      isTVScriptStub: false,

      plots: [
        { id: "plot_0", name: "plot_0", type: "line" },
        { id: "plot_1", name: "plot_1", type: "line" },
        { id: "plot_2", name: "plot_2", type: "line" },
        { id: "plot_3", name: "plot_3", type: "line" }
      ],

      precision: 4,

      defaults: {
        styles: {
          plot_0: {
            linestyle: 0,
            linewidth: 1,
            plottype: 2,
            trackPrice: true,
            color: "#F44336"
          },
          plot_1: {
            linestyle: 0,
            linewidth: 1,
            plottype: 2,
            trackPrice: true,
            color: "#F44336"
          },
          plot_2: {
            linestyle: 0,
            linewidth: 1,
            plottype: 2,
            trackPrice: true,
            color: "#03DAC5"
          },
          plot_3: {
            linestyle: 0,
            linewidth: 1,
            plottype: 2,
            trackPrice: true,
            color: "#03DAC5"
          }
        },
        inputs: {
          in_0: 5,
          in_1: 20
        }
      },

      styles: {
        plot_0: {
          title: " R1",
          histogramBase: 0
        },
        plot_1: {
          title: " R2",
          histogramBase: 0
        },
        plot_2: {
          title: " S1",
          histogramBase: 0
        },
        plot_3: {
          title: " S2",
          histogramBase: 0
        }
      },
      inputs: [
        {
          id: "in_0",
          name: "No. of bars for Support and Resistance 1",
          type: "integer",
          min: 0,
          max: 200
        },
        {
          id: "in_1",
          name: "No. of bars for Support and Resistance 2",
          type: "integer",
          min: 0,
          max: 200
        }
      ]
    },
    constructor: function() {
      this.main = function(a, c) {
        this._context = a;
        this._input = c;
        const h = this._context.new_var(PineJS.Std.high(this._context));
        const l = this._context.new_var(PineJS.Std.low(this._context));
        const r1 = PineJS.Std.highest(h, this._input(0), this._context);
        const r2 = PineJS.Std.highest(h, this._input(1), this._context);
        const s1 = PineJS.Std.lowest(l, this._input(0), this._context);
        const s2 = PineJS.Std.lowest(l, this._input(1), this._context);

        return [
          {
            value: r1,
            offset: -9999
          },
          {
            value: r2,
            offset: -9999
          },
          {
            value: s1,
            offset: -9999
          },
          {
            value: s2,
            offset: -9999
          }
        ];
      };
    }
  }
];

export default __customIndicators;
