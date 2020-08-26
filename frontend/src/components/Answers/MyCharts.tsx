import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { StoreContainer } from '../Store';

const data = [
  { name: 'Q - A', a1: 4000, a2: 2400, a3: 2400, a4: 1000, a5: 3000, },
  { name: 'Q - B', a1: 3000, a2: 1398, a3: 2210, a4: 1000, a5: 3000, },
  { name: 'Q - C', a1: 2000, a2: 9800, a3: 2290, a4: 1000, a5: 3000, },
  { name: 'Q - D', a1: 2780, a2: 3908, a3: 2000, a4: 1000, a5: 3000, }
  // { question: 'how ?', label OK: value 1, label :-|: value 2, label :-): value 3, }
];

export default function MyCharts(props: { results: any }) {
  const unstated = StoreContainer.useContainer();
  const [xy, setXy] = React.useState<array>([])
  let counts: any = {};
  let totalQuestion: any = [];
  let res: any = {};
  let test: any = {}
  // static jsfiddleUrl = 'https://jsfiddle.net/alidingling/90v76x08/';

  // const updateData = (res: object) => {
  //   let newData: any = [...xy];
  //   let obj: any = newData.find(q => q.question_id === props.question.question_id);
  //   if (obj) {
  //     let index: number = newData.indexOf(obj)
  //     obj = {
  //       question_id: props.question.question_id,
  //       info: info,
  //       description: description,
  //     }
  //     newData[index] = obj;
  //   }
  // }

  const countDuplicate = (id: number, arr: any, test: any) => {
    // let test: any = { "name": id };
    // let test: any = {};
    console.log("id test", id, test)
    arr.forEach((x: any) => { res[x] = (res[x] || 0) + 1; });
    // arr.forEach((x: any) => { counts[(JSON.parse(x)).id] = (counts[(JSON.parse(x)).value] || 0) + 1; });
    // arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).value] || 0) + 1; });
    // arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).id] || 0) + 1; });
    arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).id] || 0) + 1; });
    arr.forEach((x: any) => { totalQuestion[(JSON.parse(x)).value] = (totalQuestion[(JSON.parse(x)).id] || 0) + 1; });
    arr.forEach((x: any) => { test[(JSON.parse(x)).value] = (test[(JSON.parse(x)).id] || 0) + 1; });
    // !('name' in test) && (test.name = id)

    console.log("COUNT : ", res, counts, test)
  }

  const exple = [
    { name: 'Q - 42', a1: 4000, a2: 2400, a3: 2400, a4: 1000, a5: 3000, },
    { name: 'Q - 36', a1: 3000, a2: 1398, a3: 2210, a4: 1000, a5: 3000, },
    { name: 'Q - 77', a1: 2000, a2: 9800, a3: 2290, a4: 1000, a5: 3000, },
    { name: 'Q - 21', a1: 2780, a2: 3908, a3: 2000, a4: 1000, a5: 3000, }
    // { question: 'how ?', label OK: value 1, label :-|: value 2, label :-): value 3, }
  ];

  // do a copy of array TODO
  const add = (arr: any, name: number) => {
    const found = arr.some((el: any) => el.name === name);
    if (!found) arr.push({ name: name });
    // !('name' in test) && (test.name = d[index].info)
    return arr;
  }

  const donnees = (d: any) => {
    for (let index = 0; index < d.length; index++) {
      const element = d[index];
      console.log("element", element);
      console.log(add(xy, d[index].info));
      let pos: number | undefined = xy.map((e: any) => { return e.name; }).indexOf(d[index].info);
      console.log(d[index].info, pos, "POSITiON");
      // countDuplicate(d[index].info, d[index].description, test);
      // if (d[index].info == 62) {
      // indexOf()
      if (d[index].info) {
        // console.log('===>', d[index].description)
        !('name' in test) && (test.name = d[index].info)// add {name: id} if doesn't exist
        countDuplicate(d[index].info, d[index].description, xy[pos]);
        for (let i = 0; i < d[index].description.length; i++) {
          const element = d[index].description[i];
          // console.log("--> e ", element);
          // console.log("--==> Parse : e.value", (JSON.parse(element)).value);
          // updateData()
        }
        // } else {
        //   console.log("==> X ", "element");
        console.log(xy)
      }
    }
  }
  // "{"id":0,"label":"OK","answer":3,"question":"How are you feeling at work?","value":3}"
  // "{"id":1,"label":"Mostly yes","answer":4,"question":"Is it clear what you should focus on and prioritize?","value":4}"
  // "{"id":2,"label":"Rarely","answer":2,"question":"Do you feel safe to disagree or voice your concerns at work?","value":2}"

  // "{"id":0,"label":"Terrible","answer":1,"question":"How are you feeling at work?","value":1}"
  // "{"id":1,"label":"I have no idea","answer":1,"question":"Is it clear what you should focus on and prioritize?","value":1}"
  // "{"id":2,"label":"Almost never","answer":1,"question":"Do you feel safe to disagree or voice your concerns at work?","value":1}"

  React.useEffect(() => {
    console.log('from Mycharts', props.results)
    if (props.results)
      donnees(props.results)
  }, [])

  return (
    <BarChart
      width={500}
      height={300}
      data={data}
      margin={{
        top: 20, right: 30, left: 20, bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="a2" stackId="a" fill="#8884d8" />
      <Bar dataKey="a1" stackId="a" fill="#82ca9d" />
      <Bar dataKey="a3" stackId="a" fill="#020a9d" />
      <Bar dataKey="a4" stackId="a" fill="#FF0000" />
      <Bar dataKey="a5" stackId="a" fill="#FaF0aF" />
    </BarChart>
  );
}
