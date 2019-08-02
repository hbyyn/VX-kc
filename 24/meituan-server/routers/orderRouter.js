const express = require('express');
const Order = require('../model/order');

const router = new express.Router();

router.post('/add', (req, res)=>{
    // 验证是否携带用户信息
    if(req.session.userInfo){
        // 获得订单的数据
        let openid = req.session.userInfo.openid;
        let {shopId, list, pay} = req.body;
        new Order({
            openid,
            shopId,
            list,
            pay
        }).save()
        .then((data)=>{
            res.json({
                code: 0,
                message: '订单生成成功',
                data
            });
        })
        .catch(()=>{
            res.json({
                code: -2,
                message: '数据库错误'
            })
        })
    }else{
        res.json({
            code: -1,
            message: '缺少TOKEN，请先登录'
        });
    }
})

// 查询用户的所有订单
router.get('/get_all', (req, res)=>{
    // 验证是否携带用户信息
    if(req.session.userInfo){
        let openid = req.session.userInfo.openid;
        Order.find({openid})
        .then(result=>{
            res.json({
                code: 0,
                result
            })
        })
        .catch(()=>{
            res.json({
                code: -2,
                message: '数据库错误'
            })
        })
    }else{
        res.json({
            code: -1,
            message: '缺少TOKEN，请先登录'
        });
    }
})

module.exports = router;