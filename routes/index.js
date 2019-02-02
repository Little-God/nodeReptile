var express = require('express');
var router = express.Router();
var http = require('https');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '简单nodejs爬虫' });
});
router.get('/getJobs', function(req, res, next) { // 浏览器端发来get请求
  // var page = req.param('page');  //获取get请求中的参数 page
  // console.log("page: "+page);
  var Res = res;  //保存，防止下边的修改
//url 获取信息的页面部分地址

  let option = {
    hostname:'h5.youzan.com',
    path:'/wscshop/goods/showcase-components.json?alias=26xrc00y2kmy8&isGdt=0&version=',
    headers:{
      'Accept':'application/json, text/plain, */*',
      'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
      'Accept-Language':'zh-CN,zh;q=0.8',
      'Connection':'keep-alive',
      'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1',
      'Cookie':'yz_log_seqn=1; KDTSESSIONID=YZ540856505193246720YZ1qNgN1Pm; nobody_sign=YZ540856505193246720YZ1qNgN1Pm; _kdt_id_=12252080; yz_log_ftime=1548991839836; yz_log_uuid=922278b9-2539-709b-5104-7cb60c664f50; yz_ep_page_type_track=iDJ3GNJDHbhHtOl6W3j3ZA%3D%3D',
      // 'Host': 'h5.youzan.com',
      // 'Referer': 'https://h5.youzan.com/wscshop/goods/3f2qwcxiflvv4?scene=0&clicktime=1548741484&redirect_count=1&sf=wx_sm&is_share=1'
      // 'Referer':'https://m.baidu.com/tcx?appui=alaxs&page=detail&gid=4305265392&from=dushu'

    }
  };
  http.get(option,function(res){  //通过get方法获取对应地址中的页面信息
    // console.log(232, res);
    var chunks = [];
    var size = 0;
    let htmlnew = '';
    res.on('data',function(chunk){   //监听事件 传输
      htmlnew += chunk;
      chunks.push(chunk);
      size += chunk.length;
    });
    res.on('end',function(){  //数据传输完
      var data = Buffer.concat(chunks,size);
      var html = data.toString();
      // console.log(JSON.parse(html).data);
         console.log(htmlnew);
      var $ = cheerio.load(html); //cheerio模块开始处理 DOM处理
      var jobs = [];
      // let index = $('script').eq(1).html().indexOf('=')+1;
      // console.log(JSON.parse($('script').eq(1).html().slice(index)));
      // console.log($('body').html());
      // var jobs_list = $(".hot_pos li");
      // $(".hot_pos>li").each(function(){   //对页面岗位栏信息进行处理  每个岗位对应一个 li  ,各标识符到页面进行分析得出
      //   var job = {};
      //   job.company = $(this).find(".hot_pos_r div").eq(1).find("a").html(); //公司名
      //   job.period = $(this).find(".hot_pos_r span").eq(1).html(); //阶段
      //   job.scale = $(this).find(".hot_pos_r span").eq(2).html(); //规模
      //
      //   job.name = $(this).find(".hot_pos_l a").attr("title"); //岗位名
      //   job.src = $(this).find(".hot_pos_l a").attr("href"); //岗位链接
      //   job.city = $(this).find(".hot_pos_l .c9").html(); //岗位所在城市
      //   job.salary = $(this).find(".hot_pos_l span").eq(1).html(); //薪资
      //   job.exp = $(this).find(".hot_pos_l span").eq(2).html(); //岗位所需经验
      //   job.time = $(this).find(".hot_pos_l span").eq(5).html(); //发布时间
      //
      //   console.log(job.name);  //控制台输出岗位名
      //   jobs.push(job);
      // });
      Res.json({  //返回json格式数据给浏览器端
        jobs:jobs
      });
    });
  });

});

module.exports = router;
