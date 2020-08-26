import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import { StoreContainer } from '../Store';

// const data = [
//   { name: 'Q - A', a1: 4000, a2: 2400, a3: 2400, a4: 1000, a5: 3000, },
//   { name: 'Q - B', a1: 3000, a2: 1398, a3: 2210, a4: 1000, a5: 3000, },
//   { name: 'Q - C', a1: 2000, a2: 9800, a3: 2290, a4: 1000, a5: 3000, },
//   { name: 'Q - D', a1: 2780, a2: 3908, a3: 2000, a4: 1000, a5: 3000, }
//   // { question: 'how ?', label OK: value 1, label :-|: value 2, label :-): value 3, }
// ];

export default function MyCharts(props: { results: any }) {
  const unstated = StoreContainer.useContainer();
  const [data, setData] = React.useState<any>(
    [
      // {1: 1, name: "38"},
      // {1: 2, 2: 1, 3: 1, 4: 3, 5: 2, name: "62"},
      // {3: 1, name: "64"}
      { name: 'Q - A', a1: 4000, a2: 2400, a3: 2400, a4: 1000, a5: 3000, },
      { name: 'Q - B', a1: 3000, a2: 1398, a3: 2210, a4: 1000, a5: 3000, },
      { name: 'Q - C', a1: 2000, a2: 9800, a3: 2290, a4: 1000, a5: 3000, },
      { name: 'Q - D', a1: 2780, a2: 3908, a3: 2000, a4: 1000, a5: 3000, }
    ]
  )
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

  // const countDuplicate = (id: number, arr: any, test: any) => {
  //   // let test: any = { "name": id };
  //   // let test: any = {};
  //   console.log("id test", id, test)
  //   arr.forEach((x: any) => { res[x] = (res[x] || 0) + 1; });
  //   // arr.forEach((x: any) => { counts[(JSON.parse(x)).id] = (counts[(JSON.parse(x)).value] || 0) + 1; });
  //   // arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).value] || 0) + 1; });
  //   // arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).id] || 0) + 1; });
  //   arr.forEach((x: any) => { counts[(JSON.parse(x)).value] = (counts[(JSON.parse(x)).id] || 0) + 1; });
  //   arr.forEach((x: any) => { totalQuestion[(JSON.parse(x)).value] = (totalQuestion[(JSON.parse(x)).id] || 0) + 1; });
  //   arr.forEach((x: any) => { test[(JSON.parse(x)).value] = (test[(JSON.parse(x)).id] || 0) + 1; });
  //   // !('name' in test) && (test.name = id)

  //   console.log("COUNT : ", res, counts, test)
  // }

  const countDuplicate = (id: number, arr: any, res: any) => {
    arr.forEach((x: any) => { res[`a${(JSON.parse(x)).value}`] = (res[(JSON.parse(x)).id] || 0) + 1; });
  }
  // JSON parse "{"id":0,"label":"Terrible","answer":1,"question":"How are you feeling at work?","value":1}"

  // do a copy of array TODO
  const add = (arr: any, name: number) => {
    const found = arr.some((el: any) => el.name === name);
    if (!found) arr.push({ name: name });
    return arr;
  }

  const donnees: any = (d: any) => {
    let xy: any[] = [];
    for (let index = 0; index < d.length; index++) {
      add(xy, d[index].info);
      let pos: number | undefined = xy.map((e: any) => { return e.name; }).indexOf(d[index].info); //  get position og the row containing {name: id}
      if (d[index].info) {
        !('name' in test) && (test.name = d[index].info)// add {name: id} if doesn't exist
        countDuplicate(d[index].info, d[index].description, xy[pos]);
      }
    }
    return (xy)
  }

  React.useEffect(() => {
    console.log('from Mycharts', props.results)
    let r: any;
    if (props.results) {
      r = (donnees(props.results));
      setData(r)
    }
    console.log("TTT", r)
  }, [])
  React.useEffect(() => {
    console.log("data", data);
  }, [data])

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
