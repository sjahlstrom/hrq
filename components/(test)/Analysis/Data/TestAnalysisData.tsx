const testAnalysisData = [
    {
        question: "If a clerk gave me too much change back, I wouldn't tell",
        scale: 13,
        answer: 0,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Being honest via spoken word or deed is not high on you priority list. This does not necessarily mean you are prone to lie, only that honesty is not your first level of focus',
    },
    {
        question: "If a clerk gave me too much change back, I wouldn't tell",
        scale: 13,
        answer: 0,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are not concerned any more than the average person about being honest, though this does not mean you are dishonest. You are somewhere in the middle range for this trait.',
    },
    {
        question: "If a clerk gave me too much change back, I wouldn't tell",
        scale: 13,
        answer: 0,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are more honest than not--faithfully representing the truth as you see it via spoken word or deed.  This quality correlates with successful relationships.',
    },

    {
        question:
            "I'm not very good at seeing the world through someone else's eyes",
        scale: 9,
        answer: 1,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not much inclined to “walk a mile in someone else’s moccasins,” to “see the world through someone else’s eyes.”   You are not much interested in putting yourself in someone’s experience, to feel as they do.  Because of this you have much less of a sense of another’s state.',
    },
    {
        question:
            "I'm not very good at seeing the world through someone else's eyes",
        scale: 9,
        answer: 1,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You have average ability to “walk a mile in someone else’s moccasins,” to “see the world through their eyes.”   Sometimes you do and sometimes you don’t have the capability to put yourself in someone’s experience, to feel as they do.  Your score in this area is somewhere in the middle of the spectrum.',
    },
    {
        question:
            "I'm not very good at seeing the world through someone else's eyes",
        scale: 9,
        answer: 1,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to “walk a mile in someone else’s moccasins,” to “see the world through their eyes.”   You have the capability to put yourself in someone’s experience, not just feel as they do. Because of this you have a deeper sense of another’s state, which paradoxically requires a deeper awareness of self—in this case used to more fully immerse yourself into other’s experiences without losing your “center.” ',
    },

    {
        question: 'I usually put others first',
        scale: 2,
        answer: 2,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'The idea of elevating the welfare, happiness, interests or even the survival of others over your own does not interest you. You have little interest in the selfless concern for the well-being of others.',
    },
    {
        question: 'I usually put others first',
        scale: 2,
        answer: 2,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are not concerned with elevating the welfare of others over your own, nor are you particularly focused exclusively on your own welfare over that of others.  In other words, you are not particularly high or low in this aspect.',
    },
    {
        question: 'I usually put others first',
        scale: 2,
        answer: 2,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to elevate the welfare, happiness, interests or even the survival of others, sometimes even above your own. This practice of disinterested and selfless concern for the well-being of others is very positive, unless taken to extremes (co-dependence, rescuing, enabling).',
    },

    {
        question: 'I tend to not be dedicated and/or dependable',
        scale: 5,
        answer: 3,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are neither driven by conscience nor controlled by your inner sense of what is right. You are not governed much by principles, consequently you may also not be careful or painstaking, particular, meticulous or scrupulous.',
    },
    {
        question: 'I tend to not be dedicated and/or dependable',
        scale: 5,
        answer: 3,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither governed by conscience nor controlled by or do things according to your inner sense of what is right. You probably follow your principles most of the time, but you are not wedded to being careful, painstaking, particular, meticulous and/or scrupulous.  On this scale your score is in the middle of the spectrum.',
    },
    {
        question: 'I tend to not be dedicated and/or dependable',
        scale: 5,
        answer: 3,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are governed by conscience, controlled by or do things according to your inner sense of what is right. You have principles and you probably also have some of the following related traits: careful, painstaking, particular, meticulous and scrupulous.',
    },

    {
        question: 'People describe me as "difficult"',
        scale: 1,
        answer: 4,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly warm, friendly or tactful. You probably are not that optimistic and may not get along with others. Sometimes associated to low scores in this area are: distrusting, amorality, self-centeredness, oppositional, immodest and lack of sympathy for others.',
    },
    {
        question: 'People describe me as "difficult"',
        scale: 1,
        answer: 4,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle percentiles for warmth, friendliness and tact. You are probably mixed in optimism and may or may not consistently get along with others. You also may not be high or low in the following: trusting, moral, altruistic, cooperative, modest and sympathetic.',
    },
    {
        question: 'People describe me as "difficult"',
        scale: 1,
        answer: 4,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to be more warm, friendly and tactful. You are generally optimistic and get along with others. Traits that frequently are associated are: trusting, moral, altruistic, cooperative, modest and sympathetic.',
    },

    {
        question: 'My mood is even and stable most of the time',
        scale: 45,
        answer: 5,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You score low in Mental Health. This is a potential red flag. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation.',
    },
    {
        question: 'My mood is even and stable most of the time',
        scale: 45,
        answer: 5,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You score neither high nor low in Mental Health. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation. On this dimension, you are somewhere in the middle of the spectrum.',
    },
    {
        question: 'My mood is even and stable most of the time',
        scale: 45,
        answer: 5,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You score high in Mental Health. This is very good. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation.',
    },
    {
        question: "I'm not a very good team player",
        scale: 6,
        answer: 6,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are not likely to engage in mutual assistance with others on projects. Your approach is non-collaborative when considering goals and psychological coordination. You probably aren't interested in being collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, agreeing and sharing. ",
    },
    {
        question: "I'm not a very good team player",
        scale: 6,
        answer: 6,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle range when it comes to collaborating with others in approaching projects. You do not especially care one way or another about collective ventures and consequently may or may not be seen as collegial, concerted, coordinating, harmonizing, indulging in reciprocity, agreeing and sharing as in working as a team.',
    },
    {
        question: "I'm not a very good team player",
        scale: 6,
        answer: 6,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You provide mutual assistance to others and like working towards common goals. This quality suggests you can collaborate--create a collective venture towards goals and psychological coordination. You probably have one or more of these related traits: collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, joining others in teamwork, agreeing and sharing.',
    },

    {
        question: 'Women should be paid the same as men for the same work',
        scale: 7,
        answer: 7,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not often consider, value and favor equally the different behavior, aspirations and needs of women vs. men. It is not important to you that the rights, responsibilities and opportunities will not depend upon whether a person is born male or female.',
    },
    {
        question: 'Women should be paid the same as men for the same work',
        scale: 7,
        answer: 7,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You have no particular orientation towards considering, valuing and favoring equally the different behavior, aspirations and needs of women vs. men.  You are neither hot nor cold in this domain',
    },
    {
        question: 'Women should be paid the same as men for the same work',
        scale: 7,
        answer: 7,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You consider, value and favor equally the different behavior, aspirations and needs of women vs. men. You recognize that this does not depend upon whether a person is born male or female; rather, that their rights, responsibilities and opportunities are the same.',
    },

    {
        question: 'These days, a woman can ask a man out on a date',
        scale: 62,
        answer: 8,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You favor older values.  You think 'traditionally' about how one sees the ways one partner should act compared to the other.  For example, you favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions, etc. Newer, less traditional values, suggest a more liberal, hence 'flexible' behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute 'dominant' and 'submissive' for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success. You may lack just such flexibility. This trait correlates with: conservative religious values/thinking and age",
    },
    {
        question: 'These days, a woman can ask a man out on a date',
        scale: 62,
        answer: 8,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are fairly neutral in how you think one partner should act compared to the other.  Older values favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions etc. Newer, less traditional values, suggest a more liberal, hence 'flexible' behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute 'dominant' and 'submissive' for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success. In these areas, you are in the middle of the spectrum.",
    },
    {
        question: 'These days, a woman can ask a man out on a date',
        scale: 62,
        answer: 8,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have a more liberal interpretation about how one partner should act compared to the other.  Older values favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions, etc. Newer, less traditional values, suggest a more open stance, hence 'flexible' behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute 'dominant' and 'submissive' for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success.",
    },

    {
        question: 'In me, what you see is what you get',
        scale: 3,
        answer: 9,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly mature and probably are less than psychologically fully functioning.  Your perceptions of reality may not be particularly realistic. You are not as accepting of yourself or others as you might be and you might be perceived as not very thoughtful. Your sense of humor might be tinged with hostility and you might not be able to freely and clearly express your emotions. You probably are less than open to learning from your mistakes because you do not care so much about your deeper motivations.  You can be indirect and manipulative. ',
    },
    {
        question: 'In me, what you see is what you get',
        scale: 3,
        answer: 9,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither mature nor immature and psychologically function somewhere in the middle. Your perception of reality is average, as is your ability to be thoughtful, use humor in a non-hostile manner and to express your emotions freely and clearly. You are neither open nor closed to learning form your mistakes and to understand other's motivations. You are neither perceived as 'real' nor 'genuine' nor distant, indirect or manipulative.  In these dimensions, you scored in the middle range.",
    },
    {
        question: 'In me, what you see is what you get',
        scale: 3,
        answer: 9,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have psychological maturity and are psychologically fully functioning. You have realistic perceptions of reality, are accepting of yourself and others, are thoughtful, have a non-hostile sense of humor, and are able to express emotions freely and clearly. You are open to learning from your mistakes and understand other's motivations. You seem 'real' or 'genuine' to others, as opposed to being indirect or manipulative.",
    },

    {
        question: "I'm usually not the first one to suggest living together",
        scale: 53,
        answer: 10,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have the tendency to reduce your anxiety by over-clinging to another, filling your space with demands of closeness, attention or re-assurance. This tends to be excessive, hence, may cause problems.  This tendency correlates with low self-esteem and is seen in related behaviors: the urge to pre-maturely seek engagement, involvement and ultimately, commitment.  In this area, you are not doing so well.',
    },
    {
        question: "I'm usually not the first one to suggest living together",
        scale: 53,
        answer: 10,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are not particularly needy, and don't prematurely seek engagement or involvement with another. You do not necessarily deal with anxiety by clinging to others and establishing uncomfortable closeness and/or attention for re-assurance.",
    },
    {
        question: "I'm usually not the first one to suggest living together",
        scale: 53,
        answer: 10,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not prone to reduce your anxiety by over-clinging to another, filling your space with demands of closeness, attention or re-assurance.  If you do indulge in this proclivity, it will not be excessive, hence, probably will not cause problems. This tendency correlates with low self-esteem, which probably is not your primary experience; hence, you are not particularly inclined to pre-maturely seek engagement, involvement and ultimately, false commitment.  In this area, you are doing wel',
    },

    {
        question:
            "I prefer to compliment people's strengths more than to criticize their weaknesses",
        scale: 57,
        answer: 11,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not prone to communicate in a style that embeds more positive messages relative to negative ones. (The correct ratio is four-to-one; meaning, for every five things said, four will reflect some positive theme, vs. the one "other," which hopefully, will be more neutral vs. outright negative.)   You are less likely to create a pleasant experience with another in your communication style, thus will not likely experience things related--optimism, agreeableness, success in negotiations, low-friction interactions, etc.',
    },
    {
        question:
            "I prefer to compliment people's strengths more than to criticize their weaknesses",
        scale: 57,
        answer: 11,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your communicate style is neutral, neither embedding more positive messages relative to negative ones, or vice versa. Because your communication style is neither positive nor negative, the recipient of your communication probably will feel neither uplifted nor let down. Your communication style will have little effect on things like: success in negotiations, reducing frictions in interactions, etc.',
    },
    {
        question:
            "I prefer to compliment people's strengths more than to criticize their weaknesses",
        scale: 57,
        answer: 11,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are prone to communicate in a style that embeds more positive messages relative to negative ones. (The correct ratio is four-to-one; meaning, for every five things said, four will reflect some positive theme, vs. the one "other," which hopefully, will be more neutral vs. outright negative.)   This has a beneficent impact and correlates with: optimism, agreeableness, success in negotiations, low-friction interactions, etc.',
    },

    {
        question: "I don't necessarily respect people's time or physical space",
        scale: 4,
        answer: 12,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You may not well-respect yours and others needs, choices and personal space.  This quality reflects the "property lines" that define and protect individuals from others. It helps us understand friction points, serious hurts and potential betrayals. You may lack the ability to perceive these and to move beyond them to mutual care, respect, affirmation and intimacy.',
    },
    {
        question: "I don't necessarily respect people's time or physical space",
        scale: 4,
        answer: 12,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle range for identifying and respecting the "property lines" that define and protect individuals from others. This quality has to do with other\'s needs, choices and personal space and helps us understand friction points, serious hurts and potential betrayals. You are neither strong nor weak in the ability ',
    },
    {
        question: "I don't necessarily respect people's time or physical space",
        scale: 4,
        answer: 12,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You respect yours and other\'s needs, choices and personal space. This quality reflects the "property lines" that define and protect individuals from others. They help us understand friction points, serious hurts and potential betrayals. You have the ability to perceive these and to move beyond them to mutual care, respect, affirmation and intimacy.',
    },

    {
        question: "I don't think about sex more than anyone else",
        scale: 60,
        answer: 13,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Sex is very high up in your things to think about. You think about it too much, probably to the detriment of thinking about other things. This correlates with: anxiety, low self-esteem, addiction tendencies, a limited social repertoire, etc.',
    },
    {
        question: "I don't think about sex more than anyone else",
        scale: 60,
        answer: 13,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "Sex is neither high nor low on your list of things to think about. Sometimes you may think about it too much, but not overall, and certainly not to the point of being detrimental. Sex, as a topic, probably has only 'some' impact on your anxiety, self-esteem, addiction tendencies or social repertoire of behaviors.",
    },
    {
        question: "I don't think about sex more than anyone else",
        scale: 60,
        answer: 13,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'Sex is not very high up in your things to think about. You do not think about it too much, which frees you up to think about other things. This correlates with: lowered anxiety, healthier self-esteem, less proneness to addiction, greater repertoire of personal, even social behaviors, etc.',
    },

    {
        question: 'I live to work, not work to live',
        scale: 12,
        answer: 14,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have less than average ability to enjoy the moment with self or others, to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. This loosely overlaps with other personality traits which may also not be developed: openness and spontaneity. In short, you may not be able to fully enjoy—to have fun.',
    },
    {
        question: 'I live to work, not work to live',
        scale: 12,
        answer: 14,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone to nor avoidant of having fun. You may or may not have the capability or utilize the ability to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. You are neither inclined nor disinclined to be open, or to seek out social relationships where the ability have fun will engender liveliness and novelty.',
    },
    {
        question: 'I live to work, not work to live',
        scale: 12,
        answer: 14,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to enjoy the moment with self or others; the ability to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. This loosely overlaps with other personality traits: openness and spontaneity. You have the ability to enjoy social relationships where our capacity to have fun enlivens and introduces novelty.',
    },

    {
        question:
            "I don't normally seek revenge, but when I do, I'll tell you first",
        scale: 54,
        answer: 15,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to act out aggression in indirect ways.  You probably exhibit resistance to requests or demands from family and others by procrastination, expressing sullenness or acting stubborn. You may irritate others by your inaction.  In extreme circumstances, you may be outright oppositional.',
    },
    {
        question:
            "I don't normally seek revenge, but when I do, I'll tell you first",
        scale: 54,
        answer: 15,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither direct nor indirect in the expression of aggression. You are unremarkable in your tendency to be either aggressive or passive aggressive. You are not inclined to be overly or chronically stubborn, resistant or even oppositional.',
    },
    {
        question:
            "I don't normally seek revenge, but when I do, I'll tell you first",
        scale: 54,
        answer: 15,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to act out aggression in direct ways vs. indirect ways. You are less inclined to exhibit resistance to requests or demands from family and others by procrastination, by expressing sullenness or by acting stubborn. These are good qualities, which makes you less likely to irritate others by your inaction.  You are not inclined to be oppositional',
    },

    {
        question:
            "I try to understand the cause of someone's behavior Later, it helps me to let it go",
        scale: 11,
        answer: 16,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not have much ability to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offense. You tend to hold onto negative emotions such as vengefulness, and don’t subscribe to the idea of foreswearing recompense from or punishing an offender.',
    },
    {
        question:
            "I try to understand the cause of someone's behavior Later, it helps me to let it go",
        scale: 11,
        answer: 16,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor averse to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offence. Your score in this area is in the middle of the spectrum',
    },
    {
        question:
            "I try to understand the cause of someone's behavior Later, it helps me to let it go",
        scale: 11,
        answer: 16,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offence.  You can also let go of negative emotions such as vengefulness, and understand foreswearing recompense from or punishing an offender, however legally or morally justified it might be.  You have a higher-than-normal ability to wish the offender well. ',
    },

    {
        question: 'I use my feelings when thinking about something',
        scale: 8,
        answer: 17,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have not much capability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your skill in this area is low so does not add to your overall success in manifesting intelligence, social and professional skills.',
    },

    {
        question: 'I use my feelings when thinking about something',
        scale: 8,
        answer: 17,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in the ability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your abilities in this area are average so there will be no noticeable overall success or failure in manifesting intelligence, social and professional skills.',
    },
    {
        question: 'I use my feelings when thinking about something',
        scale: 8,
        answer: 17,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the capability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your skill in this area adds to your overall success in manifesting intelligence, social and professional skills.',
    },

    {
        question: 'I am at least one of these: reliable and/or devoted',
        scale: 5,
        answer: 18,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are neither driven by conscience nor controlled by your inner sense of what is right. You are not governed much by principles, consequently you may also not be careful or painstaking, particular, meticulous or scrupulous.',
    },
    {
        question: 'I am at least one of these: reliable and/or devoted',
        scale: 5,
        answer: 18,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither governed by conscience nor controlled by or do things according to your inner sense of what is right. You probably follow your principles most of the time, but you are not wedded to being careful, painstaking, particular, meticulous and/or scrupulous. On this scale your score is in the middle of the spectrum.',
    },
    {
        question: 'I am at least one of these: reliable and/or devoted',
        scale: 5,
        answer: 18,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are governed by conscience, controlled by or do things according to your inner sense of what is right. You have principles and you probably also have some of the following related traits: careful, painstaking, particular, meticulous and scrupulous.',
    },

    {
        question: 'People find me pleasing to be around',
        scale: 1,
        answer: 20,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly warm, friendly or tactful. You probably are not that optimistic and may not get along with others. Sometimes associated to low scores in this area are: distrusting, amorality, self-centeredness, oppositional, immodest and lack of sympathy for others.',
    },
    {
        question: 'People find me pleasing to be around',
        scale: 1,
        answer: 20,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle percentiles for warmth, friendliness and tact. You are probably mixed in optimism and may or may not consistently get along with others. You also may not be high or low in the following: trusting, moral, altruistic, cooperative, modest and sympathetic.',
    },
    {
        question: 'People find me pleasing to be around',
        scale: 1,
        answer: 20,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to be more warm, friendly and tactful. You are generally optimistic and get along with others. Traits that frequently are associated are: trusting, moral, altruistic, cooperative, modest and sympathetic.',
    },

    {
        question: 'I enjoy just being in the moment',
        scale: 20,
        answer: 21,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are not particularly capable of being accepting, paying attention to your thoughts and feelings without judging them. You probably cling to thinking being either 'right' or 'wrong' in any given moment. You may not be able to tune into your thoughts and sensations and to stay in the moment rather than drift either into past or future thinking. Your score on these qualities is low.",
    },
    {
        question: 'I enjoy just being in the moment',
        scale: 20,
        answer: 21,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither particularly strong nor weak in the quality of being accepting and paying attention to your thoughts and feelings without judging. You may or may not think that thoughts and feelings are not necessarily "right" or "wrong" in any given moment. You are "so-so" in the ability to tune into your thoughts and sensations in the present moment rather than re-hashing the past or anticipating the future.',
    },
    {
        question: 'I enjoy just being in the moment',
        scale: 20,
        answer: 21,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            ' You are capable of being accepting, paying attention to your thoughts and feelings without judging them. You are capable of recognizing there are no necessarily "right" or "wrong" ways to think or feel in a given moment. You can tune into your thoughts and sensations in the present moment rather than re-hashing the past or anticipating the future. Your score for these qualities is high.',
    },

    {
        question:
            "I can read a person's feelings, even sometimes their thoughts from far away",
        scale: 9,
        answer: 22,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not much inclined to “walk a mile in someone else’s moccasins,” to “see the world through someone else’s eyes.”   You are not much interested in putting yourself in someone’s experience, to feel as they do. Because of this you have much less of a sense of another’s state.',
    },
    {
        question:
            "I can read a person's feelings, even sometimes their thoughts from far away",
        scale: 9,
        answer: 22,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You have average ability to “walk a mile in someone else’s moccasins,” to “see the world through their eyes.”   Sometimes you do and sometimes you don’t have the capability to put yourself in someone’s experience, to feel as they do. Your score in this area is somewhere in the middle of the spectrum.',
    },
    {
        question:
            "I can read a person's feelings, even sometimes their thoughts from far away",
        scale: 9,
        answer: 22,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have the ability to 'walk a mile in someone else’s moccasins,' to 'see the world through their eyes.' You have the capability to put yourself in someone’s experience, not just feel as they do. Because of this, you have a deeper sense of another’s state, which paradoxically requires a deeper awareness of self—in this case, used to more fully immerse yourself into others' experiences without losing your 'center.'",
    },

    {
        question:
            "I don't always care one way or another about all the little details",
        scale: 55,
        answer: 23,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have the tendency to view the world as either black or white. Such an orientation is correlated with: anxiety, procrastination and much later, depression. You have the tendency to avoid failure by overly striving for success, probably in an extreme manner--having to score 100% on every test, running the fastest race, etc.  In this area you create tension that probably negatively influences others.',
    },
    {
        question:
            "I don't always care one way or another about all the little details",
        scale: 55,
        answer: 23,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither overly concerned nor lackadaisical about performances on tests, general tasks etc. having to be 100%. You may or may not view the world in extremes--black or white thinking. For you, the world may appear to be many more shades of gray.',
    },
    {
        question:
            "I don't always care one way or another about all the little details",
        scale: 55,
        answer: 23,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not indulge in extreme thinking or functioning; for example, needing to score 100% on every test, running the fastest race, etc. You do not have much of a need to avoid failure by overly striving for success. You do not view the world as either black or white.  Because you do not share such an orientation, there is less likelihood you will manifest anxiety, procrastination or much later, depression.',
    },

    {
        question: 'I think my religion is the best religion',
        scale: 59,
        answer: 24,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have a strong belief that your religion is the right or best one, and consequently, other religions are wrong, or at least inferior. This orientation limits your connection with non-believers and correlates with: dogmatism, prejudice, discrimination, disapproval, intolerance, criticism and narrow-mindedness. Paradoxically, it does correlate with greater social bonding with fellow believers, even though it does not increase the likelihood of relationship success',
    },
    {
        question: 'I think my religion is the best religion',
        scale: 59,
        answer: 24,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You do not have a strong belief, one way or another, that your religion is the right or best one, and consequently, other religions are wrong, or at least inferior. This orientation neither limits nor expands your connection with not-believers. You may or may not indulge in dogmatism, prejudice, discrimination, disapproval, criticism and narrow-mindedness and you may be equally prone to express the opposite values; namely, openness, acceptance, approval and broad-mindedness. You will be equally prone to socially bond with fellow believers or non-believers, which will afford you greater choice in potential partners.',
    },
    {
        question: 'I think my religion is the best religion',
        scale: 59,
        answer: 24,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not dogmatic in your thinking about religions. You do not think that your religion is the right or best one, and therefore, other religions are wrong, or at least inferior. This orientation frees you to connect with non-believers and is negatively correlated (opposite relationship) with: prejudice, discrimination, disapproval, intolerance, criticism and narrow-mindedness. Paradoxically, it does correlate with lesser social bonding with fellow believers, even though it does increase the likelihood of relationship success.',
    },

    {
        question:
            'When someone hurts me, I harbor negative feelings for quite a while',
        scale: 11,
        answer: 25,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not have much ability to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offence. You tend to hold onto negative emotions such as vengefulness, and don’t subscribe to the idea of forswearing recompense from or punishing an offender.',
    },
    {
        question:
            'When someone hurts me, I harbor negative feelings for quite a while',
        scale: 11,
        answer: 25,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor averse to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offence. Your score in this area is in the middle of the spectrum.',
    },
    {
        question:
            'When someone hurts me, I harbor negative feelings for quite a while',
        scale: 11,
        answer: 25,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to intentionally and voluntarily change your feelings and attitudes regarding an offender who has committed an offense. You can also let go of negative emotions such as vengefulness, and understand foreswearing recompense from or punishing an offender, however legally or morally justified it might be. You have a higher-than-normal ability to wish the offender well.',
    },

    {
        question:
            "I'm more 'into' getting what I want, even if it is at the expense of others",
        scale: 2,
        answer: 26,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'The idea of elevating the welfare, happiness, interests or even the survival of others over your own does not interest you. You have little interest in the selfless concern for the well-being of others.',
    },
    {
        question:
            "I'm more 'into' getting what I want, even if it is at the expense of others",
        scale: 2,
        answer: 26,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are not concerned with elevating the welfare of others over your own, nor are you particularly focused exclusively on your own welfare over that of others. In other words, you are not particularly high or low in this aspect.',
    },
    {
        question:
            "I'm more 'into' getting what I want, even if it is at the expense of others",
        scale: 2,
        answer: 26,
        position: 3,
        low: 21,
        high: 30,
        analysis:
            'You tend to elevate the welfare, happiness, interests or even the survival of others, sometimes even above your own. This practice of disinterested and selfless concern for the well-being of others is very positive, unless taken to extremes (co-dependence, rescuing, enabling).',
    },

    {
        question: 'I like things to get personal',
        scale: 16,
        answer: 27,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not likely to use personal communications styles that reveal aspects of yourself.  Intimacy means deeply knowing another person and feeling deeply known. You are less likely to demonstrate this quality, as well as related traits and behaviors: trust and acceptance, openness, compassion and emotional intelligence. Your score on the Intimacy scale is low.',
    },
    {
        question: 'I like things to get personal',
        scale: 16,
        answer: 27,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither inclined nor disinclined to deeply know another person and/or to be deeply known. It may or may not occur to you to use personal communication that reveals aspects of yourself. It may or may not occur to you to manifest related traits: trust, acceptance, openness, appreciation of differences, safety, compassion and emotional intelligence. You are somewhere in the middle of this spectrum.',
    },
    {
        question: 'I like things to get personal',
        scale: 16,
        answer: 27,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of deeply knowing another person as well as feeling deeply known. You employ personal communication styles that reveal aspects of yourself others may avoid. The ability to be intimate correlates with other traits:  trust, acceptance, openness, appreciation of differences, safety, compassion and emotional intelligence.  Your score on this trait is high and correlates with relationship success.',
    },

    {
        question: "I'm capable of having a really good time",
        scale: 12,
        answer: 28,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have less than average ability to enjoy the moment with self or others, to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. This loosely overlaps with other personality traits which may also not be developed: openness and spontaneity. In short, you may not be able to fully enjoy—to have fun.',
    },
    {
        question: "I'm capable of having a really good time",
        scale: 12,
        answer: 28,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone to nor avoidant of having fun. You may or may not have the capability or utilize the ability to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. You are neither inclined nor disinclined to be open, or to seek out social relationships where the ability have fun will engender liveliness and novelty.',
    },
    {
        question: "I'm capable of having a really good time",
        scale: 12,
        answer: 28,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to enjoy the moment with self or others; the ability to de-emphasize self-awareness and to fully experience something entertaining, either spontaneously or by plan. This loosely overlaps with other personality traits: openness and spontaneity. You have the ability to enjoy social relationships where our capacity to have fun enlivens and introduces novelty.',
    },

    {
        question: 'I have some chronic health problems',
        scale: 46,
        answer: 29,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Your selection of partners is too dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. Your score on this scale is low, suggesting your orientation is not the best.',
    },
    {
        question: 'I have some chronic health problems',
        scale: 46,
        answer: 29,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your selection of partners neither is too dependent nor separate from their net worth or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. You are somewhere in the middle of this spectrum.',
    },
    {
        question: 'I have some chronic health problems',
        scale: 46,
        answer: 29,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'Your selection of partners is not dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. Your orientation in this area is good.',
    },

    {
        question: 'If someone says "No" to something, then "No" is OK',
        scale: 4,
        answer: 30,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly mature and probably are less than psychologically fully functioning. Your perceptions of reality may not be particularly realistic. You are not as accepting of yourself or others as you might be and you might be perceived as not very thoughtful. Your sense of humor might be tinged with hostility and you might not be able to freely and clearly express your emotions. You probably are less than open to learning from your mistakes because you do not care so much about your deeper motivations. You can be indirect and manipulative.',
    },
    {
        question: 'If someone says "No" to something, then "No" is OK',
        scale: 4,
        answer: 30,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither mature nor immature and psychologically function somewhere in the middle. Your perception of reality is average, as is your ability to be thoughtful, use humor in a non-hostile manner and to express your emotions freely and clearly. You are neither open nor closed to learning form your mistakes and to understand other's motivations. You are neither perceived as 'real' nor 'genuine' nor distant, indirect or manipulative. In these dimensions, you scored in the middle range",
    },
    {
        question: 'If someone says "No" to something, then "No" is OK',
        scale: 4,
        answer: 30,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have psychological maturity and are psychologically fully functioning. You have realistic perceptions of reality, are accepting of yourself and others, are thoughtful, have a non-hostile sense of humor, and are able to express emotions freely and clearly. You are open to learning from your mistakes and understand other's motivations. You seem 'real' or 'genuine' to others, as opposed to being indirect or manipulative.",
    },

    {
        question: 'People are basically more good than bad',
        scale: 24,
        answer: 31,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not much of a positive thinker.  You tend to be pessimistic, investing more in a less-than-generative and less-than-proactive styles of interacting with others.',
    },
    {
        question: 'People are basically more good than bad',
        scale: 24,
        answer: 31,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither positive nor negative in your thinking style. You are neither optimistic nor pessimistic in generating proactive styles of interacting with others.',
    },
    {
        question: 'People are basically more good than bad',
        scale: 24,
        answer: 31,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are strong in positive thinking.  You tend to be optimistic, investing more in a generative and proactive style of interacting with others.',
    },

    {
        question: "I can accommodate other's suggestions",
        scale: 6,
        answer: 32,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are not likely to engage in mutual assistance with others on projects. Your approach is non-collaborative when considering goals and psychological coordination. You probably aren't interested in being collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, agreeing and sharing.",
    },
    {
        question: "I can accommodate other's suggestions",
        scale: 6,
        answer: 32,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle range when it comes to collaborating with others in approaching projects. You do not especially care one way or another about collective ventures and consequently may or may not be seen as collegial, concerted, coordinating, harmonizing, indulging in reciprocity, agreeing and sharing as in working as a team.',
    },
    {
        question: "I can accommodate other's suggestions",
        scale: 6,
        answer: 32,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You provide mutual assistance to others and like working towards common goals. This quality suggests you can collaborate--create a collective venture towards goals and psychological coordination. You probably have one or more of these related traits: collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, joining others in teamwork, agreeing and sharing.',
    },

    {
        question:
            'Women and men are just different.  Neither one is better than the other',
        scale: 7,
        answer: 33,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are not likely to engage in mutual assistance with others on projects. Your approach is non-collaborative when considering goals and psychological coordination. You probably aren't interested in being collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, agreeing and sharing.",
    },
    {
        question:
            'Women and men are just different.  Neither one is better than the other',
        scale: 7,
        answer: 33,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle range when it comes to collaborating with others in approaching projects. You do not especially care one way or another about collective ventures and consequently may or may not be seen as collegial, concerted, coordinating, harmonizing, indulging in reciprocity, agreeing and sharing as in working as a team.',
    },
    {
        question:
            'Women and men are just different.  Neither one is better than the other',
        scale: 7,
        answer: 33,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You provide mutual assistance to others and like working towards common goals. This quality suggests you can collaborate--create a collective venture towards goals and psychological coordination. You probably have one or more of these related traits: collegial, concerted, coordinating, harmonizing, creating interdependence and reciprocity, joining others in teamwork, agreeing and sharing.',
    },

    {
        question: "I don't take myself that seriously",
        scale: 14,
        answer: 34,
        position: 0,
        low: 0,
        high: 10,
        analysis:
        'You do not emphasize humility in your daily behavior. You are slightly more likely to be arrogant, but your first priority really is more about not feeling small, or insignificant when interacting with others.'
    },
    {
        question: "I don't take myself that seriously",
        scale: 14,
        answer: 34,
        position: 1,
        low: 11,
        high: 20,
        analysis: 'You are neither humble nor arrogant. You fall somewhere in the middle and may or may not think of yourself in simple, insignificant terms in the overall scheme of things.'
    },
    {
        question: "I don't take myself that seriously",
        scale: 14,
        answer: 34,
        position: 2,
        low: 21,
        high: 30,
        analysis: 'You tend to not exaggerate your own sense of importance, to feel relatively small in the scheme of things. You perceive yourself as more simple, or insignificant, who probably spends time taking care of others. You have traits that are the opposite of arrogance.  This trait positively correlates with success in relationships'
    },

    {
        question: 'I tell people what they want to hear',
        scale: 3,
        answer: 35,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly mature and probably are less than psychologically fully functioning. Your perceptions of reality may not be particularly realistic. You are not as accepting of yourself or others as you might be and you might be perceived as not very thoughtful. Your sense of humor might be tinged with hostility and you might not be able to freely and clearly express your emotions. You probably are less than open to learning from your mistakes because you do not care so much about your deeper motivations.  You can be indirect and manipulative.',
    },
    {
        question: 'I tell people what they want to hear',
        scale: 3,
        answer: 35,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither mature nor immature and psychologically function somewhere in the middle. Your perception of reality is average, as is your ability to be thoughtful, use humor in a non-hostile manner and to express your emotions freely and clearly. You are neither open nor closed to learning form your mistakes and to understand other's motivations. You are neither perceived as 'real' nor 'genuine' nor distant, indirect or manipulative. In these dimensions, you scored in the middle range",
    },
    {
        question: 'I tell people what they want to hear',
        scale: 3,
        answer: 35,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have psychological maturity and are psychologically fully functioning. You have realistic perceptions of reality, are accepting of yourself and others, are thoughtful, have a non-hostile sense of humor, and are able to express emotions freely and clearly. You are open to learning from your mistakes and understand other's motivations.  You seem 'real' or 'genuine' to others, as opposed to being indirect or manipulative.",
    },

    {
        question: 'I relate to funny people',
        scale: 15,
        answer: 36,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "While you may be capable of appreciating what is amusing and entertaining, in your interactions with others, you probably don't employ the techniques of humor (misdirection, exaggeration and contrast or creating unexpected outcomes to stories). You scored fairly low on this trait.",
    },
    {
        question: 'I relate to funny people',
        scale: 15,
        answer: 36,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither funny nor not funny.  You are in the middle of the spectrum for this trait',
    },
    {
        question: 'I relate to funny people',
        scale: 15,
        answer: 36,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to create or appreciate what is amusing and to be entertaining in a funny way. You probably are skilled in the techniques of humor: contrast, misdirection, being droll or creating unexpected outcomes.  You scored high on this trait.',
    },

    {
        question: "I'm not a big fan of change",
        scale: 22,
        answer: 37,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not emphasize transparency and free, unrestricted access to knowledge and information. You are not particularly collaborative and probably do not prefer cooperative management and decision-making styles. Closed individuals often prefer central authority, which is more favorable to secrecy. These qualities correlate with the need for control, and avoidance of new experiences and a decreased likelihood of creating a teamwork approach in business.',
    },
    {
        question: "I'm not a big fan of change",
        scale: 22,
        answer: 37,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither open nor closed to new experiences. You neither espouse nor avoid emphasizing transparency and free, unrestricted access to knowledge and information. You are neither collaborative nor isolating. You probably have little preference one way or another for cooperative management and related decision-making styles. Closed individuals often prefer central authority. Openness is the opposite of secrecy. Lack of Openness is correlated with the need for control, and avoidance of new experiences and a teamwork approach in business.  You are in the middle of this spectrum, so don't seem to lean one way or another.",
    },
    {
        question: "I'm not a big fan of change",
        scale: 22,
        answer: 37,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You emphasize transparency and free, unrestricted access to knowledge and information. You are collaborative and probably prefer cooperative management and decision-making styles as opposed to preferring central authority. This trait is the opposite of secrecy and is correlated with a preference for new experiences and a teamwork approach in business.',
    },

    {
        question:
            "I've had jobs where I've wanted to tell the boss to shove it",
        scale: 'UNKNOWN',
        answer: 38,
        position: 0,
        low: 0,
        high: 10,
        analysis: '1 -',
    },
    {
        question:
            "I've had jobs where I've wanted to tell the boss to shove it",
        scale: 'UNKNOWN',
        answer: 38,
        position: 1,
        low: 11,
        high: 20,
        analysis: '2 -',
    },
    {
        question:
            "I've had jobs where I've wanted to tell the boss to shove it",
        scale: 'UNKNOWN',
        answer: 38,
        position: 2,
        low: 21,
        high: 30,
        analysis: '3 -',
    },

    {
        question:
            'I tend to judge people by what kind of car they drive, or the clothing or jewelry they wear',
        scale: 44,
        answer: 39,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Your selection of partners is too dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. Your score on this scale is low, suggesting your orientation is not the best.',
    },
    {
        question:
            'I tend to judge people by what kind of car they drive, or the clothing or jewelry they wear',
        scale: 44,
        answer: 39,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your selection of partners neither is too dependent nor separate from their net worth or their perceived ability to provide for your needs.  This orientation, while practical, does have an air of superficiality and correlates with relationship failure.  You are somewhere in the middle of this spectrum.',
    },
    {
        question:
            'I tend to judge people by what kind of car they drive, or the clothing or jewelry they wear',
        scale: 44,
        answer: 39,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'Your selection of partners is not dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure.  Your orientation in this area is good.',
    },

    {
        question: 'My first impulse is to tell the truth',
        scale: 13,
        answer: 40,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Being honest via spoken word or deed is not high on you priority list. This does not necessarily mean you are prone to lie, only that honesty is not your first level of focus.',
    },
    {
        question: 'My first impulse is to tell the truth',
        scale: 13,
        answer: 40,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are not concerned any more than the average person about being honest, though this does not mean you are dishonest. You are somewhere in the middle range for this trait.',
    },
    {
        question: 'My first impulse is to tell the truth',
        scale: 13,
        answer: 40,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are more honest than not--faithfully representing the truth as you see it via spoken word or deed.  This quality correlates with successful relationships.',
    },

    {
        question: 'People sometimes think of me as haughty or snobbish',
        scale: 14,
        answer: 41,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not emphasize humility in your daily behavior. You are slightly more likely to be arrogant, but your first priority really is more about not feeling small, or insignificant when interacting with others.',
    },
    {
        question: 'People sometimes think of me as haughty or snobbish',
        scale: 14,
        answer: 41,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither humble nor arrogant. You fall somewhere in the middle and may or may not think of yourself in simple, insignificant terms in the overall scheme of things.',
    },
    {
        question: 'People sometimes think of me as haughty or snobbish',
        scale: 14,
        answer: 41,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to not exaggerate your own sense of importance, to feel relatively small in the scheme of things. You perceive yourself as more simple, or insignificant, who probably spends time taking care of others. You have traits that are the opposite of arrogance.  This trait positively correlates with success in relationships.',
    },

    {
        question: "I'm not comfortable giving and receiving love",
        scale: 19,
        answer: 42,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in the ability to experience empathy, compassion and to choose to love another. You may not express and exemplify related traits: trust selflessness, altruism, understanding, forgiveness and the suspension of indifference and/or the urge to exact revenge.  Low scores on this trait correlate with overall lowered emotional intelligence.',
    },
    {
        question: "I'm not comfortable giving and receiving love",
        scale: 19,
        answer: 42,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither capable nor incapable of experiencing a mix of empathy, compassion and therefore, you may or may not choose to be open to experience love with another. Overall, being capable of loving correlates with emotional maturity.  On this scale, your score is in the middle of the spectrum.',
    },

    {
        question: "I'm not comfortable giving and receiving love",
        scale: 19,
        answer: 42,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of experiencing a mix of empathy, compassion and you have the choice to be open to experience love with another. Related traits are: trust, selflessness, altruism, understanding, forgiveness, suspension of indifference and/or the urge to exact revenge.  Overall, scoring high on these traits correlates with emotional maturity.',
    },

    {
        question:
            "Thoughts should dominate, so I don't consider my feelings much",
        scale: 8,
        answer: 43,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have not much capability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your skill in this area is low so does not add to your overall success in manifesting intelligence, social and professional skills.',
    },
    {
        question:
            "Thoughts should dominate, so I don't consider my feelings much",
        scale: 8,
        answer: 43,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in the ability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your abilities in this area are average so there will be no noticeable overall success or failure in manifesting intelligence, social and professional skills.',
    },
    {
        question:
            "Thoughts should dominate, so I don't consider my feelings much",
        scale: 8,
        answer: 43,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the capability to recognize emotions, discern between different feelings and label them appropriately, and then to use this information to guide thinking and behavior. Your skill in this area adds to your overall success in manifesting intelligence, social and professional skills.',
    },

    {
        question: "I'm prone to 'get in someone's face'",
        scale: 34,
        answer: 44,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are high in likelihood of acting out in ways that hurt others.  Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this manner creates a suite of negative reactions in the recipient, usually causing turmoil. Because of your low score on this scale, you are relatively prone to exhibit this trait.',
    },
    {
        question: "I'm prone to 'get in someone's face'",
        scale: 34,
        answer: 44,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in likelihood to act out in a way that hurts others. Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this way creates a suite of negative reactions in the recipient, usually causing turmoil. Because you are in the middle of the spectrum of this trait, you may sometimes resort to aggression, but sometimes not.',
    },
    {
        question: "I'm prone to 'get in someone's face'",
        scale: 34,
        answer: 44,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are low in acting out in ways that hurt others. Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this way creates a suite of negative reactions in the recipient, usually causing turmoil. You score high in this area and are relatively free from this tendency.',
    },

    {
        question: 'I occasionally get a cold or the flu',
        scale: 'UNKNOWN',
        answer: 45,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: 'I occasionally get a cold or the flu',
        scale: 'UNKNOWN',
        answer: 45,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: 'I occasionally get a cold or the flu',
        scale: 'UNKNOWN',
        answer: 45,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },
    {
        question:
            "I've had trouble with gambling, alcohol, drugs or too much sex",
        scale: 33,
        answer: 46,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have a history of addictions, which is compromising.  Addictions usually occur in six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). You are more prone to exhibit maladaptive behaviors in response to stress.',
    },
    {
        question:
            "I've had trouble with gambling, alcohol, drugs or too much sex",
        scale: 33,
        answer: 46,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You do not have a strong history of addictions, although you probably have at least some exposure.  Addictions usually occur in six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). You are in the middle of this spectrum and may or may not have learned maladaptive behaviors in response to stress.',
    },
    {
        question:
            "I've had trouble with gambling, alcohol, drugs or too much sex",
        scale: 33,
        answer: 46,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not have a history of addictions, which is very good.  Addictions usually occur in one or more of six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). Your scores suggest you are likely to be relatively free from maladaptive (in this case addictive) behaviors in response to stress.',
    },

    {
        question: "I make jokes but they don't go over well",
        scale: 15,
        answer: 47,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not emphasize humility in your daily behavior. You are slightly more likely to be arrogant, but your first priority really is more about not feeling small, or insignificant when interacting with others.',
    },
    {
        question: "I make jokes but they don't go over well",
        scale: 15,
        answer: 47,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither funny nor not funny. You are in the middle of the spectrum for this trait.',
    },

    {
        question: "I make jokes but they don't go over well",
        scale: 15,
        answer: 47,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to create or appreciate what is amusing and to be entertaining in a funny way. You probably are skilled in the techniques of humor: contrast, misdirection, being droll or creating unexpected outcomes.  You scored high on this trait.',
    },

    {
        question: 'Persistence and determination alone are omnipotent',
        scale: 23,
        answer: 48,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to give up, and you may regress into stubbornness, even if just by being too passive to not cooperate. These qualities also correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are weak in many of these traits.',
    },
    {
        question: 'Persistence and determination alone are omnipotent',
        scale: 23,
        answer: 48,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in persistence. Sometimes you tend to give up, and you may regress into stubbornness, even if expressing not cooperating by just being passive. Other times you hang in there. These qualities correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. You score in the middle of this spectrum so likely do not show strong or weak variants of the above traits.',
    },
    {
        question: 'Persistence and determination alone are omnipotent',
        scale: 23,
        answer: 48,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not give up, but you also do not regress into stubbornness. Persistence is first cousin to determination and also related to the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are strong in many of these traits',
    },

    {
        question: "I'm not suspicious",
        scale: 30,
        answer: 49,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do easily believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. Your score on this spectrum is low.',
    },
    {
        question: "I'm not suspicious",
        scale: 30,
        answer: 49,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in believing what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area you are neither strong nor weak.',
    },
    {
        question: "I'm not suspicious",
        scale: 30,
        answer: 49,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area, you score high and are strong.',
    },

    {
        question: 'I have values and principles. They work for me',
        scale: 31,
        answer: 50,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do easily believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. Your score on this spectrum is low.',
    },
    {
        question: 'I have values and principles. They work for me',
        scale: 31,
        answer: 50,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in believing what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area you are neither strong nor weak.',
    },
    {
        question: 'I have values and principles. They work for me',
        scale: 31,
        answer: 50,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area, you score high and are strong.',
    },

    {
        question: "I'm not very affectionate",
        scale: 17,
        answer: 51,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You probably are not inclined to like or care for someone or something in a personal, fond manner. You are probably not so inclined to use physical touch when speaking with others. Your communication will less likely be characterized by poignancy, gentleness and sincerity. Your score in these areas is low',
    },
    {
        question: "I'm not very affectionate",
        scale: 17,
        answer: 51,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You may or may not use physical touch when communicating with others. You may or may not attach to others--to be "fond" of them. You may or may not experience poignancy, gentleness and sincerity. On these traits, you are in the middle of the spectrum.',
    },
    {
        question: "I'm not very affectionate",
        scale: 17,
        answer: 51,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of liking and caring for someone or something. You can experience the sense of tender attachment--a fondness. This trait correlates with poignancy, gentleness and sincerity. It also is associated with the tendency to employ physical touch during communication. Your score in this area is high.',
    },

    {
        question: "Sorry, I just don't like everybody",
        scale: 'UNKNOWN',
        answer: 52,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: "Sorry, I just don't like everybody",
        scale: 'UNKNOWN',
        answer: 52,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "Sorry, I just don't like everybody",
        scale: 'UNKNOWN',
        answer: 52,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: "I can't take criticism",
        scale: 26,
        answer: 53,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            '1 -You likely do not have a healthy sense of your inner world and the value of being at its center. This sense of self-esteem, self-image or self-confidence is generated from multiple sources, beginning with your family-of-origin. It also is derived from your competence (actual abilities), ego strength (being assertive or being able to withstand criticism) and lastly, being comfortable with yourself, no matter what.  In one or more of these areas you scored low. ',
    },
    {
        question: "I can't take criticism",
        scale: 26,
        answer: 53,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low and probably are not remarkable in having a healthy sense of one's inner world (self-esteem, self-image, self-confidence) and valuing being at its center. You may or may not be especially competent at one thing or another. You may or may not have the ability to be assertive and/or to deal with criticism and lastly, to accept yourself, no matter what.  You score in the middle of the spectrum for these qualities.",
    },
    {
        question: "I can't take criticism",
        scale: 26,
        answer: 53,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a healthier sense of your inner world and the value of being at its center. This sense of self-esteem, self-image or self-confidence comes from multiple sources, beginning with your family-of-origin. It also is derived from your competence (actual abilities), ego strength (being assertive and/or being able to withstand criticism) and lastly, from self-acceptance, being comfortable with yourself, no matter what.  In one or more of these areas you are well-developed.',
    },
    {
        question: "I don't push myself to extremes.  I take care of myself",
        scale: 27,
        answer: 54,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Your capacity to take care of yourself by being aware of the needs of your body and mind at any given moment is low. This could be because of poor diet and exercise, or psychologically, about not expressing yourself or acknowledging your inner thoughts or feelings. These qualities are about doing what is good for you without hurting others. In these areas, you may need work.',
    },
    {
        question: "I don't push myself to extremes.  I take care of myself",
        scale: 27,
        answer: 54,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low in the capacity to take care of yourself by being aware of the needs of your body and mind at any given moment. This could be about diet and exercise, or psychologically, about expressing yourself, acknowledging your inner thoughts and feelings. You probably mostly do what is good for you without hurting others. However, in at least some of these areas, you don't really stand out--not good, not bad.",
    },
    {
        question: "I don't push myself to extremes.  I take care of myself",
        scale: 27,
        answer: 54,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a healthy ability to take care of yourself by being aware of the needs of your body and mind at any given moment. This could be about diet and exercise, or psychologically, about expressing yourself, acknowledging your inner thoughts and feelings. This is about doing what is good for you without hurting others. In these areas, you are in good shape.',
    },
    {
        question: "I'm a 'control freak'",
        scale: 39,
        answer: 55,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely burdened with the excessive need to manage others or situations using overt or subtle control. Trying to control others causes resentments and generally reflects a higher need for order. This trait can be a subtle form of aggression or may be an indirect way to mitigate underlying anxiety. It can also signal issues with underlying self-esteem or the tendency to manipulate. You scored low on this category, suggesting you are not doing well issues of control.',
    },
    {
        question: "I'm a 'control freak'",
        scale: 39,
        answer: 55,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "I'm a 'control freak'",
        scale: 39,
        answer: 55,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not burdened with the excessive need to manage others or situations using overt or subtle control. Trying to control others causes resentments and generally reflects a higher need for order. This trait can be a subtle form of aggression or may be an indirect way to mitigate underlying anxiety. It can also signal issues with underlying self-esteem or the tendency to manipulate. You scored high in this area, suggesting healthy adaptation to the need to control.',
    },

    {
        question: 'I have more anxiety than most',
        scale: 45,
        answer: 56,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You score low in Mental Health. This is a potential red flag. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation.',
    },
    {
        question: 'I have more anxiety than most',
        scale: 45,
        answer: 56,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You score neither high nor low in Mental Health. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation. On this dimension, you are somewhere in the middle of the spectrum.',
    },
    {
        question: 'I have more anxiety than most',
        scale: 45,
        answer: 56,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You score high in Mental Health. This is very good. Optimum mental health correlates with relationship success. Conversely, mental illness places great stress on relationships and correlates with conflicts and ultimately, a higher level of separation.',
    },

    {
        question: "Sometimes, I hold back what I'm thinking",
        scale: 'UNKNOWN',
        answer: 57,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: "Sometimes, I hold back what I'm thinking",
        scale: 'UNKNOWN',
        answer: 57,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "Sometimes, I hold back what I'm thinking",
        scale: 'UNKNOWN',
        answer: 57,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: "I'm open to new ideas and experiences",
        scale: 22,
        answer: 58,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not emphasize transparency and free, unrestricted access to knowledge and information. You are not particularly collaborative and probably do not prefer cooperative management and decision-making styles. Closed individuals often prefer central authority, which is more favorable to secrecy. These qualities correlate with the need for control, and avoidance of new experiences and a decreased likelihood of creating a teamwork approach in business.',
    },
    {
        question: "I'm open to new ideas and experiences",
        scale: 22,
        answer: 58,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither open nor closed to new experiences. You neither espouse nor avoid emphasizing transparency and free, unrestricted access to knowledge and information. You are neither collaborative nor isolating. You probably have little preference one way or another for cooperative management and related decision-making styles. Closed individuals often prefer central authority. Openness is the opposite of secrecy. Lack of Openness is correlated with the need for control, and avoidance of new experiences and a teamwork approach in business. You are in the middle of this spectrum, so don't seem to lean one way or another.",
    },
    {
        question: "I'm open to new ideas and experiences",
        scale: 22,
        answer: 58,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You emphasize transparency and free, unrestricted access to knowledge and information. You are collaborative and probably prefer cooperative management and decision-making styles as opposed to preferring central authority. This trait is the opposite of secrecy and is correlated with a preference for new experiences and a teamwork approach in business.',
    },

    {
        question: 'I tend to give up if something is too difficult',
        scale: 23,
        answer: 59,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to give up, and you may regress into stubbornness, even if just by being too passive to not cooperate. These qualities also correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are weak in many of these traits.',
    },
    {
        question: 'I tend to give up if something is too difficult',
        scale: 23,
        answer: 59,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in persistence. Sometimes you tend to give up, and you may regress into stubbornness, even if expressing not cooperating by just being passive. Other times you hang in there. These qualities correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. You score in the middle of this spectrum so likely do not show strong or weak variants of the above traits.',
    },
    {
        question: 'I tend to give up if something is too difficult',
        scale: 23,
        answer: 59,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not give up, but you also do not regress into stubbornness. Persistence is first cousin to determination and also related to the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are strong in many of these traits.',
    },

    {
        question: "When someone says 'I love you', I can say it back",
        scale: 19,
        answer: 60,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in the ability to experience empathy, compassion and to choose to love another. You may not express and exemplify related traits: trust selflessness, altruism, understanding, forgiveness and the suspension of indifference and/or the urge to exact revenge. Low scores on this trait correlate with overall lowered emotional intelligence.',
    },
    {
        question: "When someone says 'I love you', I can say it back",
        scale: 19,
        answer: 60,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither capable nor incapable of experiencing a mix of empathy, compassion and therefore, you may or may not choose to be open to experience love with another. Overall, being capable of loving correlates with emotional maturity. On this scale, your score is in the middle of the spectrum.',
    },
    {
        question: "When someone says 'I love you', I can say it back",
        scale: 19,
        answer: 60,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of experiencing a mix of empathy, compassion and you have the choice to be open to experience love with another. Related traits are: trust, selflessness, altruism, understanding, forgiveness, suspension of indifference and/or the urge to exact revenge. Overall, scoring high on these traits correlates with emotional maturity.',
    },

    {
        question: 'Neither of my parents was an addict of any kind',
        scale: 33,
        answer: 61,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have a history of addictions, which is compromising.  Addictions usually occur in six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). You are more prone to exhibit maladaptive behaviors in response to stress.',
    },
    {
        question: 'Neither of my parents was an addict of any kind',
        scale: 33,
        answer: 61,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You do not have a strong history of addictions, although you probably have at least some exposure.  Addictions usually occur in six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). You are in the middle of this spectrum and may or may not have learned maladaptive behaviors in response to stress.',
    },
    {
        question: 'Neither of my parents was an addict of any kind',
        scale: 33,
        answer: 61,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not have a history of addictions, which is very good.  Addictions usually occur in one or more of six areas: alcohol, drugs, sex, pornography, internet and gambling, although any mood-altering behavior is capable of fostering dependence (spending, exercising, etc.). Your scores suggest you are likely to be relatively free from maladaptive (in this case addictive) behaviors in response to stress.',
    },

    {
        question: "I can't tell you my feelings without embarrassment",
        scale: 16,
        answer: 62,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not likely to use personal communications styles that reveal aspects of yourself.  Intimacy means deeply knowing another person and feeling deeply known. You are less likely to demonstrate this quality, as well as related traits and behaviors: trust and acceptance, openness, compassion and emotional intelligence. Your score on the Intimacy scale is low.',
    },
    {
        question: "I can't tell you my feelings without embarrassment",
        scale: 16,
        answer: 62,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither inclined nor disinclined to deeply know another person and/or to be deeply known. It may or may not occur to you to use personal communication that reveals aspects of yourself. It may or may not occur to you to manifest related traits: trust, acceptance, openness, appreciation of differences, safety, compassion and emotional intelligence. You are somewhere in the middle of this spectrum.',
    },
    {
        question: "I can't tell you my feelings without embarrassment",
        scale: 16,
        answer: 62,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of deeply knowing another person as well as feeling deeply known. You employ personal communication styles that reveal aspects of yourself others may avoid. The ability to be intimate correlates with other traits:  trust, acceptance, openness, appreciation of differences, safety, compassion and emotional intelligence.  Your score on this trait is high and correlates with relationship success.',
    },

    {
        question: 'I think about morals and try to abide by them',
        scale: 31,
        answer: 63,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not particularly strong when it comes to having values. These are built on conscientiousness and represent principles, guiding ideas of what is right/wrong. Values shape and control behavior. Values can be higher (justice, serving others, protecting the young) or lower (self-serving, acting out impulses). Overall, on this scale you score low, suggesting relative weakness.',
    },
    {
        question: 'I think about morals and try to abide by them',
        scale: 31,
        answer: 63,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak when it comes to having values. These are built on conscientiousness and represent principles, guiding ideas of what is right/wrong. Values shape and control behavior. Values can be higher (justice, serving others, protecting the young) or lower (self-serving, acting out impulses). Overall, in these, you are in the middle of the spectrum; neither high nor low.',
    },
    {
        question: 'I think about morals and try to abide by them',
        scale: 31,
        answer: 63,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are strong in having values. These are built on conscientiousness and represent principles, guiding ideas of what is right/wrong. Values shape and control behavior. Values can be higher (justice, serving others, protecting the young) or lower (self-serving, acting out impulses). Overall, in these, you score well, suggesting strength.',
    },

    {
        question: 'Life is a good experience',
        scale: 24,
        answer: 64,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            ' You tend to give up, and you may regress into stubbornness, even if just by being too passive to not cooperate. These qualities also correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are weak in many of these traits.',
    },
    {
        question: 'Life is a good experience',
        scale: 24,
        answer: 64,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in persistence. Sometimes you tend to give up, and you may regress into stubbornness, even if expressing not cooperating by just being passive. Other times you hang in there. These qualities correlate with the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. You score in the middle of this spectrum so likely do not show strong or weak variants of the above traits.',
    },
    {
        question: 'Life is a good experience',
        scale: 24,
        answer: 64,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not give up, but you also do not regress into stubbornness. Persistence is first cousin to determination and also related to the following: endurance, perseverance, grit, stamina, tenacity, constancy, doggedness and indefatigability. Likely, you are strong in many of these traits.',
    },

    {
        question: 'I like physical contact when I talk with people',
        scale: 17,
        answer: 65,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You probably are not inclined to like or care for someone or something in a personal, fond manner. You are probably not so inclined to use physical touch when speaking with others. Your communication will less likely be characterized by poignancy, gentleness and sincerity. Your score in these areas is low.',
    },
    {
        question: 'I like physical contact when I talk with people',
        scale: 17,
        answer: 65,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You may or may not use physical touch when communicating with others. You may or may not attach to others--to be "fond" of them. You may or may not experience poignancy, gentleness and sincerity. On these traits, you are in the middle of the spectrum.',
    },
    {
        question: 'I like physical contact when I talk with people',
        scale: 17,
        answer: 65,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            '3 -You are capable of liking and caring for someone or something. You can experience the sense of tender attachment--a fondness. This trait correlates with poignancy, gentleness and sincerity. It also is associated with the tendency to employ physical touch during communication. Your score in this area is high. ',
    },
    {
        question: "I sometimes 'act out' my anger",
        scale: 35,
        answer: 66,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are probably not capable of managing your anger; in other words, you are high in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you are not doing well.',
    },
    {
        question: "I sometimes 'act out' my anger",
        scale: 35,
        answer: 66,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither capable nor incapable of managing your anger; which means you are neither high nor low in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you are in the middle of the anger-management spectrum.',
    },
    {
        question: "I sometimes 'act out' my anger",
        scale: 35,
        answer: 66,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of managing your anger, which means you are low in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you scored high and are doing well.',
    },

    {
        question: "I've had affairs",
        scale: 38,
        answer: 67,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic. One has to be able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  This may be you. In this area, your score is low, suggesting weakness.',
    },
    {
        question: "I've had affairs",
        scale: 38,
        answer: 67,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic.  Others deeply bond and are able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  You are in the middle of this spectrum.',
    },
    {
        question: "I've had affairs",
        scale: 38,
        answer: 67,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic. One has to be able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  However, this is not you. In this area, you are good.',
    },

    {
        question:
            'I usually plan things out, at least a little, before I do something',
        scale: 49,
        answer: 68,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You scored high in tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, your score suggests you are not doing so well.',
    },
    {
        question:
            'I usually plan things out, at least a little, before I do something',
        scale: 49,
        answer: 68,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You scored neither high nor low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, you scored in the middle of the spectrum.',
    },
    {
        question:
            'I usually plan things out, at least a little, before I do something',
        scale: 49,
        answer: 68,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You scored low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. In these areas you are doing well.',
    },

    {
        question: 'I occasionally tell a white lie',
        scale: 'UNKNOWN',
        answer: 69,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: 'I occasionally tell a white lie',
        scale: 'UNKNOWN',
        answer: 69,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: 'I occasionally tell a white lie',
        scale: 'UNKNOWN',
        answer: 69,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: "I don't necessarily eat or sleep well",
        scale: 27,
        answer: 70,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Your capacity to take care of yourself by being aware of the needs of your body and mind at any given moment is low. This could be because of poor diet and exercise, or psychologically, about not expressing yourself or acknowledging your inner thoughts or feelings. These qualities are about doing what is good for you without hurting others. In these areas, you may need work.',
    },
    {
        question: "I don't necessarily eat or sleep well",
        scale: 27,
        answer: 70,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "ou are neither high nor low in the capacity to take care of yourself by being aware of the needs of your body and mind at any given moment. This could be about diet and exercise, or psychologically, about expressing yourself, acknowledging your inner thoughts and feelings. You probably mostly do what is good for you without hurting others. However, in at least some of these areas, you don't really stand out--not good, not bad.",
    },
    {
        question: "I don't necessarily eat or sleep well",
        scale: 27,
        answer: 70,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a healthy ability to take care of yourself by being aware of the needs of your body and mind at any given moment. This could be about diet and exercise, or psychologically, about expressing yourself, acknowledging your inner thoughts and feelings. This is about doing what is good for you without hurting others. In these areas, you are in good shape.',
    },
    {
        question:
            "I'm more comfortable if I can become a part of my date's social circles",
        scale: 28,
        answer: 71,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You so not have much ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you have relative weaknesses.",
    },
    {
        question:
            "I'm more comfortable if I can become a part of my date's social circles",
        scale: 28,
        answer: 71,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither strong nor weak in your ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability to act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you are in the middle of the spectrum; neither high nor low.",
    },
    {
        question:
            "I'm more comfortable if I can become a part of my date's social circles",
        scale: 28,
        answer: 71,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have the ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability to act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you have strength.",
    },

    {
        question: 'My family was/is free of domestic violence',
        scale: 32,
        answer: 72,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely a victim of abuse. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. In this area, you likely have had negative experiences.',
    },
    {
        question: 'My family was/is free of domestic violence',
        scale: 32,
        answer: 72,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You score in the middle of the abuse spectrum. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. You may have had some abuse in your life but you may not define it as significant or you may have largely escaped this experience. Your score is in the middle of this spectrum.',
    },
    {
        question: 'My family was/is free of domestic violence',
        scale: 32,
        answer: 72,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not likely a victim of abuse. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. In this area, you likely have been spared. You score high on this quality suggesting relative freedom from this very negative kind of history.',
    },

    {
        question: 'I tend to bounce around from thing to thing',
        scale: 43,
        answer: 73,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You scored low in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you score low, suggesting you are not doing so well.',
    },
    {
        question: 'I tend to bounce around from thing to thing',
        scale: 43,
        answer: 73,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You scored neither high nor low in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you are in the middle of the spectrum.',
    },
    {
        question: 'I tend to bounce around from thing to thing',
        scale: 43,
        answer: 73,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You scored high in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you score high, suggesting you are doing well.',
    },

    {
        question:
            "When someone says they will do something, I don't necessarily believe them",
        scale: 30,
        answer: 74,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do easily believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. Your score on this spectrum is low.',
    },
    {
        question:
            "When someone says they will do something, I don't necessarily believe them",
        scale: 30,
        answer: 74,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in believing what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area you are neither strong nor weak.',
    },
    {
        question:
            "When someone says they will do something, I don't necessarily believe them",
        scale: 30,
        answer: 74,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You believe what is evident and that it is true, whether it be in the real world as in a business deal, or in the personal universe, such as a relationship. This trait interacts with a set of rules that are either assumed or made explicit, such as confidentiality, sincerity or safety. In this area, you score high and are strong.',
    },

    {
        question: "I'm fine with others having their way",
        scale: 39,
        answer: 75,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely burdened with the excessive need to manage others or situations using overt or subtle control. Trying to control others causes resentments and generally reflects a higher need for order. This trait can be a subtle form of aggression or may be an indirect way to mitigate underlying anxiety. It can also signal issues with underlying self-esteem or the tendency to manipulate. You scored low on this category, suggesting you are not doing well issues of control.',
    },
    {
        question: "I'm fine with others having their way",
        scale: 39,
        answer: 75,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "I'm fine with others having their way",
        scale: 39,
        answer: 75,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not burdened with the excessive need to manage others or situations using overt or subtle control. Trying to control others causes resentments and generally reflects a higher need for order. This trait can be a subtle form of aggression or may be an indirect way to mitigate underlying anxiety. It can also signal issues with underlying self-esteem or the tendency to manipulate. You scored high in this area, suggesting healthy adaptation to the need to control.',
    },

    {
        question: "I don't yell",
        scale: 34,
        answer: 76,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are high in likelihood of acting out in ways that hurt others.  Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this manner creates a suite of negative reactions in the recipient, usually causing turmoil. Because of your low score on this scale, you are relatively prone to exhibit this trait. ',
    },
    {
        question: "I don't yell",
        scale: 34,
        answer: 76,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in likelihood to act out in a way that hurts others. Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this way creates a suite of negative reactions in the recipient, usually causing turmoil. Because you are in the middle of the spectrum of this trait, you may sometimes resort to aggression, but sometimes not.',
    },
    {
        question: "I don't yell",
        scale: 34,
        answer: 76,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are low in acting out in ways that hurt others. Aggression can be verbal or physical and in either case probably is maladaptive. Acting in this way creates a suite of negative reactions in the recipient, usually causing turmoil. You score high in this area and are relatively free from this tendency.',
    },
    {
        question: "I seldom use phrases like 'you should' or 'you need to'",
        scale: 40,
        answer: 77,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            '1 -You are prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you score low, suggesting you are not doing well.',
    },
    {
        question: "I seldom use phrases like 'you should' or 'you need to'",
        scale: 40,
        answer: 77,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor not prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you are in the middle of the spectrum, suggesting sometimes you will and sometimes you will not be too critical.',
    },
    {
        question: "I seldom use phrases like 'you should' or 'you need to'",
        scale: 40,
        answer: 77,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            ' You are not prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you score high suggesting you are doing well.',
    },

    {
        question: "I'm told I live in a fantasy world",
        scale: 25,
        answer: 78,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            '1 -You do not tend to deal with things, situations and others as they are, as opposed to what you or others wish. You probably show the opposite of one or more of the following traits: assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and utilitarian.  In some of these areas, you are not doing so well.',
    },
    {
        question: "I'm told I live in a fantasy world",
        scale: 25,
        answer: 78,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to deal with things, situations, and others as they are, not as they or you wish. You may or may not have some of the following traits:  Assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and/or utilitarian. In these areas, you are in the middle.',
    },
    {
        question: "I'm told I live in a fantasy world",
        scale: 25,
        answer: 78,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to deal with things, situations and others as they are, not as they or you wish. Associated traits are: assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and utilitarian.  In these areas, you are doing well.',
    },

    {
        question: 'I have never outright lied',
        scale: 'UNKNOWN',
        answer: 79,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: 'I have never outright lied',
        scale: 'UNKNOWN',
        answer: 79,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: 'I have never outright lied',
        scale: 'UNKNOWN',
        answer: 79,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question:
            'I like to do my half of the work, but I also let others do theirs',
        scale: 41,
        answer: 80,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are prone to being too dominant. Dominance is Controlling's first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or '50-50.'   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you score low, suggesting problems with Dominance.",
    },
    {
        question:
            'I like to do my half of the work, but I also let others do theirs',
        scale: 41,
        answer: 80,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither prone nor not prone to being too dominant. Dominance is Controlling's first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or '50-50.'   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you are neither high nor low in Dominance.",
    },
    {
        question:
            'I like to do my half of the work, but I also let others do theirs',
        scale: 41,
        answer: 80,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You are high in not being too dominant. Dominance is Controllings first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or '50-50.'  No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. Your score in this area is high, suggesting, you are doing well.",
    },

    {
        question: 'I calm things down; whereas, others ramp things up',
        scale: 36,
        answer: 81,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in the ability to de-escalate tensions. You may not have an advantageous temperament (being born calm by nature). You may use incendiary language. You may not be prone to use physical gesture (gentle touch). Your score in this area is low, suggesting you likely do not have some of these skills.',
    },
    {
        question: 'I calm things down; whereas, others ramp things up',
        scale: 36,
        answer: 81,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in the ability to de-escalate tensions. You may or may not have a propitious temperament (being born calm by nature). You may or may not use non-incendiary language. You may or may not reduce tensions through physical gesture (gentle touch). With respect to these skills, you are in the middle of the spectrum.',
    },
    {
        question: 'I calm things down; whereas, others ramp things up',
        scale: 36,
        answer: 81,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in the ability to de-escalate tensions. Some do this by temperament (being born calm by nature). Some do this by using non-incendiary language. Some do this by physical gesture (gentle touch). You have at least some of these skills and in this area, you are doing well.',
    },

    {
        question: "People say I'm mature, relative to others",
        scale: 48,
        answer: 82,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are low on maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale, you score low, suggesting relative immaturity.",
    },
    {
        question: "People say I'm mature, relative to others",
        scale: 48,
        answer: 82,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low on maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale you scored in the middle of the spectrum.",
    },
    {
        question: "People say I'm mature, relative to others",
        scale: 48,
        answer: 82,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You are higher in maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale you scored very well.",
    },

    {
        question:
            'I have just gotten out of a long-term relationship within the last six months',
        scale: 58,
        answer: 83,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have just come out of a longer-term relationship and are now pre-maturely entering the relationship market. This means that past relationships are probably not well resolved in your mind. This correlates with greater failure in the current relationship.',
    },
    {
        question:
            'I have just gotten out of a long-term relationship within the last six months',
        scale: 58,
        answer: 83,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You may or may not have just come out of a longer-term relationship so you may or may not enter current relationships with unfinished "baggage" from history. This means that hangovers from past relationships may or may not be factors in your current relationship experience, regardless of whether they were positive or negative.',
    },
    {
        question:
            'I have just gotten out of a long-term relationship within the last six months',
        scale: 58,
        answer: 83,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have not just come out of a longer-term relationship. This means that past relationships are more resolved in your mind, which make you more emotionally present and available. This correlates with greater success in current relationship endeavors.',
    },

    {
        question:
            'Once I get focused on something, I usually stay that way until I finish',
        scale: 43,
        answer: 84,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are probably weak in your ability to have sustained attention. This is the ability to manage inevitable frictions, but also to celebrate great moments. This trait enables you to pay attention to what is important in relationships, practice communication exercises, place your partner first in certain transactions, work on maintaining the proper balance of compliments vs. criticisms, etc. In these areas you are not doing so well.',
    },
    {
        question:
            'Once I get focused on something, I usually stay that way until I finish',
        scale: 43,
        answer: 84,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither strong nor weak in your ability to have sustained attention. This trait is needed to effectively manage inevitable frictions, but also to celebrate great moments, practice communication exercises, place your partner first in certain transactions, work on maintaining the proper balance of compliments vs. criticisms, etc. In this area you are neither good nor bad.',
    },
    {
        question:
            'Once I get focused on something, I usually stay that way until I finish',
        scale: 43,
        answer: 84,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are strong in your ability to have sustained attention. This trait is needed to effectively manage inevitable frictions, but also to celebrate great moments. This trait enables you to pay attention to what is important in relationships--practicing communication exercises, placing your partner first in certain transactions, working on maintaining the proper balance of compliments vs. criticisms, etc. In these areas you are doing well.',
    },

    {
        question: "I'm competent",
        scale: 26,
        answer: 85,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            ' You likely do not have a healthy sense of your inner world and the value of being at its center. This sense of self-esteem, self-image or self-confidence is generated from multiple sources, beginning with your family-of-origin. It also is derived from your competence (actual abilities), ego strength (being assertive or being able to withstand criticism) and lastly, being comfortable with yourself, no matter what.  In one or more of these areas you scored low.',
    },
    {
        question: "I'm competent",
        scale: 26,
        answer: 85,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low and probably are not remarkable in having a healthy sense of one's inner world (self-esteem, self-image, self-confidence) and valuing being at its center. You may or may not be especially competent at one thing or another. You may or may not have the ability to be assertive and/or to deal with criticism and lastly, to accept yourself, no matter what.  You score in the middle of the spectrum for these qualities.",
    },
    {
        question: "I'm competent",
        scale: 26,
        answer: 85,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a healthier sense of your inner world and the value of being at its center. This sense of self-esteem, self-image or self-confidence comes from multiple sources, beginning with your family-of-origin. It also is derived from your competence (actual abilities), ego strength (being assertive and/or being able to withstand criticism) and lastly, from self-acceptance, being comfortable with yourself, no matter what.  In one or more of these areas you are well-developed.',
    },

    {
        question: 'I speak up and share my feelings',
        scale: 37,
        answer: 86,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            " You are low in the ability to effectively speak your mind, usually with the three 'I' statements: 'I think,' 'I feel' and 'I want.'   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, your score is low, suggesting you may not have these skills",
    },
    {
        question: 'I speak up and share my feelings',
        scale: 37,
        answer: 86,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in the ability to effectively speak your mind, usually with the three "I" statements: "I think," "I feel" and "I want."   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, you are in the middle of the spectrum, sometimes showing this ability, sometimes not.\n',
    },
    {
        question: 'I speak up and share my feelings',
        scale: 37,
        answer: 86,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You score high in the ability to effectively speak your mind, usually with the three "I" statements: "I think," "I feel" and "I want."   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, you have skills.',
    },

    {
        question: 'There was abuse in my family-of-origin',
        scale: 32,
        answer: 87,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely a victim of abuse. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. In this area, you likely have had negative experiences.',
    },
    {
        question: 'There was abuse in my family-of-origin',
        scale: 32,
        answer: 87,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You score in the middle of the abuse spectrum. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. You may have had some abuse in your life but you may not define it as significant or you may have largely escaped this experience. Your score is in the middle of this spectrum.',
    },
    {
        question: 'There was abuse in my family-of-origin',
        scale: 32,
        answer: 87,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not likely a victim of abuse. Abuse is defined as creating excessive power and control over another (at any age). This is accomplished through intimidation, caustic emotional communication, creating isolation, minimizing/denying/blaming, exercising male (or dominant partner) privilege, creating economic hardship or using coercion/threats. In this area, you likely have been spared. You score high on this quality suggesting relative freedom from this very negative kind of history.',
    },

    {
        question:
            "I'm OK with my partner having friends, interests and activities separate from mine",
        scale: 28,
        answer: 88,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "1 -You so not have much ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you have relative weaknesses. ",
    },
    {
        question:
            "I'm OK with my partner having friends, interests and activities separate from mine",
        scale: 28,
        answer: 88,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither strong nor weak in your ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability to act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you are in the middle of the spectrum; neither high nor low.",
    },
    {
        question:
            "I'm OK with my partner having friends, interests and activities separate from mine",
        scale: 28,
        answer: 88,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You have the ability to assert your opinion in the face of opposition, whether spoken or not. This is related to self-image or the ability to act on one's inner convictions at a social level, rather than just being assertive, individually. Related traits are: the urge to be politically or religiously active, to be effective in fundraising, to espouse a cause and to be relatively impervious to negative feedback. In these areas you have strength.",
    },

    {
        question: "I'm comfortable with the idea of 'exclusivity'",
        scale: 38,
        answer: 89,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic. One has to be able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  This may be you. In this area, your score is low, suggesting weakness.',
    },
    {
        question: "I'm comfortable with the idea of 'exclusivity'",
        scale: 38,
        answer: 89,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic.  Others deeply bond and are able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  You are in the middle of this spectrum.',
    },
    {
        question: "I'm comfortable with the idea of 'exclusivity'",
        scale: 38,
        answer: 89,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in your ability to commit to a relationship. Some people are relationship, or specifically, commitment phobic. One has to be able to surrender to the mandates of commitment. In healthy people, this is a conscious decision. In many people the unconscious decision is to not commit; thus, ultimately their relationships dissolve.  However, this is not you. In this area, you are good.',
    },
    {
        question: "I don't think any one race is better than any other race",
        scale: 56,
        answer: 90,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. This makes you prone to harbor predispositions, or worse discrimination.',
    },
    {
        question: "I don't think any one race is better than any other race",
        scale: 56,
        answer: 90,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle of the scale for the tendency to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. You may or may not evince predisposition, or worse, discrimination. Your scores on this dimension are relatively unremarkable.',
    },
    {
        question: "I don't think any one race is better than any other race",
        scale: 56,
        answer: 90,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are relatively free from any tendency to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. You are relatively immune from harboring predispositions, or worse, discrimination.',
    },

    {
        question: "Sometimes, I'd like to just get even",
        scale: 'UNKNOWN',
        answer: 91,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: "Sometimes, I'd like to just get even",
        scale: 'UNKNOWN',
        answer: 91,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "Sometimes, I'd like to just get even",
        scale: 'UNKNOWN',
        answer: 91,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: 'I frequently correct others',
        scale: 40,
        answer: 92,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you score low, suggesting you are not doing well.',
    },

    {
        question: 'I frequently correct others',
        scale: 40,
        answer: 92,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor not prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you are in the middle of the spectrum, suggesting sometimes you will and sometimes you will not be too critical.',
    },
    {
        question: 'I frequently correct others',
        scale: 40,
        answer: 92,
        position: 2,
        low: 21,
        high: 20,
        analysis:
            ' You are not prone to use a critical style in your communication. Critical style reflects an underlying psychological posture that damages relationships. It involves "put downs" and statements of disapproval. It is the opposite of openness and acceptance. In this area, you score high suggesting you are doing well.',
    },

    {
        question: "I usually don't get that 'hot under the collar'",
        scale: 35,
        answer: 93,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are probably not capable of managing your anger; in other words, you are high in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you are not doing well.',
    },
    {
        question: "I usually don't get that 'hot under the collar'",
        scale: 35,
        answer: 93,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither capable nor incapable of managing your anger; which means you are neither high nor low in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you are in the middle of the anger-management spectrum.',
    },
    {
        question: "I usually don't get that 'hot under the collar'",
        scale: 35,
        answer: 93,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are capable of managing your anger, which means you are low in anger management problems. Anger is the most common cause of aggression, either direct (acting out verbally or physically) or passive (indirect ways of "getting even"). Inappropriate anger expression occurs when there are insufficient internal controls of angry impulses. Anger then is expressed by counterproductive behaviors. In this area, you scored high and are doing well.',
    },

    {
        question: 'I tend to overpower others',
        scale: 41,
        answer: 94,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            '1 -You are prone to being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you score low, suggesting problems with Dominance. ',
    },
    {
        question: 'I tend to overpower others',
        scale: 41,
        answer: 94,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor not prone to being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you are neither high nor low in Dominance.',
    },
    {
        question: 'I tend to overpower others',
        scale: 41,
        answer: 94,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in not being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. Your score in this area is high, suggesting, you are doing well.',
    },

    {
        question:
            "I tend to think more about what's coming up or what already happened in the past rather than what's going on now",
        scale: 20,
        answer: 95,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are not particularly capable of being accepting, paying attention to your thoughts and feelings without judging them. You probably cling to thinking being either 'right' or 'wrong' in any given moment. You may not be able to tune into your thoughts and sensations and to stay in the moment rather than drift either into past or future thinking. Your score on these qualities is low.",
    },
    {
        question:
            "I tend to think more about what's coming up or what already happened in the past rather than what's going on now",
        scale: 20,
        answer: 95,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither particularly strong nor weak in the quality of being accepting and paying attention to your thoughts and feelings without judging. You may or may not think that thoughts and feelings are not necessarily "right" or "wrong" in any given moment. You are "so-so" in the ability to tune into your thoughts and sensations in the present moment rather than re-hashing the past or anticipating the future.',
    },
    {
        question:
            "I tend to think more about what's coming up or what already happened in the past rather than what's going on now",
        scale: 20,
        answer: 95,
        position: 2,
        low: 21,
        high: 20,
        analysis:
            'You are capable of being accepting, paying attention to your thoughts and feelings without judging them. You are capable of recognizing there are no necessarily "right" or "wrong" ways to think or feel in a given moment. You can tune into your thoughts and sensations in the present moment rather than re-hashing the past or anticipating the future. Your score for these qualities is high.',
    },
    {
        question: 'I gave up my rose-colored glasses',
        scale: 25,
        answer: 96,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You do not tend to deal with things, situations and others as they are, as opposed to what you or others wish. You probably show the opposite of one or more of the following traits: assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and utilitarian.  In some of these areas, you are not doing so well.',
    },
    {
        question: 'I gave up my rose-colored glasses',
        scale: 25,
        answer: 96,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to deal with things, situations, and others as they are, not as they or you wish. You may or may not have some of the following traits:  Assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and/or utilitarian. In these areas, you are in the middle.',
    },
    {
        question: 'I gave up my rose-colored glasses',
        scale: 25,
        answer: 96,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to deal with things, situations and others as they are, not as they or you wish. Associated traits are: assertive, direct, businesslike, down-to-earth, practical, pragmatic, prudent, rational, sensible, commonsense, level-headed, sound, reasonable and utilitarian.  In these areas, you are doing well.',
    },

    {
        question: "I'm not very good at asking for what I want",
        scale: 37,
        answer: 97,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in the ability to effectively speak your mind, usually with the three "I" statements: "I think," "I feel" and "I want."   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, your score is low, suggesting you may not have these skills.',
    },
    {
        question: "I'm not very good at asking for what I want",
        scale: 37,
        answer: 97,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low in the ability to effectively speak your mind, usually with the three 'I' statements: 'I think,' 'I feel' and 'I want.'   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, you are in the middle of the spectrum, sometimes showing this ability, sometimes not.",
    },
    {
        question: "I'm not very good at asking for what I want",
        scale: 37,
        answer: 97,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You score high in the ability to effectively speak your mind, usually with the three 'I' statements: 'I think,' 'I feel' and 'I want.'   This ability stands in contrast with passivity, passive-aggressiveness and aggression.  In this area, you have skills.",
    },
    {
        question:
            'In relationships, one person should make most of the decisions',
        scale: 42,
        answer: 98,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You scored low in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you score low, suggesting you are not doing so well.',
    },
    {
        question:
            'In relationships, one person should make most of the decisions',
        scale: 42,
        answer: 98,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You scored neither high nor low in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you are in the middle of the spectrum.',
    },
    {
        question:
            'In relationships, one person should make most of the decisions',
        scale: 42,
        answer: 98,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You scored high in endorsing equal status among partners--control, importance, worth, etc. Though individually different, people in relationships must feel equal to each other in order to not build resentments. This is usually expressed in male-female dynamics, but can exist in any relationship with any combination of genders. In this area, you score high, suggesting you are doing well.',
    },

    {
        question: 'Sometimes, I stir up trouble unnecessarily',
        scale: 36,
        answer: 99,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are low in the ability to de-escalate tensions. You may not have an advantageous temperament (being born calm by nature). You may use incendiary language. You may not be prone to use physical gesture (gentle touch). Your score in this area is low, suggesting you likely do not have some of these skills.',
    },
    {
        question: 'Sometimes, I stir up trouble unnecessarily',
        scale: 36,
        answer: 99,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in the ability to de-escalate tensions. You may or may not have a propitious temperament (being born calm by nature). You may or may not use non-incendiary language. You may or may not reduce tensions through physical gesture (gentle touch). With respect to these skills, you are in the middle of the spectrum.',
    },
    {
        question: 'Sometimes, I stir up trouble unnecessarily',
        scale: 36,
        answer: 99,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in the ability to de-escalate tensions. Some do this by temperament (being born calm by nature). Some do this by using non-incendiary language. Some do this by physical gesture (gentle touch). You have at least some of these skills and in this area, you are doing well.',
    },

    {
        question: "I've gone through bankruptcy",
        scale: 52,
        answer: 100,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have trouble managing your finances. You may not be able to stay within a budget and refrain from over-spending. Money is one of the more difficult subjects in longer-term relationships so not managing this increases friction.',
    },
    {
        question: "I've gone through bankruptcy",
        scale: 52,
        answer: 100,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You neither do well nor have trouble managing finances. Overall, you probably stay within a budget and refrain from over-spending, and when that is not the case, you probably don't over do it. Money is one of the more difficult subjects in longer-term relationships so managing this is important for relationship success.",
    },
    {
        question: "I've gone through bankruptcy",
        scale: 52,
        answer: 100,
        position: 2,
        low: 121,
        high: 30,
        analysis:
            'You are able to manage your finances. You can stay within a budget and refrain from over-spending. Money is one of the more difficult subjects in longer-term relationships so managing this helps reduce friction.',
    },

    {
        question: 'My date has to be well off',
        scale: 44,
        answer: 101,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Your selection of partners is too dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. Your score on this scale is low, suggesting your orientation is not the best.',
    },
    {
        question: 'My date has to be well off',
        scale: 44,
        answer: 101,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your selection of partners neither is too dependent nor separate from their net worth or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. You are somewhere in the middle of this spectrum',
    },
    {
        question: 'My date has to be well off',
        scale: 44,
        answer: 101,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            ' Your selection of partners is not dependent upon their monetary value or their perceived ability to provide for your needs. This orientation, while practical, does have an air of superficiality and correlates with relationship failure. Your orientation in this area is good.',
    },

    {
        question: 'Nothing bothers me',
        scale: 'UNKNOWN',
        answer: 102,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: 'Nothing bothers me',
        scale: 'UNKNOWN',
        answer: 102,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: 'Nothing bothers me',
        scale: 'UNKNOWN',
        answer: 102,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: 'I feel well most of the time',
        scale: 46,
        answer: 103,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You score low in Physical Health. This is not good. Optimum physical health also best correlates with relationship success, although not as highly as mental health. Put negatively, physical illnesses place additional stresses on relationships and do, statistically, correlate with heightened conflicts. In this category, you are not doing so well.',
    },
    {
        question: 'I feel well most of the time',
        scale: 46,
        answer: 103,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your score in Physical Health is neither high nor low. Optimum physical health also best correlates with relationship success, although not as highly as mental health. Put negatively, physical illnesses place additional stresses on relationships and do, statistically, correlate with heightened conflicts. In this category, you are neither good nor bad.',
    },
    {
        question: 'I feel well most of the time',
        scale: 46,
        answer: 103,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You score high in Physical Health. This is very good. Optimum physical health also best correlates with relationship success, although not as highly as mental health. Put negatively, physical illnesses place additional stresses on relationships and do, statistically, correlate with heightened conflicts. In this category, you are doing well.',
    },

    {
        question: "I'm pretty open-minded about different religions",
        scale: 59,
        answer: 104,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have a strong belief that your religion is the right or best one, and consequently, other religions are wrong, or at least inferior. This orientation limits your connection with non-believers and correlates with: dogmatism, prejudice, discrimination, disapproval, intolerance, criticism and narrow-mindedness. Paradoxically, it does correlate with greater social bonding with fellow believers, even though it does not increase the likelihood of relationship success.',
    },
    {
        question: "I'm pretty open-minded about different religions",
        scale: 59,
        answer: 104,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You do not have a strong belief, one way or another, that your religion is the right or best one, and consequently, other religions are wrong, or at least inferior. This orientation neither limits nor expands your connection with not-believers. You may or may not indulge in dogmatism, prejudice, discrimination, disapproval, criticism and narrow-mindedness and you may be equally prone to express the opposite values; namely, openness, acceptance, approval and broad-mindedness. You will be equally prone to socially bond with fellow believers or non-believers, which will afford you greater choice in potential partners.',
    },
    {
        question: "I'm pretty open-minded about different religions",
        scale: 59,
        answer: 104,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not dogmatic in your thinking about religions. You do not think that your religion is the right or best one, and therefore, other religions are wrong, or at least inferior. This orientation frees you to connect with non-believers and is negatively correlated (opposite relationship) with: prejudice, discrimination, disapproval, intolerance, criticism and narrow-mindedness. Paradoxically, it does correlate with lesser social bonding with fellow believers, even though it does increase the likelihood of relationship success.',
    },
    {
        question:
            "My hair, makeup or clothing have to look 'just right' before I go out",
        scale: 47,
        answer: 105,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You are more likely blame another for failure to provide (frequently using guilt). You are likely to resist changing the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influences a relationship. In this category you may demonstrate many of these traits, so are not doing well.',
    },
    {
        question:
            "My hair, makeup or clothing have to look 'just right' before I go out",
        scale: 47,
        answer: 105,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither likely nor unlikely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You may or may not be the person who often blames another for failure to provide (frequently using guilt). This kind of person is not likely to change the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influence a relationship. In this category you are in the middle, or may or may not demonstrate many of these traits.',
    },
    {
        question:
            "My hair, makeup or clothing have to look 'just right' before I go out",
        scale: 47,
        answer: 105,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not likely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You are not the person who often blames another for failure to provide (frequently using guilt). This kind of person is not likely to change the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influence a relationship. In this category you do not demonstrate many of these traits, so are doing well.',
    },

    {
        question: 'I tend to submit to others',
        scale: 41,
        answer: 106,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are prone to being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you score low, suggesting problems with Dominance.',
    },
    {
        question: 'I tend to submit to others',
        scale: 41,
        answer: 106,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither prone nor not prone to being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. In this area, you are neither high nor low in Dominance.',
    },
    {
        question: 'I tend to submit to others',
        scale: 41,
        answer: 106,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are high in not being too dominant. Dominance is Controlling\'s first cousin. The best relationships are the ones where there is a mixture of dominance and submissiveness across a wide spectrum, with the overall average being neutral, or "50-50."   No one is equally dominant or submissive across all behavioral vectors, so the important concept is the overall average. Your score in this area is high, suggesting, you are doing well.',
    },

    {
        question: 'I usually hang out with people who are younger than me',
        scale: 48,
        answer: 107,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You are low on maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale, you score low, suggesting relative immaturity.",
    },
    {
        question: 'I usually hang out with people who are younger than me',
        scale: 48,
        answer: 107,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are neither high nor low on maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale you scored in the middle of the spectrum.",
    },
    {
        question: 'I usually hang out with people who are younger than me',
        scale: 48,
        answer: 107,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            "You are higher in maturity, which is defined as a state of emotional strength and self-control, leading to realistic and balanced behavior, relative to one's age and experience. Immaturity is the state of not being fully developed and is characterized by one or more of the following: egocentricity, trouble with commitment, blaming others, problems delaying gratification, dependence upon others, especially in relationships, irresponsibility with money and short-term thinking or lack of planning. On this scale you scored very well.",
    },

    {
        question:
            "I'm not comfortable hanging out with people of a different color",
        scale: 56,
        answer: 108,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. This makes you prone to harbor predispositions, or worse discrimination.',
    },
    {
        question:
            "I'm not comfortable hanging out with people of a different color",
        scale: 56,
        answer: 108,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are in the middle of the scale for the tendency to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. You may or may not evince predisposition, or worse, discrimination. Your scores on this dimension are relatively unremarkable.',
    },
    {
        question:
            "I'm not comfortable hanging out with people of a different color",
        scale: 56,
        answer: 108,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are relatively free from any tendency to believe in the superiority of one race, ethnicity or in general, any quality, aspect, ideal or trait of one group over another. You are relatively immune from harboring predispositions, or worse, discrimination.',
    },

    {
        question: 'I sometimes do not behave well',
        scale: 'UNKNOWN',
        answer: 109,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: 'I sometimes do not behave well',
        scale: 'UNKNOWN',
        answer: 109,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: 'I sometimes do not behave well',
        scale: 'UNKNOWN',
        answer: 109,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question: "I can't do without sex for long",
        scale: 60,
        answer: 110,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'Sex is very high up in your things to think about. You think about it too much, probably to the detriment of thinking about other things. This correlates with: anxiety, low self-esteem, addiction tendencies, a limited social repertoire, etc.',
    },
    {
        question: "I can't do without sex for long",
        scale: 60,
        answer: 110,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "Sex is neither high nor low on your list of things to think about. Sometimes you may think about it too much, but not overall, and certainly not to the point of being detrimental.  Sex, as a topic, probably has onl 'some' impact on your anxiety, self-esteem, addiction tendencies or social repertoire of behaviors.",
    },
    {
        question: "I can't do without sex for long",
        scale: 60,
        answer: 110,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'Sex is not very high up in your things to think about. You do not think about it too much, which frees you up to think about other things. This correlates with: lowered anxiety, healthier self-esteem, less proneness to addiction, greater repertoire of personal, even social behaviors, etc.',
    },

    {
        question: 'I tend to act without thinking',
        scale: 49,
        answer: 111,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            '1 -You scored high in tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, your score suggests you are not doing so well. ',
    },

    {
        question: 'I tend to act without thinking',
        scale: 49,
        answer: 111,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You scored neither high nor low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, you scored in the middle of the spectrum.',
    },
    {
        question: 'I tend to act without thinking',
        scale: 49,
        answer: 111,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You scored low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. In these areas you are doing well',
    },

    {
        question: "I can't do a lot without having help from others",
        scale: 50,
        answer: 112,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You have not much capacity to act with self-motivation or self-direction, even if you are alone. You are more vulnerable to the opinions of others, though not necessarily less sensitive to other's needs or preferences.",
    },
    {
        question: "I can't do a lot without having help from others",
        scale: 50,
        answer: 112,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither self-directed, self-motivated nor dependent upon others for their direction or approval. This has little or nothing to do with whether or not you act alone or in a group.',
    },
    {
        question: "I can't do a lot without having help from others",
        scale: 50,
        answer: 112,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            " You have the capacity to act with self-motivation or self-direction, which is not necessarily related to whether or not you are alone. You have the ability to be less vulnerable to the opinions of others, though not necessarily less sensitive to other's needs or preferences.",
    },

    {
        question: "I'm still feeling a little tender from my last relationship",
        scale: 58,
        answer: 113,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have just come out of a longer-term relationship and are now pre-maturely entering the relationship market. This means that past relationships are probably not well resolved in your mind. This correlates with greater failure in the current relationship.',
    },
    {
        question: "I'm still feeling a little tender from my last relationship",
        scale: 58,
        answer: 113,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You may or may not have just come out of a longer-term relationship so you may or may not enter current relationships with unfinished "baggage" from history. This means that hangovers from past relationships may or may not be factors in your current relationship experience, regardless of whether they were positive or negative.',
    },
    {
        question: "I'm still feeling a little tender from my last relationship",
        scale: 58,
        answer: 113,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have not just come out of a longer-term relationship. This means that past relationships are more resolved in your mind, which make you more emotionally present and available. This correlates with greater success in current relationship endeavors.',
    },

    {
        question: "You won't see it coming if I'm mad at you",
        scale: 54,
        answer: 114,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You tend to act out aggression in indirect ways. You probably exhibit resistance to requests or demands from family and others by procrastination, expressing sullenness or acting stubborn. You may irritate others by your inaction. In extreme circumstances, you may be outright oppositional.',
    },
    {
        question: "You won't see it coming if I'm mad at you",
        scale: 54,
        answer: 114,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither direct nor indirect in the expression of aggression. You are unremarkable in your tendency to be either aggressive or passive aggressive. You are not inclined to be overly or chronically stubborn, resistant or even oppositional.',
    },
    {
        question: "You won't see it coming if I'm mad at you",
        scale: 54,
        answer: 114,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You tend to act out aggression in direct ways vs. indirect ways. You are less inclined to exhibit resistance to requests or demands from family and others by procrastination, by expressing sullenness or by acting stubborn. These are good qualities, which makes you less likely to irritate others by your inaction. You are not inclined to be oppositional.',
    },

    {
        question:
            'I have been in trouble with the law (excluding traffic citations)',
        scale: 51,
        answer: 115,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have something of a legal history, which is one quality that portends poorly for positive relationship outcomes.',
    },
    {
        question:
            'I have been in trouble with the law (excluding traffic citations)',
        scale: 51,
        answer: 115,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your legal history is neither positive nor negative. You may have had some legal entanglements but if you were honest on this test, they were not significant enough to correlate with negative relationship outcomes.',
    },
    {
        question:
            'I have been in trouble with the law (excluding traffic citations)',
        scale: 51,
        answer: 115,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are relatively free from a legal history, which is one quality that portends well for positive relationship outcomes.',
    },

    {
        question: "I don't spend more than I can repay",
        scale: 52,
        answer: 116,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have trouble managing your finances. You may not be able to stay within a budget and refrain from over-spending. Money is one of the more difficult subjects in longer-term relationships so not managing this increases friction.',
    },
    {
        question: "I don't spend more than I can repay",
        scale: 52,
        answer: 116,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You neither do well nor have trouble managing finances. Overall, you probably stay within a budget and refrain from over-spending, and when that is not the case, you probably don't over do it. Money is one of the more difficult subjects in longer-term relationships so managing this is important for relationship success.",
    },
    {
        question: "I don't spend more than I can repay",
        scale: 52,
        answer: 116,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are able to manage your finances. You can stay within a budget and refrain from over-spending. Money is one of the more difficult subjects in longer-term relationships so managing this helps reduce friction.',
    },

    {
        question: "I'm not very good at estimating how long things will take",
        scale: 61,
        answer: 117,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have less than optimal ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are not very good at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them to succeed at a task. This correlates with: impulsivity, some psychiatric states (ADHD, bi-polar illness, high anxiety states, etc.) and immaturity.',
    },
    {
        question: "I'm not very good at estimating how long things will take",
        scale: 61,
        answer: 117,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are about average at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them for a project.',
    },
    {
        question: "I'm not very good at estimating how long things will take",
        scale: 61,
        answer: 117,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are good at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them for a project. This ability negatively correlates with: impulsivity, some psychiatric states (ADHD, bi-polar illness, high anxiety states, etc.)',
    },

    {
        question: "I'm usually the first one to bring up being 'exclusive'",
        scale: 53,
        answer: 118,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have the tendency to reduce your anxiety by over-clinging to another, filling your space with demands of closeness, attention or re-assurance. This tends to be excessive, hence, may cause problems. This tendency correlates with low self-esteem and is seen in related behaviors: the urge to pre-maturely seek engagement, involvement and ultimately, commitment. In this area, you are not doing so well.',
    },
    {
        question: "I'm usually the first one to bring up being 'exclusive'",
        scale: 53,
        answer: 118,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are not particularly needy, and don't prematurely seek engagement or involvement with another. You do not necessarily deal with anxiety by clinging to others and establishing uncomfortable closeness and/or attention for re-assurance.",
    },
    {
        question: "I'm usually the first one to bring up being 'exclusive'",
        scale: 53,
        answer: 118,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not prone to reduce your anxiety by over-clinging to another, filling your space with demands of closeness, attention or re-assurance. If you do indulge in this proclivity, it will not be excessive, hence, probably will not cause problems. This tendency correlates with low self-esteem, which probably is not your primary experience; hence, you are not particularly inclined to pre-maturely seek engagement, involvement and ultimately, false commitment. In this area, you are doing well.',
    },
    {
        question: 'I have been fired from a job',
        scale: 63,
        answer: 119,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have a less than stable work history and have been subject to being fired or moving from job to job too many times. There is a correlation with stable work history and stable relationship history, which is good if there have not been too many "changes."   In your case, this is questionable.',
    },
    {
        question: 'I have been fired from a job',
        scale: 63,
        answer: 119,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your work history is neither stable nor unstable. This is unremarkable, but actually is relatively good, because there is a correlation between stable work history and stable relationship history.',
    },
    {
        question: 'I have been fired from a job',
        scale: 63,
        answer: 119,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a stable work history and have not been subject to being fired or moving from job to job too many times. There is a correlation with stable work history and stable relationship history, which in your case, is positive.',
    },

    {
        question: "I'm fussy and/or picky",
        scale: 47,
        answer: 120,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are likely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You are more likely blame another for failure to provide (frequently using guilt). You are likely to resist changing the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influences a relationship. In this category you may demonstrate many of these traits, so are not doing well.',
    },
    {
        question: "I'm fussy and/or picky",
        scale: 47,
        answer: 120,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither likely nor unlikely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You may or may not be the person who often blames another for failure to provide (frequently using guilt). This kind of person is not likely to change the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influence a relationship. In this category you are in the middle, or may or may not demonstrate many of these traits.',
    },
    {
        question: "I'm fussy and/or picky",
        scale: 47,
        answer: 120,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are not likely to make another responsible for your experiences in different areas of life. This is often seen in demanding or insistent requests for constant approval, attention, affection or for more and more things like clothes or jewelry. The key concept is that this behavior is excessive, usually annoying, may be manipulative as well as costly in terms of energy or resources. You are not the person who often blames another for failure to provide (frequently using guilt). This kind of person is not likely to change the behavior, which can be in one or more realms--need for order, financial or sexual attention. This trait usually reflects deeper issues that are not resolved, hence negatively influence a relationship. In this category you do not demonstrate many of these traits, so are doing well.',
    },

    {
        question: "I'm a perfectionist",
        scale: 55,
        answer: 121,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have the tendency to view the world as either black or white. Such an orientation is correlated with: anxiety, procrastination and much later, depression. You have the tendency to avoid failure by overly striving for success, probably in an extreme manner--having to score 100% on every test, running the fastest race, etc.  In this area you create tension that probably negatively influences others.',
    },
    {
        question: "I'm a perfectionist",
        scale: 55,
        answer: 121,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither overly concerned nor lackadaisical about performances on tests, general tasks etc. having to be 100%. You may or may not view the world in extremes--black or white thinking. For you, the world may appear to be many more shades of gray.',
    },
    {
        question: "I'm a perfectionist",
        scale: 55,
        answer: 121,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You do not indulge in extreme thinking or functioning; for example, needing to score 100% on every test, running the fastest race, etc. You do not have much of a need to avoid failure by overly striving for success. You do not view the world as either black or white.  Because you do not share such an orientation, there is less likelihood you will manifest anxiety, procrastination or much later, depression.',
    },

    {
        question: 'I have served jail time',
        scale: 51,
        answer: 122,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have something of a legal history, which is one quality that portends poorly for positive relationship outcomes.',
    },
    {
        question: 'I have served jail time',
        scale: 51,
        answer: 122,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your legal history is neither positive nor negative. You may have had some legal entanglements but if you were honest on this test, they were not significant enough to correlate with negative relationship outcomes.',
    },
    {
        question: 'I have served jail time',
        scale: 51,
        answer: 122,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are relatively free from a legal history, which is one quality that portends well for positive relationship outcomes.',
    },

    {
        question: 'I make my own decisions',
        scale: 50,
        answer: 123,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You scored high in tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, your score suggests you are not doing so well.',
    },
    {
        question: 'I make my own decisions',
        scale: 50,
        answer: 123,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You scored neither high nor low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. On this scale, you scored in the middle of the spectrum.',
    },
    {
        question: 'I make my own decisions',
        scale: 50,
        answer: 123,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You scored low in the tendency to act without thinking, to act immediately without full consideration of consequences. Impulsivity is acting according to whim with self-interests or self-gratification being the main goal. The goal of impulsive behavior is often to rapidly reduce tension, which implies poor tolerance of stress. In these areas you are doing well.',
    },

    {
        question:
            'When it comes to influencing people, punishment is better than praise',
        scale: 57,
        answer: 124,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You are not prone to communicate in a style that embeds more positive messages relative to negative ones. (The correct ratio is four-to-one; meaning, for every five things said, four will reflect some positive theme, vs. the one "other," which hopefully, will be more neutral vs. outright negative.)   You are less likely to create a pleasant experience with another in your communication style, thus will not likely experience things related--optimism, agreeableness, success in negotiations, low-friction interactions, etc.',
    },
    {
        question:
            'When it comes to influencing people, punishment is better than praise',
        scale: 57,
        answer: 124,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your communicate style is neutral, neither embedding more positive messages relative to negative ones, or vice versa. Because your communication style is neither positive nor negative, the recipient of your communication probably will feel neither uplifted nor let down. Your communication style will have little effect on things like: success in negotiations, reducing frictions in interactions, etc.',
    },
    {
        question:
            'When it comes to influencing people, punishment is better than praise',
        scale: 57,
        answer: 124,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You are prone to communicate in a style that embeds more positive messages relative to negative ones. (The correct ratio is four-to-one; meaning, for every five things said, four will reflect some positive theme, vs. the one "other," which hopefully, will be more neutral vs. outright negative.)   This has a beneficent impact and correlates with: optimism, agreeableness, success in negotiations, low-friction interactions, etc.',
    },

    {
        question: "Some people deserve what's coming to them",
        scale: 'UNKNOWN',
        answer: 125,
        position: 0,
        low: 0,
        high: 10,
        analysis: '',
    },
    {
        question: "Some people deserve what's coming to them",
        scale: 'UNKNOWN',
        answer: 125,
        position: 1,
        low: 11,
        high: 20,
        analysis: '',
    },
    {
        question: "Some people deserve what's coming to them",
        scale: 'UNKNOWN',
        answer: 125,
        position: 2,
        low: 21,
        high: 30,
        analysis: '',
    },

    {
        question:
            'The man (or more dominant partner) should always make the first move',
        scale: 62,
        answer: 126,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You favor older values.  You think 'traditionally' about how one sees the ways one partner should act compared to the other.  For example, you favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions, etc. Newer, less traditional values, suggest a more liberal, hence 'flexible' behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute 'dominant' and 'submissive' for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success. You may lack just such flexibility. This trait correlates with: conservative religious values/thinking and age.",
    },
    {
        question:
            'The man (or more dominant partner) should always make the first move',
        scale: 62,
        answer: 126,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            "You are fairly neutral in how you think one partner should act compared to the other.  Older values favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions etc. Newer, less traditional values, suggest a more liberal, hence 'flexible' behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute 'dominant' and 'submissive' for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success. In these areas, you are in the middle of the spectrum.",
    },
    {
        question:
            'The man (or more dominant partner) should always make the first move',
        scale: 62,
        answer: 126,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a more liberal interpretation about how one partner should act compared to the other.  Older values favor the man (or more dominant partner in gay couples) being the first to make contact, pay for meals, make decisions, etc. Newer, less traditional values, suggest a more open stance, hence "flexible" behavior bias. In gay relationships, these biases are still found, despite both partners being the same sex. (If the couple is homosexual, substitute "dominant" and "submissive" for man and woman. While this is imperfect, these terms are easier to work with than masculine and feminine, although they may overlap.)   Despite the limitation of these terms, in both hetero-and-homosexual liaisons, flexibility is more adaptive; hence, portends greater relationship success.',
    },

    {
        question: 'I have no history of jumping from job to job',
        scale: 63,
        answer: 127,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            "You have a less than stable work history and have been subject to being fired or moving from job to job too many times. There is a correlation with stable work history and stable relationship history, which is good if there have not been too many 'changes.'  In your case, this is questionable.",
    },
    {
        question: 'I have no history of jumping from job to job',
        scale: 63,
        answer: 127,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'Your work history is neither stable nor unstable. This is unremarkable, but actually is relatively good, because there is a correlation between stable work history and stable relationship history.',
    },
    {
        question: 'I have no history of jumping from job to job',
        scale: 63,
        answer: 127,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have a stable work history and have not been subject to being fired or moving from job to job too many times. There is a correlation with stable work history and stable relationship history, which in your case, is positive.',
    },

    {
        question: 'I usually get things done on time',
        scale: 61,
        answer: 128,
        position: 0,
        low: 0,
        high: 10,
        analysis:
            'You have less than optimal ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are not very good at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them to succeed at a task. This correlates with: impulsivity, some psychiatric states (ADHD, bi-polar illness, high anxiety states, etc.) and immaturity.',
    },
    {
        question: 'I usually get things done on time',
        scale: 61,
        answer: 128,
        position: 1,
        low: 11,
        high: 20,
        analysis:
            'You are neither high nor low in your ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are about average at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them for a project.',
    },
    {
        question: 'I usually get things done on time',
        scale: 61,
        answer: 128,
        position: 2,
        low: 21,
        high: 30,
        analysis:
            'You have the ability to accurately assess how much time things will take, or to equate time and distance phenomena. For example, you are good at estimating how long it will take to complete a project or arrive at a specific location or what materials it will take and the time it will take to gather them for a project. This ability negatively correlates with: impulsivity, some psychiatric states (ADHD, bi-polar illness, high anxiety states, etc.).',
    },
]

export default testAnalysisData
