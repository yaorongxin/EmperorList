/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-21
 * Time: 下午7:52
 * To change this template use File | Settings | File Templates.
 */

var emperor = {

};
//$(emperor.init);
(function (emperor) {

    emperor.AppRouter = Backbone.Router.extend({
        routes: {
            "addEmperor":"addEmperor",
            "*actions": "defaultRoute"
        },
        addEmperor: function(){
            var emperorFormView = new emperor.EmperorFormView;
            var emperorItem = new emperor.Emperor();
            emperorFormView.model = emperorItem;
            emperorFormView.render().$el.appendTo('#app');
        },
        defaultRoute:function(){
            var emperorCollectionView = new emperor.EmperorCollectionView;
            emperorCollectionView.render().$el.appendTo('#app');
        }
    });

    emperor.Emperor = Backbone.Model.extend({
        urlRoot:'/user'
    });

    emperor.EmperorCollection = Backbone.Collection.extend({
        url:'/getAllUser',
        model:emperor.Emperor
    });

    emperor.EmperorCollectionView = Backbone.View.extend({
        tagName:'div',
        className:'listView',
        initialize:function () {
            this.model = new emperor.EmperorCollection;
            this.model.fetch({add:true});
            this.model.on('add', this.addToView);
        },
        render:function () {
            $('#app').empty();
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

    emperor.EmperorFormView = Backbone.View.extend({
        tagName:'div',
        className:'listView',
        render:function () {
            $('#app').empty();
            var source = $("#addEmperor").html();
            var template = Handlebars.compile(source);
            var html = template();
            $(this.el).append(html);
            return this;
        },
        events:{
            'change #userName, #miaohao, #yihao, #nianhao':'change',
            'click #save':'save'

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


}(emperor));
