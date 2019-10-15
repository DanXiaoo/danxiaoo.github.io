var TabWorker={};

Array.prototype.find=function(v)
{
	for(var i=0;i<this.length;i++)
	{
		if(this[i]==v) return i;
	}
	return -1;
};
Array.prototype.remove = function(n){
	if(n < 0) return this;
	else return this.slice(0, n).concat(this.slice(n + 1, this.length));
};

//安装函数
var menuAs=[],stop = 0;
function ints(hidTabs){
	var pageNum=cots.length,step=1,pageSeq = [0,1,2,3,4];
	menuAs=$("menu").getElementsByTagName("A");
	//style:MiniLocl=1-2-3-4;
	function loadTabs()
	{
		miniLocl=hidTabs;
		if(miniLocl!=null)
		{
			var a=miniLocl.split("-"),b=pageSeq.sort(),c=[0],p=0,v;

			if(a.length!=menuAs.length-1) return;

			b=b.remove(0);
			//判断设置选项卡的地方选中
			for(var i=0;i<a.length;i++)
			{
				$("chk"+a[i]).checked=true;
			}

			for(var i=0;i<menuAs.length-1;i++)
			{
				v=parseInt(a[i]);
				p=b.find(v);
				if(p==-1) return;
				b=b.remove(p);
				c.push(v);
			}
			pageSeq=c.concat(b);
		}
	};

	function preload()
	{
		for(var i=0;i<cots.length;++i)
		{
			cots[i].push($("preload"+i).innerHTML);
		}
	};
	
	//设置图标更改
	$("menuwarp").onmouseover=function()
	{
		$("setup").className="setupover";
	};
	$("menuwarp").onmouseout=function()
	{
		$("setup").className="setupout";
	};
	//显示设置Div
	$("setup").onclick=function()
	{
		$("TabSetup").style.left=$("menuwarp").clientWidth-106;
		$("TabSetup").style.top=$("setup").offsetTop+29;
		if($("TabSetup").style.display=="none")
		{
			$("TabSetup").style.display="block";
		}
		else
		{
			$("TabSetup").style.display="none";
		}
	};
	var CanHide=true;//用于判断鼠标是否在Div上，如果在则不隐藏
	$("TabSetup").onmouseover=function(){
		$("setup").focus();
		CanHide=false;
	};
	$("TabSetup").onmouseout=function(){
		CanHide=true;
	};	
	$("setup").onblur=function()
	{
		if(CanHide)
		{
			$("TabSetup").style.display="none";
		}
	};

	function initTab()
	{
		if(stop==menuAs.length-1){
			//获得选项卡
			if(miniLocl!=null){
				//doit(0,0);
				n=0;
				menuAs[0].className = "s";
			}else{
				n=menuAs.length-1;
				menuAs[menuAs.length-1].className = "s";
				//doit(menuAs.length-1,0);
			}
		}else{
			//doit(0,0);
			n=0;
			menuAs[0].className = "s";
		}

		for(var i=0;i<menuAs.length;++i)
		{
			var pos=pageSeq[i];

			menuAs[i].innerHTML="<span style='cursor:hand'>"+cots[pos][0]+"</span>";
			menuAs[i].name=pos;
			menuAs[i].href=cots[pos][2];
			//menuAs[i].target = "_blank";
			menuAs[i].id=pos;
			menuAs[i].onfocus=function(){this.blur()};
			menuAs[i].onmouseover = function(){
				doit(this.name,1);
				clearAuto();
				/*if(this.name==0){
					$("tishi").style.display = "none";
					return false;
				}
				else{
					$("tishi").style.display = "block";
					$("tishi").style.left = this.offsetLeft+42 +"px";
				}*/
			};
			menuAs[i].onmouseout = function(){

				/*$("tishi").style.display = "none";

				return false;*/
			};
		}
	};

	function changePos(t,o)
	{
		var p1=pageSeq.find(t.name),p2=pageSeq.find(o.name);
		pageSeq[p1]=o.name;
		pageSeq[p2]=t.name;
	};

	var DD={
		dragFlag:false,
		cons:[],
		
		addCons:function(obj)
		{
			this.cons.push(obj);
		},
		
		enableDrag:function(obj)
		{
			var self=this,oldCursor=obj.style.cursor; 
			var yTop=getObjPos($("menu")).y;
			   
			obj.onmousedown = function(e)
			{
				//obj.style.cursor="move";
				if(!document.all) e.preventDefault();
				var oPos = getObjPos(obj);
				var cPos = getCurPos(e);
				var lastObj=obj;
				var orgPos=getCurPos2(e);
				
				self.dragFlag = true;
				$("shadow").innerHTML = obj.outerHTML;
				$("shadow").children[0].name = obj.name;

				document.onmouseup = function (e){ 
					obj.style.cursor=oldCursor;

					document.onmousemove = null;
					document.onmouseup = null;
					//放置位置检查开始
					var nPos = getCurPos(e); 
					
					if(obj.name != 0)//判断第一个是否可以拖动(当obj.name!=0时则第一个不能拖)
					{ 
						if(lastObj.innerHTML=="")
						{
							set(lastObj,$("shadow").children[0]);
							SetTab(1);
						}
					}
					var o = $("shadow");
					o.style.display="none";
					o.innerHTML="";//清空shadow内的A标签
					//放置位置检查结束
					if(self.dragFlag && obj && obj==lastObj)
					{
							var nPos = getCurPos2(e);
							var tPos = getObjPos(obj);
							var tg_w = obj.offsetWidth;
							var tg_h = obj.offsetHeight;  
							  
							if ((nPos.x > tPos.x) && (nPos.y >= tPos.y) && (nPos.x < tPos.x + tg_w) && (nPos.y <= tPos.y + tg_h))
							{ 
								//obj.click();
								//doit(obj.name);
							}
					}
					self.dragFlag = false; 
				}; 
				  
				document.onmousemove = function(e)
				{
					if (obj && self.dragFlag)
					{
						if(obj.name!=0) //判断第一个是否可以拖动(当obj.name!=0时则第一个不能拖)
						{
							var Pos = getCurPos(e),p1=getObjPos($("menu")),p2=Pos.x - cPos.x + oPos.x;  
							if(Pos.x<orgPos.x+5 && Pos.x > orgPos.x-5) return ;
							var o = $("shadow"); 
							o.style.display = 'block';
							o.style.position = 'absolute';
					  
							if(p2<p1.x) p2=p1.x;
							if(p2>p1.x+$("menu").offsetWidth-$("shadow").offsetWidth) p2=p1.x+$("menu").offsetWidth-$("shadow").offsetWidth;
							o.style.left = p2 + 'px';
							//o.style.left = Pos.x - cPos.x + oPos.x + 'px';
							//o.style.top = Pos.y - cPos.y + oPos.y + 'px';
							o.style.top=yTop;
						}
						else
						{
							obj.style.cursor="not-allowed"; 
							return;
						}

						for(var i=0;i<self.cons.length;++i)
						{
							var tg = self.cons[i];
							var nPos = getCurPos(e); 
							var tPos = getObjPos(tg);
							var tg_w = tg.offsetWidth;
							var tg_h = tg.offsetHeight;

							if ((nPos.x > tPos.x) && (nPos.y >= tPos.y) && (nPos.x < tPos.x + tg_w) && (nPos.y <= tPos.y + tg_h))
							{
								//判断第一个是否可以拖动(当obj.name!=0时则第一个不能拖)
								if(tg.name==0)
								{
									obj.style.cursor="not-allowed"; 
									break;
								}
								if(lastObj != tg)
								{
									changePos($("shadow").children[0],tg);  
									set(lastObj,tg);  
									lastObj=tg;
								}
								tg.className="mb";
								tg.innerHTML="";
								tg.id="";
								break;
							}
							else
							{
								//判断第一个是否可以拖动(当obj.name!=0时则第一个不能拖)
								obj.style.cursor=(obj.name==0?"not-allowed":"move");
							}
						}
					}
					return false;
				};
			};
			
			function set(o1,o2)
			{
				o1.innerHTML=o2.innerHTML;
				o1.className=o2.className;
				o1.name=o2.name;
				o1.id=o2.id;
				o1.href=o2.href;
			};
			
			function getObjPos(obj)
			{
				var x = y = 0;
				if (obj.getBoundingClientRect)
				{
					var box = obj.getBoundingClientRect();
					var D = document.documentElement;
					x = box.left + Math.max(D.scrollLeft, document.body.scrollLeft) - D.clientLeft;
					y = box.top + Math.max(D.scrollTop, document.body.scrollTop) - D.clientTop; 
				}
				else   
				{
					for(; obj != document.body; x += obj.offsetLeft, y += obj.offsetTop, obj = obj.offsetParent ){};
				}
				return {'x':x, 'y':y};
			};   
			   
			function getCurPos(e)
			{
				e = e || window.event;
				var D = document.documentElement;
				if (e.pageX) return {x: e.pageX, y: e.pageY};
				return {
					x: e.clientX + D.scrollLeft - D.clientLeft,
					//y: e.clientY + D.scrollTop - D.clientTop
					y: yTop
				};
			};
			
			function getCurPos2(e)
			{
				e = e || window.event;
				var D = document.documentElement;
				if (e.pageX) return {x: e.pageX, y: e.pageY};
				return {
					x: e.clientX + D.scrollLeft - D.clientLeft,
					y: e.clientY + D.scrollTop - D.clientTop
				};
			};
		}
		
	};

	preload();
	loadTabs();
	initTab();
	//启用拖动
	for(var i=0;i<menuAs.length;++i)
	{
		DD.enableDrag(menuAs[i]);
		DD.addCons(menuAs[i]);
	}
	setAuto();
	
	//控制数据显示
	clearTimeout(tabtime);
	setTimeout(GetAllInfo,2);
	setTimeout("doit(0)",1500);
}

