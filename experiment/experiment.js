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


function set_html_style_iat() {
    document.body.style.backgroundColor = 'black'
    document.body.style.color = 'white'
    document.body.style.fontSize = '32pt'
    document.body.style.fontFamily = '微软雅黑'
    document.body.style.fontWeight = 'normal'
    document.body.style.lineHeight = '1.2em'
    document.body.style.cursor = 'none'
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
    中国科学院心理研究所<br/>2021年8月29日</p>`,
    choices: [' '],
    post_trial_gap: 100
}

var warmup = {
    type: 'html-button-response',
    stimulus: '<p>请做好准备……</p>',
    choices: ['<span id="timer">3</span>秒后继续'],
    button_html: btn_html_timer
}

var instr_4 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明你对这些陈述的同意程度。<br/><br/>
        1 = 非常不同意<br/>
        2 = 不同意<br/>
        3 = 同意<br/>
        4 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var instr_7 = {
    type: 'instructions',
    pages: [
        `<p style="text-align: left">
        指导语：<br/>
        下面有一系列陈述，<br/>
        请表明你对这些陈述的同意程度。<br/><br/>
        1 = 非常不同意<br/>
        2 = 不同意<br/>
        3 = 比较不同意<br/>
        4 = 不确定<br/>
        5 = 比较同意<br/>
        6 = 同意<br/>
        7 = 非常同意</p>`,
    ],
    show_clickable_nav: true,
    allow_backward: false,
    button_label_previous: '返回',
    button_label_next: '继续'
}

var close_fullscreen = {
    type: 'fullscreen',
    fullscreen_mode: false,
    delay_after: 0
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
    preamble: '你的出生日期',
    html: '<p><input name="Q0" type="date" value="2000-01-01" required /></p>',
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Phone = {
    type: 'survey-html-form',
    data: { varname: 'Phone' },
    preamble: '你的电话号码',
    html: `
    <p><input name="Q0" type="number" placeholder="12345678901" 
    oninput="if(value.length>11) value=value.slice(0,11)" required /></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Father_edu = {
    type: 'survey-html-form',
    data: { varname: 'Father_edu' },
    preamble: '你父亲的受教育水平',
    html: `
    <p><select name="Q0" size=10>
    <option>没上过学</option>
    <option>小学</option>
    <option>初中</option>
    <option>高中或中专</option>
    <option>本科或大专</option>
    <option>研究生</option>
    <option>不知道</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Mather_edu = {
    type: 'survey-html-form',
    data: { varname: 'Mather_edu' },
    preamble: '你母亲的受教育水平',
    html: `
    <p><select name="Q0" size=10>
    <option>没上过学</option>
    <option>小学</option>
    <option>初中</option>
    <option>高中或中专</option>
    <option>本科或大专</option>
    <option>研究生</option>
    <option>不知道</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}

var Income = {
    type: 'survey-html-form',
    data: { varname: 'Income' },
    preamble: '你们家人均月收入是多少？',
    html: `
    <p><select name="Q0" size=10>
    <option>1000以下</option>
    <option>1000-1999</option>
    <option>2000-4999</option>
    <option>5000-9999</option>
    <option>1万-3万</option>
    <option>3万以上</option>
    </select></p>`,
    button_label: '继续',
    on_finish: function(data) { addRespFromSurvey(data) }
}



var Subjective_ses = {
    type: 'html-slider-response',
    data: { varname: 'Subjective_ses' },
    on_load: function() { setSliderAttr() },
    stimulus: '将下面梯子想象成一个人在中国的位置，梯子最顶端的人收入最高，受教育水平最高，工作最好；梯子最低端的人收入最低，受教育水平最低，工作最差。你认为你家在梯子的哪个水平上？',
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    min: 1,
    max: 10,
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

var RSES = {
    timeline: [{
        type: 'html-button-response',
        data: jsPsych.timelineVariable('data'),
        stimulus: jsPsych.timelineVariable('s'),
        prompt: `
        <p style="font-size: 16pt; font-weight: normal">
        请表明你对该陈述的同意程度<br/>
        （1 = 非常不同意，4 = 非常同意）</p>`,
        choices: ['1', '2', '3', '4'],
        on_finish: function(data) { addRespFromButtonScale(data, 'RSES') },
        post_trial_gap: 50
    }],
    timeline_variables: [
        { data: { i: 1 }, s: '我认为自己是个有价值的人，至少与别人不相上下' },
        { data: { i: 2 }, s: '我觉得我有许多优点' },
        { data: { i: 3 }, s: '总的来说，我倾向于认为自己是一个失败者' },
        { data: { i: 4 }, s: '我做事可以做得和大多数人一样好' },
        { data: { i: 5 }, s: '我觉得自己没有什么值得自豪的地方' },
        { data: { i: 6 }, s: '我对自己持有一种肯定的态度' },
        { data: { i: 7 }, s: '整体而言，我对自己感到满意' },
        { data: { i: 8 }, s: '我本应该对自己尊重更多一些' },
        { data: { i: 9 }, s: '有时我的确感到自己没用了' },
        { data: { i: 10 }, s: '有时我认为自己一无是处' },
    ],
    randomize_order: false
}

var OpenEnded = {
    type: 'survey-text',
    data: { varname: 'OpenEnded' },
    questions: [{
        prompt: '实验已全部完成，你可以分享任何疑问或想法：',
        placeholder: '非必答',
        rows: 5,
        columns: 50,
        required: false
    }],
    button_label: '完成',
    on_finish: function(data) { addRespFromSurvey(data) }
}


/* Blocks: IAT */

// Template (the ONLY thing you need to modify)

var key_L = 'f'
var key_R = 'j'
var iat_temp = {
    // Pairs A & Pairs B should be compatible
    attribA: { label: '重要', items: ['重要', '珍惜', '重视', '要紧', '关键'] },
    attribB: { label: '不重要', items: ['不要紧', '忽略', '忽视', '无所谓', '轻视'] },
    targetA: { label: '人', items: ['人类', '人', '人群', '人们', '百姓'] },
    targetB: { label: '物体', items: ['物体', '物质', '工具', '东西', '物件'] },
}
var attrib_color = 'white'
var target_color = 'rgb(150, 250, 100)'

// Randomize stimuli pairs (left vs. right; compatible-blocks first vs. incompatible-blocks first)

var version = jsPsych.randomization.factorial({ attrib: [1, 2], target: [1, 2] })[0] // one of four, e.g., { attrib: 2, target: 1 }
var compatible_first = (version.attrib == version.target) ? true : false

var iat = JSON.parse(JSON.stringify(iat_temp)) // 深复制（iat_temp仅为指针，浅复制会同步修改两者）
if (version.attrib == 2) {
    iat.attribA.label = iat_temp.attribB.label
    iat.attribA.items = iat_temp.attribB.items
    iat.attribB.label = iat_temp.attribA.label
    iat.attribB.items = iat_temp.attribA.items
}
if (version.target == 2) {
    iat.targetA.label = iat_temp.targetB.label
    iat.targetA.items = iat_temp.targetB.items
    iat.targetB.label = iat_temp.targetA.label
    iat.targetB.items = iat_temp.targetA.items
}

// Top-left and top-right tags

var tag_IAT_prac_attrib = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat.attribA.label}</span></div>
                           <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                           <span style="color:${attrib_color}">${iat.attribB.label}</span></div>`

var tag_IAT_prac_target_1 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetA.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetB.label}</span></div>`

var tag_IAT_prac_target_2 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetB.label}</span></div>
                             <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                             <span style="color:${target_color}">${iat.targetA.label}</span></div>`

var tag_IAT_test_1 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribA.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetA.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribB.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetB.label}</span></div>`

