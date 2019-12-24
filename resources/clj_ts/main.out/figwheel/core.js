// Compiled by ClojureScript 1.10.439 {}
goog.provide('figwheel.core');
goog.require('cljs.core');
goog.require('figwheel.tools.heads_up');
goog.require('goog.object');
goog.require('goog.string');
goog.require('goog.string.format');
goog.require('goog.log');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('goog.debug.Console');
goog.require('goog.async.Deferred');
goog.require('goog.Promise');
goog.require('goog.events.EventTarget');
goog.require('goog.events.Event');
figwheel.core.distinct_by = (function figwheel$core$distinct_by(f,coll){
var seen = cljs.core.volatile_BANG_.call(null,cljs.core.PersistentHashSet.EMPTY);
return cljs.core.filter.call(null,((function (seen){
return (function (p1__25602_SHARP_){
var k = f.call(null,p1__25602_SHARP_);
var res = cljs.core.not.call(null,cljs.core.deref.call(null,seen).call(null,k));
cljs.core._vreset_BANG_.call(null,seen,cljs.core.conj.call(null,cljs.core._deref.call(null,seen),k));

return res;
});})(seen))
,coll);
});
figwheel.core.map_keys = (function figwheel$core$map_keys(f,coll){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__25603){
var vec__25604 = p__25603;
var k = cljs.core.nth.call(null,vec__25604,(0),null);
var v = cljs.core.nth.call(null,vec__25604,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f.call(null,k),v], null);
})),coll);
});
figwheel.core._STAR_inline_code_message_max_column_STAR_ = (80);
figwheel.core.wrap_line = (function figwheel$core$wrap_line(text,size){
return cljs.core.re_seq.call(null,cljs.core.re_pattern.call(null,[".{1,",cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"}\\s|.{1,",cljs.core.str.cljs$core$IFn$_invoke$arity$1(size),"}"].join('')),[cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace.call(null,text,/\n/," "))," "].join(''));
});
figwheel.core.cross_format = (function figwheel$core$cross_format(var_args){
var args__4647__auto__ = [];
var len__4641__auto___25608 = arguments.length;
var i__4642__auto___25609 = (0);
while(true){
if((i__4642__auto___25609 < len__4641__auto___25608)){
args__4647__auto__.push((arguments[i__4642__auto___25609]));

var G__25610 = (i__4642__auto___25609 + (1));
i__4642__auto___25609 = G__25610;
continue;
} else {
}
break;
}

var argseq__4648__auto__ = ((((0) < args__4647__auto__.length))?(new cljs.core.IndexedSeq(args__4647__auto__.slice((0)),(0),null)):null);
return figwheel.core.cross_format.cljs$core$IFn$_invoke$arity$variadic(argseq__4648__auto__);
});

figwheel.core.cross_format.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return cljs.core.apply.call(null,goog.string.format,args);
});

figwheel.core.cross_format.cljs$lang$maxFixedArity = (0);

/** @this {Function} */
figwheel.core.cross_format.cljs$lang$applyTo = (function (seq25607){
var self__4629__auto__ = this;
return self__4629__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq25607));
});

