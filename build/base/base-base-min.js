YUI.add("base-base",function(b){var i=b.Object,k=b.Lang,j=".",g="destroy",p="init",o="initialized",h="destroyed",d="initializer",m="bubbleTargets",e="_bubbleTargets",c=Object.prototype.constructor,l="deep",q="shallow",n="destructor",a=b.Attribute;function f(){a.call(this);var r=b.Plugin&&b.Plugin.Host;if(this._initPlugins&&r){r.call(this);}if(this._lazyAddAttrs!==false){this._lazyAddAttrs=true;}this.name=this.constructor.NAME;this._eventPrefix=this.constructor.EVENT_PREFIX||this.constructor.NAME;this.init.apply(this,arguments);}f._ATTR_CFG=a._ATTR_CFG.concat("cloneDefaultValue");f.NAME="base";f.ATTRS={initialized:{readOnly:true,value:false},destroyed:{readOnly:true,value:false}};f.prototype={init:function(r){this._yuievt.config.prefix=this._eventPrefix;this.publish(p,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defInitFn});this._preInitEventCfg(r);this.fire(p,{cfg:r});return this;},_preInitEventCfg:function(s){if(s){if(s.on){this.on(s.on);}if(s.after){this.after(s.after);}}var t,r,v,u=(s&&m in s);if(u||e in this){v=u?(s&&s.bubbleTargets):this._bubbleTargets;if(k.isArray(v)){for(t=0,r=v.length;t<r;t++){this.addTarget(v[t]);}}else{if(v){this.addTarget(v);}}}},destroy:function(){this.publish(g,{queuable:false,fireOnce:true,defaultTargetOnly:true,defaultFn:this._defDestroyFn});this.fire(g);this.detachAll();return this;},_defInitFn:function(r){this._initHierarchy(r.cfg);if(this._initPlugins){this._initPlugins(r.cfg);}this._set(o,true);},_defDestroyFn:function(r){this._destroyHierarchy();if(this._destroyPlugins){this._destroyPlugins();}this._set(h,true);},_getClasses:function(){if(!this._classes){this._initHierarchyData();}return this._classes;},_getAttrCfgs:function(){if(!this._attrs){this._initHierarchyData();}return this._attrs;},_filterAttrCfgs:function(v,s){var t=null,r,u=v.ATTRS;if(u){for(r in u){if(u.hasOwnProperty(r)&&s[r]){t=t||{};t[r]=s[r];delete s[r];}}}return t;},_initHierarchyData:function(){var t=this.constructor,s=[],r=[];while(t){s[s.length]=t;if(t.ATTRS){r[r.length]=t.ATTRS;}t=t.superclass?t.superclass.constructor:null;}this._classes=s;this._attrs=this._aggregateAttrs(r);},_aggregateAttrs:function(y){var v,z,u,r,A,s,x,t=f._ATTR_CFG,w={};if(y){for(s=y.length-1;s>=0;--s){z=y[s];for(v in z){if(z.hasOwnProperty(v)){u=b.mix({},z[v],true,t);r=u.value;x=u.cloneDefaultValue;if(r){if((x===undefined&&(c===r.constructor||k.isArray(r)))||x===l||x===true){u.value=b.clone(r);}else{if(x===q){u.value=b.merge(r);}}}A=null;if(v.indexOf(j)!==-1){A=v.split(j);v=A.shift();}if(A&&w[v]&&w[v].value){i.setValue(w[v].value,A,r);}else{if(!A){if(!w[v]){w[v]=u;}else{b.mix(w[v],u,true,t);}}}}}}}return w;},_initHierarchy:function(w){var t=this._lazyAddAttrs,x,y,z,u,s,v=this._getClasses(),r=this._getAttrCfgs();for(z=v.length-1;z>=0;z--){x=v[z];y=x.prototype;if(x._yuibuild&&x._yuibuild.exts){for(u=0,s=x._yuibuild.exts.length;u<s;u++){x._yuibuild.exts[u].apply(this,arguments);}}this.addAttrs(this._filterAttrCfgs(x,r),w,t);if(y.hasOwnProperty(d)){y.initializer.apply(this,arguments);}}},_destroyHierarchy:function(){var v,s,u,r,t=this._getClasses();for(u=0,r=t.length;u<r;u++){v=t[u];s=v.prototype;if(s.hasOwnProperty(n)){s.destructor.apply(this,arguments);}}},toString:function(){return this.name+"["+b.stamp(this,true)+"]";}};b.mix(f,a,false,null,1);f.prototype.constructor=f;b.Base=f;},"@VERSION@",{requires:["attribute-base"]});