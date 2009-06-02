var authNotice, regNotice, forgetNotice;
var xmlHttp_auth;
function auth() {
	authNotice = $('authnotice');

	var login = $('login');
	var password = $('password');
	var remember = $('remember');

	if (login.value.match(/^\s*$/)) {
		showError(authNotice, '����� �� ����� ���� ������.');
		login.focus();
		return false;
	} else if (! login.value.match(/^[a-zA-Z0-9]+$/)) {
		showError(authNotice, '� ������ ����� ���� ������ ��������� ����� (a-z, A-Z) � �������� ����� (0-9).');
		login.focus();
		return false;
	}

	if (password.value.match(/^\s*$/)) {
		showError(authNotice, '������ �� ����� ���� ������.');
		password.focus();
		return false;
	}

	showProgress(authNotice, '���� ��������...');

	if (window.ActiveXObject) xmlHttp_auth = new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest) xmlHttp_auth = new XMLHttpRequest();
	xmlHttp_auth.onreadystatechange = handleAuth;
	xmlHttp_auth.open("GET", 
		www + "ajax.php?do=auth" +
		"&login=" + encodeURIComponent(login.value) +
		"&password=" + encodeURIComponent(password.value) + 
		"&remember=" + (remember.checked ? 1 : 0) +
		"&ts=" + new Date().getTime(), true);
	try {
		xmlHttp_auth.send(null);
	} catch (e) {
		showError(authNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
	return false;
}
function handleAuth() {
	try {
		if(xmlHttp_auth && xmlHttp_auth.readyState == 4 && xmlHttp_auth.status == 200) {
			var xml = xmlHttp_auth.responseXML;
			var logged = xml.getElementsByTagName('logged');
			var warn = xml.getElementsByTagName('warn');
			if (logged.length == 1) {
				showNotice(authNotice, '�������� ������ �������! ���������, ����������, ��������� ������, ���� �������� ����������.');
				location.href = www + '?ts=' + new Date().getTime();
			} else if (warn.length > 0) {
				showError(authNotice, warn[0].firstChild.nodeValue);
			} else {
				showError(authNotice, '�����-�� �������� �� �������. RAW output: ' + xmlHttp_auth.responseText);
			}
		} else if (xmlHttp_auth && xmlHttp_auth.readyState == 4 && xmlHttp_auth.status != 200) {
		 	showError(authNotice, '�����-�� �������� �� �������. ��� ��������: ' + xmlHttp_auth.status);
		}
	} catch(e) {
		showError(authNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
}

var xmlHttp_reg;
function register() {
	regNotice = $('regnotice');

	var login = $('reglogin');
	var password = $('regpassword');
	var name = $('name');
	var email = $('email');
	var info = $('info');

	if (checkEmptyField(login, regNotice, '����� �� ����� ���� ������')) return false;
	else if (! login.value.match(/^(\w|\d)+$/)) {
		showError(regNotice, 
			'����� ����� ��������� ������ ��������� ����� (a-z, A-Z) ��� �������� ����� (0-9).');
		login.select();
		login.focus();
		return false;
	}
	if (checkEmptyField(password, regNotice, 
		'������ �� ����� ���� ������. ���� �� ������ ������, ��� ������ ������ ������ ���� �� ���.')) return false;
	if (checkEmptyField(name, regNotice, 
		'��� �� ����� �������� �����, ��� ��� �����. �������, ����������, ���� ���.')) return false;
	if (checkEmptyField(email, regNotice, 
		'E-mail ����� ��� ����, ����� ����� ���������, ��� �� - ��� ��. ' +
		'��� �� �����, ����� �������� ������� ������, ���� ����� �� ��� ������. ' +
		'� ��� ��� ����� ������� ����� ����������� ��������� � ����, ���� ��� (�������� �����!). ' +
		'�������, ����������, ��� e-mail.')) return false;
	else if (! checkEmail(email.value)) {
		showError(regNotice, 
			'� ����� e-mail ������, ���������, ����������. ������� ����-�� ����� email@server.com');
		email.focus();
		return false;
	}
	if (checkEmptyField(info, regNotice, '��� �� ����� �������� ����� ���� ������ � ���.')) return false;

	showProgress(regNotice, '���� �����������...');

	if (window.ActiveXObject) xmlHttp_reg = new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest) xmlHttp_reg = new XMLHttpRequest();
	xmlHttp_reg.onreadystatechange = handleRegister;
	xmlHttp_reg.open("POST", 
		www + "ajax.php?do=register" +
		"&ts=" + new Date().getTime(), true);
	xmlHttp_reg.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	try {
		xmlHttp_reg.send(
			"login=" + encodeURIComponent(login.value) +
			"&password=" + encodeURIComponent(password.value) + 
			"&name=" + encodeURIComponent(name.value) +
			"&email=" + encodeURIComponent(email.value) +
			"&info=" + encodeURIComponent(info.value));
	} catch (e) {
		showError(regNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
	return false;
}
function handleRegister() {
	try {
		if(xmlHttp_reg && xmlHttp_reg.readyState == 4 && xmlHttp_reg.status == 200) {
			var xml = xmlHttp_reg.responseXML;
			var registered = xml.getElementsByTagName('registered');
			var warn = xml.getElementsByTagName('warn');
			if (registered.length == 1) {
				showNotice(regNotice, 
					'����������� ������ �������! �� ��������� ���� e-mail ���� ���������� ������ ' +
					'�� �������, ������� �� �������, �� ����������� ���� ������� ������.');
			} else if (warn.length > 0) {
				showError(regNotice, warn[0].firstChild.nodeValue);
			} else {
				showError(regNotice, '�����-�� �������� �� �������. RAW output: ' + 
					xmlHttp_reg.responseText);
			}
		} else if (xmlHttp_reg && xmlHttp_reg.readyState == 4 && xmlHttp_reg.status != 200) {
	 		showError(regNotice, '�����-�� �������� �� �������. ��� ��������: ' + xmlHttp_reg.status);
		}
	} catch(e) {
		showError(regNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
}

var foretNotice;
var xmlHttml_forget;
function forget() {
	foretNotice = $('forgetnotice');
	var email = $('forgetemail');

	if (checkEmptyField(email, foretNotice, 
		'���� �� �� ������� ��� e-mail, �� �� ������ �������� ��� ������.')) return false;
	else if (! checkEmail(email.value)) {
		showError(foretNotice, 
			'� ����� e-mail ������, ���������, ����������. ������� ����-�� ����� email@server.com');
		email.focus();
		return false;
	}

	if (window.ActiveXObject) xmlHttml_forget = new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest) xmlHttml_forget = new XMLHttpRequest();
	xmlHttml_forget.onreadystatechange = handleForget;
	xmlHttml_forget.open("GET", 
		www + "ajax.php?do=forget" +
		"&email=" + email.value +
		"&ts=" + new Date().getTime(), true);
	try {
		showProgress(foretNotice, '����������...');
		xmlHttml_forget.send(null);
	} catch (e) {
		showError(foretNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
	return false;
}
function handleForget() {
	try {
		if(xmlHttml_forget && xmlHttml_forget.readyState == 4 && xmlHttml_forget.status == 200) {
			var xml = xmlHttml_forget.responseXML;
			var sent = xml.getElementsByTagName('sent');
			var warn = xml.getElementsByTagName('warn');
			if (sent.length == 1) {
				showNotice(foretNotice, 
					'�� ��������� ��� ������ � ����� �������.');
			} else if (warn.length > 0) {
				showError(foretNotice, warn[0].firstChild.nodeValue);
			} else {
				showError(foretNotice, '�����-�� �������� �� �������. RAW output: ' + 
					xmlHttml_forget.responseText);
			}
		} else if (xmlHttml_forget && xmlHttml_forget.readyState == 4 && xmlHttml_forget.status != 200) {
	 		showError(foretNotice, '�����-�� �������� �� �������. ��� ��������: ' + xmlHttml_forget.status);
		}
	} catch(e) {
		showError(foretNotice, 
			'�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
}

var xmlHttp_logout;
function logout() {
	if (window.ActiveXObject) xmlHttp_logout = new ActiveXObject("Microsoft.XMLHTTP");
	else if (window.XMLHttpRequest) xmlHttp_logout = new XMLHttpRequest();
	xmlHttp_logout.onreadystatechange = handleLogout;
	xmlHttp_logout.open("GET", 
		www+"ajax.php?do=logout" +
		"&ts=" + new Date().getTime(), true);
	try {
		xmlHttp_logout.send(null);
	} catch (e) {
		alert('�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
}
function handleLogout() {
	try{
		if(xmlHttp_logout && xmlHttp_logout.readyState == 4 && xmlHttp_logout.status == 200) {
			var xml = xmlHttp_logout.responseXML;
			var warn = xml.getElementsByTagName('warn');
			var loggedout = xml.getElementsByTagName('loggedout');
			if (warn.length > 0) {
				alert('�������� ���������. ' +
					'���� ������ ��������� ��� �������� ����������� � ����������� ��������� �������� ' +
					'��� ����� ������. (' + warn[0].firstChild.nodeValue);
			} else if (loggedout.length > 0) {
				location.href = www + '?ts=' + new Date().getTime();
			} else {
			 	alert('�������� ���������. ' +
			 		'�����-�� �������� �� �������. RAW output: ' + xmlHttp_logout.responseText);
			}
		} else if (xmlHttp_logout && xmlHttp_logout.readyState == 4 && xmlHttp_logout.status != 200) {
	 		alert('�������� ���������. ' +
	 			'�����-�� �������� �� �������. ��� ��������: ' + xmlHttp_logout.status);
		}
	} catch(e) {
		alert('�������� ���-�� � �����. ���������� ��������� ���� �����. (' + e + ')'); 
	}
}