figwheel.core.pointer_message_lines = (function figwheel$core$pointer_message_lines(p__25613){
var map__25614 = p__25613;
var map__25614__$1 = (((((!((map__25614 == null))))?(((((map__25614.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25614.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25614):map__25614);
var message = cljs.core.get.call(null,map__25614__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var column = cljs.core.get.call(null,map__25614__$1,new cljs.core.Keyword(null,"column","column",2078222095));
if(((column + cljs.core.count.call(null,message)) > figwheel.core._STAR_inline_code_message_max_column_STAR_)){
return cljs.core.mapv.call(null,((function (map__25614,map__25614__$1,message,column){
return (function (p1__25612_SHARP_){
return cljs.core.vec.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error-message","error-message",1756021561),null], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__25612_SHARP_], null)));
});})(map__25614,map__25614__$1,message,column))
,cljs.core.cons.call(null,figwheel.core.cross_format.call(null,(function (){var col = (column - (1));
return ["%",cljs.core.str.cljs$core$IFn$_invoke$arity$1((((col === (0)))?null:col)),"s%s"].join('');
})(),"","^---"),cljs.core.map.call(null,((function (map__25614,map__25614__$1,message,column){
return (function (p1__25611_SHARP_){
return figwheel.core.cross_format.call(null,["%",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.core._STAR_inline_code_message_max_column_STAR_),"s"].join(''),p1__25611_SHARP_);
});})(map__25614,map__25614__$1,message,column))
,figwheel.core.wrap_line.call(null,message,(figwheel.core._STAR_inline_code_message_max_column_STAR_ - (10))))));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"error-message","error-message",1756021561),null,figwheel.core.cross_format.call(null,(function (){var col = (column - (1));
return ["%",cljs.core.str.cljs$core$IFn$_invoke$arity$1((((col === (0)))?null:col)),"s%s %s"].join('');
})(),"","^---",message)], null)], null);
}
});
figwheel.core.inline_message_display_data = (function figwheel$core$inline_message_display_data(p__25617){
var map__25618 = p__25617;
var map__25618__$1 = (((((!((map__25618 == null))))?(((((map__25618.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25618.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25618):map__25618);
var message_data = map__25618__$1;
var message = cljs.core.get.call(null,map__25618__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var line = cljs.core.get.call(null,map__25618__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__25618__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var file_excerpt = cljs.core.get.call(null,map__25618__$1,new cljs.core.Keyword(null,"file-excerpt","file-excerpt",-1132330744));
if(cljs.core.truth_(file_excerpt)){
var map__25620 = file_excerpt;
var map__25620__$1 = (((((!((map__25620 == null))))?(((((map__25620.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25620.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25620):map__25620);
var start_line = cljs.core.get.call(null,map__25620__$1,new cljs.core.Keyword(null,"start-line","start-line",-41746654));
var path = cljs.core.get.call(null,map__25620__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var excerpt = cljs.core.get.call(null,map__25620__$1,new cljs.core.Keyword(null,"excerpt","excerpt",219850763));
var lines = cljs.core.map_indexed.call(null,((function (map__25620,map__25620__$1,start_line,path,excerpt,map__25618,map__25618__$1,message_data,message,line,column,file_excerpt){
return (function (i,l){
var ln = (i + start_line);
return (new cljs.core.PersistentVector(null,3,(5),cljs.core.PersistentVector.EMPTY_NODE,[((cljs.core._EQ_.call(null,line,ln))?new cljs.core.Keyword(null,"error-in-code","error-in-code",-1661931357):new cljs.core.Keyword(null,"code-line","code-line",-2138627853)),ln,l],null));
});})(map__25620,map__25620__$1,start_line,path,excerpt,map__25618,map__25618__$1,message_data,message,line,column,file_excerpt))
,clojure.string.split_lines.call(null,excerpt));
var vec__25621 = cljs.core.split_with.call(null,((function (map__25620,map__25620__$1,start_line,path,excerpt,lines,map__25618,map__25618__$1,message_data,message,line,column,file_excerpt){
return (function (p1__25616_SHARP_){
return cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"error-in-code","error-in-code",-1661931357),cljs.core.first.call(null,p1__25616_SHARP_));
});})(map__25620,map__25620__$1,start_line,path,excerpt,lines,map__25618,map__25618__$1,message_data,message,line,column,file_excerpt))
,lines);
var begin = cljs.core.nth.call(null,vec__25621,(0),null);
var end = cljs.core.nth.call(null,vec__25621,(1),null);
return cljs.core.concat.call(null,cljs.core.take_last.call(null,(5),begin),cljs.core.take.call(null,(1),end),figwheel.core.pointer_message_lines.call(null,message_data),cljs.core.take.call(null,(5),cljs.core.rest.call(null,end)));
} else {
return null;
}
});
figwheel.core.file_line_column = (function figwheel$core$file_line_column(p__25625){
var map__25626 = p__25625;
var map__25626__$1 = (((((!((map__25626 == null))))?(((((map__25626.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25626.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25626):map__25626);
var file = cljs.core.get.call(null,map__25626__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var line = cljs.core.get.call(null,map__25626__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column = cljs.core.get.call(null,map__25626__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var G__25628 = "";
var G__25628__$1 = (cljs.core.truth_(file)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25628),"file ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(file)].join(''):G__25628);
var G__25628__$2 = (cljs.core.truth_(line)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25628__$1)," at line ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line)].join(''):G__25628__$1);
if(cljs.core.truth_((function (){var and__4036__auto__ = line;
if(cljs.core.truth_(and__4036__auto__)){
return column;
} else {
return and__4036__auto__;
}
})())){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25628__$2),", column ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join('');
} else {
return G__25628__$2;
}
});
if((typeof figwheel !== 'undefined') && (typeof figwheel.core !== 'undefined') && (typeof figwheel.core.logger !== 'undefined')){
} else {
figwheel.core.logger = goog.log.getLogger("Figwheel");
}

figwheel.core.console_logging = (function figwheel$core$console_logging(){
if(cljs.core.truth_(goog.object.get(goog.debug.Console,"instance"))){
} else {
var c_25677 = (new goog.debug.Console());
var G__25635_25678 = c_25677.getFormatter();
goog.object.set(G__25635_25678,"showAbsoluteTime",false);

goog.object.set(G__25635_25678,"showRelativeTime",false);


goog.object.set(goog.debug.Console,"instance",c_25677);

}

var temp__5735__auto__ = goog.object.get(goog.debug.Console,"instance");
if(cljs.core.truth_(temp__5735__auto__)){
var console_instance = temp__5735__auto__;
console_instance.setCapturing(true);

return true;
} else {
return null;
}
});
goog.exportSymbol('figwheel.core.console_logging', figwheel.core.console_logging);

if((typeof figwheel !== 'undefined') && (typeof figwheel.core !== 'undefined') && (typeof figwheel.core.log_console !== 'undefined')){
} else {
figwheel.core.log_console = figwheel.core.console_logging.call(null);
}

figwheel.core.event_target = (((typeof document !== 'undefined'))?document:(new goog.events.EventTarget()));
goog.exportSymbol('figwheel.core.event_target', figwheel.core.event_target);

if((typeof figwheel !== 'undefined') && (typeof figwheel.core !== 'undefined') && (typeof figwheel.core.listener_key_map !== 'undefined')){
} else {
figwheel.core.listener_key_map = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
}

figwheel.core.unlisten = (function figwheel$core$unlisten(ky,event_name){
var temp__5735__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,figwheel.core.listener_key_map),ky);
if(cljs.core.truth_(temp__5735__auto__)){
var f = temp__5735__auto__;
return figwheel.core.event_target.removeEventListener(cljs.core.name.call(null,event_name),f);
} else {
return null;
}
});

figwheel.core.listen = (function figwheel$core$listen(ky,event_name,f){
figwheel.core.unlisten.call(null,ky,event_name);

figwheel.core.event_target.addEventListener(cljs.core.name.call(null,event_name),f);

return cljs.core.swap_BANG_.call(null,figwheel.core.listener_key_map,cljs.core.assoc,ky,f);
});

figwheel.core.dispatch_event = (function figwheel$core$dispatch_event(event_name,data){
return figwheel.core.event_target.dispatchEvent((function (){var G__25636 = (((figwheel.core.event_target instanceof goog.events.EventTarget))?(new goog.events.Event(cljs.core.name.call(null,event_name),figwheel.core.event_target)):(new Event(cljs.core.name.call(null,event_name),figwheel.core.event_target)));
goog.object.add(G__25636,"data",(function (){var or__4047__auto__ = data;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.PersistentArrayMap.EMPTY;
}
})());

return G__25636;
})());
});

figwheel.core.event_data = (function figwheel$core$event_data(e){
return goog.object.get((function (){var temp__5733__auto__ = e.event_;
if(cljs.core.truth_(temp__5733__auto__)){
var e__$1 = temp__5733__auto__;
return e__$1;
} else {
return e;
}
})(),"data");
});


/** @define {boolean} */
goog.define("figwheel.core.load_warninged_code",false);


/** @define {boolean} */
goog.define("figwheel.core.heads_up_display",true);

if((typeof figwheel !== 'undefined') && (typeof figwheel.core !== 'undefined') && (typeof figwheel.core.state !== 'undefined')){
} else {
figwheel.core.state = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),cljs.core.PersistentArrayMap.EMPTY], null));
}

figwheel.core.heads_up_display_QMARK_ = (function figwheel$core$heads_up_display_QMARK_(){
return ((figwheel.core.heads_up_display) && ((!((goog.global.document == null)))));
});

var last_reload_timestamp_25679 = cljs.core.atom.call(null,(0));
var promise_chain_25680 = (new goog.Promise(((function (last_reload_timestamp_25679){
return (function (r,_){
return r.call(null,true);
});})(last_reload_timestamp_25679))
));
figwheel.core.render_watcher = ((function (last_reload_timestamp_25679,promise_chain_25680){
return (function figwheel$core$render_watcher(_,___$1,o,n){
if(figwheel.core.heads_up_display_QMARK_.call(null)){
var temp__5733__auto__ = (function (){var temp__5735__auto__ = cljs.core.get_in.call(null,n,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"reload-started","reload-started",-1932451477)], null));
if(cljs.core.truth_(temp__5735__auto__)){
var ts = temp__5735__auto__;
var and__4036__auto__ = (cljs.core.deref.call(null,last_reload_timestamp_25679) < ts);
if(and__4036__auto__){
return ts;
} else {
return and__4036__auto__;
}
} else {
return null;
}
})();
if(cljs.core.truth_(temp__5733__auto__)){
var ts = temp__5733__auto__;
var warnings = cljs.core.not_empty.call(null,cljs.core.get_in.call(null,n,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"warnings","warnings",-735437651)], null)));
var exception = cljs.core.get_in.call(null,n,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"exception","exception",-335277064)], null));
cljs.core.reset_BANG_.call(null,last_reload_timestamp_25679,ts);

if(cljs.core.truth_(warnings)){
return promise_chain_25680.then(((function (warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680){
return (function (){
var warn = cljs.core.first.call(null,warnings);
var _STAR_inline_code_message_max_column_STAR__orig_val__25637 = figwheel.core._STAR_inline_code_message_max_column_STAR_;
var _STAR_inline_code_message_max_column_STAR__temp_val__25638 = (132);
figwheel.core._STAR_inline_code_message_max_column_STAR_ = _STAR_inline_code_message_max_column_STAR__temp_val__25638;

try{return figwheel.tools.heads_up.display_warning.call(null,cljs.core.assoc.call(null,warn,new cljs.core.Keyword(null,"error-inline","error-inline",1073987185),figwheel.core.inline_message_display_data.call(null,warn))).then(((function (_STAR_inline_code_message_max_column_STAR__orig_val__25637,_STAR_inline_code_message_max_column_STAR__temp_val__25638,warn,warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680){
return (function (){
var seq__25639 = cljs.core.seq.call(null,cljs.core.rest.call(null,warnings));
var chunk__25640 = null;
var count__25641 = (0);
var i__25642 = (0);
while(true){
if((i__25642 < count__25641)){
var w = cljs.core._nth.call(null,chunk__25640,i__25642);
figwheel.tools.heads_up.append_warning_message.call(null,w);


var G__25681 = seq__25639;
var G__25682 = chunk__25640;
var G__25683 = count__25641;
var G__25684 = (i__25642 + (1));
seq__25639 = G__25681;
chunk__25640 = G__25682;
count__25641 = G__25683;
i__25642 = G__25684;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__25639);
if(temp__5735__auto__){
var seq__25639__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25639__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__25639__$1);
var G__25685 = cljs.core.chunk_rest.call(null,seq__25639__$1);
var G__25686 = c__4461__auto__;
var G__25687 = cljs.core.count.call(null,c__4461__auto__);
var G__25688 = (0);
seq__25639 = G__25685;
chunk__25640 = G__25686;
count__25641 = G__25687;
i__25642 = G__25688;
continue;
} else {
var w = cljs.core.first.call(null,seq__25639__$1);
figwheel.tools.heads_up.append_warning_message.call(null,w);


var G__25689 = cljs.core.next.call(null,seq__25639__$1);
var G__25690 = null;
var G__25691 = (0);
var G__25692 = (0);
seq__25639 = G__25689;
chunk__25640 = G__25690;
count__25641 = G__25691;
i__25642 = G__25692;
continue;
}
} else {
return null;
}
}
break;
}
});})(_STAR_inline_code_message_max_column_STAR__orig_val__25637,_STAR_inline_code_message_max_column_STAR__temp_val__25638,warn,warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680))
);
}finally {figwheel.core._STAR_inline_code_message_max_column_STAR_ = _STAR_inline_code_message_max_column_STAR__orig_val__25637;
}});})(warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680))
);
} else {
if(cljs.core.truth_(exception)){
return promise_chain_25680.then(((function (warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680){
return (function (){
var _STAR_inline_code_message_max_column_STAR__orig_val__25643 = figwheel.core._STAR_inline_code_message_max_column_STAR_;
var _STAR_inline_code_message_max_column_STAR__temp_val__25644 = (132);
figwheel.core._STAR_inline_code_message_max_column_STAR_ = _STAR_inline_code_message_max_column_STAR__temp_val__25644;

try{return figwheel.tools.heads_up.display_exception.call(null,cljs.core.assoc.call(null,exception,new cljs.core.Keyword(null,"error-inline","error-inline",1073987185),figwheel.core.inline_message_display_data.call(null,exception)));
}finally {figwheel.core._STAR_inline_code_message_max_column_STAR_ = _STAR_inline_code_message_max_column_STAR__orig_val__25643;
}});})(warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680))
);
} else {
return promise_chain_25680.then(((function (warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680){
return (function (){
return figwheel.tools.heads_up.flash_loaded.call(null);
});})(warnings,exception,ts,temp__5733__auto__,last_reload_timestamp_25679,promise_chain_25680))
);

}
}
} else {
return null;
}
} else {
return null;
}
});})(last_reload_timestamp_25679,promise_chain_25680))
;

cljs.core.add_watch.call(null,figwheel.core.state,new cljs.core.Keyword("figwheel.core","render-watcher","figwheel.core/render-watcher",2046135910),figwheel.core.render_watcher);

figwheel.core.immutable_ns_QMARK_ = (function figwheel$core$immutable_ns_QMARK_(ns){
var ns__$1 = cljs.core.name.call(null,ns);
var or__4047__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 5, ["cljs.nodejs",null,"goog",null,"figwheel.connect",null,"cljs.core",null,"figwheel.preload",null], null), null).call(null,ns__$1);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
var or__4047__auto____$1 = goog.string.startsWith("clojure.",ns__$1);
if(cljs.core.truth_(or__4047__auto____$1)){
return or__4047__auto____$1;
} else {
return goog.string.startsWith("goog.",ns__$1);
}
}
});

