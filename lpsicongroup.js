/**
 * Created with JetBrains WebStorm.
 * User: junghyunkim
 * Date: 13. 3. 15.
 * Time: 오후 5:45
 * To change this template use File | Settings | File Templates.
 */

function makeLaunchpad(args){
	
	container = args['container'];
	item = args['item'];

	// Sortable
    $(container).sortable({
	    items: item,
	    cursor: "move",
	    delay: 150,
	    out: function(event, ui){
	    },
    	refreshPositions: true,
    });

    // Droppable for Grouping
    $(item).droppable({
	    over: function( event, ui ) {
    		$(ui.helper[0]).addClass('lps_icon_small');
    	},
    	out: function(event, ui){
    		$(ui.helper[0]).removeClass('lps_icon_small');
    	}
    });

    //Actions
	if(args['group_class']){
		console.log('group_class');
		$(item).droppable( "option", "hoverClass", args['group_class'] );
	}

	if(args['drop_callback']){
		$(item).on("drop", function( event, ui ) { args['drop_callback'](this, ui.helper); } );
	}

	// icon click	
    $(item).click(function(){
		console.log($(this).children());
		// do something here
	});

}


function getValue(item){
	//console.log($(item).children('.lps_icon_inner').text());
	return $(item);
}

function mergeCell(droppable, draggable){
	//var value = 
	$(droppable).append($(draggable).children());
	$(droppable).children('img').addClass('lps_icon_small');
	//alert(value);
	//$(droppable).text(value);

	$(droppable).addClass('lps_icon_group');
	$(draggable[0]).remove();
}

// Sample
$(document).ready(function(){

	makeLaunchpad({
		container:'#sortable',
		item:'.lps_icon',
		group_class:'lps_icon_over',
		drop_callback:mergeCell,
	});


});

