import { TestQuestion } from '@/types/types'

const testQuestions: TestQuestion[] = [
   {
      question: "If a clerk gave me too much change back, I wouldn't tell",
      scale: 13,
      position: 0,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Depends', right: 'Correct' },
   },
   {
      question:
          "I'm not very good at seeing the world through someone else's eyes",
      scale: 9,
      position: 1,
      reverse: true,
      options: { left: 'Wrong', middle: "Don't Know", right: 'Right' },
   },
   {
      question: 'I usually put others first',
      scale: 2,
      position: 2,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },
   {
      question: 'I tend to not be dedicated and/or dependable',
      scale: 5,
      position: 3,
      reverse: true,
      options: { left: "That's Not Me", middle: 'Maybe', right: "That's Me" },
   },
   {
      question: 'People describe me as "difficult"',
      scale: 1,
      position: 4,
      reverse: true,
      options: { left: 'Nope', middle: 'Neutral', right: 'Yep' },
   },
   {
      question: 'My mood is even and stable most of the time',
      scale: 45,
      position: 5,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },
   {
      question: "I'm not a very good team player",
      scale: 6,
      position: 6,
      reverse: true,
      options: { left: 'False', middle: 'Maybe', right: 'True' },
   },
   {
      question: 'Women should be paid the same as men for the same work',
      scale: 7,
      position: 7,
      reverse: false,
      options: { left: 'No', middle: 'Neutral', right: 'Yes' },
   },
   {
      question: 'These days, a woman can ask a man out on a date',
      scale: 62,
      position: 8,
      reverse: false,
      options: {
         left: 'Not Even Close',
         middle: 'Neutral',
         right: 'Absolutely',
      },
   },

   {
      question: 'In me, what you see is what you get',
      scale: 3,
      position: 9,
      reverse: false,
      options: {
         left: 'Definitely Not Me',
         middle: 'Neutral',
         right: 'Definitely Me',
      },
   },

   {
      question: "I'm usually not the first one to suggest living together",
      scale: 53,
      position: 10,
      reverse: false,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },
   {
      question:
          "I prefer to compliment people's strengths more than to criticize their weaknesses",
      scale: 57,
      position: 11,
      reverse: true,
      options: {
         left: 'Absolutely',
         middle: 'Depends',
         right: 'Not Even Close',
      },
   },
   {
      question: "I don't necessarily respect people's time or physical space",
      scale: 4,
      position: 12,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },
   {
      question: "I don't think about sex more than anyone else",
      scale: 60,
      position: 13,
      reverse: false,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },
   {
      question: 'I live to work, not work to live',
      scale: 12,
      position: 14,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },
   {
      question:
          "I don't normally seek revenge, but when I do, I'll tell you first",
      scale: 54,
      position: 15,
      reverse: true,
      options: { left: 'Correct', middle: 'Neutral', right: 'Incorrect' },
   },
   {
      question:
          "I try to understand the cause of someone's behavior. Later, it helps me to let it go",
      scale: 11,
      position: 16,
      reverse: false,
      options: {
         left: 'Never or Seldom',
         middle: 'Sometimes or Sometimes Not',
         right: 'Always or Usually',
      },
   },
   {
      question: 'I use my feelings when thinking about something',
      scale: 8,
      position: 17,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'I am at least one of these: reliable and/or devoted',
      scale: 5,
      position: 18,
      reverse: false,
      options: {
         left: 'Definitely Not Me',
         middle: 'Neutral',
         right: 'Definitely Me',
      },
   },

   {
      question: 'People find me pleasing to be around',
      scale: 1,
      position: 19,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: 'I enjoy just being in the moment',
      scale: 20,
      position: 20,
      reverse: false,
      options: {
         left: 'Not Even Close',
         middle: 'Neutral',
         right: 'Absolutely',
      },
   },

   {
      question:
          "I can read a person's feelings, even sometimes their thoughts, from far away",
      scale: 9,
      position: 21,
      reverse: true,
      options: { left: 'Always', middle: 'Neutral', right: 'Never' },
   },

   {
      question:
          "I don't always care one way or another about all the little details",
      scale: 55,
      position: 22,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: 'I think my religion is the best religion',
      scale: 59,
      position: 23,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question:
          'When someone hurts me, I harbor negative feelings for quite a while',
      scale: 11,
      position: 24,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question:
          "I'm more 'into' getting what I want, even if it is at the expense of others",
      scale: 2,
      position: 25,
      reverse: true,
      options: { left: "That's not me", middle: 'Neutral', right: "That's me" },
   },

   {
      question: 'I like things to get personal',
      scale: 16,
      position: 26,
      reverse: false,
      options: { left: 'No', middle: 'Sometimes', right: 'Yes' },
   },

   {
      question: "I'm capable of having a really good time",
      scale: 12,
      position: 27,
      reverse: true,
      options: {
         left: 'Definitely Me',
         middle: 'Neutral',
         right: 'Definitely Not Me',
      },
   },

   {
      question: 'I have some chronic health problems',
      scale: 46,
      position: 28,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: 'If someone says "No" to something, then "No" is OK',
      scale: 4,
      position: 29,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Depends',
         right: 'Fully Agree',
      },
   },

   {
      question: 'People are basically more good than bad',
      scale: 24,
      position: 30,
      reverse: true,
      options: {
         left: 'I Believe This',
         middle: "I don't know",
         right: "I Don't Believe This",
      },
   },

   {
      question: "I can accommodate other's suggestions",
      scale: 6,
      position: 31,
      reverse: true,
      options: {
         left: 'Always',
         middle: 'About Half The Time',
         right: 'Never',
      },
   },

   {
      question:
          'Women and men are just different.  Neither one is better than the other',
      scale: 7,
      position: 32,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I don't take myself that seriously",
      scale: 14,
      position: 33,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: 'I tell people what they want to hear',
      scale: 3,
      position: 34,
      reverse: true,
      options: { left: 'Never', middle: 'Depends', right: 'Always' },
   },

   {
      question: 'I relate to funny people',
      scale: 15,
      position: 35,
      reverse: false,
      options: {
         left: 'Nope, Not Me',
         middle: 'Occasionally',
         right: "Yep, That's Me",
      },
   },

   {
      question: "I'm not a big fan of change",
      scale: 22,
      position: 36,
      reverse: true,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question: "I've had jobs where I've wanted to tell the boss to shove it",
      scale: 64,
      position: 37,
      reverse: true,
      options: {
         left: 'Absolutely',
         middle: 'Neutral',
         right: 'Not Even Close',
      },
   },

   {
      question:
          'I tend to judge people by what kind of car they drive, or the clothing or jewelry they wear',
      scale: 44,
      position: 38,
      reverse: false,
      options: { left: 'Always', middle: 'Neutral', right: 'Never' },
   },

   {
      question: 'My first impulse is to tell the truth',
      scale: 13,
      position: 39,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: 'People sometimes think of me as haughty or snobbish',
      scale: 14,
      position: 40,
      reverse: true,
      options: {
         left: 'Definitely Not Me',
         middle: 'Neutral',
         right: 'Definitely Me',
      },
   },

   {
      question: "I'm not comfortable giving and receiving love",
      scale: 19,
      position: 41,
      reverse: false,
      options: {
         left: "That's Right",
         middle: 'Neutral',
         right: "That's Wrong",
      },
   },

   {
      question:
          "Thoughts should dominate, so I don't consider my feelings much",
      scale: 8,
      position: 42,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "I'm prone to 'get in someone's face'",
      scale: 34,
      position: 43,
      reverse: false,
      options: { left: 'Yeah', middle: 'Neutral', right: 'Nah' },
   },

   {
      question: 'I occasionally get a cold or the flu',
      scale: 64,
      position: 44,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question:
          "I've had trouble with gambling, alcohol, drugs or too much sex",
      scale: 33,
      position: 45,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I make jokes but they don't go over well",
      scale: 15,
      position: 46,
      reverse: true,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question: 'Persistence and determination alone are omnipotent',
      scale: 23,
      position: 47,
      reverse: false,
      options: {
         left: "I Don't Think This Way",
         middle: 'Neutral',
         right: "That's The Way I Think",
      },
   },

   {
      question: "I'm not suspicious",
      scale: 30,
      position: 48,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: 'I have values and principles. They work for me',
      scale: 31,
      position: 49,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I'm not very affectionate",
      scale: 17,
      position: 50,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "Sorry, I just don't like everybody",
      scale: 64,
      position: 51,
      reverse: true,
      options: {
         left: "Yep, That's True",
         middle: 'Neutral',
         right: "Nope, That's False",
      },
   },

   {
      question: "I can't take criticism",
      scale: 26,
      position: 52,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: "I don't push myself to extremes.  I take care of myself",
      scale: 27,
      position: 53,
      reverse: false,
      options: { left: 'Never', middle: 'Neutral', right: 'Always' },
   },

   {
      question: "I'm a 'control freak'",
      scale: 39,
      position: 54,
      reverse: true,
      options: {
         left: 'Definitely Not Me',
         middle: 'Neutral',
         right: 'Definitely Me',
      },
   },

   {
      question: 'I have more anxiety than most',
      scale: 45,
      position: 55,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: "Sometimes, I hold back what I'm thinking",
      scale: 64,
      position: 56,
      reverse: false,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "I'm open to new ideas and experiences",
      scale: 22,
      position: 57,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'I tend to give up if something is too difficult',
      scale: 23,
      position: 58,
      reverse: true,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question: "When someone says 'I love you', I can say it back",
      scale: 19,
      position: 59,
      reverse: true,
      options: { left: 'Yes', middle: 'Neutral', right: 'No' },
   },

   {
      question: 'Neither of my parents was an addict of any kind',
      scale: 33,
      position: 60,
      reverse: false,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: "I can't tell you my feelings without embarrassment",
      scale: 16,
      position: 61,
      reverse: true,
      options: { left: "That's Not Me", middle: 'Neutral', right: "That's Me" },
   },

   {
      question: 'I think about morals and try to abide by them',
      scale: 31,
      position: 62,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'Life is a good experience',
      scale: 24,
      position: 63,
      reverse: false,
      options: { left: 'Not Really', middle: 'Neutral', right: 'I Think So' },
   },

   {
      question: 'I like physical contact when I talk with people',
      scale: 17,
      position: 64,
      reverse: true,
      options: {
         left: 'Absolutely',
         middle: 'Neutral',
         right: 'Not Even Close',
      },
   },

   {
      question: "I sometimes 'act out' my anger",
      scale: 35,
      position: 65,
      reverse: true,
      options: { left: 'No', middle: 'Neutral', right: 'Yes' },
   },

   {
      question: "I've had affairs",
      scale: 38,
      position: 66,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question:
          'I usually plan things out, at least a little, before I do something',
      scale: 49,
      position: 67,
      reverse: false,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question: 'I occasionally tell a white lie',
      scale: 64,
      position: 68,
      reverse: true,
      options: { left: 'Yes', middle: 'Neutral', right: 'No' },
   },

   {
      question: "I don't necessarily eat or sleep well",
      scale: 27,
      position: 69,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question:
          "I'm more comfortable if I can become a part of my date's social circles",
      scale: 28,
      position: 70,
      reverse: true,
      options: {
         left: "I Don't Need This",
         middle: 'Sort Of',
         right: 'I Need This',
      },
   },

   {
      question: 'My family was/is free of domestic violence',
      scale: 32,
      position: 71,
      reverse: false,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: 'I tend to bounce around from thing to thing',
      scale: 43,
      position: 72,
      reverse: true,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question:
          "When someone says they will do something, I don't necessarily believe them",
      scale: 30,
      position: 73,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "I'm fine with others having their way",
      scale: 39,
      position: 74,
      reverse: false,
      options: {
         left: 'Not Even Close',
         middle: 'Neutral',
         right: 'Absolutely',
      },
   },

   {
      question: "I don't yell",
      scale: 34,
      position: 75,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: "I seldom use phrases like 'you should' or 'you need to'",
      scale: 40,
      position: 76,
      reverse: true,
      options: { left: 'Right', middle: 'Neutral', right: 'Wrong' },
   },

   {
      question: "I'm told I live in a fantasy world",
      scale: 25,
      position: 77,
      reverse: true,
      options: {
         left: "No, That's False",
         middle: 'Neutral',
         right: "Yes, That's True",
      },
   },

   {
      question: 'I have never outright lied',
      scale: 64,
      position: 78,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question:
          'I like to do my half of the work, but I also let others do theirs',
      scale: 42,
      position: 79,
      reverse: false,
      options: { left: "That's Not Me", middle: 'Depends', right: "That's Me" },
   },

   {
      question: 'I calm things down; whereas, others ramp things up',
      scale: 36,
      position: 80,
      reverse: false,
      options: { left: 'Wrong', middle: 'Neutral', right: 'Right' },
   },

   {
      question: "People say I'm mature, relative to others",
      scale: 48,
      position: 81,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question:
          'I have just gotten out of a long-term relationship within the last six months',
      scale: 58,
      position: 82,
      reverse: true,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question:
          'Once I get focused on something, I usually stay that way until I finish',
      scale: 43,
      position: 83,
      reverse: false,
      options: { left: 'No', middle: 'Neutral', right: 'Yes' },
   },

   {
      question: "I'm competent",
      scale: 26,
      position: 84,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'I speak up and share my feelings',
      scale: 37,
      position: 85,
      reverse: false,
      options: { left: 'Never', middle: 'Neutral', right: 'Always' },
   },

   {
      question: 'There was abuse in my family-of-origin',
      scale: 32,
      position: 86,
      reverse: false,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question:
          "I'm OK with my partner having friends, interests and activities separate from mine",
      scale: 28,
      position: 87,
      reverse: true,
      options: { left: 'Yes', middle: 'Neutral', right: 'No' },
   },

   {
      question: "I'm comfortable with the idea of 'exclusivity'",
      scale: 38,
      position: 88,
      reverse: false,
      options: {
         left: 'Not Even Close',
         middle: 'Neutral',
         right: 'Absolutely',
      },
   },

   {
      question: "I don't think any one race is better than any other race",
      scale: 56,
      position: 89,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Depends',
         right: 'Fully Disagree',
      },
   },

   {
      question: "Sometimes, I'd like to just get even",
      scale: 64,
      position: 90,
      reverse: false,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: 'I frequently correct others',
      scale: 40,
      position: 12,
      reverse: true,
      options: { left: 'Never', middle: 'Neutral', right: 'Always' },
   },

   {
      question: "I usually don't get that 'hot under the collar'",
      scale: 35,
      position: 92,
      reverse: true,
      options: { left: 'Right', middle: 'Neutral', right: 'Wrong' },
   },

   {
      question: 'I tend to overpower others',
      scale: 41,
      position: 93,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question:
          "I tend to think about what's coming up or what already happened rather than what's going on now",
      scale: 20,
      position: 94,
      reverse: true,
      options: {
         left: 'Definitely Not Me',
         middle: 'Neutral',
         right: 'Definitely Me',
      },
   },

   {
      question: 'I gave up my rose-colored glasses',
      scale: 25,
      position: 95,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I'm not very good at asking for what I want",
      scale: 37,
      position: 96,
      reverse: true,
      options: { left: 'Off Target', middle: 'Neutral', right: 'On Target' },
   },

   {
      question:
          'In relationships, one person should make most of the decisions',
      scale: 42,
      position: 97,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Depends',
         right: 'Fully Agree',
      },
   },

   {
      question: 'Sometimes, I stir up trouble unnecessarily',
      scale: 36,
      position: 98,
      reverse: true,
      options: { left: "That's Not Me", middle: 'Neutral', right: "That's Me" },
   },

   {
      question: "I've gone through bankruptcy",
      scale: 52,
      position: 99,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: 'My date has to be well off',
      scale: 44,
      position: 100,
      reverse: false,
      options: { left: 'Always', middle: 'Maybe', right: 'Never' },
   },

   {
      question: 'Nothing bothers me',
      scale: 64,
      position: 101,
      reverse: true,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question: 'I feel well most of the time',
      scale: 46,
      position: 102,
      reverse: false,
      options: { left: 'Not Usually', middle: 'Neutral', right: 'Pretty Much' },
   },

   {
      question: "I'm pretty open-minded about different religions",
      scale: 59,
      position: 103,
      reverse: false,
      options: { left: 'Not Really', middle: 'Neutral', right: 'Yes, Mostly' },
   },

   {
      question:
          "My hair, makeup or clothing have to look 'just right' before I go out",
      scale: 47,
      position: 104,
      reverse: false,
      options: { left: 'Nailed It', middle: 'Neutral', right: 'Way Off' },
   },

   {
      question: 'I tend to submit to others',
      scale: 41,
      position: 105,
      reverse: false,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'I usually hang out with people who are younger than me',
      scale: 48,
      position: 106,
      reverse: false,
      options: { left: 'True', middle: 'Neutral', right: 'False' },
   },

   {
      question:
          "I'm not comfortable hanging out with people of a different color",
      scale: 56,
      position: 107,
      reverse: false,
      options: { left: 'Right', middle: 'Neutral', right: 'Wrong' },
   },

   {
      question: 'I sometimes do not behave well',
      scale: 64,
      position: 108,
      reverse: false,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I can't do without sex for long",
      scale: 60,
      position: 109,
      reverse: true,
      options: { left: 'False', middle: 'Neutral', right: 'True' },
   },

   {
      question: 'I tend to act without thinking',
      scale: 49,
      position: 110,
      reverse: true,
      options: { left: "That's Not Me", middle: 'Neutral', right: "That's Me" },
   },

   {
      question: "I can't do a lot without having help from others",
      scale: 50,
      position: 111,
      reverse: true,
      options: { left: 'Never', middle: 'Sometimes', right: 'Always' },
   },

   {
      question: "I'm still feeling a little tender from my last relationship",
      scale: 58,
      position: 112,
      reverse: false,
      options: { left: 'True', middle: 'So-So', right: 'False' },
   },

   {
      question: "You won't see it coming if I'm mad at you",
      scale: 54,
      position: 113,
      reverse: true,
      options: {
         left: "That's Not Me",
         middle: 'Sometimes',
         right: "That's Me Alright",
      },
   },

   {
      question:
          'I have been in trouble with the law (excluding traffic citations)',
      scale: 51,
      position: 114,
      reverse: false,
      options: { left: 'True', middle: 'Sort Of', right: 'False' },
   },

   {
      question: "I don't spend more than I can repay",
      scale: 52,
      position: 115,
      reverse: false,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "I'm not very good at estimating how long things will take",
      scale: 61,
      position: 116,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "I'm usually the first one to bring up being 'exclusive'",
      scale: 53,
      position: 117,
      reverse: true,
      options: { left: 'Never', middle: 'Sometimes', right: 'Always' },
   },

   {
      question: 'I have been fired from a job',
      scale: 63,
      position: 118,
      reverse: false,
      options: { left: 'True', middle: 'Soft Of', right: 'False' },
   },

   {
      question: "I'm fussy and/or picky",
      scale: 47,
      position: 119,
      reverse: false,
      options: { left: "That's Me", middle: 'Neutral', right: "That's Not Me" },
   },

   {
      question: "I'm a perfectionist",
      scale: 55,
      position: 120,
      reverse: true,
      options: {
         left: 'Not Even Close',
         middle: 'Neutral',
         right: 'Nailed It',
      },
   },

   {
      question: 'I have served jail time',
      scale: 51,
      position: 121,
      reverse: true,
      options: { left: 'No', middle: 'Neutral', right: 'Yes' },
   },

   {
      question: 'I make my own decisions',
      scale: 50,
      position: 122,
      reverse: false,
      options: {
         left: 'Never or Rarely',
         middle: 'Neutral',
         right: 'Mostly or Always',
      },
   },

   {
      question:
          'When it comes to influencing people, punishment is better than praise',
      scale: 57,
      position: 123,
      reverse: true,
      options: {
         left: 'Fully Disagree',
         middle: 'Neutral',
         right: 'Fully Agree',
      },
   },

   {
      question: "Some people deserve what's coming to them",
      scale: 64,
      position: 124,
      reverse: true,
      options: { left: 'Yes', middle: 'Not necessarily', right: 'No' },
   },

   {
      question:
          'The man (or more dominant partner) should always make the first move',
      scale: 62,
      position: 125,
      reverse: false,
      options: { left: 'Always', middle: 'Maybe', right: 'Never' },
   },

   {
      question: 'I have no history of jumping from job to job',
      scale: 63,
      position: 126,
      reverse: true,
      options: {
         left: 'Fully Agree',
         middle: 'Neutral',
         right: 'Fully Disagree',
      },
   },

   {
      question: 'I usually get things done on time',
      scale: 61,
      position: 127,
      reverse: false,
      options: { left: 'Incorrect', middle: 'Neutral', right: 'Correct' },
   },

   {
      question: "End of Questions",
      scale: 0,
      position: 128,
      reverse: false,
      options: { left: "", middle: "", right: "" },
   },
]


export default testQuestions