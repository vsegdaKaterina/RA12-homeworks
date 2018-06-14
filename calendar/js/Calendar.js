// узнать день недели 0(понедельник) - 6(воскресенье)
function getDay(date) {
	let day = date.getDay();

	if (day == 0) day = 7;
	return day - 1;
}

// получить массив дней для календаря
function getDatesArray(date) {
	let month = date.getMonth(),
		monthYear = new Date (date.getFullYear(), month),
		copyMonthYear = new Date (monthYear),
		datesArray = [],
		counter = 0;
	
	// получить дни предыдущего месяца
	for (let i = 0; i < getDay(monthYear); i++) { //получаем номер дня недели и прогоняем цикл 
		datesArray.push(copyMonthYear.getDate(copyMonthYear.setDate(copyMonthYear.getDate() - 1))); //заполняем массив днями предыдущего месяца
	}

	datesArray.reverse();
	
	// пока текущий месяц, добавляем дни в массив 
	while (monthYear.getMonth() == month) {
		datesArray.push(monthYear.getDate());
		// день вперёд
		monthYear.setDate(monthYear.getDate() + 1);
	}

	// проверить заполненность недель
	while (datesArray.length % 7 != 0) {
		datesArray.push(++counter);
	}

	return datesArray;
}

// создать разметку по неделям
function makeCalendar(date) {
	let datesArr = getDatesArray(date);

	// неделя 1
	let firstWeek = datesArr.map((item, index) => {
		if (index < 7) {
			let nameOfClass;
			// когда есть дни прошлого месяца
			if (item > 1 && 7 < item) nameOfClass = "ui-datepicker-other-month";
			// если сегодня < 7
			if (item == date.getDate() && item <= 7) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	}),

	// неделя 2
	secondWeeks = datesArr.map((item, index) => {
		if (index >= 7 && index < 14) {
			let nameOfClass;
			if (item == date.getDate()) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	}),

	// неделя 3
	thirdWeeks = datesArr.map((item, index) => {
		if (index >= 14 && index < 21) {
			let nameOfClass;
			if (item == date.getDate()) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	}),

	// неделя 4
	fourthWeeks = datesArr.map((item, index) => {
		if (index >= 21 && index < 28) {
			let nameOfClass;
			if (item == date.getDate()) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	}),

	// неделя 5
	fifthWeek = datesArr.map((item, index) => {
		if (index >= 28 && index < 35) {
			let nameOfClass;
			if (item < 7) nameOfClass = "ui-datepicker-other-month";
			if (item == date.getDate() && item > 7) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	}),

	// неделя 6
	sixthWeek = datesArr.map((item, index) => {
		if (index >= 35 && index < 42) {
			let nameOfClass;
			if (item < 7) nameOfClass = "ui-datepicker-other-month";
			if (item == date.getDate() && item > 7) nameOfClass = "ui-datepicker-today";

			return (<td className={nameOfClass} key={index}>{item}</td>);
		}
	});

	return (
		<tbody>
			<tr>	
				{firstWeek}
			</tr>
			<tr>	
				{secondWeeks}
			</tr>
			<tr>	
				{thirdWeeks}
			</tr>
			<tr>	
				{fourthWeeks}
			</tr>
			<tr>	
				{fifthWeek}
			</tr>
			<tr>	
				{sixthWeek}
			</tr>
 		</tbody>
	);

}

// вывести сегодняшний день
function makeDayNow(date) {
	// список месяцев для даты	
	let months = 'Января,Февраля,Марта,Апреля,Мая,Июня,Июля,Августа,Сентября,Октября,Ноября,Декабря'.split(',');
	// день недели
	let arrDays = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	let day = date.getDay();
	let dayOfWeek = arrDays[day];	

	return (
		<div className="ui-datepicker-material-header">
 			<div className="ui-datepicker-material-day">{dayOfWeek}</div>
 			<div className="ui-datepicker-material-date">
 				<div className="ui-datepicker-material-day-num">{date.getDate()}</div>
 				<div className="ui-datepicker-material-month">{months[date.getMonth()]}</div> {/*по номеру месяца получаем название из массива*/}
 				<div className="ui-datepicker-material-year">{date.getFullYear()}</div>
 			</div>
 		</div>
	);
}

const Calendar = function ({date}) {
	let month = date.toLocaleString('ru', { month: 'long'	});

	return (
		<div className="ui-datepicker">
 			{makeDayNow(date)} 
 			<div className="ui-datepicker-header">
 				<div className="ui-datepicker-title">
 					<span className="ui-datepicker-month">{month}</span>&nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
 				</div>
 			</div>
 			<table className="ui-datepicker-calendar">
 				<colgroup>
 					<col />
 					<col />
 					<col />
 					<col />
 					<col />
 					<col className="ui-datepicker-week-end" />
 					<col className="ui-datepicker-week-end" />
 				</colgroup>
 				<thead>
 					<tr>
 						<th scope="col" title="Понедельник">Пн</th>
 						<th scope="col" title="Вторник">Вт</th>
 						<th scope="col" title="Среда">Ср</th>
 						<th scope="col" title="Четверг">Чт</th>
 						<th scope="col" title="Пятница">Пт</th>
 						<th scope="col" title="Суббота">Сб</th>
 						<th scope="col" title="Воскресенье">Вс</th>
 					</tr>
 				</thead>
 				{makeCalendar(date)}
 			</table>
 		</div>
	);
}


