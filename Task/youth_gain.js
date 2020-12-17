/*
更新时间: 2020-12-16 22:06
Github Actions使用方法见[@lxk0301](https://raw.githubusercontent.com/lxk0301/scripts/master/githubAction.md) 使用方法大同小异
中青看点浏览赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，支持自动获取请求
https：\ / \ / ios \ .baertt \ .com \ / v5 \ /任务\ / Browse_（开始| end）\。json网址脚本-request-body youth_gain.js
多个请求体时用'&'号或者换行隔开" ‼️
*/


const $ = new Env("中青看点浏览赚")
const  notify  =  $ 。isNode （）？要求（'./sendNotify' ）：'' ;
让 StartBody  =  [ ] ， EndBody  =  [ ] ， gainscore  =  Number （）；
让 startArr  =  [ ] ，endArr  =  [ ] ;
让 startbodys  =  $ 。的GetData （'youth_start' ）
让 endbodys  =  $ 。获取数据 （'youth_end' ）
如果 （isGetCookie  =  typeof  $ request！== `undefined` ） {
   GetCookie （）；
   $ 。完成（）
} 

如果 （$ 。isNode （）） {
  如果 （过程。ENV 。YOUTH_START  && 过程。ENV 。YOUTH_START 。的indexOf （'＆' ） >  - 1 ） {
  StartBody  = 流程。ENV 。YOUTH_START 。分割（'＆' ）;
  }其他 {
  StartBody  = 流程。ENV 。YOUTH_START 。分割（）
  };
   如果 （过程。ENV 。YOUTH_END  && 过程。ENV 。YOUTH_END 。的indexOf （'＆' ） >  - 1 ） {
  EndBody  = 流程。ENV 。YOUTH_END 。分割（'＆' ）;
  } 其他 {
  EndBody  = 流程。ENV 。YOUTH_END 。分割（）
  }
} 其他 {
  StartBody  =  $ 。getdata （'youth_start' ）。分割（'＆' ）;
  EndBody  =  $ 。getdata （'youth_end' ）。分割（'＆' ）;
}
  对象。键（StartBody ）。forEach （（项目） =>  {
        如果 （StartBody [项目] ） {
          startArr 。推（StartBody [项目] ）
        } 
    })

  对象。键（EndBody ）。forEach （（项目） =>  {
        如果 （EndBody [项目] ） {
          endArr 。推（EndBody [项目] ）
        }
    })
如果 （$ 。isNode （）） {
      console.log(`============ 脚本执行-国际标准时间(UTC)：${new Date().toLocaleString()}  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
}
！（异步 （） =>  {
  如果 （！startArr [ 0 ] ） {
    console.log($.name, '【提示】请把抓包的请求体填入Github 的 Secrets 中，请以&隔开')
    回报;
  }
  console.log(`您共提供${startArr.length}次浏览赚任务`)
  for  （令 i  =  0 ;  i  <  startArr 。长度;  i ++ ） {
    如果 （startArr [ i ] ） {
      gainStartbody  =  startArr [ i ] ；
      gainEndbody  =  endArr [ i ]
      $ 。指数 =  i  +  1 ;
    console.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
    }
      等待 GainStart （）;
 }
   console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
   $.msg($.name, `共完成${$.index}次任务`, `共计获得${gainscore}个青豆`)
   如果 （$ 。isNode （））{
     //await notify.sendNotify($.name，`共完成${$.index}次任务，\n共计获得${gainscore}个青豆`
}
})()
  。捕捉（（ë ） =>  $ 。LOGERR （ê ））
  。最后（（） =>  $ 。完成（））

函数 GainStart （） {
    返回 新的 Promise （（resolve ， reject ） =>  {
       让 url  =  {
            网址：`https：// ios.baertt.com / v5 / task / browse_start.json` ，
            标头：{
            'User-Agent'：'KDApp / 1.7.8（iPhone; iOS 14.0; Scale / 3.00）' ，
            'Content-Type'：'application / x-www-form-urlencoded'
            },
            正文：gainStartbody
        };
        $ 。发布（url ， 异步（错误， 响应， 数据） =>  {
          让 startres  =  JSON 。解析（数据）;
           如果（startres 。项。comtele_state  == 0 ）{
             $.log("任务开始，"+startres.items.banner_id+startres.message)
             等待 $ 。等待（10000 ）;
             等待 GainEnd （）
           } 否则 如果（startres 。项目。comtele_state  == 1 ）{
             $.log("任务:"+startres.items.banner_id+"已完成，本次跳过")
             等待 $ 。等待（2000 ）;
           }
          解决（）
        })
    })
}

