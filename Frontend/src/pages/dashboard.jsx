import React from "react";
import Statcard from "../componenets/dashboard/statcard";
import stats from "../componenets/dashboard/statdata";
export default function Dashboard() {
  return (
    <>
      <h1 className="text-2xl font-bold text-gray-950">Dashboard Overview</h1>
      <div className="flex items-center justify-between">
        {stats.map((item, index) => {
          return (
            <Statcard
              key={index}
              title={item.title}
              count={item.count}
              icon={<item.icon />}
              color={item.color}
            />
          );
        })}
      </div>
    </>
  );
}
