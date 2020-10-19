!function(t,n){"object"==typeof exports&&"object"==typeof module?module.exports=n():"function"==typeof define&&define.amd?define([],n):"object"==typeof exports?exports.SFSocket=n():t.SFSocket=n()}(window,(function(){return function(t){var n={};function e(s){if(n[s])return n[s].exports;var i=n[s]={i:s,l:!1,exports:{}};return t[s].call(i.exports,i,i.exports,e),i.l=!0,i.exports}return e.m=t,e.c=n,e.d=function(t,n,s){e.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:s})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,n){if(1&n&&(t=e(t)),8&n)return t;if(4&n&&"object"==typeof t&&t&&t.__esModule)return t;var s=Object.create(null);if(e.r(s),Object.defineProperty(s,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var i in t)e.d(s,i,function(n){return t[n]}.bind(null,i));return s},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},e.p="",e(e.s=0)}([function(t,n,e){"use strict";var s;function i(t,n,e){let s=e.value;if("function"!=typeof s)throw new TypeError(`@autobind decorator can only be applied to methods not: ${typeof s}`);let i=!1;return{configurable:!0,get(){if(i||this===t.prototype||this.hasOwnProperty(n)||"function"!=typeof s)return s;const e=s.bind(this);return i=!0,Object.defineProperty(this,n,{configurable:!0,get:()=>e,set(t){s=t,delete this[n]}}),i=!1,e},set(t){s=t}}}e.r(n),function(t){t.CONNECTED="connected",t.MESSAGE="message",t.CONNECTING="connecting",t.DISCONNECTED="disconnected",t.ERROR="error",t.OPEN="open",t.INITIALIZED="initialized",t.CLOSED="closed",t.UNAVAILABLE="unavailable",t.CHANNEL_JOINED="channel_joined",t.CHANNEL_JOIN_FAILED="channel_join_failed",t.CHANNEL_LEFT="channel_left"}(s||(s={}));var o,r=function(t,n,e,s){var i,o=arguments.length,r=o<3?n:null===s?s=Object.getOwnPropertyDescriptor(n,e):s;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)r=Reflect.decorate(t,n,e,s);else for(var a=t.length-1;a>=0;a--)(i=t[a])&&(r=(o<3?i(r):o>3?i(n,e,r):i(n,e))||r);return o>3&&r&&Object.defineProperty(n,e,r),r};!function(t){t.CLOSED="closed",t.JOINING="joining",t.JOINED="joined",t.LEAVING="leaving",t.ERROR="error"}(o||(o={}));class a{constructor(t,n){this.channelStatus=o.CLOSED,this.selfName=t,this.socket=n,this.cMgr=n.cMgr,this.enabled=!1}get status(){return this.channelStatus}get name(){return this.selfName}get isActive(){return this.cMgr.isConnected()&&this.channelStatus===o.JOINED}join(){this.enabled||(this.enabled=!0,this.startListening(),this.cMgr.isConnected()&&this.sendJoinCommand())}subscribe(t,n){this.cMgr.bind(t,n,this.name)}unsubscribe(t,n){this.cMgr.unbind(t,n,this.name)}leave(){this.enabled&&(this.enabled=!1,this.channelStatus=o.LEAVING,this.cMgr.isConnected()&&this.cMgr.sendLeave([this.name]),this.stopListening())}onConnect(){this.enabled&&this.sendJoinCommand()}onDisconnect(){this.channelStatus=o.CLOSED}onJoin(t){t.indexOf(this.name)>=0&&(this.channelStatus=o.JOINED)}onLeft(t){t.indexOf(this.name)>=0&&(this.channelStatus=o.CLOSED)}onJoinFailed(t){t.indexOf(this.name)>=0&&(this.channelStatus=o.ERROR)}sendJoinCommand(){this.channelStatus!==o.JOINING&&(this.channelStatus=o.JOINING,this.cMgr.sendJoin([this.name]))}startListening(){this.cMgr.bind(s.DISCONNECTED,this.onDisconnect),this.cMgr.bind(s.CHANNEL_JOIN_FAILED,this.onJoinFailed),this.cMgr.bind(s.CHANNEL_JOINED,this.onJoin),this.cMgr.bind(s.CHANNEL_LEFT,this.onLeft),this.cMgr.bind(s.CONNECTED,this.onConnect)}stopListening(){this.cMgr.unbind(s.DISCONNECTED,this.onDisconnect),this.cMgr.unbind(s.CHANNEL_JOIN_FAILED,this.onJoinFailed),this.cMgr.unbind(s.CHANNEL_JOINED,this.onJoin),this.cMgr.unbind(s.CHANNEL_LEFT,this.onLeft),this.cMgr.unbind(s.CONNECTED,this.onConnect)}}r([i],a.prototype,"onConnect",null),r([i],a.prototype,"onDisconnect",null),r([i],a.prototype,"onJoin",null),r([i],a.prototype,"onLeft",null),r([i],a.prototype,"onJoinFailed",null);const c={host:"",port:80,path:"",unavailableTimeout:1e4,retryTimeout:1e3,useTLS:!1};class l{constructor(){this.callbacks={}}get(t){return this.callbacks[t]||[]}add(t,n,e){this.callbacks[t]||(this.callbacks[t]=[]),this.callbacks[t].push({fn:n,channel:e||null})}remove(t,n,e){if(!t&&!n&&!e)return void(this.callbacks={});const s=t?[t]:Object.keys(this.callbacks);n||e?this.removeCallback(s,n,e):this.removeAllCallbacks(s)}removeCallback(t,n,e){t.forEach(t=>{const s=this.callbacks[t]||[];this.callbacks[t]=s.filter(t=>{const s=n&&n===t.fn,i=e&&e===t.channel;return!s&&!i})})}removeAllCallbacks(t){t.forEach(t=>{delete this.callbacks[t]})}}class h{constructor(){this.callbacks=new l}bind(t,n,e){return this.callbacks.add(t,n,e),this}unbind(t,n,e){return this.callbacks.remove(t,n,e),this}emit(t,n){const e=this.callbacks.get(t),s=(i=n)&&i.context&&"string"==typeof i.context.channel?n.context.channel:null;var i;return e&&e.length>0&&e.forEach(t=>{const e=t.channel===s;(!t.channel||!s||e)&&t.fn(n)}),this}}var d;!function(t){t.CHANNEL_JOINED="@join",t.CHANNEL_JOIN_FAILED="#join",t.CHANNEL_LEFT="@leave",t.CHANNEL_LEAVE_FAILED="#leave"}(d||(d={}));const u=new Set([d.CHANNEL_JOINED,d.CHANNEL_JOIN_FAILED,d.CHANNEL_LEFT,d.CHANNEL_LEAVE_FAILED]),E=t=>{const n={topic:t.type,payload:t.payload};return JSON.stringify(n)};var N;!function(t){t.JOIN="join",t.LEAVE="leave"}(N||(N={}));const C=new Set([N.JOIN,N.LEAVE]);class b extends h{constructor(t,n){super(),this.id=t,this.transport=n,this.bindListeners()}send(t){return!!this.transport&&this.transport.send(t)}sendCommand(t,n){if(C.has(t))throw new Error(`${t} is a reserved command, cant be sent manually`);return this.send(E({type:t,payload:n}))}sendJoin(t){this.send(E({type:N.JOIN,payload:t}))}sendLeave(t){this.send(E({type:N.LEAVE,payload:t}))}close(){this.transport&&this.transport.close()}bindListeners(){const t=t=>{this.transport&&(this.transport.unbind(s.MESSAGE,t.message),this.transport.unbind(s.ERROR,t.error),this.transport.unbind(s.CLOSED,t.closed))},n={message:t=>{let n=null;try{n=(t=>{if(t){const n=JSON.parse(t);if(u.has(n.topic)&&!n.payload&&Array.isArray(n.payload))return{type:m.ERROR,error:"WS event system event payload is invalid. Should be a string array",data:"MessageParseError"};switch(n.topic){case d.CHANNEL_JOINED:return{type:m.CHANNEL_JOINED,error:null,data:n.payload};case d.CHANNEL_JOIN_FAILED:return{type:m.CHANNEL_JOIN_FAILED,error:null,data:n.payload};case d.CHANNEL_LEFT:return{type:m.CHANNEL_LEFT,error:null,data:n.payload};case d.CHANNEL_LEAVE_FAILED:return{type:m.CHANNEL_LEAVE_FAILED,error:null,data:n.payload};default:return{type:m.MESSAGE,error:null,data:n.payload||null,context:{...n.topic?{channel:n.topic}:{}}}}}return{type:m.ERROR,error:"MessageEvent has no data property",data:"MessageParseError"}})(t.data)}catch(n){this.emit(s.ERROR,{type:m.ERROR,error:n,data:JSON.stringify(t)})}if(n)switch(n.type){case m.ERROR:this.emit(s.ERROR,n);break;case m.CHANNEL_JOIN_FAILED:this.emit(s.CHANNEL_JOIN_FAILED,n.data);break;case m.CHANNEL_JOINED:this.emit(s.CHANNEL_JOINED,n.data);break;case m.CHANNEL_LEFT:this.emit(s.CHANNEL_LEFT,n.data);break;case m.CHANNEL_LEAVE_FAILED:this.emit(s.ERROR,n);break;default:this.emit(s.MESSAGE,n)}},error:t=>{this.emit(s.ERROR,{...t,type:m.ERROR,data:null})},closed:e=>{var i;t(n),(i=e).context&&void 0!==i.context.code&&this.handleCloseEvent(e),this.transport=null,this.emit(s.CLOSED,e)}};this.transport&&(this.transport.bind(s.MESSAGE,n.message),this.transport.bind(s.ERROR,n.error),this.transport.bind(s.CLOSED,n.closed))}handleCloseEvent(t){const n=(t=>t.context&&t.context.code?t.context.code<4e3&&t.context.code>=1002&&t.context.code<=1004?{...t,error:"Socket is unavailable"}:t:(console.error("Socket event do not contain close code"),{...t,error:"Connection refused"}))(t);n.type===m.CLOSED?this.emit(s.CLOSED,n):this.emit(s.ERROR,n)}}class p extends h{constructor(t,n){super(),this.initialize=()=>{const t=this;t.hooks.isInitialized()?t.changeState(s.INITIALIZED):t.onClose()},this.hooks=t,this.name=n,this.state="new"}connect(){if(this.socket||"initialized"!==this.state)return!1;const{url:t}=this.hooks;try{this.socket=this.hooks.getSocket(t)}catch(t){return setTimeout(()=>{this.onError(t),this.onClosed({type:m.ERROR,data:t,error:t.toString(),context:{code:0}})}),!1}return this.bindListeners(),this.changeState(s.CONNECTING),!0}close(){return!!this.socket&&(this.socket.close(),!0)}send(t){return"open"===this.state&&(setTimeout(()=>{this.socket&&this.socket.send(t)}),!0)}unbindListeners(){this.socket&&(this.socket.onopen=null,this.socket.onerror=null,this.socket.onclose=null,this.socket.onmessage=null)}onOpen(){this.changeState(s.OPEN),this.socket&&(this.socket.onopen=null)}onError(t){var n;(n=t)&&"string"==typeof n.type&&void 0!==n.currentTarget?this.emit(s.ERROR,{type:m.ERROR,error:"Websocket connection error",data:null}):this.emit(s.ERROR,{type:m.ERROR,error:t?t.message:"Websocket connection error",data:t?t.name:null})}onClose(t){t?this.onClosed({type:t.wasClean?m.CLOSED:m.ERROR,data:t.wasClean?t.reason:null,error:t.wasClean?null:t.reason,context:{code:t.code}}):this.onClosed({type:m.ERROR,data:null,error:"Closed for unknown reason",context:{code:0}}),this.unbindListeners(),this.socket=void 0}onMessage(t){this.emit(s.MESSAGE,{type:m.MESSAGE,data:"string"==typeof t.data?t.data:JSON.stringify(t.data),error:null})}bindListeners(){this.socket&&(this.socket.onopen=()=>{this.onOpen()},this.socket.onerror=t=>{this.onError(t)},this.socket.onclose=t=>{this.onClose(t)},this.socket.onmessage=t=>{this.onMessage(t)})}changeState(t){this.state=t,this.emit(t,void 0)}onClosed(t){this.state=s.CLOSED,this.emit(s.CLOSED,t)}}class L{constructor(t,n){this.options=n||{};const e=`ws${n.useTLS?"s":""}`,s=`${n.host}:${n.port}`,i=n.queryParams?Object.entries(n.queryParams).map(([t,n])=>`${encodeURIComponent(t)}=${encodeURIComponent(n)}`).join("&"):null,o=`${e}://${s}/${n.path}${i?`?${i}`:""}`;this.hooks={url:o,isInitialized:()=>!!window.WebSocket,getSocket:t=>new WebSocket(t)},this.name=t}connect(t){let n=!1;const e=new p(this.hooks,this.name),i=()=>{e.unbind(s.INITIALIZED,i),e.connect()},o=()=>{e.unbind(s.INITIALIZED,i),e.unbind(s.OPEN,r),e.unbind(s.ERROR,a),e.unbind(s.CLOSED,c)},r=()=>{n=!0,o();const s=new b("",e);t(null,s)},a=()=>{},c=n=>{o(),t(n)};return e.bind(s.INITIALIZED,i),e.bind(s.OPEN,r),e.bind(s.ERROR,a),e.bind(s.CLOSED,c),e.initialize(),{abort:()=>{n||(o(),e.close())}}}}class O extends h{constructor(t){super(),this.options={...c,...t},this.state="initialized",this.connection=null,this.errorCallbacks=this.buildErrorCallbacks(),this.connectionCallbacks=this.buildConnectionCallbacks(this.errorCallbacks),this.transport=new L("ws",t),this.runner=null,this.unavailableTimer=0,this.retryTimer=0}connect(){this.connection||this.runner||(this.updateState(s.CONNECTING),this.startConnecting(),this.setUnavailableTimer())}send(t){return!!this.connection&&this.connection.send(t)}sendCommand(t,n){return!!this.connection&&this.connection.sendCommand(t,n)}sendJoin(t){return this.connection&&this.connection.sendJoin(t),!1}sendLeave(t){return this.connection&&this.connection.sendLeave(t),!1}disconnect(){this.disconnectInternally(),this.updateState(s.DISCONNECTED)}isConnected(){return this.state===s.CONNECTED}startConnecting(){this.runner=this.transport.connect((t,n)=>{t?(this.abandonConnection(),this.shouldRetry(t)&&this.retryIn(this.options.retryTimeout||0),this.emit(s.CLOSED,t)):(this.abortConnecting(),this.clearUnavailableTimer(),this.setConnection(n),this.updateState(s.CONNECTED))})}abortConnecting(){this.runner&&(this.runner.abort(),this.runner=null)}disconnectInternally(){if(this.abortConnecting(),this.clearRetryTimer(),this.clearUnavailableTimer(),this.connection){const t=this.abandonConnection();t&&t.close()}}retryIn(t){t>0&&this.emit(s.CONNECTING,{type:m.CONNECTING,data:String(Math.round(t/1e3)),error:null}),this.retryTimer=setTimeout(()=>{this.disconnectInternally(),this.connect()},t||0)}clearRetryTimer(){this.retryTimer&&(this.retryTimer&&clearTimeout(this.retryTimer),this.retryTimer=0)}setUnavailableTimer(){this.unavailableTimer=setTimeout(()=>{this.updateState(s.UNAVAILABLE)},this.options.unavailableTimeout)}clearUnavailableTimer(){this.unavailableTimer&&clearTimeout(this.unavailableTimer),this.unavailableTimer=0}buildConnectionCallbacks(t){return{...t,message:t=>{this.emit(s.MESSAGE,t)},error:t=>{this.emit(s.ERROR,t)},closed:t=>{this.abandonConnection(),this.shouldRetry(t)&&this.retryIn(this.options.retryTimeout||0),this.emit(s.CLOSED,t)},channelJoined:t=>this.emit(s.CHANNEL_JOINED,t),channelJoinFailed:t=>this.emit(s.CHANNEL_JOIN_FAILED,t),channelLeft:t=>this.emit(s.CHANNEL_LEFT,t)}}buildErrorCallbacks(){const t=t=>n=>{n.error&&this.emit(s.ERROR,{type:m.ERROR,data:null,error:n.error}),t(n)};return{refused:t(()=>{this.disconnect()}),unavailable:t(()=>{this.retryIn(1e3)})}}setConnection(t){this.connection=t,this.connection&&(this.connection.bind(s.MESSAGE,this.connectionCallbacks.message),this.connection.bind(s.CHANNEL_LEFT,this.connectionCallbacks.channelLeft),this.connection.bind(s.CHANNEL_JOIN_FAILED,this.connectionCallbacks.channelJoinFailed),this.connection.bind(s.CHANNEL_JOINED,this.connectionCallbacks.channelJoined),this.connection.bind(s.ERROR,this.connectionCallbacks.error),this.connection.bind(s.CLOSED,this.connectionCallbacks.closed))}abandonConnection(){if(!this.connection)return null;this.connection.unbind(s.MESSAGE,this.connectionCallbacks.message),this.connection.unbind(s.CHANNEL_LEFT,this.connectionCallbacks.channelLeft),this.connection.unbind(s.CHANNEL_JOIN_FAILED,this.connectionCallbacks.channelJoinFailed),this.connection.unbind(s.CHANNEL_JOINED,this.connectionCallbacks.channelJoined),this.connection.unbind(s.ERROR,this.connectionCallbacks.error),this.connection.unbind(s.CLOSED,this.connectionCallbacks.closed);const{connection:t}=this;return this.connection=null,t}updateState(t){const n=this.state;this.state=t,n!==t&&this.emit(t,void 0)}shouldRetry(t){return this.state===s.CONNECTING||this.state===s.CONNECTED}}var m;!function(t){t.CONNECTING="sfSocket:connecting",t.MESSAGE="sfSocket:message",t.CHANNEL_JOINED="channel_joined",t.CHANNEL_JOIN_FAILED="channel_join_failed",t.CHANNEL_LEFT="channel_left",t.CHANNEL_LEAVE_FAILED="channel_leave_failed",t.ERROR="sfSocket:error",t.CLOSED="sfSocket:closed"}(m||(m={}));class f{constructor(t){if(this.channels={},!t||"object"!=typeof t)throw new Error("sfSocket options should be an object");const n=t||{};this.config={...c,port:n.useTLS?443:80,...n},this.cMgr=new O(this.config),this.cMgr.bind(s.CONNECTED,()=>{Object.values(this.channels).forEach(t=>{t.join()})}),this.cMgr.bind(s.ERROR,t=>{console.error(t)}),f.instances.push(this),f.isReady&&this.connect()}static ready(){f.isReady=!0,f.instances.forEach(t=>{t.connect()})}connect(){this.cMgr.connect()}disconnect(){this.cMgr.disconnect()}sendCommand(t,n){return this.cMgr.sendCommand(t,n)}joinChannelList(t){t.forEach(t=>{this.joinChannel(t)})}leaveChannelList(t){t.forEach(t=>{this.leaveChannel(t)})}subscribe(t,n,e){return this.cMgr.bind(t,n,e)}unsubscribe(t,n,e){return this.cMgr.unbind(t,n,e)}joinChannel(t,n=!1){if(this.channels[t])throw new Error(`Channel ${t} already exists`);return this.channels[t]=new a(t,this),n||this.channels[t].join(),this.channels[t]}leaveChannel(t){if(!this.channels[t])throw new Error(`Channel ${t} does not exist`);const n=this.channels[t];return n.leave(),delete this.channels[t],n}getChannel(t){return this.channels[t]}}f.instances=[],f.isReady=!1,e.d(n,"makeSocketOptions",(function(){return y})),e.d(n,"SFSocket",(function(){return f})),e.d(n,"eventNames",(function(){return s})),e.d(n,"Channel",(function(){return a})),e.d(n,"ChannelStatus",(function(){return o}));const y=t=>{const n=new URL(t),e=n.protocol?n.protocol.replace(":",""):null;return n.hostname&&n.port&&e?{host:n.hostname,port:n.port,path:e}:null}}])}));
//# sourceMappingURL=socket.js.map