var tag_IAT_test_2 = `<div class="tag-left">按“${key_L.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribA.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetB.label}</span></div>
                      <div class="tag-right">按“${key_R.toUpperCase()}”键:<br/>
                      <span style="color:${attrib_color}">${iat.attribB.label}</span><br/>或<br/>
                      <span style="color:${target_color}">${iat.targetA.label}</span></div>`

// Instructions

var IAT_instr0 = {
    type: 'html-button-response',
    data: { version_attrib: version.attrib, version_target: version.target },
    stimulus: `
    <h3>词语分类任务</h3>
    <p>在接下来的任务中，你需要对一系列词语进行分类。<br/>
    请先熟悉这些词语，这有利于你完成接下来的任务。</p>
    <table align="center" border=1 cellpadding=3 cellspacing=0>
    <tr> <th>类别</th> <th>词语</th> </tr>
    <tr> <td>&emsp;${iat_temp.attribA.label}&emsp;</td> <td>&emsp;${iat_temp.attribA.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.attribB.label}&emsp;</td> <td>&emsp;${iat_temp.attribB.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.targetA.label}&emsp;</td> <td>&emsp;${iat_temp.targetA.items.join('、')}&emsp;</td> </tr>
    <tr> <td>&emsp;${iat_temp.targetB.label}&emsp;</td> <td>&emsp;${iat_temp.targetB.items.join('、')}&emsp;</td> </tr>
    </table><br/>`,
    choices: ['<span id="timer">10</span>秒后继续'],
    button_html: btn_html_timer,
    on_finish: set_html_style_iat
}

