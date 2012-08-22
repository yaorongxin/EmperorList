/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-21
 * Time: 下午7:52
 * To change this template use File | Settings | File Templates.
 */

var reader = {

};
//$(reader.init);
(function (reader) {

    reader.AppRouter = Backbone.Router.extend({
        routes: {
            "addEmperor":"addEmperor",
            "*actions": "defaultRoute"
        },
        addEmperor: function(){
            var emperorFormView = new reader.EmperorFormView;
            var emperor = new reader.Emperor();
            emperorFormView.model = emperor;
            emperorFormView.render().$el.appendTo('.app');
        },
        defaultRoute:function(){
            var emperorCollectionView = new reader.EmperorCollectionView;
            emperorCollectionView.render().$el.appendTo('.app');
        }
    });

    reader.Emperor = Backbone.Model.extend({
        urlRoot:'/user'
    });

    reader.EmperorCollection = Backbone.Collection.extend({
        url:'/getAllUser',
        model:reader.Emperor
    });

    reader.EmperorCollectionView = Backbone.View.extend({
        tagName:'div',
        initialize:function () {
            this.model = new reader.EmperorCollection;
            this.model.fetch({add:true});
            this.model.on('add', this.addToView);
        },
        render:function () {
            $('.app').empty();
            var source = $("#emperoritem").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(this.el).append(html);
            return this;
        },
        addToView:function (data) {
            var source = $("#emperor").html();
            var template = Handlebars.compile(source);
            var context = data.toJSON();
            var html = template(context);
            $('table').append(html);
        },
        events:{
            'click #addUserButton':'add'
        },
        add:function () {
            self.location = '#addEmperor';
        }
    });

    reader.EmperorFormView = Backbone.View.extend({
        tagName:'div',
        render:function () {
            $('.app').empty();
            var source = $("#addEmperor").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(this.el).append(html);
            return this;
        },
        events:{
            'click #save':'save',
            'change #userName, #miaohao, #yihao, #nianhao':'change'
        },
        save:function () {
            this.model.save(null, {
                success:function (model, res) {
                    if (!res.isSuccess) {
                        $("#err").html(res.info);
                    } else {
                        self.location = '#defaultRoute';
                    }
                },
                error:function () {
                    $("#err").html("添加用户失败");
                }
            });
        },
        change:function () {
            this.model.set('userName', $("#userName").val());
            this.model.set('miaohao', $("#miaohao").val());
            this.model.set('yihao', $("#yihao").val());
            this.model.set('nianhao', $("#nianhao").val());
        }
    });


}(reader));