//页卡点击函数 
function doit(v){
	for(var i=0;i<menuAs.length;i++){
		if(v==$("menu").getElementsByTagName("A")[i].name){
			window.setTimeout(function(){$('coenter').innerHTML = cots[v][3];},2);
			$("menu").getElementsByTagName("a")[i].className="s";
			$("menu").getElementsByTagName("a")[i].style.fontWeight="bold";
		}
		else{
			$("menu").getElementsByTagName("a")[i].className="nos";
			$("menu").getElementsByTagName("a")[i].style.fontWeight="";
		}
	}
	cn=v;
	//获得选项卡
	if(n==stop&&mark>=1){
		clearAuto();
	}
}
//重新加载菜单
function ReLoadTab(num,name){
	if($("chk"+num).checked)
	{
		$("menu").innerHTML+="<A class='nos' name='"+num+"' id='"+num+"'><SPAN style='CURSOR: hand'>"+name+"</SPAN></A>";
		//得到现在选项卡的顺序
		var c=[];
		for(var i=0;i<menuAs.length;++i)
		{
			if(menuAs[i].id != 0) c.push(menuAs[i].id);
			if(c.length>=menuAs.length-1) break;
		}
		ints(c.join("-"));
	}
	else
	{
		for(var i=0;i<menuAs.length;++i)
		{
			if(menuAs[i].id==num)
			{
				$("menu").removeChild(menuAs[i]);
				i--;//适应当前减少一个对象后的length
			}
		}
		doit(0,0);
	}
	SetTab(0);
	clearAuto();
}
//自动播放
var n=0;
var mark = null;
function clearAuto(){clearInterval(autoStart)}
function setAuto(){autoStart=setInterval("auto(n)", 3000);}
function auto(){
	n++;
	if(n>menuAs.length-1){n=0;mark+=1;}
	doit($("menu").getElementsByTagName("A")[n].name,menuAs.length-1);
}

