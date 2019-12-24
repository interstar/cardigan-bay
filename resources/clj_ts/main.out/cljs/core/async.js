// Compiled by ClojureScript 1.10.439 {}
goog.provide('cljs.core.async');
goog.require('cljs.core');
goog.require('cljs.core.async.impl.protocols');
goog.require('cljs.core.async.impl.channels');
goog.require('cljs.core.async.impl.buffers');
goog.require('cljs.core.async.impl.timers');
goog.require('cljs.core.async.impl.dispatch');
goog.require('cljs.core.async.impl.ioc_helpers');
cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__18395 = arguments.length;
switch (G__18395) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.call(null,f,true);
});

cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18396 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18396 = (function (f,blockable,meta18397){
this.f = f;
this.blockable = blockable;
this.meta18397 = meta18397;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18398,meta18397__$1){
var self__ = this;
var _18398__$1 = this;
return (new cljs.core.async.t_cljs$core$async18396(self__.f,self__.blockable,meta18397__$1));
});

cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18398){
var self__ = this;
var _18398__$1 = this;
return self__.meta18397;
});

cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
});

cljs.core.async.t_cljs$core$async18396.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
});

cljs.core.async.t_cljs$core$async18396.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta18397","meta18397",83828382,null)], null);
});

cljs.core.async.t_cljs$core$async18396.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18396.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18396";

cljs.core.async.t_cljs$core$async18396.cljs$lang$ctorPrWriter = (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async18396");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18396.
 */
cljs.core.async.__GT_t_cljs$core$async18396 = (function cljs$core$async$__GT_t_cljs$core$async18396(f__$1,blockable__$1,meta18397){
return (new cljs.core.async.t_cljs$core$async18396(f__$1,blockable__$1,meta18397));
});

}

return (new cljs.core.async.t_cljs$core$async18396(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
});

cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2;

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer.call(null,n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer.call(null,n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_.call(null,cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__18402 = arguments.length;
switch (G__18402) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.call(null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.call(null,buf_or_n,null,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.call(null,buf_or_n,xform,null);
});

cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.call(null,buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.call(null,((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer.call(null,buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
});

cljs.core.async.chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed. See chan for the semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__18405 = arguments.length;
switch (G__18405) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.call(null,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.call(null,xform,null);
});

cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.call(null,cljs.core.async.impl.buffers.promise_buffer.call(null),xform,ex_handler);
});

cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout.call(null,msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__18408 = arguments.length;
switch (G__18408) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.call(null,port,fn1,true);
});

cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(ret)){
var val_18410 = cljs.core.deref.call(null,ret);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,val_18410);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (val_18410,ret){
return (function (){
return fn1.call(null,val_18410);
});})(val_18410,ret))
);
}
} else {
}

return null;
});

cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3;

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.call(null,cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__18412 = arguments.length;
switch (G__18412) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5733__auto__)){
var ret = temp__5733__auto__;
return cljs.core.deref.call(null,ret);
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.call(null,port,val,fn1,true);
});

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5733__auto__ = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,fn1));
if(cljs.core.truth_(temp__5733__auto__)){
var retb = temp__5733__auto__;
var ret = cljs.core.deref.call(null,retb);
if(cljs.core.truth_(on_caller_QMARK_)){
fn1.call(null,ret);
} else {
cljs.core.async.impl.dispatch.run.call(null,((function (ret,retb,temp__5733__auto__){
return (function (){
return fn1.call(null,ret);
});})(ret,retb,temp__5733__auto__))
);
}

return ret;
} else {
return true;
}
});

cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4;

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_.call(null,port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__4518__auto___18414 = n;
var x_18415 = (0);
while(true){
if((x_18415 < n__4518__auto___18414)){
(a[x_18415] = (0));

var G__18416 = (x_18415 + (1));
x_18415 = G__18416;
continue;
} else {
}
break;
}

var i = (1);
while(true){
if(cljs.core._EQ_.call(null,i,n)){
return a;
} else {
var j = cljs.core.rand_int.call(null,i);
(a[i] = (a[j]));

(a[j] = i);

var G__18417 = (i + (1));
i = G__18417;
continue;
}
break;
}
});
cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.call(null,true);
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18418 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18418 = (function (flag,meta18419){
this.flag = flag;
this.meta18419 = meta18419;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (flag){
return (function (_18420,meta18419__$1){
var self__ = this;
var _18420__$1 = this;
return (new cljs.core.async.t_cljs$core$async18418(self__.flag,meta18419__$1));
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (flag){
return (function (_18420){
var self__ = this;
var _18420__$1 = this;
return self__.meta18419;
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref.call(null,self__.flag);
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (flag){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.flag,null);

return true;
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.getBasis = ((function (flag){
return (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta18419","meta18419",-104393310,null)], null);
});})(flag))
;

cljs.core.async.t_cljs$core$async18418.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18418.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18418";

cljs.core.async.t_cljs$core$async18418.cljs$lang$ctorPrWriter = ((function (flag){
return (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async18418");
});})(flag))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18418.
 */
cljs.core.async.__GT_t_cljs$core$async18418 = ((function (flag){
return (function cljs$core$async$alt_flag_$___GT_t_cljs$core$async18418(flag__$1,meta18419){
return (new cljs.core.async.t_cljs$core$async18418(flag__$1,meta18419));
});})(flag))
;

}

return (new cljs.core.async.t_cljs$core$async18418(flag,cljs.core.PersistentArrayMap.EMPTY));
});
cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18421 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18421 = (function (flag,cb,meta18422){
this.flag = flag;
this.cb = cb;
this.meta18422 = meta18422;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_18423,meta18422__$1){
var self__ = this;
var _18423__$1 = this;
return (new cljs.core.async.t_cljs$core$async18421(self__.flag,self__.cb,meta18422__$1));
});

cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_18423){
var self__ = this;
var _18423__$1 = this;
return self__.meta18422;
});

cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.flag);
});

cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
});

cljs.core.async.t_cljs$core$async18421.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit.call(null,self__.flag);

return self__.cb;
});

cljs.core.async.t_cljs$core$async18421.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta18422","meta18422",-476561158,null)], null);
});

cljs.core.async.t_cljs$core$async18421.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18421.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18421";

cljs.core.async.t_cljs$core$async18421.cljs$lang$ctorPrWriter = (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async18421");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18421.
 */
cljs.core.async.__GT_t_cljs$core$async18421 = (function cljs$core$async$alt_handler_$___GT_t_cljs$core$async18421(flag__$1,cb__$1,meta18422){
return (new cljs.core.async.t_cljs$core$async18421(flag__$1,cb__$1,meta18422));
});

}

