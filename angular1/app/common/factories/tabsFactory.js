(function() {
  angular.module('primeiraApp').factory('tabs', [TabsFactory]) //aponta pro metodo TabsFactory, ou poderia passar a função

  function TabsFactory() {

    function show(owner, {
      tabList = false,  // {tabList : tabList} porem ja dou um valor padrao por conta do ES2015
      tabCreate = false,
      tabUpdate = false,
      tabDelete = false
    }){
      owner.tabList = tabList
      owner.tabCreate = tabCreate
      owner.tabUpdate = tabUpdate
      owner.tabDelete = tabDelete

    }

    return { show }
  }
})()