函数 GainEnd （） {
    返回 新的 Promise （（resolve ， reject ） =>  {
       让 url  =  {
            网址：`https：// ios.baertt.com / v5 / task / browse_end.json` ，
            标头：{
            'User-Agent'：'KDApp / 1.7.8（iPhone; iOS 14.0; Scale / 3.00）' ，
            'Content-Type'：'application / x-www-form-urlencoded'
            },
            正文：gainEndbody
         };
  $ 。发布（url ， 异步（错误， 响应， 数据） =>  {
          让 endres  =  JSON 。解析（数据）;
          如果（恩德雷斯。成功==真）{
            $.log("任务"+endres.items.banner_id+endres.message+"，恭喜获得"+endres.items.score+"个青豆")
            gainscore  + = 数字（Endres 。项目。分数）
           }  else  （
           $ 。日志（更改。消息）
           )
          解决（）
        })
    })
}

函数 GetCookie （） {
如果 （$请求 &&  $请求。方法！= '选项'  &&  $请求。URL 。匹配（/ \ / browse_start \。 JSON / ）） {
  const  startbodyVal  =  $ request 。身体;
  如果（起始）{
  如果（startbodys 。的indexOf （startbodyVal ）> - 1 ）{
     $.msg($.name,'阅读请求重复，本次跳过');
     返回
   }否则 如果（startbodys 。的indexOf （startbodyVal ）== - 1 ）
     {
        startbodys   ==  “＆” + startbodyVal 
     } 
   }  其他 {
        startbodys  =  $ request 。身体
   } 
     $ 。setdata （startbodys ，'youth_start' ）
     $.log("看看赚开始请求: "+startbodyVal)
     $.msg($.name,'获取开始请求成功');
   };

如果 （$请求 &&  $请求。方法！= '选项'  &&  $请求。URL 。匹配（/ \ / browse_end \。 JSON / ）） {
  const  endbodyVal  =  $ request 。身体
  如果（端头）{
    如果（endbodys 。的indexOf （endbodyVal ）> - 1 ）{
      $.msg($.name,'获取任务开始请求重复，本次跳过');
      返回
    } 否则 如果（endbodys 。的indexOf （endbodyVal ）== - 1 ）{
        结束语 + =  “＆” + endbodyVal 
    }
   }其他 {
        endbodys  =  $ request 。身体
   }
     $ 。setdata （endbodys ，'youth_end' ）
     $.log("看看赚结束请求: "+endbodyVal)
     $.msg($.name,'获取任务结束请求成功');
  }
}

