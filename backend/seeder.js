import dotenv from "dotenv";
import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDataBase from "./config/db.js";
import Phone from "./models/phoneModel.js";
import phones from "./data/phones.js";

dotenv.config();

connectDataBase();

const importData = async () => {
  try {
    await User.deleteMany();
    await Phone.deleteMany();

    const createdUsers= await User.insertMany(users)

    const user = createdUsers[1]._id
    
    const samplePhones= phones.map(phone =>{
        return{
          ...phone, user: user
        }
    })

    await Phone.insertMany(samplePhones)
   

    console.log("Data Imported!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Phone.deleteMany();
    console.log("Data Destroyed!");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
