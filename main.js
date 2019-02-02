var webpage = require('webpage');
var fs = require('fs');
// 路径下标
var index = 0;

var urlArr = ['https://h5.youzan.com/wscshop/goods/3f2qwcxiflvv4?scene=0&clicktime=1548741484&redirect_count=1&sf=wx_sm&is_share=1','https://h5.youzan.com/v2/goods/2xmkps4w7wi8g?banner_id=f.29689136~goods~3~T5ztVCxo','https://h5.youzan.com/v2/goods/26xrc00y2kmy8?banner_id=f.29689136~goods~4~T5ztVCxo'
            ,'https://h5.youzan.com/v2/goods/2fp2y4iqwcqyo?banner_id=f.29689136~goods~1~T5ztVCxo','https://h5.youzan.com/v2/goods/3evdix7m714e8?banner_id=f.29689136~goods~2~T5ztVCxo'];
function getHtml(url) {
    var page = webpage.create();
    page.customHeaders = {
        'Accept':'application/json, text/plain, */*',
        'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
        'Accept-Language':'zh-CN,zh;q=0.8',
        'Connection':'keep-alive',
        'Cookie':'yz_log_seqn=1; KDTSESSIONID=YZ540856505193246720YZ1qNgN1Pm; nobody_sign=YZ540856505193246720YZ1qNgN1Pm; _kdt_id_=12252080; yz_log_ftime=1548991839836; yz_log_uuid=922278b9-2539-709b-5104-7cb60c664f50; yz_ep_page_type_track=iDJ3GNJDHbhHtOl6W3j3ZA%3D%3D',
    };
    page.settings.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit/604.1.38 (KHTML, like Gecko) Version/11.0 Mobile/15A372 Safari/604.1';
    page.open(url, function (status) {
        var data;
        if (status === 'fail') {
            console.log('open page fail!');
        } else {
            // 课程名称
            var courseTitle = page.content.split('<div class="goods-title__main"><!----><span>')[1].split('</span>')[0].trim();
            // 价格
            var price = page.content.split('<i class="goods-price__current-price-text">')[1].split('</i>')[0].trim();
            // 销售额
            var saleNum = page.content.split('销量:')[1].split('</div>')[0].trim();
            // 当前写入时间
            var myDate = new Date();//获取系统当前时间
            var year = myDate.getFullYear();
            var month = myDate.getMonth()+1;
            var date = myDate.getDate();
            var hour = myDate.getHours();
            var minute = myDate.getMinutes();
            var seconds = myDate.getSeconds();
            var content = fs.read("enting.txt");
            fs.write('enting.txt',content+courseTitle+','+price+','+saleNum+'\n', "w");
            console.log('数据添加成功',index);
            if(index>=urlArr.length-1){
                fs.write('enting.txt',content+'时间：'+year+'年'+month+'月'+date+'日'+hour+'时'+minute+'分'+seconds+'秒添加完成'+'\n', "w");
                phantom.exit();//退出phantomjs命令行
            }else{
                page.close();//关闭网页
                getHtml(urlArr[++index]);
            }
        }
        page.close();//关闭网页
        // phantom.exit();//退出phantomjs命令行
    });
}
getHtml(urlArr[0]);
// for(var i=0;i<url.length;i++){
//     getHtml(url[i]);
//     console.log('添加成功'+i);
// };


