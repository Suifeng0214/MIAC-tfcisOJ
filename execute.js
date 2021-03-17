var run = 1;
setInterval(function(){
	var url = 'https://toj.tfcis.org/oj/be/acct/2920'; //TOJ ID

	fetch(url, {method:'GET'})
	.then(res => {
		return res.text();   // 使用 text() 可以得到純文字 String
	})
	.then(result => {
		var temp = document.createElement('html'); //建一個html element
		temp.innerHTML = result; //改成目標頁面的html
		//console.log(result);
		//thead 增加一列
		var theadd = document.getElementsByTagName("thead")[1].children[0];

		if (theadd.childElementCount == 8) run = 0; 
		else run = 1;
		 //console.log(theadd.childElementCount);
		if (run){
			th = document.createElement('th');
			th.innerHTML = "  解題狀態小幫手";
			theadd.insertBefore(th, theadd.children[2])
			
			//建AC過的set 以便查詢
			let AC_set = new Set(); 
			var AC_amounts = temp.getElementsByClassName("_state-1").length;
			for (i = 0; i < AC_amounts; i++){		
				var s = temp.getElementsByClassName("_state-1")[i].innerText;
				AC_set.add(s);
				//console.log(s);
			}
			//console.log(AC_set.size); //檢查set有沒有成功被塞東西
			
			var submit_rows = document.getElementsByTagName("table")[1].children[1].rows.length;
			for (i = 0; i < submit_rows; i++){
				var pro_id = document.getElementsByTagName("table")[1].children[1].children[i].children[1].innerText;
				var td = document.getElementsByTagName("table")[1].children[1].children[i];
				var tmp = td.insertCell(2);
				if (AC_set.has(pro_id)){ //如果查表後有AC
					tmp.innerText = "Accepted";
					tmp.className = "state-1";
					//console.log(pro_id);
				}else{
					tmp.innerText = "No";
				}
				
				//console.log(pro_id);
			}
		}
	});
},1000);

