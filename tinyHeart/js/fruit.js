var fruitObj = function()
{
	this.alive = [];
	this.x = [];
	this.y = [];
	this.l = [];
	this.spd = [];
	this.aneNo = [];
	this.fruitType = [];
	this.orange = new Image();
	this.blue = new Image();
}
fruitObj.prototype.num = 30;
fruitObj.prototype.init = function()
{
	for (var i = 0; i < this.num; i++) 
	{
		this.alive[i] = false;
		this.x[i] = 0;
		this.y[i] = 0;
		this.aneNo[i] = 0;
		this.spd[i] = Math.random()*0.009 + 0.005;
		this.fruitType[i] = "";
	}
	this.orange.src = "./src/fruit.png";
	this.blue.src = "./src/blue.png";
}
fruitObj.prototype.draw = function()
{

	for (var i = 0; i < this.num; i++)
	{
		if(this.alive[i])
		{
			if(this.fruitType[i] == "blue")
				var pic = this.blue;
			else
				var pic = this.orange;
			if (this.l[i] <= 15) 
			{
				var No = this.aneNo[i];
				this.l[i] += this.spd[i] * deltaTime;
				this.x[i] = ane.headx[No];
				this.y[i] = ane.heady[No];
				ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
			}
			else
		   	{
		   		this.y[i] -= this.spd[i] * 7 * deltaTime;
		   		ctx2.drawImage(pic, this.x[i] - this.l[i] * 0.5, this.y[i] - this.l[i] * 0.5, this.l[i], this.l[i]);
		   	}
			
			
			if(this.y[i] < 10) //为什么小于10？
				this.alive[i] = false;
		}

	}
}
fruitObj.prototype.born = function(i)
{
	this.aneNo[i] = Math.floor(Math.random() * ane.num);
	this.l[i] = 0;
	this.alive[i] = true;

	var ran = Math.random();
	if(ran < 0.2)
		this.fruitType[i] = "blue";
	else
		this.fruitType[i] = "orange";
}
fruitObj.prototype.dead = function(i)
{
	this.alive[i] = false;
}
function fruitMonitor()
{
	var num = 0;
	for(var i = 0; i < fruit.num; i++)
	{
		if(fruit.alive[i]) num++;
	}
	if(num < 15)
	{
		//send fruit
		sendFruit();
		return;
	}
}
function sendFruit()
{
	for(var i = 0; i < fruit.num; i++)
	{
		if(!fruit.alive[i]) 
		{
			fruit.born(i);
			return;
		}
	}
}