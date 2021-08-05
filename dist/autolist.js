(function (root, factory) {
  'use strict';
  if (typeof module === 'object') {
      module.exports = factory;
  } else if (typeof define === 'function' && define.amd) {
      define(factory);
  } else {
      root.AutoList = factory;
  }
}(this, function (MediumEditor) {

var AutoList = MediumEditor.Extension.extend({
  name: 'autolist',
  init: function(){
    this.subscribe('editableInput', this.onInput.bind(this));
    this.autoListLastTrack = null;
  },
  onInput: function (evt) {
    var list_start = this.base.getSelectedParentElement().textContent;
    console.log("List start", this.autoListLastTrack, "'" + list_start + "'")
    var is_forward_q = list_start && (!this.autoListLastTrack ||
                                      (list_start.length > this.autoListLastTrack.length))
    if (/^\s*1\.\s$/.test(list_start) && is_forward_q &&
        this.base.getExtensionByName('orderedlist')){
      this.base.execAction('delete');
      this.base.execAction('delete');
      this.base.execAction('delete');
      this.base.execAction('insertorderedlist');
    }
    else if (/^\s*(\*|-)\s$/.test(list_start) && is_forward_q &&
             this.base.getExtensionByName('unorderedlist')){
      this.base.execAction('delete');
      this.base.execAction('delete');
      this.base.execAction('insertunorderedlist');
    }
    this.autoListLastTrack = list_start;
  },
});

return AutoList;

}(typeof require === 'function' ? require('medium-editor') : MediumEditor)));
