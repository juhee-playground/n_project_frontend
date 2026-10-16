<template>
  <div class="team__main">
    팀 순위!!!!
    <div class="team__header">
      <div class="header__first">
        <span class="text__blue">2020 시즌</span> <span>팀 순위 </span>
      </div>
      <div class="header__second">
        <v-select
          v-model="season"
          class="select__season"
          :items="seasonList"
          readonly
          hide-details
        ></v-select>
      </div>
    </div>
    <div class="team__content">
      <table class="rank__table">
        <thead>
          <th width="50"><strong>순위</strong></th>
          <th width="200"><strong>팀</strong></th>
          <th width="100"><strong>경기수</strong></th>
          <th width="80"><strong>승점</strong></th>
          <th width="50"><strong>승</strong></th>
          <th width="50"><strong>무</strong></th>
          <th width="50"><strong>패</strong></th>
          <th width="50"><strong>득점</strong></th>
          <th width="50"><strong>실점</strong></th>
          <th width="100"><strong>득실차</strong></th>
        </thead>
        <tbody>
          <tr v-for="(item, idx) in rankingData" :key="item.id_unit_team">
            <td>{{ idx + 1 }}</td>
            <td>
              <div class="table__inner">
                <img width="40" height="40" class="emblem" :src="item.image" />
                <span class="name">
                  <a :href="`/unitTeam/${item.id_unit_team}`">
                    {{ item.name }} - {{ item.description }}
                  </a>
                </span>
              </div>
            </td>
            <td width="50">{{ item.gameCount }}</td>
            <td>{{ item.victoryPoint }}</td>
            <td>{{ item.win }}</td>
            <td>{{ item.draw }}</td>
            <td>{{ item.lose }}</td>
            <td>{{ item.goalEarn }}</td>
            <td>{{ item.goalLose }}</td>
            <td>{{ item.earnAndLoss }}</td>
          </tr>
          <tr>
            <td colspan="10">
              승점 > 득실차 > 상대전적 순으로 순위가 결정된다.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import util from "../../../mixins/util.js";

import { createNamespacedHelpers } from "vuex";
import {
  getLeagueRanking,
  getRelativePerformance
} from "../../../api/ranking.js";

export default {
  mixins: [util],
  data: () => ({
    rankingData: [],
    relativePerformance: [],
    season: 2020,
    seasonList: [2020, 2019, 2018]
  }),
  computed: {
    setWinnerScore(item) {
      let winnerScore = item.win * 3 + item.draw * 1;
      console.log(item);
      return item.win * 3 + item.draw * 1;
    }
  },
  async created() {
    await this.loadRelativePerformance();
    await this.loadRankingData();
  },
  methods: {
    loadRelativePerformance: async function() {
      this.relativePerformance = await getRelativePerformance(this.season);
    },
    loadRankingData: async function() {
      const result = await getLeagueRanking(this.season);
      this.rankingData = this.formatRankingData(result);
      this.sortByVictoryPoint();
      this.isSameVitoryPoint();
      this.sortByVictoryPoint();
    },
    formatRankingData: function(rankingData) {
      rankingData.forEach(item => {
        item.image = this.setTeamEmblem(item.name);
        item.victoryPoint = item.win * 3 + item.draw * 1;
        item.earnAndLoss = item.goalEarn - item.goalLose;
        item.orderValue = item.victoryPoint + item.earnAndLoss / 10000;
      });
      return rankingData;
    },
    isSameVitoryPoint: function() {
      this.rankingData.forEach((curRankingData, index) => {
        if (index === this.rankingData.length - 1) {
          return;
        }
        let nextRankingData = this.rankingData[index + 1];
        if (curRankingData.orderValue === nextRankingData.orderValue) {
          this.addRelativePerformanceOrderValue(
            curRankingData.id_unit_team,
            nextRankingData.id_unit_team,
            index
          );
        }
      });
    },
    // 상대전적 구한걸로 orderValue값 조절하는 애
    addRelativePerformanceOrderValue: function(curTeamId, nextTeamId, index) {
      const isMoreWinCurTeam = this.isMoreWinTeamA(curTeamId, nextTeamId);
      if (isMoreWinCurTeam) {
        this.rankingData[index].orderValue += 1 / 1000000;
      } else {
        this.rankingData[index + 1].orderValue += 1 / 1000000;
      }
    },
    // 두개의 팀간의 상대전적 구하는 함수
    isMoreWinTeamA(teamAId, teamBId) {
      let winCount = { teamA: 0, teamB: 0 };
      this.relativePerformance.forEach(performance => {
        let homeTeamSameTeamA =
          performance.homeId === teamAId && performance.awayId === teamBId;
        let awayTeamSameTeamA =
          performance.awayId === teamAId && performance.homeId === teamBId;

        // A팀이 이기는 경우
        const isWinATeam =
          (performance.result === "H" && homeTeamSameTeamA) ||
          (performance.result === "A" && awayTeamSameTeamA);
        // ㅠ팀이 이기는 경우
        const isWinBTeam =
          (performance.result === "H" && awayTeamSameTeamA) ||
          (performance.result === "A" && homeTeamSameTeamA);
        if (isWinATeam) {
          winCount.teamA += 1;
        }
        if (isWinBTeam) {
          winCount.teamB += 1;
        }
      });

      if (winCount.teamA <= winCount.teamB) {
        return false;
      } else if (winCount.teamA > winCount.teamB) {
        return true;
      }
    },
    setTeamEmblem(name) {
      if (name === "FS팀") {
        return require("@/assets/images/emblem/team_fs.png");
      } else if (name === "난나팀") {
        return require("@/assets/images/emblem/team_nanna.png");
      } else {
        return require("@/assets/images/emblem/team_nunnu.png");
      }
    },
    sortByVictoryPoint: function() {
      this.rankingData.sort(this.dynamicSort("-orderValue"));
    }
  }
};
</script>

<style
  scoped
  lang="scss"
  src="@/assets/scss/components/report/tab/team.scss"
></style>