figwheel.core.name__GT_path = (function figwheel$core$name__GT_path(ns){
return goog.object.get(goog.dependencies_.nameToPath,ns);
});

figwheel.core.provided_QMARK_ = (function figwheel$core$provided_QMARK_(ns){
return goog.object.get(goog.dependencies_.written,figwheel.core.name__GT_path.call(null,cljs.core.name.call(null,ns)));
});

figwheel.core.ns_exists_QMARK_ = (function figwheel$core$ns_exists_QMARK_(ns){
return (!((cljs.core.reduce.call(null,cljs.core.fnil.call(null,goog.object.get,({})),goog.global,clojure.string.split.call(null,cljs.core.name.call(null,ns),".")) == null)));
});

figwheel.core.reload_ns_QMARK_ = (function figwheel$core$reload_ns_QMARK_(namespace){
var meta_data = cljs.core.meta.call(null,namespace);
var and__4036__auto__ = cljs.core.not.call(null,figwheel.core.immutable_ns_QMARK_.call(null,namespace));
if(and__4036__auto__){
var and__4036__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"figwheel-no-load","figwheel-no-load",-555840179).cljs$core$IFn$_invoke$arity$1(meta_data));
if(and__4036__auto____$1){
var or__4047__auto__ = new cljs.core.Keyword(null,"figwheel-always","figwheel-always",799819691).cljs$core$IFn$_invoke$arity$1(meta_data);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
var or__4047__auto____$1 = new cljs.core.Keyword(null,"figwheel-load","figwheel-load",1316089175).cljs$core$IFn$_invoke$arity$1(meta_data);
if(cljs.core.truth_(or__4047__auto____$1)){
return or__4047__auto____$1;
} else {
var or__4047__auto____$2 = figwheel.core.provided_QMARK_.call(null,namespace);
if(cljs.core.truth_(or__4047__auto____$2)){
return or__4047__auto____$2;
} else {
return figwheel.core.ns_exists_QMARK_.call(null,namespace);
}
}
}
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
});

