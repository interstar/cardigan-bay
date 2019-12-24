// Compiled by ClojureScript 1.10.439 {}
goog.provide('clj_ts.client');
goog.require('cljs.core');
goog.require('reagent.core');
goog.require('clojure.string');
goog.require('cljs.core.async');
goog.require('cljs.reader');
goog.require('goog.net.XhrIo');
if((typeof clj_ts !== 'undefined') && (typeof clj_ts.client !== 'undefined') && (typeof clj_ts.client.db !== 'undefined')){
} else {
clj_ts.client.db = reagent.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"current-page","current-page",-101294180),"",new cljs.core.Keyword(null,"current-data","current-data",-2102182813),"",new cljs.core.Keyword(null,"edited-data","edited-data",-1990299431),"",new cljs.core.Keyword(null,"editing","editing",1365491601),false], null));
}
clj_ts.client.load_page_BANG_ = (function clj_ts$client$load_page_BANG_(page_name){
var lcpn = clojure.string.lower_case.call(null,page_name);
goog.net.XhrIo.send(["/clj_ts/view?page=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lcpn)].join(''),((function (lcpn){
return (function (e){
var status = e.target.getStatusText();
var data = e.target.getResponseText().toString();
var page = clj_ts.client.double_bracket_links.call(null,data);
return cljs.core.swap_BANG_.call(null,clj_ts.client.db,cljs.core.assoc,new cljs.core.Keyword(null,"current-data","current-data",-2102182813),cljs.core.str.cljs$core$IFn$_invoke$arity$1(page),new cljs.core.Keyword(null,"current-page","current-page",-101294180),cljs.core.str.cljs$core$IFn$_invoke$arity$1(page_name));
});})(lcpn))
,"GET");

return goog.net.XhrIo.send(["/clj_ts/raw?page=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(lcpn)].join(''),((function (lcpn){
return (function (e){
var status = e.target.getStatusText();
var data = e.target.getResponseText().toString();
cljs.core.swap_BANG_.call(null,clj_ts.client.db,cljs.core.assoc,new cljs.core.Keyword(null,"edited-data","edited-data",-1990299431),data);

return console.log(cljs.core.deref.call(null,clj_ts.client.db));
});})(lcpn))
,"GET");
});
clj_ts.client.generate_form_data = (function clj_ts$client$generate_form_data(params){
var form_data = (new FormData());
var seq__22162_22172 = cljs.core.seq.call(null,params);
var chunk__22163_22173 = null;
var count__22164_22174 = (0);
var i__22165_22175 = (0);
while(true){
if((i__22165_22175 < count__22164_22174)){
var vec__22166_22176 = cljs.core._nth.call(null,chunk__22163_22173,i__22165_22175);
var k_22177 = cljs.core.nth.call(null,vec__22166_22176,(0),null);
var v_22178 = cljs.core.nth.call(null,vec__22166_22176,(1),null);
form_data.append(cljs.core.name.call(null,k_22177),v_22178);


var G__22179 = seq__22162_22172;
var G__22180 = chunk__22163_22173;
var G__22181 = count__22164_22174;
var G__22182 = (i__22165_22175 + (1));
seq__22162_22172 = G__22179;
chunk__22163_22173 = G__22180;
count__22164_22174 = G__22181;
i__22165_22175 = G__22182;
continue;
} else {
var temp__5735__auto___22183 = cljs.core.seq.call(null,seq__22162_22172);
if(temp__5735__auto___22183){
var seq__22162_22184__$1 = temp__5735__auto___22183;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__22162_22184__$1)){
var c__4461__auto___22185 = cljs.core.chunk_first.call(null,seq__22162_22184__$1);
var G__22186 = cljs.core.chunk_rest.call(null,seq__22162_22184__$1);
var G__22187 = c__4461__auto___22185;
var G__22188 = cljs.core.count.call(null,c__4461__auto___22185);
var G__22189 = (0);
seq__22162_22172 = G__22186;
chunk__22163_22173 = G__22187;
count__22164_22174 = G__22188;
i__22165_22175 = G__22189;
continue;
} else {
var vec__22169_22190 = cljs.core.first.call(null,seq__22162_22184__$1);
var k_22191 = cljs.core.nth.call(null,vec__22169_22190,(0),null);
var v_22192 = cljs.core.nth.call(null,vec__22169_22190,(1),null);
form_data.append(cljs.core.name.call(null,k_22191),v_22192);


var G__22193 = cljs.core.next.call(null,seq__22162_22184__$1);
var G__22194 = null;
var G__22195 = (0);
var G__22196 = (0);
seq__22162_22172 = G__22193;
chunk__22163_22173 = G__22194;
count__22164_22174 = G__22195;
i__22165_22175 = G__22196;
continue;
}
} else {
}
}
break;
}

