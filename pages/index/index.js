// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    // motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    mapheight: 504,
    mapwidth: 320,
    bottonheight: 504,
    boomwidth:400,
    showModal: false,
    pagenum:1,
    pageback:"https://636c-cloud1-6goql39af90fcd31-1313692077.tcb.qcloud.la/docsmall/youxiguize.PNG?sign=e6e4e68fee97aeed870e65e3ee16e486&t=1662361899",
    pagecontent:"本小程序为不限时积分制，用户需要在四个校区的地图上自由探索，点击地标名称以寻找分布在校园里的AED，每找到一个加5分；有AED的地点可能隐藏着与该场景相关的急救常识题目（单选or多选），单选题回答正确加10分，答错不扣分；多选题全部答对加15分，部分答对加10分，有错不加分。若用户无法找到更多AED可点击提交，我们会按照积分排名发放奖品。",
    callword:"姓名",
    stdidword:"学号",
    teleword:"手机号码"
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    let screenHeight = wx.getSystemInfoSync().windowHeight;
    let screenWidth = wx.getSystemInfoSync().windowWidth;
    this.setData({
      mapheight: screenHeight,
      mapwidth: screenWidth,
      bottonheight: screenHeight*0.55,
      boomheight: screenHeight*0.8
    });
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    // console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  ChangeToMap:function(){
    wx.redirectTo({
      url: '../map/map',
    })
  },
  showDialogBtn: function(e) {
    this.setData({
      showModal:true
    });
  },
  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () {
  },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onConfirm: function (e) {
    if(this.data.pagenum==1){
      this.setData({
        pagenum:2,
        pagecontent:"操作示范：\n由于腾讯地图设置原因，有些地点隐藏较深，一定要放大放大再放大哦～"
      });
    }
    else if(this.data.pagenum==2){
      this.setData({
        pagenum:3,
        pageback:"https://636c-cloud1-6goql39af90fcd31-1313692077.tcb.qcloud.la/kaishi.PNG?sign=78497be144d3b5571f1bbe3046dc9feb&t=1662639154",
        pagecontent:"本小程序旨在通过地图打卡和题目问答的形式让同学们熟悉AED场所并普及急救知识，不包含任何形式的医疗建议。小程序中AED地点参照复旦大学校医院2021年发布的《复旦大学校园突发医疗事件急救地图》（https://zongwuchu.fudan.edu.cn/63/50/c16366a418640/page.htm），有个别地点由于腾讯地图兴趣点（POI）分布不理想，使用邻近地点代替或没有收录，正确地点仍以上述急救地图为准。"
      });
    }
    else if(this.data.pagenum==3){
      this.ChangeToMap()
      // this.setData({
      //   pagenum:4,
      //   pageback:"https://636c-cloud1-6goql39af90fcd31-1313692077.tcb.qcloud.la/docsmall/gerenxinxi.PNG?sign=b97f805bea544bd1a12993166b668839&t=1662361950",
      //   pagecontent:"收集的个人信息仅用于联系获奖同学发放奖品，不会用于其它目的。"
      // });
    }
    // this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  onCancel: function () {
    this.setData({
      pagenum:1,
      pageback:"https://636c-cloud1-6goql39af90fcd31-1313692077.tcb.qcloud.la/docsmall/youxiguize.PNG?sign=3bc04aa39312054307a51bcdaad3a4b1&t=1662361970",
      pagecontent:"本小程序为不限时积分制，用户需要在四个校区的地图上自由探索，点击地标名称以寻找分布在校园里的AED，每找到一个加5分；有AED的地点可能隐藏着与该场景相关的急救常识题目，单选题回答正确加10分，答错不扣分；多选题全部答对加15分，部分答对加10分，有错不加分。若用户无法找到更多AED可点击提交，我们会按照积分排名发放奖品。"
    });
    this.hideModal();
  },
  
  // back_houtai: function (e) {
  //   const db = wx.cloud.database({});
  //   const cont = db.collection('user');
  //   if(this.data.call==undefined) this.setData({callword:"请输入姓名"});
  //   else if(this.data.stdid==undefined) this.setData({stdidword:"请输入学号"});
  //   else if(this.data.tele==undefined) this.setData({teleword:"请输入手机号码"});
  //   else{
  //     // console.log(this.data.call)
  //     // console.log(this.data.stdid)
  //     // console.log(this.data.tele)
  //     cont.add({
  //       data: {
  //         name: this.data.call,
  //         studid:this.data.stdid,
  //         tele:this.data.tele
  //       },
  //       success: function (res) {
  //         // console.log("success")
  //       }
  //     });
  //     this.ChangeToMap();
  //   }
    
  //   },
inputChangecall:function(e){
  this.setData({
    call:e.detail.value
  })
},
inputChangestdid:function(e){
  this.setData({
    stdid:e.detail.value
  })
},
inputChangetele:function(e){
  this.setData({
    tele:e.detail.value
  })
},
})
