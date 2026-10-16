<template>
  <div class="mx-0">
    <v-row justify="center">
      <v-spacer />
      <v-col cols="12" xs="12" sm="12" md="6" lg="3" xl="3">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-right="40"
          transition="scale-transition"
          offset-y
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker without buttons"
              prepend-icon="fas fa-calendar-day"
              readonly
              solo
              rounded
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :allowed-dates="allowedEvents"
            :events="arrayEvents"
            event-color="green lighten-1"
            @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </v-col>
      <v-col cols="12" xs="12" sm="12" md="6" lg="3" xl="3">
        <v-autocomplete
          v-model="values"
          :items="quarterList"
          solo
          rounded
        ></v-autocomplete>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    values: 1,
    arrayEvents: [],
    quarterList: [1, 2, 3, 4, 5, 6, 7, 8],
    model: null
  }),
  mounted() {
    this.arrayEvents = [...Array(6)].map(() => {
      const day = Math.floor(Math.random() * 30);
      const d = new Date();
      d.setDate(day);
      return d.toISOString().substr(0, 10);
    });
  },
  methods: {
    allowedEvents: function(val) {
      return this.arrayEvents.indexOf(val) > -1;
    }
  }
};
</script>

<style></style>
