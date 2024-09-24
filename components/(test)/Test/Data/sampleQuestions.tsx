
const sampleQuestions = [
   {
      question: "I can read a person like a book",
      scale: 0,
      position: 1,
      reverse: true,
      options: { left: 'Agree', middle: 'Neutral', right: 'Disagree' },
   },
   {
      question: "I'm not a self-starter",
      scale: 0,
      position: 2,
      reverse: true,
      options: { left: 'Not True', middle: 'So-So', right: 'Very True' },
   },
   {
      question: "I generally know what emotional state I'm in",
      scale: 0,
      position: 3,
      reverse: true,
      options: { left: 'Yeah', middle: 'Maybe', right: 'Sort Of' },
   },
   {
      question: "I don't feel sorry for others who aren't doing so well",
      scale: 0,
      position: 4,
      reverse: false,
      options: { left: "Probably Me", middle: "I Don't Know", right: "Probably Not Me" },
   },
   {
      question: "End of Questions",
      scale: 0,
      position: 5,
      reverse: false,
      options: { left: "", middle: "", right: "" },
   },
];

export default sampleQuestions;
