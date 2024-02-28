import React, { useEffect, useState } from 'react';
import { ReactECharts } from './Echarts/ReactECharts';
import { Tabs } from '@consta/uikit/Tabs';
import { Theme, presetGpnDefault } from '@consta/uikit/Theme';

type Item = {
  name: string;
};
//Массив объектов для табов consta
const items: Item[] = [{ name: '$' }, { name: '€' }, { name: '¥' }];
//Массив для фильтрации данных, полученных с сервера, в зависимости от выбранной табы
const indicatorValute: string[] = ['Курс доллара', 'Курс евро', 'Курс юаня'];
//Массив для изменения заголовка в зависимости от выбранной табы
const indicatorEnum: string[] = ['ДОЛЛАРА, $', 'ЕВРО, €', 'ЮАНЯ, ¥'];

function App() {
  //Для начального мока useState данных с сервера
  const mock = [
    {
      id: '',
      month: '',
      indicator: '',
      value: 0,
    },
  ];
  //Создаем переменную под данные с сервера
  const [mockData, setData] = useState(mock);

  //Записываем данные в переменную после рендера
  useEffect(() => {
    fetch('https://65deed9cff5e305f32a0e133.mockapi.io/api/valute')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error));
  }, []);

  //Устанавливаем значение среднего за месяц после рендеринга, иначе будет вычисляться предыдущее значение
  //Меняем контент в зависимости от выбранной табы
  useEffect(() => {
    setAverage(
      (
        values.reduce(function (a, b) {
          return a + b;
        }, 0) / values.length
      ).toFixed(1)
    );
    if (value === items[0]) {
      setIndicator(indicatorEnum[0]);
      setInValute(indicatorValute[0]);
    } else if (value === items[1]) {
      setIndicator(indicatorEnum[1]);
      setInValute(indicatorValute[1]);
    } else {
      setIndicator(indicatorEnum[2]);
      setInValute(indicatorValute[2]);
    }
  });

  //Переменная для фильтрации массива полученных данных
  const [inValute, setInValute] = useState<string | null>(indicatorValute[0]);

  //Инициализируем переменную под отфильтрованный массив данных
  let filteredMockData = [];

  //Фильтруем массив данных и записываем в ранее проинициализированную переменную
  filteredMockData = mockData.filter((data) => data.indicator === inValute);

  //Инициализируем массивы под даты и значения для графика
  const date: string[] = [];
  const values: number[] = [];
  //Заполняем ранее проинициализированные массивы
  filteredMockData.forEach((el) => date.push(el.month));
  filteredMockData.forEach((el) => values.push(el.value));

  //Инициализируем объект с настройками для EChart
  const option = {
    xAxis: {
      type: 'category',
      data: date,
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: {
      type: 'value',
      min: 'dataMin',
      max: 'dataMax',
      splitLine: {
        show: true,
        lineStyle: {
          type: 'dashed',
        },
      },
      axisLabel: {
        showMinLabel: false,
      },
    },
    series: [
      {
        data: values,
        type: 'line',
        color: '#F38B00',
        name: inValute,
        showSymbol: false,
      },
    ],
    tooltip: [
      {
        show: 'true',
        trigger: 'axis',
        valueFormatter: (val: number) => val + '₽',
      },
    ],
  };

  //Инициализируем переменную для изменения заголовка через хук
  const [indicator, setIndicator] = useState<string | null>(indicatorEnum[0]);
  //Инициализируем переменную для табов
  const [value, setValue] = useState<Item | null>(items[0]);
  //Инициализируем переменную для вычисления среднего значнения за период
  const [average, setAverage] = useState<string | null>(null);

  return (
    <div
      style={{
        width: '1200px',
        height: '400px',
        margin: '200px auto 0 auto',
        backgroundColor: 'white',
        borderRadius: '1%',
        padding: '0 10px 10px 10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            width: '100%',
            fontSize: '20px',
            fontFamily: 'Inter',
            fontWeight: '700',
            color: '#002033',
            paddingTop: '10px'
          }}
        >
          КУРС {indicator}/₽
        </div>

        <div>
          <Theme className="App" preset={presetGpnDefault}>
            <Tabs
              value={value}
              size="m"
              view="bordered"
              linePosition="bottom"
              fitMode="scroll"
              onChange={({ value }) => {
                setValue(value);
              }}
              items={items}
              getItemLabel={(item) => item.name}
            />
          </Theme>
        </div>
      </div>
      <div style={{ display: 'flex', height: '400px' }}>
        <ReactECharts option={option} />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ paddingRight: '20px' }}>
            <div
              style={{
                fontSize: '16px',
                fontFamily: 'Inter',
                fontWeight: '400',
                color: '#667985',
                width: '156px',
              }}
            >
              Среднее за период
            </div>
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
            >
              <span
                style={{
                  fontSize: '40px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  color: '#F38B00',
                  width: '85px',
                  display: 'block',
                }}
              >
                {average}
              </span>
              <span
                style={{
                  fontSize: '20px',
                  fontFamily: 'Inter',
                  fontWeight: '400',
                  color: '#667985',
                  paddingTop: '18px',
                }}
              >
                ₽
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