var IAT_instr1 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务1：对“${iat.attribA.label}”词和“${iat.attribB.label}”词分类 ——<br/>
    不同词语会出现在屏幕中央，类别标签将始终显示在屏幕上方<br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_attrib
}

var IAT_instr2 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务2：对“${iat.targetA.label}”词和“${iat.targetB.label}”词分类 ——<br/>
    <span style="color:#78DCE8"><b>注意上方，类别标签和需要分类的词语都已经改变</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_1
}

var IAT_instr3 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务3：对“${iat.attribA.label}/${iat.targetA.label}”词和“${iat.attribB.label}/${iat.targetB.label}”词分类 ——<br/>
    <span style="color:#78DCE8"><b>注意上方，之前的四类词语将混合在一起交替呈现</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_1
}

var IAT_instr4 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务4：对“${iat.attribA.label}/${iat.targetA.label}”词和“${iat.attribB.label}/${iat.targetB.label}”词分类 ——<br/>
    <span style="color:#78DCE8"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_1
}

var IAT_instr5 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务5：对“${iat.targetB.label}”词和“${iat.targetA.label}”词分类 ——<br/>
    <span style="color:#FF6188"><b>注意上方，仍然是两个类别标签，但互换了位置！</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_prac_target_2
}

var IAT_instr6 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务6：对“${iat.attribA.label}/${iat.targetB.label}”词和“${iat.attribB.label}/${iat.targetA.label}”词分类 ——<br/>
    <span style="color:#FF6188"><b>注意上方，四类词语将以新的组合方式交替呈现！</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_2
}

var IAT_instr7 = {
    type: 'html-keyboard-response',
    stimulus: `
    <div class="tag-bottom"><p>
    —— 任务7：对“${iat.attribA.label}/${iat.targetB.label}”词和“${iat.attribB.label}/${iat.targetA.label}”词分类 ——<br/>
    <span style="color:#FF6188"><b>与刚才的任务完全相同，请再次对这四类词语分类</b></span><br/>
    <span style="color:#FFD866"><b>请根据上方标签的提示，尽可能正确并且快速地做出按键反应</b></span><br/>
    当按键错误时屏幕中会出现<span style="color:red"> X </span>，需要按另一个键纠正才能继续<br/><br/>
    请把双手食指分别放在键盘的“${key_L.toUpperCase()}”键和“${key_R.toUpperCase()}”键上<br/>
    按<空格键>开始
    </p></div>`,
    choices: [' '],
    prompt: tag_IAT_test_2
}

// Generate IAT stimuli and blocks

function generateRandomTrials(n_trials, arr, neighbor_different = true) {
    var repeats = Math.floor(n_trials / arr.length)
    if (repeats >= 1) {
        var array1 = jsPsych.randomization.repeat(arr, repeats)
        var array2 = jsPsych.randomization.sampleWithoutReplacement(arr, n_trials - array1.length)
        var array = array1.concat(array2)
    } else {
        var array = jsPsych.randomization.sampleWithoutReplacement(arr, n_trials)
    }
    if (neighbor_different) {
        array = jsPsych.randomization.shuffleNoRepeats(array)
    }
    return array
}

