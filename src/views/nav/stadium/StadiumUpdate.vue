<template>
  <div>
    <core-Back :table-header="title" />
    <v-card class="card__addForm pa-4">
      <v-form ref="formStadiumUpdate" class="form">
        <v-row>
          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="name"
              label="이름"
              hide-details
              outlined
              :rules="[v => !!v || '입력해주십시오.']"
            />
          </v-col>
          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="address"
              label="주소"
              hide-details
              outlined
              :rules="[v => !!v || '입력해주십시오.']"
            />
          </v-col>

          <v-col cols="12" class="py-2">
            <v-text-field
              v-model="nickName"
              label="닉네임"
              hide-details
              outlined
            />
          </v-col>
        </v-row>
        <v-col cols="12" md="9" lg="9" xl="9">
          <stadium-map
            v-model="markerPosition"
            :make-marker-with-click="true"
          />
        </v-col>
        <v-row>
          <v-col cols="12" class="text-right">
            <v-btn color="primary" large @click="submit">저장</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-card>

    <util-snack-bar :purpose="snackBarPurpose" :message="snackBarMessage" />
  </div>
</template>

<script>
import util from "@/mixins/util.js";
import { createNamespacedHelpers } from "vuex";
const {
  mapState: stadiuMapState,
  mapActions: stadiumMapActions
} = createNamespacedHelpers("stadium");

export default {
  name: "Add",
  mixins: [util],
  props: {
    stadiumId: {
      type: [String, Number],
      default: null
    }
  },
  data: () => ({
    title: "STADIUM UPDATE",
    name: "",
    address: "",
    nickName: "",
    markerPosition: {
      latitude: null,
      longitude: null
    }
  }),
  async created() {
    // stadiumId로 name, address, nickName을 할당할 것
    let stadium = await this.details_stadium(this.stadiumId);
    if (stadium) {
      this.name = stadium.name;
      this.address = stadium.address;
      this.nickName = stadium.nick_name;
      this.markerPosition = {
        latitude: stadium.latitude,
        longitude: stadium.longitude
      };
    }
  },
  methods: {
    ...stadiumMapActions(["details_stadium", "update_stadium"]),
    submit() {
      if (this.$refs.formStadiumUpdate.validate()) {
        let _srcData = {
          stadium_id: this.stadiumId,
          stadium: {
            name: this.name,
            nick_name: this.nickName,
            address: this.address,
            ...this.markerPosition
          }
        };
        this.update_stadium(_srcData).then(() => {
          this.setSnackBar(this.snackBarSuccess, "정상적으로 수정되었습니다");
          history.back();
        });
      }
    }
  }
};
</script>

<style scoped>
.bg__primary {
  background-color: #002d5d;
}

.img__top {
  margin: 0 auto;
}

.input__white {
  background: #fff;
  border: solid 1px secondary;
}
</style>
