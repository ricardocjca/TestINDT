var config = {headers:  {
        'Authorization': 'TokenEx',
        'Accept': 'application/json',
        "X-Login-Ajax-call": 'true'
    }
};
angular.module("testeApp", []).controller("priCont", function($scope,$http){
	$scope.autor = [];


	var carregarAutor = function(){
		$http.get("http://libraryapp-alezio.rhcloud.com/api/authors", config).success(function(data){
			console.log(data);
			$scope.autors = data;
		})
		.error(function(err){

		});
	};

	




	carregarAutor();
	
});
