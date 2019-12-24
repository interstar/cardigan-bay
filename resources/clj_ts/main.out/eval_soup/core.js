// Compiled by ClojureScript 1.10.439 {}
goog.provide('eval_soup.core');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('cljs.core.async');
goog.require('cljs.js');
goog.require('cljs.tools.reader');
goog.require('clojure.walk');
goog.require('goog.net.XhrIo');
eval_soup.core.fix_goog_path = (function eval_soup$core$fix_goog_path(path){
var parts = clojure.string.split.call(null,path,/\//);
var last_part = cljs.core.last.call(null,parts);
var new_parts = cljs.core.concat.call(null,cljs.core.butlast.call(null,parts),((cljs.core._EQ_.call(null,last_part,clojure.string.lower_case.call(null,last_part)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [last_part,last_part], null):new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clojure.string.lower_case.call(null,last_part)], null)));
return clojure.string.join.call(null,"/",new_parts);
});
eval_soup.core.custom_load_BANG_ = (function eval_soup$core$custom_load_BANG_(var_args){
var G__20290 = arguments.length;
switch (G__20290) {
case 2:
return eval_soup.core.custom_load_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return eval_soup.core.custom_load_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

eval_soup.core.custom_load_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (opts,cb){
if(cljs.core.truth_(cljs.core.re_matches.call(null,/^goog\/.*/,new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts)))){
return eval_soup.core.custom_load_BANG_.call(null,cljs.core.update.call(null,opts,new cljs.core.Keyword(null,"path","path",-188191168),eval_soup.core.fix_goog_path),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [".js"], null),cb);
} else {
return eval_soup.core.custom_load_BANG_.call(null,opts,(cljs.core.truth_(new cljs.core.Keyword(null,"macros","macros",811339431).cljs$core$IFn$_invoke$arity$1(opts))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".clj",".cljc"], null):new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [".cljs",".cljc",".js"], null)),cb);
}
});

eval_soup.core.custom_load_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (opts,extensions,cb){
var temp__5733__auto__ = cljs.core.first.call(null,extensions);
if(cljs.core.truth_(temp__5733__auto__)){
var extension = temp__5733__auto__;
try{return goog.net.XhrIo.send([cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(opts)),cljs.core.str.cljs$core$IFn$_invoke$arity$1(extension)].join(''),((function (extension,temp__5733__auto__){
return (function (e){
if(cljs.core.truth_(e.target.isSuccess())){
return cb.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lang","lang",-1819677104),((cljs.core._EQ_.call(null,extension,".js"))?new cljs.core.Keyword(null,"js","js",1768080579):new cljs.core.Keyword(null,"clj","clj",-660495428)),new cljs.core.Keyword(null,"source","source",-433931539),e.target.getResponseText()], null));
} else {
return eval_soup.core.custom_load_BANG_.call(null,opts,cljs.core.rest.call(null,extensions),cb);
}
});})(extension,temp__5733__auto__))
);
}catch (e20291){if((e20291 instanceof Error)){
var _ = e20291;
return eval_soup.core.custom_load_BANG_.call(null,opts,cljs.core.rest.call(null,extensions),cb);
} else {
throw e20291;

}
}} else {
return cb.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"lang","lang",-1819677104),new cljs.core.Keyword(null,"clj","clj",-660495428),new cljs.core.Keyword(null,"source","source",-433931539),""], null));
}
});

eval_soup.core.custom_load_BANG_.cljs$lang$maxFixedArity = 3;

