import Vue from "vue";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
Vue.component(CollapseTransition.name, CollapseTransition);

import { Button, Input, ColorPicker } from "element-ui";
Vue.use(Button);
Vue.use(Input);
Vue.use(ColorPicker);
