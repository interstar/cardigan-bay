// Compiled by ClojureScript 1.10.439 {}
goog.provide('reagent.debug');
goog.require('cljs.core');
reagent.debug.has_console = (typeof console !== 'undefined');
reagent.debug.tracking = false;
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.warnings !== 'undefined')){
} else {
reagent.debug.warnings = cljs.core.atom.call(null,null);
}
if((typeof reagent !== 'undefined') && (typeof reagent.debug !== 'undefined') && (typeof reagent.debug.track_console !== 'undefined')){
} else {
reagent.debug.track_console = (function (){var o = ({});
o.warn = ((function (o){
return (function() { 
var G__11238__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"warn","warn",-436710552)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__11238 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11239__i = 0, G__11239__a = new Array(arguments.length -  0);
while (G__11239__i < G__11239__a.length) {G__11239__a[G__11239__i] = arguments[G__11239__i + 0]; ++G__11239__i;}
  args = new cljs.core.IndexedSeq(G__11239__a,0,null);
} 
return G__11238__delegate.call(this,args);};
G__11238.cljs$lang$maxFixedArity = 0;
G__11238.cljs$lang$applyTo = (function (arglist__11240){
var args = cljs.core.seq(arglist__11240);
return G__11238__delegate(args);
});
G__11238.cljs$core$IFn$_invoke$arity$variadic = G__11238__delegate;
return G__11238;
})()
;})(o))
;

o.error = ((function (o){
return (function() { 
var G__11241__delegate = function (args){
return cljs.core.swap_BANG_.call(null,reagent.debug.warnings,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error","error",-978969032)], null),cljs.core.conj,cljs.core.apply.call(null,cljs.core.str,args));
};
var G__11241 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11242__i = 0, G__11242__a = new Array(arguments.length -  0);
while (G__11242__i < G__11242__a.length) {G__11242__a[G__11242__i] = arguments[G__11242__i + 0]; ++G__11242__i;}
  args = new cljs.core.IndexedSeq(G__11242__a,0,null);
} 
return G__11241__delegate.call(this,args);};
G__11241.cljs$lang$maxFixedArity = 0;
G__11241.cljs$lang$applyTo = (function (arglist__11243){
var args = cljs.core.seq(arglist__11243);
return G__11241__delegate(args);
});
G__11241.cljs$core$IFn$_invoke$arity$variadic = G__11241__delegate;
return G__11241;
})()
;})(o))
;

return o;
})();
}
reagent.debug.track_warnings = (function reagent$debug$track_warnings(f){
reagent.debug.tracking = true;

cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

f.call(null);

var warns = cljs.core.deref.call(null,reagent.debug.warnings);
cljs.core.reset_BANG_.call(null,reagent.debug.warnings,null);

reagent.debug.tracking = false;

return warns;
});

//# sourceMappingURL=debug.js.map
