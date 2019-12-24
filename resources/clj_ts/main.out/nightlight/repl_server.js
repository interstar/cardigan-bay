// Compiled by ClojureScript 1.10.439 {}
goog.provide('nightlight.repl_server');
goog.require('cljs.core');
goog.require('eval_soup.core');
nightlight.repl_server.cljs_start_ns = new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null);
nightlight.repl_server.form__GT_serializable = (function nightlight$repl_server$form__GT_serializable(form){
if((form instanceof Error)){
return [(function (){var or__4047__auto__ = (function (){var G__22216 = form;
var G__22216__$1 = (((G__22216 == null))?null:G__22216.cause);
if((G__22216__$1 == null)){
return null;
} else {
return G__22216__$1.message;
}
})();
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return form.message;
}
})(),form.fileName,form.lineNumber];
} else {
return cljs.core.pr_str.call(null,form);
}
});
nightlight.repl_server.init_cljs_server = (function nightlight$repl_server$init_cljs_server(){
if(cljs.core.not_EQ_.call(null,window.self,window.top)){
var _STAR_current_ns = cljs.core.atom.call(null,nightlight.repl_server.cljs_start_ns);
window.onmessage = ((function (_STAR_current_ns){
return (function (e){
return eval_soup.core.code__GT_results.call(null,e.data.forms,((function (_STAR_current_ns){
return (function (results){
return window.parent.postMessage(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),e.data.type,new cljs.core.Keyword(null,"results","results",-1134170113),cljs.core.into_array.call(null,cljs.core.mapv.call(null,nightlight.repl_server.form__GT_serializable,results)),new cljs.core.Keyword(null,"ns","ns",441598760),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,_STAR_current_ns))], null)),"*");
});})(_STAR_current_ns))
,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"*current-ns","*current-ns",547476271),_STAR_current_ns,new cljs.core.Keyword(null,"custom-load","custom-load",-1830353108),((function (_STAR_current_ns){
return (function (opts,cb){
return cb.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"clj","clj",-660495428),new cljs.core.Keyword(null,"source","source",-433931539),""], null));
});})(_STAR_current_ns))
], null));
});})(_STAR_current_ns))
;

return window.parent.postMessage(cljs.core.clj__GT_js.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"repl",new cljs.core.Keyword(null,"results","results",-1134170113),[""],new cljs.core.Keyword(null,"ns","ns",441598760),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,_STAR_current_ns))], null)),"*");
} else {
return null;
}
});
nightlight.repl_server.init_cljs_server.call(null);

//# sourceMappingURL=repl_server.js.map
