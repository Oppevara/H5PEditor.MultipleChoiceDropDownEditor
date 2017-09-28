
H5PEditor.widgets.multiple_choice_editor = H5PEditor.MultipleChoiceEditor = (function ($) {

  function C(parent, field, params, setValue) {
    this.parent = parent;
    this.field = field;
    this.params = params;
    this.setValue = setValue;
    this.multiple_choice = undefined;
  }
   
  C.prototype.appendTo = function ($container) {
    var data = h5p_get_data_obj(this.params);

    var el = build("div", "multiple_choice_wrapper");
    $container.append(el);
    var el_applet_container = build("div", undefined, el);
    el_applet_container.id = random_string();

    this.multiple_choice = new multiple_choice_wrapper(el_applet_container, "editor");
    try {
      this.multiple_choice.data = data.data;
    } catch(ex) {}

    //  hacky wrap fix, editor widget freaks out sometimes due to h5p container wiggling during load
    setTimeout(function() {
      this.multiple_choice.width = this.multiple_choice.width;
    }.bind(this), 1000);
  };


  C.prototype.save = function() {
    var data = {"data" : undefined};
    
    try { 
      data.data = this.multiple_choice.data;
    } catch(ex) {}

    this.params = h5p_get_data_str(data);
    this.setValue(this.field, this.params);
  };


  C.prototype.validate = function () { this.save(); return true; };
  C.prototype.remove = function () {};
 
 
  return C;
})(H5P.jQuery); 



