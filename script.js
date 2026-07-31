/**
 * 七七医院 — 智能预诊系统
 * 多轮追问 + 细化症状 → 精准诊断 + 科室推荐
 */

// ==================== 信息维度定义 ====================

// 问诊中需要收集的信息维度
const INFO_DIMENSIONS = {
    bodyPart:    { label: '部位',     icon: '📍' },
    painType:    { label: '疼痛性质', icon: '🔍' },
    duration:    { label: '持续时间', icon: '⏱️' },
    onset:       { label: '发作方式', icon: '⚡' },
    accompany:   { label: '伴随症状', icon: '🔗' },
    triggers:    { label: '诱因/缓解', icon: '🎯' },
    severity:    { label: '严重程度', icon: '📊' },
    history:     { label: '既往史',   icon: '📋' },
};

// ==================== 追问模板（按症状区域） ====================

const FOLLOWUP_TEMPLATES = {

    // ---- 腹部 ----
    abdominal: {
        keywords: ['肚子', '腹', '胃', '肠', '肚脐', '阑尾', '消化', '反酸', '烧心', '恶心', '呕吐', '腹泻', '便秘', '便血', '拉肚子', '胀气'],
        questions: [
            { dim: 'bodyPart',  text: '疼痛具体在哪个位置？是<strong>上腹、下腹、左侧、右侧、肚脐周围</strong>，还是整个腹部？如果能用手指指出具体位置就更好了。' },
            { dim: 'painType',  text: '是怎样的疼法？是<strong>绞痛（一阵一阵拧着疼）、钝痛（闷闷的疼）、灼烧感、针刺样</strong>，还是胀痛？' },
            { dim: 'duration',  text: '从什么时候开始疼的？持续了<strong>几小时、几天、还是几周</strong>？是一直疼还是一阵一阵的？' },
            { dim: 'accompany', text: '除了疼之外，有没有<strong>恶心呕吐、腹泻便秘、发烧、反酸烧心</strong>等其他不舒服？' },
            { dim: 'triggers',  text: '和吃饭有关系吗？是<strong>饭前疼、饭后疼、空腹疼</strong>，还是和吃饭没关系？有没有吃什么特别的东西？' },
            { dim: 'severity',  text: '如果用1-10分打分（10分最疼），大概有几分？能正常工作和睡觉吗？' },
        ],
    },

    // ---- 头部 ----
    head: {
        keywords: ['头', '太阳穴', '后脑勺', '前额', '偏头痛', '头晕', '头昏', '脑', '脖子僵'],
        questions: [
            { dim: 'bodyPart',  text: '具体是哪个部位不舒服？<strong>前额、太阳穴（一侧还是两侧）、后脑勺、头顶</strong>，还是整个头部？' },
            { dim: 'painType',  text: '是怎样的感觉？是<strong>一跳一跳的搏动痛、紧箍感（像被带子勒住）、闷胀感</strong>，还是针刺样？' },
            { dim: 'duration',  text: '每次持续多久？是<strong>几分钟、几小时、还是一整天</strong>？多久发作一次？' },
            { dim: 'accompany', text: '有没有<strong>恶心呕吐、怕光怕声音、眼睛发花、一侧手脚发麻无力</strong>？' },
            { dim: 'triggers',  text: '什么情况下会诱发或加重？比如<strong>劳累、压力大、熬夜、月经前后、喝酒</strong>之后？' },
            { dim: 'history',   text: '以前有过类似情况吗？有没有偏头痛或高血压的病史？' },
        ],
    },

    // ---- 胸部 / 心脏 ----
    chest: {
        keywords: ['胸', '心', '心跳', '心悸', '心律', '心慌', '胸闷', '气短', '气促', '喘', '呼吸困难', '心前区'],
        questions: [
            { dim: 'bodyPart',  text: '具体是哪个位置？是<strong>胸骨后方、左侧心前区</strong>，还是整个胸口？' },
            { dim: 'painType',  text: '是怎样的感觉？是<strong>压迫感（像石头压着）、针刺感、灼烧感</strong>，还是闷胀感？' },
            { dim: 'duration',  text: '每次持续多久？是<strong>几秒钟、几分钟、还是持续不缓解</strong>？' },
            { dim: 'triggers',  text: '什么情况下出现？是<strong>活动/走路时、情绪激动时</strong>，还是<strong>休息/躺下时</strong>更明显？' },
            { dim: 'accompany', text: '有没有<strong>出冷汗、恶心、左肩或左臂放射痛、头晕</strong>？' },
            { dim: 'severity',  text: '用1-10分打分大概几分？有没有影响到正常呼吸？' },
        ],
    },

    // ---- 关节 / 骨骼 ----
    joint: {
        keywords: ['关节', '膝盖', '肩', '手腕', '手指', '颈椎', '腰椎', '腰', '背', '脖子', '腿疼', '胳膊'],
        questions: [
            { dim: 'bodyPart',  text: '具体是哪个关节或部位？<strong>膝盖、肩、手腕、手指、腰椎、颈椎</strong>？是单个关节还是多个关节？' },
            { dim: 'painType',  text: '是怎样的疼？是<strong>活动时才疼、不动也疼、早晨僵硬</strong>？有没有肿胀或发热感？' },
            { dim: 'duration',  text: '从什么时候开始的？是<strong>急性（几天内突然出现）还是慢性（几个月慢慢加重）</strong>？' },
            { dim: 'triggers',  text: '什么情况会加重？比如<strong>走路、上下楼梯、久坐、阴雨天</strong>？什么情况会缓解？' },
            { dim: 'accompany', text: '有没有<strong>早晨僵硬超过30分钟、关节红肿发热、其他部位也不舒服</strong>？' },
            { dim: 'history',   text: '有没有受过伤？职业是否需要久站或久坐？家人有没有关节炎的病史？' },
        ],
    },

    // ---- 皮肤 ----
    skin: {
        keywords: ['皮肤', '痒', '红疹', '疙瘩', '过敏', '荨麻疹', '湿疹', '水泡', '脱皮', '风团', '痘痘'],
        questions: [
            { dim: 'bodyPart',  text: '皮疹在<strong>哪个部位</strong>？是局部还是全身都有？' },
            { dim: 'painType',  text: '皮疹<strong>是什么样子的</strong>？是红色小点、大片风团、水泡、还是干燥脱皮？' },
            { dim: 'duration',  text: '<strong>什么时候开始</strong>出现的？是一直有还是反反复复？每次持续多久？' },
            { dim: 'triggers',  text: '有没有可能的诱因？比如<strong>吃了什么、接触了什么、换了护肤品、天气变化</strong>？' },
            { dim: 'accompany', text: '有没有<strong>呼吸困难、嘴唇或眼皮肿胀、发烧</strong>等全身症状？（⚠️ 有的话需立即就医）' },
        ],
    },

    // ---- 发热 ----
    fever: {
        keywords: ['发烧', '发热', '高烧', '低烧', '体温', '发烫', '发热不退'],
        questions: [
            { dim: 'severity',  text: '体温<strong>最高到过多少度</strong>？是持续高烧还是时高时低？' },
            { dim: 'duration',  text: '从什么时候开始发烧的？已经<strong>烧了几天</strong>了？' },
            { dim: 'accompany', text: '除了发烧，有没有<strong>咳嗽、喉咙痛、全身酸痛、发冷寒战、头痛</strong>？' },
            { dim: 'triggers',  text: '发烧前有没有<strong>受凉、接触感冒的人、吃不干净的东西</strong>？' },
            { dim: 'history',   text: '之前用过退烧药吗？有没有药物过敏史？' },
        ],
    },

    // ---- 泌尿 ----
    urinary: {
        keywords: ['尿', '小便', '排尿', '膀胱', '肾', '尿道'],
        questions: [
            { dim: 'bodyPart',  text: '不舒服的位置在<strong>小腹、腰部、还是排尿时尿道疼痛</strong>？' },
            { dim: 'painType',  text: '具体是什么感觉？<strong>排尿时灼痛、腰部剧烈绞痛、小腹坠胀</strong>？' },
            { dim: 'duration',  text: '从什么时候开始的？这几天<strong>喝水多吗</strong>？' },
            { dim: 'accompany', text: '有没有<strong>尿频、尿急、尿色异常（红色/浑浊）、发烧、腰痛</strong>？' },
        ],
    },

    // ---- 五官 / ENT ----
    ent: {
        keywords: ['喉咙', '咽', '嗓子', '鼻子', '鼻塞', '流鼻涕', '打喷嚏', '耳朵', '听力', '耳鸣', '牙', '牙龈', '口腔'],
        questions: [
            { dim: 'bodyPart',  text: '具体是<strong>喉咙、鼻子、耳朵还是牙齿/口腔</strong>？哪一侧？' },
            { dim: 'duration',  text: '从什么时候开始的？是<strong>突然发作还是慢慢加重的</strong>？' },
            { dim: 'accompany', text: '有没有<strong>发烧、头痛、面部胀痛、吞咽困难、张口受限</strong>？' },
            { dim: 'severity',  text: '严重程度如何？有没有影响到<strong>吃饭、喝水、呼吸</strong>？' },
        ],
    },

    // ---- 精神心理 ----
    mental: {
        keywords: ['焦虑', '紧张', '担心', '害怕', '抑郁', '情绪', '失眠', '睡不着', '烦躁', '没兴趣', '开心不起来'],
        questions: [
            { dim: 'duration',  text: '这种状态<strong>持续多久了</strong>？是最近几天的事，还是已经好几周甚至几个月了？' },
            { dim: 'triggers',  text: '有没有<strong>特定的原因或事件</strong>触发了这种情绪？（工作压力、人际关系、健康担忧等）' },
            { dim: 'accompany', text: '有没有<strong>心慌胸闷、食欲变化、体重明显增减、注意力不集中</strong>？' },
            { dim: 'severity',  text: '有没有影响到<strong>正常工作、社交或日常生活</strong>？睡眠质量怎么样？' },
            { dim: 'history',   text: '⚠️ <strong>有没有过伤害自己或结束生命的念头？</strong>（请如实回答，我可以为您提供帮助）' },
        ],
    },

    // ---- 通用 ----
    general: {
        keywords: [],
        questions: [
            { dim: 'bodyPart',  text: '能具体说一下<strong>哪个部位</strong>不舒服吗？比如左侧还是右侧、具体在什么位置？' },
            { dim: 'painType',  text: '是怎样的不舒服？<strong>疼、胀、麻、痒、还是其他感觉</strong>？' },
            { dim: 'duration',  text: '从什么时候开始的？<strong>多久了</strong>？是一直持续还是时好时坏？' },
            { dim: 'accompany', text: '除了这个，还有<strong>其他不舒服</strong>吗？比如发烧、恶心、头晕之类的？' },
            { dim: 'triggers',  text: '有没有注意到<strong>什么情况下会加重或缓解</strong>？以前有过类似情况吗？' },
        ],
    },
};

