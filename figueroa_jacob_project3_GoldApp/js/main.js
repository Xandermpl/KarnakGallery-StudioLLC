// Project 3 MIU 1208
// Jacob Figueroa

// handle data
var parseAddItemForm = function(data){
	//uses form data here;
	console.log(data);
	
};
// jquery dom ready call
$(document).ready(function(){
	
	var aiform = $('#additemform');
		aierrorslink = $('#aierrorslink')
	;
	
	aiform.validate({
		invalidHandler: function(form, validator){
			aierrorslink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="' + key + '"]').not('[generated]');
				var legend = label.closest('fieldset').find('.ui-controlgroup-label');
				// tertiary statement - condition ? true : false
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>' + fieldName + '</li>';
			};	
			$('#additemerrors ul').html(html);			
		},
		submitHandler: function(){
			var data = aiform.serializeArray();
			parseAddItemForm(data);
			
		}
		
		
	});
	
});