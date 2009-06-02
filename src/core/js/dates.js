function getMinutesText(minutes) {
	return minutes + " �����" + 
		(minutes == 1 || (minutes > 20 && minutes % 10 == 1)
			? "�" 
			: ((minutes >= 2 && minutes <= 4) || (minutes > 20 && minutes%10 >= 2 && minutes%10 <= 4)
				? "�" 
				: (minutes > 20 && minutes % 10 == 1 
					? "�"
					: "")));
}
function getHoursText(hours) {
	return hours + " ���" +
		(hours >= 20 && hours%10 == 1
			? "" 
			: ((hours >= 2 && hours <= 4) || (hours >= 20 && hours%10 >= 2 && hours%10 <= 4)
				? "�" 
				: (hours == 0 || hours >= 5
					? "��"
					: "")));
}
function getDaysText(days) {
	return days + " " + (days == 1 || (days >= 20 && days%10 == 1)
		? "����"
		: ((days >= 2 && days <= 4) || (days >= 20 && days%10 >= 2 && days%10 <= 4)
			? "���"
			: "����"));
}
var months = new Array('���', '���', '���', '���', '���', '���', '���', '���', '���', '���', '���', '���');
function getTextTimeDifference(ts) {
	var diff = new Date().getTime()/1000 - ts;
	var minutes = diff/60;
	var hours = minutes/60;
	var days = hours/24;
	if (diff <= 60) {
		return "������ ������ �����";
	} else if (diff > 60 && diff < 3600) {
		return getMinutesText(parseInt(minutes)) + " �����";
	} else if (diff >= 3600 && diff < 3600 * 24)  {
		return getHoursText(parseInt(hours)) + " " + 
			getMinutesText(parseInt(diff%3600/60)) + " �����";
	} else if (diff >= 3600 * 24 && diff < 3600 * 24 * 10) {
		return getDaysText(parseInt(days)) + " " + getHoursText(parseInt(diff/3600%24)) + " " + 
			getMinutesText(parseInt(diff%3600/60)) + " �����";
	} else {
		var date = new Date();
		date.setTime(ts * 1000);
		return date.getDate() + ' ' + 
			months[date.getMonth()] + ' ' +
			date.getFullYear() + ' ' +
			date.getHours() + ':' + date.getMinutes();
	}
}
