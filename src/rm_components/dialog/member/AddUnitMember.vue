<template>
  <div>
    <v-dialog v-if="(type = 'addUnitMember')" v-model="dialog" width="600">
      <v-card>
        <v-card-title>
          유닛 팀 선수 추가
          <v-spacer />
          <a class="title__icon-close" @click="close" />
        </v-card-title>
        <v-card-text>
          <v-form ref="formUnitTeamModify" class="form">
            <v-row>
              <v-col cols="12" class="py-2">
                <v-autocomplete
                  v-model="selectedMember"
                  :items="memberWithoutTeamList"
                  dense
                  label="선수 선택"
                  autocomplete="off"
                  item-text="name"
                  item-value="id"
                  outlined
                  return-object
                ></v-autocomplete>
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

const {
  mapState: memberMapState,
  mapActions: memberMapActions
} = createNamespacedHelpers("member");

const {
  mapState: unitMemberMapState,
  mapActions: unitMemberMapActions
} = createNamespacedHelpers("unitMember");

export default {
  mixins: [dialog],
  props: {
    unitTeamId: {
      type: String,
      default: ""
    }
  },
  data: () => ({
    memberWithoutTeamList: [],
    name: "",
    description: "",
    season: null
  }),
  computed: {
    ...memberMapState(["memberList"]),
    ...unitMemberMapState(["allUnitMemberList"])
  },
  async created() {
    await this.loadAllUnitMemberList();
    this.loadMemberList();
  },
  methods: {
    ...unitMemberMapActions(["select_all_unit_member", "add_unit_member"]),
    ...memberMapActions(["select_member"]),
    close() {
      this.setDialogAndType({ dialog: false, type: null });
    },
    loadMemberList: async function() {
      await this.select_member();
      let memberIdList = [];
      this.allUnitMemberList.forEach(unitMember => {
        memberIdList.push(unitMember.member_id);
      });
      this.setMemberWithoutTeamList(memberIdList);
    },
    loadAllUnitMemberList: async function() {
      await this.select_all_unit_member();
    },
    setMemberWithoutTeamList(memberIdList) {
      this.memberWithoutTeamList = this.memberList.filter(
        item => memberIdList.indexOf(item.id) < 0
      );
    },
    save: async function() {
      this.$emit("setLoadingBar", true);
      let body = {
        member_id: this.selectedMember.id,
        unit_team_id: this.unit_team_id
      };
      const result = await this.add_unit_member(body);
      if (result.status === 200) {
        this.$emit("setSnackBar", "showSuccess", "정상적으로 추가되었습니다");
        this.$emit("reloadUnitTeamMember");
      } else {
        this.$emit("setSnackBar", "showFail", "서버 에러");
      }
      this.close();
      this.$emit("setLoadingBar", false);
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
