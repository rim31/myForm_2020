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
      { name: 'Q - A', answer_1: 4000, answer_2: 2400, answer_3: 2400, answer_4: 1000, answer_5: 3000, },
      { name: 'Q - B', answer_1: 3000, answer_2: 1398, answer_3: 2210, answer_4: 1000, answer_5: 3000, },
      { name: 'Q - C', answer_1: 2000, answer_2: 9800, answer_3: 2290, answer_4: 1000, answer_5: 3000, },
      { name: 'Q - D', answer_1: 2780, answer_2: 3908, answer_3: 2000, answer_4: 1000, answer_5: 3000, }
    ]
  )

  const smiley = (i: number) => {
    switch (i) {
      case 1:
        return "😫"
      case 2:
        return "🙁"
      case 3:
        return "😐"
      case 4:
        return "🙂"
      case 5:
        return "😃"
      default:
        return 'oho'
    }
  }


  const countDuplicate = (id: number, arr: any, res: any) => {
    arr.forEach((x: any) => { res[`answer_${(JSON.parse(x)).value}_${smiley((JSON.parse(x)).value)}`] = (res[`answer_${(JSON.parse(x)).value}_${smiley((JSON.parse(x)).value)}`] || 0) + 1; });
  }

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
      let pos: number | undefined = xy.map((e: any) => { return e.name; }).indexOf(d[index].info); //  get position of the row containing {name: id}
      if (d[index].info) {
        countDuplicate(d[index].info, d[index].description, xy[pos]);
      }
    }
    return (xy)
  }

  // React.useEffect(() => {
  //   console.log('from Mycharts', props.results)
  //   let r: any;
  //   if (props.results) {
  //     r = (donnees(props.results));
  //     setData(r)
  //   }
  //   console.log("TTT", r)
  // }, [])


  React.useEffect(() => {
    let r: any;
    if (props.results) {
      r = (donnees(props.results));
      setData(r);
    }
  }, [props])

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
      <Bar dataKey="answer_1_😫" stackId="answer" fill="#ff3f34" />
      <Bar dataKey="answer_2_🙁" stackId="answer" fill="#ffc048" />
      <Bar dataKey="answer_3_😐" stackId="answer" fill="#d2dae2" />
      <Bar dataKey="answer_4_🙂" stackId="answer" fill="#00d8d6" />
      <Bar dataKey="answer_5_😃" stackId="answer" fill="#05c46b" />
    </BarChart>
  );
}
