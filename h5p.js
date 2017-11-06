
H5PEditor.widgets.multiple_choice_drop_down_editor = H5PEditor.MultipleChoiceDropDownEditor = (function ($) {

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
    el.appendChild(this.make_instructions());
    var el_applet_container = build("div", undefined, el);
    el_applet_container.id = random_string();

    this.multiple_choice = new multiple_choice_wrapper(el_applet_container, "editor");
    try {
      this.multiple_choice.data = data.data;
    } catch(ex) {}

  };

  C.prototype.make_instructions = function() {
    var instructions = build("div");
    instructions.innerHTML += '<p><span style="color:#008080"><strong>Blanker syntax example:</strong></span></p><p><span style="color:#B22222">*</span>right answer<span style="color:#006400">/</span>another right answer<span style="color:#006400">/</span>wrong answer<span style="color:#0000CD">~</span><span style="color:#800080">:</span>hint<span style="color:#B22222">*</span></p><p>1. Expression must be contained by asterisks (<span style="color:#B22222">*</span>).<br />2. Options are separated by forward slash (<span style="color:#006400">/</span>).<br />3. Hint is separated by a colon (<span style="color:#800080">:</span>).<br />4. Wrong answers must be postfixed with a tilde (<span style="color:#0000CD">~</span>).<br />5. Hints and wrong answers are optional.<br />6. If no wrong answers are provided, the multiple choice is converted into a fill the blank style field.</p><p>&nbsp;</p>'
    return instructions;
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