// ==================== 深层医学知识库 ====================

// 细化的子分类 — 在初步诊断基础上按子部位/子症状进一步区分
const DETAILED_KNOWLEDGE = {

    // ----- 腹部细分 -----
    abdominal: {
        subCategories: {
            upperRight: {
                keywords: ['右上腹', '右上部', '右边肚子靠上', '肝区'],
                conditions: [
                    { name: '胆囊炎/胆结石', prob: '较高', desc: '右上腹阵发性剧痛，可放射至右肩背部，常于进食油腻后诱发。需B超确诊。', dept: '消化内科 / 肝胆外科', deptDesc: '诊治肝胆胰疾病。' },
                    { name: '肝炎', prob: '需排查', desc: '右上腹隐痛不适伴乏力、食欲减退、尿色加深。需查肝功能。', dept: '消化内科 / 感染科', deptDesc: '肝脏疾病的诊断与治疗。' },
                ],
            },
            upperMiddle: {
                keywords: ['上腹', '胃', '心窝', '上腹部', '中上腹', '肚子上边'],
                conditions: [
                    { name: '胃炎/胃溃疡', prob: '较高', desc: '上腹部规律性疼痛，胃溃疡多在餐后0.5-1小时痛，十二指肠溃疡多在空腹或夜间痛。', dept: '消化内科', deptDesc: '诊治胃、十二指肠疾病。建议做胃镜检查。' },
                    { name: '胃食管反流病', prob: '中等', desc: '胸骨后或上腹烧灼感（烧心），反酸，饭后或平躺时加重。', dept: '消化内科', deptDesc: '反流性食管炎等上消化道动力障碍疾病的诊治。' },
                    { name: '胰腺炎', prob: '需排查', desc: '上腹部持续性剧烈疼痛，向腰背部放射，伴恶心呕吐。常有饮酒或胆结石病史。', dept: '消化内科 / 急诊科', deptDesc: '胰腺炎如不及时治疗可危及生命，请尽快就医。' },
                ],
            },
            upperLeft: {
                keywords: ['左上腹', '左上部', '左边肚子靠上'],
                conditions: [
                    { name: '胃炎/胃溃疡', prob: '较高', desc: '胃部不适可表现为左上腹痛，常与进食相关。', dept: '消化内科', deptDesc: '胃部疾病诊治。' },
                    { name: '脾脏问题', prob: '需排查', desc: '左上腹隐痛或饱胀感，常见于感染或血液疾病引起的脾大。', dept: '消化内科 / 血液科', deptDesc: '需B超检查评估。' },
                ],
            },
            lowerRight: {
                keywords: ['右下腹', '右下部', '右边肚子靠下'],
                conditions: [
                    { name: '急性阑尾炎', prob: '需紧急排除', desc: '典型表现为脐周痛转移至右下腹（麦氏点），伴压痛、反跳痛、发热。需立即就医！', dept: '急诊外科 / 普外科', deptDesc: '急性阑尾炎需尽快手术，延误可能导致穿孔。' },
                    { name: '右侧附件炎/卵巢囊肿', prob: '中等（女性）', desc: '右下腹持续隐痛，与月经周期可能相关。', dept: '妇科', deptDesc: '女性生殖系统疾病。' },
                ],
            },
            lowerMiddle: {
                keywords: ['下腹', '小腹', '肚脐下', '下腹部', '小肚子'],
                conditions: [
                    { name: '膀胱炎', prob: '较高', desc: '小腹坠胀不适，伴尿频、尿急、尿痛，女性多见。', dept: '泌尿外科 / 妇科', deptDesc: '需尿常规检查确认。' },
                    { name: '盆腔炎/附件炎', prob: '中等（女性）', desc: '下腹持续性隐痛，白带增多，可伴发热。', dept: '妇科', deptDesc: '女性盆腔炎性疾病。' },
                    { name: '前列腺炎', prob: '中等（男性）', desc: '小腹或会阴部不适，伴排尿异常。', dept: '泌尿外科', deptDesc: '男性前列腺疾病。' },
                ],
            },
            lowerLeft: {
                keywords: ['左下腹', '左下部', '左边肚子靠下'],
                conditions: [
                    { name: '结肠炎/憩室炎', prob: '较高', desc: '左下腹痛，可伴排便习惯改变（腹泻或便秘），便后痛减。', dept: '消化内科', deptDesc: '结肠疾病的诊治，可能需要肠镜检查。' },
                    { name: '左侧附件炎/卵巢囊肿', prob: '中等（女性）', desc: '左下腹隐痛，与月经周期相关。', dept: '妇科', deptDesc: '女性生殖系统疾病。' },
                ],
            },
            periumbilical: {
                keywords: ['肚脐', '脐周', '肚脐眼', '肚脐周围'],
                conditions: [
                    { name: '急性肠胃炎', prob: '较高', desc: '脐周阵发性绞痛，伴恶心呕吐、腹泻，多与不洁饮食有关。', dept: '消化内科', deptDesc: '如腹泻严重需注意补液防脱水。' },
                    { name: '早期阑尾炎', prob: '需警惕', desc: '阑尾炎早期疼痛常在脐周，6-8小时后转移至右下腹。如出现转移性疼痛，请立即就医。', dept: '急诊外科', deptDesc: '密切观察疼痛是否向右下腹转移。' },
                    { name: '肠系膜淋巴结炎', prob: '中等（儿童常见）', desc: '脐周疼痛，多见于儿童，常在上呼吸道感染后发生。', dept: '儿科 / 消化内科', deptDesc: '多为自限性，但需排除其他急腹症。' },
                ],
            },
            diffuse: {
                keywords: ['全腹', '整个肚子', '到处'],
                conditions: [
                    { name: '急性胃肠炎', prob: '较高', desc: '全腹不适，以痉挛性疼痛为主，伴腹泻呕吐。', dept: '消化内科', deptDesc: '注意补液，如症状严重请及时就医。' },
                    { name: '肠梗阻', prob: '需紧急排除', desc: '全腹剧烈疼痛伴腹胀、停止排气排便、呕吐。需立即就医！', dept: '急诊外科', deptDesc: '肠梗阻是急腹症之一，不可延误。' },
                ],
            },
        },
        painTypeMapping: {
            cramping:  { cond: '肠痉挛/胃肠炎/胆结石', hint: '绞痛多提示空腔脏器痉挛或梗阻（肠、胆管、输尿管）' },
            dull:      { cond: '胃炎/肝炎/盆腔炎', hint: '钝痛多提示内脏的慢性炎症' },
            burning:   { cond: '胃食管反流/胃炎', hint: '灼烧感多与胃酸刺激有关' },
            stabbing:  { cond: '溃疡穿孔/胰腺炎', hint: '锐利刺痛需高度警惕急腹症（⚠️ 严重时需立即就医）' },
            bloating:  { cond: '消化不良/肠易激/便秘', hint: '胀痛多与肠道气体或排便不畅有关' },
        },
        redFlags: [
            { symptom: '腹痛剧烈，无法站立或需要蜷缩才能缓解', action: '立即前往急诊科！可能为急腹症（穿孔、梗阻、胰腺炎等）。' },
            { symptom: '呕血或排黑便（柏油样便）', action: '立即前往急诊科！提示消化道出血。' },
            { symptom: '腹痛从脐周转移至右下腹 + 发热', action: '高度怀疑急性阑尾炎，尽快前往急诊外科！' },
            { symptom: '腹痛伴停止排气排便、腹胀加重', action: '需紧急排除肠梗阻，立即前往急诊科！' },
            { symptom: '腹痛 + 停经史 + 阴道出血（女性）', action: '立即前往急诊妇科！需排除宫外孕破裂！' },
        ],
    },

    // ----- 头部细分 -----
    head: {
        subCategories: {
            frontal: {
                keywords: ['前额', '额头', '眉心'],
                conditions: [
                    { name: '紧张性头痛', prob: '较高', desc: '前额或全头压迫性紧箍感，与压力、疲劳、睡眠不足有关。', dept: '神经内科', deptDesc: '最常见的头痛类型。注意休息和减压。' },
                    { name: '鼻窦炎', prob: '中等', desc: '前额或面颊部胀痛，伴鼻塞、流黄色鼻涕，低头时加重。', dept: '耳鼻喉科', deptDesc: '鼻窦炎引起的头痛。' },
                ],
            },
            temporal: {
                keywords: ['太阳穴', '颞部', '偏头痛', '一侧', '两边太阳穴'],
                conditions: [
                    { name: '偏头痛', prob: '较高', desc: '一侧太阳穴附近搏动性跳痛，中重度，持续4-72小时，可伴恶心、畏光畏声。常有家族史。', dept: '神经内科', deptDesc: '偏头痛有特效药物治疗。记录发作日记有助于诊治。' },
                    { name: '颞动脉炎', prob: '需排查（>50岁）', desc: '太阳穴处持续性疼痛，头皮触痛，可伴视力模糊、咀嚼时下颌疼痛。需查血沉。', dept: '风湿免疫科 / 神经内科', deptDesc: '好发于50岁以上人群，需及时治疗以防视力损害。' },
                ],
            },
            occipital: {
                keywords: ['后脑勺', '后枕部', '后颈部'],
                conditions: [
                    { name: '颈源性头痛', prob: '较高', desc: '后脑勺及上颈部疼痛，与颈椎问题相关，长时间低头或不良姿势加重。', dept: '骨科 / 康复科', deptDesc: '颈椎问题引起的头痛。改善姿势、物理治疗效果较好。' },
                    { name: '枕神经痛', prob: '中等', desc: '后枕部阵发性针刺样或电击样疼痛。', dept: '神经内科', deptDesc: '枕大神经受压或炎症。' },
                ],
            },
            wholeHead: {
                keywords: ['整个头', '全头', '整个脑袋', '满头'],
                conditions: [
                    { name: '紧张性头痛', prob: '较高', desc: '全头紧箍感，持续性轻中度钝痛。', dept: '神经内科', deptDesc: '最常见的头痛类型。' },
                    { name: '高血压性头痛', prob: '需排查', desc: '全头胀痛，特别是后枕部，晨起明显。需测量血压。', dept: '心内科', deptDesc: '高血压引起的头痛。控制血压是关键。' },
                ],
            },
        },
        painTypeMapping: {
            pulsating: { cond: '偏头痛', hint: '搏动性跳痛是偏头痛的典型特征' },
            pressing:   { cond: '紧张性头痛', hint: '紧箍感/压迫感是紧张性头痛的主要表现' },
            stabbing:   { cond: '枕神经痛/三叉神经痛', hint: '针刺样或电击样疼痛提示神经性疼痛' },
            dull:       { cond: '紧张性头痛/高血压性头痛', hint: '持续性闷痛/胀痛需排查血压和颈椎' },
        },
        redFlags: [
            { symptom: '突发"雷击样"剧烈头痛（一生中最严重的头痛）', action: '立即拨打120！需排除蛛网膜下腔出血！' },
            { symptom: '头痛伴高热 + 颈部僵硬', action: '立即前往急诊科！需排除脑膜炎。' },
            { symptom: '头痛 + 一侧肢体无力/口齿不清', action: '立即拨打120！脑卒中（中风）可能！' },
            { symptom: '头痛进行性加重 + 早晨明显 + 恶心呕吐', action: '需尽快做头颅影像学检查，排除颅内占位。' },
        ],
    },

    // ----- 胸部细分 -----
    chest: {
        subCategories: {
            retrosternal: {
                keywords: ['胸骨后', '胸口正中', '胸骨'],
                conditions: [
                    { name: '胃食管反流病', prob: '较高', desc: '胸骨后灼烧感，饭后或躺下加重，可能伴反酸。含铝镁制剂可暂时缓解。', dept: '消化内科', deptDesc: '反流导致的不适常被误认为心脏问题。' },
                    { name: '心绞痛', prob: '需排查（>40岁或有危险因素）', desc: '胸骨后压榨感或闷痛，劳累或情绪激动诱发，休息3-5分钟缓解。需高度重视！', dept: '心内科', deptDesc: '典型心绞痛需要进一步评估冠脉情况。' },
                ],
            },
            leftChest: {
                keywords: ['左胸', '心前区', '心口', '左侧胸口'],
                conditions: [
                    { name: '心脏神经官能症', prob: '较高（年轻、压力大者）', desc: '心前区针刺样疼痛，几秒钟即过，或持续数小时的隐痛，与活动关系不大，常伴焦虑。', dept: '心内科 / 心理科', deptDesc: '检查排除器质性心脏病后，多与情绪压力相关。' },
                    { name: '心绞痛/心梗', prob: '需排除', desc: '左侧心前区压迫性闷痛，可向左肩左臂放射，活动时加重。⚠️ 持续超过15分钟需立即就医！', dept: '心内科 / 急诊科', deptDesc: '冠心病是危及生命的疾病，不可掉以轻心。' },
                ],
            },
        },
        painTypeMapping: {
            pressure:  { cond: '心绞痛/心梗（⚠️ 需立即就医）', hint: '胸骨后压迫感/重物感是心绞痛典型表现，持续>15分钟需紧急处理' },
            burning:   { cond: '胃食管反流/食管炎', hint: '灼烧感多与胃酸反流有关，饭后加重' },
            stabbing:  { cond: '心脏神经官能症/肋间神经痛', hint: '针刺样疼痛几秒钟即消失多为良性，但首次出现仍需检查' },
        },
        redFlags: [
            { symptom: '胸痛持续超过15分钟 + 大汗/濒死感', action: '立即拨打120！可能是急性心肌梗死！嚼服300mg阿司匹林（如无禁忌）。' },
            { symptom: '突发胸背部撕裂样剧痛', action: '立即拨打120！需排除主动脉夹层（危及生命）！' },
            { symptom: '胸痛 + 呼吸困难 + 咯血', action: '立即前往急诊科！需排除肺栓塞！' },
        ],
    },

    // ----- 关节细分 -----
    joint: {
        subCategories: {
            knee: {
                keywords: ['膝', '膝盖'],
                conditions: [
                    { name: '骨关节炎', prob: '较高（>45岁或肥胖者）', desc: '膝关节活动时疼痛，上下楼梯加重，休息后缓解。可能有骨摩擦感。', dept: '骨科', deptDesc: '退行性关节病，控制体重、物理治疗可缓解。' },
                    { name: '半月板损伤', prob: '中等', desc: '膝关节特定角度疼痛，可能有"卡住"的感觉或打软腿。常有运动或扭伤史。', dept: '骨科 / 运动医学科', deptDesc: '可能需要MRI检查及关节镜手术。' },
                    { name: '痛风', prob: '需排查', desc: '膝关节突然剧烈红肿热痛，常于夜间发作。好发于男性，与高尿酸相关。', dept: '风湿免疫科 / 内分泌科', deptDesc: '痛风性关节炎，需查血尿酸。' },
                ],
            },
            finger: {
                keywords: ['手指', '指', '手关节'],
                conditions: [
                    { name: '骨关节炎', prob: '较高', desc: '手指末端关节（赫伯登结节）或近端关节肿大变形，活动后痛。', dept: '骨科', deptDesc: '退行性手关节炎。' },
                    { name: '类风湿关节炎', prob: '需排查', desc: '双手对称性小关节（掌指关节、近端指间关节）肿痛，晨僵>30分钟。需查血。', dept: '风湿免疫科', deptDesc: '自身免疫性疾病，早期规范治疗可控制病情。' },
                ],
            },
            spine: {
                keywords: ['腰', '背', '脊柱', '腰椎', '颈椎', '脖子', '后背'],
                conditions: [
                    { name: '腰肌劳损/筋膜炎', prob: '较高', desc: '腰部或背部酸痛，劳累加重，休息缓解，压痛明显。', dept: '骨科 / 康复科', deptDesc: '最常见的腰背痛原因，物理治疗效果好。' },
                    { name: '腰椎间盘突出症', prob: '中等', desc: '腰痛伴单侧下肢放射痛/麻木，咳嗽打喷嚏加重。直腿抬高试验阳性。', dept: '骨科 / 脊柱外科', deptDesc: '多数保守治疗有效，严重者需手术。' },
                    { name: '强直性脊柱炎', prob: '需排查（年轻男性多见）', desc: '下腰部晨僵>30分钟，活动后缓解，休息加重。需查HLA-B27。', dept: '风湿免疫科', deptDesc: '炎性腰背痛的典型表现，与机械性腰痛相反。' },
                ],
            },
            shoulder: {
                keywords: ['肩', '肩膀', '肩关节'],
                conditions: [
                    { name: '肩周炎（冻结肩）', prob: '较高（40-60岁）', desc: '肩部疼痛，夜间加重，活动受限（梳头、穿衣困难）。', dept: '骨科 / 康复科', deptDesc: '"五十肩"，多数经康复治疗可恢复。' },
                    { name: '肩袖损伤', prob: '中等', desc: '肩关节特定角度疼痛无力，手臂上举困难。常有外伤或过度使用史。', dept: '骨科 / 运动医学科', deptDesc: '肩袖肌腱损伤，严重者需手术修复。' },
                ],
            },
        },
        redFlags: [
            { symptom: '腰痛 + 双下肢无力 + 大小便困难', action: '立即前往急诊科！可能为马尾综合征，需紧急减压手术！' },
            { symptom: '单个关节突然剧烈红肿热痛', action: '尽快就诊，可能为痛风急性发作或感染性关节炎。' },
            { symptom: '外伤后关节剧痛+畸形+无法活动', action: '立即前往急诊骨科！可能为骨折或脱位。' },
        ],
    },

    // ----- 皮肤细分 -----
    skin: {
        subCategories: {
            hives: {
                keywords: ['风团', '荨麻疹', '一片一片', '鼓起', '风疹块'],
                conditions: [
                    { name: '急性荨麻疹', prob: '较高', desc: '皮肤突然出现大小不等的红色风团，剧痒，单个风团24小时内消退但新发不断。多与食物、药物、感染过敏有关。', dept: '皮肤科', deptDesc: '多数可自愈，但持续>6周需排查慢性病因。' },
                ],
                redFlags: [
                    { symptom: '荨麻疹 + 呼吸困难/声音嘶哑/嘴唇肿胀', action: '立即拨打120！可能为严重过敏反应（喉头水肿）！' },
                ],
            },
            eczema: {
                keywords: ['湿疹', '红斑', '丘疹', '水泡', '渗水', '结痂'],
                conditions: [
                    { name: '湿疹/特应性皮炎', prob: '较高', desc: '皮肤干燥、红斑、丘疹、剧烈瘙痒，反复发作。与遗传过敏体质相关。', dept: '皮肤科', deptDesc: '湿疹需要长期管理：保湿+避免诱因+药物控制。' },
                ],
            },
            rash: {
                keywords: ['红点', '疹子', '皮疹', '红斑'],
                conditions: [
                    { name: '病毒疹', prob: '较高（伴发热时）', desc: '病毒感染引起的皮疹，常在发热后出现，一般自愈。', dept: '皮肤科 / 内科', deptDesc: '多数病毒疹会自行消退，但需排除其他严重疾病。' },
                    { name: '药疹', prob: '需排查', desc: '用药后出现的皮疹，需回顾近期用药史（包括中药和保健品）。', dept: '皮肤科', deptDesc: '药疹需立即停用可疑药物并就医。' },
                ],
            },
        },
    },

    // ----- 发热细分 -----
    fever: {
        subCategories: {
            acute: {
                keywords: ['突然', '刚开始', '昨天', '今天', '刚'],
                conditions: [
                    { name: '上呼吸道感染（感冒/流感）', prob: '较高', desc: '发热伴咽痛、流涕、咳嗽、全身酸痛。流感通常高热（>38.5°C）且全身症状重。', dept: '呼吸内科 / 发热门诊', deptDesc: '多休息、多饮水，流感有特效抗病毒药。' },
                    { name: '急性胃肠炎', prob: '中等', desc: '发热伴腹痛、腹泻、恶心呕吐。', dept: '消化内科', deptDesc: '注意补液，清淡饮食。' },
                ],
            },
            prolonged: {
                keywords: ['一直', '反复', '不退', '好几天', '一周', '好几周'],
                conditions: [
                    { name: '不明原因发热', prob: '需系统排查', desc: '发热超过2-3周未明确病因，需要住院进行系统检查：感染、免疫、肿瘤等。', dept: '内科 / 感染科', deptDesc: '需住院系统排查。不可自行滥用抗生素和退烧药。' },
                ],
            },
        },
        redFlags: [
            { symptom: '体温>39.5°C且退烧药无效', action: '立即前往急诊科或发热门诊！' },
            { symptom: '发热 + 呼吸困难/意识模糊/皮疹', action: '立即拨打120或前往急诊科！' },
            { symptom: '婴幼儿（<3个月）发热', action: '立即就医！小婴儿发热不可轻视。' },
        ],
    },

    // ----- 头晕细分 -----
    dizziness: {
        keywords: ['头晕', '眩晕', '天旋地转', '站不稳', '晕', '迷糊', '眼黑'],
        subCategories: {
            vertigo: {
                keywords: ['旋转', '天旋地转', '转圈', '晃动'],
                conditions: [
                    { name: '良性阵发性位置性眩晕（耳石症）', prob: '较高', desc: '头部位置改变（翻身、起床、低头抬头）时触发短暂眩晕（<1分钟），不伴耳鸣听力下降。', dept: '耳鼻喉科', deptDesc: '最常见的眩晕类型，手法复位治疗效果很好。' },
                    { name: '梅尼埃病', prob: '中等', desc: '发作性眩晕持续20分钟至数小时，伴耳鸣、耳闷、听力下降。', dept: '耳鼻喉科', deptDesc: '内耳膜迷路积水所致。' },
                ],
            },
            lightheaded: {
                keywords: ['头昏', '昏沉', '迷糊', '不清醒', '头重脚轻', '站不稳'],
                conditions: [
                    { name: '脑供血不足/体位性低血压', prob: '较高', desc: '蹲下站起时眼前发黑、头晕，可能血压偏低或颈椎问题导致。', dept: '神经内科 / 心内科', deptDesc: '需排查心脑血管问题。' },
                    { name: '贫血', prob: '需排查', desc: '持续头昏、乏力、面色苍白、活动后心慌。需查血常规。', dept: '血液科 / 内科', deptDesc: '贫血需找到原因（缺铁、失血、造血障碍等）。' },
                ],
            },
        },
    },

    // ----- 呼吸系统细分 -----
    respiratory: {
        keywords: ['咳嗽', '咳痰', '干咳', '咳血', '痰', '咯血', '气短', '喘', '呼吸困难', '胸闷'],
        subCategories: {
            acuteCough: {
                keywords: ['刚开始', '几天', '感冒', '最近'],
                conditions: [
                    { name: '急性上呼吸道感染', prob: '较高', desc: '病毒感染，干咳或少量白痰，伴流涕咽痛，一般1-2周自愈。', dept: '呼吸内科', deptDesc: '多为自限性，对症治疗即可。' },
                    { name: '急性支气管炎', prob: '中等', desc: '咳嗽较剧烈，有痰（黄或白），可伴胸闷。', dept: '呼吸内科', deptDesc: '如为细菌感染需抗生素治疗。' },
                ],
            },
            chronicCough: {
                keywords: ['好几周', '一个月', '一直咳', '反复', '很久', '慢性'],
                conditions: [
                    { name: '咳嗽变异性哮喘', prob: '较高', desc: '慢性干咳（>8周），夜间和凌晨加重，抗生素无效，肺功能检查可确诊。', dept: '呼吸内科', deptDesc: '以咳嗽为唯一症状的哮喘，需吸入激素治疗。' },
                    { name: '胃食管反流性咳嗽', prob: '中等', desc: '慢性咳嗽与进食、平卧相关，可能伴烧心反酸。', dept: '消化内科 / 呼吸内科', deptDesc: '反流物刺激咽喉引起的咳嗽。' },
                    { name: '上气道咳嗽综合征', prob: '中等', desc: '鼻炎/鼻窦炎引起鼻涕倒流刺激咽喉导致咳嗽。', dept: '耳鼻喉科', deptDesc: '治疗鼻炎/鼻窦炎后咳嗽可缓解。' },
                ],
            },
        },
        redFlags: [
            { symptom: '咳血（痰中带血或整口血痰）', action: '需尽快就诊呼吸内科，做胸部影像学检查，排除结核或肿瘤。' },
            { symptom: '呼吸困难/喘鸣明显，无法平卧', action: '立即前往急诊科！可能是哮喘急性发作或心衰。' },
        ],
    },
};