函数 Env （t ，e ）{类 s {构造函数（t ）{ this 。env = t } send （t ， e = “ GET” ）{ t = “ string” == typeof  t？{ url：t }：t ; 让 s = this 。得到; 返回“ POST” ===È && （小号=此。交），新 无极（（ê ，我）=> {小号。呼叫（这，吨，（吨，s ^ ，- [R ）=> {吨？我（吨）：È （小号）} ）} ）}得到（牛逼）{回报 这个。发送。调用（此。ENV ，牛逼）}后（牛逼）{返回 此。发送。电话（此。ENV ，牛逼，“POST” ）} }返回 新 类{构造函数（牛逼，ē ）{此。名字= t ，这个。http =新的 小号（本），这个。数据= null ，这。dataFile = “ box.dat” ，这个。原木= [ ] ，这个。isMute =！1 ，这个。isNeedRewrite =！1 ，这个。logSeparator = “ \ n” ，这个。startTime = （新 日期）。getTime （），对象。分配（此，ê ），此。日志（“” ，`\ ud83d \ udd14 $ {这个。名字}，\ u5f00 \ u59cb！' ）} isNode （）{返回“未定义”！= typeof运算 模块&& !! 模块。出口} isQuanX （）{返回“未定义”！= typeof运算 $ task } isSurge （）{返回“ undefined”！= typeof  $ httpClient && “ undefined” == typeof  $ loon } isLoon （）{返回“ undefined”！= typeof  $ loon } toObj （t ， e = null ）{尝试{返回 JSON 。解析（t ）} catch { return  e } }toStr （t ， e = null ）{试试{返回 JSON 。stringify （t ）} catch { return  e } } getjson （t ，e ）{让 s = e ; const  i = this 。getdata （t ）; 如果（i ）尝试{ s = JSON 。解析（此。的GetData （牛逼））}赶上{ }返回 小号} setjson （牛逼，ē ）{尝试{返回 此。使用setData （JSON 。字符串化（牛逼），ē ）}赶上{回报！1 } } getScript （t ）{返回 新的 Promise（é => {此。得到（{网址：牛逼} ，（牛逼，s ^ ，我）=> Ë （我））} ）}的runScript （牛逼，ē ）{返回 新的 承诺（小号=> {让 我=此。的GetData （“@ chavy_boxjs_userCfgs.httpapi” ）;我=我吗 我。替换（/ \ n / g ，“” ）。修剪（）：i ; 令 r = this 。getdata （“ @ chavy_boxjs_userCfgs.httpapi_timeout” ）；r = r？1 * r：20 ，r = e && e 。超时？e 。超时：r ; const [o ，h ] = i 。split （“ @” ），a = { url：`http：// $ { h } / v1 / scripting / evaluate` ，body：{ script_text：t ，mock_type：“ cron” ，超时：r } ，标头：{ “ X-Key”：o ，接受：“ * / *” } } ; 这个。发布（a ，（t ，e ，i ）=> s （i ））} ）。捕捉（吨=>此。LOGERR （吨））} loaddata （）{如果（！此。isNode （））返回{ } ; {这个。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），这个。dataFile ），s = this 。fs 。existSync （t ），我=！s && this 。fs 。existSync （e ）; 如果（！s &&！i ）返回{ } ; { const  i = s吗？t：e ; 试试{返回 JSON 。解析（此。FS 。readFileSync （我））}捕获（吨）{返回{ } } } } }写数据（）{如果（此。isNode （））{此。fs = this 。fs？这个。fs：require （“ fs” ），这个。路径=这个。路径？这个。路径：require （“ path” ）; const  t = this 。路径。解决（此。数据文件），ê =此。路径。解决（过程。CWD （），此。数据文件），š =此。fs 。existSync （t ），我=！s && this 。fs 。existSync （e ），r = JSON 。字符串化（此。数据）; s？这个。fs 。writeFileSync （t ，r ）：我？这个。fs 。writeFileSync （e ，r ）：这个。fs 。writeFileSync （t ，r ）} } lodash_get （t ，e ，s ）{ const  i = e 。替换（/ \ [ （\ d + ）\] / g ，“。$ 1” ）。split （“。” ）; 令 r = t ; 对于（const  t  of  i ）如果（r = Object （r ）[ t ] ，void  0 === r ）返回 s ; 返回 r } lodash_set （t ，e ，s ）{返回 Object （t ）！== t？吨：（阵列。IsArray的（ê ）|| （É = Ë 。的toString （）。匹配（/ [ ^。[ \] ] + / g ）|| [ ] ），e 。切片（0 ，- 1 ）。减少（（t ，s ，i ）=>对象（t [ s ] ）=== t [ s ]？t [ s ]：t [ s ]=数学。abs （e [ i + 1 ] ）>> 0 == + e [ i + 1 ]？[ ]：{ } ，t ）[ e [ e 。长度- 1 ] ] =小号，吨）}的GetData （吨）{让 Ë =此。getval （t ）; 如果（/ ^ @ / 。试验（吨））{常量[ ，s ^ ，我] = / ^ @ （。*？）\。（。*？）$ / 。exec （t ），r = s？这个。getval （s ）：“” ; 如果（r ）尝试{ const  t = JSON 。解析（r ）; Ë =吨？这个。lodash_get （t ，i ，“” ）：e } catch （t ）{ e = “” } }返回 e } setdata （t ，e ）{让 s =！1 ;如果（/ ^ @ / 。试验（ê ））{常量[ ，我，- [R ] = / ^ @ （。*？）\。（。*？）$ / 。exec （e ），o =此。getval （i ），h =我？“ null” === o？null：o || “ {}”：“ {}” ; 试试{ const  e = JSON 。解析（h ）; 这个。lodash_set （e ，r ，t ），s = this 。SETVAL （JSON 。字符串化（ê ），我）}捕获（É ）{常量 Ô = { }; 这个。lodash_set （o ，r ，t ），s = this 。SETVAL （JSON 。字符串化（ø ），我）} }否则 小号=此。setval （t ，e ）; 返回 s } getval （t ）{返回 这个。isSurge （）||这个。isLoon （）？$ persistentStore 。读（t ）：这个。isQuanX （）？$ prefs 。valueForKey （t ）：这个。isNode （）吗？（此。数据=此。loaddata （），此。数据[吨] ）：此。数据&&这个。数据[ t ] || 空} setval （t ，e ）{返回 这个。isSurge （）|| 这个。isLoon （）？$ persistentStore 。写（t ，e ）：这个。isQuanX （）？$ prefs 。setValueForKey （t ，e ）：这个。isNode （）吗？（此。数据=此。loaddata （），此。数据[ ë ] =吨，此。写数据（），！0 ）：此。数据&&此。数据[ e ] || null } initGotEnv （t ）{此。得到=这个。得到了？这个。得到了：require （“ got” ），这个。cktough =这个。cktough？这个。cktough：要求（“强硬曲奇” ），本。ckjar = this 。ckjar？这个。ckjar：新 本。cktough 。CookieJar ，吨&& （吨。标头= t 。标头？Ť 。标头：{ } ，无效 0 === t 。标头。Cookie && void  0 === t 。cookieJar && （吨。cookieJar =此。ckjar ））} GET （吨， ê = （（）=> { } ））{Ť 。头&& （删除 吨。标题[ “内容类型” ] ，删除 吨。标题[ “内容长度” ] ），该。isSurge （）|| 这个。isLoon （）？（此。isSurge （）&&此。isNeedRewrite && （吨。标题=吨。头|| { } ，对象。分配（t 。标头，{ “ X-Surge-Skip-Scripting”：！1 } ））），$ httpClient 。得到（牛逼，（牛逼，小号，我）=> {！牛逼&&小号&& （小号。身体=我，Ş 。的StatusCode =小号。状态），e （t ，s ，i ）} ））：这个。isQuanX （）？（此。isNeedRewrite && （牛逼。OPTS =牛逼。OPTS || { } ，对象，分配（牛逼。OPTS ，{提示：1 } ）），$任务。取（牛逼）。然后（吨=> {常量{的StatusCode：小号，的StatusCode：我，标题：- [R ，体：Õ } =吨; È （空，{状态：小号，的StatusCode：我，标题：- [R ，体：Ó } ，ö ）} ，吨=> è （t ）））：这个。isNode （）&& （此。initGotEnv （吨），此。得到（吨）。在（“重定向” ，（吨，ê ）=> {尝试{如果（吨。标题[ “的Set-Cookie” ] ）{常量 s = t 。标头[“ set-cookie” ] 。映射（此。cktough 。曲奇。解析）。toString （）; 这个。ckjar 。setCookieSync （s ，null ），e 。cookieJar = this 。ckjar } }捕获（吨）{此。logErr （t ）} } ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）}} ，t => { const {消息：s ，响应：i } = t ；È （小号，我，我&&我。体）} ））}后（吨， ê = （（）=> { } ））{如果（吨。体&&吨。标题&&！吨。标题[ “内容-类型“ ]&& （t 。标头[ “ Content-Type” ] = “ application / x-www-form-urlencoded” ），t 。标头&&删除 t 。标头[ “ Content-Length” ] ，此。isSurge （）|| 这个。isLoon （））这个。isSurge （）&&此。isNeedRewrite && （吨。标题=Ť 。标头|| { } ，对象。分配（t 。标头，{ “ X-Surge-Skip-Scripting”：！1 } ））），$ httpClient 。交（吨，（吨，小号，我）=> {！吨&&小号&& （小号。身体=我，š 。的StatusCode =小号。状态），e （t ，s ，i ）} ）; 否则 ，如果（这个。isQuanX （））牛逼。方法= “ POST” ，this 。isNeedRewrite && （吨。OPTS =吨。OPTS || { } ，对象。分配（吨。OPTS ，{提示：！1 } ））），$ task 。取（t ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （n（null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）} ，t => e （t ））; 否则 ，如果（这个。isNode （））{这个。initGotEnv （t ）; const { url：s ， ... i } = t ; 这个。得到了。发布（s ，i ）。然后（t => { const { statusCode：s ，statusCode：i ，headers：r ，body：o } = t ; e （null ，{ status：s ，statusCode：i ，headers：r ，body：o } ，o ）}} ，t => { const {消息：s ，响应：i } = t ; È （小号，我，我&&我。体）} ）} }时间（吨）{让 È = { “M +” ：（新 的日期）。得到月（）+ 1 ，“d +” ：（新 的日期）。getDate （），“H +” ：（新 日期）。调用getHours （），“M +” ：（新 日期）。getMinutes （），“S +” ：（新 日期）。getSeconds （），“ q +”：数学。地板（（（新 日期）。得到月（）+ 3 ） / 3 ），小号：（新 日期）。getMilliseconds （）} ；/ （ y + ） / 。测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，（（新 日期）。和getFullYear （）+ “” ）。 SUBSTR （4 -正则表达式。$ 1 。长度）））; 对于（让 小号 在 ë ）新的 正则表达式（“（” +小号+ “）” ）。 测试（吨）&& （吨=吨。代替（正则表达式。$ 1 ，1 ==正则表达式。$ 1 。长度？ë [小号]：（“00” + ë [小号] ）。substr （（“ + e [ s ] ）。length ））））;；返回 t } msg （ e = t ， s = “” ， i = “” ，r ）{ const  o = t => { if （！t ）返回 t ; 如果（“ string” == typeof t ）返回 这个。isLoon （）？t：这个。isQuanX （）？{ “ open-url”：t }：此。isSurge （）？{ url：t }：无效 0 ; 如果（“对象” == typeof运算 吨）{如果（此。isLoon （））{让 Ë =吨。openUrl || Ť 。网址|| t [ “ open-url” ] ，s = t 。mediaUrl || t [ “ media-url” ] ; 返回{的OpenURL：ê ，mediaUrl：小号} }如果（此。isQuanX （））{让 Ë =吨[ “开放-URL” ] || Ť。网址|| Ť 。openUrl ，s = t [ “ media-url” ] || Ť 。mediaUrl ; 返回{ “开网址”：é ，“媒体链接”：小号} }如果（这个。isSurge （））{让 é =牛逼。网址|| Ť 。openUrl || t [ “ open-url” ] ; 返回{ url：e } } } } ; 这个。isMute || （此。isSurge （）||此。isLoon （）？$通知。后（ē ，s ^ ，我，Ô （[R ））：此。isQuanX （）&& $通知（ē ，s ^ ，我，Ø（r ）））; 令 h = [ “” ，“ ============== \ ud83d \ udce3 \ u7cfb \ u7edf \ u901a \ u77e5 \ ud83d \ udce3 ============ ==“ ] ; ^ h 。推（e ），s && h 。推（s ），i && h 。推（i ），控制台。日志（^ h 。加入（“\ n” ）），这。日志= this 。日志。concat （h ）} log （ ... t ）{ t 。长度> 0 && （此。日志= [ ...此。原木， ...吨] ），控制台。日志（牛逼。加入（此。logSeparator ））} LOGERR （t ，e ）{ const  s =！这个。isSurge （）&&！这个。isQuanX （）&&！这个。isLoon （）; s？这个。日志（“” ，'\ u2757 \ ufe0f $ {这个。名字}，\ u9519 \ u8bef`！ ，牛逼。栈）：此。日志（“，`\ u2757 \ ufe0f $ {这。名称}，\ u9519 \ u8bef！` ，t ）} wait （t ）{返回 新的 Promise （e => setTimeout （e ，t ））}完成（ t = { } ）{ const  e = （new  Date ）。getTime （），s = （e-这个。startTime ） / 1e3 ; 这个。日志（“ ，” \ ud83d \ udd14 $ {这个。名称}，\ u7ed3 \ u675f！\ ud83d \ udd5b $ { s } \ u79d2` ），这个。日志（），（此。isSurge （）||此。isQuanX （）||此。isLoon （））&&$完成（t ）} } （t ，e ）}
