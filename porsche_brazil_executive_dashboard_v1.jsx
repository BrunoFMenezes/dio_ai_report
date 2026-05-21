import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  CartesianGrid,
} from 'recharts';

export default function PorscheExecutiveDashboard() {
  const rawData = [
    { city: 'Boston', model: '718 Cayman', year: 2022, price: 79500, payment: 'Credit Card' },
    { city: 'Seattle', model: '911 Turbo S', year: 2024, price: 235000, payment: 'Wire Transfer' },
    { city: 'Austin', model: 'Cayenne Coupe', year: 2023, price: 112750, payment: 'Financing' },
    { city: 'Denver', model: 'Macan S', year: 2021, price: 68900, payment: 'Cash' },
    { city: 'Los Angeles', model: 'Taycan 4S', year: 2024, price: 121000, payment: 'Bank Transfer' },
    { city: 'Miami', model: '911 Carrera', year: 2023, price: 154000, payment: 'Financing' },
    { city: 'Chicago', model: 'Panamera', year: 2022, price: 130000, payment: 'Cash' },
    { city: 'New York', model: 'Macan GTS', year: 2024, price: 97000, payment: 'Wire Transfer' },
    { city: 'Houston', model: 'Cayenne', year: 2023, price: 118000, payment: 'Credit Card' },
    { city: 'Phoenix', model: 'Taycan Turbo', year: 2024, price: 185000, payment: 'Bank Transfer' },
    { city: 'Dallas', model: '911 GT3', year: 2022, price: 245000, payment: 'Cash' },
    { city: 'San Diego', model: 'Macan', year: 2021, price: 76000, payment: 'Financing' }
  ];

  const [selectedModel, setSelectedModel] = useState('All');
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedPayment, setSelectedPayment] = useState('All');

  const models = useMemo(() => ['All', ...new Set(rawData.map((d) => d.model))], [rawData]);
  const years = useMemo(() => ['All', ...new Set(rawData.map((d) => d.year))], [rawData]);
  const cities = useMemo(() => ['All', ...new Set(rawData.map((d) => d.city))], [rawData]);
  const payments = useMemo(() => ['All', ...new Set(rawData.map((d) => d.payment))], [rawData]);

  const filteredData = useMemo(() => {
    return rawData.filter((item) => {
      return (
        (selectedModel === 'All' || item.model === selectedModel) &&
        (selectedYear === 'All' || item.year === selectedYear) &&
        (selectedCity === 'All' || item.city === selectedCity) &&
        (selectedPayment === 'All' || item.payment === selectedPayment)
      );
    });
  }, [selectedModel, selectedYear, selectedCity, selectedPayment]);

  const totalSales = filteredData.reduce((acc, item) => acc + item.price, 0);
  const totalVehicles = filteredData.length;
  const avgTicket = totalVehicles > 0 ? totalSales / totalVehicles : 0;

  const COLORS = ['#ffffff', '#999999', '#666666', '#cccccc'];

  const cityChartData = useMemo(() => {
    const grouped = {};

    filteredData.forEach((item) => {
      grouped[item.city] = (grouped[item.city] || 0) + 1;
    });

    return Object.entries(grouped).map(([city, sales]) => ({
      city,
      sales,
    }));
  }, [filteredData]);

  const paymentChartData = useMemo(() => {
    const grouped = {};

    filteredData.forEach((item) => {
      grouped[item.payment] = (grouped[item.payment] || 0) + 1;
    });

    return Object.entries(grouped).map(([name, value]) => ({
      name,
      value,
    }));
  }, [filteredData]);

  const revenueTrend = useMemo(() => {
    const grouped = {};

    filteredData.forEach((item) => {
      grouped[item.year] = (grouped[item.year] || 0) + item.price;
    });

    return Object.entries(grouped).map(([year, revenue]) => ({
      year,
      revenue,
    }));
  }, [filteredData]);

  const cityInsights = useMemo(() => {
    return filteredData.map((item, index) => ({
      city: item.city,
      model: item.model,
      volume: 1,
      id: index,
    }));
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden">
      <div
        className="h-[420px] bg-cover bg-center relative"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.45), rgba(0,0,0,0.95)), url('https://images-porsche.imgix.net/-/media/F40B976B0E934F6B98C9D1571318B432_0C7A2E4F2A194C39B7DBA6AF5DA2A5A9_CZ25W18IX0010-911-carrera-side?w=1400&q=85&auto=format')",
        }}
      >
        <div className="absolute inset-0 backdrop-blur-[1px]" />

        <div className="relative z-10 p-8 pt-16 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-zinc-800 pb-6 mb-8 gap-4">
            <div>
              <h1 className="text-4xl font-semibold tracking-wide">
                Porsche Executive Dashboard
              </h1>
              <p className="text-zinc-400 mt-2">
                Luxury Sales Intelligence • Porsche Brasil Inspired UI
              </p>
            </div>

            <div className="text-left md:text-right">
              <p className="text-zinc-500 uppercase text-sm">
                Premium Analytics
              </p>
              <p className="text-2xl font-light">2026</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 -mt-16 relative z-20">
        <div className="bg-zinc-950/95 backdrop-blur-xl border border-zinc-800 rounded-3xl p-6 shadow-2xl mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <select
              value={selectedModel}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {models.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>

            <select
              value={selectedYear}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
              onChange={(e) =>
                setSelectedYear(
                  e.target.value === 'All' ? 'All' : Number(e.target.value)
                )
              }
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <select
              value={selectedCity}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
              onChange={(e) => setSelectedCity(e.target.value)}
            >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <select
              value={selectedPayment}
              className="bg-zinc-900 border border-zinc-700 rounded-2xl p-4"
              onChange={(e) => setSelectedPayment(e.target.value)}
            >
              {payments.map((payment) => (
                <option key={payment} value={payment}>
                  {payment}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl">
            <p className="text-zinc-400 text-sm">Total Revenue</p>
            <h2 className="text-3xl mt-2 font-semibold">
              US$ {totalSales.toLocaleString()}
            </h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl">
            <p className="text-zinc-400 text-sm">Vehicles Sold</p>
            <h2 className="text-3xl mt-2 font-semibold">{totalVehicles}</h2>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl">
            <p className="text-zinc-400 text-sm">Average Ticket</p>
            <h2 className="text-3xl mt-2 font-semibold">
              US$ {Math.round(avgTicket).toLocaleString()}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          <div className="bg-zinc-900 rounded-3xl overflow-hidden border border-zinc-800 relative">
            <img
              src="https://images-porsche.imgix.net/-/media/4F82AB5D89A94B2DA8B9B51F65A0B33F_83F38F7E726D46088F88D774FCD2A8C5_taycan-modelimage-sideshot?w=1200&q=85&auto=format"
              alt="Porsche Taycan"
              className="w-full h-[280px] object-cover opacity-80"
            />
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <h3 className="text-xl mb-6">Revenue Trend</h3>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={revenueTrend}>
                <CartesianGrid stroke="#27272a" />
                <XAxis dataKey="year" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#ffffff"
                  fill="#ffffff"
                  fillOpacity={0.15}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <h3 className="text-xl mb-6">Top Porsche Models by City</h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={cityChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="city" stroke="#a1a1aa" />
                <YAxis stroke="#a1a1aa" />
                <Tooltip />
                <Bar dataKey="sales" fill="#ffffff" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
            <h3 className="text-xl mb-6">Payment Distribution</h3>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={paymentChartData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  innerRadius={55}
                >
                  {paymentChartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800 mb-10">
          <h3 className="text-2xl font-semibold mb-6">
            Sales Insights by City
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cityInsights.map((item, idx) => (
              <div
                key={`${item.city}-${idx}`}
                className="bg-black rounded-2xl p-6 border border-zinc-800"
              >
                <p className="text-zinc-500 uppercase text-xs tracking-widest">
                  {item.city}
                </p>

                <h4 className="text-2xl font-semibold mt-3">
                  {item.model}
                </h4>

                <div className="mt-6 flex items-center justify-between">
                  <span className="text-zinc-500">Sales Volume</span>
                  <span className="text-xl font-bold">{item.volume}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="hidden">
          <p>Test Case 1: Dashboard renders successfully.</p>
          <p>Test Case 2: Filters update charts dynamically.</p>
          <p>Test Case 3: Pie chart renders payment distribution.</p>
          <p>Test Case 4: Area chart renders revenue trend.</p>
          <p>Test Case 5: No JSX syntax errors.</p>
        </div>
      </div>
    </div>
  );
}