// ==================== 信息提取器 ====================

/**
 * 从用户输入中提取维度信息
 */
function extractInfo(input) {
    const text = input.toLowerCase();
    const info = {};

    // 提取部位
    const locationPatterns = [
        { dim: 'bodyPart', match: '右上腹|右上部|右边肚子靠上|肝区', value: '右上腹' },
        { dim: 'bodyPart', match: '左上腹|左上部|左边肚子靠上', value: '左上腹' },
        { dim: 'bodyPart', match: '右下腹|右下部|右边肚子靠下', value: '右下腹' },
        { dim: 'bodyPart', match: '左下腹|左下部|左边肚子靠下', value: '左下腹' },
        { dim: 'bodyPart', match: '上腹|胃部|心窝|中上腹|肚子上边|上腹部', value: '中上腹' },
        { dim: 'bodyPart', match: '下腹|小腹|小肚子|肚脐下|下腹部', value: '下腹' },
        { dim: 'bodyPart', match: '肚脐|脐周|肚脐眼', value: '脐周' },
        { dim: 'bodyPart', match: '全腹|整个肚子', value: '全腹' },
        { dim: 'bodyPart', match: '前额|额头|眉心', value: '前额' },
        { dim: 'bodyPart', match: '太阳穴|颞部|偏头', value: '太阳穴区域' },
        { dim: 'bodyPart', match: '后脑勺|后枕|后颈', value: '后脑勺' },
        { dim: 'bodyPart', match: '胸骨后|胸口正中', value: '胸骨后' },
        { dim: 'bodyPart', match: '左胸|心前区|心口|左侧胸', value: '左胸/心前区' },
        { dim: 'bodyPart', match: '膝|膝盖', value: '膝关节' },
        { dim: 'bodyPart', match: '手指|指关节|手关节', value: '手指关节' },
        { dim: 'bodyPart', match: '腰|背|脊柱|腰椎|后背', value: '腰/背' },
        { dim: 'bodyPart', match: '肩|肩膀|肩关节', value: '肩关节' },
        { dim: 'bodyPart', match: '颈|脖子', value: '颈部' },
        { dim: 'bodyPart', match: '喉咙|咽|嗓子|咽喉', value: '咽喉' },
        { dim: 'bodyPart', match: '鼻子|鼻腔|鼻窦', value: '鼻部' },
        { dim: 'bodyPart', match: '耳朵|耳', value: '耳部' },
        { dim: 'bodyPart', match: '牙|牙龈|口腔|牙齿', value: '牙/口腔' },
        { dim: 'bodyPart', match: '眼睛|眼|视力', value: '眼部' },
        { dim: 'bodyPart', match: '皮肤|身上|全身', value: '皮肤' },
        { dim: 'bodyPart', match: '小腹|膀胱|尿道|小便|尿', value: '泌尿区域' },
    ];

    for (const p of locationPatterns) {
        if (new RegExp(p.match).test(text)) {
            info.bodyPart = p.value;
            break;
        }
    }

    // 提取疼痛性质
    const painTypePatterns = [
        { match: '绞痛|拧着|一阵一阵|痉挛|抽搐', value: '绞痛/痉挛' },
        { match: '钝痛|闷痛|隐隐|酸痛|胀痛|胀', value: '钝痛/闷胀' },
        { match: '灼烧|烧心|火辣|烧灼感', value: '灼烧感' },
        { match: '针刺|刺痛|针扎|锐利|刀割|撕裂', value: '刺痛/锐痛' },
        { match: '跳痛|搏动|一跳一跳|血管跳', value: '搏动性疼痛' },
        { match: '压迫|压榨|重物|紧箍|勒|发紧', value: '压迫感/紧箍感' },
        { match: '酸胀|胀痛', value: '酸胀/胀痛' },
        { match: '麻木|发麻|麻', value: '麻木' },
        { match: '痒|瘙痒', value: '瘙痒' },
    ];
    for (const p of painTypePatterns) {
        if (new RegExp(p.match).test(text)) {
            info.painType = p.value;
            break;
        }
    }

    // 提取持续时间
    const durationPatterns = [
        { match: '几分钟|几秒|短暂', value: '短暂（几分钟内）' },
        { match: '几小时|半天|半天了', value: '数小时（半天内）' },
        { match: '一天|1天|昨天|今天', value: '约1天' },
        { match: '两三天|几天|2.*天|3.*天', value: '2-3天' },
        { match: '一周|一星期|7天|一周了', value: '约一周' },
        { match: '几周|好几周|两三周|两三星期', value: '数周' },
        { match: '一个月|1个月|一个多月', value: '1个月以上' },
        { match: '几个月|好几.*月|很长时间', value: '数月' },
        { match: '反复|断断续续|时好时坏|经常', value: '反复发作' },
        { match: '一直|持续|不间断|老是这样', value: '持续性' },
    ];
    for (const p of durationPatterns) {
        if (new RegExp(p.match).test(text)) {
            info.duration = p.value;
            break;
        }
    }

    // 提取伴随症状
    const accompanyKeywords = {
        nausea:    ['恶心', '想吐', '干呕', '反胃'],
        vomit:     ['呕吐', '吐了', '吐出来'],
        fever:     ['发烧', '发热', '体温', '高烧', '低烧', '发烫'],
        diarrhea:  ['腹泻', '拉肚子', '拉稀', '水样便', '稀便'],
        constipate:['便秘', '拉不出', '大便干', '排便困难'],
        dizzy:     ['头晕', '眩晕', '天旋地转', '站不稳'],
        headache:  ['头痛', '头疼', '头胀'],
        fatigue:   ['乏力', '没力气', '疲惫', '没精神', '累', '虚弱'],
        appetite:  ['没胃口', '不想吃', '食欲', '吃不下'],
        sweat:     ['出冷汗', '盗汗', '大汗'],
        palpitate: ['心慌', '心悸', '心跳快'],
        cough:     ['咳嗽', '咳痰', '干咳'],
        breath:    ['气短', '气促', '呼吸困难', '喘不上气'],
        neuro:     ['手麻', '脚麻', '肢体无力', '口齿不清', '脸歪'],
    };
    const foundAccompany = [];
    for (const [key, kws] of Object.entries(accompanyKeywords)) {
        if (kws.some(k => text.includes(k))) {
            foundAccompany.push(key);
        }
    }
    if (foundAccompany.length > 0) {
        info.accompany = foundAccompany.join(',');
    }

    // 提取严重程度
    if (/巨痛|剧痛|疼得要命|疼死了|受不了|10分|[89]分|无法忍受/.test(text)) {
        info.severity = '重度';
    } else if (/很疼|挺疼|比较疼|明显|影响.*睡|[5-7]分/.test(text)) {
        info.severity = '中度';
    } else if (/有点|轻微|隐隐|稍微|不严重|[1-4]分|能忍/.test(text)) {
        info.severity = '轻度';
    }

    // 提取诱发因素
    const triggerPatterns = [
        { match: '饭后|吃完饭|吃东西后|餐后|进食后', value: '饭后加重' },
        { match: '空腹|饿|饭前|没吃饭|饥饿', value: '空腹时出现' },
        { match: '劳累|累了|运动|活动|走路|上楼', value: '劳累/活动时加重' },
        { match: '休息|躺着|坐着', value: '休息时缓解' },
        { match: '压力|紧张|加班|熬夜|睡眠', value: '压力/睡眠相关' },
        { match: '月经|经期|例假|大姨妈', value: '与月经周期相关' },
        { match: '喝酒|饮酒|吃了.*药|油腻|辛辣|生冷|不干净', value: '饮食相关' },
        { match: '感冒|受凉|着凉|吹风|变天', value: '感染/受凉后' },
        { match: '受伤|摔倒|扭|撞|碰', value: '外伤后' },
    ];
    for (const p of triggerPatterns) {
        if (new RegExp(p.match).test(text)) {
            info.triggers = p.value;
            break;
        }
    }

    return info;
}