figwheel.core.call_hooks = (function figwheel$core$call_hooks(var_args){
var args__4647__auto__ = [];
var len__4641__auto___25693 = arguments.length;
var i__4642__auto___25694 = (0);
while(true){
if((i__4642__auto___25694 < len__4641__auto___25693)){
args__4647__auto__.push((arguments[i__4642__auto___25694]));

var G__25695 = (i__4642__auto___25694 + (1));
i__4642__auto___25694 = G__25695;
continue;
} else {
}
break;
}

var argseq__4648__auto__ = ((((1) < args__4647__auto__.length))?(new cljs.core.IndexedSeq(args__4647__auto__.slice((1)),(0),null)):null);
return figwheel.core.call_hooks.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4648__auto__);
});

figwheel.core.call_hooks.cljs$core$IFn$_invoke$arity$variadic = (function (hook_key,args){
var hooks = cljs.core.keep.call(null,(function (p__25647){
var vec__25648 = p__25647;
var n = cljs.core.nth.call(null,vec__25648,(0),null);
var mdata = cljs.core.nth.call(null,vec__25648,(1),null);
var temp__5735__auto__ = cljs.core.get_in.call(null,mdata,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"figwheel-hooks","figwheel-hooks",720015356),hook_key], null));
if(cljs.core.truth_(temp__5735__auto__)){
var f = temp__5735__auto__;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [n,f], null);
} else {
return null;
}
}),new cljs.core.Keyword("figwheel.core","metadata","figwheel.core/metadata",-720139885).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,figwheel.core.state)));
var seq__25651 = cljs.core.seq.call(null,hooks);
var chunk__25652 = null;
var count__25653 = (0);
var i__25654 = (0);
while(true){
if((i__25654 < count__25653)){
var vec__25655 = cljs.core._nth.call(null,chunk__25652,i__25654);
var n = cljs.core.nth.call(null,vec__25655,(0),null);
var f = cljs.core.nth.call(null,vec__25655,(1),null);
var temp__5733__auto___25696 = cljs.core.reduce.call(null,((function (seq__25651,chunk__25652,count__25653,i__25654,vec__25655,n,f,hooks){
return (function (p1__25629_SHARP_,p2__25630_SHARP_){
if(cljs.core.truth_(p1__25629_SHARP_)){
return goog.object.get(p1__25629_SHARP_,p2__25630_SHARP_);
} else {
return null;
}
});})(seq__25651,chunk__25652,count__25653,i__25654,vec__25655,n,f,hooks))
,goog.global,cljs.core.map.call(null,cljs.core.str,cljs.core.concat.call(null,clojure.string.split.call(null,n,/\./),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [f], null))));
if(cljs.core.truth_(temp__5733__auto___25696)){
var hook_25697 = temp__5733__auto___25696;
goog.log.info(figwheel.core.logger,["Calling ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,hook_key))," hook - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join(''));

cljs.core.apply.call(null,hook_25697,args);
} else {
goog.log.warning(figwheel.core.logger,["Unable to find ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,hook_key))," hook - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join(''));
}


var G__25698 = seq__25651;
var G__25699 = chunk__25652;
var G__25700 = count__25653;
var G__25701 = (i__25654 + (1));
seq__25651 = G__25698;
chunk__25652 = G__25699;
count__25653 = G__25700;
i__25654 = G__25701;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__25651);
if(temp__5735__auto__){
var seq__25651__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25651__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__25651__$1);
var G__25702 = cljs.core.chunk_rest.call(null,seq__25651__$1);
var G__25703 = c__4461__auto__;
var G__25704 = cljs.core.count.call(null,c__4461__auto__);
var G__25705 = (0);
seq__25651 = G__25702;
chunk__25652 = G__25703;
count__25653 = G__25704;
i__25654 = G__25705;
continue;
} else {
var vec__25658 = cljs.core.first.call(null,seq__25651__$1);
var n = cljs.core.nth.call(null,vec__25658,(0),null);
var f = cljs.core.nth.call(null,vec__25658,(1),null);
var temp__5733__auto___25707 = cljs.core.reduce.call(null,((function (seq__25651,chunk__25652,count__25653,i__25654,vec__25658,n,f,seq__25651__$1,temp__5735__auto__,hooks){
return (function (p1__25629_SHARP_,p2__25630_SHARP_){
if(cljs.core.truth_(p1__25629_SHARP_)){
return goog.object.get(p1__25629_SHARP_,p2__25630_SHARP_);
} else {
return null;
}
});})(seq__25651,chunk__25652,count__25653,i__25654,vec__25658,n,f,seq__25651__$1,temp__5735__auto__,hooks))
,goog.global,cljs.core.map.call(null,cljs.core.str,cljs.core.concat.call(null,clojure.string.split.call(null,n,/\./),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [f], null))));
if(cljs.core.truth_(temp__5733__auto___25707)){
var hook_25708 = temp__5733__auto___25707;
goog.log.info(figwheel.core.logger,["Calling ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,hook_key))," hook - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join(''));

cljs.core.apply.call(null,hook_25708,args);
} else {
goog.log.warning(figwheel.core.logger,["Unable to find ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,hook_key))," hook - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(n),".",cljs.core.str.cljs$core$IFn$_invoke$arity$1(f)].join(''));
}


var G__25709 = cljs.core.next.call(null,seq__25651__$1);
var G__25710 = null;
var G__25711 = (0);
var G__25712 = (0);
seq__25651 = G__25709;
chunk__25652 = G__25710;
count__25653 = G__25711;
i__25654 = G__25712;
continue;
}
} else {
return null;
}
}
break;
}
});

