<template>
  <svg
    class="barchart"
    :width="width + marginLeft / 2"
    :height="height + marginTop"
  >
    <g :transform="`translate(${marginLeft / 2}, ${marginTop / 2})`">
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
          v-for="(bar, index) in bars"
          :key="index"
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="middle"
          :transform="`translate(${bar.x + bar.width / 2}, 0)`"
        >
          <line stroke="currentColor" y2="6"></line>
          <text fill="currentColor" y="9" dy="0.71em">{{ bar.xLabel }}</text>
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
          v-for="(tick, index) in yTicks"
          :key="index"
          class="tick"
          opacity="1"
          font-size="10"
          font-family="sans-serif"
          text-anchor="end"
          :transform="`translate(0, ${y(tick) + 0.5})`"
        >
          <line stroke="currentColor" x2="-6"></line>
          <text fill="currentColor" x="-9" dy="0.32em">{{ tick }}</text>
        </g>
      </g>
      <g class="bars" fill="none">
        <rect
          v-for="(bar, index) in bars"
          :key="index"
          fill="url(#Gradient2)"
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
        <stop offset="0%" stop-color="green" />
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
    height: { type: Number, default: 150 },
    width: { type: Number, default: 400 },
    dataSet: { type: Array, default: () => [] },
    marginLeft: { type: Number, default: 60 },
    marginTop: { type: Number, default: 40 },
    marginBottom: { type: Number, default: 40 },
    marginRight: { type: Number, default: 60 },
    tickCount: { type: Number, default: 5 },
    barPadding: { type: Number, default: 0.3 }
  },
  data() {
    return {
      tooltipContent: "툴팁 내용"
    };
  },
  computed: {
    yTicks() {
      return this.y.ticks(this.tickCount);
    },
    x() {
      return d3
        .scaleBand()
        .range([0, this.width])
        .padding(this.barPadding)
        .domain(this.dataSet.map(e => e[0]));
    },
    y() {
      let values = this.dataSet.map(e => e[1]);
      return d3
        .scaleLinear()
        .range([this.height, 0])
        .domain([0, Math.max(...values)]);
    },
    bars() {
      let bars = this.dataSet.map(d => {
        return {
          xLabel: d[0],
          value: d[1],
          x: this.x(d[0]),
          y: this.y(d[1]),
          width: this.x.bandwidth(),
          height: this.height - this.y(d[1])
        };
      });

      return bars;
    }
  },
  methods: {
    enterEvent(bar) {
      let tooltip = d3.select(this.$refs.tooltip);
      tooltip.attr("x", bar.x + this.marginLeft / 2 + bar.width / 3);
      tooltip.attr("y", bar.y + this.marginTop / 2);
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