/**
 * 判断信息是否充分
 */
function calcInfoScore(info, templateArea, askedDims) {
    // 关键维度：部位、疼痛性质、持续时间、伴随症状
    const keyDims = ['bodyPart', 'painType', 'duration'];
    const importantDims = ['accompany', 'triggers', 'severity'];

    // 对于皮肤类，部位不太重要
    let dimsNeeded;
    if (templateArea === 'skin') {
        dimsNeeded = ['bodyPart', 'duration', 'triggers'];
    } else if (templateArea === 'fever') {
        dimsNeeded = ['severity', 'duration', 'accompany'];
    } else {
        dimsNeeded = keyDims;
    }

    const knownCount = dimsNeeded.filter(d => info[d] || askedDims.has(d)).length;
    const extraCount = importantDims.filter(d => info[d]).length;

    // 已知维度 + 已问过但未答 = 我们认为足够
    return {
        knownDimCount: knownCount + extraCount,
        missingDims: dimsNeeded.filter(d => !info[d] && !askedDims.has(d)),
        isSufficient: (knownCount >= dimsNeeded.length - 1) || (knownCount + extraCount >= 3),
    };
}

// ==================== 追问引擎 ====================

/**
 * 找出最匹配的症状模板
 */
function findTemplate(input) {
    let bestTemplate = 'general';
    let bestScore = 0;

    for (const [area, template] of Object.entries(FOLLOWUP_TEMPLATES)) {
        if (area === 'general') continue;
        let score = 0;
        for (const kw of template.keywords) {
            if (input.includes(kw)) score += kw.length;
        }
        if (score > bestScore) {
            bestScore = score;
            bestTemplate = area;
        }
    }
    return bestTemplate;
}

