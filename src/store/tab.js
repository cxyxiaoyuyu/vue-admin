export default {
  state: {
    isCollapse: false,
  },
  mutations: {
    toggleMenu(state){
      state.isCollapse = !state.isCollapse 
    }
  }
}