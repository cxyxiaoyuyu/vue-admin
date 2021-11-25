export default {
  state: {
    isCollapse: false,
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
      state.isCollapse = !state.isCollapse
    },
    selectMenu(state, menu) {
      menu.name === 'home' ? (state.currentMenu = null) : state.currentMenu = menu

      if (menu.name === 'home') {
        state.currentMenu = null
      } else {
        state.currentMenu = menu

        // 新增tabList
        if (state.tabsList.findIndex(item => item.id === menu.id) === -1) {
          state.tabsList.push(menu)
        }

      }
    },
    closeTag(state, menu) {
      let index = state.tabsList.findIndex(item => item.name === menu.name)
      state.tabsList.splice(index, 1)
    }
  }
}