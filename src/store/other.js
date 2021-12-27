export default {
  state: {
    isCollapse: false,
    currentParentMenu: null,
    currentMenu: null,
    tabsList: [
      {
        id: '111',
        path: 'home',
        authName: '首页',
      }
    ]
  },
  mutations: {
    toggleMenu(state) {
      console.log('toggleMenu')
    },
    closeTag(state, menu) {
      console.log('closeTag')
    }
  }
}