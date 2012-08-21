/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-19
 * Time: 上午10:23
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){


    var EmperorListModel = Backbone.Model.extend({
        //urlRoot : '/user'
    });
    var EmperorListCollection = Backbone.Collection.extend({
        url: '/getAllUser',
        model:EmperorListModel
    });

    var EmperorListView = Backbone.View.extend({
        tagName:'tr',
    render:function(){
        var source =  $("#emperoritem").html();
        var template = Handlebars.compile(source);
        var context = this.model.toJSON();
        var html = template(context);
        this.$el.html(html);
    return this;
    }
    });

    var EmperorView = Backbone.View.extend({
        el:$('.app'),
        initialize: function(){
            this.emperorListCollection = new EmperorListCollection;
            this.emperorListCollection.on('reset', this.addAll, this);
            this.emperorListCollection.fetch();
        },
        render: function() {
            var _this = this;
            $(this.el).empty();
            $('<button id="addUserButton">添加</button>').appendTo(this.el);
           var table =  $('<table border="1" class="page"></table>');
            table.appendTo(this.el);
            table.append('<tr><th>姓名</th><th>庙号</th><th>谥号</th><th>年号</th></tr>');
            return this;
        },
        addAll:function(){
            this.emperorListCollection.each(function(model){
                var emperorListView = new EmperorListView({model : model});
                $('table').append(emperorListView.render().el);
            });
        },
        events:{
            'click #addUserButton':'add'
        },
        add:function(){
            self.location='addEmperor.html';
        }
    });

    var emperorView = new EmperorView;
            emperorView.render();
});