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
var roleSmarterbuilder = require('role.smarterbuilder');
var roleRepair = require('role.repair');
var roleRepair_two = require('role.repair_two');
var roleWallrepair = require('role.wallrepair');
var roleShuttle = require('role.shuttle');

// MILITARY
var roleBasilisk = require('role.basilisk');
var roleDragon = require('role.dragon');
var roleHealer = require('role.healer');
var roleHealer = require('role.demon');

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

module.exports.loop = function () {

	// clearing memory
	for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Removing', name);
            statusUpdate();
        }
    }
    
    
    // safe mode
    
    
    // showing energy    
    for (var roomName in Game.rooms) {
    let room = Game.rooms[roomName];
    // room.controller.activateSafeMode();
    if (!room.controller || !room.controller.my) continue;
    	 console.log("Room", room.name, "Energy", room.energyAvailable);
	}

    // how old is everyone?    
    for (var creepName in Game.creeps)
    {
    	let creep = Game.creeps[creepName];
    	if (creep.ticksToLive < 15)
    	{
			console.log(creep.name, "("+creep.memory.role+")", "will die in", creep.ticksToLive,"ticks");
    		// if we know someone is going to die soon, we can get ready with the replacement
	    	// let's start with a miner
	    	if (creep.memory.role == "miner")
	    	{
	    		Memory.needminer = true;
	    	}else if (creep.memory.role == "minersouth"){
	    		Memory.needminersouth = true;
	    	}
    	}
    	
    	
    	
    }
    
    
    // DEFEND
        
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
    var basilisk = _.filter(Game.creeps, (creep) => creep.memory.role == 'basilisk');    
    var dragon = _.filter(Game.creeps, (creep) => creep.memory.role == 'dragon');    
    var healer = _.filter(Game.creeps, (creep) => creep.memory.role == 'healer');    
    var demon = _.filter(Game.creeps, (creep) => creep.memory.role == 'demon');    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'); 
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');    
    var repairs_two = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair_two');    
    var wallrepairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'wallrepair');    
	var shuttles = _.filter(Game.creeps, (creep) => creep.memory.role == 'shuttle');    
	
    
    Memory.harvesterTotal = harvesters.length;
    Memory.upgraderTotal = upgraders.length;
    Memory.minerTotal = miners.length;
    Memory.minersouthTotal = minersouth.length;
    Memory.miner_threeTotal = miner_three.length;
    Memory.basiliskTotal = basilisk.length;
    Memory.dragonTotal = dragon.length;
    Memory.healerTotal = healer.length;
	Memory.demonTotal = demon.length;
    Memory.buildersTotal = builders.length;
    Memory.repairsTotal = repairs.length;
    Memory.repair_twoTotal = repairs_two.length;
    Memory.wallrepairsTotal = wallrepairs.length;
	Memory.shuttlesTotal = shuttles.length;
    
    
    /*
    1. THREE WEAK HARVESTERS (200s)
    2. THREE WEAK BUILDERS (200s)
    	- LATER: ONE REPAIR (200)
    3. TWO BIG BUILDERS (300 - big load, slow everything)
    4. THREE UPGRADERS
    
    */
    
    if (miners.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    }else if (minersouth.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,MOVE], undefined, {role: 'minersouth'});
       	born(newName, "minersouth");   	
    }else if (harvesters.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
    }else if (upgraders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader");
    }else if (builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");        
    }else if (repairs.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "repair");
        
	// ok here are the real numbers we like
	// (building!)
   
   	/*
   	}else if (harvesters.length < 6) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
   	}else if (upgraders.length < 5) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader");    
    }else if (miners.length < 3) {
        // var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    }else if (builders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");        
    }else if (repairs.length < 10) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "repair");
    }    
    */
    
    // post-building    
    }else if (harvesters.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
    }else if (miners.length < 3 || Memory.needminer == true) { // needminer queues the next miner right on time
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    	Memory.needminer = false;  // ok we're good again
    }else if (minersouth.length < 1 || Memory.needminersouth == true) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'minersouth'});
       	born(newName, "minersouth");
       	Memory.needminersouth = false; // ok we're good again
    }else if (miner_three.length < 2 || Memory.needminer_three == true) {
		var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner_three'});
       	born(newName, "miner_three");
       	Memory.needminer_three = false; // ok we're good again
    }else if (repairs.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "repair");
	}else if (repairs_two.length < 2) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair_two'});
        born(newName, "repair_two");   
    }else if (healer.length < 0) { 
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, MOVE, MOVE, HEAL, MOVE, MOVE], undefined, {role: 'healer'});
       	born(newName, "healer"); 
     }else if (demon.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, MOVE, ATTACK, ATTACK, ATTACK, ATTACK, ATTACK], undefined, {role: 'demon'});
       	born(newName, "demon");
   	}else if (shuttles.length < 6) {
   		var newName = Game.spawns['Spawn1'].createCreep([CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'shuttle'});
		born(newName, "shuttle"); 
   	}else if (upgraders.length < 6) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader"); 
    }else if (builders.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");         
    }else if (wallrepairs.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'wallrepair'});
        born(newName, "wallrepair");    
	}else if (basilisk.length < 0) { 
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH,MOVE, ATTACK,HEAL], undefined, {role: 'basilisk'});
       	born(newName, "basilisk"); 
    }else if (dragon.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([TOUGH, TOUGH, TOUGH, TOUGH, TOUGH, RANGED_ATTACK, MOVE, MOVE, MOVE, MOVE], undefined, {role: 'dragon'});
       	born(newName, "dragon"); 
    }
	   	
	// ok here are the real numbers we like -- WHEN THINGS GET BIGGER
   	/*
   	}else if (harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "big harvester");        
   	 }else if (miners.length < 3) {
        // var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "big miner");
    }else if (upgraders.length < 5) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,MOVE,MOVE], undefined, {role: 'upgrader'});
		born(newName, "big upgrader");    
   }else if (minersouth.length < 2) {
        // var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,MOVE], undefined, {role: 'miner'});
        var newName = Game.spawns['Spawn1'].createCreep([WORK,WORK,WORK,MOVE], undefined, {role: 'minersouth'});
       	born(newName, "big minersouth");
    }else if (builders.length < 4) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'builder'});
		born(newName, "big builder");        
    }else if (repairs.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,CARRY,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "big repair");
    }    
    */
    
    
    // FUNCTIONS
    
    function born(name, type){
    	if (typeof name === 'string' || name instanceof String)
        {
        	console.log('Coming soon: a new '+type+" named " + name);
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
        	Memory.basiliskTotal+" basilisk, "+
        	Memory.dragonTotal+" dragon, "+
        	Memory.healerTotal+" healer, "+
        	Memory.demonTotal+" demon, "+
        	Memory.repairsTotal+" repairs, "+
        	Memory.repair_twoTotal+" repairs_two, "+
        	Memory.wallrepairsTotal+" wallrepairs, and"+
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
        
        if(creep.memory.role == 'wallrepair') {
            roleWallrepair.run(creep);
        }
        
        if(creep.memory.role == 'shuttle') {
            roleShuttle.run(creep);
        }

    }
}