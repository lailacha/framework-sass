

$(document).ready(function(){
    // S'il existe des éléments avec la classe .slider
    if($('.slider').length){
        $('.slider').each(function(index){
            sliderInit($(this));
        })
    }

    var premierSlider = $('.slider')[0];
    //Ajouter un autoplay au premier slider
    var interval = setInterval(function() {
        next($(premierSlider))
    }, 2000)

    interval();
})


function disableNav(slider){
    slider.find("nav button").attr("disabled", "false");
}

function enableNav(slider){
    slider.find("nav button").removeAttr("disabled");
}

function sliderInit(element){

    let container = $('<div></div>');
    container.addClass('slides-container');
    container.html(element.html());

    let totalSlides = container.children('img').length;

    element.html(container);
    container.find('img').addClass('slide');

    let nav = $('<nav/>')
        .append('<button class="prev"></button>')
        .append('<button class="next"></button>');

    element.append(nav);

    element.attr('data-currentSlide', 0);

    element.find('.prev').click(function(){
        prev(element);
    })

    element.find('.next').click(function(){
        next(element);
    })
}


function next(slider){
    let attrValue = Number(slider.attr('data-currentSlide'));

    slider.attr('data-currentSlide', attrValue + 1);
    slide(slider)
}

function prev(slider){
    let attrValue = Number(slider.attr('data-currentSlide'));
    slider.attr('data-currentSlide', attrValue - 1);
    slide(slider)
}

function slide(slider){
    let attrValue = Number(slider.attr('data-currentSlide'));
    let leftValue = attrValue * -100;

    let container = slider.children('.slides-container');

    // Desactiver la nav
    disableNav(slider);

    // Si on dépasse la dernière image :
    //	- cloner la premiere image et mettre le clone à la fin du container
    // 	- ecouter la fin de la transition css :
    //		- enlever la transition du container
    //		- 'rembobiner' le container vers la première image
    //		- supprimer le clone
    //		- remettre la transition sur le container

    if(attrValue == container.children('img').length){
        let clone = container.children('img:first-child').clone();
        container.append(clone);

        container.on('transitionend', function(){
            container.off('transitionend');
            container.css('transition', 'none');
            container.css('left', 0);
            slider.attr('data-currentSlide', 0);
            container.children('img:last-child').remove();
            setTimeout(function(){
                container.css('transition', 'left 1s');
            }, 20);

        })




    }

    // Si on dépasse la première image :
    //	- cloner la dernière image et mettre le clone à la fin du container
    // 	- ecouter la fin de la transition css :
    //		- enlever la transition du container
    //		- 'rembobiner' le container vers la première image
    //		- supprimer le clone
    //		- remettre la transition sur le container


    if(attrValue == -1){
        let clone = container.children("img:last-child").clone();
        clone.css({
            position: "absolute",
            left: 0,
            top: 0,
            transform: "translateX(-100%)"
        });
        container.prepend(clone);
    }

    container.css('left', leftValue + '%');

    //Ecouter la fin de la transion pour rétablir la nav



}
















