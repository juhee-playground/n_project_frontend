import theme from "./theme";
import "@fortawesome/fontawesome-free/css/all.css";

import "vuetify/styles";
import { createVuetify } from "vuetify";

export default createVuetify({
  icons: {
    iconfont: "fa",
  },
  theme,
});
