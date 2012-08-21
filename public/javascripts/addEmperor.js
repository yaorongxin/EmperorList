
$(document).ready(function(){

    var EmperorModel = Backbone.Model.extend({
        urlRoot : '/user'
    });
    var EmperorDetailView = Backbone.View.extend({
        el:$('.app'),
        initialize: function(){
            _.bindAll(this, 'render');
        },
        render: function() {
            var form = $('<form></form>').appendTo(this.el);
            var fieldset = $('<fieldset></fieldset>').appendTo(form);
            $('<label for="userName">姓名</label>').appendTo(fieldset);
            $('<input type="text" name="userName" id="userName" />').appendTo(fieldset);
            $('<label for="miaohao">庙号</label>').appendTo(fieldset);
            $('<input type="text" name="miaohao" id="miaohao" />').appendTo(fieldset);
            $('<label for="yihao">谥号</label>').appendTo(fieldset);
            $('<input type="text" name="yihao" id="yihao" />').appendTo(fieldset);
            $('<label for="nianhao">年号</label>').appendTo(fieldset);
            $('<input type="text" name="nianhao" id="nianhao" />').appendTo(fieldset);
            $('<input type="button" name="save" id="save" value="保存"/>').appendTo(fieldset);
            $('<p id="err"></p>').appendTo(this.el);
            return this;
        },
        events:{
            'click #save':'save'
        },
        save:function(){
            var emperorModel = new EmperorModel({userName:$("#userName").val(), miaohao:$("#miaohao").val(), yihao:$("#yihao").val(), nianhao:$("#nianhao").val()});
            emperorModel.save(null, {
                success:function(model,res) {
                    console.log("AppView addUser res", res);
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

        }
    });
    var emperorDetailView = new EmperorDetailView;
    emperorDetailView.render();
});