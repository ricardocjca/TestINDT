var config = {headers:  {
        'Authorization': 'TokenEx',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        "X-Login-Ajax-call": 'true'
    }
};
angular.module("testeApp", []).controller("priCont", function($scope,$http){
	$scope.autors = [];
	$scope.books = [];
	$scope.auLivro = [];


	var carregarBook = function(){
		$http.get("http://libraryapp-alezio.rhcloud.com/api/books", config).success(function(data){
			$scope.books = data;
             	//console.log($scope.books);

			$.each(data, function(index, item1) {
            	//console.log(item1);
            	$http.get("http://libraryapp-alezio.rhcloud.com/api/authors/"+item1.authorId, config).success(function(bdata){
            		//console.log(bdata);
            		$scope.autors = bdata;
						if($scope.autors != '' || $scope.autors){

		    				var autorLivro = {
		    					'titulo': item1.title,
		    					'nome': $scope.autors.firstName
		    				};
							$scope.auLivro.push(autorLivro);
						}
	    			//	console.log(test);

            		//console.log($scope.test1);
            	});

			 });

		})
		.error(function(err){

		});
	};

	$scope.adicionarAutor = function(autor){
		$http.post("http://libraryapp-alezio.rhcloud.com/api/authors", autor, config).success(function(data){
			delete $scope.autor;
			$scope.autorForm.$setPristine();
			carregarBook();
			carregarAutor();
		});
		
	};

	$scope.apagarAutors = function(autors){
		$scope.autors = autors.filter(function(autor){
			if(!autor.selecionado) return autor;
		});
	};
	$scope.ordenarPor = function(campo){
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	};

	var carregarAutor = function(){
		$http.get("http://libraryapp-alezio.rhcloud.com/api/authors", config).success(function(data){
			
			$scope.autors = data;
		})
		.error(function(err){

		});
	};


	carregarBook();
	carregarAutor();

	
});

// $.ajax({
//          type:"GET",
//          url:"http://libraryapp-alezio.rhcloud.com/api/books",
//          dataType:"JSON",
//          headers: { 'Authorization': 'TokenEx' },
//          success:function(dados){
//              console.log(dados);
//                 $.each(dados.data, function(index, item1) {
//              //console.log(item1);

                    
                

//                 });
                
//          }
//      });


