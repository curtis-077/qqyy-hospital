/**
 * 涓冧竷鍖婚櫌 鈥?鏅鸿兘棰勮瘖绯荤粺
 * 澶氳疆杩介棶 + 缁嗗寲鐥囩姸 鈫?绮惧噯璇婃柇 + 绉戝鎺ㄨ崘
 */

// ==================== 淇℃伅缁村害瀹氫箟 ====================

// 闂瘖涓渶瑕佹敹闆嗙殑淇℃伅缁村害
const INFO_DIMENSIONS = {
    bodyPart:    { label: '閮ㄤ綅',     icon: '馃搷' },
    painType:    { label: '鐤肩棝鎬ц川', icon: '馃攳' },
    duration:    { label: '鎸佺画鏃堕棿', icon: '鈴憋笍' },
    onset:       { label: '鍙戜綔鏂瑰紡', icon: '鈿? },
    accompany:   { label: '浼撮殢鐥囩姸', icon: '馃敆' },
    triggers:    { label: '璇卞洜/缂撹В', icon: '馃幆' },
    severity:    { label: '涓ラ噸绋嬪害', icon: '馃搳' },
    history:     { label: '鏃㈠線鍙?,   icon: '馃搵' },
};

// ==================== 杩介棶妯℃澘锛堟寜鐥囩姸鍖哄煙锛?====================

const FOLLOWUP_TEMPLATES = {

    // ---- 鑵归儴 ----
    abdominal: {
        keywords: ['鑲氬瓙', '鑵?, '鑳?, '鑲?, '鑲氳剱', '闃戝熬', '娑堝寲', '鍙嶉吀', '鐑у績', '鎭跺績', '鍛曞悙', '鑵规郴', '渚跨', '渚胯', '鎷夎倸瀛?, '鑳€姘?],
        questions: [
            { dim: 'bodyPart',  text: '鐤肩棝鍏蜂綋鍦ㄥ摢涓綅缃紵鏄?strong>涓婅吂銆佷笅鑵广€佸乏渚с€佸彸渚с€佽倸鑴愬懆鍥?/strong>锛岃繕鏄暣涓吂閮紵濡傛灉鑳界敤鎵嬫寚鎸囧嚭鍏蜂綋浣嶇疆灏辨洿濂戒簡銆? },
            { dim: 'painType',  text: '鏄€庢牱鐨勭柤娉曪紵鏄?strong>缁炵棝锛堜竴闃典竴闃垫嫥鐫€鐤硷級銆侀挐鐥涳紙闂烽椃鐨勭柤锛夈€佺伡鐑ф劅銆侀拡鍒烘牱</strong>锛岃繕鏄儉鐥涳紵' },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬬柤鐨勶紵鎸佺画浜?strong>鍑犲皬鏃躲€佸嚑澶┿€佽繕鏄嚑鍛?/strong>锛熸槸涓€鐩寸柤杩樻槸涓€闃典竴闃电殑锛? },
            { dim: 'accompany', text: '闄や簡鐤间箣澶栵紝鏈夋病鏈?strong>鎭跺績鍛曞悙銆佽吂娉讳究绉樸€佸彂鐑с€佸弽閰哥儳蹇?/strong>绛夊叾浠栦笉鑸掓湇锛? },
            { dim: 'triggers',  text: '鍜屽悆楗湁鍏崇郴鍚楋紵鏄?strong>楗墠鐤笺€侀キ鍚庣柤銆佺┖鑵圭柤</strong>锛岃繕鏄拰鍚冮キ娌″叧绯伙紵鏈夋病鏈夊悆浠€涔堢壒鍒殑涓滆タ锛? },
            { dim: 'severity',  text: '濡傛灉鐢?-10鍒嗘墦鍒嗭紙10鍒嗘渶鐤硷級锛屽ぇ姒傛湁鍑犲垎锛熻兘姝ｅ父宸ヤ綔鍜岀潯瑙夊悧锛? },
        ],
    },

    // ---- 澶撮儴 ----
    head: {
        keywords: ['澶?, '澶槼绌?, '鍚庤剳鍕?, '鍓嶉', '鍋忓ご鐥?, '澶存檿', '澶存槒', '鑴?, '鑴栧瓙鍍?],
        questions: [
            { dim: 'bodyPart',  text: '鍏蜂綋鏄摢涓儴浣嶄笉鑸掓湇锛?strong>鍓嶉銆佸お闃崇┐锛堜竴渚ц繕鏄袱渚э級銆佸悗鑴戝嫼銆佸ご椤?/strong>锛岃繕鏄暣涓ご閮紵' },
            { dim: 'painType',  text: '鏄€庢牱鐨勬劅瑙夛紵鏄?strong>涓€璺充竴璺崇殑鎼忓姩鐥涖€佺揣绠嶆劅锛堝儚琚甫瀛愬嫆浣忥級銆侀椃鑳€鎰?/strong>锛岃繕鏄拡鍒烘牱锛? },
            { dim: 'duration',  text: '姣忔鎸佺画澶氫箙锛熸槸<strong>鍑犲垎閽熴€佸嚑灏忔椂銆佽繕鏄竴鏁村ぉ</strong>锛熷涔呭彂浣滀竴娆★紵' },
            { dim: 'accompany', text: '鏈夋病鏈?strong>鎭跺績鍛曞悙銆佹€曞厜鎬曞０闊炽€佺溂鐫涘彂鑺便€佷竴渚ф墜鑴氬彂楹绘棤鍔?/strong>锛? },
            { dim: 'triggers',  text: '浠€涔堟儏鍐典笅浼氳鍙戞垨鍔犻噸锛熸瘮濡?strong>鍔崇疮銆佸帇鍔涘ぇ銆佺啲澶溿€佹湀缁忓墠鍚庛€佸枬閰?/strong>涔嬪悗锛? },
            { dim: 'history',   text: '浠ュ墠鏈夎繃绫讳技鎯呭喌鍚楋紵鏈夋病鏈夊亸澶寸棝鎴栭珮琛€鍘嬬殑鐥呭彶锛? },
        ],
    },

    // ---- 鑳搁儴 / 蹇冭剰 ----
    chest: {
        keywords: ['鑳?, '蹇?, '蹇冭烦', '蹇冩偢', '蹇冨緥', '蹇冩厡', '鑳搁椃', '姘旂煭', '姘斾績', '鍠?, '鍛煎惛鍥伴毦', '蹇冨墠鍖?],
        questions: [
            { dim: 'bodyPart',  text: '鍏蜂綋鏄摢涓綅缃紵鏄?strong>鑳搁鍚庢柟銆佸乏渚у績鍓嶅尯</strong>锛岃繕鏄暣涓兏鍙ｏ紵' },
            { dim: 'painType',  text: '鏄€庢牱鐨勬劅瑙夛紵鏄?strong>鍘嬭揩鎰燂紙鍍忕煶澶村帇鐫€锛夈€侀拡鍒烘劅銆佺伡鐑ф劅</strong>锛岃繕鏄椃鑳€鎰燂紵' },
            { dim: 'duration',  text: '姣忔鎸佺画澶氫箙锛熸槸<strong>鍑犵閽熴€佸嚑鍒嗛挓銆佽繕鏄寔缁笉缂撹В</strong>锛? },
            { dim: 'triggers',  text: '浠€涔堟儏鍐典笅鍑虹幇锛熸槸<strong>娲诲姩/璧拌矾鏃躲€佹儏缁縺鍔ㄦ椂</strong>锛岃繕鏄?strong>浼戞伅/韬轰笅鏃?/strong>鏇存槑鏄撅紵' },
            { dim: 'accompany', text: '鏈夋病鏈?strong>鍑哄喎姹椼€佹伓蹇冦€佸乏鑲╂垨宸﹁噦鏀惧皠鐥涖€佸ご鏅?/strong>锛? },
            { dim: 'severity',  text: '鐢?-10鍒嗘墦鍒嗗ぇ姒傚嚑鍒嗭紵鏈夋病鏈夊奖鍝嶅埌姝ｅ父鍛煎惛锛? },
        ],
    },

    // ---- 鍏宠妭 / 楠ㄩ ----
    joint: {
        keywords: ['鍏宠妭', '鑶濈洊', '鑲?, '鎵嬭厱', '鎵嬫寚', '棰堟', '鑵版', '鑵?, '鑳?, '鑴栧瓙', '鑵跨柤', '鑳宠唺'],
        questions: [
            { dim: 'bodyPart',  text: '鍏蜂綋鏄摢涓叧鑺傛垨閮ㄤ綅锛?strong>鑶濈洊銆佽偐銆佹墜鑵曘€佹墜鎸囥€佽叞妞庛€侀妞?/strong>锛熸槸鍗曚釜鍏宠妭杩樻槸澶氫釜鍏宠妭锛? },
            { dim: 'painType',  text: '鏄€庢牱鐨勭柤锛熸槸<strong>娲诲姩鏃舵墠鐤笺€佷笉鍔ㄤ篃鐤笺€佹棭鏅ㄥ兊纭?/strong>锛熸湁娌℃湁鑲胯儉鎴栧彂鐑劅锛? },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬬殑锛熸槸<strong>鎬ユ€э紙鍑犲ぉ鍐呯獊鐒跺嚭鐜帮級杩樻槸鎱㈡€э紙鍑犱釜鏈堟參鎱㈠姞閲嶏級</strong>锛? },
            { dim: 'triggers',  text: '浠€涔堟儏鍐典細鍔犻噸锛熸瘮濡?strong>璧拌矾銆佷笂涓嬫ゼ姊€佷箙鍧愩€侀槾闆ㄥぉ</strong>锛熶粈涔堟儏鍐典細缂撹В锛? },
            { dim: 'accompany', text: '鏈夋病鏈?strong>鏃╂櫒鍍电‖瓒呰繃30鍒嗛挓銆佸叧鑺傜孩鑲垮彂鐑€佸叾浠栭儴浣嶄篃涓嶈垝鏈?/strong>锛? },
            { dim: 'history',   text: '鏈夋病鏈夊彈杩囦激锛熻亴涓氭槸鍚﹂渶瑕佷箙绔欐垨涔呭潗锛熷浜烘湁娌℃湁鍏宠妭鐐庣殑鐥呭彶锛? },
        ],
    },

    // ---- 鐨偆 ----
    skin: {
        keywords: ['鐨偆', '鐥?, '绾㈢柟', '鐤欑槱', '杩囨晱', '鑽ㄩ夯鐤?, '婀跨柟', '姘存场', '鑴辩毊', '椋庡洟', '鐥樼棙'],
        questions: [
            { dim: 'bodyPart',  text: '鐨柟鍦?strong>鍝釜閮ㄤ綅</strong>锛熸槸灞€閮ㄨ繕鏄叏韬兘鏈夛紵' },
            { dim: 'painType',  text: '鐨柟<strong>鏄粈涔堟牱瀛愮殑</strong>锛熸槸绾㈣壊灏忕偣銆佸ぇ鐗囬鍥€佹按娉°€佽繕鏄共鐕ヨ劚鐨紵' },
            { dim: 'duration',  text: '<strong>浠€涔堟椂鍊欏紑濮?/strong>鍑虹幇鐨勶紵鏄竴鐩存湁杩樻槸鍙嶅弽澶嶅锛熸瘡娆℃寔缁涔咃紵' },
            { dim: 'triggers',  text: '鏈夋病鏈夊彲鑳界殑璇卞洜锛熸瘮濡?strong>鍚冧簡浠€涔堛€佹帴瑙︿簡浠€涔堛€佹崲浜嗘姢鑲ゅ搧銆佸ぉ姘斿彉鍖?/strong>锛? },
            { dim: 'accompany', text: '鏈夋病鏈?strong>鍛煎惛鍥伴毦銆佸槾鍞囨垨鐪肩毊鑲胯儉銆佸彂鐑?/strong>绛夊叏韬棁鐘讹紵锛堚殸锔?鏈夌殑璇濋渶绔嬪嵆灏卞尰锛? },
        ],
    },

    // ---- 鍙戠儹 ----
    fever: {
        keywords: ['鍙戠儳', '鍙戠儹', '楂樼儳', '浣庣儳', '浣撴俯', '鍙戠儷', '鍙戠儹涓嶉€€'],
        questions: [
            { dim: 'severity',  text: '浣撴俯<strong>鏈€楂樺埌杩囧灏戝害</strong>锛熸槸鎸佺画楂樼儳杩樻槸鏃堕珮鏃朵綆锛? },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬪彂鐑х殑锛熷凡缁?strong>鐑т簡鍑犲ぉ</strong>浜嗭紵' },
            { dim: 'accompany', text: '闄や簡鍙戠儳锛屾湁娌℃湁<strong>鍜冲椊銆佸枆鍜欑棝銆佸叏韬吀鐥涖€佸彂鍐峰瘨鎴樸€佸ご鐥?/strong>锛? },
            { dim: 'triggers',  text: '鍙戠儳鍓嶆湁娌℃湁<strong>鍙楀噳銆佹帴瑙︽劅鍐掔殑浜恒€佸悆涓嶅共鍑€鐨勪笢瑗?/strong>锛? },
            { dim: 'history',   text: '涔嬪墠鐢ㄨ繃閫€鐑ц嵂鍚楋紵鏈夋病鏈夎嵂鐗╄繃鏁忓彶锛? },
        ],
    },

    // ---- 娉屽翱 ----
    urinary: {
        keywords: ['灏?, '灏忎究', '鎺掑翱', '鑶€鑳?, '鑲?, '灏块亾'],
        questions: [
            { dim: 'bodyPart',  text: '涓嶈垝鏈嶇殑浣嶇疆鍦?strong>灏忚吂銆佽叞閮ㄣ€佽繕鏄帓灏挎椂灏块亾鐤肩棝</strong>锛? },
            { dim: 'painType',  text: '鍏蜂綋鏄粈涔堟劅瑙夛紵<strong>鎺掑翱鏃剁伡鐥涖€佽叞閮ㄥ墽鐑堢粸鐥涖€佸皬鑵瑰潬鑳€</strong>锛? },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬬殑锛熻繖鍑犲ぉ<strong>鍠濇按澶氬悧</strong>锛? },
            { dim: 'accompany', text: '鏈夋病鏈?strong>灏块銆佸翱鎬ャ€佸翱鑹插紓甯革紙绾㈣壊/娴戞祳锛夈€佸彂鐑с€佽叞鐥?/strong>锛? },
        ],
    },

    // ---- 浜斿畼 / ENT ----
    ent: {
        keywords: ['鍠夊挋', '鍜?, '鍡撳瓙', '榧诲瓙', '榧诲', '娴侀蓟娑?, '鎵撳柗鍤?, '鑰虫湹', '鍚姏', '鑰抽福', '鐗?, '鐗欓緢', '鍙ｈ厰'],
        questions: [
            { dim: 'bodyPart',  text: '鍏蜂綋鏄?strong>鍠夊挋銆侀蓟瀛愩€佽€虫湹杩樻槸鐗欓娇/鍙ｈ厰</strong>锛熷摢涓€渚э紵' },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬬殑锛熸槸<strong>绐佺劧鍙戜綔杩樻槸鎱㈡參鍔犻噸鐨?/strong>锛? },
            { dim: 'accompany', text: '鏈夋病鏈?strong>鍙戠儳銆佸ご鐥涖€侀潰閮ㄨ儉鐥涖€佸悶鍜藉洶闅俱€佸紶鍙ｅ彈闄?/strong>锛? },
            { dim: 'severity',  text: '涓ラ噸绋嬪害濡備綍锛熸湁娌℃湁褰卞搷鍒?strong>鍚冮キ銆佸枬姘淬€佸懠鍚?/strong>锛? },
        ],
    },

    // ---- 绮剧蹇冪悊 ----
    mental: {
        keywords: ['鐒﹁檻', '绱у紶', '鎷呭績', '瀹虫€?, '鎶戦儊', '鎯呯华', '澶辩湢', '鐫′笉鐫€', '鐑﹁簛', '娌″叴瓒?, '寮€蹇冧笉璧锋潵'],
        questions: [
            { dim: 'duration',  text: '杩欑鐘舵€?strong>鎸佺画澶氫箙浜?/strong>锛熸槸鏈€杩戝嚑澶╃殑浜嬶紝杩樻槸宸茬粡濂藉嚑鍛ㄧ敋鑷冲嚑涓湀浜嗭紵' },
            { dim: 'triggers',  text: '鏈夋病鏈?strong>鐗瑰畾鐨勫師鍥犳垨浜嬩欢</strong>瑙﹀彂浜嗚繖绉嶆儏缁紵锛堝伐浣滃帇鍔涖€佷汉闄呭叧绯汇€佸仴搴锋媴蹇х瓑锛? },
            { dim: 'accompany', text: '鏈夋病鏈?strong>蹇冩厡鑳搁椃銆侀娆插彉鍖栥€佷綋閲嶆槑鏄惧鍑忋€佹敞鎰忓姏涓嶉泦涓?/strong>锛? },
            { dim: 'severity',  text: '鏈夋病鏈夊奖鍝嶅埌<strong>姝ｅ父宸ヤ綔銆佺ぞ浜ゆ垨鏃ュ父鐢熸椿</strong>锛熺潯鐪犺川閲忔€庝箞鏍凤紵' },
            { dim: 'history',   text: '鈿狅笍 <strong>鏈夋病鏈夎繃浼ゅ鑷繁鎴栫粨鏉熺敓鍛界殑蹇靛ご锛?/strong>锛堣濡傚疄鍥炵瓟锛屾垜鍙互涓烘偍鎻愪緵甯姪锛? },
        ],
    },

    // ---- 閫氱敤 ----
    general: {
        keywords: [],
        questions: [
            { dim: 'bodyPart',  text: '鑳藉叿浣撹涓€涓?strong>鍝釜閮ㄤ綅</strong>涓嶈垝鏈嶅悧锛熸瘮濡傚乏渚ц繕鏄彸渚с€佸叿浣撳湪浠€涔堜綅缃紵' },
            { dim: 'painType',  text: '鏄€庢牱鐨勪笉鑸掓湇锛?strong>鐤笺€佽儉銆侀夯銆佺棐銆佽繕鏄叾浠栨劅瑙?/strong>锛? },
            { dim: 'duration',  text: '浠庝粈涔堟椂鍊欏紑濮嬬殑锛?strong>澶氫箙浜?/strong>锛熸槸涓€鐩存寔缁繕鏄椂濂芥椂鍧忥紵' },
            { dim: 'accompany', text: '闄や簡杩欎釜锛岃繕鏈?strong>鍏朵粬涓嶈垝鏈?/strong>鍚楋紵姣斿鍙戠儳銆佹伓蹇冦€佸ご鏅曚箣绫荤殑锛? },
            { dim: 'triggers',  text: '鏈夋病鏈夋敞鎰忓埌<strong>浠€涔堟儏鍐典笅浼氬姞閲嶆垨缂撹В</strong>锛熶互鍓嶆湁杩囩被浼兼儏鍐靛悧锛? },
        ],
    },
};

// ==================== 娣卞眰鍖诲鐭ヨ瘑搴?====================

// 缁嗗寲鐨勫瓙鍒嗙被 鈥?鍦ㄥ垵姝ヨ瘖鏂熀纭€涓婃寜瀛愰儴浣?瀛愮棁鐘惰繘涓€姝ュ尯鍒?const DETAILED_KNOWLEDGE = {

    // ----- 鑵归儴缁嗗垎 -----
    abdominal: {
        subCategories: {
            upperRight: {
                keywords: ['鍙充笂鑵?, '鍙充笂閮?, '鍙宠竟鑲氬瓙闈犱笂', '鑲濆尯'],
                conditions: [
                    { name: '鑳嗗泭鐐?鑳嗙粨鐭?, prob: '杈冮珮', desc: '鍙充笂鑵归樀鍙戞€у墽鐥涳紝鍙斁灏勮嚦鍙宠偐鑳岄儴锛屽父浜庤繘椋熸补鑵诲悗璇卞彂銆傞渶B瓒呯‘璇娿€?, dept: '娑堝寲鍐呯 / 鑲濊儐澶栫', deptDesc: '璇婃不鑲濊儐鑳扮柧鐥呫€? },
                    { name: '鑲濈値', prob: '闇€鎺掓煡', desc: '鍙充笂鑵归殣鐥涗笉閫備即涔忓姏銆侀娆插噺閫€銆佸翱鑹插姞娣便€傞渶鏌ヨ倽鍔熻兘銆?, dept: '娑堝寲鍐呯 / 鎰熸煋绉?, deptDesc: '鑲濊剰鐤剧梾鐨勮瘖鏂笌娌荤枟銆? },
                ],
            },
            upperMiddle: {
                keywords: ['涓婅吂', '鑳?, '蹇冪獫', '涓婅吂閮?, '涓笂鑵?, '鑲氬瓙涓婅竟'],
                conditions: [
                    { name: '鑳冪値/鑳冩簝鐤?, prob: '杈冮珮', desc: '涓婅吂閮ㄨ寰嬫€х柤鐥涳紝鑳冩簝鐤″鍦ㄩ鍚?.5-1灏忔椂鐥涳紝鍗佷簩鎸囪偁婧冪枴澶氬湪绌鸿吂鎴栧闂寸棝銆?, dept: '娑堝寲鍐呯', deptDesc: '璇婃不鑳冦€佸崄浜屾寚鑲犵柧鐥呫€傚缓璁仛鑳冮暅妫€鏌ャ€? },
                    { name: '鑳冮绠″弽娴佺梾', prob: '涓瓑', desc: '鑳搁鍚庢垨涓婅吂鐑х伡鎰燂紙鐑у績锛夛紝鍙嶉吀锛岄キ鍚庢垨骞宠汉鏃跺姞閲嶃€?, dept: '娑堝寲鍐呯', deptDesc: '鍙嶆祦鎬ч绠＄値绛変笂娑堝寲閬撳姩鍔涢殰纰嶇柧鐥呯殑璇婃不銆? },
                    { name: '鑳拌吅鐐?, prob: '闇€鎺掓煡', desc: '涓婅吂閮ㄦ寔缁€у墽鐑堢柤鐥涳紝鍚戣叞鑳岄儴鏀惧皠锛屼即鎭跺績鍛曞悙銆傚父鏈夐ギ閰掓垨鑳嗙粨鐭崇梾鍙层€?, dept: '娑堝寲鍐呯 / 鎬ヨ瘖绉?, deptDesc: '鑳拌吅鐐庡涓嶅強鏃舵不鐤楀彲鍗卞強鐢熷懡锛岃灏藉揩灏卞尰銆? },
                ],
            },
            upperLeft: {
                keywords: ['宸︿笂鑵?, '宸︿笂閮?, '宸﹁竟鑲氬瓙闈犱笂'],
                conditions: [
                    { name: '鑳冪値/鑳冩簝鐤?, prob: '杈冮珮', desc: '鑳冮儴涓嶉€傚彲琛ㄧ幇涓哄乏涓婅吂鐥涳紝甯镐笌杩涢鐩稿叧銆?, dept: '娑堝寲鍐呯', deptDesc: '鑳冮儴鐤剧梾璇婃不銆? },
                    { name: '鑴捐剰闂', prob: '闇€鎺掓煡', desc: '宸︿笂鑵归殣鐥涙垨楗辫儉鎰燂紝甯歌浜庢劅鏌撴垨琛€娑茬柧鐥呭紩璧风殑鑴惧ぇ銆?, dept: '娑堝寲鍐呯 / 琛€娑茬', deptDesc: '闇€B瓒呮鏌ヨ瘎浼般€? },
                ],
            },
            lowerRight: {
                keywords: ['鍙充笅鑵?, '鍙充笅閮?, '鍙宠竟鑲氬瓙闈犱笅'],
                conditions: [
                    { name: '鎬ユ€ч槕灏剧値', prob: '闇€绱ф€ユ帓闄?, desc: '鍏稿瀷琛ㄧ幇涓鸿剱鍛ㄧ棝杞Щ鑷冲彸涓嬭吂锛堥害姘忕偣锛夛紝浼村帇鐥涖€佸弽璺崇棝銆佸彂鐑€傞渶绔嬪嵆灏卞尰锛?, dept: '鎬ヨ瘖澶栫 / 鏅绉?, deptDesc: '鎬ユ€ч槕灏剧値闇€灏藉揩鎵嬫湳锛屽欢璇彲鑳藉鑷寸┛瀛斻€? },
                    { name: '鍙充晶闄勪欢鐐?鍗靛发鍥婅偪', prob: '涓瓑锛堝コ鎬э級', desc: '鍙充笅鑵规寔缁殣鐥涳紝涓庢湀缁忓懆鏈熷彲鑳界浉鍏炽€?, dept: '濡囩', deptDesc: '濂虫€х敓娈栫郴缁熺柧鐥呫€? },
                ],
            },
            lowerMiddle: {
                keywords: ['涓嬭吂', '灏忚吂', '鑲氳剱涓?, '涓嬭吂閮?, '灏忚倸瀛?],
                conditions: [
                    { name: '鑶€鑳辩値', prob: '杈冮珮', desc: '灏忚吂鍧犺儉涓嶉€傦紝浼村翱棰戙€佸翱鎬ャ€佸翱鐥涳紝濂虫€у瑙併€?, dept: '娉屽翱澶栫 / 濡囩', deptDesc: '闇€灏垮父瑙勬鏌ョ‘璁ゃ€? },
                    { name: '鐩嗚厰鐐?闄勪欢鐐?, prob: '涓瓑锛堝コ鎬э級', desc: '涓嬭吂鎸佺画鎬ч殣鐥涳紝鐧藉甫澧炲锛屽彲浼村彂鐑€?, dept: '濡囩', deptDesc: '濂虫€х泦鑵旂値鎬х柧鐥呫€? },
                    { name: '鍓嶅垪鑵虹値', prob: '涓瓑锛堢敺鎬э級', desc: '灏忚吂鎴栦細闃撮儴涓嶉€傦紝浼存帓灏垮紓甯搞€?, dept: '娉屽翱澶栫', deptDesc: '鐢锋€у墠鍒楄吅鐤剧梾銆? },
                ],
            },
            lowerLeft: {
                keywords: ['宸︿笅鑵?, '宸︿笅閮?, '宸﹁竟鑲氬瓙闈犱笅'],
                conditions: [
                    { name: '缁撹偁鐐?鎲╁鐐?, prob: '杈冮珮', desc: '宸︿笅鑵圭棝锛屽彲浼存帓渚夸範鎯敼鍙橈紙鑵规郴鎴栦究绉橈級锛屼究鍚庣棝鍑忋€?, dept: '娑堝寲鍐呯', deptDesc: '缁撹偁鐤剧梾鐨勮瘖娌伙紝鍙兘闇€瑕佽偁闀滄鏌ャ€? },
                    { name: '宸︿晶闄勪欢鐐?鍗靛发鍥婅偪', prob: '涓瓑锛堝コ鎬э級', desc: '宸︿笅鑵归殣鐥涳紝涓庢湀缁忓懆鏈熺浉鍏炽€?, dept: '濡囩', deptDesc: '濂虫€х敓娈栫郴缁熺柧鐥呫€? },
                ],
            },
            periumbilical: {
                keywords: ['鑲氳剱', '鑴愬懆', '鑲氳剱鐪?, '鑲氳剱鍛ㄥ洿'],
                conditions: [
                    { name: '鎬ユ€ц偁鑳冪値', prob: '杈冮珮', desc: '鑴愬懆闃靛彂鎬х粸鐥涳紝浼存伓蹇冨憰鍚愩€佽吂娉伙紝澶氫笌涓嶆磥楗鏈夊叧銆?, dept: '娑堝寲鍐呯', deptDesc: '濡傝吂娉讳弗閲嶉渶娉ㄦ剰琛ユ恫闃茶劚姘淬€? },
                    { name: '鏃╂湡闃戝熬鐐?, prob: '闇€璀︽儠', desc: '闃戝熬鐐庢棭鏈熺柤鐥涘父鍦ㄨ剱鍛紝6-8灏忔椂鍚庤浆绉昏嚦鍙充笅鑵广€傚鍑虹幇杞Щ鎬х柤鐥涳紝璇风珛鍗冲氨鍖汇€?, dept: '鎬ヨ瘖澶栫', deptDesc: '瀵嗗垏瑙傚療鐤肩棝鏄惁鍚戝彸涓嬭吂杞Щ銆? },
                    { name: '鑲犵郴鑶滄穻宸寸粨鐐?, prob: '涓瓑锛堝効绔ュ父瑙侊級', desc: '鑴愬懆鐤肩棝锛屽瑙佷簬鍎跨锛屽父鍦ㄤ笂鍛煎惛閬撴劅鏌撳悗鍙戠敓銆?, dept: '鍎跨 / 娑堝寲鍐呯', deptDesc: '澶氫负鑷檺鎬э紝浣嗛渶鎺掗櫎鍏朵粬鎬ヨ吂鐥囥€? },
                ],
            },
            diffuse: {
                keywords: ['鍏ㄨ吂', '鏁翠釜鑲氬瓙', '鍒板'],
                conditions: [
                    { name: '鎬ユ€ц儍鑲犵値', prob: '杈冮珮', desc: '鍏ㄨ吂涓嶉€傦紝浠ョ棄鎸涙€х柤鐥涗负涓伙紝浼磋吂娉诲憰鍚愩€?, dept: '娑堝寲鍐呯', deptDesc: '娉ㄦ剰琛ユ恫锛屽鐥囩姸涓ラ噸璇峰強鏃跺氨鍖汇€? },
                    { name: '鑲犳闃?, prob: '闇€绱ф€ユ帓闄?, desc: '鍏ㄨ吂鍓х儓鐤肩棝浼磋吂鑳€銆佸仠姝㈡帓姘旀帓渚裤€佸憰鍚愩€傞渶绔嬪嵆灏卞尰锛?, dept: '鎬ヨ瘖澶栫', deptDesc: '鑲犳闃绘槸鎬ヨ吂鐥囦箣涓€锛屼笉鍙欢璇€? },
                ],
            },
        },
        painTypeMapping: {
            cramping:  { cond: '鑲犵棄鎸?鑳冭偁鐐?鑳嗙粨鐭?, hint: '缁炵棝澶氭彁绀虹┖鑵旇剰鍣ㄧ棄鎸涙垨姊楅樆锛堣偁銆佽儐绠°€佽緭灏跨锛? },
            dull:      { cond: '鑳冪値/鑲濈値/鐩嗚厰鐐?, hint: '閽濈棝澶氭彁绀哄唴鑴忕殑鎱㈡€х値鐥? },
            burning:   { cond: '鑳冮绠″弽娴?鑳冪値', hint: '鐏肩儳鎰熷涓庤儍閰稿埡婵€鏈夊叧' },
            stabbing:  { cond: '婧冪枴绌垮瓟/鑳拌吅鐐?, hint: '閿愬埄鍒虹棝闇€楂樺害璀︽儠鎬ヨ吂鐥囷紙鈿狅笍 涓ラ噸鏃堕渶绔嬪嵆灏卞尰锛? },
            bloating:  { cond: '娑堝寲涓嶈壇/鑲犳槗婵€/渚跨', hint: '鑳€鐥涘涓庤偁閬撴皵浣撴垨鎺掍究涓嶇晠鏈夊叧' },
        },
        redFlags: [
            { symptom: '鑵圭棝鍓х儓锛屾棤娉曠珯绔嬫垨闇€瑕佽湻缂╂墠鑳界紦瑙?, action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒鍙兘涓烘€ヨ吂鐥囷紙绌垮瓟銆佹闃汇€佽儼鑵虹値绛夛級銆? },
            { symptom: '鍛曡鎴栨帓榛戜究锛堟煆娌规牱渚匡級', action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒鎻愮ず娑堝寲閬撳嚭琛€銆? },
            { symptom: '鑵圭棝浠庤剱鍛ㄨ浆绉昏嚦鍙充笅鑵?+ 鍙戠儹', action: '楂樺害鎬€鐤戞€ユ€ч槕灏剧値锛屽敖蹇墠寰€鎬ヨ瘖澶栫锛? },
            { symptom: '鑵圭棝浼村仠姝㈡帓姘旀帓渚裤€佽吂鑳€鍔犻噸', action: '闇€绱ф€ユ帓闄よ偁姊楅樆锛岀珛鍗冲墠寰€鎬ヨ瘖绉戯紒' },
            { symptom: '鑵圭棝 + 鍋滅粡鍙?+ 闃撮亾鍑鸿锛堝コ鎬э級', action: '绔嬪嵆鍓嶅線鎬ヨ瘖濡囩锛侀渶鎺掗櫎瀹瀛曠牬瑁傦紒' },
        ],
    },

    // ----- 澶撮儴缁嗗垎 -----
    head: {
        subCategories: {
            frontal: {
                keywords: ['鍓嶉', '棰濆ご', '鐪夊績'],
                conditions: [
                    { name: '绱у紶鎬уご鐥?, prob: '杈冮珮', desc: '鍓嶉鎴栧叏澶村帇杩€х揣绠嶆劅锛屼笌鍘嬪姏銆佺柌鍔炽€佺潯鐪犱笉瓒虫湁鍏炽€?, dept: '绁炵粡鍐呯', deptDesc: '鏈€甯歌鐨勫ご鐥涚被鍨嬨€傛敞鎰忎紤鎭拰鍑忓帇銆? },
                    { name: '榧荤鐐?, prob: '涓瓑', desc: '鍓嶉鎴栭潰棰婇儴鑳€鐥涳紝浼撮蓟濉炪€佹祦榛勮壊榧绘稌锛屼綆澶存椂鍔犻噸銆?, dept: '鑰抽蓟鍠夌', deptDesc: '榧荤鐐庡紩璧风殑澶寸棝銆? },
                ],
            },
            temporal: {
                keywords: ['澶槼绌?, '棰為儴', '鍋忓ご鐥?, '涓€渚?, '涓よ竟澶槼绌?],
                conditions: [
                    { name: '鍋忓ご鐥?, prob: '杈冮珮', desc: '涓€渚уお闃崇┐闄勮繎鎼忓姩鎬ц烦鐥涳紝涓噸搴︼紝鎸佺画4-72灏忔椂锛屽彲浼存伓蹇冦€佺晱鍏夌晱澹般€傚父鏈夊鏃忓彶銆?, dept: '绁炵粡鍐呯', deptDesc: '鍋忓ご鐥涙湁鐗规晥鑽墿娌荤枟銆傝褰曞彂浣滄棩璁版湁鍔╀簬璇婃不銆? },
                    { name: '棰炲姩鑴夌値', prob: '闇€鎺掓煡锛?50宀侊級', desc: '澶槼绌村鎸佺画鎬х柤鐥涳紝澶寸毊瑙︾棝锛屽彲浼磋鍔涙ā绯娿€佸拃鍤兼椂涓嬮鐤肩棝銆傞渶鏌ヨ娌夈€?, dept: '椋庢箍鍏嶇柅绉?/ 绁炵粡鍐呯', deptDesc: '濂藉彂浜?0宀佷互涓婁汉缇わ紝闇€鍙婃椂娌荤枟浠ラ槻瑙嗗姏鎹熷銆? },
                ],
            },
            occipital: {
                keywords: ['鍚庤剳鍕?, '鍚庢灂閮?, '鍚庨閮?],
                conditions: [
                    { name: '棰堟簮鎬уご鐥?, prob: '杈冮珮', desc: '鍚庤剳鍕哄強涓婇閮ㄧ柤鐥涳紝涓庨妞庨棶棰樼浉鍏筹紝闀挎椂闂翠綆澶存垨涓嶈壇濮垮娍鍔犻噸銆?, dept: '楠ㄧ / 搴峰绉?, deptDesc: '棰堟闂寮曡捣鐨勫ご鐥涖€傛敼鍠勫Э鍔裤€佺墿鐞嗘不鐤楁晥鏋滆緝濂姐€? },
                    { name: '鏋曠缁忕棝', prob: '涓瓑', desc: '鍚庢灂閮ㄩ樀鍙戞€ч拡鍒烘牱鎴栫數鍑绘牱鐤肩棝銆?, dept: '绁炵粡鍐呯', deptDesc: '鏋曞ぇ绁炵粡鍙楀帇鎴栫値鐥囥€? },
                ],
            },
            wholeHead: {
                keywords: ['鏁翠釜澶?, '鍏ㄥご', '鏁翠釜鑴戣', '婊″ご'],
                conditions: [
                    { name: '绱у紶鎬уご鐥?, prob: '杈冮珮', desc: '鍏ㄥご绱х畭鎰燂紝鎸佺画鎬ц交涓害閽濈棝銆?, dept: '绁炵粡鍐呯', deptDesc: '鏈€甯歌鐨勫ご鐥涚被鍨嬨€? },
                    { name: '楂樿鍘嬫€уご鐥?, prob: '闇€鎺掓煡', desc: '鍏ㄥご鑳€鐥涳紝鐗瑰埆鏄悗鏋曢儴锛屾櫒璧锋槑鏄俱€傞渶娴嬮噺琛€鍘嬨€?, dept: '蹇冨唴绉?, deptDesc: '楂樿鍘嬪紩璧风殑澶寸棝銆傛帶鍒惰鍘嬫槸鍏抽敭銆? },
                ],
            },
        },
        painTypeMapping: {
            pulsating: { cond: '鍋忓ご鐥?, hint: '鎼忓姩鎬ц烦鐥涙槸鍋忓ご鐥涚殑鍏稿瀷鐗瑰緛' },
            pressing:   { cond: '绱у紶鎬уご鐥?, hint: '绱х畭鎰?鍘嬭揩鎰熸槸绱у紶鎬уご鐥涚殑涓昏琛ㄧ幇' },
            stabbing:   { cond: '鏋曠缁忕棝/涓夊弶绁炵粡鐥?, hint: '閽堝埡鏍锋垨鐢靛嚮鏍风柤鐥涙彁绀虹缁忔€х柤鐥? },
            dull:       { cond: '绱у紶鎬уご鐥?楂樿鍘嬫€уご鐥?, hint: '鎸佺画鎬ч椃鐥?鑳€鐥涢渶鎺掓煡琛€鍘嬪拰棰堟' },
        },
        redFlags: [
            { symptom: '绐佸彂"闆峰嚮鏍?鍓х儓澶寸棝锛堜竴鐢熶腑鏈€涓ラ噸鐨勫ご鐥涳級', action: '绔嬪嵆鎷ㄦ墦120锛侀渶鎺掗櫎铔涚綉鑶滀笅鑵斿嚭琛€锛? },
            { symptom: '澶寸棝浼撮珮鐑?+ 棰堥儴鍍电‖', action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒闇€鎺掗櫎鑴戣啘鐐庛€? },
            { symptom: '澶寸棝 + 涓€渚ц偄浣撴棤鍔?鍙ｉ娇涓嶆竻', action: '绔嬪嵆鎷ㄦ墦120锛佽剳鍗掍腑锛堜腑椋庯級鍙兘锛? },
            { symptom: '澶寸棝杩涜鎬у姞閲?+ 鏃╂櫒鏄庢樉 + 鎭跺績鍛曞悙', action: '闇€灏藉揩鍋氬ご棰呭奖鍍忓妫€鏌ワ紝鎺掗櫎棰呭唴鍗犱綅銆? },
        ],
    },

    // ----- 鑳搁儴缁嗗垎 -----
    chest: {
        subCategories: {
            retrosternal: {
                keywords: ['鑳搁鍚?, '鑳稿彛姝ｄ腑', '鑳搁'],
                conditions: [
                    { name: '鑳冮绠″弽娴佺梾', prob: '杈冮珮', desc: '鑳搁鍚庣伡鐑ф劅锛岄キ鍚庢垨韬轰笅鍔犻噸锛屽彲鑳戒即鍙嶉吀銆傚惈閾濋晛鍒跺墏鍙殏鏃剁紦瑙ｃ€?, dept: '娑堝寲鍐呯', deptDesc: '鍙嶆祦瀵艰嚧鐨勪笉閫傚父琚璁や负蹇冭剰闂銆? },
                    { name: '蹇冪粸鐥?, prob: '闇€鎺掓煡锛?40宀佹垨鏈夊嵄闄╁洜绱狅級', desc: '鑳搁鍚庡帇姒ㄦ劅鎴栭椃鐥涳紝鍔崇疮鎴栨儏缁縺鍔ㄨ鍙戯紝浼戞伅3-5鍒嗛挓缂撹В銆傞渶楂樺害閲嶈锛?, dept: '蹇冨唴绉?, deptDesc: '鍏稿瀷蹇冪粸鐥涢渶瑕佽繘涓€姝ヨ瘎浼板啝鑴夋儏鍐点€? },
                ],
            },
            leftChest: {
                keywords: ['宸﹁兏', '蹇冨墠鍖?, '蹇冨彛', '宸︿晶鑳稿彛'],
                conditions: [
                    { name: '蹇冭剰绁炵粡瀹樿兘鐥?, prob: '杈冮珮锛堝勾杞汇€佸帇鍔涘ぇ鑰咃級', desc: '蹇冨墠鍖洪拡鍒烘牱鐤肩棝锛屽嚑绉掗挓鍗宠繃锛屾垨鎸佺画鏁板皬鏃剁殑闅愮棝锛屼笌娲诲姩鍏崇郴涓嶅ぇ锛屽父浼寸劍铏戙€?, dept: '蹇冨唴绉?/ 蹇冪悊绉?, deptDesc: '妫€鏌ユ帓闄ゅ櫒璐ㄦ€у績鑴忕梾鍚庯紝澶氫笌鎯呯华鍘嬪姏鐩稿叧銆? },
                    { name: '蹇冪粸鐥?蹇冩', prob: '闇€鎺掗櫎', desc: '宸︿晶蹇冨墠鍖哄帇杩€ч椃鐥涳紝鍙悜宸﹁偐宸﹁噦鏀惧皠锛屾椿鍔ㄦ椂鍔犻噸銆傗殸锔?鎸佺画瓒呰繃15鍒嗛挓闇€绔嬪嵆灏卞尰锛?, dept: '蹇冨唴绉?/ 鎬ヨ瘖绉?, deptDesc: '鍐犲績鐥呮槸鍗卞強鐢熷懡鐨勭柧鐥咃紝涓嶅彲鎺変互杞诲績銆? },
                ],
            },
        },
        painTypeMapping: {
            pressure:  { cond: '蹇冪粸鐥?蹇冩锛堚殸锔?闇€绔嬪嵆灏卞尰锛?, hint: '鑳搁鍚庡帇杩劅/閲嶇墿鎰熸槸蹇冪粸鐥涘吀鍨嬭〃鐜帮紝鎸佺画>15鍒嗛挓闇€绱ф€ュ鐞? },
            burning:   { cond: '鑳冮绠″弽娴?椋熺鐐?, hint: '鐏肩儳鎰熷涓庤儍閰稿弽娴佹湁鍏筹紝楗悗鍔犻噸' },
            stabbing:  { cond: '蹇冭剰绁炵粡瀹樿兘鐥?鑲嬮棿绁炵粡鐥?, hint: '閽堝埡鏍风柤鐥涘嚑绉掗挓鍗虫秷澶卞涓鸿壇鎬э紝浣嗛娆″嚭鐜颁粛闇€妫€鏌? },
        },
        redFlags: [
            { symptom: '鑳哥棝鎸佺画瓒呰繃15鍒嗛挓 + 澶ф睏/婵掓鎰?, action: '绔嬪嵆鎷ㄦ墦120锛佸彲鑳芥槸鎬ユ€у績鑲屾姝伙紒鍤兼湇300mg闃垮徃鍖规灄锛堝鏃犵蹇岋級銆? },
            { symptom: '绐佸彂鑳歌儗閮ㄦ挄瑁傛牱鍓х棝', action: '绔嬪嵆鎷ㄦ墦120锛侀渶鎺掗櫎涓诲姩鑴夊す灞傦紙鍗卞強鐢熷懡锛夛紒' },
            { symptom: '鑳哥棝 + 鍛煎惛鍥伴毦 + 鍜', action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒闇€鎺掗櫎鑲烘爴濉烇紒' },
        ],
    },

    // ----- 鍏宠妭缁嗗垎 -----
    joint: {
        subCategories: {
            knee: {
                keywords: ['鑶?, '鑶濈洊'],
                conditions: [
                    { name: '楠ㄥ叧鑺傜値', prob: '杈冮珮锛?45宀佹垨鑲ヨ儢鑰咃級', desc: '鑶濆叧鑺傛椿鍔ㄦ椂鐤肩棝锛屼笂涓嬫ゼ姊姞閲嶏紝浼戞伅鍚庣紦瑙ｃ€傚彲鑳芥湁楠ㄦ懇鎿︽劅銆?, dept: '楠ㄧ', deptDesc: '閫€琛屾€у叧鑺傜梾锛屾帶鍒朵綋閲嶃€佺墿鐞嗘不鐤楀彲缂撹В銆? },
                    { name: '鍗婃湀鏉挎崯浼?, prob: '涓瓑', desc: '鑶濆叧鑺傜壒瀹氳搴︾柤鐥涳紝鍙兘鏈?鍗′綇"鐨勬劅瑙夋垨鎵撹蒋鑵裤€傚父鏈夎繍鍔ㄦ垨鎵激鍙层€?, dept: '楠ㄧ / 杩愬姩鍖诲绉?, deptDesc: '鍙兘闇€瑕丮RI妫€鏌ュ強鍏宠妭闀滄墜鏈€? },
                    { name: '鐥涢', prob: '闇€鎺掓煡', desc: '鑶濆叧鑺傜獊鐒跺墽鐑堢孩鑲跨儹鐥涳紝甯镐簬澶滈棿鍙戜綔銆傚ソ鍙戜簬鐢锋€э紝涓庨珮灏块吀鐩稿叧銆?, dept: '椋庢箍鍏嶇柅绉?/ 鍐呭垎娉岀', deptDesc: '鐥涢鎬у叧鑺傜値锛岄渶鏌ヨ灏块吀銆? },
                ],
            },
            finger: {
                keywords: ['鎵嬫寚', '鎸?, '鎵嬪叧鑺?],
                conditions: [
                    { name: '楠ㄥ叧鑺傜値', prob: '杈冮珮', desc: '鎵嬫寚鏈鍏宠妭锛堣但浼櫥缁撹妭锛夋垨杩戠鍏宠妭鑲垮ぇ鍙樺舰锛屾椿鍔ㄥ悗鐥涖€?, dept: '楠ㄧ', deptDesc: '閫€琛屾€ф墜鍏宠妭鐐庛€? },
                    { name: '绫婚婀垮叧鑺傜値', prob: '闇€鎺掓煡', desc: '鍙屾墜瀵圭О鎬у皬鍏宠妭锛堟帉鎸囧叧鑺傘€佽繎绔寚闂村叧鑺傦級鑲跨棝锛屾櫒鍍?30鍒嗛挓銆傞渶鏌ヨ銆?, dept: '椋庢箍鍏嶇柅绉?, deptDesc: '鑷韩鍏嶇柅鎬х柧鐥咃紝鏃╂湡瑙勮寖娌荤枟鍙帶鍒剁梾鎯呫€? },
                ],
            },
            spine: {
                keywords: ['鑵?, '鑳?, '鑴婃煴', '鑵版', '棰堟', '鑴栧瓙', '鍚庤儗'],
                conditions: [
                    { name: '鑵拌倢鍔虫崯/绛嬭啘鐐?, prob: '杈冮珮', desc: '鑵伴儴鎴栬儗閮ㄩ吀鐥涳紝鍔崇疮鍔犻噸锛屼紤鎭紦瑙ｏ紝鍘嬬棝鏄庢樉銆?, dept: '楠ㄧ / 搴峰绉?, deptDesc: '鏈€甯歌鐨勮叞鑳岀棝鍘熷洜锛岀墿鐞嗘不鐤楁晥鏋滃ソ銆? },
                    { name: '鑵版闂寸洏绐佸嚭鐥?, prob: '涓瓑', desc: '鑵扮棝浼村崟渚т笅鑲㈡斁灏勭棝/楹绘湪锛屽挸鍡芥墦鍠峰殢鍔犻噸銆傜洿鑵挎姮楂樿瘯楠岄槼鎬с€?, dept: '楠ㄧ / 鑴婃煴澶栫', deptDesc: '澶氭暟淇濆畧娌荤枟鏈夋晥锛屼弗閲嶈€呴渶鎵嬫湳銆? },
                    { name: '寮虹洿鎬ц剨鏌辩値', prob: '闇€鎺掓煡锛堝勾杞荤敺鎬у瑙侊級', desc: '涓嬭叞閮ㄦ櫒鍍?30鍒嗛挓锛屾椿鍔ㄥ悗缂撹В锛屼紤鎭姞閲嶃€傞渶鏌LA-B27銆?, dept: '椋庢箍鍏嶇柅绉?, deptDesc: '鐐庢€ц叞鑳岀棝鐨勫吀鍨嬭〃鐜帮紝涓庢満姊版€ц叞鐥涚浉鍙嶃€? },
                ],
            },
            shoulder: {
                keywords: ['鑲?, '鑲╄唨', '鑲╁叧鑺?],
                conditions: [
                    { name: '鑲╁懆鐐庯紙鍐荤粨鑲╋級', prob: '杈冮珮锛?0-60宀侊級', desc: '鑲╅儴鐤肩棝锛屽闂村姞閲嶏紝娲诲姩鍙楅檺锛堟⒊澶淬€佺┛琛ｅ洶闅撅級銆?, dept: '楠ㄧ / 搴峰绉?, deptDesc: '"浜斿崄鑲?锛屽鏁扮粡搴峰娌荤枟鍙仮澶嶃€? },
                    { name: '鑲╄鎹熶激', prob: '涓瓑', desc: '鑲╁叧鑺傜壒瀹氳搴︾柤鐥涙棤鍔涳紝鎵嬭噦涓婁妇鍥伴毦銆傚父鏈夊浼ゆ垨杩囧害浣跨敤鍙层€?, dept: '楠ㄧ / 杩愬姩鍖诲绉?, deptDesc: '鑲╄鑲岃叡鎹熶激锛屼弗閲嶈€呴渶鎵嬫湳淇銆? },
                ],
            },
        },
        redFlags: [
            { symptom: '鑵扮棝 + 鍙屼笅鑲㈡棤鍔?+ 澶у皬渚垮洶闅?, action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒鍙兘涓洪┈灏剧患鍚堝緛锛岄渶绱ф€ュ噺鍘嬫墜鏈紒' },
            { symptom: '鍗曚釜鍏宠妭绐佺劧鍓х儓绾㈣偪鐑棝', action: '灏藉揩灏辫瘖锛屽彲鑳戒负鐥涢鎬ユ€у彂浣滄垨鎰熸煋鎬у叧鑺傜値銆? },
            { symptom: '澶栦激鍚庡叧鑺傚墽鐥?鐣稿舰+鏃犳硶娲诲姩', action: '绔嬪嵆鍓嶅線鎬ヨ瘖楠ㄧ锛佸彲鑳戒负楠ㄦ姌鎴栬劚浣嶃€? },
        ],
    },

    // ----- 鐨偆缁嗗垎 -----
    skin: {
        subCategories: {
            hives: {
                keywords: ['椋庡洟', '鑽ㄩ夯鐤?, '涓€鐗囦竴鐗?, '榧撹捣', '椋庣柟鍧?],
                conditions: [
                    { name: '鎬ユ€ц崹楹荤柟', prob: '杈冮珮', desc: '鐨偆绐佺劧鍑虹幇澶у皬涓嶇瓑鐨勭孩鑹查鍥紝鍓х棐锛屽崟涓鍥?4灏忔椂鍐呮秷閫€浣嗘柊鍙戜笉鏂€傚涓庨鐗┿€佽嵂鐗┿€佹劅鏌撹繃鏁忔湁鍏炽€?, dept: '鐨偆绉?, deptDesc: '澶氭暟鍙嚜鎰堬紝浣嗘寔缁?6鍛ㄩ渶鎺掓煡鎱㈡€х梾鍥犮€? },
                ],
                redFlags: [
                    { symptom: '鑽ㄩ夯鐤?+ 鍛煎惛鍥伴毦/澹伴煶鍢跺搼/鍢村攪鑲胯儉', action: '绔嬪嵆鎷ㄦ墦120锛佸彲鑳戒负涓ラ噸杩囨晱鍙嶅簲锛堝枆澶存按鑲匡級锛? },
                ],
            },
            eczema: {
                keywords: ['婀跨柟', '绾㈡枒', '涓樼柟', '姘存场', '娓楁按', '缁撶梻'],
                conditions: [
                    { name: '婀跨柟/鐗瑰簲鎬х毊鐐?, prob: '杈冮珮', desc: '鐨偆骞茬嚗銆佺孩鏂戙€佷笜鐤广€佸墽鐑堢槞鐥掞紝鍙嶅鍙戜綔銆備笌閬椾紶杩囨晱浣撹川鐩稿叧銆?, dept: '鐨偆绉?, deptDesc: '婀跨柟闇€瑕侀暱鏈熺鐞嗭細淇濇箍+閬垮厤璇卞洜+鑽墿鎺у埗銆? },
                ],
            },
            rash: {
                keywords: ['绾㈢偣', '鐤瑰瓙', '鐨柟', '绾㈡枒'],
                conditions: [
                    { name: '鐥呮瘨鐤?, prob: '杈冮珮锛堜即鍙戠儹鏃讹級', desc: '鐥呮瘨鎰熸煋寮曡捣鐨勭毊鐤癸紝甯稿湪鍙戠儹鍚庡嚭鐜帮紝涓€鑸嚜鎰堛€?, dept: '鐨偆绉?/ 鍐呯', deptDesc: '澶氭暟鐥呮瘨鐤逛細鑷娑堥€€锛屼絾闇€鎺掗櫎鍏朵粬涓ラ噸鐤剧梾銆? },
                    { name: '鑽柟', prob: '闇€鎺掓煡', desc: '鐢ㄨ嵂鍚庡嚭鐜扮殑鐨柟锛岄渶鍥為【杩戞湡鐢ㄨ嵂鍙诧紙鍖呮嫭涓嵂鍜屼繚鍋ュ搧锛夈€?, dept: '鐨偆绉?, deptDesc: '鑽柟闇€绔嬪嵆鍋滅敤鍙枒鑽墿骞跺氨鍖汇€? },
                ],
            },
        },
    },

    // ----- 鍙戠儹缁嗗垎 -----
    fever: {
        subCategories: {
            acute: {
                keywords: ['绐佺劧', '鍒氬紑濮?, '鏄ㄥぉ', '浠婂ぉ', '鍒?],
                conditions: [
                    { name: '涓婂懠鍚搁亾鎰熸煋锛堟劅鍐?娴佹劅锛?, prob: '杈冮珮', desc: '鍙戠儹浼村捊鐥涖€佹祦娑曘€佸挸鍡姐€佸叏韬吀鐥涖€傛祦鎰熼€氬父楂樼儹锛?38.5掳C锛変笖鍏ㄨ韩鐥囩姸閲嶃€?, dept: '鍛煎惛鍐呯 / 鍙戠儹闂ㄨ瘖', deptDesc: '澶氫紤鎭€佸楗按锛屾祦鎰熸湁鐗规晥鎶楃梾姣掕嵂銆? },
                    { name: '鎬ユ€ц儍鑲犵値', prob: '涓瓑', desc: '鍙戠儹浼磋吂鐥涖€佽吂娉汇€佹伓蹇冨憰鍚愩€?, dept: '娑堝寲鍐呯', deptDesc: '娉ㄦ剰琛ユ恫锛屾竻娣￠ギ椋熴€? },
                ],
            },
            prolonged: {
                keywords: ['涓€鐩?, '鍙嶅', '涓嶉€€', '濂藉嚑澶?, '涓€鍛?, '濂藉嚑鍛?],
                conditions: [
                    { name: '涓嶆槑鍘熷洜鍙戠儹', prob: '闇€绯荤粺鎺掓煡', desc: '鍙戠儹瓒呰繃2-3鍛ㄦ湭鏄庣‘鐥呭洜锛岄渶瑕佷綇闄㈣繘琛岀郴缁熸鏌ワ細鎰熸煋銆佸厤鐤€佽偪鐦ょ瓑銆?, dept: '鍐呯 / 鎰熸煋绉?, deptDesc: '闇€浣忛櫌绯荤粺鎺掓煡銆備笉鍙嚜琛屾互鐢ㄦ姉鐢熺礌鍜岄€€鐑ц嵂銆? },
                ],
            },
        },
        redFlags: [
            { symptom: '浣撴俯>39.5掳C涓旈€€鐑ц嵂鏃犳晥', action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戞垨鍙戠儹闂ㄨ瘖锛? },
            { symptom: '鍙戠儹 + 鍛煎惛鍥伴毦/鎰忚瘑妯＄硦/鐨柟', action: '绔嬪嵆鎷ㄦ墦120鎴栧墠寰€鎬ヨ瘖绉戯紒' },
            { symptom: '濠村辜鍎匡紙<3涓湀锛夊彂鐑?, action: '绔嬪嵆灏卞尰锛佸皬濠村効鍙戠儹涓嶅彲杞昏銆? },
        ],
    },

    // ----- 澶存檿缁嗗垎 -----
    dizziness: {
        keywords: ['澶存檿', '鐪╂檿', '澶╂棆鍦拌浆', '绔欎笉绋?, '鏅?, '杩风硦', '鐪奸粦'],
        subCategories: {
            vertigo: {
                keywords: ['鏃嬭浆', '澶╂棆鍦拌浆', '杞湀', '鏅冨姩'],
                conditions: [
                    { name: '鑹€ч樀鍙戞€т綅缃€х湬鏅曪紙鑰崇煶鐥囷級', prob: '杈冮珮', desc: '澶撮儴浣嶇疆鏀瑰彉锛堢炕韬€佽捣搴娿€佷綆澶存姮澶达級鏃惰Е鍙戠煭鏆傜湬鏅曪紙<1鍒嗛挓锛夛紝涓嶄即鑰抽福鍚姏涓嬮檷銆?, dept: '鑰抽蓟鍠夌', deptDesc: '鏈€甯歌鐨勭湬鏅曠被鍨嬶紝鎵嬫硶澶嶄綅娌荤枟鏁堟灉寰堝ソ銆? },
                    { name: '姊呭凹鍩冪梾', prob: '涓瓑', desc: '鍙戜綔鎬х湬鏅曟寔缁?0鍒嗛挓鑷虫暟灏忔椂锛屼即鑰抽福銆佽€抽椃銆佸惉鍔涗笅闄嶃€?, dept: '鑰抽蓟鍠夌', deptDesc: '鍐呰€宠啘杩疯矾绉按鎵€鑷淬€? },
                ],
            },
            lightheaded: {
                keywords: ['澶存槒', '鏄忔矇', '杩风硦', '涓嶆竻閱?, '澶撮噸鑴氳交', '绔欎笉绋?],
                conditions: [
                    { name: '鑴戜緵琛€涓嶈冻/浣撲綅鎬т綆琛€鍘?, prob: '杈冮珮', desc: '韫蹭笅绔欒捣鏃剁溂鍓嶅彂榛戙€佸ご鏅曪紝鍙兘琛€鍘嬪亸浣庢垨棰堟闂瀵艰嚧銆?, dept: '绁炵粡鍐呯 / 蹇冨唴绉?, deptDesc: '闇€鎺掓煡蹇冭剳琛€绠￠棶棰樸€? },
                    { name: '璐', prob: '闇€鎺掓煡', desc: '鎸佺画澶存槒銆佷箯鍔涖€侀潰鑹茶媿鐧姐€佹椿鍔ㄥ悗蹇冩厡銆傞渶鏌ヨ甯歌銆?, dept: '琛€娑茬 / 鍐呯', deptDesc: '璐闇€鎵惧埌鍘熷洜锛堢己閾併€佸け琛€銆侀€犺闅滅绛夛級銆? },
                ],
            },
        },
    },

    // ----- 鍛煎惛绯荤粺缁嗗垎 -----
    respiratory: {
        keywords: ['鍜冲椊', '鍜崇棸', '骞插挸', '鍜宠', '鐥?, '鍜', '姘旂煭', '鍠?, '鍛煎惛鍥伴毦', '鑳搁椃'],
        subCategories: {
            acuteCough: {
                keywords: ['鍒氬紑濮?, '鍑犲ぉ', '鎰熷啋', '鏈€杩?],
                conditions: [
                    { name: '鎬ユ€т笂鍛煎惛閬撴劅鏌?, prob: '杈冮珮', desc: '鐥呮瘨鎰熸煋锛屽共鍜虫垨灏戦噺鐧界棸锛屼即娴佹稌鍜界棝锛屼竴鑸?-2鍛ㄨ嚜鎰堛€?, dept: '鍛煎惛鍐呯', deptDesc: '澶氫负鑷檺鎬э紝瀵圭棁娌荤枟鍗冲彲銆? },
                    { name: '鎬ユ€ф敮姘旂鐐?, prob: '涓瓑', desc: '鍜冲椊杈冨墽鐑堬紝鏈夌棸锛堥粍鎴栫櫧锛夛紝鍙即鑳搁椃銆?, dept: '鍛煎惛鍐呯', deptDesc: '濡備负缁嗚弻鎰熸煋闇€鎶楃敓绱犳不鐤椼€? },
                ],
            },
            chronicCough: {
                keywords: ['濂藉嚑鍛?, '涓€涓湀', '涓€鐩村挸', '鍙嶅', '寰堜箙', '鎱㈡€?],
                conditions: [
                    { name: '鍜冲椊鍙樺紓鎬у摦鍠?, prob: '杈冮珮', desc: '鎱㈡€у共鍜筹紙>8鍛級锛屽闂村拰鍑屾櫒鍔犻噸锛屾姉鐢熺礌鏃犳晥锛岃偤鍔熻兘妫€鏌ュ彲纭瘖銆?, dept: '鍛煎惛鍐呯', deptDesc: '浠ュ挸鍡戒负鍞竴鐥囩姸鐨勫摦鍠橈紝闇€鍚稿叆婵€绱犳不鐤椼€? },
                    { name: '鑳冮绠″弽娴佹€у挸鍡?, prob: '涓瓑', desc: '鎱㈡€у挸鍡戒笌杩涢銆佸钩鍗х浉鍏筹紝鍙兘浼寸儳蹇冨弽閰搞€?, dept: '娑堝寲鍐呯 / 鍛煎惛鍐呯', deptDesc: '鍙嶆祦鐗╁埡婵€鍜藉枆寮曡捣鐨勫挸鍡姐€? },
                    { name: '涓婃皵閬撳挸鍡界患鍚堝緛', prob: '涓瓑', desc: '榧荤値/榧荤鐐庡紩璧烽蓟娑曞€掓祦鍒烘縺鍜藉枆瀵艰嚧鍜冲椊銆?, dept: '鑰抽蓟鍠夌', deptDesc: '娌荤枟榧荤値/榧荤鐐庡悗鍜冲椊鍙紦瑙ｃ€? },
                ],
            },
        },
        redFlags: [
            { symptom: '鍜宠锛堢棸涓甫琛€鎴栨暣鍙ｈ鐥帮級', action: '闇€灏藉揩灏辫瘖鍛煎惛鍐呯锛屽仛鑳搁儴褰卞儚瀛︽鏌ワ紝鎺掗櫎缁撴牳鎴栬偪鐦ゃ€? },
            { symptom: '鍛煎惛鍥伴毦/鍠橀福鏄庢樉锛屾棤娉曞钩鍗?, action: '绔嬪嵆鍓嶅線鎬ヨ瘖绉戯紒鍙兘鏄摦鍠樻€ユ€у彂浣滄垨蹇冭“銆? },
        ],
    },
};

// ==================== 淇℃伅鎻愬彇鍣?====================

/**
 * 浠庣敤鎴疯緭鍏ヤ腑鎻愬彇缁村害淇℃伅
 */
function extractInfo(input) {
    const text = input.toLowerCase();
    const info = {};

    // 鎻愬彇閮ㄤ綅
    const locationPatterns = [
        { dim: 'bodyPart', match: '鍙充笂鑵箌鍙充笂閮▅鍙宠竟鑲氬瓙闈犱笂|鑲濆尯', value: '鍙充笂鑵? },
        { dim: 'bodyPart', match: '宸︿笂鑵箌宸︿笂閮▅宸﹁竟鑲氬瓙闈犱笂', value: '宸︿笂鑵? },
        { dim: 'bodyPart', match: '鍙充笅鑵箌鍙充笅閮▅鍙宠竟鑲氬瓙闈犱笅', value: '鍙充笅鑵? },
        { dim: 'bodyPart', match: '宸︿笅鑵箌宸︿笅閮▅宸﹁竟鑲氬瓙闈犱笅', value: '宸︿笅鑵? },
        { dim: 'bodyPart', match: '涓婅吂|鑳冮儴|蹇冪獫|涓笂鑵箌鑲氬瓙涓婅竟|涓婅吂閮?, value: '涓笂鑵? },
        { dim: 'bodyPart', match: '涓嬭吂|灏忚吂|灏忚倸瀛恷鑲氳剱涓媩涓嬭吂閮?, value: '涓嬭吂' },
        { dim: 'bodyPart', match: '鑲氳剱|鑴愬懆|鑲氳剱鐪?, value: '鑴愬懆' },
        { dim: 'bodyPart', match: '鍏ㄨ吂|鏁翠釜鑲氬瓙', value: '鍏ㄨ吂' },
        { dim: 'bodyPart', match: '鍓嶉|棰濆ご|鐪夊績', value: '鍓嶉' },
        { dim: 'bodyPart', match: '澶槼绌磡棰為儴|鍋忓ご', value: '澶槼绌村尯鍩? },
        { dim: 'bodyPart', match: '鍚庤剳鍕簗鍚庢灂|鍚庨', value: '鍚庤剳鍕? },
        { dim: 'bodyPart', match: '鑳搁鍚巪鑳稿彛姝ｄ腑', value: '鑳搁鍚? },
        { dim: 'bodyPart', match: '宸﹁兏|蹇冨墠鍖簗蹇冨彛|宸︿晶鑳?, value: '宸﹁兏/蹇冨墠鍖? },
        { dim: 'bodyPart', match: '鑶潀鑶濈洊', value: '鑶濆叧鑺? },
        { dim: 'bodyPart', match: '鎵嬫寚|鎸囧叧鑺倈鎵嬪叧鑺?, value: '鎵嬫寚鍏宠妭' },
        { dim: 'bodyPart', match: '鑵皘鑳寍鑴婃煴|鑵版|鍚庤儗', value: '鑵?鑳? },
        { dim: 'bodyPart', match: '鑲﹟鑲╄唨|鑲╁叧鑺?, value: '鑲╁叧鑺? },
        { dim: 'bodyPart', match: '棰坾鑴栧瓙', value: '棰堥儴' },
        { dim: 'bodyPart', match: '鍠夊挋|鍜絴鍡撳瓙|鍜藉枆', value: '鍜藉枆' },
        { dim: 'bodyPart', match: '榧诲瓙|榧昏厰|榧荤', value: '榧婚儴' },
        { dim: 'bodyPart', match: '鑰虫湹|鑰?, value: '鑰抽儴' },
        { dim: 'bodyPart', match: '鐗檤鐗欓緢|鍙ｈ厰|鐗欓娇', value: '鐗?鍙ｈ厰' },
        { dim: 'bodyPart', match: '鐪肩潧|鐪紎瑙嗗姏', value: '鐪奸儴' },
        { dim: 'bodyPart', match: '鐨偆|韬笂|鍏ㄨ韩', value: '鐨偆' },
        { dim: 'bodyPart', match: '灏忚吂|鑶€鑳眧灏块亾|灏忎究|灏?, value: '娉屽翱鍖哄煙' },
    ];

    for (const p of locationPatterns) {
        if (new RegExp(p.match).test(text)) {
            info.bodyPart = p.value;
            break;
        }
    }

    // 鎻愬彇鐤肩棝鎬ц川
    const painTypePatterns = [
        { match: '缁炵棝|鎷х潃|涓€闃典竴闃祙鐥夋寷|鎶芥悙', value: '缁炵棝/鐥夋寷' },
        { match: '閽濈棝|闂风棝|闅愰殣|閰哥棝|鑳€鐥泑鑳€', value: '閽濈棝/闂疯儉' },
        { match: '鐏肩儳|鐑у績|鐏荆|鐑х伡鎰?, value: '鐏肩儳鎰? },
        { match: '閽堝埡|鍒虹棝|閽堟墡|閿愬埄|鍒€鍓瞸鎾曡', value: '鍒虹棝/閿愮棝' },
        { match: '璺崇棝|鎼忓姩|涓€璺充竴璺硘琛€绠¤烦', value: '鎼忓姩鎬х柤鐥? },
        { match: '鍘嬭揩|鍘嬫Θ|閲嶇墿|绱х畭|鍕抾鍙戠揣', value: '鍘嬭揩鎰?绱х畭鎰? },
        { match: '閰歌儉|鑳€鐥?, value: '閰歌儉/鑳€鐥? },
        { match: '楹绘湪|鍙戦夯|楹?, value: '楹绘湪' },
        { match: '鐥抾鐦欑棐', value: '鐦欑棐' },
    ];
    for (const p of painTypePatterns) {
        if (new RegExp(p.match).test(text)) {
            info.painType = p.value;
            break;
        }
    }

    // 鎻愬彇鎸佺画鏃堕棿
    const durationPatterns = [
        { match: '鍑犲垎閽焲鍑犵|鐭殏', value: '鐭殏锛堝嚑鍒嗛挓鍐咃級' },
        { match: '鍑犲皬鏃秥鍗婂ぉ|鍗婂ぉ浜?, value: '鏁板皬鏃讹紙鍗婂ぉ鍐咃級' },
        { match: '涓€澶﹟1澶﹟鏄ㄥぉ|浠婂ぉ', value: '绾?澶? },
        { match: '涓や笁澶﹟鍑犲ぉ|2.*澶﹟3.*澶?, value: '2-3澶? },
        { match: '涓€鍛▅涓€鏄熸湡|7澶﹟涓€鍛ㄤ簡', value: '绾︿竴鍛? },
        { match: '鍑犲懆|濂藉嚑鍛▅涓や笁鍛▅涓や笁鏄熸湡', value: '鏁板懆' },
        { match: '涓€涓湀|1涓湀|涓€涓鏈?, value: '1涓湀浠ヤ笂' },
        { match: '鍑犱釜鏈坾濂藉嚑.*鏈坾寰堥暱鏃堕棿', value: '鏁版湀' },
        { match: '鍙嶅|鏂柇缁画|鏃跺ソ鏃跺潖|缁忓父', value: '鍙嶅鍙戜綔' },
        { match: '涓€鐩磡鎸佺画|涓嶉棿鏂瓅鑰佹槸杩欐牱', value: '鎸佺画鎬? },
    ];
    for (const p of durationPatterns) {
        if (new RegExp(p.match).test(text)) {
            info.duration = p.value;
            break;
        }
    }

    // 鎻愬彇浼撮殢鐥囩姸
    const accompanyKeywords = {
        nausea:    ['鎭跺績', '鎯冲悙', '骞插憰', '鍙嶈儍'],
        vomit:     ['鍛曞悙', '鍚愪簡', '鍚愬嚭鏉?],
        fever:     ['鍙戠儳', '鍙戠儹', '浣撴俯', '楂樼儳', '浣庣儳', '鍙戠儷'],
        diarrhea:  ['鑵规郴', '鎷夎倸瀛?, '鎷夌█', '姘存牱渚?, '绋€渚?],
        constipate:['渚跨', '鎷変笉鍑?, '澶т究骞?, '鎺掍究鍥伴毦'],
        dizzy:     ['澶存檿', '鐪╂檿', '澶╂棆鍦拌浆', '绔欎笉绋?],
        headache:  ['澶寸棝', '澶寸柤', '澶磋儉'],
        fatigue:   ['涔忓姏', '娌″姏姘?, '鐤叉儷', '娌＄簿绁?, '绱?, '铏氬急'],
        appetite:  ['娌¤儍鍙?, '涓嶆兂鍚?, '椋熸', '鍚冧笉涓?],
        sweat:     ['鍑哄喎姹?, '鐩楁睏', '澶ф睏'],
        palpitate: ['蹇冩厡', '蹇冩偢', '蹇冭烦蹇?],
        cough:     ['鍜冲椊', '鍜崇棸', '骞插挸'],
        breath:    ['姘旂煭', '姘斾績', '鍛煎惛鍥伴毦', '鍠樹笉涓婃皵'],
        neuro:     ['鎵嬮夯', '鑴氶夯', '鑲綋鏃犲姏', '鍙ｉ娇涓嶆竻', '鑴告'],
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

    // 鎻愬彇涓ラ噸绋嬪害
    if (/宸ㄧ棝|鍓х棝|鐤煎緱瑕佸懡|鐤兼浜唡鍙椾笉浜唡10鍒唡[89]鍒唡鏃犳硶蹇嶅彈/.test(text)) {
        info.severity = '閲嶅害';
    } else if (/寰堢柤|鎸虹柤|姣旇緝鐤紎鏄庢樉|褰卞搷.*鐫[5-7]鍒?.test(text)) {
        info.severity = '涓害';
    } else if (/鏈夌偣|杞诲井|闅愰殣|绋嶅井|涓嶄弗閲峾[1-4]鍒唡鑳藉繊/.test(text)) {
        info.severity = '杞诲害';
    }

    // 鎻愬彇璇卞彂鍥犵礌
    const triggerPatterns = [
        { match: '楗悗|鍚冨畬楗瓅鍚冧笢瑗垮悗|椁愬悗|杩涢鍚?, value: '楗悗鍔犻噸' },
        { match: '绌鸿吂|楗縷楗墠|娌″悆楗瓅楗ラタ', value: '绌鸿吂鏃跺嚭鐜? },
        { match: '鍔崇疮|绱簡|杩愬姩|娲诲姩|璧拌矾|涓婃ゼ', value: '鍔崇疮/娲诲姩鏃跺姞閲? },
        { match: '浼戞伅|韬虹潃|鍧愮潃', value: '浼戞伅鏃剁紦瑙? },
        { match: '鍘嬪姏|绱у紶|鍔犵彮|鐔|鐫＄湢', value: '鍘嬪姏/鐫＄湢鐩稿叧' },
        { match: '鏈堢粡|缁忔湡|渚嬪亣|澶уЖ濡?, value: '涓庢湀缁忓懆鏈熺浉鍏? },
        { match: '鍠濋厭|楗厭|鍚冧簡.*鑽瘄娌硅吇|杈涜荆|鐢熷喎|涓嶅共鍑€', value: '楗鐩稿叧' },
        { match: '鎰熷啋|鍙楀噳|鐫€鍑墊鍚归|鍙樺ぉ', value: '鎰熸煋/鍙楀噳鍚? },
        { match: '鍙椾激|鎽斿€抾鎵瓅鎾瀨纰?, value: '澶栦激鍚? },
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
 * 鍒ゆ柇淇℃伅鏄惁鍏呭垎
 */
function calcInfoScore(info, templateArea, askedDims) {
    // 鍏抽敭缁村害锛氶儴浣嶃€佺柤鐥涙€ц川銆佹寔缁椂闂淬€佷即闅忕棁鐘?    const keyDims = ['bodyPart', 'painType', 'duration'];
    const importantDims = ['accompany', 'triggers', 'severity'];

    // 瀵逛簬鐨偆绫伙紝閮ㄤ綅涓嶅お閲嶈
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

    // 宸茬煡缁村害 + 宸查棶杩囦絾鏈瓟 = 鎴戜滑璁や负瓒冲
    return {
        knownDimCount: knownCount + extraCount,
        missingDims: dimsNeeded.filter(d => !info[d] && !askedDims.has(d)),
        isSufficient: (knownCount >= dimsNeeded.length - 1) || (knownCount + extraCount >= 3),
    };
}

// ==================== 杩介棶寮曟搸 ====================

/**
 * 鎵惧嚭鏈€鍖归厤鐨勭棁鐘舵ā鏉? */
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
 * 鏋勫缓杩介棶娑堟伅
 */
function buildFollowupMessage(templateArea, missingDims, askedDims) {
    const template = FOLLOWUP_TEMPLATES[templateArea] || FOLLOWUP_TEMPLATES.general;

    // 鎵惧嚭杩樻病闂繃鐨勫叧閿棶棰?    let availableQuestions = template.questions.filter(q => !askedDims.has(q.dim));

    // 浼樺厛闂?missingDims 涓彁鍒扮殑缁村害
    if (missingDims.length > 0) {
        const priorityQuestions = availableQuestions.filter(q => missingDims.includes(q.dim));
        if (priorityQuestions.length > 0) {
            availableQuestions = priorityQuestions;
        }
    }

    // 鏈€澶氶棶3涓棶棰?    const selectedQuestions = availableQuestions.slice(0, 3);

    let html = `<p>涓轰簡缁欐偍鏇村噯纭殑鍒ゆ柇锛屾垜闇€瑕佸啀浜嗚В鍑犱釜缁嗚妭锛?/p>`;
    html += `<div class="followup-card">`;
    html += `<div class="followup-title">馃攳 璇疯ˉ鍏呬互涓嬩俊鎭細</div>`;
    html += `<ul class="followup-questions">`;
    for (let i = 0; i < selectedQuestions.length; i++) {
        html += `<li><span class="q-icon">${i + 1}.</span> ${selectedQuestions[i].text}</li>`;
    }
    html += `</ul>`;
    html += `<div class="followup-hint">馃挕 閫愪竴鍥炵瓟浠ヤ笂闂鍗冲彲锛岃秺璇︾粏鍒ゆ柇瓒婂噯纭?/div>`;
    html += `</div>`;

    // 杩斿洖閫変腑鐨勯棶棰樼淮搴︼紝浠ヤ究璁板綍宸查棶
    return { html, askedDims: selectedQuestions.map(q => q.dim) };
}

// ==================== 璇婃柇寮曟搸 ====================

/**
 * 缁煎悎鎵€鏈夊凡鏀堕泦淇℃伅杩涜璇婃柇
 */
function runDiagnosis(collectedInput, templateArea) {
    const combinedText = collectedInput.toLowerCase();

    // 1. 鏌ユ壘璇︾粏鐭ヨ瘑搴?    const detailKB = DETAILED_KNOWLEDGE[templateArea];

    let allResults = [];
    let allRedFlags = [];
    let painTypeHint = null;

    if (detailKB) {
        // 鎻愬彇閮ㄤ綅瀛愮被鍒?        if (detailKB.subCategories) {
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

        // 鎻愬彇鐤肩棝鎬ц川鏄犲皠
        const extractedInfo = extractInfo(combinedText);
        if (detailKB.painTypeMapping && extractedInfo.painType) {
            for (const [typeKey, typeData] of Object.entries(detailKB.painTypeMapping)) {
                if (extractedInfo.painType.includes(typeKey) || combinedText.includes(typeKey)) {
                    painTypeHint = typeData;
                    break;
                }
            }
        }

        // 鎻愬彇绾㈣壊鏃楁爣
        if (detailKB.redFlags) {
            allRedFlags = detailKB.redFlags.filter(f => {
                const kw = f.symptom.substring(0, 4).replace(/[锛屻€傦紒锛熴€乗s]/g, '');
                return combinedText.includes(kw.substring(0, 2));
            });
        }
    }

    // 濡傛灉娌℃湁鍖归厤鍒板瓙绫诲埆锛屼娇鐢ㄦ暣涓尯鍩熺殑閫氱敤鏉′欢
    if (allResults.length === 0 && detailKB) {
        for (const [subKey, subCat] of Object.entries(detailKB.subCategories)) {
            for (const cond of subCat.conditions) {
                allResults.push({ ...cond, subCategory: subKey, matchScore: 0 });
            }
        }
    }

    // 2. 濡傛灉璇︾粏鐭ヨ瘑搴撲篃娌℃湁锛屽洖閫€鍒板閮ㄧ煡璇嗗簱 (浣跨敤鏃х増閫氱敤鍖归厤)
    if (allResults.length === 0) {
        return runLegacyDiagnosis(combinedText);
    }

    // 鍘婚噸
    const seen = new Set();
    const uniqueResults = [];
    for (const r of allResults) {
        if (!seen.has(r.name)) {
            seen.add(r.name);
            uniqueResults.push(r);
        }
    }
    uniqueResults.sort((a, b) => b.matchScore - a.matchScore);

    // 纭畾涓昏璇婃柇
    const primaryDiagnosis = uniqueResults.length > 0 ? uniqueResults[0] : null;
    const differential = uniqueResults.slice(1, Math.min(uniqueResults.length, 4));

    // 纭畾绉戝
    let department = null;
    if (primaryDiagnosis) {
        department = { name: primaryDiagnosis.dept, desc: primaryDiagnosis.deptDesc };
    }

    // 鍒ゆ柇涓ラ噸绋嬪害
    let severity = 'mild';
    if (allRedFlags.length > 0) severity = 'urgent';
    else {
        const extInfo = extractInfo(combinedText);
        if (extInfo.severity === '閲嶅害' || extInfo.duration === '鎸佺画鎬? || combinedText.includes('鍙椾笉浜?)) {
            severity = 'moderate';
        }
    }

    // 涓嬩竴姝ュ缓璁?    let nextSteps;
    if (severity === 'urgent') {
        nextSteps = [
            '璇风珛鍗虫嫧鎵?20鎬ユ晳鐢佃瘽鎴栧墠寰€鏈€杩戠殑鎬ヨ瘖绉戯紒',
            '鍛婄煡韬竟浜烘偍鐨勬儏鍐碉紝涓嶈鐙嚜鍓嶅線鍖婚櫌',
            '淇濇寔鐢佃瘽鐣呴€氾紝鍑嗗濂藉尰淇濆崱鍜岃韩浠借瘉',
        ];
    } else {
        nextSteps = [
            `寤鸿鍓嶅線<strong>${department ? department.name : '鐩稿叧绉戝'}</strong>灏辫瘖`,
            '灏辫瘖鍓嶆暣鐞嗗ソ鐥囩姸鍙樺寲鏃堕棿绾匡紝鏂逛究鍖荤敓蹇€熶簡瑙ｇ梾鎯?,
            '甯︿笂鏃㈠線鐥呭巻銆佹鍦ㄦ湇鐢ㄧ殑鑽墿锛堝寘鎷繚鍋ュ搧锛?,
            '濡傛湁杩戞湡浣撴鎶ュ憡鎴栧寲楠屽崟锛屼竴骞舵惡甯?,
            '鍙€氳繃鎴戦櫌寰俊鍏紬鍙锋垨瀹樼綉棰勭害鎸傚彿',
        ];
    }

    return {
        primaryDiagnosis: primaryDiagnosis ? `${primaryDiagnosis.name}锛?{primaryDiagnosis.prob}锛塦 : '闇€杩涗竴姝ユ鏌ョ‘璁?,
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
 * 鏃х増閫氱敤璇婃柇锛堝厹搴曟柟妗堬級
 */
function runLegacyDiagnosis(input) {
    // 绠€鍖栫増鍏抽敭璇嶅尮閰?    const areaMap = {
        '澶?: { dept: '绁炵粡鍐呯', desc: '澶寸棝銆佸ご鏅曠浉鍏崇柧鐥呫€? },
        '鑳竱蹇?: { dept: '蹇冨唴绉?, desc: '蹇冭绠＄郴缁熺柧鐥呫€? },
        '鑵箌鑳億鑲爘鑲?: { dept: '娑堝寲鍐呯', desc: '娑堝寲绯荤粺鐤剧梾銆? },
        '鍏宠妭|鑶潀鑵皘鑳寍鑲?: { dept: '楠ㄧ', desc: '楠ㄩ鑲岃倝绯荤粺鐤剧梾銆? },
        '鐨偆|鐤箌鐥?: { dept: '鐨偆绉?, desc: '鐨偆鐩稿叧鐤剧梾銆? },
        '鍜硘鐥皘鍠榺鍛煎惛': { dept: '鍛煎惛鍐呯', desc: '鍛煎惛绯荤粺鐤剧梾銆? },
        '灏縷灏忎究': { dept: '娉屽翱澶栫', desc: '娉屽翱绯荤粺鐤剧梾銆? },
    };

    let dept = { name: '鍏ㄧ闂ㄨ瘖', desc: '鍙厛鍒板叏绉戦棬璇婅繘琛屽垵姝ヨ瘎浼帮紝蹇呰鏃惰浆涓撶銆? };
    for (const [pattern, d] of Object.entries(areaMap)) {
        if (new RegExp(pattern).test(input)) {
            dept = d;
            break;
        }
    }

    return {
        primaryDiagnosis: '闇€杩涗竴姝ユ鏌ョ‘璁わ紙淇℃伅涓嶈冻锛?,
        diagnosisDesc: '鏍规嵁鎮ㄧ洰鍓嶇殑鎻忚堪锛屽缓璁厛鍒扮浉搴旂瀹よ鍖荤敓杩涜璇︾粏闂瘖鍜屾鏌ャ€?,
        differential: [],
        department: dept,
        severity: 'mild',
        redFlags: [],
        nextSteps: [
            `寤鸿鍓嶅線<strong>${dept.name}</strong>灏辫瘖`,
            '灏辫瘖鏃惰璇︾粏鎻忚堪鎮ㄧ殑鐥囩姸',
            '鍙€氳繃鎴戦櫌寰俊鍏紬鍙锋垨瀹樼綉棰勭害鎸傚彿',
        ],
        painTypeHint: null,
        collectedInfo: {},
    };
}

// ==================== 椤甸潰鐘舵€佺鐞?====================

// 瀵硅瘽鐘舵€?let state = {
    collectedInput: '',      // 鎵€鏈夌敤鎴疯緭鍏ユ嫾鎺?    askedDims: new Set(),    // 宸查棶杩囩殑缁村害
    turnCount: 0,            // 瀵硅瘽杞
    templateArea: 'general', // 褰撳墠鐥囩姸妯℃澘
    diagnosisDone: false,    // 鏄惁宸插畬鎴愯瘖鏂?    currentRecord: null,     // 褰撳墠鐥呭巻
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

// ==================== UI 鍏冪礌 ====================

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

// ==================== 涓绘祦绋?====================

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

        // 绗竴杞細纭畾妯℃澘鍖哄煙
        if (state.turnCount === 1) {
            state.templateArea = findTemplate(text);
        } else {
            // 鍚庣画杞锛屽鏋滄柊杈撳叆鏀瑰彉浜嗘ā鏉匡紝鏇存柊
            const newTemplate = findTemplate(text);
            if (newTemplate !== 'general' && newTemplate !== state.templateArea) {
                state.templateArea = newTemplate;
            }
        }

        const currentInfo = extractInfo(state.collectedInput);
        const sufficiency = calcInfoScore(currentInfo, state.templateArea, state.askedDims);

        // 鏇存柊宸查棶缁村害
        // 閫氳繃妫€鏌ュ凡闂繃鐨勬秷鎭被鍨嬫帹鏂?
        console.log('Turn:', state.turnCount, 'Sufficiency:', sufficiency, 'Template:', state.templateArea);

        // 鍒ゆ柇鏄惁缁х画杩介棶
        if (!sufficiency.isSufficient && state.turnCount < 3 && sufficiency.missingDims.length > 0) {
            // 闇€瑕佽拷闂?            const followup = buildFollowupMessage(state.templateArea, sufficiency.missingDims, state.askedDims);
            for (const dim of followup.askedDims) {
                state.askedDims.add(dim);
            }
            addMessage('bot', followup.html);
            updateRecordPanel(null);
        } else {
            // 淇℃伅瓒冲锛屽紑濮嬭瘖鏂?            state.diagnosisDone = true;
            const diagnosis = runDiagnosis(state.collectedInput, state.templateArea);

            // 鏄剧ず鏀堕泦鐨勪俊鎭憳瑕?            showCollectedInfo(currentInfo);

            // 鏄剧ず璇婃柇缁撴灉
            setTimeout(() => {
                showDiagnosisResult(diagnosis);
            }, 400);
        }
    }, 700 + Math.random() * 500);
}

// ==================== 缁撴灉鏄剧ず ====================

function showCollectedInfo(info) {
    const parts = [];
    if (info.bodyPart) parts.push({ key: '閮ㄤ綅', val: info.bodyPart });
    if (info.painType) parts.push({ key: '鎬ц川', val: info.painType });
    if (info.duration) parts.push({ key: '鏃堕暱', val: info.duration });
    if (info.severity) parts.push({ key: '绋嬪害', val: info.severity });
    if (info.triggers) parts.push({ key: '璇卞洜', val: info.triggers });
    if (info.accompany) {
        const accMap = {
            nausea: '鎭跺績', vomit: '鍛曞悙', fever: '鍙戠儹', diarrhea: '鑵规郴',
            constipate: '渚跨', dizzy: '澶存檿', headache: '澶寸棝', fatigue: '涔忓姏',
            appetite: '椋熸鍑忛€€', sweat: '鍑烘睏', palpitate: '蹇冩厡', cough: '鍜冲椊',
            breath: '鍛煎惛鍥伴毦', neuro: '绁炵粡鐥囩姸',
        };
        const accLabels = info.accompany.split(',').map(k => accMap[k] || k).join('銆?);
        parts.push({ key: '浼撮殢', val: accLabels });
    }

    if (parts.length > 0) {
        let html = '<p>鉁?宸叉敹闆嗗埌浠ヤ笅淇℃伅锛?/p>';
        html += `<div class="collected-info">`;
        for (const p of parts) {
            html += `<span class="info-item"><span class="info-key">${p.key}:</span> <span class="info-val">${p.val}</span></span>`;
        }
        html += `</div>`;
        html += `<p>鏍规嵁浠ヤ笂淇℃伅锛屾垜鐨勫垎鏋愬涓嬶細</p>`;
        addMessage('bot', html);
    }
}

function showDiagnosisResult(diagnosis) {
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const record = {
        date: dateStr,
        chiefComplaint: diagnosis.collectedInfo?.bodyPart
            ? `${diagnosis.collectedInfo.bodyPart}${diagnosis.collectedInfo.painType || '涓嶉€?}`
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

    // ----- 绾㈣壊璀︾ず浼樺厛鏄剧ず -----
    if (diagnosis.redFlags.length > 0) {
        for (const flag of diagnosis.redFlags) {
            let html = `<div style="background:#fee2e2;border-left:4px solid #ef4444;padding:10px 14px;border-radius:0 8px 8px 0;margin-bottom:8px;">`;
            html += `<p style="color:#991b1b;font-weight:700;margin:0;">馃毃 璀︾ず锛?{flag.symptom}</p>`;
            html += `<p style="color:#991b1b;margin:4px 0 0 0;font-size:13px;">${flag.action}</p>`;
            html += `</div>`;
            addMessage('bot', html);
        }
    }

    // ----- 涓昏璇婃柇 -----
    let html = `<p style="font-weight:700;font-size:16px;">馃攳 鍒濇璇婃柇锛?span style="color:#0d9488;">${diagnosis.primaryDiagnosis}</span></p>`;
    html += `<p style="font-size:14px;color:var(--text-secondary);">${diagnosis.diagnosisDesc}</p>`;

    // 鐤肩棝鎬ц川鎻愮ず
    if (diagnosis.painTypeHint) {
        html += `<p style="font-size:13px;color:#64748b;margin-top:6px;">馃挕 ${diagnosis.painTypeHint.hint}</p>`;
    }

    // 閴村埆璇婃柇
    if (diagnosis.differential.length > 0) {
        html += `<p style="margin-top:8px;font-size:14px;">鍏朵粬闇€瑕佽€冭檻鐨勫彲鑳斤細<strong>${diagnosis.differential.join('銆?)}</strong></p>`;
    }

    addMessage('bot', html);

    // ----- 鐥呭巻鍗＄墖 -----
    setTimeout(() => {
        addMessage('bot', buildRecordCard(record));
    }, 300);

    // ----- 绉戝鎺ㄨ崘 -----
    setTimeout(() => {
        if (record.department) {
            addMessage('bot', buildDeptCard(record));
        }
    }, 500);

    // ----- 涓嬩竴姝ュ缓璁?-----
    setTimeout(() => {
        addMessage('bot', buildStepsCard(record));
        updateRecordPanel(record);
    }, 700);
}

function buildRecordCard(record) {
    const severityLabel = { mild: '馃煝 涓€鑸?, moderate: '馃煛 闇€鍏虫敞', urgent: '馃敶 绱ф€? };
    let html = `<div class="record-inline-header">馃搵 鐢靛瓙鐥呭巻锛堥璇婏級</div>`;
    html += `<div style="padding:16px 18px;">`;
    html += `<div class="record-field"><span class="field-label">灏辫瘖鏃堕棿</span><span class="field-value">${record.date}</span></div>`;
    html += `<div class="record-field"><span class="field-label">涓昏瘔</span><span class="field-value">${record.chiefComplaint}</span></div>`;
    html += `<div class="record-field"><span class="field-label">鐜扮梾鍙?/span><span class="field-value" style="font-size:13px;">${record.presentIllness}</span></div>`;
    html += `<div class="record-field"><span class="field-label">鍒濇璇婃柇</span><span class="field-value" style="color:#0d9488;font-weight:700;">${record.primaryDiagnosis}</span></div>`;
    if (record.differential.length > 0) {
        html += `<div class="record-field"><span class="field-label">閴村埆璇婃柇</span><span class="field-value">${record.differential.join('銆?)}</span></div>`;
    }
    html += `<div class="record-field"><span class="field-label">涓ラ噸绋嬪害</span><span class="field-value">${severityLabel[record.severity]}</span></div>`;
    html += `</div>`;
    return `<div class="record-inline">${html}</div>`;
}

function buildDeptCard(record) {
    let html = '';
    if (record.severity === 'urgent') {
        html += `<div style="background:#fee2e2;border:2px solid #ef4444;border-radius:12px;padding:14px 18px;">`;
        html += `<p style="font-weight:700;color:#991b1b;margin:0;">馃毃 璇风珛鍗冲墠寰€鎬ヨ瘖绉戯紒</p>`;
        html += `<p style="color:#991b1b;margin:6px 0 0 0;font-size:14px;">${record.department.name} 鈥?${record.department.desc}</p>`;
        html += `</div>`;
    } else {
        html += `<div style="background:#ecfdf5;border:2px solid #a7f3d0;border-radius:12px;padding:14px 18px;">`;
        html += `<p style="font-weight:700;color:#065f46;margin:0;font-size:16px;">馃彞 鎺ㄨ崘绉戝锛?{record.department.name}</p>`;
        html += `<p style="color:#047857;margin:4px 0 0 0;font-size:14px;">${record.department.desc}</p>`;
        html += `</div>`;
    }
    return html;
}

function buildStepsCard(record) {
    let html = `<p style="font-weight:700;">馃搶 涓嬩竴姝ュ缓璁細</p>`;
    html += `<div class="steps-inline">`;
    record.nextSteps.forEach((step, i) => {
        html += `<div class="step-item"><span class="step-num">${i + 1}</span><span>${step}</span></div>`;
    });
    html += `</div>`;

    if (record.severity !== 'urgent') {
        html += `<p style="margin-top:12px;font-size:14px;color:#64748b;">馃挕 鎻愮ず锛氭偍鍙互閫氳繃鎴戦櫌寰俊鍏紬鍙凤紙涓冧竷鍖婚櫌锛夋垨瀹樼綉棰勭害鎸傚彿銆傛湰棰勮瘖缁撴灉浠呬緵鍙傝€冿紝璇蜂互瀹為檯鍖荤敓璇婃柇涓哄噯銆?/p>`;
    }

    return html;
}

// ==================== 鍙充晶闈㈡澘鏇存柊 ====================

function updateRecordPanel(record) {
    if (!record || !record.department) {
        recordCard.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">馃摑</div>
                <p>${state.turnCount > 0 ? '姝ｅ湪鏀堕泦涓紝璇风户缁洖绛斺€︹€? : '瀹屾垚闂瘖鍚庯紝鐥呭巻涓庡氨鍖诲缓璁皢鏄剧ず鍦ㄨ繖閲?}</p>
            </div>`;
        recordStatus.textContent = state.turnCount > 0 ? '鏀堕泦涓€? : '绛夊緟闂瘖';
        recordStatus.className = 'badge waiting';
        deptCard.style.display = 'none';
        nextSteps.style.display = 'none';
        actionButtons.style.display = 'none';
        return;
    }

    recordStatus.textContent = '棰勮瘖瀹屾垚';
    recordStatus.className = 'badge ready';

    const severityLabel = { mild: '馃煝 涓€鑸?, moderate: '馃煛 闇€鍏虫敞', urgent: '馃敶 绱ф€? };
    let html = '<div class="record-filled">';

    html += `<h3>馃搵 鍩烘湰淇℃伅</h3>`;
    html += `<div class="info-row"><span class="label">灏辫瘖鏃堕棿</span><span class="value">${record.date}</span></div>`;
    html += `<div class="info-row"><span class="label">涓ラ噸绋嬪害</span><span class="value">${severityLabel[record.severity]}</span></div>`;

    html += `<h3>馃棧锔?涓昏瘔</h3>`;
    html += `<p style="font-size:14px;color:var(--text);">${record.chiefComplaint}</p>`;

    html += `<h3>馃攳 鍒濇璇婃柇</h3>`;
    html += `<span class="diagnosis-tag">${record.primaryDiagnosis}</span>`;
    for (const d of record.differential) {
        html += `<span class="diagnosis-tag" style="background:#e8f0fe;color:#1a56db;">${d}</span>`;
    }

    html += `<h3>馃摑 鐜扮梾鍙?/h3>`;
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

// ==================== 娑堟伅娓叉煋 ====================

function addMessage(type, content) {
    const div = document.createElement('div');
    div.className = `message ${type}`;
    const avatar = type === 'user' ? '馃' : '馃懆鈥嶁殨锔?;
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
        <div class="message-avatar">馃懆鈥嶁殨锔?/div>
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

// ==================== 浜嬩欢 ====================

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
            <div class="message-avatar">馃懆鈥嶁殨锔?/div>
            <div class="message-bubble">
                <p>鎮ㄥソ锛屾垜鏄竷涓冨尰闄㈢殑 AI 棰勮瘖鍔╂墜銆傝鎮ㄨ缁嗘弿杩颁竴涓?strong>鍝噷涓嶈垝鏈?/strong>锛屼緥濡傦細</p>
                <ul>
                    <li><strong>鍝釜閮ㄤ綅</strong>涓嶈垝鏈嶏紵锛堝锛氫笂鑵广€佸彸涓嬭吂銆佽兏鍙ｃ€佸悗鑴戝嫼鈥︼級</li>
                    <li><strong>鎬庢牱鐨勬劅瑙?/strong>锛燂紙濡傦細閽濈棝銆佺粸鐥涖€佺伡鐑ф劅銆佽儉鐥涒€︼級</li>
                    <li><strong>浠庝粈涔堟椂鍊欏紑濮?/strong>鐨勶紵鎸佺画澶氫箙浜嗭紵</li>
                    <li><strong>鏈夋病鏈夊叾浠栫棁鐘?/strong>锛燂紙濡傦細鎭跺績銆佸彂鐑с€佸ご鏅曗€︼級</li>
                    <li><strong>浠€涔堟儏鍐典笅鍔犻噸鎴栫紦瑙?/strong>锛熶互鍓嶆湁杩囧悧锛?/li>
                </ul>
                <p style="margin-top:8px;font-size:13px;color:#64748b;">馃挕 鎻忚堪瓒婅缁嗭紝鍒ゆ柇瓒婂噯纭€?/p>
            </div>
        </div>`;

    recordCard.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">馃摑</div>
            <p>瀹屾垚闂瘖鍚庯紝鐥呭巻涓庡氨鍖诲缓璁皢鏄剧ず鍦ㄨ繖閲?/p>
        </div>`;
    recordStatus.textContent = '绛夊緟闂瘖';
    recordStatus.className = 'badge waiting';
    deptCard.style.display = 'none';
    nextSteps.style.display = 'none';
    actionButtons.style.display = 'none';

    userInput.value = '';
    userInput.style.height = 'auto';
    btnSend.disabled = true;
    userInput.focus();
});

// ==================== 鍒濆鍖?====================

btnSend.disabled = true;
