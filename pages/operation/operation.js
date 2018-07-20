// pages/operation/operation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    areaId:0,
    areaName:'',
    priority:0,
    addUrl:'http://localhost:8080/demo/area/addarea',
    updateUrl:'http://localhost:8080/demo/area/modifyarea'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    if (options.areaId == undefined) {
      return;
    }
    this.setData({
      areaId: options.areaId,
    }),
    wx.request({
      url: 'http://localhost:8080/demo/area/getareabyid',
      data:{
        areaId: that.data.areaId
      },
      method:'GET',
      success:function(res){
        var area=res.data.area;
        if (area == 0){
          wx.showToast({
            title: '远程数据加载失败！',
            duration:2000
          });
        }else{
          that.setData({
            areaName: area.areaName,
            priority: area.priority
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  formSubmit: function(e){
    console.log(e);
    var that=this;
    var formData = e.detail.value;
    var url = that.data.addUrl;
    if (that.data.areaId!=0){
      url = that.data.updateUrl;
      formData.areaId = that.data.areaId;
    }
    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      success:function(e){
        console.log(e)
        var result=e.data.success;
        var toastText="操作成功！";
        if (result != true) {
          toastText = "操作失败" + e.data.errMsg;
        }
        wx.showToast({
          title: toastText,
          icon: '',
          duration: 2000,
          success:function(e){
            wx.redirectTo({
              url: '../list/list',
            })
          } 
        });
      }
    })
  }
})