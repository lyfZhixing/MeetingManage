/**
 * 查询员工翻页
 */
function paging(pageindex,pagemax){
	var empname = $("#employeename").val();
	var username = $("#accountname").val();
	var status = $("#status:checked").val();
	$.ajax({
		   type: "POST",
		   url: "SearchemployeesServlet",
		   data: {"empname":empname,"username":username,"status":status,"pageindex":pageindex,"pagemax":pagemax},
		   dataType:"json",
		   success: function(page){
			   var inhtml_1 = "";
			   if(page.pagemax == 1){
				   inhtml_1 = " <h3 style='text-align:center;color:black'>查询结果</h3><div class='pager-header'><div class='header-info'>共<span class='info-number' id='recordmax'>"+page.recordmax+"</span>条结果，分成<span class='info-number' id='pagemax'>"+page.pagemax+"</span>页显示， 当前第<span class='info-number' id='pageindex'>"+page.pageindex+"</span>页</div><div class='header-nav'><input type='button' class='clickbutton' disabled='true' id='homepage' value='首页'/><input type='button' class='clickbutton' disabled='true' id='prepage' value='上页'/><input type='button' class='clickbutton' disabled='true' id='nextpage' value='下页'/><input type='button' class='clickbutton' disabled='true' id='lastpage' value='末页'/>跳到第<input type='text' id='pagenum' class='nav-number'/>页<input type='button' id='gopage' class='clickbutton' value='跳转'/> </div></div>";
			   }else if(page.pageindex == 1 ){
				   inhtml_1 = " <h3 style='text-align:center;color:black'>查询结果</h3><div class='pager-header'><div class='header-info'>共<span class='info-number' id='recordmax'>"+page.recordmax+"</span>条结果，分成<span class='info-number' id='pagemax'>"+page.pagemax+"</span>页显示， 当前第<span class='info-number' id='pageindex'>"+page.pageindex+"</span>页</div><div class='header-nav'><input type='button' class='clickbutton' disabled='true' id='homepage' value='首页'/><input type='button' class='clickbutton' disabled='true' id='prepage' value='上页'/><input type='button' class='clickbutton' id='nextpage' value='下页'/><input type='button' class='clickbutton' id='lastpage' value='末页'/>跳到第<input type='text' id='pagenum' class='nav-number'/>页<input type='button' id='gopage' class='clickbutton' value='跳转'/> </div></div>";
			   }else if(page.pageindex == page.pagemax){
				   inhtml_1 = " <h3 style='text-align:center;color:black'>查询结果</h3><div class='pager-header'><div class='header-info'>共<span class='info-number' id='recordmax'>"+page.recordmax+"</span>条结果，分成<span class='info-number' id='pagemax'>"+page.pagemax+"</span>页显示， 当前第<span class='info-number' id='pageindex'>"+page.pageindex+"</span>页</div><div class='header-nav'><input type='button' class='clickbutton' id='homepage' value='首页'/><input type='button' class='clickbutton' id='prepage' value='上页'/><input type='button' class='clickbutton' disabled='true' id='nextpage' value='下页'/><input type='button' class='clickbutton' disabled='true' id='lastpage' value='末页'/>跳到第<input type='text' id='pagenum' class='nav-number'/>页<input type='button' id='gopage' class='clickbutton' value='跳转'/> </div></div>";
			   }else{
				   inhtml_1 = " <h3 style='text-align:center;color:black'>查询结果</h3><div class='pager-header'><div class='header-info'>共<span class='info-number' id='recordmax'>"+page.recordmax+"</span>条结果，分成<span class='info-number' id='pagemax'>"+page.pagemax+"</span>页显示， 当前第<span class='info-number' id='pageindex'>"+page.pageindex+"</span>页</div><div class='header-nav'><input type='button' class='clickbutton' id='homepage' value='首页'/><input type='button' class='clickbutton' id='prepage' value='上页'/><input type='button' class='clickbutton' id='nextpage' value='下页'/><input type='button' class='clickbutton' id='lastpage' value='末页'/>跳到第<input type='text' id='pagenum' class='nav-number'/>页<input type='button' id='gopage' class='clickbutton' value='跳转'/> </div></div>";

			   }
			   
			  
			  
			  $("#searchresult").html(inhtml_1);
			  var inhtml_2 = "<tr class='listheader'><th>姓名</th><th>账号名</th><th>联系电话</th><th>电子邮件</th><th>操作</th></tr>";
			  $.each(page.list,function(index,item){
				  if(status == "0"){
					  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='passaccount'>通过审批</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
				  }else if(status == "1"){
					  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='closeaccount'>关闭用户</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
				  }else if(status == "2"){
					  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='openaccount'>打开用户</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
				  }
				  
			  });
			  $(".listtable").html(inhtml_2);
		   }
		});
}
//首次查询
$(function(){
	$("#query").live("click",function(){
		paging();
	});
});
//下一页
$(function(){
	$("#nextpage").live("click",function(){
		var pageindex = parseInt($("#pageindex").text())+1;
		var pagemax = parseInt($("#pagemax").text());
		paging(pageindex,pagemax);
	});
});
//上一页
$(function(){
	$("#prepage").live("click",function(){
		var pageindex = parseInt($("#pageindex").text())-1;
		var pagemax = parseInt($("#pagemax").text());
		paging(pageindex,pagemax);
	});
});
//首页
$(function(){
	$("#homepage").live("click",function(){
		var pagemax = parseInt($("#pagemax").text());
		paging(1,pagemax);
	});
});
//末页
$(function(){
	$("#lastpage").live("click",function(){
		var pagemax = parseInt($("#pagemax").text());
		paging(pagemax,pagemax);
	});
});
//跳页
$(function(){
	$("#gopage").live("click",function(){
		var pageindex = $("#pagenum").val();
		var pagemax = parseInt($("#pagemax").text());
		paging(pageindex,pagemax);
	});
});