//Ajax操作
var xmlHttp=null;
function GetXmlHttpObject()
{
	try
	{
		xmlHttp=new XMLHttpRequest();
	}
	catch(e)
	{
		try
		{
			xmlHttp=new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch (e)
		{
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}
	}
	return xmlHttp;
}
xmlHttp=GetXmlHttpObject();

//发送Ajax请求
function sendRequest(url,type)
{
	xmlHttp.open("GET",url+"&rnd="+Math.random(),true);
	xmlHttp.onreadystatechange=function()
	{
		if(xmlHttp.readyState==4&&xmlHttp.status==200)
		{
			var str=xmlHttp.responseText;
			getRequest(str,type);
		}
	};
	xmlHttp.send(null);
}
//onreadystatechange执行结果
var cn=0;//当前停留的Tab
function getRequest(req,type)
{
	if(type=="setTab"||type=="setDiv")
	{
		if(req=="0"){ alert("服务器故障！"); }
	}
	else if(type=="getTab")
	{
		miniLocl= req;
	}
	else if(type=="getDiv")
	{
		divList=req;
	}
	else if(type="getInfo")	//0汇总,1消息,2公文,3会议,4请假,5日程
	{
		var a=miniLocl.split("-");
		var index=(miniLocl==""?0:a.length);
		for(var i=0;i<a.length;i++)
		{
			if(i==0)
			{
				$("presp0").innerHTML=req.split("@XR#")[0].split(",")[0];$("presp1").innerHTML=req.split("@XR#")[0].split(",")[1];
				$("presp2").innerHTML=req.split("@XR#")[0].split(",")[2];$("presp3").innerHTML=req.split("@XR#")[0].split(",")[3];
				$("presp4").innerHTML=req.split("@XR#")[0].split(",")[4];				
				cots[0][3]=$("preload0").innerHTML;
				//公告
				$("notifyContent").innerHTML=req.split("@XR#")[index+1];
				//通知
				$("wordContent").innerHTML=req.split("@XR#")[index+2];
			}
			var index=a[i];
			if($("preload"+index)!=null)
			{
				$("preload"+index).innerHTML=req.split("@XR#")[i+1];
				cots[index][3]=$("preload"+index).innerHTML;
			}
		}
		$('coenter').innerHTML = cots[cn][3];
	}
	//xmlHttp.abort();
	//xmlHttp=null;
}

//得到当前用户的选项卡顺序
var miniLocl="";
function GetTab()
{
	sendRequest("AjaxFun/TabWorker.aspx?type=get&username="+uname,"getTab");
}

//更改选项卡时保存至数据库(保存选项卡顺序)
function SetTab(lessnum)
{
	//得到现在选项卡的顺序
	var c=[];
	for(var i=lessnum;i<menuAs.length;++i)
	{
		if(menuAs[i].name != 0 && c.find(menuAs[i].name)==-1) c.push(menuAs[i].name);
		if(c.length>=menuAs.length-1) break;
	}
	sendRequest("AjaxFun/TabWorker.aspx?type=set&username="+uname+"&rank="+c.join("-"),"setTab");
}

//得到所有需要更新的数据(选项卡里的和公告、通知)
var tabtime;
function GetAllInfo()
{
	sendRequest("AjaxFun/TabWorker.aspx?type=getInfo&username="+uname+"&tab="+miniLocl+"-notify-leaveword","getInfo");
	tabtime=setTimeout("GetAllInfo()",10000);
}

/*---------------------------------------右边div所用的JS--------------------------------------*/
function closeDiv(obj)
{
	//$("con_right").removeChild($(obj));	
	var tehstr=document.all("getdesk").value			
	tehstr=tehstr.replace(obj,"");
	tehstr=tehstr.replace("--","-");
	if(tehstr.substring(0,1)=="-")
	tehstr=tehstr.substring(1,tehstr.length)
	if(tehstr.substring(tehstr.length-1,tehstr.length)=="-")
	tehstr=tehstr.substring(0,tehstr.length-1)
	document.all("getdesk").value=tehstr
	$(obj).style.display="none";
	SaveDList(obj);	//保存当前顺序
}
var dragobj={};
function on_ini(hidDivs){
    String.prototype.inc=function(s){
		return this.indexOf(s)>-1?true:false;
	};
    var agent=navigator.userAgent;
    window.isOpr=agent.inc("Opera");
    window.isIE=agent.inc("IE")&&!isOpr;
    window.isMoz=agent.inc("Mozilla")&&!isOpr&&!isIE;
    if(isMoz){
		//firefox实现ie的方法和属性
        Event.prototype.__defineGetter__("x",function(){return this.clientX+2});
        Event.prototype.__defineGetter__("y",function(){return this.clientY+2});
        Event.prototype.__defineGetter__("srcElement",function(){
			var node=this.target;
			while(node.nodeType!=1){
				node=node.parentNode
			}
			return node;
		});
    }
    rankDiv(hidDivs);//排序
    basic_ini();	//给拖动事件
}
function basic_ini(){
    window.oDel=function(obj){
		if(obj!=null){
			obj.parentNode.removeChild(obj);
		}
	};
	var o=$("con_right").getElementsByTagName("h1");
	for(var i=0;i<o.length;i++)
	{
		if(o[i].parentNode.dragArea)	//判断该DIV是否可以拖动
		{
			o[i].onmousedown=addevent;
		}
	}
}
function rankDiv(hidDivs)
{
	var divAry=hidDivs.split("-");
	if(hidDivs!="")
	{
		for(var i=0;i<divAry.length;i++)
		{
			var tempDiv=$(divAry[i]).outerHTML;
			$("con_right").removeChild($(divAry[i]));
			$("con_right").innerHTML+=tempDiv;
		}
	}
	var o=$("con_right").getElementsByTagName("h1");
	for(var i=0;i<o.length;i++)
	{
		if(divAry.find(o[i].parentNode.id)==-1)
		{
			o[i].parentNode.style.display="none";
		}
	}
}

function addevent(e){
	if(dragobj.o!=null)
		return false;
	e=e||event;
	var ee=e.srcElement;
	if(ee.tagName=="A" || ee.tagName=="SPAN")
		return;
	dragobj.h=document.body.scrollHeight;
	dragobj.o=this.parentNode;
	dragobj.xy=getxy(dragobj.o);
	dragobj.xx=new Array((e.x-dragobj.xy[1]),(e.y-dragobj.xy[0]));
	//dragobj.o.style.width=dragobj.xy[2]+"px";
	dragobj.o.style.height=dragobj.xy[3]+"px";
	dragobj.o.style.left=(e.x-dragobj.xx[0])+"px";
	dragobj.o.style.top=(e.y-dragobj.xx[1])+"px";
	dragobj.o.style.position="absolute";
	dragobj.o.style.filter="alpha(opacity=50);";
	var om=document.createElement("div");
	dragobj.otemp=om;
	//om.style.width=dragobj.xy[2]+"px";
	om.style.height=dragobj.xy[3]+"px";
	om.style.margin="0px 0px 8px 0px";
	om.style.border="1px dashed #FF0000";
	dragobj.o.parentNode.insertBefore(om,dragobj.o);
	
	//拖动document.onmouseup使用局部并实时释放，防止冲突
	document.onmouseup=function(){
		clearTimeout(timeout);
		num=0;
		up=false;
		document.onmousemove=null;
		document.onmouseup=null;
		document.onmousewheel=null;//启用滑轮
		document.onselectstart=null;
		if(dragobj.o!=null){
			dragobj.o.style.cursor="default";
			//dragobj.o.style.width=dragobj.xy[2];
			dragobj.o.style.height=dragobj.xy[3];
			dragobj.o.style.filter="alpha(opacity=100)";
			dragobj.otemp.parentNode.insertBefore(dragobj.o,dragobj.otemp);
			dragobj.o.style.position="";
			oDel(dragobj.otemp);
			dragobj={};
			SaveDList("");	//保存当前顺序
		}
	};
	document.onmousemove=function(e){
		clearTimeout(timeout);
		//在拖动DIV时禁用滑轮
		document.onmousewheel=function(){return false};
		document.onselectstart=function(){return false;};
		e=e||event;
		if(dragobj.o!=null){
			if(tempT>event.clientY)
				up=true;
			else
				up=false;
			dragobj.o.style.cursor="move";
			//dragobj.o.style.left=(e.x-dragobj.xx[0])+"px";	//禁止Div横向拖动
			//dragobj.o.style.top=(e.y-dragobj.xx[1])+"px";
			if(event.clientY<25 && up)
			{
				scroll(1);
			}
			if(document.body.clientHeight-event.clientY<25)
			{
				scroll(2);
			}
			else
			{
				dragobj.o.style.top=(e.y+num-dragobj.xx[1])+"px";
			}
			tempT=event.clientY;
			createtmpl(e);
		}
	};
	return false;
}

var timeout,tempT,up=false,num=0;
function scroll(val)
{
	if(val==2)
	{
		//判断是否拖到最底部，到达最底部后不再拖动
		if(document.body.scrollHeight<dragobj.h+dragobj.o.clientHeight-45)
		{
			num+=6;
			document.body.scrollTop+=6;
			dragobj.o.style.top=dragobj.o.offsetTop+6;
		}
	}
	else
	{
		if(dragobj.o.offsetTop>0)
		{
			num-=6;
			document.body.scrollTop-=6;
			dragobj.o.style.top=dragobj.o.offsetTop-6;
		}
	}
	timeout=setTimeout("scroll("+val+")",10);
}
function getxy(e){
    var a=new Array();
    var t=e.offsetTop;
    var l=e.offsetLeft;
    var w=e.offsetWidth;
    var h=e.offsetHeight;
    while(e=e.offsetParent){
        t+=e.offsetTop;
        l+=e.offsetLeft;
    }
    a[0]=t;a[1]=l;a[2]=w;a[3]=h;
	return a;
}
function inner(o,e){
    var a=getxy(o);
    if(e.clientY+document.body.scrollTop-document.body.clientTop>a[0] && e.clientY+document.body.scrollTop-document.body.clientTop<(a[0]+a[3]) && o.dragArea){	//o.dragArea当div为可拖动时才能替换
		//判断拖动到哪个位置时交换DIV
        if(e.clientY+document.body.scrollTop-document.body.clientTop<(a[0]+a[3]/4))
        {
            return 1;
        }
        else
        {
            return 2;
        }
    }
	else
        return 0;
}
function createtmpl(e)
{
	var eles=$("con_right").getElementsByTagName("div");
    for(var i=0;i<eles.length;i++)
    {
        if(!eles[i])
        {
            continue;
        }
        if(eles[i]==dragobj.o)
            continue;
        var b=inner(eles[i],e);
        if(b==0)
            continue;
        //dragobj.otemp.style.width=eles[i].offsetWidth;
        if(b==1)
        {
            eles[i].parentNode.insertBefore(dragobj.otemp,eles[i]);
        }
		else
		{
            if(eles[i].nextSibling==null){
                eles[i].parentNode.appendChild(dragobj.otemp);
            }
			else{
                eles[i].parentNode.insertBefore(dragobj.otemp,eles[i].nextSibling);
            }
        }
        return;
    }
}

//保存当前右边Div的顺序
function SaveDList(obj)
{
	var oList="";
	var oDiv=$("con_right").getElementsByTagName("h1");	//得到当前Div的顺序
	for(var i=0;i<oDiv.length;i++)
	{
		if(oDiv[i].parentNode.style.display!="none")
		{
			oList+=(oList==""?"":"-")+oDiv[i].parentNode.id;
		}
	}
	if(oList=="")
	{
		$("con_right").style.display="none";
	}
	sendRequest("AjaxFun/TabWorker.aspx?type=setDiv&username="+uname+"&deldiv="+obj+"&rank="+oList,"setDiv");
}

//获得当前右边Div的顺序
var divList="";
function GetDList()
{
	sendRequest("AjaxFun/TabWorker.aspx?type=getDiv&username="+uname,"getDiv");
}

