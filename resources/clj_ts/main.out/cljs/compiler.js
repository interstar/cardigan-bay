// Compiled by ClojureScript 1.10.439 {}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler.es5_GT__EQ_ = cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,cljs.core.comp.call(null,cljs.core.mapcat.call(null,(function (lang){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [lang,cljs.core.keyword.call(null,clojure.string.replace.call(null,cljs.core.name.call(null,lang),/^ecmascript/,"es"))], null);
}))),new cljs.core.PersistentVector(null, 9, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ecmascript5","ecmascript5",342717552),new cljs.core.Keyword(null,"ecmascript5-strict","ecmascript5-strict",888234811),new cljs.core.Keyword(null,"ecmascript6","ecmascript6",723864898),new cljs.core.Keyword(null,"ecmascript6-strict","ecmascript6-strict",-786049555),new cljs.core.Keyword(null,"ecmascript-2015","ecmascript-2015",-902254444),new cljs.core.Keyword(null,"ecmascript6-typed","ecmascript6-typed",-1978203054),new cljs.core.Keyword(null,"ecmascript-2016","ecmascript-2016",471574729),new cljs.core.Keyword(null,"ecmascript-2017","ecmascript-2017",620145058),new cljs.core.Keyword(null,"ecmascript-next","ecmascript-next",-1935155962)], null));
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_source_map_data_gen_col_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
/**
 * Gets the part up to the first `.` of a namespace.
 * Returns the empty string for nil.
 * Returns the entire string if no `.` in namespace
 */
cljs.compiler.get_first_ns_segment = (function cljs$compiler$get_first_ns_segment(ns){
var ns__$1 = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
var idx = ns__$1.indexOf(".");
if(((-1) === idx)){
return ns__$1;
} else {
return cljs.core.subs.call(null,ns__$1,(0),idx);
}
});
cljs.compiler.find_ns_starts_with = (function cljs$compiler$find_ns_starts_with(needle){
return cljs.core.reduce_kv.call(null,(function (xs,ns,_){
if(cljs.core._EQ_.call(null,needle,cljs.compiler.get_first_ns_segment.call(null,ns))){
return cljs.core.reduced.call(null,needle);
} else {
return null;
}
}),null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__14058 = s;
var map__14058__$1 = (((((!((map__14058 == null))))?(((((map__14058.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14058.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14058):map__14058);
var name = cljs.core.get.call(null,map__14058__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__14058__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__14061 = info;
var map__14062 = G__14061;
var map__14062__$1 = (((((!((map__14062 == null))))?(((((map__14062.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14062.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14062):map__14062);
var shadow = cljs.core.get.call(null,map__14062__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__14061__$1 = G__14061;
while(true){
var d__$2 = d__$1;
var map__14064 = G__14061__$1;
var map__14064__$1 = (((((!((map__14064 == null))))?(((((map__14064.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14064.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14064):map__14064);
var shadow__$1 = cljs.core.get.call(null,map__14064__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__14066 = (d__$2 + (1));
var G__14067 = shadow__$1;
d__$1 = G__14066;
G__14061__$1 = G__14067;
continue;
} else {
if(cljs.core.truth_(cljs.compiler.find_ns_starts_with.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__14068){
var map__14069 = p__14068;
var map__14069__$1 = (((((!((map__14069 == null))))?(((((map__14069.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14069.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14069):map__14069);
var name_var = map__14069__$1;
var name = cljs.core.get.call(null,map__14069__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__14069__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"..","_DOT__DOT_");
var map__14071 = info;
var map__14071__$1 = (((((!((map__14071 == null))))?(((((map__14071.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14071.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14071):map__14071);
var ns = cljs.core.get.call(null,map__14071__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__14071__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),".","$")),"$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if((!((cljs.core.get.call(null,reserved,s) == null)))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"$"].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var G__14074 = arguments.length;
switch (G__14074) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if((!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null)))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?["self__.",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):(((!((renamed == null))))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if(((field === true) || ((depth === (0))))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(munged_name),"__$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(s),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = new cljs.core.Var(function(){return cljs.core.munge_str;},new cljs.core.Symbol("cljs.core","munge-str","cljs.core/munge-str",-301346665,null),cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"private","private",-558947994),new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"file","file",-1269645878),new cljs.core.Keyword(null,"end-column","end-column",1425389514),new cljs.core.Keyword(null,"column","column",2078222095),new cljs.core.Keyword(null,"line","line",212345235),new cljs.core.Keyword(null,"end-line","end-line",1837326455),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"test","test",577538877)],[true,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null),new cljs.core.Symbol(null,"munge-str","munge-str",-2042069652,null),"cljs/core.cljs",(17),(1),(11321),(11321),cljs.core.list(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"name","name",-810760592,null)], null)),null,(cljs.core.truth_(cljs.core.munge_str)?cljs.core.munge_str.cljs$lang$test:null)])).call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;

cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__14076 = cp;
switch (G__14076) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if(((((31) < cp)) && ((cp < (127))))){
return c;
} else {
var unpadded = cp.toString((16));
var pad = cljs.core.subs.call(null,"0000",unpadded.length);
return ["\\u",cljs.core.str.cljs$core$IFn$_invoke$arity$1(pad),cljs.core.str.cljs$core$IFn$_invoke$arity$1(unpadded)].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__14078_14082 = cljs.core.seq.call(null,s);
var chunk__14079_14083 = null;
var count__14080_14084 = (0);
var i__14081_14085 = (0);
while(true){
if((i__14081_14085 < count__14080_14084)){
var c_14086 = cljs.core._nth.call(null,chunk__14079_14083,i__14081_14085);
sb.append(cljs.compiler.escape_char.call(null,c_14086));


var G__14087 = seq__14078_14082;
var G__14088 = chunk__14079_14083;
var G__14089 = count__14080_14084;
var G__14090 = (i__14081_14085 + (1));
seq__14078_14082 = G__14087;
chunk__14079_14083 = G__14088;
count__14080_14084 = G__14089;
i__14081_14085 = G__14090;
continue;
} else {
var temp__5735__auto___14091 = cljs.core.seq.call(null,seq__14078_14082);
if(temp__5735__auto___14091){
var seq__14078_14092__$1 = temp__5735__auto___14091;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14078_14092__$1)){
var c__4461__auto___14093 = cljs.core.chunk_first.call(null,seq__14078_14092__$1);
var G__14094 = cljs.core.chunk_rest.call(null,seq__14078_14092__$1);
var G__14095 = c__4461__auto___14093;
var G__14096 = cljs.core.count.call(null,c__4461__auto___14093);
var G__14097 = (0);
seq__14078_14082 = G__14094;
chunk__14079_14083 = G__14095;
count__14080_14084 = G__14096;
i__14081_14085 = G__14097;
continue;
} else {
var c_14098 = cljs.core.first.call(null,seq__14078_14092__$1);
sb.append(cljs.compiler.escape_char.call(null,c_14098));


var G__14099 = cljs.core.next.call(null,seq__14078_14092__$1);
var G__14100 = null;
var G__14101 = (0);
var G__14102 = (0);
seq__14078_14082 = G__14099;
chunk__14079_14083 = G__14100;
count__14080_14084 = G__14101;
i__14081_14085 = G__14102;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1("\""),cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),cljs.core.str.cljs$core$IFn$_invoke$arity$1("\"")].join('');
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__4524__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4525__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4526__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4527__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4528__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4528__auto__,method_table__4524__auto__,prefer_table__4525__auto__,method_cache__4526__auto__,cached_hierarchy__4527__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__14103_14108 = ast;
var map__14103_14109__$1 = (((((!((map__14103_14108 == null))))?(((((map__14103_14108.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14103_14108.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14103_14108):map__14103_14108);
var env_14110 = cljs.core.get.call(null,map__14103_14109__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_14110))){
var map__14105_14111 = env_14110;
var map__14105_14112__$1 = (((((!((map__14105_14111 == null))))?(((((map__14105_14111.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14105_14111.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14105_14111):map__14105_14111);
var line_14113 = cljs.core.get.call(null,map__14105_14112__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_14114 = cljs.core.get.call(null,map__14105_14112__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110){
return (function (m){
var minfo = (function (){var G__14107 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core.truth_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast)))){
return cljs.core.assoc.call(null,G__14107,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast))));
} else {
return G__14107;
}
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_14113 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_14114)?(column_14114 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110))
,cljs.core.sorted_map.call(null)));
});})(map__14105_14111,map__14105_14112__$1,line_14113,column_14114,map__14103_14108,map__14103_14109__$1,env_14110))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var G__14123 = arguments.length;
switch (G__14123) {
case 0:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4662__auto__ = [];
var len__4641__auto___14130 = arguments.length;
var i__4642__auto___14131 = (0);
while(true){
if((i__4642__auto___14131 < len__4641__auto___14130)){
args_arr__4662__auto__.push((arguments[i__4642__auto___14131]));

var G__14132 = (i__4642__auto___14131 + (1));
i__4642__auto___14131 = G__14132;
continue;
} else {
}
break;
}

var argseq__4663__auto__ = (new cljs.core.IndexedSeq(args_arr__4662__auto__.slice((5)),(0),null));
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4663__auto__);

}
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$0 = (function (){
return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$1 = (function (a){
if((a == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,a)){
cljs.compiler.emit.call(null,a);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,a)){
cljs.core.apply.call(null,cljs.compiler.emits,a);
} else {
if(goog.isFunction(a)){
a.call(null);
} else {
var s_14133 = (function (){var G__14124 = a;
if((!(typeof a === 'string'))){
return G__14124.toString();
} else {
return G__14124;
}
})();
var temp__5739__auto___14134 = cljs.compiler._STAR_source_map_data_STAR_;
if((temp__5739__auto___14134 == null)){
} else {
var sm_data_14135 = temp__5739__auto___14134;
cljs.core.swap_BANG_.call(null,sm_data_14135,cljs.core.update,new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),((function (sm_data_14135,temp__5739__auto___14134,s_14133){
return (function (p1__14115_SHARP_){
return (p1__14115_SHARP_ + s_14133.length);
});})(sm_data_14135,temp__5739__auto___14134,s_14133))
);
}

cljs.core.print.call(null,s_14133);

}
}
}
}

return null;
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

return cljs.compiler.emits.call(null,b);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler.emits.call(null,c);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler.emits.call(null,d);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler.emits.call(null,e);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__14125 = cljs.core.seq.call(null,xs);
var chunk__14126 = null;
var count__14127 = (0);
var i__14128 = (0);
while(true){
if((i__14128 < count__14127)){
var x = cljs.core._nth.call(null,chunk__14126,i__14128);
cljs.compiler.emits.call(null,x);


var G__14136 = seq__14125;
var G__14137 = chunk__14126;
var G__14138 = count__14127;
var G__14139 = (i__14128 + (1));
seq__14125 = G__14136;
chunk__14126 = G__14137;
count__14127 = G__14138;
i__14128 = G__14139;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__14125);
if(temp__5735__auto__){
var seq__14125__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14125__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__14125__$1);
var G__14140 = cljs.core.chunk_rest.call(null,seq__14125__$1);
var G__14141 = c__4461__auto__;
var G__14142 = cljs.core.count.call(null,c__4461__auto__);
var G__14143 = (0);
seq__14125 = G__14140;
chunk__14126 = G__14141;
count__14127 = G__14142;
i__14128 = G__14143;
continue;
} else {
var x = cljs.core.first.call(null,seq__14125__$1);
cljs.compiler.emits.call(null,x);


var G__14144 = cljs.core.next.call(null,seq__14125__$1);
var G__14145 = null;
var G__14146 = (0);
var G__14147 = (0);
seq__14125 = G__14144;
chunk__14126 = G__14145;
count__14127 = G__14146;
i__14128 = G__14147;
continue;
}
} else {
return null;
}
}
break;
}
});

/** @this {Function} */
cljs.compiler.emits.cljs$lang$applyTo = (function (seq14117){
var G__14118 = cljs.core.first.call(null,seq14117);
var seq14117__$1 = cljs.core.next.call(null,seq14117);
var G__14119 = cljs.core.first.call(null,seq14117__$1);
var seq14117__$2 = cljs.core.next.call(null,seq14117__$1);
var G__14120 = cljs.core.first.call(null,seq14117__$2);
var seq14117__$3 = cljs.core.next.call(null,seq14117__$2);
var G__14121 = cljs.core.first.call(null,seq14117__$3);
var seq14117__$4 = cljs.core.next.call(null,seq14117__$3);
var G__14122 = cljs.core.first.call(null,seq14117__$4);
var seq14117__$5 = cljs.core.next.call(null,seq14117__$4);
var self__4628__auto__ = this;
return self__4628__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14118,G__14119,G__14120,G__14121,G__14122,seq14117__$5);
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (5);

cljs.compiler._emitln = (function cljs$compiler$_emitln(){
cljs.core.newline.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__14148){
var map__14149 = p__14148;
var map__14149__$1 = (((((!((map__14149 == null))))?(((((map__14149.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14149.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14149):map__14149);
var m = map__14149__$1;
var gen_line = cljs.core.get.call(null,map__14149__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var G__14158 = arguments.length;
switch (G__14158) {
case 0:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
var args_arr__4662__auto__ = [];
var len__4641__auto___14164 = arguments.length;
var i__4642__auto___14165 = (0);
while(true){
if((i__4642__auto___14165 < len__4641__auto___14164)){
args_arr__4662__auto__.push((arguments[i__4642__auto___14165]));

var G__14166 = (i__4642__auto___14165 + (1));
i__4642__auto___14165 = G__14166;
continue;
} else {
}
break;
}

var argseq__4663__auto__ = (new cljs.core.IndexedSeq(args_arr__4662__auto__.slice((5)),(0),null));
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),argseq__4663__auto__);

}
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$1 = (function (a){
cljs.compiler.emits.call(null,a);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$2 = (function (a,b){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$3 = (function (a,b,c){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$4 = (function (a,b,c,d){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$5 = (function (a,b,c,d,e){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

return cljs.compiler._emitln.call(null);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (a,b,c,d,e,xs){
cljs.compiler.emits.call(null,a);

cljs.compiler.emits.call(null,b);

cljs.compiler.emits.call(null,c);

cljs.compiler.emits.call(null,d);

cljs.compiler.emits.call(null,e);

var seq__14159_14167 = cljs.core.seq.call(null,xs);
var chunk__14160_14168 = null;
var count__14161_14169 = (0);
var i__14162_14170 = (0);
while(true){
if((i__14162_14170 < count__14161_14169)){
var x_14171 = cljs.core._nth.call(null,chunk__14160_14168,i__14162_14170);
cljs.compiler.emits.call(null,x_14171);


var G__14172 = seq__14159_14167;
var G__14173 = chunk__14160_14168;
var G__14174 = count__14161_14169;
var G__14175 = (i__14162_14170 + (1));
seq__14159_14167 = G__14172;
chunk__14160_14168 = G__14173;
count__14161_14169 = G__14174;
i__14162_14170 = G__14175;
continue;
} else {
var temp__5735__auto___14176 = cljs.core.seq.call(null,seq__14159_14167);
if(temp__5735__auto___14176){
var seq__14159_14177__$1 = temp__5735__auto___14176;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14159_14177__$1)){
var c__4461__auto___14178 = cljs.core.chunk_first.call(null,seq__14159_14177__$1);
var G__14179 = cljs.core.chunk_rest.call(null,seq__14159_14177__$1);
var G__14180 = c__4461__auto___14178;
var G__14181 = cljs.core.count.call(null,c__4461__auto___14178);
var G__14182 = (0);
seq__14159_14167 = G__14179;
chunk__14160_14168 = G__14180;
count__14161_14169 = G__14181;
i__14162_14170 = G__14182;
continue;
} else {
var x_14183 = cljs.core.first.call(null,seq__14159_14177__$1);
cljs.compiler.emits.call(null,x_14183);


var G__14184 = cljs.core.next.call(null,seq__14159_14177__$1);
var G__14185 = null;
var G__14186 = (0);
var G__14187 = (0);
seq__14159_14167 = G__14184;
chunk__14160_14168 = G__14185;
count__14161_14169 = G__14186;
i__14162_14170 = G__14187;
continue;
}
} else {
}
}
break;
}

return cljs.compiler._emitln.call(null);
});

/** @this {Function} */
cljs.compiler.emitln.cljs$lang$applyTo = (function (seq14152){
var G__14153 = cljs.core.first.call(null,seq14152);
var seq14152__$1 = cljs.core.next.call(null,seq14152);
var G__14154 = cljs.core.first.call(null,seq14152__$1);
var seq14152__$2 = cljs.core.next.call(null,seq14152__$1);
var G__14155 = cljs.core.first.call(null,seq14152__$2);
var seq14152__$3 = cljs.core.next.call(null,seq14152__$2);
var G__14156 = cljs.core.first.call(null,seq14152__$3);
var seq14152__$4 = cljs.core.next.call(null,seq14152__$3);
var G__14157 = cljs.core.first.call(null,seq14152__$4);
var seq14152__$5 = cljs.core.next.call(null,seq14152__$4);
var self__4628__auto__ = this;
return self__4628__auto__.cljs$core$IFn$_invoke$arity$variadic(G__14153,G__14154,G__14155,G__14156,G__14157,seq14152__$5);
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (5);

cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__4572__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__14188_14192 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__14189_14193 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__14190_14194 = true;
var _STAR_print_fn_STAR__temp_val__14191_14195 = ((function (_STAR_print_newline_STAR__orig_val__14188_14192,_STAR_print_fn_STAR__orig_val__14189_14193,_STAR_print_newline_STAR__temp_val__14190_14194,sb__4572__auto__){
return (function (x__4573__auto__){
return sb__4572__auto__.append(x__4573__auto__);
});})(_STAR_print_newline_STAR__orig_val__14188_14192,_STAR_print_fn_STAR__orig_val__14189_14193,_STAR_print_newline_STAR__temp_val__14190_14194,sb__4572__auto__))
;
cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__14190_14194;

cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__14191_14195;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__14189_14193;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__14188_14192;
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__4572__auto__);
});
if((typeof cljs !== 'undefined') && (typeof cljs.compiler !== 'undefined') && (typeof cljs.compiler.emit_constant_STAR_ !== 'undefined')){
} else {
cljs.compiler.emit_constant_STAR_ = (function (){var method_table__4524__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__4525__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__4526__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__4527__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__4528__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant*"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__4528__auto__,method_table__4524__auto__,prefer_table__4525__auto__,method_cache__4526__auto__,cached_hierarchy__4527__auto__));
})();
}









cljs.compiler.all_distinct_QMARK_ = (function cljs$compiler$all_distinct_QMARK_(xs){
return cljs.core.apply.call(null,cljs.core.distinct_QMARK_,xs);
});
cljs.compiler.emit_constant_no_meta = (function cljs$compiler$emit_constant_no_meta(x){
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x)){
return cljs.compiler.emit_list.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.core.record_QMARK_.call(null,x)){
var vec__14196 = cljs.analyzer.record_ns_PLUS_name.call(null,x);
var ns = cljs.core.nth.call(null,vec__14196,(0),null);
var name = cljs.core.nth.call(null,vec__14196,(1),null);
return cljs.compiler.emit_record_value.call(null,ns,name,((function (vec__14196,ns,name){
return (function (){
return cljs.compiler.emit_constant.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,x));
});})(vec__14196,ns,name))
);
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x)){
return cljs.compiler.emit_map.call(null,cljs.core.keys.call(null,x),cljs.core.vals.call(null,x),cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
if(cljs.analyzer.cljs_vector_QMARK_.call(null,x)){
return cljs.compiler.emit_vector.call(null,x,cljs.compiler.emit_constants_comma_sep);
} else {
if(cljs.analyzer.cljs_set_QMARK_.call(null,x)){
return cljs.compiler.emit_set.call(null,x,cljs.compiler.emit_constants_comma_sep,cljs.compiler.all_distinct_QMARK_);
} else {
return cljs.compiler.emit_constant_STAR_.call(null,x);

}
}
}
}
}
});
cljs.compiler.emit_constant = (function cljs$compiler$emit_constant(v){
var m = cljs.analyzer.elide_irrelevant_meta.call(null,cljs.core.meta.call(null,v));
if((!((cljs.core.seq.call(null,m) == null)))){
return cljs.compiler.emit_with_meta.call(null,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,v);
});})(m))
,((function (m){
return (function (){
return cljs.compiler.emit_constant_no_meta.call(null,m);
});})(m))
);
} else {
return cljs.compiler.emit_constant_no_meta.call(null,v);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,new cljs.core.Keyword(null,"default","default",-1987822328),(function (x){
throw cljs.core.ex_info.call(null,["failed compiling constant: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x),"; ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.pr_str.call(null,cljs.core.type.call(null,x)))," is not a valid ClojureScript constant."].join(''),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"constant","constant",-379609303),x,new cljs.core.Keyword(null,"type","type",1174270348),cljs.core.type.call(null,x)], null));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Number,(function (x){
if(cljs.core.truth_(isNaN(x))){
return cljs.compiler.emits.call(null,"NaN");
} else {
if(cljs.core.not.call(null,isFinite(x))){
return cljs.compiler.emits.call(null,(((x > (0)))?"Infinity":"-Infinity"));
} else {
return cljs.compiler.emits.call(null,"(",x,")");

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(x))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__14199 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,cljs.core.str.cljs$core$IFn$_invoke$arity$1(x));
var _ = cljs.core.nth.call(null,vec__14199,(0),null);
var flags = cljs.core.nth.call(null,vec__14199,(1),null);
var pattern = cljs.core.nth.call(null,vec__14199,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = (((!((ns == null))))?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(name)].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Keyword,(function (x){
var temp__5733__auto__ = (function (){var and__4036__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4036__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4036__auto__;
}
})();
if(cljs.core.truth_(temp__5733__auto__)){
var value = temp__5733__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.Symbol,(function (x){
var temp__5733__auto__ = (function (){var and__4036__auto__ = new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
if(cljs.core.truth_(and__4036__auto__)){
return x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
} else {
return and__4036__auto__;
}
})();
if(cljs.core.truth_(temp__5733__auto__)){
var value = temp__5733__auto__;
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.compiler.emit_constants_comma_sep = (function cljs$compiler$emit_constants_comma_sep(cs){
return (function (){
return cljs.core.doall.call(null,cljs.core.map_indexed.call(null,(function (i,m){
if(cljs.core.even_QMARK_.call(null,i)){
return cljs.compiler.emit_constant.call(null,m);
} else {
return cljs.compiler.emits.call(null,m);
}
}),cljs.compiler.comma_sep.call(null,cs)));
});
});
cljs.compiler.array_map_threshold = (8);
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,Date,(function (date){
return cljs.compiler.emits.call(null,"new Date(",date.getTime(),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant_STAR_,cljs.tagged_literals.JSValue,(function (v){
var items = v.val;
if(cljs.core.map_QMARK_.call(null,items)){
return cljs.compiler.emit_js_object.call(null,items,((function (items){
return (function (p1__14202_SHARP_){
return ((function (items){
return (function (){
return cljs.compiler.emit_constant.call(null,p1__14202_SHARP_);
});
;})(items))
});})(items))
);
} else {
return cljs.compiler.emit_js_array.call(null,items,cljs.compiler.emit_constants_comma_sep);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.compiler.emit_var = (function cljs$compiler$emit_var(p__14204){
var map__14205 = p__14204;
var map__14205__$1 = (((((!((map__14205 == null))))?(((((map__14205.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14205.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14205):map__14205);
var ast = map__14205__$1;
var info = cljs.core.get.call(null,map__14205__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__14205__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__14205__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var temp__5733__auto__ = new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292).cljs$core$IFn$_invoke$arity$1(ast);
if(cljs.core.truth_(temp__5733__auto__)){
var const_expr = temp__5733__auto__;
return cljs.compiler.emit.call(null,cljs.core.assoc.call(null,const_expr,new cljs.core.Keyword(null,"env","env",-1815813235),env));
} else {
var map__14207 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__14207__$1 = (((((!((map__14207 == null))))?(((((map__14207.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14207.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14207):map__14207);
var cenv = map__14207__$1;
var options = cljs.core.get.call(null,map__14207__$1,new cljs.core.Keyword(null,"options","options",99638489));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var or__4047__auto__ = js_module_name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(ast))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,ast));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var reserved = (function (){var G__14209 = cljs.compiler.js_reserved;
if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.compiler.es5_GT__EQ_.call(null,new cljs.core.Keyword(null,"language-out","language-out",334619882).cljs$core$IFn$_invoke$arity$1(options));
if(cljs.core.truth_(and__4036__auto__)){
return (!((cljs.core.namespace.call(null,var_name) == null)));
} else {
return and__4036__auto__;
}
})())){
return clojure.set.difference.call(null,G__14209,cljs.analyzer.es5_allowed);
} else {
return G__14209;
}
})();
var js_module = cljs.core.get_in.call(null,cenv,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-namespaces","js-namespaces",-471353612),(function (){var or__4047__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})()], null));
var info__$2 = (function (){var G__14210 = info__$1;
if(cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.call(null,G__14210,reserved);
} else {
return G__14210;
}
})();
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var G__14211_14212 = new cljs.core.Keyword(null,"module-type","module-type",1392760304).cljs$core$IFn$_invoke$arity$1(js_module);
var G__14211_14213__$1 = (((G__14211_14212 instanceof cljs.core.Keyword))?G__14211_14212.fqn:null);
switch (G__14211_14213__$1) {
case "commonjs":
if(cljs.core.truth_(cljs.core.namespace.call(null,var_name))){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"].",cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved));
} else {
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.name.call(null,var_name),reserved),"[\"default\"]");
}

break;
case "es6":
if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.core.namespace.call(null,var_name);
if(cljs.core.truth_(and__4036__auto__)){
return cljs.core._EQ_.call(null,"default",cljs.core.name.call(null,var_name));
} else {
return and__4036__auto__;
}
})())){
cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,cljs.core.namespace.call(null,var_name),reserved),"[\"default\"]");
} else {
cljs.compiler.emits.call(null,info__$2);
}

break;
default:
cljs.compiler.emits.call(null,info__$2);

}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"binding","binding",539932593),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"local","local",-1497766724),(function (expr){
return cljs.compiler.emit_var.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"the-var","the-var",1428415613),(function (p__14215){
var map__14216 = p__14215;
var map__14216__$1 = (((((!((map__14216 == null))))?(((((map__14216.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14216.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14216):map__14216);
var arg = map__14216__$1;
var env = cljs.core.get.call(null,map__14216__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__14216__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__14216__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__14216__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error("Assert failed: (ana/ast? sym)"));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error("Assert failed: (ana/ast? meta)"));
}

var map__14218 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__14218__$1 = (((((!((map__14218 == null))))?(((((map__14218.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14218.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14218):map__14218);
var name = cljs.core.get.call(null,map__14218__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_with_meta = (function cljs$compiler$emit_with_meta(expr,meta){
return cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"with-meta","with-meta",-1566856820),(function (p__14220){
var map__14221 = p__14220;
var map__14221__$1 = (((((!((map__14221 == null))))?(((((map__14221.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14221.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14221):map__14221);
var expr = cljs.core.get.call(null,map__14221__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__14221__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__14221__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_with_meta.call(null,expr,meta);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
var keys__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,keys);
return ((cljs.core.every_QMARK_.call(null,((function (keys__$1){
return (function (p1__14223_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__14223_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(keys__$1))
,keys__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys__$1)),cljs.core.count.call(null,keys__$1))));
});
cljs.compiler.emit_map = (function cljs$compiler$emit_map(keys,vals,comma_sep,distinct_keys_QMARK_){
if((cljs.core.count.call(null,keys) === (0))){
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(distinct_keys_QMARK_.call(null,keys))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.createAsIfByAssoc([",comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"])");
}
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",comma_sep.call(null,keys),"],[",comma_sep.call(null,vals),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__14224){
var map__14225 = p__14224;
var map__14225__$1 = (((((!((map__14225 == null))))?(((((map__14225.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14225.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14225):map__14225);
var env = cljs.core.get.call(null,map__14225__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__14225__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__14225__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_map.call(null,keys,vals,cljs.compiler.comma_sep,cljs.compiler.distinct_keys_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_list = (function cljs$compiler$emit_list(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
return cljs.compiler.emits.call(null,"cljs.core.list(",comma_sep.call(null,items),")");
}
});
cljs.compiler.emit_vector = (function cljs$compiler$emit_vector(items,comma_sep){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt = cljs.core.count.call(null,items);
if((cnt < (32))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",comma_sep.call(null,items),"], null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",comma_sep.call(null,items),"], true)");
}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__14227){
var map__14228 = p__14227;
var map__14228__$1 = (((((!((map__14228 == null))))?(((((map__14228.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14228.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14228):map__14228);
var items = cljs.core.get.call(null,map__14228__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__14228__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_vector.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
var items__$1 = cljs.core.map.call(null,cljs.analyzer.unwrap_quote,items);
return ((cljs.core.every_QMARK_.call(null,((function (items__$1){
return (function (p1__14230_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__14230_SHARP_),new cljs.core.Keyword(null,"const","const",1709929842));
});})(items__$1))
,items__$1)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items__$1)),cljs.core.count.call(null,items__$1))));
});
cljs.compiler.emit_set = (function cljs$compiler$emit_set(items,comma_sep,distinct_constants_QMARK_){
if(cljs.core.empty_QMARK_.call(null,items)){
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(distinct_constants_QMARK_.call(null,items))){
return cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
return cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.createAsIfByAssoc([",comma_sep.call(null,items),"])");

}
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__14231){
var map__14232 = p__14231;
var map__14232__$1 = (((((!((map__14232 == null))))?(((((map__14232.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14232.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14232):map__14232);
var items = cljs.core.get.call(null,map__14232__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__14232__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_set.call(null,items,cljs.compiler.comma_sep,cljs.compiler.distinct_constants_QMARK_);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_js_object = (function cljs$compiler$emit_js_object(items,emit_js_object_val){
cljs.compiler.emits.call(null,"({");

var temp__5735__auto___14250 = cljs.core.seq.call(null,items);
if(temp__5735__auto___14250){
var items_14251__$1 = temp__5735__auto___14250;
var vec__14234_14252 = items_14251__$1;
var seq__14235_14253 = cljs.core.seq.call(null,vec__14234_14252);
var first__14236_14254 = cljs.core.first.call(null,seq__14235_14253);
var seq__14235_14255__$1 = cljs.core.next.call(null,seq__14235_14253);
var vec__14237_14256 = first__14236_14254;
var k_14257 = cljs.core.nth.call(null,vec__14237_14256,(0),null);
var v_14258 = cljs.core.nth.call(null,vec__14237_14256,(1),null);
var r_14259 = seq__14235_14255__$1;
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_14257),"\": ",emit_js_object_val.call(null,v_14258));

var seq__14240_14260 = cljs.core.seq.call(null,r_14259);
var chunk__14241_14261 = null;
var count__14242_14262 = (0);
var i__14243_14263 = (0);
while(true){
if((i__14243_14263 < count__14242_14262)){
var vec__14244_14264 = cljs.core._nth.call(null,chunk__14241_14261,i__14243_14263);
var k_14265__$1 = cljs.core.nth.call(null,vec__14244_14264,(0),null);
var v_14266__$1 = cljs.core.nth.call(null,vec__14244_14264,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_14265__$1),"\": ",emit_js_object_val.call(null,v_14266__$1));


var G__14267 = seq__14240_14260;
var G__14268 = chunk__14241_14261;
var G__14269 = count__14242_14262;
var G__14270 = (i__14243_14263 + (1));
seq__14240_14260 = G__14267;
chunk__14241_14261 = G__14268;
count__14242_14262 = G__14269;
i__14243_14263 = G__14270;
continue;
} else {
var temp__5735__auto___14271__$1 = cljs.core.seq.call(null,seq__14240_14260);
if(temp__5735__auto___14271__$1){
var seq__14240_14272__$1 = temp__5735__auto___14271__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14240_14272__$1)){
var c__4461__auto___14273 = cljs.core.chunk_first.call(null,seq__14240_14272__$1);
var G__14274 = cljs.core.chunk_rest.call(null,seq__14240_14272__$1);
var G__14275 = c__4461__auto___14273;
var G__14276 = cljs.core.count.call(null,c__4461__auto___14273);
var G__14277 = (0);
seq__14240_14260 = G__14274;
chunk__14241_14261 = G__14275;
count__14242_14262 = G__14276;
i__14243_14263 = G__14277;
continue;
} else {
var vec__14247_14278 = cljs.core.first.call(null,seq__14240_14272__$1);
var k_14279__$1 = cljs.core.nth.call(null,vec__14247_14278,(0),null);
var v_14280__$1 = cljs.core.nth.call(null,vec__14247_14278,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_14279__$1),"\": ",emit_js_object_val.call(null,v_14280__$1));


var G__14281 = cljs.core.next.call(null,seq__14240_14272__$1);
var G__14282 = null;
var G__14283 = (0);
var G__14284 = (0);
seq__14240_14260 = G__14281;
chunk__14241_14261 = G__14282;
count__14242_14262 = G__14283;
i__14243_14263 = G__14284;
continue;
}
} else {
}
}
break;
}
} else {
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_js_array = (function cljs$compiler$emit_js_array(items,comma_sep){
return cljs.compiler.emits.call(null,"[",comma_sep.call(null,items),"]");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-object","js-object",1830199158),(function (p__14285){
var map__14286 = p__14285;
var map__14286__$1 = (((((!((map__14286 == null))))?(((((map__14286.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14286.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14286):map__14286);
var keys = cljs.core.get.call(null,map__14286__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__14286__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env = cljs.core.get.call(null,map__14286__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_object.call(null,cljs.core.map.call(null,cljs.core.vector,keys,vals),cljs.core.identity);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-array","js-array",-1210185421),(function (p__14288){
var map__14289 = p__14288;
var map__14289__$1 = (((((!((map__14289 == null))))?(((((map__14289.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14289.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14289):map__14289);
var items = cljs.core.get.call(null,map__14289__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__14289__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_js_array.call(null,items,cljs.compiler.comma_sep);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_record_value = (function cljs$compiler$emit_record_value(ns,name,items){
return cljs.compiler.emits.call(null,ns,".map__GT_",name,"(",items,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"quote","quote",-262615245),(function (p__14291){
var map__14292 = p__14291;
var map__14292__$1 = (((((!((map__14292 == null))))?(((((map__14292.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14292.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14292):map__14292);
var expr = cljs.core.get.call(null,map__14292__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
return cljs.compiler.emit.call(null,expr);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"const","const",1709929842),(function (p__14294){
var map__14295 = p__14294;
var map__14295__$1 = (((((!((map__14295 == null))))?(((((map__14295.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14295.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14295):map__14295);
var form = cljs.core.get.call(null,map__14295__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__14295__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(expr){
var map__14297 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__14297__$1 = (((((!((map__14297 == null))))?(((((map__14297.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14297.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14297):map__14297);
var op = cljs.core.get.call(null,map__14297__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__14297__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__14297__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4047__auto__ = (function (){var and__4036__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842));
if(and__4036__auto__){
var and__4036__auto____$1 = form;
if(cljs.core.truth_(and__4036__auto____$1)){
return (!(((((typeof form === 'string') && (cljs.core._EQ_.call(null,form,"")))) || (((typeof form === 'number') && ((form === (0))))))));
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
})();
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
var and__4036__auto__ = (!((const_expr == null)));
if(and__4036__auto__){
return cljs.compiler.truthy_constant_QMARK_.call(null,const_expr);
} else {
return and__4036__auto__;
}
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(expr){
var map__14299 = cljs.analyzer.unwrap_quote.call(null,expr);
var map__14299__$1 = (((((!((map__14299 == null))))?(((((map__14299.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14299.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14299):map__14299);
var op = cljs.core.get.call(null,map__14299__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__14299__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var const_expr = cljs.core.get.call(null,map__14299__$1,new cljs.core.Keyword(null,"const-expr","const-expr",-1379382292));
var or__4047__auto__ = ((cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"const","const",1709929842))) && (((form === false) || ((form == null)))));
if(or__4047__auto__){
return or__4047__auto__;
} else {
var and__4036__auto__ = (!((const_expr == null)));
if(and__4036__auto__){
return cljs.compiler.falsey_constant_QMARK_.call(null,const_expr);
} else {
return and__4036__auto__;
}
}
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__4047__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__14301){
var map__14302 = p__14301;
var map__14302__$1 = (((((!((map__14302 == null))))?(((((map__14302.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14302.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14302):map__14302);
var test = cljs.core.get.call(null,map__14302__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__14302__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__14302__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__14302__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__14302__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__4047__auto__ = unchecked;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case","case",1143702196),(function (p__14304){
var map__14305 = p__14304;
var map__14305__$1 = (((((!((map__14305 == null))))?(((((map__14305.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14305.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14305):map__14305);
var v = cljs.core.get.call(null,map__14305__$1,new cljs.core.Keyword(null,"test","test",577538877));
var nodes = cljs.core.get.call(null,map__14305__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var default$ = cljs.core.get.call(null,map__14305__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__14305__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__14307_14327 = cljs.core.seq.call(null,nodes);
var chunk__14308_14328 = null;
var count__14309_14329 = (0);
var i__14310_14330 = (0);
while(true){
if((i__14310_14330 < count__14309_14329)){
var map__14311_14331 = cljs.core._nth.call(null,chunk__14308_14328,i__14310_14330);
var map__14311_14332__$1 = (((((!((map__14311_14331 == null))))?(((((map__14311_14331.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14311_14331.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14311_14331):map__14311_14331);
var ts_14333 = cljs.core.get.call(null,map__14311_14332__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__14312_14334 = cljs.core.get.call(null,map__14311_14332__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__14312_14335__$1 = (((((!((map__14312_14334 == null))))?(((((map__14312_14334.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14312_14334.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14312_14334):map__14312_14334);
var then_14336 = cljs.core.get.call(null,map__14312_14335__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__14315_14337 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_14333));
var chunk__14316_14338 = null;
var count__14317_14339 = (0);
var i__14318_14340 = (0);
while(true){
if((i__14318_14340 < count__14317_14339)){
var test_14341 = cljs.core._nth.call(null,chunk__14316_14338,i__14318_14340);
cljs.compiler.emitln.call(null,"case ",test_14341,":");


var G__14342 = seq__14315_14337;
var G__14343 = chunk__14316_14338;
var G__14344 = count__14317_14339;
var G__14345 = (i__14318_14340 + (1));
seq__14315_14337 = G__14342;
chunk__14316_14338 = G__14343;
count__14317_14339 = G__14344;
i__14318_14340 = G__14345;
continue;
} else {
var temp__5735__auto___14346 = cljs.core.seq.call(null,seq__14315_14337);
if(temp__5735__auto___14346){
var seq__14315_14347__$1 = temp__5735__auto___14346;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14315_14347__$1)){
var c__4461__auto___14348 = cljs.core.chunk_first.call(null,seq__14315_14347__$1);
var G__14349 = cljs.core.chunk_rest.call(null,seq__14315_14347__$1);
var G__14350 = c__4461__auto___14348;
var G__14351 = cljs.core.count.call(null,c__4461__auto___14348);
var G__14352 = (0);
seq__14315_14337 = G__14349;
chunk__14316_14338 = G__14350;
count__14317_14339 = G__14351;
i__14318_14340 = G__14352;
continue;
} else {
var test_14353 = cljs.core.first.call(null,seq__14315_14347__$1);
cljs.compiler.emitln.call(null,"case ",test_14353,":");


var G__14354 = cljs.core.next.call(null,seq__14315_14347__$1);
var G__14355 = null;
var G__14356 = (0);
var G__14357 = (0);
seq__14315_14337 = G__14354;
chunk__14316_14338 = G__14355;
count__14317_14339 = G__14356;
i__14318_14340 = G__14357;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_14336);
} else {
cljs.compiler.emitln.call(null,then_14336);
}

cljs.compiler.emitln.call(null,"break;");


var G__14358 = seq__14307_14327;
var G__14359 = chunk__14308_14328;
var G__14360 = count__14309_14329;
var G__14361 = (i__14310_14330 + (1));
seq__14307_14327 = G__14358;
chunk__14308_14328 = G__14359;
count__14309_14329 = G__14360;
i__14310_14330 = G__14361;
continue;
} else {
var temp__5735__auto___14362 = cljs.core.seq.call(null,seq__14307_14327);
if(temp__5735__auto___14362){
var seq__14307_14363__$1 = temp__5735__auto___14362;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14307_14363__$1)){
var c__4461__auto___14364 = cljs.core.chunk_first.call(null,seq__14307_14363__$1);
var G__14365 = cljs.core.chunk_rest.call(null,seq__14307_14363__$1);
var G__14366 = c__4461__auto___14364;
var G__14367 = cljs.core.count.call(null,c__4461__auto___14364);
var G__14368 = (0);
seq__14307_14327 = G__14365;
chunk__14308_14328 = G__14366;
count__14309_14329 = G__14367;
i__14310_14330 = G__14368;
continue;
} else {
var map__14319_14369 = cljs.core.first.call(null,seq__14307_14363__$1);
var map__14319_14370__$1 = (((((!((map__14319_14369 == null))))?(((((map__14319_14369.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14319_14369.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14319_14369):map__14319_14369);
var ts_14371 = cljs.core.get.call(null,map__14319_14370__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var map__14320_14372 = cljs.core.get.call(null,map__14319_14370__$1,new cljs.core.Keyword(null,"then","then",460598070));
var map__14320_14373__$1 = (((((!((map__14320_14372 == null))))?(((((map__14320_14372.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14320_14372.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14320_14372):map__14320_14372);
var then_14374 = cljs.core.get.call(null,map__14320_14373__$1,new cljs.core.Keyword(null,"then","then",460598070));
var seq__14323_14375 = cljs.core.seq.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"test","test",577538877),ts_14371));
var chunk__14324_14376 = null;
var count__14325_14377 = (0);
var i__14326_14378 = (0);
while(true){
if((i__14326_14378 < count__14325_14377)){
var test_14379 = cljs.core._nth.call(null,chunk__14324_14376,i__14326_14378);
cljs.compiler.emitln.call(null,"case ",test_14379,":");


var G__14380 = seq__14323_14375;
var G__14381 = chunk__14324_14376;
var G__14382 = count__14325_14377;
var G__14383 = (i__14326_14378 + (1));
seq__14323_14375 = G__14380;
chunk__14324_14376 = G__14381;
count__14325_14377 = G__14382;
i__14326_14378 = G__14383;
continue;
} else {
var temp__5735__auto___14384__$1 = cljs.core.seq.call(null,seq__14323_14375);
if(temp__5735__auto___14384__$1){
var seq__14323_14385__$1 = temp__5735__auto___14384__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14323_14385__$1)){
var c__4461__auto___14386 = cljs.core.chunk_first.call(null,seq__14323_14385__$1);
var G__14387 = cljs.core.chunk_rest.call(null,seq__14323_14385__$1);
var G__14388 = c__4461__auto___14386;
var G__14389 = cljs.core.count.call(null,c__4461__auto___14386);
var G__14390 = (0);
seq__14323_14375 = G__14387;
chunk__14324_14376 = G__14388;
count__14325_14377 = G__14389;
i__14326_14378 = G__14390;
continue;
} else {
var test_14391 = cljs.core.first.call(null,seq__14323_14385__$1);
cljs.compiler.emitln.call(null,"case ",test_14391,":");


var G__14392 = cljs.core.next.call(null,seq__14323_14385__$1);
var G__14393 = null;
var G__14394 = (0);
var G__14395 = (0);
seq__14323_14375 = G__14392;
chunk__14324_14376 = G__14393;
count__14325_14377 = G__14394;
i__14326_14378 = G__14395;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_14374);
} else {
cljs.compiler.emitln.call(null,then_14374);
}

cljs.compiler.emitln.call(null,"break;");


var G__14396 = cljs.core.next.call(null,seq__14307_14363__$1);
var G__14397 = null;
var G__14398 = (0);
var G__14399 = (0);
seq__14307_14327 = G__14396;
chunk__14308_14328 = G__14397;
count__14309_14329 = G__14398;
i__14310_14330 = G__14399;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__14400){
var map__14401 = p__14400;
var map__14401__$1 = (((((!((map__14401 == null))))?(((((map__14401.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14401.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14401):map__14401);
var throw$ = cljs.core.get.call(null,map__14401__$1,new cljs.core.Keyword(null,"exception","exception",-335277064));
var env = cljs.core.get.call(null,map__14401__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return ["!",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__14404 = (((!(((-1) === idx))))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__14404,(0),null);
var rstr = cljs.core.nth.call(null,vec__14404,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs.compiler.resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__14404,fstr,rstr,ret_t,axstr){
return (function (p1__14403_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__14403_SHARP_);
});})(idx,vec__14404,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__14407 = ["function(",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,",",args_ts)),")"].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__14407),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ret_t)].join('');
} else {
return G__14407;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),"="].join('');
} else {
return cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t)))));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return ["{",cljs.core.str.cljs$core$IFn$_invoke$arity$1(clojure.string.join.call(null,"|",cljs.core.map.call(null,((function (ts__$1,xs){
return (function (p1__14408_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__14408_SHARP_);
});})(ts__$1,xs))
,xs))),"}"].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__14409 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__14410 = cljs.core.seq.call(null,vec__14409);
var first__14411 = cljs.core.first.call(null,seq__14410);
var seq__14410__$1 = cljs.core.next.call(null,seq__14410);
var p = first__14411;
var first__14411__$1 = cljs.core.first.call(null,seq__14410__$1);
var seq__14410__$2 = cljs.core.next.call(null,seq__14410__$1);
var ts = first__14411__$1;
var first__14411__$2 = cljs.core.first.call(null,seq__14410__$2);
var seq__14410__$3 = cljs.core.next.call(null,seq__14410__$2);
var n = first__14411__$2;
var xs = seq__14410__$3;
if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__4036__auto__){
var and__4036__auto____$1 = ts;
if(cljs.core.truth_(and__4036__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__14412 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var seq__14413 = cljs.core.seq.call(null,vec__14412);
var first__14414 = cljs.core.first.call(null,seq__14413);
var seq__14413__$1 = cljs.core.next.call(null,seq__14413);
var p = first__14414;
var first__14414__$1 = cljs.core.first.call(null,seq__14413__$1);
var seq__14413__$2 = cljs.core.next.call(null,seq__14413__$1);
var ts = first__14414__$1;
var xs = seq__14413__$2;
if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__4036__auto__){
var and__4036__auto____$1 = ts;
if(cljs.core.truth_(and__4036__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warning","warning",-1685650671),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var G__14417 = arguments.length;
switch (G__14417) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__14425 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__14415_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__14415_SHARP_);
} else {
return p1__14415_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var seq__14426 = cljs.core.seq.call(null,vec__14425);
var first__14427 = cljs.core.first.call(null,seq__14426);
var seq__14426__$1 = cljs.core.next.call(null,seq__14426);
var x = first__14427;
var ys = seq__14426__$1;
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__14428 = cljs.core.seq.call(null,ys);
var chunk__14429 = null;
var count__14430 = (0);
var i__14431 = (0);
while(true){
if((i__14431 < count__14430)){
var next_line = cljs.core._nth.call(null,chunk__14429,i__14431);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__14437 = seq__14428;
var G__14438 = chunk__14429;
var G__14439 = count__14430;
var G__14440 = (i__14431 + (1));
seq__14428 = G__14437;
chunk__14429 = G__14438;
count__14430 = G__14439;
i__14431 = G__14440;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__14428);
if(temp__5735__auto__){
var seq__14428__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14428__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__14428__$1);
var G__14441 = cljs.core.chunk_rest.call(null,seq__14428__$1);
var G__14442 = c__4461__auto__;
var G__14443 = cljs.core.count.call(null,c__4461__auto__);
var G__14444 = (0);
seq__14428 = G__14441;
chunk__14429 = G__14442;
count__14430 = G__14443;
i__14431 = G__14444;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__14428__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));


var G__14445 = cljs.core.next.call(null,seq__14428__$1);
var G__14446 = null;
var G__14447 = (0);
var G__14448 = (0);
seq__14428 = G__14445;
chunk__14429 = G__14446;
count__14430 = G__14447;
i__14431 = G__14448;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__14432_14449 = cljs.core.seq.call(null,docs__$2);
var chunk__14433_14450 = null;
var count__14434_14451 = (0);
var i__14435_14452 = (0);
while(true){
if((i__14435_14452 < count__14434_14451)){
var e_14453 = cljs.core._nth.call(null,chunk__14433_14450,i__14435_14452);
if(cljs.core.truth_(e_14453)){
print_comment_lines.call(null,e_14453);
} else {
}


var G__14454 = seq__14432_14449;
var G__14455 = chunk__14433_14450;
var G__14456 = count__14434_14451;
var G__14457 = (i__14435_14452 + (1));
seq__14432_14449 = G__14454;
chunk__14433_14450 = G__14455;
count__14434_14451 = G__14456;
i__14435_14452 = G__14457;
continue;
} else {
var temp__5735__auto___14458 = cljs.core.seq.call(null,seq__14432_14449);
if(temp__5735__auto___14458){
var seq__14432_14459__$1 = temp__5735__auto___14458;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14432_14459__$1)){
var c__4461__auto___14460 = cljs.core.chunk_first.call(null,seq__14432_14459__$1);
var G__14461 = cljs.core.chunk_rest.call(null,seq__14432_14459__$1);
var G__14462 = c__4461__auto___14460;
var G__14463 = cljs.core.count.call(null,c__4461__auto___14460);
var G__14464 = (0);
seq__14432_14449 = G__14461;
chunk__14433_14450 = G__14462;
count__14434_14451 = G__14463;
i__14435_14452 = G__14464;
continue;
} else {
var e_14465 = cljs.core.first.call(null,seq__14432_14459__$1);
if(cljs.core.truth_(e_14465)){
print_comment_lines.call(null,e_14465);
} else {
}


var G__14466 = cljs.core.next.call(null,seq__14432_14459__$1);
var G__14467 = null;
var G__14468 = (0);
var G__14469 = (0);
seq__14432_14449 = G__14466;
chunk__14433_14450 = G__14467;
count__14434_14451 = G__14468;
i__14435_14452 = G__14469;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;

cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return ((typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number'));
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__4036__auto__ = cljs.core.some.call(null,((function (opts){
return (function (p1__14471_SHARP_){
return goog.string.startsWith(p1__14471_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__4036__auto__)){
var and__4036__auto____$1 = opts;
if(cljs.core.truth_(and__4036__auto____$1)){
var and__4036__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__4036__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname)], null));
if(cljs.compiler.valid_define_value_QMARK_.call(null,define)){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__4036__auto____$2;
}
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__14472){
var map__14473 = p__14472;
var map__14473__$1 = (((((!((map__14473 == null))))?(((((map__14473.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14473.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14473):map__14473);
var doc = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var test = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"test","test",577538877));
var init = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var name = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var export$ = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"export","export",214356590));
var var$ = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var var_ast = cljs.core.get.call(null,map__14473__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__4047__auto__ = init;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__5733__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__5733__auto__)){
var define = temp__5733__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"the-var","the-var",1428415613),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(and__4036__auto__){
return test;
} else {
return and__4036__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__14475){
var map__14476 = p__14475;
var map__14476__$1 = (((((!((map__14476 == null))))?(((((map__14476.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14476.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14476):map__14476);
var name = cljs.core.get.call(null,map__14476__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__14476__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__14476__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,name)),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__14478_14496 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__14479_14497 = null;
var count__14480_14498 = (0);
var i__14481_14499 = (0);
while(true){
if((i__14481_14499 < count__14480_14498)){
var vec__14482_14500 = cljs.core._nth.call(null,chunk__14479_14497,i__14481_14499);
var i_14501 = cljs.core.nth.call(null,vec__14482_14500,(0),null);
var param_14502 = cljs.core.nth.call(null,vec__14482_14500,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_14502);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__14503 = seq__14478_14496;
var G__14504 = chunk__14479_14497;
var G__14505 = count__14480_14498;
var G__14506 = (i__14481_14499 + (1));
seq__14478_14496 = G__14503;
chunk__14479_14497 = G__14504;
count__14480_14498 = G__14505;
i__14481_14499 = G__14506;
continue;
} else {
var temp__5735__auto___14507 = cljs.core.seq.call(null,seq__14478_14496);
if(temp__5735__auto___14507){
var seq__14478_14508__$1 = temp__5735__auto___14507;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14478_14508__$1)){
var c__4461__auto___14509 = cljs.core.chunk_first.call(null,seq__14478_14508__$1);
var G__14510 = cljs.core.chunk_rest.call(null,seq__14478_14508__$1);
var G__14511 = c__4461__auto___14509;
var G__14512 = cljs.core.count.call(null,c__4461__auto___14509);
var G__14513 = (0);
seq__14478_14496 = G__14510;
chunk__14479_14497 = G__14511;
count__14480_14498 = G__14512;
i__14481_14499 = G__14513;
continue;
} else {
var vec__14485_14514 = cljs.core.first.call(null,seq__14478_14508__$1);
var i_14515 = cljs.core.nth.call(null,vec__14485_14514,(0),null);
var param_14516 = cljs.core.nth.call(null,vec__14485_14514,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_14516);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");


var G__14517 = cljs.core.next.call(null,seq__14478_14508__$1);
var G__14518 = null;
var G__14519 = (0);
var G__14520 = (0);
seq__14478_14496 = G__14517;
chunk__14479_14497 = G__14518;
count__14480_14498 = G__14519;
i__14481_14499 = G__14520;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__14488_14521 = cljs.core.seq.call(null,params);
var chunk__14489_14522 = null;
var count__14490_14523 = (0);
var i__14491_14524 = (0);
while(true){
if((i__14491_14524 < count__14490_14523)){
var param_14525 = cljs.core._nth.call(null,chunk__14489_14522,i__14491_14524);
cljs.compiler.emit.call(null,param_14525);

if(cljs.core._EQ_.call(null,param_14525,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14526 = seq__14488_14521;
var G__14527 = chunk__14489_14522;
var G__14528 = count__14490_14523;
var G__14529 = (i__14491_14524 + (1));
seq__14488_14521 = G__14526;
chunk__14489_14522 = G__14527;
count__14490_14523 = G__14528;
i__14491_14524 = G__14529;
continue;
} else {
var temp__5735__auto___14530 = cljs.core.seq.call(null,seq__14488_14521);
if(temp__5735__auto___14530){
var seq__14488_14531__$1 = temp__5735__auto___14530;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14488_14531__$1)){
var c__4461__auto___14532 = cljs.core.chunk_first.call(null,seq__14488_14531__$1);
var G__14533 = cljs.core.chunk_rest.call(null,seq__14488_14531__$1);
var G__14534 = c__4461__auto___14532;
var G__14535 = cljs.core.count.call(null,c__4461__auto___14532);
var G__14536 = (0);
seq__14488_14521 = G__14533;
chunk__14489_14522 = G__14534;
count__14490_14523 = G__14535;
i__14491_14524 = G__14536;
continue;
} else {
var param_14537 = cljs.core.first.call(null,seq__14488_14531__$1);
cljs.compiler.emit.call(null,param_14537);

if(cljs.core._EQ_.call(null,param_14537,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14538 = cljs.core.next.call(null,seq__14488_14531__$1);
var G__14539 = null;
var G__14540 = (0);
var G__14541 = (0);
seq__14488_14521 = G__14538;
chunk__14489_14522 = G__14539;
count__14490_14523 = G__14540;
i__14491_14524 = G__14541;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__14492_14542 = cljs.core.seq.call(null,params);
var chunk__14493_14543 = null;
var count__14494_14544 = (0);
var i__14495_14545 = (0);
while(true){
if((i__14495_14545 < count__14494_14544)){
var param_14546 = cljs.core._nth.call(null,chunk__14493_14543,i__14495_14545);
cljs.compiler.emit.call(null,param_14546);

if(cljs.core._EQ_.call(null,param_14546,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14547 = seq__14492_14542;
var G__14548 = chunk__14493_14543;
var G__14549 = count__14494_14544;
var G__14550 = (i__14495_14545 + (1));
seq__14492_14542 = G__14547;
chunk__14493_14543 = G__14548;
count__14494_14544 = G__14549;
i__14495_14545 = G__14550;
continue;
} else {
var temp__5735__auto___14551 = cljs.core.seq.call(null,seq__14492_14542);
if(temp__5735__auto___14551){
var seq__14492_14552__$1 = temp__5735__auto___14551;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14492_14552__$1)){
var c__4461__auto___14553 = cljs.core.chunk_first.call(null,seq__14492_14552__$1);
var G__14554 = cljs.core.chunk_rest.call(null,seq__14492_14552__$1);
var G__14555 = c__4461__auto___14553;
var G__14556 = cljs.core.count.call(null,c__4461__auto___14553);
var G__14557 = (0);
seq__14492_14542 = G__14554;
chunk__14493_14543 = G__14555;
count__14494_14544 = G__14556;
i__14495_14545 = G__14557;
continue;
} else {
var param_14558 = cljs.core.first.call(null,seq__14492_14552__$1);
cljs.compiler.emit.call(null,param_14558);

if(cljs.core._EQ_.call(null,param_14558,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14559 = cljs.core.next.call(null,seq__14492_14552__$1);
var G__14560 = null;
var G__14561 = (0);
var G__14562 = (0);
seq__14492_14542 = G__14559;
chunk__14493_14543 = G__14560;
count__14494_14544 = G__14561;
i__14495_14545 = G__14562;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__14563 = cljs.core.seq.call(null,params);
var chunk__14564 = null;
var count__14565 = (0);
var i__14566 = (0);
while(true){
if((i__14566 < count__14565)){
var param = cljs.core._nth.call(null,chunk__14564,i__14566);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14567 = seq__14563;
var G__14568 = chunk__14564;
var G__14569 = count__14565;
var G__14570 = (i__14566 + (1));
seq__14563 = G__14567;
chunk__14564 = G__14568;
count__14565 = G__14569;
i__14566 = G__14570;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__14563);
if(temp__5735__auto__){
var seq__14563__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14563__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__14563__$1);
var G__14571 = cljs.core.chunk_rest.call(null,seq__14563__$1);
var G__14572 = c__4461__auto__;
var G__14573 = cljs.core.count.call(null,c__4461__auto__);
var G__14574 = (0);
seq__14563 = G__14571;
chunk__14564 = G__14572;
count__14565 = G__14573;
i__14566 = G__14574;
continue;
} else {
var param = cljs.core.first.call(null,seq__14563__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14575 = cljs.core.next.call(null,seq__14563__$1);
var G__14576 = null;
var G__14577 = (0);
var G__14578 = (0);
seq__14563 = G__14575;
chunk__14564 = G__14576;
count__14565 = G__14577;
i__14566 = G__14578;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__14579){
var map__14580 = p__14579;
var map__14580__$1 = (((((!((map__14580 == null))))?(((((map__14580.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14580.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14580):map__14580);
var expr = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var type = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__14580__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if((((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice)))){
} else {
throw (new Error("Assert failed: (and (>= startslice 0) (integer? startslice))"));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__i"].join('');
var a = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname),"__a"].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__14582){
var map__14583 = p__14582;
var map__14583__$1 = (((((!((map__14583 == null))))?(((((map__14583.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14583.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14583):map__14583);
var f = map__14583__$1;
var expr = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var max_fixed_arity = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"fixed-arity","fixed-arity",1586445869));
var variadic = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var type = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__14583__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_14593__$1 = (function (){var or__4047__auto__ = name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_14594 = cljs.compiler.munge.call(null,name_14593__$1);
var delegate_name_14595 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_14594),"__delegate"].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_14595," = function (");

var seq__14585_14596 = cljs.core.seq.call(null,params);
var chunk__14586_14597 = null;
var count__14587_14598 = (0);
var i__14588_14599 = (0);
while(true){
if((i__14588_14599 < count__14587_14598)){
var param_14600 = cljs.core._nth.call(null,chunk__14586_14597,i__14588_14599);
cljs.compiler.emit.call(null,param_14600);

if(cljs.core._EQ_.call(null,param_14600,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14601 = seq__14585_14596;
var G__14602 = chunk__14586_14597;
var G__14603 = count__14587_14598;
var G__14604 = (i__14588_14599 + (1));
seq__14585_14596 = G__14601;
chunk__14586_14597 = G__14602;
count__14587_14598 = G__14603;
i__14588_14599 = G__14604;
continue;
} else {
var temp__5735__auto___14605 = cljs.core.seq.call(null,seq__14585_14596);
if(temp__5735__auto___14605){
var seq__14585_14606__$1 = temp__5735__auto___14605;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14585_14606__$1)){
var c__4461__auto___14607 = cljs.core.chunk_first.call(null,seq__14585_14606__$1);
var G__14608 = cljs.core.chunk_rest.call(null,seq__14585_14606__$1);
var G__14609 = c__4461__auto___14607;
var G__14610 = cljs.core.count.call(null,c__4461__auto___14607);
var G__14611 = (0);
seq__14585_14596 = G__14608;
chunk__14586_14597 = G__14609;
count__14587_14598 = G__14610;
i__14588_14599 = G__14611;
continue;
} else {
var param_14612 = cljs.core.first.call(null,seq__14585_14606__$1);
cljs.compiler.emit.call(null,param_14612);

if(cljs.core._EQ_.call(null,param_14612,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14613 = cljs.core.next.call(null,seq__14585_14606__$1);
var G__14614 = null;
var G__14615 = (0);
var G__14616 = (0);
seq__14585_14596 = G__14613;
chunk__14586_14597 = G__14614;
count__14587_14598 = G__14615;
i__14588_14599 = G__14616;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_14594," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_14617 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_14617,",0,null);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_14595,".call(this,");

var seq__14589_14618 = cljs.core.seq.call(null,params);
var chunk__14590_14619 = null;
var count__14591_14620 = (0);
var i__14592_14621 = (0);
while(true){
if((i__14592_14621 < count__14591_14620)){
var param_14622 = cljs.core._nth.call(null,chunk__14590_14619,i__14592_14621);
cljs.compiler.emit.call(null,param_14622);

if(cljs.core._EQ_.call(null,param_14622,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14623 = seq__14589_14618;
var G__14624 = chunk__14590_14619;
var G__14625 = count__14591_14620;
var G__14626 = (i__14592_14621 + (1));
seq__14589_14618 = G__14623;
chunk__14590_14619 = G__14624;
count__14591_14620 = G__14625;
i__14592_14621 = G__14626;
continue;
} else {
var temp__5735__auto___14627 = cljs.core.seq.call(null,seq__14589_14618);
if(temp__5735__auto___14627){
var seq__14589_14628__$1 = temp__5735__auto___14627;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14589_14628__$1)){
var c__4461__auto___14629 = cljs.core.chunk_first.call(null,seq__14589_14628__$1);
var G__14630 = cljs.core.chunk_rest.call(null,seq__14589_14628__$1);
var G__14631 = c__4461__auto___14629;
var G__14632 = cljs.core.count.call(null,c__4461__auto___14629);
var G__14633 = (0);
seq__14589_14618 = G__14630;
chunk__14590_14619 = G__14631;
count__14591_14620 = G__14632;
i__14592_14621 = G__14633;
continue;
} else {
var param_14634 = cljs.core.first.call(null,seq__14589_14628__$1);
cljs.compiler.emit.call(null,param_14634);

if(cljs.core._EQ_.call(null,param_14634,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}


var G__14635 = cljs.core.next.call(null,seq__14589_14628__$1);
var G__14636 = null;
var G__14637 = (0);
var G__14638 = (0);
seq__14589_14618 = G__14635;
chunk__14590_14619 = G__14636;
count__14591_14620 = G__14637;
i__14592_14621 = G__14638;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_14594,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_14594,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_14593__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_14594,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_14595,";");

cljs.compiler.emitln.call(null,"return ",mname_14594,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__14642){
var map__14643 = p__14642;
var map__14643__$1 = (((((!((map__14643 == null))))?(((((map__14643.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14643.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14643):map__14643);
var variadic = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"variadic?","variadic?",584179762));
var name = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var recur_frames = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__14643__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__14639_SHARP_){
var and__4036__auto__ = p1__14639_SHARP_;
if(cljs.core.truth_(and__4036__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__14639_SHARP_));
} else {
return and__4036__auto__;
}
});})(map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,recur_frames)),cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_14678__$1 = (function (){var or__4047__auto__ = name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_14679 = cljs.compiler.munge.call(null,name_14678__$1);
var maxparams_14680 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_14681 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_14678__$1,mname_14679,maxparams_14680,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(mname_14679),"__",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_14678__$1,mname_14679,maxparams_14680,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,methods$));
var ms_14682 = cljs.core.sort_by.call(null,((function (name_14678__$1,mname_14679,maxparams_14680,mmap_14681,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__14640_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__14640_SHARP_)));
});})(name_14678__$1,mname_14679,maxparams_14680,mmap_14681,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_14681));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_14679," = null;");

var seq__14645_14683 = cljs.core.seq.call(null,ms_14682);
var chunk__14646_14684 = null;
var count__14647_14685 = (0);
var i__14648_14686 = (0);
while(true){
if((i__14648_14686 < count__14647_14685)){
var vec__14649_14687 = cljs.core._nth.call(null,chunk__14646_14684,i__14648_14686);
var n_14688 = cljs.core.nth.call(null,vec__14649_14687,(0),null);
var meth_14689 = cljs.core.nth.call(null,vec__14649_14687,(1),null);
cljs.compiler.emits.call(null,"var ",n_14688," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14689))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_14689);
} else {
cljs.compiler.emit_fn_method.call(null,meth_14689);
}

cljs.compiler.emitln.call(null,";");


var G__14690 = seq__14645_14683;
var G__14691 = chunk__14646_14684;
var G__14692 = count__14647_14685;
var G__14693 = (i__14648_14686 + (1));
seq__14645_14683 = G__14690;
chunk__14646_14684 = G__14691;
count__14647_14685 = G__14692;
i__14648_14686 = G__14693;
continue;
} else {
var temp__5735__auto___14694 = cljs.core.seq.call(null,seq__14645_14683);
if(temp__5735__auto___14694){
var seq__14645_14695__$1 = temp__5735__auto___14694;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14645_14695__$1)){
var c__4461__auto___14696 = cljs.core.chunk_first.call(null,seq__14645_14695__$1);
var G__14697 = cljs.core.chunk_rest.call(null,seq__14645_14695__$1);
var G__14698 = c__4461__auto___14696;
var G__14699 = cljs.core.count.call(null,c__4461__auto___14696);
var G__14700 = (0);
seq__14645_14683 = G__14697;
chunk__14646_14684 = G__14698;
count__14647_14685 = G__14699;
i__14648_14686 = G__14700;
continue;
} else {
var vec__14652_14701 = cljs.core.first.call(null,seq__14645_14695__$1);
var n_14702 = cljs.core.nth.call(null,vec__14652_14701,(0),null);
var meth_14703 = cljs.core.nth.call(null,vec__14652_14701,(1),null);
cljs.compiler.emits.call(null,"var ",n_14702," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14703))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_14703);
} else {
cljs.compiler.emit_fn_method.call(null,meth_14703);
}

cljs.compiler.emitln.call(null,";");


var G__14704 = cljs.core.next.call(null,seq__14645_14695__$1);
var G__14705 = null;
var G__14706 = (0);
var G__14707 = (0);
seq__14645_14683 = G__14704;
chunk__14646_14684 = G__14705;
count__14647_14685 = G__14706;
i__14648_14686 = G__14707;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_14679," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_14680),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_14680)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_14680));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__14655_14708 = cljs.core.seq.call(null,ms_14682);
var chunk__14656_14709 = null;
var count__14657_14710 = (0);
var i__14658_14711 = (0);
while(true){
if((i__14658_14711 < count__14657_14710)){
var vec__14659_14712 = cljs.core._nth.call(null,chunk__14656_14709,i__14658_14711);
var n_14713 = cljs.core.nth.call(null,vec__14659_14712,(0),null);
var meth_14714 = cljs.core.nth.call(null,vec__14659_14712,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14714))){
cljs.compiler.emitln.call(null,"default:");

var restarg_14715 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_14715," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_14716 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_14715," = new cljs.core.IndexedSeq(",a_14716,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_14713,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_14680)),(((cljs.core.count.call(null,maxparams_14680) > (1)))?", ":null),restarg_14715,");");
} else {
var pcnt_14717 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14714));
cljs.compiler.emitln.call(null,"case ",pcnt_14717,":");

cljs.compiler.emitln.call(null,"return ",n_14713,".call(this",(((pcnt_14717 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_14717,maxparams_14680)),null,(1),null)),(2),null))),");");
}


var G__14718 = seq__14655_14708;
var G__14719 = chunk__14656_14709;
var G__14720 = count__14657_14710;
var G__14721 = (i__14658_14711 + (1));
seq__14655_14708 = G__14718;
chunk__14656_14709 = G__14719;
count__14657_14710 = G__14720;
i__14658_14711 = G__14721;
continue;
} else {
var temp__5735__auto___14722 = cljs.core.seq.call(null,seq__14655_14708);
if(temp__5735__auto___14722){
var seq__14655_14723__$1 = temp__5735__auto___14722;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14655_14723__$1)){
var c__4461__auto___14724 = cljs.core.chunk_first.call(null,seq__14655_14723__$1);
var G__14725 = cljs.core.chunk_rest.call(null,seq__14655_14723__$1);
var G__14726 = c__4461__auto___14724;
var G__14727 = cljs.core.count.call(null,c__4461__auto___14724);
var G__14728 = (0);
seq__14655_14708 = G__14725;
chunk__14656_14709 = G__14726;
count__14657_14710 = G__14727;
i__14658_14711 = G__14728;
continue;
} else {
var vec__14662_14729 = cljs.core.first.call(null,seq__14655_14723__$1);
var n_14730 = cljs.core.nth.call(null,vec__14662_14729,(0),null);
var meth_14731 = cljs.core.nth.call(null,vec__14662_14729,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14731))){
cljs.compiler.emitln.call(null,"default:");

var restarg_14732 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_14732," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_14733 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_14732," = new cljs.core.IndexedSeq(",a_14733,",0,null);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_14730,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_14680)),(((cljs.core.count.call(null,maxparams_14680) > (1)))?", ":null),restarg_14732,");");
} else {
var pcnt_14734 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14731));
cljs.compiler.emitln.call(null,"case ",pcnt_14734,":");

cljs.compiler.emitln.call(null,"return ",n_14730,".call(this",(((pcnt_14734 === (0)))?null:(new cljs.core.List(null,",",(new cljs.core.List(null,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_14734,maxparams_14680)),null,(1),null)),(2),null))),");");
}


var G__14735 = cljs.core.next.call(null,seq__14655_14723__$1);
var G__14736 = null;
var G__14737 = (0);
var G__14738 = (0);
seq__14655_14708 = G__14735;
chunk__14656_14709 = G__14736;
count__14657_14710 = G__14737;
i__14658_14711 = G__14738;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

var arg_count_js_14739 = ((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"self__","self__",-153190816,null),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.val.call(null,cljs.core.first.call(null,ms_14682)))))))?"(arguments.length - 1)":"arguments.length");
cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + ",arg_count_js_14739,"));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_14679,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_14679,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_14678__$1,mname_14679,maxparams_14680,mmap_14681,ms_14682,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets){
return (function (p1__14641_SHARP_){
var vec__14665 = p1__14641_SHARP_;
var n = cljs.core.nth.call(null,vec__14665,(0),null);
var m = cljs.core.nth.call(null,vec__14665,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_14678__$1,mname_14679,maxparams_14680,mmap_14681,ms_14682,loop_locals,map__14643,map__14643__$1,variadic,name,env,methods$,max_fixed_arity,recur_frames,loop_lets))
,ms_14682),".cljs$lang$applyTo;");
} else {
}

var seq__14668_14740 = cljs.core.seq.call(null,ms_14682);
var chunk__14669_14741 = null;
var count__14670_14742 = (0);
var i__14671_14743 = (0);
while(true){
if((i__14671_14743 < count__14670_14742)){
var vec__14672_14744 = cljs.core._nth.call(null,chunk__14669_14741,i__14671_14743);
var n_14745 = cljs.core.nth.call(null,vec__14672_14744,(0),null);
var meth_14746 = cljs.core.nth.call(null,vec__14672_14744,(1),null);
var c_14747 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14746));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14746))){
cljs.compiler.emitln.call(null,mname_14679,".cljs$core$IFn$_invoke$arity$variadic = ",n_14745,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_14679,".cljs$core$IFn$_invoke$arity$",c_14747," = ",n_14745,";");
}


var G__14748 = seq__14668_14740;
var G__14749 = chunk__14669_14741;
var G__14750 = count__14670_14742;
var G__14751 = (i__14671_14743 + (1));
seq__14668_14740 = G__14748;
chunk__14669_14741 = G__14749;
count__14670_14742 = G__14750;
i__14671_14743 = G__14751;
continue;
} else {
var temp__5735__auto___14752 = cljs.core.seq.call(null,seq__14668_14740);
if(temp__5735__auto___14752){
var seq__14668_14753__$1 = temp__5735__auto___14752;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14668_14753__$1)){
var c__4461__auto___14754 = cljs.core.chunk_first.call(null,seq__14668_14753__$1);
var G__14755 = cljs.core.chunk_rest.call(null,seq__14668_14753__$1);
var G__14756 = c__4461__auto___14754;
var G__14757 = cljs.core.count.call(null,c__4461__auto___14754);
var G__14758 = (0);
seq__14668_14740 = G__14755;
chunk__14669_14741 = G__14756;
count__14670_14742 = G__14757;
i__14671_14743 = G__14758;
continue;
} else {
var vec__14675_14759 = cljs.core.first.call(null,seq__14668_14753__$1);
var n_14760 = cljs.core.nth.call(null,vec__14675_14759,(0),null);
var meth_14761 = cljs.core.nth.call(null,vec__14675_14759,(1),null);
var c_14762 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_14761));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(meth_14761))){
cljs.compiler.emitln.call(null,mname_14679,".cljs$core$IFn$_invoke$arity$variadic = ",n_14760,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_14679,".cljs$core$IFn$_invoke$arity$",c_14762," = ",n_14760,";");
}


var G__14763 = cljs.core.next.call(null,seq__14668_14753__$1);
var G__14764 = null;
var G__14765 = (0);
var G__14766 = (0);
seq__14668_14740 = G__14763;
chunk__14669_14741 = G__14764;
count__14670_14742 = G__14765;
i__14671_14743 = G__14766;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_14679,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__14767){
var map__14768 = p__14767;
var map__14768__$1 = (((((!((map__14768 == null))))?(((((map__14768.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14768.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14768):map__14768);
var statements = cljs.core.get.call(null,map__14768__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__14768__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__14768__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__14770_14774 = cljs.core.seq.call(null,statements);
var chunk__14771_14775 = null;
var count__14772_14776 = (0);
var i__14773_14777 = (0);
while(true){
if((i__14773_14777 < count__14772_14776)){
var s_14778 = cljs.core._nth.call(null,chunk__14771_14775,i__14773_14777);
cljs.compiler.emitln.call(null,s_14778);


var G__14779 = seq__14770_14774;
var G__14780 = chunk__14771_14775;
var G__14781 = count__14772_14776;
var G__14782 = (i__14773_14777 + (1));
seq__14770_14774 = G__14779;
chunk__14771_14775 = G__14780;
count__14772_14776 = G__14781;
i__14773_14777 = G__14782;
continue;
} else {
var temp__5735__auto___14783 = cljs.core.seq.call(null,seq__14770_14774);
if(temp__5735__auto___14783){
var seq__14770_14784__$1 = temp__5735__auto___14783;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14770_14784__$1)){
var c__4461__auto___14785 = cljs.core.chunk_first.call(null,seq__14770_14784__$1);
var G__14786 = cljs.core.chunk_rest.call(null,seq__14770_14784__$1);
var G__14787 = c__4461__auto___14785;
var G__14788 = cljs.core.count.call(null,c__4461__auto___14785);
var G__14789 = (0);
seq__14770_14774 = G__14786;
chunk__14771_14775 = G__14787;
count__14772_14776 = G__14788;
i__14773_14777 = G__14789;
continue;
} else {
var s_14790 = cljs.core.first.call(null,seq__14770_14784__$1);
cljs.compiler.emitln.call(null,s_14790);


var G__14791 = cljs.core.next.call(null,seq__14770_14784__$1);
var G__14792 = null;
var G__14793 = (0);
var G__14794 = (0);
seq__14770_14774 = G__14791;
chunk__14771_14775 = G__14792;
count__14772_14776 = G__14793;
i__14773_14777 = G__14794;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(((cljs.core.seq.call(null,statements)) && (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)))){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__14795){
var map__14796 = p__14795;
var map__14796__$1 = (((((!((map__14796 == null))))?(((((map__14796.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14796.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14796):map__14796);
var try$ = cljs.core.get.call(null,map__14796__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var env = cljs.core.get.call(null,map__14796__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var catch$ = cljs.core.get.call(null,map__14796__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__14796__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__14796__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__4047__auto__ = name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"const","const",1709929842),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.unwrap_quote.call(null,finally$)))){
} else {
throw (new Error(["Assert failed: ","finally block cannot contain constant","\n","(not= :const (:op (ana/unwrap-quote finally)))"].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__14798,is_loop){
var map__14799 = p__14798;
var map__14799__$1 = (((((!((map__14799 == null))))?(((((map__14799.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14799.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14799):map__14799);
var expr = cljs.core.get.call(null,map__14799__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__14799__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__14799__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR__orig_val__14801_14811 = cljs.compiler._STAR_lexical_renames_STAR_;
var _STAR_lexical_renames_STAR__temp_val__14802_14812 = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR__orig_val__14801_14811,context,map__14799,map__14799__$1,expr,bindings,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(name),"-"].join(''))],null));
});})(_STAR_lexical_renames_STAR__orig_val__14801_14811,context,map__14799,map__14799__$1,expr,bindings,env))
,bindings):null));
cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__temp_val__14802_14812;

try{var seq__14803_14813 = cljs.core.seq.call(null,bindings);
var chunk__14804_14814 = null;
var count__14805_14815 = (0);
var i__14806_14816 = (0);
while(true){
if((i__14806_14816 < count__14805_14815)){
var map__14807_14817 = cljs.core._nth.call(null,chunk__14804_14814,i__14806_14816);
var map__14807_14818__$1 = (((((!((map__14807_14817 == null))))?(((((map__14807_14817.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14807_14817.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14807_14817):map__14807_14817);
var binding_14819 = map__14807_14818__$1;
var init_14820 = cljs.core.get.call(null,map__14807_14818__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_14819);

cljs.compiler.emitln.call(null," = ",init_14820,";");


var G__14821 = seq__14803_14813;
var G__14822 = chunk__14804_14814;
var G__14823 = count__14805_14815;
var G__14824 = (i__14806_14816 + (1));
seq__14803_14813 = G__14821;
chunk__14804_14814 = G__14822;
count__14805_14815 = G__14823;
i__14806_14816 = G__14824;
continue;
} else {
var temp__5735__auto___14825 = cljs.core.seq.call(null,seq__14803_14813);
if(temp__5735__auto___14825){
var seq__14803_14826__$1 = temp__5735__auto___14825;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14803_14826__$1)){
var c__4461__auto___14827 = cljs.core.chunk_first.call(null,seq__14803_14826__$1);
var G__14828 = cljs.core.chunk_rest.call(null,seq__14803_14826__$1);
var G__14829 = c__4461__auto___14827;
var G__14830 = cljs.core.count.call(null,c__4461__auto___14827);
var G__14831 = (0);
seq__14803_14813 = G__14828;
chunk__14804_14814 = G__14829;
count__14805_14815 = G__14830;
i__14806_14816 = G__14831;
continue;
} else {
var map__14809_14832 = cljs.core.first.call(null,seq__14803_14826__$1);
var map__14809_14833__$1 = (((((!((map__14809_14832 == null))))?(((((map__14809_14832.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14809_14832.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14809_14832):map__14809_14832);
var binding_14834 = map__14809_14833__$1;
var init_14835 = cljs.core.get.call(null,map__14809_14833__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_14834);

cljs.compiler.emitln.call(null," = ",init_14835,";");


var G__14836 = cljs.core.next.call(null,seq__14803_14826__$1);
var G__14837 = null;
var G__14838 = (0);
var G__14839 = (0);
seq__14803_14813 = G__14836;
chunk__14804_14814 = G__14837;
count__14805_14815 = G__14838;
i__14806_14816 = G__14839;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR__orig_val__14801_14811;
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__14840){
var map__14841 = p__14840;
var map__14841__$1 = (((((!((map__14841 == null))))?(((((map__14841.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14841.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14841):map__14841);
var frame = cljs.core.get.call(null,map__14841__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__14841__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__14841__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__4518__auto___14843 = cljs.core.count.call(null,exprs);
var i_14844 = (0);
while(true){
if((i_14844 < n__4518__auto___14843)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_14844)," = ",exprs.call(null,i_14844),";");

var G__14845 = (i_14844 + (1));
i_14844 = G__14845;
continue;
} else {
}
break;
}

var n__4518__auto___14846 = cljs.core.count.call(null,exprs);
var i_14847 = (0);
while(true){
if((i_14847 < n__4518__auto___14846)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_14847))," = ",temps.call(null,i_14847),";");

var G__14848 = (i_14847 + (1));
i_14847 = G__14848;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__14849){
var map__14850 = p__14849;
var map__14850__$1 = (((((!((map__14850 == null))))?(((((map__14850.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14850.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14850):map__14850);
var expr = cljs.core.get.call(null,map__14850__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var bindings = cljs.core.get.call(null,map__14850__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var env = cljs.core.get.call(null,map__14850__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__14852_14860 = cljs.core.seq.call(null,bindings);
var chunk__14853_14861 = null;
var count__14854_14862 = (0);
var i__14855_14863 = (0);
while(true){
if((i__14855_14863 < count__14854_14862)){
var map__14856_14864 = cljs.core._nth.call(null,chunk__14853_14861,i__14855_14863);
var map__14856_14865__$1 = (((((!((map__14856_14864 == null))))?(((((map__14856_14864.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14856_14864.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14856_14864):map__14856_14864);
var binding_14866 = map__14856_14865__$1;
var init_14867 = cljs.core.get.call(null,map__14856_14865__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_14866)," = ",init_14867,";");


var G__14868 = seq__14852_14860;
var G__14869 = chunk__14853_14861;
var G__14870 = count__14854_14862;
var G__14871 = (i__14855_14863 + (1));
seq__14852_14860 = G__14868;
chunk__14853_14861 = G__14869;
count__14854_14862 = G__14870;
i__14855_14863 = G__14871;
continue;
} else {
var temp__5735__auto___14872 = cljs.core.seq.call(null,seq__14852_14860);
if(temp__5735__auto___14872){
var seq__14852_14873__$1 = temp__5735__auto___14872;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14852_14873__$1)){
var c__4461__auto___14874 = cljs.core.chunk_first.call(null,seq__14852_14873__$1);
var G__14875 = cljs.core.chunk_rest.call(null,seq__14852_14873__$1);
var G__14876 = c__4461__auto___14874;
var G__14877 = cljs.core.count.call(null,c__4461__auto___14874);
var G__14878 = (0);
seq__14852_14860 = G__14875;
chunk__14853_14861 = G__14876;
count__14854_14862 = G__14877;
i__14855_14863 = G__14878;
continue;
} else {
var map__14858_14879 = cljs.core.first.call(null,seq__14852_14873__$1);
var map__14858_14880__$1 = (((((!((map__14858_14879 == null))))?(((((map__14858_14879.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14858_14879.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14858_14879):map__14858_14879);
var binding_14881 = map__14858_14880__$1;
var init_14882 = cljs.core.get.call(null,map__14858_14880__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_14881)," = ",init_14882,";");


var G__14883 = cljs.core.next.call(null,seq__14852_14873__$1);
var G__14884 = null;
var G__14885 = (0);
var G__14886 = (0);
seq__14852_14860 = G__14883;
chunk__14853_14861 = G__14884;
count__14854_14862 = G__14885;
i__14855_14863 = G__14886;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.str.cljs$core$IFn$_invoke$arity$1(psym).replace((new RegExp("\\.","g")),"$").replace("/","$")),"$"].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__14889){
var map__14890 = p__14889;
var map__14890__$1 = (((((!((map__14890 == null))))?(((((map__14890.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14890.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14890):map__14890);
var expr = map__14890__$1;
var f = cljs.core.get.call(null,map__14890__$1,new cljs.core.Keyword(null,"fn","fn",-1175266204));
var args = cljs.core.get.call(null,map__14890__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__14890__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__4036__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4036__auto__){
var and__4036__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__4036__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__4036__auto__ = protocol;
if(cljs.core.truth_(and__4036__auto__)){
var and__4036__auto____$1 = tag;
if(cljs.core.truth_(and__4036__auto____$1)){
var or__4047__auto__ = (function (){var and__4036__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4036__auto____$2){
var and__4036__auto____$3 = protocol;
if(cljs.core.truth_(and__4036__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__4036__auto____$3;
}
} else {
return and__4036__auto____$2;
}
})();
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
var and__4036__auto____$2 = (function (){var or__4047__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(or__4047__auto____$1){
return or__4047__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__4036__auto____$2)){
var or__4047__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__4047__auto____$1){
return or__4047__auto____$1;
} else {
var and__4036__auto____$3 = (!(cljs.core.set_QMARK_.call(null,tag)));
if(and__4036__auto____$3){
var and__4036__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"clj","clj",980036099,null),"null",new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),"null",new cljs.core.Symbol(null,"object","object",-1179821820,null),"null",new cljs.core.Symbol(null,"any","any",-948528346,null),"null",new cljs.core.Symbol(null,"js","js",-886355190,null),"null",new cljs.core.Symbol(null,"number","number",-1084057331,null),"null",new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),"null",new cljs.core.Symbol(null,"array","array",-440182315,null),"null",new cljs.core.Symbol(null,"string","string",-349010059,null),"null",new cljs.core.Symbol(null,"function","function",-486723946,null),"null",new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),"null"], null), null).call(null,tag));
if(and__4036__auto____$4){
var temp__5735__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,env,tag));
if(cljs.core.truth_(temp__5735__auto__)){
var ps = temp__5735__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__4036__auto____$4;
}
} else {
return and__4036__auto____$3;
}
}
} else {
return and__4036__auto____$2;
}
}
} else {
return and__4036__auto____$1;
}
} else {
return and__4036__auto__;
}
})();
var opt_not_QMARK_ = ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null))));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = ((cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null))));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__4047__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__4047__auto__){
return or__4047__auto__;
} else {
var or__4047__auto____$1 = (function (){var temp__5735__auto__ = cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns);
if(cljs.core.truth_(temp__5735__auto__)){
var ns_str = temp__5735__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
})();
if(cljs.core.truth_(or__4047__auto____$1)){
return or__4047__auto____$1;
} else {
return (!(cljs.core.contains_QMARK_.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)),ns)));
}
}
})():null);
var keyword_QMARK_ = (function (){var or__4047__auto__ = cljs.core._EQ_.call(null,new cljs.core.Symbol("cljs.core","Keyword","cljs.core/Keyword",-451434488,null),cljs.analyzer.infer_tag.call(null,env,f));
if(or__4047__auto__){
return or__4047__auto__;
} else {
var f__$1 = cljs.analyzer.unwrap_quote.call(null,f);
return ((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"const","const",1709929842))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f__$1) instanceof cljs.core.Keyword)));
}
})();
var vec__14892 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic?","variadic?",584179762).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if(((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1))))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__4036__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__4036__auto__)){
return (arity > mfa);
} else {
return and__4036__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$variadic"].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env){
return (function (p1__14887_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__14887_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.createAsIfByAssoc([arity]),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,info__$1)),".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env){
return (function (p1__14888_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__14888_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__14890,map__14890__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__14892,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__14892,(1),null);
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"(!(",cljs.core.first.call(null,args),"))");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_14895 = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),"$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_14895,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_14896 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_14896,args)),(((mfa_14896 === (0)))?null:","),"cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_14896,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__4047__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
var or__4047__auto____$1 = js_QMARK_;
if(or__4047__auto____$1){
return or__4047__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__4036__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(and__4036__auto__){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"var","var",-769682797),null,new cljs.core.Keyword(null,"js-var","js-var",-1177899142),null,new cljs.core.Keyword(null,"local","local",-1497766724),null], null), null).call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1));
} else {
return and__4036__auto__;
}
})())){
var fprop_14897 = [".cljs$core$IFn$_invoke$arity$",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.count.call(null,args))].join('');
if(cljs.analyzer._STAR_fn_invoke_direct_STAR_){
cljs.compiler.emits.call(null,"(",f__$1,fprop_14897," ? ",f__$1,fprop_14897,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,"(",cljs.compiler.comma_sep.call(null,args),"))");
} else {
cljs.compiler.emits.call(null,"(",f__$1,fprop_14897," ? ",f__$1,fprop_14897,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
}
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__14898){
var map__14899 = p__14898;
var map__14899__$1 = (((((!((map__14899 == null))))?(((((map__14899.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14899.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14899):map__14899);
var ctor = cljs.core.get.call(null,map__14899__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var args = cljs.core.get.call(null,map__14899__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__14899__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__14901){
var map__14902 = p__14901;
var map__14902__$1 = (((((!((map__14902 == null))))?(((((map__14902.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14902.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14902):map__14902);
var target = cljs.core.get.call(null,map__14902__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__14902__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__14902__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.emit_global_export = (function cljs$compiler$emit_global_export(ns_name,global_exports,lib){
return cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_global_export.call(null,lib)," = goog.global",cljs.core.apply.call(null,cljs.core.str,cljs.core.map.call(null,(function (prop){
return ["[\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(prop),"\"]"].join('');
}),clojure.string.split.call(null,cljs.core.name.call(null,(function (){var or__4047__auto__ = cljs.core.get.call(null,global_exports,cljs.core.symbol.call(null,lib));
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.get.call(null,global_exports,cljs.core.name.call(null,lib));
}
})()),/\./))),";");
});
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads,deps,ns_name){
var map__14904 = cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_);
var map__14904__$1 = (((((!((map__14904 == null))))?(((((map__14904.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14904.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14904):map__14904);
var options = cljs.core.get.call(null,map__14904__$1,new cljs.core.Keyword(null,"options","options",99638489));
var js_dependency_index = cljs.core.get.call(null,map__14904__$1,new cljs.core.Keyword(null,"js-dependency-index","js-dependency-index",-1887042131));
var map__14905 = options;
var map__14905__$1 = (((((!((map__14905 == null))))?(((((map__14905.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14905.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14905):map__14905);
var target = cljs.core.get.call(null,map__14905__$1,new cljs.core.Keyword(null,"target","target",253001721));
var optimizations = cljs.core.get.call(null,map__14905__$1,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854));
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
var vec__14906 = (function (){var libs__$1 = cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.filter.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,libs)),deps));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"nodejs","nodejs",321212524),target)){
var map__14911 = cljs.core.group_by.call(null,cljs.analyzer.node_module_dep_QMARK_,libs__$1);
var map__14911__$1 = (((((!((map__14911 == null))))?(((((map__14911.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14911.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14911):map__14911);
var node_libs = cljs.core.get.call(null,map__14911__$1,true);
var libs_to_load = cljs.core.get.call(null,map__14911__$1,false);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [node_libs,libs_to_load], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [null,libs__$1], null);
}
})();
var node_libs = cljs.core.nth.call(null,vec__14906,(0),null);
var libs_to_load = cljs.core.nth.call(null,vec__14906,(1),null);
var global_exports_libs = cljs.core.filter.call(null,cljs.analyzer.dep_has_global_exports_QMARK_,libs_to_load);
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set([\"cljs.core\"]);");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set([\"cljs.core\"]);");
} else {
}

var seq__14913_14929 = cljs.core.seq.call(null,libs_to_load);
var chunk__14914_14930 = null;
var count__14915_14931 = (0);
var i__14916_14932 = (0);
while(true){
if((i__14916_14932 < count__14915_14931)){
var lib_14933 = cljs.core._nth.call(null,chunk__14914_14930,i__14916_14932);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_14933)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4047__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14933),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14933),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4047__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14933),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14933),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_14933,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14933),"');");
}

}
}
}


var G__14934 = seq__14913_14929;
var G__14935 = chunk__14914_14930;
var G__14936 = count__14915_14931;
var G__14937 = (i__14916_14932 + (1));
seq__14913_14929 = G__14934;
chunk__14914_14930 = G__14935;
count__14915_14931 = G__14936;
i__14916_14932 = G__14937;
continue;
} else {
var temp__5735__auto___14938 = cljs.core.seq.call(null,seq__14913_14929);
if(temp__5735__auto___14938){
var seq__14913_14939__$1 = temp__5735__auto___14938;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14913_14939__$1)){
var c__4461__auto___14940 = cljs.core.chunk_first.call(null,seq__14913_14939__$1);
var G__14941 = cljs.core.chunk_rest.call(null,seq__14913_14939__$1);
var G__14942 = c__4461__auto___14940;
var G__14943 = cljs.core.count.call(null,c__4461__auto___14940);
var G__14944 = (0);
seq__14913_14929 = G__14941;
chunk__14914_14930 = G__14942;
count__14915_14931 = G__14943;
i__14916_14932 = G__14944;
continue;
} else {
var lib_14945 = cljs.core.first.call(null,seq__14913_14939__$1);
if(((cljs.analyzer.foreign_dep_QMARK_.call(null,lib_14945)) && ((!(cljs.core.keyword_identical_QMARK_.call(null,optimizations,new cljs.core.Keyword(null,"none","none",1333468478))))))){
} else {
if(cljs.core.truth_((function (){var or__4047__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14945),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14945),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__4047__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_14945),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14945),"', 'reload-all');");
} else {
if(cljs.core._EQ_.call(null,lib_14945,new cljs.core.Symbol(null,"goog","goog",-70603925,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_14945),"');");
}

}
}
}


var G__14946 = cljs.core.next.call(null,seq__14913_14939__$1);
var G__14947 = null;
var G__14948 = (0);
var G__14949 = (0);
seq__14913_14929 = G__14946;
chunk__14914_14930 = G__14947;
count__14915_14931 = G__14948;
i__14916_14932 = G__14949;
continue;
}
} else {
}
}
break;
}

var seq__14917_14950 = cljs.core.seq.call(null,node_libs);
var chunk__14918_14951 = null;
var count__14919_14952 = (0);
var i__14920_14953 = (0);
while(true){
if((i__14920_14953 < count__14919_14952)){
var lib_14954 = cljs.core._nth.call(null,chunk__14918_14951,i__14920_14953);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_14954)," = require('",lib_14954,"');");


var G__14955 = seq__14917_14950;
var G__14956 = chunk__14918_14951;
var G__14957 = count__14919_14952;
var G__14958 = (i__14920_14953 + (1));
seq__14917_14950 = G__14955;
chunk__14918_14951 = G__14956;
count__14919_14952 = G__14957;
i__14920_14953 = G__14958;
continue;
} else {
var temp__5735__auto___14959 = cljs.core.seq.call(null,seq__14917_14950);
if(temp__5735__auto___14959){
var seq__14917_14960__$1 = temp__5735__auto___14959;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14917_14960__$1)){
var c__4461__auto___14961 = cljs.core.chunk_first.call(null,seq__14917_14960__$1);
var G__14962 = cljs.core.chunk_rest.call(null,seq__14917_14960__$1);
var G__14963 = c__4461__auto___14961;
var G__14964 = cljs.core.count.call(null,c__4461__auto___14961);
var G__14965 = (0);
seq__14917_14950 = G__14962;
chunk__14918_14951 = G__14963;
count__14919_14952 = G__14964;
i__14920_14953 = G__14965;
continue;
} else {
var lib_14966 = cljs.core.first.call(null,seq__14917_14960__$1);
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,ns_name),".",cljs.analyzer.munge_node_lib.call(null,lib_14966)," = require('",lib_14966,"');");


var G__14967 = cljs.core.next.call(null,seq__14917_14960__$1);
var G__14968 = null;
var G__14969 = (0);
var G__14970 = (0);
seq__14917_14950 = G__14967;
chunk__14918_14951 = G__14968;
count__14919_14952 = G__14969;
i__14920_14953 = G__14970;
continue;
}
} else {
}
}
break;
}

var seq__14921_14971 = cljs.core.seq.call(null,global_exports_libs);
var chunk__14922_14972 = null;
var count__14923_14973 = (0);
var i__14924_14974 = (0);
while(true){
if((i__14924_14974 < count__14923_14973)){
var lib_14975 = cljs.core._nth.call(null,chunk__14922_14972,i__14924_14974);
var map__14925_14976 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_14975));
var map__14925_14977__$1 = (((((!((map__14925_14976 == null))))?(((((map__14925_14976.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14925_14976.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14925_14976):map__14925_14976);
var global_exports_14978 = cljs.core.get.call(null,map__14925_14977__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_14978,lib_14975);


var G__14979 = seq__14921_14971;
var G__14980 = chunk__14922_14972;
var G__14981 = count__14923_14973;
var G__14982 = (i__14924_14974 + (1));
seq__14921_14971 = G__14979;
chunk__14922_14972 = G__14980;
count__14923_14973 = G__14981;
i__14924_14974 = G__14982;
continue;
} else {
var temp__5735__auto___14983 = cljs.core.seq.call(null,seq__14921_14971);
if(temp__5735__auto___14983){
var seq__14921_14984__$1 = temp__5735__auto___14983;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__14921_14984__$1)){
var c__4461__auto___14985 = cljs.core.chunk_first.call(null,seq__14921_14984__$1);
var G__14986 = cljs.core.chunk_rest.call(null,seq__14921_14984__$1);
var G__14987 = c__4461__auto___14985;
var G__14988 = cljs.core.count.call(null,c__4461__auto___14985);
var G__14989 = (0);
seq__14921_14971 = G__14986;
chunk__14922_14972 = G__14987;
count__14923_14973 = G__14988;
i__14924_14974 = G__14989;
continue;
} else {
var lib_14990 = cljs.core.first.call(null,seq__14921_14984__$1);
var map__14927_14991 = cljs.core.get.call(null,js_dependency_index,cljs.core.name.call(null,lib_14990));
var map__14927_14992__$1 = (((((!((map__14927_14991 == null))))?(((((map__14927_14991.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14927_14991.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14927_14991):map__14927_14991);
var global_exports_14993 = cljs.core.get.call(null,map__14927_14992__$1,new cljs.core.Keyword(null,"global-exports","global-exports",-1644865592));
cljs.compiler.emit_global_export.call(null,ns_name,global_exports_14993,lib_14990);


var G__14994 = cljs.core.next.call(null,seq__14921_14984__$1);
var G__14995 = null;
var G__14996 = (0);
var G__14997 = (0);
seq__14921_14971 = G__14994;
chunk__14922_14972 = G__14995;
count__14923_14973 = G__14996;
i__14924_14974 = G__14997;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns*","ns*",200417856),(function (p__14998){
var map__14999 = p__14998;
var map__14999__$1 = (((((!((map__14999 == null))))?(((((map__14999.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__14999.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14999):map__14999);
var name = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__14999__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-env","repl-env",-1976503928).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"'nil';");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__15001){
var map__15002 = p__15001;
var map__15002__$1 = (((((!((map__15002 == null))))?(((((map__15002.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15002.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15002):map__15002);
var name = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var deps = cljs.core.get.call(null,map__15002__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");
} else {
}
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads),deps,name);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype","deftype",340294561),(function (p__15004){
var map__15005 = p__15004;
var map__15005__$1 = (((((!((map__15005 == null))))?(((((map__15005.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15005.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15005):map__15005);
var t = cljs.core.get.call(null,map__15005__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__15005__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__15005__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__15005__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__15005__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__15007_15025 = cljs.core.seq.call(null,protocols);
var chunk__15008_15026 = null;
var count__15009_15027 = (0);
var i__15010_15028 = (0);
while(true){
if((i__15010_15028 < count__15009_15027)){
var protocol_15029 = cljs.core._nth.call(null,chunk__15008_15026,i__15010_15028);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15029)),"}");


var G__15030 = seq__15007_15025;
var G__15031 = chunk__15008_15026;
var G__15032 = count__15009_15027;
var G__15033 = (i__15010_15028 + (1));
seq__15007_15025 = G__15030;
chunk__15008_15026 = G__15031;
count__15009_15027 = G__15032;
i__15010_15028 = G__15033;
continue;
} else {
var temp__5735__auto___15034 = cljs.core.seq.call(null,seq__15007_15025);
if(temp__5735__auto___15034){
var seq__15007_15035__$1 = temp__5735__auto___15034;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15007_15035__$1)){
var c__4461__auto___15036 = cljs.core.chunk_first.call(null,seq__15007_15035__$1);
var G__15037 = cljs.core.chunk_rest.call(null,seq__15007_15035__$1);
var G__15038 = c__4461__auto___15036;
var G__15039 = cljs.core.count.call(null,c__4461__auto___15036);
var G__15040 = (0);
seq__15007_15025 = G__15037;
chunk__15008_15026 = G__15038;
count__15009_15027 = G__15039;
i__15010_15028 = G__15040;
continue;
} else {
var protocol_15041 = cljs.core.first.call(null,seq__15007_15035__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15041)),"}");


var G__15042 = cljs.core.next.call(null,seq__15007_15035__$1);
var G__15043 = null;
var G__15044 = (0);
var G__15045 = (0);
seq__15007_15025 = G__15042;
chunk__15008_15026 = G__15043;
count__15009_15027 = G__15044;
i__15010_15028 = G__15045;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__15011_15046 = cljs.core.seq.call(null,fields__$1);
var chunk__15012_15047 = null;
var count__15013_15048 = (0);
var i__15014_15049 = (0);
while(true){
if((i__15014_15049 < count__15013_15048)){
var fld_15050 = cljs.core._nth.call(null,chunk__15012_15047,i__15014_15049);
cljs.compiler.emitln.call(null,"this.",fld_15050," = ",fld_15050,";");


var G__15051 = seq__15011_15046;
var G__15052 = chunk__15012_15047;
var G__15053 = count__15013_15048;
var G__15054 = (i__15014_15049 + (1));
seq__15011_15046 = G__15051;
chunk__15012_15047 = G__15052;
count__15013_15048 = G__15053;
i__15014_15049 = G__15054;
continue;
} else {
var temp__5735__auto___15055 = cljs.core.seq.call(null,seq__15011_15046);
if(temp__5735__auto___15055){
var seq__15011_15056__$1 = temp__5735__auto___15055;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15011_15056__$1)){
var c__4461__auto___15057 = cljs.core.chunk_first.call(null,seq__15011_15056__$1);
var G__15058 = cljs.core.chunk_rest.call(null,seq__15011_15056__$1);
var G__15059 = c__4461__auto___15057;
var G__15060 = cljs.core.count.call(null,c__4461__auto___15057);
var G__15061 = (0);
seq__15011_15046 = G__15058;
chunk__15012_15047 = G__15059;
count__15013_15048 = G__15060;
i__15014_15049 = G__15061;
continue;
} else {
var fld_15062 = cljs.core.first.call(null,seq__15011_15056__$1);
cljs.compiler.emitln.call(null,"this.",fld_15062," = ",fld_15062,";");


var G__15063 = cljs.core.next.call(null,seq__15011_15056__$1);
var G__15064 = null;
var G__15065 = (0);
var G__15066 = (0);
seq__15011_15046 = G__15063;
chunk__15012_15047 = G__15064;
count__15013_15048 = G__15065;
i__15014_15049 = G__15066;
continue;
}
} else {
}
}
break;
}

var seq__15015_15067 = cljs.core.seq.call(null,pmasks);
var chunk__15016_15068 = null;
var count__15017_15069 = (0);
var i__15018_15070 = (0);
while(true){
if((i__15018_15070 < count__15017_15069)){
var vec__15019_15071 = cljs.core._nth.call(null,chunk__15016_15068,i__15018_15070);
var pno_15072 = cljs.core.nth.call(null,vec__15019_15071,(0),null);
var pmask_15073 = cljs.core.nth.call(null,vec__15019_15071,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_15072,"$ = ",pmask_15073,";");


var G__15074 = seq__15015_15067;
var G__15075 = chunk__15016_15068;
var G__15076 = count__15017_15069;
var G__15077 = (i__15018_15070 + (1));
seq__15015_15067 = G__15074;
chunk__15016_15068 = G__15075;
count__15017_15069 = G__15076;
i__15018_15070 = G__15077;
continue;
} else {
var temp__5735__auto___15078 = cljs.core.seq.call(null,seq__15015_15067);
if(temp__5735__auto___15078){
var seq__15015_15079__$1 = temp__5735__auto___15078;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15015_15079__$1)){
var c__4461__auto___15080 = cljs.core.chunk_first.call(null,seq__15015_15079__$1);
var G__15081 = cljs.core.chunk_rest.call(null,seq__15015_15079__$1);
var G__15082 = c__4461__auto___15080;
var G__15083 = cljs.core.count.call(null,c__4461__auto___15080);
var G__15084 = (0);
seq__15015_15067 = G__15081;
chunk__15016_15068 = G__15082;
count__15017_15069 = G__15083;
i__15018_15070 = G__15084;
continue;
} else {
var vec__15022_15085 = cljs.core.first.call(null,seq__15015_15079__$1);
var pno_15086 = cljs.core.nth.call(null,vec__15022_15085,(0),null);
var pmask_15087 = cljs.core.nth.call(null,vec__15022_15085,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_15086,"$ = ",pmask_15087,";");


var G__15088 = cljs.core.next.call(null,seq__15015_15079__$1);
var G__15089 = null;
var G__15090 = (0);
var G__15091 = (0);
seq__15015_15067 = G__15088;
chunk__15016_15068 = G__15089;
count__15017_15069 = G__15090;
i__15018_15070 = G__15091;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord","defrecord",-1367493418),(function (p__15092){
var map__15093 = p__15092;
var map__15093__$1 = (((((!((map__15093 == null))))?(((((map__15093.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15093.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15093):map__15093);
var t = cljs.core.get.call(null,map__15093__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__15093__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__15093__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__15093__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__15093__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__15095_15113 = cljs.core.seq.call(null,protocols);
var chunk__15096_15114 = null;
var count__15097_15115 = (0);
var i__15098_15116 = (0);
while(true){
if((i__15098_15116 < count__15097_15115)){
var protocol_15117 = cljs.core._nth.call(null,chunk__15096_15114,i__15098_15116);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15117)),"}");


var G__15118 = seq__15095_15113;
var G__15119 = chunk__15096_15114;
var G__15120 = count__15097_15115;
var G__15121 = (i__15098_15116 + (1));
seq__15095_15113 = G__15118;
chunk__15096_15114 = G__15119;
count__15097_15115 = G__15120;
i__15098_15116 = G__15121;
continue;
} else {
var temp__5735__auto___15122 = cljs.core.seq.call(null,seq__15095_15113);
if(temp__5735__auto___15122){
var seq__15095_15123__$1 = temp__5735__auto___15122;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15095_15123__$1)){
var c__4461__auto___15124 = cljs.core.chunk_first.call(null,seq__15095_15123__$1);
var G__15125 = cljs.core.chunk_rest.call(null,seq__15095_15123__$1);
var G__15126 = c__4461__auto___15124;
var G__15127 = cljs.core.count.call(null,c__4461__auto___15124);
var G__15128 = (0);
seq__15095_15113 = G__15125;
chunk__15096_15114 = G__15126;
count__15097_15115 = G__15127;
i__15098_15116 = G__15128;
continue;
} else {
var protocol_15129 = cljs.core.first.call(null,seq__15095_15123__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,cljs.core.str.cljs$core$IFn$_invoke$arity$1(protocol_15129)),"}");


var G__15130 = cljs.core.next.call(null,seq__15095_15123__$1);
var G__15131 = null;
var G__15132 = (0);
var G__15133 = (0);
seq__15095_15113 = G__15130;
chunk__15096_15114 = G__15131;
count__15097_15115 = G__15132;
i__15098_15116 = G__15133;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__15099_15134 = cljs.core.seq.call(null,fields__$1);
var chunk__15100_15135 = null;
var count__15101_15136 = (0);
var i__15102_15137 = (0);
while(true){
if((i__15102_15137 < count__15101_15136)){
var fld_15138 = cljs.core._nth.call(null,chunk__15100_15135,i__15102_15137);
cljs.compiler.emitln.call(null,"this.",fld_15138," = ",fld_15138,";");


var G__15139 = seq__15099_15134;
var G__15140 = chunk__15100_15135;
var G__15141 = count__15101_15136;
var G__15142 = (i__15102_15137 + (1));
seq__15099_15134 = G__15139;
chunk__15100_15135 = G__15140;
count__15101_15136 = G__15141;
i__15102_15137 = G__15142;
continue;
} else {
var temp__5735__auto___15143 = cljs.core.seq.call(null,seq__15099_15134);
if(temp__5735__auto___15143){
var seq__15099_15144__$1 = temp__5735__auto___15143;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15099_15144__$1)){
var c__4461__auto___15145 = cljs.core.chunk_first.call(null,seq__15099_15144__$1);
var G__15146 = cljs.core.chunk_rest.call(null,seq__15099_15144__$1);
var G__15147 = c__4461__auto___15145;
var G__15148 = cljs.core.count.call(null,c__4461__auto___15145);
var G__15149 = (0);
seq__15099_15134 = G__15146;
chunk__15100_15135 = G__15147;
count__15101_15136 = G__15148;
i__15102_15137 = G__15149;
continue;
} else {
var fld_15150 = cljs.core.first.call(null,seq__15099_15144__$1);
cljs.compiler.emitln.call(null,"this.",fld_15150," = ",fld_15150,";");


var G__15151 = cljs.core.next.call(null,seq__15099_15144__$1);
var G__15152 = null;
var G__15153 = (0);
var G__15154 = (0);
seq__15099_15134 = G__15151;
chunk__15100_15135 = G__15152;
count__15101_15136 = G__15153;
i__15102_15137 = G__15154;
continue;
}
} else {
}
}
break;
}

var seq__15103_15155 = cljs.core.seq.call(null,pmasks);
var chunk__15104_15156 = null;
var count__15105_15157 = (0);
var i__15106_15158 = (0);
while(true){
if((i__15106_15158 < count__15105_15157)){
var vec__15107_15159 = cljs.core._nth.call(null,chunk__15104_15156,i__15106_15158);
var pno_15160 = cljs.core.nth.call(null,vec__15107_15159,(0),null);
var pmask_15161 = cljs.core.nth.call(null,vec__15107_15159,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_15160,"$ = ",pmask_15161,";");


var G__15162 = seq__15103_15155;
var G__15163 = chunk__15104_15156;
var G__15164 = count__15105_15157;
var G__15165 = (i__15106_15158 + (1));
seq__15103_15155 = G__15162;
chunk__15104_15156 = G__15163;
count__15105_15157 = G__15164;
i__15106_15158 = G__15165;
continue;
} else {
var temp__5735__auto___15166 = cljs.core.seq.call(null,seq__15103_15155);
if(temp__5735__auto___15166){
var seq__15103_15167__$1 = temp__5735__auto___15166;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15103_15167__$1)){
var c__4461__auto___15168 = cljs.core.chunk_first.call(null,seq__15103_15167__$1);
var G__15169 = cljs.core.chunk_rest.call(null,seq__15103_15167__$1);
var G__15170 = c__4461__auto___15168;
var G__15171 = cljs.core.count.call(null,c__4461__auto___15168);
var G__15172 = (0);
seq__15103_15155 = G__15169;
chunk__15104_15156 = G__15170;
count__15105_15157 = G__15171;
i__15106_15158 = G__15172;
continue;
} else {
var vec__15110_15173 = cljs.core.first.call(null,seq__15103_15167__$1);
var pno_15174 = cljs.core.nth.call(null,vec__15110_15173,(0),null);
var pmask_15175 = cljs.core.nth.call(null,vec__15110_15173,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_15174,"$ = ",pmask_15175,";");


var G__15176 = cljs.core.next.call(null,seq__15103_15167__$1);
var G__15177 = null;
var G__15178 = (0);
var G__15179 = (0);
seq__15103_15155 = G__15176;
chunk__15104_15156 = G__15177;
count__15105_15157 = G__15178;
i__15106_15158 = G__15179;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"});");

return cljs.compiler.emit.call(null,body);
}));
cljs.compiler.emit_dot = (function cljs$compiler$emit_dot(p__15180){
var map__15181 = p__15180;
var map__15181__$1 = (((((!((map__15181 == null))))?(((((map__15181.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15181.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15181):map__15181);
var target = cljs.core.get.call(null,map__15181__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__15181__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__15181__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__15181__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__15181__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-field","host-field",-72662140),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"host-call","host-call",1059629755),(function (ast){
return cljs.compiler.emit_dot.call(null,ast);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__15183){
var map__15184 = p__15183;
var map__15184__$1 = (((((!((map__15184 == null))))?(((((map__15184.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__15184.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__15184):map__15184);
var op = cljs.core.get.call(null,map__15184__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__15184__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__15184__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__15184__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__15184__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__4036__auto__ = code;
if(cljs.core.truth_(and__4036__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__4036__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__14050__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__14050__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,cljs.analyzer.constants_ns_sym),"');");

cljs.compiler.emitln.call(null,"goog.require('cljs.core');");

var seq__15190 = cljs.core.seq.call(null,table);
var chunk__15191 = null;
var count__15192 = (0);
var i__15193 = (0);
while(true){
if((i__15193 < count__15192)){
var vec__15194 = cljs.core._nth.call(null,chunk__15191,i__15193);
var sym = cljs.core.nth.call(null,vec__15194,(0),null);
var value = cljs.core.nth.call(null,vec__15194,(1),null);
var ns_15200 = cljs.core.namespace.call(null,sym);
var name_15201 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__15202 = seq__15190;
var G__15203 = chunk__15191;
var G__15204 = count__15192;
var G__15205 = (i__15193 + (1));
seq__15190 = G__15202;
chunk__15191 = G__15203;
count__15192 = G__15204;
i__15193 = G__15205;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__15190);
if(temp__5735__auto__){
var seq__15190__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__15190__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__15190__$1);
var G__15206 = cljs.core.chunk_rest.call(null,seq__15190__$1);
var G__15207 = c__4461__auto__;
var G__15208 = cljs.core.count.call(null,c__4461__auto__);
var G__15209 = (0);
seq__15190 = G__15206;
chunk__15191 = G__15207;
count__15192 = G__15208;
i__15193 = G__15209;
continue;
} else {
var vec__15197 = cljs.core.first.call(null,seq__15190__$1);
var sym = cljs.core.nth.call(null,vec__15197,(0),null);
var value = cljs.core.nth.call(null,vec__15197,(1),null);
var ns_15210 = cljs.core.namespace.call(null,sym);
var name_15211 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,["Cannot emit constant for type ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");


var G__15212 = cljs.core.next.call(null,seq__15190__$1);
var G__15213 = null;
var G__15214 = (0);
var G__15215 = (0);
seq__15190 = G__15212;
chunk__15191 = G__15213;
count__15192 = G__15214;
i__15193 = G__15215;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_externs = (function cljs$compiler$emit_externs(var_args){
var G__15217 = arguments.length;
switch (G__15217) {
case 1:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 4:
return cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$1 = (function (externs){
return cljs.compiler.emit_externs.call(null,cljs.core.PersistentVector.EMPTY,externs,cljs.core.atom.call(null,cljs.core.PersistentHashSet.EMPTY),(cljs.core.truth_(cljs.env._STAR_compiler_STAR_)?new cljs.core.Keyword("cljs.analyzer","externs","cljs.analyzer/externs",893359239).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)):null));
});

cljs.compiler.emit_externs.cljs$core$IFn$_invoke$arity$4 = (function (prefix,externs,top_level,known_externs){
var ks = cljs.core.seq.call(null,cljs.core.keys.call(null,externs));
while(true){
if(ks){
var k_15222 = cljs.core.first.call(null,ks);
var vec__15218_15223 = cljs.core.conj.call(null,prefix,k_15222);
var top_15224 = cljs.core.nth.call(null,vec__15218_15223,(0),null);
var prefix_SINGLEQUOTE__15225 = vec__15218_15223;
if(((cljs.core.not_EQ_.call(null,new cljs.core.Symbol(null,"prototype","prototype",519166522,null),k_15222)) && ((cljs.core.get_in.call(null,known_externs,prefix_SINGLEQUOTE__15225) == null)))){
if((!(((cljs.core.contains_QMARK_.call(null,cljs.core.deref.call(null,top_level),top_15224)) || (cljs.core.contains_QMARK_.call(null,known_externs,top_15224)))))){
cljs.compiler.emitln.call(null,"var ",clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__15225)),";");

cljs.core.swap_BANG_.call(null,top_level,cljs.core.conj,top_15224);
} else {
cljs.compiler.emitln.call(null,clojure.string.join.call(null,".",cljs.core.map.call(null,cljs.compiler.munge,prefix_SINGLEQUOTE__15225)),";");
}
} else {
}

var m_15226 = cljs.core.get.call(null,externs,k_15222);
if(cljs.core.empty_QMARK_.call(null,m_15226)){
} else {
cljs.compiler.emit_externs.call(null,prefix_SINGLEQUOTE__15225,m_15226,top_level,known_externs);
}

var G__15227 = cljs.core.next.call(null,ks);
ks = G__15227;
continue;
} else {
return null;
}
break;
}
});

cljs.compiler.emit_externs.cljs$lang$maxFixedArity = 4;


//# sourceMappingURL=compiler.js.map
