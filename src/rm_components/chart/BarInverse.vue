<template>
  <svg
    class="barchart"
    :width="width + marginLeft + marginRight"
    :height="height + marginTop + marginBottom"
  >
    <g :transform="`translate(${marginLeft}, ${marginTop})`">
      <g
        class="x-axis"
        fill="none"
        :transform="`translate(0, ${height})`"
        style="color: #888"
      >
        <path
          class="domain"
          stroke="currentColor"
          :d="`M0.5,6V0.5H${width}.5V6`"
        ></path>
        <g
          v-for="(tick, index) in xTicks"
          :key="index"
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="end"
          :transform="`translate(${x(tick) + 0.5}, 0)`"
        >
          <line stroke="currentColor" y2="-6"></line>
          <text fill="currentColor" y="9" dy="0.71em">{{ tick }}</text>
        </g>
      </g>
      <g
        class="y-axis"
        fill="none"
        :transform="`translate(0, 0)`"
        style="color: #888"
      >
        <path
          class="domain"
          stroke="currentColor"
          :d="`M0.5,${height}.5H0.5V0.5H-6`"
        ></path>
        <g
          v-for="(bar, index) in bars"
          :key="index"
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="middle"
          :transform="`translate(0, ${bar.y + bar.height / 2})`"
        >
          <line stroke="currentColor" x2="-6"></line>
          <text fill="currentColor" x="-24" dy="0.32em">{{ bar.xLabel }}</text>
        </g>
      </g>
      <g class="bars" fill="none">
        <rect
          v-for="(bar, index) in bars"
          :key="index"
          fill="url(#mainGradient)"
          :height="bar.height"
          :width="bar.width"
          :x="bar.x"
          :y="bar.y"
          @mouseenter="enterEvent(bar)"
          @mouseout="outEvent"
          @click="enterEvent(bar)"
        ></rect>
      </g>
    </g>
    <text ref="tooltip" fill="currentColor" x="-100" y="-100" dx="0em" dy="0em">
      {{ tooltipContent }}
    </text>
    <defs>
      <linearGradient id="mainGradient">
        <stop class="stop-left" offset="0"></stop>
        <stop class="stop-right" offset="1"></stop>
      </linearGradient>
      <linearGradient id="Gradient2" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stop-color="red" />
        <stop offset="100%" stop-color="yellow" />
      </linearGradient>
    </defs>
  </svg>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "BarChart",
  props: {
    height: { type: Number, default: 450 },
    width: { type: Number, default: 280 },
    dataSet: { type: Array, default: () => [] },
    marginLeft: { type: Number, default: 40 },
    marginTop: { type: Number, default: 40 },
    marginBottom: { type: Number, default: 40 },
    marginRight: { type: Number, default: 40 },
    tickCount: { type: Number, default: 5 },
    barPadding: { type: Number, default: 0.3 }
  },
  data() {
    return {
      tooltipContent: "툴팁 내용 (마우스 오른쪽 위)"
    };
  },
  computed: {
    xTicks() {
      return this.x.ticks(this.tickCount);
    },

    x() {
      let values = this.dataSet.map(e => e[1]);
      return d3
        .scaleLinear()
        .range([0, this.width])
        .domain([0, Math.max(...values)]);
    },
    y() {
      return d3
        .scaleBand()
        .range([0, this.height])
        .padding(this.barPadding)
        .domain(this.dataSet.map(e => e[0]));
    },
    bars() {
      let bars = this.dataSet.map(d => {
        return {
          xLabel: d[0],
          value: d[1],
          y: this.y(d[0]),
          x: 0,
          width: this.x(d[1]),
          height: this.y.bandwidth()
        };
      });

      return bars;
    }
  },
  methods: {
    enterEvent(bar) {
      let tooltip = d3.select(this.$refs.tooltip);
      let padding = 2;
      let textSize = 10;
      tooltip.attr("x", bar.x + bar.width + this.marginLeft + padding);
      tooltip.attr("y", bar.y + this.marginTop + textSize);
      tooltip.text(bar.value);
    },
    outEvent() {
      let tooltip = d3.select(this.$refs.tooltip);
      tooltip.text("");
    }
  }
};
</script>

<style>
.stop-left {
  stop-color: #3f51b5; /* Indigo */
}

.stop-right {
  stop-color: #009688; /* Teal */
}
</style>
