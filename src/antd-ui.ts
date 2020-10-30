import Vue from "vue";

import {
  Button,
  Icon,
  notification,
  Collapse,
  Spin,
  Tag,
  BackTop,
  Input,
  Drawer,
  Pagination,
  Form,
  FormModel,
  Checkbox,
  Menu,
  Layout,
  Breadcrumb,
  Dropdown,
  Table,
  Empty,
  Divider,
  Popconfirm,
  Modal,
  LocaleProvider,
  ConfigProvider,
  Select,
  Upload,
  message
} from "ant-design-vue";

const components = [
  Button,
  Icon,
  Collapse,
  Spin,
  Tag,
  BackTop,
  Input,
  Drawer,
  Pagination,
  Form,
  FormModel,
  Checkbox,
  Menu,
  Layout,
  Breadcrumb,
  Dropdown,
  Table,
  Empty,
  Divider,
  Popconfirm,
  Modal,
  LocaleProvider,
  ConfigProvider,
  Select,
  Upload
];

components.forEach(component => {
  Vue.use(component);
});

Vue.prototype.$notification = notification;
Vue.prototype.$message = message;
