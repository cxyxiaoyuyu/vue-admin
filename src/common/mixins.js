export const rolesFormRulesMixin = {
  data() {
    return {
      addFormRules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '输入的范围是 3 ~ 10 为字符',
            triggetr: 'nlur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '输入的范围是 5 ~ 20 为字符',
            triggetr: 'nlur'
          }
        ]
      },
      editFormRules: {
        roleName: [
          { required: true, message: '请输入角色名字', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '输入的范围是 3 ~ 10 为字符',
            triggetr: 'nlur'
          }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          {
            min: 5,
            max: 20,
            message: '输入的范围是 5 ~ 20 为字符',
            triggetr: 'nlur'
          }
        ]
      }
    }
  }
}