figwheel.core.call_hooks.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
figwheel.core.call_hooks.cljs$lang$applyTo = (function (seq25645){
var G__25646 = cljs.core.first.call(null,seq25645);
var seq25645__$1 = cljs.core.next.call(null,seq25645);
var self__4628__auto__ = this;
return self__4628__auto__.cljs$core$IFn$_invoke$arity$variadic(G__25646,seq25645__$1);
});


figwheel.core.reload_namespaces = (function figwheel$core$reload_namespaces(namespaces,figwheel_meta){
var figwheel_meta__$1 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,(function (p__25661){
var vec__25662 = p__25661;
var k = cljs.core.nth.call(null,vec__25662,(0),null);
var v = cljs.core.nth.call(null,vec__25662,(1),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.name.call(null,k),v], null);
})),cljs.core.js__GT_clj.call(null,figwheel_meta,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
var namespaces__$1 = cljs.core.map.call(null,((function (figwheel_meta__$1){
return (function (p1__25631_SHARP_){
return cljs.core.with_meta.call(null,cljs.core.symbol.call(null,p1__25631_SHARP_),cljs.core.get.call(null,figwheel_meta__$1,p1__25631_SHARP_));
});})(figwheel_meta__$1))
,namespaces);
cljs.core.swap_BANG_.call(null,figwheel.core.state,((function (figwheel_meta__$1,namespaces__$1){
return (function (p1__25632_SHARP_){
return cljs.core.assoc_in.call(null,cljs.core.assoc.call(null,p1__25632_SHARP_,new cljs.core.Keyword("figwheel.core","metadata","figwheel.core/metadata",-720139885),figwheel_meta__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"reload-started","reload-started",-1932451477)], null),(new Date()).getTime());
});})(figwheel_meta__$1,namespaces__$1))
);