/**
 * 构建追问消息
 */
function buildFollowupMessage(templateArea, missingDims, askedDims) {
    const template = FOLLOWUP_TEMPLATES[templateArea] || FOLLOWUP_TEMPLATES.general;

    // 找出还没问过的关键问题
    let availableQuestions = template.questions.filter(q => !askedDims.has(q.dim));

    // 优先问 missingDims 中提到的维度
    if (missingDims.length > 0) {
        const priorityQuestions = availableQuestions.filter(q => missingDims.includes(q.dim));
        if (priorityQuestions.length > 0) {
            availableQuestions = priorityQuestions;
        }
    }

    // 最多问3个问题
    const selectedQuestions = availableQuestions.slice(0, 3);

    let html = `<p>为了给您更准确的判断，我需要再了解几个细节：</p>`;
    html += `<div class="followup-card">`;
    html += `<div class="followup-title">🔍 请补充以下信息：</div>`;
    html += `<ul class="followup-questions">`;
    for (let i = 0; i < selectedQuestions.length; i++) {
        html += `<li><span class="q-icon">${i + 1}.</span> ${selectedQuestions[i].text}</li>`;
    }
    html += `</ul>`;
    html += `<div class="followup-hint">💡 逐一回答以上问题即可，越详细判断越准确</div>`;
    html += `</div>`;

    // 返回选中的问题维度，以便记录已问
    return { html, askedDims: selectedQuestions.map(q => q.dim) };
}

