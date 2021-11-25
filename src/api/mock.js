import Mock from 'mockjs'

Mock.mock('/api/login', {
  data: {
    email: "admin@qq.com",
    id: 500,
    mobile: "18296344993",
    rid: 0,
    token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2Mzc4MzQyNzksImV4cCI6MTYzNzkyMDY3OX0.ygwkf2rxUhwVGfdY8fw1V8cp7s4rL09qv6J037oCf68",
    username: "admin"
  }
})

Mock.mock('/api/menus', {
  data: [{
    "id": 125,
    "authName": "用户管理",
    "path": "users",
    "order": 1,
    "children": [{
      "id": 110,
      "authName": "用户列表",
      "path": "users",
      "children": [],
      "order": 2 
    }],
  }, {
    "id": 103,
    "authName": "权限管理",
    "path": "rights",
    "children": [{
      "id": 111,
      "authName": "角色列表",
      "path": "roles",
      "children": [],
      "order": null
    }, {
      "id": 112,
      "authName": "权限列表",
      "path": "rights",
      "children": [],
      "order": 2
    }]
  }, {
    "id": 101,
    "authName": "商品管理",
    "path": "goods",
    "children": [{
      "id": 104,
      "authName": "商品列表",
      "path": "goods",
      "children": [],
      "order": 1
    }, {
      "id": 115,
      "authName": "分类参数",
      "path": "params",
      "order": 2,
      "children": [],
    }, {
      "id": 121,
      "authName": "商品分类", "path": "categories", "children": [], "order": 3
    }], "order": 3
  }, { "id": 102, "authName": "订单管理", "path": "orders", "children": [{ "id": 107, "authName": "订单列表", "path": "orders", "children": [], "order": null }], "order": 4 }, {
    "id": 145, "authName": "数据统计", "path": "reports", "children": [{ "id": 146, "authName": "数据报表", "path": "reports", "children": [], "order": null }], "order": 5
  }],
  "meta": { "msg": "获取菜单列表成功", "status": 200 }
})

Mock.mock('/api/home/getData', {
  data: [
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
    {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄",
    },
    {
      date: "2016-05-04",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1517 弄",
    },
    {
      date: "2016-05-01",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1519 弄",
    },
    {
      date: "2016-05-03",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1516 弄",
    },
  ]
})
