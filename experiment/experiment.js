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
    中国科学院心理研究所<br/>2021年8月28日<br/>江盈颖</p>",
  post_trial_gap: 100
};

// 使用instructions呈现指导语（可以连续呈现多屏）
var instr = {
  type: "instructions",
  pages: [
    "<p style='text-align: left'>\
    指导语：<br/>\
    下面有一系列陈述，<br/>\
    请表明你对这些陈述的同意程度。<br/><br/>\
    1 = 非常不同意<br/>\
    2 = 不同意<br/>\
    3 = 比较同意<br/>\
    4 = 不确定<br/>\
    5 = 比较同意<br/>\
    6 = 同意<br/>\
    7 = 非常同意</p>",
  ],
  show_clickable_nav: true,
  allow_backward: false,
  button_label_previous: "返回",
  button_label_next: "继续",
};

// 定义实验流程（时间线）
var timeline = [
  set_html_style,  // 先设置背景色和字体
  welcome,
  instr,  // 再呈现指导语
];

// 运行实验（总控制）
jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.get().localSave("csv", "data.csv");
    document.write("<h1 style='text-align:center; height:500pt; line-height:500pt'>实验结束，感谢您的参与！</h1>");
  }
});