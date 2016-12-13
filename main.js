// ################################# 
// TODO
/*

Builders should only build if there are things to build, probably.

*/


// ################################# 
// ROLES
/*

Here we're setting up all the different roles

* Harvester moves energy from energy source to spawn point
* Upgrader moves energy from energy source to controller
* Builder moves energy from energy source to thing we're building
* Miner pulls energy from energy source, doesn't move, and drops into a container
* Minersouth is how I went south
* Repair should repair
* Repair_two should repair a new room
* Wallrepair should repair, in theory. Not sure if it's working though

*/

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleMinersouth = require('role.minersouth');
var roleMiner_three = require('role.miner_three');
var roleLinkminer = require('role.linkminer');
var roleLinkharvester = require('role.linkharvester');
var roleSmarterbuilder = require('role.smarterbuilder');
var roleRepair = require('role.repair');
var roleRepair_two = require('role.repair_two');
var roleMaid = require('role.maid');
var roleWallrepair = require('role.wallrepair');
var roleShuttle = require('role.shuttle');

// MILITARY
var roleBasilisk = require('role.basilisk');
var roleDragon = require('role.dragon');
var roleHealer = require('role.healer');
var roleDemon = require('role.demon');
var roleRacecar = require('role.racecar');

// GLOBALS I GUESS
Memory.needminer = false;
Memory.needminersouth = false;



// THINGS

Object.defineProperty(RoomPosition.prototype, "isOccupied", {
	enumerable: true,
	get: function() {
		return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
	}
});



var allrooms = []; //set up empty array
for(let roomName in Game.rooms)
{
	let room = Game.rooms[roomName];	
	roomdestination = room;
	allrooms.push(roomdestination)
}

