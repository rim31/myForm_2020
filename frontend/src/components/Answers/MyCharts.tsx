import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { StoreContainer } from '../Store';

const data = [
  { name: 'Q - A', uv: 4000, pv: 2400, amt: 2400, },
  { name: 'Q - B', uv: 3000, pv: 1398, amt: 2210, },
  { name: 'Q - C', uv: 2000, pv: 9800, amt: 2290, },
  { name: 'Q - D', uv: 2780, pv: 3908, amt: 2000, }
  // { question: 'how ?', label OK: value 1, label :-|: value 2, label :-): value 3, }
];

export default function MyCharts(props: { results: any }) {
  const unstated = StoreContainer.useContainer();
  const [xy, setXy] = React.useState<array>([])
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

  const countDuplicate = (arr: any) => {
    let counts: any = {};
    // arr.forEach((x: any) => { counts[x] = (counts[x] || 0) + 1; });
    arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).value] || 0) + 1; });
    console.log("COUNT : ", counts)

  }

  const donnees = (d: any) => {
    for (let index = 0; index < d.length; index++) {
      const element = d[index];
      console.log("element", element);
      if (d[index].info == 62) {
        console.log('===>', d[index].description)
        countDuplicate(d[index].description);
        for (let i = 0; i < d[index].description.length; i++) {
          const element = d[index].description[i];
          console.log("--> e ", element);
          console.log("--==> Parse : e.value", (JSON.parse(element)).value);
          // updateData()
        }
      } else {
        console.log("==> X ", "element");
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
      <Bar dataKey="pv" stackId="a" fill="#8884d8" />
      <Bar dataKey="uv" stackId="a" fill="#82ca9d" />
      <Bar dataKey="amt" stackId="a" fill="#020a9d" />
    </BarChart>
  );
}
