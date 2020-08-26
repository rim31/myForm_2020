import React, { PureComponent } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';


{/**
Component display charts of all answers*/}
export default function MyCharts(props: { results: any }) {
  const [data, setData] = React.useState<any>(
    [
      { name: 'Question - A', answer_1: 4000, answer_2: 2400, answer_3: 2400, answer_4: 1000, answer_5: 3000, },
      { name: 'Question - B', answer_1: 3000, answer_2: 1398, answer_3: 2210, answer_4: 1000, answer_5: 3000, },
      { name: 'Question - C', answer_1: 2000, answer_2: 9800, answer_3: 2290, answer_4: 1000, answer_5: 3000, },
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

  {/**
  function duplicate (Iid, array of answer, array o result
    count the number of the answer (1-5) and add in th row of the final array
    example : find 3 times answer 1 => add 3 in the [{answer_1 : 3}, {...} ] 
  */}
  const countDuplicate = (id: number, arr: any, res: any) => {
    arr.forEach((x: any) => { res[`answer_${(JSON.parse(x)).value}_${smiley((JSON.parse(x)).value)}`] = (res[`answer_${(JSON.parse(x)).value}_${smiley((JSON.parse(x)).value)}`] || 0) + 1; });
  }

  {/**function add (res: array, id: number)
    create a new element with ID of question if not exist
  */}
  const add = (arr: any, name: number) => {
    const found = arr.some((el: any) => el.name === name);
    if (!found) arr.push({ name: name });
    return arr;
  }

  {/**
    function createData(d : data from the pros (all results))
    create the data as expect by library recharts
    [
      { name: 'Question - A', answer_1: 4000, answer_2: 2400, answer_3: 2400, answer_4: 1000, answer_5: 3000, },
      { name: 'Question - B', answer_1: 3000, answer_2: 1398, answer_3: 2210, answer_4: 1000, answer_5: 3000, },
      { name: 'Question - C', answer_1: 2000, answer_2: 9800, answer_3: 2290, answer_4: 1000, answer_5: 3000, },
    ]
 */}
  const createData: any = (d: any) => {
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

  {/**
    update charts on change of the props
  */}
  React.useEffect(() => {
    if (props.results) {
      setData(createData(props.results));
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