return (new cljs.core.async.t_cljs$core$async18421(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
var flag = cljs.core.async.alt_flag.call(null);
var n = cljs.core.count.call(null,ports);
var idxs = cljs.core.async.random_array.call(null,n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.call(null,ports,idx);
var wport = ((cljs.core.vector_QMARK_.call(null,port))?port.call(null,(0)):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = port.call(null,(1));
return cljs.core.async.impl.protocols.put_BANG_.call(null,wport,val,cljs.core.async.alt_handler.call(null,flag,((function (i,val,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18424_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18424_SHARP_,wport], null));
});})(i,val,idx,port,wport,flag,n,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.alt_handler.call(null,flag,((function (i,idx,port,wport,flag,n,idxs,priority){
return (function (p1__18425_SHARP_){
return fret.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__18425_SHARP_,port], null));
});})(i,idx,port,wport,flag,n,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,vbox),(function (){var or__4047__auto__ = wport;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return port;
}
})()], null));
} else {
var G__18426 = (i + (1));
i = G__18426;
continue;
}
} else {
return null;
}
break;
}
})();
var or__4047__auto__ = ret;
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
if(cljs.core.contains_QMARK_.call(null,opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5735__auto__ = (function (){var and__4036__auto__ = cljs.core.async.impl.protocols.active_QMARK_.call(null,flag);
if(cljs.core.truth_(and__4036__auto__)){
return cljs.core.async.impl.protocols.commit.call(null,flag);
} else {
return and__4036__auto__;
}
})();
if(cljs.core.truth_(temp__5735__auto__)){
var got = temp__5735__auto__;
return cljs.core.async.impl.channels.box.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__4647__auto__ = [];
var len__4641__auto___18432 = arguments.length;
var i__4642__auto___18433 = (0);
while(true){
if((i__4642__auto___18433 < len__4641__auto___18432)){
args__4647__auto__.push((arguments[i__4642__auto___18433]));

var G__18434 = (i__4642__auto___18433 + (1));
i__4642__auto___18433 = G__18434;
continue;
} else {
}
break;
}

var argseq__4648__auto__ = ((((1) < args__4647__auto__.length))?(new cljs.core.IndexedSeq(args__4647__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__4648__auto__);
});

cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__18429){
var map__18430 = p__18429;
var map__18430__$1 = (((((!((map__18430 == null))))?(((((map__18430.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__18430.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__18430):map__18430);
var opts = map__18430__$1;
throw (new Error("alts! used not in (go ...) block"));
});

cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1);

/** @this {Function} */
cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq18427){
var G__18428 = cljs.core.first.call(null,seq18427);
var seq18427__$1 = cljs.core.next.call(null,seq18427);
var self__4628__auto__ = this;
return self__4628__auto__.cljs$core$IFn$_invoke$arity$variadic(G__18428,seq18427__$1);
});

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_.call(null,port,val,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,port,cljs.core.async.fn_handler.call(null,cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref.call(null,ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__18436 = arguments.length;
switch (G__18436) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.call(null,from,to,true);
});

cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__18335__auto___18482 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___18482){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___18482){
return (function (state_18460){
var state_val_18461 = (state_18460[(1)]);
if((state_val_18461 === (7))){
var inst_18456 = (state_18460[(2)]);
var state_18460__$1 = state_18460;
var statearr_18462_18483 = state_18460__$1;
(statearr_18462_18483[(2)] = inst_18456);

(statearr_18462_18483[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (1))){
var state_18460__$1 = state_18460;
var statearr_18463_18484 = state_18460__$1;
(statearr_18463_18484[(2)] = null);

(statearr_18463_18484[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (4))){
var inst_18439 = (state_18460[(7)]);
var inst_18439__$1 = (state_18460[(2)]);
var inst_18440 = (inst_18439__$1 == null);
var state_18460__$1 = (function (){var statearr_18464 = state_18460;
(statearr_18464[(7)] = inst_18439__$1);

return statearr_18464;
})();
if(cljs.core.truth_(inst_18440)){
var statearr_18465_18485 = state_18460__$1;
(statearr_18465_18485[(1)] = (5));

} else {
var statearr_18466_18486 = state_18460__$1;
(statearr_18466_18486[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (13))){
var state_18460__$1 = state_18460;
var statearr_18467_18487 = state_18460__$1;
(statearr_18467_18487[(2)] = null);

(statearr_18467_18487[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (6))){
var inst_18439 = (state_18460[(7)]);
var state_18460__$1 = state_18460;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18460__$1,(11),to,inst_18439);
} else {
if((state_val_18461 === (3))){
var inst_18458 = (state_18460[(2)]);
var state_18460__$1 = state_18460;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18460__$1,inst_18458);
} else {
if((state_val_18461 === (12))){
var state_18460__$1 = state_18460;
var statearr_18468_18488 = state_18460__$1;
(statearr_18468_18488[(2)] = null);

(statearr_18468_18488[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (2))){
var state_18460__$1 = state_18460;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18460__$1,(4),from);
} else {
if((state_val_18461 === (11))){
var inst_18449 = (state_18460[(2)]);
var state_18460__$1 = state_18460;
if(cljs.core.truth_(inst_18449)){
var statearr_18469_18489 = state_18460__$1;
(statearr_18469_18489[(1)] = (12));

} else {
var statearr_18470_18490 = state_18460__$1;
(statearr_18470_18490[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (9))){
var state_18460__$1 = state_18460;
var statearr_18471_18491 = state_18460__$1;
(statearr_18471_18491[(2)] = null);

(statearr_18471_18491[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (5))){
var state_18460__$1 = state_18460;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18472_18492 = state_18460__$1;
(statearr_18472_18492[(1)] = (8));

} else {
var statearr_18473_18493 = state_18460__$1;
(statearr_18473_18493[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (14))){
var inst_18454 = (state_18460[(2)]);
var state_18460__$1 = state_18460;
var statearr_18474_18494 = state_18460__$1;
(statearr_18474_18494[(2)] = inst_18454);

(statearr_18474_18494[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (10))){
var inst_18446 = (state_18460[(2)]);
var state_18460__$1 = state_18460;
var statearr_18475_18495 = state_18460__$1;
(statearr_18475_18495[(2)] = inst_18446);

(statearr_18475_18495[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18461 === (8))){
var inst_18443 = cljs.core.async.close_BANG_.call(null,to);
var state_18460__$1 = state_18460;
var statearr_18476_18496 = state_18460__$1;
(statearr_18476_18496[(2)] = inst_18443);

(statearr_18476_18496[(1)] = (10));


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
});})(c__18335__auto___18482))
;
return ((function (switch__18240__auto__,c__18335__auto___18482){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_18477 = [null,null,null,null,null,null,null,null];
(statearr_18477[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_18477[(1)] = (1));

return statearr_18477;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_18460){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18460);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18478){if((e18478 instanceof Object)){
var ex__18244__auto__ = e18478;
var statearr_18479_18497 = state_18460;
(statearr_18479_18497[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18460);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18478;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18498 = state_18460;
state_18460 = G__18498;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_18460){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_18460);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___18482))
})();
var state__18337__auto__ = (function (){var statearr_18480 = f__18336__auto__.call(null);
(statearr_18480[(6)] = c__18335__auto___18482);

return statearr_18480;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___18482))
);


return to;
});

cljs.core.async.pipe.cljs$lang$maxFixedArity = 3;

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.call(null,n);
var results = cljs.core.async.chan.call(null,n);
var process = ((function (jobs,results){
return (function (p__18499){
var vec__18500 = p__18499;
var v = cljs.core.nth.call(null,vec__18500,(0),null);
var p = cljs.core.nth.call(null,vec__18500,(1),null);
var job = vec__18500;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1),xf,ex_handler);
var c__18335__auto___18671 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results){
return (function (state_18507){
var state_val_18508 = (state_18507[(1)]);
if((state_val_18508 === (1))){
var state_18507__$1 = state_18507;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18507__$1,(2),res,v);
} else {
if((state_val_18508 === (2))){
var inst_18504 = (state_18507[(2)]);
var inst_18505 = cljs.core.async.close_BANG_.call(null,res);
var state_18507__$1 = (function (){var statearr_18509 = state_18507;
(statearr_18509[(7)] = inst_18504);

return statearr_18509;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18507__$1,inst_18505);
} else {
return null;
}
}
});})(c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results))
;
return ((function (switch__18240__auto__,c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_18510 = [null,null,null,null,null,null,null,null];
(statearr_18510[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__);

(statearr_18510[(1)] = (1));

return statearr_18510;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1 = (function (state_18507){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18507);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18511){if((e18511 instanceof Object)){
var ex__18244__auto__ = e18511;
var statearr_18512_18672 = state_18507;
(statearr_18512_18672[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18507);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18511;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18673 = state_18507;
state_18507 = G__18673;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = function(state_18507){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1.call(this,state_18507);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results))
})();
var state__18337__auto__ = (function (){var statearr_18513 = f__18336__auto__.call(null);
(statearr_18513[(6)] = c__18335__auto___18671);

return statearr_18513;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___18671,res,vec__18500,v,p,job,jobs,results))
);


cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results))
;
var async = ((function (jobs,results,process){
return (function (p__18514){
var vec__18515 = p__18514;
var v = cljs.core.nth.call(null,vec__18515,(0),null);
var p = cljs.core.nth.call(null,vec__18515,(1),null);
var job = vec__18515;
if((job == null)){
cljs.core.async.close_BANG_.call(null,results);

return null;
} else {
var res = cljs.core.async.chan.call(null,(1));
xf.call(null,v,res);

cljs.core.async.put_BANG_.call(null,p,res);

return true;
}
});})(jobs,results,process))
;
var n__4518__auto___18674 = n;
var __18675 = (0);
while(true){
if((__18675 < n__4518__auto___18674)){
var G__18518_18676 = type;
var G__18518_18677__$1 = (((G__18518_18676 instanceof cljs.core.Keyword))?G__18518_18676.fqn:null);
switch (G__18518_18677__$1) {
case "compute":
var c__18335__auto___18679 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__18675,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (__18675,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function (state_18531){
var state_val_18532 = (state_18531[(1)]);
if((state_val_18532 === (1))){
var state_18531__$1 = state_18531;
var statearr_18533_18680 = state_18531__$1;
(statearr_18533_18680[(2)] = null);

(statearr_18533_18680[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18532 === (2))){
var state_18531__$1 = state_18531;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18531__$1,(4),jobs);
} else {
if((state_val_18532 === (3))){
var inst_18529 = (state_18531[(2)]);
var state_18531__$1 = state_18531;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18531__$1,inst_18529);
} else {
if((state_val_18532 === (4))){
var inst_18521 = (state_18531[(2)]);
var inst_18522 = process.call(null,inst_18521);
var state_18531__$1 = state_18531;
if(cljs.core.truth_(inst_18522)){
var statearr_18534_18681 = state_18531__$1;
(statearr_18534_18681[(1)] = (5));

} else {
var statearr_18535_18682 = state_18531__$1;
(statearr_18535_18682[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18532 === (5))){
var state_18531__$1 = state_18531;
var statearr_18536_18683 = state_18531__$1;
(statearr_18536_18683[(2)] = null);

(statearr_18536_18683[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18532 === (6))){
var state_18531__$1 = state_18531;
var statearr_18537_18684 = state_18531__$1;
(statearr_18537_18684[(2)] = null);

(statearr_18537_18684[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18532 === (7))){
var inst_18527 = (state_18531[(2)]);
var state_18531__$1 = state_18531;
var statearr_18538_18685 = state_18531__$1;
(statearr_18538_18685[(2)] = inst_18527);

(statearr_18538_18685[(1)] = (3));


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
});})(__18675,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
;
return ((function (__18675,switch__18240__auto__,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_18539 = [null,null,null,null,null,null,null];
(statearr_18539[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__);

(statearr_18539[(1)] = (1));

return statearr_18539;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1 = (function (state_18531){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18531);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18540){if((e18540 instanceof Object)){
var ex__18244__auto__ = e18540;
var statearr_18541_18686 = state_18531;
(statearr_18541_18686[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18531);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18540;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18687 = state_18531;
state_18531 = G__18687;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = function(state_18531){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1.call(this,state_18531);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__;
})()
;})(__18675,switch__18240__auto__,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
})();
var state__18337__auto__ = (function (){var statearr_18542 = f__18336__auto__.call(null);
(statearr_18542[(6)] = c__18335__auto___18679);

return statearr_18542;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(__18675,c__18335__auto___18679,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
);


break;
case "async":
var c__18335__auto___18688 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (__18675,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (__18675,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function (state_18555){
var state_val_18556 = (state_18555[(1)]);
if((state_val_18556 === (1))){
var state_18555__$1 = state_18555;
var statearr_18557_18689 = state_18555__$1;
(statearr_18557_18689[(2)] = null);

(statearr_18557_18689[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18556 === (2))){
var state_18555__$1 = state_18555;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18555__$1,(4),jobs);
} else {
if((state_val_18556 === (3))){
var inst_18553 = (state_18555[(2)]);
var state_18555__$1 = state_18555;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18555__$1,inst_18553);
} else {
if((state_val_18556 === (4))){
var inst_18545 = (state_18555[(2)]);
var inst_18546 = async.call(null,inst_18545);
var state_18555__$1 = state_18555;
if(cljs.core.truth_(inst_18546)){
var statearr_18558_18690 = state_18555__$1;
(statearr_18558_18690[(1)] = (5));

} else {
var statearr_18559_18691 = state_18555__$1;
(statearr_18559_18691[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18556 === (5))){
var state_18555__$1 = state_18555;
var statearr_18560_18692 = state_18555__$1;
(statearr_18560_18692[(2)] = null);

(statearr_18560_18692[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18556 === (6))){
var state_18555__$1 = state_18555;
var statearr_18561_18693 = state_18555__$1;
(statearr_18561_18693[(2)] = null);

(statearr_18561_18693[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18556 === (7))){
var inst_18551 = (state_18555[(2)]);
var state_18555__$1 = state_18555;
var statearr_18562_18694 = state_18555__$1;
(statearr_18562_18694[(2)] = inst_18551);

(statearr_18562_18694[(1)] = (3));


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
});})(__18675,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
;
return ((function (__18675,switch__18240__auto__,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_18563 = [null,null,null,null,null,null,null];
(statearr_18563[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__);

(statearr_18563[(1)] = (1));

return statearr_18563;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1 = (function (state_18555){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18555);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18564){if((e18564 instanceof Object)){
var ex__18244__auto__ = e18564;
var statearr_18565_18695 = state_18555;
(statearr_18565_18695[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18555);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18564;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18696 = state_18555;
state_18555 = G__18696;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = function(state_18555){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1.call(this,state_18555);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__;
})()
;})(__18675,switch__18240__auto__,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
})();
var state__18337__auto__ = (function (){var statearr_18566 = f__18336__auto__.call(null);
(statearr_18566[(6)] = c__18335__auto___18688);

return statearr_18566;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(__18675,c__18335__auto___18688,G__18518_18676,G__18518_18677__$1,n__4518__auto___18674,jobs,results,process,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__18518_18677__$1)].join('')));

}

var G__18697 = (__18675 + (1));
__18675 = G__18697;
continue;
} else {
}
break;
}

var c__18335__auto___18698 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___18698,jobs,results,process,async){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___18698,jobs,results,process,async){
return (function (state_18588){
var state_val_18589 = (state_18588[(1)]);
if((state_val_18589 === (7))){
var inst_18584 = (state_18588[(2)]);
var state_18588__$1 = state_18588;
var statearr_18590_18699 = state_18588__$1;
(statearr_18590_18699[(2)] = inst_18584);

(statearr_18590_18699[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18589 === (1))){
var state_18588__$1 = state_18588;
var statearr_18591_18700 = state_18588__$1;
(statearr_18591_18700[(2)] = null);

(statearr_18591_18700[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18589 === (4))){
var inst_18569 = (state_18588[(7)]);
var inst_18569__$1 = (state_18588[(2)]);
var inst_18570 = (inst_18569__$1 == null);
var state_18588__$1 = (function (){var statearr_18592 = state_18588;
(statearr_18592[(7)] = inst_18569__$1);

return statearr_18592;
})();
if(cljs.core.truth_(inst_18570)){
var statearr_18593_18701 = state_18588__$1;
(statearr_18593_18701[(1)] = (5));

} else {
var statearr_18594_18702 = state_18588__$1;
(statearr_18594_18702[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18589 === (6))){
var inst_18574 = (state_18588[(8)]);
var inst_18569 = (state_18588[(7)]);
var inst_18574__$1 = cljs.core.async.chan.call(null,(1));
var inst_18575 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_18576 = [inst_18569,inst_18574__$1];
var inst_18577 = (new cljs.core.PersistentVector(null,2,(5),inst_18575,inst_18576,null));
var state_18588__$1 = (function (){var statearr_18595 = state_18588;
(statearr_18595[(8)] = inst_18574__$1);

return statearr_18595;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18588__$1,(8),jobs,inst_18577);
} else {
if((state_val_18589 === (3))){
var inst_18586 = (state_18588[(2)]);
var state_18588__$1 = state_18588;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18588__$1,inst_18586);
} else {
if((state_val_18589 === (2))){
var state_18588__$1 = state_18588;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18588__$1,(4),from);
} else {
if((state_val_18589 === (9))){
var inst_18581 = (state_18588[(2)]);
var state_18588__$1 = (function (){var statearr_18596 = state_18588;
(statearr_18596[(9)] = inst_18581);

return statearr_18596;
})();
var statearr_18597_18703 = state_18588__$1;
(statearr_18597_18703[(2)] = null);

(statearr_18597_18703[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18589 === (5))){
var inst_18572 = cljs.core.async.close_BANG_.call(null,jobs);
var state_18588__$1 = state_18588;
var statearr_18598_18704 = state_18588__$1;
(statearr_18598_18704[(2)] = inst_18572);

(statearr_18598_18704[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18589 === (8))){
var inst_18574 = (state_18588[(8)]);
var inst_18579 = (state_18588[(2)]);
var state_18588__$1 = (function (){var statearr_18599 = state_18588;
(statearr_18599[(10)] = inst_18579);

return statearr_18599;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18588__$1,(9),results,inst_18574);
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
});})(c__18335__auto___18698,jobs,results,process,async))
;
return ((function (switch__18240__auto__,c__18335__auto___18698,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_18600 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_18600[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__);

(statearr_18600[(1)] = (1));

return statearr_18600;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1 = (function (state_18588){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18588);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18601){if((e18601 instanceof Object)){
var ex__18244__auto__ = e18601;
var statearr_18602_18705 = state_18588;
(statearr_18602_18705[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18588);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18601;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18706 = state_18588;
state_18588 = G__18706;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = function(state_18588){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1.call(this,state_18588);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___18698,jobs,results,process,async))
})();
var state__18337__auto__ = (function (){var statearr_18603 = f__18336__auto__.call(null);
(statearr_18603[(6)] = c__18335__auto___18698);

return statearr_18603;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___18698,jobs,results,process,async))
);


var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__,jobs,results,process,async){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__,jobs,results,process,async){
return (function (state_18641){
var state_val_18642 = (state_18641[(1)]);
if((state_val_18642 === (7))){
var inst_18637 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
var statearr_18643_18707 = state_18641__$1;
(statearr_18643_18707[(2)] = inst_18637);

(statearr_18643_18707[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (20))){
var state_18641__$1 = state_18641;
var statearr_18644_18708 = state_18641__$1;
(statearr_18644_18708[(2)] = null);

(statearr_18644_18708[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (1))){
var state_18641__$1 = state_18641;
var statearr_18645_18709 = state_18641__$1;
(statearr_18645_18709[(2)] = null);

(statearr_18645_18709[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (4))){
var inst_18606 = (state_18641[(7)]);
var inst_18606__$1 = (state_18641[(2)]);
var inst_18607 = (inst_18606__$1 == null);
var state_18641__$1 = (function (){var statearr_18646 = state_18641;
(statearr_18646[(7)] = inst_18606__$1);

return statearr_18646;
})();
if(cljs.core.truth_(inst_18607)){
var statearr_18647_18710 = state_18641__$1;
(statearr_18647_18710[(1)] = (5));

} else {
var statearr_18648_18711 = state_18641__$1;
(statearr_18648_18711[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (15))){
var inst_18619 = (state_18641[(8)]);
var state_18641__$1 = state_18641;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18641__$1,(18),to,inst_18619);
} else {
if((state_val_18642 === (21))){
var inst_18632 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
var statearr_18649_18712 = state_18641__$1;
(statearr_18649_18712[(2)] = inst_18632);

(statearr_18649_18712[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (13))){
var inst_18634 = (state_18641[(2)]);
var state_18641__$1 = (function (){var statearr_18650 = state_18641;
(statearr_18650[(9)] = inst_18634);

return statearr_18650;
})();
var statearr_18651_18713 = state_18641__$1;
(statearr_18651_18713[(2)] = null);

(statearr_18651_18713[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (6))){
var inst_18606 = (state_18641[(7)]);
var state_18641__$1 = state_18641;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18641__$1,(11),inst_18606);
} else {
if((state_val_18642 === (17))){
var inst_18627 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
if(cljs.core.truth_(inst_18627)){
var statearr_18652_18714 = state_18641__$1;
(statearr_18652_18714[(1)] = (19));

} else {
var statearr_18653_18715 = state_18641__$1;
(statearr_18653_18715[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (3))){
var inst_18639 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18641__$1,inst_18639);
} else {
if((state_val_18642 === (12))){
var inst_18616 = (state_18641[(10)]);
var state_18641__$1 = state_18641;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18641__$1,(14),inst_18616);
} else {
if((state_val_18642 === (2))){
var state_18641__$1 = state_18641;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18641__$1,(4),results);
} else {
if((state_val_18642 === (19))){
var state_18641__$1 = state_18641;
var statearr_18654_18716 = state_18641__$1;
(statearr_18654_18716[(2)] = null);

(statearr_18654_18716[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (11))){
var inst_18616 = (state_18641[(2)]);
var state_18641__$1 = (function (){var statearr_18655 = state_18641;
(statearr_18655[(10)] = inst_18616);

return statearr_18655;
})();
var statearr_18656_18717 = state_18641__$1;
(statearr_18656_18717[(2)] = null);

(statearr_18656_18717[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (9))){
var state_18641__$1 = state_18641;
var statearr_18657_18718 = state_18641__$1;
(statearr_18657_18718[(2)] = null);

(statearr_18657_18718[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (5))){
var state_18641__$1 = state_18641;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18658_18719 = state_18641__$1;
(statearr_18658_18719[(1)] = (8));

} else {
var statearr_18659_18720 = state_18641__$1;
(statearr_18659_18720[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (14))){
var inst_18621 = (state_18641[(11)]);
var inst_18619 = (state_18641[(8)]);
var inst_18619__$1 = (state_18641[(2)]);
var inst_18620 = (inst_18619__$1 == null);
var inst_18621__$1 = cljs.core.not.call(null,inst_18620);
var state_18641__$1 = (function (){var statearr_18660 = state_18641;
(statearr_18660[(11)] = inst_18621__$1);

(statearr_18660[(8)] = inst_18619__$1);

return statearr_18660;
})();
if(inst_18621__$1){
var statearr_18661_18721 = state_18641__$1;
(statearr_18661_18721[(1)] = (15));

} else {
var statearr_18662_18722 = state_18641__$1;
(statearr_18662_18722[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (16))){
var inst_18621 = (state_18641[(11)]);
var state_18641__$1 = state_18641;
var statearr_18663_18723 = state_18641__$1;
(statearr_18663_18723[(2)] = inst_18621);

(statearr_18663_18723[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (10))){
var inst_18613 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
var statearr_18664_18724 = state_18641__$1;
(statearr_18664_18724[(2)] = inst_18613);

(statearr_18664_18724[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (18))){
var inst_18624 = (state_18641[(2)]);
var state_18641__$1 = state_18641;
var statearr_18665_18725 = state_18641__$1;
(statearr_18665_18725[(2)] = inst_18624);

(statearr_18665_18725[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18642 === (8))){
var inst_18610 = cljs.core.async.close_BANG_.call(null,to);
var state_18641__$1 = state_18641;
var statearr_18666_18726 = state_18641__$1;
(statearr_18666_18726[(2)] = inst_18610);

(statearr_18666_18726[(1)] = (10));


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
});})(c__18335__auto__,jobs,results,process,async))
;
return ((function (switch__18240__auto__,c__18335__auto__,jobs,results,process,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_18667 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_18667[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__);

(statearr_18667[(1)] = (1));

return statearr_18667;
});
var cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1 = (function (state_18641){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18641);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18668){if((e18668 instanceof Object)){
var ex__18244__auto__ = e18668;
var statearr_18669_18727 = state_18641;
(statearr_18669_18727[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18641);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18668;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18728 = state_18641;
state_18641 = G__18728;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__ = function(state_18641){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1.call(this,state_18641);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__,jobs,results,process,async))
})();
var state__18337__auto__ = (function (){var statearr_18670 = f__18336__auto__.call(null);
(statearr_18670[(6)] = c__18335__auto__);

return statearr_18670;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__,jobs,results,process,async))
);

return c__18335__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). af must close!
 *   the channel before returning.  The presumption is that af will
 *   return immediately, having launched some asynchronous operation
 *   whose completion/callback will manipulate the result channel. Outputs
 *   will be returned in order relative to  the inputs. By default, the to
 *   channel will be closed when the from channel closes, but can be
 *   determined by the close?  parameter. Will stop consuming the from
 *   channel if the to channel closes.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__18730 = arguments.length;
switch (G__18730) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.call(null,n,to,af,from,true);
});

cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_.call(null,n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
});

cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5;

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__18733 = arguments.length;
switch (G__18733) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.call(null,n,to,xf,from,true);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.call(null,n,to,xf,from,close_QMARK_,null);
});

cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_.call(null,n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
});

cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6;

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__18736 = arguments.length;
switch (G__18736) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.call(null,p,ch,null,null);
});

cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.call(null,t_buf_or_n);
var fc = cljs.core.async.chan.call(null,f_buf_or_n);
var c__18335__auto___18785 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___18785,tc,fc){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___18785,tc,fc){
return (function (state_18762){
var state_val_18763 = (state_18762[(1)]);
if((state_val_18763 === (7))){
var inst_18758 = (state_18762[(2)]);
var state_18762__$1 = state_18762;
var statearr_18764_18786 = state_18762__$1;
(statearr_18764_18786[(2)] = inst_18758);

(statearr_18764_18786[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (1))){
var state_18762__$1 = state_18762;
var statearr_18765_18787 = state_18762__$1;
(statearr_18765_18787[(2)] = null);

(statearr_18765_18787[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (4))){
var inst_18739 = (state_18762[(7)]);
var inst_18739__$1 = (state_18762[(2)]);
var inst_18740 = (inst_18739__$1 == null);
var state_18762__$1 = (function (){var statearr_18766 = state_18762;
(statearr_18766[(7)] = inst_18739__$1);

return statearr_18766;
})();
if(cljs.core.truth_(inst_18740)){
var statearr_18767_18788 = state_18762__$1;
(statearr_18767_18788[(1)] = (5));

} else {
var statearr_18768_18789 = state_18762__$1;
(statearr_18768_18789[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (13))){
var state_18762__$1 = state_18762;
var statearr_18769_18790 = state_18762__$1;
(statearr_18769_18790[(2)] = null);

(statearr_18769_18790[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (6))){
var inst_18739 = (state_18762[(7)]);
var inst_18745 = p.call(null,inst_18739);
var state_18762__$1 = state_18762;
if(cljs.core.truth_(inst_18745)){
var statearr_18770_18791 = state_18762__$1;
(statearr_18770_18791[(1)] = (9));

} else {
var statearr_18771_18792 = state_18762__$1;
(statearr_18771_18792[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (3))){
var inst_18760 = (state_18762[(2)]);
var state_18762__$1 = state_18762;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18762__$1,inst_18760);
} else {
if((state_val_18763 === (12))){
var state_18762__$1 = state_18762;
var statearr_18772_18793 = state_18762__$1;
(statearr_18772_18793[(2)] = null);

(statearr_18772_18793[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (2))){
var state_18762__$1 = state_18762;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18762__$1,(4),ch);
} else {
if((state_val_18763 === (11))){
var inst_18739 = (state_18762[(7)]);
var inst_18749 = (state_18762[(2)]);
var state_18762__$1 = state_18762;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18762__$1,(8),inst_18749,inst_18739);
} else {
if((state_val_18763 === (9))){
var state_18762__$1 = state_18762;
var statearr_18773_18794 = state_18762__$1;
(statearr_18773_18794[(2)] = tc);

(statearr_18773_18794[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (5))){
var inst_18742 = cljs.core.async.close_BANG_.call(null,tc);
var inst_18743 = cljs.core.async.close_BANG_.call(null,fc);
var state_18762__$1 = (function (){var statearr_18774 = state_18762;
(statearr_18774[(8)] = inst_18742);

return statearr_18774;
})();
var statearr_18775_18795 = state_18762__$1;
(statearr_18775_18795[(2)] = inst_18743);

(statearr_18775_18795[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (14))){
var inst_18756 = (state_18762[(2)]);
var state_18762__$1 = state_18762;
var statearr_18776_18796 = state_18762__$1;
(statearr_18776_18796[(2)] = inst_18756);

(statearr_18776_18796[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (10))){
var state_18762__$1 = state_18762;
var statearr_18777_18797 = state_18762__$1;
(statearr_18777_18797[(2)] = fc);

(statearr_18777_18797[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18763 === (8))){
var inst_18751 = (state_18762[(2)]);
var state_18762__$1 = state_18762;
if(cljs.core.truth_(inst_18751)){
var statearr_18778_18798 = state_18762__$1;
(statearr_18778_18798[(1)] = (12));

} else {
var statearr_18779_18799 = state_18762__$1;
(statearr_18779_18799[(1)] = (13));

}

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
});})(c__18335__auto___18785,tc,fc))
;
return ((function (switch__18240__auto__,c__18335__auto___18785,tc,fc){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_18780 = [null,null,null,null,null,null,null,null,null];
(statearr_18780[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_18780[(1)] = (1));

return statearr_18780;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_18762){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18762);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18781){if((e18781 instanceof Object)){
var ex__18244__auto__ = e18781;
var statearr_18782_18800 = state_18762;
(statearr_18782_18800[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18762);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18781;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18801 = state_18762;
state_18762 = G__18801;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_18762){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_18762);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___18785,tc,fc))
})();
var state__18337__auto__ = (function (){var statearr_18783 = f__18336__auto__.call(null);
(statearr_18783[(6)] = c__18335__auto___18785);

return statearr_18783;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___18785,tc,fc))
);


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
});

cljs.core.async.split.cljs$lang$maxFixedArity = 4;

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__){
return (function (state_18822){
var state_val_18823 = (state_18822[(1)]);
if((state_val_18823 === (7))){
var inst_18818 = (state_18822[(2)]);
var state_18822__$1 = state_18822;
var statearr_18824_18842 = state_18822__$1;
(statearr_18824_18842[(2)] = inst_18818);

(statearr_18824_18842[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (1))){
var inst_18802 = init;
var state_18822__$1 = (function (){var statearr_18825 = state_18822;
(statearr_18825[(7)] = inst_18802);

return statearr_18825;
})();
var statearr_18826_18843 = state_18822__$1;
(statearr_18826_18843[(2)] = null);

(statearr_18826_18843[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (4))){
var inst_18805 = (state_18822[(8)]);
var inst_18805__$1 = (state_18822[(2)]);
var inst_18806 = (inst_18805__$1 == null);
var state_18822__$1 = (function (){var statearr_18827 = state_18822;
(statearr_18827[(8)] = inst_18805__$1);

return statearr_18827;
})();
if(cljs.core.truth_(inst_18806)){
var statearr_18828_18844 = state_18822__$1;
(statearr_18828_18844[(1)] = (5));

} else {
var statearr_18829_18845 = state_18822__$1;
(statearr_18829_18845[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (6))){
var inst_18805 = (state_18822[(8)]);
var inst_18802 = (state_18822[(7)]);
var inst_18809 = (state_18822[(9)]);
var inst_18809__$1 = f.call(null,inst_18802,inst_18805);
var inst_18810 = cljs.core.reduced_QMARK_.call(null,inst_18809__$1);
var state_18822__$1 = (function (){var statearr_18830 = state_18822;
(statearr_18830[(9)] = inst_18809__$1);

return statearr_18830;
})();
if(inst_18810){
var statearr_18831_18846 = state_18822__$1;
(statearr_18831_18846[(1)] = (8));

} else {
var statearr_18832_18847 = state_18822__$1;
(statearr_18832_18847[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (3))){
var inst_18820 = (state_18822[(2)]);
var state_18822__$1 = state_18822;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18822__$1,inst_18820);
} else {
if((state_val_18823 === (2))){
var state_18822__$1 = state_18822;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18822__$1,(4),ch);
} else {
if((state_val_18823 === (9))){
var inst_18809 = (state_18822[(9)]);
var inst_18802 = inst_18809;
var state_18822__$1 = (function (){var statearr_18833 = state_18822;
(statearr_18833[(7)] = inst_18802);

return statearr_18833;
})();
var statearr_18834_18848 = state_18822__$1;
(statearr_18834_18848[(2)] = null);

(statearr_18834_18848[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (5))){
var inst_18802 = (state_18822[(7)]);
var state_18822__$1 = state_18822;
var statearr_18835_18849 = state_18822__$1;
(statearr_18835_18849[(2)] = inst_18802);

(statearr_18835_18849[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (10))){
var inst_18816 = (state_18822[(2)]);
var state_18822__$1 = state_18822;
var statearr_18836_18850 = state_18822__$1;
(statearr_18836_18850[(2)] = inst_18816);

(statearr_18836_18850[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18823 === (8))){
var inst_18809 = (state_18822[(9)]);
var inst_18812 = cljs.core.deref.call(null,inst_18809);
var state_18822__$1 = state_18822;
var statearr_18837_18851 = state_18822__$1;
(statearr_18837_18851[(2)] = inst_18812);

(statearr_18837_18851[(1)] = (10));


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
});})(c__18335__auto__))
;
return ((function (switch__18240__auto__,c__18335__auto__){
return (function() {
var cljs$core$async$reduce_$_state_machine__18241__auto__ = null;
var cljs$core$async$reduce_$_state_machine__18241__auto____0 = (function (){
var statearr_18838 = [null,null,null,null,null,null,null,null,null,null];
(statearr_18838[(0)] = cljs$core$async$reduce_$_state_machine__18241__auto__);

(statearr_18838[(1)] = (1));

return statearr_18838;
});
var cljs$core$async$reduce_$_state_machine__18241__auto____1 = (function (state_18822){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18822);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18839){if((e18839 instanceof Object)){
var ex__18244__auto__ = e18839;
var statearr_18840_18852 = state_18822;
(statearr_18840_18852[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18822);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18839;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18853 = state_18822;
state_18822 = G__18853;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__18241__auto__ = function(state_18822){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__18241__auto____1.call(this,state_18822);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__18241__auto____0;
cljs$core$async$reduce_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__18241__auto____1;
return cljs$core$async$reduce_$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__))
})();
var state__18337__auto__ = (function (){var statearr_18841 = f__18336__auto__.call(null);
(statearr_18841[(6)] = c__18335__auto__);

return statearr_18841;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__))
);

return c__18335__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = xform.call(null,f);
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__,f__$1){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__,f__$1){
return (function (state_18859){
var state_val_18860 = (state_18859[(1)]);
if((state_val_18860 === (1))){
var inst_18854 = cljs.core.async.reduce.call(null,f__$1,init,ch);
var state_18859__$1 = state_18859;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_18859__$1,(2),inst_18854);
} else {
if((state_val_18860 === (2))){
var inst_18856 = (state_18859[(2)]);
var inst_18857 = f__$1.call(null,inst_18856);
var state_18859__$1 = state_18859;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18859__$1,inst_18857);
} else {
return null;
}
}
});})(c__18335__auto__,f__$1))
;
return ((function (switch__18240__auto__,c__18335__auto__,f__$1){
return (function() {
var cljs$core$async$transduce_$_state_machine__18241__auto__ = null;
var cljs$core$async$transduce_$_state_machine__18241__auto____0 = (function (){
var statearr_18861 = [null,null,null,null,null,null,null];
(statearr_18861[(0)] = cljs$core$async$transduce_$_state_machine__18241__auto__);

(statearr_18861[(1)] = (1));

return statearr_18861;
});
var cljs$core$async$transduce_$_state_machine__18241__auto____1 = (function (state_18859){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18859);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18862){if((e18862 instanceof Object)){
var ex__18244__auto__ = e18862;
var statearr_18863_18865 = state_18859;
(statearr_18863_18865[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18859);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18862;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18866 = state_18859;
state_18859 = G__18866;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__18241__auto__ = function(state_18859){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__18241__auto____1.call(this,state_18859);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__18241__auto____0;
cljs$core$async$transduce_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__18241__auto____1;
return cljs$core$async$transduce_$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__,f__$1))
})();
var state__18337__auto__ = (function (){var statearr_18864 = f__18336__auto__.call(null);
(statearr_18864[(6)] = c__18335__auto__);

return statearr_18864;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__,f__$1))
);

return c__18335__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__18868 = arguments.length;
switch (G__18868) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan.call(null,ch,coll,true);
});

cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__){
return (function (state_18893){
var state_val_18894 = (state_18893[(1)]);
if((state_val_18894 === (7))){
var inst_18875 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18895_18916 = state_18893__$1;
(statearr_18895_18916[(2)] = inst_18875);

(statearr_18895_18916[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (1))){
var inst_18869 = cljs.core.seq.call(null,coll);
var inst_18870 = inst_18869;
var state_18893__$1 = (function (){var statearr_18896 = state_18893;
(statearr_18896[(7)] = inst_18870);

return statearr_18896;
})();
var statearr_18897_18917 = state_18893__$1;
(statearr_18897_18917[(2)] = null);

(statearr_18897_18917[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (4))){
var inst_18870 = (state_18893[(7)]);
var inst_18873 = cljs.core.first.call(null,inst_18870);
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_18893__$1,(7),ch,inst_18873);
} else {
if((state_val_18894 === (13))){
var inst_18887 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18898_18918 = state_18893__$1;
(statearr_18898_18918[(2)] = inst_18887);

(statearr_18898_18918[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (6))){
var inst_18878 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
if(cljs.core.truth_(inst_18878)){
var statearr_18899_18919 = state_18893__$1;
(statearr_18899_18919[(1)] = (8));

} else {
var statearr_18900_18920 = state_18893__$1;
(statearr_18900_18920[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (3))){
var inst_18891 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_18893__$1,inst_18891);
} else {
if((state_val_18894 === (12))){
var state_18893__$1 = state_18893;
var statearr_18901_18921 = state_18893__$1;
(statearr_18901_18921[(2)] = null);

(statearr_18901_18921[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (2))){
var inst_18870 = (state_18893[(7)]);
var state_18893__$1 = state_18893;
if(cljs.core.truth_(inst_18870)){
var statearr_18902_18922 = state_18893__$1;
(statearr_18902_18922[(1)] = (4));

} else {
var statearr_18903_18923 = state_18893__$1;
(statearr_18903_18923[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (11))){
var inst_18884 = cljs.core.async.close_BANG_.call(null,ch);
var state_18893__$1 = state_18893;
var statearr_18904_18924 = state_18893__$1;
(statearr_18904_18924[(2)] = inst_18884);

(statearr_18904_18924[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (9))){
var state_18893__$1 = state_18893;
if(cljs.core.truth_(close_QMARK_)){
var statearr_18905_18925 = state_18893__$1;
(statearr_18905_18925[(1)] = (11));

} else {
var statearr_18906_18926 = state_18893__$1;
(statearr_18906_18926[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (5))){
var inst_18870 = (state_18893[(7)]);
var state_18893__$1 = state_18893;
var statearr_18907_18927 = state_18893__$1;
(statearr_18907_18927[(2)] = inst_18870);

(statearr_18907_18927[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (10))){
var inst_18889 = (state_18893[(2)]);
var state_18893__$1 = state_18893;
var statearr_18908_18928 = state_18893__$1;
(statearr_18908_18928[(2)] = inst_18889);

(statearr_18908_18928[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_18894 === (8))){
var inst_18870 = (state_18893[(7)]);
var inst_18880 = cljs.core.next.call(null,inst_18870);
var inst_18870__$1 = inst_18880;
var state_18893__$1 = (function (){var statearr_18909 = state_18893;
(statearr_18909[(7)] = inst_18870__$1);

return statearr_18909;
})();
var statearr_18910_18929 = state_18893__$1;
(statearr_18910_18929[(2)] = null);

(statearr_18910_18929[(1)] = (2));


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
});})(c__18335__auto__))
;
return ((function (switch__18240__auto__,c__18335__auto__){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_18911 = [null,null,null,null,null,null,null,null];
(statearr_18911[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_18911[(1)] = (1));

return statearr_18911;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_18893){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_18893);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e18912){if((e18912 instanceof Object)){
var ex__18244__auto__ = e18912;
var statearr_18913_18930 = state_18893;
(statearr_18913_18930[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_18893);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e18912;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__18931 = state_18893;
state_18893 = G__18931;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_18893){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_18893);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__))
})();
var state__18337__auto__ = (function (){var statearr_18914 = f__18336__auto__.call(null);
(statearr_18914[(6)] = c__18335__auto__);

return statearr_18914;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__))
);

return c__18335__auto__;
});

cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3;

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
var ch = cljs.core.async.chan.call(null,cljs.core.bounded_count.call(null,(100),coll));
cljs.core.async.onto_chan.call(null,ch,coll);

return ch;
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
var x__4347__auto__ = (((_ == null))?null:_);
var m__4348__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,_);
} else {
var m__4348__auto____$1 = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,_);
} else {
throw cljs.core.missing_protocol.call(null,"Mux.muxch*",_);
}
}
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,ch,close_QMARK_);
} else {
var m__4348__auto____$1 = (cljs.core.async.tap_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.tap*",m);
}
}
}
});

cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,ch);
} else {
var m__4348__auto____$1 = (cljs.core.async.untap_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap*",m);
}
}
}
});

cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m);
} else {
var m__4348__auto____$1 = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mult.untap-all*",m);
}
}
}
});

/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async18932 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async18932 = (function (ch,cs,meta18933){
this.ch = ch;
this.cs = cs;
this.meta18933 = meta18933;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs){
return (function (_18934,meta18933__$1){
var self__ = this;
var _18934__$1 = this;
return (new cljs.core.async.t_cljs$core$async18932(self__.ch,self__.cs,meta18933__$1));
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs){
return (function (_18934){
var self__ = this;
var _18934__$1 = this;
return self__.meta18933;
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = ((function (cs){
return (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = ((function (cs){
return (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch__$1);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = ((function (cs){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.getBasis = ((function (cs){
return (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta18933","meta18933",2053333684,null)], null);
});})(cs))
;

cljs.core.async.t_cljs$core$async18932.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async18932.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async18932";

cljs.core.async.t_cljs$core$async18932.cljs$lang$ctorPrWriter = ((function (cs){
return (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async18932");
});})(cs))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async18932.
 */
cljs.core.async.__GT_t_cljs$core$async18932 = ((function (cs){
return (function cljs$core$async$mult_$___GT_t_cljs$core$async18932(ch__$1,cs__$1,meta18933){
return (new cljs.core.async.t_cljs$core$async18932(ch__$1,cs__$1,meta18933));
});})(cs))
;

}

return (new cljs.core.async.t_cljs$core$async18932(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = ((function (cs,m,dchan,dctr){
return (function (_){
if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,true);
} else {
return null;
}
});})(cs,m,dchan,dctr))
;
var c__18335__auto___19154 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19154,cs,m,dchan,dctr,done){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19154,cs,m,dchan,dctr,done){
return (function (state_19069){
var state_val_19070 = (state_19069[(1)]);
if((state_val_19070 === (7))){
var inst_19065 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19071_19155 = state_19069__$1;
(statearr_19071_19155[(2)] = inst_19065);

(statearr_19071_19155[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (20))){
var inst_18968 = (state_19069[(7)]);
var inst_18980 = cljs.core.first.call(null,inst_18968);
var inst_18981 = cljs.core.nth.call(null,inst_18980,(0),null);
var inst_18982 = cljs.core.nth.call(null,inst_18980,(1),null);
var state_19069__$1 = (function (){var statearr_19072 = state_19069;
(statearr_19072[(8)] = inst_18981);

return statearr_19072;
})();
if(cljs.core.truth_(inst_18982)){
var statearr_19073_19156 = state_19069__$1;
(statearr_19073_19156[(1)] = (22));

} else {
var statearr_19074_19157 = state_19069__$1;
(statearr_19074_19157[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (27))){
var inst_18937 = (state_19069[(9)]);
var inst_19012 = (state_19069[(10)]);
var inst_19017 = (state_19069[(11)]);
var inst_19010 = (state_19069[(12)]);
var inst_19017__$1 = cljs.core._nth.call(null,inst_19010,inst_19012);
var inst_19018 = cljs.core.async.put_BANG_.call(null,inst_19017__$1,inst_18937,done);
var state_19069__$1 = (function (){var statearr_19075 = state_19069;
(statearr_19075[(11)] = inst_19017__$1);

return statearr_19075;
})();
if(cljs.core.truth_(inst_19018)){
var statearr_19076_19158 = state_19069__$1;
(statearr_19076_19158[(1)] = (30));

} else {
var statearr_19077_19159 = state_19069__$1;
(statearr_19077_19159[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (1))){
var state_19069__$1 = state_19069;
var statearr_19078_19160 = state_19069__$1;
(statearr_19078_19160[(2)] = null);

(statearr_19078_19160[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (24))){
var inst_18968 = (state_19069[(7)]);
var inst_18987 = (state_19069[(2)]);
var inst_18988 = cljs.core.next.call(null,inst_18968);
var inst_18946 = inst_18988;
var inst_18947 = null;
var inst_18948 = (0);
var inst_18949 = (0);
var state_19069__$1 = (function (){var statearr_19079 = state_19069;
(statearr_19079[(13)] = inst_18948);

(statearr_19079[(14)] = inst_18946);

(statearr_19079[(15)] = inst_18987);

(statearr_19079[(16)] = inst_18947);

(statearr_19079[(17)] = inst_18949);

return statearr_19079;
})();
var statearr_19080_19161 = state_19069__$1;
(statearr_19080_19161[(2)] = null);

(statearr_19080_19161[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (39))){
var state_19069__$1 = state_19069;
var statearr_19084_19162 = state_19069__$1;
(statearr_19084_19162[(2)] = null);

(statearr_19084_19162[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (4))){
var inst_18937 = (state_19069[(9)]);
var inst_18937__$1 = (state_19069[(2)]);
var inst_18938 = (inst_18937__$1 == null);
var state_19069__$1 = (function (){var statearr_19085 = state_19069;
(statearr_19085[(9)] = inst_18937__$1);

return statearr_19085;
})();
if(cljs.core.truth_(inst_18938)){
var statearr_19086_19163 = state_19069__$1;
(statearr_19086_19163[(1)] = (5));

} else {
var statearr_19087_19164 = state_19069__$1;
(statearr_19087_19164[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (15))){
var inst_18948 = (state_19069[(13)]);
var inst_18946 = (state_19069[(14)]);
var inst_18947 = (state_19069[(16)]);
var inst_18949 = (state_19069[(17)]);
var inst_18964 = (state_19069[(2)]);
var inst_18965 = (inst_18949 + (1));
var tmp19081 = inst_18948;
var tmp19082 = inst_18946;
var tmp19083 = inst_18947;
var inst_18946__$1 = tmp19082;
var inst_18947__$1 = tmp19083;
var inst_18948__$1 = tmp19081;
var inst_18949__$1 = inst_18965;
var state_19069__$1 = (function (){var statearr_19088 = state_19069;
(statearr_19088[(13)] = inst_18948__$1);

(statearr_19088[(14)] = inst_18946__$1);

(statearr_19088[(18)] = inst_18964);

(statearr_19088[(16)] = inst_18947__$1);

(statearr_19088[(17)] = inst_18949__$1);

return statearr_19088;
})();
var statearr_19089_19165 = state_19069__$1;
(statearr_19089_19165[(2)] = null);

(statearr_19089_19165[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (21))){
var inst_18991 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19093_19166 = state_19069__$1;
(statearr_19093_19166[(2)] = inst_18991);

(statearr_19093_19166[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (31))){
var inst_19017 = (state_19069[(11)]);
var inst_19021 = done.call(null,null);
var inst_19022 = cljs.core.async.untap_STAR_.call(null,m,inst_19017);
var state_19069__$1 = (function (){var statearr_19094 = state_19069;
(statearr_19094[(19)] = inst_19021);

return statearr_19094;
})();
var statearr_19095_19167 = state_19069__$1;
(statearr_19095_19167[(2)] = inst_19022);

(statearr_19095_19167[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (32))){
var inst_19012 = (state_19069[(10)]);
var inst_19011 = (state_19069[(20)]);
var inst_19009 = (state_19069[(21)]);
var inst_19010 = (state_19069[(12)]);
var inst_19024 = (state_19069[(2)]);
var inst_19025 = (inst_19012 + (1));
var tmp19090 = inst_19011;
var tmp19091 = inst_19009;
var tmp19092 = inst_19010;
var inst_19009__$1 = tmp19091;
var inst_19010__$1 = tmp19092;
var inst_19011__$1 = tmp19090;
var inst_19012__$1 = inst_19025;
var state_19069__$1 = (function (){var statearr_19096 = state_19069;
(statearr_19096[(10)] = inst_19012__$1);

(statearr_19096[(20)] = inst_19011__$1);

(statearr_19096[(21)] = inst_19009__$1);

(statearr_19096[(12)] = inst_19010__$1);

(statearr_19096[(22)] = inst_19024);

return statearr_19096;
})();
var statearr_19097_19168 = state_19069__$1;
(statearr_19097_19168[(2)] = null);

(statearr_19097_19168[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (40))){
var inst_19037 = (state_19069[(23)]);
var inst_19041 = done.call(null,null);
var inst_19042 = cljs.core.async.untap_STAR_.call(null,m,inst_19037);
var state_19069__$1 = (function (){var statearr_19098 = state_19069;
(statearr_19098[(24)] = inst_19041);

return statearr_19098;
})();
var statearr_19099_19169 = state_19069__$1;
(statearr_19099_19169[(2)] = inst_19042);

(statearr_19099_19169[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (33))){
var inst_19028 = (state_19069[(25)]);
var inst_19030 = cljs.core.chunked_seq_QMARK_.call(null,inst_19028);
var state_19069__$1 = state_19069;
if(inst_19030){
var statearr_19100_19170 = state_19069__$1;
(statearr_19100_19170[(1)] = (36));

} else {
var statearr_19101_19171 = state_19069__$1;
(statearr_19101_19171[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (13))){
var inst_18958 = (state_19069[(26)]);
var inst_18961 = cljs.core.async.close_BANG_.call(null,inst_18958);
var state_19069__$1 = state_19069;
var statearr_19102_19172 = state_19069__$1;
(statearr_19102_19172[(2)] = inst_18961);

(statearr_19102_19172[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (22))){
var inst_18981 = (state_19069[(8)]);
var inst_18984 = cljs.core.async.close_BANG_.call(null,inst_18981);
var state_19069__$1 = state_19069;
var statearr_19103_19173 = state_19069__$1;
(statearr_19103_19173[(2)] = inst_18984);

(statearr_19103_19173[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (36))){
var inst_19028 = (state_19069[(25)]);
var inst_19032 = cljs.core.chunk_first.call(null,inst_19028);
var inst_19033 = cljs.core.chunk_rest.call(null,inst_19028);
var inst_19034 = cljs.core.count.call(null,inst_19032);
var inst_19009 = inst_19033;
var inst_19010 = inst_19032;
var inst_19011 = inst_19034;
var inst_19012 = (0);
var state_19069__$1 = (function (){var statearr_19104 = state_19069;
(statearr_19104[(10)] = inst_19012);

(statearr_19104[(20)] = inst_19011);

(statearr_19104[(21)] = inst_19009);

(statearr_19104[(12)] = inst_19010);

return statearr_19104;
})();
var statearr_19105_19174 = state_19069__$1;
(statearr_19105_19174[(2)] = null);

(statearr_19105_19174[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (41))){
var inst_19028 = (state_19069[(25)]);
var inst_19044 = (state_19069[(2)]);
var inst_19045 = cljs.core.next.call(null,inst_19028);
var inst_19009 = inst_19045;
var inst_19010 = null;
var inst_19011 = (0);
var inst_19012 = (0);
var state_19069__$1 = (function (){var statearr_19106 = state_19069;
(statearr_19106[(10)] = inst_19012);

(statearr_19106[(20)] = inst_19011);

(statearr_19106[(21)] = inst_19009);

(statearr_19106[(12)] = inst_19010);

(statearr_19106[(27)] = inst_19044);

return statearr_19106;
})();
var statearr_19107_19175 = state_19069__$1;
(statearr_19107_19175[(2)] = null);

(statearr_19107_19175[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (43))){
var state_19069__$1 = state_19069;
var statearr_19108_19176 = state_19069__$1;
(statearr_19108_19176[(2)] = null);

(statearr_19108_19176[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (29))){
var inst_19053 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19109_19177 = state_19069__$1;
(statearr_19109_19177[(2)] = inst_19053);

(statearr_19109_19177[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (44))){
var inst_19062 = (state_19069[(2)]);
var state_19069__$1 = (function (){var statearr_19110 = state_19069;
(statearr_19110[(28)] = inst_19062);

return statearr_19110;
})();
var statearr_19111_19178 = state_19069__$1;
(statearr_19111_19178[(2)] = null);

(statearr_19111_19178[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (6))){
var inst_19001 = (state_19069[(29)]);
var inst_19000 = cljs.core.deref.call(null,cs);
var inst_19001__$1 = cljs.core.keys.call(null,inst_19000);
var inst_19002 = cljs.core.count.call(null,inst_19001__$1);
var inst_19003 = cljs.core.reset_BANG_.call(null,dctr,inst_19002);
var inst_19008 = cljs.core.seq.call(null,inst_19001__$1);
var inst_19009 = inst_19008;
var inst_19010 = null;
var inst_19011 = (0);
var inst_19012 = (0);
var state_19069__$1 = (function (){var statearr_19112 = state_19069;
(statearr_19112[(30)] = inst_19003);

(statearr_19112[(10)] = inst_19012);

(statearr_19112[(29)] = inst_19001__$1);

(statearr_19112[(20)] = inst_19011);

(statearr_19112[(21)] = inst_19009);

(statearr_19112[(12)] = inst_19010);

return statearr_19112;
})();
var statearr_19113_19179 = state_19069__$1;
(statearr_19113_19179[(2)] = null);

(statearr_19113_19179[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (28))){
var inst_19028 = (state_19069[(25)]);
var inst_19009 = (state_19069[(21)]);
var inst_19028__$1 = cljs.core.seq.call(null,inst_19009);
var state_19069__$1 = (function (){var statearr_19114 = state_19069;
(statearr_19114[(25)] = inst_19028__$1);

return statearr_19114;
})();
if(inst_19028__$1){
var statearr_19115_19180 = state_19069__$1;
(statearr_19115_19180[(1)] = (33));

} else {
var statearr_19116_19181 = state_19069__$1;
(statearr_19116_19181[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (25))){
var inst_19012 = (state_19069[(10)]);
var inst_19011 = (state_19069[(20)]);
var inst_19014 = (inst_19012 < inst_19011);
var inst_19015 = inst_19014;
var state_19069__$1 = state_19069;
if(cljs.core.truth_(inst_19015)){
var statearr_19117_19182 = state_19069__$1;
(statearr_19117_19182[(1)] = (27));

} else {
var statearr_19118_19183 = state_19069__$1;
(statearr_19118_19183[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (34))){
var state_19069__$1 = state_19069;
var statearr_19119_19184 = state_19069__$1;
(statearr_19119_19184[(2)] = null);

(statearr_19119_19184[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (17))){
var state_19069__$1 = state_19069;
var statearr_19120_19185 = state_19069__$1;
(statearr_19120_19185[(2)] = null);

(statearr_19120_19185[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (3))){
var inst_19067 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19069__$1,inst_19067);
} else {
if((state_val_19070 === (12))){
var inst_18996 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19121_19186 = state_19069__$1;
(statearr_19121_19186[(2)] = inst_18996);

(statearr_19121_19186[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (2))){
var state_19069__$1 = state_19069;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19069__$1,(4),ch);
} else {
if((state_val_19070 === (23))){
var state_19069__$1 = state_19069;
var statearr_19122_19187 = state_19069__$1;
(statearr_19122_19187[(2)] = null);

(statearr_19122_19187[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (35))){
var inst_19051 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19123_19188 = state_19069__$1;
(statearr_19123_19188[(2)] = inst_19051);

(statearr_19123_19188[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (19))){
var inst_18968 = (state_19069[(7)]);
var inst_18972 = cljs.core.chunk_first.call(null,inst_18968);
var inst_18973 = cljs.core.chunk_rest.call(null,inst_18968);
var inst_18974 = cljs.core.count.call(null,inst_18972);
var inst_18946 = inst_18973;
var inst_18947 = inst_18972;
var inst_18948 = inst_18974;
var inst_18949 = (0);
var state_19069__$1 = (function (){var statearr_19124 = state_19069;
(statearr_19124[(13)] = inst_18948);

(statearr_19124[(14)] = inst_18946);

(statearr_19124[(16)] = inst_18947);

(statearr_19124[(17)] = inst_18949);

return statearr_19124;
})();
var statearr_19125_19189 = state_19069__$1;
(statearr_19125_19189[(2)] = null);

(statearr_19125_19189[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (11))){
var inst_18946 = (state_19069[(14)]);
var inst_18968 = (state_19069[(7)]);
var inst_18968__$1 = cljs.core.seq.call(null,inst_18946);
var state_19069__$1 = (function (){var statearr_19126 = state_19069;
(statearr_19126[(7)] = inst_18968__$1);

return statearr_19126;
})();
if(inst_18968__$1){
var statearr_19127_19190 = state_19069__$1;
(statearr_19127_19190[(1)] = (16));

} else {
var statearr_19128_19191 = state_19069__$1;
(statearr_19128_19191[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (9))){
var inst_18998 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19129_19192 = state_19069__$1;
(statearr_19129_19192[(2)] = inst_18998);

(statearr_19129_19192[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (5))){
var inst_18944 = cljs.core.deref.call(null,cs);
var inst_18945 = cljs.core.seq.call(null,inst_18944);
var inst_18946 = inst_18945;
var inst_18947 = null;
var inst_18948 = (0);
var inst_18949 = (0);
var state_19069__$1 = (function (){var statearr_19130 = state_19069;
(statearr_19130[(13)] = inst_18948);

(statearr_19130[(14)] = inst_18946);

(statearr_19130[(16)] = inst_18947);

(statearr_19130[(17)] = inst_18949);

return statearr_19130;
})();
var statearr_19131_19193 = state_19069__$1;
(statearr_19131_19193[(2)] = null);

(statearr_19131_19193[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (14))){
var state_19069__$1 = state_19069;
var statearr_19132_19194 = state_19069__$1;
(statearr_19132_19194[(2)] = null);

(statearr_19132_19194[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (45))){
var inst_19059 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19133_19195 = state_19069__$1;
(statearr_19133_19195[(2)] = inst_19059);

(statearr_19133_19195[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (26))){
var inst_19001 = (state_19069[(29)]);
var inst_19055 = (state_19069[(2)]);
var inst_19056 = cljs.core.seq.call(null,inst_19001);
var state_19069__$1 = (function (){var statearr_19134 = state_19069;
(statearr_19134[(31)] = inst_19055);

return statearr_19134;
})();
if(inst_19056){
var statearr_19135_19196 = state_19069__$1;
(statearr_19135_19196[(1)] = (42));

} else {
var statearr_19136_19197 = state_19069__$1;
(statearr_19136_19197[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (16))){
var inst_18968 = (state_19069[(7)]);
var inst_18970 = cljs.core.chunked_seq_QMARK_.call(null,inst_18968);
var state_19069__$1 = state_19069;
if(inst_18970){
var statearr_19137_19198 = state_19069__$1;
(statearr_19137_19198[(1)] = (19));

} else {
var statearr_19138_19199 = state_19069__$1;
(statearr_19138_19199[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (38))){
var inst_19048 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19139_19200 = state_19069__$1;
(statearr_19139_19200[(2)] = inst_19048);

(statearr_19139_19200[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (30))){
var state_19069__$1 = state_19069;
var statearr_19140_19201 = state_19069__$1;
(statearr_19140_19201[(2)] = null);

(statearr_19140_19201[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (10))){
var inst_18947 = (state_19069[(16)]);
var inst_18949 = (state_19069[(17)]);
var inst_18957 = cljs.core._nth.call(null,inst_18947,inst_18949);
var inst_18958 = cljs.core.nth.call(null,inst_18957,(0),null);
var inst_18959 = cljs.core.nth.call(null,inst_18957,(1),null);
var state_19069__$1 = (function (){var statearr_19141 = state_19069;
(statearr_19141[(26)] = inst_18958);

return statearr_19141;
})();
if(cljs.core.truth_(inst_18959)){
var statearr_19142_19202 = state_19069__$1;
(statearr_19142_19202[(1)] = (13));

} else {
var statearr_19143_19203 = state_19069__$1;
(statearr_19143_19203[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (18))){
var inst_18994 = (state_19069[(2)]);
var state_19069__$1 = state_19069;
var statearr_19144_19204 = state_19069__$1;
(statearr_19144_19204[(2)] = inst_18994);

(statearr_19144_19204[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (42))){
var state_19069__$1 = state_19069;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19069__$1,(45),dchan);
} else {
if((state_val_19070 === (37))){
var inst_18937 = (state_19069[(9)]);
var inst_19037 = (state_19069[(23)]);
var inst_19028 = (state_19069[(25)]);
var inst_19037__$1 = cljs.core.first.call(null,inst_19028);
var inst_19038 = cljs.core.async.put_BANG_.call(null,inst_19037__$1,inst_18937,done);
var state_19069__$1 = (function (){var statearr_19145 = state_19069;
(statearr_19145[(23)] = inst_19037__$1);

return statearr_19145;
})();
if(cljs.core.truth_(inst_19038)){
var statearr_19146_19205 = state_19069__$1;
(statearr_19146_19205[(1)] = (39));

} else {
var statearr_19147_19206 = state_19069__$1;
(statearr_19147_19206[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19070 === (8))){
var inst_18948 = (state_19069[(13)]);
var inst_18949 = (state_19069[(17)]);
var inst_18951 = (inst_18949 < inst_18948);
var inst_18952 = inst_18951;
var state_19069__$1 = state_19069;
if(cljs.core.truth_(inst_18952)){
var statearr_19148_19207 = state_19069__$1;
(statearr_19148_19207[(1)] = (10));

} else {
var statearr_19149_19208 = state_19069__$1;
(statearr_19149_19208[(1)] = (11));

}

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
});})(c__18335__auto___19154,cs,m,dchan,dctr,done))
;
return ((function (switch__18240__auto__,c__18335__auto___19154,cs,m,dchan,dctr,done){
return (function() {
var cljs$core$async$mult_$_state_machine__18241__auto__ = null;
var cljs$core$async$mult_$_state_machine__18241__auto____0 = (function (){
var statearr_19150 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19150[(0)] = cljs$core$async$mult_$_state_machine__18241__auto__);

(statearr_19150[(1)] = (1));

return statearr_19150;
});
var cljs$core$async$mult_$_state_machine__18241__auto____1 = (function (state_19069){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19069);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19151){if((e19151 instanceof Object)){
var ex__18244__auto__ = e19151;
var statearr_19152_19209 = state_19069;
(statearr_19152_19209[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19069);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19151;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19210 = state_19069;
state_19069 = G__19210;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__18241__auto__ = function(state_19069){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__18241__auto____1.call(this,state_19069);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__18241__auto____0;
cljs$core$async$mult_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__18241__auto____1;
return cljs$core$async$mult_$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19154,cs,m,dchan,dctr,done))
})();
var state__18337__auto__ = (function (){var statearr_19153 = f__18336__auto__.call(null);
(statearr_19153[(6)] = c__18335__auto___19154);

return statearr_19153;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19154,cs,m,dchan,dctr,done))
);


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__19212 = arguments.length;
switch (G__19212) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.call(null,mult,ch,true);
});

cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_.call(null,mult,ch,close_QMARK_);

return ch;
});

cljs.core.async.tap.cljs$lang$maxFixedArity = 3;

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_.call(null,mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_.call(null,mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,ch);
} else {
var m__4348__auto____$1 = (cljs.core.async.admix_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.admix*",m);
}
}
}
});

cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,ch);
} else {
var m__4348__auto____$1 = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix*",m);
}
}
}
});

cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m);
} else {
var m__4348__auto____$1 = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.unmix-all*",m);
}
}
}
});

cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,state_map);
} else {
var m__4348__auto____$1 = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,state_map);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.toggle*",m);
}
}
}
});

cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
var x__4347__auto__ = (((m == null))?null:m);
var m__4348__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,m,mode);
} else {
var m__4348__auto____$1 = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,m,mode);
} else {
throw cljs.core.missing_protocol.call(null,"Mix.solo-mode*",m);
}
}
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__4647__auto__ = [];
var len__4641__auto___19224 = arguments.length;
var i__4642__auto___19225 = (0);
while(true){
if((i__4642__auto___19225 < len__4641__auto___19224)){
args__4647__auto__.push((arguments[i__4642__auto___19225]));

var G__19226 = (i__4642__auto___19225 + (1));
i__4642__auto___19225 = G__19226;
continue;
} else {
}
break;
}

var argseq__4648__auto__ = ((((3) < args__4647__auto__.length))?(new cljs.core.IndexedSeq(args__4647__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__4648__auto__);
});

cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__19218){
var map__19219 = p__19218;
var map__19219__$1 = (((((!((map__19219 == null))))?(((((map__19219.cljs$lang$protocol_mask$partition0$ & (64))) || ((cljs.core.PROTOCOL_SENTINEL === map__19219.cljs$core$ISeq$))))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__19219):map__19219);
var opts = map__19219__$1;
var statearr_19221_19227 = state;
(statearr_19221_19227[(1)] = cont_block);


var temp__5735__auto__ = cljs.core.async.do_alts.call(null,((function (map__19219,map__19219__$1,opts){
return (function (val){
var statearr_19222_19228 = state;
(statearr_19222_19228[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state);
});})(map__19219,map__19219__$1,opts))
,ports,opts);
if(cljs.core.truth_(temp__5735__auto__)){
var cb = temp__5735__auto__;
var statearr_19223_19229 = state;
(statearr_19223_19229[(2)] = cljs.core.deref.call(null,cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
});

cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3);

/** @this {Function} */
cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq19214){
var G__19215 = cljs.core.first.call(null,seq19214);
var seq19214__$1 = cljs.core.next.call(null,seq19214);
var G__19216 = cljs.core.first.call(null,seq19214__$1);
var seq19214__$2 = cljs.core.next.call(null,seq19214__$1);
var G__19217 = cljs.core.first.call(null,seq19214__$2);
var seq19214__$3 = cljs.core.next.call(null,seq19214__$2);
var self__4628__auto__ = this;
return self__4628__auto__.cljs$core$IFn$_invoke$arity$variadic(G__19215,G__19216,G__19217,seq19214__$3);
});

/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.call(null,solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.call(null);
var changed = ((function (cs,solo_modes,attrs,solo_mode,change){
return (function (){
return cljs.core.async.put_BANG_.call(null,change,true);
});})(cs,solo_modes,attrs,solo_mode,change))
;
var pick = ((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (attr,chs){
return cljs.core.reduce_kv.call(null,((function (cs,solo_modes,attrs,solo_mode,change,changed){
return (function (ret,c,v){
if(cljs.core.truth_(attr.call(null,v))){
return cljs.core.conj.call(null,ret,c);
} else {
return ret;
}
});})(cs,solo_modes,attrs,solo_mode,change,changed))
,cljs.core.PersistentHashSet.EMPTY,chs);
});})(cs,solo_modes,attrs,solo_mode,change,changed))
;
var calc_state = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick){
return (function (){
var chs = cljs.core.deref.call(null,cs);
var mode = cljs.core.deref.call(null,solo_mode);
var solos = pick.call(null,new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick.call(null,new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick.call(null,new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.call(null,((((cljs.core._EQ_.call(null,mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && ((!(cljs.core.empty_QMARK_.call(null,solos))))))?cljs.core.vec.call(null,solos):cljs.core.vec.call(null,cljs.core.remove.call(null,pauses,cljs.core.keys.call(null,chs)))),change)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick))
;
var m = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19230 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19230 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta19231){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta19231 = meta19231;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_19232,meta19231__$1){
var self__ = this;
var _19232__$1 = this;
return (new cljs.core.async.t_cljs$core$async19230(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta19231__$1));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_19232){
var self__ = this;
var _19232__$1 = this;
return self__.meta19231;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.dissoc,ch);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_.call(null,self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.call(null,self__.cs,cljs.core.partial.call(null,cljs.core.merge_with,cljs.core.merge),state_map);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.solo_modes.call(null,mode))){
} else {
throw (new Error(["Assert failed: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join('')),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_.call(null,self__.solo_mode,mode);

return self__.changed.call(null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.getBasis = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta19231","meta19231",800501020,null)], null);
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

cljs.core.async.t_cljs$core$async19230.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19230.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19230";

cljs.core.async.t_cljs$core$async19230.cljs$lang$ctorPrWriter = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19230");
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19230.
 */
cljs.core.async.__GT_t_cljs$core$async19230 = ((function (cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state){
return (function cljs$core$async$mix_$___GT_t_cljs$core$async19230(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta19231){
return (new cljs.core.async.t_cljs$core$async19230(change__$1,solo_mode__$1,pick__$1,cs__$1,calc_state__$1,out__$1,changed__$1,solo_modes__$1,attrs__$1,meta19231));
});})(cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state))
;

}

return (new cljs.core.async.t_cljs$core$async19230(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__18335__auto___19394 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function (state_19334){
var state_val_19335 = (state_19334[(1)]);
if((state_val_19335 === (7))){
var inst_19249 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
var statearr_19336_19395 = state_19334__$1;
(statearr_19336_19395[(2)] = inst_19249);

(statearr_19336_19395[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (20))){
var inst_19261 = (state_19334[(7)]);
var state_19334__$1 = state_19334;
var statearr_19337_19396 = state_19334__$1;
(statearr_19337_19396[(2)] = inst_19261);

(statearr_19337_19396[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (27))){
var state_19334__$1 = state_19334;
var statearr_19338_19397 = state_19334__$1;
(statearr_19338_19397[(2)] = null);

(statearr_19338_19397[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (1))){
var inst_19236 = (state_19334[(8)]);
var inst_19236__$1 = calc_state.call(null);
var inst_19238 = (inst_19236__$1 == null);
var inst_19239 = cljs.core.not.call(null,inst_19238);
var state_19334__$1 = (function (){var statearr_19339 = state_19334;
(statearr_19339[(8)] = inst_19236__$1);

return statearr_19339;
})();
if(inst_19239){
var statearr_19340_19398 = state_19334__$1;
(statearr_19340_19398[(1)] = (2));

} else {
var statearr_19341_19399 = state_19334__$1;
(statearr_19341_19399[(1)] = (3));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (24))){
var inst_19285 = (state_19334[(9)]);
var inst_19308 = (state_19334[(10)]);
var inst_19294 = (state_19334[(11)]);
var inst_19308__$1 = inst_19285.call(null,inst_19294);
var state_19334__$1 = (function (){var statearr_19342 = state_19334;
(statearr_19342[(10)] = inst_19308__$1);

return statearr_19342;
})();
if(cljs.core.truth_(inst_19308__$1)){
var statearr_19343_19400 = state_19334__$1;
(statearr_19343_19400[(1)] = (29));

} else {
var statearr_19344_19401 = state_19334__$1;
(statearr_19344_19401[(1)] = (30));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (4))){
var inst_19252 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19252)){
var statearr_19345_19402 = state_19334__$1;
(statearr_19345_19402[(1)] = (8));

} else {
var statearr_19346_19403 = state_19334__$1;
(statearr_19346_19403[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (15))){
var inst_19279 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19279)){
var statearr_19347_19404 = state_19334__$1;
(statearr_19347_19404[(1)] = (19));

} else {
var statearr_19348_19405 = state_19334__$1;
(statearr_19348_19405[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (21))){
var inst_19284 = (state_19334[(12)]);
var inst_19284__$1 = (state_19334[(2)]);
var inst_19285 = cljs.core.get.call(null,inst_19284__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19286 = cljs.core.get.call(null,inst_19284__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19287 = cljs.core.get.call(null,inst_19284__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_19334__$1 = (function (){var statearr_19349 = state_19334;
(statearr_19349[(9)] = inst_19285);

(statearr_19349[(12)] = inst_19284__$1);

(statearr_19349[(13)] = inst_19286);

return statearr_19349;
})();
return cljs.core.async.ioc_alts_BANG_.call(null,state_19334__$1,(22),inst_19287);
} else {
if((state_val_19335 === (31))){
var inst_19316 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19316)){
var statearr_19350_19406 = state_19334__$1;
(statearr_19350_19406[(1)] = (32));

} else {
var statearr_19351_19407 = state_19334__$1;
(statearr_19351_19407[(1)] = (33));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (32))){
var inst_19293 = (state_19334[(14)]);
var state_19334__$1 = state_19334;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19334__$1,(35),out,inst_19293);
} else {
if((state_val_19335 === (33))){
var inst_19284 = (state_19334[(12)]);
var inst_19261 = inst_19284;
var state_19334__$1 = (function (){var statearr_19352 = state_19334;
(statearr_19352[(7)] = inst_19261);

return statearr_19352;
})();
var statearr_19353_19408 = state_19334__$1;
(statearr_19353_19408[(2)] = null);

(statearr_19353_19408[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (13))){
var inst_19261 = (state_19334[(7)]);
var inst_19268 = inst_19261.cljs$lang$protocol_mask$partition0$;
var inst_19269 = (inst_19268 & (64));
var inst_19270 = inst_19261.cljs$core$ISeq$;
var inst_19271 = (cljs.core.PROTOCOL_SENTINEL === inst_19270);
var inst_19272 = ((inst_19269) || (inst_19271));
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19272)){
var statearr_19354_19409 = state_19334__$1;
(statearr_19354_19409[(1)] = (16));

} else {
var statearr_19355_19410 = state_19334__$1;
(statearr_19355_19410[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (22))){
var inst_19293 = (state_19334[(14)]);
var inst_19294 = (state_19334[(11)]);
var inst_19292 = (state_19334[(2)]);
var inst_19293__$1 = cljs.core.nth.call(null,inst_19292,(0),null);
var inst_19294__$1 = cljs.core.nth.call(null,inst_19292,(1),null);
var inst_19295 = (inst_19293__$1 == null);
var inst_19296 = cljs.core._EQ_.call(null,inst_19294__$1,change);
var inst_19297 = ((inst_19295) || (inst_19296));
var state_19334__$1 = (function (){var statearr_19356 = state_19334;
(statearr_19356[(14)] = inst_19293__$1);

(statearr_19356[(11)] = inst_19294__$1);

return statearr_19356;
})();
if(cljs.core.truth_(inst_19297)){
var statearr_19357_19411 = state_19334__$1;
(statearr_19357_19411[(1)] = (23));

} else {
var statearr_19358_19412 = state_19334__$1;
(statearr_19358_19412[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (36))){
var inst_19284 = (state_19334[(12)]);
var inst_19261 = inst_19284;
var state_19334__$1 = (function (){var statearr_19359 = state_19334;
(statearr_19359[(7)] = inst_19261);

return statearr_19359;
})();
var statearr_19360_19413 = state_19334__$1;
(statearr_19360_19413[(2)] = null);

(statearr_19360_19413[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (29))){
var inst_19308 = (state_19334[(10)]);
var state_19334__$1 = state_19334;
var statearr_19361_19414 = state_19334__$1;
(statearr_19361_19414[(2)] = inst_19308);

(statearr_19361_19414[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (6))){
var state_19334__$1 = state_19334;
var statearr_19362_19415 = state_19334__$1;
(statearr_19362_19415[(2)] = false);

(statearr_19362_19415[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (28))){
var inst_19304 = (state_19334[(2)]);
var inst_19305 = calc_state.call(null);
var inst_19261 = inst_19305;
var state_19334__$1 = (function (){var statearr_19363 = state_19334;
(statearr_19363[(7)] = inst_19261);

(statearr_19363[(15)] = inst_19304);

return statearr_19363;
})();
var statearr_19364_19416 = state_19334__$1;
(statearr_19364_19416[(2)] = null);

(statearr_19364_19416[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (25))){
var inst_19330 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
var statearr_19365_19417 = state_19334__$1;
(statearr_19365_19417[(2)] = inst_19330);

(statearr_19365_19417[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (34))){
var inst_19328 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
var statearr_19366_19418 = state_19334__$1;
(statearr_19366_19418[(2)] = inst_19328);

(statearr_19366_19418[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (17))){
var state_19334__$1 = state_19334;
var statearr_19367_19419 = state_19334__$1;
(statearr_19367_19419[(2)] = false);

(statearr_19367_19419[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (3))){
var state_19334__$1 = state_19334;
var statearr_19368_19420 = state_19334__$1;
(statearr_19368_19420[(2)] = false);

(statearr_19368_19420[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (12))){
var inst_19332 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19334__$1,inst_19332);
} else {
if((state_val_19335 === (2))){
var inst_19236 = (state_19334[(8)]);
var inst_19241 = inst_19236.cljs$lang$protocol_mask$partition0$;
var inst_19242 = (inst_19241 & (64));
var inst_19243 = inst_19236.cljs$core$ISeq$;
var inst_19244 = (cljs.core.PROTOCOL_SENTINEL === inst_19243);
var inst_19245 = ((inst_19242) || (inst_19244));
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19245)){
var statearr_19369_19421 = state_19334__$1;
(statearr_19369_19421[(1)] = (5));

} else {
var statearr_19370_19422 = state_19334__$1;
(statearr_19370_19422[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (23))){
var inst_19293 = (state_19334[(14)]);
var inst_19299 = (inst_19293 == null);
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19299)){
var statearr_19371_19423 = state_19334__$1;
(statearr_19371_19423[(1)] = (26));

} else {
var statearr_19372_19424 = state_19334__$1;
(statearr_19372_19424[(1)] = (27));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (35))){
var inst_19319 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
if(cljs.core.truth_(inst_19319)){
var statearr_19373_19425 = state_19334__$1;
(statearr_19373_19425[(1)] = (36));

} else {
var statearr_19374_19426 = state_19334__$1;
(statearr_19374_19426[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (19))){
var inst_19261 = (state_19334[(7)]);
var inst_19281 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19261);
var state_19334__$1 = state_19334;
var statearr_19375_19427 = state_19334__$1;
(statearr_19375_19427[(2)] = inst_19281);

(statearr_19375_19427[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (11))){
var inst_19261 = (state_19334[(7)]);
var inst_19265 = (inst_19261 == null);
var inst_19266 = cljs.core.not.call(null,inst_19265);
var state_19334__$1 = state_19334;
if(inst_19266){
var statearr_19376_19428 = state_19334__$1;
(statearr_19376_19428[(1)] = (13));

} else {
var statearr_19377_19429 = state_19334__$1;
(statearr_19377_19429[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (9))){
var inst_19236 = (state_19334[(8)]);
var state_19334__$1 = state_19334;
var statearr_19378_19430 = state_19334__$1;
(statearr_19378_19430[(2)] = inst_19236);

(statearr_19378_19430[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (5))){
var state_19334__$1 = state_19334;
var statearr_19379_19431 = state_19334__$1;
(statearr_19379_19431[(2)] = true);

(statearr_19379_19431[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (14))){
var state_19334__$1 = state_19334;
var statearr_19380_19432 = state_19334__$1;
(statearr_19380_19432[(2)] = false);

(statearr_19380_19432[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (26))){
var inst_19294 = (state_19334[(11)]);
var inst_19301 = cljs.core.swap_BANG_.call(null,cs,cljs.core.dissoc,inst_19294);
var state_19334__$1 = state_19334;
var statearr_19381_19433 = state_19334__$1;
(statearr_19381_19433[(2)] = inst_19301);

(statearr_19381_19433[(1)] = (28));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (16))){
var state_19334__$1 = state_19334;
var statearr_19382_19434 = state_19334__$1;
(statearr_19382_19434[(2)] = true);

(statearr_19382_19434[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (38))){
var inst_19324 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
var statearr_19383_19435 = state_19334__$1;
(statearr_19383_19435[(2)] = inst_19324);

(statearr_19383_19435[(1)] = (34));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (30))){
var inst_19285 = (state_19334[(9)]);
var inst_19294 = (state_19334[(11)]);
var inst_19286 = (state_19334[(13)]);
var inst_19311 = cljs.core.empty_QMARK_.call(null,inst_19285);
var inst_19312 = inst_19286.call(null,inst_19294);
var inst_19313 = cljs.core.not.call(null,inst_19312);
var inst_19314 = ((inst_19311) && (inst_19313));
var state_19334__$1 = state_19334;
var statearr_19384_19436 = state_19334__$1;
(statearr_19384_19436[(2)] = inst_19314);

(statearr_19384_19436[(1)] = (31));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (10))){
var inst_19236 = (state_19334[(8)]);
var inst_19257 = (state_19334[(2)]);
var inst_19258 = cljs.core.get.call(null,inst_19257,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_19259 = cljs.core.get.call(null,inst_19257,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_19260 = cljs.core.get.call(null,inst_19257,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_19261 = inst_19236;
var state_19334__$1 = (function (){var statearr_19385 = state_19334;
(statearr_19385[(16)] = inst_19258);

(statearr_19385[(17)] = inst_19260);

(statearr_19385[(7)] = inst_19261);

(statearr_19385[(18)] = inst_19259);

return statearr_19385;
})();
var statearr_19386_19437 = state_19334__$1;
(statearr_19386_19437[(2)] = null);

(statearr_19386_19437[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (18))){
var inst_19276 = (state_19334[(2)]);
var state_19334__$1 = state_19334;
var statearr_19387_19438 = state_19334__$1;
(statearr_19387_19438[(2)] = inst_19276);

(statearr_19387_19438[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (37))){
var state_19334__$1 = state_19334;
var statearr_19388_19439 = state_19334__$1;
(statearr_19388_19439[(2)] = null);

(statearr_19388_19439[(1)] = (38));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19335 === (8))){
var inst_19236 = (state_19334[(8)]);
var inst_19254 = cljs.core.apply.call(null,cljs.core.hash_map,inst_19236);
var state_19334__$1 = state_19334;
var statearr_19389_19440 = state_19334__$1;
(statearr_19389_19440[(2)] = inst_19254);

(statearr_19389_19440[(1)] = (10));


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
}
}
}
}
}
}
});})(c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
;
return ((function (switch__18240__auto__,c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m){
return (function() {
var cljs$core$async$mix_$_state_machine__18241__auto__ = null;
var cljs$core$async$mix_$_state_machine__18241__auto____0 = (function (){
var statearr_19390 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19390[(0)] = cljs$core$async$mix_$_state_machine__18241__auto__);

(statearr_19390[(1)] = (1));

return statearr_19390;
});
var cljs$core$async$mix_$_state_machine__18241__auto____1 = (function (state_19334){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19334);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19391){if((e19391 instanceof Object)){
var ex__18244__auto__ = e19391;
var statearr_19392_19441 = state_19334;
(statearr_19392_19441[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19334);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19391;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19442 = state_19334;
state_19334 = G__19442;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__18241__auto__ = function(state_19334){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__18241__auto____1.call(this,state_19334);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__18241__auto____0;
cljs$core$async$mix_$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__18241__auto____1;
return cljs$core$async$mix_$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
})();
var state__18337__auto__ = (function (){var statearr_19393 = f__18336__auto__.call(null);
(statearr_19393[(6)] = c__18335__auto___19394);

return statearr_19393;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19394,cs,solo_modes,attrs,solo_mode,change,changed,pick,calc_state,m))
);


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_.call(null,mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_.call(null,mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_.call(null,mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_.call(null,mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_.call(null,mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
var x__4347__auto__ = (((p == null))?null:p);
var m__4348__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,p,v,ch,close_QMARK_);
} else {
var m__4348__auto____$1 = (cljs.core.async.sub_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,p,v,ch,close_QMARK_);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.sub*",p);
}
}
}
});

cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
var x__4347__auto__ = (((p == null))?null:p);
var m__4348__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,p,v,ch);
} else {
var m__4348__auto____$1 = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,p,v,ch);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__19444 = arguments.length;
switch (G__19444) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
var x__4347__auto__ = (((p == null))?null:p);
var m__4348__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,p);
} else {
var m__4348__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,p);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
var x__4347__auto__ = (((p == null))?null:p);
var m__4348__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__4347__auto__)]);
if((!((m__4348__auto__ == null)))){
return m__4348__auto__.call(null,p,v);
} else {
var m__4348__auto____$1 = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__4348__auto____$1 == null)))){
return m__4348__auto____$1.call(null,p,v);
} else {
throw cljs.core.missing_protocol.call(null,"Pub.unsub-all*",p);
}
}
}
});

cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2;


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__19448 = arguments.length;
switch (G__19448) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.call(null,ch,topic_fn,cljs.core.constantly.call(null,null));
});

cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = ((function (mults){
return (function (topic){
var or__4047__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,mults),topic);
if(cljs.core.truth_(or__4047__auto__)){
return or__4047__auto__;
} else {
return cljs.core.get.call(null,cljs.core.swap_BANG_.call(null,mults,((function (or__4047__auto__,mults){
return (function (p1__19446_SHARP_){
if(cljs.core.truth_(p1__19446_SHARP_.call(null,topic))){
return p1__19446_SHARP_;
} else {
return cljs.core.assoc.call(null,p1__19446_SHARP_,topic,cljs.core.async.mult.call(null,cljs.core.async.chan.call(null,buf_fn.call(null,topic))));
}
});})(or__4047__auto__,mults))
),topic);
}
});})(mults))
;
var p = (function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19449 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19449 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta19450){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta19450 = meta19450;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (mults,ensure_mult){
return (function (_19451,meta19450__$1){
var self__ = this;
var _19451__$1 = this;
return (new cljs.core.async.t_cljs$core$async19449(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta19450__$1));
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (mults,ensure_mult){
return (function (_19451){
var self__ = this;
var _19451__$1 = this;
return self__.meta19450;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = self__.ensure_mult.call(null,topic);
return cljs.core.async.tap.call(null,m,ch__$1,close_QMARK_);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = ((function (mults,ensure_mult){
return (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5735__auto__ = cljs.core.get.call(null,cljs.core.deref.call(null,self__.mults),topic);
if(cljs.core.truth_(temp__5735__auto__)){
var m = temp__5735__auto__;
return cljs.core.async.untap.call(null,m,ch__$1);
} else {
return null;
}
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = ((function (mults,ensure_mult){
return (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_.call(null,self__.mults,cljs.core.PersistentArrayMap.EMPTY);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = ((function (mults,ensure_mult){
return (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.call(null,self__.mults,cljs.core.dissoc,topic);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.getBasis = ((function (mults,ensure_mult){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta19450","meta19450",-792804677,null)], null);
});})(mults,ensure_mult))
;

cljs.core.async.t_cljs$core$async19449.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19449.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19449";

cljs.core.async.t_cljs$core$async19449.cljs$lang$ctorPrWriter = ((function (mults,ensure_mult){
return (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19449");
});})(mults,ensure_mult))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19449.
 */
cljs.core.async.__GT_t_cljs$core$async19449 = ((function (mults,ensure_mult){
return (function cljs$core$async$__GT_t_cljs$core$async19449(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta19450){
return (new cljs.core.async.t_cljs$core$async19449(ch__$1,topic_fn__$1,buf_fn__$1,mults__$1,ensure_mult__$1,meta19450));
});})(mults,ensure_mult))
;

}

return (new cljs.core.async.t_cljs$core$async19449(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
})()
;
var c__18335__auto___19569 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19569,mults,ensure_mult,p){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19569,mults,ensure_mult,p){
return (function (state_19523){
var state_val_19524 = (state_19523[(1)]);
if((state_val_19524 === (7))){
var inst_19519 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19525_19570 = state_19523__$1;
(statearr_19525_19570[(2)] = inst_19519);

(statearr_19525_19570[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (20))){
var state_19523__$1 = state_19523;
var statearr_19526_19571 = state_19523__$1;
(statearr_19526_19571[(2)] = null);

(statearr_19526_19571[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (1))){
var state_19523__$1 = state_19523;
var statearr_19527_19572 = state_19523__$1;
(statearr_19527_19572[(2)] = null);

(statearr_19527_19572[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (24))){
var inst_19502 = (state_19523[(7)]);
var inst_19511 = cljs.core.swap_BANG_.call(null,mults,cljs.core.dissoc,inst_19502);
var state_19523__$1 = state_19523;
var statearr_19528_19573 = state_19523__$1;
(statearr_19528_19573[(2)] = inst_19511);

(statearr_19528_19573[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (4))){
var inst_19454 = (state_19523[(8)]);
var inst_19454__$1 = (state_19523[(2)]);
var inst_19455 = (inst_19454__$1 == null);
var state_19523__$1 = (function (){var statearr_19529 = state_19523;
(statearr_19529[(8)] = inst_19454__$1);

return statearr_19529;
})();
if(cljs.core.truth_(inst_19455)){
var statearr_19530_19574 = state_19523__$1;
(statearr_19530_19574[(1)] = (5));

} else {
var statearr_19531_19575 = state_19523__$1;
(statearr_19531_19575[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (15))){
var inst_19496 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19532_19576 = state_19523__$1;
(statearr_19532_19576[(2)] = inst_19496);

(statearr_19532_19576[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (21))){
var inst_19516 = (state_19523[(2)]);
var state_19523__$1 = (function (){var statearr_19533 = state_19523;
(statearr_19533[(9)] = inst_19516);

return statearr_19533;
})();
var statearr_19534_19577 = state_19523__$1;
(statearr_19534_19577[(2)] = null);

(statearr_19534_19577[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (13))){
var inst_19478 = (state_19523[(10)]);
var inst_19480 = cljs.core.chunked_seq_QMARK_.call(null,inst_19478);
var state_19523__$1 = state_19523;
if(inst_19480){
var statearr_19535_19578 = state_19523__$1;
(statearr_19535_19578[(1)] = (16));

} else {
var statearr_19536_19579 = state_19523__$1;
(statearr_19536_19579[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (22))){
var inst_19508 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
if(cljs.core.truth_(inst_19508)){
var statearr_19537_19580 = state_19523__$1;
(statearr_19537_19580[(1)] = (23));

} else {
var statearr_19538_19581 = state_19523__$1;
(statearr_19538_19581[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (6))){
var inst_19504 = (state_19523[(11)]);
var inst_19454 = (state_19523[(8)]);
var inst_19502 = (state_19523[(7)]);
var inst_19502__$1 = topic_fn.call(null,inst_19454);
var inst_19503 = cljs.core.deref.call(null,mults);
var inst_19504__$1 = cljs.core.get.call(null,inst_19503,inst_19502__$1);
var state_19523__$1 = (function (){var statearr_19539 = state_19523;
(statearr_19539[(11)] = inst_19504__$1);

(statearr_19539[(7)] = inst_19502__$1);

return statearr_19539;
})();
if(cljs.core.truth_(inst_19504__$1)){
var statearr_19540_19582 = state_19523__$1;
(statearr_19540_19582[(1)] = (19));

} else {
var statearr_19541_19583 = state_19523__$1;
(statearr_19541_19583[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (25))){
var inst_19513 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19542_19584 = state_19523__$1;
(statearr_19542_19584[(2)] = inst_19513);

(statearr_19542_19584[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (17))){
var inst_19478 = (state_19523[(10)]);
var inst_19487 = cljs.core.first.call(null,inst_19478);
var inst_19488 = cljs.core.async.muxch_STAR_.call(null,inst_19487);
var inst_19489 = cljs.core.async.close_BANG_.call(null,inst_19488);
var inst_19490 = cljs.core.next.call(null,inst_19478);
var inst_19464 = inst_19490;
var inst_19465 = null;
var inst_19466 = (0);
var inst_19467 = (0);
var state_19523__$1 = (function (){var statearr_19543 = state_19523;
(statearr_19543[(12)] = inst_19467);

(statearr_19543[(13)] = inst_19465);

(statearr_19543[(14)] = inst_19466);

(statearr_19543[(15)] = inst_19489);

(statearr_19543[(16)] = inst_19464);

return statearr_19543;
})();
var statearr_19544_19585 = state_19523__$1;
(statearr_19544_19585[(2)] = null);

(statearr_19544_19585[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (3))){
var inst_19521 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19523__$1,inst_19521);
} else {
if((state_val_19524 === (12))){
var inst_19498 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19545_19586 = state_19523__$1;
(statearr_19545_19586[(2)] = inst_19498);

(statearr_19545_19586[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (2))){
var state_19523__$1 = state_19523;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19523__$1,(4),ch);
} else {
if((state_val_19524 === (23))){
var state_19523__$1 = state_19523;
var statearr_19546_19587 = state_19523__$1;
(statearr_19546_19587[(2)] = null);

(statearr_19546_19587[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (19))){
var inst_19504 = (state_19523[(11)]);
var inst_19454 = (state_19523[(8)]);
var inst_19506 = cljs.core.async.muxch_STAR_.call(null,inst_19504);
var state_19523__$1 = state_19523;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19523__$1,(22),inst_19506,inst_19454);
} else {
if((state_val_19524 === (11))){
var inst_19478 = (state_19523[(10)]);
var inst_19464 = (state_19523[(16)]);
var inst_19478__$1 = cljs.core.seq.call(null,inst_19464);
var state_19523__$1 = (function (){var statearr_19547 = state_19523;
(statearr_19547[(10)] = inst_19478__$1);

return statearr_19547;
})();
if(inst_19478__$1){
var statearr_19548_19588 = state_19523__$1;
(statearr_19548_19588[(1)] = (13));

} else {
var statearr_19549_19589 = state_19523__$1;
(statearr_19549_19589[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (9))){
var inst_19500 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19550_19590 = state_19523__$1;
(statearr_19550_19590[(2)] = inst_19500);

(statearr_19550_19590[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (5))){
var inst_19461 = cljs.core.deref.call(null,mults);
var inst_19462 = cljs.core.vals.call(null,inst_19461);
var inst_19463 = cljs.core.seq.call(null,inst_19462);
var inst_19464 = inst_19463;
var inst_19465 = null;
var inst_19466 = (0);
var inst_19467 = (0);
var state_19523__$1 = (function (){var statearr_19551 = state_19523;
(statearr_19551[(12)] = inst_19467);

(statearr_19551[(13)] = inst_19465);

(statearr_19551[(14)] = inst_19466);

(statearr_19551[(16)] = inst_19464);

return statearr_19551;
})();
var statearr_19552_19591 = state_19523__$1;
(statearr_19552_19591[(2)] = null);

(statearr_19552_19591[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (14))){
var state_19523__$1 = state_19523;
var statearr_19556_19592 = state_19523__$1;
(statearr_19556_19592[(2)] = null);

(statearr_19556_19592[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (16))){
var inst_19478 = (state_19523[(10)]);
var inst_19482 = cljs.core.chunk_first.call(null,inst_19478);
var inst_19483 = cljs.core.chunk_rest.call(null,inst_19478);
var inst_19484 = cljs.core.count.call(null,inst_19482);
var inst_19464 = inst_19483;
var inst_19465 = inst_19482;
var inst_19466 = inst_19484;
var inst_19467 = (0);
var state_19523__$1 = (function (){var statearr_19557 = state_19523;
(statearr_19557[(12)] = inst_19467);

(statearr_19557[(13)] = inst_19465);

(statearr_19557[(14)] = inst_19466);

(statearr_19557[(16)] = inst_19464);

return statearr_19557;
})();
var statearr_19558_19593 = state_19523__$1;
(statearr_19558_19593[(2)] = null);

(statearr_19558_19593[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (10))){
var inst_19467 = (state_19523[(12)]);
var inst_19465 = (state_19523[(13)]);
var inst_19466 = (state_19523[(14)]);
var inst_19464 = (state_19523[(16)]);
var inst_19472 = cljs.core._nth.call(null,inst_19465,inst_19467);
var inst_19473 = cljs.core.async.muxch_STAR_.call(null,inst_19472);
var inst_19474 = cljs.core.async.close_BANG_.call(null,inst_19473);
var inst_19475 = (inst_19467 + (1));
var tmp19553 = inst_19465;
var tmp19554 = inst_19466;
var tmp19555 = inst_19464;
var inst_19464__$1 = tmp19555;
var inst_19465__$1 = tmp19553;
var inst_19466__$1 = tmp19554;
var inst_19467__$1 = inst_19475;
var state_19523__$1 = (function (){var statearr_19559 = state_19523;
(statearr_19559[(12)] = inst_19467__$1);

(statearr_19559[(13)] = inst_19465__$1);

(statearr_19559[(14)] = inst_19466__$1);

(statearr_19559[(17)] = inst_19474);

(statearr_19559[(16)] = inst_19464__$1);

return statearr_19559;
})();
var statearr_19560_19594 = state_19523__$1;
(statearr_19560_19594[(2)] = null);

(statearr_19560_19594[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (18))){
var inst_19493 = (state_19523[(2)]);
var state_19523__$1 = state_19523;
var statearr_19561_19595 = state_19523__$1;
(statearr_19561_19595[(2)] = inst_19493);

(statearr_19561_19595[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19524 === (8))){
var inst_19467 = (state_19523[(12)]);
var inst_19466 = (state_19523[(14)]);
var inst_19469 = (inst_19467 < inst_19466);
var inst_19470 = inst_19469;
var state_19523__$1 = state_19523;
if(cljs.core.truth_(inst_19470)){
var statearr_19562_19596 = state_19523__$1;
(statearr_19562_19596[(1)] = (10));

} else {
var statearr_19563_19597 = state_19523__$1;
(statearr_19563_19597[(1)] = (11));

}

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
});})(c__18335__auto___19569,mults,ensure_mult,p))
;
return ((function (switch__18240__auto__,c__18335__auto___19569,mults,ensure_mult,p){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_19564 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19564[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_19564[(1)] = (1));

return statearr_19564;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_19523){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19523);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19565){if((e19565 instanceof Object)){
var ex__18244__auto__ = e19565;
var statearr_19566_19598 = state_19523;
(statearr_19566_19598[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19523);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19565;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19599 = state_19523;
state_19523 = G__19599;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_19523){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_19523);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19569,mults,ensure_mult,p))
})();
var state__18337__auto__ = (function (){var statearr_19567 = f__18336__auto__.call(null);
(statearr_19567[(6)] = c__18335__auto___19569);

return statearr_19567;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19569,mults,ensure_mult,p))
);


return p;
});

cljs.core.async.pub.cljs$lang$maxFixedArity = 3;

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__19601 = arguments.length;
switch (G__19601) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.call(null,p,topic,ch,true);
});

cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_.call(null,p,topic,ch,close_QMARK_);
});

cljs.core.async.sub.cljs$lang$maxFixedArity = 4;

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_.call(null,p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__19604 = arguments.length;
switch (G__19604) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_.call(null,p);
});

cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_.call(null,p,topic);
});

cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2;

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__19607 = arguments.length;
switch (G__19607) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.call(null,f,chs,null);
});

cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec.call(null,chs);
var out = cljs.core.async.chan.call(null,buf_or_n);
var cnt = cljs.core.count.call(null,chs__$1);
var rets = cljs.core.object_array.call(null,cnt);
var dchan = cljs.core.async.chan.call(null,(1));
var dctr = cljs.core.atom.call(null,null);
var done = cljs.core.mapv.call(null,((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (i){
return ((function (chs__$1,out,cnt,rets,dchan,dctr){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.call(null,dchan,rets.slice((0)));
} else {
return null;
}
});
;})(chs__$1,out,cnt,rets,dchan,dctr))
});})(chs__$1,out,cnt,rets,dchan,dctr))
,cljs.core.range.call(null,cnt));
var c__18335__auto___19674 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function (state_19646){
var state_val_19647 = (state_19646[(1)]);
if((state_val_19647 === (7))){
var state_19646__$1 = state_19646;
var statearr_19648_19675 = state_19646__$1;
(statearr_19648_19675[(2)] = null);

(statearr_19648_19675[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (1))){
var state_19646__$1 = state_19646;
var statearr_19649_19676 = state_19646__$1;
(statearr_19649_19676[(2)] = null);

(statearr_19649_19676[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (4))){
var inst_19610 = (state_19646[(7)]);
var inst_19612 = (inst_19610 < cnt);
var state_19646__$1 = state_19646;
if(cljs.core.truth_(inst_19612)){
var statearr_19650_19677 = state_19646__$1;
(statearr_19650_19677[(1)] = (6));

} else {
var statearr_19651_19678 = state_19646__$1;
(statearr_19651_19678[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (15))){
var inst_19642 = (state_19646[(2)]);
var state_19646__$1 = state_19646;
var statearr_19652_19679 = state_19646__$1;
(statearr_19652_19679[(2)] = inst_19642);

(statearr_19652_19679[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (13))){
var inst_19635 = cljs.core.async.close_BANG_.call(null,out);
var state_19646__$1 = state_19646;
var statearr_19653_19680 = state_19646__$1;
(statearr_19653_19680[(2)] = inst_19635);

(statearr_19653_19680[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (6))){
var state_19646__$1 = state_19646;
var statearr_19654_19681 = state_19646__$1;
(statearr_19654_19681[(2)] = null);

(statearr_19654_19681[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (3))){
var inst_19644 = (state_19646[(2)]);
var state_19646__$1 = state_19646;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19646__$1,inst_19644);
} else {
if((state_val_19647 === (12))){
var inst_19632 = (state_19646[(8)]);
var inst_19632__$1 = (state_19646[(2)]);
var inst_19633 = cljs.core.some.call(null,cljs.core.nil_QMARK_,inst_19632__$1);
var state_19646__$1 = (function (){var statearr_19655 = state_19646;
(statearr_19655[(8)] = inst_19632__$1);

return statearr_19655;
})();
if(cljs.core.truth_(inst_19633)){
var statearr_19656_19682 = state_19646__$1;
(statearr_19656_19682[(1)] = (13));

} else {
var statearr_19657_19683 = state_19646__$1;
(statearr_19657_19683[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (2))){
var inst_19609 = cljs.core.reset_BANG_.call(null,dctr,cnt);
var inst_19610 = (0);
var state_19646__$1 = (function (){var statearr_19658 = state_19646;
(statearr_19658[(9)] = inst_19609);

(statearr_19658[(7)] = inst_19610);

return statearr_19658;
})();
var statearr_19659_19684 = state_19646__$1;
(statearr_19659_19684[(2)] = null);

(statearr_19659_19684[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (11))){
var inst_19610 = (state_19646[(7)]);
var _ = cljs.core.async.impl.ioc_helpers.add_exception_frame.call(null,state_19646,(10),Object,null,(9));
var inst_19619 = chs__$1.call(null,inst_19610);
var inst_19620 = done.call(null,inst_19610);
var inst_19621 = cljs.core.async.take_BANG_.call(null,inst_19619,inst_19620);
var state_19646__$1 = state_19646;
var statearr_19660_19685 = state_19646__$1;
(statearr_19660_19685[(2)] = inst_19621);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19646__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (9))){
var inst_19610 = (state_19646[(7)]);
var inst_19623 = (state_19646[(2)]);
var inst_19624 = (inst_19610 + (1));
var inst_19610__$1 = inst_19624;
var state_19646__$1 = (function (){var statearr_19661 = state_19646;
(statearr_19661[(7)] = inst_19610__$1);

(statearr_19661[(10)] = inst_19623);

return statearr_19661;
})();
var statearr_19662_19686 = state_19646__$1;
(statearr_19662_19686[(2)] = null);

(statearr_19662_19686[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (5))){
var inst_19630 = (state_19646[(2)]);
var state_19646__$1 = (function (){var statearr_19663 = state_19646;
(statearr_19663[(11)] = inst_19630);

return statearr_19663;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19646__$1,(12),dchan);
} else {
if((state_val_19647 === (14))){
var inst_19632 = (state_19646[(8)]);
var inst_19637 = cljs.core.apply.call(null,f,inst_19632);
var state_19646__$1 = state_19646;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19646__$1,(16),out,inst_19637);
} else {
if((state_val_19647 === (16))){
var inst_19639 = (state_19646[(2)]);
var state_19646__$1 = (function (){var statearr_19664 = state_19646;
(statearr_19664[(12)] = inst_19639);

return statearr_19664;
})();
var statearr_19665_19687 = state_19646__$1;
(statearr_19665_19687[(2)] = null);

(statearr_19665_19687[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (10))){
var inst_19614 = (state_19646[(2)]);
var inst_19615 = cljs.core.swap_BANG_.call(null,dctr,cljs.core.dec);
var state_19646__$1 = (function (){var statearr_19666 = state_19646;
(statearr_19666[(13)] = inst_19614);

return statearr_19666;
})();
var statearr_19667_19688 = state_19646__$1;
(statearr_19667_19688[(2)] = inst_19615);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19646__$1);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19647 === (8))){
var inst_19628 = (state_19646[(2)]);
var state_19646__$1 = state_19646;
var statearr_19668_19689 = state_19646__$1;
(statearr_19668_19689[(2)] = inst_19628);

(statearr_19668_19689[(1)] = (5));


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
});})(c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done))
;
return ((function (switch__18240__auto__,c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_19669 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19669[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_19669[(1)] = (1));

return statearr_19669;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_19646){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19646);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19670){if((e19670 instanceof Object)){
var ex__18244__auto__ = e19670;
var statearr_19671_19690 = state_19646;
(statearr_19671_19690[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19646);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19670;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19691 = state_19646;
state_19646 = G__19691;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_19646){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_19646);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done))
})();
var state__18337__auto__ = (function (){var statearr_19672 = f__18336__auto__.call(null);
(statearr_19672[(6)] = c__18335__auto___19674);

return statearr_19672;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19674,chs__$1,out,cnt,rets,dchan,dctr,done))
);


return out;
});

cljs.core.async.map.cljs$lang$maxFixedArity = 3;

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__19694 = arguments.length;
switch (G__19694) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.call(null,chs,null);
});

cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___19748 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19748,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19748,out){
return (function (state_19726){
var state_val_19727 = (state_19726[(1)]);
if((state_val_19727 === (7))){
var inst_19705 = (state_19726[(7)]);
var inst_19706 = (state_19726[(8)]);
var inst_19705__$1 = (state_19726[(2)]);
var inst_19706__$1 = cljs.core.nth.call(null,inst_19705__$1,(0),null);
var inst_19707 = cljs.core.nth.call(null,inst_19705__$1,(1),null);
var inst_19708 = (inst_19706__$1 == null);
var state_19726__$1 = (function (){var statearr_19728 = state_19726;
(statearr_19728[(7)] = inst_19705__$1);

(statearr_19728[(8)] = inst_19706__$1);

(statearr_19728[(9)] = inst_19707);

return statearr_19728;
})();
if(cljs.core.truth_(inst_19708)){
var statearr_19729_19749 = state_19726__$1;
(statearr_19729_19749[(1)] = (8));

} else {
var statearr_19730_19750 = state_19726__$1;
(statearr_19730_19750[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (1))){
var inst_19695 = cljs.core.vec.call(null,chs);
var inst_19696 = inst_19695;
var state_19726__$1 = (function (){var statearr_19731 = state_19726;
(statearr_19731[(10)] = inst_19696);

return statearr_19731;
})();
var statearr_19732_19751 = state_19726__$1;
(statearr_19732_19751[(2)] = null);

(statearr_19732_19751[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (4))){
var inst_19696 = (state_19726[(10)]);
var state_19726__$1 = state_19726;
return cljs.core.async.ioc_alts_BANG_.call(null,state_19726__$1,(7),inst_19696);
} else {
if((state_val_19727 === (6))){
var inst_19722 = (state_19726[(2)]);
var state_19726__$1 = state_19726;
var statearr_19733_19752 = state_19726__$1;
(statearr_19733_19752[(2)] = inst_19722);

(statearr_19733_19752[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (3))){
var inst_19724 = (state_19726[(2)]);
var state_19726__$1 = state_19726;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19726__$1,inst_19724);
} else {
if((state_val_19727 === (2))){
var inst_19696 = (state_19726[(10)]);
var inst_19698 = cljs.core.count.call(null,inst_19696);
var inst_19699 = (inst_19698 > (0));
var state_19726__$1 = state_19726;
if(cljs.core.truth_(inst_19699)){
var statearr_19735_19753 = state_19726__$1;
(statearr_19735_19753[(1)] = (4));

} else {
var statearr_19736_19754 = state_19726__$1;
(statearr_19736_19754[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (11))){
var inst_19696 = (state_19726[(10)]);
var inst_19715 = (state_19726[(2)]);
var tmp19734 = inst_19696;
var inst_19696__$1 = tmp19734;
var state_19726__$1 = (function (){var statearr_19737 = state_19726;
(statearr_19737[(11)] = inst_19715);

(statearr_19737[(10)] = inst_19696__$1);

return statearr_19737;
})();
var statearr_19738_19755 = state_19726__$1;
(statearr_19738_19755[(2)] = null);

(statearr_19738_19755[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (9))){
var inst_19706 = (state_19726[(8)]);
var state_19726__$1 = state_19726;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19726__$1,(11),out,inst_19706);
} else {
if((state_val_19727 === (5))){
var inst_19720 = cljs.core.async.close_BANG_.call(null,out);
var state_19726__$1 = state_19726;
var statearr_19739_19756 = state_19726__$1;
(statearr_19739_19756[(2)] = inst_19720);

(statearr_19739_19756[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (10))){
var inst_19718 = (state_19726[(2)]);
var state_19726__$1 = state_19726;
var statearr_19740_19757 = state_19726__$1;
(statearr_19740_19757[(2)] = inst_19718);

(statearr_19740_19757[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19727 === (8))){
var inst_19705 = (state_19726[(7)]);
var inst_19706 = (state_19726[(8)]);
var inst_19707 = (state_19726[(9)]);
var inst_19696 = (state_19726[(10)]);
var inst_19710 = (function (){var cs = inst_19696;
var vec__19701 = inst_19705;
var v = inst_19706;
var c = inst_19707;
return ((function (cs,vec__19701,v,c,inst_19705,inst_19706,inst_19707,inst_19696,state_val_19727,c__18335__auto___19748,out){
return (function (p1__19692_SHARP_){
return cljs.core.not_EQ_.call(null,c,p1__19692_SHARP_);
});
;})(cs,vec__19701,v,c,inst_19705,inst_19706,inst_19707,inst_19696,state_val_19727,c__18335__auto___19748,out))
})();
var inst_19711 = cljs.core.filterv.call(null,inst_19710,inst_19696);
var inst_19696__$1 = inst_19711;
var state_19726__$1 = (function (){var statearr_19741 = state_19726;
(statearr_19741[(10)] = inst_19696__$1);

return statearr_19741;
})();
var statearr_19742_19758 = state_19726__$1;
(statearr_19742_19758[(2)] = null);

(statearr_19742_19758[(1)] = (2));


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
});})(c__18335__auto___19748,out))
;
return ((function (switch__18240__auto__,c__18335__auto___19748,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_19743 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19743[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_19743[(1)] = (1));

return statearr_19743;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_19726){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19726);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19744){if((e19744 instanceof Object)){
var ex__18244__auto__ = e19744;
var statearr_19745_19759 = state_19726;
(statearr_19745_19759[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19726);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19744;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19760 = state_19726;
state_19726 = G__19760;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_19726){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_19726);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19748,out))
})();
var state__18337__auto__ = (function (){var statearr_19746 = f__18336__auto__.call(null);
(statearr_19746[(6)] = c__18335__auto___19748);

return statearr_19746;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19748,out))
);


return out;
});

cljs.core.async.merge.cljs$lang$maxFixedArity = 2;

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce.call(null,cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__19762 = arguments.length;
switch (G__19762) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.call(null,n,ch,null);
});

cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___19807 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19807,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19807,out){
return (function (state_19786){
var state_val_19787 = (state_19786[(1)]);
if((state_val_19787 === (7))){
var inst_19768 = (state_19786[(7)]);
var inst_19768__$1 = (state_19786[(2)]);
var inst_19769 = (inst_19768__$1 == null);
var inst_19770 = cljs.core.not.call(null,inst_19769);
var state_19786__$1 = (function (){var statearr_19788 = state_19786;
(statearr_19788[(7)] = inst_19768__$1);

return statearr_19788;
})();
if(inst_19770){
var statearr_19789_19808 = state_19786__$1;
(statearr_19789_19808[(1)] = (8));

} else {
var statearr_19790_19809 = state_19786__$1;
(statearr_19790_19809[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (1))){
var inst_19763 = (0);
var state_19786__$1 = (function (){var statearr_19791 = state_19786;
(statearr_19791[(8)] = inst_19763);

return statearr_19791;
})();
var statearr_19792_19810 = state_19786__$1;
(statearr_19792_19810[(2)] = null);

(statearr_19792_19810[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (4))){
var state_19786__$1 = state_19786;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19786__$1,(7),ch);
} else {
if((state_val_19787 === (6))){
var inst_19781 = (state_19786[(2)]);
var state_19786__$1 = state_19786;
var statearr_19793_19811 = state_19786__$1;
(statearr_19793_19811[(2)] = inst_19781);

(statearr_19793_19811[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (3))){
var inst_19783 = (state_19786[(2)]);
var inst_19784 = cljs.core.async.close_BANG_.call(null,out);
var state_19786__$1 = (function (){var statearr_19794 = state_19786;
(statearr_19794[(9)] = inst_19783);

return statearr_19794;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19786__$1,inst_19784);
} else {
if((state_val_19787 === (2))){
var inst_19763 = (state_19786[(8)]);
var inst_19765 = (inst_19763 < n);
var state_19786__$1 = state_19786;
if(cljs.core.truth_(inst_19765)){
var statearr_19795_19812 = state_19786__$1;
(statearr_19795_19812[(1)] = (4));

} else {
var statearr_19796_19813 = state_19786__$1;
(statearr_19796_19813[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (11))){
var inst_19763 = (state_19786[(8)]);
var inst_19773 = (state_19786[(2)]);
var inst_19774 = (inst_19763 + (1));
var inst_19763__$1 = inst_19774;
var state_19786__$1 = (function (){var statearr_19797 = state_19786;
(statearr_19797[(10)] = inst_19773);

(statearr_19797[(8)] = inst_19763__$1);

return statearr_19797;
})();
var statearr_19798_19814 = state_19786__$1;
(statearr_19798_19814[(2)] = null);

(statearr_19798_19814[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (9))){
var state_19786__$1 = state_19786;
var statearr_19799_19815 = state_19786__$1;
(statearr_19799_19815[(2)] = null);

(statearr_19799_19815[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (5))){
var state_19786__$1 = state_19786;
var statearr_19800_19816 = state_19786__$1;
(statearr_19800_19816[(2)] = null);

(statearr_19800_19816[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (10))){
var inst_19778 = (state_19786[(2)]);
var state_19786__$1 = state_19786;
var statearr_19801_19817 = state_19786__$1;
(statearr_19801_19817[(2)] = inst_19778);

(statearr_19801_19817[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19787 === (8))){
var inst_19768 = (state_19786[(7)]);
var state_19786__$1 = state_19786;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19786__$1,(11),out,inst_19768);
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
});})(c__18335__auto___19807,out))
;
return ((function (switch__18240__auto__,c__18335__auto___19807,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_19802 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_19802[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_19802[(1)] = (1));

return statearr_19802;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_19786){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19786);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19803){if((e19803 instanceof Object)){
var ex__18244__auto__ = e19803;
var statearr_19804_19818 = state_19786;
(statearr_19804_19818[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19786);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19803;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19819 = state_19786;
state_19786 = G__19819;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_19786){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_19786);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19807,out))
})();
var state__18337__auto__ = (function (){var statearr_19805 = f__18336__auto__.call(null);
(statearr_19805[(6)] = c__18335__auto___19807);

return statearr_19805;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19807,out))
);


return out;
});

cljs.core.async.take.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19821 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19821 = (function (f,ch,meta19822){
this.f = f;
this.ch = ch;
this.meta19822 = meta19822;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19823,meta19822__$1){
var self__ = this;
var _19823__$1 = this;
return (new cljs.core.async.t_cljs$core$async19821(self__.f,self__.ch,meta19822__$1));
});

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19823){
var self__ = this;
var _19823__$1 = this;
return self__.meta19822;
});

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,(function (){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19824 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19824 = (function (f,ch,meta19822,_,fn1,meta19825){
this.f = f;
this.ch = ch;
this.meta19822 = meta19822;
this._ = _;
this.fn1 = fn1;
this.meta19825 = meta19825;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = ((function (___$1){
return (function (_19826,meta19825__$1){
var self__ = this;
var _19826__$1 = this;
return (new cljs.core.async.t_cljs$core$async19824(self__.f,self__.ch,self__.meta19822,self__._,self__.fn1,meta19825__$1));
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$IMeta$_meta$arity$1 = ((function (___$1){
return (function (_19826){
var self__ = this;
var _19826__$1 = this;
return self__.meta19825;
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_.call(null,self__.fn1);
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = ((function (___$1){
return (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit.call(null,self__.fn1);
return ((function (f1,___$2,___$1){
return (function (p1__19820_SHARP_){
return f1.call(null,(((p1__19820_SHARP_ == null))?null:self__.f.call(null,p1__19820_SHARP_)));
});
;})(f1,___$2,___$1))
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.getBasis = ((function (___$1){
return (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19822","meta19822",312034446,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async19821","cljs.core.async/t_cljs$core$async19821",121750256,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta19825","meta19825",-1699044547,null)], null);
});})(___$1))
;

cljs.core.async.t_cljs$core$async19824.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19824.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19824";

cljs.core.async.t_cljs$core$async19824.cljs$lang$ctorPrWriter = ((function (___$1){
return (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19824");
});})(___$1))
;

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19824.
 */
cljs.core.async.__GT_t_cljs$core$async19824 = ((function (___$1){
return (function cljs$core$async$map_LT__$___GT_t_cljs$core$async19824(f__$1,ch__$1,meta19822__$1,___$2,fn1__$1,meta19825){
return (new cljs.core.async.t_cljs$core$async19824(f__$1,ch__$1,meta19822__$1,___$2,fn1__$1,meta19825));
});})(___$1))
;

}

return (new cljs.core.async.t_cljs$core$async19824(self__.f,self__.ch,self__.meta19822,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY));
})()
);
if(cljs.core.truth_((function (){var and__4036__auto__ = ret;
if(cljs.core.truth_(and__4036__auto__)){
return (!((cljs.core.deref.call(null,ret) == null)));
} else {
return and__4036__auto__;
}
})())){
return cljs.core.async.impl.channels.box.call(null,self__.f.call(null,cljs.core.deref.call(null,ret)));
} else {
return ret;
}
});

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19821.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
});

cljs.core.async.t_cljs$core$async19821.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19822","meta19822",312034446,null)], null);
});

cljs.core.async.t_cljs$core$async19821.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19821.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19821";

cljs.core.async.t_cljs$core$async19821.cljs$lang$ctorPrWriter = (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19821");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19821.
 */
cljs.core.async.__GT_t_cljs$core$async19821 = (function cljs$core$async$map_LT__$___GT_t_cljs$core$async19821(f__$1,ch__$1,meta19822){
return (new cljs.core.async.t_cljs$core$async19821(f__$1,ch__$1,meta19822));
});

}

return (new cljs.core.async.t_cljs$core$async19821(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19827 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19827 = (function (f,ch,meta19828){
this.f = f;
this.ch = ch;
this.meta19828 = meta19828;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19829,meta19828__$1){
var self__ = this;
var _19829__$1 = this;
return (new cljs.core.async.t_cljs$core$async19827(self__.f,self__.ch,meta19828__$1));
});

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19829){
var self__ = this;
var _19829__$1 = this;
return self__.meta19828;
});

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19827.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,self__.f.call(null,val),fn1);
});

cljs.core.async.t_cljs$core$async19827.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19828","meta19828",-1512688931,null)], null);
});

cljs.core.async.t_cljs$core$async19827.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19827.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19827";

cljs.core.async.t_cljs$core$async19827.cljs$lang$ctorPrWriter = (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19827");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19827.
 */
cljs.core.async.__GT_t_cljs$core$async19827 = (function cljs$core$async$map_GT__$___GT_t_cljs$core$async19827(f__$1,ch__$1,meta19828){
return (new cljs.core.async.t_cljs$core$async19827(f__$1,ch__$1,meta19828));
});

}

return (new cljs.core.async.t_cljs$core$async19827(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
if((typeof cljs !== 'undefined') && (typeof cljs.core !== 'undefined') && (typeof cljs.core.async !== 'undefined') && (typeof cljs.core.async.t_cljs$core$async19830 !== 'undefined')){
} else {

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async19830 = (function (p,ch,meta19831){
this.p = p;
this.ch = ch;
this.meta19831 = meta19831;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_19832,meta19831__$1){
var self__ = this;
var _19832__$1 = this;
return (new cljs.core.async.t_cljs$core$async19830(self__.p,self__.ch,meta19831__$1));
});

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_19832){
var self__ = this;
var _19832__$1 = this;
return self__.meta19831;
});

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch);
});

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_.call(null,self__.ch,fn1);
});

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL;

cljs.core.async.t_cljs$core$async19830.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_(self__.p.call(null,val))){
return cljs.core.async.impl.protocols.put_BANG_.call(null,self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box.call(null,cljs.core.not.call(null,cljs.core.async.impl.protocols.closed_QMARK_.call(null,self__.ch)));
}
});

cljs.core.async.t_cljs$core$async19830.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta19831","meta19831",1850398299,null)], null);
});

cljs.core.async.t_cljs$core$async19830.cljs$lang$type = true;

cljs.core.async.t_cljs$core$async19830.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async19830";

cljs.core.async.t_cljs$core$async19830.cljs$lang$ctorPrWriter = (function (this__4290__auto__,writer__4291__auto__,opt__4292__auto__){
return cljs.core._write.call(null,writer__4291__auto__,"cljs.core.async/t_cljs$core$async19830");
});

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async19830.
 */
cljs.core.async.__GT_t_cljs$core$async19830 = (function cljs$core$async$filter_GT__$___GT_t_cljs$core$async19830(p__$1,ch__$1,meta19831){
return (new cljs.core.async.t_cljs$core$async19830(p__$1,ch__$1,meta19831));
});

}

return (new cljs.core.async.t_cljs$core$async19830(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_.call(null,cljs.core.complement.call(null,p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__19834 = arguments.length;
switch (G__19834) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.call(null,p,ch,null);
});

cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___19874 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___19874,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___19874,out){
return (function (state_19855){
var state_val_19856 = (state_19855[(1)]);
if((state_val_19856 === (7))){
var inst_19851 = (state_19855[(2)]);
var state_19855__$1 = state_19855;
var statearr_19857_19875 = state_19855__$1;
(statearr_19857_19875[(2)] = inst_19851);

(statearr_19857_19875[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (1))){
var state_19855__$1 = state_19855;
var statearr_19858_19876 = state_19855__$1;
(statearr_19858_19876[(2)] = null);

(statearr_19858_19876[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (4))){
var inst_19837 = (state_19855[(7)]);
var inst_19837__$1 = (state_19855[(2)]);
var inst_19838 = (inst_19837__$1 == null);
var state_19855__$1 = (function (){var statearr_19859 = state_19855;
(statearr_19859[(7)] = inst_19837__$1);

return statearr_19859;
})();
if(cljs.core.truth_(inst_19838)){
var statearr_19860_19877 = state_19855__$1;
(statearr_19860_19877[(1)] = (5));

} else {
var statearr_19861_19878 = state_19855__$1;
(statearr_19861_19878[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (6))){
var inst_19837 = (state_19855[(7)]);
var inst_19842 = p.call(null,inst_19837);
var state_19855__$1 = state_19855;
if(cljs.core.truth_(inst_19842)){
var statearr_19862_19879 = state_19855__$1;
(statearr_19862_19879[(1)] = (8));

} else {
var statearr_19863_19880 = state_19855__$1;
(statearr_19863_19880[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (3))){
var inst_19853 = (state_19855[(2)]);
var state_19855__$1 = state_19855;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19855__$1,inst_19853);
} else {
if((state_val_19856 === (2))){
var state_19855__$1 = state_19855;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19855__$1,(4),ch);
} else {
if((state_val_19856 === (11))){
var inst_19845 = (state_19855[(2)]);
var state_19855__$1 = state_19855;
var statearr_19864_19881 = state_19855__$1;
(statearr_19864_19881[(2)] = inst_19845);

(statearr_19864_19881[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (9))){
var state_19855__$1 = state_19855;
var statearr_19865_19882 = state_19855__$1;
(statearr_19865_19882[(2)] = null);

(statearr_19865_19882[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (5))){
var inst_19840 = cljs.core.async.close_BANG_.call(null,out);
var state_19855__$1 = state_19855;
var statearr_19866_19883 = state_19855__$1;
(statearr_19866_19883[(2)] = inst_19840);

(statearr_19866_19883[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (10))){
var inst_19848 = (state_19855[(2)]);
var state_19855__$1 = (function (){var statearr_19867 = state_19855;
(statearr_19867[(8)] = inst_19848);

return statearr_19867;
})();
var statearr_19868_19884 = state_19855__$1;
(statearr_19868_19884[(2)] = null);

(statearr_19868_19884[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19856 === (8))){
var inst_19837 = (state_19855[(7)]);
var state_19855__$1 = state_19855;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19855__$1,(11),out,inst_19837);
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
});})(c__18335__auto___19874,out))
;
return ((function (switch__18240__auto__,c__18335__auto___19874,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_19869 = [null,null,null,null,null,null,null,null,null];
(statearr_19869[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_19869[(1)] = (1));

return statearr_19869;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_19855){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19855);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19870){if((e19870 instanceof Object)){
var ex__18244__auto__ = e19870;
var statearr_19871_19885 = state_19855;
(statearr_19871_19885[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19855);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19870;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__19886 = state_19855;
state_19855 = G__19886;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_19855){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_19855);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___19874,out))
})();
var state__18337__auto__ = (function (){var statearr_19872 = f__18336__auto__.call(null);
(statearr_19872[(6)] = c__18335__auto___19874);

return statearr_19872;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___19874,out))
);


return out;
});

cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__19888 = arguments.length;
switch (G__19888) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.call(null,p,ch,null);
});

cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.call(null,cljs.core.complement.call(null,p),ch,buf_or_n);
});

cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3;

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__18335__auto__ = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto__){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto__){
return (function (state_19951){
var state_val_19952 = (state_19951[(1)]);
if((state_val_19952 === (7))){
var inst_19947 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
var statearr_19953_19991 = state_19951__$1;
(statearr_19953_19991[(2)] = inst_19947);

(statearr_19953_19991[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (20))){
var inst_19917 = (state_19951[(7)]);
var inst_19928 = (state_19951[(2)]);
var inst_19929 = cljs.core.next.call(null,inst_19917);
var inst_19903 = inst_19929;
var inst_19904 = null;
var inst_19905 = (0);
var inst_19906 = (0);
var state_19951__$1 = (function (){var statearr_19954 = state_19951;
(statearr_19954[(8)] = inst_19903);

(statearr_19954[(9)] = inst_19905);

(statearr_19954[(10)] = inst_19906);

(statearr_19954[(11)] = inst_19928);

(statearr_19954[(12)] = inst_19904);

return statearr_19954;
})();
var statearr_19955_19992 = state_19951__$1;
(statearr_19955_19992[(2)] = null);

(statearr_19955_19992[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (1))){
var state_19951__$1 = state_19951;
var statearr_19956_19993 = state_19951__$1;
(statearr_19956_19993[(2)] = null);

(statearr_19956_19993[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (4))){
var inst_19892 = (state_19951[(13)]);
var inst_19892__$1 = (state_19951[(2)]);
var inst_19893 = (inst_19892__$1 == null);
var state_19951__$1 = (function (){var statearr_19957 = state_19951;
(statearr_19957[(13)] = inst_19892__$1);

return statearr_19957;
})();
if(cljs.core.truth_(inst_19893)){
var statearr_19958_19994 = state_19951__$1;
(statearr_19958_19994[(1)] = (5));

} else {
var statearr_19959_19995 = state_19951__$1;
(statearr_19959_19995[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (15))){
var state_19951__$1 = state_19951;
var statearr_19963_19996 = state_19951__$1;
(statearr_19963_19996[(2)] = null);

(statearr_19963_19996[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (21))){
var state_19951__$1 = state_19951;
var statearr_19964_19997 = state_19951__$1;
(statearr_19964_19997[(2)] = null);

(statearr_19964_19997[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (13))){
var inst_19903 = (state_19951[(8)]);
var inst_19905 = (state_19951[(9)]);
var inst_19906 = (state_19951[(10)]);
var inst_19904 = (state_19951[(12)]);
var inst_19913 = (state_19951[(2)]);
var inst_19914 = (inst_19906 + (1));
var tmp19960 = inst_19903;
var tmp19961 = inst_19905;
var tmp19962 = inst_19904;
var inst_19903__$1 = tmp19960;
var inst_19904__$1 = tmp19962;
var inst_19905__$1 = tmp19961;
var inst_19906__$1 = inst_19914;
var state_19951__$1 = (function (){var statearr_19965 = state_19951;
(statearr_19965[(8)] = inst_19903__$1);

(statearr_19965[(14)] = inst_19913);

(statearr_19965[(9)] = inst_19905__$1);

(statearr_19965[(10)] = inst_19906__$1);

(statearr_19965[(12)] = inst_19904__$1);

return statearr_19965;
})();
var statearr_19966_19998 = state_19951__$1;
(statearr_19966_19998[(2)] = null);

(statearr_19966_19998[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (22))){
var state_19951__$1 = state_19951;
var statearr_19967_19999 = state_19951__$1;
(statearr_19967_19999[(2)] = null);

(statearr_19967_19999[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (6))){
var inst_19892 = (state_19951[(13)]);
var inst_19901 = f.call(null,inst_19892);
var inst_19902 = cljs.core.seq.call(null,inst_19901);
var inst_19903 = inst_19902;
var inst_19904 = null;
var inst_19905 = (0);
var inst_19906 = (0);
var state_19951__$1 = (function (){var statearr_19968 = state_19951;
(statearr_19968[(8)] = inst_19903);

(statearr_19968[(9)] = inst_19905);

(statearr_19968[(10)] = inst_19906);

(statearr_19968[(12)] = inst_19904);

return statearr_19968;
})();
var statearr_19969_20000 = state_19951__$1;
(statearr_19969_20000[(2)] = null);

(statearr_19969_20000[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (17))){
var inst_19917 = (state_19951[(7)]);
var inst_19921 = cljs.core.chunk_first.call(null,inst_19917);
var inst_19922 = cljs.core.chunk_rest.call(null,inst_19917);
var inst_19923 = cljs.core.count.call(null,inst_19921);
var inst_19903 = inst_19922;
var inst_19904 = inst_19921;
var inst_19905 = inst_19923;
var inst_19906 = (0);
var state_19951__$1 = (function (){var statearr_19970 = state_19951;
(statearr_19970[(8)] = inst_19903);

(statearr_19970[(9)] = inst_19905);

(statearr_19970[(10)] = inst_19906);

(statearr_19970[(12)] = inst_19904);

return statearr_19970;
})();
var statearr_19971_20001 = state_19951__$1;
(statearr_19971_20001[(2)] = null);

(statearr_19971_20001[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (3))){
var inst_19949 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_19951__$1,inst_19949);
} else {
if((state_val_19952 === (12))){
var inst_19937 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
var statearr_19972_20002 = state_19951__$1;
(statearr_19972_20002[(2)] = inst_19937);

(statearr_19972_20002[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (2))){
var state_19951__$1 = state_19951;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_19951__$1,(4),in$);
} else {
if((state_val_19952 === (23))){
var inst_19945 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
var statearr_19973_20003 = state_19951__$1;
(statearr_19973_20003[(2)] = inst_19945);

(statearr_19973_20003[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (19))){
var inst_19932 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
var statearr_19974_20004 = state_19951__$1;
(statearr_19974_20004[(2)] = inst_19932);

(statearr_19974_20004[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (11))){
var inst_19903 = (state_19951[(8)]);
var inst_19917 = (state_19951[(7)]);
var inst_19917__$1 = cljs.core.seq.call(null,inst_19903);
var state_19951__$1 = (function (){var statearr_19975 = state_19951;
(statearr_19975[(7)] = inst_19917__$1);

return statearr_19975;
})();
if(inst_19917__$1){
var statearr_19976_20005 = state_19951__$1;
(statearr_19976_20005[(1)] = (14));

} else {
var statearr_19977_20006 = state_19951__$1;
(statearr_19977_20006[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (9))){
var inst_19939 = (state_19951[(2)]);
var inst_19940 = cljs.core.async.impl.protocols.closed_QMARK_.call(null,out);
var state_19951__$1 = (function (){var statearr_19978 = state_19951;
(statearr_19978[(15)] = inst_19939);

return statearr_19978;
})();
if(cljs.core.truth_(inst_19940)){
var statearr_19979_20007 = state_19951__$1;
(statearr_19979_20007[(1)] = (21));

} else {
var statearr_19980_20008 = state_19951__$1;
(statearr_19980_20008[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (5))){
var inst_19895 = cljs.core.async.close_BANG_.call(null,out);
var state_19951__$1 = state_19951;
var statearr_19981_20009 = state_19951__$1;
(statearr_19981_20009[(2)] = inst_19895);

(statearr_19981_20009[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (14))){
var inst_19917 = (state_19951[(7)]);
var inst_19919 = cljs.core.chunked_seq_QMARK_.call(null,inst_19917);
var state_19951__$1 = state_19951;
if(inst_19919){
var statearr_19982_20010 = state_19951__$1;
(statearr_19982_20010[(1)] = (17));

} else {
var statearr_19983_20011 = state_19951__$1;
(statearr_19983_20011[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (16))){
var inst_19935 = (state_19951[(2)]);
var state_19951__$1 = state_19951;
var statearr_19984_20012 = state_19951__$1;
(statearr_19984_20012[(2)] = inst_19935);

(statearr_19984_20012[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_19952 === (10))){
var inst_19906 = (state_19951[(10)]);
var inst_19904 = (state_19951[(12)]);
var inst_19911 = cljs.core._nth.call(null,inst_19904,inst_19906);
var state_19951__$1 = state_19951;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19951__$1,(13),out,inst_19911);
} else {
if((state_val_19952 === (18))){
var inst_19917 = (state_19951[(7)]);
var inst_19926 = cljs.core.first.call(null,inst_19917);
var state_19951__$1 = state_19951;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_19951__$1,(20),out,inst_19926);
} else {
if((state_val_19952 === (8))){
var inst_19905 = (state_19951[(9)]);
var inst_19906 = (state_19951[(10)]);
var inst_19908 = (inst_19906 < inst_19905);
var inst_19909 = inst_19908;
var state_19951__$1 = state_19951;
if(cljs.core.truth_(inst_19909)){
var statearr_19985_20013 = state_19951__$1;
(statearr_19985_20013[(1)] = (10));

} else {
var statearr_19986_20014 = state_19951__$1;
(statearr_19986_20014[(1)] = (11));

}

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
});})(c__18335__auto__))
;
return ((function (switch__18240__auto__,c__18335__auto__){
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____0 = (function (){
var statearr_19987 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_19987[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__);

(statearr_19987[(1)] = (1));

return statearr_19987;
});
var cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____1 = (function (state_19951){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_19951);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e19988){if((e19988 instanceof Object)){
var ex__18244__auto__ = e19988;
var statearr_19989_20015 = state_19951;
(statearr_19989_20015[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_19951);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e19988;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20016 = state_19951;
state_19951 = G__20016;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__ = function(state_19951){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____1.call(this,state_19951);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__18241__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto__))
})();
var state__18337__auto__ = (function (){var statearr_19990 = f__18336__auto__.call(null);
(statearr_19990[(6)] = c__18335__auto__);

return statearr_19990;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto__))
);

return c__18335__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__20018 = arguments.length;
switch (G__20018) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.call(null,f,in$,null);
});

cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return out;
});

cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__20021 = arguments.length;
switch (G__20021) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.call(null,f,out,null);
});

cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.call(null,buf_or_n);
cljs.core.async.mapcat_STAR_.call(null,f,in$,out);

return in$;
});

cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__20024 = arguments.length;
switch (G__20024) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.call(null,ch,null);
});

cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___20071 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___20071,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___20071,out){
return (function (state_20048){
var state_val_20049 = (state_20048[(1)]);
if((state_val_20049 === (7))){
var inst_20043 = (state_20048[(2)]);
var state_20048__$1 = state_20048;
var statearr_20050_20072 = state_20048__$1;
(statearr_20050_20072[(2)] = inst_20043);

(statearr_20050_20072[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (1))){
var inst_20025 = null;
var state_20048__$1 = (function (){var statearr_20051 = state_20048;
(statearr_20051[(7)] = inst_20025);

return statearr_20051;
})();
var statearr_20052_20073 = state_20048__$1;
(statearr_20052_20073[(2)] = null);

(statearr_20052_20073[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (4))){
var inst_20028 = (state_20048[(8)]);
var inst_20028__$1 = (state_20048[(2)]);
var inst_20029 = (inst_20028__$1 == null);
var inst_20030 = cljs.core.not.call(null,inst_20029);
var state_20048__$1 = (function (){var statearr_20053 = state_20048;
(statearr_20053[(8)] = inst_20028__$1);

return statearr_20053;
})();
if(inst_20030){
var statearr_20054_20074 = state_20048__$1;
(statearr_20054_20074[(1)] = (5));

} else {
var statearr_20055_20075 = state_20048__$1;
(statearr_20055_20075[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (6))){
var state_20048__$1 = state_20048;
var statearr_20056_20076 = state_20048__$1;
(statearr_20056_20076[(2)] = null);

(statearr_20056_20076[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (3))){
var inst_20045 = (state_20048[(2)]);
var inst_20046 = cljs.core.async.close_BANG_.call(null,out);
var state_20048__$1 = (function (){var statearr_20057 = state_20048;
(statearr_20057[(9)] = inst_20045);

return statearr_20057;
})();
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20048__$1,inst_20046);
} else {
if((state_val_20049 === (2))){
var state_20048__$1 = state_20048;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20048__$1,(4),ch);
} else {
if((state_val_20049 === (11))){
var inst_20028 = (state_20048[(8)]);
var inst_20037 = (state_20048[(2)]);
var inst_20025 = inst_20028;
var state_20048__$1 = (function (){var statearr_20058 = state_20048;
(statearr_20058[(7)] = inst_20025);

(statearr_20058[(10)] = inst_20037);

return statearr_20058;
})();
var statearr_20059_20077 = state_20048__$1;
(statearr_20059_20077[(2)] = null);

(statearr_20059_20077[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (9))){
var inst_20028 = (state_20048[(8)]);
var state_20048__$1 = state_20048;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20048__$1,(11),out,inst_20028);
} else {
if((state_val_20049 === (5))){
var inst_20025 = (state_20048[(7)]);
var inst_20028 = (state_20048[(8)]);
var inst_20032 = cljs.core._EQ_.call(null,inst_20028,inst_20025);
var state_20048__$1 = state_20048;
if(inst_20032){
var statearr_20061_20078 = state_20048__$1;
(statearr_20061_20078[(1)] = (8));

} else {
var statearr_20062_20079 = state_20048__$1;
(statearr_20062_20079[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (10))){
var inst_20040 = (state_20048[(2)]);
var state_20048__$1 = state_20048;
var statearr_20063_20080 = state_20048__$1;
(statearr_20063_20080[(2)] = inst_20040);

(statearr_20063_20080[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20049 === (8))){
var inst_20025 = (state_20048[(7)]);
var tmp20060 = inst_20025;
var inst_20025__$1 = tmp20060;
var state_20048__$1 = (function (){var statearr_20064 = state_20048;
(statearr_20064[(7)] = inst_20025__$1);

return statearr_20064;
})();
var statearr_20065_20081 = state_20048__$1;
(statearr_20065_20081[(2)] = null);

(statearr_20065_20081[(1)] = (2));


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
});})(c__18335__auto___20071,out))
;
return ((function (switch__18240__auto__,c__18335__auto___20071,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_20066 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_20066[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_20066[(1)] = (1));

return statearr_20066;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_20048){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_20048);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e20067){if((e20067 instanceof Object)){
var ex__18244__auto__ = e20067;
var statearr_20068_20082 = state_20048;
(statearr_20068_20082[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20048);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20067;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20083 = state_20048;
state_20048 = G__20083;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_20048){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_20048);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___20071,out))
})();
var state__18337__auto__ = (function (){var statearr_20069 = f__18336__auto__.call(null);
(statearr_20069[(6)] = c__18335__auto___20071);

return statearr_20069;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___20071,out))
);


return out;
});

cljs.core.async.unique.cljs$lang$maxFixedArity = 2;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__20085 = arguments.length;
switch (G__20085) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.call(null,n,ch,null);
});

cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___20151 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___20151,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___20151,out){
return (function (state_20123){
var state_val_20124 = (state_20123[(1)]);
if((state_val_20124 === (7))){
var inst_20119 = (state_20123[(2)]);
var state_20123__$1 = state_20123;
var statearr_20125_20152 = state_20123__$1;
(statearr_20125_20152[(2)] = inst_20119);

(statearr_20125_20152[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (1))){
var inst_20086 = (new Array(n));
var inst_20087 = inst_20086;
var inst_20088 = (0);
var state_20123__$1 = (function (){var statearr_20126 = state_20123;
(statearr_20126[(7)] = inst_20088);

(statearr_20126[(8)] = inst_20087);

return statearr_20126;
})();
var statearr_20127_20153 = state_20123__$1;
(statearr_20127_20153[(2)] = null);

(statearr_20127_20153[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (4))){
var inst_20091 = (state_20123[(9)]);
var inst_20091__$1 = (state_20123[(2)]);
var inst_20092 = (inst_20091__$1 == null);
var inst_20093 = cljs.core.not.call(null,inst_20092);
var state_20123__$1 = (function (){var statearr_20128 = state_20123;
(statearr_20128[(9)] = inst_20091__$1);

return statearr_20128;
})();
if(inst_20093){
var statearr_20129_20154 = state_20123__$1;
(statearr_20129_20154[(1)] = (5));

} else {
var statearr_20130_20155 = state_20123__$1;
(statearr_20130_20155[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (15))){
var inst_20113 = (state_20123[(2)]);
var state_20123__$1 = state_20123;
var statearr_20131_20156 = state_20123__$1;
(statearr_20131_20156[(2)] = inst_20113);

(statearr_20131_20156[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (13))){
var state_20123__$1 = state_20123;
var statearr_20132_20157 = state_20123__$1;
(statearr_20132_20157[(2)] = null);

(statearr_20132_20157[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (6))){
var inst_20088 = (state_20123[(7)]);
var inst_20109 = (inst_20088 > (0));
var state_20123__$1 = state_20123;
if(cljs.core.truth_(inst_20109)){
var statearr_20133_20158 = state_20123__$1;
(statearr_20133_20158[(1)] = (12));

} else {
var statearr_20134_20159 = state_20123__$1;
(statearr_20134_20159[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (3))){
var inst_20121 = (state_20123[(2)]);
var state_20123__$1 = state_20123;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20123__$1,inst_20121);
} else {
if((state_val_20124 === (12))){
var inst_20087 = (state_20123[(8)]);
var inst_20111 = cljs.core.vec.call(null,inst_20087);
var state_20123__$1 = state_20123;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20123__$1,(15),out,inst_20111);
} else {
if((state_val_20124 === (2))){
var state_20123__$1 = state_20123;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20123__$1,(4),ch);
} else {
if((state_val_20124 === (11))){
var inst_20103 = (state_20123[(2)]);
var inst_20104 = (new Array(n));
var inst_20087 = inst_20104;
var inst_20088 = (0);
var state_20123__$1 = (function (){var statearr_20135 = state_20123;
(statearr_20135[(7)] = inst_20088);

(statearr_20135[(8)] = inst_20087);

(statearr_20135[(10)] = inst_20103);

return statearr_20135;
})();
var statearr_20136_20160 = state_20123__$1;
(statearr_20136_20160[(2)] = null);

(statearr_20136_20160[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (9))){
var inst_20087 = (state_20123[(8)]);
var inst_20101 = cljs.core.vec.call(null,inst_20087);
var state_20123__$1 = state_20123;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20123__$1,(11),out,inst_20101);
} else {
if((state_val_20124 === (5))){
var inst_20088 = (state_20123[(7)]);
var inst_20091 = (state_20123[(9)]);
var inst_20087 = (state_20123[(8)]);
var inst_20096 = (state_20123[(11)]);
var inst_20095 = (inst_20087[inst_20088] = inst_20091);
var inst_20096__$1 = (inst_20088 + (1));
var inst_20097 = (inst_20096__$1 < n);
var state_20123__$1 = (function (){var statearr_20137 = state_20123;
(statearr_20137[(11)] = inst_20096__$1);

(statearr_20137[(12)] = inst_20095);

return statearr_20137;
})();
if(cljs.core.truth_(inst_20097)){
var statearr_20138_20161 = state_20123__$1;
(statearr_20138_20161[(1)] = (8));

} else {
var statearr_20139_20162 = state_20123__$1;
(statearr_20139_20162[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (14))){
var inst_20116 = (state_20123[(2)]);
var inst_20117 = cljs.core.async.close_BANG_.call(null,out);
var state_20123__$1 = (function (){var statearr_20141 = state_20123;
(statearr_20141[(13)] = inst_20116);

return statearr_20141;
})();
var statearr_20142_20163 = state_20123__$1;
(statearr_20142_20163[(2)] = inst_20117);

(statearr_20142_20163[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (10))){
var inst_20107 = (state_20123[(2)]);
var state_20123__$1 = state_20123;
var statearr_20143_20164 = state_20123__$1;
(statearr_20143_20164[(2)] = inst_20107);

(statearr_20143_20164[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20124 === (8))){
var inst_20087 = (state_20123[(8)]);
var inst_20096 = (state_20123[(11)]);
var tmp20140 = inst_20087;
var inst_20087__$1 = tmp20140;
var inst_20088 = inst_20096;
var state_20123__$1 = (function (){var statearr_20144 = state_20123;
(statearr_20144[(7)] = inst_20088);

(statearr_20144[(8)] = inst_20087__$1);

return statearr_20144;
})();
var statearr_20145_20165 = state_20123__$1;
(statearr_20145_20165[(2)] = null);

(statearr_20145_20165[(1)] = (2));


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
});})(c__18335__auto___20151,out))
;
return ((function (switch__18240__auto__,c__18335__auto___20151,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_20146 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20146[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_20146[(1)] = (1));

return statearr_20146;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_20123){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_20123);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e20147){if((e20147 instanceof Object)){
var ex__18244__auto__ = e20147;
var statearr_20148_20166 = state_20123;
(statearr_20148_20166[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20123);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20147;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20167 = state_20123;
state_20123 = G__20167;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_20123){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_20123);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___20151,out))
})();
var state__18337__auto__ = (function (){var statearr_20149 = f__18336__auto__.call(null);
(statearr_20149[(6)] = c__18335__auto___20151);

return statearr_20149;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___20151,out))
);


return out;
});

cljs.core.async.partition.cljs$lang$maxFixedArity = 3;

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__20169 = arguments.length;
switch (G__20169) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.call(null,f,ch,null);
});

cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.call(null,buf_or_n);
var c__18335__auto___20239 = cljs.core.async.chan.call(null,(1));
cljs.core.async.impl.dispatch.run.call(null,((function (c__18335__auto___20239,out){
return (function (){
var f__18336__auto__ = (function (){var switch__18240__auto__ = ((function (c__18335__auto___20239,out){
return (function (state_20211){
var state_val_20212 = (state_20211[(1)]);
if((state_val_20212 === (7))){
var inst_20207 = (state_20211[(2)]);
var state_20211__$1 = state_20211;
var statearr_20213_20240 = state_20211__$1;
(statearr_20213_20240[(2)] = inst_20207);

(statearr_20213_20240[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (1))){
var inst_20170 = [];
var inst_20171 = inst_20170;
var inst_20172 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_20211__$1 = (function (){var statearr_20214 = state_20211;
(statearr_20214[(7)] = inst_20171);

(statearr_20214[(8)] = inst_20172);

return statearr_20214;
})();
var statearr_20215_20241 = state_20211__$1;
(statearr_20215_20241[(2)] = null);

(statearr_20215_20241[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (4))){
var inst_20175 = (state_20211[(9)]);
var inst_20175__$1 = (state_20211[(2)]);
var inst_20176 = (inst_20175__$1 == null);
var inst_20177 = cljs.core.not.call(null,inst_20176);
var state_20211__$1 = (function (){var statearr_20216 = state_20211;
(statearr_20216[(9)] = inst_20175__$1);

return statearr_20216;
})();
if(inst_20177){
var statearr_20217_20242 = state_20211__$1;
(statearr_20217_20242[(1)] = (5));

} else {
var statearr_20218_20243 = state_20211__$1;
(statearr_20218_20243[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (15))){
var inst_20201 = (state_20211[(2)]);
var state_20211__$1 = state_20211;
var statearr_20219_20244 = state_20211__$1;
(statearr_20219_20244[(2)] = inst_20201);

(statearr_20219_20244[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (13))){
var state_20211__$1 = state_20211;
var statearr_20220_20245 = state_20211__$1;
(statearr_20220_20245[(2)] = null);

(statearr_20220_20245[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (6))){
var inst_20171 = (state_20211[(7)]);
var inst_20196 = inst_20171.length;
var inst_20197 = (inst_20196 > (0));
var state_20211__$1 = state_20211;
if(cljs.core.truth_(inst_20197)){
var statearr_20221_20246 = state_20211__$1;
(statearr_20221_20246[(1)] = (12));

} else {
var statearr_20222_20247 = state_20211__$1;
(statearr_20222_20247[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (3))){
var inst_20209 = (state_20211[(2)]);
var state_20211__$1 = state_20211;
return cljs.core.async.impl.ioc_helpers.return_chan.call(null,state_20211__$1,inst_20209);
} else {
if((state_val_20212 === (12))){
var inst_20171 = (state_20211[(7)]);
var inst_20199 = cljs.core.vec.call(null,inst_20171);
var state_20211__$1 = state_20211;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20211__$1,(15),out,inst_20199);
} else {
if((state_val_20212 === (2))){
var state_20211__$1 = state_20211;
return cljs.core.async.impl.ioc_helpers.take_BANG_.call(null,state_20211__$1,(4),ch);
} else {
if((state_val_20212 === (11))){
var inst_20175 = (state_20211[(9)]);
var inst_20179 = (state_20211[(10)]);
var inst_20189 = (state_20211[(2)]);
var inst_20190 = [];
var inst_20191 = inst_20190.push(inst_20175);
var inst_20171 = inst_20190;
var inst_20172 = inst_20179;
var state_20211__$1 = (function (){var statearr_20223 = state_20211;
(statearr_20223[(7)] = inst_20171);

(statearr_20223[(11)] = inst_20191);

(statearr_20223[(12)] = inst_20189);

(statearr_20223[(8)] = inst_20172);

return statearr_20223;
})();
var statearr_20224_20248 = state_20211__$1;
(statearr_20224_20248[(2)] = null);

(statearr_20224_20248[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (9))){
var inst_20171 = (state_20211[(7)]);
var inst_20187 = cljs.core.vec.call(null,inst_20171);
var state_20211__$1 = state_20211;
return cljs.core.async.impl.ioc_helpers.put_BANG_.call(null,state_20211__$1,(11),out,inst_20187);
} else {
if((state_val_20212 === (5))){
var inst_20175 = (state_20211[(9)]);
var inst_20179 = (state_20211[(10)]);
var inst_20172 = (state_20211[(8)]);
var inst_20179__$1 = f.call(null,inst_20175);
var inst_20180 = cljs.core._EQ_.call(null,inst_20179__$1,inst_20172);
var inst_20181 = cljs.core.keyword_identical_QMARK_.call(null,inst_20172,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var inst_20182 = ((inst_20180) || (inst_20181));
var state_20211__$1 = (function (){var statearr_20225 = state_20211;
(statearr_20225[(10)] = inst_20179__$1);

return statearr_20225;
})();
if(cljs.core.truth_(inst_20182)){
var statearr_20226_20249 = state_20211__$1;
(statearr_20226_20249[(1)] = (8));

} else {
var statearr_20227_20250 = state_20211__$1;
(statearr_20227_20250[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (14))){
var inst_20204 = (state_20211[(2)]);
var inst_20205 = cljs.core.async.close_BANG_.call(null,out);
var state_20211__$1 = (function (){var statearr_20229 = state_20211;
(statearr_20229[(13)] = inst_20204);

return statearr_20229;
})();
var statearr_20230_20251 = state_20211__$1;
(statearr_20230_20251[(2)] = inst_20205);

(statearr_20230_20251[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (10))){
var inst_20194 = (state_20211[(2)]);
var state_20211__$1 = state_20211;
var statearr_20231_20252 = state_20211__$1;
(statearr_20231_20252[(2)] = inst_20194);

(statearr_20231_20252[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_20212 === (8))){
var inst_20175 = (state_20211[(9)]);
var inst_20171 = (state_20211[(7)]);
var inst_20179 = (state_20211[(10)]);
var inst_20184 = inst_20171.push(inst_20175);
var tmp20228 = inst_20171;
var inst_20171__$1 = tmp20228;
var inst_20172 = inst_20179;
var state_20211__$1 = (function (){var statearr_20232 = state_20211;
(statearr_20232[(7)] = inst_20171__$1);

(statearr_20232[(14)] = inst_20184);

(statearr_20232[(8)] = inst_20172);

return statearr_20232;
})();
var statearr_20233_20253 = state_20211__$1;
(statearr_20233_20253[(2)] = null);

(statearr_20233_20253[(1)] = (2));


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
});})(c__18335__auto___20239,out))
;
return ((function (switch__18240__auto__,c__18335__auto___20239,out){
return (function() {
var cljs$core$async$state_machine__18241__auto__ = null;
var cljs$core$async$state_machine__18241__auto____0 = (function (){
var statearr_20234 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_20234[(0)] = cljs$core$async$state_machine__18241__auto__);

(statearr_20234[(1)] = (1));

return statearr_20234;
});
var cljs$core$async$state_machine__18241__auto____1 = (function (state_20211){
while(true){
var ret_value__18242__auto__ = (function (){try{while(true){
var result__18243__auto__ = switch__18240__auto__.call(null,state_20211);
if(cljs.core.keyword_identical_QMARK_.call(null,result__18243__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__18243__auto__;
}
break;
}
}catch (e20235){if((e20235 instanceof Object)){
var ex__18244__auto__ = e20235;
var statearr_20236_20254 = state_20211;
(statearr_20236_20254[(5)] = ex__18244__auto__);


cljs.core.async.impl.ioc_helpers.process_exception.call(null,state_20211);

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
throw e20235;

}
}})();
if(cljs.core.keyword_identical_QMARK_.call(null,ret_value__18242__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__20255 = state_20211;
state_20211 = G__20255;
continue;
} else {
return ret_value__18242__auto__;
}
break;
}
});
cljs$core$async$state_machine__18241__auto__ = function(state_20211){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__18241__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__18241__auto____1.call(this,state_20211);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__18241__auto____0;
cljs$core$async$state_machine__18241__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__18241__auto____1;
return cljs$core$async$state_machine__18241__auto__;
})()
;})(switch__18240__auto__,c__18335__auto___20239,out))
})();
var state__18337__auto__ = (function (){var statearr_20237 = f__18336__auto__.call(null);
(statearr_20237[(6)] = c__18335__auto___20239);

return statearr_20237;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped.call(null,state__18337__auto__);
});})(c__18335__auto___20239,out))
);


return out;
});

cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3;


//# sourceMappingURL=async.js.map
