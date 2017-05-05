var config = {headers:  {
        'Authorization': 'TokenEx',
        'Accept': 'application/json',
        "X-Login-Ajax-call": 'true'
    }
};
var juncao = id = '';
$.ajax({
         type:"GET",
         url:"http://libraryapp-alezio.rhcloud.com/api/books",
         dataType:"JSON",
         headers: config,
         success:function(dados){
         	
         	

         	$.each(dados, function(index, item1) {
         		
         		if(item1.authorId != ''){
	         		$.ajax({
			         type:"GET",
			         url:"http://libraryapp-alezio.rhcloud.com/api/authors/"+item1.authorId,
			         dataType:"JSON",
			         headers: config,
			         success:function(adados){
			         	console.log(adados);  

			         	juncao += '<tr><td><a href="http://ricardocjca.000webhostapp.com/angular.html?aid='+adados.id+'"><span style="cursor: pointer;" value="'+adados.id+'"  class="glyphicon glyphicon-pencil" aria-hidden="true"></span></a>&nbsp;'+adados.firstName+' '+adados.lastName+'</td><td><span style="cursor: pointer;" value="'+item1.id+'" id="b" class="glyphicon glyphicon-pencil" aria-hidden="true"></span>&nbsp;'+item1.title+'</td></tr>';
			         	


	  					$('#lista').html(juncao);

	  					
			         }
	     			});
         		}

         	});

         }
     });



	var dados = location.search.substring(1).split("=");

	id = dados[1];

	if(id != ''){
		
		$.ajax({
         type:"GET",
         url:"http://libraryapp-alezio.rhcloud.com/api/authors/"+id,
         dataType:"JSON",
         headers: config,
         success:function(dados){

         	$("#formularioautor").css("display","block");
         	$("#cadastrar").css("display","none");
         	$("#atualizar").css("display","block");
         	
         	document.getElementById('pnome').value = dados.firstName;
         	document.getElementById('fnome').value = dados.lastName;

         	
         }
     });
	}

	




$("#cadastrar").on("click", function(){
	$.ajax({
         type:"POST",
         url:"http://libraryapp-alezio.rhcloud.com/api/authors",
         dataType:"JSON",
         data: new FormData($('#form')[0]),
         headers: config,
         success:function(dados){
         	
         	console.log(dados);

         }
     });
});