const express = require('express');
const reqest = require('request');
var Mock = require('mockjs');
const qs = require('querystring');

const app = express();

app.get('/meituan', (req, res)=>{
    res.end('welcome!');
})

//城市列表
app.get('/meituan/address/city/list', (req, res)=>{
    res.json(require('./data/city-list.json'));
})

// 搜索地址
app.get('/meituan/address/search', (req, res)=>{
    let {city, keyword} = req.query;
    let path = 'https://maf.meituan.com/search';
    let options = {
        key: 'be9427ec-bca4-4bfa-b981-9314f6a1adc7',
        region: 'CITY',
        orderby: 'weight',
        radius: '50000',
        pageSize: '20',
        page: '1',
        city,
        keyword
    }
    let fullpath = path + '?' + qs.stringify(options);
    reqest.get(fullpath, (error, response, body)=>{
        if(!error && response.statusCode == 200){
            console.log(1);
            let obj = JSON.parse(body);
            console.log(typeof obj);
            console.log(obj);
            res.json(obj);
        }else{
            res.json({
                status: 500,
                msg: '请求失败'
            });
        }
    })

})

// 首页分类
app.get('/meituan/home/category', (req, res)=>{
    res.json(require('./data/category.json'));
})

// 店铺列表
app.get('/meituan/shop/list', (req, res)=>{
    let page = Number(req.query.page) || 1;
    let count = Number(req.query.count) || 12;
    let categoryId = req.query.categoryId || '';
    let offset = (page - 1) * count;
    let allList = require('./data/shop-list.json');
    let shopList = [...allList].splice(offset, count);

    let result = {
        msg: '成功',
        code: 0,
        data: shopList,
        count: allList.length
    };
    res.json(result);
})

app.get('/meituan/shop/header', (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.json({
            msg: '失败，缺少参数',
            code: -1,
            data: null
        })
    }
    res.json(require('./data/shop-header.json'));
})

// 店铺详情
app.get('/meituan/shop/detail', (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.json({
            msg: '失败，缺少参数',
            code: -1,
            data: null
        })
    }
    let list = [];
    for(let i = 0; i < 10; i++){
        list.push(require(`./data/shop-detail-${i}.json`));
    }
    let result = Mock.mock({
        msg: '成功',
        code: 0,
        'data': list[0]
    });
    res.json(result);
})

// 店铺评价
app.get('/meituan/shop/comment', (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.json({
            msg: '失败，缺少参数',
            code: -1,
            data: null
        })
    }
    res.json(require('./data/comments.json'));
})

// 店铺信息
app.get('/meituan/shop/info', (req, res)=>{
    let {id} = req.query;
    if(!id){
        res.json({
            msg: '失败，缺少参数',
            code: -1,
            data: null
        })
    }
    res.json(require('./data/info.json'));
})



app.listen(7000, 'localhost', (error)=>{
    if(error){
        console.log('启动失败');
    }
    else{
        console.log('启动成功');
    }
})