function ValidateNumber(objElement) {
	// check for valid numeric strings 
	var strString = objElement;
	var strValidChars = ".,0123456789?"; //decimal ok
	var strChar;
	var blnResult = true;

	// test strString consists of valid characters listed above
	for (i = 0; i < strString.length && blnResult == true; i++)
	{
	strChar = strString.charAt(i);
	if (strValidChars.indexOf(strChar) == -1)
	{
	blnResult = false;
	}
	}
	return blnResult;
}

function compareNumbers(tipo, comparacao, primeiro, segundo){
	if (tipo == "INT"){
		switch (comparacao) {
		case "MAIOR":
			if(parseInt(primeiro) > parseInt(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;	
		case "MENOR":
			if(parseInt(primeiro) < parseInt(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;
		case "IGUAL":
			if(parseInt(primeiro) == parseInt(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;			
		case "DIFERENTE":
			if(parseInt(primeiro) != parseInt(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;	
		default:
			//nao faz nada
		}	
	}
	if (tipo == "FLOAT"){
		switch (comparacao) {
		case "MAIOR":
			if(parseFloat(primeiro) > parseFloat(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;	
		case "MENOR":
			if(parseFloat(primeiro) < parseFloat(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;
		case "IGUAL":
			if(parseFloat(primeiro) == parseFloat(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;			
		case "DIFERENTE":
			if(parseFloat(primeiro) != parseFloat(segundo)) {
				return true;
			} else	{
				return false;
			}
			break;	
		default:
			//nao faz nada
		}	
	}
}

function allLetter(inputtxt)   
  {   
   var letters = /^[A-Za-z]+$/;   
   if(inputtxt.value.match(letters))   
     {   
      return true;   
     }   
   else  
     {   
     return false;   
     }   
  }  

function valButton(btn) {
	var cnt = -1;
	for (var i=btn.length-1; i > -1; i--) {
		if (btn[i].checked) {cnt = i; i = -1;}
	}
	if (cnt > -1) return btn[cnt].value;
	else return null;
}

function is_cnpj(str) {
	if (!(str = /^\d?(\d{2})\.?(\d{3})\.?(\d{3})\/?(\d{4})\-?(\d{2})/.exec(str)))
		return false;

	var sum1 = 0, sum2 = 0, sum3 = 0, calc1 = 5, calc2 = 6;

	str.shift();
	str = str.join("");

	for (var i=0; i <= 12; i++) {
		calc1 = (calc1 < 2) ? 9 : calc1;
		calc2 = (calc2 < 2) ? 9 : calc2;

		if (i <= 11)
			sum1 += str[i] * calc1;

		sum2 += str[i] * calc2;
		sum3 += str[i];
		calc1--;
		calc2--;
	}

	sum1 %= 11;
	sum2 %= 11;

	return (sum3 && str[12] == (sum1 < 2 ? 0 : 11 - sum1) && str[13] == (sum2 < 2 ? 0 : 11 - sum2)) ? str : false;
}


function validatePassword (pw) {

	// enforce the no sequential, identical characters rule
	//if (/([\S\s])\1/.test(pw))
		//return false;
		
	if (/([\S\s])\1\1/.test(pw))
	return false;

	// enforce alphanumeric/qwerty sequence ban rules
		var	lower   = "abcdefghijklmnopqrstuvwxyz",
			badSequenceLength  = 0,
			upper   = lower.toUpperCase(),
			numbers = "0123456789",
			qwerty  = "qwertyuiopasdfghjklzxcvbnm",
			start   = badSequenceLength - 1,
			seq     = "_" + pw.slice(0, start);
		for (i = start; i < pw.length; i++) {
			seq = seq.slice(1) + pw.charAt(i);
			if (
				lower.indexOf(seq)   > -1 ||
				upper.indexOf(seq)   > -1 ||
				numbers.indexOf(seq) > -1 ||
				qwerty.indexOf(seq) > -1) {
				return false;
			}
		}

	// great success!
	return true;
}


function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}

function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function MM_jumpMenu(targ,selObj,restore){ //v3.0
  eval(targ+".location='"+selObj.options[selObj.selectedIndex].value+"'");
  if (restore) selObj.selectedIndex=0;
}

function reflete(obj){
parent.resultado.location.href="cep.asp?cep="+obj;
}

function IsCEP(strCEP)
        {
  
	if (strCEP.length<8)
	return false;
  
	re = /#@?$%~|00000000|11111111|22222222|33333333|44444444|55555555|66666666|77777777|88888888|99999999/gi;
    if(re.test(strCEP)){
	     return false;
   }else{
     return true;
   }
}




function echeck(str) {

		var at="@"
		var dot="."
		var lat=str.indexOf(at)
		var lstr=str.length
		var ldot=str.indexOf(dot)
		if (str.indexOf(at)==-1){
		   //alert("Invalid E-mail ID")
		   return false
		}

		if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
		   //alert("Invalid E-mail ID")
		   return false
		}

		if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
		    //alert("Invalid E-mail ID")
		    return false
		}

		 if (str.indexOf(at,(lat+1))!=-1){
		    //alert("Invalid E-mail ID")
		    return false
		 }

		 if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
		    //alert("Invalid E-mail ID")
		    return false
		 }

		 if (str.indexOf(dot,(lat+2))==-1){
		    //alert("Invalid E-mail ID")
		    return false
		 }
		
		 if (str.indexOf(" ")!=-1){
		    //alert("Invalid E-mail ID")
		    return false
		 }

 		 return true					
	}

function checkMail(mail){
    var er = new RegExp(/^[A-Za-z0-9_\-\.]+@[A-Za-z0-9_\-\.]{2,}\.[A-Za-z0-9]{2,}(\.[A-Za-z0-9])?/);
    if(typeof(mail) == "string"){
        if(er.test(mail)){ return true; }
    }else if(typeof(mail) == "object"){
        if(er.test(mail.value)){ 
                    return true; 
                }
    }else{
        return false;
        }
}

function checaCPF (CPF) {
	if (CPF.length != 11 || CPF == "00000000000" || CPF == "11111111111" ||
		CPF == "22222222222" ||	CPF == "33333333333" || CPF == "44444444444" ||
		CPF == "55555555555" || CPF == "66666666666" || CPF == "77777777777" ||
		CPF == "88888888888" || CPF == "99999999999" || CPF == "01234567890")
		return false;
	soma = 0;
	for (i=0; i < 9; i ++)
		soma += parseInt(CPF.charAt(i)) * (10 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(9)))
		return false;
	soma = 0;
	for (i = 0; i < 10; i ++)
		soma += parseInt(CPF.charAt(i)) * (11 - i);
	resto = 11 - (soma % 11);
	if (resto == 10 || resto == 11)
		resto = 0;
	if (resto != parseInt(CPF.charAt(10)))
		return false;
       
	return true;
 }

 
function CamposObrigatorios(tipo_form){
	var ArrayCampos = new Array();
	if (tipo_form =="LOGIN"){
		ArrayCampos[0] = new Array("login","VAZIO", "", "", "", "O login deve ser informado");
		ArrayCampos[1] = new Array("senha","VAZIO", "", "", "","A senha deve ser informada");
	}
	if (tipo_form =="MENSAGEM"){
		ArrayCampos[0] = new Array("mensagem","VAZIO", "", "", "", "Preencha a mensagem");
	}
	if (tipo_form =="ESQUECI"){
		ArrayCampos[0] = new Array("login","VAZIO", "", "", "", "O login deve ser informado");
	}
	if (tipo_form =="CADASTRO"){
		ArrayCampos[0] = new Array("nome","VAZIO", "", "", "", "O nome deve ser informado");
		ArrayCampos[1] = new Array("login","VAZIO", "", "", "", "O login deve ser informado");
		ArrayCampos[2] = new Array("email","EMAIL", "", "", "", "O e-mail não foi informado ou está num formato inválido");
		ArrayCampos[3] = new Array("senha","VAZIO", "", "", "", "A senha deve ser informada");
		ArrayCampos[4] = new Array("confirme_senha","VAZIO", "", "", "", "A confirmação de senha deve ser informada");
		ArrayCampos[5] = new Array("senha","IGUAL", "", "confirme_senha", "", "A confirmação de senha e a senha devem ser iguais");
		ArrayCampos[6] = new Array("senha","TAMANHO", "MAIOR", "7", "", "A senha deve ter mais de 7 caracteres");
	}
	if (tipo_form =="ARQUIVO"){
		ArrayCampos[0] = new Array("arquivo","VAZIO", "", "", "", "Selecione o arquivo");
		ArrayCampos[1] = new Array("descricao","VAZIO", "", "", "", "Informe a descrição deste arquivo");
		ArrayCampos[2] = new Array("arquivo","UPLOAD", "", "", "", "A extensão da imagem enviada deve ser JPG, GIF ou BMP");
		
	}
	return ArrayCampos;
}

function checkform ( form, tipo_form)
{


var continuar = true;
var mensagem = "Ocorreram os seguintes erros:\n"

//Criando o array manualmente para fins de teste
//0 - campo
//1 - tipo de validacao
//2 - tipo de operacao
//3 - valor de referencia 1
//4 - valor de referencia 2
//5 - mensagem de erro

var ArrayCampos = CamposObrigatorios(tipo_form);

for (i=0; i < ArrayCampos.length; i++) {
	var array_temp = ArrayCampos[i];
	var campo = array_temp[0]; //campo a ser validado
	
	switch(array_temp[1]) // tipo de validacao
	{
	case "VAZIO":
		if (form.elements[array_temp[0]].value == "") {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		}
		break;
	case "IGUAL":
		if (form.elements[array_temp[0]].value == form.elements[array_temp[3]].value) {
			//Nao faz nada
		} else {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		}
		break;	
	case "TAMANHO":
		switch(array_temp[2]){
			case "MAIOR":
				if (form.elements[array_temp[0]].value.length > parseInt(array_temp[3])) {
					//Nao faz nada
				} else {	
					continuar = false;
				} 
				break;
			case "MENOR":	
				if (form.elements[array_temp[0]].value.length < parseInt(array_temp[3])) {
					continuar = false;
				} 
				break;
			case "IGUAL":	
				if (form.elements[array_temp[0]].value.length == parseInt(array_temp[3])) {
					//Nao faz nada
				} else {
					continuar = false;
				} 
				break;	
			case "DIFERENTE":	
				if (form.elements[array_temp[0]].value.length != parseInt(array_temp[3])) {
					continuar = false;
				} 
				break;	
			default:
				//Nao faz nada
			}
		
		if (continuar==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		}
		break;
	case "DATA":
		if (form.elements[array_temp[0]].value == "") {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} else {
			if (verifica_data_valida(form.elements[array_temp[0]].value)==false){
				mensagem = mensagem  + array_temp[5] + '\n';
				form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
				continuar = false;
			}
		}
		break;
	case "COMPARA_DATA":	
		if (checarDatas(form.elements[array_temp[0]].value, form.elements[array_temp[3]].value, array_temp[2])==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
		} 
		break;
	case "HORA"	:
		if (validTime(form.elements[array_temp[0]].value)==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
		} 
		break;
	case "COMPARA_HORA":
		if (checarHoras(form.elements[array_temp[0]].value, form.elements[array_temp[3]].value, array_temp[2])==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
		} 
		break;	
	case "TEXTO":
		if (allLetter(form.elements[array_temp[0]].value)==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} 
		break;
	case "NUMERO":
		if (ValidarNumero(form.elements[array_temp[0]].value)==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} 
		break;
	case "COMPARA_NUMERO":
		if (compareNumbers(array_temp[2].value, array_temp[3].value, array_temp[5].value, array_temp[4].value) == false) {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} 
		break;
	case "COMBO":
		if (form.elements[array_temp[0]].options[form.elements[array_temp[0]].selectedIndex].text == array_temp[3]) {
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;	
		}
		break;
	case "CHECKBOX":
		//Para apenas 1
		if (form.elements[array_temp[0]].checked==false) {
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
		}	
		
		//Para mais de 1
		if (valButton(form.elements[array_temp[0]]) == null) {
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
		}
		break;
	case "CPF":
		if (form.elements[array_temp[0]].value == "") {
		mensagem = mensagem  + array_temp[5] + '\n';
		form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
		continuar = false;
		} else {
			if (checaCPF (form.elements[array_temp[0]].value)==false){
			mensagem = mensagem  + array_temp[5] + '\n';
			continuar = false;
			} 		
		}
		break;
	case "CNPJ":
		if (form.elements[array_temp[0]].value.length < 14) {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} else {	
			if (is_cnpj(form.elements[array_temp[0]].value)) {
			  //CNPJ válido
			} else {
				mensagem = mensagem + array_temp[4] + '\n';
				form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
				continuar = false;	  
			}	
		}
		break;
	case "CEP":
		if (IsCEP(form.elements[array_temp[0]].value)) {
			// O CEP é válido;
		} else {
			mensagem = mensagem + array_temp[4] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		}
		break;
	case "EMAIL":
		if (form.elements[array_temp[0]].value == "") {
			mensagem = mensagem + array_temp[4] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} else {
			if (echeck(form.elements[array_temp[0]].value)==false){
				mensagem = mensagem + array_temp[4] + '\n';
				form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
				continuar = false;
			}
		}
		break;
	case "COMPARACAO_IGUAL":
		if (form.elements[array_temp[0]].value == form.elements[array_temp[3]].value) {
			//Nao faz nada
		} else {
			mensagem = mensagem + array_temp[4] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		}
		break;
	case "IDADE":	
		var idade;
		if (form.elements[array_temp[0]].value == "") {
			mensagem = mensagem  + array_temp[5] + '\n';
			form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
			continuar = false;
		} else {
			if (verifica_data_valida(form.elements[array_temp[0]].value)==false){
				mensagem = mensagem  + array_temp[5] + '\n';
				form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
				continuar = false;
			} else {
				idade = calculaIdade(form.elements[array_temp[0]].value);
				if (idade < 0) {
					//O ano da data informada e maior que a data atual
					mensagem = mensagem + array_temp[4] + '\n';
					form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
					continuar = false;
				} else {
					if (idade < parseInt(array_temp[2])){
						mensagem = mensagem + array_temp[4] + '\n';
						form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
						continuar = false;					
					}
				}
			}
		}
		break;
	case "UPLOAD":
		var opcao = 1;
		var filename = form.elements[array_temp[0]].value;
		var filelength = parseInt(filename.length) - 3;
		var fileext = filename.substring(filelength,filelength + 3);
		fileext = fileext.toUpperCase();
		
		if (fileext == ""){		
			//mensagem = mensagem + 'A imagem deve ser selecionada\n';
			//continuar = false;
		} else {
			// Check file extenstion
			if (fileext != "BMP" && fileext != "JPG" && fileext != "GIF"){
				//mensagem = mensagem + 'A extensão da imagem enviada deve ser JPG, GIF ou BMP\n';
				mensagem = mensagem + array_temp[4] + '\n';
				form.elements[array_temp[0]].style.backgroundColor='#FFFF99';
				continuar = false;
			}	
		}
		
		break
	default:
		//Nada a fazer
	}
}
	
		
	if (continuar) {
		if (tipo_form=="LOGIN"){
			document.location = "tela4.htm";
		}
		return true;
	} else {
		alert(mensagem);
		return false;
	}

}

function isNumberKey(evt)
{
 var charCode = (evt.which) ? evt.which : event.keyCode
 if (charCode > 31 && (charCode < 48 || charCode > 57))
	return false;

 return true;
}

function calculaIdade(dataNasc){ 
	var dataAtual = new Date();
	var anoAtual = dataAtual.getFullYear();
	var anoNascParts = dataNasc.split('/');
	var diaNasc =anoNascParts[0];
	var mesNasc =anoNascParts[1];
	var anoNasc =anoNascParts[2];
	var idade = anoAtual - anoNasc;
	var mesAtual = dataAtual.getMonth() + 1; 

//se mês atual for menor que o nascimento, nao fez aniversario ainda; (26/10/2009) 
	if(mesAtual < mesNasc){
		idade--; 
	} else {
		//se estiver no mes do nasc, verificar o dia
		if(mesAtual == mesNasc){ 
			if(dataAtual.getDate() < diaNasc ){ 
				//se a data atual for menor que o dia de nascimento ele ainda nao fez aniversario
				idade--; 
			}
		}
	} 
	return idade; 
}

function verifica_data_valida (campo) { 

	dia = (campo.substring(0,2)); 
	mes = (campo.substring(3,5)); 
	ano = (campo.substring(6,10)); 
	
	
	situacao = true; 
	if ((dia < 01)||(dia < 01 || dia > 30) && (  mes == 04 || mes == 06 || mes == 09 || mes == 11 ) || dia > 31) { 
		situacao =  false; 
	} 
	
	if (mes < 01 || mes > 12 ) { 
		situacao = false; 
	} 
	
	if (mes == 2 && ( dia < 01 || dia > 29 || ( dia > 28 && (parseInt(ano / 4) != ano / 4)))) { 
		situacao = false; 
	} 
	
	if (dia == "") { 
		situacao = false; 
	} 
		
	if (mes == "") { 
		situacao = false; 
	} 
	
	if (ano == "") { 
		situacao = false; 
	} 

	return situacao;
}

function checarDatas(data_1, data_2, fator) {
    var Compara01 = parseInt(data_1.split("/")[2].toString() + data_1.split("/")[1].toString() + data_1.split("/")[0].toString());
    var Compara02 = parseInt(data_2.split("/")[2].toString() + data_2.split("/")[1].toString() + data_2.split("/")[0].toString());
	switch(fator)
	{
	case 'MAIOR':
		if (Compara01 > Compara02) {
			return false;
		} else {
			return true;
		}
		break;
	case 'MENOR':
		if (Compara01 < Compara02) {
			return false;
		} else {
			return true;
		}
		break;
	case 'IGUAL':
		if (Compara01 == Compara02) {
			return false;
		} else {
			return true;
		}
		break;  
	default:
	  //Nao faz nada
	}
}


function validateTime(obj)
{
    var timeValue = obj.value;
    if(timeValue == "" || timeValue.indexOf(":")<0)
    {
        alert("Invalid Time format");
        return false;
    }
    else
    {
        var sHours = timeValue.split(':')[0];
        var sMinutes = timeValue.split(':')[1];

        if(sHours == "" || isNaN(sHours) || parseInt(sHours)>23)
        {
            alert("Invalid Time format");
            return false;
        }
        else if(parseInt(sHours) == 0)
            sHours = "00";
        else if (sHours <10)
            sHours = "0"+sHours;

        if(sMinutes == "" || isNaN(sMinutes) || parseInt(sMinutes)>59)
        {
            alert("Invalid Time format");
            return false;
        }
        else if(parseInt(sMinutes) == 0)
            sMinutes = "00";
        else if (sMinutes <10)
            sMinutes = "0"+sMinutes;    

        obj.value = sHours + ":" + sMinutes;        
    }

    return true;    
}

function validTime(inputStr) {
    if (!inputStr || inputStr.length<1) {return false;}
    var time = inputStr.split(':');
    return time.length === 2 
           && parseInt(time[0],10)>=0 
           && parseInt(time[0],10)<=23 
           && parseInt(time[1],10)>=0 
           && parseInt(time[1],10)<=59;
}

//Comparando duas datas E HORAS
//Date.parse('01/01/2011 10:20:45') > Date.parse('01/01/2011 5:10:10') > true

function checarHoras(hora_1, hora_2, fator) {
	var currentTime = new Date();
	var month = currentTime.getMonth() + 1;
	var day = currentTime.getDate();
	var year = currentTime.getFullYear();
	var Compara01 = new Date(year, month, day, hora_1.split(":")[0], hora_1.split(":")[1], 0, 0).getTime();
    var Compara02 = new Date(year, month, day, hora_2.split(":")[0], hora_2.split(":")[1], 0, 0).getTime();
	switch(fator)
	{
	case 'MAIOR':
		if (Compara01 > Compara02) {
			return false;
			
		} else {
			return true;
		}
		
		break;
	case 'MENOR':
		if (Compara01 < Compara02) {
			return false;
		} else {
			return true;
		}
		break;
	case 'IGUAL':
		if (Compara01 == Compara02) {
			return false;
		} else {
			return true;
		}
		break;  
	default:
	  //Nao faz nada
	}
}
