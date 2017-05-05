var config = {headers:  {
        'Authorization': 'TokenEx',
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        "X-Login-Ajax-call": 'true'
    }
};

var meuApp = angular.module("meuApp", []);

meuApp.controller("meuControle", function($scope,$http){

	// $scope.novoUsuario = {};
	$scope.usuarioClicado = {};
	$scope.livroClicado = {};
	$scope.autors = [];
	$scope.auTores = [];
	$scope.autorlivro = [];
	$scope.auLivros = [];

	$scope.autorForm = {};


//recebe dados do autor selecionado

	$scope.usuarioSelecionado = function(aulivro){
		//console.log(aulivro.idAutor);
		//console.log(aulivro);

		$http.get("http://libraryapp-alezio.rhcloud.com/api/authors/"+aulivro.idAutor, config).success(function(data){
			$scope.pauid = data;


			$.each(data, function(index, item) {

				//console.log(data.lastName);

				var dadosA = [{
					'firstName': data.firstName,
					'lastName' : data.lastName,
					'id'       : data.id
				}];

				//$scope.dadosAutor = dadosA;


				$scope.usuarioClicado = dadosA;
			});
				//console.log($scope.usuarioClicado);
			

		}).error(function(data){
			$scope.pauid = "Dados: "+ data;
			console.log(":( " + data);

		});

	};
//
// recebe dados do book selecionado

	$scope.livroSelecionado = function(aulivro){
		//console.log(aulivro.idAutor);
		//console.log(aulivro);

		$http.get("http://libraryapp-alezio.rhcloud.com/api/books/"+aulivro.id, config).success(function(data){
			//console.log(data);
			var dadosL = [{
				'title': data.title,
				'id'   : data.id,
				'idLivro' : data.authorId
			}];
			//$scope.dadosAutor = dadosA;
			$scope.livroClicado = dadosL;
			//console.log($scope.livroClicado);
		}).error(function(data){
			$scope.pauid = "Dados: "+ data;
			console.log(":( " + data);

		});

	};

	// $scope.usuarioEditado = function(){

	// };
	
//carrego os autores e busco os books referentes a cada autor
	var carregarAutor = function(){
		$http.get("http://libraryapp-alezio.rhcloud.com/api/authors", config).success(function(data){
			
			$scope.autors = data;
			
			$.each(data, function(index, item) {
            	//console.log(item1);
            	$http.get("http://libraryapp-alezio.rhcloud.com/api/authors/"+item.id+'/books', config).success(function(bdata){
             		//$scope.autorlivro = bdata;
            		//console.log($scope.autorlivro);
						
	            	$.each(bdata, function(index1, item1) {
	            		//console.log(item1);
	    				var autorLivro = {
	    					'idAutor': item1.authorId,
	    					'titulo': item1.title,
	    					'id'     : item1.id,
	    					'nome': item.firstName
	    				};
						$scope.auLivros.push(autorLivro);
					});
						
	    			//	console.log(test);
            		//console.log($scope.test1);
            	});

			 });


		
		})
		.error(function(err){

		});

	};

//pego todos os autores da api
	var pegaAutor = function(){
		$http.get("http://libraryapp-alezio.rhcloud.com/api/authors", config).success(function(data){
			
			$scope.auTores = data;
			//console.log($scope.auTores);

		})
		.error(function(err){

		});
	};

//adiciona autor
	$scope.adicionarAutor = function(){
		//console.log($scope.autorForm);
		$http.post("http://libraryapp-alezio.rhcloud.com/api/authors", $scope.autorForm, [config]).success(function(data){
			$scope.aa = data;
			swal(
			  'Parabéns!',
			  'Autor cadastrado com sucesso!',
			  'success'
			)

		}).error(function(data){
			$scope.aa = "Dados: "+ data;
			swal(
			  'Desculpe!',
			  'Não foi possivel cadastrar!',
			  'error'
			)

		});
		
	
	};

//Adiciona book
	$scope.adicionarLivro = function(){
		//console.log($scope.livroForm);
		$http.post("http://libraryapp-alezio.rhcloud.com/api/books", $scope.livroForm, [config]).success(function(data){
			$scope.livro = data;
			swal(
			  'Parabéns!',
			  'Livro cadastrado com sucesso!',
			  'success'
			)
		}).error(function(data){
			$scope.livro = "Dados: "+ data;
			swal(
			  'Desculpe!',
			  'Não foi possivel cadastrar!',
			  'error'
			)

		});
		
	
	};

//pega os dados do form referente ao autor editado e envia para api
	$scope.usuarioEditado = function(){
		//console.log($scope.usuarioClicado[0].id);

		var id = $scope.usuarioClicado[0].id;

		$http.put("http://libraryapp-alezio.rhcloud.com/api/authors/"+id, $scope.usuarioClicado[0], [config]).success(function(data){
			$scope.foiEditado = data;
			console.log(":)" + data);
		}).error(function(data){
			$scope.foiEditado = "Dados: "+ data;
			console.log(":( " + data);

		});
	};

//pega os dados do form referente ao book editado e envia para api
	$scope.livroEditado = function(){
		//console.log($scope.livroClicado[0]);

		var id = $scope.livroClicado[0].id;

		$http.put("http://libraryapp-alezio.rhcloud.com/api/books/"+id, $scope.livroClicado[0], [config]).success(function(data){
			$scope.foiEditado = data;
			console.log(":)" + $scope.foiEditado);
		}).error(function(data){
			$scope.foiEditado = "Dados: "+ data;
			console.log(":( " + $scope.foiEditado);

		});
	};
//deleta o autor
	$scope.deletarUsuario = function(usuarioClicado){
		//console.log(usuarioClicado[0].id);
		var id = $scope.usuarioClicado[0].id;

		$http.delete("http://libraryapp-alezio.rhcloud.com/api/authors/"+id, [config]).success(function(data){
			$scope.foiExcluido = data;
			console.log(":)" + $scope.foiExcluido);
		}).error(function(data){
			$scope.foiExcluido = "Dados: "+ data;
			console.log(":( " + $scope.foiExcluido);

		});
	};
//deleta dados do books
	$scope.deletarLivro = function(livroClicado){
		//console.log(usuarioClicado[0].id);
		var id = $scope.livroClicado[0].id;

		$http.delete("http://libraryapp-alezio.rhcloud.com/api/books/"+id, [config]).success(function(data){
			$scope.foiExcluido = data;
			console.log(":)" + $scope.foiExcluido);
		}).error(function(data){
			$scope.foiExcluido = "Dados: "+ data;
			console.log(":( " + $scope.foiExcluido);

		});
	};

//escopo de ordenacao
	$scope.ordenarPor = function(campo){
		$scope.oRdenacao = campo;
		$scope.dirOrdenacao = !$scope.dirOrdenacao;
	};

//carrega a funcao carregarAutor
	carregarAutor();
	pegaAutor();
});