// ==================== 诊断引擎 ====================

/**
 * 综合所有已收集信息进行诊断
 */
function runDiagnosis(collectedInput, templateArea) {
    const combinedText = collectedInput.toLowerCase();

    // 1. 查找详细知识库
    const detailKB = DETAILED_KNOWLEDGE[templateArea];

    let allResults = [];
    let allRedFlags = [];
    let painTypeHint = null;

    if (detailKB) {
        // 提取部位子类别
        if (detailKB.subCategories) {
            for (const [subKey, subCat] of Object.entries(detailKB.subCategories)) {
                if (subCat.keywords) {
                    const matchCount = subCat.keywords.filter(k => combinedText.includes(k)).length;
                    if (matchCount > 0) {
                        for (const cond of subCat.conditions) {
                            allResults.push({ ...cond, subCategory: subKey, matchScore: matchCount });
                        }
                    }
                }
            }
        }

        // 提取疼痛性质映射
        const extractedInfo = extractInfo(combinedText);
        if (detailKB.painTypeMapping && extractedInfo.painType) {
            for (const [typeKey, typeData] of Object.entries(detailKB.painTypeMapping)) {
                if (extractedInfo.painType.includes(typeKey) || combinedText.includes(typeKey)) {
                    painTypeHint = typeData;
                    break;
                }
            }
        }

        // 提取红色旗标
        if (detailKB.redFlags) {
            allRedFlags = detailKB.redFlags.filter(f => {
                const kw = f.symptom.substring(0, 4).replace(/[，。！？、\s]/g, '');
                return combinedText.includes(kw.substring(0, 2));
            });
        }
    }

    // 如果没有匹配到子类别，使用整个区域的通用条件
    if (allResults.length === 0 && detailKB) {
        for (const [subKey, subCat] of Object.entries(detailKB.subCategories)) {
            for (const cond of subCat.conditions) {
                allResults.push({ ...cond, subCategory: subKey, matchScore: 0 });
            }
        }
    }

    // 2. 如果详细知识库也没有，回退到外部知识库 (使用旧版通用匹配)
    if (allResults.length === 0) {
        return runLegacyDiagnosis(combinedText);
    }

    // 去重
    const seen = new Set();
    const uniqueResults = [];
    for (const r of allResults) {
        if (!seen.has(r.name)) {
            seen.add(r.name);
            uniqueResults.push(r);
        }
    }
    uniqueResults.sort((a, b) => b.matchScore - a.matchScore);

    // 确定主要诊断
    const primaryDiagnosis = uniqueResults.length > 0 ? uniqueResults[0] : null;
    const differential = uniqueResults.slice(1, Math.min(uniqueResults.length, 4));

    // 确定科室
    let department = null;
    if (primaryDiagnosis) {
        department = { name: primaryDiagnosis.dept, desc: primaryDiagnosis.deptDesc };
    }

    // 判断严重程度
    let severity = 'mild';
    if (allRedFlags.length > 0) severity = 'urgent';
    else {
        const extInfo = extractInfo(combinedText);
        if (extInfo.severity === '重度' || extInfo.duration === '持续性' || combinedText.includes('受不了')) {
            severity = 'moderate';
        }
    }

    // 下一步建议
    let nextSteps;
    if (severity === 'urgent') {
        nextSteps = [
            '请立即拨打120急救电话或前往最近的急诊科！',
            '告知身边人您的情况，不要独自前往医院',
            '保持电话畅通，准备好医保卡和身份证',
        ];
    } else {
        nextSteps = [
            `建议前往<strong>${department ? department.name : '相关科室'}</strong>就诊`,
            '就诊前整理好症状变化时间线，方便医生快速了解病情',
            '带上既往病历、正在服用的药物（包括保健品）',
            '如有近期体检报告或化验单，一并携带',
            '可通过我院微信公众号或官网预约挂号',
        ];
    }

    return {
        primaryDiagnosis: primaryDiagnosis ? `${primaryDiagnosis.name}（${primaryDiagnosis.prob}）` : '需进一步检查确认',
        diagnosisDesc: primaryDiagnosis ? primaryDiagnosis.desc : '',
        differential: differential.map(d => d.name),
        department,
        severity,
        redFlags: allRedFlags,
        nextSteps,
        painTypeHint,
        collectedInfo: extractInfo(combinedText),
    };
}