return form_data;
});
clj_ts.client.save_page_BANG_ = (function clj_ts$client$save_page_BANG_(){
var page_name = new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db));
var new_data = document.getElementById("edit-field").value;
var form_data = clj_ts.client.generate_form_data.call(null,new cljs.core.PersistentArrayMap(null, 2, ["page",page_name,"data",new_data], null));
return goog.net.XhrIo.send("/clj_ts/save",((function (page_name,new_data,form_data){
return (function (e){
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__,page_name,new_data,form_data){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__,page_name,new_data,form_data){
return (function (state_22203){
var state_val_22204 = (state_22203[(1)]);
if((state_val_22204 === (1))){
var inst_22197 = cljs.core.async.timeout.call(null,(1000));
var state_22203__$1 = state_22203;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_22203__$1,(2),inst_22197);
} else {
if((state_val_22204 === (2))){
var inst_22199 = (state_22203[(2)]);
var inst_22200 = clj_ts.client.load_page_BANG_.call(null,page_name);
var inst_22201 = reagent.core.force_update_all.call(null);
var state_22203__$1 = (function (){var statearr_22205 = state_22203;
(statearr_22205[(7)] = inst_22200);

(statearr_22205[(8)] = inst_22199);

return statearr_22205;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_22203__$1,inst_22201);
} else {
return null;
}
}
});})(c__18335__auto__,page_name,new_data,form_data))
;
return ((function (switch__18240__auto__,c__18335__auto__,page_name,new_data,form_data){
return (function() {
var clj_ts$client$save_page_BANG__$_state_machine__18241__auto__ = null;
var clj_ts$client$save_page_BANG__$_state_machine__18241__auto____0 = (function (){
var statearr_22206 = [null,null,null,null,null,null,null,null,null];
(statearr_22206[(0)] = clj_ts$client$save_page_BANG__$_state_machine__18241__auto__);

(statearr_22206[(1)] = (1));

return statearr_22206;
});
var clj_ts$client$save_page_BANG__$_state_machine__18241__auto____1 = (function (state_22203){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_22203);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e22207){if((e22207 instanceof Object)){
var ex__18244__auto__ = e22207;
var statearr_22208_22210 = state_22203;
(statearr_22208_22210[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_22203);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e22207;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__22211 = state_22203;
state_22203 = G__22211;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
clj_ts$client$save_page_BANG__$_state_machine__18241__auto__ = function(state_22203){
switch(arguments.length){
case 0:
return clj_ts$client$save_page_BANG__$_state_machine__18241__auto____0.call(this);
case 1:
return clj_ts$client$save_page_BANG__$_state_machine__18241__auto____1.call(this,state_22203);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
clj_ts$client$save_page_BANG__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = clj_ts$client$save_page_BANG__$_state_machine__18241__auto____0;
clj_ts$client$save_page_BANG__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = clj_ts$client$save_page_BANG__$_state_machine__18241__auto____1;
return clj_ts$client$save_page_BANG__$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__,page_name,new_data,form_data))
})();
var state__18337__auto__ = (function (){var statearr_22209 = f__18336__auto__.call(null);
(statearr_22209[(6)] = c__18335__auto__);

return statearr_22209;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__,page_name,new_data,form_data))
);

return c__18335__auto__;
});})(page_name,new_data,form_data))
,"POST",cljs.core.pr_str.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"page","page",849072397),page_name,new cljs.core.Keyword(null,"data","data",-232669377),new_data], null)));
});
clj_ts.client.load_page_BANG_.call(null,"HelloWorld");
clj_ts.client.double_bracket_links = (function clj_ts$client$double_bracket_links(page){
return clojure.string.replace.call(null,page,/\[\[(.+?)\]\]/,"<span class=\"wikilink\" data=\"$1\" >$1</span>");
});
clj_ts.client.nav_input = (function clj_ts$client$nav_input(value){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"input","input",556931961),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"text",new cljs.core.Keyword(null,"value","value",305978217),cljs.core.deref.call(null,value),new cljs.core.Keyword(null,"on-change","on-change",-732046149),(function (p1__22212_SHARP_){
return cljs.core.reset_BANG_.call(null,value,p1__22212_SHARP_.target.value);
})], null)], null);
});
clj_ts.client.nav_bar = (function clj_ts$client$nav_bar(){
var current = reagent.core.atom.call(null,"ThoughtStorms");
return ((function (current){
return (function (){
var editing = new cljs.core.Keyword(null,"editing","editing",1365491601).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db));
return new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"a","a",-2123407586),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing,current){
return (function (){
return clj_ts.client.load_page_BANG_.call(null,"HelloWorld");
});})(editing,current))
], null),"HelloWorld"], null)," | ",new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj_ts.client.nav_input,current], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing,current){
return (function (){
return clj_ts.client.load_page_BANG_.call(null,cljs.core.deref.call(null,current));
});})(editing,current))
], null),">"], null)," | ",(cljs.core.truth_(editing)?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing,current){
return (function (){
cljs.core.swap_BANG_.call(null,clj_ts.client.db,cljs.core.assoc,new cljs.core.Keyword(null,"editing","editing",1365491601),cljs.core.not.call(null,editing));

return clj_ts.client.load_page_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db)));
});})(editing,current))
], null),"Cancel"], null),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing,current){
return (function (){
cljs.core.swap_BANG_.call(null,clj_ts.client.db,cljs.core.assoc,new cljs.core.Keyword(null,"editing","editing",1365491601),cljs.core.not.call(null,editing));

clj_ts.client.save_page_BANG_.call(null);

return clj_ts.client.load_page_BANG_.call(null,new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db)));
});})(editing,current))
], null),"Save"], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"button","button",1456579943),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),((function (editing,current){
return (function (){
return cljs.core.swap_BANG_.call(null,clj_ts.client.db,cljs.core.assoc,new cljs.core.Keyword(null,"editing","editing",1365491601),cljs.core.not.call(null,editing));
});})(editing,current))
], null),"Edit"], null)], null))], null);
});
;})(current))
});
clj_ts.client.main_container = (function clj_ts$client$main_container(){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"class","class",-2030961996),"main-container"], null),(cljs.core.truth_(new cljs.core.Keyword(null,"editing","editing",1365491601).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"textarea","textarea",-650375824),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"id","id",-1388402092),"edit-field",new cljs.core.Keyword(null,"cols","cols",-1914801295),(80),new cljs.core.Keyword(null,"rows","rows",850049680),(40)], null),new cljs.core.Keyword(null,"edited-data","edited-data",-1990299431).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db))], null)], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"on-click","on-click",1632826543),(function (e){
var tag = e.target;
var classname = tag.getAttribute("class");
var data = tag.getAttribute("data");
var x = new cljs.core.Keyword(null,"dirty","dirty",729553281).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db));
if(cljs.core._EQ_.call(null,classname,"wikilink")){
return clj_ts.client.load_page_BANG_.call(null,data);
} else {
return null;
}
}),new cljs.core.Keyword(null,"dangerouslySetInnerHTML","dangerouslySetInnerHTML",-554971138),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"__html","__html",674048345),new cljs.core.Keyword(null,"current-data","current-data",-2102182813).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db))], null)], null)], null))], null);
});
clj_ts.client.content = (function clj_ts$client$content(){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"h2","h2",-372662728),new cljs.core.Keyword(null,"current-page","current-page",-101294180).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,clj_ts.client.db))], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"div","div",1057191632),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj_ts.client.nav_bar], null)], null),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj_ts.client.main_container], null)], null)], null);
});
reagent.core.render_component.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [clj_ts.client.content], null),document.querySelector("#app"));

//# sourceMappingURL=client.js.map
