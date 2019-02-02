var webpage = require('webpage');
var page = webpage.create();
page.open('http://www.baidu.com/', function (status) {
    var data;
    if (status === 'fail') {
        console.log('open page fail!');
    } else {
        console.log(page.content);//打印出HTML内容
    }
    page.close();//关闭网页
    phantom.exit();//退出phantomjs命令行
});
