import { createApp } from 'vue';
import {
  Button,
  Card,
  Col,
  Row,
  Form,
  Input,
  InputNumber,
  Layout,
  Menu,
  Tabs,
  Table,
  Tag,
  Pagination,
  Modal,
  Avatar,
  Divider,
  Radio,
  Badge,
} from 'ant-design-vue';
import App from './App.vue';
import router from './router';
import store from './store';

const app = createApp(App);
app.config.productionTip = false;
app.use(store)
  .use(router)
  .use(Button)
  .use(Card)
  .use(Form)
  .use(Input)
  .use(InputNumber)
  .use(Layout)
  .use(Menu)
  .use(Tabs)
  .use(Col)
  .use(Row)
  .use(Table)
  .use(Tag)
  .use(Pagination)
  .use(Modal)
  .use(Avatar)
  .use(Divider)
  .use(Radio)
  .use(Badge)
  .mount('#app');
