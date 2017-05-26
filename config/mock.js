module.exports = {
  // mock开发配置$后跟的是须接受的参数
  'GET /your/api?$param1&$param2': {
    ok: {
      code: 0,
      codeMsg: 'ok',
      data: []
    },
    fail: {
      code: 1,
      codeMsg: 'fail',
      data: null
    }
  },
  '': {
    ok: {
      "code": 0,
	"data": {
		"bidInfo": {
			"bid": {
				"carry_hint": "无搬运,不需要带小工,没有人帮忙卸货,没有人帮忙装货",
				"goods_type": "测试",
				"service_time": "2016/11/23 - 2016/11/23",
				"special_hint": "不需要拆后座,不需要推车,需要3G以上网络",
				"train_hint": "不需要培训",
				"use_type": "临时用车",
				"week_arrange": "每周 一、二、三、四、五、六、日",
				"need_driver":"1",
				"selected_driver":"0"
			},
			"bidLine": {
				"carNum": "1",
				"carType": "小型面包",
				"destNum": "1",
				"distance": "2-3",
				"lineName": "线路1",
				"price": "2.0",
				"serviceTime": "02:30 -06:45",
				"totalTime": "4.25"
			},
			"depot": {
				"contacts_name": "高岩",
				"contacts_phone": "18710018068",
				"location": "北京市朝阳区北苑路桑普大厦",
				"name": "高岩测试仓库"
			}
		},
		"driverList": [
			 {
            "address": "北京-朝阳区",
            "age": 56,
            "avatar": "//images.daojia.com/crm/custom/7477e7ea718b2eac89c9f92deae906ac.jpeg",
            "carType": {
                "avatar": "",
                "carLong": "2.6-3.4米",
                "id": "36001",
                "name": "小型面包2.6-3.4米",
                "num": "京Q 1***4",
                "type": "小型面包"
            },
            "city": "北京",
            "deliverExperience": [],
            "id": "30227731143779",
            "isLocalLicence": 0,
            "isSelected": true,
            "isServedDriver": 1,
            "labels": [
                {
                    "id": "793706322561470464",
                    "name": "京",
                    "type": "2"
                }
            ],
            "name": "小燕测试司机",
            "num": "31",
            "order": 0,
            "price": 4,
            "score": 5,
            "servedTimes": "24",
            "totalServiceTimes": "31",
						"bidBillType":2
        }
		]
	},
	"message": "成功"
    }
  }
}
