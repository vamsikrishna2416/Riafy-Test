$(document).ready(function(){
	
	
	$(document).on('click', '#log', function() {
        let uName = $("#Uname").val();
        let uPass = $("#Pass").val();
        
        $.ajax({
            type: 'POST',
            url: config.baseURL + "login",
            data: {
				uPass:uPass,
				uName:uName,
			},
            success: function(data) {
                if (data.hasOwnProperty("success")) {
					$("#loginPage").html("");
					$("#mainPage").template("mainPage");
                    $.tmpl("mainPage").appendTo("#appView");	
                }
                if (data.hasOwnProperty("invalid")) {
					alert(data["invalid"])
                }
            }
        });
    });
	$(document).on('click', '#searchClick', function() {
		$("#divForCompaniesToDisplay").html("");
		var companyName = $('#searchCompanies').val();
		$.ajax({
            type: 'GET',
            url: config.baseURL + "getCompanies",
            data: {
				companyName:companyName,
				
			},
            success: function(data) {
                if (data.hasOwnProperty("success")) {
					let result = data["success"];
					
					let list = "<div id='companiesList'><ul style='margin-top: 30px'>"
					for(var i=0;i<result.length;i++){
						list = list + "<li style='margin-top: 20px'>"+result[i]["Company Name"]+"</li>"
					}
					list = list + "</ul></div>"
					
					$("#divForCompaniesToDisplay").append(list);
					$("#companiesList").css({"background": "cadetblue","border-radius": "20px","margin-top": "20px","height": "550px","overflow":"auto"})
					
                }
                else if (data.hasOwnProperty("invalid")) {
					alert(data["invalid"])
                }
            }
        });
	});
	
});