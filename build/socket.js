!function(t){var e={};function n(s){if(e[s])return e[s].exports;var i=e[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,s){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:s})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(n.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(s,i,function(e){return t[e]}.bind(null,i));return s},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";n.r(e);class s{constructor(t,e){this.name=t,this.socket=e,this.subscribed=!1,this.subscriptionCancelled=!1}trigger(t,e){return this.subscribed||console.warn("Client event triggered before channel 'subscription_succeeded' event"),this.socket.sendEvent(t,e,this.name)}disconnect(){this.subscribed=!1}join(){this.subscribed||(this.subscriptionCancelled=!1,this.subscribed=!0,this.socket.joinChannel(this.name))}subscribe(t,e){this.socket.subscribe(t,e,this.name)}unsubscribe(t,e){this.socket.unsubscribe(t,e,this.name)}leaveChannel(){this.subscribed=!1,this.socket.leaveChannel(this.name)}cancelSubscription(){this.subscriptionCancelled=!0}reinstateSubscription(){this.subscriptionCancelled=!1}}class i{constructor(){this.callbacks={}}get(t){return this.callbacks[t]||[]}add(t,e,n){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push({fn:e,channel:n||null})}remove(t,e,n){if(!t&&!e&&!n)return void(this.callbacks={});const s=t?[t]:Object.keys(this.callbacks);e||n?this.removeCallback(s,e,n):this.removeAllCallbacks(s)}removeCallback(t,e,n){t.forEach(t=>{const s=this.callbacks[t]||[];this.callbacks[t]=s.filter(t=>{const s=e&&e===t.fn,i=n&&n===t.channel;return!s&&!i})})}removeAllCallbacks(t){t.forEach(t=>{delete this.callbacks[t]})}}class o{constructor(){this.callbacks=new i}bind(t,e,n){return this.callbacks.add(t,e,n),this}unbind(t,e,n){return this.callbacks.remove(t,e,n),this}emit(t,e){const n=this.callbacks.get(t),s=(i=e)&&i.context&&"string"==typeof i.context.channel?e.context.channel:null;var i;return n&&n.length>0&&n.forEach(t=>{const n=t.channel===s;(!t.channel||!s||n)&&t.fn(e)}),this}}const r=["@"];var c;!function(t){t.CONNECTED="connected",t.MESSAGE="message",t.CONNECTING="connecting",t.DISCONNECTED="disconnected",t.ERROR="error",t.OPEN="open",t.INITIALIZED="initialized",t.CLOSED="closed",t.UNAVAILABLE="unavailable"}(c||(c={}));class a extends o{constructor(t,e){super(),this.id=t,this.transport=e,this.bindListeners()}send(t){return!!this.transport&&this.transport.send(t)}sendEvent(t,e,n){const s={type:t,data:e,error:null};return n&&(s.context={channel:n}),this.send((t=>{const e={cmd:t.type,args:t.data};return JSON.stringify(e)})(s))}close(){this.transport&&this.transport.close()}bindListeners(){const t=t=>{this.transport&&(this.transport.unbind(c.MESSAGE,t.message),this.transport.unbind(c.ERROR,t.error),this.transport.unbind(c.CLOSED,t.closed))},e={message:t=>{let e=null;try{e=(t=>{if(t){const e=JSON.parse(t),n=t=>{let e=t;return r.forEach(n=>{t&&t[0]===n&&(e="")}),String(e)};return{type:"sfSocket:message",error:null,data:e.payload||null,context:{...e.topic?{channel:n(e.topic)}:{}}}}return{type:"MessageParseError",error:`MessageEvent: ${t} not contains data property`,data:null}})(t.data)}catch(e){this.emit(c.ERROR,{type:"MessageParseError",error:e,data:JSON.stringify(t)})}e&&("sfSocket:error"===e.type?this.emit(c.ERROR,{type:"sfSocket:error",data:e.data,error:null}):this.emit(c.MESSAGE,e))},error:t=>{this.emit(c.ERROR,{...t,type:"sfSocket:error",data:null})},closed:n=>{var s;t(e),(s=n).context&&void 0!==s.context.code&&this.handleCloseEvent(n),this.transport=null,this.emit(c.CLOSED,n)}};this.transport&&(this.transport.bind(c.MESSAGE,e.message),this.transport.bind(c.ERROR,e.error),this.transport.bind(c.CLOSED,e.closed))}handleCloseEvent(t){const e=(t=>t.context&&t.context.code?t.context.code<4e3&&t.context.code>=1002&&t.context.code<=1004?{...t,error:"Socket is unavailable"}:t:(console.error("Socket event do not contain close code"),{...t,error:"Connection refused"}))(t);"sfSocket:closed"===e.type?this.emit(c.CLOSED,e):this.emit(c.ERROR,e)}}class h extends o{constructor(t,e){super(),this.initialize=()=>{const t=this;t.hooks.isInitialized()?t.changeState(c.INITIALIZED):t.onClose()},this.hooks=t,this.name=e,this.state="new"}connect(){if(this.socket||"initialized"!==this.state)return!1;const{url:t}=this.hooks;try{this.socket=this.hooks.getSocket(t)}catch(t){return setTimeout(()=>{this.onError(t),this.onClosed({type:"sfSocket:error",data:null,error:t,context:{}})}),!1}return this.bindListeners(),this.changeState(c.CONNECTING),!0}close(){return!!this.socket&&(this.socket.close(),!0)}send(t){return"open"===this.state&&(setTimeout(()=>{this.socket&&this.socket.send(t)}),!0)}unbindListeners(){this.socket&&(this.socket.onopen=null,this.socket.onerror=null,this.socket.onclose=null,this.socket.onmessage=null)}onOpen(){this.changeState(c.OPEN),this.socket&&(this.socket.onopen=null)}onError(t){this.emit(c.ERROR,{type:"sfSocket:error",error:t||"websocket connection error",data:null})}onClose(t){t?this.onClosed({type:t.wasClean?"sfSocket:closed":"sfSocket:error",data:t.wasClean?t.reason:null,error:t.wasClean?null:t.reason,context:{code:t.code}}):this.onClosed({type:"sfSocket:closed",data:null,error:"Closed for unknown reason",context:{}}),this.unbindListeners(),this.socket=void 0}onMessage(t){this.emit(c.MESSAGE,{type:"sfSocket:message",data:"string"==typeof t.data?t.data:JSON.stringify(t.data),error:null})}bindListeners(){this.socket&&(this.socket.onopen=()=>{this.onOpen()},this.socket.onerror=()=>{this.onError()},this.socket.onclose=t=>{this.onClose(t)},this.socket.onmessage=t=>{this.onMessage(t)})}changeState(t){this.state=t,this.emit(t,void 0)}onClosed(t){this.state=c.CLOSED,this.emit(c.CLOSED,t)}}class l{constructor(t,e){this.options=e||{};const n=`${`ws${e.useTLS?"s":""}`}://${e.useTLS?`${e.host}:${e.portTLS}`:`${e.host}:${e.port}`}/${e.path}`;this.hooks={url:n,isInitialized:()=>!!window.WebSocket,getSocket:t=>new WebSocket(t)},this.name=t}connect(t){let e=!1;const n=new h(this.hooks,this.name),s=()=>{n.unbind(c.INITIALIZED,s),n.connect()},i=()=>{n.unbind(c.INITIALIZED,s),n.unbind(c.OPEN,o),n.unbind(c.ERROR,r),n.unbind(c.CLOSED,l)},o=()=>{e=!0,i();const s=new a("",n);t(null,s)},r=e=>{i(),t(e)},l=()=>{i()};return n.bind(c.INITIALIZED,s),n.bind(c.OPEN,o),n.bind(c.ERROR,r),n.bind(c.CLOSED,l),n.initialize(),{abort:()=>{e||(i(),n.close())}}}}class u extends o{constructor(t){super(),this.options=t||{},this.state="initialized",this.connection=null,this.usingTLS=Boolean(t.useTLS),this.errorCallbacks=this.buildErrorCallbacks(),this.connectionCallbacks=this.buildConnectionCallbacks(this.errorCallbacks),this.transport=new l("ws",t),this.runner=null,this.unavailableTimer=0,this.retryTimer=0}connect(){this.connection||this.runner||(this.updateState(c.CONNECTING),this.startConnecting(),this.setUnavailableTimer())}send(t){return!!this.connection&&this.connection.send(t)}sendEvent(t,e,n){return!!this.connection&&this.connection.sendEvent(t,e,n)}disconnect(){this.disconnectInternally(),this.updateState(c.DISCONNECTED)}isConnected(){return this.state===c.CONNECTED}startConnecting(){const t=(e,n)=>{e?this.runner=this.transport.connect(t):(this.abortConnecting(),this.clearUnavailableTimer(),this.setConnection(n),this.updateState(c.CONNECTED))};this.runner=this.transport.connect(t)}abortConnecting(){this.runner&&(this.runner.abort(),this.runner=null)}disconnectInternally(){if(this.abortConnecting(),this.clearRetryTimer(),this.clearUnavailableTimer(),this.connection){const t=this.abandonConnection();t&&t.close()}}retryIn(t){t>0&&this.emit(c.CONNECTING,{type:"sfSocket:connecting",data:String(Math.round(t/1e3)),error:null}),this.retryTimer=setTimeout(()=>{this.disconnectInternally(),this.connect()},t||0)}clearRetryTimer(){this.retryTimer&&(this.retryTimer&&clearTimeout(this.retryTimer),this.retryTimer=0)}setUnavailableTimer(){this.unavailableTimer=setTimeout(()=>{this.updateState(c.UNAVAILABLE)},this.options.unavailableTimeout)}clearUnavailableTimer(){this.unavailableTimer&&clearTimeout(this.unavailableTimer),this.unavailableTimer=0}buildConnectionCallbacks(t){return{...t,message:t=>{this.emit(c.MESSAGE,t)},error:t=>{this.emit(c.ERROR,t)},closed:t=>{this.abandonConnection(),this.shouldRetry()&&this.retryIn(1e3),this.emit(c.CLOSED,t)}}}buildErrorCallbacks(){const t=t=>e=>{e.error&&this.emit(c.ERROR,{type:"sfSocket:error",data:null,error:e.error}),t(e)};return{refused:t(()=>{this.disconnect()}),unavailable:t(()=>{this.retryIn(1e3)})}}setConnection(t){this.connection=t,this.connection&&(this.connection.bind(c.MESSAGE,this.connectionCallbacks.message),this.connection.bind(c.ERROR,this.connectionCallbacks.error),this.connection.bind(c.CLOSED,this.connectionCallbacks.closed))}abandonConnection(){if(!this.connection)return null;this.connection.unbind(c.MESSAGE,this.connectionCallbacks.message),this.connection.unbind(c.ERROR,this.connectionCallbacks.error),this.connection.unbind(c.CLOSED,this.connectionCallbacks.closed);const{connection:t}=this;return this.connection=null,t}updateState(t){const e=this.state;this.state=t,e!==t&&this.emit(t,void 0)}shouldRetry(){return this.state===c.CONNECTING||this.state===c.CONNECTED}}const d={host:"",port:80,portTLS:443,path:"",unavailableTimeout:1e4,useTLS:!1,useStorage:!1},b="join",S="leave";class C{constructor(t){if(!t||"object"!=typeof t)throw new Error("sfSocket options should be an object");const e=t||{};if(this.config={...d,...e},this.channels={},this.eventsDispatcher=new o,this.hasStorage=Boolean(this.config.useStorage&&window&&window.localStorage),this.connection=new u(this.config),this.connection.bind(c.CONNECTED,()=>{Object.keys(this.channels).forEach(t=>{this.subscribeChannel(t)})}),this.connection.bind(c.MESSAGE,t=>{this.eventsDispatcher.emit(c.MESSAGE,t)}),this.connection.bind(c.CONNECTING,()=>{this.channelsDisconnect()}),this.connection.bind(c.DISCONNECTED,()=>{this.channelsDisconnect()}),this.connection.bind(c.ERROR,t=>{console.error(t)}),C.instances.push(this),C.isReady&&this.connect(),this.hasStorage){const t=this.getStorage();t&&t.forEach(t=>{this.subscribeChannel(t)})}}static ready(){C.isReady=!0,C.instances.forEach(t=>{t.connect()})}connect(){this.connection.connect()}disconnect(){this.connection.disconnect()}sendEvent(t,e,n){return this.connection.sendEvent(t,e,n)}join(t){return this.sendEvent(b,t)}leave(t){return this.sendEvent(S,t)}listen(t){t.forEach(t=>{this.connection.isConnected()?this.joinChannel(t):this.subscribeChannel(t)})}stopListen(t){t.forEach(t=>{const e=this.removeChannel(t);e&&this.connection.isConnected()&&e.leaveChannel()})}subscribe(t,e,n){return this.connection.bind(t,e,n)}unsubscribe(t,e,n){return this.connection.unbind(t,e,n)}channel(t){return this.subscribeChannel(t)}addChannel(t,e){return this.channels[t]||(this.channels[t]=new s(t,e)),this.channels[t]}joinChannel(t){return this.addStorageChannel(t),this.sendEvent(b,[t])}leaveChannel(t){return this.removeStorageChannel(t),this.sendEvent(S,[t])}findChannel(t){return this.channels[t]}removeChannel(t){const e=this.channels[t];return delete this.channels[t],e}channelsDisconnect(){Object.values(this.channels).forEach(t=>t.disconnect())}subscribeChannel(t){const e=this.addChannel(t,this);return e.subscriptionCancelled?e.reinstateSubscription():this.connection.isConnected()&&e.join(),e}getStorage(){if(this.hasStorage){const t=window.localStorage.getItem("sfsocket_storage");return t?JSON.parse(t):null}return null}addStorageChannel(t){if(this.hasStorage){const e=this.getStorage();if(e){const n=e.filter(e=>e!==t);n.push(t),this.setStorage(n)}else this.setStorage([t])}}removeStorageChannel(t){if(this.hasStorage){const e=this.getStorage();if(e){const n=e.filter(e=>e!==t);n.length?this.setStorage(n):this.clearStorage()}}}setStorage(t){return this.hasStorage?window.localStorage.setItem("sfsocket_storage",JSON.stringify(t)):null}clearStorage(){return this.hasStorage?window.localStorage.removeItem("sfsocket_storage"):null}}C.instances=[],C.isReady=!1,n.d(e,"makeSocketOptions",(function(){return E})),n.d(e,"SFSocket",(function(){return C}));const E=t=>{const e=new URL(t),n=e.protocol?e.protocol.replace(":",""):null;return e.hostname&&e.port&&n?{host:e.hostname,port:e.port,path:n}:null};e.default=C}]);
//# sourceMappingURL=socket.js.map