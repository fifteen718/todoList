const STORAGE_KEY = 'todos-vuejs';
fetch = function () {
  return JSON.parse(window.localStorage.getItem(STORAGE_KEY) || '[]')
};
save = function (items) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
};

new Vue({
  el: '#app',

  data: function () {
    return {
      title: 'Todo List',
      items: fetch(),
      newItem: ''
    }
  },

  watch: {
    items: {
      handler: function (items) {
        save(items);
      },
      deep: true
    },
  },

  methods: {
    toggleFinish: function (item) {
      item.isFinished = !item.isFinished;
    },
    addNew: function () {
      if (this.newItem.match(/^[ ]*$/)) {
        alert("添加内容不能为空！");
        this.newItem = '';
        return false;
      }
      this.items.unshift({
        label: this.newItem,
        isFinished: false,
        deleteShow: false
      });
      this.newItem = ''
    },
    clearAll: function () {
      window.localStorage.clear();
      this.items = [];
    },
    deleteOne: function (index) {
      if(window.event&&event.stopPropagation){
        event.stopPropagation();
      };
      this.items.splice(index, 1);
    }
  }
  
});