/**
 * 旧版通用诊断（兜底方案）
 */
function runLegacyDiagnosis(input) {
    // 简化版关键词匹配
    const areaMap = {
        '头': { dept: '神经内科', desc: '头痛、头晕相关疾病。' },
        '胸|心': { dept: '心内科', desc: '心血管系统疾病。' },
        '腹|胃|肠|肚': { dept: '消化内科', desc: '消化系统疾病。' },
        '关节|膝|腰|背|肩': { dept: '骨科', desc: '骨骼肌肉系统疾病。' },
        '皮肤|疹|痒': { dept: '皮肤科', desc: '皮肤相关疾病。' },
        '咳|痰|喘|呼吸': { dept: '呼吸内科', desc: '呼吸系统疾病。' },
        '尿|小便': { dept: '泌尿外科', desc: '泌尿系统疾病。' },
    };

    let dept = { name: '全科门诊', desc: '可先到全科门诊进行初步评估，必要时转专科。' };
    for (const [pattern, d] of Object.entries(areaMap)) {
        if (new RegExp(pattern).test(input)) {
            dept = d;
            break;
        }
    }

    return {
        primaryDiagnosis: '需进一步检查确认（信息不足）',
        diagnosisDesc: '根据您目前的描述，建议先到相应科室让医生进行详细问诊和检查。',
        differential: [],
        department: dept,
        severity: 'mild',
        redFlags: [],
        nextSteps: [
            `建议前往<strong>${dept.name}</strong>就诊`,
            '就诊时请详细描述您的症状',
            '可通过我院微信公众号或官网预约挂号',
        ],
        painTypeHint: null,
        collectedInfo: {},
    };
}

// ==================== 页面状态管理 ====================

// 对话状态
let state = {
    collectedInput: '',      // 所有用户输入拼接
    askedDims: new Set(),    // 已问过的维度
    turnCount: 0,            // 对话轮次
    templateArea: 'general', // 当前症状模板
    diagnosisDone: false,    // 是否已完成诊断
    currentRecord: null,     // 当前病历
};

function resetState() {
    state = {
        collectedInput: '',
        askedDims: new Set(),
        turnCount: 0,
        templateArea: 'general',
        diagnosisDone: false,
        currentRecord: null,
    };
}

// ==================== UI 元素 ====================

const chatArea = document.getElementById('chatArea');
const userInput = document.getElementById('userInput');
const btnSend = document.getElementById('btnSend');
const recordCard = document.getElementById('recordCard');
const recordStatus = document.getElementById('recordStatus');
const deptCard = document.getElementById('deptCard');
const deptContent = document.getElementById('deptContent');
const nextSteps = document.getElementById('nextSteps');
const stepsList = document.getElementById('stepsList');
const actionButtons = document.getElementById('actionButtons');
const quickTags = document.getElementById('quickTags');

// ==================== 主流程 ====================

function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage('user', text);
    userInput.value = '';
    userInput.style.height = 'auto';
    btnSend.disabled = true;

    state.collectedInput += ' ' + text;
    state.turnCount++;

    const loadingId = showLoading();

    setTimeout(() => {
        removeLoading(loadingId);

        // 第一轮：确定模板区域
        if (state.turnCount === 1) {
            state.templateArea = findTemplate(text);
        } else {
            // 后续轮次，如果新输入改变了模板，更新
            const newTemplate = findTemplate(text);
            if (newTemplate !== 'general' && newTemplate !== state.templateArea) {
                state.templateArea = newTemplate;
            }
        }

        const currentInfo = extractInfo(state.collectedInput);
        const sufficiency = calcInfoScore(currentInfo, state.templateArea, state.askedDims);

        // 更新已问维度
        // 通过检查已问过的消息类型推断

        console.log('Turn:', state.turnCount, 'Sufficiency:', sufficiency, 'Template:', state.templateArea);

        // 判断是否继续追问
        if (!sufficiency.isSufficient && state.turnCount < 3 && sufficiency.missingDims.length > 0) {
            // 需要追问
            const followup = buildFollowupMessage(state.templateArea, sufficiency.missingDims, state.askedDims);
            for (const dim of followup.askedDims) {
                state.askedDims.add(dim);
            }
            addMessage('bot', followup.html);
            updateRecordPanel(null);
        } else {
            // 信息足够，开始诊断
            state.diagnosisDone = true;
            const diagnosis = runDiagnosis(state.collectedInput, state.templateArea);

            // 显示收集的信息摘要
            showCollectedInfo(currentInfo);

            // 显示诊断结果
            setTimeout(() => {
                showDiagnosisResult(diagnosis);
            }, 400);
        }
    }, 700 + Math.random() * 500);
}

// ==================== 结果显示 ====================

function showCollectedInfo(info) {
    const parts = [];
    if (info.bodyPart) parts.push({ key: '部位', val: info.bodyPart });
    if (info.painType) parts.push({ key: '性质', val: info.painType });
    if (info.duration) parts.push({ key: '时长', val: info.duration });
    if (info.severity) parts.push({ key: '程度', val: info.severity });
    if (info.triggers) parts.push({ key: '诱因', val: info.triggers });
    if (info.accompany) {
        const accMap = {
            nausea: '恶心', vomit: '呕吐', fever: '发热', diarrhea: '腹泻',
            constipate: '便秘', dizzy: '头晕', headache: '头痛', fatigue: '乏力',
            appetite: '食欲减退', sweat: '出汗', palpitate: '心慌', cough: '咳嗽',
            breath: '呼吸困难', neuro: '神经症状',
        };
        const accLabels = info.accompany.split(',').map(k => accMap[k] || k).join('、');
        parts.push({ key: '伴随', val: accLabels });
    }

    if (parts.length > 0) {
        let html = '<p>✅ 已收集到以下信息：</p>';
        html += `<div class="collected-info">`;
        for (const p of parts) {
            html += `<span class="info-item"><span class="info-key">${p.key}:</span> <span class="info-val">${p.val}</span></span>`;
        }
        html += `</div>`;
        html += `<p>根据以上信息，我的分析如下：</p>`;
        addMessage('bot', html);
    }
}

function showDiagnosisResult(diagnosis) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const record = {
        date: dateStr,
        chiefComplaint: diagnosis.collectedInfo?.bodyPart
            ? `${diagnosis.collectedInfo.bodyPart}${diagnosis.collectedInfo.painType || '不适'}`
            : state.collectedInput.substring(0, 40).trim(),
        presentIllness: state.collectedInput.trim(),
        primaryDiagnosis: diagnosis.primaryDiagnosis,
        diagnosisDesc: diagnosis.diagnosisDesc,
        differential: diagnosis.differential,
        severity: diagnosis.severity,
        department: diagnosis.department,
        redFlags: diagnosis.redFlags,
        nextSteps: diagnosis.nextSteps,
        painTypeHint: diagnosis.painTypeHint,
    };

    state.currentRecord = record;

    // ----- 红色警示优先显示 -----
    if (diagnosis.redFlags.length > 0) {
        for (const flag of diagnosis.redFlags) {
            let html = `<div style="background:#fee2e2;border-left:4px solid #ef4444;padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:8px;">`;
            html += `<p style="color:#991b1b;font-weight:700;margin:0;">🚨 警示：${flag.symptom}</p>`;
            html += `<p style="color:#991b1b;margin:4px 0 0 0;font-size:13px;">${flag.action}</p>`;
            html += `</div>`;
            addMessage('bot', html);
        }
    }

    // ----- 主要诊断 -----
    let html = `<p style="font-weight:700;font-size:16px;">🔍 初步诊断：<span style="color:#0d9488;">${diagnosis.primaryDiagnosis}</span></p>`;
    html += `<p style="font-size:14px;color:var(--text-secondary);">${diagnosis.diagnosisDesc}</p>`;

    // 疼痛性质提示
    if (diagnosis.painTypeHint) {
        html += `<p style="font-size:13px;color:#64748b;margin-top:6px;">💡 ${diagnosis.painTypeHint.hint}</p>`;
    }

    // 鉴别诊断
    if (diagnosis.differential.length > 0) {
        html += `<p style="margin-top:8px;font-size:14px;">其他需要考虑的可能：<strong>${diagnosis.differential.join('、')}</strong></p>`;
    }

    addMessage('bot', html);

    // ----- 病历卡片 -----
    setTimeout(() => {
        addMessage('bot', buildRecordCard(record));
    }, 300);

    // ----- 科室推荐 -----
    setTimeout(() => {
        if (record.department) {
            addMessage('bot', buildDeptCard(record));
        }
    }, 500);

    // ----- 下一步建议 -----
    setTimeout(() => {
        addMessage('bot', buildStepsCard(record));
        updateRecordPanel(record);
    }, 700);
}

