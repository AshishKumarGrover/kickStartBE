const {sequelize} = require('./index.js')

console.log('ppppppppppppppppppppppppppp',sequelize)


const scheme = 'lol'

// const scheme = sequelize.define('schemes', {
//     fundid: {
//       type: Sequelize.DataTypes.INTEGER,
//       allowNull: false
//     },
//     schid: {
//       type: Sequelize.DataTypes.INTEGER,
//       allowNull: false,
//       primaryKey: false
//     },
//     name: {
//       type: Sequelize.DataTypes.STRING(150),
//       allowNull: true
//     },
//     iwellCode: {
//       type: Sequelize.DataTypes.STRING(20),
//       allowNull: true,
//       unique: true
//     },
//     camsCode1: {
//       type: Sequelize.DataTypes.STRING(15),
//       allowNull: true
//     },
//     camsCode2: {
//       type: Sequelize.DataTypes.STRING(15),
//       allowNull: true
//     },
//     fsid: {
//       type: Sequelize.DataTypes.STRING(50),
//       allowNull: true
//     },
//     objectiveid: {
//       type: Sequelize.DataTypes.INTEGER(5),
//       allowNull: true
//     },
//     productType: {
//       type: Sequelize.DataTypes.CHAR(2),
//       allowNull: true
//     }
//   })


    // scheme.Sequelize = Sequelize


  module.exports = {
    scheme
  }