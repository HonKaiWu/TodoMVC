(function (angular) {
	'use strict';

	//初始化angular
	angular
		.module("app", [])
		.controller("todoCtrl", ["$scope", function ($scope) {
			$scope.todoList = [
				{
					id: 1,
					content: "奶奶喂了两只鸡呀",
					isCompleted: false
				},
				{
					id: 2,
					content: "什么鸡什么鸡",
					isCompleted: true
				},
				{
					id: 3,
					content: "大母鸡和大公鸡呀",
					isCompleted: false
				},
				{
					id: 4,
					content: "一只白天忙下蛋呀",
					isCompleted: true
				},
				{
					id: 5,
					content: "一只清早呜呜啼呀",
					isCompleted: false
				},
				{
					id: 6,
					content: "哎嗨哟哎嗨哟",
					isCompleted: false
				}
			];

			//1.添加
			$scope.newTodo = "";
			$scope.addTodo = function () {
				// alert($scope.newTodo);

				var newTodo = {
					id: $scope.todoList.length == 0 ? 1 : $scope.todoList[$scope.todoList.length - 1].id + 1,
					content: $scope.newTodo,
					isCompleted: false
				}
				// console.log(id);
				$scope.todoList.push(newTodo);
				$scope.newTodo = "";
				return false;
			};

			//2.删除
			$scope.remove = function (id) {
				// alert(id);
				for (var i = 0; i < $scope.todoList.length; i++) {
					var todo = $scope.todoList[i];
					if (todo.id == id) {
						$scope.todoList.splice(i, 1);
					}
				}
			};

			//3.编辑
			$scope.edit = function (id) {
				for (var i = 0; i < $scope.todoList.length; i++) {
					var todo = $scope.todoList[i];
					if (todo.id == id) {
						todo.isEdit = true;
					}
				}
			};
			//4.修改
			$scope.save = function (id) {
				for (var i = 0; i < $scope.todoList.length; i++) {
					var todo = $scope.todoList[i];
					todo.isEdit = false;
					if (todo.content == "") {
						if (todo.id == id) {
							$scope.todoList.splice(i, 1);

						}
					}

				}
			}

			//5.剩余个数
			$scope.getCount = function(){
				//
				// var count = 0;
				// for(var i=0;i<$scope.todoList.length;i++){
				// 	if(!$scope.todoList[i].isCompleted){
				// 		count++;
				// 	}
				// }
				// return count;

			var count = $scope.todoList.reduce(function(acc,item){
					if(!item.isCompleted){
						acc++;
					}
					return acc;
				},0)

				return count;
			};


			//6.全选反选
			$scope.check = false;
			$scope.checkAll = function(){
				$scope.todoList.forEach(function(v){
					v.isCompleted = $scope.check;
				})
			}

			//监视数组变化
			$scope.$watch("todoList",function(){
				//只要数组中一个未完成，check就要改成false
			// var notCheckAll = $scope.todoList.some(function(v,i){
			// 		return v.isCompleted == false;
			// 	})

			// 	$scope.check = !notCheckAll;

			
			//enery
			var check = $scope.todoList.every(function(v){
				return v.isCompleted;
			})

			$scope.check = check;

			},true);


			//7.删除选中箱
			$scope.clearCompleted = function(){
				var todoList = [];
				for(var i=0;i<$scope.todoList.length;i++){
					if(!$scope.todoList[i].isCompleted){
					 todoList.push($scope.todoList[i]);
					}
				}

				$scope.todoList = todoList;
			};


			//8.点击切换状态
			$scope.status = undefined;


		}])

})(angular);
