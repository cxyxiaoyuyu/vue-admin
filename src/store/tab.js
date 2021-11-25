export default {
  state: {
    isCollapse: false,
    currentMenu: null,
    tabsList: [
      {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 'home'
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
        if (state.tabsList.findIndex(item => item.name === menu.name) === -1) {
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