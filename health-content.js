// 健康剧情与家书共用的数据源。
// 安全可改区：可以在这里调整文案、节日顺序和游戏奖励；不要改动 id，旧存档会用它们识别已解锁内容。
(function exposeWakeboundHealth(root){
  const source={
    name:'中国公民健康素养——基本知识与技能（2024年版）',
    publisher:'国家卫生健康委',
    url:'https://www.nhc.gov.cn/xcs/c100123/202405/73a4927142f34152abed875634a3c13b.shtml',
    reviewedAt:'2026-08-22',
    disclaimer:'内容用于一般健康知识普及，不能替代专业医务人员的个体化诊断或治疗建议。每个人的年龄、身体状况和生活条件不同；如有不适、已有疾病或对行动是否适合自己有疑问，请咨询专业医务人员。游戏奖励仅为航海叙事机制，不代表现实中的即时健康效果或结果保证。'
  };

  const topics={
    sleep:{
      id:'sleep',icon:'☾',name:'让守夜的人也能睡好',short:'规律作息',
      fact:'劳逸结合、起居有常，并尽量保证适合自己的充足睡眠。',
      shipAction:'重新安排轮值，减少不必要的连续通宵；让船员在职责允许时获得稳定休息。',
      familyAction:'今晚一起找一个不增加负担的小调整，例如稍早结束一件非必要的事；轮班、照护或睡眠困难时，不必勉强用同一种作息标准要求自己。',
      gameReward:'航程奖励（游戏机制）：修复 12 点船体',effect:{kind:'heal',value:12},
      result:'新的值夜表贴上桅杆。海仍然很黑，但休息不再被当成软弱，也不再要求谁独自硬撑。'
    },
    activity:{
      id:'activity',icon:'⚓',name:'把甲板变成练习场',short:'科学运动',
      fact:'健康成年人每周宜进行 150～300 分钟中等强度或 75～150 分钟高强度有氧运动，并进行 2～3 次抗阻训练。',
      shipAction:'按每个人的能力安排短时活动，量力而行、循序渐进；已有疾病、残障、孕产期或康复期人员按专业建议调整方式和强度。',
      familyAction:'从大家愿意且适合的活动开始；步行、轮椅活动、拉伸或其他可持续方式都可以，不以速度和完成量互相比较。',
      gameReward:'航程奖励（游戏机制）：随机强化 1 张卡牌',effect:{kind:'upgrade',value:1},
      result:'训练不再是临战前的惩罚，而成为可以调整、可以暂停、也可以长期坚持的日常安排。'
    },
    diet:{
      id:'diet',icon:'◈',name:'重写补给采购单',short:'清淡膳食',
      fact:'膳食要清淡，少盐、少油、少糖；注意食物多样和合理搭配。',
      shipAction:'在条件允许时减少高盐腌渍补给，采购时查看食品标签，并增加可保存的多样食物；有过敏或特殊饮食要求者单独记录。',
      familyAction:'下次买菜时，在预算、可获得食物和个人饮食要求允许的范围内，尝试增加一种合适的食物，也可以一起看看预包装食品标签。',
      gameReward:'航程奖励（游戏机制）：获得 35 枚金币',effect:{kind:'gold',value:35},
      result:'厨舱没有变成诊室，只是采购单更清楚，也给不同需要的人留出了选择。'
    },
    smokeFree:{
      id:'smokeFree',icon:'✦',name:'让火药舱真正无烟',short:'远离烟草',
      fact:'不吸烟（包括电子烟）；吸烟和二手烟暴露会导致多种疾病，任何年龄戒烟都能获益。',
      shipAction:'生活舱和火药舱设为无烟空间；需要戒烟帮助的船员可自愿获得港口专业服务信息，不因依赖或复吸受到羞辱。',
      familyAction:'把家里和车里约定为无烟空间；如果对方愿意戒烟，陪他寻找专业支持，不指责，也不把一次复吸当成失败定论。',
      gameReward:'航程奖励（游戏机制）：获得 1 件随机船体硬件',effect:{kind:'hardware',value:1},
      result:'无烟标记贴到住舱。有人主动提出返航后了解专业戒烟服务，其他人只负责支持，不替他作诊断。'
    },
    care:{
      id:'care',icon:'✚',name:'把异常写进航海日志',short:'科学就医',
      fact:'科学就医，及时就诊，遵医嘱治疗，理性对待诊疗结果。',
      shipAction:'发现持续或明显异常时，先记录时间、表现和变化；需要时靠港咨询专业人员，不凭一条传闻自行下结论。',
      familyAction:'如果你愿意，我们可以一起把不舒服出现的时间、变化和正在使用的药物整理好，再向专业人员咨询。',
      gameReward:'归航记录：为最终家书保留一段就医沟通约定',effect:{kind:'none',value:0},
      result:'航海日志留出了“尚未确认”的位置。记录是为了帮助沟通，不是替任何人诊断。'
    },
    information:{
      id:'information',icon:'⌕',name:'先确认消息从哪里来',short:'信息核验',
      fact:'关注健康信息，能够正确获取、理解、甄别、应用健康信息。',
      shipAction:'收到健康消息时先查来源、发布时间和完整上下文，优先参考政府、卫生健康行政部门、专业机构和官方媒体。',
      familyAction:'下次看到让人紧张的健康消息，我们先一起看看来源和完整内容，再决定是否需要行动或咨询。',
      gameReward:'归航记录：为最终家书保留一段信息核验约定',effect:{kind:'none',value:0},
      result:'无线电消息被标上来源和时间。越像想听见的话，越需要先确认。'
    },
    mental:{
      id:'mental',icon:'≈',name:'让难受有地方被听见',short:'心理支持',
      fact:'重视和维护心理健康，遇到心理问题时应主动寻求帮助。',
      shipAction:'先倾听船员正在经历什么，不强迫立即解释；当困扰持续、加重或影响生活时，鼓励寻求专业帮助。',
      familyAction:'如果你想说，我会认真听；如果这些感受持续影响生活，我们也可以一起寻找合适的专业帮助。',
      gameReward:'归航记录：为最终家书保留一段倾听与求助约定',effect:{kind:'none',value:0},
      result:'值夜室多留了一把椅子。陪伴不是催人振作，也不是替对方下结论。'
    },
    safety:{
      id:'safety',icon:'△',name:'先认出危险，再决定前进',short:'风险识别',
      fact:'会识别常见危险标识，远离危险环境。',
      shipAction:'把漏油、破损绳索、浓烟和未知补给先标记并隔离，再由合适的人检查；不让“赶路”覆盖风险。',
      familyAction:'遇到看不明白的危险标识、药品或设备时，先停下来确认，不靠猜测继续操作。',
      gameReward:'归航记录：为最终家书保留一段风险识别约定',effect:{kind:'none',value:0},
      result:'危险区域先被围起。谨慎不是退缩，而是给下一步留下选择。'
    }
  };

  // 八站航程的健康交互：每站开场做一次船务选择，结算时留下一句家书素材。
  // 选项不是知识考试；start.effect 只映射为封顶的小型航海增益，end 不再额外发放数值奖励。
  const stageMoments=[
    {
      id:'stage-1',label:'第一站 · 遗港外海',
      start:{title:'离港前，谁来守第四更？',copy:'铜铃比值夜表多响了一次。你要先安排今晚的船务，再驶入第一片黑潮。',choices:[
        {id:'shared-watch',topicId:'sleep',title:'把一人通宵改成双班轮值',copy:'用交接铜牌确认彼此，不让任何人独自撑到天亮。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'新的轮值表贴上桅杆，第四更第一次有了明确的接班人。',letterLine:'我会把持续疲惫当作需要调整的信号，而不是必须隐藏的软弱。'},
        {id:'listening-watch',topicId:'mental',title:'先问清是谁不敢入睡',copy:'把追问变成倾听，让害怕的人可以选择现在说或稍后再说。',effect:{kind:'draw',value:1},effectLabel:'船务映射：下次战斗起手 +1 张牌',result:'值夜室多留了一把椅子，沉默不再被当成拒绝合作。',letterLine:'如果你想说，我会听；如果现在不想说，我也愿意等。'}
      ]},
      end:{title:'第一站 · 写下离港后的第一句话',copy:'海面暂时平静。你决定把哪一条观察留给归港后的家人。',choices:[
        {id:'log-symptoms',topicId:'care',title:'把异常写进日志，不替它下结论',copy:'记录出现时间和变化，需要时再带着完整信息求助。',result:'日志留下了“尚未确认”的空白，也留下了下一步该找谁。',letterLine:'有不舒服时，我们可以先把变化记清楚，再一起找专业人员问明白。'},
        {id:'mark-hazards',topicId:'safety',title:'先标出危险，再决定是否靠近',copy:'看不明白的标识、漏油和破损绳索先隔离检查。',result:'危险区域被铜线围起，赶路没有覆盖风险。',letterLine:'遇到看不明白的风险，我们先停一下、确认清楚，再继续。'}
      ]}
    },
    {
      id:'stage-2',label:'第二站 · 雾中航道',
      start:{title:'雾里传来一条“立刻照做”的消息',copy:'无线电没有署名，却使用了失踪舰队的旧口令。你决定先做哪一步。',choices:[
        {id:'verify-source',topicId:'information',title:'核对来源、时间和完整上下文',copy:'先查旧口令的登记册，再决定是否执行消息。',effect:{kind:'rust',value:1},effectLabel:'船务映射：下次战斗敌舰锈蚀 +1',result:'消息的时间戳比失踪舰队晚了三年，疑点被清楚标出。',letterLine:'越是让人紧张的健康消息，我们越要先看来源和完整内容。'},
        {id:'prepare-consult',topicId:'care',title:'整理现象，再向港口医官咨询',copy:'把已知情况、持续时间和正在使用的物资列成清单。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'需要确认的问题被写成清单，没有人被一句模糊判断吓住。',letterLine:'需要问专业人员时，我们可以先把情况整理好，一起把问题问清楚。'}
      ]},
      end:{title:'第二站 · 给那条消息加一行批注',copy:'你没有把未经确认的内容直接转发回港口。现在选择留下哪种提醒。',choices:[
        {id:'official-first',topicId:'information',title:'优先查看权威和专业来源',copy:'把消息来源与日期写在正文前面，避免断章取义。',result:'无线电抄件补上了来源、日期和“待核验”印章。',letterLine:'以后看到健康消息，我们先一起确认出处，不急着转发。'},
        {id:'timely-care',topicId:'care',title:'持续或明显异常时及时咨询',copy:'不拖延，也不把网络信息当成个体化诊断。',result:'归航清单增加了一个可以求助的港口联络点。',letterLine:'如果不舒服持续或明显加重，我们别硬扛，也别只靠网上猜。'}
      ]}
    },
    {
      id:'stage-3',label:'第三站 · 漂流补给区',
      start:{title:'被磨掉标签的补给箱',copy:'箱盖只剩一句“越咸越醒，越甜越稳”。你要先重整哪一项。',choices:[
        {id:'read-labels',topicId:'diet',title:'重写采购单并查看食品标签',copy:'按配料、营养信息和特殊饮食需要重新分舱。',effect:{kind:'energy',value:1},effectLabel:'船务映射：下次战斗首回合潮力 +1',result:'补给箱重新有了标签，不同需要也被单独记录。',letterLine:'下次买预包装食品时，我们可以一起看看标签，再按需要选择。'},
        {id:'isolate-unknown',topicId:'safety',title:'未知补给先隔离，不靠气味猜',copy:'变质、过期或来源不明的补给不进入厨舱。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'来源不明的箱子被移出生活舱，等待进一步确认。',letterLine:'看不清标签或来源的东西，我们先别用，确认后再决定。'}
      ]},
      end:{title:'第三站 · 把补给习惯写回家',copy:'厨舱恢复秩序。你选择一件现实里也愿意共同尝试的小事。',choices:[
        {id:'lighter-meals',topicId:'diet',title:'在条件允许时少盐、少油、少糖',copy:'不要求一次改变全部，只从一顿饭或一次采购开始。',result:'采购单没有写“必须”，只写下一个可以慢慢尝试的调整。',letterLine:'我们不追求一下子全改掉，可以从一顿更清淡、更多样的饭开始。'},
        {id:'smoke-free-room',topicId:'smokeFree',title:'把共同生活空间约定为无烟',copy:'需要戒烟帮助时支持寻找专业服务，不羞辱依赖或复吸。',result:'住舱贴上无烟标记，也留下了自愿求助的联络方式。',letterLine:'希望家里和车里都能是无烟空间；需要帮助时，我们一起找专业支持。'}
      ]}
    },
    {
      id:'stage-4',label:'第四站 · 静止风眼',
      start:{title:'风停了，但船员并没有恢复',copy:'表面平静不等于状态已经恢复。下一段航程前，你先安排一件事。',choices:[
        {id:'real-rest',topicId:'sleep',title:'留出真正不值勤的休息时间',copy:'把可延后的工作移出休息时段，不用“躺着待命”代替休息。',effect:{kind:'draw',value:1},effectLabel:'船务映射：下次战斗起手 +1 张牌',result:'休息时段第一次没有被临时命令切碎。',letterLine:'休息不是把工作换个地方继续做，我们都该有真正停下来的时间。'},
        {id:'scaled-movement',topicId:'activity',title:'按能力做短时活动，不互相比速度',copy:'动作、时间和强度都允许调整，有需要时遵循专业建议。',effect:{kind:'energy',value:1},effectLabel:'船务映射：下次战斗首回合潮力 +1',result:'绳架训练被拆成可暂停、可调整的短组。',letterLine:'活动不必和别人比较，找到适合自己并能持续的方式就好。'}
      ]},
      end:{title:'第四站 · 风眼里的归航观察',copy:'你要把哪一种“照顾自己”写进家书，而不是写成命令。',choices:[
        {id:'rest-without-blame',topicId:'sleep',title:'累了可以说，也可以调整',copy:'轮班、照护或睡眠困难时，不用同一标准要求所有人。',result:'家书没有责备谁晚睡，只留下可以商量的空间。',letterLine:'累的时候可以告诉我，我们一起看看哪些事能调整，不必互相责怪。'},
        {id:'ask-for-help',topicId:'mental',title:'困扰持续时，主动寻找帮助',copy:'先认真倾听；需要时一起寻找合适的专业支持。',result:'求助被写成一种可以选择的行动，而不是失败证明。',letterLine:'如果难受持续影响生活，我们可以一起找合适的人帮忙。'}
      ]}
    },
    {
      id:'stage-5',label:'第五站 · 沉船沟',
      start:{title:'父亲擦掉了航图上的异常标记',copy:'船员怕拖慢舰队，总说“没事”。你决定怎样恢复这段记录。',choices:[
        {id:'restore-timeline',topicId:'care',title:'按时间恢复变化，不猜疾病名称',copy:'记录何时出现、是否持续、有哪些变化，供后续沟通使用。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'航图上的标记重新连成时间线，没有被包装成诊断。',letterLine:'我们可以把变化和时间记下来，带着记录去问专业人员。'},
        {id:'compare-sources',topicId:'information',title:'把传闻与正式记录分开',copy:'不同来源分别标注，不用重复次数代替可靠性。',effect:{kind:'rust',value:1},effectLabel:'船务映射：下次战斗敌舰锈蚀 +1',result:'航图边缘多了来源栏，传闻不再和正式记录混在一起。',letterLine:'一件事被说很多次，也不一定就可靠；我们先看证据和来源。'}
      ]},
      end:{title:'第五站 · 留下一份能帮助沟通的记录',copy:'你决定把哪一种做法写进归航日志。',choices:[
        {id:'medication-list',topicId:'care',title:'咨询前整理正在使用的药物和问题',copy:'只整理事实，不自行停药、换药或调整剂量。',result:'医官清单变得更完整，也明确写着“遵医嘱”。',letterLine:'需要就医时，我们可以一起整理正在使用的药物和想问的问题。'},
        {id:'understand-before-use',topicId:'information',title:'先理解信息，再决定是否采用',copy:'看清适用对象、条件和边界，不把一般建议硬套到个人。',result:'每条建议后都补上了适用边界和待确认事项。',letterLine:'健康建议要先看适用条件，不确定是否适合自己时就去咨询。'}
      ]}
    },
    {
      id:'stage-6',label:'第六站 · 火药舱',
      start:{title:'通风口飘出甜烟',copy:'唐栗说那只是让人放松的旧习惯。火药舱却已经响起警报。',choices:[
        {id:'clear-smoke',topicId:'smokeFree',title:'生活舱和火药舱全面无烟',copy:'先清理烟雾并检查火源，需要戒烟帮助者可自愿获得专业服务信息。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'通风道恢复清洁，无烟规则不再只写在墙上。',letterLine:'希望共同生活的空间没有烟；需要戒烟帮助时，我们一起找专业支持。'},
        {id:'danger-first',topicId:'safety',title:'先撤离危险区，再查烟从哪里来',copy:'不在未知烟雾里继续工作，也不让未经训练的人贸然处理。',effect:{kind:'draw',value:1},effectLabel:'船务映射：下次战斗起手 +1 张牌',result:'船员先撤到安全甲板，调查没有以继续暴露为代价。',letterLine:'遇到未知烟雾或危险环境时，先离开、求助，再处理。'}
      ]},
      end:{title:'第六站 · 第四枚不会响的铜铃',copy:'唐栗承认自己一直用假警报逃避三年前的愧疚。你决定怎样回应。',choices:[
        {id:'support-quit',topicId:'smokeFree',title:'确认无烟舱规，也不羞辱依赖',copy:'规则保护共同空间；戒烟过程由本人决定，并可寻求专业支持。',result:'唐栗签下舱规，也拿走一张港口戒烟服务卡。',letterLine:'我愿意支持无烟的共同空间，也愿意在你需要时陪你找专业帮助。'},
        {id:'listen-guilt',topicId:'mental',title:'先听完愧疚，再讨论下一步',copy:'不急着说“想开点”，也不把一次失误定义成整个人。',result:'假警报停了，唐栗第一次把那晚从头说完。',letterLine:'你不必先把情绪整理好再来找我，我们可以慢慢说。'}
      ]}
    },
    {
      id:'stage-7',label:'第七站 · 风暴门',
      start:{title:'无线电里传来最熟悉的声音',copy:'声音催你立刻返航，却无法回答只有家人才知道的问题。',choices:[
        {id:'second-channel',topicId:'information',title:'换一个独立渠道再次确认',copy:'不在同一条转发链里反复求证，寻找原始来源或官方信息。',effect:{kind:'rust',value:1},effectLabel:'船务映射：下次战斗敌舰锈蚀 +1',result:'第二频道没有重复那条命令，伪装开始出现裂缝。',letterLine:'重要的健康消息，我们会换一个可靠渠道再确认一次。'},
        {id:'steady-crew',topicId:'mental',title:'先安顿被声音触发的船员',copy:'允许离开现场、找人陪伴；困扰持续时提供专业求助信息。',effect:{kind:'block',value:3},effectLabel:'船务映射：下次战斗开局护甲 +3',result:'没有人被要求一边发抖一边证明自己还能工作。',letterLine:'难受的时候可以先离开让你不舒服的地方，也可以叫我陪着。'}
      ]},
      end:{title:'第七站 · 把“关心”从催促改成确认',copy:'风暴门已经打开。你选择一句更适合带回家的话。',choices:[
        {id:'verify-together',topicId:'information',title:'先一起核验，不急着互相说服',copy:'把来源、证据和不确定之处放在同一张桌上。',result:'争论停在了“先确认”这一步，没有人靠音量赢得结论。',letterLine:'遇到真假难分的健康消息，我们先一起核验，不急着互相说服。'},
        {id:'help-without-pressure',topicId:'mental',title:'愿意陪伴，也允许对方说“以后再聊”',copy:'分享和求助保持自愿，不用内疚换取行动。',result:'家书边缘留出一句“以后再说也可以”。',letterLine:'我愿意陪你，也尊重你什么时候愿意说、愿意做到哪一步。'}
      ]}
    },
    {
      id:'stage-8',label:'第八站 · 无灯塔',
      start:{title:'最后一战前，先决定怎样照顾同行者',copy:'无灯塔会利用疲惫、恐惧和未经核验的指令。你只能先做一项准备。',choices:[
        {id:'final-rest-check',topicId:'sleep',title:'确认轮值与休息，不让疲劳者硬撑',copy:'能换班的人先换班，无法按常规休息者按实际条件调整。',effect:{kind:'energy',value:1},effectLabel:'船务映射：首领战首回合潮力 +1',result:'最后一班值夜者交出了铜牌，没有人因换班被嘲笑。',letterLine:'真正重要的时刻，也不该靠一个人一直硬撑。'},
        {id:'final-safety-check',topicId:'safety',title:'复核危险标识与撤离路线',copy:'先确认出口、联络和警报，再进入无法预判的海域。',effect:{kind:'block',value:3},effectLabel:'船务映射：首领战开局护甲 +3',result:'撤离路线被重新点亮，前进不再等于没有退路。',letterLine:'做重要决定前，我们也可以先确认风险和退路。'}
      ]},
      end:{title:'第八站 · 灯重新亮起后',copy:'你已经带回完整航图。最后选择一段最想放进这次家书的约定。',choices:[
        {id:'future-help',topicId:'care',title:'需要时，我们一起把问题带给专业人员',copy:'把求助写成可共同完成的小行动，不承诺任何诊断结果。',result:'最后一张信笺补上了港口医官的地址，也留下“由你决定何时出发”。',letterLine:'如果有需要，我们可以一起整理问题，再去找专业人员问清楚。'},
        {id:'future-listening',topicId:'mental',title:'有些事不必一个人消化完再开口',copy:'愿意听，也尊重对方不分享或稍后再说的选择。',result:'最后一张信笺没有催促，只写着“我在这里”。',letterLine:'你不用先变得没事再来找我；想说的时候，我在这里。'}
      ]}
    }
  ];

  // 每次通关按此顺序轮换默认信纸；家书页内仍可自由更换节日，不需要重新通关。
  const festivals=[
    {id:'peace',seal:'平安',name:'平安家书',opening:'不必等到节日，平安本身就值得写一封信。',wish:'愿我们都把照顾自己，当成牵挂彼此的一部分。'},
    {id:'spring',seal:'新岁',name:'春节家书',opening:'新岁的灯火亮起来时，我更想把一句平安送回家。',wish:'愿新的一年，团圆有时，健康有常。'},
    {id:'dragonBoat',seal:'安康',name:'端午家书',opening:'端午风里有艾草香，也有一句朴素的“安康”。',wish:'愿我们把安康放进日常的小事里，慢慢做、一起做。'},
    {id:'qixi',seal:'相伴',name:'七夕家书',opening:'七夕不只说浪漫，也提醒我：长久的陪伴，需要彼此好好生活。',wish:'愿往后的每一程，我们都能健康地陪在彼此身边。'},
    {id:'midAutumn',seal:'团圆',name:'中秋家书',opening:'月亮照到海上，也照到我惦记的那张饭桌。',wish:'愿月圆时能团聚，未团聚时也都照顾好自己。'},
    {id:'chongyang',seal:'长久',name:'重阳家书',opening:'重阳说登高，也说敬老。我想把关心写得更具体一点。',wish:'愿家中长辈安稳舒心，也愿每一次陪伴都不被匆忙错过。'}
  ];

  root.WAKEBOUND_HEALTH=Object.freeze({source,topics,festivals,stageMoments});
})(globalThis);
