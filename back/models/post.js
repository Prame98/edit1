const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

class Post extends Sequelize.Model {
  static initiate(sequelize) {
    Post.init({
      content: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      title:{
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      original_price:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      discount_rate:{
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      sale_end_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      category:{
        type: DataTypes.ENUM('bread','rice_cake','side_dish','grocery','etc'),
        allowNull: false,
      },
      image: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'Post',
      tableName: 'posts',
      paranoid: false,
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    });
  }
  
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});
  }
}

module.exports = Post;