/**
 * Created with JetBrains WebStorm.
 * User: junghyunkim
 * Date: 13. 3. 15.
 * Time: 오후 5:45
 * To change this template use File | Settings | File Templates.
 */
var index = 0;
function makeLaunchpad(args){
	
	container = args['container'];
	var item = args['item'];
	var group_class = args['group_class'];

	// Sortable
    $(container).sortable({
	    items: item,
	    cursor: "move",
	    delay: 150,
	    out: function(event, ui){
	    },
    	refreshPositions: true,
    	// opacity: 0.8,
    	// TODO : callback function after item moved (ajax call to server)
    	stop:function(event, ui){console.log(''+index + 'end'); index = index+1;}
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
	if(args['group_over_class']){
		$(item).droppable( "option", "hoverClass", args['group_over_gclass'] );
	}

	if(args['drop_callback']){
		$(item).on("drop", function( event, ui ) { args['drop_callback'](this, ui.helper); } );
	}

	// icon click	
    $(item).click(function(){
		console.log($(this).children());
		// do something here
		if($(this).children().hasClass(group_class)){
			alert('group click');
			return true;
		}else{
			alert('icon click')
			return true;
		}
	});

}


function getValue(item){
	//console.log($(item).children('.lps_icon_inner').text());
	return $(item);
}

function mergeCell(droppable, draggable){
	//var value = 

	if($(droppable).children().hasClass('lps_icon_single')){
		// alert('add to icon');
		$(droppable).children('.lps_icon_single').addClass('lps_icon_group');
		$(droppable).children('.lps_icon_group').removeClass('lps_icon_single');
		$(droppable).append('<div class="icon_description">New Quest Group</div>');
	}else{
		// do nothing
		// alert('add to group');
	}

	if((draggable).children().hasClass('lps_icon_group')){
		// alert('draggable is group');
		$(droppable).children('.lps_icon_group').append($(draggable).children('.lps_icon_group').children());
	}else{
		// alert('draggable is icon');
		$(droppable).children('.lps_icon_group').append($(draggable).children('.lps_icon_single').children());
	}
	
	$(droppable).children('img').addClass('lps_icon_small');
	$(droppable).children('img').removeClass('lps_icon_small');

	$(draggable[0]).remove();
}

// Sample
$(document).ready(function(){

	makeLaunchpad({
		container:'#sortable',
		item:'.lps_icon',
		// group_over_class:'lps_icon_over',
		group_class:'lps_icon_group',
		drop_callback:mergeCell,
	});


});

