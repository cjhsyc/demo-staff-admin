const entryDateValidator = (rule: unknown, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请选择入职日期'))
  } else if (Date.parse(value) > Date.now()) {
    callback(new Error('入职日期不得晚于当前日期'))
  }
  callback()
}

const mailValidator = (rule: unknown, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入邮箱'))
  } else if (!value.includes('@') || !value.includes('.com')) {
    callback(new Error('请输入正确的邮箱'))
  }
  callback()
}

const phoneNumberValidator = (rule: unknown, value: string, callback: any) => {
  if (!value) {
    callback(new Error('请输入电话号码'))
  } else if (!/^1[0-9]{10}$/.test(value)) {
    callback(new Error('请输入正确的电话号码'))
  }
  callback()
}

export default {
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  age: [{ required: true }],
  entryDate: [
    { validator: entryDateValidator, required: true, trigger: 'change' },
    { validator: entryDateValidator, trigger: 'blur' }
  ],
  mail: [
    { validator: mailValidator, required: true, trigger: 'change' },
    { validator: mailValidator, trigger: 'blur' }
  ],
  phoneNumber: [
    { validator: phoneNumberValidator, required: true, trigger: 'change' },
    { validator: phoneNumberValidator, trigger: 'blur' }
  ],
  selfPositioning: [
    { type: 'array', required: true, message: '请选择定位', trigger: 'change' }
  ],
  planning: [{ max: 100, message: '不能超过100个字符', trigger: 'blur' }]
}
