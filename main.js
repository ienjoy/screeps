// ################################# 
// TODO
/*

* gotta kill off builder. he's not important anymore
* repair sucks right now, should I just remove it?


*/


// ################################# 
// ROLES
/*

Here we're setting up all the different roles

* Harvester moves energy from energy source to spawn point
* Upgrader moves energy from energy source to controller
* Builder moves energy from energy source to thing we're building
* Miner pulls energy from energy source, doesn't move, and drops into a container
* Repair should repair, in theory. Not sure if it's working though

*/

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleMiner = require('role.miner');
var roleSmarterbuilder = require('role.smarterbuilder');
var roleRepair = require('role.repair');
var roleRacecar = require('role.racecar');

// GLOBALS I GUESS

var frustrationLevel = "high";
var harvesterTotal = 0;


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
    
    // debugging
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');   
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');        
    var miners = _.filter(Game.creeps, (creep) => creep.memory.role == 'miner');    
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder'); 
    var repairs = _.filter(Game.creeps, (creep) => creep.memory.role == 'repair');    
    var racecars = _.filter(Game.creeps, (creep) => creep.memory.role == 'racecar');

    /*
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Miners: ' + miners.length);
    console.log('Smarter builders: ' + smarterbuilders.length);
    console.log('Repairs: ' + repairs.length);
    console.log('Racecars: ' + racecars.length);
    */
    
    Memory.harvesterTotal = harvesters.length;
    Memory.upgraderTotal = upgraders.length;
    Memory.minerTotal = miners.length;
    Memory.buildersTotal = builders.length;
    Memory.repairsTotal = repairs.length;
    Memory.racecarsTotal = racecars.length;
 
    // need at least one
    
    if (miners.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,MOVE], undefined, {role: 'miner'});
       	born(newName, "miner");
    }else if (harvesters.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'harvester'});
        born(newName, "harvester");        
    }else if (upgraders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'upgrader'});
		born(newName, "upgrader");
    }else if (builders.length < 1) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'builder'});
		born(newName, "builder");        
    }else if (repairs.length < 3) {
        var newName = Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {role: 'repair'});
        born(newName, "repair");
    }else if (racecars.length < 0) {
        var newName = Game.spawns['Spawn1'].createCreep([CLAIM,MOVE], undefined, {role: 'racecar'});
        born(newName, "racecar");

   	
	// ok here are the real numbers we like
   
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
        	Memory.minerTotal+" miner, "+
        	Memory.buildersTotal+" builders, "+
        	Memory.repairsTotal+" repairs, and "+
        	Memory.racecarsTotal+" racecars."
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
        
        if(creep.memory.role == 'smarterbuilder') {
            roleSmarterbuilder.run(creep);
        }
        
        if(creep.memory.role == 'repair') {
            roleRepair.run(creep);
        }
        
        if(creep.memory.role == 'racecar') {
            roleRacecar.run(creep);
        }

    }
}