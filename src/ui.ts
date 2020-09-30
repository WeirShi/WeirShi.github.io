import Vue from "vue";
// collapse 展开折叠
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
Vue.component(CollapseTransition.name, CollapseTransition);

import {
  Button,
  Icon,
  notification,
  Collapse,
  Spin,
  Tag,
  BackTop,
  Input,
  Drawer
} from "ant-design-vue";

const components = [Button, Icon, Collapse, Spin, Tag, BackTop, Input, Drawer];

components.forEach(component => {
  Vue.use(component);
});

Vue.prototype.$notification = notification;