eval_soup.core.str__GT_form = (function eval_soup$core$str__GT_form(ns_sym,s){
try{var _STAR_ns_STAR__orig_val__20294 = cljs.core._STAR_ns_STAR_;
var _STAR_ns_STAR__temp_val__20295 = cljs.core.create_ns.call(null,ns_sym);
cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR__temp_val__20295;

try{return cljs.tools.reader.read_string.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"read-cond","read-cond",1056899244),new cljs.core.Keyword(null,"allow","allow",-1857325745)], null),s);
}finally {cljs.core._STAR_ns_STAR_ = _STAR_ns_STAR__orig_val__20294;
}}catch (e20293){if((e20293 instanceof Error)){
var _ = e20293;
return null;
} else {
throw e20293;

}
}});
eval_soup.core.eval_forms = (function eval_soup$core$eval_forms(forms,cb,_STAR_state,_STAR_current_ns,custom_load){
var opts = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"eval","eval",-1103567905),cljs.js.js_eval,new cljs.core.Keyword(null,"load","load",-1318641184),custom_load,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true], null);
var channel = cljs.core.async.chan.call(null);
var _STAR_forms = cljs.core.atom.call(null,forms);
var _STAR_results = cljs.core.atom.call(null,cljs.core.PersistentVector.EMPTY);
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__,opts,channel,_STAR_forms,_STAR_results){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__,opts,channel,_STAR_forms,_STAR_results){
return (function (state_20389){
var state_val_20390 = (state_20389[(1)]);
if((state_val_20390 === (7))){
var inst_20340 = (state_20389[(2)]);
var inst_20341 = cljs.core.swap_BANG_.call(null,_STAR_forms,cljs.core.rest);
var state_20389__$1 = (function (){var statearr_20391 = state_20389;
(statearr_20391[(7)] = inst_20341);

(statearr_20391[(8)] = inst_20340);

return statearr_20391;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20389__$1,(19),channel);
} else {
if((state_val_20390 === (20))){
var inst_20344 = (state_20389[(9)]);
var inst_20349 = inst_20344.cljs$lang$protocol_mask$partition0$;
var inst_20350 = (inst_20349 & (64));
var inst_20351 = inst_20344.cljs$core$ISeq$;
var inst_20352 = (cljs.core.PROTOCOL_SENTINEL === inst_20351);
var inst_20353 = ((inst_20350) || (inst_20352));
var state_20389__$1 = state_20389;
if(cljs.core.truth_(inst_20353)){
var statearr_20392_20440 = state_20389__$1;
(statearr_20392_20440[(1)] = (23));

} else {
var statearr_20393_20441 = state_20389__$1;
(statearr_20393_20441[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (27))){
var inst_20344 = (state_20389[(9)]);
var state_20389__$1 = state_20389;
var statearr_20394_20442 = state_20389__$1;
(statearr_20394_20442[(2)] = inst_20344);

(statearr_20394_20442[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (1))){
var state_20389__$1 = state_20389;
var statearr_20395_20443 = state_20389__$1;
(statearr_20395_20443[(2)] = null);

(statearr_20395_20443[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (24))){
var state_20389__$1 = state_20389;
var statearr_20396_20444 = state_20389__$1;
(statearr_20396_20444[(2)] = false);

(statearr_20396_20444[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (4))){
var state_20389__$1 = state_20389;
var statearr_20397_20445 = state_20389__$1;
(statearr_20397_20445[(2)] = null);

(statearr_20397_20445[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (15))){
var inst_20324 = (state_20389[(2)]);
var state_20389__$1 = state_20389;
var statearr_20398_20446 = state_20389__$1;
(statearr_20398_20446[(2)] = inst_20324);

(statearr_20398_20446[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (21))){
var state_20389__$1 = state_20389;
var statearr_20399_20447 = state_20389__$1;
(statearr_20399_20447[(2)] = false);

(statearr_20399_20447[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (31))){
var inst_20376 = (state_20389[(2)]);
var inst_20377 = cljs.core.swap_BANG_.call(null,_STAR_results,cljs.core.conj,inst_20376);
var state_20389__$1 = (function (){var statearr_20400 = state_20389;
(statearr_20400[(10)] = inst_20377);

return statearr_20400;
})();
var statearr_20401_20448 = state_20389__$1;
(statearr_20401_20448[(2)] = null);

(statearr_20401_20448[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (32))){
var inst_20369 = (state_20389[(11)]);
var inst_20371 = (state_20389[(2)]);
var inst_20372 = [inst_20371];
var inst_20373 = cljs.core.PersistentHashMap.fromArrays(inst_20369,inst_20372);
var state_20389__$1 = state_20389;
var statearr_20402_20449 = state_20389__$1;
(statearr_20402_20449[(2)] = inst_20373);

(statearr_20402_20449[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (13))){
var inst_20312 = (state_20389[(12)]);
var inst_20320 = cljs.core.second.call(null,inst_20312);
var inst_20321 = cljs.core.reset_BANG_.call(null,_STAR_current_ns,inst_20320);
var state_20389__$1 = state_20389;
var statearr_20403_20450 = state_20389__$1;
(statearr_20403_20450[(2)] = inst_20321);

(statearr_20403_20450[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (22))){
var inst_20360 = (state_20389[(2)]);
var state_20389__$1 = state_20389;
if(cljs.core.truth_(inst_20360)){
var statearr_20404_20451 = state_20389__$1;
(statearr_20404_20451[(1)] = (26));

} else {
var statearr_20405_20452 = state_20389__$1;
(statearr_20405_20452[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (29))){
var inst_20366 = (state_20389[(13)]);
var inst_20369 = [new cljs.core.Keyword(null,"value","value",305978217)];
var state_20389__$1 = (function (){var statearr_20406 = state_20389;
(statearr_20406[(11)] = inst_20369);

return statearr_20406;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20389__$1,(32),inst_20366);
} else {
if((state_val_20390 === (6))){
var inst_20381 = (state_20389[(2)]);
var state_20389__$1 = state_20389;
var statearr_20407_20453 = state_20389__$1;
(statearr_20407_20453[(2)] = inst_20381);

(statearr_20407_20453[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (28))){
var inst_20366 = (state_20389[(13)]);
var inst_20365 = (state_20389[(14)]);
var inst_20365__$1 = (state_20389[(2)]);
var inst_20366__$1 = cljs.core.get.call(null,inst_20365__$1,new cljs.core.Keyword(null,"value","value",305978217));
var inst_20367 = (inst_20366__$1 instanceof cljs.core.async.impl.channels.ManyToManyChannel);
var state_20389__$1 = (function (){var statearr_20408 = state_20389;
(statearr_20408[(13)] = inst_20366__$1);

(statearr_20408[(14)] = inst_20365__$1);

return statearr_20408;
})();
if(cljs.core.truth_(inst_20367)){
var statearr_20409_20454 = state_20389__$1;
(statearr_20409_20454[(1)] = (29));

} else {
var statearr_20410_20455 = state_20389__$1;
(statearr_20410_20455[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (25))){
var inst_20357 = (state_20389[(2)]);
var state_20389__$1 = state_20389;
var statearr_20411_20456 = state_20389__$1;
(statearr_20411_20456[(2)] = inst_20357);

(statearr_20411_20456[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (17))){
var inst_20312 = (state_20389[(12)]);
var inst_20310 = (state_20389[(15)]);
var inst_20313 = (state_20389[(16)]);
var inst_20335 = (function (){var current_ns = inst_20310;
var form = inst_20312;
var opts__$1 = inst_20313;
return ((function (current_ns,form,opts__$1,inst_20312,inst_20310,inst_20313,state_val_20390,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results){
return (function (p1__20296_SHARP_){
return cljs.core.async.put_BANG_.call(null,channel,p1__20296_SHARP_);
});
;})(current_ns,form,opts__$1,inst_20312,inst_20310,inst_20313,state_val_20390,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results))
})();
var inst_20336 = cljs.js.eval.call(null,_STAR_state,inst_20312,inst_20313,inst_20335);
var state_20389__$1 = state_20389;
var statearr_20412_20457 = state_20389__$1;
(statearr_20412_20457[(2)] = inst_20336);

(statearr_20412_20457[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (3))){
var inst_20383 = (state_20389[(2)]);
var inst_20384 = (function (){return ((function (inst_20383,state_val_20390,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results){
return (function (p1__20297_SHARP_){
var or__4047__auto__ = new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(p1__20297_SHARP_);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(p1__20297_SHARP_);
}
});
;})(inst_20383,state_val_20390,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results))
})();
var inst_20385 = cljs.core.deref.call(null,_STAR_results);
var inst_20386 = cljs.core.mapv.call(null,inst_20384,inst_20385);
var inst_20387 = cb.call(null,inst_20386);
var state_20389__$1 = (function (){var statearr_20413 = state_20389;
(statearr_20413[(17)] = inst_20383);

return statearr_20413;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20389__$1,inst_20387);
} else {
if((state_val_20390 === (12))){
var inst_20312 = (state_20389[(12)]);
var inst_20327 = (state_20389[(2)]);
var inst_20328 = (inst_20312 instanceof Error);
var state_20389__$1 = (function (){var statearr_20414 = state_20389;
(statearr_20414[(18)] = inst_20327);

return statearr_20414;
})();
if(cljs.core.truth_(inst_20328)){
var statearr_20415_20458 = state_20389__$1;
(statearr_20415_20458[(1)] = (16));

} else {
var statearr_20416_20459 = state_20389__$1;
(statearr_20416_20459[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (2))){
var inst_20299 = cljs.core.deref.call(null,_STAR_forms);
var inst_20300 = cljs.core.seq.call(null,inst_20299);
var state_20389__$1 = state_20389;
if(inst_20300){
var statearr_20417_20460 = state_20389__$1;
(statearr_20417_20460[(1)] = (4));

} else {
var statearr_20418_20461 = state_20389__$1;
(statearr_20418_20461[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (23))){
var state_20389__$1 = state_20389;
var statearr_20419_20462 = state_20389__$1;
(statearr_20419_20462[(2)] = true);

(statearr_20419_20462[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (19))){
var inst_20344 = (state_20389[(9)]);
var inst_20344__$1 = (state_20389[(2)]);
var inst_20346 = (inst_20344__$1 == null);
var inst_20347 = cljs.core.not.call(null,inst_20346);
var state_20389__$1 = (function (){var statearr_20420 = state_20389;
(statearr_20420[(9)] = inst_20344__$1);

return statearr_20420;
})();
if(inst_20347){
var statearr_20421_20463 = state_20389__$1;
(statearr_20421_20463[(1)] = (20));

} else {
var statearr_20422_20464 = state_20389__$1;
(statearr_20422_20464[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (11))){
var state_20389__$1 = state_20389;
var statearr_20423_20465 = state_20389__$1;
(statearr_20423_20465[(2)] = null);

(statearr_20423_20465[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (9))){
var inst_20312 = (state_20389[(12)]);
var inst_20310 = (state_20389[(15)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_20389,(8),Error,null,(7));
var inst_20310__$1 = cljs.core.deref.call(null,_STAR_current_ns);
var inst_20311 = cljs.core.deref.call(null,_STAR_forms);
var inst_20312__$1 = cljs.core.first.call(null,inst_20311);
var inst_20313 = cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"ns","ns",441598760),inst_20310__$1);
var inst_20314 = cljs.core.list_QMARK_.call(null,inst_20312__$1);
var state_20389__$1 = (function (){var statearr_20424 = state_20389;
(statearr_20424[(12)] = inst_20312__$1);

(statearr_20424[(15)] = inst_20310__$1);

(statearr_20424[(16)] = inst_20313);

return statearr_20424;
})();
if(inst_20314){
var statearr_20425_20466 = state_20389__$1;
(statearr_20425_20466[(1)] = (10));

} else {
var statearr_20426_20467 = state_20389__$1;
(statearr_20426_20467[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (5))){
var state_20389__$1 = state_20389;
var statearr_20427_20468 = state_20389__$1;
(statearr_20427_20468[(2)] = null);

(statearr_20427_20468[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (14))){
var state_20389__$1 = state_20389;
var statearr_20428_20469 = state_20389__$1;
(statearr_20428_20469[(2)] = null);

(statearr_20428_20469[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (26))){
var inst_20344 = (state_20389[(9)]);
var inst_20362 = cljs.core.apply.call(null,cljs.core.hash_map,inst_20344);
var state_20389__$1 = state_20389;
var statearr_20429_20470 = state_20389__$1;
(statearr_20429_20470[(2)] = inst_20362);

(statearr_20429_20470[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (16))){
var inst_20312 = (state_20389[(12)]);
var inst_20330 = [new cljs.core.Keyword(null,"error","error",-978969032)];
var inst_20331 = [inst_20312];
var inst_20332 = cljs.core.PersistentHashMap.fromArrays(inst_20330,inst_20331);
var inst_20333 = cljs.core.async.put_BANG_.call(null,channel,inst_20332);
var state_20389__$1 = state_20389;
var statearr_20430_20471 = state_20389__$1;
(statearr_20430_20471[(2)] = inst_20333);

(statearr_20430_20471[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (30))){
var inst_20365 = (state_20389[(14)]);
var state_20389__$1 = state_20389;
var statearr_20431_20472 = state_20389__$1;
(statearr_20431_20472[(2)] = inst_20365);

(statearr_20431_20472[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (10))){
var inst_20312 = (state_20389[(12)]);
var inst_20316 = new cljs.core.Symbol(null,"ns","ns",2082130287,null);
var inst_20317 = cljs.core.first.call(null,inst_20312);
var inst_20318 = cljs.core._EQ_.call(null,inst_20316,inst_20317);
var state_20389__$1 = state_20389;
if(inst_20318){
var statearr_20432_20473 = state_20389__$1;
(statearr_20432_20473[(1)] = (13));

} else {
var statearr_20433_20474 = state_20389__$1;
(statearr_20433_20474[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (18))){
var inst_20338 = (state_20389[(2)]);
var state_20389__$1 = state_20389;
var statearr_20434_20475 = state_20389__$1;
(statearr_20434_20475[(2)] = inst_20338);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20389__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20390 === (8))){
var inst_20302 = (state_20389[(2)]);
var inst_20303 = [new cljs.core.Keyword(null,"error","error",-978969032)];
var inst_20304 = [inst_20302];
var inst_20305 = cljs.core.PersistentHashMap.fromArrays(inst_20303,inst_20304);
var inst_20306 = cljs.core.async.put_BANG_.call(null,channel,inst_20305);
var state_20389__$1 = state_20389;
var statearr_20435_20476 = state_20389__$1;
(statearr_20435_20476[(2)] = inst_20306);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20389__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});})(c__18335__auto__,opts,channel,_STAR_forms,_STAR_results))
;
return ((function (switch__18240__auto__,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results){
return (function() {
var eval_soup$core$eval_forms_$_state_machine__18241__auto__ = null;
var eval_soup$core$eval_forms_$_state_machine__18241__auto____0 = (function (){
var statearr_20436 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20436[(0)] = eval_soup$core$eval_forms_$_state_machine__18241__auto__);

(statearr_20436[(1)] = (1));

return statearr_20436;
});
var eval_soup$core$eval_forms_$_state_machine__18241__auto____1 = (function (state_20389){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_20389);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e20437){if((e20437 instanceof Object)){
var ex__18244__auto__ = e20437;
var statearr_20438_20477 = state_20389;
(statearr_20438_20477[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20389);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20437;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20478 = state_20389;
state_20389 = G__20478;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
eval_soup$core$eval_forms_$_state_machine__18241__auto__ = function(state_20389){
switch(arguments.length){
case 0:
return eval_soup$core$eval_forms_$_state_machine__18241__auto____0.call(this);
case 1:
return eval_soup$core$eval_forms_$_state_machine__18241__auto____1.call(this,state_20389);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
eval_soup$core$eval_forms_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = eval_soup$core$eval_forms_$_state_machine__18241__auto____0;
eval_soup$core$eval_forms_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = eval_soup$core$eval_forms_$_state_machine__18241__auto____1;
return eval_soup$core$eval_forms_$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__,opts,channel,_STAR_forms,_STAR_results))
})();
var state__18337__auto__ = (function (){var statearr_20439 = f__18336__auto__.call(null);
(statearr_20439[(6)] = c__18335__auto__);

return statearr_20439;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__,opts,channel,_STAR_forms,_STAR_results))
);

return c__18335__auto__;
});
eval_soup.core.wrap_macroexpand = (function eval_soup$core$wrap_macroexpand(form){
if(cljs.core.coll_QMARK_.call(null,form)){
return (new cljs.core.List(null,new cljs.core.Symbol(null,"macroexpand","macroexpand",1509933344,null),(new cljs.core.List(null,(new cljs.core.List(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),(new cljs.core.List(null,form,null,(1),null)),(2),null)),null,(1),null)),(2),null));
} else {
return form;
}
});
eval_soup.core.add_timeout_reset = (function eval_soup$core$add_timeout_reset(form){
return (new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",1686842252,null),(new cljs.core.List(null,cljs.core.list(new cljs.core.Symbol("cljs.user","ps-reset-timeout!","cljs.user/ps-reset-timeout!",-1629160217,null)),(new cljs.core.List(null,form,null,(1),null)),(2),null)),(3),null));
});
eval_soup.core.add_timeout_checks = (function eval_soup$core$add_timeout_checks(timeout,form){
if(((cljs.core.seq_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,form))))){
return form;
} else {
var form__$1 = clojure.walk.walk.call(null,cljs.core.partial.call(null,eval_soup.core.add_timeout_checks,timeout),cljs.core.identity,form);
if(((cljs.core.seq_QMARK_.call(null,form__$1)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"recur","recur",1202958259,null),cljs.core.first.call(null,form__$1))))){
return (new cljs.core.List(null,new cljs.core.Symbol(null,"do","do",1686842252,null),(new cljs.core.List(null,(new cljs.core.List(null,new cljs.core.Symbol("cljs.user","ps-check-for-timeout!","cljs.user/ps-check-for-timeout!",-708791466,null),(new cljs.core.List(null,timeout,null,(1),null)),(2),null)),(new cljs.core.List(null,form__$1,null,(1),null)),(2),null)),(3),null));
} else {
return form__$1;
}
}
});
eval_soup.core.add_timeouts_if_necessary = (function eval_soup$core$add_timeouts_if_necessary(timeout,forms,expanded_forms){
var iter__4434__auto__ = (function eval_soup$core$add_timeouts_if_necessary_$_iter__20479(s__20480){
return (new cljs.core.LazySeq(null,(function (){
var s__20480__$1 = s__20480;
while(true){
var temp__5735__auto__ = cljs.core.seq.call(null,s__20480__$1);
if(temp__5735__auto__){
var s__20480__$2 = temp__5735__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__20480__$2)){
var c__4432__auto__ = cljs.core.chunk_first.call(null,s__20480__$2);
var size__4433__auto__ = cljs.core.count.call(null,c__4432__auto__);
var b__20482 = cljs.core.chunk_buffer.call(null,size__4433__auto__);
if((function (){var i__20481 = (0);
while(true){
if((i__20481 < size__4433__auto__)){
var i = cljs.core._nth.call(null,c__4432__auto__,i__20481);
var expanded_form = cljs.core.get.call(null,expanded_forms,i);
cljs.core.chunk_append.call(null,b__20482,((((cljs.core.coll_QMARK_.call(null,expanded_form)) && (cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.flatten.call(null,expanded_form)),new cljs.core.Symbol(null,"recur","recur",1202958259,null)))))?eval_soup.core.add_timeout_reset.call(null,eval_soup.core.add_timeout_checks.call(null,timeout,expanded_form)):cljs.core.get.call(null,forms,i)));

var G__20483 = (i__20481 + (1));
i__20481 = G__20483;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20482),eval_soup$core$add_timeouts_if_necessary_$_iter__20479.call(null,cljs.core.chunk_rest.call(null,s__20480__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__20482),null);
}
} else {
var i = cljs.core.first.call(null,s__20480__$2);
var expanded_form = cljs.core.get.call(null,expanded_forms,i);
return cljs.core.cons.call(null,((((cljs.core.coll_QMARK_.call(null,expanded_form)) && (cljs.core.contains_QMARK_.call(null,cljs.core.set.call(null,cljs.core.flatten.call(null,expanded_form)),new cljs.core.Symbol(null,"recur","recur",1202958259,null)))))?eval_soup.core.add_timeout_reset.call(null,eval_soup.core.add_timeout_checks.call(null,timeout,expanded_form)):cljs.core.get.call(null,forms,i)),eval_soup$core$add_timeouts_if_necessary_$_iter__20479.call(null,cljs.core.rest.call(null,s__20480__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__4434__auto__.call(null,cljs.core.range.call(null,cljs.core.count.call(null,forms)));
});
if((typeof eval_soup !== 'undefined') && (typeof eval_soup.core !== 'undefined') && (typeof eval_soup.core._STAR_cljs_state !== 'undefined')){
} else {
eval_soup.core._STAR_cljs_state = cljs.js.empty_state.call(null);
}
/**
 * Evaluates each form, providing the results in a callback.
 *   If any of the forms are strings, it will read them first.
 */
eval_soup.core.code__GT_results = (function eval_soup$core$code__GT_results(var_args){
var G__20486 = arguments.length;
switch (G__20486) {
case 2:
return eval_soup.core.code__GT_results.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return eval_soup.core.code__GT_results.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

eval_soup.core.code__GT_results.cljs$core$IFn$_invoke$arity$2 = (function (forms,cb){
return eval_soup.core.code__GT_results.call(null,forms,cb,cljs.core.PersistentArrayMap.EMPTY);
});

eval_soup.core.code__GT_results.cljs$core$IFn$_invoke$arity$3 = (function (forms,cb,p__20487){
var map__20488 = p__20487;
var map__20488__$1 = (((((!((map__20488 == null))))?(((((map__20488.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__20488.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__20488):map__20488);
var opts = map__20488__$1;
var _STAR_current_ns = cljs.core.get.call(null,map__20488__$1,new cljs.core.Keyword(null,"*current-ns","*current-ns",547476271),cljs.core.atom.call(null,new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null)));
var _STAR_state = cljs.core.get.call(null,map__20488__$1,new cljs.core.Keyword(null,"*state","*state",471581315),eval_soup.core._STAR_cljs_state);
var custom_load = cljs.core.get.call(null,map__20488__$1,new cljs.core.Keyword(null,"custom-load","custom-load",-1830353108),eval_soup.core.custom_load_BANG_);
var timeout = cljs.core.get.call(null,map__20488__$1,new cljs.core.Keyword(null,"timeout","timeout",-318625318),(4000));
var disable_timeout_QMARK_ = cljs.core.get.call(null,map__20488__$1,new cljs.core.Keyword(null,"disable-timeout?","disable-timeout?",-760039639),false);
var forms__$1 = cljs.core.mapv.call(null,((function (map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_){
return (function (p1__20484_SHARP_){
if(typeof p1__20484_SHARP_ === 'string'){
return eval_soup.core.str__GT_form.call(null,cljs.core.deref.call(null,_STAR_current_ns),p1__20484_SHARP_);
} else {
return p1__20484_SHARP_;
}
});})(map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_))
,forms);
var init_forms = cljs.core.vec.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"ns","ns",2082130287,null),new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null))], null),(cljs.core.truth_(disable_timeout_QMARK_)?null:new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"def","def",597100991,null),new cljs.core.Symbol(null,"ps-last-time","ps-last-time",101355075,null),cljs.core.list(new cljs.core.Symbol(null,"atom","atom",1243487874,null),(0))),cljs.core.list(new cljs.core.Symbol(null,"defn","defn",-126010802,null),new cljs.core.Symbol(null,"ps-reset-timeout!","ps-reset-timeout!",-155220708,null),cljs.core.PersistentVector.EMPTY,cljs.core.list(new cljs.core.Symbol(null,"reset!","reset!",527275632,null),new cljs.core.Symbol(null,"ps-last-time","ps-last-time",101355075,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",-1048557777,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",384205255,null))))),cljs.core.list(new cljs.core.Symbol(null,"defn","defn",-126010802,null),new cljs.core.Symbol(null,"ps-check-for-timeout!","ps-check-for-timeout!",-317076467,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"timeout","timeout",1321906209,null)], null),cljs.core.list(new cljs.core.Symbol(null,"when","when",1064114221,null),cljs.core.list(new cljs.core.Symbol(null,">",">",1085014381,null),cljs.core.list(new cljs.core.Symbol(null,"-","-",-471816912,null),cljs.core.list(new cljs.core.Symbol(null,".getTime",".getTime",-1048557777,null),cljs.core.list(new cljs.core.Symbol("js","Date.","js/Date.",384205255,null))),cljs.core.list(new cljs.core.Symbol("clojure.core","deref","clojure.core/deref",188719157,null),new cljs.core.Symbol(null,"ps-last-time","ps-last-time",101355075,null))),new cljs.core.Symbol(null,"timeout","timeout",1321906209,null)),cljs.core.list(new cljs.core.Symbol(null,"throw","throw",595905694,null),cljs.core.list(new cljs.core.Symbol("js","Error.","js/Error.",750655924,null),"Execution timed out."))))], null)),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.list(new cljs.core.Symbol(null,"set!","set!",250714521,null),new cljs.core.Symbol(null,"*print-err-fn*","*print-err-fn*",1241679298,null),cljs.core.list(new cljs.core.Symbol(null,"fn","fn",465265323,null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"_","_",-1201019570,null)], null))),(new cljs.core.List(null,new cljs.core.Symbol(null,"ns","ns",2082130287,null),(new cljs.core.List(null,cljs.core.deref.call(null,_STAR_current_ns),null,(1),null)),(2),null))], null)));
var timeout_cb = ((function (forms__$1,init_forms,map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_){
return (function (results){
return eval_soup.core.eval_forms.call(null,eval_soup.core.add_timeouts_if_necessary.call(null,timeout,forms__$1,results),cb,_STAR_state,_STAR_current_ns,custom_load);
});})(forms__$1,init_forms,map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_))
;
var init_cb = ((function (forms__$1,init_forms,timeout_cb,map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_){
return (function (results){
return eval_soup.core.eval_forms.call(null,(cljs.core.truth_(disable_timeout_QMARK_)?forms__$1:cljs.core.map.call(null,eval_soup.core.wrap_macroexpand,forms__$1)),(cljs.core.truth_(disable_timeout_QMARK_)?cb:timeout_cb),_STAR_state,_STAR_current_ns,custom_load);
});})(forms__$1,init_forms,timeout_cb,map__20488,map__20488__$1,opts,_STAR_current_ns,_STAR_state,custom_load,timeout,disable_timeout_QMARK_))
;
return eval_soup.core.eval_forms.call(null,init_forms,init_cb,_STAR_state,_STAR_current_ns,custom_load);
});

eval_soup.core.code__GT_results.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=core.js.map
