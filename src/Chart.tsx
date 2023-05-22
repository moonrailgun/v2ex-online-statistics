import {
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Area,
  AreaChart,
} from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import dataset from "./assets/dataset.json";
dayjs.locale("zh-cn");

const data = dataset;

const maxDate = Math.max(...data.map((d) => d.date));
const minDate = Math.min(...data.map((d) => d.date));

const ticks: number[] = [];
let curDay = 0;
let curPoint = dayjs(minDate).startOf("d").valueOf();
while (curPoint < maxDate) {
  ticks.push(curPoint);
  curDay++;
  curPoint = dayjs(minDate).add(curDay, "d").startOf("d").valueOf();
}

export function Chart() {
  return (
    <ResponsiveContainer minWidth="400" height={444}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 20,
          left: 20,
          bottom: 20,
        }}
      >
        <defs>
          <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />

        <YAxis
          dataKey="count"
          domain={["auto", "auto"]}
          type="number"
          interval={0}
          label={{
            value: "在线人数",
            style: { textAnchor: "middle" },
            angle: -90,
            position: "left",
            offset: 0,
          }}
          allowDataOverflow={true}
        />

        <XAxis
          dataKey="date"
          domain={["auto", "auto"]}
          interval={0}
          type="number"
          allowDataOverflow={true}
          tickFormatter={(value) => dayjs(value).format("YYYY-MM-DD")}
          ticks={ticks}
          fontSize={9}
        />

        <Tooltip
          labelFormatter={(label) =>
            dayjs(label).format("YYYY-MM-DD HH:mm:ss ddd")
          }
        />

        <Legend />

        <Area
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorCount)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
