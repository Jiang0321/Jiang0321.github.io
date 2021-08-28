/**
 * Author:
 * Bao H.-W.-S. (https://psychbruce.github.io)
 */


/* Global Variables */

const btn_html_timer =
    `<style onload="tid=setInterval(timer, 1000)"></style>
     <button onclick="clearInterval(tid)" class="jspsych-btn" disabled=true>%choice%</button>`

const feedback_right = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: green"> √ </span>`

const feedback_wrong = `<span style="position: absolute; top: 55%; left: 0; right: 0; color: red"> X </span>`

const subID = jsPsych.randomization.randomID(8)


/* Blocks: HTML DOM Settings */

var set_html_style = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'rgb(250, 250, 250)' // background color
        document.body.style.color = 'black' // font color
        document.body.style.fontSize = '20pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'bold' // 'normal', 'bold'
        document.body.style.lineHeight = '1.6em' // line space
        document.body.style.cursor = 'default' // 'default', 'none', 'wait', ...
        document.body.onselectstart = function() { return false } // 禁止选中文字 <body oncontextmenu="return false">
        document.body.oncontextmenu = function() { return false } // 禁用鼠标右键 <body onselectstart="return false">
        document.onkeydown = function() {
            // 屏蔽键盘按键 (https://www.bejson.com/othertools/keycodes/)
            if ((event.keyCode in { 27: 'Esc', 116: 'F5', 123: 'F12' }) ||
                (event.ctrlKey && event.keyCode in { 85: 'U' })
            ) { return false }
        }
    },
}

var set_html_style_EAST = {
    type: 'call-function',
    func: function() {
        document.body.style.backgroundColor = 'black'
        document.body.style.color = 'white'
        document.body.style.fontSize = '32pt'
        document.body.style.fontFamily = '微软雅黑'
        document.body.style.fontWeight = 'normal'
        document.body.style.lineHeight = '1.2em'
        document.body.style.cursor = 'none'
    },
}


/* Blocks: Basics */

var open_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: true,
    message: `
    <p style="font: 16pt 微软雅黑; text-align: left; line-height: 1.6em">
    <b>
    测验将在一个「全屏页面」开始，为确保最佳效果，请你：<br/>
    （1）在电脑上进行测验，并使用主流浏览器打开本网页<br/>
    &emsp;&emsp;（Chrome、Edge、Firefox、Safari等，不要用IE）<br/>
    （2）关掉电脑上其他正在运行的程序或将其最小化<br/>
    （3）将手机调至静音，并尽可能减少环境噪音干扰<br/>
    （4）在测验过程中不要退出全屏<br/>
    （5）务必认真作答<br/><br/>
    </b>
    如果你同意参与，并且清楚理解了上述要求，请点击开始：
    </p>`,
    button_label: '点击这里全屏开始',
    delay_after: 100
}

var welcome = {
    type: 'html-keyboard-response',
    stimulus: `
    <p style="font: bold 32pt 微软雅黑; color: #B22222">
    欢迎参与我们的实验</p>
    <p style="font: 20pt 微软雅黑; color: black"><br/>
    <按空格键继续><br/>
    <b>实验过程中请勿退出全屏</b><br/><br/></p>
    <p style="font: 20pt 华文中宋; color: grey">
    中国科学院心理研究所<br/>2020年</p>`,
    choices: [' '],
    post_trial_gap: 100
}

/* Blocks: Surveys */

var Sex = {
  type: 'html-button-response',
  data: { varname: 'Sex' },
  stimulus: '你的性别',
  choices: ['男', '女', '其他'],
  on_finish: function(data) { addRespFromButton(data) }
}

var Age = {
  type: 'survey-html-form',
  data: { varname: 'Age' },
  preamble: '你的年龄',
  html: `
  <p><input name="Q0" type="number" placeholder="15~99" min=15 max=99
  oninput="if(value.length>2) value=value.slice(0,2)" required /></p>`,
  button_label: '继续',
  on_finish: function(data) { addRespFromSurvey(data) }
}

var Birth = {
  type: 'survey-html-form',
  data: { varname: 'Birth' },
  preamble: '你的生日',
  html: '<p><input name="Q0" type="date" value="2000-01-01" required /></p>',
  button_label: '继续',
  on_finish: function(data) { addRespFromSurvey(data) }
}

var Email = {
  type: 'survey-html-form',
  data: { varname: 'Email' },
  preamble: '你的邮箱',
  html: '<p><input name="Q0" type="email" placeholder="非必填" /></p>',
  button_label: '继续',
  on_finish: function(data) { addRespFromSurvey(data) }
}

var School = {
  type: 'survey-html-form',
  data: { varname: 'School' },
  preamble: '你的学校',
  html: `
  <p><select name="Q0" size=10>
  <option>北京大学</option>
  <option>清华大学</option>
  <option>中国人民大学</option>
  <option>北京师范大学</option>
  <option>其他</option>
  </select></p>`,
  button_label: '继续',
  on_finish: function(data) { addRespFromSurvey(data) }
}

var Language = {
  type: 'survey-multi-select',
  data: { varname: 'Language' },
  questions: [{
      prompt: '你会哪些语言？',
      options: ['汉语', '英语', '日语', '韩语', '西班牙语', '其他'],
      horizontal: false,
      required: false
  }],
  button_label: '继续',
  on_finish: function(data) { replaceComma(data) }
}

var NameLiking = {
  type: 'html-slider-response',
  data: { varname: 'NameLiking' },
  on_load: function() { setSliderAttr() },
  stimulus: '总体而言，你在多大程度上喜欢自己的名字？<br/>（1 = 非常不喜欢，9 = 非常喜欢）',
  labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],
  min: 1,
  max: 9,
  start: 5,
  prompt: '<b id="slider-value">_</b><br/><br/>',
  button_label: '继续',
  require_movement: true
}

var SWLS = {
  timeline: [{
      type: 'html-button-response',
      data: jsPsych.timelineVariable('data'),
      stimulus: jsPsych.timelineVariable('s'),
      prompt: `
      <p style="font-size: 16pt; font-weight: normal">
      请表明你对该陈述的同意程度<br/>
      （1 = 非常不同意，7 = 非常同意）</p>`,
      choices: ['1', '2', '3', '4', '5', '6', '7'],
      on_finish: function(data) { addRespFromButtonScale(data, 'SWLS') },
      post_trial_gap: 50
  }],
  timeline_variables: [
      { data: { i: 1 }, s: '我的生活在大多数情况下接近我的理想状态' },
      { data: { i: 2 }, s: '我的生活条件非常好' },
      { data: { i: 3 }, s: '我对我的生活感到满意' },
      { data: { i: 4 }, s: '目前为止我已经得到了生活中我想得到的重要东西' },
      { data: { i: 5 }, s: '如果生活可以重来，我还愿意过现在这样的生活' },
  ],
  randomize_order: false
}

