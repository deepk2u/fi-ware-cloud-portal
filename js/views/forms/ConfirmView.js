var ConfirmView = Backbone.View.extend({

    _template: _.itemplate($('#confirmTemplate').html()),

    initialize: function() {
        this.delegateEvents({
            'click #confirm_btn': 'onAccept',
            'click #cancelBtn': 'close',
            'click #closeModalConfirm': 'close',
            'click .modal-backdrop': 'close'
        });
        this.options.title = this.options.title || "Are you sure?";
        this.options.message = this.options.message || "Please confirm your selection. This action cannot be undone.";
        this.options.btn_message = this.options.btn_message || "Confirm";
    },

    onClose: function() {
        if ((this.options.style === "")&&(this.options.style === undefined)) {
        this.undelegateEvents();
        this.unbind();
       }
    },

    render: function () {
        if ($('#confirm').html() != null) {
            $('#confirm').remove();
            $('.modal-backdrop').remove();
        }
        $(this.el).append(this._template({title:this.options.title, message:this.options.message, btn_message: this.options.btn_message, style: this.options.style}));

        if ((this.options.style !== "")&&(this.options.style !== undefined)) {
            $('.modal:last').modal();
            $(".modal-backdrop:last").css('z-index', '105010');
        }else{
            $('.modal:last').modal();
        }
        return this;
    },

    onAccept: function(e){
        this.options.onAccept();
        this.close();
    },

    close: function(e) {
        $('#confirm').remove();
        if ((this.options.style === "")&&(this.options.style === undefined)) {
            this.undelegateEvents();
            $('.modal-backdrop').remove();
            this.onClose();
        }
    }

});