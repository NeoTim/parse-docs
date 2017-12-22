# Info

* __Desc__   : 获取 分享邀请码
* __Url__    : /getShareCode
* __Method__ : GET

# Request

```js
//<request>
{
    kps:"11",//UC账号kps
    balance: 3343 ,// 当前账号余额，可选

}
```

# Response

```js
//<response=200>
//<delay=100>
{
  success: true,
  code: "OK",//OK 成功，SYS_ERROR 系统错误，INVALID_USER 无效用户，NOT_OPEN 未开启赏金模式
  data: {
    inviteCode: 'DFSF343',//邀请码 ，未绑手机或淘宝时空值
    shareCode: "sfsfs234546466656", //纯分享码，可解开uid及余额
  },
  msg:"some message",
}
```
