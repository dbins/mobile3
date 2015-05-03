		//Funcoes especificas do Phonegap
		
		var celular_modelo = "";	
		var celular_plataforma = "";
		var celular_uuid = "";
		var celular_versao = "";
		var isPhoneGapReady = false;
		var isConnected = false;
		var isHighSpeed = false;
		var status_bateria = "";
		var fileWriter;
		
		var canvas;
		var context;
		var ball;
		var prevX = 150;
		var prevY = 150;
		var offSet = 0.05;
		var accelTimer;
		var weatherloaded = false;
		var weathericonurl = "http://openweathermap.org/img/w/";
		
		// Wait for device API libraries to load
		// device APIs are available
		//
		
		document.addEventListener("deviceready", onDeviceReady, false);
		 
		function onDeviceReady() {
			isPhoneGapReady = true;
			// detect for network access
			networkDetection();
			// attach events for online and offline detection
			document.addEventListener("online", onOnline, false);
			document.addEventListener("offline", onOffline, false);
			document.addEventListener("batterystatus", onBatteryStatus, false);
			
			var conteudo = "";
			conteudo = conteudo + 'Modelo: '    + device.model    + '<br />';
			conteudo = conteudo + 'Plataforma: ' + device.platform + '<br />';
			conteudo = conteudo + 'UUID: '     + device.uuid     + '<br />';
			conteudo = conteudo + 'Versão: '  + device.version  + '<br />';
			conteudo = conteudo + 'Bateria: '  + status_bateria  + '<br />';
			
			celular_modelo = device.model;
			celular_plataforma = device.platform;
			celular_uuid = device.uuid;
			celular_versao = device.version;
			
			$("#deviceproperties").append(conteudo);
			window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
			window.requestFileSystem(window.PERMANENT, 5*1024*1024 /*5MB*/, onInitFs, errorHandler);
			
		}
		
		function onInitFs(fs) {
			fs.root.getFile("arquivo_teste.txt", {create: true}, onFileEntryComplete, fail_dados);	
			console.log('Opened file system: ' + fs.name);
		}
		
		function errorHandler(e) {
		  var msg = '';
		  switch (e.code) {
			case FileError.QUOTA_EXCEEDED_ERR:
			  msg = 'QUOTA_EXCEEDED_ERR';
			  break;
			case FileError.NOT_FOUND_ERR:
			  msg = 'NOT_FOUND_ERR';
			  break;
			case FileError.SECURITY_ERR:
			  msg = 'SECURITY_ERR';
			  break;
			case FileError.INVALID_MODIFICATION_ERR:
			  msg = 'INVALID_MODIFICATION_ERR';
			  break;
			case FileError.INVALID_STATE_ERR:
			  msg = 'INVALID_STATE_ERR';
			  break;
			default:
			  msg = 'Unknown Error';
			  break;
		  };
		  console.log('Error: ' + msg);
		}
		
		function networkDetection() {
			if (isPhoneGapReady) {
				// as long as the connection type is not none,
				// the device should have Internet access
				if (navigator.network.connection.type != Connection.NONE) {
					isConnected = true;
				}
				// determine whether this connection is high-speed
				switch (navigator.network.connection.type) {
					case Connection.UNKNOWN:
					case Connection.CELL_2G:
					isHighSpeed = false;
					break;
					default:
					isHighSpeed = true;
					break;
				}
			}
		}
		
		function onOnline() {
			isConnected = true;
		}
		function onOffline() {
			isConnected = false;
		}
		
		function onBatteryStatus(battery_info) {
			status_bateria = battery_info.level + '%';
		}
		
			
		$(document).on('pageinit', '#noticias', function(){  
			if (isConnected) {
				//Nao faz nada
			} else {
				alert('Não existe conexão com a Internet');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageinit', '#posicao', function(){ 
			if (isPhoneGapReady){
				if (isConnected) {
					// load the google api
					var fileref=document.createElement('script');
					fileref.setAttribute("type","text/javascript");
					fileref.setAttribute("src",	"http://maps.googleapis.com/maps/api/js?sensor=true&callback=" + "getGeolocation");
					document.getElementsByTagName("head")[0].appendChild(fileref);
				} else {
					alert('Não existe conexão com a Internet');
					$.mobile.changePage("#pageone");
				}
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageinit', '#contatos', function(){  
			if (isPhoneGapReady){
			var fields = ["id", "displayName", "name"];
			navigator.contacts.find(fields, showContacts);
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageinit', '#view_contato', function(){  
			if (isPhoneGapReady){
				// get the contact by the displayName from the URL
				var fields = ["id", "displayName", "name",	"emails", "phoneNumbers"];
				var options = new ContactFindOptions();
				options.filter = getParameterByName("id");
				navigator.contacts.find(fields, showContact, onError, options);
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageinit', '#bussola', function(){  
			if (isPhoneGapReady){
				var options = { frequency: 500 };
				navigator.compass.watchHeading(rotateNeedle, compassError, options);
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageshow', '#galeria', function(){  
			if (isPhoneGapReady){
				//Nao faz nada
				getFileSystem();
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('pageshow', '#dados', function(){ 
			if (isPhoneGapReady){
				//Nao faz nada
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('click', '#gravar_dados', function() { 
			if (fileWriter != null) {
				fileWriter.onwriteend = function(evt) {
					alert("Dados salvos com sucesso!");
					$.mobile.changePage("#pageone");
				};
				var notes = $('#anotacao_conteudo').val();
				var blob = new Blob([notes], {type: 'text/plain'});
				fileWriter.write(blob);
			} else {
				alert("Houve um erro ao salvar seus dados");
			}
		});    
		
		$(document).on('pageinit', '#foto', function(){ 
			if (isPhoneGapReady){
				//Nao faz nada
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		$(document).on('click', '#enviar_foto', function() { 
			if (isPhoneGapReady){
				if (isConnected) {
					navigator.camera.getPicture(uploadPhoto, function(message)
					   { 
						 alert('Houve um problema ao tentar enviar a foto');
					   },
					   {
						 quality: 10,destinationType:navigator.camera.DestinationType.FILE_URI,sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY }); 
				} else {
					alert('Não existe conexão com a Internet');
					$.mobile.changePage("#pageone");
				}				
		   } else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
		   }
		}); 
		
		$(document).on('pageshow', '#acelerometro', function(){ 
			if (isPhoneGapReady){
				canvas = document.getElementById('canvas');
				context = canvas.getContext('2d');
				ball = document.getElementById('ball');
				ball.onload = function() {
				// once the ball image has loaded, start the watch
				var options = { frequency: 100 };
				accelTimer = navigator.accelerometer.watchAcceleration(moveBall, stopBall, options);
				};
				ball.src = "images/ball.png";
			} else {
				alert('O aplicativo não está pronto!');
				$.mobile.changePage("#pageone");
			}
		});
		
		//Funcoes para enviar a foto
		
		function uploadPhoto(imageURI) 
		{   
			//document.getElementById("myimg").src = imageURI;
			var options = new FileUploadOptions(); 
			options.chunkedMode = false;
			options.fileKey = "recFile"; 
			var imagefilename = imageURI; 
			options.fileName = imagefilename; 
			options.mimeType = "image/jpeg"; 
			var ft = new FileTransfer(); 
			ft.upload(imageURI, "http://www.gotasdecidadania.com.br/novo/programado/upload_foto.php", win_photo, fail_photo, options); 
		} 

		function win_photo(r) 
		{ 
			alert("Qtde de bytes enviados: " + r.bytesSent); 
			$.mobile.changePage("#pageone");
		} 

		function fail_photo(error) 
		{ 
			switch (error.code) 
			{  
			 case FileTransferError.FILE_NOT_FOUND_ERR: 
			  alert("Arquivo não encontrado"); 
			  break; 
			 case FileTransferError.INVALID_URL_ERR: 
			  alert("Erro no endereço da foto"); 
			  break; 
			 case FileTransferError.CONNECTION_ERR: 
			  alert("Erro de Conexão"); 
			  break; 
			} 

			alert("Ocorreu um erro -  codigo: " + error.code); 
		}
		
		//Funcoes de gravacao de dados
		function onFSComplete(fileSystem) {
			fileSystem.root.getFile("arquivo_teste.txt", {create: true}, onFileEntryComplete, fail_dados);
		}
		
		function onFileEntryComplete(fileEntry) {
			fileEntry.file(onFileReadComplete, fail_dados);
			fileEntry.createWriter(onFileWriterComplete, fail_dados);
		}
		
		function onFileWriterComplete(fileWriter2) {
			// store the fileWriter in a
			// global variable so we have it
			// when the user presses save
			fileWriter = fileWriter2;
		}
		
		function onFileReadComplete(file) {
			console.log(file);
			var reader = new FileReader();
			reader.onloadend = function(evt) {
				console.log(this.result);
				console.log('***lendo o arquivo**');
				$('#anotacao_conteudo').val(this.result);
			};
			reader.readAsText(file);
		}
		function fail_dados(error) {
			alert(error.code);
		}
		
		//Funcoes da Bussola
		function rotateNeedle(degree) {
			var conteudo = "";
			conteudo = conteudo + "Graus:" + degree.magneticHeading + "<br>";
			var mh = degree.magneticHeading;
			var Direcao = "";
			if (typeof mh !== "number") {
			Direcao = '';
			} else if (mh >= 337.5 || (mh >= 0 && mh <= 22.5)) {
			Direcao = 'N';
			} else if (mh >= 22.5 && mh <= 67.5) {
			Direcao = 'NE';
			} else if (mh >= 67.5 && mh <= 112.5) {
			Direcao = 'E';
			} else if (mh >= 112.5 && mh <= 157.5) {
			Direcao = 'SE';
			} else if (mh >= 157.5 && mh <= 202.5) {
			Direcao = 'S';
			} else if (mh >= 202.5 && mh <= 247.5) {
			Direcao = 'SW';
			} else if (mh >= 247.5 && mh <= 292.5) {
			Direcao = 'W';
			} else if (mh >= 292.5 && mh <= 337.5) {
			Direcao = 'NW';
			} else {
			Direcao = Direcao;
			}
			
			conteudo = conteudo + "Direção:" + Direcao + "<br>";
			
			$("#devicebussola").html(conteudo);	
		}
		function compassError(error) {
			alert('codigo do erro: ' + error.code + '\n' + 'mensagem: ' + error.message + '\n');
		}
		
		//Funcoes para exibir o mapa
		function getGeolocation() {
			$.mobile.loading('show', {
				theme: "a",
				text: "Aguarde...",
				textonly: true,
				textVisible: true
			});
			// get the user's gps coordinates and display map
			var options = {
			maximumAge: 3000,
			timeout: 5000,
			enableHighAccuracy: true
			};
			navigator.geolocation.getCurrentPosition(loadMap, geoError, options);
		}
		
		function loadMap(position) {
			var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
			var myOptions = {
			zoom: 16,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP
			};
			
			var mapObj = document.getElementById("map_canvas");
			var map = new google.maps.Map(mapObj, myOptions);
			var marker = new google.maps.Marker({
			position: latlng,
			map: map,
			title:"You"
			});
			$.mobile.loading('hide'); 
		}
		
		function geoError(error) {
			alert('codigo: ' + error.code + '\n' + 'mensagem: ' + error.message + '\n');
		}
		
		//Funcoes para exibir o contato
		
		function showContact(contacts) {
			if (contacts.length > 0) {
				var contact = contacts[0];
				$("#contact").append("<h2>" + contact.name.formatted + "</h2>");
				
				if (contact.emails !== null && contact.emails !== undefined){
					if (contact.emails.length > 0) {
						$("#contact").append("<h3>Emails</h3>");
						$("#contact").append("<ul>");
					}
					for (var i = 0; i < contact.emails.length; i++) {
						$("#contact").append("<li>" +
						contact.emails[i].value + "</li>");
					}
					if (contact.emails.length > 0) {
						$("#contact").append("</ul>");
					}
				}
				
				if (contact.phoneNumbers !== null && contact.phoneNumbers !== undefined){
					if (contact.phoneNumbers.length > 0) {
						$("#contact").append("<h3>Telefones</h3>");
						$("#contact").append("<ul>");
					}
					for (var i = 0; i < contact.phoneNumbers.length; i++) {
						$("#contact").append("<li>" + contact.phoneNumbers[i].value + "</li>");
					}
					if (contact.phoneNumbers.length > 0) {
						$("#contact").append("</ul>");
					}
				}
			} else {
				alert("O contato nao foi localizado");
			}
		}
		
		function getParameterByName(name) {
			name = name.replace(/[\[]/, "\\\[").replace
			(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(currentUrl);
			if(results == null)
			return "";
			else
			return decodeURIComponent(results[1].replace (/\+/g, " "));
		}
		
		function showContacts(contacts) {
			var dividers = "";
			var cSort = function(a, b) {
				aName = a.name.formatted;
				bName = b.name.formatted;
				return aName < bName ? -1 : (aName == bName ? 0 : 1);
			};
			contacts = contacts.sort(cSort);
			for (var i = 0; i < contacts.length; i++) {
				console.log(contacts[i]);
				var firstLetter = contacts[i].name.formatted.charAt(0).toUpperCase();
			
				if (dividers.indexOf(firstLetter) < 0) {
					dividers += firstLetter;
					$("#contactList").append("<li data-role=\"list-divider\">" + firstLetter + "</li>");
				}
				$("#contactList").append("<li><a href=\"#view_contato?id=" + contacts[i].id + "\">" + contacts[i].name.formatted + "</a></li>");
			}
			$("#contactList").listview('refresh');
		}
		
		function onError(contactError) {
			alert("Error = " + contactError.code);
			return false;
		}
		
		
		//Funcoes para trabalhar com a galeria de imagens
		//http://www.digitalnoiz.com/mobile-development/photo-gallery-with-phonegap-and-jquery-mobile/
		function getFileSystem(){
			//Opcoes de LocalFileSystem
			//PERSISTENT - Arquivos que nao podem ser removidos sem permissao
			//TEMPORARY - Arquivos que podem nao ser salvos.
			//Usar 1 para PERSISTENT ou 0 para TEMPORARY
			
			window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;
			window.requestFileSystem(window.PERSISTENT, 5*1024*1024, function(fileSystem){ // success get file system
				var sdcard = fileSystem.root;
				sdcard.getDirectory('dcim',{create:false}, function(dcim){
					var gallery = $('#gallery');
					listDir(dcim, gallery);
				}, function(error){
					alert('ERRO:' + error.message);
				})
			}, function(evt){ // error get file system
				console.log(evt.target.error.code);
			});
		}
		
		
		function listDir(directoryEntry, domParent){
			$.mobile.loading('show', {
								theme: "a",
								text: "Aguarde...",
								textonly: true,
								textVisible: true
							});
			
			
			var directoryReader = directoryEntry.createReader();
			directoryReader.readEntries(function(entries){ // success get files and folders
				for(var i=0; i<entries.length; ++i){
					if( i%2 == 0) domParent.append('<div class="ui-block-a"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
					else domParent.append('<div class="ui-block-b"><div class="thumbnail"><img src="'+entries[i].fullPath+'" title="'+entries[i].name+'" /></div></div>');
					//console.log(entries[i].name);
				}
				$.mobile.loading('hide'); 
			}, function(error){ // error get files and folders
				alert(error.code);
			});
		}
		
		function showImage(){
			var imgs = $('#gallery img');
			imgs.live('click', function(){
				var title = $(this).attr('title');
				$('#imagem h1').text(title);
				$('#pic').html($(this).clone());
				 
				$.mobile.changePage("#picture");
			});
		}
		
		//Funcoes para trabalhar com o acelerometro
		function moveBall(acceleration) {
			var x = acceleration.x * 100;
			var y = acceleration.y * 100;
			var newX = x * offSet + (1 - offSet) * prevX;
			var newY = y * offSet + (1 - offSet) * prevY;
			prevX = newX;
			prevY = newY;
			// draw the ball
			drawImage(newX, newY);
		}
		
		function stopBall(error) {
			// clear the watch
			navigator.accelerometer.clearWatch(accelTimer);
			alert("Erro ao detectar movimento");
		}
		
		function drawImage(x, y) {
			context.clearRect(0, 0, 350, 350);
			context.drawImage(ball, 0, 0, 100, 81, x, y, 100, 81);
		}
			
		//Abrir a pagina de noticias
		$(document).ready(function() {
			
			//Noticias
			$.ajax({
				type: "GET",
				url: "https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&q=http://feeds.folha.uol.com.br/esporte/rss091.xml&num=20",
				dataType: "jsonp",
				success: function(data) {
					var conteudo = "";
					$.each(data.responseData.feed.entries, function(key1, val1) {
						//alert(val1.content);
						//val1.title;
						//val1.content;
						//val1.link;
						//publishedDate;
						
						conteudo = conteudo + '<div data-role="collapsible">';
						conteudo = conteudo + '<h3>' + val1.title + '</h3>';
						conteudo = conteudo + '<p>' + val1.content + '</p>';
						conteudo = conteudo + '</div>';
						
					});
					//alert(conteudo);
					$("#content_news").append(conteudo);
					$("#content_news" ).collapsibleset( "refresh" );

				}
			});
			
			//Previsao do Tempo
			$.get("http://api.openweathermap.org/data/2.5/weather?q=sao paulo&units=metric", function(res,code) {
			/*
			Generate a weather string. This could be nicer if it used something like Handlebars
			*/
			var s = "";
			s += "<p>A temperatura atual é "+ Math.round(res.main.temp) + " graus. A temperatura mínima será de " + Math.round(res.main.temp_min) + " graus com a máxima de " +  Math.round(res.main.temp_max) + " graus.</p>";
			
			//weather is optional
			if(res.weather && res.weather.length >= 1) {
				s += "<p><img style='width:100px' src='" + weathericonurl + res.weather[0].icon + ".png'></p>";
			}
			
			$("p.weather").html(s);
			weatherloaded = true;
			
			}, "JSONP");	
		
		});	
