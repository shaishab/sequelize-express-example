/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	var Article = sequelize.define('Article', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: DataTypes.NOW
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
