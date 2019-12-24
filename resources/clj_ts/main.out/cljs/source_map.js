// Compiled by ClojureScript 1.10.439 {}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__13434){
var vec__13435 = p__13434;
var i = cljs.core.nth.call(null,vec__13435,(0),null);
var v = cljs.core.nth.call(null,vec__13435,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__13438 = seg;
var gcol = cljs.core.nth.call(null,vec__13438,(0),null);
var source = cljs.core.nth.call(null,vec__13438,(1),null);
var line = cljs.core.nth.call(null,vec__13438,(2),null);
var col = cljs.core.nth.call(null,vec__13438,(3),null);
var name = cljs.core.nth.call(null,vec__13438,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__5735__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__5735__auto__)){
var name__$1 = temp__5735__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__13441 = seg;
var gcol = cljs.core.nth.call(null,vec__13441,(0),null);
var source = cljs.core.nth.call(null,vec__13441,(1),null);
var line = cljs.core.nth.call(null,vec__13441,(2),null);
var col = cljs.core.nth.call(null,vec__13441,(3),null);
var name = cljs.core.nth.call(null,vec__13441,(4),null);
var vec__13444 = relseg;
var rgcol = cljs.core.nth.call(null,vec__13444,(0),null);
var rsource = cljs.core.nth.call(null,vec__13444,(1),null);
var rline = cljs.core.nth.call(null,vec__13444,(2),null);
var rcol = cljs.core.nth.call(null,vec__13444,(3),null);
var rname = cljs.core.nth.call(null,vec__13444,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__4047__auto__ = source;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__4047__auto__ = line;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__4047__auto__ = col;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__4047__auto__ = name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__13447 = segmap;
var map__13447__$1 = (((((!((map__13447 == null))))?(((((map__13447.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13447.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13447):map__13447);
var gcol = cljs.core.get.call(null,map__13447__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__13447__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__13447__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__13447__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__13447__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__13447,map__13447__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var G__13450 = arguments.length;
switch (G__13450) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__13451 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__13455 = cljs.core.next.call(null,segs__$1);
var G__13456 = nrelseg;
var G__13457 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__13455;
relseg__$1 = G__13456;
result__$1 = G__13457;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__13451,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__13451,(1),null);
var G__13458 = (gline + (1));
var G__13459 = cljs.core.next.call(null,lines__$1);
var G__13460 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__13461 = result__$1;
gline = G__13458;
lines__$1 = G__13459;
relseg = G__13460;
result = G__13461;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;

/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__13463 = segmap;
var map__13463__$1 = (((((!((map__13463 == null))))?(((((map__13463.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13463.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13463):map__13463);
var gcol = cljs.core.get.call(null,map__13463__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__13463__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__13463__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__13463__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__13463__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__13463,map__13463__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__13463,map__13463__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__13462_SHARP_){
return cljs.core.conj.call(null,p1__13462_SHARP_,d__$1);
});})(map__13463,map__13463__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__13463,map__13463__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var G__13466 = arguments.length;
switch (G__13466) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__13467 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__13471 = cljs.core.next.call(null,segs__$1);
var G__13472 = nrelseg;
var G__13473 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__13471;
relseg__$1 = G__13472;
result__$1 = G__13473;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__13467,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__13467,(1),null);
var G__13474 = (gline + (1));
var G__13475 = cljs.core.next.call(null,lines__$1);
var G__13476 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__13477 = result__$1;
gline = G__13474;
lines__$1 = G__13475;
relseg = G__13476;
result = G__13477;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;

/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,((function (relseg){
return (function (p__13478){
var vec__13479 = p__13478;
var _ = cljs.core.nth.call(null,vec__13479,(0),null);
var source = cljs.core.nth.call(null,vec__13479,(1),null);
var line = cljs.core.nth.call(null,vec__13479,(2),null);
var col = cljs.core.nth.call(null,vec__13479,(3),null);
var name = cljs.core.nth.call(null,vec__13479,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__13482){
var vec__13483 = p__13482;
var gcol = cljs.core.nth.call(null,vec__13483,(0),null);
var sidx = cljs.core.nth.call(null,vec__13483,(1),null);
var line = cljs.core.nth.call(null,vec__13483,(2),null);
var col = cljs.core.nth.call(null,vec__13483,(3),null);
var name = cljs.core.nth.call(null,vec__13483,(4),null);
var seg = vec__13483;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__13483,gcol,sidx,line,col,name,seg,relseg){
return (function (p__13486){
var vec__13487 = p__13486;
var _ = cljs.core.nth.call(null,vec__13487,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__13487,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__13487,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__13487,(3),null);
var lname = cljs.core.nth.call(null,vec__13487,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__4047__auto__ = name;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__13483,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__4047__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__5733__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__5733__auto__)){
var name = temp__5733__auto__;
var idx = (function (){var temp__5733__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__5733__auto____$1)){
var idx = temp__5733__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__13493 = cljs.core.seq.call(null,infos);
var chunk__13494 = null;
var count__13495 = (0);
var i__13496 = (0);
while(true){
if((i__13496 < count__13495)){
var info = cljs.core._nth.call(null,chunk__13494,i__13496);
var segv_13577 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_13578 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_13579 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_13578 > (lc_13579 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__13493,chunk__13494,count__13495,i__13496,segv_13577,gline_13578,lc_13579,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_13578 - (lc_13579 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13577], null));
});})(seq__13493,chunk__13494,count__13495,i__13496,segv_13577,gline_13578,lc_13579,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__13493,chunk__13494,count__13495,i__13496,segv_13577,gline_13578,lc_13579,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13578], null),cljs.core.conj,segv_13577);
});})(seq__13493,chunk__13494,count__13495,i__13496,segv_13577,gline_13578,lc_13579,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__13580 = seq__13493;
var G__13581 = chunk__13494;
var G__13582 = count__13495;
var G__13583 = (i__13496 + (1));
seq__13493 = G__13580;
chunk__13494 = G__13581;
count__13495 = G__13582;
i__13496 = G__13583;
continue;
} else {
var temp__5735__auto__ = cljs.core.seq.call(null,seq__13493);
if(temp__5735__auto__){
var seq__13493__$1 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13493__$1)){
var c__4461__auto__ = cljs.core.chunk_first.call(null,seq__13493__$1);
var G__13584 = cljs.core.chunk_rest.call(null,seq__13493__$1);
var G__13585 = c__4461__auto__;
var G__13586 = cljs.core.count.call(null,c__4461__auto__);
var G__13587 = (0);
seq__13493 = G__13584;
chunk__13494 = G__13585;
count__13495 = G__13586;
i__13496 = G__13587;
continue;
} else {
var info = cljs.core.first.call(null,seq__13493__$1);
var segv_13588 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_13589 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_13590 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_13589 > (lc_13590 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__13493,chunk__13494,count__13495,i__13496,segv_13588,gline_13589,lc_13590,info,seq__13493__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_13589 - (lc_13590 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_13588], null));
});})(seq__13493,chunk__13494,count__13495,i__13496,segv_13588,gline_13589,lc_13590,info,seq__13493__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__13493,chunk__13494,count__13495,i__13496,segv_13588,gline_13589,lc_13590,info,seq__13493__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13589], null),cljs.core.conj,segv_13588);
});})(seq__13493,chunk__13494,count__13495,i__13496,segv_13588,gline_13589,lc_13590,info,seq__13493__$1,temp__5735__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}


var G__13591 = cljs.core.next.call(null,seq__13493__$1);
var G__13592 = null;
var G__13593 = (0);
var G__13594 = (0);
seq__13493 = G__13591;
chunk__13494 = G__13592;
count__13495 = G__13593;
i__13496 = G__13594;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__13497_13595 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__13498_13596 = null;
var count__13499_13597 = (0);
var i__13500_13598 = (0);
while(true){
if((i__13500_13598 < count__13499_13597)){
var vec__13501_13599 = cljs.core._nth.call(null,chunk__13498_13596,i__13500_13598);
var source_idx_13600 = cljs.core.nth.call(null,vec__13501_13599,(0),null);
var vec__13504_13601 = cljs.core.nth.call(null,vec__13501_13599,(1),null);
var __13602 = cljs.core.nth.call(null,vec__13504_13601,(0),null);
var lines_13603__$1 = cljs.core.nth.call(null,vec__13504_13601,(1),null);
var seq__13507_13604 = cljs.core.seq.call(null,lines_13603__$1);
var chunk__13508_13605 = null;
var count__13509_13606 = (0);
var i__13510_13607 = (0);
while(true){
if((i__13510_13607 < count__13509_13606)){
var vec__13511_13608 = cljs.core._nth.call(null,chunk__13508_13605,i__13510_13607);
var line_13609 = cljs.core.nth.call(null,vec__13511_13608,(0),null);
var cols_13610 = cljs.core.nth.call(null,vec__13511_13608,(1),null);
var seq__13514_13611 = cljs.core.seq.call(null,cols_13610);
var chunk__13515_13612 = null;
var count__13516_13613 = (0);
var i__13517_13614 = (0);
while(true){
if((i__13517_13614 < count__13516_13613)){
var vec__13518_13615 = cljs.core._nth.call(null,chunk__13515_13612,i__13517_13614);
var col_13616 = cljs.core.nth.call(null,vec__13518_13615,(0),null);
var infos_13617 = cljs.core.nth.call(null,vec__13518_13615,(1),null);
encode_cols.call(null,infos_13617,source_idx_13600,line_13609,col_13616);


var G__13618 = seq__13514_13611;
var G__13619 = chunk__13515_13612;
var G__13620 = count__13516_13613;
var G__13621 = (i__13517_13614 + (1));
seq__13514_13611 = G__13618;
chunk__13515_13612 = G__13619;
count__13516_13613 = G__13620;
i__13517_13614 = G__13621;
continue;
} else {
var temp__5735__auto___13622 = cljs.core.seq.call(null,seq__13514_13611);
if(temp__5735__auto___13622){
var seq__13514_13623__$1 = temp__5735__auto___13622;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13514_13623__$1)){
var c__4461__auto___13624 = cljs.core.chunk_first.call(null,seq__13514_13623__$1);
var G__13625 = cljs.core.chunk_rest.call(null,seq__13514_13623__$1);
var G__13626 = c__4461__auto___13624;
var G__13627 = cljs.core.count.call(null,c__4461__auto___13624);
var G__13628 = (0);
seq__13514_13611 = G__13625;
chunk__13515_13612 = G__13626;
count__13516_13613 = G__13627;
i__13517_13614 = G__13628;
continue;
} else {
var vec__13521_13629 = cljs.core.first.call(null,seq__13514_13623__$1);
var col_13630 = cljs.core.nth.call(null,vec__13521_13629,(0),null);
var infos_13631 = cljs.core.nth.call(null,vec__13521_13629,(1),null);
encode_cols.call(null,infos_13631,source_idx_13600,line_13609,col_13630);


var G__13632 = cljs.core.next.call(null,seq__13514_13623__$1);
var G__13633 = null;
var G__13634 = (0);
var G__13635 = (0);
seq__13514_13611 = G__13632;
chunk__13515_13612 = G__13633;
count__13516_13613 = G__13634;
i__13517_13614 = G__13635;
continue;
}
} else {
}
}
break;
}


var G__13636 = seq__13507_13604;
var G__13637 = chunk__13508_13605;
var G__13638 = count__13509_13606;
var G__13639 = (i__13510_13607 + (1));
seq__13507_13604 = G__13636;
chunk__13508_13605 = G__13637;
count__13509_13606 = G__13638;
i__13510_13607 = G__13639;
continue;
} else {
var temp__5735__auto___13640 = cljs.core.seq.call(null,seq__13507_13604);
if(temp__5735__auto___13640){
var seq__13507_13641__$1 = temp__5735__auto___13640;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13507_13641__$1)){
var c__4461__auto___13642 = cljs.core.chunk_first.call(null,seq__13507_13641__$1);
var G__13643 = cljs.core.chunk_rest.call(null,seq__13507_13641__$1);
var G__13644 = c__4461__auto___13642;
var G__13645 = cljs.core.count.call(null,c__4461__auto___13642);
var G__13646 = (0);
seq__13507_13604 = G__13643;
chunk__13508_13605 = G__13644;
count__13509_13606 = G__13645;
i__13510_13607 = G__13646;
continue;
} else {
var vec__13524_13647 = cljs.core.first.call(null,seq__13507_13641__$1);
var line_13648 = cljs.core.nth.call(null,vec__13524_13647,(0),null);
var cols_13649 = cljs.core.nth.call(null,vec__13524_13647,(1),null);
var seq__13527_13650 = cljs.core.seq.call(null,cols_13649);
var chunk__13528_13651 = null;
var count__13529_13652 = (0);
var i__13530_13653 = (0);
while(true){
if((i__13530_13653 < count__13529_13652)){
var vec__13531_13654 = cljs.core._nth.call(null,chunk__13528_13651,i__13530_13653);
var col_13655 = cljs.core.nth.call(null,vec__13531_13654,(0),null);
var infos_13656 = cljs.core.nth.call(null,vec__13531_13654,(1),null);
encode_cols.call(null,infos_13656,source_idx_13600,line_13648,col_13655);


var G__13657 = seq__13527_13650;
var G__13658 = chunk__13528_13651;
var G__13659 = count__13529_13652;
var G__13660 = (i__13530_13653 + (1));
seq__13527_13650 = G__13657;
chunk__13528_13651 = G__13658;
count__13529_13652 = G__13659;
i__13530_13653 = G__13660;
continue;
} else {
var temp__5735__auto___13661__$1 = cljs.core.seq.call(null,seq__13527_13650);
if(temp__5735__auto___13661__$1){
var seq__13527_13662__$1 = temp__5735__auto___13661__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13527_13662__$1)){
var c__4461__auto___13663 = cljs.core.chunk_first.call(null,seq__13527_13662__$1);
var G__13664 = cljs.core.chunk_rest.call(null,seq__13527_13662__$1);
var G__13665 = c__4461__auto___13663;
var G__13666 = cljs.core.count.call(null,c__4461__auto___13663);
var G__13667 = (0);
seq__13527_13650 = G__13664;
chunk__13528_13651 = G__13665;
count__13529_13652 = G__13666;
i__13530_13653 = G__13667;
continue;
} else {
var vec__13534_13668 = cljs.core.first.call(null,seq__13527_13662__$1);
var col_13669 = cljs.core.nth.call(null,vec__13534_13668,(0),null);
var infos_13670 = cljs.core.nth.call(null,vec__13534_13668,(1),null);
encode_cols.call(null,infos_13670,source_idx_13600,line_13648,col_13669);


var G__13671 = cljs.core.next.call(null,seq__13527_13662__$1);
var G__13672 = null;
var G__13673 = (0);
var G__13674 = (0);
seq__13527_13650 = G__13671;
chunk__13528_13651 = G__13672;
count__13529_13652 = G__13673;
i__13530_13653 = G__13674;
continue;
}
} else {
}
}
break;
}


var G__13675 = cljs.core.next.call(null,seq__13507_13641__$1);
var G__13676 = null;
var G__13677 = (0);
var G__13678 = (0);
seq__13507_13604 = G__13675;
chunk__13508_13605 = G__13676;
count__13509_13606 = G__13677;
i__13510_13607 = G__13678;
continue;
}
} else {
}
}
break;
}


