import Vue from "vue";
import {
  Table,
  Button,
  TableColumn,
  Input,
  Col,
  Row,
  Select,
  Option,
  DatePicker,
  Pagination,
  Message,
  MessageBox,
  Form,
  FormItem,
  InputNumber,
  CheckboxGroup,
  Checkbox,
  Upload
} from "element-ui";

Vue.use(Table)
Vue.use(Button)
Vue.use(TableColumn)
Vue.use(Input)
Vue.use(Row)
Vue.use(Col)
Vue.use(Select)
Vue.use(Option)
Vue.use(DatePicker)
Vue.use(Pagination)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(InputNumber)
Vue.use(CheckboxGroup)
Vue.use(Checkbox)
Vue.use(Upload)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm
