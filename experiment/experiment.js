// 定义实验材料（Trial或Block）
var welcome = {
  type: "html-keyboard-response",
  stimulus:
    "<p style='font: bold 42px 微软雅黑; color: #B22222'>\
    欢迎参与我们的实验</p>\
    <p style='font: 30px 微软雅黑; color: black'><br/>\
    <按任意键继续><br/><b>实验过程中请勿退出全屏</b>\
    <br/><br/></p>\
    <p style='font: 24px 华文中宋; color: grey'>\
    中国科学院心理研究所<br/>2020年</p>",
  post_trial_gap: 100
};

// 定义实验流程（时间线）
var timeline = [
  welcome
];

// 运行实验（总控制）
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.get().localSave("csv", "data.csv");  // download from browser
    document.write("<h1 style='text-align:center; height:500pt; line-height:500pt'>实验结束，感谢您的参与！</h1>");
  }
});