var G__13679 = seq__13497_13595;
var G__13680 = chunk__13498_13596;
var G__13681 = count__13499_13597;
var G__13682 = (i__13500_13598 + (1));
seq__13497_13595 = G__13679;
chunk__13498_13596 = G__13680;
count__13499_13597 = G__13681;
i__13500_13598 = G__13682;
continue;
} else {
var temp__5735__auto___13683 = cljs.core.seq.call(null,seq__13497_13595);
if(temp__5735__auto___13683){
var seq__13497_13684__$1 = temp__5735__auto___13683;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13497_13684__$1)){
var c__4461__auto___13685 = cljs.core.chunk_first.call(null,seq__13497_13684__$1);
var G__13686 = cljs.core.chunk_rest.call(null,seq__13497_13684__$1);
var G__13687 = c__4461__auto___13685;
var G__13688 = cljs.core.count.call(null,c__4461__auto___13685);
var G__13689 = (0);
seq__13497_13595 = G__13686;
chunk__13498_13596 = G__13687;
count__13499_13597 = G__13688;
i__13500_13598 = G__13689;
continue;
} else {
var vec__13537_13690 = cljs.core.first.call(null,seq__13497_13684__$1);
var source_idx_13691 = cljs.core.nth.call(null,vec__13537_13690,(0),null);
var vec__13540_13692 = cljs.core.nth.call(null,vec__13537_13690,(1),null);
var __13693 = cljs.core.nth.call(null,vec__13540_13692,(0),null);
var lines_13694__$1 = cljs.core.nth.call(null,vec__13540_13692,(1),null);
var seq__13543_13695 = cljs.core.seq.call(null,lines_13694__$1);
var chunk__13544_13696 = null;
var count__13545_13697 = (0);
var i__13546_13698 = (0);
while(true){
if((i__13546_13698 < count__13545_13697)){
var vec__13547_13699 = cljs.core._nth.call(null,chunk__13544_13696,i__13546_13698);
var line_13700 = cljs.core.nth.call(null,vec__13547_13699,(0),null);
var cols_13701 = cljs.core.nth.call(null,vec__13547_13699,(1),null);
var seq__13550_13702 = cljs.core.seq.call(null,cols_13701);
var chunk__13551_13703 = null;
var count__13552_13704 = (0);
var i__13553_13705 = (0);
while(true){
if((i__13553_13705 < count__13552_13704)){
var vec__13554_13706 = cljs.core._nth.call(null,chunk__13551_13703,i__13553_13705);
var col_13707 = cljs.core.nth.call(null,vec__13554_13706,(0),null);
var infos_13708 = cljs.core.nth.call(null,vec__13554_13706,(1),null);
encode_cols.call(null,infos_13708,source_idx_13691,line_13700,col_13707);


var G__13709 = seq__13550_13702;
var G__13710 = chunk__13551_13703;
var G__13711 = count__13552_13704;
var G__13712 = (i__13553_13705 + (1));
seq__13550_13702 = G__13709;
chunk__13551_13703 = G__13710;
count__13552_13704 = G__13711;
i__13553_13705 = G__13712;
continue;
} else {
var temp__5735__auto___13713__$1 = cljs.core.seq.call(null,seq__13550_13702);
if(temp__5735__auto___13713__$1){
var seq__13550_13714__$1 = temp__5735__auto___13713__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13550_13714__$1)){
var c__4461__auto___13715 = cljs.core.chunk_first.call(null,seq__13550_13714__$1);
var G__13716 = cljs.core.chunk_rest.call(null,seq__13550_13714__$1);
var G__13717 = c__4461__auto___13715;
var G__13718 = cljs.core.count.call(null,c__4461__auto___13715);
var G__13719 = (0);
seq__13550_13702 = G__13716;
chunk__13551_13703 = G__13717;
count__13552_13704 = G__13718;
i__13553_13705 = G__13719;
continue;
} else {
var vec__13557_13720 = cljs.core.first.call(null,seq__13550_13714__$1);
var col_13721 = cljs.core.nth.call(null,vec__13557_13720,(0),null);
var infos_13722 = cljs.core.nth.call(null,vec__13557_13720,(1),null);
encode_cols.call(null,infos_13722,source_idx_13691,line_13700,col_13721);


var G__13723 = cljs.core.next.call(null,seq__13550_13714__$1);
var G__13724 = null;
var G__13725 = (0);
var G__13726 = (0);
seq__13550_13702 = G__13723;
chunk__13551_13703 = G__13724;
count__13552_13704 = G__13725;
i__13553_13705 = G__13726;
continue;
}
} else {
}
}
break;
}


var G__13727 = seq__13543_13695;
var G__13728 = chunk__13544_13696;
var G__13729 = count__13545_13697;
var G__13730 = (i__13546_13698 + (1));
seq__13543_13695 = G__13727;
chunk__13544_13696 = G__13728;
count__13545_13697 = G__13729;
i__13546_13698 = G__13730;
continue;
} else {
var temp__5735__auto___13731__$1 = cljs.core.seq.call(null,seq__13543_13695);
if(temp__5735__auto___13731__$1){
var seq__13543_13732__$1 = temp__5735__auto___13731__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13543_13732__$1)){
var c__4461__auto___13733 = cljs.core.chunk_first.call(null,seq__13543_13732__$1);
var G__13734 = cljs.core.chunk_rest.call(null,seq__13543_13732__$1);
var G__13735 = c__4461__auto___13733;
var G__13736 = cljs.core.count.call(null,c__4461__auto___13733);
var G__13737 = (0);
seq__13543_13695 = G__13734;
chunk__13544_13696 = G__13735;
count__13545_13697 = G__13736;
i__13546_13698 = G__13737;
continue;
} else {
var vec__13560_13738 = cljs.core.first.call(null,seq__13543_13732__$1);
var line_13739 = cljs.core.nth.call(null,vec__13560_13738,(0),null);
var cols_13740 = cljs.core.nth.call(null,vec__13560_13738,(1),null);
var seq__13563_13741 = cljs.core.seq.call(null,cols_13740);
var chunk__13564_13742 = null;
var count__13565_13743 = (0);
var i__13566_13744 = (0);
while(true){
if((i__13566_13744 < count__13565_13743)){
var vec__13567_13745 = cljs.core._nth.call(null,chunk__13564_13742,i__13566_13744);
var col_13746 = cljs.core.nth.call(null,vec__13567_13745,(0),null);
var infos_13747 = cljs.core.nth.call(null,vec__13567_13745,(1),null);
encode_cols.call(null,infos_13747,source_idx_13691,line_13739,col_13746);


var G__13748 = seq__13563_13741;
var G__13749 = chunk__13564_13742;
var G__13750 = count__13565_13743;
var G__13751 = (i__13566_13744 + (1));
seq__13563_13741 = G__13748;
chunk__13564_13742 = G__13749;
count__13565_13743 = G__13750;
i__13566_13744 = G__13751;
continue;
} else {
var temp__5735__auto___13752__$2 = cljs.core.seq.call(null,seq__13563_13741);
if(temp__5735__auto___13752__$2){
var seq__13563_13753__$1 = temp__5735__auto___13752__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13563_13753__$1)){
var c__4461__auto___13754 = cljs.core.chunk_first.call(null,seq__13563_13753__$1);
var G__13755 = cljs.core.chunk_rest.call(null,seq__13563_13753__$1);
var G__13756 = c__4461__auto___13754;
var G__13757 = cljs.core.count.call(null,c__4461__auto___13754);
var G__13758 = (0);
seq__13563_13741 = G__13755;
chunk__13564_13742 = G__13756;
count__13565_13743 = G__13757;
i__13566_13744 = G__13758;
continue;
} else {
var vec__13570_13759 = cljs.core.first.call(null,seq__13563_13753__$1);
var col_13760 = cljs.core.nth.call(null,vec__13570_13759,(0),null);
var infos_13761 = cljs.core.nth.call(null,vec__13570_13759,(1),null);
encode_cols.call(null,infos_13761,source_idx_13691,line_13739,col_13760);


var G__13762 = cljs.core.next.call(null,seq__13563_13753__$1);
var G__13763 = null;
var G__13764 = (0);
var G__13765 = (0);
seq__13563_13741 = G__13762;
chunk__13564_13742 = G__13763;
count__13565_13743 = G__13764;
i__13566_13744 = G__13765;
continue;
}
} else {
}
}
break;
}


