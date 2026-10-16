<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-radio-group v-model="teamType" row @change="changeType">
          <v-radio label="팀" value="Team"></v-radio>
          <v-radio label="유닛 팀" value="Unit"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-data-table
          :headers="selectedHeaders"
          :items="searchResult"
          :loading="tableLoading"
          :footer-props="teamPaging"
          sort-by="name"
          hide-default-footer
          class="elevation-1"
          @click:row="movePage"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon class="pa-2 ma-3">
              <v-icon @click.stop.native="modifyTeam(item)"
                >fas fa-pencil-alt</v-icon
              >
            </v-btn>
            <!-- <v-btn icon class="pa-2">
              <v-icon @click.stop.native="deleteTeam(item)">fas fa-trash-alt</v-icon>
            </v-btn> -->
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <dialog-team-modify
      v-if="dialog === true && type === 'unitTeamModify'"
      :selected-team="clickedTeam"
      @setSnackBar="setSnackBar"
      @setLoadingBar="setLoadingBar"
    ></dialog-team-modify>
    <!-- util -->
    <util-snack-bar
      v-if="snackBar"
      :purpose="snackBarPurpose"
      :message="snackBarMessage"
    />
    <util-loading v-if="loading" :size="100" />
  </div>
</template>

<script>
import headerJson from "@/assets/value/header.json";

import dialog from "../../mixins/dialog.js";
import util from "../../mixins/util.js";

import { createNamespacedHelpers } from "vuex";
const {
  mapState: teamMapState,
  mapMutations: teamMapMutations,
  mapActions: teamMapActions
} = createNamespacedHelpers("team");

const {
  mapState: commonMapState,
  mapMutations: commonMapMutations
} = createNamespacedHelpers("common");

export default {
  mixins: [dialog, util],
  data: () => ({
    menu: false,
    clickedTeam: {},
    teamPaging: { "items-per-page-options": [10000] },
    tableLoading: false
  }),
  computed: {
    ...teamMapState(["teamType", "teamList", "unitTeamList"]),
    ...commonMapState(["searchResult"]),
    formTitle() {
      return this.editedIndex === -1 ? "팀 추가" : "팀 정보 수정";
    },
    selectedHeaders() {
      if (this.teamType === "Team") {
        return headerJson.teamHeaders;
      } else {
        return headerJson.unitTeamHeaders;
      }
    }
  },
  mounted() {
    this.tableLoading = true;
    this.loadTeamList();
    this.loadUnitTeamList();
    this.tableLoading = false;
  },
  methods: {
    ...teamMapMutations(["SET_TEAM_TYPE"]),
    ...commonMapMutations(["SET_SEARCH_RESULT"]),
    ...teamMapActions([
      "select_all_team",
      "select_unit_team",
      "delete_unit_team"
    ]),
    changeType(val) {
      this.SET_TEAM_TYPE(val);
      if (val === "Team") {
        this.SET_SEARCH_RESULT(this.teamList);
      } else {
        this.SET_SEARCH_RESULT(this.unitTeamList);
      }
    },
    deleteTeam: async function(teamInfo) {
      this.tableLoading = true;
      let formData = { id_unit_team: teamInfo.id_unit_team };
      if (confirm("정말로 삭제하시겠습니까??")) {
        const result = await this.delete_unit_team(formData);
        console.log(result);
        if (result.status === 200) {
          this.setSnackBar(this.snackBarSuccess, "정상적으로 삭제 되었습니다.");
          this.loadTeamList();
        } else {
          this.setSnackBar(this.snackBarFail, "에러 실패!!");
        }
      }
      this.tableLoading = false;
    },
    loadTeamList: async function() {
      await this.select_all_team();
      this.setAllTeamList(this.teamList);
    },
    loadUnitTeamList: async function() {
      await this.select_unit_team();
    },
    modifyTeam: function(item) {
      if (this.teamType === "Unit") {
        this.clickedTeam = item;
        this.setDialogAndType({ dialog: true, type: "unitTeamModify" });
      }
    },
    movePage(teamInfo) {
      if (this.teamType === "Unit") {
        this.$router.push({
          name: "unitTeamDetails",
          params: { teamId: teamInfo.id_unit_team }
        });
      }
    },
    setAllTeamList(teamList) {
      this.SET_SEARCH_RESULT(teamList);
    },
    setUnitTeamList(teamList) {
      this.SET_SEARCH_RESULT(teamList);
    }
  }
};
</script>

<style scoped>
.table__member {
  overflow-y: auto;
  max-height: 600px;
}
</style>
