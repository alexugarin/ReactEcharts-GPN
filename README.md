### Итог
[Ссылка с заданием на github](https://github.com/alexugarin/ReactEcharts-GPN "Ссылка с заданием на github")

[Ссылка на деплой приложения на vercel](https://react-echarts-gpn.vercel.app/ "Ссылка на деплой приложения на vercel")

Исходный текст задания в AboutTask.md, макет в Figma: https://www.figma.com/file/CppcOcor3NP1BfrppRgd4a/Test?node-id=0%3A1&mode=dev

### Ход выполнения
Устанавливаем зависимости через npm с помощью терминала:
```shell
npm i
```
Добавляем в корневой элемент `<ReactECharts option={option} />`
Обращаемся к документации [ECharts](https://echarts.apache.org/en/option.html "ECharts"), подбираем параметры `option` под задание и макет.
Мокаем данные из ***data.ts*** с помощью MockApi по ссылке https://65deed9cff5e305f32a0e133.mockapi.io/api/valute.
Добавляем в option наши данные: ***month*** и ***value***, предварительно отфильтровав по одной из валют программно, а также предварительно получив с сервера с помощью ***fetch***, и записав в переменную хуком ***useState***
Добавляем в корневой элемент компоненты ***Theme*** и ***Tabs*** из [Consta](https://consta.design/libs/uikit "Consta"):
```html
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
```
Реализуем фукнционал для ререндеринга графика, фильтрации полученных с сервера данных, заголовка и среднего значения за период в зависимости от выбранной Табы с помощью хуков ***useEffect***, ***useState***.
Подгружаем шрифт Inter из GoogleFonts через link, добавляем стили, отступы по макету.
