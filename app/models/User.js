/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var User = sequelize.define('User', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		username: {
			type: DataTypes.STRING,
			allowNull: true
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true
		},
		name: {
			type: DataTypes.STRING,
			allowNull: true
		},
		password: {
			type: DataTypes.STRING,
			allowNull: true
		},
		createdAt: {
			type: DataTypes.TIME,
			allowNull: false
		},
		updatedAt: {
			type: DataTypes.TIME,
			allowNull: false
		}
	}, {
		tableName: 'Users',
		timestamps: false,
		schema: 'public'
	});

	User.associate = function(models) {
		User.hasMany(models.Article);
	};
	return User;
};
