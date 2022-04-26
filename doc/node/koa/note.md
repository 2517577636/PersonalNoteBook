# Koa Note 【按序阅读，code执行顺序】

## 1. 初始化流程

### 1.1 constructor 对象进行初始化

### 1.2 use(fn) 函数调用

```js
// 1. 验证use中传入参数类型是否为function 
// 2. 将参数添加至middleware数组中， 即koa中的所有middleware都是函数

if (typeof fn !== 'function') throw new TypeError('middleware must be a function!');
if (isGeneratorFunction(fn)) {
    deprecate('Support for generators will be removed in v3. ' +
              'See the documentation for examples of how to convert old middleware ' +
              'https://github.com/koajs/koa/blob/master/docs/migration.md');
    fn = convert(fn);
}
debug('use %s', fn._name || fn.name || '-');
this.middleware.push(fn);
return this;
```



### 1.3 listen 流程监听

#### 1.3.1 http.createServer(this.callback()); 使用http模块创建服务，返回一个http.Server 实例

```js
const server = http.createServer([options][,requestListener]);
```

The requestListener is a funciton which is automatically added to the "request" event.

##### callback() 调用

```js
// 函数内部内容  实际前端请求过来时，执行的回调为  hanleRequest
const fn = compose(this.middleware);

if (!this.listenerCount('error')) this.on('error', this.onerror);  
// listenerCount() --> emitter 返回监听 eventName 的次数。

const handleRequest = (req, res) => {
    const ctx = this.createContext(req, res);  // 内置 createContext 函数
    return this.handleRequest(ctx, fn);	// 内置 handleRequest 函数
}

return handleRequest;
```



##### compose(middleware)  --> koa-compose()  调用

```js
// 1. 验证middleware 是否为数组，且数组内成员是否为function
// 2. 返回一个函数

  return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    function dispatch (i) {
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i
      let fn = middleware[i]
      if (i === middleware.length) fn = next
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
```



##### 1.3.2  http.listen() 监听已开启的服务

Starts the HTTP server listening for connections. This method is identical to [`server.listen()`](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#serverlisten) from [`net.Server`](https://nodejs.org/dist/latest-v16.x/docs/api/net.html#class-netserver).



## 2. 执行流程【前端请求流程】

### 2.1 回调函数调用 handleRequest

```js
const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res); // 调用内置createContext函数，为本次请求创建一个koa-context 实例
      return this.handleRequest(ctx, fn); // 调用内置handleRequest函数
};

// createContext 返回一个context
createContext(req, res) {
    const context = Object.create(this.context); // koa-context 实例创建
    const request = context.request = Object.create(this.request);
    const response = context.response = Object.create(this.response);
    context.app = request.app = response.app = this; // koa实例挂载
    context.req = request.req = response.req = req;  // http.request实例挂载
    context.res = request.res = response.res = res;	 // http.response实例挂载
    request.ctx = response.ctx = context; // 将context 挂载至 koa-request | koa-response 上面
    request.response = response;
    response.request = request;
    context.originalUrl = request.originalUrl = req.url; // http.request.url 挂载
    context.state = {}; // 响应状态
    return context;
}

// 请求回调处理
handleRequest(ctx, fnMiddleware) {
    const res = ctx.res; // 获取http.response
    res.statusCode = 404; // 默认status为 404
    const onerror = err => ctx.onerror(err);	// 定义错误处理函数
    const handleResponse = () => respond(ctx);	// 定义响应处理函数
    onFinished(res, onerror); // 为响应添加一个错误处理监听器， http.response完成后将会调用onerror函数
    return fnMiddleware(ctx).then(handleResponse).catch(onerror);  // 中间件调用，全部成功执行之后触发handleResponse函数，否则触发onerror函数。
}
// fnMiddleware 参考1.3.1 compose处


// 响应处理
function respond(ctx) {
  // allow bypassing koa
  if (false === ctx.respond) return;

  if (!ctx.writable) return;

  const res = ctx.res;
  let body = ctx.body;
  const code = ctx.status;

  // ignore body
  if (statuses.empty[code]) {
    // strip headers
    ctx.body = null;
    return res.end();
  }

  if ('HEAD' === ctx.method) {
    if (!res.headersSent && !ctx.response.has('Content-Length')) {
      const { length } = ctx.response;
      if (Number.isInteger(length)) ctx.length = length;
    }
    return res.end();
  }

  // status body
  if (null == body) {
    if (ctx.response._explicitNullBody) {
      ctx.response.remove('Content-Type');
      ctx.response.remove('Transfer-Encoding');
      return res.end();
    }
    if (ctx.req.httpVersionMajor >= 2) {
      body = String(code);
    } else {
      body = ctx.message || String(code);
    }
    if (!res.headersSent) {
      ctx.type = 'text';
      ctx.length = Buffer.byteLength(body);
    }
    return res.end(body);
  }

  // responses
  if (Buffer.isBuffer(body)) return res.end(body);
  if ('string' === typeof body) return res.end(body);
  if (body instanceof Stream) return body.pipe(res);

  // body: json
  body = JSON.stringify(body);
  if (!res.headersSent) {
    ctx.length = Buffer.byteLength(body);
  }
  res.end(body);
}
```