var to_reload = (cljs.core.truth_((function (){var and__4036__auto__ = (!(figwheel.core.load_warninged_code));
if(and__4036__auto__){
return cljs.core.not_empty.call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,figwheel.core.state),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"warnings","warnings",-735437651)], null)));
} else {
return and__4036__auto__;
}
})())?null:cljs.core.filter.call(null,((function (figwheel_meta__$1,namespaces__$1){
return (function (p1__25633_SHARP_){
return figwheel.core.reload_ns_QMARK_.call(null,p1__25633_SHARP_);
});})(figwheel_meta__$1,namespaces__$1))
,namespaces__$1));
if(cljs.core.empty_QMARK_.call(null,to_reload)){
} else {
figwheel.core.call_hooks.call(null,new cljs.core.Keyword(null,"before-load","before-load",-2060117064),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469),namespaces__$1], null));

setTimeout(((function (to_reload,figwheel_meta__$1,namespaces__$1){
return (function (){
return figwheel.core.dispatch_event.call(null,new cljs.core.Keyword(null,"figwheel.before-load","figwheel.before-load",58978771),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"namespaces","namespaces",-1444157469),namespaces__$1], null));
});})(to_reload,figwheel_meta__$1,namespaces__$1))
,(0));
}

var seq__25665_25713 = cljs.core.seq.call(null,to_reload);
var chunk__25666_25714 = null;
var count__25667_25715 = (0);
var i__25668_25716 = (0);
while(true){
if((i__25668_25716 < count__25667_25715)){
var ns_25717 = cljs.core._nth.call(null,chunk__25666_25714,i__25668_25716);
goog.require(cljs.core.name.call(null,ns_25717),true);


var G__25718 = seq__25665_25713;
var G__25719 = chunk__25666_25714;
var G__25720 = count__25667_25715;
var G__25721 = (i__25668_25716 + (1));
seq__25665_25713 = G__25718;
chunk__25666_25714 = G__25719;
count__25667_25715 = G__25720;
i__25668_25716 = G__25721;
continue;
} else {
var temp__5735__auto___25722 = cljs.core.seq.call(null,seq__25665_25713);
if(temp__5735__auto___25722){
var seq__25665_25723__$1 = temp__5735__auto___25722;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25665_25723__$1)){
var c__4461__auto___25724 = cljs.core.chunk_first.call(null,seq__25665_25723__$1);
var G__25725 = cljs.core.chunk_rest.call(null,seq__25665_25723__$1);
var G__25726 = c__4461__auto___25724;
var G__25727 = cljs.core.count.call(null,c__4461__auto___25724);
var G__25728 = (0);
seq__25665_25713 = G__25725;
chunk__25666_25714 = G__25726;
count__25667_25715 = G__25727;
i__25668_25716 = G__25728;
continue;
} else {
var ns_25729 = cljs.core.first.call(null,seq__25665_25723__$1);
goog.require(cljs.core.name.call(null,ns_25729),true);


var G__25730 = cljs.core.next.call(null,seq__25665_25723__$1);
var G__25731 = null;
var G__25732 = (0);
var G__25733 = (0);
seq__25665_25713 = G__25730;
chunk__25666_25714 = G__25731;
count__25667_25715 = G__25732;
i__25668_25716 = G__25733;
continue;
}
} else {
}
}
break;
}