function crossArrays(arr1, arr2) {
    var arr = []
    for (var i in arr1) { arr.push(arr1[i], arr2[i]) }
    return arr
}

function toStimuli(array) {
    for (var i in array) { array[i] = { s: array[i] } }
    return array
}

function blockTemplateIAT(block_id, tag, stimuli, stim_func, key_answer_func, iti = 400) {
    var IAT = {
        timeline_variables: toStimuli(stimuli),
        timeline: [{
            type: 'html-keyboard-response',
            stimulus: '',
            choices: jsPsych.NO_KEYS,
            prompt: tag,
            trial_duration: iti, // inter-trial interval
            response_ends_trial: false
        }, {
            type: 'categorize-html',
            data: { IAT: block_id },
            stimulus: stim_func,
            choices: [key_L, key_R],
            key_answer: key_answer_func,
            prompt: tag,
            correct_text: tag,
            incorrect_text: tag + feedback_wrong,
            feedback_duration: 0,
            show_stim_with_feedback: true,
            force_correct_button_press: true,
            on_finish: function(data) { data.RT = data.rt } // for computing IAT D-score in feedback
        }]
    }
    return IAT
}

/**
 * Standard IAT procedure (adapted from Greenwald, Nosek, & Banaji, 2003, JPSP):
 *  Block   Trials      Function    Type
 *      1       20      Practice    Attribute
 *      2       20      Practice    Target
 *      3       20      Practice    Combined
 *      4       40      Test        Combined
 *      5       20      Practice    Target (reversed)
 *      6       20      Practice    Combined (reversed)
 *      7       40      Test        Combined (reversed)
 */

var IAT1 = blockTemplateIAT(
    block_id = 1,
    tag = tag_IAT_prac_attrib,
    stimuli = generateRandomTrials(20, [].concat(iat.attribA.items, iat.attribB.items)),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${attrib_color}">${stim}</p>`
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.attribA.items.includes(stim)) { return keyCode(key_L) }
        if (iat.attribB.items.includes(stim)) { return keyCode(key_R) }
    }
)

var IAT2 = blockTemplateIAT(
    block_id = 2,
    tag = tag_IAT_prac_target_1,
    stimuli = generateRandomTrials(20, [].concat(iat.targetA.items, iat.targetB.items)),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}">${stim}</p>`
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.targetA.items.includes(stim)) { return keyCode(key_L) }
        if (iat.targetB.items.includes(stim)) { return keyCode(key_R) }
    }
)

var IAT3 = blockTemplateIAT(
    block_id = 3,
    tag = tag_IAT_test_1,
    stimuli = crossArrays(
        generateRandomTrials(10, [].concat(iat.attribA.items, iat.attribB.items)),
        generateRandomTrials(10, [].concat(iat.targetA.items, iat.targetB.items)),
    ),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}">${stim}</p>`
        }
        if ([].concat(iat.targetA.items, iat.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}">${stim}</p>`
        }
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetA.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetB.items).includes(stim)) { return keyCode(key_R) }
    }
)

var IAT4 = blockTemplateIAT(
    block_id = 4,
    tag = tag_IAT_test_1,
    stimuli = crossArrays(
        generateRandomTrials(20, [].concat(iat.attribA.items, iat.attribB.items)),
        generateRandomTrials(20, [].concat(iat.targetA.items, iat.targetB.items)),
    ),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}">${stim}</p>`
        }
        if ([].concat(iat.targetA.items, iat.targetB.items).includes(stim)) {
            return `<p style="color:${target_color}">${stim}</p>`
        }
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetA.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetB.items).includes(stim)) { return keyCode(key_R) }
    }
)

var IAT5 = blockTemplateIAT(
    block_id = 5,
    tag = tag_IAT_prac_target_2,
    stimuli = generateRandomTrials(20, [].concat(iat.targetB.items, iat.targetA.items)),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        return `<p style="color:${target_color}">${stim}</p>`
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if (iat.targetB.items.includes(stim)) { return keyCode(key_L) }
        if (iat.targetA.items.includes(stim)) { return keyCode(key_R) }
    }
)