var G__13766 = cljs.core.next.call(null,seq__13543_13732__$1);
var G__13767 = null;
var G__13768 = (0);
var G__13769 = (0);
seq__13543_13695 = G__13766;
chunk__13544_13696 = G__13767;
count__13545_13697 = G__13768;
i__13546_13698 = G__13769;
continue;
}
} else {
}
}
break;
}


var G__13770 = cljs.core.next.call(null,seq__13497_13684__$1);
var G__13771 = null;
var G__13772 = (0);
var G__13773 = (0);
seq__13497_13595 = G__13770;
chunk__13498_13596 = G__13771;
count__13499_13597 = G__13772;
i__13500_13598 = G__13773;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__13575 = ({"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13490_SHARP_){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(p1__13490_SHARP_),"?rel=",cljs.core.str.cljs$core$IFn$_invoke$arity$1((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13491_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__13491_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__13492_SHARP_){
return clojure.string.join.call(null,",",p1__13492_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))});
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__13576 = G__13575;
goog.object.set(G__13576,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__13576;
} else {
return G__13575;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__13774 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__13774,(0),null);
var col_map = cljs.core.nth.call(null,vec__13774,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__13777 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__13777,(0),null);
var infos = cljs.core.nth.call(null,vec__13777,(1),null);
var G__13783 = cljs.core.next.call(null,col_map_seq);
var G__13784 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__13777,col,infos,vec__13774,line,col_map){
return (function (v,p__13780){
var map__13781 = p__13780;
var map__13781__$1 = (((((!((map__13781 == null))))?(((((map__13781.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13781.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13781):map__13781);
var gline = cljs.core.get.call(null,map__13781__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__13781__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__13777,col,infos,vec__13774,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__13783;
new_cols = G__13784;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__13785 = cljs.core.next.call(null,line_map_seq);
var G__13786 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__13785;
new_lines = G__13786;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__13787_13849 = cljs.core.seq.call(null,reverse_map);
var chunk__13788_13850 = null;
var count__13789_13851 = (0);
var i__13790_13852 = (0);
while(true){
if((i__13790_13852 < count__13789_13851)){
var vec__13791_13853 = cljs.core._nth.call(null,chunk__13788_13850,i__13790_13852);
var line_13854 = cljs.core.nth.call(null,vec__13791_13853,(0),null);
var columns_13855 = cljs.core.nth.call(null,vec__13791_13853,(1),null);
var seq__13794_13856 = cljs.core.seq.call(null,columns_13855);
var chunk__13795_13857 = null;
var count__13796_13858 = (0);
var i__13797_13859 = (0);
while(true){
if((i__13797_13859 < count__13796_13858)){
var vec__13798_13860 = cljs.core._nth.call(null,chunk__13795_13857,i__13797_13859);
var column_13861 = cljs.core.nth.call(null,vec__13798_13860,(0),null);
var column_info_13862 = cljs.core.nth.call(null,vec__13798_13860,(1),null);
var seq__13801_13863 = cljs.core.seq.call(null,column_info_13862);
var chunk__13802_13864 = null;
var count__13803_13865 = (0);
var i__13804_13866 = (0);
while(true){
if((i__13804_13866 < count__13803_13865)){
var map__13805_13867 = cljs.core._nth.call(null,chunk__13802_13864,i__13804_13866);
var map__13805_13868__$1 = (((((!((map__13805_13867 == null))))?(((((map__13805_13867.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13805_13867.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13805_13867):map__13805_13867);
var gline_13869 = cljs.core.get.call(null,map__13805_13868__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13870 = cljs.core.get.call(null,map__13805_13868__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13871 = cljs.core.get.call(null,map__13805_13868__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13869], null),cljs.core.fnil.call(null,((function (seq__13801_13863,chunk__13802_13864,count__13803_13865,i__13804_13866,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13805_13867,map__13805_13868__$1,gline_13869,gcol_13870,name_13871,vec__13798_13860,column_13861,column_info_13862,vec__13791_13853,line_13854,columns_13855,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13870], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13854,new cljs.core.Keyword(null,"col","col",-1959363084),column_13861,new cljs.core.Keyword(null,"name","name",1843675177),name_13871], null));
});})(seq__13801_13863,chunk__13802_13864,count__13803_13865,i__13804_13866,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13805_13867,map__13805_13868__$1,gline_13869,gcol_13870,name_13871,vec__13798_13860,column_13861,column_info_13862,vec__13791_13853,line_13854,columns_13855,inverted))
,cljs.core.sorted_map.call(null)));


var G__13872 = seq__13801_13863;
var G__13873 = chunk__13802_13864;
var G__13874 = count__13803_13865;
var G__13875 = (i__13804_13866 + (1));
seq__13801_13863 = G__13872;
chunk__13802_13864 = G__13873;
count__13803_13865 = G__13874;
i__13804_13866 = G__13875;
continue;
} else {
var temp__5735__auto___13876 = cljs.core.seq.call(null,seq__13801_13863);
if(temp__5735__auto___13876){
var seq__13801_13877__$1 = temp__5735__auto___13876;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13801_13877__$1)){
var c__4461__auto___13878 = cljs.core.chunk_first.call(null,seq__13801_13877__$1);
var G__13879 = cljs.core.chunk_rest.call(null,seq__13801_13877__$1);
var G__13880 = c__4461__auto___13878;
var G__13881 = cljs.core.count.call(null,c__4461__auto___13878);
var G__13882 = (0);
seq__13801_13863 = G__13879;
chunk__13802_13864 = G__13880;
count__13803_13865 = G__13881;
i__13804_13866 = G__13882;
continue;
} else {
var map__13807_13883 = cljs.core.first.call(null,seq__13801_13877__$1);
var map__13807_13884__$1 = (((((!((map__13807_13883 == null))))?(((((map__13807_13883.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13807_13883.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13807_13883):map__13807_13883);
var gline_13885 = cljs.core.get.call(null,map__13807_13884__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13886 = cljs.core.get.call(null,map__13807_13884__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13887 = cljs.core.get.call(null,map__13807_13884__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13885], null),cljs.core.fnil.call(null,((function (seq__13801_13863,chunk__13802_13864,count__13803_13865,i__13804_13866,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13807_13883,map__13807_13884__$1,gline_13885,gcol_13886,name_13887,seq__13801_13877__$1,temp__5735__auto___13876,vec__13798_13860,column_13861,column_info_13862,vec__13791_13853,line_13854,columns_13855,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13886], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13854,new cljs.core.Keyword(null,"col","col",-1959363084),column_13861,new cljs.core.Keyword(null,"name","name",1843675177),name_13887], null));
});})(seq__13801_13863,chunk__13802_13864,count__13803_13865,i__13804_13866,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13807_13883,map__13807_13884__$1,gline_13885,gcol_13886,name_13887,seq__13801_13877__$1,temp__5735__auto___13876,vec__13798_13860,column_13861,column_info_13862,vec__13791_13853,line_13854,columns_13855,inverted))
,cljs.core.sorted_map.call(null)));


var G__13888 = cljs.core.next.call(null,seq__13801_13877__$1);
var G__13889 = null;
var G__13890 = (0);
var G__13891 = (0);
seq__13801_13863 = G__13888;
chunk__13802_13864 = G__13889;
count__13803_13865 = G__13890;
i__13804_13866 = G__13891;
continue;
}
} else {
}
}
break;
}


var G__13892 = seq__13794_13856;
var G__13893 = chunk__13795_13857;
var G__13894 = count__13796_13858;
var G__13895 = (i__13797_13859 + (1));
seq__13794_13856 = G__13892;
chunk__13795_13857 = G__13893;
count__13796_13858 = G__13894;
i__13797_13859 = G__13895;
continue;
} else {
var temp__5735__auto___13896 = cljs.core.seq.call(null,seq__13794_13856);
if(temp__5735__auto___13896){
var seq__13794_13897__$1 = temp__5735__auto___13896;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13794_13897__$1)){
var c__4461__auto___13898 = cljs.core.chunk_first.call(null,seq__13794_13897__$1);
var G__13899 = cljs.core.chunk_rest.call(null,seq__13794_13897__$1);
var G__13900 = c__4461__auto___13898;
var G__13901 = cljs.core.count.call(null,c__4461__auto___13898);
var G__13902 = (0);
seq__13794_13856 = G__13899;
chunk__13795_13857 = G__13900;
count__13796_13858 = G__13901;
i__13797_13859 = G__13902;
continue;
} else {
var vec__13809_13903 = cljs.core.first.call(null,seq__13794_13897__$1);
var column_13904 = cljs.core.nth.call(null,vec__13809_13903,(0),null);
var column_info_13905 = cljs.core.nth.call(null,vec__13809_13903,(1),null);
var seq__13812_13906 = cljs.core.seq.call(null,column_info_13905);
var chunk__13813_13907 = null;
var count__13814_13908 = (0);
var i__13815_13909 = (0);
while(true){
if((i__13815_13909 < count__13814_13908)){
var map__13816_13910 = cljs.core._nth.call(null,chunk__13813_13907,i__13815_13909);
var map__13816_13911__$1 = (((((!((map__13816_13910 == null))))?(((((map__13816_13910.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13816_13910.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13816_13910):map__13816_13910);
var gline_13912 = cljs.core.get.call(null,map__13816_13911__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13913 = cljs.core.get.call(null,map__13816_13911__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13914 = cljs.core.get.call(null,map__13816_13911__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13912], null),cljs.core.fnil.call(null,((function (seq__13812_13906,chunk__13813_13907,count__13814_13908,i__13815_13909,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13816_13910,map__13816_13911__$1,gline_13912,gcol_13913,name_13914,vec__13809_13903,column_13904,column_info_13905,seq__13794_13897__$1,temp__5735__auto___13896,vec__13791_13853,line_13854,columns_13855,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13913], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13854,new cljs.core.Keyword(null,"col","col",-1959363084),column_13904,new cljs.core.Keyword(null,"name","name",1843675177),name_13914], null));
});})(seq__13812_13906,chunk__13813_13907,count__13814_13908,i__13815_13909,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13816_13910,map__13816_13911__$1,gline_13912,gcol_13913,name_13914,vec__13809_13903,column_13904,column_info_13905,seq__13794_13897__$1,temp__5735__auto___13896,vec__13791_13853,line_13854,columns_13855,inverted))
,cljs.core.sorted_map.call(null)));


var G__13915 = seq__13812_13906;
var G__13916 = chunk__13813_13907;
var G__13917 = count__13814_13908;
var G__13918 = (i__13815_13909 + (1));
seq__13812_13906 = G__13915;
chunk__13813_13907 = G__13916;
count__13814_13908 = G__13917;
i__13815_13909 = G__13918;
continue;
} else {
var temp__5735__auto___13919__$1 = cljs.core.seq.call(null,seq__13812_13906);
if(temp__5735__auto___13919__$1){
var seq__13812_13920__$1 = temp__5735__auto___13919__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13812_13920__$1)){
var c__4461__auto___13921 = cljs.core.chunk_first.call(null,seq__13812_13920__$1);
var G__13922 = cljs.core.chunk_rest.call(null,seq__13812_13920__$1);
var G__13923 = c__4461__auto___13921;
var G__13924 = cljs.core.count.call(null,c__4461__auto___13921);
var G__13925 = (0);
seq__13812_13906 = G__13922;
chunk__13813_13907 = G__13923;
count__13814_13908 = G__13924;
i__13815_13909 = G__13925;
continue;
} else {
var map__13818_13926 = cljs.core.first.call(null,seq__13812_13920__$1);
var map__13818_13927__$1 = (((((!((map__13818_13926 == null))))?(((((map__13818_13926.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13818_13926.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13818_13926):map__13818_13926);
var gline_13928 = cljs.core.get.call(null,map__13818_13927__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13929 = cljs.core.get.call(null,map__13818_13927__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13930 = cljs.core.get.call(null,map__13818_13927__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13928], null),cljs.core.fnil.call(null,((function (seq__13812_13906,chunk__13813_13907,count__13814_13908,i__13815_13909,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13818_13926,map__13818_13927__$1,gline_13928,gcol_13929,name_13930,seq__13812_13920__$1,temp__5735__auto___13919__$1,vec__13809_13903,column_13904,column_info_13905,seq__13794_13897__$1,temp__5735__auto___13896,vec__13791_13853,line_13854,columns_13855,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13929], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13854,new cljs.core.Keyword(null,"col","col",-1959363084),column_13904,new cljs.core.Keyword(null,"name","name",1843675177),name_13930], null));
});})(seq__13812_13906,chunk__13813_13907,count__13814_13908,i__13815_13909,seq__13794_13856,chunk__13795_13857,count__13796_13858,i__13797_13859,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13818_13926,map__13818_13927__$1,gline_13928,gcol_13929,name_13930,seq__13812_13920__$1,temp__5735__auto___13919__$1,vec__13809_13903,column_13904,column_info_13905,seq__13794_13897__$1,temp__5735__auto___13896,vec__13791_13853,line_13854,columns_13855,inverted))
,cljs.core.sorted_map.call(null)));


var G__13931 = cljs.core.next.call(null,seq__13812_13920__$1);
var G__13932 = null;
var G__13933 = (0);
var G__13934 = (0);
seq__13812_13906 = G__13931;
chunk__13813_13907 = G__13932;
count__13814_13908 = G__13933;
i__13815_13909 = G__13934;
continue;
}
} else {
}
}
break;
}


var G__13935 = cljs.core.next.call(null,seq__13794_13897__$1);
var G__13936 = null;
var G__13937 = (0);
var G__13938 = (0);
seq__13794_13856 = G__13935;
chunk__13795_13857 = G__13936;
count__13796_13858 = G__13937;
i__13797_13859 = G__13938;
continue;
}
} else {
}
}
break;
}


var G__13939 = seq__13787_13849;
var G__13940 = chunk__13788_13850;
var G__13941 = count__13789_13851;
var G__13942 = (i__13790_13852 + (1));
seq__13787_13849 = G__13939;
chunk__13788_13850 = G__13940;
count__13789_13851 = G__13941;
i__13790_13852 = G__13942;
continue;
} else {
var temp__5735__auto___13943 = cljs.core.seq.call(null,seq__13787_13849);
if(temp__5735__auto___13943){
var seq__13787_13944__$1 = temp__5735__auto___13943;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13787_13944__$1)){
var c__4461__auto___13945 = cljs.core.chunk_first.call(null,seq__13787_13944__$1);
var G__13946 = cljs.core.chunk_rest.call(null,seq__13787_13944__$1);
var G__13947 = c__4461__auto___13945;
var G__13948 = cljs.core.count.call(null,c__4461__auto___13945);
var G__13949 = (0);
seq__13787_13849 = G__13946;
chunk__13788_13850 = G__13947;
count__13789_13851 = G__13948;
i__13790_13852 = G__13949;
continue;
} else {
var vec__13820_13950 = cljs.core.first.call(null,seq__13787_13944__$1);
var line_13951 = cljs.core.nth.call(null,vec__13820_13950,(0),null);
var columns_13952 = cljs.core.nth.call(null,vec__13820_13950,(1),null);
var seq__13823_13953 = cljs.core.seq.call(null,columns_13952);
var chunk__13824_13954 = null;
var count__13825_13955 = (0);
var i__13826_13956 = (0);
while(true){
if((i__13826_13956 < count__13825_13955)){
var vec__13827_13957 = cljs.core._nth.call(null,chunk__13824_13954,i__13826_13956);
var column_13958 = cljs.core.nth.call(null,vec__13827_13957,(0),null);
var column_info_13959 = cljs.core.nth.call(null,vec__13827_13957,(1),null);
var seq__13830_13960 = cljs.core.seq.call(null,column_info_13959);
var chunk__13831_13961 = null;
var count__13832_13962 = (0);
var i__13833_13963 = (0);
while(true){
if((i__13833_13963 < count__13832_13962)){
var map__13834_13964 = cljs.core._nth.call(null,chunk__13831_13961,i__13833_13963);
var map__13834_13965__$1 = (((((!((map__13834_13964 == null))))?(((((map__13834_13964.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13834_13964.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13834_13964):map__13834_13964);
var gline_13966 = cljs.core.get.call(null,map__13834_13965__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13967 = cljs.core.get.call(null,map__13834_13965__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13968 = cljs.core.get.call(null,map__13834_13965__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13966], null),cljs.core.fnil.call(null,((function (seq__13830_13960,chunk__13831_13961,count__13832_13962,i__13833_13963,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13834_13964,map__13834_13965__$1,gline_13966,gcol_13967,name_13968,vec__13827_13957,column_13958,column_info_13959,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13967], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13951,new cljs.core.Keyword(null,"col","col",-1959363084),column_13958,new cljs.core.Keyword(null,"name","name",1843675177),name_13968], null));
});})(seq__13830_13960,chunk__13831_13961,count__13832_13962,i__13833_13963,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13834_13964,map__13834_13965__$1,gline_13966,gcol_13967,name_13968,vec__13827_13957,column_13958,column_info_13959,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted))
,cljs.core.sorted_map.call(null)));


var G__13969 = seq__13830_13960;
var G__13970 = chunk__13831_13961;
var G__13971 = count__13832_13962;
var G__13972 = (i__13833_13963 + (1));
seq__13830_13960 = G__13969;
chunk__13831_13961 = G__13970;
count__13832_13962 = G__13971;
i__13833_13963 = G__13972;
continue;
} else {
var temp__5735__auto___13973__$1 = cljs.core.seq.call(null,seq__13830_13960);
if(temp__5735__auto___13973__$1){
var seq__13830_13974__$1 = temp__5735__auto___13973__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13830_13974__$1)){
var c__4461__auto___13975 = cljs.core.chunk_first.call(null,seq__13830_13974__$1);
var G__13976 = cljs.core.chunk_rest.call(null,seq__13830_13974__$1);
var G__13977 = c__4461__auto___13975;
var G__13978 = cljs.core.count.call(null,c__4461__auto___13975);
var G__13979 = (0);
seq__13830_13960 = G__13976;
chunk__13831_13961 = G__13977;
count__13832_13962 = G__13978;
i__13833_13963 = G__13979;
continue;
} else {
var map__13836_13980 = cljs.core.first.call(null,seq__13830_13974__$1);
var map__13836_13981__$1 = (((((!((map__13836_13980 == null))))?(((((map__13836_13980.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13836_13980.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13836_13980):map__13836_13980);
var gline_13982 = cljs.core.get.call(null,map__13836_13981__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_13983 = cljs.core.get.call(null,map__13836_13981__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_13984 = cljs.core.get.call(null,map__13836_13981__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_13982], null),cljs.core.fnil.call(null,((function (seq__13830_13960,chunk__13831_13961,count__13832_13962,i__13833_13963,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13836_13980,map__13836_13981__$1,gline_13982,gcol_13983,name_13984,seq__13830_13974__$1,temp__5735__auto___13973__$1,vec__13827_13957,column_13958,column_info_13959,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_13983], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13951,new cljs.core.Keyword(null,"col","col",-1959363084),column_13958,new cljs.core.Keyword(null,"name","name",1843675177),name_13984], null));
});})(seq__13830_13960,chunk__13831_13961,count__13832_13962,i__13833_13963,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13836_13980,map__13836_13981__$1,gline_13982,gcol_13983,name_13984,seq__13830_13974__$1,temp__5735__auto___13973__$1,vec__13827_13957,column_13958,column_info_13959,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted))
,cljs.core.sorted_map.call(null)));


var G__13985 = cljs.core.next.call(null,seq__13830_13974__$1);
var G__13986 = null;
var G__13987 = (0);
var G__13988 = (0);
seq__13830_13960 = G__13985;
chunk__13831_13961 = G__13986;
count__13832_13962 = G__13987;
i__13833_13963 = G__13988;
continue;
}
} else {
}
}
break;
}


var G__13989 = seq__13823_13953;
var G__13990 = chunk__13824_13954;
var G__13991 = count__13825_13955;
var G__13992 = (i__13826_13956 + (1));
seq__13823_13953 = G__13989;
chunk__13824_13954 = G__13990;
count__13825_13955 = G__13991;
i__13826_13956 = G__13992;
continue;
} else {
var temp__5735__auto___13993__$1 = cljs.core.seq.call(null,seq__13823_13953);
if(temp__5735__auto___13993__$1){
var seq__13823_13994__$1 = temp__5735__auto___13993__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13823_13994__$1)){
var c__4461__auto___13995 = cljs.core.chunk_first.call(null,seq__13823_13994__$1);
var G__13996 = cljs.core.chunk_rest.call(null,seq__13823_13994__$1);
var G__13997 = c__4461__auto___13995;
var G__13998 = cljs.core.count.call(null,c__4461__auto___13995);
var G__13999 = (0);
seq__13823_13953 = G__13996;
chunk__13824_13954 = G__13997;
count__13825_13955 = G__13998;
i__13826_13956 = G__13999;
continue;
} else {
var vec__13838_14000 = cljs.core.first.call(null,seq__13823_13994__$1);
var column_14001 = cljs.core.nth.call(null,vec__13838_14000,(0),null);
var column_info_14002 = cljs.core.nth.call(null,vec__13838_14000,(1),null);
var seq__13841_14003 = cljs.core.seq.call(null,column_info_14002);
var chunk__13842_14004 = null;
var count__13843_14005 = (0);
var i__13844_14006 = (0);
while(true){
if((i__13844_14006 < count__13843_14005)){
var map__13845_14007 = cljs.core._nth.call(null,chunk__13842_14004,i__13844_14006);
var map__13845_14008__$1 = (((((!((map__13845_14007 == null))))?(((((map__13845_14007.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13845_14007.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13845_14007):map__13845_14007);
var gline_14009 = cljs.core.get.call(null,map__13845_14008__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14010 = cljs.core.get.call(null,map__13845_14008__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14011 = cljs.core.get.call(null,map__13845_14008__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14009], null),cljs.core.fnil.call(null,((function (seq__13841_14003,chunk__13842_14004,count__13843_14005,i__13844_14006,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13845_14007,map__13845_14008__$1,gline_14009,gcol_14010,name_14011,vec__13838_14000,column_14001,column_info_14002,seq__13823_13994__$1,temp__5735__auto___13993__$1,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14010], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13951,new cljs.core.Keyword(null,"col","col",-1959363084),column_14001,new cljs.core.Keyword(null,"name","name",1843675177),name_14011], null));
});})(seq__13841_14003,chunk__13842_14004,count__13843_14005,i__13844_14006,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13845_14007,map__13845_14008__$1,gline_14009,gcol_14010,name_14011,vec__13838_14000,column_14001,column_info_14002,seq__13823_13994__$1,temp__5735__auto___13993__$1,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted))
,cljs.core.sorted_map.call(null)));


var G__14012 = seq__13841_14003;
var G__14013 = chunk__13842_14004;
var G__14014 = count__13843_14005;
var G__14015 = (i__13844_14006 + (1));
seq__13841_14003 = G__14012;
chunk__13842_14004 = G__14013;
count__13843_14005 = G__14014;
i__13844_14006 = G__14015;
continue;
} else {
var temp__5735__auto___14016__$2 = cljs.core.seq.call(null,seq__13841_14003);
if(temp__5735__auto___14016__$2){
var seq__13841_14017__$1 = temp__5735__auto___14016__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13841_14017__$1)){
var c__4461__auto___14018 = cljs.core.chunk_first.call(null,seq__13841_14017__$1);
var G__14019 = cljs.core.chunk_rest.call(null,seq__13841_14017__$1);
var G__14020 = c__4461__auto___14018;
var G__14021 = cljs.core.count.call(null,c__4461__auto___14018);
var G__14022 = (0);
seq__13841_14003 = G__14019;
chunk__13842_14004 = G__14020;
count__13843_14005 = G__14021;
i__13844_14006 = G__14022;
continue;
} else {
var map__13847_14023 = cljs.core.first.call(null,seq__13841_14017__$1);
var map__13847_14024__$1 = (((((!((map__13847_14023 == null))))?(((((map__13847_14023.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__13847_14023.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13847_14023):map__13847_14023);
var gline_14025 = cljs.core.get.call(null,map__13847_14024__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_14026 = cljs.core.get.call(null,map__13847_14024__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_14027 = cljs.core.get.call(null,map__13847_14024__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_14025], null),cljs.core.fnil.call(null,((function (seq__13841_14003,chunk__13842_14004,count__13843_14005,i__13844_14006,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13847_14023,map__13847_14024__$1,gline_14025,gcol_14026,name_14027,seq__13841_14017__$1,temp__5735__auto___14016__$2,vec__13838_14000,column_14001,column_info_14002,seq__13823_13994__$1,temp__5735__auto___13993__$1,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol_14026], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_13951,new cljs.core.Keyword(null,"col","col",-1959363084),column_14001,new cljs.core.Keyword(null,"name","name",1843675177),name_14027], null));
});})(seq__13841_14003,chunk__13842_14004,count__13843_14005,i__13844_14006,seq__13823_13953,chunk__13824_13954,count__13825_13955,i__13826_13956,seq__13787_13849,chunk__13788_13850,count__13789_13851,i__13790_13852,map__13847_14023,map__13847_14024__$1,gline_14025,gcol_14026,name_14027,seq__13841_14017__$1,temp__5735__auto___14016__$2,vec__13838_14000,column_14001,column_info_14002,seq__13823_13994__$1,temp__5735__auto___13993__$1,vec__13820_13950,line_13951,columns_13952,seq__13787_13944__$1,temp__5735__auto___13943,inverted))
,cljs.core.sorted_map.call(null)));


var G__14028 = cljs.core.next.call(null,seq__13841_14017__$1);
var G__14029 = null;
var G__14030 = (0);
var G__14031 = (0);
seq__13841_14003 = G__14028;
chunk__13842_14004 = G__14029;
count__13843_14005 = G__14030;
i__13844_14006 = G__14031;
continue;
}
} else {
}
}
break;
}


var G__14032 = cljs.core.next.call(null,seq__13823_13994__$1);
var G__14033 = null;
var G__14034 = (0);
var G__14035 = (0);
seq__13823_13953 = G__14032;
chunk__13824_13954 = G__14033;
count__13825_13955 = G__14034;
i__13826_13956 = G__14035;
continue;
}
} else {
}
}
break;
}


var G__14036 = cljs.core.next.call(null,seq__13787_13944__$1);
var G__14037 = null;
var G__14038 = (0);
var G__14039 = (0);
seq__13787_13849 = G__14036;
chunk__13788_13850 = G__14037;
count__13789_13851 = G__14038;
i__13790_13852 = G__14039;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});

//# sourceMappingURL=source_map.js.map
