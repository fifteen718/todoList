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
    }
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
        deleteShow: false,
        isFinished: false
      });
      this.newItem = ''
    },
    clearAll: function () {
      window.localStorage.clear();
      this.items = [];
    },
    deleteOne: function (index) {
      if (window.event && event.stopPropagation) {
        event.stopPropagation();
      }
      this.items.splice(index, 1);
    },
    touchstart: function () {
      var e = window.event;
      // e.preventDefault();
      startX = e.targetTouches[0].pageX;
      startY = e.targetTouches[0].pageY;
    },
    touchmove: function (item) {
      var e = window.event;
      // e.preventDefault();
      moveEndX = e.targetTouches[0].pageX;
      moveEndY = e.targetTouches[0].pageY;
      X = moveEndX - startX;
      Y = moveEndY - startY;
      if (Math.abs(X) > 120 && Math.abs(X) > Math.abs(Y) && X > 0) {
        if(item.deleteShow == true){
          console.log("右滑事件");
          item.deleteShow = false;
        };
      } else if (Math.abs(X) > 120 && Math.abs(X) > Math.abs(Y) && X < 0) {
        if(item.deleteShow == false){
          for(var i=0;i<this.items.length;i++){
            if(this.items[i].deleteShow == true){
              this.items[i].deleteShow = false;
            }
          };
          console.log("左滑事件");
          item.deleteShow = true;
        }
      }
    }
  }
});