var after_reload_fn_25734 = ((function (to_reload,figwheel_meta__$1,namespaces__$1){
return (function (){
try{if(cljs.core.truth_(cljs.core.not_empty.call(null,to_reload))){
goog.log.info(figwheel.core.logger,["loaded ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,to_reload))].join(''));

figwheel.core.call_hooks.call(null,new cljs.core.Keyword(null,"after-load","after-load",-1278503285),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reloaded-namespaces","reloaded-namespaces",1589557425),to_reload], null));

figwheel.core.dispatch_event.call(null,new cljs.core.Keyword(null,"figwheel.after-load","figwheel.after-load",-1913099389),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"reloaded-namespaces","reloaded-namespaces",1589557425),to_reload], null));
} else {
}

var temp__5735__auto__ = cljs.core.not_empty.call(null,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.set.call(null,to_reload)),namespaces__$1));
if(cljs.core.truth_(temp__5735__auto__)){
var not_loaded = temp__5735__auto__;
return goog.log.info(figwheel.core.logger,["did not load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,not_loaded))].join(''));
} else {
return null;
}
}finally {cljs.core.swap_BANG_.call(null,figwheel.core.state,cljs.core.assoc,new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),cljs.core.PersistentArrayMap.EMPTY);
}});})(to_reload,figwheel_meta__$1,namespaces__$1))
;
if((((typeof figwheel !== 'undefined') && (typeof figwheel.repl !== 'undefined')) && ((typeof figwheel !== 'undefined') && (typeof figwheel.repl !== 'undefined') && (typeof figwheel.repl.after_reloads !== 'undefined')))){
figwheel.repl.after_reloads(after_reload_fn_25734);
} else {
setTimeout(after_reload_fn_25734,(100));
}

return null;
});
goog.exportSymbol('figwheel.core.reload_namespaces', figwheel.core.reload_namespaces);

figwheel.core.compile_warnings = (function figwheel$core$compile_warnings(warnings){
if(cljs.core.empty_QMARK_.call(null,warnings)){
} else {
setTimeout((function (){
return figwheel.core.dispatch_event.call(null,new cljs.core.Keyword(null,"figwheel.compile-warnings","figwheel.compile-warnings",-2015032448),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"warnings","warnings",-735437651),warnings], null));
}),(0));
}

cljs.core.swap_BANG_.call(null,figwheel.core.state,cljs.core.update_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"warnings","warnings",-735437651)], null),cljs.core.concat,warnings);

