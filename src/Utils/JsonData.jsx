const experience_years_array = [
  {
    value: 0,
    name: "0",
  },
  {
    value: 1,
    name: "1",
  },
  {
    value: 2,
    name: "2",
  },
  {
    value: 3,
    name: "3",
  },
  {
    value: 4,
    name: "4",
  },
  {
    value: 5,
    name: "5",
  },
  {
    value: 6,
    name: "6",
  },
  {
    value: 7,
    name: "7",
  },
  {
    value: 8,
    name: "8",
  },
  {
    value: 9,
    name: "9",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 11,
    name: "11",
  },
  {
    value: 12,
    name: "12",
  },
  {
    value: 13,
    name: "13",
  },
  {
    value: 14,
    name: "14",
  },
  {
    value: 15,
    name: "15",
  },
  {
    value: 16,
    name: "16",
  },
  {
    value: 17,
    name: "17",
  },
  {
    value: 18,
    name: "18",
  },
  {
    value: 19,
    name: "19",
  },
  {
    value: 20,
    name: "20",
  },
  {
    value: 21,
    name: "21",
  },
  {
    value: 22,
    name: "22",
  },
  {
    value: 23,
    name: "23",
  },
  {
    value: 24,
    name: "24",
  },
  {
    value: 25,
    name: "25",
  },
  {
    value: 26,
    name: "26",
  },
  {
    value: 27,
    name: "27",
  },
  {
    value: 28,
    name: "28",
  },
  {
    value: 29,
    name: "29",
  },
  {
    value: 30,
    name: "30+",
  },
];
const experience_months_array = [
  {
    value: 0,
    name: "0",
  },
  {
    value: 1,
    name: "1",
  },
  {
    value: 2,
    name: "2",
  },
  {
    value: 3,
    name: "3",
  },
  {
    value: 4,
    name: "4",
  },
  {
    value: 5,
    name: "5",
  },
  {
    value: 6,
    name: "6",
  },
  {
    value: 7,
    name: "7",
  },
  {
    value: 8,
    name: "8",
  },
  {
    value: 9,
    name: "9",
  },
  {
    value: 10,
    name: "10",
  },
  {
    value: 11,
    name: "11",
  },
  {
    value: 12,
    name: "12",
  },
];
const months_array = [
  {
    value: 1,
    name: "January",
  },
  {
    value: 2,
    name: "February",
  },
  {
    value: 3,
    name: "March",
  },
  {
    value: 4,
    name: "April",
  },
  {
    value: 5,
    name: "May",
  },
  {
    value: 6,
    name: "June",
  },
  {
    value: 7,
    name: "July",
  },
  {
    value: 8,
    name: "August",
  },
  {
    value: 9,
    name: "September",
  },
  {
    value: 10,
    name: "October",
  },
  {
    value: 11,
    name: "November",
  },
  {
    value: 12,
    name: "December",
  },
];
const reasonJobChange_array = [
  {
    value: 1,
    name: "Financial Growth",
  },
  {
    value: 2,
    name: "Better career prospects",
  },
  {
    value: 3,
    name: "Project/Contract Completion",
  },
  {
    value: 4,
    name: "Layoff/ Restructuring",
  },
  {
    value: 5,
    name: "Due to Pandemic",
  },
  {
    value: 6,
    name: "Relocation",
  },
  {
    value: 7,
    name: "Shift/Timing Issue",
  },
  {
    value: 8,
    name: "Personal Reasons",
  },
  {
    value: 0,
    name: "Other",
  },
];
const noticePeriod_array = [
  {
    value: 1,
    name: "Immediate",
  },
  {
    value: 2,
    name: "15 days",
  },
  {
    value: 3,
    name: "30 days",
  },
  {
    value: 4,
    name: "45 days",
  },
  {
    value: 5,
    name: "60 days",
  },
  {
    value: 6,
    name: "75 days",
  },
  {
    value: 7,
    name: "90 days",
  },
];
const document_array = [{ value: "cv", name: "cv" }];
const year = new Date().getFullYear();
const years_array = Array.from(new Array(20), (val, index) => year - index);
export {
  experience_years_array,
  experience_months_array,
  months_array,
  years_array,
  reasonJobChange_array,
  noticePeriod_array,
  document_array,
};
