import $ from "jquery";
import Handlebars from "handlebars";

var DOM = {
    product: '.js-product',
    filter: '.js-filter',
    productsContainer: '.js-products-container'
}

class Filter {
    constructor(cnt, productsContainer){
        this.cnt = cnt;
        this.productsContainer = productsContainer;
        this.events();
    }
    clear(){
        fetch('data/clear.json')
            .then(r=>r.json())
            .then(data=>{
                console.log(data);
            })
    }
    show(){
        fetch('data/show.json')
            .then(r=>r.json())
            .then(data=>{
                this.update(data);
            })
    }
    update(data){
        console.log(data);
        var productTemplateSource   = document.getElementById("entry-template").innerHTML;
        var productTemplate = Handlebars.compile(productTemplateSource);
        var $productsContainer = $(this.productsContainer);
        $productsContainer.html('');
        data.result.products.forEach(el=>{
            var html    = productTemplate(el);
            $productsContainer.append(html);
        });
        if($(DOM.product).length) $(DOM.product).each(function(){
            new ProductTile($(this));
        })
    }
    events(){
        var that = this;
        this.cnt.find('.js-filter-reset').click(function(e){
            e.preventDefault();
            that.clear();
        });
        this.cnt.find('.js-filter-show').click(function(e){
            e.preventDefault();
            that.show();
        });
    }
}

class ProductTile {
    constructor(cnt){
        this.cnt = cnt;
        this.id = $(this.cnt).data('id');
        this.events();
    }
    fav(){
        fetch('data/fav.json')
            .then(r=>r.json())
            .then(data=>{
                console.log(this.id);
                console.log(data);
            })
    }
    events(){
        var that = this;
        this.cnt.find('.js-product-fav').click(function(e){
            e.preventDefault();
            that.fav();
        });
    }
}

$(function(){
    if($(DOM.filter).length && $(DOM.productsContainer).length) new Filter($(DOM.filter), $(DOM.productsContainer));
    if($(DOM.product).length) $(DOM.product).each(function(){
        new ProductTile($(this));
    })
});
