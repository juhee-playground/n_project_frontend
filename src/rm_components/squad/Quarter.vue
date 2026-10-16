<template>
  <v-container class="quarter__container">
    <v-row class="mx-2">
      <v-col cols="12" class="quarter__list">
        <v-slide-group v-model="slideIndex" show-arrows center-active>
          <v-slide-item
            v-for="item in quarterList"
            :key="item"
            v-slot:default="{ active, toggle }"
            class="my-2"
          >
            <v-card
              class="quarter__card"
              :class="{ active: active }"
              height="30"
              width="50"
              @click="toggle"
              @click.native="clickOtherQuarter(item)"
            >
              <v-scale-transition>
                <p class="quarter__text">{{ item }}</p>
              </v-scale-transition>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import regex from "../../mixins/regex.js";
import { createNamespacedHelpers } from "vuex";
const { mapState, mapMutations } = createNamespacedHelpers("prepareMatch");

export default {
  mixins: [regex],
  data: () => ({
    menu: false
  }),
  computed: {
    ...mapState(["quarterList", "quarterIndex"]),
    slideIndex: {
      get: function() {
        return this.quarterIndex;
      },
      set: function(new_value) {
        this.SET_QAURTER_INDEX(new_value);
      }
    }
  },
  mounted() {
    // 지금 params로 쿼터 버튼을 누르게 한다.
    let params = this.$route.params;
    if (params.quarter) {
      this.SET_QAURTER_INDEX(params.quarter - 1);
    } else {
      this.SET_QAURTER_INDEX(0);
    }
  },

  methods: {
    ...mapMutations(["SET_DATE", "SET_QAURTER_INDEX"]),
    clickOtherQuarter: function(item) {
      this.$emit("changeQuarterAndParams", item);
    }
  }
};
</script>

<style lang="scss">
.quarter__container {
  padding: 0;
  .quarter__list {
    .quarter__card {
      margin: 0px 5px;
      padding: 5px 0;
      background-color: #fafafa;
      .quarter__text {
        font-size: 14px;
        color: #666;
        font-weight: 500;
        margin-bottom: 0;
      }
      &.active {
        background-color: #34558b;
        .quarter__text {
          color: #ddd;
        }
      }
    }
  }
}
</style>
