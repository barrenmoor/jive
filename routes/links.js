var makeId = function() {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	for(var i = 0; i < 5; i++) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}

	return text;
};

var teams = [{
	id : "100",
	name : "Evoque",
	members : [{name : "Arun"}, {name : "Vineesh"}, {name : "Riyad"}, {name : "Vishwas"}, {name : "Rupesh"}],
	desc : "Range Rover Evoque demands respect on every street corner. Its contemporary design and silhouette guarantee you’ll stand out in the city. Range Rover Evoque is as versatile as you need it to be. Add to that impressive load-carrying capability and city-inspired maneuverability, and Range Rover Evoque is the start of your urban adventures."
}, {
	id : "101",
	name : "Hummer",
	members : [{name : "Divya"}, {name : "Kala"}, {name : "Manish"}, {name : "Shikhar"}, {name : "Benny"}],
	desc : "HUMMER vehicles were designed and built to travel to the ends of the earth - and let you test your limits when you get there. And while they are no longer being made, HUMMERS are still some of the most versatile vehicles on the planet, letting you connect with the outdoors in ways you never dreamed possible. Plus, each HUMMER model is distinctly unique. Just like the people who drive them."
}, {
	id : "102",
	name : "Range Rover",
	members : [{name : "Venu"}, {name : "Shailja"}, {name : "Sushree"}, {name : "Atulya"}, {name : "Sandeep"}],
	desc : "The Range Rover is a large luxury four-wheel drive sport utility vehicle (SUV) produced by British car maker Land Rover, a subsidiary of Jaguar Land Rover, and serves as its flagship model. Range Rover is also being developed by Land Rover as its premium brand, and it is used as a brand name on two other models – the Range Rover Evoque and the Range Rover Sport."
}, {
	id : "103",
	name : "Snipers",
	members : [{name : "Yogi"}, {name : "Prabhu"}, {name : "Sridhar"}, {name : "Meyyappan"}, {name : "Ravi"}],
	desc : "A sniper is a highly trained marksman who operates alone, in a pair, or with a sniper team to maintain close visual contact with the enemy and engage targets from concealed positions or distances exceeding the detection capabilities of enemy personnel. Snipers typically have highly selective and specialized training."
}, {
	id : "104",
	name : "Vipers",
	members : [{name : "Sneha"}, {name : "Raj"}, {name : "Vishal"}, {name : "Sunil"}],
	desc : "It's not a car, it's a lifestyle. So you drive. And the world seems right again. The legendary SRT Viper is back with enough raw emotion and power that it will capture your soul. The newly updated V-10 engine produces a heart-pumping 640 horsepower at 6,150 rpm and 600 pound-feet of torque at 4,950 rpm, the most of any naturally aspirated sports car in the world."
}];

var sprints = [{
	id : "200",
	name : "Sprint 102",
	teamId : "104",
	dates : [new Date(Date.UTC(2014, 1, 12)), new Date(Date.UTC(2014, 0, 31)), new Date(Date.UTC(2014, 1, 3)), new Date(Date.UTC(2014, 1, 4)), new Date(Date.UTC(2014, 1, 5)), new Date(Date.UTC(2014, 1, 6)),
	new Date(Date.UTC(2014, 1, 7)), new Date(Date.UTC(2014, 1, 10)), new Date(Date.UTC(2014, 1, 11))]
}, {
	id : "201",
	name : "Sprint 103",
	teamId : "104",
	dates : [new Date(Date.UTC(2014, 1, 19)), new Date(Date.UTC(2014, 1, 20)), new Date(Date.UTC(2014, 1, 21)), new Date(Date.UTC(2014, 1, 24)), new Date(Date.UTC(2014, 1, 25))]
}];

exports.basic = function(req, res) {
	res.send({brand : "CUIC Sprint Task Board"});
};

exports.teams = function(req, res) {
	res.send({teams : teams});
};

exports.team = function(req, res) {
	var found = false;
	for(var i in teams) {
		if(req.params.teamId == teams[i].id) {
			res.send(teams[i]);
			found = true;
			break;
		}
	}

	if(!found) {
		res.status(404).send({});
	}
};

exports.sprints = function(req, res) {
	var teamId = req.params.teamId;
	var results = [];
	for(var i in sprints) {
		if(teamId == sprints[i].teamId) {
			results.push(sprints[i]);
		}
	}
	res.send(results);
};

exports.sprint = function(req, res) {
	var sprintId = req.params.sprintId;
	var found = false;
	for(var i in sprints) {
		if(req.params.sprintId == sprints[i].id) {
			res.send(sprints[i]);
			found = true;
			break;			
		}
	}

	if(!found) {
		res.status(404).send({});
	}
};

exports.addSprint = function(req, res) {
	var sprint = {
		id : makeId(),
		name : req.body.name,
		teamId : req.params.teamId,
		dates : req.body.dates
	};

	console.log(sprint);
	sprints.push(sprint);
	res.status(201).send({});
};

exports.updateSprint = function(req, res) {
	var id = req.params.sprintId;
	var found = false;
	for(var i in sprints) {
		if(req.params.sprintId == sprints[i].id) {
			sprints[i].name = req.body.name;
			sprints[i].dates = req.body.dates;

			res.status(200).send();

			found = true;
			break;
		}
	}

	if(!found) {
		res.status(404).send({});
	}
};

exports.deleteSprint = function(req, res) {
	var id = req.params.sprintId;
	var index = -1;
	for(var i in sprints) {
		if(req.params.sprintId == sprints[i].id) {
			index = i;
			break;
		}
	}

	if(index != -1) {
		sprints.splice(index, 1);
		res.status(200).send({});
	} else {
		res.status(404).send({});
	}
};

