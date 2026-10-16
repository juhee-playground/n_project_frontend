<template>
  <div>
    <v-simple-table>
      <tbody>
        <tr v-for="(item, index) in tableData" :key="item.name">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>
            {{ item.score }} /
            {{ setPlayedMatchedCount(playedMatched, item.name) }}
          </td>
        </tr>
      </tbody>
    </v-simple-table>
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array,
      default: null
    },
    playedMatched: {
      type: Array,
      default: null
    }
  },
  data() {
    return {};
  },
  methods: {
    setPlayedMatchedCount(arr, name) {
      let score = 0;
      arr.forEach(element => {
        if (element.name === name) {
          score = element.score;
          return;
        }
      });
      return score;
    }
  }
};
</script>

<style scoped></style>
