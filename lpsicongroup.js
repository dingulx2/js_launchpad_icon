/**
 * Created with JetBrains WebStorm.
 * User: junghyunkim
 * Date: 13. 3. 15.
 * Time: 오후 5:45
 * To change this template use File | Settings | File Templates.
 */

 function getValue(item){
 	//console.log($(item).children('.lps_icon_inner').text());
 	return $(item).text();
 }

$(document).ready(function(){
	//alert('hello');

    $("#sortable").sortable({
    	//placeholder:"sortable-placeholder",
	    //forcePlaceholderSize: true,
	    items: "> .lps_icon",
	    out: function(event, ui){
	    	//console.log('sortable out [' + event + "]: " + $(ui));
	    },
	    //helper: 'clone',
    	//forcePlaceholderSize: true,
    	refreshPositions: true,
    });

    $(".lps_icon").droppable({
    	hoverClass:'lps_icon_over',
    	drop:function(event, ui){
			console.log('droppable drop'+$(this).text());
			var value = $(this).text() + ", " + getValue(ui.helper);
			$(this).text(value);
			$(this).addClass('lps_icon_group');
			ui.helper[0].remove();
			// Merge icons
			//$(this).remove();
    	},
	    over: function( event, ui ) {
    		//console.log('droppable over' + $(this).text());
    		//$(ui.helper[0]).children('.lps_icon_inner').addClass('lps_icon_small');
    		$(ui.helper[0]).addClass('lps_icon_small');
    	},
    	out: function(event, ui){
    		//console.log('droppable out' + $(this).text());
    		$(ui.helper[0]).removeClass('lps_icon_small');
    		//$(ui.helper[0]).children('.lps_icon_inner').removeClass('lps_icon_small');
    	}
    });

    $(".lps_icon").click(function(){
		alert('click');
		// do something here
	});

/*
	$('.lps_icon_inner').droppable({
		drop: function( event, ui ) {
			alert($(this).text());
			// check status here
			// if it is grouping action : make a group or merge group
			// else it is sorting action : sort
			// else move original position
			return true;
		}
	});
*/	
});

