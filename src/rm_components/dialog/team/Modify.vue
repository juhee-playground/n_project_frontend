<template>
  <div>
    <v-dialog v-if="(type = 'unitTeamModify')" v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          팀 정보 수정
          <v-spacer />
          <a class="title__icon-close" @click="close" />
        </v-card-title>
        <v-card-text>
          <v-form ref="formUnitTeamModify" class="form">
            <v-row>
              <v-col cols="12" class="py-2">
                <v-text-field
                  v-model="name"
                  label="팀 이름"
                  hide-details
                  outlined
                  :rules="[v => !!v || '입력해주십시오.']"
                />
              </v-col>
              <v-col cols="12" class="py-2">
                <v-text-field
                  v-model="description"
                  label="상세정보"
                  hide-details
                  outlined
                  :rules="[v => !!v || '입력해주십시오.']"
                />
              </v-col>
              <v-col cols="12" class="py-2">
                <v-text-field
                  v-model="season"
                  type="number"
                  label="시즌"
                  outlined
                  hide-details
                  prepend-inner-icon="fas fa-calendar-alt"
                />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions class="justify-end mx-4">
          <v-btn color="primary" @click="save">저장</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import dialog from "../../../mixins/dialog.js";

import { createNamespacedHelpers } from "vuex";
const { mapActions: teamMapActions } = createNamespacedHelpers("team");

export default {
  mixins: [dialog],
  props: {
    selectedTeam: {
      type: Object,
      default: () => {}
    }
  },
  data: () => ({
    name: "",
    description: "",
    season: null
  }),
  created() {
    console.log(this.selectedTeam);
    this.name = this.selectedTeam.name;
    this.description = this.selectedTeam.description;
    this.season = this.selectedTeam.season;
  },
  methods: {
    ...teamMapActions(["update_unit_team"]),
    close() {
      this.setDialogAndType({ dialog: false, type: null });
    },
    save: async function() {
      this.$emit("setLoadingBar", true);
      let teamInfo = {
        name: this.name,
        description: this.description,
        season: this.season
      };
      let body = {
        id_unit_team: this.selectedTeam.id_unit_team,
        unit_team_info: teamInfo
      };
      const result = await this.update_unit_team(body);
      if (result.status === 200) {
        this.$emit("setSnackBar", "showSuccess", "정상적으로 수정되었습니다");
      } else {
        this.$emit("setSnackBar", "showFail", "서버 에러");
      }
      this.$emit("setLoadingBar", false);
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
.title__icon-close {
  width: 32px;
  height: 32px;
  background: url("../../../assets/images/close.svg");
  &:hover {
    border-radius: 50%;
    background-color: #8c8c8c14;
  }
}
</style>