var IAT6 = blockTemplateIAT(
    block_id = 6,
    tag = tag_IAT_test_2,
    stimuli = crossArrays(
        generateRandomTrials(10, [].concat(iat.attribA.items, iat.attribB.items)),
        generateRandomTrials(10, [].concat(iat.targetB.items, iat.targetA.items)),
    ),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}">${stim}</p>`
        }
        if ([].concat(iat.targetB.items, iat.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}">${stim}</p>`
        }
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetA.items).includes(stim)) { return keyCode(key_R) }
    }
)

var IAT7 = blockTemplateIAT(
    block_id = 7,
    tag = tag_IAT_test_2,
    stimuli = crossArrays(
        generateRandomTrials(20, [].concat(iat.attribA.items, iat.attribB.items)),
        generateRandomTrials(20, [].concat(iat.targetB.items, iat.targetA.items)),
    ),
    stim_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.attribB.items).includes(stim)) {
            return `<p style="color:${attrib_color}">${stim}</p>`
        }
        if ([].concat(iat.targetB.items, iat.targetA.items).includes(stim)) {
            return `<p style="color:${target_color}">${stim}</p>`
        }
    },
    key_answer_func = function() {
        var stim = jsPsych.timelineVariable('s', true)
        if ([].concat(iat.attribA.items, iat.targetB.items).includes(stim)) { return keyCode(key_L) }
        if ([].concat(iat.attribB.items, iat.targetA.items).includes(stim)) { return keyCode(key_R) }
    }
)


/* Blocks: Feedbacks */

var debrief1 = {
    type: 'html-keyboard-response',
    stimulus: function() {
        return `
        <p style="text-align: left">
        结果反馈（问卷部分）：<br/><br/>
        你的生活满意度：${MEAN('SWLS').toFixed(1)}（取值范围1~7）<br/>
        你的自尊水平：${MEAN('RSES', rev = [3, 5, 8, 9, 10], likert = [1, 4]).toFixed(1)}（取值范围1~4）<br/><br/>
        （按任意键继续）</p>`
    }
}

function replaceWrongRT(df) {
    // Replace each wrong-trial RT with block mean + 600 ms (Greewald et al., 2003, JPSP)
    var rt_mean = df.filter({ correct: true }).select('rt').mean()
    var wrong = df.filter({ correct: false }).values() // raw data array (modifiable)
    for (var i in wrong) {
        wrong[i]['RT'] = rt_mean + 600
    }
}

var IAT_results = { IAT_D: null, IAT_D_prac: null, IAT_D_test: null }

