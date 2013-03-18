/**
 * User: junghyunkim
 * Date: 13. 3. 15.
 * Time: 오후 5:45
 */

var index = 0;
var group_merge = true;
var sortable = 0;
var small_icon_class = 0;
var container = 0;
var group_class = 0;
function makeLaunchpad(args){
	
	container = args['container'];
	var item = args['item'];
	group_class = args['group_class'];
	sortable = container;
	small_icon_class = args['small_icon_class'];

	// Sortable
    $(container).sortable({
	    items: item,
	    cursor: "move",
	    delay: 100,
	    forcePlaceholderSize: false,
	    out: function(event, ui){
	    },
    	refreshPositions: true,
    	// opacity: 0.8,
    	// TODO : callback function after item moved (ajax call to server)
    	stop:function(event, ui){
    		console.log(''+index + 'end'); index = index+1;
    	}
    });

    // Droppable for Grouping
    if(small_icon_class){
	    $(item).droppable({
		    over: function( event, ui ) {
	    		$(ui.helper[0]).addClass(small_icon_class);
	    	},
	    	out: function(event, ui){
	    		$(ui.helper[0]).removeClass(small_icon_class);
	    	}
	    });
	};

    //Actions
	if(args['group_over_class']){
		$(item).droppable( "option", "hoverClass", args['group_over_class'] );
	}

	if(args['drop_callback']){
		$(item).on("drop", function( event, ui ) {
			args['drop_callback'](this, ui.helper); 
		});
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

function mergeCell(droppable, draggable){
	if($(droppable).children().hasClass('lps_icon_single')){
		$(droppable).children('.lps_icon_single').addClass('lps_icon_group');
		$(droppable).children('.lps_icon_group').removeClass('lps_icon_single');
		if((draggable).children().hasClass('lps_icon_group') == false){
			$(droppable).append('<div class="icon_description">'+$(droppable).children().children('.icon_description').text()+' & '+$(draggable).children().children('.icon_description').text()+'</div>');
		}else{
			$(droppable).append('<div class="icon_description">'+$(draggable).children('.icon_description').text()+'</div>');
		}
	}else{
		// add to group
		// do nothing
	}

	if((draggable).children().hasClass('lps_icon_group')){
		$(droppable).children('.lps_icon_group').append($(draggable).children('.lps_icon_group').children());
	}else{
		$(droppable).children('.lps_icon_group').append($(draggable).children('.lps_icon_single').children());
	}
	
	$(draggable[0]).remove();
}

// Sample
$(document).ready(function(){
	makeLaunchpad({
		container:'#sortable',
		item:'.lps_icon',
		group_over_class:'lps_icon_over',
		group_class:'lps_icon_group',
		small_icon_class:'lps_icon_small',
		drop_callback:mergeCell,
	});
});

