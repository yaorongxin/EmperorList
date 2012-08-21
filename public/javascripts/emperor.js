/**
 * Created with JetBrains WebStorm.
 * User: jiangli
 * Date: 12-8-21
 * Time: 下午7:52
 * To change this template use File | Settings | File Templates.
 */


function emperorList() {
    var EmperorCollection = Backbone.Collection.extend({
        url:'/getAllUser'
    });
     var emperorCollection = new EmperorCollection;
    var EmperorCollectionView = Backbone.View.extend({
        el:$('.app'),
        initialize:function () {
            this.emperorCollection = emperorCollection;
            this.emperorCollection.on('reset', this.addAll, this);
            this.emperorCollection.fetch();
        },
        render:function () {
            $(this.el).empty();
            $('<button id="addUserButton">添加</button>').appendTo(this.el);
            var table = $('<table border="1" class="page"></table>');
            table.appendTo(this.el);
            table.append('<tr><th>姓名</th><th>庙号</th><th>谥号</th><th>年号</th></tr>');
            return this;
        },
        addAll:function () {
            this.emperorCollection.each(function (model) {
                var source =  $("#emperoritem").html();
                var template = Handlebars.compile(source);
                var context = model.toJSON();
                var html = template(context);
               $('table').append(html);
            });
        },
        events:{
            'click #addUserButton':'add'
        },
        add:function () {
            self.location = 'addEmperor.html';
        }
    });
    var emperorCollectionView = new EmperorCollectionView;
    emperorCollectionView.render();
}

function addEmperor() {
    var Emperor = Backbone.Model.extend({
        urlRoot : '/user'
    });
    var emperor = new Emperor();
    var EmperorFormView = Backbone.View.extend({
        el:$('.app'),
        render: function() {
            var source =  $("#addEmperor").html();
            var template = Handlebars.compile(source);
            var html = template();
            $('.app').append(html);
            return this;
        },
        events:{
            'click #save':'save',
            'change #userName, #miaohao, #yihao, #nianhao':'change'
        },
        save:function(){
            this.model.save(null, {
                success:function(model,res) {
                    if (!res.isSuccess) {
                        $("#err").html(res.info);
                    } else {
                    self.location='index.html';
                    }
                },
                error:function() {
                    $("#err").html("添加用户失败");
                }
            });
        },
        change:function(){
            this.model.set('userName',$("#userName").val());
            this.model.set('miaohao',  $("#miaohao").val());
            this.model.set('yihao', $("#yihao").val());
            this.model.set('nianhao' ,$("#nianhao").val());
        }
    });
    var emperorFormView = new EmperorFormView;
    emperorFormView.model = emperor;
    emperorFormView.render();
    emperorFormView.on('change');
}