var debrief_IAT = {
    type: 'html-keyboard-response',
    on_start: set_html_style,
    stimulus: function() {
        // See the scoring algorithm of IAT D-score in Greewald et al. (2003)
        if (compatible_first) {
            var block_ids = { compat: [{ IAT: 3 }, { IAT: 4 }], incomp: [{ IAT: 6 }, { IAT: 7 }] }
        } else {
            var block_ids = { compat: [{ IAT: 6 }, { IAT: 7 }], incomp: [{ IAT: 3 }, { IAT: 4 }] }
        }
        var df_iat_raw = jsPsych.data.get().filter([{ IAT: 3 }, { IAT: 4 }, { IAT: 6 }, { IAT: 7 }]) // data frame (jsPsych 'Data Collection' class)
        var df = df_iat_raw.filterCustom(function(trial) { return trial.rt < 10000 })

        var n_trials_less_than_300ms = df.filterCustom(function(trial) { return trial.rt < 300 }).count()
        var p_too_fast = n_trials_less_than_300ms / df.count()
        var validity = (p_too_fast < 0.1) ? `` :
            `<span style="color:red">抱歉，由于你的随意按键反应过多（${(100 * p_too_fast).toFixed(1)}%），你的结果无效！</span><br/>`

        var iat_compat_prac = df.filter(block_ids.compat[0])
        var iat_compat_test = df.filter(block_ids.compat[1])
        var iat_incomp_prac = df.filter(block_ids.incomp[0])
        var iat_incomp_test = df.filter(block_ids.incomp[1])

        replaceWrongRT(iat_compat_prac)
        replaceWrongRT(iat_compat_test)
        replaceWrongRT(iat_incomp_prac)
        replaceWrongRT(iat_incomp_test)

        var mean_diff_prac = iat_incomp_prac.select('RT').mean() - iat_compat_prac.select('RT').mean()
        var mean_diff_test = iat_incomp_test.select('RT').mean() - iat_compat_test.select('RT').mean()
        var sd_pooled_prac = iat_compat_prac.join(iat_incomp_prac).select('rt').sd()
        var sd_pooled_test = iat_compat_test.join(iat_incomp_test).select('rt').sd()
        var IAT_D_prac = mean_diff_prac / sd_pooled_prac
        var IAT_D_test = mean_diff_test / sd_pooled_test
        var IAT_D = (IAT_D_prac + IAT_D_test) / 2

        IAT_results.IAT_D = IAT_D
        IAT_results.IAT_D_prac = IAT_D_prac
        IAT_results.IAT_D_test = IAT_D_test

        return `
        <p style="text-align: left">
        <b>结果反馈：</b><br/>
        ${validity}
        你的内隐联系测验<em>D </em>分数 = <b>${IAT_D.toFixed(2)}</b><br/>
        ——练习任务<em>D </em>分数 = ${IAT_D_prac.toFixed(2)}<br/>
        &emsp;&emsp;（反应时之差 = ${mean_diff_prac.toFixed(0)}ms，合并标准差 = ${sd_pooled_prac.toFixed(0)}ms）<br/>
        ——正式任务<em>D </em>分数 = ${IAT_D_test.toFixed(2)}<br/>
        &emsp;&emsp;（反应时之差 = ${mean_diff_test.toFixed(0)}ms，合并标准差 = ${sd_pooled_test.toFixed(0)}ms）<br/>
        <br/><b><em>D </em>分数解释：</b><br/>
        大于0：对「${iat_temp.attribA.label} + ${iat_temp.targetA.label}」「${iat_temp.attribB.label} + ${iat_temp.targetB.label}」的内隐联系更紧密<br/>
        小于0：对「${iat_temp.attribA.label} + ${iat_temp.targetB.label}」「${iat_temp.attribB.label} + ${iat_temp.targetA.label}」的内隐联系更紧密<br/>
        绝对值：0.2 = 小效应，0.5 = 中等效应，0.8 = 大效应<br/>
        <br/>（按任意键继续）</p>`
    },
    on_finish: function(data) {
        data.varname = 'IAT_feedback'
        data.summary = JSON.stringify(IAT_results)
            // extract in R:  jsonlite::fromJSON(subset(data, varname=='IAT_feedback')$summary)
    }
}


/* Combine Timelines */

var demographics = {
    timeline: [
        Sex, Age, Birth, Phone,
    ]
}

var surveys = {
    timeline: [
        Father_edu, Mather_edu, 
        Income, Subjective_ses,
        instr_4, RSES,
        instr_7, SWLS,
        debrief1,
    ]
}

var IAT = {
    timeline: [
        IAT_instr0,
        IAT_instr1, IAT1,
        IAT_instr2, IAT2,
        IAT_instr3, IAT3,
        IAT_instr4, IAT4,
        IAT_instr5, IAT5,
        IAT_instr6, IAT6,
        IAT_instr7, IAT7,
    ]
}

var main_timeline = [
    set_html_style,
    open_fullscreen,
    welcome,
    warmup,
    demographics,
    surveys,
    IAT,
    debrief_IAT,
    OpenEnded,
    close_fullscreen,
]


/* Launch jsPsych */

jsPsych.init({
    timeline: main_timeline,
    on_finish: function() {
        jsPsych.data.get().localSave('csv', `data_exp_demo_${subID}.csv`) // download from browser
        document.getElementById('jspsych-content').innerHTML += '实验结束，感谢您的参与！'
    }
})