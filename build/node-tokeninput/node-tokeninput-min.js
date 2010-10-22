YUI.add("node-tokeninput",function(B){var K=B.config.doc,F=B.Lang,G=B.Node,J=B.Array,C=B.bind(B.ClassNameManager.getClassName,null,"tokeninput"),M=8,O=46,I=40,H=13,A=37,L=39,E=38,N={};function D(){D.superclass.constructor.apply(this,arguments);}B.extend(D,B.Plugin.Base,{BOX_TEMPLATE:"<div/>",CONTENT_TEMPLATE:"<div/>",INPUT_TEMPLATE:'<input type="text" autocomplete="off">',ITEM_TEMPLATE:"<li/>",LIST_TEMPLATE:"<ul/>",initializer:function(Q){var S={},R={},P;B.Object.each(D.CLASS_NAMES,function(U,T){R[T]="."+U;},this);S[M]=this._keyBackspace;S[O]=this._keyDelete;S[I]=this._keyDown;S[H]=this._keyEnter;S[A]=this._keyLeft;S[L]=this._keyRight;S[E]=this._keyUp;this._host=this.get("host");this._keys=S;this._selectors=R;P=this._tokenizeValue(this._host,null,{all:true,updateUI:false});if(P){this.set("tokens",this.get("tokens").concat(P));}this._render();this._bind();this._sync();},destructor:function(){var P=this._events;while(P&&P.length){P.pop().detach();}},add:function(S,Q){var T=[],P=[],R=this.get("tokens");S=F.isArray(S)?S:S.split(this.get("delimiter"));J.each(S,function(V,U){V=F.trim(V);if(V){T.push(V);P.push(this._createItem({text:V,token:true}));}},this);if(P.length&&T.length){P=B.all(P).toFrag();if((Q||Q===0)&&Q<R.length){R=R.concat();R.splice.apply(R,[Q,0].concat(T));this._tokenNodes.item(Q).insert(P,"before");}else{R=R.concat(T);this._inputItem.insert(P,"before");}this._tokenNodes.refresh();this.set("tokens",R,{atomic:true});}return this;},clear:function(){this._tokenNodes.remove(true);this._tokenNodes.refresh();return this.set("tokens",[],{atomic:true});},remove:function(P){var Q=this.get("tokens");Q.splice(P,1);this._tokenNodes.item(P).remove(true);this._tokenNodes.refresh();return this.set("tokens",Q,{atomic:true});},_bind:function(){var Q=this._list,P=this._selectors;if(!this._events){this._events=[];}this._events.concat([this._boundingBox.after("blur",this._afterBlur,this),this._boundingBox.after("focus",this._afterFocus,this),Q.delegate("blur",this._onTokenBlur,P.token,this),Q.delegate("focus",this._onTokenFocus,P.token,this),Q.delegate("mouseover",this._onTokenMouseOver,P.token,this),Q.delegate("mouseout",this._onTokenMouseOut,P.token,this),Q.delegate(B.UA.gecko?"keypress":"keydown",this._onKey,P.input+","+P.token,this),this.after("tokensChange",this._afterTokensChange)]);},_clearItems:function(){this._list.all(this._selectors.item).remove(true);},_createItem:function(Q){var S=D.CLASS_NAMES,R=G.create(this.ITEM_TEMPLATE),P;if(!Q){Q=N;}R.addClass(S.item);J.each(["editable","hidden","token"],function(T){if(Q[T]){R.addClass(S[T]);}});if(Q.editable){P=G.create(this.INPUT_TEMPLATE).addClass(S.input);P.on("valueChange",this._afterInputValueChange,this);R.append(P);}if(Q.token){R.set("tabIndex",-1);R.set("text",Q.text||"");}return R;},_focusNext:function(R){var Q=this._selectors,P;R=R.ancestor(Q.item,true);P=R&&R.next(Q.token);if(P){P.focus();}else{this._inputNode.focus();}return true;},_focusPrev:function(R){var P=this._selectors,Q;R=R.ancestor(P.item,true);Q=R&&R.previous(P.token);if(Q){Q.focus();}else{return false;}return true;},_getSelection:function(T){var R=G.getDOMNode(T),Q={end:0,start:0},S,U,P;if("selectionStart" in R){Q.start=R.selectionStart;Q.end=R.selectionEnd;}else{if(R.createTextRange){U=R.value;S=U.length;P=K.selection.createRange().duplicate();P.moveEnd("character",S);Q.start=P.text===""?S:U.lastIndexOf(P.text);P.moveStart("character",-S);Q.end=P.text.length;}}return Q;},_keyBackspace:function(S){var R=S.currentTarget,P,Q;if(R.hasClass(D.CLASS_NAMES.input)){Q=this._getSelection(R);if(Q.start!==0||Q.end!==0){return false;}return this._focusPrev(R);}R=R.ancestor(this._selectors.token,true);P=this._tokenNodes.indexOf(R);if(!R||P===-1){return false;}(this._focusPrev(R)||this._focusNext(R));this.remove(P);return true;},_keyDelete:function(R){var Q=R.currentTarget,P;if(!Q.hasClass(D.CLASS_NAMES.token)){return false;}P=this._tokenNodes.indexOf(Q);if(P===-1){return false;}this._focusNext(Q);this.remove(P);return true;},_keyDown:function(P){return this._keyRight(P);},_keyEnter:function(Q){var P=F.trim(this._inputNode.get("value"));if(!this.get("tokenizeOnEnter")||!P){return false;}this._tokenizeValue(null,null,{all:true});},_keyLeft:function(Q){var P=Q.currentTarget;if(P.hasClass(D.CLASS_NAMES.input)&&this._getSelection(P).start!==0){return false;}return this._focusPrev(P);},_keyRight:function(Q){var P=Q.currentTarget;if(P.hasClass(D.CLASS_NAMES.input)){return false;}return this._focusNext(P);},_keyUp:function(P){return this._keyLeft(P);},_refresh:function(){if(this._tokenNodes){this._tokenNodes.refresh();}else{this._tokenNodes=this._list.all(this._selectors.token);}},_render:function(){var R=D.CLASS_NAMES,Q=G.create(this.BOX_TEMPLATE),P=G.create(this.CONTENT_TEMPLATE);P.addClass(R.content);Q.addClass(R.box).set("tabIndex",-1).append(P);this._set("boundingBox",Q);this._set("contentBox",P);this._boundingBox=Q;this._contentBox=P;this._renderList();this._host.addClass(R.host).insert(Q,"after");},_renderList:function(){var P=G.create(this.LIST_TEMPLATE);P.addClass(D.CLASS_NAMES.list);this._list=P;this._set("listNode",P);this._contentBox.append(P);},_setTokens:function(P){return J.filter(P,function(Q){return !!F.trim(Q);});},_sync:function(){var P=[],Q=this.get("tokens");this._contentBox[this.get("fauxInput")?"addClass":"removeClass"](D.CLASS_NAMES.fauxinput);J.each(Q,function(S,R){P.push(this._createItem({text:F.trim(S),token:true}));},this);this._inputItem=this._createItem({editable:true});this._inputNode=this._inputItem.one(this._selectors.input);this._set("inputNode",this._inputNode);P.push(this._inputItem);P=B.all(P).toFrag();this._clearItems();this._list.append(P);this._refresh();this._syncHost();},_syncHost:function(){this._host.set("value",this.get("tokens").join(this.get("delimiter")));},_tokenizeValue:function(Q,R,P){var S;P=B.merge({updateUI:true},P||N);if(!Q){Q=this._inputNode;}if(!R&&R!==""){R=Q.get("value");}S=R.split(this.get("delimiter"));if(P.all||S.length>1){if(P.all){R="";
}else{R=F.trim(S.pop());}if(P.updateUI){Q.set("value",R);if(S.length){this.add(S);}}}if(P.updateUI){Q.setStyle("width",Math.max(5,R.length+3)+"ex");}return S;},_afterBlur:function(P){if(this.get("tokenizeOnBlur")){this._tokenizeValue(null,null,{all:true});}},_afterFocus:function(Q){var P=this;if(!Q.target.ancestor(this._selectors.item,true)){setTimeout(function(){P._inputNode.focus();},1);}},_afterInputValueChange:function(P){this._tokenizeValue(P.currentTarget,P.newVal);},_afterTokensChange:function(P){if(P.atomic){this._syncHost();}else{this._sync();}},_onTokenBlur:function(P){P.currentTarget.removeClass(D.CLASS_NAMES.focus);},_onTokenFocus:function(P){P.currentTarget.addClass(D.CLASS_NAMES.focus);},_onTokenMouseOut:function(P){P.currentTarget.removeClass(D.CLASS_NAMES.hover);},_onTokenMouseOver:function(P){P.currentTarget.addClass(D.CLASS_NAMES.hover);},_onKey:function(Q){var P=this._keys[Q.keyCode];if(P){if(P.call(this,Q)!==false){Q.preventDefault();}}}},{NAME:"pluginTokenInput",NS:"tokenInput",ATTRS:{boundingBox:{readOnly:true},contentBox:{readOnly:true},delimiter:{value:","},fauxInput:{value:true},inputNode:{readOnly:true},listNode:{readOnly:true},tokenizeOnBlur:{value:true},tokenizeOnEnter:{value:true},tokens:{setter:"_setTokens",value:[]}},CLASS_NAMES:{box:C(),content:C("content"),editable:C("editable"),fauxinput:C("fauxinput"),hidden:C("hidden"),host:C("host"),hover:C("hover"),focus:C("focus"),input:C("input"),item:C("item"),list:C("list"),token:C("token")}});B.Plugin.TokenInput=D;},"@VERSION@",{requires:["array-extras","classnamemanager","event-focus","event-valuechange","node-event-delegate","node-pluginhost","node-style","plugin"]});