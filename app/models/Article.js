/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var Article = sequelize.define('Article', {
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
		tableName: 'Articles',
		timestamps: false,
		schema: 'public'
	});

	Article.associate = function(models) {
		Article.belongsTo(models.User, {
			foreignKey: {
				allowNull: false
			}
		});
	};
	return Article;
};