//更改用户状态
function updateStatus(newstatus){
	var empname = $("#employeename").val();
	var username = $("#accountname").val();
	var status = $("#status:checked").val();
	var empid = $("#empid").val();
	var pageindex = parseInt($("#pageindex").text());
	var pagemax = parseInt($("#pagemax").text());
	$.ajax({
		   type: "POST",
		   url: "CloseAccountServlet",
		   data: {"newstatus":newstatus,"empid":empid,"empname":empname,"username":username,"status":status,"pageindex":pageindex,"pagemax":pagemax},
		   dataType:"json",
		   success: function(page){
			   var inhtml_1 = " <h3 style='text-align:center;color:black'>查询结果</h3><div class='pager-header'><div class='header-info'>共<span class='info-number' id='recordmax'>"+page.recordmax+"</span>条结果，分成<span class='info-number' id='pagemax'>"+page.pagemax+"</span>页显示， 当前第<span class='info-number' id='pageindex'>"+page.pageindex+"</span>页</div><div class='header-nav'><input type='button' class='clickbutton' id='homepage' value='首页'/><input type='button' class='clickbutton' id='prepage' value='上页'/><input type='button' class='clickbutton' id='nextpage' value='下页'/><input type='button' class='clickbutton' id='lastpage' value='末页'/>跳到第<input type='text' id='pagenum' class='nav-number'/>页<input type='button' id='gopage' class='clickbutton' value='跳转'/> </div></div>";
				  $("#searchresult").html(inhtml_1);
				  var inhtml_2 = "<tr class='listheader'><th>姓名</th><th>账号名</th><th>联系电话</th><th>电子邮件</th><th>操作</th></tr>";
				  $.each(page.list,function(index,item){
					  if(status == "0"){
						  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='passaccount'>通过审批</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
					  }else if(status == "1"){
						  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='closeaccount'>关闭用户</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
					  }else if(status == "2"){
						  inhtml_2 += "<tr><td>"+item.employeename+"</td><td>"+item.username+"</td><td>"+item.phone+"</td><td>"+item.email+"</td><td> <a class='clickbutton' id='openaccount'>打开用户</a><input type='hidden' id='empid' value='"+item.employeeid+"'/></td></tr>";
					  }
					  
				  });
				  $(".listtable").html(inhtml_2);
		   },
		   error:function(jqXHR, textStatus, errorThrown){
			   alert(jqXHR.responseText);
		   }
		});
}
//关闭用户
$(function(){
	$("#closeaccount").live("click",function(){
		updateStatus("2")
	});
});
//打开用户
$(function(){
	$("#openaccount").live("click",function(){
		updateStatus("1")
	});
});

//通过审批
$(function(){
	$("#passaccount").live("click",function(){
		updateStatus("1")
	});
});



