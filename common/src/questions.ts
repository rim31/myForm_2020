import { Question } from "./interfaces";

const questions: Question[] = [
  {
    label: "How are you feeling at work?",
    choices: [
      { label: "Terrible", value: 1 },
      { label: "Not good", value: 2 },
      { label: "OK", value: 3 },
      { label: "Good", value: 4 },
      { label: "Great, I love my work", value: 5 },
    ],
  },
  {
    label: "Is it clear what you should focus on and prioritize?",
    choices: [
      { label: "I have no idea", value: 1 },
      { label: "I'm uncertain about my goals", value: 2 },
      { label: "Partly yes, partly no", value: 3 },
      { label: "Mostly yes", value: 4 },
      { label: "I know exactly what to do", value: 5 },
    ],
  },
  {
    label: "Do you feel safe to disagree or voice your concerns at work?",
    choices: [
      { label: "Almost never", value: 1 },
      { label: "Rarely", value: 2 },
      { label: "Sometimes yes, sometimes no", value: 3 },
      { label: "Yes, typically", value: 4 },
      { label: "Yes, almost always", value: 5 },
    ],
  },
];

export default questions;