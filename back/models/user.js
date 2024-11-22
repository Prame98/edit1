const Sequelize = require('sequelize');
const { DataTypes } = require('sequelize'); 

class User extends Sequelize.Model {
  static initiate(sequelize) {
    User.init({
      userId: {    //  이것을 userId로 바꾸는 과정에서부터 에러가..
        type: Sequelize.STRING(40),
        allowNull: false,
        unique: true,
      },
      nick: {  // 사장님 유저는 상점명으로 작용
        type: Sequelize.STRING(15),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
      address: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      userType: {
        type: DataTypes.ENUM('guest', 'owner'), // guest와 owner 두 유형으로 제한
        allowNull: false,
      },
      time: {   // 영업시간. 손님유저는 null을 가짐
        type: Sequelize.STRING(100),
        allowNull : true,
      },
      /*provider: {
        type: Sequelize.ENUM('local', 'kakao'),
        allowNull: false,
        defaultValue: 'local',
      },
      snsId: {
        type: Sequelize.STRING(30),
        allowNull: true,
      },*/
    }, {
      sequelize,
      timestamps: true,
      underscored: false,
      modelName: 'User',
      tableName: 'users',
      paranoid: true,
      charset: 'utf8',
      collate: 'utf8_general_ci',
    });
  }

  static associate(db) {
    db.User.hasMany(db.Post);
    db.User.belongsToMany(db.User, {
      foreignKey: 'followingId',
      as: 'Followers',
      through: 'Follow',
    });
    db.User.belongsToMany(db.User, {
      foreignKey: 'followerId',
      as: 'Followings',
      through: 'Follow',
    });
  }
};

module.exports = User;