function buildRecordCard(record) {
    const severityLabel = { mild: '🟢 一般', moderate: '🟡 需关注', urgent: '🔴 紧急' };
    let html = `<div class="record-inline-header">📋 电子病历（预诊）</div>`;
    html += `<div style="padding:16px 18px;">`;
    html += `<div class="record-field"><span class="field-label">就诊时间</span><span class="field-value">${record.date}</span></div>`;
    html += `<div class="record-field"><span class="field-label">主诉</span><span class="field-value">${record.chiefComplaint}</span></div>`;
    html += `<div class="record-field"><span class="field-label">现病史</span><span class="field-value" style="font-size:13px;">${record.presentIllness}</span></div>`;
    html += `<div class="record-field"><span class="field-label">初步诊断</span><span class="field-value" style="color:#0d9488;font-weight:700;">${record.primaryDiagnosis}</span></div>`;
    if (record.differential.length > 0) {
        html += `<div class="record-field"><span class="field-label">鉴别诊断</span><span class="field-value">${record.differential.join('、')}</span></div>`;
    }
    html += `<div class="record-field"><span class="field-label">严重程度</span><span class="field-value">${severityLabel[record.severity]}</span></div>`;
    html += `</div>`;
    return `<div class="record-inline">${html}</div>`;
}

function buildDeptCard(record) {
    let html = '';
    if (record.severity === 'urgent') {
        html += `<div style="background:#fee2e2;border:2px solid #ef4444;border-radius:12px;padding:14px 18px;">`;
        html += `<p style="font-weight:700;color:#991b1b;margin:0;">🚨 请立即前往急诊科！</p>`;
        html += `<p style="color:#991b1b;margin:6px 0 0 0;font-size:14px;">${record.department.name} — ${record.department.desc}</p>`;
        html += `</div>`;
    } else {
        html += `<div style="background:#ecfdf5;border:2px solid #a7f3d0;border-radius:12px;padding:14px 18px;">`;
        html += `<p style="font-weight:700;color:#065f46;margin:0;font-size:16px;">🏥 推荐科室：${record.department.name}</p>`;
        html += `<p style="color:#047857;margin:4px 0 0 0;font-size:14px;">${record.department.desc}</p>`;
        html += `</div>`;
    }
    return html;
}

function buildStepsCard(record) {
    let html = `<p style="font-weight:700;">📌 下一步建议：</p>`;
    html += `<div class="steps-inline">`;
    record.nextSteps.forEach((step, i) => {
        html += `<div class="step-item"><span class="step-num">${i + 1}</span><span>${step}</span></div>`;
    });
    html += `</div>`;

    if (record.severity !== 'urgent') {
        html += `<p style="margin-top:12px;font-size:14px;color:#64748b;">💡 提示：您可以通过我院微信公众号（七七医院）或官网预约挂号。本预诊结果仅供参考，请以实际医生诊断为准。</p>`;
    }

    return html;
}

// ==================== 右侧面板更新 ====================

function updateRecordPanel(record) {
    if (!record || !record.department) {
        recordCard.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">📝</div>
                <p>${state.turnCount > 0 ? '正在收集中，请继续回答……' : '完成问诊后，病历与就医建议将显示在这里'}</p>
            </div>`;
        recordStatus.textContent = state.turnCount > 0 ? '收集中…' : '等待问诊';
        recordStatus.className = 'badge waiting';
        deptCard.style.display = 'none';
        nextSteps.style.display = 'none';
        actionButtons.style.display = 'none';
        return;
    }

    recordStatus.textContent = '预诊完成';
    recordStatus.className = 'badge ready';

    const severityLabel = { mild: '🟢 一般', moderate: '🟡 需关注', urgent: '🔴 紧急' };
    let html = '<div class="record-filled">';

    html += `<h3>📋 基本信息</h3>`;
    html += `<div class="info-row"><span class="label">就诊时间</span><span class="value">${record.date}</span></div>`;
    html += `<div class="info-row"><span class="label">严重程度</span><span class="value">${severityLabel[record.severity]}</span></div>`;

    html += `<h3>🗣️ 主诉</h3>`;
    html += `<p style="font-size:14px;color:var(--text);">${record.chiefComplaint}</p>`;

    html += `<h3>🔍 初步诊断</h3>`;
    html += `<span class="diagnosis-tag">${record.primaryDiagnosis}</span>`;
    for (const d of record.differential) {
        html += `<span class="diagnosis-tag" style="background:#e8f0fe;color:#1a56db;">${d}</span>`;
    }

    html += `<h3>📝 现病史</h3>`;
    html += `<p style="font-size:13px;color:var(--text-secondary);">${record.presentIllness}</p>`;

    html += '</div>';
    recordCard.innerHTML = html;

    deptCard.style.display = 'block';
    deptContent.innerHTML = `
        <div class="dept-item">
            <div class="dept-name">${record.department.name}</div>
            <div class="dept-desc">${record.department.desc}</div>
        </div>`;

    nextSteps.style.display = 'block';
    stepsList.innerHTML = record.nextSteps.map((s, i) => `
        <li>
            <span class="step-num">${i + 1}</span>
            <span class="step-text">${s}</span>
        </li>`).join('');

    actionButtons.style.display = 'flex';
}

// ==================== 消息渲染 ====================

function addMessage(type, content) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    const avatar = type === 'user' ? '🧑' : '👨‍⚕️';
    div.innerHTML = `
        <div class="message-avatar">${avatar}</div>
        <div class="message-bubble">${content}</div>
    `;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
}

function showLoading() {
    const id = 'loading-' + Date.now();
    const div = document.createElement('div');
    div.className = 'message bot';
    div.id = id;
    div.innerHTML = `
        <div class="message-avatar">👨‍⚕️</div>
        <div class="message-bubble">
            <div class="typing-indicator">
                <span></span><span></span><span></span>
            </div>
        </div>
    `;
    chatArea.appendChild(div);
    chatArea.scrollTop = chatArea.scrollHeight;
    return id;
}

function removeLoading(id) {
    const el = document.getElementById(id);
    if (el) el.remove();
}

// ==================== 事件 ====================

btnSend.addEventListener('click', sendMessage);

userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

userInput.addEventListener('input', () => {
    btnSend.disabled = !userInput.value.trim();
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
});

quickTags.addEventListener('click', (e) => {
    const tag = e.target.closest('.tag');
    if (!tag) return;
    userInput.value = tag.dataset.symptom;
    userInput.focus();
    btnSend.disabled = false;
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
});

document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
});

document.getElementById('btnNew').addEventListener('click', () => {
    resetState();

    chatArea.innerHTML = `
        <div class="message bot">
            <div class="message-avatar">👨‍⚕️</div>
            <div class="message-bubble">
                <p>您好，我是七七医院的 AI 预诊助手。请您详细描述一下<strong>哪里不舒服</strong>，例如：</p>
                <ul>
                    <li><strong>哪个部位</strong>不舒服？（如：上腹、右下腹、胸口、后脑勺…）</li>
                    <li><strong>怎样的感觉</strong>？（如：钝痛、绞痛、灼烧感、胀痛…）</li>
                    <li><strong>从什么时候开始</strong>的？持续多久了？</li>
                    <li><strong>有没有其他症状</strong>？（如：恶心、发烧、头晕…）</li>
                    <li><strong>什么情况下加重或缓解</strong>？以前有过吗？</li>
                </ul>
                <p style="margin-top:8px;font-size:13px;color:#64748b;">💡 描述越详细，判断越准确。</p>
            </div>
        </div>`;

    recordCard.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">📝</div>
            <p>完成问诊后，病历与就医建议将显示在这里</p>
        </div>`;
    recordStatus.textContent = '等待问诊';
    recordStatus.className = 'badge waiting';
    deptCard.style.display = 'none';
    nextSteps.style.display = 'none';
    actionButtons.style.display = 'none';

    userInput.value = '';
    userInput.style.height = 'auto';
    btnSend.disabled = true;
    userInput.focus();
});

// ==================== 初始化 ====================

btnSend.disabled = true;