module.exports.loop = function () {

	// clearing memory
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Removing', name);
            statusUpdate();
        }
    }
    
	var linkFrom = Game.spawns.Spawn1.room.lookForAt('structure', 5, 42)[0];
	var linkTo = Game.spawns.Spawn1.room.lookForAt('structure', 12, 8)[1];

	 var sendLink = linkFrom.transferEnergy(linkTo);
	// console.log(sendLink);
	

    
    // ARRAYS GO HERE

	var heightList = ["short", "short", "short", "medium", "medium", "medium", "medium", "medium", "tall", "tall", "very tall"];
	var countryList = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands","Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica","Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea","Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia","New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal","Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia","Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)","Yemen","Zambia","Zimbabwe"];
	var eyecolorList = ["brown", "brown", "brown", "brown", "brown", "brown", "brown", "hazel", "hazel", "hazel", "blue", "blue", "green", "green", "silver", "amber"];
	var hobbyList = ["3D printing", "Amateur radio", "Acting", "Baton twirling", "Board games", "Book restoration", "Cabaret", "Calligraphy", "Candle making", "Computer programming", "Coffee roasting", "Cooking", "Coloring", "Cosplaying", "Couponing", "Creative writing", "Crocheting", "Crossword puzzles", "Cryptography", "Dance", "Digital arts", "Drama", "Drawing", "Do it yourself", "Electronics", "Embroidery", "Fantasy Sports", "Fashion", "Fishkeeping", "Flower arranging", "Foreign language learning", "Tabletop Gaming", "Role-playing games", "Genealogy", "Glassblowing", "Gunsmithing", "Homebrewing", "Ice skating", "Jewelry making", "Jigsaw puzzles", "Juggling", "Knapping", "Knitting", "Kabaddi", "Knife making", "Kombucha Brewing", "Lacemaking", "Lapidary", "Lego building", "Lockpicking", "Lucid dreaming", "Machining", "Macrame", "Metalworking", "Magic", "Model building", "Listening to music", "Origami", "Painting", "Playing musical instruments", "Pet", "Poi", "Pottery", "Puzzles", "Quilting", "Reading", "Scrapbooking", "Sculpting", "Sewing", "Singing", "Sketching", "Soapmaking", "Stand-up comedy", "Tatting", "Table tennis", "Taxidermy", "Video gaming", "Watching movies", "Watching television", "Web surfing", "Whittling", "Wikipedia editing ", "Wood carving", "Woodworking", "Worldbuilding", "Writing", "Yoga", "Yo-yoing"];


    // safe mode
    
    
    // showing energy    
    for (var roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    // room.controller.activateSafeMode();
    if (!room.controller || !room.controller.my) continue;
    	 // console.log("Room", room.name, "Energy", room.energyAvailable);
	}

    // how old is everyone?    
    for (var creepName in Game.creeps)
    {
    	let creep = Game.creeps[creepName];
    	if (creep.ticksToLive < 10)
    	{
			console.log(creep.name, "("+creep.memory.role+")", "will die in", creep.ticksToLive,"ticks");
    		// if we know someone is going to die soon, we can get ready with the replacement
	    	// let's start with a miner
	    	if (creep.memory.role == "miner")
	    	{
	    		// Memory.needminer = true;
	    	}else if (creep.memory.role == "minersouth"){
	    		// Memory.needminersouth = true;
	    	}
    	}	
    }
    
    
    // TOWER DEFENDER        
    for(var i in Game.rooms) {
        var hostiles = Game.rooms[i].find(FIND_HOSTILE_CREEPS);
        for(var j in hostiles) {
            var tower = hostiles[j].room.find(FIND_STRUCTURES, { filter: function(o) {return o.structureType == STRUCTURE_TOWER; } })[0];
            if(tower) tower.attack(hostiles[j]);
        }
    }
    
    
    // debugging    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');   
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');        
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');    
    var minersouth = _.filter(Game.creeps, (creep) => creep.memory.role == 'minersouth');    
    var miner_three = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner_three');    
    var linkminer = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkminer');    
    var linkharvester = _.filter(Game.creeps, (creep) => creep.memory.role == 'linkharvester');    
    var basilisk = _.filter(Game.creeps, (creep) => creep.memory.role == 'basilisk');    
    var dragon = _.filter(Game.creeps, (creep) => creep.memory.role == 'dragon');    
    var healer = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');    
    var demon = _.filter(Game.creeps, (creep) => creep.memory.role == 'demon');    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'); 
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');    
    var repairs_two = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_two');    
    var maids = _.filter(Game.creeps, (creep) => creep.memory.role == 'maid');    
    var wallrepairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepair');    
	var shuttles = _.filter(Game.creeps, (creep) => creep.memory.role == 'shuttle'); 
	
	var racecar = _.filter(Game.creeps, (creep) => creep.memory.role == 'racecar'); 
	   
	
    Memory.harvesterTotal = harvesters.length;
    Memory.upgraderTotal = upgraders.length;
    Memory.minerTotal = miners.length;
    Memory.minersouthTotal = minersouth.length;
    Memory.miner_threeTotal = miner_three.length;
    
    Memory.linkminerTotal = linkminer.length;
    Memory.linkharvesterTotal = linkharvester.length;
    
    Memory.basiliskTotal = basilisk.length;
    Memory.dragonTotal = dragon.length;
    Memory.healerTotal = healer.length;
	Memory.demonTotal = demon.length;
    Memory.buildersTotal = builders.length;
    Memory.repairsTotal = repairs.length;
    Memory.repair_twoTotal = repairs_two.length;
    Memory.maidsTotal = maids.length;
    Memory.wallrepairsTotal = wallrepairs.length;
	Memory.shuttlesTotal = shuttles.length;
	
	
	
	// CORE UNITS
	var harvesterCount = 4;
	var minerCount = 3;
	var minersouthCount = 1;
	var miner_threeCount = 2;
	var linkminerCount = 1;
	var linkharvesterCount = 1;
	var upgraderCount = 2;
	
	// SUPPLEMENTAL
	var repairCount = 1;
	var repair_twoCount = 3;
	var wallrepairCount = 1;
	var maidCount = 2;
	var shuttleCount = 7;
	var builderCount = 8;
	
	// MILITARY
	var healerCount = 0;
	var demonCount = 0;
	var basiliskCount = 0;
	var dragonCount = 0;
	

    
    
    /*
    1. THREE WEAK HARVESTERS (200s)
    2. THREE WEAK BUILDERS (200s)
    	- LATER: ONE REPAIR (200)
    3. TWO BIG BUILDERS (300 - big load, slow everything)
    4. THREE UPGRADERS
    
    */
    
    // ROOM TWO
    if (upgraders.length < 1) {
        var newName = Game.spawns['Spawn2'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader");
    }else if (miners.length < 2) { // needminer queues the next miner right on time
        var newName = Game.spawns['Spawn2'].createCreep([WORK,WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    }
       
       
       
    
    
    if (miners.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    }else if (harvesters.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
    }else if (upgraders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader");
    }else if (builders.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");        


	/* ############################ */
	
	}else if (demon.length < demonCount) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], undefined, {role: 'demon'});
       	born(newName, "demon");     
	}else if (healer.length < healerCount) { 
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, MOVE, MOVE, HEAL, MOVE, MOVE], undefined, {role: 'healer'});
       	born(newName, "healer"); 
    }else if (basilisk.length < basiliskCount) { 
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,MOVE, ATTACK,HEAL], undefined, {role: 'basilisk'});
       	born(newName, "basilisk"); 

	 // pro-claimer:
     }else if (racecar < 0) { 
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE,MOVE,MOVE], "race", {role: 'racecar'});
       	born(newName, "racecar"); 
      
      
      	
       	
    // post-building    
    }else if (harvesters.length < harvesterCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
    }else if (miners.length < minerCount || Memory.needminer == true) { // needminer queues the next miner right on time
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    	Memory.needminer = false;  // ok we're good again
    }else if (minersouth.length < minersouthCount || Memory.needminersouth == true) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], undefined, {role: 'minersouth'});
       	born(newName, "minersouth");
       	Memory.needminersouth = false; // ok we're good again
    }else if (miner_three.length < miner_threeCount || Memory.needminer_three == true) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE], undefined, {role: 'miner_three'});
       	born(newName, "miner_three");
       	Memory.needminer_three = false; // ok we're good again
    }else if (repairs.length < repairCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "repair");
	}else if (repairs_two.length < repair_twoCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair_two'});
        born(newName, "repair_two");      
	}else if (maids.length < maidCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'maid'});
        born(newName, "maid");      
   	}else if (shuttles.length < shuttleCount) {
   		var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'shuttle'});
		born(newName, "shuttle"); 
   	}else if (upgraders.length < upgraderCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader"); 
    }else if (builders.length < builderCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");         
    }else if (wallrepairs.length < wallrepairCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'wallrepair'});
        born(newName, "wallrepair");    
	}else if (basilisk.length < basiliskCount) { 
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,MOVE, ATTACK,HEAL], undefined, {role: 'basilisk'});
       	born(newName, "basilisk"); 
    }else if (dragon.length < dragonCount) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'dragon'});
       	born(newName, "dragon"); 
    }else if (linkminer.length < linkminerCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'linkminer'});
       	born(newName, "linkminer"); 
    }else if (linkharvester.length < linkharvesterCount) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,CARRY,MOVE], undefined, {role: 'linkharvester'});
       	born(newName, "linkharvester"); 
    }
	    
    // FUNCTIONS
    
    function born(name, type){
    	if (typeof name === 'string' || name instanceof String)
        {
        	var height = heightList[Math.floor(Math.random()*heightList.length)];
			var country = countryList[Math.floor(Math.random()*countryList.length)];
			var eyecolor = eyecolorList[Math.floor(Math.random()*eyecolorList.length)];
			var hobby = hobbyList[Math.floor(Math.random()*hobbyList.length)];
        	
        	console.log('Coming soon: a new '+type+" named " + name +" from "+country+", with "+eyecolor+ " eyes, "+height+" size, and likes "+hobby);
        	statusUpdate();
        }
    }

    function statusUpdate()
    {
    	console.log(
        	Memory.harvesterTotal+" harvesters, "+
        	Memory.upgraderTotal+" upgraders, "+        	
        	Memory.buildersTotal+" builders, "+
        	Memory.minerTotal+" miner, "+
        	Memory.minersouthTotal+" minersouth, "+
        	Memory.miner_threeTotal+" miner_three, "+
        	Memory.linkminerTotal+" linkminer, "+
        	Memory.linkharvesterTotal+" linkharvester, "+
        	Memory.basiliskTotal+" basilisk, "+
        	Memory.dragonTotal+" dragon, "+
        	Memory.healerTotal+" healer, "+
        	Memory.demonTotal+" demon, "+
        	Memory.repairsTotal+" repairs, "+
        	Memory.repair_twoTotal+" repairs_two, "+
        	Memory.maidsTotal+" maids, "+
        	Memory.wallrepairsTotal+" wallrepairs, and "+
        	Memory.shuttlesTotal+" shuttles."
        	);
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        
        if(creep.memory.role == 'miner') {
            roleMiner.run(creep);
        }
        
        if(creep.memory.role == 'minersouth') {
            roleMinersouth.run(creep);
        }
        
        if(creep.memory.role == 'miner_three') {
            roleMiner_three.run(creep);
        }
        
        if(creep.memory.role == 'linkminer') {
            roleLinkminer.run(creep);
        }
        
        if(creep.memory.role == 'linkharvester') {
            roleLinkharvester.run(creep);
        }
        
        if(creep.memory.role == 'basilisk') {
            roleBasilisk.run(creep);
        }
        
        if(creep.memory.role == 'dragon') {
            roleDragon.run(creep);
        }
        
        if(creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
        
        if(creep.memory.role == 'demon') {
            roleDemon.run(creep);
        }
        
        if(creep.memory.role == 'smarterbuilder') {
            roleSmarterbuilder.run(creep);
        }
        
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        
        if(creep.memory.role == 'repair_two') {
            roleRepair_two.run(creep);
        }

        if(creep.memory.role == 'maid') {
            roleMaid.run(creep);
        }
        
        if(creep.memory.role == 'wallrepair') {
            roleWallrepair.run(creep);
        }
        
        if(creep.memory.role == 'shuttle') {
            roleShuttle.run(creep);
        }
        
        if(creep.memory.role == 'racecar') {
            roleRacecar.run(creep);
        }

    }
}