var seq__25669 = cljs.core.seq.call(null,warnings);
var chunk__25670 = null;
var count__25671 = (0);
var i__25672 = (0);
while(true){
if((i__25672 < count__25671)){
var warning = cljs.core._nth.call(null,chunk__25670,i__25672);
goog.log.warning(figwheel.core.logger,["Compile Warning - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(warning))," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.core.file_line_column.call(null,warning))].join(''));


var G__25735 = seq__25669;
var G__25736 = chunk__25670;
var G__25737 = count__25671;
var G__25738 = (i__25672 + (1));
seq__25669 = G__25735;
chunk__25670 = G__25736;
count__25671 = G__25737;
i__25672 = G__25738;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__25669);
if(temp__5735__auto__){
var seq__25669__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__25669__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__25669__$1);
var G__25739 = cljs.core.chunk_rest.call(null,seq__25669__$1);
var G__25740 = c__4461__auto__;
var G__25741 = cljs.core.count.call(null,c__4461__auto__);
var G__25742 = (0);
seq__25669 = G__25739;
chunk__25670 = G__25740;
count__25671 = G__25741;
i__25672 = G__25742;
continue;
} else {
var warning = cljs.core.first.call(null,seq__25669__$1);
goog.log.warning(figwheel.core.logger,["Compile Warning - ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"message","message",-406056002).cljs$core$IFn$_invoke$arity$1(warning))," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.core.file_line_column.call(null,warning))].join(''));


var G__25743 = cljs.core.next.call(null,seq__25669__$1);
var G__25744 = null;
var G__25745 = (0);
var G__25746 = (0);
seq__25669 = G__25743;
chunk__25670 = G__25744;
count__25671 = G__25745;
i__25672 = G__25746;
continue;
}
} else {
return null;
}
}
break;
}
});
goog.exportSymbol('figwheel.core.compile_warnings', figwheel.core.compile_warnings);

figwheel.core.compile_warnings_remote = (function figwheel$core$compile_warnings_remote(warnings_json){
return figwheel.core.compile_warnings.call(null,cljs.core.js__GT_clj.call(null,warnings_json,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
});
goog.exportSymbol('figwheel.core.compile_warnings_remote', figwheel.core.compile_warnings_remote);

figwheel.core.handle_exception = (function figwheel$core$handle_exception(p__25673){
var map__25674 = p__25673;
var map__25674__$1 = (((((!((map__25674 == null))))?(((((map__25674.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__25674.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__25674):map__25674);
var exception_data = map__25674__$1;
var file = cljs.core.get.call(null,map__25674__$1,new cljs.core.Keyword(null,"file","file",-1269645878));
var type = cljs.core.get.call(null,map__25674__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.call(null,map__25674__$1,new cljs.core.Keyword(null,"message","message",-406056002));
try{setTimeout(((function (map__25674,map__25674__$1,exception_data,file,type,message){
return (function (){
return figwheel.core.dispatch_event.call(null,new cljs.core.Keyword(null,"figwheel.compile-exception","figwheel.compile-exception",1092880746),exception_data);
});})(map__25674,map__25674__$1,exception_data,file,type,message))
,(0));

cljs.core.swap_BANG_.call(null,figwheel.core.state,((function (map__25674,map__25674__$1,exception_data,file,type,message){
return (function (p1__25634_SHARP_){
return cljs.core.assoc_in.call(null,cljs.core.assoc_in.call(null,p1__25634_SHARP_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"reload-started","reload-started",-1932451477)], null),(new Date()).getTime()),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715),new cljs.core.Keyword(null,"exception","exception",-335277064)], null),exception_data);
});})(map__25674,map__25674__$1,exception_data,file,type,message))
);

return goog.log.warning(figwheel.core.logger,(function (){var G__25676 = "Compile Exception - ";
var G__25676__$1 = (cljs.core.truth_((function (){var or__4047__auto__ = type;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return message;
}
})())?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25676),cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null," : ",cljs.core.filter.call(null,cljs.core.some_QMARK_,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [type,message], null))))].join(''):G__25676);
if(cljs.core.truth_(file)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__25676__$1)," in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(figwheel.core.file_line_column.call(null,exception_data))].join('');
} else {
return G__25676__$1;
}
})());
}finally {cljs.core.swap_BANG_.call(null,figwheel.core.state,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("figwheel.core","reload-state","figwheel.core/reload-state",1887223715)], null),cljs.core.PersistentArrayMap.EMPTY);
}});
goog.exportSymbol('figwheel.core.handle_exception', figwheel.core.handle_exception);

figwheel.core.handle_exception_remote = (function figwheel$core$handle_exception_remote(exception_data){
return figwheel.core.handle_exception.call(null,cljs.core.js__GT_clj.call(null,exception_data,new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true));
});
goog.exportSymbol('figwheel.core.handle_exception_remote', figwheel.core.handle_exception_remote);

//# sourceMappingURL=core.js.map
