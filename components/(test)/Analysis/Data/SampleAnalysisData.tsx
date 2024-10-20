const sampleAnalysisData = [
    {
        question: 'I can read a person like a book',
        scale: "Sample Scale",
        answer: 0,
        position: 0,
        low: 0,
        high: 10,
        analysis:
        'You may find it challenging to read social situations or pick up on the "vibe" of a gathering. It\'s not always easy for you to blend in or engage in group conversations. Even as an extrovert, you might have trouble connecting with just one person. Similarly, introverts may experience this too, though they tend to prefer one-on-one interactions. It can be especially difficult when you\'re in a group of three or more people.',
            // 'When it comes to social awareness, you do not easily assess social situations--not smoothly gauging the "temperature and tone" of social gatherings. You are not prone to integrate with others, potentially having difficulty conversing or blending with a group. Individually, if you are an extrovert, you may have difficulty talking with just one person. Introverts have this same skill but prefer more individual interactions than with groups. You may struggle with this more if you are talking to three or more people.',
    },
    {
        question: 'I can read a person like a book',
        scale: "Sample Scale",
        answer: 0,
        position: 1,
        low: 11,
        high: 20,
        analysis: 'You\'re generally neutral when it comes to social awareness, sometimes able to pick up on the "vibe" of gatherings and sometimes not. At times, you can smoothly engage with others, join in conversations, and fit into a group, but just as often, it may feel challenging. Similarly, when speaking one-on-one, you might find it easy at times and difficult at others, especially if you\'re an extrovert. Introverts experience this too, though they prefer one-on-one interactions over group settings. Your approach falls somewhere in the middle.,'
            // 'When it comes to social awareness, you are neither at ease with or at odds with social situations. Sometimes you can and sometimes you can\'t gauge the "temperature and tone" of social gatherings. Occasionally you can more easily integrate with others, potentially to converse and blend with a group. However, just about as often, you may not be able to do this. Individually, equally you will also be able to and sometimes not be able to talk with just one person, but that may not be necessary if you happen to be an extrovert. Introverts have this same skill but prefer more individual interactions than with groups. Your style is somewhere in between.',
    },
    {
        question: 'I can read a person like a book',
        scale: "Sample Scale",
        answer: 0,
        position: 2,
        low: 21,
        high: 30,
        analysis: 'You have a natural talent for reading social situations, effortlessly gauging the mood and atmosphere of gatherings. This skill allows you to blend in smoothly, whether you\'re in a group setting or one-on-one conversation. You can easily adapt to different social environments, making connections and engaging with others naturally. If you\'re an extrovert, you might thrive in group interactions, while introverts may prefer using this skill in more intimate settings. Regardless of your social preference, your ability to \'read the room\' is a valuable asset, helping you navigate social interactions with confidence and ease.'
            // 'When it comes to social awareness, you can assess social situations with ease, gauging the "temperature and tone" of social gatherings. This allows you to smoothly integrate with others, potentially to converse more with ease and blend with a group. Individually, equally you will also be able to talk with just one person, but that may not be necessary if you happen to be an extrovert. Introverts have this same skill but prefer more individual interactions than with groups.',
    },

    {
        question: "I'm not a self-starter",
        scale: "Sample Scale",
        answer: 1,
        position: 0,
        low: 0,
        high: 10,
        analysis: 'You\'re not someone who typically takes initiative on your own, and some might describe you as slower to get things started. If your partner has a similar pace, this likely won’t cause many issues. However, if your partner is highly self-motivated or even hyper-focused on getting things done quickly, it could create tension. The difference in drive and energy levels could lead to misunderstandings or frustration, especially if they expect you to match their pace or enthusiasm. Balancing these differences might require clear communication and mutual understanding.',
        // 'When it comes to motivation, you are not a self-starter.   Some might describe you as a laggard.   This will be less of a problem if your partner is the same, but will cause conflicts if your partner is self-motivated or worse,  hyper in this area.'
    },

    {
        question: "I'm not a self-starter",
        scale: "Sample Scale",
        answer: 1,
        position: 1,
        low: 11,
        high: 20,
        analysis: 'When it comes to motivation, you\'re in the middle—not quick to jump in, but not too slow either. This works well if your partner shares a similar approach, but it could cause issues if they’re either very slow to get started or overly driven. Your neutral stance gives you the flexibility to adapt, depending on the situation.',
       // 'When it comes to motivation, you are in the middle, neither a self-starter, nor a laggard.   This will not be a problem if your partner is the same, but will cause conflicts if your partner is either very slow to engage, or is hyper in this area.   Your orientation is neutral, which gives you some flexibility.'
    },

    {
        question: "I'm not a self-starter",
        scale: "Sample Scale",
        answer: 1,
        position: 2,
        low: 21,
        high: 30,
        analysis: 'You\'re naturally a self-starter, and few would consider you slow or hesitant. This won\'t be an issue if your partner has a similar drive, but it might lead to conflict if they tend to be slow to get moving or depend on others to start things. Your initiative could create frustration in situations where your partner\'s pace doesn\'t match your own, especially if they need more time or external motivation to engage in tasks or projects. Balancing these differences could require understanding and patience.',
        // 'When it comes to motivation, you are a self-starter.   Few think of you as a laggard.   This will not be a problem if your partner is the same, but will cause conflicts if your partner is very slow to engage or relies on others to begin projects.'
    },

    {
        question: "I generally know what emotional state I'm in",
        scale: "Sample Scale",
        answer: 2,
        position: 0,
        low: 0,
        high: 10,
        analysis: 'You tend to lack self-awareness, often struggling to understand your own feelings and how you react to situations or people, especially your partner. This is a key aspect of emotional intelligence, which is important for building strong, healthy relationships. Developing this skill is essential, as it’s currently not benefiting you in areas like work, school, or even in social and athletic situations. Improving your self-awareness can help you navigate these interactions more effectively and create better connections with others.',
            // 'Self-awareness is not in your makeup. You do not often know how you feel internally, and how you react to things external--situations, other people, your partner, specifically. This is one of many signs of emotional intelligence--a necessary quality to support a healthy relationship. This ability needs work. Right now it does not serve you at work and school, or in social or athletic interactions.',
    },

    {
        question: "I generally know what emotional state I'm in",
        scale: "Sample Scale",
        answer: 2,
        position: 1,
        low: 11,
        high: 20,
        analysis: 'Your self-awareness can be hit or miss—sometimes it helps, and other times it doesn\'t. There are moments when you\'re clear about your internal feelings, but other times you\'re unsure. You might understand how you respond to external situations, people, or your partner, but not consistently. If you work on strengthening this skill and making it more reliable, it could really benefit you in areas like work, school, or even social and athletic settings. At the moment, it\'s neither a strong nor a weak point for you, but there\'s room for improvement.',
            // 'Self-awareness sometimes works in your favor, sometimes not. You may know how you feel internally at one moment, but not in the next. You may or may not know how you react to things external--situations, other people, your partner, specifically. This ability, if developed and functioning more regularly will serve you at work and school, or in social or athletic interactions. Right now it is neither strong nor weak.',
    },

    {
        question: "I generally know what emotional state I'm in",
        scale: "Sample Scale",
        answer: 2,
        position: 2,
        low: 21,
        high: 30,
        analysis: 'Your self-awareness is a strength. You have a good sense of how you feel inside and how you respond to outside situations, including interactions with others and your partner. This is a key aspect of emotional intelligence, which is crucial for building and maintaining healthy relationships. This skill also benefits you in many areas of life, whether it\'s at work, school, or in social or athletic settings. Being attuned to your emotions and reactions gives you an advantage in navigating these environments effectively.',
            // 'Self-awareness works in your favor. You know how you feel internally, and how you react to things external--situations, other people, your partner, specifically. This is one of many signs of emotional intelligence--a necessary quality to support a healthy relationship. This ability also will serve you at work and school, or in social or athletic interactions.',
    },

    {
        question: "I don't feel sorry for others who aren't doing so well",
        scale: "Sample Scale",
        answer: 3,
        position: 0,
        low: 0,
        high: 10,
        analysis: 'Your level of compassion could use some improvement. Compassion is closely related to empathy, and it\'s what helps smooth communication by showing you care about others. Right now, your compassion seems lower than it could be, which suggests it might help to explore this and similar qualities, like forgiveness and agreeableness. The good news is that these traits can be developed with time and effort, so there\'s plenty of opportunity to grow in this area.',
            // "Your level of compassion needs work. This trait is empathy's first cousin. It serves to grease the skids of communication, which follows from caring for others. Your level is low, suggesting a need to read about this and related traits (forgiveness, agreeableness).  Fortunately, these traits can be learned.",
    },

    {
        question: "I don't feel sorry for others who aren't doing so well",
        scale: "Sample Scale",
        answer: 3,
        position: 1,
        low: 11,
        high: 20,
        analysis: 'our level of compassion is somewhere in the middle—not particularly strong, but not weak either. Compassion, closely tied to empathy, helps smooth communication by showing you care about others. You could choose to develop it further or simply leave it as is. Exploring this and similar traits, like forgiveness and agreeableness, might be something you find interesting, though it’s not necessarily required unless you feel inclined to grow in this area.',
            // "Your level of compassion is neither strong nor weak. This trait is empathy's first cousin. It serves to grease the skids of communication, which follows from caring for others. You could boost your level or let it ride. Reading about this and related traits (forgiveness, agreeableness, etc.) may or may not be of interest.",
    },

    {
        question: "I don't feel sorry for others who aren't doing so well",
        scale: "Sample Scale",
        answer: 3,
        position: 2,
        low: 21,
        high: 30,
        analysis: 'Your compassion is strong, a trait closely linked to empathy. Compassion helps smooth communication by showing genuine care for others, and your high level suggests you\'re already well-attuned to this. Whether you\'ve naturally developed this trait or have learned about it through exploring related qualities like forgiveness and agreeableness, it\'s clear that this ability supports your interactions and relationships in meaningful ways.',
            // "Your level of compassion is high. This trait is empathy's first cousin. It serves to grease the skids of communication, which follows from caring for others. Your level suggests you have read about this and related traits (forgiveness, agreeableness, etc.) or perhaps you come by this trait naturally.",
    },
]

export default sampleAnalysisData
