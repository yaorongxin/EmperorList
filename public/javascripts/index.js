/**
 * Created with JetBrains WebStorm.
 * User: wanzhang
 * Date: 12-8-19
 * Time: 上午10:23
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var app = {

    };
    _.extend(app,Backbone.Events);

    var EmperorListModel = Backbone.Model.extend({
        //urlRoot : '/user'
    });
    var EmperorListCollection = Backbone.Collection.extend({
        model:EmperorListModel
    });
    var emperorListCollection = new EmperorListCollection;
    var EmperorListView = Backbone.View.extend({
        tagName:'tr',
    render:function(){
        $(this.el).html("<td class='userDetail'>" +this.model.get('userName') + "</td>" + "<td>" + this.model.get('miaohao') + "</td><td>"+ this.model.get('yihao')+"</td>" +"<td>" + this.model.get('nianhao')+"</td>");
    return this;
    }
    });


    $.ajax({
        url:'/getAllUser',
        type:'get',
        success:function(data){
            //console.log(data);
            //data = eval('('+data+')');
            for (var i = 0; i < data.length; i++) {
                console.log(i);
                emperorListCollection.add(new EmperorListModel({userName:data[i].userName,miaohao:data[i].miaohao, yihao:data[i].yihao, nianhao:data[i].nianhao}));
            }
            var emperorView = new EmperorView;
            emperorView.render();
        }
    });

  //  var result = emperorListCollection.models;
   // console.log(">>>>>>>"+result.length);
    var EmperorView = Backbone.View.extend({
        el:$('.app'),
        initialize: function(){

        },
        render: function() {
            var _this = this;
            $(this.el).empty();
            $('<button id="addUserButton">添加</button>').appendTo(this.el);
           var table =  $('<table border="1" class="page"></table>');
            table.appendTo(this.el);
            table.append('<tr><th>姓名</th><th>庙号</th><th>谥号</th><th>年号</th></tr>');
            console.log("emperorListCollection>>>>>>>"+emperorListCollection.length);

//            for(var j=0;j<result.length;j++){
//
//            }
            emperorListCollection.each(function(model){
                console.log("......"+model);
                var emperorListView = new EmperorListView;
                emperorListView.model = model;
                table.append(emperorListView.render().el);
            });
            return this;
        },

        events:{
            'click #addUserButton':'add'
        },
        add:function(){
            self.location='add.html';
        }
    });


});