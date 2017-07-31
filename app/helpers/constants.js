'use strict';

module.exports = {
	logging:{
		actions:{
			userList:'userList',
			readUserList:'readUserList',
			createUser:'createUser',
			updateUser:'updateUser',
			deleteUser:'deleteUser'
  	},
		locations:{
			usersController:'users.server.controller'
		},
		status:{
			success: 'success',
			failed: 'failed'
		}
	}
} ;