import React, { useMemo, useState } from 'react';

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
  }, [rawData, selectedModel, selectedYear, selectedCity, selectedPayment]);

  const totalSales = filteredData.reduce((acc, item) => acc + item.price, 0);
  const totalVehicles = filteredData.length;
  const avgTicket = totalVehicles > 0 ? totalSales / totalVehicles : 0;

  const cityChartData = useMemo(() => {
    const cityModelMap = {};

    filteredData.forEach((item) => {
      const key = `${item.city}-${item.model}`;
      cityModelMap[key] = (cityModelMap[key] || 0) + 1;
    });

    return Object.entries(cityModelMap).map(([key, value]) => {
      const [city, model] = key.split('-');

      return {
        city,
        model,
        sales: value,
      };
    });
  }, [filteredData]);

  const yearChartData = useMemo(() => {
    const yearMap = {};

    filteredData.forEach((item) => {
      yearMap[item.year] = (yearMap[item.year] || 0) + 1;
    });

    return Object.entries(yearMap).map(([year, value]) => ({
      year,
      volume: value,
    }));
  }, [filteredData]);

  const cityInsights = useMemo(() => {
    const insightMap = {};

    filteredData.forEach((item) => {
      if (!insightMap[item.city]) {
        insightMap[item.city] = {};
      }

      insightMap[item.city][item.model] =
        (insightMap[item.city][item.model] || 0) + 1;
    });

    return Object.entries(insightMap).map(([city, models]) => {
      const topModel = Object.entries(models).sort((a, b) => b[1] - a[1])[0];

      return {
        city,
        model: topModel?.[0] || 'N/A',
        volume: topModel?.[1] || 0,
      };
    });
  }, [filteredData]);

  return (
    <div className="min-h-screen bg-black text-white p-8 font-sans">
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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
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
        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <h3 className="text-xl mb-6">Top Porsche Models by City</h3>

          <div className="space-y-4">
            {cityChartData.map((item, idx) => (
              <div
                key={`${item.city}-${item.model}-${idx}`}
                className="flex justify-between border-b border-zinc-800 pb-2"
              >
                <span className="text-zinc-300">
                  {item.city} • {item.model}
                </span>
                <span className="font-semibold">{item.sales} sales</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">
          <h3 className="text-xl mb-6">Model Year Performance</h3>

          <div className="space-y-5">
            {yearChartData.map((item, idx) => (
              <div key={`${item.year}-${idx}`}>
                <div className="flex justify-between mb-2">
                  <span>{item.year}</span>
                  <span>{item.volume} vehicles</span>
                </div>

                <div className="w-full bg-zinc-800 rounded-full h-3 overflow-hidden">
                  <div
                    className="bg-white h-3 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(item.volume * 12, 100)}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-2xl font-semibold">
              Sales Insights by City
            </h3>

            <p className="text-zinc-400 mt-2">
              Identification of high-demand Porsche models across regional
              markets.
            </p>
          </div>
        </div>

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

              <p className="text-zinc-400 mt-2">
                Most sold Porsche model in this city.
              </p>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-zinc-500">Sales Volume</span>
                <span className="text-xl font-bold">{item.volume}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden">
        <p>Test Case 1: Default render should display 12 vehicles.</p>
        <p>Test Case 2: Selecting year 2024 should filter only 2024 vehicles.</p>
        <p>Test Case 3: Selecting payment Cash should show only cash transactions.</p>
        <p>Test Case 4: Average ticket must never divide by zero.</p>
        <p>Test Case 5: Progress bars must not exceed 100% width.</p>
      </div>
    </div>
  );
}
