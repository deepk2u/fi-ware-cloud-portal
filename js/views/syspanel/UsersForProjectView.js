var UsersForProjectView = Backbone.View.extend({

    _template: _.itemplate($('#usersForProjectTemplate').html()),

    initialize: function() {
        this.model.unbind("reset");
        this.model.bind("reset", this.render, this);
        this.options.users.unbind("reset");
        this.options.users.bind("reset", this.render, this);
        this.model.fetch();
        this.options.users.fetch();
        this.renderFirst();
    },

    events: {
        'click .btn-create-project' : 'onCreate',
        'click .btn-edit' : 'onUpdate',
        'click .btn-delete':'onDelete',
        //'click .btn-modify' : 'onModify',
        'click .btn-delete-group': 'onDeleteGroup',
        'change .checkbox_projects':'enableDisableDeleteButton',
        'change .checkbox_all':'checkAll'
    },

    onCreate: function() {
        var subview = new CreateProjectView({el: 'body', model:this.model});
        subview.render();
    },

    onUpdate: function() {
        var subview = new EditProjectView({el: 'body', model:this.model});
        subview.render();
    },

    onModify: function() {
        var subview = new ModifyUsersView({el: 'body', model:this.model});
        subview.render();
    },

    onDelete: function(evt) {
        var container = evt.target.value;
        var self = this;
        var subview = new ConfirmView({el: 'body', title: "Confirm Delete Project", btn_message: "Delete Project", onAccept: function() {
            cont = self.model.get(container);
                var subview = new MessagesView({el: '#content', state: "Success", title: "Project deleted."});
                subview.render();
        }});
        subview.render();
    },

    onDeleteGroup: function(evt) {
        var self = this;
        var cont;
        var subview = new ConfirmView({el: 'body', title: "Delete Projects", btn_message: "Delete Projects", onAccept: function() {
            $(".checkbox_containers:checked").each(function () {
                    var subview = new MessagesView({el: '#content', state: "Success", title: "Project deleted."});
                    subview.render();

            });
        }});
        subview.render();
    },

    checkAll: function () {
        if ($(".checkbox_all:checked").size() > 0) {
            $(".checkbox_projects").attr('checked','checked');
            this.enableDisableDeleteButton();
        } else {
            $(".checkbox_projects").attr('checked',false);
            this.enableDisableDeleteButton();
        }

    },

    enableDisableDeleteButton: function () {
        if ($(".checkbox_projects:checked").size() > 0) {
            $("#projects_delete").attr("disabled", false);
        } else {
            $("#projects_delete").attr("disabled", true);
        }

    },

    onClose: function() {
        this.model.unbind("reset");
    },

    renderFirst: function () {
        console.log("rendering first");
        this.undelegateEvents();
        var that = this;
        UTILS.Render.animateRender(this.el, this._template, {models: this.model.models, users: this.options.users.models}, function() {
            that.enableDisableDeleteButton();
            that.delegateEvents(that.events);
        });

    },

    render: function () {
        console.log("rendering");
        this.undelegateEvents();
        $(this.el).empty().html(this._template({models: this.model.models, users: this.options.users.models}));
        this.delegateEvents(this.events);

        return this;
    }


});